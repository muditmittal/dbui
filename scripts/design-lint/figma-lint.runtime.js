/**
 * figma-design-lint — runs inside Figma via the Plugin API (use_figma).
 *
 * Lints a target frame/page/component for DBUI compliance:
 *   1. Component compliance — every INSTANCE on the canvas belongs to the DBUI library
 *      (its mainComponent.name is in the published DBUI master list).
 *   2. Token compliance — every fill, stroke, font, spacing value either:
 *        a. is bound to a Figma variable (var(--token)), OR
 *        b. matches an approved hex/px/font value.
 *
 * Output: a JSON report shape:
 *   {
 *     scope: { id, name, type },
 *     summary: { errors, warnings, info, totalNodes },
 *     violations: [{ id, name, type, level, rule, message, fix }],
 *   }
 *
 * Usage (via use_figma MCP):
 *   - Embed this file's body inside a use_figma call
 *   - Pass `targetNodeId` (the page/frame/component to lint) at the top
 *   - The script returns the full report; the caller renders it as markdown
 *
 * INPUTS expected at the top of the executed body (set by the caller):
 *   const TARGET_NODE_ID = "1234:5678"
 *   const DBUI_COMPONENT_SET = new Set(["Alert", "Button", ...])
 *   const APPROVED_HEX = new Set(["#FFFFFF", "#161616", ...])
 *   const APPROVED_SPACING_PX = new Set([0, 4, 8, ...])
 *   const APPROVED_FONTS = new Set(["SF Pro Text", "SF Pro Display", "SF Mono"])
 *   const APPROVED_TYPE_RAMP = [{ size: 13, lineHeight: 20, weight: 400 }, ...]
 *
 * Returns: { scope, summary, violations }
 */

// ─── Helpers ───

