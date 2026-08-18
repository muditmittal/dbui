#!/usr/bin/env node
/**
 * Token values — does Figma paint the same colour React does?
 *
 * `design:verify-sync` compares token *names* across `theme.config.mjs`,
 * `tokens.css` and Figma, and says so: "NOT COMPARED — dump carries names only".
 * A name-only check passes while the two sides render different colours, which is
 * the drift that actually reaches a screen. This compares the values.
 *
 * Both sides are normalised to `r,g,b,a` before comparing, because the same colour
 * is spelled differently in each: Figma resolves to 8-digit hex (`#0000000f`),
 * `tokens.css` writes alpha as `rgba(0, 0, 0, 0.06)`. Comparing strings reports
 * every translucent token as a mismatch.
 *
 * Channels are compared with a tolerance of 1/255 and alpha with 0.006, which is
 * the rounding error of a round trip through 8-bit hex — Figma stores alpha as a
 * float, and 0.06 lands on `0f` which reads back as 0.0588.
 *
 * Aliases are already resolved in the dump, so a semantic pointing at a primitive
 * is compared on the literal it ends at. That is deliberate: an indirection that
 * matches by name while ending on a different value is exactly the bug.
 *
 * ## Refreshing the Figma side
 *
 * The dump is checked in so this runs offline. Regenerate it with `use_figma`:
 *
 *   const cols = await figma.variables.getLocalVariableCollectionsAsync()
 *   const colors = cols.find(c => c.name === 'Colors')
 *   ...resolve each variable for the Light and Dark modeIds, following
 *   VARIABLE_ALIAS into Primitives, and emit `name|light|dark`
 *
 * The full script is in the conversation that added this file; the shape it writes
 * is `scripts/design-lint/.figma-token-values.json`.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => {
  try {
    return fs.readFileSync(path.join(ROOT, p), "utf8")
  } catch {
    return null
  }
}

const CSS = "packages/dbui/src/tokens/tokens.css"
const DUMP = "scripts/design-lint/.figma-token-values.json"

// ── Colour normalising ───────────────────────────────────────────────────────
/** `#rgb` · `#rrggbb` · `#rrggbbaa` · `rgb()` · `rgba()` → `[r, g, b, a]`. */
function parseColor(raw) {
  if (!raw) return null
  const s = raw.trim().toLowerCase()

  if (s.startsWith("#")) {
    let h = s.slice(1)
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("")
    if (h.length !== 6 && h.length !== 8) return null
    const n = (i) => parseInt(h.slice(i, i + 2), 16)
    return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1]
  }

  const m = s.match(/^rgba?\(([^)]+)\)$/)
  if (!m) return null
  // Both `r, g, b, a` and the space-separated `r g b / a` form.
  const parts = m[1].replace(/\//g, " ").split(/[\s,]+/).filter(Boolean)
  if (parts.length < 3) return null
  const num = (v) => (v.endsWith("%") ? parseFloat(v) / 100 : parseFloat(v))
  const [r, g, b] = parts.slice(0, 3).map((v) => (v.endsWith("%") ? Math.round(num(v) * 255) : num(v)))
  const a = parts[3] === undefined ? 1 : num(parts[3])
  return [r, g, b, a]
}

/** One 8-bit step on a channel, and the rounding error of alpha through hex. */
function sameColor(a, b) {
  if (!a || !b) return false
  return (
    Math.abs(a[0] - b[0]) <= 1 &&
    Math.abs(a[1] - b[1]) <= 1 &&
    Math.abs(a[2] - b[2]) <= 1 &&
    Math.abs(a[3] - b[3]) <= 0.006
  )
}

const show = (c) =>
  c ? (c[3] < 0.999 ? `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3].toFixed(3)})` : `#${c.slice(0, 3).map((n) => n.toString(16).padStart(2, "0")).join("")}`) : "?"

// ── Inputs ───────────────────────────────────────────────────────────────────
const dumpRaw = read(DUMP)
if (!dumpRaw) {
  console.error(`No Figma token values at ${DUMP}. See the header of this file.`)
  process.exit(1)
}
const dump = JSON.parse(dumpRaw)
const figma = new Map()
for (const row of dump.rows) {
  const [name, light, dark] = row.split("|")
  figma.set(name, { light: parseColor(light), dark: parseColor(dark) })
}

const css = read(CSS)
if (!css) {
  console.error(`No ${CSS}.`)
  process.exit(1)
}

/**
 * `:root` carries light, `.dark` carries dark. Scoped by brace depth rather than
 * by the next selector, because the theme blocks below repeat every name and a
 * greedy read would take `[data-theme="one"]`'s value as core's.
 */
