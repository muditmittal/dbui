#!/usr/bin/env node
/**
 * Emits the data behind the Tokens page.
 *
 * Parsed out of the generated tokens.css rather than the config, so the page
 * shows exactly what ships — including resolved light and dark values. Run
 * after `generate-tokens.mjs`.
 *
 *   node scripts/generate-token-data.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { declarations, resolvePx } from "./token-values.mjs"
// The one thing read from the config rather than the shipped CSS, and it has to
// be: a semantic's primitive is resolved away by the generator, so `tokens.css`
// holds `#FFFFFF` with no record that it came from `base.white`. Everything else
// on this page is read back out of what ships, which is why a value here cannot
// drift from a value there — this field is the exception and names its source.
import { semantics, themes, themeAttr, defaultTheme } from "../packages/dbui/src/tokens/theme.config.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const TOKENS_CSS = path.join(ROOT, "packages/dbui/src/tokens/tokens.css")
const TYPE_CSS = path.join(ROOT, "packages/dbui/src/tokens/type.css")
const OUT = path.join(ROOT, "apps/portal/src/stories/tokens/token-data.ts")
/* The theme roster ships as its own module rather than as another export of
 * token-data. The footer's theme picker renders on every route and token-data is
 * 3,500 lines of every value in the system, so importing it there would put the
 * whole Tokens page in the bundle of every page to read four names. */
const THEMES_OUT = path.join(ROOT, "apps/portal/src/stories/tokens/theme-data.ts")

const css = fs.readFileSync(TOKENS_CSS, "utf8")
const typeCss = fs.readFileSync(TYPE_CSS, "utf8")

/** Keyed by the full property name, which is what the resolver substitutes. */
const declared = declarations(css, ":root")

/** The same pairs with the prefix dropped, which is how the page names a token. */
const unprefixed = (source, selector) =>
  Object.fromEntries(
    Object.entries(declarations(source, selector)).map(([k, v]) => [k.replace("--db-", ""), v]),
  )

const light = unprefixed(css, ":root")
const dark = unprefixed(css, ".dark")

/**
 * The four families the semantic color layer is organized into, each answering
 * "what does this color". `theme.config.mjs` holds the same split in its
 * section structure and `docs/token-rules.md` holds the contract; this list is
 * the page's copy of the grouping, not of the reasoning.
 *
 * A family is never a prefix. `structure` and `interaction` exist only here and
 * in those two files — no token, CSS variable or utility carries either word.
 */
const COLOR_FAMILIES = [
  ["structure", "Structure", "The substrate a screen is made of."],
  ["interaction", "Interaction", "What you operate, and how it responds."],
  ["status", "Status", "Feedback about what happened."],
  ["viz", "Viz", "Data encoded as color."],
]

/**
 * Semantic colors by their first path segment, in family order.
 *
 * The page groups by prefix and the config groups by sub-group, so this list is
 * ten entries where the config has nineteen. Both sit under the same four
 * families; neither is a subdivision of the other.
 */
const COLOR_GROUPS = [
  ["surface", "Surface", "Backgrounds. Every surface has a text color that belongs on it.", "structure"],
  ["text", "Text", "Foreground colors. Base is the default, subtle steps back, inverse sits on dark surfaces.", "structure"],
  ["border", "Border", "Decorative dividers and outlines. Form controls use the separate input-border set.", "structure"],
  ["utility", "Utility", "Scrim and skeleton — surfaces that exist only to obscure or stand in.", "structure"],
  ["action", "Action", "Interactive fills and their labels. Hover and press are separate stops, not opacity tricks.", "interaction"],
  ["input-border", "Input border", "Form control borders — darker than decorative borders so fields read as editable.", "interaction"],
  ["focus", "Focus", "The focus ring and its offset. Never suppress these.", "interaction"],
  ["link", "Link", "Link states. Visited is separate so long documents stay navigable.", "interaction"],
  ["status", "Status", "Positive, negative, warning and info, each with a surface, a border and a text color.", "status"],
  ["viz", "Data visualisation", "Categorical for unordered series, sequential for ordered magnitude.", "viz"],
]

