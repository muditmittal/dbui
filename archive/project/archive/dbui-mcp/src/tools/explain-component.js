/**
 * dbui_explain_component
 *
 * Returns the full schema for a DBUI component: variants, props, slots, and a
 * copy-paste usage example as both a Spec node and a JSX/TSX snippet.
 *
 * Source of truth is the React .tsx file (extracted via ts-morph). Basic
 * metadata (category / useFor / Figma name) comes from the L2 components.json
 * registry. The combined output is what the LLM needs to use a component
 * correctly without trial-and-error.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Project, SyntaxKind } from "ts-morph"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO = path.resolve(__dirname, "../../../..")

const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/components.json"), "utf-8")
)

// Heuristic slot-name patterns: props that conventionally accept ReactNode/JSX.
// Used when ts-morph can't resolve the type definitively.
const SLOT_HINTS = /^(children|leading|trailing|leftIcon|rightIcon|icon|prefix|suffix|action|actions|trigger|content|header|footer|title|description|label|render)/

function findComponentFile(name) {
  // Convention: src/components/ui/<kebab-name>.tsx
  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
  const candidates = [
    path.join(REPO, `packages/dbui/src/components/ui/${kebab}.tsx`),
    path.join(REPO, `packages/dbui/src/components/ui/${name.toLowerCase()}.tsx`),
  ]
  return candidates.find((p) => fs.existsSync(p))
}

/**
 * Find sibling/imported `*-variants.ts` files referenced by the component.
 * In DBUI many components externalize their CVA config (e.g. button-variants.ts).
 */
function findVariantFiles(sourceFile) {
  const files = []
  for (const imp of sourceFile.getImportDeclarations()) {
    const spec = imp.getModuleSpecifierValue()
    if (!spec.includes("variants")) continue
    if (!spec.startsWith(".")) continue
    const resolved = path.resolve(path.dirname(sourceFile.getFilePath()), spec)
    for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
      const candidate = resolved + ext
      if (fs.existsSync(candidate)) {
        files.push(candidate)
        break
      }
    }
  }
  return files
}

/**
 * Extract variant union types from any cva(...) call in a SourceFile.
 * Handles both `cva("base", { variants: {...} })` and `cva({ variants: {...} })` shapes.
 */
function extractCvaVariantsFromSourceFile(sourceFile) {
  const variants = {}
  const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)
  for (const call of calls) {
    const expr = call.getExpression()
    if (expr.getText() !== "cva") continue
    // Find the first object-literal argument (the config) — sometimes arg[0], sometimes arg[1].
    const args = call.getArguments()
    let config = null
    for (const a of args) {
      if (a.getKind() === SyntaxKind.ObjectLiteralExpression) {
        config = a
        break
      }
    }
    if (!config) continue
    const variantsProp = config.getProperty("variants")
    if (!variantsProp) continue
    const variantsObj = variantsProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
    if (!variantsObj) continue
    for (const prop of variantsObj.getProperties()) {
      if (prop.getKind() !== SyntaxKind.PropertyAssignment) continue
      const propName = prop.getName()
      const valuesObj = prop.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
      if (!valuesObj) continue
      const values = valuesObj.getProperties().map((p) => {
        const n = p.getName()
        return n.replace(/^["']|["']$/g, "")
      })
      variants[propName] = values
    }
  }
  return variants
}

/**
 * Extract CVA variants from a component file, walking any `*-variants.ts`
 * imports first, then the component file itself.
 */
function extractCvaVariants(project, sourceFile) {
  const merged = {}
  for (const file of findVariantFiles(sourceFile)) {
    try {
      const sf = project.addSourceFileAtPath(file)
      Object.assign(merged, extractCvaVariantsFromSourceFile(sf))
    } catch {
      // ignore — return what we have
    }
  }
  Object.assign(merged, extractCvaVariantsFromSourceFile(sourceFile))
  return merged
}

/**
 * Extract prop names + types from the exported component.
 * Tries (in order):
 *   1. Named interface/type alias `<Component>Props`.
 *   2. Inline intersection on the component function's first parameter type
 *      — walks each TypeLiteral within the intersection (skips external refs).
 *   3. Function parameter destructure with default values (best-effort, no types).
 */
function extractProps(sourceFile, componentName) {
  // 1. Named interface or type alias.
  const propsName = `${componentName}Props`
  const iface = sourceFile.getInterface(propsName) || sourceFile.getTypeAlias(propsName)
  if (iface) {
    const props = []
    if (iface.getKindName() === "InterfaceDeclaration") {
      for (const member of iface.getMembers()) {
        if (member.getKindName() === "PropertySignature") {
          const name = member.getName()
          const type = member.getTypeNode()?.getText() || "unknown"
          const optional = member.hasQuestionToken()
          props.push({ name, type, optional, isSlot: looksLikeSlot(name, type) })
        }
      }
    } else {
      const typeNode = iface.getTypeNode()
      if (typeNode && typeNode.getKindName() === "TypeLiteral") {
        for (const member of typeNode.getMembers()) {
          if (member.getKindName() === "PropertySignature") {
            const name = member.getName()
            const type = member.getTypeNode()?.getText() || "unknown"
            const optional = member.hasQuestionToken()
            props.push({ name, type, optional, isSlot: looksLikeSlot(name, type) })
          }
        }
      }
    }
    if (props.length > 0) return props
  }

  // 2. Inline intersection on the function parameter.
  const fn = sourceFile.getFunction(componentName) || sourceFile.getVariableDeclaration(componentName)
  if (!fn) return []
  const params = fn.getParameters?.() || []
  if (params.length === 0) return []
  const param = params[0]
  const typeNode = param.getTypeNode()
  if (!typeNode) return []

  const props = []
  function harvestTypeLiteral(literal) {
    for (const member of literal.getMembers()) {
      if (member.getKindName() === "PropertySignature") {
        const name = member.getName()
        const type = member.getTypeNode()?.getText() || "unknown"
        const optional = member.hasQuestionToken()
        props.push({ name, type, optional, isSlot: looksLikeSlot(name, type) })
      }
    }
  }
  function walkType(node) {
    const kind = node.getKindName()
    if (kind === "TypeLiteral") {
      harvestTypeLiteral(node)
    } else if (kind === "IntersectionType") {
      for (const child of node.getTypeNodes()) walkType(child)
    } else if (kind === "ParenthesizedType") {
      walkType(node.getTypeNode())
    }
    // Skip TypeReference (e.g. ButtonPrimitive.Props, VariantProps<typeof X>) —
    // we surface variants separately via extractCvaVariants.
  }
  walkType(typeNode)

  // 3. Add `children` if not already present and the function destructures it.
  // (Most DBUI components accept children even when not explicitly typed.)
  const hasChildren = props.some((p) => p.name === "children")
  if (!hasChildren) {
    const paramText = param.getText()
    if (paramText.includes("children")) {
      props.push({ name: "children", type: "React.ReactNode", optional: true, isSlot: true })
    }
  }

  return props
}

function looksLikeSlot(name, type) {
  if (SLOT_HINTS.test(name)) return true
  if (/ReactNode|ReactElement|JSX\.Element/.test(type)) return true
  return false
}

/**
 * Build a tiny abstract example Spec node + JSX snippet for the component.
 */
function buildExample(componentName, variants, props, importPath) {
  const exampleProps = {}
  // Pick the first variant value for each variant prop (defaults to "default" if present).
  for (const [k, vs] of Object.entries(variants)) {
    exampleProps[k] = vs.includes("default") ? "default" : vs[0]
  }
  // Include required non-slot props with placeholder values.
  for (const p of props) {
    if (p.optional || p.isSlot) continue
    if (exampleProps[p.name] !== undefined) continue
    if (p.type.includes("string")) exampleProps[p.name] = `"<${p.name}>"`
    else if (p.type.includes("number")) exampleProps[p.name] = 0
    else if (p.type.includes("boolean")) exampleProps[p.name] = false
  }

  // Spec node form (medium-neutral)
  const specNode = { type: componentName, props: exampleProps }

  // JSX form (React-specific)
  const propsStr = Object.entries(exampleProps)
    .map(([k, v]) => {
      if (typeof v === "string" && v.startsWith('"<')) return `${k}=${v}`
      if (typeof v === "string") return `${k}="${v}"`
      return `${k}={${JSON.stringify(v)}}`
    })
    .join(" ")
  const hasChildren = props.some((p) => p.name === "children")
  const jsx = hasChildren
    ? `<${componentName}${propsStr ? " " + propsStr : ""}>...</${componentName}>`
    : `<${componentName}${propsStr ? " " + propsStr : ""} />`

  return { specNode, jsx, importLine: `import { ${componentName} } from "${importPath}"` }
}

export const tool = {
  name: "dbui_explain_component",
  description:
    "Return a component's full schema: variants, props (typed), slots, and copy-paste usage examples (both Spec node and JSX). Call this before instancing a component so you set the right variant and fill the right slots — never guess.",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Component name (e.g. 'Button', 'Input', 'Drawer'). PascalCase, exact match.",
      },
    },
    required: ["name"],
  },
}