function block(selector) {
  const at = css.indexOf(`\n${selector} {`)
  if (at === -1) return {}
  let depth = 0
  let i = css.indexOf("{", at)
  const from = i + 1
  for (; i < css.length; i++) {
    if (css[i] === "{") depth++
    else if (css[i] === "}") {
      depth--
      if (depth === 0) break
    }
  }
  const body = css.slice(from, i)
  const out = {}
  for (const m of body.matchAll(/--db-([a-z0-9-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim()
  return out
}

const light = block(":root")
const dark = block(".dark")

// ── Compare ──────────────────────────────────────────────────────────────────
/**
 * Colour tokens only. `:root` also carries spacing, radii, type, elevation and
 * duration, and those live in Figma's `Dimensions`, `Typography` and `Shape`
 * collections rather than in `Colors` — so comparing them here would report
 * `space-4` and `radius-2` as missing from a collection that was never meant to
 * hold them. A value that does not parse as a colour is not this audit's business.
 */
const isColor = (name) => parseColor(light[name]) !== null || parseColor(dark[name]) !== null
const inCss = new Set([...Object.keys(light), ...Object.keys(dark)].filter(isColor))
const findings = {
  missingFromCss: [...figma.keys()].filter((n) => !inCss.has(n)).sort(),
  missingFromFigma: [...inCss].filter((n) => !figma.has(n)).sort(),
  lightMismatch: [],
  darkMismatch: [],
  unresolved: [],
}

for (const [name, fig] of figma) {
  if (!inCss.has(name)) continue
  for (const [mode, figVal, cssRaw, bucket] of [
    ["light", fig.light, light[name], findings.lightMismatch],
    ["dark", fig.dark, dark[name], findings.darkMismatch],
  ]) {
    const cssVal = parseColor(cssRaw)
    if (!figVal || !cssVal) {
      findings.unresolved.push(`${name} (${mode}) — figma ${figVal ? "ok" : "unresolved"}, css ${cssRaw ?? "absent"}`)
      continue
    }
    if (!sameColor(figVal, cssVal)) {
      bucket.push(`${name}  figma ${show(figVal)}  css ${show(cssVal)}`)
    }
  }
}

// ── Primitives ───────────────────────────────────────────────────────────────
/**
 * The layer under the semantics, and the one nothing was checking. `verify-sync`
 * compares primitive *names* — it prints "NOT COMPARED — dump carries names only" —
 * so Figma's `interface/neutral` ramp sat on a different set of greys and a retuned
 * `viz/cyan` sat on its pre-retune values, and every gate passed.
 *
 * Primitives are single-mode: a theme varies semantics, never the ramp beneath them.
 */
const primitiveGaps = { missing: [], differs: [] }
if (dump.primitives?.rows) {
  const config = readConfigPrimitives()
  for (const row of dump.primitives.rows) {
    const [name, value] = row.split("=")
    // `base/*` is black and white and has no ramp to compare against.
    if (name.startsWith("base/")) continue
    const want = config[name.replace(/\//g, ".")]
    if (!want) {
      primitiveGaps.missing.push(`${name} — no matching stop in theme.config.mjs`)
      continue
    }
    if (!sameColor(parseColor(value), parseColor(want))) {
      primitiveGaps.differs.push(`${name}  figma ${value}  config ${want}`)
    }
  }
}

/**
 * Reads the ramps out of `theme.config.mjs`. Parsed rather than imported because the
 * config is an ESM module with comments and this audit stays dependency-free.
 */
function readConfigPrimitives() {
  const src = read("packages/dbui/src/tokens/theme.config.mjs") ?? ""
  const out = {}
  const families = /\b(interface|status|viz|brand):\s*\{/g
  let m
  while ((m = families.exec(src))) {
    const family = m[1]
    let i = src.indexOf("{", m.index)
    let depth = 0
    let j = i
    for (; j < src.length; j++) {
      if (src[j] === "{") depth++
      else if (src[j] === "}") {
        depth--
        if (!depth) break
      }
    }
    const body = src.slice(i + 1, j)
    let r
    const ramps = /(\w[\w-]*):\s*\{([^}]*)\}/g
    while ((r = ramps.exec(body))) {
      for (const step of r[2].matchAll(/"?(\d{3})"?:\s*"(#[0-9A-Fa-f]{6})"/g)) {
        out[`${family}.${r[1]}.${step[1]}`] = step[2].toUpperCase()
      }
    }
  }
  return out
}

// ── Report ───────────────────────────────────────────────────────────────────
const compared = [...figma.keys()].filter((n) => inCss.has(n)).length
console.log("\nTOKEN VALUES — Figma `Colors` ↔ tokens.css\n")
console.log(`  figma:      ${figma.size} semantic variables, Light and Dark resolved to a literal`)
console.log(
  `  tokens.css: ${inCss.size} colour tokens (of ${Object.keys(light).length} in :root — the rest are` +
    ` spacing, type and shape, which live in Figma's other collections)`
)
console.log(`  compared:   ${compared} names present on both sides, ${compared * 2} values`)
if (dump.primitives?.rows) {
  const n = dump.primitives.rows.filter((r) => !r.startsWith("base/")).length
  console.log(`  primitives: ${n} ramp stops compared against theme.config.mjs`)
}
console.log()

/**
 * This audit's question is "do the tokens both sides have agree on a value". A name
 * only one side has is a different question, and `design:verify-sync` already owns
 * it — it reports the mirror gap, the ten `brand.orange` primitives Figma lacks.
 * Counting names here would mean one gap failing two gates, and this one would then
 * fail on every run, which is how a gate stops being read.
 *
 * They are still printed. A note you can see is not a silenced check.
 */
const nameGaps = [
  ["In Figma, not in tokens.css", findings.missingFromCss],
  ["In tokens.css, not in Figma", findings.missingFromFigma],
  ["Figma primitive with no config stop", primitiveGaps.missing],
]
const valueGaps = [
  ["Light value differs", findings.lightMismatch],
  ["Dark value differs", findings.darkMismatch],
  ["Could not compare", findings.unresolved],
  ["Primitive value differs from theme.config.mjs", primitiveGaps.differs],
]

let total = 0
for (const [title, items] of valueGaps) {
  if (!items.length) continue
  total += items.length
  console.log(`  ${title} — ${items.length}`)
  for (const i of items) console.log(`    - ${i}`)
  console.log()
}

for (const [title, items] of nameGaps) {
  if (!items.length) continue
  console.log(`  ${title} — ${items.length}  · name-level, tracked by design:verify-sync`)
  for (const i of items) console.log(`    - ${i}`)
  console.log()
}

if (total === 0) {
  console.log(`  Aligned. Every shared token paints the same colour in both modes.\n`)
} else {
  console.log(`  ${total} value finding(s).\n`)
}
process.exit(total === 0 ? 0 : 1)
