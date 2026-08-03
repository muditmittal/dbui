/**
 * dbui_validate
 *
 * Stage 3 of the build loop. Takes a Spec and runs all DBUI compliance
 * checks. Returns pass/fail per check with actionable issues.
 *
 * Checks performed (configurable):
 *   - structure: every `type` in the Spec is a known DBUI shell, composition,
 *                or component. No raw HTML, no unknown names.
 *   - content:   every user-facing string in props passes brand-voice rules.
 *                Folds dbui_check_copy across all relevant string props.
 *   - tokens:    placeholder for now — token compliance is checked at render
 *                time by the renderer (or by dbui_lint_react_snippet on the
 *                rendered output).
 *
 * Pass `{ checks: ["structure", "content"] }` to skip individual checks.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isSpec, KNOWN_SHELLS } from "../spec.js"
import { run as checkCopy } from "./check-copy.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO = path.resolve(__dirname, "../../../..")

const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/components.json"), "utf-8")
)

// Extract names from on-disk shells and compositions directories so the
// validator stays in sync as new things land in dbui-shells/.
function listAvailable(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
}

const SHELLS = new Set([
  ...KNOWN_SHELLS,
  ...listAvailable(path.join(REPO, "packages/dbui-shells/src/shells")),
])
const COMPOSITIONS = new Set(listAvailable(path.join(REPO, "packages/dbui-shells/src/compositions")))
const COMPONENTS = new Set(components.map((c) => c.name))

// Props whose values should be linted as user-facing copy.
// Surface mapping mirrors dbui_check_copy's surface enum.
const COPY_PROP_SURFACES = {
  title: "heading",
  heading: "heading",
  label: "field-label",
  placeholder: "field-helper",
  description: "page-description",
  helperText: "field-helper",
  tooltip: "tooltip",
  buttonLabel: "button",
  emptyTitle: "empty-title",
  emptyDescription: "empty-description",
  errorMessage: "error",
  confirmTitle: "confirm-title",
  confirmDescription: "confirm-description",
  status: "status",
}

function knownType(typeName) {
  return SHELLS.has(typeName) || COMPOSITIONS.has(typeName) || COMPONENTS.has(typeName)
}

function checkStructure(spec) {
  const issues = []
  const validation = isSpec(spec)
  for (const err of validation.errors) {
    issues.push({ path: "$", message: err, severity: "error" })
  }
  if (!Array.isArray(spec.content)) {
    return { passed: false, issues }
  }

  function walk(node, pathStr) {
    if (!node || typeof node !== "object") return
    if (typeof node.type !== "string") {
      issues.push({ path: pathStr, message: "Node missing type field", severity: "error" })
      return
    }
    if (node.type.startsWith("_")) {
      // Internal markers like _Unmatched are non-fatal — surface as warning.
      issues.push({
        path: pathStr,
        message: `Unmatched region: ${node.props?.role || "unknown"}. Provide a composition or component.`,
        severity: "warning",
      })
      return
    }
    if (!knownType(node.type)) {
      issues.push({
        path: pathStr,
        message: `Unknown type "${node.type}". Not a registered shell, composition, or component. Call dbui_lookup_component to find the right one.`,
        severity: "error",
      })
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((c, i) => walk(c, `${pathStr}.children[${i}]`))
    }
  }

  spec.content.forEach((node, i) => walk(node, `$.content[${i}]`))

  return { passed: issues.filter((x) => x.severity === "error").length === 0, issues }
}

function collectStringProps(value, path = []) {
  // Returns [{ path, key, value, surface }] for every string prop that should
  // be linted as copy.
  const results = []
  function walk(v, p) {
    if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, [...p, String(i)]))
      return
    }
    if (v && typeof v === "object") {
      for (const [k, val] of Object.entries(v)) {
        const surface = COPY_PROP_SURFACES[k]
        if (surface && typeof val === "string") {
          results.push({ path: [...p, k].join("."), key: k, value: val, surface })
        }
        walk(val, [...p, k])
      }
    }
  }
  walk(value, path)
  return results
}

function checkContent(spec) {
  const issues = []
  spec.content.forEach((node, i) => {
    if (!node.props) return
    const strings = collectStringProps(node.props, [`$.content[${i}].props`])
    for (const s of strings) {
      const result = checkCopy({ text: s.value, surface: s.surface })
      for (const v of result.violations || []) {
        issues.push({
          path: s.path,
          message: `[${v.rule}] ${v.message} (text: "${s.value}")`,
          severity: v.level === "error" ? "error" : "warning",
          fix: v.fix,
        })
      }
    }
  })
  return { passed: issues.filter((x) => x.severity === "error").length === 0, issues }
}

function checkTokens(spec) {
  // Token compliance is checked at render time. Placeholder until we have a
  // dbui_check_figma_node / dbui_lint_react_snippet pass on rendered output.
  return {
    passed: true,
    issues: [],
    note: "Token checks run on rendered output. Call dbui_lint_react_snippet after dbui_render_react, or dbui_check_figma_node (future) after dbui_render_figma.",
  }
}

export const tool = {
  name: "dbui_validate",
  description:
    "Stage 3 of the build loop. Takes a Spec and runs DBUI compliance checks: structure (every type known), content (brand-voice lint via dbui_check_copy), and tokens (deferred to render-time). Returns pass/fail per check with actionable issues.",
  inputSchema: {
    type: "object",
    properties: {
      spec: {
        type: "object",
        description: "The Spec to validate (output of dbui_hydrate).",
      },
      checks: {
        type: "array",
        items: { type: "string", enum: ["structure", "content", "tokens"] },
        description: "Optional subset of checks to run. Defaults to all.",
      },
    },
    required: ["spec"],
  },
}

export function run({ spec, checks }) {
  const enabled = new Set(checks && checks.length > 0 ? checks : ["structure", "content", "tokens"])
  const results = {}
  if (enabled.has("structure")) results.structure = checkStructure(spec)
  if (enabled.has("content")) results.content = checkContent(spec)
  if (enabled.has("tokens")) results.tokens = checkTokens(spec)

  const passed = Object.values(results).every((r) => r.passed !== false)
  const totalIssues = Object.values(results).reduce((acc, r) => acc + (r.issues?.length || 0), 0)

  return {
    passed,
    checks: results,
    summary: passed
      ? `All ${enabled.size} check(s) passed. Spec is ready to render.`
      : `${totalIssues} issue(s) across ${enabled.size} check(s). Fix and revalidate.`,
  }
}
