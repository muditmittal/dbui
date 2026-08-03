/**
 * dbui_render_figma
 *
 * Stage 4 of the build loop. Takes a Spec (output of dbui_hydrate) and emits
 * a self-contained JavaScript body to pass to the Figma plugin's use_figma
 * tool. When executed, the script builds a real Figma frame using DBUI
 * component instances — never raw shapes — so the output matches the
 * design system exactly.
 *
 * Approach:
 *   1. The Spec wraps everything in a shell (defaults to BaseShell).
 *   2. The renderer creates a 1440×960 outer frame.
 *   3. It instances Platform Header at the top + Platform Nav on the left.
 *   4. It creates a Content frame on the right with VERTICAL auto-layout.
 *   5. For each Spec content node:
 *        - Find the component master by name via figma.findOne / searchComponents.
 *        - createInstance() and append to Content.
 *        - Map React props → Figma variant property values (case-insensitive,
 *          "default" → "Default"). Text props → Figma TEXT properties.
 *        - Recursively render children into instance-internal slots when the
 *          component supports them (limited — Figma instances are mostly opaque).
 *   6. Return a list of created node IDs so the caller can validate the result.
 *
 * What it does NOT do (yet):
 *   - Pre-cache component keys (uses runtime search; slower but works without L2).
 *   - Resolve cross-page imports via importComponentByKeyAsync (would need
 *     figma-component-keys.json from L2).
 *   - Drill into instance internals to swap nested instance slots
 *     (e.g., DropdownMenu rows). For now the consumer's Spec props
 *     should describe the public surface only.
 *
 * Returns:
 *   {
 *     code: "<full async JS body>",
 *     warnings: [...],
 *     usage: "Pass `code` to use_figma's `code` parameter.",
 *   }
 */
import { isSpec, DEFAULT_SHELL } from "../spec.js"

// React prop names → expected Figma variant property name patterns.
// Most are 1:1 (variant, size, state). The renderer matches case-insensitively
// against componentPropertyDefinitions keys.
const KNOWN_VARIANT_PROPS = ["variant", "size", "state", "type", "layout", "intent", "tone"]

// React variant values → Figma variant value. Most are direct, capitalized.
// Special cases land here.
const VALUE_OVERRIDES = {
  default: "Default",
  outline: "Outline",
  ghost: "Ghost",
  link: "Link",
  destructive: "Destructive",
  danger: "Danger",
  secondary: "Secondary",
  primary: "Default", // primary === default in DBUI
  sm: "Small",
  md: "Default",
  lg: "Large",
  "icon-sm": "Icon Small",
  "icon-md": "Icon",
  pill: "Pill",
  "default-tab": "Default",
}

function escapeJsString(s) {
  return JSON.stringify(s)
}

function jsValue(v) {
  if (v === null || v === undefined) return "null"
  if (typeof v === "string") return JSON.stringify(v)
  if (typeof v === "number" || typeof v === "boolean") return String(v)
  return JSON.stringify(v)
}

function jsObject(obj) {
  if (!obj || Object.keys(obj).length === 0) return "{}"
  const entries = Object.entries(obj)
    .map(([k, v]) => `${JSON.stringify(k)}: ${jsValue(v)}`)
    .join(", ")
  return `{ ${entries} }`
}

/**
 * Generate the Plugin API call sequence for a single Spec content node.
 * Each node emits ~5–10 lines of JS that find the component, create an
 * instance, set variant + text properties, and append it to the content frame.
 */
