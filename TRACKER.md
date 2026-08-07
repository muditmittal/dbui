# Status

Verify with `dbui doctor`, `verify-token-sync.mjs`, `audit-legacy-tokens.mjs`,
`react-lint.js`, `generate-gallery.mjs`, `generate-token-consumption.mjs`.
Anything those contradict is this file being wrong.

**2026-08-06**

## Layers

| Layer | State |
| --- | --- |
| Tokens | Color, type and all four Dimensions families live and bridged — elevation and motion unconsumed |
| Icons | Done — some carry no metadata, so the index cannot see them. B3 |
| Components | Done — Date Range, Aspect Ratio and Label have no story, Platform Header has no `@guideline` |
| Compositions | Partial — exist, not documented |
| Shells | Partial — defined, asset detail templates not built |
| Portal | Done |
| CLI + MCP | Done |
| Figma | Being reconciled — I1 |
| Install | Works — registry points at the Databricks npm proxy |

## Register

Every known defect and gap, triaged. Ranked within each group by what it costs.

`Fix` is the size of the change, not the size of the problem.

- **line** — one or two lines, verifiable
- **file** — one file, no other surface moves
- **protocol** — several files that must move together, per `CONTRIBUTING.md`
- **decision** — yours. A token, a public signature or a visual call

### Broken — it produces the wrong thing today

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| B1 | `cn()` is `clsx` with no merge strategy, so a class a consumer passes does not override the base one. Stylesheet emission order picks the winner | Every composed component, silently. The winner flips when an unrelated rename reorders the sheet, which is how the radius rename moved `InputGroup` | decision — `tailwind-merge` is already a `dbui` dependency and vendored, so the swap is one line, but it changes what wins everywhere and needs a visual pass |
| B2 | The CLI never reads `@deprecated`. `composition.md`, both build skills and `CLAUDE.md` still name `DataTreeView` and `FileTreeView` | Every agent surface recommends a deprecated alias. `CatalogExplorer` already uses one | decision then protocol — the envelope is a public shape and the four docs move with it |
| B3 | `CircleSmall`, `Databricks`, `DatabricksLogo`, `DotsCircleSmall`, `RunningSmall` and `Slash` have no entry in `classifications.ts` or `descriptions.ts` | `dbui icon`, `dbui search` and `icon-index.md` cannot see them, and agents are told never to guess a name | protocol — five metadata surfaces each, and every one needs a category and a description |
| B4 | `dbui search` does no tokenization. `confirm destructive` returns nothing where `confirm` returns Alert Dialog | The main discovery entry point fails on the natural phrasing | file — left alone here only because another agent is editing `search()` |
| B5 | `min-w-*` and `max-w-*` reach no dimensional family and ride Tailwind's multiplier. `context-menu`, `dropdown-menu`, `kbd`, `menubar` and `segment-control` write `min-w-5` | Those widths do not move with the density dial and the scale cannot fail them | decision — a generator bridge, and the token tree is ask-first |
| B6 | `AccordionTrigger` hardcodes `<h3>` through Base UI's `Accordion.Header`, which takes no level | `/docs/principles` puts one under its `<h1>`, so the outline reads h1 then h3 and a shipped page skips a level | decision — exposing a level is a public signature change |
| B7 | `SegmentedBar` clamps the Vega view height to `barHeight` | `showLegend` is a prop that draws nothing | decision — the height prop is the contract and widening it moves every call site |
| B8 | `--db-radius-0` is unreachable. Tailwind emits static utilities after functional ones, so `rounded-none` wins wherever both could apply | A stop that exists and cannot be used. `react-lint.js` already refuses to offer it | decision — delete the stop or document it as unreachable |
| B9 | `yarn workspace portal lint` fails outright. `eslint-config-next` is installed and no `eslint.config.js` exists | The root `lint` script has never run | file, then triage of whatever it first reports |
| B10 | `dbui doctor` describes itself as exiting non-zero on failure and exits 0. `cli.mjs` says `check` gates a commit "the way doctor does" | It cannot gate anything | line — same CLI file another agent holds |

