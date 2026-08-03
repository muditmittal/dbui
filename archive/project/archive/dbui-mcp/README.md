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

The tools are organized in three layers (see `project/ARCHITECTURE.md`):

### Stage orchestrators — the build loop

| Tool | Purpose | Example call |
|---|---|---|
| `dbui_build_structure` | **Stage 1.** Description → Structure (shell + region matches) | `{ regions: [{ role: "page-header", description: "..." }] }` |
| `dbui_hydrate` | **Stage 2.** Structure + content → Spec (auto-resolves `iconDesc`) | `{ structure, content: { "page-header": { title: "Recents" } } }` |
| `dbui_validate` | **Stage 3.** Spec → pass/fail across structure + content + tokens | `{ spec }` |

### Renderers

| Tool | Purpose |
|---|---|
| `dbui_render_figma` | Spec → `use_figma` JS that builds the screen with component instances |
| `dbui_render_react` | Spec → TSX (or temporary Storybook story) |

### Primitives

| Tool | Purpose | Example call |
|---|---|---|
| `dbui_lookup_component` | Find the right DBUI component for a use case | `{ query: "click action" }` → `Button` (with `useFor` + `avoidFor`) |
| `dbui_lookup_icon` | Find the right DBUI icon for a description | `{ query: "database" }` → `Database`, `DatabaseImport`, `CloudDatabase` |
| `dbui_lookup_token` | Find the closest DBUI token for any value | `{ value: "#16A34A", type: "color" }` → nearest 5 with distance |
| `dbui_explain_component` | Variants, slots, props, abstract usage example | `{ name: "Button" }` → `{ variants, slots, example: { specNode, jsx } }` |

### Single-purpose checks (also folded into `dbui_validate`)

| Tool | Purpose | Example call |
|---|---|---|
| `dbui_lint_react_snippet` | React-side surface check after rendering | `{ code: "<button>X</button>" }` → `no-raw-button` violation + fix |
| `dbui_check_composition` | JSX pattern detection (legacy, folded into `validate`) | `{ code }` |
| `dbui_check_copy` | Brand-voice / microcopy lint | `{ text: "Click here!" }` → `no-exclamation` + fix |
| `dbui_get_rules` | Return composition rules registry | `{ component: "Button" }` → 4 rules |

Each tool returns a JSON object with explicit `note` and `fix` fields and, where relevant, points the caller to the **next tool to call** (e.g. lint flags `no-arbitrary-color` and tells the agent to call `dbui_lookup_token` next).

## How an agent should use it

The recommended **build loop** (Structure → Hydrate → Validate → Render):

```
1. Agent looks at a screenshot/prompt and produces a structured description
   (regions with semantic roles + content per region).

2. dbui_build_structure({ regions, shellProps })          → Structure
   ↳ defaults to BaseShell, matches each region to a composition or component

3. dbui_hydrate({ structure, content })                   → Spec
   ↳ resolves any iconDesc → real icon names via dbui_lookup_icon
   ↳ assembles { shell, shellProps, content: [...] }

4. dbui_validate({ spec })                                → pass/fail
   ↳ structure check (every type known)
   ↳ content check (brand-voice lint via dbui_check_copy)
   ↳ tokens deferred to renderer

5. dbui_render_figma({ spec })  OR  dbui_render_react({ spec })
   ↳ produces use_figma JS or TSX

6. Optional post-render check:
   ↳ dbui_lint_react_snippet on rendered TSX
   ↳ dbui_check_figma_node on rendered Figma frame (future)
```

For component-level questions during the loop:
- `dbui_lookup_component` — "what component handles X?"
- `dbui_lookup_icon` — "what icon is closest to Y?"
- `dbui_lookup_token` — "what token is closest to value Z?"
- `dbui_explain_component` — "what variants and slots does Component K accept?"

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

Restart Cursor. The 13 tools appear in Claude's tool palette as `mcp__dbui-mcp__dbui_<name>`.

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
