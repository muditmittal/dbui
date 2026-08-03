/**
 * dbui_render_react
 *
 * Stage 4 of the build loop (React target). Takes a Spec (output of dbui_hydrate)
 * and emits TSX — a Storybook story by default, or raw TSX text if you just
 * want the code. Consumes the universal Spec contract; no hand-written JSX
 * required.
 *
 * Approach:
 *   1. Resolve imports for every component used (lookup importPath via components.json).
 *   2. Resolve shell import (BaseShell → import { Base } from "dbui-shells").
 *   3. Generate JSX tree from spec.content, recursively.
 *   4. If `mode: "story"` (default): write a Storybook story file under
 *      apps/portal/src/stories/_preview/ and return URL + path.
 *      If `mode: "tsx"`: return the TSX text only.
 *
 * What it does NOT do:
 *   - Type-check the generated code (Storybook + TS will).
 *   - Execute it for screenshots (deferred — would need puppeteer; see
 *     project/iteration-loops.md).
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isSpec, DEFAULT_SHELL } from "../spec.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO = path.resolve(__dirname, "../../../..")
const PREVIEW_DIR = path.join(REPO, "apps/portal/src/stories/_preview")

const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/components.json"), "utf-8")
)
const componentByName = new Map(components.map((c) => [c.name, c]))

// Shell imports — known shells live in @muditmittal/dbui-shells.
// (When the L2 shells.json extractor lands, this map regenerates from there.)
const SHELL_IMPORTS = {
  BaseShell: { name: "Base", importPath: "@muditmittal/dbui-shells" },
  CatalogLayout: { name: "CatalogLayout", importPath: "@muditmittal/dbui-shells" },
}

function safeName(name) {
  return name.replace(/[^A-Za-z0-9]/g, "")
}

function ensureDir() {
  if (!fs.existsSync(PREVIEW_DIR)) fs.mkdirSync(PREVIEW_DIR, { recursive: true })
}

/**
 * Render a single prop value as JSX attribute syntax.
 *   string  → ="value"
 *   bool/num → ={value}
 *   object/array → ={...}
 */
function renderPropValue(value) {
  if (typeof value === "string") return `=${JSON.stringify(value)}`
  if (typeof value === "number" || typeof value === "boolean") return `={${value}}`
  if (value === null || value === undefined) return `={null}`
  return `={${JSON.stringify(value)}}`
}

/**
 * Render a SpecNode → JSX string. `imports` is mutated to collect needed
 * import statements. `warnings` is mutated to collect issues.
 */
function renderNode(node, imports, warnings, depth = 0) {
  if (!node || !node.type) {
    warnings.push(`Empty node at depth ${depth}.`)
    return ""
  }
  if (node.type.startsWith("_")) {
    warnings.push(`Skipping placeholder node "${node.type}" (role: ${node.props?.role || "unknown"}).`)
    return `{/* placeholder: ${node.props?.role || node.type} */}`
  }
  const meta = componentByName.get(node.type)
  if (!meta) {
    warnings.push(`Unknown component "${node.type}". Falling back to raw element — this will fail at runtime.`)
    return `{/* unknown component: ${node.type} */}`
  }

  // Track import. Many DBUI components share files; the import path is
  // canonical-per-component name in components.json.
  imports.add(`import { ${node.type} } from "${meta.importPath}"`)

  const props = node.props || {}
  const indent = "  ".repeat(depth + 2) // start at 2 indents (function body + return)

  // Split children-likes from regular props.
  const { children: childrenProp, ...restProps } = props

  const propStrings = Object.entries(restProps)
    .filter(([, v]) => typeof v !== "object" || v === null) // simple props inline
    .map(([k, v]) => `${k}${renderPropValue(v)}`)
  const complexPropStrings = Object.entries(restProps)
    .filter(([, v]) => typeof v === "object" && v !== null)
    .map(([k, v]) => `${k}={${JSON.stringify(v, null, 2)}}`)

  // Children: from explicit `children` prop (string), or from node.children (Spec subtree).
  let childContent = ""
  if (Array.isArray(node.children) && node.children.length > 0) {
    childContent =
      "\n" +
      node.children.map((c) => indent + "  " + renderNode(c, imports, warnings, depth + 1)).join("\n") +
      "\n" +
      indent
  } else if (typeof childrenProp === "string") {
    childContent = childrenProp
  }

  const allProps = [...propStrings, ...complexPropStrings].join(" ")
  const propsPart = allProps ? " " + allProps : ""

  if (!childContent) {
    return `<${node.type}${propsPart} />`
  }
  return `<${node.type}${propsPart}>${childContent}</${node.type}>`
}

/**
 * Generate the full TSX body (imports + component tree) from a Spec.
 */
