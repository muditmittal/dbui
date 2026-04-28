/**
 * dbui_compose_figma_frame
 *
 * Takes a structured layout spec naming DBUI components and arrangement,
 * returns a self-contained JS body to inject into use_figma. The agent
 * (or user) runs the snippet via the Figma MCP to actually create the
 * frame.
 *
 * The spec is a small tree:
 *
 *   {
 *     "name": "User Card",
 *     "layout": "vertical",            // "horizontal" | "vertical"
 *     "gap": 16, "padding": 16,
 *     "fill": "background",            // optional CSS variable name
 *     "children": [
 *       { "component": "Avatar", "props": { "type": "Initials" } },
 *       { "component": "Card",   "children": [
 *           { "component": "CardHeader", "children": [
 *             { "component": "CardTitle", "text": "Jane Doe" }
 *           ] },
 *           { "component": "CardContent", "text": "Engineer" }
 *         ]
 *       }
 *     ]
 *   }
 *
 * Returns:
 *   {
 *     code: "<full JS body>",
 *     usage: "Pass `code` to use_figma's `code` parameter.",
 *     warnings: [...]   // missing component keys, ambiguous names, etc.
 *   }
 *
 * NOTE: Figma's importComponentByKeyAsync requires component KEYS (not node IDs).
 * Component keys are stable across publish cycles. We pre-bake known keys into
 * the data file at packages/dbui-mcp/src/data/figma-component-keys.json.
 *
 * For now (until that file is filled in), the generator emits placeholder
 * importComponentByKeyAsync calls keyed by the component name. The actual
 * key needs to be substituted by the calling agent — or we can fall back
 * to importComponentSetByKeyAsync + variants.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Try to load component keys; fall back to empty if unavailable.
let figmaKeys = {}
const keyFile = path.resolve(__dirname, "../data/figma-component-keys.json")
if (fs.existsSync(keyFile)) {
  try {
    figmaKeys = JSON.parse(fs.readFileSync(keyFile, "utf-8"))
  } catch (e) {
    figmaKeys = {}
  }
}

export const tool = {
  name: "dbui_compose_figma_frame",
  description:
    "Generate the JavaScript body to compose a Figma frame from DBUI components. Pass the result to use_figma to actually create the frame. Use this whenever you want to create a layout in Figma using DBUI primitives — it handles auto-layout, padding/gap, component instancing, and color binding via Figma variables.",
  inputSchema: {
    type: "object",
    properties: {
      spec: {
        type: "object",
        description:
          "Layout spec tree. Top-level requires `name` and `children`. Each child can be a `component` (DBUI component name) with optional `props`/`children`/`text`, or a nested frame with `layout`/`gap`/`padding`/`children`.",
      },
      pageId: {
        type: "string",
        description: "Optional Figma page ID where the frame should be appended. If omitted, the frame is created on the current page.",
      },
      placeNear: {
        type: "string",
        description: "Optional node ID to place the new frame next to (avoids overlap at 0,0).",
      },
    },
    required: ["spec"],
  },
}

function escapeJsString(s) {
  return JSON.stringify(s)
}

function emitFrame(spec, varCounter) {
  const id = `n${varCounter.n++}`
  const layoutMode = spec.layout === "horizontal" ? "HORIZONTAL" : "VERTICAL"
  const gap = spec.gap || 0
  const padding = spec.padding || 0
  const fillVar = spec.fill // e.g. "background"

  const lines = []
  lines.push(`const ${id} = figma.createFrame();`)
  lines.push(`${id}.name = ${escapeJsString(spec.name || "Frame")};`)
  lines.push(`${id}.layoutMode = ${escapeJsString(layoutMode)};`)
  lines.push(`${id}.itemSpacing = ${gap};`)
  lines.push(`${id}.paddingTop = ${id}.paddingBottom = ${id}.paddingLeft = ${id}.paddingRight = ${padding};`)
  lines.push(`${id}.primaryAxisSizingMode = "AUTO";`)
  lines.push(`${id}.counterAxisSizingMode = "AUTO";`)
  if (fillVar) {
    lines.push(`// Bind fill to the "${fillVar}" Figma variable if present`)
    lines.push(`try {`)
    lines.push(`  const collections = await figma.variables.getLocalVariableCollectionsAsync();`)
    lines.push(`  const allVars = (await Promise.all(collections.flatMap(c => c.variableIds.map(id => figma.variables.getVariableByIdAsync(id))))).filter(Boolean);`)
    lines.push(`  const targetVar = allVars.find(v => v && v.name === ${escapeJsString(fillVar)});`)
    lines.push(`  if (targetVar) {`)
    lines.push(`    const newFill = figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", targetVar);`)
    lines.push(`    ${id}.fills = [newFill];`)
    lines.push(`  }`)
    lines.push(`} catch (e) { /* variable binding failed; leaving default fill */ }`)
  } else {
    lines.push(`${id}.fills = [];`)
  }
  return { id, lines }
}

function emitComponentInstance(spec, varCounter, warnings) {
  const id = `n${varCounter.n++}`
  const componentName = spec.component
  const key = figmaKeys[componentName]

  const lines = []
  if (key) {
    lines.push(`// Import DBUI component "${componentName}" by published key`)
    lines.push(`const ${id}_master = await figma.importComponentByKeyAsync(${escapeJsString(key)});`)
    lines.push(`const ${id} = ${id}_master.createInstance();`)
  } else {
    warnings.push(
      `Missing Figma component key for "${componentName}". Generated code uses search_design_system as a fallback — make sure the component is published. Run scripts/build-data.js after refreshing keys.`
    )
    // Fallback: search for the component in published libraries via Figma's search API
    lines.push(`// FALLBACK: no published key for "${componentName}" — search_design_system at runtime`)
    lines.push(`const ${id}_results = await figma.teamLibrary.searchComponents({ query: ${escapeJsString(componentName)}, limit: 1 });`)
    lines.push(`const ${id}_master = ${id}_results.length ? await figma.importComponentByKeyAsync(${id}_results[0].key) : null;`)
    lines.push(`if (!${id}_master) { return { error: "Could not find DBUI component: ${componentName}" }; }`)
    lines.push(`const ${id} = ${id}_master.createInstance();`)
  }
  if (spec.props) {
    // Variant property overrides
    const props = JSON.stringify(spec.props)
    lines.push(`try { ${id}.setProperties(${props}); } catch (e) { /* variant property mismatch */ }`)
  }
  if (spec.text && componentName === "Text") {
    lines.push(`// (text node — only emitted when component is plain Text)`)
  }
  return { id, lines }
}

