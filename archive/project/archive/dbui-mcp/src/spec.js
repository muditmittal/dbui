/**
 * Spec — the medium-neutral contract for DBUI screens.
 *
 * A Spec is a JSON tree describing a UI in DBUI's terms (shells, compositions,
 * components, icons, tokens). The same Spec can render to Figma OR React because
 * component names + variant property names + slot semantics are 1:1 across both.
 *
 * The build loop produces a Spec and the renderers consume it:
 *
 *   description → dbui_build_structure → Structure
 *   Structure + content → dbui_hydrate → Spec
 *   Spec → dbui_validate → { passed, checks }
 *   Spec → dbui_render_figma → use_figma JS
 *   Spec → dbui_render_react  → TSX
 *
 * @typedef {Object} SpecNode
 * @property {string} type                     A known DBUI shell, composition, or component name.
 * @property {Object} [props]                  Props passed to the node, matching the component's React schema.
 * @property {SpecNode[]} [children]           Nested nodes (for slot containers).
 *
 * @typedef {Object} Spec
 * @property {string} shell                    A known shell name. Defaults to "BaseShell".
 * @property {Object} [shellProps]             Shell-level props (e.g. activeNav, theme).
 * @property {SpecNode[]} content              The screen-specific content inside the shell.
 *
 * @typedef {Object} StructureRegion
 * @property {string} role                     Semantic role: "page-header" | "filter" | "body" | "hero" | etc.
 * @property {string} match                    The matched composition or component name.
 * @property {"composition"|"component"|"fallback"} matchKind
 * @property {number} confidence               0–1.
 * @property {string} [warning]                Set when match is a fallback or low confidence.
 *
 * @typedef {Object} Structure
 * @property {string} shell
 * @property {Object} [shellProps]
 * @property {StructureRegion[]} regions       Each region describes one slot of the screen.
 * @property {string[]} [warnings]             Collected warnings from matching.
 *
 * @typedef {Object} ValidationCheck
 * @property {boolean} passed
 * @property {Array<{path: string, message: string, severity: "error"|"warning"}>} issues
 *
 * @typedef {Object} ValidationResult
 * @property {boolean} passed
 * @property {Object<string, ValidationCheck>} checks   Keyed by check name.
 */

// Known shell archetypes. Update as new shells land in dbui-shells/src/shells/.
export const KNOWN_SHELLS = ["BaseShell", "CatalogLayout"]
export const DEFAULT_SHELL = "BaseShell"

// Known composition roles. Used by build-structure for matching.
export const KNOWN_ROLES = [
  "page-header",
  "sub-tabs",
  "tab-pills",
  "filter",
  "filter-pill-bar",
  "list",
  "list-view",
  "table",
  "tree",
  "data-tree",
  "file-tree",
  "card-grid",
  "hero",
  "promo-banner",
  "inline-create",
  "breadcrumb",
  "editor-tabs",
  "output-panel",
]

/**
 * Validate that an object looks like a Spec. Lightweight structural check.
 * @param {any} maybeSpec
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function isSpec(maybeSpec) {
  const errors = []
  if (!maybeSpec || typeof maybeSpec !== "object") {
    return { valid: false, errors: ["Spec must be an object"] }
  }
  if (typeof maybeSpec.shell !== "string") {
    errors.push("Spec.shell must be a string")
  } else if (!KNOWN_SHELLS.includes(maybeSpec.shell)) {
    errors.push(`Spec.shell "${maybeSpec.shell}" is not a known shell`)
  }
  if (!Array.isArray(maybeSpec.content)) {
    errors.push("Spec.content must be an array of SpecNode")
  } else {
    for (let i = 0; i < maybeSpec.content.length; i++) {
      const node = maybeSpec.content[i]
      if (!node || typeof node !== "object") {
        errors.push(`Spec.content[${i}] is not an object`)
        continue
      }
      if (typeof node.type !== "string") {
        errors.push(`Spec.content[${i}].type must be a string`)
      }
    }
  }
  return { valid: errors.length === 0, errors }
}

/**
 * Empty Spec wrapped in the default shell. Useful as a starting point.
 * @param {Partial<Spec>} [overrides]
 * @returns {Spec}
 */
export function emptySpec(overrides = {}) {
  return {
    shell: overrides.shell || DEFAULT_SHELL,
    shellProps: overrides.shellProps || {},
    content: overrides.content || [],
  }
}