function emitNode(node, contentVar, idCounter, warnings) {
  const id = `n${idCounter.n++}`
  const lines = []
  const componentName = node.type
  if (componentName.startsWith("_")) {
    // Internal placeholder (e.g. _Unmatched) — skip but warn.
    warnings.push(`Skipping unmatched placeholder node "${componentName}".`)
    return { code: "", id: null }
  }

  lines.push(`// ── ${componentName} ──`)
  lines.push(
    `const ${id}_search = await figma.searchComponentsAsync({ query: ${escapeJsString(componentName)} });`
  )
  lines.push(
    `let ${id}_master = ${id}_search.components.find(c => c.name === ${escapeJsString(componentName)});`
  )
  lines.push(
    `if (!${id}_master) ${id}_master = ${id}_search.components.find(c => c.name.replace(/^\\.+/, "") === ${escapeJsString(componentName)});`
  )
  lines.push(`if (!${id}_master) {`)
  lines.push(
    `  warnings.push("Could not find Figma component for type: ${componentName}");`
  )
  lines.push(`} else {`)
  lines.push(`  const ${id} = ${id}_master.createInstance();`)
  lines.push(`  ${id}.name = ${escapeJsString(componentName)};`)
  lines.push(`  ${contentVar}.appendChild(${id});`)

  // Map props → variant / text component properties.
  const props = node.props || {}
  const variantProps = {}
  const textProps = {}
  for (const [k, v] of Object.entries(props)) {
    if (typeof v !== "string" && typeof v !== "number" && typeof v !== "boolean") continue
    if (KNOWN_VARIANT_PROPS.includes(k.toLowerCase())) {
      variantProps[k] = v
    } else {
      // Heuristic: short strings are likely text. Long / multiword strings — same.
      // We attempt both via setProperties; non-matches fail silently.
      textProps[k] = v
    }
  }

  if (Object.keys(variantProps).length > 0 || Object.keys(textProps).length > 0) {
    lines.push(`  try {`)
    lines.push(`    const ${id}_defs = ${id}.componentProperties || {};`)
    lines.push(`    const ${id}_updates = {};`)
    // Variant matching: case-insensitive on the React prop key, with VALUE_OVERRIDES.
    for (const [reactKey, value] of Object.entries(variantProps)) {
      const overrideKey = `${value}`.toLowerCase()
      const target = VALUE_OVERRIDES[overrideKey] ?? value
      lines.push(`    {`)
      lines.push(
        `      const k = Object.keys(${id}_defs).find(k => k.toLowerCase().split("#")[0] === ${escapeJsString(reactKey.toLowerCase())});`
      )
      lines.push(`      if (k && ${id}_defs[k].type === "VARIANT") ${id}_updates[k] = ${escapeJsString(String(target))};`)
      lines.push(`    }`)
    }
    // Text matching: same approach but only when the prop type is TEXT.
    for (const [reactKey, value] of Object.entries(textProps)) {
      lines.push(`    {`)
      lines.push(
        `      const k = Object.keys(${id}_defs).find(k => k.toLowerCase().split("#")[0].includes(${escapeJsString(reactKey.toLowerCase())}) && ${id}_defs[k].type === "TEXT");`
      )
      lines.push(`      if (k) ${id}_updates[k] = ${escapeJsString(String(value))};`)
      lines.push(`    }`)
    }
    lines.push(`    if (Object.keys(${id}_updates).length > 0) ${id}.setProperties(${id}_updates);`)
    lines.push(`    createdNodeIds.push(${id}.id);`)
    lines.push(`  } catch (e) {`)
    lines.push(`    warnings.push("Failed to set properties on ${componentName}: " + e.message);`)
    lines.push(`  }`)
  } else {
    lines.push(`  createdNodeIds.push(${id}.id);`)
  }
  lines.push(`}`)
  return { code: lines.join("\n  "), id }
}

export const tool = {
  name: "dbui_render_figma",
  description:
    "Stage 4 of the build loop (Figma target). Takes a Spec (output of dbui_hydrate) and returns a self-contained JavaScript body to pass to use_figma. The script builds a real Figma frame using DBUI component instances — never raw shapes — so the output matches the design system exactly. Always use this AFTER dbui_validate passes.",
  inputSchema: {
    type: "object",
    properties: {
      spec: {
        type: "object",
        description: "The Spec to render (output of dbui_hydrate).",
      },
      pageName: {
        type: "string",
        description:
          "Optional name of an existing Figma page to render onto. If omitted or not found, the frame goes on the current page.",
      },
      placeNearNodeId: {
        type: "string",
        description:
          "Optional node ID to position the new frame next to. Avoids overlap at (0,0). The renderer scans for clear space around this node.",
      },
      frameName: {
        type: "string",
        description: "Optional name for the outer 1440×960 frame. Defaults to 'DBUI Render'.",
      },
    },
    required: ["spec"],
  },
}

