#!/usr/bin/env node
/**
 * generate-tokens — the DBUI token generator.
 *
 * Reads the single source of truth (packages/dbui/src/tokens/theme.config.mjs)
 * and writes two derived artifacts:
 *
 *   1. packages/dbui/src/tokens/tokens.css   — shipped CSS
 *        • @theme inline: one Tailwind color utility per semantic
 *          (--color-surface-base → var(--db-surface-base)), plus the bridge
 *          onto Tailwind's own namespaces (--spacing, --radius-*)
 *        • :root  — scalars, space/radius/type/elevation scale, LIGHT semantics
 *        • .dark  — DARK semantics, and the elevation scale at its dark alphas
 *        • type contexts — the type stops again at their other values, behind
 *          the context attribute. Opt-in only; no media query.
 *      Color primitives are resolved INLINE (semantics carry final hex/rgba).
 *      They are NOT shipped as CSS vars — they're generator input only. Type
 *      stops are the deliberate exception: a context has to swap a value under a
 *      style that is already applied, and only a custom property can be swapped.
 *
 *   2. scripts/design-lint/tokens.json       — linter allowlist
 *        colors.{light,alpha,primitives,semanticTokens}, dimensions, fonts and
 *        type all regenerated from the config. Nothing is carried over from the
 *        previous file: `spacing` and `radius` used to be, which is how the
 *        linter kept allowing 6, 10 and 14 for eight months after the scale
 *        dropped them. Legacy hexes/alphas from globals.css are unioned in so
 *        existing (not-yet-migrated) components keep passing the linter.
 *
 * Usage:  node scripts/design-lint/generate-tokens.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cfg from "../../packages/dbui/src/tokens/theme.config.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../../")
const TOKENS_CSS = path.join(ROOT, "packages/dbui/src/tokens/tokens.css")
const TYPE_CSS = path.join(ROOT, "packages/dbui/src/tokens/type.css")
const GLOBALS_CSS = path.join(ROOT, "packages/dbui/src/tokens/globals.css")
const TOKENS_JSON = path.join(__dirname, "tokens.json")

const { meta, primitives, semantics, scalars, space, radius, shape, bridge, size, border, type, elevation, motion, layer, themes, themeAttr, defaultTheme } = cfg
const PREFIX = `--${meta.prefix}-` // --db-

// ── ref resolution ───────────────────────────────────────────────────────────
function resolvePrimitive(dotted) {
  const hex = dotted.split(".").reduce((o, k) => (o == null ? o : o[k]), primitives)
  if (typeof hex !== "string") throw new Error(`Unknown primitive ref: "${dotted}"`)
  return hex.toUpperCase()
}
function rgbaOf(hex, a) {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
const isAlpha = (v) => v && typeof v === "object" && "ref" in v
function resolve(v) {
  return isAlpha(v) ? rgbaOf(resolvePrimitive(v.ref), v.a) : resolvePrimitive(v)
}

// ── tokens.css ────────────────────────────────────────────────────────────────
const names = Object.keys(semantics)
const varName = (n) => `${PREFIX}${n}`

const theme = names.map((n) => `  --color-${n}: var(${varName(n)});`).join("\n")

/* ── themes ──────────────────────────────────────────────────────────────────
 *
 * The third axis. Mode is `.dark`, the dials are scalars, and this is the set
 * of AESTHETICS the same component library can render in.
 *
 * A theme is a DIFF against the default, and it may only restate a name the
 * base already declares — asserted below rather than trusted, because the whole
 * economy of the axis rests on it. One theme carrying a token another lacks
 * would mean no component could render in both, and the failure would show up
 * as a missing property at a call site rather than here.
 *
 * The four overridable groups are the four that legitimately vary. Space,
 * density, motion and the type ramp steps are absent on purpose: a theme that
 * moved those would fork every layout, screenshot and spec taken in another.
 */
const themeNames = Object.keys(themes ?? {})
if (!themeNames.length) throw new Error("theme.config.mjs declares no themes. It must declare at least the default.")
if (!themes[defaultTheme]) {
  throw new Error(`defaultTheme "${defaultTheme}" is not one of themes (${themeNames.join(", ")})`)
}

/** `text` → `--db-font-family`, `mono` → `--db-mono-font-family`. */
const FAMILY_VAR = { text: "font-family", mono: "mono-font-family" }

const overridesOf = (t) => ({
  ramp: t.ramp ?? {},
  semantics: t.semantics ?? {},
  shape: t.shape ?? {},
  family: t.type?.family ?? {},
  elevation: t.elevation ?? {},
})

/**
 * Rebind a semantic's primitive ramp.
 *
 * The lever that makes a theme cheap. Every semantic already names the ramp
 * that drives it — `surface-base` is `interface.cool.900` in dark — so
 * rewriting one ramp prefix to another re-skins the whole of chrome from a
 * single declaration. One is four declarations because of this; as value
 * overrides it would have been forty, and unreadable as an intent.
 *
 * Applies inside alpha refs as well as plain ones, or a theme would rebind
 * `action-primary-base` and leave its own hover and press behind on the old
 * ramp — the failure would be a button that changes color when you point at it.
 */
const rebind = (value, ramp) => {
  if (!ramp || !Object.keys(ramp).length) return value
  const swap = (dotted) => {
    for (const [from, to] of Object.entries(ramp)) {
      if (dotted === from || dotted.startsWith(`${from}.`)) return to + dotted.slice(from.length)
    }
    return dotted
  }
  return isAlpha(value) ? { ...value, ref: swap(value.ref) } : swap(value)
}

/** A ramp is only bindable to a ramp that exists, and only from one that does. */
const rampNames = new Set(
  Object.entries(primitives).flatMap(([fam, ramps]) =>
    fam === "base" ? [] : Object.keys(ramps).map((r) => `${fam}.${r}`)
  )
)

/** The invariant, enforced. A theme varies values; it never varies names. */
const assertKnown = (themeName, group, keys, known) => {
  const unknown = keys.filter((k) => !known.includes(k))
  if (unknown.length) {
    throw new Error(
      `theme "${themeName}" overrides ${group} the base does not declare: ${unknown.join(", ")}.\n` +
        `A theme varies VALUES, never NAMES — every theme must declare the identical set, or no ` +
        `component can render in both. Add the name to the base first, or correct the spelling.`
    )
  }
}

/* The portal's pre-paint script reads one `?theme=` param for both axes — it
 * shipped as the color mode and `scripts/shot.mjs` still appends `?theme=dark`
 * — and tells them apart by value. A theme called `light` or `dark` would make
 * that undecidable, so the name is refused here rather than debugged there. */
const MODE_WORDS = ["light", "dark"]
for (const name of themeNames.filter((n) => MODE_WORDS.includes(n))) {
  throw new Error(
    `theme "${name}" collides with a color mode. "light" and "dark" name the mode axis, and the ` +
      `portal's ?theme= param resolves the two by value — pick another name.`
  )
}

