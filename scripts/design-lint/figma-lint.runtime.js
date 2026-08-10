/**
 * figma-design-lint — runs inside Figma via the Plugin API (use_figma).
 *
 * Lints a target frame/page/component for DBUI compliance:
 *   1. Component compliance — every INSTANCE on the canvas belongs to the DBUI library
 *      (its mainComponent.name is in the published DBUI master list).
 *   2. Value compliance — every fill, stroke, font, spacing, radius, size and
 *      border either binds a Figma variable or matches an approved value.
 *
 * ## The finding shape is shared with the React linter
 *
 * Every violation carries `surface`, `property`, `verdict` and `channel`
 * alongside the rule name, because the two linters judge the same properties
 * against the same sets and only differ in how a value reaches the surface. A
 * hardcoded fill here and a hex literal in a `className` are one defect —
 * `color:off-set` — reported from two places, and a report that cannot join
 * them makes the reader do it.
 *
 *   surface   "figma"
 *   property  color | spacing | radius | size | border | type-size | line-height | font
 *   verdict   off-set     the value is not in the approved set
 *             unnamed     the value is approved but nothing binds it to a token
 *             unreachable the binding resolves to a primitive, which is not consumable
 *             stale       the binding resolves to something no longer published
 *   channel   figma-paint | figma-value | figma-binding | figma-instance
 *
 * ## Nothing here declares an approved value
 *
 * Every set and every example sentence is injected by `figma-lint.js` from
 * `tokens.json`. This file used to hold its own radius allowlist and spell the
 * stops out in each fix message; both drifted from the system the moment the
 * names changed, and neither failed loudly. If a check needs a value, it reads
 * one of the constants below rather than restating it.
 *
 * INPUTS expected at the top of the executed body (set by the caller):
 *   const TARGET_NODE_ID = "1234:5678"
 *   const DBUI_COMPONENT_SET = new Set(["Alert", "Button", ...])
 *   const APPROVED_HEX / _SPACING_PX / _RADIUS_PX / _SIZE_PX / _BORDER_PX / _FONTS
 *   const APPROVED_TYPE_RAMP = [{ size, lineHeight, weight }, ...]
 *   const ROLE_BY_PX = { 8: ["container"], 4: ["control", "control-lg"], ... }
 *   const SIZE_RANGE = [minPx, maxPx]
 *   const MESSAGES = { spacing, radius, size, border, typeSize, fonts, roles }
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

function nearest(px, set) {
  let best = null
  let bestDiff = Infinity
  for (const v of set) {
    const diff = Math.abs(px - v)
    if (diff < bestDiff) {
      bestDiff = diff
      best = v
    }
  }
  return best
}

function nearestRampSize(px) {
  let best = APPROVED_TYPE_RAMP[0] ? APPROVED_TYPE_RAMP[0].size : null
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

/**
 * The role a corner would be if it were named. Figma stores a number, so a role
 * is only reachable through the px it resolves to, and two roles can share one.
 */
function rolesForPx(px) {
  const roles = ROLE_BY_PX[px] || ROLE_BY_PX[String(px)]
  return roles && roles.length ? roles : null
}

const violations = []

/**
 * `object` is the join key the consolidated report groups on. Figma gives every
 * node a stable id, so the key is the id — two findings on one layer meet
 * without any matching heuristic.
 */
function record(node, level, rule, property, verdict, channel, message, fix) {
  violations.push({
    surface: "figma",
    object: node.id,
    id: node.id,
    name: node.name,
    type: node.type,
    level,
    rule,
    property,
    verdict,
    channel,
    message,
    fix,
  })
}