### Missing — the system cannot do it

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| M1 | No tests and no CI. The production build passes and nothing runs it | Every check is a person remembering | decision — where CI runs, and what gates |
| M2 | Nothing carries provenance. No component pairs a value with its freshness, its scope or its completeness | A truncated result looks like a different thing on every surface. The widest distance on `/docs/patterns` between what the principles ask and what the components do | decision — new components |
| M3 | No run component. A named operation with elapsed time, a cancel and a link to its result is rebuilt on every surface that has runs | The core object of a workbench has no primitive | decision — new component |
| M4 | No step indicator and no draft persistence. `Progress` draws a bar and carries no step labels, no completed state and no way back | The largest single gap on `/docs/patterns` | decision — new component |
| M5 | `Table` has no selection API. The checkbox column, the indeterminate header, persistence across pages and select-all-matching are hand-composed every time | The most repeated composition in the system | decision — a public API addition |
| M6 | No filter-bar composition and no single-date picker. `ControlsBar` gives the row, the tag row, the clear-all, the result count and URL sync are rebuilt per surface | Correct per surface means different per surface | decision — new composition |
| M7 | No typed-confirmation composition, nothing computes a blast radius and undo is not a capability. `sonner.tsx` exports only the `Toaster` | Destructive flows are improvised where they matter most | decision — new composition |
| M8 | The layout gaps on `/docs/layout` — most shells have no module, no chat shell, no canvas shell, no bottom-edge panel, the shell does not use the region components, panels do not persist, rails do not resize, navigation closes rather than collapses and no linter reads structure | "Shell first" is a rule the shells cannot yet satisfy | decision — the shell set is curated |
| M9 | No rule in `react-lint.js` fires on a `.ts` file, because every rule enters through a JSX element | A palette in an object literal comes back clean. The viz theme made the point and the blind spot is unchanged | file — teach the color rules to read an object literal |
| M10 | No automated accessibility suite, no i18n framework and no screen reviewed right to left | Every accessibility check on `/docs/accessibility` is done by a person or not at all | decision — tooling and scope |
| M11 | Elevation and motion are unconsumed. Both elevation scales are pure black with no dark value, so neither draws against `surface-base` in dark | Two token families the product cannot use | decision — see the measurements below |
| M12 | `action-default-base`, `action-default-press` and the `action-label-*` triplet have no consumer. `action-default-hover` and `action-label-inverse-*` are live and must not be swept up | Semantics that are correct and that no control reads | decision — rewire the controls onto them, do not delete |
| M13 | The viz semantics carry ten categorical steps and ten sequential steps and nothing else. A chart meaning healthy borrows `status-text-*` and one meaning no data borrows `text-disabled` | The chart layer contradicts constraint S3 in one direction | decision — a `viz` state and inert set |
| M14 | `Empty` has no failure variant, and no disclosure primitive owns async content or persists its open state | An error in an empty region falls back to `Alert` and loses the composition | decision — new variants |
| M15 | No `brand/*` token exists, so `DatabricksLogo` hardcodes its hex | The one place the system cannot follow its own no-hex rule | decision — a new token family |
| M16 | Compositions exist and are not documented | An agent cannot pick what it cannot read | protocol — `composition.md` |

### Inconsistent — two surfaces disagree

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I1 | The Figma library and its Code Connect files were built before the token migration | Code Connect describes a system that no longer exists | protocol — a Figma pass is in flight. `verify-token-sync` is the check, and Figma and Code Connect move in one pass or they drift again |
| I2 | The dimensional scale is closed by convention only. Tailwind's multiplier is still on, so `p-5`, `p-9` and `p-12` compile off it | The scale is a recommendation, not a constraint. `--spacing: initial` cannot land until the snap pass runs | decision — rules agreed in `docs/token-simplification.md`, nothing done |
| I3 | Components dim a disabled control with `opacity-50` rather than the disabled tokens | The system breaks its own constraint S2, which forbids exactly this | file — but it is a visible change on every control it touches |
| I4 | Genie prose sits on `body` and `theme.config.mjs` names chat messages under `paragraph` | Reconciling moves the whole conversational surface up two points | decision — a design call, not a migration |
| I5 | `VizPaletteName` went from four hue names to ten numbered steps plus `positive` and `negative`, with no changelog. No `CHANGELOG.md` exists, though `CONTRIBUTING.md` requires an entry for any public API change | A breaking export change with no record. Every future one has nowhere to go | file — create it, backfill this entry |
| I6 | Shipped components write 10px and 14px as `size-2.5`, `size-3.5`, `h-2.5`, `w-2.5` and `bottom-2.5`. The size family carries neither | Indicator dots and small icons sit off the scale and do not move with the dial | decision — add the stops or move the marks |
| I7 | `chart.tsx`, `table.tsx` and `tooltip.tsx` write `rounded-[1px]` and `rounded-[2px]` | Sub-token radii on chart marks and the tooltip arrow | decision — the radius family starts above them |
| I8 | `--shadow-focus` is authored in `globals.css` rather than `theme.config.mjs` | Its two widths are the only dimensional values outside the config | file — the radius and spacing bridges already moved |
| I9 | `packages/dbui/src/tokens/viz.css` is orphaned. Nothing reads `--viz-*`, and `globals.css` stopped importing it | Dead file in the frozen token tree | decision — the token tree is ask-first. Deleting it also drops `--viz-<hue>-*` from rule R2 in `docs/token-rules.md` |
| I10 | `ProductAccountConsole.svg`, `ProductDatabricksOne.svg`, `ProductLakebase.svg` and `ProductLakehouse.svg` sit in the icons directory with no importer and no matching component | Either leftovers or product icons someone meant to convert. Nothing says which | decision — delete or convert |
| I11 | `lucide-react` is declared in `apps/portal/package.json` and never imported, while `/docs/icons` tells readers not to install it | The portal ships the one dependency the system forbids. "Lucide icon pack" is on the not-started list, which may be why | decision — remove it or say what it is for |
| I12 | `follow-ups.tsx` in Genie renders a raw `<button>` | The only non-negotiable rule broken in shipped code | file |
| I13 | Storybook 8.6 against 10.4. v9 removed `addon-essentials` and moved `@storybook/blocks` | Two majors. Own branch. Now unblocked | protocol |
| I14 | `component-index.md` and `icon-index.md` are hand-maintained and lag source | They should be generated from JSDoc and `classifications.ts` | file |

