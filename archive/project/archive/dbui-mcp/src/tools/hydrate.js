/**
 * dbui_hydrate
 *
 * Stage 2 of the build loop. Takes a Structure (from dbui_build_structure)
 * and a content payload keyed by region role, and returns a full Spec ready
 * for validation and rendering.
 *
 * What this tool does:
 *   1. Walks the structure's regions in order.
 *   2. For each region, finds the matching content slice (by role).
 *   3. Resolves any icon descriptions (`iconDesc` → real icon name via lookup_icon).
 *   4. Assembles a SpecNode { type, props } per region.
 *   5. Returns the full Spec wrapped in the chosen shell.
 *
 * Input contract for content: a plain object keyed by region role. The values
 * become the SpecNode's `props`. Inside any value, fields named `iconDesc` are
 * replaced by `icon: <resolved name>` (drop `iconDesc` after resolution).
 */
import { run as lookupIcon } from "./lookup-icon.js"
import { isSpec } from "../spec.js"

/**
 * Walk an arbitrary value tree and replace `iconDesc` keys with resolved
 * `icon` keys (using lookup_icon). Returns a new object — does not mutate.
 * Collects unresolved descriptions into `unresolved`.
 */
function resolveIconsInValue(value, unresolved, path = []) {
  if (Array.isArray(value)) {
    return value.map((v, i) => resolveIconsInValue(v, unresolved, [...path, String(i)]))
  }
  if (value && typeof value === "object") {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (k === "iconDesc" && typeof v === "string") {
        const result = lookupIcon({ query: v, limit: 1 })
        if (result.matchCount > 0) {
          out.icon = result.matches[0].name
        } else {
          unresolved.push({ path: path.join("."), description: v })
          out.icon = null
        }
      } else {
        out[k] = resolveIconsInValue(v, unresolved, [...path, k])
      }
    }
    return out
  }
  return value
}

export const tool = {
  name: "dbui_hydrate",
  description:
    "Stage 2 of the build loop. Takes a Structure (from dbui_build_structure) plus content keyed by region role, and returns a full Spec ready for dbui_validate and dbui_render_*. Inside content, any `iconDesc: '...'` field is auto-resolved to `icon: '<DBUI icon name>'` via dbui_lookup_icon.",
  inputSchema: {
    type: "object",
    properties: {
      structure: {
        type: "object",
        description: "The Structure returned by dbui_build_structure.",
      },
      content: {
        type: "object",
        description:
          "A plain object keyed by region role. Each value becomes that region's props in the Spec. Use `iconDesc` instead of `icon` to auto-resolve.",
      },
    },
    required: ["structure", "content"],
  },
}

export function run({ structure, content }) {
  if (!structure || !Array.isArray(structure.regions)) {
    throw new Error("structure must include a regions array (call dbui_build_structure first)")
  }
  const unresolved = []
  const specContent = []

  for (const region of structure.regions) {
    if (!region.match) {
      // No matched component — emit a placeholder node so downstream tools see the gap.
      specContent.push({
        type: "_Unmatched",
        props: { role: region.role, warning: region.warning || "no match" },
      })
      continue
    }
    const slice = content[region.role] ?? {}
    const resolvedProps = resolveIconsInValue(slice, unresolved, [region.role])
    specContent.push({ type: region.match, props: resolvedProps })
  }

  const spec = {
    shell: structure.shell,
    shellProps: structure.shellProps || {},
    content: specContent,
  }

  const validation = isSpec(spec)

  return {
    spec,
    unresolvedIcons: unresolved,
    structuralValid: validation.valid,
    structuralErrors: validation.errors,
    note:
      unresolved.length === 0 && validation.valid
        ? "Spec hydrated cleanly. Pass to dbui_validate next."
        : `${unresolved.length} icon(s) couldn't resolve, ${validation.errors.length} structural error(s). Inspect and fix before rendering.`,
  }
}