for (const [name, t] of Object.entries(themes)) {
  const o = overridesOf(t)
  assertKnown(name, "semantics", Object.keys(o.semantics), names)
  assertKnown(name, "shape roles", Object.keys(o.shape), Object.keys(shape ?? {}))
  assertKnown(name, "type families", Object.keys(o.family), Object.keys(type.family))
  assertKnown(name, "elevation stops", Object.keys(o.elevation), Object.keys(elevation))
  // Both ends of a rebinding, because a typo on either silently does nothing:
  // an unknown source matches no ref and the theme renders as the base, and an
  // unknown target resolves to no hex and the generator throws somewhere less
  // useful than here.
  assertKnown(name, "ramp sources", Object.keys(o.ramp), [...rampNames])
  assertKnown(name, "ramp targets", Object.values(o.ramp), [...rampNames])
}

/**
 * A theme's full value set: the base, rebound onto the theme's ramps, with its
 * own overrides laid over the top.
 *
 * The order is the contract. `ramp` is the broad stroke and `semantics` is the
 * correction, so a theme can re-skin all of chrome and still fix the handful of
 * tokens that do not follow from the ramp. Reversed, an override would be
 * rewritten by the rebinding that was supposed to precede it.
 *
 * Merged per MODE rather than per token, so a theme can restate dark alone and
 * inherit light.
 */
const effective = (themeName) => {
  const o = overridesOf(themes[themeName])
  const bound = (n) => ({
    light: rebind(semantics[n].light, o.ramp),
    dark: rebind(semantics[n].dark, o.ramp),
  })
  return {
    semantics: Object.fromEntries(names.map((n) => [n, { ...bound(n), ...o.semantics[n] }])),
    shape: { ...shape, ...o.shape },
    family: { ...type.family, ...o.family },
    elevation: Object.fromEntries(Object.keys(elevation).map((k) => [k, { ...elevation[k], ...o.elevation[k] }])),
  }
}

/**
 * A square corner is the system default, and flush groups depend on it being
 * exactly zero — a grouped button whose inner edge rounds stops butting against
 * its neighbor. Asserted for EVERY theme, because it is the one role a theme
 * could plausibly reach for and get wrong.
 */
for (const themeName of themeNames) {
  const sq = effective(themeName).shape?.square
  if (sq !== undefined && sq !== 0) {
    throw new Error(
      `theme "${themeName}" sets shape.square to ${sq}. It must be 0 — it is the default corner ` +
        `and flush control groups depend on it.`
    )
  }
}

/* The base theme is what `:root` and `.dark` carry, so a product importing one
 * file needs no attribute at all. Read through `effective` rather than off the
 * config directly, so the default cannot disagree with its own theme block. */
const base = effective(defaultTheme)

const byTheme = Object.fromEntries(themeNames.map((n) => [n, effective(n)]))

/**
 * Which names any theme actually moves. Every theme then emits exactly this set
 * — not only its own diff — because a block has to be able to RESET what a theme
 * around it changed. `[data-theme="core"]` inside a DuBois document is the case
 * a diff-only emission cannot serve, and it is the same reason the type contexts
 * emit the default context rather than leaving it to `:root`.
 *
 * Measured as a DIFFERENCE IN RESOLVED VALUE rather than read off the override
 * objects, and the ramp lever is why. One declares three semantics and moves
 * about forty; a set built from declared keys would emit those three, and the
 * other thirty-seven would silently fall through to `:root` and render Core's
 * greys inside a warm theme. Resolving first also means a rebinding that lands
 * back on the same hex correctly counts as no change.
 *
 * Filtered against the base's own key order so a theme block reads in the order
 * the base declares, and sized by what is actually themed: a config with one
 * theme moves nothing, emits nothing, and leaves tokens.css byte-identical to a
 * build that had never heard of themes.
 */
const themedKeys = (order, moves) => order.filter(moves)

const themedFamilies = themedKeys(Object.keys(FAMILY_VAR), (k) =>
  themeNames.some((t) => byTheme[t].family[k] !== base.family[k])
)
const themedShape = themedKeys(Object.keys(shape ?? {}), (r) =>
  themeNames.some((t) => byTheme[t].shape[r] !== base.shape[r])
)
const themedElevation = themedKeys(Object.keys(elevation), (s) =>
  themeNames.some(
    (t) =>
      byTheme[t].elevation[s].light !== base.elevation[s].light ||
      byTheme[t].elevation[s].dark !== base.elevation[s].dark
  )
)
const themedSemantics = themedKeys(names, (n) =>
  themeNames.some((t) =>
    ["light", "dark"].some((mode) => resolve(byTheme[t].semantics[n][mode]) !== resolve(base.semantics[n][mode]))
  )
)
const themedCount =
  themedFamilies.length + themedShape.length + themedElevation.length + themedSemantics.length

/**
 * Everything spatial ships in rem, authored in px.
 *
 * The config stays in px because that is how designers and Figma think, and
 * because a comparison against a mock has to be in px to be meaningful. The
 * conversion happens here, once.
 *
 * rem matters for the case px cannot serve: a reader who raises their browser's
 * default font size. Browser *zoom* scales px and rem alike, so zoom is not the
 * discriminating case — a font-size preference is, and px ignores it entirely
 * (WCAG 1.4.4). Radius is included on purpose: an input that grows taller while
 * its 4px corner stays frozen does not just look bigger, it changes shape.
 *
 * Border width is deliberately NOT converted — see borderLines.
 */
const ROOT_PX = 16
const rem = (px) => {
  if (px === 0) return "0"
  const value = px / ROOT_PX
  // Trim float noise: 13/16 = 0.8125, but 0.1 + 0.2 style drift is not welcome.
  return `${parseFloat(value.toFixed(6))}rem`
}

const scalarLines = Object.entries(scalars)
  .map(([k, val]) => {
    // spacing-unit is a measurement, so it converts with everything else; the
    // rest are unitless multipliers and must not.
    const out = typeof val === "string" && val.endsWith("px") ? rem(parseFloat(val)) : val
    return `  ${PREFIX}${k}: ${out};`
  })
  .join("\n")

const v = (name) => `var(${PREFIX}${name})` // reference another --db-* token inside calc()

/**
 * Space, size and radius share one shape: a stop is its multiple of the grid
 * unit, left as a calc() so the browser resolves the density dial per render
 * rather than the generator freezing it at build time.
 *
 * Every family computes its own value. None of them references another, and
 * there is deliberately no primitive custom property behind them: the scale is
 * an authoring artifact that lives in Figma and in this config, and React ships
 * semantics only — the same split color already makes, where the palette
 * resolves at build time and only `--db-surface-base` reaches the browser.
 *
 * So `--db-size-8` and `--db-space-8` are two independent tokens that agree on
 * 32px because they are both 8 units, not because one reads the other. That is
 * the property worth keeping: a consumer of `h-8` is not coupled to a decision
 * made about padding.
 *
 * A string value is a sentinel rather than a multiple — `full` is 999px and
 * means "pill", not "249.75 units" — so it passes through untouched and does
 * not scale.
 */
const scaled = (family, stops) =>
  Object.entries(stops)
    // JS orders integer-like keys before string keys, which puts the `0-5` half
    // step after `12`. Sorted by the multiple so the file reads as a scale, with
    // sentinels last.
    .sort(([, a], [, b]) => (typeof a === "string") - (typeof b === "string") || a - b)
    .map(([stop, mult]) => {
      const name = `  ${PREFIX}${family}-${stop}: `
      if (typeof mult === "string") return `${name}${mult};`
      if (mult === 0) return `${name}0;`
      return `${name}calc(${v("spacing-unit")} * ${mult} * ${v("density-scalar")});`
    })
    .join("\n")

