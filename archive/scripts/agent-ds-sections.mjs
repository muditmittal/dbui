#!/usr/bin/env node
/**
 * Agent-Design-Standards — section + token extractor for the chosen 20.
 *
 * For each system in the cohort, reads the "best" DESIGN.md, parses the
 * YAML-ish front matter into structured signals (colors / typography / rounded
 * / spacing / components), splits the prose body into 9 canonical sections, and
 * emits per-system JSON plus an aggregate signals TSV for the comparison doc.
 *
 * Canonical 9-section frame (reconciles voltagent 8-core + classic Open Design 9):
 *   1 Overview  2 Colors  3 Typography  4 Layout  5 Elevation & Depth
 *   6 Shapes  7 Components  8 Do's & Don'ts  9 Agent Guidance
 *   (Agent Guidance = Responsive Behavior + Iteration Guide + Known Gaps)
 *
 * Usage:  node scripts/agent-ds-sections.mjs
 * Output: research/agent-design-standards/data/sections/<key>.json
 *         research/agent-design-standards/data/section-signals.tsv
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const HOME = process.env.HOME || ""
const DATA = path.join(ROOT, "research/agent-design-standards/data")
const SEC_DIR = path.join(DATA, "sections")

const catalog = JSON.parse(fs.readFileSync(path.join(DATA, "catalog.json"), "utf8"))
const cohort = JSON.parse(fs.readFileSync(path.join(DATA, "cohort-scores.json"), "utf8")).chosen
const byKey = Object.fromEntries(catalog.systems.map((s) => [s.key, s]))

// map a raw H2 heading -> canonical section id
const SECTION_MAP = [
  [/overview|visual theme|atmosphere/i, "overview"],
  [/colou?rs?|palette/i, "colors"],
  [/typograph/i, "typography"],
  [/layout|spacing|grid/i, "layout"],
  [/elevation|depth|shadow/i, "depth"],
  [/shapes?|radius|corner/i, "shapes"],
  [/components?/i, "components"],
  [/do.?s and don|do.?s.?.?don|anti-pattern/i, "dosdonts"],
  [/responsive|iteration guide|known gaps|agent|usage/i, "agent"],
]
const SECTIONS = ["overview", "colors", "typography", "layout", "depth", "shapes", "components", "dosdonts", "agent"]

function splitFrontMatter(md) {
  if (!md.startsWith("---\n")) return { fm: "", body: md }
  const end = md.indexOf("\n---", 4)
  if (end === -1) return { fm: "", body: md }
  return { fm: md.slice(4, end), body: md.slice(end + 4) }
}

// parse the simple 2-space-nested front matter into top-level blocks
function parseFM(fm) {
  const blocks = {} // topKey -> array of raw lines (indented)
  let cur = null
  for (const line of fm.split("\n")) {
    const top = line.match(/^([a-zA-Z_][\w-]*):(.*)$/)
    if (top) {
      cur = top[1]
      blocks[cur] = { inline: top[2].trim(), lines: [] }
    } else if (cur && /^\s+\S/.test(line)) {
      blocks[cur].lines.push(line)
    }
  }
  return blocks
}

function firstLevelKeys(block) {
  if (!block) return []
  return block.lines.filter((l) => /^  [^\s]/.test(l)).map((l) => l.trim().replace(/:.*$/, ""))
}

function grabHex(block, key) {
  if (!block) return null
  const re = new RegExp(`^\\s*${key}:\\s*"?(#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))"?`, "m")
  const m = block.lines.join("\n").match(re)
  return m ? m[1] : null
}

// luminance of a hex -> is this a light or dark canvas?
function isLight(hex) {
  if (!hex || !hex.startsWith("#")) return null
  let h = hex.slice(1)
  if (h.length === 3) h = h.split("").map((c) => c + c).join("")
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return lum > 0.5
}

function fontFamilies(block) {
  if (!block) return []
  const fams = [...block.lines.join("\n").matchAll(/fontFamily:\s*(.+)/g)].map((m) => m[1].trim())
  return [...new Set(fams)]
}

function bodyFontSize(block) {
  if (!block) return null
  // find a 'body' or 'body-md' typography role's fontSize
  const txt = block.lines.join("\n")
  const m = txt.match(/^  body(?:-md)?:\s*\n(?:\s+.*\n)*?\s+fontSize:\s*(\d+)px/m)
  return m ? +m[1] : null
}

function scaleValues(block) {
  if (!block) return []
  return [...block.lines.join("\n").matchAll(/^\s+[\w-]+:\s*(\d+)px/gm)].map((m) => +m[1])
}

function splitSections(body) {
  const out = Object.fromEntries(SECTIONS.map((s) => [s, ""]))
  const raw = [...body.matchAll(/^##\s+(.+)$/gm)]
  for (let i = 0; i < raw.length; i++) {
    const heading = raw[i][1].trim()
    const start = raw[i].index + raw[i][0].length
    const endIdx = i + 1 < raw.length ? raw[i + 1].index : body.length
    const text = body.slice(start, endIdx).trim()
    let id = null
    for (const [re, sid] of SECTION_MAP) if (re.test(heading)) { id = sid; break }
    if (id) out[id] += (out[id] ? "\n\n" : "") + `### ${heading}\n${text}`
  }
  return out
}

function countBullets(text) {
  return (text.match(/^\s*[-*]\s+/gm) || []).length
}

fs.mkdirSync(SEC_DIR, { recursive: true })

const signalCols = [
  "key", "display", "category", "canvas_hex", "mode", "primary_hex", "accent_hex", "color_roles",
  "font_families", "font_count", "body_px", "radius_scale", "spacing_base_px",
  "component_count", "dosdonts_bullets", "has_responsive", "has_iteration", "has_known_gaps",
]
const signalRows = []

for (const key of cohort) {
  const s = byKey[key]
  const md = fs.readFileSync(path.join(HOME, s.best.rel_path), "utf8")
  const { fm, body } = splitFrontMatter(md)
  const B = parseFM(fm)

  const canvas = grabHex(B.colors, "canvas") || grabHex(B.colors, "background") || grabHex(B.colors, "bg") || grabHex(B.colors, "surface")
  const primary = grabHex(B.colors, "primary")
  // chromatic accent (often distinct from a near-black "primary"): link, else first accent*
  const accent = grabHex(B.colors, "link") || (() => {
    const m = (B.colors ? B.colors.lines.join("\n") : "").match(/^\s*(accent[\w-]*):\s*"?(#[0-9a-fA-F]{3,8})/m)
    return m ? m[2] : null
  })()
  const colorRoles = firstLevelKeys(B.colors)
  const fams = fontFamilies(B.typography)
  const radius = scaleValues(B.rounded)
  const spacing = scaleValues(B.spacing).filter((v) => v > 0).sort((a, b) => a - b)
  const components = firstLevelKeys(B.components)
  const sections = splitSections(body)

  const mode = canvas ? (isLight(canvas) ? "light" : "dark") : "unknown"

  const rec = {
    key,
    display: s.display,
    category: s.category,
    descriptor: s.descriptor,
    source: s.best.source_id,
    path: s.best.rel_path,
    lines: s.best.lines,
    tokens: {
      canvas_hex: canvas,
      mode,
      primary_hex: primary,
      accent_hex: accent,
      color_roles: colorRoles,
      font_families: fams,
      body_px: bodyFontSize(B.typography),
      radius_scale_px: radius,
      spacing_scale_px: spacing,
      component_names: components,
    },
    section_bullets: Object.fromEntries(SECTIONS.map((k) => [k, countBullets(sections[k])])),
    sections,
  }
  fs.writeFileSync(path.join(SEC_DIR, `${key}.json`), JSON.stringify(rec, null, 2))

  signalRows.push([
    key, s.display, s.category, canvas || "", mode, primary || "", accent || "", colorRoles.length,
    fams.join("; "), fams.length, rec.tokens.body_px || "", radius.join("/"),
    spacing[0] || "", components.length, countBullets(sections.dosdonts),
    /responsive/i.test(body) ? "Y" : "", /iteration guide/i.test(body) ? "Y" : "",
    /known gaps/i.test(body) ? "Y" : "",
  ])
}

const tsv = [signalCols.join("\t"), ...signalRows.map((r) => r.map((v) => String(v).replace(/\t/g, " ")).join("\t"))].join("\n")
fs.writeFileSync(path.join(DATA, "section-signals.tsv"), tsv)

// quick aggregates to stdout (indices track signalCols order)
const iMode = signalCols.indexOf("mode")
const iBody = signalCols.indexOf("body_px")
const iComp = signalCols.indexOf("component_count")
const modes = signalRows.reduce((m, r) => ((m[r[iMode]] = (m[r[iMode]] || 0) + 1), m), {})
const bodySizes = signalRows.map((r) => r[iBody]).filter((v) => typeof v === "number")
console.log(`Extracted ${signalRows.length} systems -> data/sections/*.json + section-signals.tsv`)
console.log(`Canvas mode:`, modes)
console.log(`Body font px values: ${[...new Set(bodySizes)].sort((a, b) => a - b).join(", ")}`)
console.log(`Avg components specced: ${(signalRows.reduce((s, r) => s + r[iComp], 0) / signalRows.length).toFixed(1)}`)
