#!/usr/bin/env node
/**
 * @muditmittal/dbui-mcp — MCP server exposing DBUI build / hydrate / validate tools.
 *
 * Tools are organized in three layers (see project/ARCHITECTURE.md):
 *
 *   Stage orchestrators (the build loop):
 *     - dbui_build_structure   description → Structure
 *     - dbui_hydrate           Structure + content → Spec
 *     - dbui_validate          Spec → pass/fail across all checks
 *
 *   Renderers (medium-specific output):
 *     - dbui_render_figma      Spec → use_figma JS
 *     - dbui_render_react      Spec → TSX (or temporary Storybook story)
 *
 *   Primitives (used internally and callable directly):
 *     - dbui_lookup_component  Find the right DBUI component for a use case
 *     - dbui_lookup_icon       Find the right DBUI icon by query
 *     - dbui_lookup_token      Find the closest DBUI token for any value
 *     - dbui_explain_component Variants, slots, props, abstract usage example
 *
 *   Single-purpose checks (also used by validate):
 *     - dbui_lint_react_snippet React-side surface check after rendering
 *     - dbui_check_composition  JSX pattern detection (legacy, folded into validate)
 *     - dbui_check_copy         Brand voice / microcopy lint
 *     - dbui_get_rules          Composition rules registry
 *
 * Designed for AI agents (Cursor, Claude Code, Windsurf) to call
 * during code/design generation. Each call is scoped, fast, and returns
 * actionable suggestions that chain into other tools.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

// Stage orchestrators
import * as buildStructure from "./tools/build-structure.js"
import * as hydrate from "./tools/hydrate.js"
import * as validate from "./tools/validate.js"

// Renderers
import * as renderFigma from "./tools/render-figma.js"
import * as renderReact from "./tools/render-react.js"

// Post-render verifier
import * as checkFigmaNode from "./tools/check-figma-node.js"

// Primitives
import * as lookupComponent from "./tools/lookup-component.js"
import * as lookupIcon from "./tools/lookup-icon.js"
import * as lookupToken from "./tools/lookup-token.js"
import * as explainComponent from "./tools/explain-component.js"

// Single-purpose checks (kept for direct invocation; validate orchestrates them)
import * as lintReactSnippet from "./tools/lint-react-snippet.js"
import * as checkComposition from "./tools/check-composition.js"
import * as checkCopy from "./tools/check-copy.js"
import * as getRules from "./tools/get-rules.js"

const tools = [
  // Stage orchestrators
  buildStructure,
  hydrate,
  validate,
  // Renderers
  renderFigma,
  renderReact,
  // Post-render verifier
  checkFigmaNode,
  // Primitives
  lookupComponent,
  lookupIcon,
  lookupToken,
  explainComponent,
  // Single-purpose checks
  lintReactSnippet,
  checkComposition,
  checkCopy,
  getRules,
]

const server = new Server(
  {
    name: "dbui-mcp",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: tools.map((t) => t.tool),
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  const tool = tools.find((t) => t.tool.name === name)
  if (!tool) {
    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    }
  }
  try {
    const result = tool.run(args || {})
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    }
  } catch (error) {
    return {
      content: [
        { type: "text", text: `Error in ${name}: ${error.message}\n${error.stack}` },
      ],
      isError: true,
    }
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
console.error("dbui-mcp server v0.2.0 running on stdio")
