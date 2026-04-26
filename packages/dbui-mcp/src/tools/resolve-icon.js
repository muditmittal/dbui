/**
 * dbui_resolve_icon
 *
 * Find the right DBUI icon for a description or use case.
 * Searches across icon name, description, and synonyms with relevance scoring.
 *
 * Use cases:
 *   - "user" → returns User, UserOutline, UserGroup, ...
 *   - "delete" → returns Trash, Close, ...
 *   - "loading" → returns Loading, ...
 *   - "down arrow" → returns ChevronDown, ArrowDown, ...
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const icons = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/icons.json"), "utf-8")
)

export const tool = {
  name: "dbui_resolve_icon",
  description:
    "Find the best-matching DBUI icon(s) for a query like 'user', 'database', 'down arrow', 'success'. Returns top matches with import path, category, description, and synonyms. Use this BEFORE inserting any icon to avoid hardcoding icons from other libraries.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "What you're looking for. Can be a noun ('user'), verb ('delete'), concept ('success state'), or shape ('down arrow').",
      },
      category: {
        type: "string",
        enum: ["object", "action", "indicator", "component"],
        description:
          "Optional. Narrows search to a category: 'action' = verbs (Trash → delete), 'object' = nouns (Catalog → entity), 'indicator' = status (Running → state), 'component' = built-in chrome (ChevronDown → menu).",
      },
      limit: {
        type: "number",
        description: "Max results to return. Default 5.",
        default: 5,
      },
    },
    required: ["query"],
  },
}

export function run({ query, category, limit = 5 }) {
  const q = query.toLowerCase().trim()
  const tokens = q.split(/\s+/)

  let pool = icons
  if (category) pool = pool.filter((i) => i.category === category)

  // Score each icon
  const scored = []
  for (const icon of pool) {
    const name = icon.name.toLowerCase()
    const desc = (icon.description || "").toLowerCase()
    const syns = (icon.synonyms || []).map((s) => s.toLowerCase())

    let score = 0
    if (name === q) score += 100
    else if (name === q.replace(/\s+/g, "")) score += 90
    else if (name.includes(q.replace(/\s+/g, ""))) score += 60
    else if (tokens.every((t) => name.includes(t))) score += 50

    for (const syn of syns) {
      if (syn === q) score += 40
      else if (syn.includes(q) || q.includes(syn)) score += 25
      else if (tokens.every((t) => syn.includes(t))) score += 20
    }

    if (desc.includes(q)) score += 15
    else if (tokens.every((t) => desc.includes(t))) score += 10

    if (score > 0) scored.push({ ...icon, _score: score })
  }

  scored.sort((a, b) => b._score - a._score)
  const results = scored.slice(0, limit).map((r) => ({
    name: r.name,
    category: r.category,
    description: r.description,
    synonyms: r.synonyms,
    importPath: r.importPath,
    usage: `import { ${r.name} } from "${r.importPath}"\n<${r.name} />`,
  }))

  return {
    query,
    category: category || "all",
    matchCount: results.length,
    matches: results,
    note:
      results.length === 0
        ? "No matches. Grep packages/dbui/src/components/icons/ for the concept, or pick the closest existing icon."
        : `Top match: <${results[0].name} />. Always verify the description fits your context before using.`,
  }
}