const spaceLines = scaled("space", space)

const radiusLines = scaled("radius", radius)

/**
 * The Tailwind bridge, emitted into the same @theme block as the colors so a
 * mapping cannot be restated by hand somewhere the values do not live.
 *
 * `@theme inline` is what makes a scalar usable. Without it Tailwind writes
 * `--spacing` into :root, where the calc() resolves once against :root's own
 * scalars — a subtree that sets `--db-density-scalar` would inherit the already
 * -computed number and nothing would move. Inlined, the calc() lands in the
 * utility itself and resolves on the element, so the dial works wherever it is
 * set. It is also why the colors use `inline`: same reason, one level down.
 */
/**
 * The Tailwind key IS the class name, so a half step has to be written
 * `--spacing-0\.5`. The token behind it does not have to carry that escape:
 * `--db-space-0-5` stays readable from plain CSS, from StyleX or as a Figma
 * variable name. Asserted as B5 in `scripts/verify-spacing-scale.mjs`.
 */
const twKey = (step) => String(step).replace(".", "\\.")
const tokenStop = (step) => String(step).replace(".", "-")

/**
 * The shape roles. A role ALIASES a stop rather than restating its value, so a
 * corner is written down once and the density dial reaches the role through the
 * scale it points at rather than needing its own calc().
 *
 * This is the one dimensional family that is not a measurement, which is why it
 * does not go through `scaled()`: `shape-container` has no multiple of its own.
 * It is a decision about which multiple a card gets, and it is the layer a theme
 * reassigns without touching a component.
 */
const shapeRoleLines = (roles, byRole) =>
  roles.map((role) => `  ${PREFIX}shape-${role}: ${v(`radius-${tokenStop(byRole[role])}`)};`).join("\n")

const shapeLines = shapeRoleLines(Object.keys(shape ?? {}), base.shape)

/**
 * Roles mint their OWN utility rather than a key in Tailwind's radius namespace,
 * so the class and the token are the same word: `shape-container`, not
 * `rounded-container`. Bridging into `--radius-*` produced `rounded-square`,
 * which is a contradiction, and left the system with two words for one idea.
 * `type.css` already sets this precedent for the ramp.
 *
 * Sides are emitted because a drawer rounds one edge and a grouped control
 * squares one. Corner-level forms are not emitted until something needs them.
 */
const SHAPE_SIDES = {
  "": ["border-radius"],
  "t-": ["border-top-left-radius", "border-top-right-radius"],
  "r-": ["border-top-right-radius", "border-bottom-right-radius"],
  "b-": ["border-bottom-right-radius", "border-bottom-left-radius"],
  "l-": ["border-top-left-radius", "border-bottom-left-radius"],
}
const shapeUtilities = Object.keys(shape ?? {})
  .flatMap((role) =>
    Object.entries(SHAPE_SIDES).map(([side, props]) => {
      const body = props.map((p) => `  ${p}: ${v(`shape-${role}`)};`).join("\n")
      return `@utility shape-${side}${role} {\n${body}\n}`
    })
  )
  .join("\n")

/**
 * Keys removed outright, in a plain @theme block because `initial` is a
 * directive to the compiler rather than a value to inline.
 *
 * This is the safe half of a rename. The alternative — deleting the mapping and
 * letting the key fall back to Tailwind's own value — fails silently, because
 * Tailwind's radius scale disagrees with ours at every step. Closed, a name the
 * codemod missed emits no declaration, so the corner goes square and someone
 * sees it. Asserted as K9 in `scripts/verify-spacing-scale.mjs`.
 */
const closeLines = Object.entries(bridge ?? {})
  .flatMap(([ns, spec]) => (spec.close ?? []).map((step) => `  --${ns}-${step}: initial;`))
  .join("\n")

const bridgeLines = Object.entries(bridge ?? {})
  .flatMap(([ns, spec]) => {
    const out = []
    // The open-ended multiplier, where the namespace has one.
    if (spec.token) {
      const base = v(spec.token)
      out.push(`  --${ns}: ${spec.scalars?.length ? `calc(${[base, ...spec.scalars.map(v)].join(" * ")})` : base};`)
    }
    // A named step map, still used by radius until its stops are renamed.
    if (spec.steps && !Array.isArray(spec.steps)) {
      for (const [tw, own] of Object.entries(spec.steps)) out.push(`  --${ns}-${tw}: ${v(`${ns}-${own}`)};`)
      return out
    }
    // Numbered stops: the Tailwind step and the token stop are the same number.
    for (const step of spec.steps ?? []) out.push(`  --${ns}-${twKey(step)}: ${v(`${spec.family}-${tokenStop(step)}`)};`)
    // Tailwind's own `--default-*` keys, which back the utility written with no
    // step at all — a bare `border`. Not part of the namespace, so they are
    // declared by name rather than derived from it.
    for (const [key, step] of Object.entries(spec.defaults ?? {})) {
      out.push(`  --${key}: ${v(`${spec.family}-${tokenStop(step)}`)};`)
    }
    return out
  })
  .join("\n")

