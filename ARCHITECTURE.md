# DBUI — Project Architecture

## Current Folder Structure

```
db-design-system/                        monorepo root (Yarn workspaces)
│
├── apps/
│   ├── dbui/                            THE DESIGN SYSTEM — the actual kit
│   │   └── src/
│   │       ├── components/
│   │       │   ├── ui/                  55 reskinned shadcn components (Button, Input, Dialog…)
│   │       │   └── icons/               453 DuBois icon components (.tsx, one per icon)
│   │       ├── lib/
│   │       │   ├── utils.ts             cn() helper, shared utilities
│   │       │   ├── registry.tsx         Component metadata for the portal
│   │       │   └── button-variants.ts   cva variants for Button
│   │       └── app/                     Dev sandbox (Next.js app for testing)
│   │
│   ├── portal/                          THE PORTAL — docs site at dbuidesign.vercel.app
│   │   └── src/
│   │       ├── app/                     Pages: /, /tokens, /icons, /components, /mappings, /changes
│   │       ├── components/              Portal-specific UI (nav, shader hero, theme provider)
│   │       │   └── ui/                  Portal's own copy of the components it uses
│   │       ├── figma/                   Code Connect files (Button, IconButton, SplitButton, ToggleButton, SegmentControl)
│   │       └── data/                    Icon JSON, classification data, Figma URLs
│   │
│   └── shadcn/                          FORKED SHADCN CLI — customized so it pulls from dbui
│       ├── dist/                        Built CLI: registry, icons, preset, MCP server
│       └── shadcn/                      CLI source
│
├── packages/                            (empty today — future home of publishable packages)
│
└── research/                            Design research & decision docs
    ├── DESIGN-SYSTEM-DECISIONS.md       All token / component / naming decisions
    ├── BUTTON-STUDY.md                  Button variant analysis
    └── ICON-USAGE-LEADERBOARD.csv       Codebase icon frequency data
```

---

## How Folders Map to Concepts

| Folder | Concept | Who uses it |
|---|---|---|
| `apps/dbui/src/components/ui/` | **The component library** — 55+ shadcn components reskinned with DuBois tokens (colors, typography, shadows, hover states). Button has 7 variants (Primary/Outline/Secondary/Ghost/Link/Destructive/Danger) | LLMs, engineers building prototypes |
| `apps/dbui/src/components/icons/` | **The icon library** — 453 React icon components matching DuBois naming | Same |
| `apps/portal/` | **The documentation site** — browse tokens, icons, components; see mappings between Figma ↔ DuBois ↔ Tailwind | Designers, PMs, anyone evaluating DBUI |
| `apps/shadcn/` | **The CLI** — forked shadcn CLI so `npx dbui add button` pulls our reskinned version | Engineers bootstrapping a project |
| `research/` | **Design decisions** — the "why" behind every token, naming convention, and component choice | Us, future contributors |

---

## End-State Folder Structure

What this looks like when we publish DBUI as a consumable package:

```
db-design-system/
│
├── packages/
│   ├── dbui/                              PUBLISHABLE NPM PACKAGE (@dbui/components)
│   │   ├── components/
│   │   │   ├── ui/                        All reskinned components
│   │   │   └── icons/                     All icon components
│   │   ├── tokens/
│   │   │   ├── globals.css                CSS custom properties (all 189 tokens)
│   │   │   ├── tailwind-preset.ts         Tailwind config preset (plug into any project)
│   │   │   └── figma-tokens.json          Token definitions for Figma sync tools
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── index.ts                       Public exports
│   │   └── package.json                   @dbui/components
│   │
│   ├── icons/                             OPTIONAL STANDALONE PACKAGE (@dbui/icons)
│   │   ├── *.tsx                           Tree-shakeable icon exports
│   │   └── package.json
│   │
│   └── cli/                               FORKED SHADCN CLI (@dbui/cli)
│       ├── registry/                      Component registry definitions
│       ├── preset/                        Tailwind preset
│       └── package.json                   `npx @dbui/cli add button`
│
├── apps/
│   ├── portal/                            Docs site (unchanged, reads from packages/)
│   └── playground/                        Dev sandbox for testing
│
├── skills/                                CLAUDE CODE SKILLS
│   ├── dbui-prototype.md                  "Build a Databricks UI with DBUI"
│   ├── dbui-component.md                  "Add/customize a DBUI component"
│   └── dbui-tokens.md                     "Use DBUI tokens correctly"
│
├── figma/                                 CODE CONNECT
│   ├── button.figma.tsx                   Maps Figma Button → <Button> code
│   ├── input.figma.tsx
│   └── ...                                One per Figma component
│
└── research/                              Design decisions (stays as-is)
```

---

## What Changes from Today → End State

| Today | End state | Why |
|---|---|---|
| Components live in `apps/dbui/` | Move to `packages/dbui/` | Apps are for running things; packages are for publishing. Components need to be importable by others. |
| Icons bundled inside dbui | Split into `packages/icons/` | Lets consumers install icons independently — tree-shakeable, smaller bundle. |
| CLI in `apps/shadcn/` | Move to `packages/cli/` | Publishable as `npx @dbui/cli add button`. |
| No tokens folder | `packages/dbui/tokens/` | CSS variables, Tailwind preset, and Figma token JSON all co-located — one source of truth for all three consumers. |
| Code Connect in `apps/portal/src/figma/` + `apps/dbui/src/components/icons/` | `figma/*.figma.tsx` | Code Connect currently lives in portal/dbui; end-state moves to top-level `figma/`. 5 button-family + 600 icon mappings already linked. |
| No skills | `skills/*.md` | Claude Code skills that know the full token system, component API, and conventions — instant prototyping. |
| `packages/` is empty | Three publishable packages | `@dbui/components`, `@dbui/icons`, `@dbui/cli` |