// ─── Token-compliance bookkeeping ───
// A bound paint is only fully compliant when it resolves to the "Color: Semantic"
// collection. Binding to "Color: Primitive" is the design equivalent of consuming
// a raw primitive in code (R2) — a warning, not a hard error.
const SEMANTIC_COLLECTION = "Color: Semantic"
const PRIMITIVE_COLLECTION = "Color: Primitive"
const _collCache = {}
async function collectionNameOfVar(varId) {
  try {
    const v = await figma.variables.getVariableByIdAsync(varId)
    if (!v) return null
    const cid = v.variableCollectionId
    if (cid in _collCache) return _collCache[cid]
    const c = await figma.variables.getVariableCollectionByIdAsync(cid)
    return (_collCache[cid] = c ? c.name : null)
  } catch (e) {
    return null
  }
}
function boundVarId(paint) {
  const bv = paint && paint.boundVariables
  const c = bv && bv.color
  return c && c.id ? c.id : null
}
const tokenStats = {
  colorProps: 0,
  semanticBound: 0,
  primitiveBound: 0,
  otherBound: 0,
  unbound: 0,
}

// ─── Component compliance ───

async function checkInstance(node) {
  // INSTANCE nodes have a mainComponent property
  if (node.type !== "INSTANCE") return
  let mc = null
  try {
    mc = await node.getMainComponentAsync()
  } catch (e) {
    record(node, "warning", "instance-no-main-component", "component", "stale", "figma-instance",
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
    record(node, "error", "non-dbui-component", "component", "off-set", "figma-instance",
      `<${node.name}> is an instance of "${candidate}", which is not a DBUI component.`,
      `Replace with a DBUI master (Button, Card, Empty, etc.) or, if this is meant to be a DBUI component, publish/rename the master to match.`)
  }
}

// ─── Value compliance ───

/**
 * Fills and strokes differ only in which property they set and which semantic
 * group the fix points at, so one function takes both. They were two copies of
 * the same forty lines, and the copy is how `checkStrokes` came to miss the
 * `visible` short-circuit fix that `checkFills` got.
 */
async function checkPaints(node, kind) {
  const key = kind === "fill" ? "fills" : "strokes"
  if (!(key in node)) return
  const paints = node[key]
  if (!Array.isArray(paints)) return
  const groups =
    kind === "fill"
      ? "surface/*, action/*, status/surface-*"
      : "border/*, input/border-*, status/border-*"

  for (const paint of paints) {
    if (!paint.visible) continue
    if (paint.type !== "SOLID") continue
    tokenStats.colorProps++
    const vid = boundVarId(paint)
    if (vid) {
      const coll = await collectionNameOfVar(vid)
      if (coll === SEMANTIC_COLLECTION) {
        tokenStats.semanticBound++
        continue
      }
      if (coll === PRIMITIVE_COLLECTION) {
        tokenStats.primitiveBound++
        record(node, "warning", `primitive-bound-${kind}`, "color", "unreachable", "figma-binding",
          `${kind === "fill" ? "Fill" : "Stroke"} is bound to a raw primitive (${PRIMITIVE_COLLECTION}), not a semantic token.`,
          `Rebind to a ${SEMANTIC_COLLECTION} token (${groups}). Primitives are the palette, not for direct use.`)
        continue
      }
      tokenStats.otherBound++ // bound to some other (non-color) collection — allowed
      continue
    }
    tokenStats.unbound++
    const hex = rgbToHex(paint.color)
    if (!APPROVED_HEX.has(hex)) {
      record(node, "error", `non-token-${kind}`, "color", "off-set", "figma-paint",
        `${kind === "fill" ? "Fill" : "Stroke"} ${hex} is not a DBUI token (and not bound to a variable).`,
        `Bind to a ${SEMANTIC_COLLECTION} token (${groups}) or replace with an approved palette color.`)
    } else {
      /* The value is right and nothing holds it there. This is the design-side
       * twin of writing an approved hex as a literal in code: it renders
       * correctly today and does not move when the token does. It was silent
       * before, which made the compliance score the only place it showed up. */
      record(node, "warning", `unbound-${kind}`, "color", "unnamed", "figma-paint",
        `${kind === "fill" ? "Fill" : "Stroke"} ${hex} is an approved value written as a raw color.`,
        `Bind it to the ${SEMANTIC_COLLECTION} token that carries ${hex} (${groups}), so it follows the token when it moves.`)
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
    record(node, "warning", "off-scale-spacing", "spacing", "off-set", "figma-value",
      `${c.label} = ${px}px is not on the DBUI space scale.`,
      `Nearest stop is ${nearest(px, APPROVED_SPACING_PX)}px. ${MESSAGES.spacing}`)
  }
}

function checkText(node) {
  if (node.type !== "TEXT") return

  const ff = node.fontName
  if (ff && typeof ff === "object" && "family" in ff && !APPROVED_FONTS.has(ff.family)) {
    record(node, "warning", "non-token-font", "font", "off-set", "figma-value",
      `Font family "${ff.family}" is not in the DBUI font set.`,
      MESSAGES.fonts)
  }

  // Font size — only if simple (not mixed)
  const fs = node.fontSize
  if (typeof fs === "number") {
    const onRamp = APPROVED_TYPE_RAMP.some((r) => r.size === fs)
    if (!onRamp) {
      record(node, "warning", "off-ramp-type-size", "type-size", "off-set", "figma-value",
        `Font size ${fs}px is not on the DBUI type ramp.`,
        `Nearest ramp size is ${nearestRampSize(fs)}px. ${MESSAGES.typeSize}`)
    }
  }

  /* Line height was never judged here, so a ramp size with a hand-set leading
   * passed as compliant — the pairing is the whole point of a ramp, and it is
   * the half a designer is most likely to nudge. Figma reports it as a unit
   * plus a value, and only PIXELS is comparable to the ramp: AUTO is the
   * font's own metric and PERCENT is relative, so neither is a px the ramp
   * could carry. Both are left alone rather than guessed at. */
  const lh = node.lineHeight
  if (lh && typeof lh === "object" && lh.unit === "PIXELS" && typeof fs === "number") {
    const step = APPROVED_TYPE_RAMP.find((r) => r.size === fs)
    if (step && step.lineHeight !== lh.value) {
      record(node, "warning", "off-ramp-line-height", "line-height", "off-set", "figma-value",
        `Line height ${lh.value}px does not match the ramp step for ${fs}px, which pairs with ${step.lineHeight}px.`,
        `Set the line height to ${step.lineHeight}px, or use a text style so the pair travels together.`)
    }
  }

  const w = node.fontWeight
  if (typeof w === "number") {
    const weights = APPROVED_TYPE_RAMP.map((r) => r.weight).filter((x) => typeof x === "number")
    if (weights.length && !weights.includes(w)) {
      record(node, "warning", "off-ramp-type-weight", "font-weight", "off-set", "figma-value",
        `Font weight ${w} is not a weight the ramp carries.`,
        `Use a ramp weight: ${[...new Set(weights)].sort((a, b) => a - b).join(", ")}.`)
    }
  }
}

/**
 * Corners, in both forms Figma stores them.
 *
 * `cornerRadius` is a number when all four agree and the symbol `figma.mixed`
 * when they do not. The previous version tested `typeof r === "number"` and
 * returned otherwise, so a layer with three token corners and one hand-set one
 * — the exact shape of the mistake — was the case it could not see. Mixed
 * corners are now read individually.
 */
function checkRadius(node) {
  if (!("cornerRadius" in node)) return

  const corners = [
    ["topLeftRadius", "top-left"],
    ["topRightRadius", "top-right"],
    ["bottomRightRadius", "bottom-right"],
    ["bottomLeftRadius", "bottom-left"],
  ]
  const r = node.cornerRadius
  const values =
    typeof r === "number"
      ? [[r, "corner radius"]]
      : corners
          .filter(([prop]) => typeof node[prop] === "number")
          .map(([prop, label]) => [node[prop], label])

  for (const [px, label] of values) {
    if (!APPROVED_RADIUS_PX.has(px)) {
      record(node, "warning", "non-token-radius", "radius", "off-set", "figma-value",
        `${label} ${px}px is not a DBUI radius stop.`,
        `Nearest stop is ${nearest(px, APPROVED_RADIUS_PX)}px. ${MESSAGES.radius}`)
      continue
    }
    /* On the scale, and still worth naming: a corner is the one dimension the
     * system gives roles to, so a card at 16px and a dialog at 8px are both
     * legal numbers that a theme reassigns through `shape`. Reported as info
     * rather than a warning — the value is correct, and the role is what makes
     * it survive a theme. */
    const roles = rolesForPx(px)
    if (roles) {
      record(node, "info", "prefer-shape-role", "radius", "unnamed", "figma-value",
        `${label} ${px}px is the value of ${roles.map((x) => `shape-${x}`).join(" / ")}.`,
        `Bind the role rather than the measurement where the library offers one — a theme reassigns ${roles.map((x) => `shape-${x}`).join(" / ")} without touching this layer. ${MESSAGES.roles}`)
    }
  }
}

/**
 * Width and height, guarded by the family's declared ends.
 *
 * A family carries a stop when it has a use for it, so a value outside the ends
 * is not a stop it refused — it is one it never made. A 420px panel is a layout
 * dimension rather than an off-scale icon, and flagging it would bury the
 * finding that matters under every frame on the canvas. Same guard the React
 * linter applies to the same two families.
 */
function checkSize(node) {
  if (typeof node.width !== "number" || typeof node.height !== "number") return
  // A frame that hugs or fills is sized by its layout, not by a chosen number.
  if (node.layoutSizingHorizontal && node.layoutSizingHorizontal !== "FIXED") return
  const [lo, hi] = SIZE_RANGE
  for (const [px, label] of [[node.width, "width"], [node.height, "height"]]) {
    const rounded = Math.round(px * 100) / 100
    if (rounded < lo || rounded > hi) continue
    if (APPROVED_SIZE_PX.has(rounded)) continue
    record(node, "warning", "off-scale-size", "size", "off-set", "figma-value",
      `${label} ${rounded}px sits inside the size family's range and is not one of its stops.`,
      `Nearest stop is ${nearest(rounded, APPROVED_SIZE_PX)}px. ${MESSAGES.size}`)
  }
}

/** Stroke weight is a dimension too, and rides the border family rather than space. */
function checkBorderWidth(node) {
  if (!("strokeWeight" in node)) return
  const w = node.strokeWeight
  if (typeof w !== "number" || w === 0) return
  if (APPROVED_BORDER_PX.has(w)) return
  record(node, "warning", "off-scale-border", "border", "off-set", "figma-value",
    `Stroke weight ${w}px is not a DBUI border stop.`,
    `Nearest stop is ${nearest(w, APPROVED_BORDER_PX)}px. ${MESSAGES.border}`)
}

// ─── Walk the tree ───

async function walk(node) {
  // Component compliance (instances only)
  await checkInstance(node)

  // Value compliance (any visible node)
  await checkPaints(node, "fill")
  await checkPaints(node, "stroke")
  checkSpacing(node)
  checkText(node)
  checkRadius(node)
  checkSize(node)
  checkBorderWidth(node)

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

// Token-compliance score: share of color properties bound to a semantic token.
// Primitive-bound and unbound-hardcoded properties drag the score down; this is
// the headline "are the mocks using design-system tokens?" number.
const _denom = tokenStats.colorProps || 1
summary.tokenCompliance = {
  colorProps: tokenStats.colorProps,
  semanticBound: tokenStats.semanticBound,
  primitiveBound: tokenStats.primitiveBound,
  otherBound: tokenStats.otherBound,
  unbound: tokenStats.unbound,
  scorePct: Math.round((tokenStats.semanticBound / _denom) * 100),
}

/**
 * The same grouping the React report will carry: findings keyed by the object
 * they are about, so a layer failing three checks reads as one diagnosis rather
 * than three lines a reader has to associate themselves.
 */
const byObject = {}
for (const v of violations) {
  ;(byObject[v.object] ??= { object: v.object, name: v.name, type: v.type, findings: [] }).findings.push({
    rule: v.rule, property: v.property, verdict: v.verdict, level: v.level, channel: v.channel,
  })
}
summary.objects = Object.keys(byObject).length
summary.multiFailObjects = Object.values(byObject).filter((o) => o.findings.length > 1).length

return {
  scope: { id: target.id, name: target.name, type: target.type },
  summary,
  violations,
  byObject: Object.values(byObject),
}
