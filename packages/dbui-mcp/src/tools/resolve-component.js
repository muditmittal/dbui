/**
 * dbui_resolve_component
 *
 * Find the right DBUI component for a use case ("a clickable button",
 * "data table with sortable columns", "validation error message").
 *
 * Searches name + useFor + synonyms with relevance scoring.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/components.json"), "utf-8")
)

export const tool = {
  name: "dbui_resolve_component",
  description:
    "Find the best DBUI component(s) for a use case. Returns name, when to use, when to AVOID, and import path. Use this when you need a UI primitive ('clickable button', 'editable text input', 'tabular data') to avoid using raw HTML or external libraries.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "Describe the use case in plain English. Examples: 'click action', 'sortable table', 'inline label', 'validation error', 'side panel', 'switch on/off setting'.",
      },
      category: {
        type: "string",
        enum: ["action", "input", "selection", "menu", "overlay", "feedback", "display", "navigation", "layout", "chrome"],
        description:
          "Optional category filter to narrow the search.",
      },
      limit: {
        type: "number",
        description: "Max results. Default 5.",
        default: 5,
      },
    },
    required: ["query"],
  },
}

export function run({ query, category, limit = 5 }) {
  const q = query.toLowerCase().trim()
  const tokens = q.split(/\s+/)

  let pool = components
  if (category) pool = pool.filter((c) => c.category === category)

  const scored = []
  for (const comp of pool) {
    const name = comp.name.toLowerCase()
    const useFor = (comp.useFor || "").toLowerCase()
    const syns = (comp.synonyms || []).map((s) => s.toLowerCase())

    let score = 0
    if (name === q || name === q.replace(/\s+/g, "")) score += 100
    else if (name.includes(q.replace(/\s+/g, ""))) score += 70

    for (const syn of syns) {
      if (syn === q) score += 50
      else if (syn.includes(q) || q.includes(syn)) score += 30
    }

    if (useFor.includes(q)) score += 25
    else if (tokens.every((t) => useFor.includes(t))) score += 15

    if (tokens.every((t) => name.includes(t) || useFor.includes(t) || syns.some((s) => s.includes(t)))) score += 10

    if (score > 0) scored.push({ ...comp, _score: score })
  }

  scored.sort((a, b) => b._score - a._score)
  const results = scored.slice(0, limit).map((r) => ({
    name: r.name,
    category: r.category,
    useFor: r.useFor,
    avoidFor: r.avoidFor,
    synonyms: r.synonyms,
    figma: r.figma,
    importPath: r.importPath,
    usage: `import { ${r.name} } from "${r.importPath}"`,
  }))

  return {
    query,
    category: category || "all",
    matchCount: results.length,
    matches: results,
    note:
      results.length === 0
        ? "No direct match. Browse packages/dbui/docs/component-index.md or call dbui_list_components."
        : `Top match: ${results[0].name} (${results[0].category}). Read 'avoidFor' to make sure it's the right pick.`,
  }
}