/** A dimension under a color prefix: `border-1` is a width, `border-base` a color. */
const NOT_COLOR = /^border-\d/

/**
 * Where one mode's value comes from, normalized so both authored shapes read the
 * same downstream.
 *
 * A semantic is either a bare reference or a reference plus an alpha, and the
 * second is the more interesting of the two: it is the only explanation for why
 * `surface-hover` ships an rgba instead of a hex, and the alpha is the whole
 * design decision — 3% over black is a wash the eye reads as a tint.
 */
const primitiveRef = (entry) => {
  if (!entry) return null
  if (typeof entry === "string") return { ref: entry, alpha: null }
  if (typeof entry === "object" && entry.ref) return { ref: entry.ref, alpha: entry.a ?? null }
  return null
}

const primitiveOf = (name) => {
  const s = semantics[name]
  if (!s) return null
  const light = primitiveRef(s.light)
  const dark = primitiveRef(s.dark)
  return light || dark ? { light, dark } : null
}

const colorGroups = COLOR_GROUPS.map(([prefix, label, blurb, family]) => {
  const names = Object.keys(light).filter((n) => {
    if (!n.startsWith(prefix + "-")) return false
    if (NOT_COLOR.test(n)) return false
    // `border-*` must not swallow `input-border-*`; longest prefix wins.
    return !COLOR_GROUPS.some(([other]) => other !== prefix && other.length > prefix.length && n.startsWith(other + "-"))
  })
  return {
    key: prefix,
    label,
    blurb,
    family,
    tokens: names.map((n) => ({
      name: n,
      light: light[n],
      dark: dark[n] ?? light[n],
      primitive: primitiveOf(n),
    })),
  }
}).filter((g) => g.tokens.length)

/**
 * Fails rather than silently dropping a group, because a family that quietly
 * lost a prefix would render as a shorter page and nothing else.
 */
const orphan = colorGroups.find((g) => !COLOR_FAMILIES.some(([key]) => key === g.family))
if (orphan) throw new Error(`color group "${orphan.key}" names an unknown family "${orphan.family}"`)

const colorFamilies = COLOR_FAMILIES.map(([key, label, blurb]) => ({
  key,
  label,
  blurb,
  groups: colorGroups.filter((g) => g.family === key),
})).filter((f) => f.groups.length)

/** The grid step every space token multiplies, in px, so a step can state its multiple. */
const UNIT_PX = resolvePx(declared["--db-spacing-unit"], declared)

/**
 * Non-color families, each name carrying what it is worth as well as how it is
 * written.
 *
 * `px` is the reading. A row that showed `calc(var(--db-spacing-unit) * 0.5 *
 * var(--db-density-scalar))` was accurate and told a reader nothing about
 * whether the step was 2px or 20px.
 *
 * `multiple` is the second half of the answer, and only the families built on
 * the grid step have one. It now usually equals the stop in the name, which is
 * the point of the numeric naming — where the two disagree, the name is lying.
 * Null where dividing by the grid step would invent a relationship.
 */
/**
 * A family whose value differs by color mode, emitted as both.
 *
 * Elevation is the only dimensional family that ships two sets, and it has to:
 * these are opaque-black shadows cast against a surface rather than a themeable
 * color, so the light alphas draw essentially nothing on a dark one and
 * `theme.config.mjs` authors a second set instead of reusing the first. Emitting
 * a single `value` showed the light shadow on every page and said nothing about
 * the other half existing.
 *
 * Same shape as a color token, because it is the same fact: one name, two
 * values, both shipped rather than computed.
 */
const pickModes = (re) =>
  Object.keys(light)
    .filter((n) => re.test(n))
    .map((name) => ({ name, light: light[name], dark: dark[name] ?? light[name] }))

/** Families emitted as `{light, dark}` rather than a single `value`. */
const MODE_FAMILIES = new Set(["elevation"])

const pick = (re, { onGrid = false } = {}) =>
  Object.entries(light)
    .filter(([n]) => re.test(n))
    .map(([name, value]) => {
      const px = resolvePx(value, declared)
      return {
        name,
        value,
        px,
        multiple: onGrid && px !== null && UNIT_PX ? parseFloat((px / UNIT_PX).toFixed(4)) : null,
      }
    })