function emitChild(spec, parentId, varCounter, warnings) {
  if (spec.component) {
    const { id, lines } = emitComponentInstance(spec, varCounter, warnings)
    lines.push(`${parentId}.appendChild(${id});`)
    // appendChild can also accept FILL/HUG sizing AFTER append
    return { id, lines }
  }
  // Nested frame
  const { id, lines } = emitFrame(spec, varCounter)
  lines.push(`${parentId}.appendChild(${id});`)
  if (spec.children) {
    for (const child of spec.children) {
      const { lines: childLines } = emitChild(child, id, varCounter, warnings)
      lines.push(...childLines)
    }
  }
  return { id, lines }
}

export function run({ spec, pageId, placeNear }) {
  if (!spec || typeof spec !== "object") {
    return { error: "spec is required and must be an object" }
  }
  const warnings = []
  const varCounter = { n: 0 }

  const head = []
  if (pageId) {
    head.push(`const targetPage = await figma.getNodeByIdAsync(${escapeJsString(pageId)});`)
    head.push(`if (targetPage && targetPage.type === "PAGE") await figma.setCurrentPageAsync(targetPage);`)
  }

  const { id: rootId, lines: rootLines } = emitFrame(spec, varCounter)
  const childrenLines = []
  if (spec.children) {
    for (const child of spec.children) {
      const { lines } = emitChild(child, rootId, varCounter, warnings)
      childrenLines.push(...lines)
    }
  }

  const tail = []
  // Place the frame somewhere visible
  if (placeNear) {
    tail.push(`const __anchor = await figma.getNodeByIdAsync(${escapeJsString(placeNear)});`)
    tail.push(`if (__anchor && "x" in __anchor) {`)
    tail.push(`  ${rootId}.x = __anchor.x + (__anchor.width || 0) + 32;`)
    tail.push(`  ${rootId}.y = __anchor.y;`)
    tail.push(`}`)
  } else {
    tail.push(`figma.currentPage.appendChild(${rootId});`)
    tail.push(`// Position to the right of existing content to avoid overlap at (0,0)`)
    tail.push(`const __existing = figma.currentPage.children.filter(n => n.id !== ${rootId}.id);`)
    tail.push(`const __maxX = __existing.reduce((m, n) => Math.max(m, ("x" in n ? n.x : 0) + ("width" in n ? n.width : 0)), 0);`)
    tail.push(`${rootId}.x = __maxX + 64;`)
    tail.push(`${rootId}.y = 0;`)
  }
  tail.push(``)
  tail.push(`return { createdNodeIds: [${rootId}.id], rootId: ${rootId}.id, name: ${rootId}.name };`)

  const code = [
    "// Auto-generated by dbui_compose_figma_frame",
    ...head,
    ...rootLines,
    ...childrenLines,
    ...tail,
  ].join("\n")

  return {
    code,
    usage: "Pass `code` as the `code` arg to use_figma. The Figma MCP will execute it and return the new frame's node ID. Then call get_screenshot on that node to capture it.",
    warnings,
    keyMapStatus: Object.keys(figmaKeys).length === 0
      ? "No published Figma component keys are loaded. The generated code falls back to search_design_system, which works but is slower. To pre-bake the keys, run scripts/sync-figma-keys.js (TODO)."
      : `${Object.keys(figmaKeys).length} component keys loaded.`,
  }
}
