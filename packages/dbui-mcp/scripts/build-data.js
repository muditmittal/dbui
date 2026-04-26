#!/usr/bin/env node
/**
 * Build pre-parsed JSON data for the MCP server.
 *
 * Reads the source-of-truth files (icon-index.md, component-index.md,
 * tokens.json from design-lint, composition-rules.ts) and emits compact
 * JSON the server loads at startup.
 *
 * Run: node scripts/build-data.js
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO = path.resolve(__dirname, "../../..")
const OUT = path.resolve(__dirname, "../src/data")

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

// ── Parse markdown table rows ──
// Format: | `Name` | desc | synonyms | maybe more |
function parseTableRows(md) {
  const lines = md.split("\n")
  const rows = []
  let currentSection = null
  for (const line of lines) {
    const sectionMatch = line.match(/^### `([^`]+)`/)
    if (sectionMatch) {
      currentSection = sectionMatch[1]
      continue
    }
    // skip header / divider rows
    if (/^\| -+/.test(line)) continue
    if (/^\| Icon\s+\|/.test(line)) continue
    if (/^\| Component\s+\|/.test(line)) continue
    const m = line.match(/^\|\s*`([^`]+)`\s*\|(.+)\|$/)
    if (m) {
      const name = m[1].trim()
      const cells = m[2].split("|").map((c) => c.trim())
      rows.push({ section: currentSection, name, cells })
    }
  }
  return rows
}

// ── Icons ──
const iconMd = fs.readFileSync(path.join(REPO, "packages/dbui/docs/icon-index.md"), "utf-8")
const iconRows = parseTableRows(iconMd)
const icons = iconRows.map((r) => ({
  name: r.name,
  category: r.section, // 'object' | 'action' | 'indicator' | 'component'
  description: (r.cells[0] || "").trim(),
  synonyms: (r.cells[1] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  importPath: `@muditmittal/dbui/components/icons/${r.name}`,
}))
fs.writeFileSync(path.join(OUT, "icons.json"), JSON.stringify(icons, null, 2))
console.log(`✓ icons.json — ${icons.length} icons`)

// ── Components ──
const compMd = fs.readFileSync(path.join(REPO, "packages/dbui/docs/component-index.md"), "utf-8")
const compRows = parseTableRows(compMd)
const components = compRows.map((r) => ({
  name: r.name,
  category: r.section,
  useFor: (r.cells[0] || "").trim(),
  avoidFor: (r.cells[1] || "").trim(),
  synonyms: (r.cells[2] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  figma: (r.cells[3] || "").trim().replace(/`/g, ""),
  importPath: `@muditmittal/dbui/components/ui/${kebab(r.name)}`,
}))
fs.writeFileSync(path.join(OUT, "components.json"), JSON.stringify(components, null, 2))
console.log(`✓ components.json — ${components.length} components`)

// ── Tokens (from design-lint) ──
const tokens = JSON.parse(
  fs.readFileSync(path.join(REPO, "scripts/design-lint/tokens.json"), "utf-8")
)
fs.writeFileSync(path.join(OUT, "tokens.json"), JSON.stringify(tokens, null, 2))
console.log(`✓ tokens.json — ${Object.keys(tokens).length} sections`)

// ── DBUI components allow-list ──
const dbuiComponents = JSON.parse(
  fs.readFileSync(path.join(REPO, "scripts/design-lint/dbui-components.json"), "utf-8")
)
fs.writeFileSync(path.join(OUT, "dbui-components.json"), JSON.stringify(dbuiComponents, null, 2))
console.log(`✓ dbui-components.json — ${dbuiComponents.ui.length} ui + ${dbuiComponents.shells.length} shells`)

// ── Composition rules (parse the .ts file by simple regex) ──
const rulesSrc = fs.readFileSync(path.join(REPO, "packages/dbui/src/rules/composition-rules.ts"), "utf-8")
const ruleRe = /\{\s*id:\s*"([^"]+)",\s*component:\s*"([^"]+)",\s*rule:\s*"([^"]+)",\s*rationale:\s*"([^"]+)",\s*severity:\s*"(error|warning)"/g
const rules = []
let m
while ((m = ruleRe.exec(rulesSrc))) {
  rules.push({
    id: m[1],
    component: m[2],
    rule: m[3],
    rationale: m[4],
    severity: m[5],
  })
}
fs.writeFileSync(path.join(OUT, "rules.json"), JSON.stringify(rules, null, 2))
console.log(`✓ rules.json — ${rules.length} composition rules`)

// ── Hex → token map (for resolve-token) ──
function buildHexTokenMap() {
  // Read globals.css and extract --token: #HEX pairs
  const css = fs.readFileSync(path.join(REPO, "packages/dbui/src/tokens/globals.css"), "utf-8")
  const lightMatch = css.match(/:root\s*\{([\s\S]+?)^\}/m)
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)^\}/m)
  const map = { light: {}, dark: {} }
  for (const [mode, block] of [["light", lightMatch?.[1] || ""], ["dark", darkMatch?.[1] || ""]]) {
    const lines = block.split("\n")
    for (const line of lines) {
      const m = line.match(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,8})\s*;/)
      if (m) map[mode][m[1]] = m[2].toUpperCase()
    }
  }
  return map
}
const hexMap = buildHexTokenMap()
fs.writeFileSync(path.join(OUT, "hex-tokens.json"), JSON.stringify(hexMap, null, 2))
console.log(`✓ hex-tokens.json — ${Object.keys(hexMap.light).length} light + ${Object.keys(hexMap.dark).length} dark`)

console.log("\nAll data built →", path.relative(REPO, OUT))

function kebab(s) {
  return s
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}