/**
 * The type ramp, assembled per step rather than left as loose properties.
 *
 * Size and leading are what the page has to show — `label` and `body` are the
 * same size and differ only in leading, and a sample alone cannot show that.
 * They were typed into the page as "13 / 16" strings, which is how `eyebrow`
 * came to claim a size the config does not give it.
 *
 * Read out of the utility body the way `export-token-spec.mjs` does it, rather
 * than from per-style custom properties. The utility is the API, so it is the
 * one surface guaranteed to carry every part of a style; a property behind it
 * is plumbing the ramp is free to stop emitting.
 *
 * Resolved to px at a 16px root through the shared resolver: the config authors
 * in px because that is how Figma and designers think, the generator converts
 * to rem once, and a reviewer needs the px back.
 */
/** Utility order in type.css is ramp order, which is neither alphabetical nor by size. */
/** `calc(var(--db-font-size-sm) * ...)` -> "sm". Null where a literal is written. */
const stopIn = (declaration) =>
  declaration.match(/var\(--db-(?:font-size|line-height|letter-spacing)-([a-z0-9-]+)\)/)?.[1] ?? null

const typeSteps = [...typeCss.matchAll(/@utility type-([a-z0-9-]+)\s*\{([\s\S]*?)\n\}/g)].map(
  ([, step, body]) => {
    const raw = (prop) => body.match(new RegExp(`(?:^|\\n)\\s*${prop}:\\s*([^;]+);`))?.[1]?.trim() ?? ""
    return {
      // The class, so the page can apply the sample with the same string it names.
      name: `type-${step}`,
      size: resolvePx(raw("font-size"), declared),
      line: resolvePx(raw("line-height"), declared),
      weight: raw("font-weight").replace(/var\((--db-[a-z0-9-]+)\)/, (_, n) => declared[n] ?? "") || null,
      mono: /mono-font-family/.test(raw("font-family")),
      uppercase: /text-transform:\s*uppercase/.test(body),
      // Which stop each property names, read back out of the var in the utility.
      //
      // The px above is what a style measures; this is what it asked for. Both are
      // worth having: 13/16 says a label is 13 on 16, and `sm` on `flush` says it
      // shares that size with `body` and that line box with `hint` — which is why
      // moving one stop moves several styles.
      stops: {
        size: stopIn(raw("font-size")),
        line: stopIn(raw("line-height")),
        tracking: stopIn(raw("letter-spacing")),
      },
      // Zero rather than a stop, for the ten styles that set no tracking at all.
      tracking: resolvePx(raw("letter-spacing"), declared) ?? 0,
    }
  }
)

/**
 * The type contexts, read out of the shipped CSS the same way everything else
 * here is.
 *
 * Each context ships once, behind the context attribute, and that block is what
 * this parses: it exists for every context including the default, whose values
 * are also the ones in `:root`.
 *
 * There is no query to recover. A context is opt-in — the attribute block is the
 * whole activation story, because a media query inside an iframe measures the
 * iframe and these components live in iframes. `generate-tokens.mjs` has no code
 * path that emits one, and `export-token-spec.mjs` reads the CSS to the same
 * conclusion. What a document that declares nothing renders is the default, so
 * that is the name this emits instead.
 */
const blockAt = (from) => {
  const open = css.indexOf("{", from)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++
    else if (css[i] === "}" && --depth === 0) return css.slice(open, i)
  }
  return ""
}

