/**
 * Extractor: icons
 *
 * Reads project/icon-index.md (the maintainer-curated icon registry, soon to
 * be auto-derived from the icon source files) and emits packages/dbui-mcp/src/data/icons.json.
 *
 * Currently the index is a markdown table, hand-curated. When per-icon
 * `<Name>.meta.ts` files land in packages/dbui/src/components/icons/, this
 * extractor will switch to reading those directly and the project/icon-index.md
 * file will be deleted.
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "icons"
export const inputs = [{ path: "project/icon-index.md", kind: "file" }]
export const outputs = ["icons.json"]

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
    if (/^\| Icon\s+\|/.test(line)) continue
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
  const md = readRepoFile("project/icon-index.md")
  const rows = parseTableRows(md)
  const icons = rows.map((r) => ({
    name: r.name,
    category: r.section,
    description: (r.cells[0] || "").trim(),
    synonyms: (r.cells[1] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    importPath: `@muditmittal/dbui/components/icons/${r.name}`,
  }))
  writeDataJson("icons.json", icons)
  return { iconsWritten: icons.length }
}
