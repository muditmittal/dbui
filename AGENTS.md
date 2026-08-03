# DBUI

An AI-first design system for data and AI workbench UIs — catalogs, queries, runs, lineage, models,
governance, and chat over data. React 19 + Tailwind v4 + Base UI. Yarn 4 workspaces.

This file is the entry point. It tells you where to look; it does not repeat what those files say.

## Repository

| Path | What |
|---|---|
| `packages/dbui/` | 61 components, 456 icons, tokens, docs, skills. The core. |
| `packages/dbui-shells/` | Page shells and compositions. Every screen starts here. |
| `packages/dbui-viz/` | 5 Vega-Lite charts. |
| `packages/dbui-genie/` | 9 conversational-analytics primitives. |
| `apps/portal/` | Storybook. The only running UI surface today. |
| `scripts/design-lint/` | Token generator, sync verifier, React + Figma linters. |
| `figma/` | Code Connect files (`*.figma.tsx`). |
| `archive/` | Past research and maintainer notes. Reference only — never cite as current. |

## Commands

```bash
yarn workspace portal storybook   # dev surface, port 6006
yarn design:tokens                # theme.config.mjs -> tokens.css + tokens.json
yarn design:verify-sync           # assert config <-> CSS <-> Figma parity
yarn design:lint:react [path]     # 11 rules; add --json for machine output
yarn design:lint:shells           # same linter scoped to dbui-shells
yarn design:lint:figma --target <nodeId>   # emits JS to run via Figma MCP
```

`yarn dev` and `yarn build` invoke the portal's Next app, which currently has no routes. Use the
Storybook command instead.

## Non-negotiable rules

1. **DBUI components only.** Never raw `<button>`, `<input>`, `<div role="dialog">`. If it exists in
   the system, use it. If it does not, flag the gap — do not build a one-off.
2. **DBUI icons only.** Never install lucide, heroicons, or any icon package.
3. **Semantic tokens only.** No hex, rgb, or arbitrary pixel values in components.
4. **Base UI `render`, not Radix `asChild`.** `<DialogTrigger render={<Button />}>`
5. **Shell first.** Every page starts from a shell in `dbui-shells`. Never rebuild chrome.
6. **Sentence case, no emoji, no exclamation marks** in any user-facing copy.

## Where to look

Read the discovery layer before writing UI. Per-component rules live in JSDoc, not here.

| To do this | Read |
|---|---|
| Understand the visual language | `packages/dbui/DESIGN.md` |
| Pick a component | `packages/dbui/docs/component-index.md` |
| Pick an icon | `packages/dbui/docs/icon-index.md` |
| Pick a page shell | `packages/dbui/composition.md` |
| Get rules for one component | its JSDoc — `@standard`, `@guideline`, `@constraint`, `@figma` |
| Write user-facing copy | `packages/dbui/docs/brandvoice.md` |
| Apply spacing, icon, button rules | `packages/dbui/docs/component-rules.md` |
| Understand the token system | `packages/dbui/docs/tokens.md`, `docs/token-rules.md` |
| Get entity icons for trees | `packages/dbui/src/components/icons/entity-icons.ts` |
| Change anything in the system | `CONTRIBUTING.md` — the change protocol is mandatory |

Skills in `packages/dbui/skills/` cover the common workflows: `dbui-pick-component`,
`dbui-pick-icon`, `dbui-build-screen`, `dbui-validate`.

## Boundaries

**Always**
- Run `yarn design:lint:react <path>` on any file you create or modify, and fix what it reports.
- Run `yarn design:verify-sync` after touching anything under `packages/dbui/src/tokens/`.
- Update the docs listed in `CONTRIBUTING.md` in the same change that alters behavior.

**Ask first**
- Adding a component, icon, token, or shell. All four have finite, curated sets.
- Changing a public export signature.
- Anything under `packages/dbui/src/tokens/` — a migration is in progress.

**Never**
- Edit generated files: `packages/dbui/src/tokens/tokens.css`, `scripts/design-lint/tokens.json`.
  Edit `theme.config.mjs` and regenerate.
- Edit anything in `archive/`.
- Add a dependency without asking. The system is deliberately close to zero-dependency.
- Trust a count or a file path quoted in prose. Verify against the repo — docs have drifted before.

## Known state, August 2026

Being explicit so you do not act on stale assumptions:

- **Token migration is mid-flight.** `tokens.css` ships 128 `--db-*` properties and is Figma-verified,
  but no component consumes it yet — all 55 color-using components still read the legacy
  `globals.css` layer. Do not "fix" a component to use `--db-*` outside the migration.
- **There is no CLI, no MCP server, and no published package.** Install is clone-and-copy per
  `packages/dbui/install.md`.
- **There are no tests and no CI.** The design linters are the only automated check.
- **`component-index.md` and `icon-index.md` are hand-maintained** and can lag the source. The
  component's own JSDoc is authoritative when they disagree.