function specToTsx(spec, componentName) {
  const warnings = []
  const imports = new Set()

  const shellName = spec.shell || DEFAULT_SHELL
  const shellInfo = SHELL_IMPORTS[shellName]
  if (!shellInfo) {
    warnings.push(`Unknown shell "${shellName}". Rendering content unwrapped.`)
  } else {
    imports.add(`import { ${shellInfo.name} } from "${shellInfo.importPath}"`)
  }

  // Render the inner content first (so imports get collected).
  const contentJsx = (spec.content || [])
    .map((node) => "      " + renderNode(node, imports, warnings, 1))
    .join("\n")

  // Wrap in shell.
  const shellProps = spec.shellProps || {}
  const shellPropsString = Object.entries(shellProps)
    .map(([k, v]) => `${k}${renderPropValue(v)}`)
    .join(" ")
  const shellPropsPart = shellPropsString ? " " + shellPropsString : ""

  let body
  if (shellInfo) {
    body = `<${shellInfo.name}${shellPropsPart}>
${contentJsx}
    </${shellInfo.name}>`
  } else {
    body = `<>
${contentJsx}
    </>`
  }

  const importsBlock = [...imports].sort().join("\n")

  const tsx = `// Generated by dbui_render_react — safe to edit
${importsBlock}

export function ${componentName}() {
  return (
    ${body}
  )
}
`

  return { tsx, warnings, imports: [...imports] }
}

/**
 * Wrap a generated component in a Storybook story file.
 */
function buildStoryFile({ tsx, componentName }) {
  return `// AUTO-GENERATED by dbui_render_react — safe to delete
import type { Meta, StoryObj } from "@storybook/react"

${tsx
  .split("\n")
  .map((l) => l.replace(/^export function /, `function _${componentName}_Component = () => `).replace(/^\s*\}\s*$/, "}"))
  .join("\n")}

const meta = {
  title: "_Preview/${componentName}",
  component: ${componentName} as any,
  parameters: { layout: "fullscreen" },
} satisfies Meta<any>
export default meta

export const Default: StoryObj = {}
`
}

export const tool = {
  name: "dbui_render_react",
  description:
    "Stage 4 of the build loop (React target). Takes a Spec (output of dbui_hydrate) and emits TSX. Default mode writes a Storybook story under apps/portal/src/stories/_preview/ and returns the URL. Mode 'tsx' returns the raw TSX text. Mode 'cleanup' removes a previous story file with the same name.",
  inputSchema: {
    type: "object",
    properties: {
      spec: {
        type: "object",
        description: "The Spec to render (output of dbui_hydrate). Required unless mode='cleanup'.",
      },
      mode: {
        type: "string",
        enum: ["story", "tsx", "cleanup"],
        description: "story (write Storybook file, return URL), tsx (return raw TSX text), cleanup (delete previously-written story).",
        default: "story",
      },
      name: {
        type: "string",
        description: "Component / story name. Default 'Preview'.",
        default: "Preview",
      },
    },
    required: [],
  },
}

export function run({ spec, mode = "story", name = "Preview" }) {
  const componentName = safeName(name) || "Preview"

  if (mode === "cleanup") {
    ensureDir()
    const filePath = path.join(PREVIEW_DIR, `${componentName}.stories.tsx`)
    const fileRel = path.relative(REPO, filePath)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return { ok: true, removed: fileRel, message: `Cleaned up ${fileRel}.` }
    }
    return { ok: true, message: `Nothing to clean up (no file at ${fileRel}).` }
  }

  if (!spec) {
    return { ok: false, error: "spec is required for mode='story' or mode='tsx'." }
  }

  // Validate spec shape.
  const validation = isSpec(spec)
  if (!validation.valid) {
    return {
      ok: false,
      error: "Invalid Spec",
      details: validation.errors,
    }
  }

  const { tsx, warnings, imports } = specToTsx(spec, componentName)

  if (mode === "tsx") {
    return { ok: true, tsx, imports, warnings }
  }

  // mode === "story"
  ensureDir()
  const filePath = path.join(PREVIEW_DIR, `${componentName}.stories.tsx`)
  const fileRel = path.relative(REPO, filePath)
  const url = `http://localhost:6006/?path=/story/_preview-${componentName.toLowerCase()}--default`

  const story = buildStoryFile({ tsx, componentName })
  fs.writeFileSync(filePath, story)

  return {
    ok: true,
    file: fileRel,
    storybookUrl: url,
    imports,
    warnings,
    instructions: [
      `1. Wrote the story to ${fileRel}.`,
      `2. If Storybook is running, the dev server will hot-reload. Otherwise: \`yarn workspace portal storybook\` (port 6006).`,
      `3. Open: ${url}`,
      `4. After review, call dbui_render_react with mode: "cleanup" + same name.`,
    ],
  }
}
