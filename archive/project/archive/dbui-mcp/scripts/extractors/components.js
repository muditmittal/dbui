/**
 * Extractor: components
 *
 * Reads project/component-index.md (the maintainer-curated component registry,
 * soon to be auto-derived from JSDoc tags on each .tsx) and emits
 * packages/dbui-mcp/src/data/components.json.
 *
 * Future: this extractor will switch to reading JSDoc tags directly from
 * packages/dbui/src/components/ui/*.tsx via ts-morph (the same parser used
 * by dbui_explain_component). At that point the project/component-index.md
 * file will be deleted.
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "components"
export const inputs = [{ path: "project/component-index.md", kind: "file" }]
export const outputs = ["components.json"]

function kebab(s) {
  return s
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}

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
    if (/^\| -+/.test(line)) continue
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

export async function extract() {
  const md = readRepoFile("project/component-index.md")
  const rows = parseTableRows(md)
  const components = rows.map((r) => ({
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
  writeDataJson("components.json", components)
  return { componentsWritten: components.length }
}
