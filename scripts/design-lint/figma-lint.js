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

const dbuiSet = new Set([...components.ui, ...components.shells])
const approvedHex = new Set([...tokens.colors.light, ...tokens.colors.dark])
const approvedSpacingPx = new Set(tokens.spacing.px)
const approvedFonts = new Set([
  ...tokens.fonts.sans.slice(0, 1),
  ...tokens.fonts.display.slice(0, 1),
  ...tokens.fonts.mono.slice(0, 1),
])
const typeRamp = tokens.type.ramp.map(({ size, lineHeight, weight }) => ({ size, lineHeight, weight }))

const runtime = fs.readFileSync(path.join(__dirname, "figma-lint.runtime.js"), "utf-8")

// Compose the body that gets injected into use_figma
const body = `
const TARGET_NODE_ID = ${JSON.stringify(targetId)};
const DBUI_COMPONENT_SET = new Set(${JSON.stringify([...dbuiSet])});
const APPROVED_HEX = new Set(${JSON.stringify([...approvedHex])});
const APPROVED_SPACING_PX = new Set(${JSON.stringify([...approvedSpacingPx])});
const APPROVED_FONTS = new Set(${JSON.stringify([...approvedFonts])});
const APPROVED_TYPE_RAMP = ${JSON.stringify(typeRamp)};

${runtime}
`

console.log(body)