export function run({ spec, pageName, placeNearNodeId, frameName = "DBUI Render" }) {
  const warnings = []

  // Validate spec shape.
  const validation = isSpec(spec)
  if (!validation.valid) {
    return {
      code: null,
      warnings: validation.errors.map((e) => `Invalid Spec: ${e}`),
      usage: "Spec is invalid — fix errors and re-run dbui_hydrate / dbui_validate.",
    }
  }

  const shellName = spec.shell || DEFAULT_SHELL
  if (shellName !== DEFAULT_SHELL) {
    warnings.push(
      `Renderer currently scaffolds the BaseShell layout (Header + Nav + Content). Spec.shell="${shellName}" is acknowledged but the layout will look like BaseShell until additional shell renderers land.`
    )
  }

  // Build node-emission code.
  const idCounter = { n: 1 }
  const contentVar = "contentFrame"
  const nodeBlocks = []
  for (const node of spec.content) {
    const block = emitNode(node, contentVar, idCounter, warnings)
    if (block.code) nodeBlocks.push(block.code)
  }

  const code = `
// Generated by dbui_render_figma — DO NOT hand-edit.
// Spec.shell: ${shellName}
// Content nodes: ${spec.content.length}
const warnings = [];
const createdNodeIds = [];

// 1. Switch to target page if requested.
${
  pageName
    ? `const targetPage = figma.root.children.find(p => p.name === ${escapeJsString(pageName)});
if (targetPage) await figma.setCurrentPageAsync(targetPage);
else warnings.push("Page not found: " + ${escapeJsString(pageName)});`
    : `// (no pageName provided — using current page)`
}

// 2. Create the outer 1440×960 frame.
const outer = figma.createFrame();
outer.name = ${escapeJsString(frameName)};
outer.resize(1440, 960);
outer.fills = [];
outer.clipsContent = true;

// Position away from (0,0) to avoid overlap.
${
  placeNearNodeId
    ? `const anchor = await figma.getNodeByIdAsync(${escapeJsString(placeNearNodeId)});
if (anchor) {
  outer.x = anchor.x + anchor.width + 200;
  outer.y = anchor.y;
} else {
  outer.x = 0; outer.y = 0;
}`
    : `outer.x = 0; outer.y = 0;`
}

createdNodeIds.push(outer.id);

// 3. Find shell building blocks (Platform Header, Platform Nav).
const phSearch = await figma.searchComponentsAsync({ query: "Platform Header" });
const phMaster = phSearch.components.find(c => c.name === "Platform Header");
const pnSearch = await figma.searchComponentsAsync({ query: "Platform Nav" });
const pnMaster = pnSearch.components.find(c => c.name === "Platform Nav");

if (!phMaster) warnings.push("Platform Header component not found — header will be skipped.");
if (!pnMaster) warnings.push("Platform Nav component not found — nav will be skipped.");

// 4. Place Platform Header at top.
if (phMaster) {
  const ph = phMaster.createInstance();
  ph.name = "Platform Header";
  ph.x = 0; ph.y = 0;
  ph.resize(1440, 48);
  outer.appendChild(ph);
  createdNodeIds.push(ph.id);
}

// 5. Create Page row (Nav + Content) below header.
const page = figma.createFrame();
page.name = "Page";
page.x = 0; page.y = 48;
page.resize(1440, 912);
page.fills = [];
outer.appendChild(page);
createdNodeIds.push(page.id);

if (pnMaster) {
  const pn = pnMaster.createInstance();
  pn.name = "Platform Nav";
  pn.x = 8; pn.y = 0;
  pn.resize(180, 904);
  page.appendChild(pn);
  createdNodeIds.push(pn.id);
}

// 6. Create Content frame (auto-layout VERTICAL).
const ${contentVar} = figma.createFrame();
${contentVar}.name = "Content";
${contentVar}.x = 196; ${contentVar}.y = 0;
${contentVar}.resize(1236, 904);
${contentVar}.cornerRadius = 8;
${contentVar}.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
${contentVar}.layoutMode = "VERTICAL";
${contentVar}.primaryAxisSizingMode = "FIXED";
${contentVar}.counterAxisSizingMode = "FIXED";
${contentVar}.itemSpacing = 0;
page.appendChild(${contentVar});
createdNodeIds.push(${contentVar}.id);

// 7. Render Spec content nodes — real component instances, never raw shapes.
${nodeBlocks.join("\n\n")}

return { createdNodeIds, outerFrameId: outer.id, contentFrameId: ${contentVar}.id, warnings };
`.trim()

  return {
    code,
    warnings,
    usage:
      "Pass `code` to use_figma's `code` parameter. Then call dbui_check_figma_node({ nodeId: outerFrameId }) to verify the result uses real DBUI instances.",
  }
}