function rgbToHex({ r, g, b }) {
  const toHex = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function nearestSpacing(px) {
  let best = 0
  let bestDiff = Infinity
  for (const v of APPROVED_SPACING_PX) {
    const diff = Math.abs(px - v)
    if (diff < bestDiff) {
      bestDiff = diff
      best = v
    }
  }
  return best
}

function nearestRampSize(px) {
  let best = APPROVED_TYPE_RAMP[0]?.size ?? 13
  let bestDiff = Infinity
  for (const r of APPROVED_TYPE_RAMP) {
    const diff = Math.abs(px - r.size)
    if (diff < bestDiff) {
      bestDiff = diff
      best = r.size
    }
  }
  return best
}

const violations = []

function record(node, level, rule, message, fix) {
  violations.push({
    id: node.id,
    name: node.name,
    type: node.type,
    level,
    rule,
    message,
    fix,
  })
}

// ─── Component compliance ───

async function checkInstance(node) {
  // INSTANCE nodes have a mainComponent property
  if (node.type !== "INSTANCE") return
  let mc = null
  try {
    mc = await node.getMainComponentAsync()
  } catch (e) {
    record(node, "warning", "instance-no-main-component",
      `Instance has no resolvable main component: ${node.name}`,
      `This instance may be detached or the master is missing. Re-link it.`)
    return
  }
  if (!mc) return

  // Figure out the component name from the master or its component set
  const masterName = mc.name
  const masterSet = mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent.name : null
  const candidate = masterSet || masterName

  // Strip leading dot for private masters
  const normalized = candidate.replace(/^\./, "").replace(/ /g, "")

  // Some Figma masters are spelled with spaces (e.g. "Alert Dialog" → AlertDialog)
  if (!DBUI_COMPONENT_SET.has(normalized)) {
    record(node, "error", "non-dbui-component",
      `<${node.name}> is an instance of "${candidate}", which is not a DBUI component.`,
      `Replace with a DBUI master (Button, Card, Empty, etc.) or, if this is meant to be a DBUI component, publish/rename the master to match.`)
  }
}

// ─── Token compliance ───

function checkFills(node) {
  if (!("fills" in node)) return
  const fills = node.fills
  if (!Array.isArray(fills)) return
  for (const fill of fills) {
    if (!fill.visible) continue
    if (fill.type !== "SOLID") continue
    const hex = rgbToHex(fill.color)
    // If the paint is bound to a variable, accept it
    const isBoundToVariable =
      fill.boundVariables && Object.keys(fill.boundVariables).length > 0
    if (isBoundToVariable) continue
    if (!APPROVED_HEX.has(hex)) {
      record(
        node,
        "error",
        "non-token-fill",
        `Fill ${hex} is not a DBUI token (and not bound to a variable).`,
        `Bind to a color variable (Background/Foreground/Primary/etc.) or replace with one of the approved palette colors.`
      )
    }
  }
}

function checkStrokes(node) {
  if (!("strokes" in node)) return
  const strokes = node.strokes
  if (!Array.isArray(strokes)) return
  for (const stroke of strokes) {
    if (!stroke.visible) continue
    if (stroke.type !== "SOLID") continue
    const hex = rgbToHex(stroke.color)
    const isBound =
      stroke.boundVariables && Object.keys(stroke.boundVariables).length > 0
    if (isBound) continue
    if (!APPROVED_HEX.has(hex)) {
      record(
        node,
        "error",
        "non-token-stroke",
        `Stroke ${hex} is not a DBUI token.`,
        `Bind to the Border or Input variable, or use one of the approved palette colors.`
      )
    }
  }
}

function checkSpacing(node) {
  if (!("layoutMode" in node)) return
  if (node.layoutMode === "NONE") return // no auto-layout = no checked spacing
  const checks = [
    { prop: "paddingTop", label: "padding-top" },
    { prop: "paddingRight", label: "padding-right" },
    { prop: "paddingBottom", label: "padding-bottom" },
    { prop: "paddingLeft", label: "padding-left" },
    { prop: "itemSpacing", label: "gap" },
  ]
  for (const c of checks) {
    const px = node[c.prop]
    if (typeof px !== "number") continue
    if (px === 0) continue
    if (APPROVED_SPACING_PX.has(px)) continue
    record(
      node,
      "warning",
      "off-scale-spacing",
      `${c.label} = ${px}px is not on the DBUI 4px scale.`,
      `Use ${nearestSpacing(px)}px (e.g. xs=4, sm=8, md=12, lg=16, xl=24).`
    )
  }
}

function checkText(node) {
  if (node.type !== "TEXT") return
  // Font family
  const ff = node.fontName
  if (
    ff &&
    typeof ff === "object" &&
    "family" in ff &&
    !APPROVED_FONTS.has(ff.family)
  ) {
    record(
      node,
      "warning",
      "non-token-font",
      `Font family "${ff.family}" is not in the DBUI font set.`,
      `Use SF Pro Text (sans), SF Pro Display (display), or SF Mono (mono).`
    )
  }
  // Font size — only if simple (not mixed)
  const fs = node.fontSize
  if (typeof fs === "number") {
    const onRamp = APPROVED_TYPE_RAMP.some((r) => r.size === fs)
    if (!onRamp) {
      record(
        node,
        "warning",
        "off-ramp-type-size",
        `Font size ${fs}px is not on the DBUI type ramp.`,
        `Use the nearest ramp size: ${nearestRampSize(fs)}px (12, 13, 16, 22, or 32).`
      )
    }
  }
}

function checkRadius(node) {
  if (!("cornerRadius" in node)) return
  const r = node.cornerRadius
  // Mixed corners or single number
  const allowed = new Set([0, 4, 8, 12, 16, 24, 999])
  if (typeof r === "number" && !allowed.has(r)) {
    record(
      node,
      "warning",
      "non-token-radius",
      `Corner radius ${r}px is not a DBUI token.`,
      `Use 4 (sm), 8 (md), 12 (lg), 16 (xl), 24 (2xl), or 999 (3xl).`
    )
  }
}

// ─── Walk the tree ───

async function walk(node) {
  // Component compliance (instances only)
  await checkInstance(node)

  // Token compliance (any visible node)
  checkFills(node)
  checkStrokes(node)
  checkSpacing(node)
  checkText(node)
  checkRadius(node)

  // Recurse — but skip into instances (they're library content, not user content)
  if (node.type === "INSTANCE") return
  if ("children" in node && node.children) {
    for (const child of node.children) await walk(child)
  }
}

// ─── Main ───

const target = await figma.getNodeByIdAsync(TARGET_NODE_ID)
if (!target) {
  return { error: `Node ${TARGET_NODE_ID} not found.` }
}

// Switch to its page so the tree is loaded
let pg = target
while (pg.parent && pg.type !== "PAGE") pg = pg.parent
if (pg && pg.type === "PAGE") await figma.setCurrentPageAsync(pg)

await walk(target)

const summary = {
  totalNodes: 0,
  errors: violations.filter((v) => v.level === "error").length,
  warnings: violations.filter((v) => v.level === "warning").length,
  info: violations.filter((v) => v.level === "info").length,
}
// Count nodes (rough)
function count(n) {
  summary.totalNodes++
  if (n.type === "INSTANCE") return
  if ("children" in n && n.children) for (const c of n.children) count(c)
}
count(target)

return {
  scope: { id: target.id, name: target.name, type: target.type },
  summary,
  violations,
}