export function run({ name }) {
  const meta = components.find((c) => c.name === name)
  if (!meta) {
    // Try case-insensitive
    const ci = components.find((c) => c.name.toLowerCase() === name.toLowerCase())
    if (!ci) {
      return {
        name,
        found: false,
        note: `No component named "${name}" in registry. Call dbui_lookup_component({ query: "${name}" }) to find similar names.`,
      }
    }
    return run({ name: ci.name })
  }

  const file = findComponentFile(name)
  let variants = {}
  let props = []
  if (file) {
    const project = new Project({ skipAddingFilesFromTsConfig: true, useInMemoryFileSystem: false })
    try {
      const sourceFile = project.addSourceFileAtPath(file)
      variants = extractCvaVariants(project, sourceFile)
      props = extractProps(sourceFile, name)
    } catch (e) {
      // ts-morph parse error — return what we have from registry
      return {
        name,
        found: true,
        warning: `Couldn't parse ${path.relative(REPO, file)}: ${e.message}. Returning registry-only info.`,
        category: meta.category,
        useFor: meta.useFor,
        avoidFor: meta.avoidFor,
        figma: meta.figma,
        importPath: meta.importPath,
      }
    }
  }

  const slots = props.filter((p) => p.isSlot).map((p) => p.name)
  const nonSlotProps = props.filter((p) => !p.isSlot)
  const example = buildExample(name, variants, props, meta.importPath)

  return {
    name,
    found: true,
    sourceFile: file ? path.relative(REPO, file) : null,
    category: meta.category,
    useFor: meta.useFor,
    avoidFor: meta.avoidFor,
    synonyms: meta.synonyms,
    figma: meta.figma,
    importPath: meta.importPath,
    variants,            // { variant: ["default", "outline", ...], size: ["default", "sm", ...] }
    props: nonSlotProps, // [{ name, type, optional, isSlot: false }, ...]
    slots,               // ["children", "leftIcon", ...]
    example,             // { specNode, jsx, importLine }
    note:
      Object.keys(variants).length === 0 && props.length === 0
        ? "Schema extraction returned no variants or props. The component may use minimal typing or live outside src/components/ui/. Check the source file directly."
        : `Component has ${Object.keys(variants).length} variant prop(s) and ${slots.length} slot(s). Use example.specNode in a Spec, or example.jsx in TSX.`,
  }
}