/** '"Figtree", -apple-system, sans-serif' → ["Figtree", "-apple-system", "sans-serif"] */
const splitFamily = (stack) =>
  stack.split(",").map((f) => f.trim().replace(/^["']|["']$/g, "")).filter(Boolean)

/** Every face any theme puts on one slot, default's stack first, deduped. */
const themeFamilies = (key) => [
  ...new Set(themeNames.flatMap((name) => splitFamily(effective(name).family[key]))),
]

/* ── Type: stops, not styles ─────────────────────────────────────────────────
 *
 * What ships is the three STOP families plus the two root faces — not one
 * property per style. Fourteen styles share nine sizes, seven line heights and
 * three trackings, so a per-style property emitted the same number under
 * fourteen names and made a context override fourteen edits instead of one.
 *
 * A stop carries its PLAIN value. The `--db-type-scalar` multiplication happens
 * in the utility body instead, and that placement is the fix for a real defect:
 * a calc() sitting in `:root` resolves once against `:root`'s own scalar, so a
 * subtree that set `--db-type-scalar` inherited an already-computed number and
 * nothing moved. Resolved on the element, the dial works wherever it is set —
 * the same reason `@theme inline` is what makes the density scalar work one
 * level down.
 *
 * It is also what makes contexts possible: a mode block swaps the plain stop
 * underneath, and every style reading that stop follows without the utility
 * changing at all.
 */
const stopFamilies = [
  ["font-size", type.stops.size],
  ["line-height", type.stops.line],
  // Named for the property rather than for `tracking`, so all three families
  // read `<css-property>-<stop>` and the CSS name says what it feeds.
  ["letter-spacing", type.stops.tracking],
]

const contexts = type.contexts
const DEFAULT_CONTEXT = type.defaultContext
if (!contexts.includes(DEFAULT_CONTEXT)) {
  throw new Error(`type.defaultContext "${DEFAULT_CONTEXT}" is not one of type.contexts (${contexts.join(", ")})`)
}

/** What one stop measures, in px, in a context. The px the config authored. */
const stopPx = (family, stop, context = DEFAULT_CONTEXT) => {
  const px = type.stops[family]?.[stop]?.[context]
  if (px === undefined) throw new Error(`type.stops.${family}.${stop} has no "${context}" value`)
  return px
}

/** Every stop declaration for one context, at a given indent. */
const stopLines = (context, pad = "  ") =>
  stopFamilies
    .map(([prop, stops]) =>
      Object.entries(stops)
        .map(([stop, byContext]) => {
          const px = byContext[context]
          if (px === undefined) throw new Error(`${prop}-${stop} has no value for context "${context}"`)
          return `${pad}${PREFIX}${prop}-${stop}: ${rem(px)};`
        })
        .join("\n"),
    )
    .join("\n")

/**
 * The two weights, which were the one type property with no token at all.
 *
 * Every other property a style carries already shipped as a stop — family, size,
 * line-height, tracking — and weight was inlined into each utility as a bare 400
 * or 600. That is why twelve components reach for `font-semibold`: there was
 * nothing to reach for, so the ramp was the only way to get a weight and the ramp
 * brings a size with it.
 *
 * Unitless, and not context-dependent. A weight is the same number at every type
 * context, which is why it sits here rather than in `stopLines`.
 */
const weightLines = Object.entries(type.weight)
  .map(([k, n]) => `  ${PREFIX}font-weight-${k}: ${n};`)
  .join("\n")

/** The two faces. A theme reassigns these; the stops below it never move. */
const familyLines = (keys, byKey) =>
  keys.map((key) => `  ${PREFIX}${FAMILY_VAR[key]}: ${byKey[key]};`).join("\n")

const typeLines = [
  familyLines(Object.keys(FAMILY_VAR), base.family),
  weightLines,
  stopLines(DEFAULT_CONTEXT),
].join("\n")

/**
 * One attribute block per context — the default included, since forcing
 * `desktop` back on inside a subtree that set `mobile` is a case a
 * default-only-in-`:root` emission cannot serve.
 *
 * No media block accompanies them, and that is the mechanism, not an omission.
 * A context is opt-in: the app declares one, and a document that declares
 * nothing keeps `:root`. See the reasoning in `theme.config.mjs` — a media query
 * inside an iframe measures the iframe, so every story canvas and preview embed
 * narrower than the threshold used to render the phone ramp on a desktop.
 *
 * The blocks come after `:root` and win at equal specificity on source order —
 * `[data-type-context="x"]` is one attribute selector against one pseudo-class,
 * so nothing but order separates them.
 *
 * Unprefixed by `:root` on purpose. The attribute then matches any element, and
 * the stops inherit, which is how one context renders inside the other — the
 * Tokens page shows the mobile ramp beside the desktop one on a desktop page.
 */
const contextBlocks = contexts
  .map((name) => `[${type.contextAttr}="${name}"] {\n${stopLines(name)}\n}`)
  .join("\n\n")

const sizeLines = scaled("size", size)

// Border width stays in px and is NOT run through `scaled()`. A 1px hairline is
// a rendering fact, not a proportion: at a 20px root it would become 1.25px and
// blur across a subpixel boundary. Rules and dividers should stay crisp when
// everything else grows — which is also why the stop number here counts px
// rather than units of the grid.
const borderLines = Object.entries(border)
  .map(([k, px]) => `  ${PREFIX}border-${k}: ${px}px;`)
  .join("\n")

/* Unitless, because z-index is a count rather than a measurement. No scalar and
 * no grid — a layer that moved with the density dial would be a bug, not a
 * feature. */
const layerLines = Object.entries(layer)
  .map(([k, n]) => `  ${PREFIX}layer-${k}: ${n};`)
  .join("\n")

/**
 * The animation roles, as Tailwind theme keys plus the keyframes they name.
 *
 * A plain `@theme` rather than `@theme inline`, so the `var()` references survive
 * into the declaration. Inlined, each role would freeze its duration and curve at
 * build time and the family above would stop reaching them.
 *
 * The keyframes are here rather than in the config because they are geometry, not
 * values: a theme retunes how long an entrance takes and on what curve, and it does
 * so by moving a duration stop. What actually travels is the same either way.
 *
 * `expand` reads a chain rather than one variable. A height animation needs its own
 * target height, which only the instance knows, so the consumer supplies it —
 * `--db-expand-height` for anything of ours, and the two library names after it so
 * the accordion keeps working without being rewritten. `auto` last, because a
 * keyframe that resolves to nothing animates to zero and the panel would collapse
 * on open.
 */
const KEYFRAMES = {
  "dbui-enter": `from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }`,
  "dbui-exit": `from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }`,
  "dbui-expand": `from { height: 0; }
    to { height: var(--db-expand-height, var(--radix-accordion-content-height, var(--accordion-panel-height, auto))); }`,
  "dbui-collapse": `from { height: var(--db-expand-height, var(--radix-accordion-content-height, var(--accordion-panel-height, auto))); }
    to { height: 0; }`,
  "dbui-loop": `from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }`,
}

const animationLines = Object.entries(motion.animation)
  .map(([role, a]) => {
    const parts = [a.keyframes, v(`duration-${a.duration}`), v(`ease-${a.easing}`)]
    if (a.repeat) parts.push(a.repeat)
    return `  --animate-${role}: ${parts.join(" ")};`
  })
  .join("\n")

const keyframeLines = Object.entries(motion.animation)
  .map(([, a]) => a.keyframes)
  .filter((name, i, all) => all.indexOf(name) === i)
  .map((name) => {
    const body = KEYFRAMES[name]
    if (!body) throw new Error(`animation names keyframes "${name}" with no body in KEYFRAMES`)
    return `  @keyframes ${name} {\n    ${body}\n  }`
  })
  .join("\n")

const motionLines = [
  ...Object.entries(motion.duration).map(([k, val]) => `  ${PREFIX}duration-${k}: ${val};`),
  ...Object.entries(motion.easing).map(([k, val]) => `  ${PREFIX}ease-${k}: ${val};`),
].join("\n")

// Elevation is the one dimensional family that ships per mode. It is not a
// color, so it cannot ride the semantics table, but a black shadow tuned for
// white draws nothing on a dark surface — so the stop name has to resolve to a
// different alpha under `.dark`, exactly as a semantic does.
const elevationModeLines = (stops, byStop, mode) =>
  stops.map((k) => `  ${PREFIX}elevation-${k}: ${byStop[k][mode]};`).join("\n")

const elevationLines = elevationModeLines(Object.keys(elevation), base.elevation, "light")
const elevationDarkLines = elevationModeLines(Object.keys(elevation), base.elevation, "dark")

const semanticModeLines = (tokens, byToken, mode) =>
  tokens.map((n) => `  ${varName(n)}: ${resolve(byToken[n][mode])};`).join("\n")

const lightSemantics = semanticModeLines(names, base.semantics, "light")
const darkSemantics = semanticModeLines(names, base.semantics, "dark")

/* ── the theme blocks ────────────────────────────────────────────────────────
 *
 * One pair per theme: the mode-independent declarations plus light, then dark.
 *
 * ## Why dark needs three selectors
 *
 * `.dark` and `[data-theme="x"]` are one class against one attribute — equal
 * specificity — so on `<html class="dark" data-theme="dubois">` the LATER of the
 * two wins outright. A theme block emitted after `.dark` would therefore paint
 * its light values straight over dark mode, and the two axes would compete
 * instead of composing. Every dark selector below is two compounds, which
 * out-specifies the theme's own light block and settles it by weight rather
 * than by source order:
 *
 *   .dark [data-theme="x"]    a themed subtree inside a dark document
 *   [data-theme="x"].dark     both on one element — the portal's case
 *   [data-theme="x"] .dark    a dark subtree inside a themed document
 *
 * ## Why every theme emits the same keys
 *
 * Including the default, and including keys it does not itself move. A block
 * has to RESET what a theme around it changed: `[data-theme="core"]` nested in a
 * DuBois document must put the pill back, and it can only do that by declaring
 * the role. Same reasoning as the type contexts emitting the default context.
 *
 * ## Why this can emit nothing
 *
 * If no theme moves anything, `themedCount` is 0 and the section is omitted
 * entirely — so a single-theme config produces the byte-identical tokens.css it
 * produced before the axis existed. The axis costs exactly what it is used for.
 */
const themeBlocks = !themedCount
  ? ""
  : themeNames
      .map((name) => {
        const eff = byTheme[name]
        const sel = `[${themeAttr}="${name}"]`
        const darkSel = [`.dark ${sel}`, `${sel}.dark`, `${sel} .dark`].join(",\n")
        const light = [
          themedFamilies.length && familyLines(themedFamilies, eff.family),
          themedShape.length && shapeRoleLines(themedShape, eff.shape),
          themedElevation.length && elevationModeLines(themedElevation, eff.elevation, "light"),
          themedSemantics.length && semanticModeLines(themedSemantics, eff.semantics, "light"),
        ].filter(Boolean)
        const dark = [
          themedElevation.length && elevationModeLines(themedElevation, eff.elevation, "dark"),
          themedSemantics.length && semanticModeLines(themedSemantics, eff.semantics, "dark"),
        ].filter(Boolean)
        const blocks = [`/* ── ${themes[name].label ?? name} ── */\n${sel} {\n${light.join("\n\n")}\n}`]
        if (dark.length) blocks.push(`${darkSel} {\n${dark.join("\n\n")}\n}`)
        return blocks.join("\n\n")
      })
      .join("\n\n")

const themeSection = !themedCount
  ? ""
  : `
/* ══════════════════════════════════════════════════════════════════════════
 * THEMES — the same token names at another set of values.
 *
 * ${themeNames.length} themes over ${themedCount} token${themedCount === 1 ? "" : "s"}. Only what a theme moves is restated, and
 * every theme restates the same set so a nested block can reset the one around
 * it. "${themes[defaultTheme].label ?? defaultTheme}" is also in :root above, so a product that imports this file
 * and sets no attribute still gets a complete system.
 *
 * A theme activates on ${themeAttr}, unprefixed by :root, so it matches any
 * element and the values inherit — which is what lets two themes render side by
 * side in one page. Mode composes rather than competes: the dark selectors are
 * two compounds each so they out-specify the theme's own light block.
 *
 * Names never vary here, only values. The generator throws on a theme that
 * declares a name the base does not.
 * ══════════════════════════════════════════════════════════════════════════ */
${themeBlocks}
`

const css = `/* ─────────────────────────────────────────────────────────────────────────────
 * DBUI tokens — GENERATED. Do not hand-edit.
 * Source: packages/dbui/src/tokens/theme.config.mjs
 * Regenerate: yarn design:tokens  (node scripts/design-lint/generate-tokens.mjs)
 *
 * Semantics only. Primitives are resolved inline (final hex/rgba) and are NOT
 * shipped as CSS vars — the palette lives in theme.config.mjs + Figma. Product
 * code consumes semantics via Tailwind utilities (bg-surface-base) or the raw
 * ${PREFIX}* var.
 *
 * Dimensions — space, size, radius, border — is the collection. Each family
 * computes its own stops from the grid unit and the density scalar; none reads
 * another, and the scale they agree on is an authoring artifact in Figma and in
 * theme.config.mjs rather than a custom property. Border is the exception that
 * proves it: literal px, never multiplied, because a hairline is a rendering
 * fact. Type is on its own scalar so text and layout move independently.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Keys this system does not have a step for. Removed rather than left to fall
 * back, so a stale class name emits nothing instead of Tailwind's disagreeing
 * value. Not inlined — "initial" is a compiler directive, not a value. */
@theme {
${closeLines}
}

@theme inline {
${theme}

  /* ── Tailwind bridge — the namespaces DBUI tokens stand behind ── */
${bridgeLines}

}

/* ── Animation roles — keyframes plus a duration plus a curve, which is what a
   thing arriving needs and a transition cannot give it. Deliberately not inlined:
   these keep their var() references so the motion family still reaches them. ── */
@theme {
${animationLines}

${keyframeLines}
}

/* ── Shape roles — one utility per decision, named exactly like its token.
   A corner with no shape class is square, which is the system default. ── */
${shapeUtilities}

:root {
  /* ── Scalars — the density/size/type dials ── */
${scalarLines}

  /* ── Space — padding, margin, gap. Each stop is its multiple of the grid
     unit, scaled by density. ── */
${spaceLines}

  /* ── Radius (its own stops on the same grid; "full" is a pill sentinel) ── */
${radiusLines}

  /* ── Shape — the corner ROLES. A measurement above, a decision here. These are
     what components bind, and the only dimensional layer a theme reassigns. ── */
${shapeLines}

  /* ── Type — the two faces and the three stop families, in the default
     context. A style names a stop; the stop holds the value. The type scalar is
     applied in the utility body, not here, so it resolves on the element. ── */
${typeLines}

  /* ── Size (width and height; its own stops on the same grid) ── */
${sizeLines}

  /* ── Border width (literal px, outside the scale, never touched by density) ── */
${borderLines}

  /* ── Layer — the stacking order, named by what a thing is. Unitless, and the
     one family the density dial must not touch. ── */
${layerLines}

  /* ── Motion — durations, and one curve per job: linear for anything that
     loops, standard to arrive, exit to leave ── */
${motionLines}

  /* ── Elevation ── */
${elevationLines}

  /* ══════════════════════════════════════════════════════════════════════════
   * SEMANTICS — LIGHT. Consume these (or their Tailwind utilities) in product code.
   * ══════════════════════════════════════════════════════════════════════════ */
${lightSemantics}
}

.dark {
  /* ── Elevation — same geometry as light, heavier alpha. ── */
${elevationDarkLines}

  /* ══════════════════════════════════════════════════════════════════════════
   * SEMANTICS — DARK.
   * ══════════════════════════════════════════════════════════════════════════ */
${darkSemantics}
}

/* ══════════════════════════════════════════════════════════════════════════
 * TYPE CONTEXTS — the same stops at other values.
 *
 * Only the stops move. The 14 style names, their weights, faces and cases are
 * context-independent, so nothing below repeats a style.
 *
 * Opt-in only. A context activates when something sets the attribute, never
 * from the viewport, and these blocks follow the :root declarations so they win
 * at equal specificity on source order. A document that sets nothing gets the
 * default at every width.
 * ══════════════════════════════════════════════════════════════════════════ */
${contextBlocks}
${themeSection}`

fs.writeFileSync(TOKENS_CSS, css)

// ── type.css (the ramp as Tailwind utilities) ─────────────────────────────────
// Emitted rather than hand-written so the utilities cannot drift from the ramp.
// Prefixed `type-` rather than `text-` on purpose: Tailwind's `text-` is already
// overloaded for color, so `text-text-subtle` (a color) sitting beside a
// size named `text-text` would be genuinely ambiguous. `type-*` keeps the two
// axes legible — `class="type-paragraph text-text-subtle"` reads correctly.
/**
 * The utility is where the style is assembled: a stop reference for each of the
 * three measured properties, and a literal for the three that do not measure
 * anything.
 *
 * Every declaration is present on every style, including the ones with nothing
 * to say, because `letter-spacing` and `text-transform` INHERIT. Emitting them
 * only where they are non-default is how a `type-label` nested inside a
 * `type-title-1` kept the title's tighter tracking and how one inside a
 * `type-eyebrow` rendered in caps — the class stops being the whole style the
 * moment it sits inside another. A zero needs no stop and no scalar, so it is
 * written literally.
 *
 * The scalar multiplication lives here rather than in the stop, so it resolves
 * on the element. That is what makes `--db-type-scalar` work on a subtree, and
 * it is what leaves the stop free to be swapped by a context.
 */
/** 600 -> "bold", so a style's weight can name the token the ramp defines. */
const WEIGHT_NAME_BY_VALUE = Object.fromEntries(
  Object.entries(type.weight).map(([name, value]) => [value, name]),
)

const stopCalc = (prop, stop) => `calc(${v(`${prop}-${stop}`)} * ${v("type-scalar")})`

const typeUtilities = Object.entries(type.scale)
  .map(([k, s]) => {
    const lines = [
      `  font-family: ${v(s.family === "mono" ? "mono-font-family" : "font-family")};`,
      `  font-size: ${stopCalc("font-size", s.size)};`,
      `  line-height: ${stopCalc("line-height", s.line)};`,
      `  letter-spacing: ${s.tracking ? stopCalc("letter-spacing", s.tracking) : "0"};`,
      // The token, not the number. A weight family nothing read would be the same
      // defect the elevation family had for months: authored, generated,
      // documented, and every call site rendering from a literal instead.
      `  font-weight: ${v(`font-weight-${WEIGHT_NAME_BY_VALUE[s.weight ?? type.weight.normal]}`)};`,
      // Eyebrow carries its caps in the style, so no call site retypes it.
      `  text-transform: ${s.transform ?? "none"};`,
    ]
    return `@utility type-${k} {\n${lines.join("\n")}\n}`
  })
  .join("\n\n")

fs.writeFileSync(
  TYPE_CSS,
  `/* ─────────────────────────────────────────────────────────────────────────────
 * DBUI type ramp as utilities — GENERATED. Do not hand-edit.
 * Source: packages/dbui/src/tokens/theme.config.mjs
 * Regenerate: yarn design:tokens
 *
 * Each utility is the WHOLE style — family, size, line-height, tracking, weight
 * and case. Never pair one with \`leading-*\` or \`font-*\`.
 *
 * Size, line-height and tracking read a STOP, so the active type context
 * decides what they measure and the same class serves every context. The
 * \`--db-type-scalar\` multiplication is here rather than on the stop so it
 * resolves on the element, which is what lets a subtree set it.
 *
 * Tracking and case are declared on every style, including the ones with
 * nothing to say, because both inherit: a style nested inside another has to
 * clear what it did not ask for.
 * ───────────────────────────────────────────────────────────────────────────── */

${typeUtilities}
`
)

/* ── tokens.json (linter allowlist) ─────────────────────────────────────────
 *
 * The previous file is deliberately not read. Reading it is how an allowlist
 * outlives the scale it describes: every run copied the last run's `spacing`
 * and `radius` forward, so the linter went on approving 6, 10 and 14 long after
 * the families stopped carrying them. Everything below comes from the config or
 * from globals.css. */
const globalsCss = fs.readFileSync(GLOBALS_CSS, "utf-8")

const hexes = new Set()
const alphas = new Set()

// config primitives → allowlist hexes
for (const fam of Object.values(primitives)) {
  for (const ramp of Object.values(fam)) {
    if (typeof ramp === "string") hexes.add(ramp.toUpperCase())
    else for (const hex of Object.values(ramp)) hexes.add(hex.toUpperCase())
  }
}
/* config semantics → resolved solid hexes / alphas, across EVERY theme.
 *
 * The union rather than the default's set, because the linter reads this as
 * "which colors are approved" and a themed value is as approved as a base one.
 * Scoped to the default theme, a hex only DuBois resolves to would read as a
 * violation the moment someone pasted it — the rule would be reporting the
 * system against itself. */
for (const themeName of themeNames) {
  const themed = effective(themeName).semantics
  for (const n of names) {
    for (const mode of ["light", "dark"]) {
      const value = themed[n][mode]
      if (isAlpha(value)) alphas.add(resolve(value))
      else hexes.add(resolve(value))
    }
  }
}
// legacy globals.css hexes/alphas so not-yet-migrated components keep passing
for (const m of globalsCss.matchAll(/#([0-9a-fA-F]{6})\b/g)) hexes.add("#" + m[1].toUpperCase())
for (const m of globalsCss.matchAll(/rgba\(\s*[^)]+\)/g)) alphas.add(m[0].replace(/\s+/g, " ").trim())

// primitives map (documentation for the no-primitive-token rule)
const primMap = {}
for (const [famName, fam] of Object.entries(primitives)) {
  if (famName === "base") continue
  for (const [rampName, ramp] of Object.entries(fam)) {
    primMap[`${famName}-${rampName}`] = Object.fromEntries(
      Object.entries(ramp).map(([step, hex]) => [step, hex.toUpperCase()]),
    )
  }
}

/* ── the deleted legacy layer ───────────────────────────────────────────────
 *
 * Every shadcn-flat color name globals.css used to declare. They are gone, so a
 * class built from one now resolves to nothing and the property drops silently
 * — worse than a wrong value, because the element still renders and only the
 * color is missing.
 *
 * This is the one list here that cannot be derived, because it describes what
 * the source no longer contains. It lives beside the generator that deleted
 * them, is filtered against what actually shipped, and is emitted into
 * tokens.json so the linters and the migration audit read one copy rather than
 * three. It only ever shrinks.
 */
const LEGACY_COLOR_NAMES = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "primary-hover", "primary-press",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground",
  "destructive-hover", "destructive-press", "warning", "warning-foreground",
  "success", "success-foreground", "border", "input", "ring", "border-accessible",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "hover", "press", "active", "disabled", "disabled-foreground",
  "overlay", "code-background", "skeleton",
  "surface-info", "surface-success", "surface-warning", "surface-danger",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-accent", "sidebar-border", "sidebar-ring",
]
/**
 * A name that came back is not dead, whichever family took it.
 *
 * `names` catches a name reclaimed as a color semantic. The second list catches one
 * reclaimed by elevation, and it is not hypothetical: `shadow` accepts a color in
 * Tailwind, so the linter's legacy rule pairs every color prefix with every dead
 * name — and the moment elevation's stops became roles, `shadow-popover` matched a
 * `popover` that died in the shadcn migration. Nine shipped components were
 * reported as naming a deleted token while the token was declared two files away.
 *
 * Elevation is the only non-color family bridged onto a color-capable prefix today.
 * `z-*`, `rounded-*`, `animate-*` and `ease-*` cannot collide, so subtracting those
 * would only blunt the rule.
 */
const RECLAIMED_BY_ELEVATION = bridge.shadow?.steps ?? []
const deletedLegacy = LEGACY_COLOR_NAMES.filter(
  (n) => !names.includes(n) && !RECLAIMED_BY_ELEVATION.includes(n),
)

// semantic token names grouped by first segment
const semGroups = {}
for (const n of names) {
  const group = n.split("-")[0]
  ;(semGroups[group] ||= []).push(n)
}
for (const g of Object.keys(semGroups)) semGroups[g].sort()

/* ── dimensions ────────────────────────────────────────────────────────────
 *
 * The four families as the linter needs to read them: which Tailwind step is
 * legal, what it renders at, and which utilities route through it.
 *
 * These used to be copied forward from whatever the previous tokens.json held,
 * which meant the allowlist described a scale that had not existed since the
 * families were cut to nine stops. Derived, it cannot fall behind again.
 *
 * `reaches` is the one part that is not derivable from the config, because it
 * is a fact about Tailwind rather than about us: a namespace backs a fixed set
 * of utilities. Each list is asserted in scripts/verify-spacing-scale.mjs, and
 * the assertion IDs are named on the family so a reader can check rather than
 * trust. The notable asymmetry is that `--height-*` reaches min-h and max-h
 * while `--width-*` reaches neither min-w nor max-w (F7, F11, K5).
 */
const GRID_PX = parseFloat(scalars["spacing-unit"])

const familyOf = (stops, unitPx) =>
  Object.entries(stops)
    .map(([stop, mult]) => ({
      // The token stop spells a half step `0-5`; the Tailwind class spells it
      // `0.5`. The linter reads class names, so it wants the Tailwind spelling.
      step: typeof mult === "string" ? stop : Number(String(stop).replace("-", ".")),
      px: typeof mult === "string" ? parseFloat(mult) : mult * unitPx,
    }))
    .sort((a, b) => (typeof a.step === "string") - (typeof b.step === "string") || a.px - b.px)

const dimensionFamily = (stops, unitPx, reaches, asserts) => {
  const rows = familyOf(stops, unitPx)
  const numeric = rows.filter((r) => typeof r.step === "number")
  return {
    unitPx,
    steps: rows.map((r) => r.step),
    px: rows.map((r) => r.px),
    // A family carries a stop when it has a use for it, so a value outside the
    // range is not a decision this family refused — it is one it never made.
    // The linter only judges what falls between the ends.
    range: [numeric[0].px, numeric[numeric.length - 1].px],
    reaches,
    $asserts: asserts,
  }
}

const out = {
  $comment:
    "Canonical DBUI design tokens. Auto-generated by scripts/design-lint/generate-tokens.mjs from theme.config.mjs (+ legacy hexes from globals.css). Do not hand-edit.",
  $source: "packages/dbui/src/tokens/theme.config.mjs (single source) → tokens.css + tokens.json.",
  colors: {
    $comment:
      "colors.light is the approved-hex allowlist read by both linters (config primitives + resolved semantics + legacy globals.css hexes). `alpha` holds approved rgba() strings. `primitives` + `semanticTokens` power the token-compliance rules. Primitives ship in NO CSS — they're generator input only.",
    light: [...hexes].sort(),
    dark: [],
    alpha: [...alphas].sort(),
    primitives: primMap,
    semanticTokens: semGroups,
    deletedLegacy: [...deletedLegacy].sort(),
  },
  dimensions: {
    $comment:
      "The four dimensional families, derived from theme.config.mjs. `steps` are the Tailwind class steps, `px` what each renders at a 16px root with every scalar at its default, `range` the ends the family declares, and `reaches` the utility prefixes that route through it.",
    space: dimensionFamily(space, GRID_PX, [
      "p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe",
      "m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me",
      "gap", "gap-x", "gap-y", "space-x", "space-y",
      "inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end",
      // Unbridged: --width-* does not reach these two, so they ride Tailwind's
      // multiplier and land on the spacing key rather than on a size stop.
      "min-w", "max-w",
    ], "K1, K13, F9"),
    size: dimensionFamily(size, GRID_PX, ["size", "w", "h", "min-h", "max-h"], "F7, F8, K5, K13"),
    radius: dimensionFamily(radius, GRID_PX, [
      "rounded", "rounded-t", "rounded-r", "rounded-b", "rounded-l",
      "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br",
      "rounded-s", "rounded-e", "rounded-ss", "rounded-se", "rounded-es", "rounded-ee",
    ], "K9"),
    // Border's unit is 1px, not the grid step — a hairline is a rendering fact
    // rather than a proportion, so --db-border-1 is 1px and not 4px.
    border: dimensionFamily(border, 1, [
      "border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y",
      "divide-x", "divide-y", "ring", "ring-offset", "outline",
    ], "I2"),
    /* The role layer, and the one family whose steps are words rather than
     * multiples. It is emitted separately from `radius` because the two answer
     * different questions: `radius` is the set of corners that exist, `shape` is
     * which of them a kind of object gets. A linter that only knows `radius`
     * can say 8px is a legal corner and cannot say a dialog should have asked
     * for `shape-container` instead.
     *
     * `aliases` is what makes the role checkable in both directions: it maps
     * each role to the radius stop it points at, so a rule can resolve
     * `shape-container` to its px, and can also see that `rounded-2` is a
     * measurement written where a role exists.
     *
     * No `range`. A role set is closed by enumeration rather than by ends —
     * there is no value "between" container and pill — so the membership test
     * is the whole test. */
    shape: {
      $comment:
        "Corner ROLES, from theme.config.mjs `shape`. Steps are role names, `px` what each renders at a 16px root, and `aliases` the radius stop each role points at. Components bind the role; `radius` remains the measurement it resolves to.",
      steps: Object.keys(shape ?? {}),
      px: Object.values(shape ?? {}).map((stop) =>
        typeof stop === "string" ? parseFloat(radius[stop]) : radius[stop] * GRID_PX
      ),
      aliases: Object.fromEntries(Object.entries(shape ?? {}).map(([role, stop]) => [role, stop])),
      reaches: ["shape", "shape-t", "shape-r", "shape-b", "shape-l"],
      $asserts: "K9",
    },
  },
  // Derived from theme.config.mjs so the linter's allowlist cannot fall behind
  // the shipped families. `legacy` stays allowed until every component stops
  // declaring SF Pro; drop it from the config once that migration lands.
  /* Unioned across themes for the same reason the hexes are: a face only DuBois
   * declares is still an approved face, and a linter scoped to the default
   * would report the theme as non-standard. `sans` and `display` share a stack
   * because the system has one text face per theme, not two. */
  fonts: {
    $comment:
      "Approved font families, generated from theme.config.mjs `type.family` across every theme (+ `type.legacy` during migration). Anything else is non-standard.",
    sans: themeFamilies("text"),
    display: themeFamilies("text"),
    mono: themeFamilies("mono"),
    legacy: type.legacy ?? {},
  },
  /* The theme axis, so the CLI, the MCP server and the portal read one
   * description of it rather than three. `overrides` is the diff a theme
   * declares — the answer to "what does this theme actually do?" without
   * diffing 85 values — and it is the same set every theme emits into CSS. */
  themes: {
    $comment:
      "The aesthetics the component library renders in. A theme varies VALUES, never NAMES — the generator throws on a theme that declares a name the base lacks. `attribute` activates one on any element; `default` is additionally in :root. Mode (.dark) and the density/type dials compose with a theme rather than belonging to one.",
    attribute: themeAttr,
    default: defaultTheme,
    themed: {
      semantics: themedSemantics,
      shape: themedShape,
      family: themedFamilies,
      elevation: themedElevation,
    },
    list: Object.fromEntries(
      themeNames.map((name) => {
        const t = themes[name]
        const eff = effective(name)
        const o = overridesOf(t)
        return [
          name,
          {
            label: t.label ?? name,
            description: t.description ?? "",
            isDefault: name === defaultTheme,
            overrides: {
              semantics: Object.fromEntries(
                Object.keys(o.semantics).map((n) => [
                  n,
                  { light: resolve(eff.semantics[n].light), dark: resolve(eff.semantics[n].dark) },
                ]),
              ),
              shape: Object.fromEntries(
                Object.keys(o.shape).map((role) => [
                  role,
                  {
                    stop: eff.shape[role],
                    px: typeof eff.shape[role] === "string"
                      ? parseFloat(radius[eff.shape[role]])
                      : radius[eff.shape[role]] * GRID_PX,
                  },
                ]),
              ),
              family: Object.fromEntries(
                Object.keys(o.family).map((key) => [key, splitFamily(eff.family[key])]),
              ),
              elevation: Object.fromEntries(
                Object.keys(o.elevation).map((stop) => [stop, eff.elevation[stop]]),
              ),
            },
          },
        ]
      }),
    ),
  },
  /* One role-named ramp; `ramp` stays the linter's allowed size/line set.
   *
   * Spread from the config and nothing else. It used to spread the previous
   * file first, which kept a `reading` group alive — 16/26 and 14/24, sizes no
   * step has carried since the ramp was rewritten.
   *
   * `scale` and `ramp` are RESOLVED TO PX, in the default context, even though
   * the config now names stops. That is deliberate: five linter rules read
   * `ramp[].size` and `ramp[].line` as numbers to decide whether a `text-[13px]`
   * literal is on the ramp, and the Figma linter serializes the same three
   * fields into its runtime. Handing them stop names would not fail — it would
   * compare a number against a string, match nothing, and go quiet, which is
   * exactly the failure `verify-rules` exists to catch.
   *
   * Only the default context is offered as the allowlist. A second context adds
   * legal px values, and admitting them would let more literals through the very
   * rules that exist to stop literals — the point is that a call site names the
   * utility, so no context's numbers should be spellable. `contexts` below
   * carries the other sets for anything that needs to read them. */
  type: {
    $comment:
      "The type ramp as the linter reads it. `size`/`line` are px anchors in the default context, before --db-type-scalar. Only these combinations are approved, and each is the whole style — a call site names the utility, never the numbers. `contexts` holds the per-context stop values; `ramp` intentionally lists only the default so no context's numbers become spellable.",
    scale: Object.fromEntries(
      Object.entries(type.scale).map(([name, s]) => [
        name,
        {
          size: stopPx("size", s.size),
          line: stopPx("line", s.line),
          tracking: s.tracking ? stopPx("tracking", s.tracking) : 0,
          weight: s.weight ?? type.weight.normal,
          family: s.family ?? "text",
          ...(s.transform ? { transform: s.transform } : {}),
        },
      ]),
    ),
    ramp: Object.entries(type.scale).map(([name, s]) => ({
      name,
      utility: `type-${name}`,
      size: stopPx("size", s.size),
      line: stopPx("line", s.line),
      weight: s.weight ?? type.weight.normal,
      family: s.family ?? "text",
      transform: s.transform ?? "none",
    })),
    // What a style is made of, so a reader can see the sharing the px table
    // flattens away: `label` and `body` are one size stop and two line stops.
    stops: Object.fromEntries(
      Object.entries(type.scale).map(([name, s]) => [
        name,
        { size: s.size, line: s.line, tracking: s.tracking ?? null },
      ]),
    ),
    // A context activates only when something sets `attribute`. There is no
    // query field because there is no viewport trigger — `defaultContext` is
    // what a document that sets nothing renders, at every width.
    attribute: type.contextAttr,
    defaultContext: DEFAULT_CONTEXT,
    contexts: Object.fromEntries(
      contexts.map((context) => [
        context,
        {
          size: Object.fromEntries(Object.entries(type.stops.size).map(([k, byCtx]) => [k, byCtx[context]])),
          line: Object.fromEntries(Object.entries(type.stops.line).map(([k, byCtx]) => [k, byCtx[context]])),
          tracking: Object.fromEntries(Object.entries(type.stops.tracking).map(([k, byCtx]) => [k, byCtx[context]])),
          ramp: Object.entries(type.scale).map(([name, s]) => ({
            name,
            size: stopPx("size", s.size, context),
            line: stopPx("line", s.line, context),
          })),
        },
      ]),
    ),
  },
}

fs.writeFileSync(TOKENS_JSON, JSON.stringify(out, null, 2) + "\n")

// ── summary ────────────────────────────────────────────────────────────────
const primCount = Object.values(primMap).reduce((n, r) => n + Object.keys(r).length, 0) + 2 // + base pair
const alphaSem = names.filter((n) => isAlpha(semantics[n].light) || isAlpha(semantics[n].dark)).length
const typeProps = 2 + stopFamilies.reduce((n, [, stops]) => n + Object.keys(stops).length, 0)
console.log(`tokens.css   : ${names.length} semantics (light + dark), ${Object.keys(space).length} space, ${Object.keys(radius).length} radius, ${Object.keys(elevation).length} elevation.`)
console.log(`themes       : ${themeNames.length} (${themeNames.join(", ")}; ${defaultTheme} in :root) over ${themedCount} themed token${themedCount === 1 ? "" : "s"} — ${themedSemantics.length} semantic, ${themedShape.length} shape, ${themedFamilies.length} face, ${themedElevation.length} elevation.`)
console.log(`type         : ${Object.keys(type.scale).length} styles over ${typeProps} properties (2 faces + ${stopFamilies.map(([, s]) => Object.keys(s).length).join(" + ")} stops), ${contexts.length} contexts (${contexts.join(", ")}, ${DEFAULT_CONTEXT} in :root, attribute-only).`)
console.log(`tokens.json  : ${hexes.size} hex, ${alphas.size} alpha, ${primCount} primitives, ${names.length} semantic tokens (${alphaSem} carry alpha).`)
console.log(`Primitives shipped as CSS vars: 0 (resolved inline — generator input only).`)
