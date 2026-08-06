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
 * ${PREFIX}* var. Dimensions (space/radius/type/elevation) derive from the scalar
 * dials so density/size/type can be re-tuned from a handful of numbers.
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

  /* ── Space (each stop is its multiple of the grid unit, scaled by density) ── */
${spaceLines}

  /* ── Radius (same grid as space; "full" is a pill sentinel) ── */
${radiusLines}

  /* ── Type (anchored ramp, scaled together by type-scalar) ── */
${typeLines}

  /* ── Size (width and height, on the same grid as space) ── */
${sizeLines}

  /* ── Border width ── */
${borderLines}

  /* ── Motion (two bands, one easing curve for the whole system) ── */
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
  // One role-named ramp; `ramp` stays the linter's allowed size/line set.
  type: {
    ...prev.type,
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
