# @muditmittal/dbui-mcp

> MCP server exposing **resolver + lint tools** for the DBUI design system. Designed for AI coding agents (Cursor, Claude Code, Windsurf) to call repeatedly during design + code generation, so violations are caught and fixed in-flight — before the agent finishes its turn.

## Why this exists

When an agent generates UI code, it tends to:
- Hallucinate icon names (`<UserCircle />` from `lucide-react` instead of `<UserOutline />` from DBUI)
- Use raw HTML (`<button>`, `<input>`, `<select>`) instead of DBUI primitives
- Hardcode arbitrary values (`bg-[#16a34a]`, `p-[7px]`, `text-sm`) instead of tokens
- Compose components in ways that violate design-system rules (e.g. `<Button variant="link">` with a leading icon)

Static linters catch these AFTER the agent finishes. The MCP pattern catches them DURING — small, scoped tool calls let the agent self-correct and produce clean code in one shot.

This pattern is described in the [Deslint launch](https://dev.to/jaydrao215/i-built-a-design-quality-gate-for-ai-generated-code-heres-why-visual-regression-isnt-enough-5epf) (Apr 2026) and is the recommended next step in `research/lint-study.md`.

## Tools exposed

| Tool | Purpose | Example call |
|---|---|---|
| `dbui_resolve_icon` | Find the right DBUI icon for a description | `{ query: "database" }` → `Database`, `DatabaseImport`, `CloudDatabase` |
| `dbui_resolve_component` | Find the right DBUI component for a use case | `{ query: "click action" }` → `Button` (with `useFor` + `avoidFor`) |
| `dbui_resolve_token` | Find the closest DBUI token for any value | `{ value: "#16A34A", type: "color" }` → nearest 5 with distance |
| `dbui_lint_react_snippet` | Lint a code snippet during generation | `{ code: "<button>X</button>" }` → `no-raw-button` violation + fix |
| `dbui_get_rules` | Return composition rules ("Button.link must not have ButtonIcon") | `{ component: "Button" }` → 4 rules |

Each tool returns a JSON object with explicit `note` and `fix` fields and, where relevant, points the caller to the **next tool to call** (e.g. lint flags `no-arbitrary-color` and tells the agent to call `dbui_resolve_token` next).

## How an agent should use it

The recommended self-correction loop:

```
1. Agent generates a UI snippet
2. Agent calls  dbui_lint_react_snippet({ code: <snippet> })
3. For each violation in the response:
     - if rule = no-arbitrary-color  → call dbui_resolve_token (color)
     - if rule = off-scale-spacing   → call dbui_resolve_token (spacing)
     - if rule = icons-from-dbui     → call dbui_resolve_icon (per imported name)
     - if rule = no-raw-button/input → no extra call needed; fix is in the message
     - if rule = non-dbui-component  → call dbui_resolve_component
4. Agent applies fixes and re-lints. Loop until clean.
5. Return the final code to the user.
```

## Install — Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (workspace):

```json
{
  "mcpServers": {
    "dbui-mcp": {
      "command": "node",
      "args": ["/Users/<you>/db-design-system/packages/dbui-mcp/src/index.js"]
    }
  }
}
```

Restart Cursor. The 5 tools appear in Claude's tool palette as `mcp__dbui-mcp__dbui_<name>`.

## Install — Claude Code

```bash
claude mcp add dbui-mcp -- node /Users/<you>/db-design-system/packages/dbui-mcp/src/index.js
```

## Install — Windsurf, others

Same pattern. The server speaks the standard MCP stdio protocol.

## Build the data

The tools read from pre-parsed JSON in `src/data/`. Re-build whenever the source-of-truth files change:

```bash
yarn workspace @muditmittal/dbui-mcp build:data
# or
node packages/dbui-mcp/scripts/build-data.js
```

This regenerates from:
- `packages/dbui/docs/icon-index.md` → `src/data/icons.json`
- `packages/dbui/docs/component-index.md` → `src/data/components.json`
- `scripts/design-lint/tokens.json` → `src/data/tokens.json`
- `scripts/design-lint/dbui-components.json` → `src/data/dbui-components.json`
- `packages/dbui/src/rules/composition-rules.ts` → `src/data/rules.json`
- `packages/dbui/src/tokens/globals.css` → `src/data/hex-tokens.json`

## Smoke test

```bash
node packages/dbui-mcp/scripts/smoke-test.js
```

Calls each tool with sample inputs and prints the responses.

## Architecture

```
packages/dbui-mcp/
├── package.json
├── README.md
├── src/
│   ├── index.js               # MCP server (Server + StdioServerTransport)
│   ├── tools/
│   │   ├── resolve-icon.js
│   │   ├── resolve-component.js
│   │   ├── resolve-token.js
│   │   ├── lint-react-snippet.js  # uses ts-morph
│   │   └── get-rules.js
│   └── data/                  # generated, gitignored if you want
│       ├── icons.json         (454 icons)
│       ├── components.json    (69 components)
│       ├── tokens.json        (color/spacing/type/radius/font specs)
│       ├── dbui-components.json
│       ├── rules.json         (composition rules)
│       └── hex-tokens.json    (hex → token name map for color resolution)
└── scripts/
    ├── build-data.js          # regenerate src/data/ from sources
    └── smoke-test.js          # exercise each tool

```

## Roadmap

- **Figma lint tool** — `dbui_lint_figma_node` calling Figma's Plugin API directly (currently the `figma-design-lint` script does this via `use_figma`).
- **Auto-fix patches** — return JSON Patch / diff that the host can apply directly.
- **DTIF token export** — emit a [W3C DTIF](https://dtif.lapidist.net/) JSON for cross-tool token sync.
- **Eval set** — programmatic accuracy benchmark for the resolvers (e.g., 50 hand-labeled icon queries).

## Sources

This server implements the recommendations in `research/lint-study.md`. Key references:
- [Deslint](https://www.deslint.com/) — pioneered the lint-as-MCP pattern
- [Atlassian's `@atlaskit/eslint-plugin-design-system`](https://www.npmjs.com/package/@atlaskit/eslint-plugin-design-system) — gold standard for design-system ESLint plugins
- [DTIF](https://dtif.lapidist.net/) — W3C-track shared token format
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MCP SDK
