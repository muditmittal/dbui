#!/usr/bin/env node
/**
 * generate-tokens — the DBUI token generator.
 *
 * Reads the single source of truth (packages/dbui/src/tokens/theme.config.mjs)
 * and writes two derived artifacts:
 *
 *   1. packages/dbui/src/tokens/tokens.css   — shipped CSS
 *        • @theme inline: one Tailwind color utility per semantic
 *          (--color-surface-base → var(--db-surface-base))
 *        • :root  — scalars, space/radius/type/elevation scale, LIGHT semantics
 *        • .dark  — DARK semantics
 *      Primitives are resolved INLINE (semantics carry final hex/rgba). They are
 *      NOT shipped as CSS vars — they're generator input only.
 *
 *   2. scripts/design-lint/tokens.json       — linter allowlist
 *        colors.{light,alpha,primitives,semanticTokens} regenerated from config;
 *        spacing/radius/fonts/type preserved from the previous tokens.json (they
 *        are the code-side Tailwind allowlists and stay stable during migration).
 *        Legacy hexes/alphas from globals.css are unioned in so existing
 *        (not-yet-migrated) components keep passing the linter.
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
const GLOBALS_CSS = path.join(ROOT, "packages/dbui/src/tokens/globals.css")
const TOKENS_JSON = path.join(__dirname, "tokens.json")

const { meta, primitives, semantics, scalars, space, radius, type, elevation } = cfg
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

const scalarLines = Object.entries(scalars)
  .map(([k, v]) => `  ${PREFIX}${k}: ${v};`)
  .join("\n")

const v = (name) => `var(${PREFIX}${name})` // reference another --db-* token inside calc()
const spaceLines = [
  ...Object.entries(space.units).map(([k, mult]) =>
    mult === 0
      ? `  ${PREFIX}space-${k}: 0;`
      : `  ${PREFIX}space-${k}: calc(${v("spacing-unit")} * ${mult} * ${v("spacing-scalar")} * ${v("density-scalar")});`,
  ),
  ...Object.entries(space.inline).map(([k, val]) => `  ${PREFIX}space-inline-${k}: ${val};`),
].join("\n")

const radiusLines = Object.entries(radius)
  .map(([k, v]) => `  ${PREFIX}radius-${k}: ${v};`)
  .join("\n")

const typeLines = [
  `  ${PREFIX}font-family: ${type.family.text};`,
  `  ${PREFIX}mono-font-family: ${type.family.mono};`,
  // size, line-height AND tracking all scale together via --db-type-scalar
  ...Object.entries(type.scale).flatMap(([k, { size, line, tracking }]) => [
    `  ${PREFIX}font-size-${k}: calc(${size}px * ${v("type-scalar")});`,
    `  ${PREFIX}line-height-${k}: calc(${line}px * ${v("type-scalar")});`,
    `  ${PREFIX}letter-spacing-${k}: calc(${tracking}px * ${v("type-scalar")});`,
  ]),
  `  ${PREFIX}font-weight: ${type.weight.normal};`,
  `  ${PREFIX}font-weight-bold: ${type.weight.bold};`,
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
 * ${PREFIX}* var. Dimensions (space/radius/type/elevation) derive from the scalar
 * dials so density/size/type can be re-tuned from a handful of numbers.
 * ───────────────────────────────────────────────────────────────────────────── */

@theme inline {
${theme}
}

:root {
  /* ── Scalars — the density/size/type dials ── */
${scalarLines}

  /* ── Space (multiples of the grid unit, scaled by spacing × density) ── */
${spaceLines}

  /* ── Radius (fixed anchors) ── */
${radiusLines}

  /* ── Type (anchored ramp, scaled together by type-scalar) ── */
${typeLines}

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

// ── tokens.json (linter allowlist) ─────────────────────────────────────────────
const prev = JSON.parse(fs.readFileSync(TOKENS_JSON, "utf-8"))
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

// semantic token names grouped by first segment
const semGroups = {}
for (const n of names) {
  const group = n.split("-")[0]
  ;(semGroups[group] ||= []).push(n)
}
for (const g of Object.keys(semGroups)) semGroups[g].sort()

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
    legacyTokens: prev.colors?.legacyTokens ?? {},
  },
  spacing: prev.spacing,
  radius: prev.radius,
  fonts: prev.fonts,
  type: prev.type,
}

fs.writeFileSync(TOKENS_JSON, JSON.stringify(out, null, 2) + "\n")

// ── summary ────────────────────────────────────────────────────────────────
const primCount = Object.values(primMap).reduce((n, r) => n + Object.keys(r).length, 0) + 2 // + base pair
const alphaSem = names.filter((n) => isAlpha(semantics[n].light) || isAlpha(semantics[n].dark)).length
console.log(`tokens.css   : ${names.length} semantics (light + dark), ${Object.keys(space.units).length + Object.keys(space.inline).length} space, ${Object.keys(radius).length} radius, ${Object.keys(type.scale).length} type steps (size+line+tracking, scalar-tied), ${Object.keys(elevation).length} elevation.`)
console.log(`tokens.json  : ${hexes.size} hex, ${alphas.size} alpha, ${primCount} primitives, ${names.length} semantic tokens (${alphaSem} carry alpha).`)
console.log(`Primitives shipped as CSS vars: 0 (resolved inline — generator input only).`)
