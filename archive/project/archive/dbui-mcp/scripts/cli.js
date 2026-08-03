#!/usr/bin/env node
/**
 * Tiny CLI wrapper for dbui-mcp tools, useful when invoking from a Shell
 * session (e.g. during agent loops where the MCP server isn't loaded).
 *
 *   node packages/dbui-mcp/scripts/cli.js <tool> '<json-args>'
 *
 * Examples:
 *   node packages/dbui-mcp/scripts/cli.js lookup-icon '{"query":"database"}'
 *   node packages/dbui-mcp/scripts/cli.js lookup-component '{"query":"side panel","limit":3}'
 *   node packages/dbui-mcp/scripts/cli.js explain-component '{"name":"Button"}'
 *   node packages/dbui-mcp/scripts/cli.js validate '{"spec":{...}}'
 *   node packages/dbui-mcp/scripts/cli.js render-figma '{"spec":{...}}'
 *
 * Tool aliases (the tool names in the MCP server are dbui_<tool>):
 *   build-structure | build
 *   hydrate
 *   validate
 *   render-figma | figma
 *   render-react | preview
 *   lookup-component | comp | component
 *   lookup-icon | icon
 *   lookup-token | token
 *   explain-component | explain
 *   lint | lint-react
 *   composition | check-comp
 *   copy | check-copy
 *   rules
 */

// Stage orchestrators
import * as buildStructure from "../src/tools/build-structure.js"
import * as hydrate from "../src/tools/hydrate.js"
import * as validate from "../src/tools/validate.js"

// Renderers
import * as renderFigma from "../src/tools/render-figma.js"
import * as renderReact from "../src/tools/render-react.js"

// Post-render verifier
import * as checkFigmaNode from "../src/tools/check-figma-node.js"

// Primitives
import * as lookupComponent from "../src/tools/lookup-component.js"
import * as lookupIcon from "../src/tools/lookup-icon.js"
import * as lookupToken from "../src/tools/lookup-token.js"
import * as explainComponent from "../src/tools/explain-component.js"

// Single-purpose checks
import * as lintReactSnippet from "../src/tools/lint-react-snippet.js"
import * as checkComposition from "../src/tools/check-composition.js"
import * as checkCopy from "../src/tools/check-copy.js"
import * as getRules from "../src/tools/get-rules.js"

const aliases = {
  // Stage orchestrators
  "build-structure": buildStructure,
  build: buildStructure,
  hydrate,
  validate,

  // Renderers
  "render-figma": renderFigma,
  figma: renderFigma,
  "render-react": renderReact,
  preview: renderReact,

  // Post-render verifier
  "check-figma-node": checkFigmaNode,
  "check-figma": checkFigmaNode,

  // Primitives
  "lookup-component": lookupComponent,
  comp: lookupComponent,
  component: lookupComponent,
  "lookup-icon": lookupIcon,
  icon: lookupIcon,
  "lookup-token": lookupToken,
  token: lookupToken,
  "explain-component": explainComponent,
  explain: explainComponent,

  // Single-purpose checks
  lint: lintReactSnippet,
  "lint-react": lintReactSnippet,
  composition: checkComposition,
  "check-comp": checkComposition,
  "check-composition": checkComposition,
  copy: checkCopy,
  "check-copy": checkCopy,
  rules: getRules,
  "get-rules": getRules,
}

const args = process.argv.slice(2)
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log("Usage: node cli.js <tool> '<json-args>'\n")
  console.log("Tools:")
  for (const [name, mod] of Object.entries(aliases)) {
    console.log(`  ${name.padEnd(28)} ${mod.tool?.name || ""}`)
  }
  process.exit(0)
}

const [toolName, jsonArgs = "{}"] = args
const mod = aliases[toolName]
if (!mod) {
  console.error(`Unknown tool: ${toolName}\nRun with --help for the list.`)
  process.exit(1)
}

let parsed
try {
  parsed = JSON.parse(jsonArgs)
} catch (e) {
  console.error(`Invalid JSON args: ${e.message}`)
  process.exit(1)
}

try {
  const result = mod.run(parsed)
  console.log(JSON.stringify(result, null, 2))
} catch (e) {
  console.error(`Error in ${toolName}:`, e.message)
  console.error(e.stack)
  process.exit(1)
}
