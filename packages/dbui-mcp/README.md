# dbui-mcp

MCP server for DBUI. JSON-RPC 2.0 over stdio, no dependencies — the protocol
surface it needs is small and stable, and DBUI is deliberately close to
zero-dependency.

Every tool delegates to `dbui-cli`'s API module, so the CLI and the MCP server
render the same data.

## Connect

Already wired for this repo in `.cursor/mcp.json`. For any other MCP client:

```json
{
  "mcpServers": {
    "dbui": {
      "command": "node",
      "args": ["/absolute/path/to/packages/dbui-mcp/src/server.mjs"]
    }
  }
}
```

Outside the repo, set `DBUI_ROOT` to a directory containing `packages/dbui/` or a
vendored `dbui/`.

## Tools

| Tool | What it answers |
|---|---|
| `dbui_search` | "Is what I need a component, an icon or a shell?" Ranked across all four domains. |
| `dbui_list` | "What are my options?" Components by category, icons by category, the five shells, token groups, doc topics. |
| `dbui_get` | "How do I use this correctly?" Guidelines, constraints and prop values for a component; regions, scroll ownership and forbidden compositions for a shell. |
| `dbui_check` | "Is this output correct?" Runs the design linter over any React source, not only code built with DBUI. |

Responses use the dense renderer, since they land directly in a context window.
An unknown name returns `isError` with suggestions rather than an empty result.

## Resources

`dbui://design`, `dbui://composition`, `dbui://component-index`,
`dbui://icon-index`, `dbui://brandvoice` — the full markdown, for clients that
prefer reading documents over calling tools.

## Testing it

The server speaks newline-delimited JSON-RPC on stdin, so it can be driven by
hand:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' \
  | node packages/dbui-mcp/src/server.mjs
```
