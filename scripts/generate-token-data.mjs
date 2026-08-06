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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const TOKENS_CSS = path.join(ROOT, "packages/dbui/src/tokens/tokens.css")
const TYPE_CSS = path.join(ROOT, "packages/dbui/src/tokens/type.css")
const OUT = path.join(ROOT, "apps/portal/src/stories/tokens/token-data.ts")

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

/** Group semantic colors by their first path segment (surface, text, action…). */
const COLOR_GROUPS = [
  ["surface", "Surface", "Backgrounds. Every surface has a text color that belongs on it."],
  ["text", "Text", "Foreground colors. Base is the default, subtle steps back, inverse sits on dark surfaces."],
  ["action", "Action", "Interactive fills and their labels. Hover and press are separate stops, not opacity tricks."],
  ["border", "Border", "Decorative dividers and outlines. Form controls use the separate input-border set."],
  ["input-border", "Input border", "Form control borders — darker than decorative borders so fields read as editable."],
  ["status", "Status", "Positive, negative, warning and info, each with a surface, a border and a text color."],
  ["link", "Link", "Link states. Visited is separate so long documents stay navigable."],
  ["focus", "Focus", "The focus ring and its offset. Never suppress these."],
  ["viz", "Data visualisation", "Categorical for unordered series, sequential for ordered magnitude."],
  ["utility", "Utility", "Scrim and skeleton — surfaces that exist only to obscure or stand in."],
]

/** Dimensional families whose names collide with a color prefix. */
const NOT_COLOR = /^(border-width-|surface-)?$/

const colorGroups = COLOR_GROUPS.map(([prefix, label, blurb]) => {
  const names = Object.keys(light).filter((n) => {
    if (!n.startsWith(prefix + "-")) return false
    // `border-width-*` is a dimension, not a color, but shares the prefix.
    if (n.startsWith("border-width-")) return false
    // `border-*` must not swallow `input-border-*`; longest prefix wins.
    return !COLOR_GROUPS.some(([other]) => other !== prefix && other.length > prefix.length && n.startsWith(other + "-"))
  })
  return {
    key: prefix,
    label,
    blurb,
    tokens: names.map((n) => ({ name: n, light: light[n], dark: dark[n] ?? light[n] })),
  }
}).filter((g) => g.tokens.length)

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
 * The type ramp, assembled per step rather than left as 74 loose properties.
 *
 * Size and leading are what the page has to show — `label` and `body` are the
 * same size and differ only in leading, and a sample alone cannot show that.
 * They were typed into the page as "13 / 16" strings, which is how `eyebrow`
 * came to claim a size the config does not give it.
 *
 * Resolved to px at a 16px root the way `export-token-spec.mjs` does it: the
 * config authors in px because that is how Figma and designers think, the
 * generator converts to rem once, and a reviewer needs the px back.
 */
const remToPx = (value) => {
  const m = String(value).match(/([\d.]+)rem/)
  if (!m) return null
  return parseFloat((parseFloat(m[1]) * 16).toFixed(4))
}

/** Utility order in type.css is ramp order, which is neither alphabetical nor by size. */
const typeSteps = [...typeCss.matchAll(/@utility type-([a-z0-9-]+)\s*\{([\s\S]*?)\n\}/g)].map(
  ([, step, body]) => ({
    // The class, so the page can apply the sample with the same string it names.
    name: `type-${step}`,
    size: remToPx(light[`font-size-${step}`]),
    line: remToPx(light[`line-height-${step}`]),
    weight: light[`font-weight-${step}`] ?? null,
    mono: (light[`font-family-${step}`] ?? "").includes("mono"),
    // Carried in the utility, not in a var, so it has to be read from here.
    uppercase: /text-transform:\s*uppercase/.test(body),
  })
)

const data = {
  colorGroups,
  space: pick(/^space-/, { onGrid: true }),
  radius: pick(/^radius-/),
  sizeElement: pick(/^size-element-/),
  sizeIcon: pick(/^size-icon-/),
  borderWidth: pick(/^border-width-/),
  elevation: pick(/^elevation-/),
  duration: pick(/^duration-/),
  easing: pick(/^ease-/),
  scalars: pick(/scalar$|^spacing-unit$/),
}

const counts = Object.fromEntries(
  Object.entries(data).map(([k, v]) => [
    k,
    k === "colorGroups" ? v.reduce((n, g) => n + g.tokens.length, 0) : v.length,
  ])
)
counts.type = typeSteps.length

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
export type ColorToken = { name: string; light: string; dark: string }
export type ColorGroup = { key: string; label: string; blurb: string; tokens: ColorToken[] }
/** One step of the ramp. \`size\` and \`line\` are px at a 16px root. */
export type TypeStep = {
  name: string
  size: number | null
  line: number | null
  weight: string | null
  mono: boolean
  uppercase: boolean
}

export const colorGroups: ColorGroup[] = ${JSON.stringify(data.colorGroups, null, 2)}

export const type: TypeStep[] = ${JSON.stringify(typeSteps, null, 2)}

${Object.entries(data)
  .filter(([k]) => k !== "colorGroups")
  .map(([k, v]) => `export const ${k}: Token[] = ${JSON.stringify(v, null, 2)}`)
  .join("\n\n")}

export const tokenCounts = ${JSON.stringify(counts, null, 2)}
`
)

console.log(`wrote ${path.relative(ROOT, OUT)}`)
for (const [k, n] of Object.entries(counts)) console.log(`  ${k.padEnd(14)}${n}`)
