#!/usr/bin/env node
/**
 * Exports the shipped token set as a flat spec, in the Token / Category shape
 * engineering already uses, with the values added.
 *
 * Parsed from the generated tokens.css and type.css, so it is always exactly
 * what ships — there is no hand-maintained copy to go stale.
 *
 *   node scripts/export-token-spec.mjs            # TSV to stdout
 *   node scripts/export-token-spec.mjs --md       # markdown table
 *   node scripts/export-token-spec.mjs --out FILE # write to a file
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const css = fs.readFileSync(path.join(ROOT, "packages/dbui/src/tokens/tokens.css"), "utf8")
const typeCss = fs.readFileSync(path.join(ROOT, "packages/dbui/src/tokens/type.css"), "utf8")

function block(source, selector) {
  const start = source.indexOf(selector)
  if (start === -1) return {}
  const open = source.indexOf("{", start)
  let depth = 0
  let end = open
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++
    else if (source[i] === "}" && --depth === 0) { end = i; break }
  }
  const out = {}
  for (const m of source.slice(open, end).matchAll(/(--db-[a-z0-9-]+):\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim()
  }
  return out
}

const light = block(css, ":root")
const dark = block(css, ".dark")

/** Category, in the order engineering's sheet uses, extended with what we added. */
function categorise(name) {
  const n = name.replace("--db-", "")
  if (/^(surface|text|action|border-(base|subtle|strong|accent|inverse|disabled)|input-border|status|link|focus|viz|utility)/.test(n)) return "Color"
  if (/scalar$|^spacing-unit$|^space-/.test(n)) return "Density"
  if (/^(font-|mono-font-|line-height-|letter-spacing-)/.test(n)) return "Typography"
  if (/^elevation-/.test(n)) return "Elevation"
  if (/^radius-/.test(n)) return "Radius"
  if (/^size-/.test(n)) return "Size"
  if (/^border-width-/.test(n)) return "Border"
  if (/^(duration-|ease-)/.test(n)) return "Motion"
  return "Other"
}

const ORDER = ["Color", "Density", "Typography", "Radius", "Size", "Border", "Elevation", "Motion", "Other"]

/**
 * Resolve a calc() chain to what it actually renders at a 16px root with every
 * scalar at 1. A spec that reads `calc(var(--db-spacing-unit) * 4 * ...)` tells
 * a reviewer nothing; `16px` tells them whether it is right.
 */
function resolve(value, seen = 0) {
  if (!value || seen > 6) return ""
  let v = value
  // Substitute vars until none remain.
  for (let i = 0; i < 6 && v.includes("var("); i++) {
    v = v.replace(/var\((--db-[a-z0-9-]+)\)/g, (_, name) => light[name] ?? "1")
  }
  if (v.includes("var(")) return ""
  const calc = v.match(/^calc\((.+)\)$/)
  const expr = calc ? calc[1] : v

  // A bare length resolves directly. `em` is relative to its own element, so it
  // has no single px answer; unitless values are multipliers, not lengths.
  const bare = expr.trim().match(/^([\d.]+)(rem|px)$/)
  if (bare) {
    const px = bare[2] === "rem" ? parseFloat(bare[1]) * 16 : parseFloat(bare[1])
    return `${parseFloat(px.toFixed(4))}px`
  }

  if (!/^[\d.\srem px*+-]+$/i.test(expr) || !expr.includes("*")) return ""
  const parts = expr.split("*").map((p) => p.trim())
  let unit = ""
  let n = 1
  for (const p of parts) {
    const m = p.match(/^([\d.]+)(rem|px)?$/)
    if (!m) return ""
    if (m[2]) unit = m[2]
    n *= parseFloat(m[1])
  }
  if (!unit) return ""
  const px = unit === "rem" ? n * 16 : n
  return `${parseFloat(px.toFixed(4))}px`
}

const rows = Object.keys(light)
  .map((name) => ({
    token: name,
    category: categorise(name),
    light: light[name],
    dark: dark[name] && dark[name] !== light[name] ? dark[name] : "",
    computed: resolve(light[name]),
  }))
  .sort((a, b) => {
    const c = ORDER.indexOf(a.category) - ORDER.indexOf(b.category)
    return c !== 0 ? c : a.token.localeCompare(b.token)
  })

// The type ramp is composed styles, not raw values, so it needs its own listing.
const styles = [...typeCss.matchAll(/@utility (type-[a-z0-9-]+) \{([^}]+)\}/g)].map(([, name, body]) => {
  const raw = (prop) => body.match(new RegExp(`(?:^|\\n)\\s*${prop}:\\s*([^;]+);`))?.[1]?.trim() ?? ""
  // A style is only reviewable as numbers, so resolve the var() indirection.
  const num = (prop) => resolve(raw(prop)) || raw(prop)
  const weight = raw("font-weight").replace(/var\((--db-[a-z0-9-]+)\)/, (_, n) => light[n] ?? "")
  const family = /mono-font-family/.test(raw("font-family")) ? "mono" : "sans"
  return {
    name,
    size: num("font-size"),
    line: num("line-height"),
    weight,
    family,
    transform: raw("text-transform") || "",
  }
})

const argv = process.argv.slice(2)
const asMd = argv.includes("--md")
const outIdx = argv.indexOf("--out")

let text
const HEADER = `# Token spec

Generated from the shipped CSS by \`scripts/export-token-spec.mjs\`. Do not edit —
regenerate instead. This is exactly what \`tokens.css\` and \`type.css\` contain.

Spatial values ship in **rem**, authored in px against a 16px root, so they follow
a reader's browser font-size preference. The "At 16px root" column is what they
render at the default. Border width stays px so hairlines stay crisp.

Scalars and the two \`em\` inline steps have no single px value by design.

`

if (asMd) {
  text = [
    HEADER,
    "| Token | Category | Value | At 16px root | Dark |",
    "| --- | --- | --- | --- | --- |",
    ...rows.map((r) => `| \`${r.token}\` | ${r.category} | ${r.light} | ${r.computed} | ${r.dark} |`),
    "",
    "## Type styles (composed)",
    "",
    "| Utility | Size | Line height | Weight | Family | Case |",
    "| --- | --- | --- | --- | --- | --- |",
    ...styles.map((s) => `| \`${s.name}\` | ${s.size} | ${s.line} | ${s.weight} | ${s.family} | ${s.transform} |`),
  ].join("\n")
} else {
  text = [
    ["Token", "Category", "Value", "At16pxRoot", "Dark"].join("\t"),
    ...rows.map((r) => [r.token, r.category, r.light, r.computed, r.dark].join("\t")),
  ].join("\n")
}

if (outIdx !== -1 && argv[outIdx + 1]) {
  fs.writeFileSync(path.resolve(ROOT, argv[outIdx + 1]), text + "\n")
  const counts = {}
  for (const r of rows) counts[r.category] = (counts[r.category] ?? 0) + 1
  console.log(`wrote ${argv[outIdx + 1]}`)
  console.log(`  ${rows.length} tokens + ${styles.length} composed type styles`)
  for (const c of ORDER) if (counts[c]) console.log(`    ${c.padEnd(12)}${counts[c]}`)
} else {
  process.stdout.write(text + "\n")
}