### The React linter

The total `react-lint.js` prints is not a count of problems. Run it for the current number
and read the shape here.

- Almost all of it is in Storybook stories. Portal chrome is a distant second and shipped
  package code is the smallest slice by an order of magnitude
- Two causes are most of the total: type written as a px literal and color written as a hex
- Nearly half sit inside a `style={{}}` attribute — the table headers, row labels and grid
  gaps that frame a specimen, not the component being specified
- `text-[13px]` and `text-[12px]` are most of the type half. Both are values the ramp already
  carries, so the swap to `type-label` and `type-body` is mechanical

What lands in shipped code reduces to three rows above: I6, I7 and I12. The rest is story
chrome, and `gallery-demos.tsx` is the one story file that also renders to users, on
`/docs/components`.

### First calls

Four decisions gate the rest. Nothing else in the register is blocked on anything.

- **B1, `cn()`.** Until it resolves, no override a consumer writes is reliable, so any
  component work built on one is built on emission order.
- **I2, close the multiplier.** B5, B8, I6 and I7 are all the same question asked four
  ways. Snap the call sites and they collapse into one pass.
- **B2, `@deprecated`.** Cheap once you say whether the envelope may grow a field.
- **M1, CI.** Everything above regresses silently without it, including what was fixed today.

## Measurements the open calls rest on

Recorded because nothing else holds them and the calls cannot be made without them.

- **Elevation cannot be bridged without changing how the product looks.** Measured on one
  card, `shadow-lg` reaches below it and nowhere above. `elevation-1` blooms on all four
  sides because it carries no negative spread and is roughly four times wider sideways.
  `elevation-3` peaks far darker than the `shadow-xs` on the controls that use one.
- **Motion is the right shape and still unread.** The three that remain are `fast 150`,
  `default 300` and `slow 450`. Pointing `--default-transition-duration` at `fast` is a
  true no-op and the obvious next step. Pointing it anywhere else changes how the product
  feels, because the bare `transition-*` call sites run at Tailwind's 150ms.
- **The `cn()` defect is reproducible.** `node scripts/pixel-ab.mjs <url> <selector> <css>`.
  On `InputGroup` the rendered difference was small only because the element is transparent
  and borderless. Nothing about that outcome was chosen.
- **Space and size deliberately do not carry the same stops.** 5, 7 and 12 are size stops
  and not space stops, so `h-5` is `--db-size-5` while `p-5` is the multiplier. The snap
  pass touches `p-5` and `p-12` and must leave `h-5` and `h-12` alone. K5b and K13b pin it.
- **A missing stop in `size` does not fail.** A height utility reads `--height-*` first and
  `--spacing-*` second, so `h-6` renders from `--db-space-6` whether or not size owns a 6.
  `size-6` was dropped once and nothing moved. K12 pins the precedence.
- **The consumption scan measures the multiplier gap.** Run
  `node scripts/generate-token-consumption.mjs` rather than quoting a ratio from here.

## Done since the last entry

- The CLI reads a JSDoc tag to its end. `@constraints` blocks, wrapped tags and the
  summaries they were corrupting all print now, including Button's `aria-label` rule.
- `icon-index.md`, `component-rules.md` and `DESIGN.md` no longer count the icons or the
  components. Three of those sentences were wrong, all understating by the six icons that
  carry no metadata. `AGENTS.md` still counts and its numbers are right today.
- `audit-legacy-tokens.mjs` no longer reports live semantics as leftovers and exits clean.
- `resizable.tsx` no longer carries `ring-offset-background`, a class Tailwind stopped
  emitting when the migration deleted `background`.

## Not started

Asset detail templates · tree parity with the prototype · Lucide icon pack ·
a11y and i18n linters · breakpoint tokens
