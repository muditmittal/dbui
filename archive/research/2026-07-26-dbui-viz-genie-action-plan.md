# DBUI Viz + Genie — Action Plan & Handoff

**Date:** 2026-07-26
**Purpose:** Self-contained handoff so a fresh agent thread can continue building without re-deriving decisions.
**Companion doc:** `research/2026-07-25-dbui-llm-usability-audit.md` (LLM-usability audit; remediation deliberately deferred).

> Read this document top to bottom before writing code. Sections 1-4 are context and hard constraints. Sections 5-8 are the work.

---

## 1. Goal

Build a Databricks equivalent of [AI SDK Elements](https://elements.ai-sdk.dev/) so anyone at Databricks can assemble agentic (Genie) prototypes fast. Components must:

- look like Databricks product UI (central dbui tokens, 13px base type),
- have equivalent specs in **Figma and React**,
- be inherently responsive,
- be composable in any arrangement the interface demands,
- be usable by LLMs as easily as shadcn/ui is.

Named `dbui-genie` because Genie One and Genie Code are Databricks' official agentic interfaces and will likely converge under "Genie".

Longer term (not now): a "theme" switch (default Databricks vs modern), and a script-driven prototype runtime where an LLM is given a behaviour script and the prototype mimics the experience using the component library — later possibly with real tool/data calls.

---

## 2. Architecture and principles

```
dbui  ──►  dbui-viz  ──►  dbui-genie  ──►  dbui-shells
  │                            ▲               ▲
  └────────────────────────────┴───────────────┘
```

| Package | Role |
|---|---|
| `packages/dbui` | Single source of truth for tokens + primitives + 456 icons. Nothing else defines tokens. |
| `packages/dbui-viz` | **NEW.** Essential data visualizations, all in Vega. Themed by dbui `viz` tokens. |
| `packages/dbui-genie` | **NEW.** Chat-thread components only. Composes dbui-viz for charts. No `tokens/` or `shells/` folder. |
| `packages/dbui-shells` | All page chrome, including future Genie shells (`GeniePanel`, `SplitReview`, `GenieApp`). No shells inside dbui-genie. |

Non-negotiable rules:

1. **ADDITIVE ONLY.** Do not modify existing dbui components or tokens. New tokens go in new files; new components go in new packages. (Verified so far: zero existing dbui component/lib/token files changed.)
2. **All viz in Vega** so prototype output is identical to production (Databricks standardises on Vega).
3. **Tokens stay central in dbui.** No package-local token sets.
4. **Essentials only.** Add components when a need is proven, not speculatively.
5. Monorepo is **Yarn 4 workspaces, no Turbo**. Storybook (not Next) is the real portal; `apps/portal/src/app` has only `globals.css`.

### New-code standard (applies to everything added)

Existing dbui code stays as-is, but all new code must be LLM-friendly and respect shadcn principles:

1. Composable subcomponents, not monolithic props-bags.
2. `data-slot` on every rendered element.
3. Function components; props typed via `React.ComponentProps<...>`.
4. Semantic tokens only — no hex, no raw px colors. Light + dark via tokens.
5. Names matching shadcn / AI SDK Elements where a counterpart exists, so LLM priors transfer.
6. Consistent `size` / `variant` enums — alias shadcn's names rather than inventing new ones.
7. `@standard` / `@guideline` / `@constraint` JSDoc on **every** component (dbui's single biggest LLM advantage).
8. Runtime-agnostic plain props — no hard dependency on the `ai` package.
9. `aria-label` required on icon-only controls.
10. `"use client"` wherever a client-only primitive is used.
11. Local `cn` = `twMerge(clsx(...))` so caller `className` wins (dbui's own `cn` does **not** do this — see §4).

---

## 3. Environment constraints (read before running anything)

**The npm registry is unreachable from this machine.** `curl https://registry.npmjs.org/` returns `000`. GitHub API and jsdelivr/unpkg *are* reachable. This mirrors the Databricks restriction that no one can install npm packages.

Consequences already handled:

- **Vega was bootstrapped offline.** The full 86-package dependency closure was copied from the local clone at `/Users/mudit.mittal/governance-hub-prototype/node_modules` into `db-design-system/node_modules` using `/tmp/copy-vega.mjs`. Versions: `vega@6.2.0`, `vega-lite@6.4.1`, `react-vega@8.0.0`, `vega-embed@7.1.0`.
- **`yarn.lock` does NOT record the new dependencies** because `yarn install` failed. Run `yarn install` once from a network with registry access to make them official.
- **Workspace symlinks were created by hand** (yarn could not run): `node_modules/dbui-viz` and `node_modules/dbui-genie` → `../packages/*`. If `node_modules` is wiped, recreate them.
- **`react-markdown` and `remark-gfm` exist nowhere on disk** and cannot be installed. `Response` is therefore a **zero-dependency markdown subset renderer** (see §5). This is arguably the right long-term answer given Databricks consumers can't install packages either — `dbui-genie` now has no external runtime dependency beyond `clsx` + `tailwind-merge`.

**react-vega v8 API gotcha:** v8 exports a single `VegaEmbed` component — *not* v7's `Vega` / `VegaLite`. Types `VisualizationSpec` and `Result` come from `vega-embed`, not `react-vega`. View access (for signal listeners) is via the `onEmbed` callback.

---

## 4. Known dbui issues — DO NOT FIX (deferred by owner)

Full detail in `research/2026-07-25-dbui-llm-usability-audit.md`. Summary of what will bite you:

| Issue | Impact on new code |
|---|---|
| dbui's `cn()` is a naive join with **no `tailwind-merge`** | New packages must ship their own `cn` (already done in both) |
| Base UI, not Radix: `asChild` does not work — use the `render` prop | e.g. `<TooltipTrigger render={<Button />}>` |
| `DropdownMenuTrigger` silently swallows `asChild` | Never rely on it |
| No `components.json` / registry; `@/...` imports don't resolve | Import via `dbui/components/...` |
| Radius scale redefined (`rounded-lg` = 12px, not 8px) | Use `rounded-sm` (4px) for controls, `rounded-md` (8px) for containers |
| `CLAUDE.md` claims a `text-sm`→13px / `font-medium`→600 remap that is **not implemented** | Write `text-[13px]` and `font-semibold` explicitly |
| Button sizes are `sm \| md \| icon-sm \| icon-md` (not shadcn's `default/lg/icon`) | Use dbui's names |
| dbui has ~6 pre-existing TypeScript errors (avatar, tooltip, lib/utils) | Typechecking dbui-genie surfaces them; **ignore them**, they are not yours |

---

## 5. What is already built (working, verified)

Typecheck clean; `storybook build` succeeds; 8 new stories registered; vega bundles.

### 5.1 Viz tokens — `packages/dbui/src/tokens/viz.css` (NEW FILE)

A `viz` token category ported from `governance-hub-prototype/src/lib/chartColors.ts`. Additive: does not touch `globals.css`.

- Palettes: `blue`, `blue-medium`, `blue-light`, `orange`, `orange-medium`, `orange-light`, `green`, `red`, `neutral`.
- Each exposes `-solid` (fill), `-border` (stroke), `-from` / `-to` (gradient stops), `-gradient` (CSS string for DOM use). Vega cannot read CSS gradient strings — hence discrete `from`/`to` stops.
- Sequential treemap scales: `--viz-treemap-blue-1..7`, `--viz-treemap-orange-1..8`.
- Treemap structural surfaces: `--viz-treemap-group-*`, `--viz-treemap-leaf-*`, `--viz-treemap-other-*`.
- Data palettes are **identical in light and dark** (matching the existing `--chart-1..5` convention). Only `neutral` and the treemap surfaces get dark variants; those dark values are **PROVISIONAL** pending Figma specs.
- A small `@theme inline` block exposes solids as Tailwind colors (`bg-viz-blue`, etc.) for legends/swatches.

### 5.2 `packages/dbui-viz`

Files: `package.json`, `tsconfig.json`, `tsup.config.ts`, `src/index.ts`, `src/lib/{utils,use-measure,theme}.ts`, `src/components/{line-series,bar-chart,segmented-bar,donut-chart,treemap}.tsx`.

| Component | Notes |
|---|---|
| `LineSeries` | Vega-Lite. Default ink line + subtle area + end dot. `showAxis={false}` gives a sparkline. Multi-series via `series` field. |
| `BarChart` | Vega-Lite. Gradient fill + 1px border (the GovHub treatment). Vertical/horizontal, stacked, `normalize`. |
| `SegmentedBar` | Vega-Lite. Single normalized stacked row. **Solid fills, not gradients** — Vega cannot bind a gradient per datum. |
| `DonutChart` | Vega-Lite arc + optional `centerValue` / `centerLabel` text layers. |
| `Treemap` | **Ported Vega spec** from GovHub `TreemapChart.tsx` (`stratify` + `treemap`, group/leaf layering, hover signals, auto-hide below 4px, `maxGroups` → "Others"). Tokenized. Selection via `onEmbed` + `addSignalListener`. |

Theming: `src/lib/theme.ts` resolves `--viz-*` and dbui semantic tokens into concrete values, re-resolving on `.dark` toggle via `MutationObserver`. Exports `useVizTheme`, `resolveVizTheme`, `verticalGradient`, `horizontalGradient`, `vizVegaConfig`, `VEGA_EMBED_OPTIONS`, `VIZ_SERIES_ORDER`.
Responsiveness: every chart measures its own container with `useMeasure` (ResizeObserver) and passes real pixels into the spec, because Vega-Lite's `width: "container"` mis-measures inside flex/grid parents.

### 5.3 `packages/dbui-genie`

Files: `package.json`, `tsconfig.json`, `tsup.config.ts`, `src/index.ts`, `src/lib/{utils,types}.ts`, `src/components/{conversation,message,response,reasoning,prompt-input,suggestion,follow-ups,actions,loader}.tsx`.

| Component | Notes |
|---|---|
| `Conversation` + `ConversationContent` + `ConversationScrollButton` + `ConversationEmpty` | Sticks to the newest turn while streaming; auto-scroll pauses the moment the user scrolls up. Scroll viewport is a plain overflow container (not dbui `ScrollArea`, whose custom scrollbars fight anchoring). |
| `Message` + `MessageContent` + `MessageAvatar` | Role-aware via `from="user" \| "assistant"`. |
| `Response` | **Zero-dependency markdown subset**: headings, bold/italic/strike, inline code, links, ordered/unordered lists, blockquotes, fenced code, GFM tables (rendered through dbui `Table`), horizontal rules. Nested lists flatten. Safe to re-render per streamed chunk; unterminated fences degrade gracefully. No raw HTML is emitted. |
| `Reasoning` | The "Thought for 40s" collapsible. Controlled or uncontrolled; `isStreaming` and `label` (e.g. "Waiting for user response"). |
| `PromptInput` family | `PromptInput` (form), `PromptInputContextBar` (scope chips), `PromptInputTextarea` (Enter submits, Shift+Enter newline), `PromptInputFooter`, `PromptInputTools`, `PromptInputButton`, `PromptInputSubmit` (swaps to Stop while streaming). `accent="ai"` paints the `--ai-gradient` border. |
| `Suggestions` / `Suggestion` | Starter/offered prompt chips. |
| `FollowUps` / `FollowUp` | Vertical list of next questions. |
| `Actions` / `Action` | Copy / feedback / overflow bar. Includes its own `TooltipProvider`; `Action` requires `label`. |
| `Loader` | Between submit and first token. |

`src/lib/types.ts`: `MessageRole`, `ChatStatus`, `SourceRef`, `PromptSubmission`, `PromptContextItem` — all plain, runtime-agnostic.

### 5.4 Portal / Storybook wiring

New stories: `apps/portal/src/stories/viz/Charts.stories.tsx` (`Viz/Charts`: Line, Bars, Segmented, Donut, Treemap) and `apps/portal/src/stories/genie/Thread.stories.tsx` (`Genie/Thread`: Full Thread with simulated streaming, Empty State, Pieces).

Four existing files were modified **additively only** (no existing line changed in a way that alters behaviour):

| File | Change |
|---|---|
| `apps/portal/.storybook/main.ts` | +3 lines: `dbui-viz` / `dbui-genie` aliases (listed before `dbui` so longer names win) |
| `apps/portal/.storybook/preview.ts` | +2 lines: `Viz`, `Genie` in `storySort` |
| `apps/portal/src/app/globals.css` | +2 `@source` globs, +1 `@import` of `viz.css` |
| `apps/portal/tsconfig.json` | + path mappings for `dbui`, `dbui-viz`, `dbui-genie` |

The `globals.css` edit was unavoidable: Tailwind v4 only emits utilities for files it scans, and the theme lives in that stylesheet, so a separate CSS entry would fail to generate classes like `text-muted-foreground` inside the new packages.

### 5.5 Verification commands

```bash
# typecheck (expect 0 errors)
cd packages/dbui-viz   && ../../node_modules/.bin/tsc --noEmit
# expect 0 errors in src/**, plus ~6 PRE-EXISTING errors from ../dbui/* — ignore those
cd packages/dbui-genie && ../../node_modules/.bin/tsc --noEmit

# full build + story registration
cd apps/portal && ../../node_modules/.bin/storybook build -o /tmp/sb-verify

# interactive
cd apps/portal && yarn storybook
```

**Not yet done: nobody has visually confirmed the charts paint in a browser.** A successful build is not proof Vega renders. Check `Viz/Charts` first.

---

## 6. Figma sources and decisions

| File | Key | Use |
|---|---|---|
| DBUI Design System | `OftbSQf85jOPln9RhSEhVv` | The Code Connect target in `figma.config.json` |
| Automation | `9f4WxYz0sSSrLsoaPpUsgF` | Where the new chat components currently live |

`Chat Components` section = `257:21391`. Assembled `Conversation` = `257:19627`.

Component nodes: `Asset card` `257:21192`; `Header` `257:20825`; `Asset details` `257:20743`; `Footer` `257:20861`; `.Row` `257:20646` (States Default/Hover/Selected/Expanded); `Prompt` `257:19890` (Type=Text `257:19616`, Type=Media `257:19889`); `Response` `257:19612`; `.Header` `257:19669`; `.Actions` `257:19791`; `.Thumbnail` `257:19844`; `Prompt input` `257:20025`; `.Input` `257:20164` (Focus × Input); `Viz/Metric Card` `257:20208`; `Viz/Timeseries Card` `257:20391`; `Viz/.Metric` `257:20330` (Compact/Default); `Viz/.Line series` `257:20337` (Line/Dots).

### Decisions taken

- Figma `.Header` → **`Reasoning`** (matches React; removes the collision with `Asset card`'s `Header`). *Owner is doing this.*
- Figma `Prompt` + `Response` → a single **`Message` component set with `Role = Prompt | Response`**. React keeps `Message from="user" | "assistant"`. Code Connect maps `Role=Prompt → from="user"`, `Role=Response → from="assistant"` — one mapping file with a two-value `getEnum`. *Owner is doing this.*
- All viz in Vega; treemap ported as-is, the other four rebuilt in Vega-Lite.
- Token category named `viz` to match the package name.
- dbui-genie ports the essentials from AI SDK Elements, reskinned via tokens.

### Confirmed Figma ↔ React matches

`Conversation`, the `Message` pair, `Reasoning`, `.Actions` → `Actions`/`Action`, `Prompt input` + `.Input` → `PromptInput` + `PromptInputTextarea`.

### Working per-component loop

Build in **React** first (dbui tokens + primitives, dbui-viz for charts) in local Storybook → generate the Figma component from the React output → owner tweaks Figma specs → sync tweaks back to React → then Code Connect + portal docs.

---

## 7. Work queue

### 7.1 React deltas from the Figma review (do first — small, independent)

1. **Move `Metric` into dbui-viz.** Figma namespaces it `Viz/.Metric` (Type=Compact | Default) alongside `Viz/Metric Card` and `Viz/Timeseries Card`. An earlier plan wrongly assigned `Metric`/`MetricDelta` to dbui-genie. Nothing is built yet, so this is a free correction. `AssetCard`'s Usage panel depends on it.
2. **`LineSeries` needs `showPoints`** to cover Figma's `Type=Dots`.
3. **Fix the user-prompt width rule.** `MessageContent from="user"` currently hardcodes `max-w-[85%]` + right align (the wide Genie One app pattern). The 400px panel design is full-width. This is a real bug — needs a width/context rule, not one fixed style.
4. **Add attachment rendering** to the user turn for Figma `Prompt` `Type=Media` / `.Thumbnail` (40×40). Absent in React today.
5. **Add `Sources`.** Figma shows "5 Sources" inside `.Actions`; keep it a separate composable component that can sit in the actions row.
6. **Remove `MessageAvatar`** — the Genie design uses no avatars.

### 7.2 `AssetCard` (the hero widget)

**One component, one interaction model, two layouts.** The model is a **single-expand accordion**: exactly one section open at a time; opening another closes the previous.

- `orientation="horizontal"` — section rows form a rail on the LEFT, one selected; the selected section's panel fills the right pane. Clicking another row switches the pane.
- `orientation="vertical"` — rows stack; the open section's panel renders directly beneath its row. Tapping another expands it and collapses the rest.

Purpose: organise many useful topics about an asset so users browse already-known information space-efficiently. The complexity is absorbed once here so consumers never rebuild it.

This maps onto existing Figma variants: `.Row` `State=Selected` serves the horizontal active tab; `State=Expanded` serves the vertical open panel. `Header` / `Asset details` / `Footer` are the shell.

Intended consumer API — identical markup for both layouts:

```tsx
<AssetCard orientation="vertical" defaultSection="usage">
  <AssetCardHeader
    icon={<Table />} name="user_accounts" path="main.user_management" certified
    action={<Button variant="outline">Assign to fix<ButtonChevron /></Button>}
  />
  <AssetCardSections>
    <AssetCardSection value="details" label="Details" summary="Table">…</AssetCardSection>
    <AssetCardSection value="usage" label="Usage" summary="21,437">
      <Metric value="21,437" delta="+2.6%" caption="past 30d" />
      <LineSeries data={queries} height={140} />
    </AssetCardSection>
    <AssetCardSection value="quality" label="Quality" summary={<Status status="online">Healthy</Status>}>…</AssetCardSection>
  </AssetCardSections>
  <AssetCardFooter>As of 12 hours ago</AssetCardFooter>
</AssetCard>
```

**Implementation note (decided).** Neither standard pattern covers both layouts alone: a Radix/Base-UI `Tabs` split (`TabsList` + separate `TabsContent`) handles the horizontal rail-and-pane but cannot interleave a panel *beneath its own row* for the vertical accordion. So `AssetCardSections` reads each `AssetCardSection`'s props and places row and panel itself, preserving one composable authoring shape for both orientations. Introspection stays internal; panels remain real JSX children so charts and tables drop in naturally. (A data-driven `sections={[…]}` array was considered and rejected as less shadcn-idiomatic and awkward for rich panels.)

Deferred: a **multi-asset card** (same family, list of assets).

### 7.3 Then, in order

- **Genie Batch 2 (content widgets):** `DataTable` (in-thread table + "View full table"), `CodeBlock` (syntax highlight + line numbers — closes a known dbui gap), `Artifact` with `SuggestionCard` / `SkillCard` variants, `Lineage` (mini connections graph).
- **Genie Batch 3 (human-in-the-loop):** `Question` / `QuestionOption` (lettered A-D choice card; choice / upload / "Other…" variants), `ChoicePrompt` (numbered command-palette choice), `Recommendation` (Current vs Recommended + control + Apply), `Callout` (severity, collapsible), `Tool` (pending/running/done/error), `SelectionBar` (floating "N selected").
- **Genie shells in `dbui-shells`:** `GeniePanel` (replaces the static `AssistantPanel` mock in `packages/dbui-shells/src/components/AssistantPanel.tsx`), `SplitReview` (list + detail), `GenieApp` + `GenieSidebar`. Product pages (Connections / My stuff / Discover) later.
- **Code Connect + portal docs** once components move into the DBUI library file (see §8).
- **Docs sync:** `CLAUDE.md` counts and finalized list, `install.md` CodeBlock gap, `composition.md` Genie shell.

---

## 8. Raise with the designer (owner)

1. **Asset card internals are inconsistently prefixed.** `.Row` is dotted (private) but `Header`, `Footer`, `Asset details` are not, though all four are internals. Namespace them (`Asset card/Header`, …) or dot them all.
2. **`Response` names two things** — a component *and* the wrapper frame around `Asset card`. Give the wrapper a distinct name.
3. **Components live in the Automation file**, not the DBUI library file that `figma.config.json` targets. They must move, or be published from a shared library, before Code Connect can work. **Hold off on Code Connect until this is resolved.**
4. **Token duplication.** Bindings mix dbui tokens (`--foreground`, `--muted-foreground`, `--success`, `--spacing-md`, `Paragraph`, `shadow/shadow-sm`) with a parallel legacy set of identical values (`Text/textPrimary`, `Text/textSecondary`, `Text/textValidationSuccess`, `Spacing/spacing-md`, `Du Bois/Paragraph`). Pick one system.
5. **`spacing/spacing-xxs: 2`** is lowercase-prefixed and off the 8px scale — either add it to dbui deliberately or drop it.
6. **Dark-mode viz values** in `viz.css` for `neutral` and the treemap surfaces are provisional and need Figma specs.
7. Still needed from design: **responsive/scaling rules**, and the **default vs modern theme** specs.

---

## 9. Deferred (architected for, not built)

- **dbui LLM-readiness remediation** (audit findings): `asChild` adapter, `cn` twMerge fix, `@/` compatibility aliases, shadcn→dbui translation table, doc/code reconciliation. Logged, not scheduled — owner wants to understand implications first. **Do not do these without an explicit go-ahead.**
- **Registry / CLI distribution** — reshaped by the no-npm-install constraint; needs an offline/vendored equivalent rather than a standard shadcn registry.
- **Theme switching** (default vs modern) as a `[data-theme]` layer over the central tokens, in dbui.
- **Script runtime** — a JSON "script" driver simulating streaming and tool/data calls, later swappable for real AI SDK `useChat`.
- **Part 2 of the audit** — use Figma reference screens to test whether LLMs can assemble complex UI from these packages, then feed failure modes back into JSDoc / docs / rules.

---

## 10. First actions for a fresh thread

1. Read this doc and `research/2026-07-25-dbui-llm-usability-audit.md`.
2. Run the §5.5 verification commands to confirm the baseline still builds.
3. Open Storybook and **visually confirm the Vega charts render** (never verified).
4. Do the §7.1 deltas (start with moving `Metric` into dbui-viz, since `AssetCard` needs it).
5. Build `AssetCard` per §7.2.
6. Keep every change additive; keep the §2 new-code standard.
