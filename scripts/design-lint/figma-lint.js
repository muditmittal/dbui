#!/usr/bin/env node
/**
 * Figma Design Lint runner — composes the runtime + token data into a single
 * `use_figma` payload and prints it. The resulting JSON is meant to be passed
 * to the Figma MCP via Cursor or another MCP-aware agent.
 *
 * Usage from Cursor / Claude / any MCP host:
 *   1. yarn design:lint:figma --target 3247:5956   # the Figma node ID to lint
 *   2. The output is the JS body to inject into `use_figma`.
 *      Combined with the file key from figma-mapping.md, an MCP host runs:
 *          use_figma({ fileKey: "OftbSQf85jOPln9RhSEhVv", code: <THIS_OUTPUT> })
 *      and gets back a violation report.
 *
 * Why this is a runner instead of a direct Figma plugin:
 *   For a daily designer workflow, this should become a Figma plugin (one-click
 *   "Lint frame"). For now, the same logic runs via the Plugin API through MCP,
 *   so AI agents can lint frames as part of design-review workflows.
 *
 * ## Everything the runtime judges by is injected from tokens.json
 *
 * The runtime used to carry its own copy of two of these sets. `checkRadius`
 * held `new Set([0, 4, 8, 12, 16, 24, 999])` and every fix message spelled the
 * stops out in prose. Both happened to be correct, and neither was connected to
 * anything — the radius set matched `dimensions.radius.px` by coincidence, and
 * the messages named `sm`/`md`/`lg`/`xl`, which are exactly the keys the radius
 * bridge closes. A designer following that advice was told to use a class the
 * system does not emit.
 *
 * So no approved value and no example is written in the runtime any more. The
 * sets and the sentences that quote them are both derived here, which is the
 * only arrangement where the two linters cannot drift apart: they read one file.
 */
"use strict"
const fs = require("node:fs")
const path = require("node:path")

const args = process.argv.slice(2)
const targetIdx = args.indexOf("--target")
if (targetIdx === -1 || !args[targetIdx + 1]) {
  console.error("Usage: yarn design:lint:figma --target <NODE_ID>")
  console.error("Example: yarn design:lint:figma --target 3247:5956")
  process.exit(1)
}
const targetId = args[targetIdx + 1]

const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens.json"), "utf-8"))
const components = JSON.parse(fs.readFileSync(path.join(__dirname, "dbui-components.json"), "utf-8"))

const dim = tokens.dimensions
const numeric = (xs) => xs.filter((n) => typeof n === "number")

const dbuiSet = new Set([...components.ui, ...components.shells])
const approvedHex = new Set([...tokens.colors.light, ...tokens.colors.dark])
const approvedSpacingPx = new Set(numeric(dim.space.px))
const approvedRadiusPx = new Set(numeric(dim.radius.px))
const approvedSizePx = new Set(numeric(dim.size.px))
const approvedBorderPx = new Set(numeric(dim.border.px))
const approvedFonts = new Set([
  ...tokens.fonts.sans.slice(0, 1),
  ...tokens.fonts.display.slice(0, 1),
  ...tokens.fonts.mono.slice(0, 1),
])
// The generator emits the field as `line`. Destructuring `lineHeight` handed
// the runtime a ramp of undefined line heights, the same typo the React linter
// carried, so the Figma side could not judge one either.
const typeRamp = tokens.type.ramp.map(({ size, line, weight }) => ({ size, lineHeight: line, weight }))

/**
 * The role layer, as Figma can see it: a corner is a number there, so a role is
 * only nameable through the px it resolves to. Two roles can share one px —
 * `control` and `control-lg` both alias radius-1 — so the map holds a list and
 * the advice says "control or control-lg" rather than picking one. That
 * ambiguity is real and belongs in the message, not hidden by a first match.
 */
const roleByPx = {}
dim.shape.steps.forEach((role, i) => {
  const px = dim.shape.px[i]
  ;(roleByPx[px] ??= []).push(role)
})

/**
 * A size family declares ends, and a value outside them is not a stop the
 * family refused — it is one it never made. A 420px panel is a layout
 * dimension. The React linter guards on this and the Figma side did not judge
 * width or height at all, so the guard travels with the new check.
 */
const sizeRange = dim.size.range

/** Stops as prose, derived, so no message can name a value the system dropped. */
const list = (xs) => xs.join(", ")
const messages = {
  spacing: `Use a space stop: ${list(numeric(dim.space.px))}px.`,
  radius: `Use a radius stop: ${list(numeric(dim.radius.px))}px.`,
  size: `Use a size stop: ${list(numeric(dim.size.px))}px.`,
  border: `Use a border stop: ${list(numeric(dim.border.px))}px.`,
  typeSize: `Use a ramp size: ${list(typeRamp.map((r) => r.size))}px.`,
  fonts: `Use a DBUI family: ${list([...approvedFonts])}.`,
  roles: `Corner roles: ${list(dim.shape.steps)}.`,
}

const runtime = fs.readFileSync(path.join(__dirname, "figma-lint.runtime.js"), "utf-8")

// Compose the body that gets injected into use_figma
const body = `
const TARGET_NODE_ID = ${JSON.stringify(targetId)};
const DBUI_COMPONENT_SET = new Set(${JSON.stringify([...dbuiSet])});
const APPROVED_HEX = new Set(${JSON.stringify([...approvedHex])});
const APPROVED_SPACING_PX = new Set(${JSON.stringify([...approvedSpacingPx])});
const APPROVED_RADIUS_PX = new Set(${JSON.stringify([...approvedRadiusPx])});
const APPROVED_SIZE_PX = new Set(${JSON.stringify([...approvedSizePx])});
const APPROVED_BORDER_PX = new Set(${JSON.stringify([...approvedBorderPx])});
const APPROVED_FONTS = new Set(${JSON.stringify([...approvedFonts])});
const APPROVED_TYPE_RAMP = ${JSON.stringify(typeRamp)};
const ROLE_BY_PX = ${JSON.stringify(roleByPx)};
const SIZE_RANGE = ${JSON.stringify(sizeRange)};
const MESSAGES = ${JSON.stringify(messages)};

${runtime}
`

console.log(body)
