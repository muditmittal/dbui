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
 *        • .dark  — DARK semantics
 *      Primitives are resolved INLINE (semantics carry final hex/rgba). They are
 *      NOT shipped as CSS vars — they're generator input only.
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

const { meta, primitives, semantics, scalars, space, radius, bridge, size, border, type, elevation, motion } = cfg
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
 * semantics only — the same split colour already makes, where the palette
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

const typeLines = [
  `  ${PREFIX}font-family: ${type.family.text};`,
  `  ${PREFIX}mono-font-family: ${type.family.mono};`,
  // size, line-height AND tracking all scale together via --db-type-scalar.
  // Weight and family are fixed — they are what the style *is*, not how big it is.
  ...Object.entries(type.scale).flatMap(([k, s]) => [
    `  ${PREFIX}font-size-${k}: calc(${rem(s.size)} * ${v("type-scalar")});`,
    `  ${PREFIX}line-height-${k}: calc(${rem(s.line)} * ${v("type-scalar")});`,
    `  ${PREFIX}letter-spacing-${k}: calc(${rem(s.tracking)} * ${v("type-scalar")});`,
    `  ${PREFIX}font-weight-${k}: ${s.weight ?? type.weight.normal};`,
    `  ${PREFIX}font-family-${k}: ${v(s.family === "mono" ? "mono-font-family" : "font-family")};`,
  ]),
  `  ${PREFIX}font-weight: ${type.weight.normal};`,
  `  ${PREFIX}font-weight-bold: ${type.weight.bold};`,
].join("\n")

const sizeLines = scaled("size", size)

// Border width stays in px and is NOT run through `scaled()`. A 1px hairline is
// a rendering fact, not a proportion: at a 20px root it would become 1.25px and
// blur across a subpixel boundary. Rules and dividers should stay crisp when
// everything else grows — which is also why the stop number here counts px
// rather than units of the grid.
const borderLines = Object.entries(border)
  .map(([k, px]) => `  ${PREFIX}border-${k}: ${px}px;`)
  .join("\n")

const motionLines = [
  ...Object.entries(motion.duration).map(([k, val]) => `  ${PREFIX}duration-${k}: ${val};`),
  ...Object.entries(motion.easing).map(([k, val]) => `  ${PREFIX}ease-${k}: ${val};`),
].join("\n")

const elevationLines = Object.entries(elevation)
  .map(([k, v]) => `  ${PREFIX}elevation-${k}: ${v};`)
  .join("\n")

const lightSemantics = names.map((n) => `  ${varName(n)}: ${resolve(semantics[n].light)};`).join("\n")
const darkSemantics = names.map((n) => `  ${varName(n)}: ${resolve(semantics[n].dark)};`).join("\n")

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

:root {
  /* ── Scalars — the density/size/type dials ── */
${scalarLines}

  /* ── Space — padding, margin, gap. Each stop is its multiple of the grid
     unit, scaled by density. ── */
${spaceLines}

  /* ── Radius (its own stops on the same grid; "full" is a pill sentinel) ── */
${radiusLines}

  /* ── Type (anchored ramp, scaled together by type-scalar) ── */
${typeLines}

  /* ── Size (width and height; its own stops on the same grid) ── */
${sizeLines}

  /* ── Border width (literal px, outside the scale, never touched by density) ── */
${borderLines}

  /* ── Motion (three durations, one easing curve for the whole system) ── */
${motionLines}

  /* ── Elevation ── */
${elevationLines}

  /* ══════════════════════════════════════════════════════════════════════════
   * SEMANTICS — LIGHT. Consume these (or their Tailwind utilities) in product code.
   * ══════════════════════════════════════════════════════════════════════════ */
${lightSemantics}
}

