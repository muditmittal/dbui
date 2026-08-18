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
| `packages/dbui-viz/` | 5 Vega-Lite charts, plus `Leaderboard` and `Legend` drawn as DOM. |
| `packages/dbui-chat/` | Conversational and agentic chat primitives. |
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
yarn design:lint:react [path]     # 25 rules; add --json for machine output
yarn design:lint:shells           # same linter scoped to dbui-shells
yarn design:verify-rules          # assert every lint rule fires, and only when it should
yarn design:audit-portal          # assert every component is visible on /components: row, link, tile
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
| Know what kind of thing you are adding | `packages/dbui/docs/structure.md` — the five tiers, and the one test that decides them |
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

**Review is five checks plus an orchestrator.** `dbui-review` frames the design, dispatches all five
in parallel as subagents, then dedupes and synthesizes into one critique — *what's working, what
should be fixed, what can be improved, what you'll be asked*. **Every check is independently
invokable**, and a builder who wants only copy reviewed should be sent straight to the voice check.

| Check | Skill | Needs |
|---|---|---|
| Standards | `dbui-validate` | The linter. Also the standalone compliance pass |
| Guidelines | `dbui-check-guidelines` | The 13 general UX topics |
| Voice | `dbui-check-voice` | `packages/dbui/docs/brandvoice.md` |
| Principles | `dbui-check-principles` | 6 principles, 5 constraints — embedded in the skill |
| Ecosystem | `dbui-check-ecosystem` | ⚠️ A local `context/ecosystem/` that **does not ship**. Degrades cleanly when absent |

All five return the same three-severity contract (`FIX` / `IMPROVE` / `WORKING`), which is what makes
synthesis possible. A check that returns freeform prose breaks the orchestrator.

⚠️ **The principles and constraints are duplicated** — canonically in the portal
(`PrinciplesDoc.tsx`, `constraints-data.ts`), and restated in `dbui-check-principles.md` because the
portal does not ship. They are the most stable content in the system, but a change to either needs to
land in both.

## The five tiers

Token, Icon, Component, Composition, Shell. Full definitions and the decision
procedure are in `packages/dbui/docs/structure.md`; the part you need before writing
anything is the definition of Component, because it is the one people get wrong:

> **A Component is reachable — you can import it, place it, and pass it props.**

Not "irreducible". `Task` is built from `Disclosure` and `Status` and is still a
Component; `BarChart` is built from nothing and is a Component for the same reason
`Input` is. Being an assembly is an implementation detail, not a tier.

Anything that only ever appears *inside* another component is a **Part**, not a
Component: dot-prefix it in Figma (`.TreeNode`) or file it under `Viz/Inner/`, and keep
it out of `component-index.md`, the gallery and Code Connect. 62 of the 160 Figma
components are Parts, and every audit skips them — that exclusion is what keeps the
word Component meaning something.

A **Recipe** is a documented arrangement with nothing single to import. Never create an
export or a package called `recipes`; the word already means "assemble it yourself".

Package, category and tier are three independent axes. Package follows **dependency
weight** — `dbui-viz` is separate because Vega is ~12 MB, not because charts are a
different kind of thing. A builder only ever sees the package in the import line.

## Boundaries

**Always**
- Run `yarn design:lint:react <path>` on any file you create or modify, and fix what it reports.
- Run `yarn design:audit-portal` after adding, removing or renaming a component. The portal is the
  only running UI surface, so it is the only place a change can be *seen* — and a component can be
  exported, documented, linted and Code Connected while being invisible there. A missing demo tile
  is the failure no other check catches: the row renders, and it claims the component has no default
  state.
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
- **There are three themes, and a theme varies values but never names.** Core is in `:root`;
 DuBois and One ship behind `data-theme` and the portal footer switches between them. Theme, mode
 and the two dials are four independent axes that compose. A theme may override only its chrome
 ramp, semantics, shape roles, the two type faces and elevation — never a token name, never
 spacing or density. Reach for `ramp` before writing value overrides: it re-skins all of chrome in
 one line. The generator throws and `design:verify-sync` fails on a theme that breaks the
 invariant; see `packages/dbui/docs/tokens.md`.
- **`design:verify-sync` currently reports 10 missing Figma primitives, and that is real.** One's
 accent needs `brand.orange`, which exists in the config and not yet in the Figma file. Add it
 there and refresh the dump — do not silence the check.
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
- **The dev server serves a stale bundle after a scripted file rewrite.** Twice now, editing a
  portal file with a node script — reordering JSX blocks, stripping a prop across a file — has
  left Turbopack reporting a `ReferenceError` for an identifier that is imported correctly and
  typechecks. `Guidance is not defined` and `TypeStrip is not defined` were both this, and both
  looked exactly like a broken import. If an identifier that plainly exists is reported
  undefined, `rm -rf apps/portal/.next` and restart before touching a line of source.
- **There is no published package.** Install is clone-and-copy per `packages/dbui/install.md`.
  On Databricks-managed machines, point npm/yarn at `https://npm-proxy.dev.databricks.com`
  before scaffolding — Jamf blocks public npm. Human overview: `/install`; agent fetch: `/install.md`.
- **There are no tests and no CI.** The design linters, their rule verifier and `dbui doctor` are
  the only automated checks.
- **`component-index.md` and `icon-index.md` are hand-maintained** and can lag the source. The
  component's own JSDoc is authoritative when they disagree.
