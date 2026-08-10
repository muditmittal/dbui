# DBUI

An AI-first design system for data and AI workbench UIs — catalogs, queries, runs, lineage, models,
governance, and chat over data. React 19 + Tailwind v4 + Base UI. Yarn 4 workspaces.

This file is the entry point. It tells you where to look; it does not repeat what those files say.

## Repository

| Path | What |
|---|---|
| `packages/dbui/` | Components, icons, tokens, docs, skills. The core. Counts: `yarn dbui doctor`. |
| `packages/dbui-cli/` | The machine-readable surface. `--json` for typed envelopes. |
| `packages/dbui-mcp/` | MCP server over the same API. Wired in `.cursor/mcp.json`. |
| `packages/dbui-shells/` | Page shells and compositions. Every screen starts here. |
| `packages/dbui-viz/` | 5 Vega-Lite charts. |
| `packages/dbui-chat/` | 9 conversational-analytics primitives. |
| `apps/portal/` | Storybook. The only running UI surface today. |
| `scripts/design-lint/` | Token generator, sync verifier, React + Figma linters. |
| `figma/` | Code Connect files (`*.figma.tsx`). |
| `archive/` | Past research and maintainer notes. Reference only — never cite as current. |
| `notes/` | Working material cut from a published page. Not documentation, not published. |

## Commands

```bash
yarn dbui search <query>          # find a component, icon, shell or doc
yarn dbui shell                   # list page shells — start here for any screen
yarn dbui component <name>        # rules, constraints and props for one component
yarn dbui check <path>            # run the design linter
yarn dbui doctor                  # diagnose the setup
yarn workspace portal storybook   # dev surface, port 6006
yarn design:tokens                # theme.config.mjs -> tokens.css + tokens.json
yarn design:sync-components       # the packages -> dbui-components.json
yarn design:verify-sync           # assert config <-> CSS <-> Figma parity
yarn design:lint:react [path]     # 19 rules; add --json for machine output
yarn design:lint:shells           # same linter scoped to dbui-shells
yarn design:verify-rules          # assert every lint rule fires, and only when it should
yarn design:verify-story-ids      # assert every story id the portal links to resolves; needs 6006
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
7. **Reach for the prop first. `className` is a real override, not a workaround.** `cn()` resolves
   Tailwind conflicts, so a class you pass wins over the component's own — its JSDoc in
   `packages/dbui/src/lib/utils.ts` says what it still does not resolve. Prefer the prop anyway:
   it is the surface the JSDoc, the CLI and Code Connect describe, and it survives a refactor of
   the component's internals that a `className` naming one of them does not. `!` stays wrong from
   outside — it beats every variant of that property, not the one you looked at. If no prop covers
   what you need, flag the gap.

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
- Run `yarn design:verify-rules` after touching `scripts/design-lint/`. A rule that stops matching
  fails there rather than going quiet.
- Update the docs listed in `CONTRIBUTING.md` in the same change that alters behavior.

**Ask first**
- Adding a component, icon, token, or shell. All four have finite, curated sets.
- Changing a public export signature.
- Anything under `packages/dbui/src/tokens/` — a migration is in progress.

**Never**
- Edit generated files: `packages/dbui/src/tokens/tokens.css`, `scripts/design-lint/tokens.json`,
  `scripts/design-lint/dbui-components.json`. Edit the source and regenerate.
- Edit anything in `archive/`.
- Add a dependency without asking. The system is deliberately close to zero-dependency.
- Trust a count or a file path quoted in prose. Verify against the repo — docs have drifted before.

## Known state, August 2026

`TRACKER.md` is the live status — what is done, what is open, and how to verify both. Read it
before assuming anything about progress. The rest of this section is the part that changes how
you should *act*:

- **The token migration is complete.** Components consume the generated `--db-*` semantics; the
  legacy color layer is pruned. Never reintroduce a legacy name — `bg-primary`, `text-foreground`
  and friends no longer exist.
- **Type goes through the ramp.** `type-label` for single-line UI, `type-body` for text that wraps,
  `type-paragraph` for prose. Each class is the whole style, so never pair it with `leading-`,
  `font-` or `uppercase`. Numbers in a table use `<TableCell numeric>`, not a type class.
- **Components are on the ramp.** Never reintroduce a `text-[Npx]` or `leading-[Npx]` literal — a px
  literal does not scale when the root font size does, so the box grows and the label does not.
- **The portal deploys from git, and `vercel.json` is schema-validated.** Pushing `main` is the
  deploy — there is no `.vercel/` directory locally and none is needed. That also means a bad
  `vercel.json` fails the deploy *before* any build, in about a second, so a green local
  `next build` proves nothing about it. It takes no comments: JSON has none, and a `"// note"`
  key inside a redirect is an unknown property the schema rejects. Note the build command runs
  Storybook *and* Next, so `next build` alone does not cover it either.
- **There is no published package.** Install is clone-and-copy per `packages/dbui/install.md`.
  On Databricks-managed machines, point npm/yarn at `https://npm-proxy.dev.databricks.com`
  before scaffolding — Jamf blocks public npm. Human overview: `/install`; agent fetch: `/install.md`.
- **There are no tests and no CI.** The design linters, their rule verifier and `dbui doctor` are
  the only automated checks.
- **`component-index.md` and `icon-index.md` are hand-maintained** and can lag the source. The
  component's own JSDoc is authoritative when they disagree.