.dark {
  /* ══════════════════════════════════════════════════════════════════════════
   * SEMANTICS — DARK.
   * ══════════════════════════════════════════════════════════════════════════ */
${darkSemantics}
}
`

fs.writeFileSync(TOKENS_CSS, css)

// ── type.css (the ramp as Tailwind utilities) ─────────────────────────────────
// Emitted rather than hand-written so the utilities cannot drift from the ramp.
// Prefixed `type-` rather than `text-` on purpose: Tailwind's `text-` is already
// overloaded for color, so `text-text-subtle` (a color) sitting beside a
// size named `text-text` would be genuinely ambiguous. `type-*` keeps the two
// axes legible — `class="type-paragraph text-text-subtle"` reads correctly.
const typeUtilities = Object.entries(type.scale)
  .map(([k, s]) => {
    const lines = [
      `  font-family: ${v(s.family === "mono" ? "mono-font-family" : "font-family")};`,
      `  font-size: ${v(`font-size-${k}`)};`,
      `  line-height: ${v(`line-height-${k}`)};`,
      `  letter-spacing: ${v(`letter-spacing-${k}`)};`,
      `  font-weight: ${v(`font-weight-${k}`)};`,
    ]
    // Eyebrow carries its caps in the style, so no call site retypes it.
    if (s.transform) lines.push(`  text-transform: ${s.transform};`)
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
 * and numeric variant. Never pair one with \`leading-*\` or \`font-*\`.
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
// config semantics → resolved solid hexes / alphas
for (const n of names) {
  for (const mode of ["light", "dark"]) {
    const v = semantics[n][mode]
    if (isAlpha(v)) alphas.add(resolve(v))
    else hexes.add(resolve(v))
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
 * colour is missing.
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
// A name that came back as a semantic is not dead. Nothing is on both lists
// today, but the filter is what stops a future rename from being reported as
// drift the moment it lands.
const deletedLegacy = LEGACY_COLOR_NAMES.filter((n) => !names.includes(n))

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
  },
  // Derived from theme.config.mjs so the linter's allowlist cannot fall behind
  // the shipped families. `legacy` stays allowed until every component stops
  // declaring SF Pro; drop it from the config once that migration lands.
  fonts: {
    $comment:
      "Approved font families, generated from theme.config.mjs `type.family` (+ `type.legacy` during migration). Anything else is non-standard.",
    sans: splitFamily(type.family.text),
    display: splitFamily(type.family.text),
    mono: splitFamily(type.family.mono),
    legacy: type.legacy ?? {},
  },
  /* One role-named ramp; `ramp` stays the linter's allowed size/line set.
   *
   * Spread from the config and nothing else. It used to spread the previous
   * file first, which kept a `reading` group alive — 16/26 and 14/24, sizes no
   * step has carried since the ramp was rewritten. */
  type: {
    $comment:
      "The type ramp as the linter reads it. `size`/`line` are px anchors before --db-type-scalar. Only these combinations are approved, and each is the whole style — a call site names the utility, never the numbers.",
    scale: type.scale,
    ramp: Object.entries(type.scale).map(([name, s]) => ({
      name,
      utility: `type-${name}`,
      size: s.size,
      line: s.line,
      weight: s.weight ?? type.weight.normal,
      family: s.family ?? "text",
      transform: s.transform ?? "none",
    })),
  },
}

fs.writeFileSync(TOKENS_JSON, JSON.stringify(out, null, 2) + "\n")

// ── summary ────────────────────────────────────────────────────────────────
const primCount = Object.values(primMap).reduce((n, r) => n + Object.keys(r).length, 0) + 2 // + base pair
const alphaSem = names.filter((n) => isAlpha(semantics[n].light) || isAlpha(semantics[n].dark)).length
console.log(`tokens.css   : ${names.length} semantics (light + dark), ${Object.keys(space).length} space, ${Object.keys(radius).length} radius, ${Object.keys(type.scale).length} type steps (size+line+tracking, scalar-tied), ${Object.keys(elevation).length} elevation.`)
console.log(`tokens.json  : ${hexes.size} hex, ${alphas.size} alpha, ${primCount} primitives, ${names.length} semantic tokens (${alphaSem} carry alpha).`)
console.log(`Primitives shipped as CSS vars: 0 (resolved inline — generator input only).`)
