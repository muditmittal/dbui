#!/usr/bin/env node
/**
 * @muditmittal/dbui-mcp — MCP server exposing DBUI resolver + lint tools.
 *
 * Tools:
 *   - dbui_resolve_icon       Find the right DBUI icon by query
 *   - dbui_resolve_component  Find the right DBUI component for a use case
 *   - dbui_resolve_token      Find the closest DBUI token for any value
 *   - dbui_lint_react_snippet Lint a code snippet during AI generation
 *   - dbui_get_rules          Return DBUI composition rules
 *
 * Designed for AI agents (Cursor, Claude Code, Windsurf) to call repeatedly
 * during code/design generation. Each call is scoped, fast, and returns
 * actionable suggestions that chain into other tools.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

import * as resolveIcon from "./tools/resolve-icon.js"
import * as resolveComponent from "./tools/resolve-component.js"
import * as resolveToken from "./tools/resolve-token.js"
import * as lintReactSnippet from "./tools/lint-react-snippet.js"
import * as checkComposition from "./tools/check-composition.js"
import * as getRules from "./tools/get-rules.js"

const tools = [
  resolveIcon,
  resolveComponent,
  resolveToken,
  lintReactSnippet,
  checkComposition,
  getRules,
]

const server = new Server(
  {
    name: "dbui-mcp",
    version: "0.1.0",
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
      content: [
        { type: "text", text: `Unknown tool: ${name}` },
      ],
      isError: true,
    }
  }
  try {
    const result = tool.run(args || {})
    return {
      content: [
        { type: "text", text: JSON.stringify(result, null, 2) },
      ],
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
console.error("dbui-mcp server running on stdio")