const stopsIn = (body) =>
  Object.fromEntries([...body.matchAll(/(--db-(?:font-size|line-height|letter-spacing)-[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))

const contextAttribute = css.match(/\[(data-[a-z-]+)="[a-z]+"\]\s*\{\s*--db-font-size-/)?.[1] ?? null

const contextBlocks = [...css.matchAll(new RegExp(String.raw`\[${contextAttribute}="([a-z0-9-]+)"\]\s*\{`, "g"))].map((m) => ({
  name: m[1],
  stops: stopsIn(blockAt(m.index)),
}))

/**
 * The context whose stops are already the `:root` values, which is what a
 * document that declares nothing renders — at every width.
 *
 * Derived rather than taken from position. Nothing in the CSS marks the default,
 * and the blocks come out in the order `theme.config.mjs` lists its contexts,
 * which is a separate setting from the `defaultContext` it names. Loud on
 * failure, because a page seeded from the wrong context would print numbers for
 * one ramp beside specimens rendering the other.
 */
const defaultContext = contextBlocks.find((c) =>
  Object.entries(c.stops).every(([name, value]) => declared[name] === value),
)?.name
if (contextBlocks.length && !defaultContext) {
  throw new Error(
    `no [${contextAttribute}] block restates the :root stops, so the default context cannot be derived`,
  )
}

const typeContexts = contextBlocks.map(({ name, stops }) => ({
  name,
  // The same 14 styles, resolved through this context's stops rather than
  // :root's, so the page can put the two ramps side by side.
  steps: typeSteps.map((step) => {
    const body = typeCss.match(new RegExp(`@utility ${step.name}\\s*\\{([\\s\\S]*?)\\n\\}`))?.[1] ?? ""
    const raw = (prop) => body.match(new RegExp(`(?:^|\\n)\\s*${prop}:\\s*([^;]+);`))?.[1]?.trim() ?? ""
    const scope = { ...declared, ...stops }
    return { name: step.name, size: resolvePx(raw("font-size"), scope), line: resolvePx(raw("line-height"), scope) }
  }),
}))

const data = {
  colorGroups,
  space: pick(/^space-/, { onGrid: true }),
  radius: pick(/^radius-/),
  // The roles that sit between a component and a radius stop. Not `onGrid`: a
  // multiple would report how many grid units a corner happens to be, which is a
  // fact about the stop it aliases rather than about the role. `pick` resolves the
  // alias, so `shape-pill` reads as its pixel value and not as `var(--db-radius-full)`.
  shape: pick(/^shape-/),
  size: pick(/^size-/, { onGrid: true }),
  // Not `onGrid`: this family counts px, not units of the grid step, so a
  // multiple would divide 1px by 4px and report 0.25 of a relationship that
  // does not exist.
  borderWidth: pick(NOT_COLOR),
  elevation: pickModes(/^elevation-/),
  duration: pick(/^duration-/),
  easing: pick(/^ease-/),
  // Not `onGrid`. A layer is a count of steps in an order, so dividing it by the
  // grid step would report a fraction of a relationship that does not exist — the
  // same reason border is picked plainly.
  layer: pick(/^layer-/),
  scalars: pick(/scalar$|^spacing-unit$/),
}

const counts = Object.fromEntries(
  Object.entries(data).map(([k, v]) => [
    k,
    k === "colorGroups" ? v.reduce((n, g) => n + g.tokens.length, 0) : v.length,
  ])
)
counts.type = typeSteps.length
counts.typeContexts = typeContexts.length

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(
  OUT,
  `// Generated by scripts/generate-token-data.mjs — do not edit by hand.
// Parsed from packages/dbui/src/tokens/tokens.css, so this is exactly what ships.

/**
 * \`value\` is how the token is written, \`px\` is what it renders at a 16px root
 * with every scalar at its shipped default, and \`multiple\` is how many grid
 * steps that is. Both are null when there is no single answer — an em step, a
 * scalar, a shadow, a duration.
 */
export type Token = {
  name: string
  value: string
  px: number | null
  multiple: number | null
}
/**
 * A token that ships two values, one per color mode. Both are read out of the
 * CSS rather than derived, because neither is a transform of the other.
 */
export type ModeToken = { name: string; light: string; dark: string }

/**
 * Which primitive a mode resolves to, and the alpha laid over it when there is
 * one. \`null\` where a token is authored as a literal rather than a reference.
 */
export type PrimitiveRef = { ref: string; alpha: number | null }
export type ColorToken = ModeToken & {
  primitive: { light: PrimitiveRef | null; dark: PrimitiveRef | null } | null
}
export type ColorGroup = {
  key: string
  label: string
  blurb: string
  /** Which of the four families the group belongs to. Never part of a token name. */
  family: string
  tokens: ColorToken[]
}
/**
 * The four families the semantic color layer is organized into. A grouping
 * only — \`structure\` and \`interaction\` appear in no token name, no CSS
 * variable and no Tailwind utility.
 */
export type ColorFamily = { key: string; label: string; blurb: string; groups: ColorGroup[] }
/** One step of the ramp. \`size\` and \`line\` are px at a 16px root. */
export type TypeStep = {
  name: string
  size: number | null
  line: number | null
  weight: string | null
  mono: boolean
  uppercase: boolean
  /** Which stop each property names. \`null\` where the style writes a literal. */
  stops: { size: string | null; line: string | null; tracking: string | null }
  tracking: number
}

export const colorFamilies: ColorFamily[] = ${JSON.stringify(colorFamilies, null, 2)}

/** The same groups, flat, for anything that wants every color without the split. */
export const colorGroups: ColorGroup[] = ${JSON.stringify(data.colorGroups, null, 2)}

export const type: TypeStep[] = ${JSON.stringify(typeSteps, null, 2)}

/**
 * One context's measurements. A context turns on one way and one way only —
 * the attribute below — because nothing activates from viewport width. There is
 * no ambient context to follow.
 */
export type TypeContext = {
  name: string
  steps: { name: string; size: number | null; line: number | null }[]
}

/** Set this attribute on any element to force a context inside another. */
export const typeContextAttribute = ${JSON.stringify(contextAttribute)}

/** What a document that sets no attribute renders, at every width. */
export const typeContextDefault = ${JSON.stringify(defaultContext ?? null)}

export const typeContexts: TypeContext[] = ${JSON.stringify(typeContexts, null, 2)}

${Object.entries(data)
  .filter(([k]) => k !== "colorGroups")
  .map(
    ([k, v]) =>
      `export const ${k}: ${MODE_FAMILIES.has(k) ? "ModeToken" : "Token"}[] = ${JSON.stringify(v, null, 2)}`,
  )
  .join("\n\n")}

export const tokenCounts = ${JSON.stringify(counts, null, 2)}
`
)

console.log(`wrote ${path.relative(ROOT, OUT)}`)
for (const [k, n] of Object.entries(counts)) console.log(`  ${k.padEnd(14)}${n}`)

/* ── theme-data.ts ───────────────────────────────────────────────────────────
 *
 * The roster, not the values. What a theme MOVES is in tokens.css and on the
 * Tokens page; what a picker needs is the name to write into the attribute and
 * the label to put on the segment.
 *
 * Generated for the usual reason: a list of theme names typed into a React
 * component is a second source, and the day a theme is added or renamed the
 * picker is the surface that silently keeps offering the old one. */
const themeList = Object.entries(themes ?? {}).map(([name, t]) => ({
  name,
  label: t.label ?? name,
  description: t.description ?? "",
  isDefault: name === defaultTheme,
}))

fs.writeFileSync(
  THEMES_OUT,
  `/**
 * GENERATED by scripts/generate-token-data.mjs — do not hand-edit.
 * Source: packages/dbui/src/tokens/theme.config.mjs \`themes\`.
 *
 * The aesthetics the system renders in. A theme varies token VALUES and never
 * token names, so switching one repaints the page without re-rendering a single
 * component — the same property that makes the color mode a one-class toggle.
 *
 * Mode and the density/type dials are separate axes and compose with this one.
 * A theme block declares only the tokens it moves, so switching theme cannot
 * disturb a mode, a scale, or a density scalar set on a subtree.
 */

export type ThemeMeta = {
  /** What goes in the attribute. */
  name: string
  label: string
  description: string
  /** Also emitted into \`:root\`, so it is the one the attribute never spells. */
  isDefault: boolean
}

/** Set on any element to theme that subtree; two themes can share one page. */
export const themeAttribute = ${JSON.stringify(themeAttr)}

/** What a document that sets no attribute renders as. */
export const themeDefault = ${JSON.stringify(defaultTheme)}

export const themes: ThemeMeta[] = ${JSON.stringify(themeList, null, 2)}
`,
)

console.log(`wrote ${path.relative(ROOT, THEMES_OUT)}`)
console.log(`  themes        ${themeList.length} (${themeList.map((t) => t.name).join(", ")})`)
