/**
 * dbui_build_structure
 *
 * Stage 1 of the build loop. Takes a structured description of a screen
 * (shell choice + regions with semantic roles) and returns a Structure that
 * names the best shell and the best composition (or component fallback)
 * for each region.
 *
 * Source of available shells:        dbui-shells/src/shells/*.tsx
 * Source of available compositions:  dbui-shells/src/compositions/*.tsx
 * Fallback to components:            data/components.json
 *
 * The Structure has no content yet — that's Stage 2 (hydrate).
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { run as lookupComponent } from "./lookup-component.js"
import { DEFAULT_SHELL, KNOWN_ROLES } from "../spec.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO = path.resolve(__dirname, "../../../..")

const SHELLS_DIR = path.join(REPO, "packages/dbui-shells/src/shells")
const COMPOSITIONS_DIR = path.join(REPO, "packages/dbui-shells/src/compositions")

// Heuristic: map a region's role keyword to likely composition names.
// Used when scanning composition filenames for matches.
const ROLE_KEYWORDS = {
  "page-header": ["pageheader", "header", "title"],
  "sub-tabs": ["subtabs", "tabs"],
  "tab-pills": ["tabpills", "pills"],
  filter: ["filter", "filterpill", "filterbar"],
  "filter-pill-bar": ["filterpillbar", "filter"],
  list: ["listview", "list"],
  "list-view": ["listview", "list"],
  table: ["datatable", "table"],
  tree: ["tree", "datatree", "filetree"],
  "data-tree": ["datatree", "tree"],
  "file-tree": ["filetree", "tree"],
  "card-grid": ["cardgrid", "grid"],
  hero: ["hero", "herolanding"],
  "promo-banner": ["promobanner", "banner"],
  "inline-create": ["inlinecreate", "createcards"],
  breadcrumb: ["breadcrumb"],
  "editor-tabs": ["editortabs"],
  "output-panel": ["outputpanel", "output"],
}

function listAvailable(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.tsx$/, ""))
}

function matchComposition(role, description, available) {
  if (available.length === 0) return null
  const keywords = ROLE_KEYWORDS[role] || [role.replace(/[-_]/g, "")]
  const desc = (description || "").toLowerCase().replace(/\s+/g, "")
  let best = null
  for (const comp of available) {
    const compLower = comp.toLowerCase()
    let score = 0
    for (const kw of keywords) {
      if (compLower === kw) score += 100
      else if (compLower.includes(kw) || kw.includes(compLower)) score += 50
    }
    if (desc && desc.includes(compLower)) score += 30
    if (score > 0 && (!best || score > best.score)) {
      best = { name: comp, score }
    }
  }
  if (!best) return null
  // Confidence heuristic: 100 → 1.0, 50 → 0.7, lower → linear
  const confidence = Math.min(1, best.score / 100)
  return { name: best.name, confidence }
}

function fallbackComponent(role, description) {
  const query = description || role.replace(/[-_]/g, " ")
  const result = lookupComponent({ query, limit: 1 })
  if (result.matchCount === 0) return null
  return { name: result.matches[0].name, confidence: 0.5 }
}

export const tool = {
  name: "dbui_build_structure",
  description:
    "Stage 1 of the build loop. Given a structured description of a screen (shell + regions with semantic roles), returns a Structure naming the best shell and the best composition (or component fallback) for each region. The Structure has NO content — that's Stage 2 (hydrate). Always defaults to BaseShell unless overridden.",
  inputSchema: {
    type: "object",
    properties: {
      shell: {
        type: "string",
        description: `Optional shell override. Defaults to "${DEFAULT_SHELL}". Known: BaseShell, CatalogLayout.`,
      },
      shellProps: {
        type: "object",
        description: "Optional shell-level props (e.g. { activeNav: 'Recents' }).",
      },
      regions: {
        type: "array",
        description: "Ordered list of regions inside the shell's content area. Each region has a semantic role + a one-line description.",
        items: {
          type: "object",
          properties: {
            role: {
              type: "string",
              description: `Semantic role. Known roles: ${KNOWN_ROLES.join(", ")}. Use one of these or "custom".`,
            },
            description: {
              type: "string",
              description: "One-line description of what this region contains. Used to disambiguate match.",
            },
          },
          required: ["role"],
        },
      },
    },
    required: ["regions"],
  },
}

export function run({ shell, shellProps, regions }) {
  const shellName = shell || DEFAULT_SHELL
  const availableShells = listAvailable(SHELLS_DIR)
  const availableCompositions = listAvailable(COMPOSITIONS_DIR)

  const warnings = []
  if (availableShells.length > 0 && !availableShells.includes(shellName.replace("Layout", "Explorer"))) {
    // BaseShell may not exactly match a filename — that's fine, it's the conceptual default.
    if (shellName !== DEFAULT_SHELL) {
      warnings.push(`Shell "${shellName}" not found in ${path.relative(REPO, SHELLS_DIR)}. Defaulting to ${DEFAULT_SHELL}.`)
    }
  }

  const matchedRegions = (regions || []).map((region) => {
    const role = region.role || "custom"
    const description = region.description || ""

    // Try composition match first (Stage 1 prefers compositions over components).
    const compMatch = matchComposition(role, description, availableCompositions)
    if (compMatch) {
      return {
        role,
        match: compMatch.name,
        matchKind: "composition",
        confidence: compMatch.confidence,
      }
    }

    // Fall back to component lookup.
    const compFallback = fallbackComponent(role, description)
    if (compFallback) {
      const warning = availableCompositions.length === 0
        ? `No compositions defined yet — fell back to component "${compFallback.name}". Add a composition for "${role}" to dbui-shells/src/compositions/ when ready.`
        : `No composition matched role "${role}". Falling back to component "${compFallback.name}".`
      warnings.push(warning)
      return {
        role,
        match: compFallback.name,
        matchKind: "fallback",
        confidence: compFallback.confidence,
        warning,
      }
    }

    // No match at all.
    const warning = `No composition or component matched role "${role}" (description: "${description}"). Region will be empty until a match exists.`
    warnings.push(warning)
    return {
      role,
      match: null,
      matchKind: "fallback",
      confidence: 0,
      warning,
    }
  })

  return {
    shell: shellName,
    shellProps: shellProps || {},
    regions: matchedRegions,
    warnings,
    note:
      warnings.length === 0
        ? `All ${matchedRegions.length} regions matched cleanly. Pass this to dbui_hydrate({ structure, content }) for Stage 2.`
        : `Matched ${matchedRegions.filter((r) => r.matchKind === "composition").length}/${matchedRegions.length} regions to compositions. ${warnings.length} warning(s). Review and call dbui_hydrate when ready.`,
  }
}
