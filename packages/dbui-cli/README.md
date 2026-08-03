# dbui-cli

The machine-readable surface for DBUI. Components, icons, page shells, tokens and
docs, as text for humans and as typed JSON for agents and build tools.

The API module is the product; the CLI is a formatter over it. `packages/dbui-mcp`
imports the same functions, which is why the two can never disagree.

## Use

```bash
yarn dbui search "catalog tree"     # find anything by concept
yarn dbui shell                     # list page shells
yarn dbui shell B                   # regions, scroll ownership, forbidden compositions
yarn dbui component Button          # guidelines, constraints, prop values, import path
yarn dbui icon GenieCode            # category, label, synonyms, import path
yarn dbui token action              # light and dark values for a token group
yarn dbui docs composition          # print a reference doc
yarn dbui check packages/dbui/src   # run the design linter
yarn dbui doctor                    # diagnose the setup
```

## Flags

| Flag | Effect |
|---|---|
| `--json` | Typed envelope `{ apiVersion, type, data }`. Errors are `{ error, code, suggestions }` |
| `--dense` | Compressed text sized for an AI context window |
| `--type` | Restrict `search` to `component`, `icon`, `shell` or `doc` |
| `--category` | Filter `icon` by `action`, `object`, `indicator` or `component` |
| `--limit` | Cap `search` results |

## For agents

The workflow the system expects, in order:

1. `dbui shell` — pick the frame before writing any content.
2. `dbui shell <id> --dense` — read its regions, pixel budgets and forbidden compositions.
3. `dbui search <concept>` — find the components and icons the regions need.
4. `dbui component <name> --dense` — read the rules before using each one.
5. `dbui check <path>` — verify the result.

`dbui manifest --json` describes every command and flag, so an agent never has to
scrape `--help`.

## Where it looks

Resolution order: `DBUI_ROOT`, then a `packages/dbui/` directory walking up from
the CLI or the working directory, then a vendored `dbui/` directory for projects
that installed via the copy path in `install.md`.

## Data sources

Nothing here is hand-maintained. Everything is read from source at call time.

| Surface | Read from |
|---|---|
| Components | `@standard` / `@guideline` / `@constraint` / `@figma` JSDoc, plus CVA variant axes |
| Category, use-for, avoid-for, synonyms | `docs/component-index.md` |
| Icons | `classifications.ts` and `descriptions.ts` |
| Shells | `composition.md` |
| Tokens | the generated `tokens.css` |
| Check | `scripts/design-lint/react-lint.js` |
