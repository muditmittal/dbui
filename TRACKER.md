# Plan

One file: where the system stands, what is wrong with it, and the order the work happens in.

Verify with `dbui doctor`, `verify-token-sync.mjs`, `audit-legacy-tokens.mjs`, `react-lint.js`,
`generate-gallery.mjs`, `generate-token-consumption.mjs`. Anything those contradict is this file
being wrong.

Ids are stable and cited from outside this file. `B` produces the wrong thing today, `M` the system
cannot do it, `I` two surfaces disagree. `Fix` is the size of the change, not the size of the
problem: **line**, **file**, **protocol** (several files move together per `CONTRIBUTING.md`),
**decision** (yours — a token, a public signature or a visual call).

**2026-08-08**

## Where it stands

| Layer | State |
| --- | --- |
| Tokens | Color, type and all four Dimensions families live and bridged. Elevation is consumed through the `--shadow-*` bridge; motion has one consumer and two idle stops. M11 |
| Icons | Done — six carry no metadata, so the index cannot see them. B3 |
| Components | Done — Date Range, Aspect Ratio and Label have no story, Platform Header has no `@guideline` |
| Compositions | Partial — exist, not documented |
| Shells | Partial — defined, asset detail templates not built |
| Portal | Done |
| CLI + MCP | Done |
| Figma | Being reconciled — I1 |
| Install | Works — registry points at the Databricks npm proxy |
| Distribution | Public scope decided — tokens, components and viz. Patterns and shells stay internal. I19 |
| Patterns | Not started — the decision layer. Phase 1 and Phase 6 |
| Themes | Axis shipped — Core, DuBois and One switch from the portal footer. Omni not built. `brand.orange` is not yet in Figma, so `design:verify-sync` reports 10 primitives. `notes/2026-08-11-multi-theme-architecture.md`. No phase yet |

## The sequence

The goal is a system that knows its own best practices, so someone expressing an idea gets a good
default without choosing, and an expert can still override. Everything before Phase 6 is
prerequisite to that.

| Phase | What it settles | Items | Runs |
| --- | --- | --- | --- |
| 0 | The bar for what a docs page may contain | — | now |
| 1 | Decisions available today, before anything is built on them | scopes M2–M7, M14 | parallel with 2 |
| 2 | Stabilize: make the checks true, then clear the debt | 38 | parallel with 1 |
| 3 | New components — chat, charts, and the seven missing primitives | 10 | after 2 |
| 4 | Prove the system agrees with itself | — | after 3 |
| 5 | Shells | M8 | after 4 |
| 6 | Patterns closes the loop | — | last |
| R | Release gate | I19, I21 | when releasing |

One ordering is deliberate and easy to get wrong. **Phase 2b runs before any audit is believed** —
`design:verify-sync` compares color and nothing else, so it cannot see a token value (B18) or a
whole new family. The shape roles landed on 2026-08-08 and the verifier still printed "in sync",
which is that failure in its plainest form. Portal lint has never run (B9) and `doctor` cannot
gate (B10).

---

## Phase 0 — Set the bar

Cheap, and it stops the next page being written in the style the last one is being cut out of.

- [ ] Write the docs content standard: every block is a **fact**, a **behavior**, or a
      **do/don't**. Prose survives only where it changes a decision.
- [ ] Add it to the `CONTRIBUTING.md` ownership table so new pages are held to it
- [ ] Decide Patterns' output shape — `patterns-data.ts`, plain strings, no React, the way
      `constraints-data.ts` is, so the page, `dbui pattern` and MCP all read one source

## Phase 1 — Decisions available today

Every component involved already exists and is stable, so these can be written now. Each one
scopes a missing primitive in Phase 3 rather than waiting for it: a decision about bulk actions
is what says whether M5 is a checkbox column or a selection context.

### Decided 2026-08-08

**P1 Choosing one of N.** Two options → SegmentControl (desktop vs mobile). More than two →
DropdownMenu. Options drawn from customer-defined resources rather than a finite set → Combobox
with search inside the menu (pick a catalog, pick a file).

**P2 Radio and RadioTile.** Radio only where the reader benefits from seeing every option at once.
RadioTile where the options are not equal and each needs a line of explanation — a wizard picking
one of four frameworks, where the reader did not know the choices existed. The test is whether the
reader has to *evaluate* before choosing, not how many options there are.

**P3 Tables.** Sticky header by default. "Show more" at the foot rather than a numbered pagination
row. → scopes **M5**

**P4 Page composition and bulk actions.** A page runs page header → controls bar → content, where
content is a table, a canvas or a form. Bulk actions are a floating action bar that appears on
selection, never a slot in the page header — so the pattern carries no dependency on the layout
above it. → scopes **M5**, **M6**

**P5 Which surface.** Quick binary decision, continue or delete → Dialog. Reading more about
something → sidebar. Editing → popup toolbar. Bulk actions → popup action bar (P4). A focused task
the reader completes and returns from → modal, e.g. picking source tables to join before writing
the query. → scopes **M7**

**P7 States.** Every form input carries empty, loading, partial, input, active, error and success.
Page-wide communication is toast or banner. → scopes **M14**

### Open — needs another pass

**P6 Panels and layout.** *(new)* Databricks surfaces are panels: navigation left, schema browser,
chat, an editor with terminal / output / logs at the bottom, properties right, and soft tabs inside
one browser tab. Any panel opens, closes and resizes at any time, and a click inside a soft tab can
open a properties panel. Needs default sizes, minimums, persistence and resize behavior before it
can be a rule. Overlaps **M8** and the sidebar half of P5.

**P8 AI-first forms.** Norms for forms in the new experience. Undefined — this is a design task
rather than a decision waiting to be written down.

- [ ] **Filtering** — where filters live, what clears them, what the URL holds → scopes **M6**
- [ ] **Values that are not facts** — sampled, cached, truncated, permission-filtered → scopes **M2**
- [ ] Cut prose to the Phase 0 bar on the pages that will not churn: principles, constraints,
      accessibility, voice, tokens

## Phase 2 — Stabilize

### 2a First calls

Three gate the rest. Nothing else in the register is blocked on anything.

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| M1 | No tests and no CI. The production build passes and nothing runs it | Every check is a person remembering. Everything below regresses silently, including what was fixed today | decision — where CI runs, and what gates |
| I2 | The dimensional scale is closed by convention only. Tailwind's multiplier is still on, so `p-5`, `p-9` and `p-12` compile off it | The scale is a recommendation, not a constraint. `--spacing: initial` cannot land until the snap pass runs | decision — rules agreed in `docs/token-simplification.md`, nothing done |
| B2 | The CLI never reads `@deprecated`. `composition.md`, both build skills and `CLAUDE.md` still name `DataTreeView` and `FileTreeView` | Every agent surface recommends a deprecated alias. `CatalogExplorer` already uses one | decision then protocol — the envelope is a public shape and the four docs move with it |

I2 collapses four rows into one pass — B5, B8, I6 and I7 are the same question asked four ways.

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| B5 | `min-w-*` and `max-w-*` reach no dimensional family and ride Tailwind's multiplier. `context-menu`, `dropdown-menu`, `kbd`, `menubar` and `segment-control` write `min-w-5` | Those widths do not move with the density dial and the scale cannot fail them | decision — a generator bridge, and the token tree is ask-first |
| B8 | `--db-radius-0` is unreachable. Tailwind emits static utilities after functional ones, so `rounded-none` wins wherever both could apply | A stop that exists and cannot be used. `react-lint.js` already refuses to offer it | decision — delete the stop or document it as unreachable |
| I6 | Shipped components write 10px and 14px as `size-2.5`, `size-3.5`, `h-2.5`, `w-2.5` and `bottom-2.5`. The size family carries neither | Indicator dots and small icons sit off the scale and do not move with the dial | decision — add the stops or move the marks |
| I7 | `chart.tsx`, `table.tsx` and `tooltip.tsx` write `rounded-[1px]` and `rounded-[2px]` | Sub-token radii on chart marks and the tooltip arrow | decision — the radius family starts above them |

### 2b Make the checks true

Until these land, an audit reports agreement it did not verify. This is the prerequisite for one
audit command, not a nice-to-have beside it.

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| B18 | **Half closed 2026-08-09.** The verifier now compares Figma values when the dump carries them, and says plainly when it cannot — the "✅ In sync" that covered a names-only comparison is gone, `--strict` fails on an unverifiable dump, and the report names what is not covered at all. What remains is data, not code: `.figma-token-dump.json` still holds names only, so value parity is unverified until someone runs the refresh snippet in the verifier's header against Figma | Until the dump is refreshed, a token whose value moved in code and not in Figma still passes — but the check now says so instead of claiming agreement | protocol — run the dump against Figma and paste the result. The comparison is built and tested against a planted drift |
| B9 | `yarn workspace portal lint` fails outright. `eslint-config-next` is installed and no `eslint.config.js` exists | The root `lint` script has never run | file, then triage of whatever it first reports |
| B10 | `dbui doctor` describes itself as exiting non-zero on failure and exits 0. `cli.mjs` says `check` gates a commit "the way doctor does" | It cannot gate anything | line — same CLI file another agent holds |
| M9 | No rule in `react-lint.js` fires on a `.ts` file, because every rule enters through a JSX element | A palette in an object literal comes back clean. The viz theme made the point and the blind spot is unchanged | file — teach the color rules to read an object literal |
| M17 | Nothing type-checks the packages the way a consumer does. Install copies source, so the consumer's `tsconfig` compiles it, and the Vite template this repo's install doc tells people to scaffold turns on `noUnusedLocals` and `noUnusedParameters` | Any dead import left behind breaks a newcomer's first `npm run build`, and it is invisible from inside the repo | file — compile both packages under the template's flags, run it beside the linters |
| I14 | `component-index.md` and `icon-index.md` are hand-maintained and lag source | They should be generated from JSDoc and `classifications.ts`. Hand maintenance will not survive Phase 3 | file |

- [ ] Then collapse them: `yarn design:audit` = sync + verify-sync + verify-rules + lint +
      story-ids + consumer typecheck + doctor. One command, run at every phase boundary.

### 2c Figma parity

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I1 | The Figma library and its Code Connect files were built before the token migration. `Tabs` is the sharpest case: `variant-mappings.json` publishes a `Variant` property and the Figma asset is a plain component with no variant property at all — one lined strip, seven `TabsTrigger` instances, selected label bold. Neither tab variant exists there | Code Connect describes a system that no longer exists. For `Tabs` the portal's mapping table describes one that never did | protocol — Figma and Code Connect move in one pass or they drift again. `Tabs` needs promoting to a component set before its Code Connect can carry a `figma.enum` |
| I18 | `NavbarNewButton` is neutral and the Figma node it maps to is pink. Figma's pink is an unmigrated instance override on `Primitives (old)`: light-only, built from the destructive ramp, never a Button variant. The blue plus in `dbui-shells/PlatformNav.tsx` is a third value neither surface specifies | The primary creation action has no agreed treatment, and the one artefact that looks like a spec is not one | decision — a design call, not a migration. Evidence in `notes/navbar-new-button-accent.md`. Do not restore the override |

### 2d Code debt

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I12 | `follow-ups.tsx` in Genie renders a raw `<button>` | The only non-negotiable rule broken in shipped code | file |
| I3 | Components dim a disabled control with `opacity-50` rather than the disabled tokens | The system breaks its own closed set of four emphasis weights, which `token-rules.md` forbids extending by opacity | file — a visible change on every control it touches |
| I15 | `dbui-chat` and `dbui-viz` export their own `cn()`, both stock `twMerge(clsx(...))`. Neither knows the `type-*` ramp or the numbered radius stops, which `dbui`'s now does | Two override semantics under one name again. Masked today because both packages route most class lists through `dbui`'s components | file — export the configured merge from `dbui/lib/utils` and have both import it. Needs its own screenshot pass |
| I16 | Six `!` markers no longer change what renders now that `cn()` merges: `pl-2!`/`pr-2!` in `pagination.tsx`, `!rounded-none`/`!shadow-none` in `button-variants.ts`, `!p-0` in `PlatformHeader.tsx`, `type-body!` in Genie's `suggestion.tsx` | Each blocks a consumer from overriding that property without a marker of their own, for no remaining reason. `!h-auto` and `!px-0` on the link variant are **not** in this set — removing those breaks the button | file — remove and re-run the screenshot pass |
| B11 | `MenubarItem` sets its destructive icon color with `!`, only under `data-[variant=destructive]` — no `focus:` or `data-disabled:` counterpart, and the marker outranks both | A focused destructive item shows an inverse label beside a still-red icon; a disabled one shows a disabled label beside a still-red icon | file — add the missing state rules for the svg. Removing the marker does not fix it |
| B14 | Three tree rails clip the top of their first row's focus ring. `DataTreeExplorer:527`, `FileTreeExplorer:164` and `CatalogExplorer:394` carry `flex-1 overflow-y-auto px-1 pb-4` — a bottom gutter and no top one | The same defect `PlatformNav` had, on the opposite edge, in three more places | file — `pt-1` on each, and `scroll-my-*` on the tree row |
| B16 | `action-selected-press` is the generic press wash for eight controls with no selected state — `Checkbox`, `RadioGroup`, `Switch`, `ToggleGroup`, the `DataTree` chevrons, `FacetedFilter`, `InputGroup`, and `DataTree`'s selected row, which uses the *press* stop for a resting state | The two interaction families are entangled by consumption, not by value. It is why the selected ladder could not be re-spaced from the top | file — most of these want `action-default-press`. Mechanical, but it touches every form control |
| B17 | The nav rail's current item has no hover response. Scoping the wash away from it closed B13's erasure, but `surface-accent` has no hover stop | Not harmful — the item is the page you are on — but every other item answers the pointer and this one does not | decision, then a token — needs `surface-accent-hover`. Deliberately not invented |
| B6 | `AccordionTrigger` hardcodes `<h3>` through Base UI's `Accordion.Header`, which takes no level | `/docs/principles` puts one under its `<h1>`, so the outline reads h1 then h3 and a shipped page skips a level | decision — exposing a level is a public signature change |
| B3 | `CircleSmall`, `Databricks`, `DatabricksLogo`, `DotsCircleSmall`, `RunningSmall` and `Slash` have no entry in `classifications.ts` or `descriptions.ts` | `dbui icon`, `dbui search` and `icon-index.md` cannot see them, and agents are told never to guess a name | protocol — five metadata surfaces each |
| B4 | `dbui search` does no tokenization. `confirm destructive` returns nothing where `confirm` returns Alert Dialog | The main discovery entry point fails on the natural phrasing | file |
| I10 | `ProductAccountConsole.svg`, `ProductDatabricksOne.svg`, `ProductLakebase.svg` and `ProductLakehouse.svg` sit in the icons directory with no importer and no matching component | Either leftovers or product icons someone meant to convert. Nothing says which | decision — delete or convert |
| I11 | `lucide-react` is declared in `apps/portal/package.json` and never imported, while `/docs/icons` tells readers not to install it | The portal ships the one dependency the system forbids | decision — remove it or say what it is for |

### 2e Token debt

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| M11 | **Mostly closed 2026-08-11, and the description was wrong twice.** Elevation is not pure black with no dark value — every stop carries both modes and the dark alphas are an order up (`xs` is 0.05 light and 0.45 dark), which is exactly what makes it draw against `surface-base` in dark. It is not unconsumed either: `--shadow-xs` … `--shadow-xl` bridge to `--db-elevation-*`, so every `shadow-*` call site in the system has been reading elevation all along, and `Card`'s new `interactive`/`spotlight` stops read `xs` and `sm` deliberately. Motion has its first explicit consumer too — `effects.css` transitions the spotlight halo over `--db-duration-fast` on `--db-ease-standard`. **Closed 2026-08-11.** The last open piece was whether the bare `transition-*` sites should name a duration: they now do, via `--default-transition-duration` → `--db-duration-fast`, which is value-for-value what they already rendered. `default` and `slow` are still unread and cannot be classes, because `--duration-*` is not a namespace | Two of the three claims were false, so the row was arguing for work already done | done — M4 in `verify-spacing-scale.mjs` pins the bridge |
| M12 | `action-default-base`, `action-default-press` and the `action-label-*` triplet have no consumer. `action-default-hover` and `action-label-inverse-*` are live and must not be swept up | Semantics that are correct and that no control reads | decision — rewire the controls onto them, do not delete |
| M15 | No `brand/*` token exists, so `DatabricksLogo` hardcodes its hex | The one place the system cannot follow its own no-hex rule | decision — a new token family |
| I8 | `--shadow-focus` is authored in `globals.css` rather than `theme.config.mjs` | Its two widths are the only dimensional values outside the config | file — the radius and spacing bridges already moved |
| I9 | `packages/dbui/src/tokens/viz.css` is orphaned. Nothing reads `--viz-*`, and `globals.css` stopped importing it | Dead file in the frozen token tree | decision — the token tree is ask-first. Deleting it also drops `--viz-<hue>-*` from R2 in `docs/token-rules.md` |
| I4 | Genie prose sits on `body` and `theme.config.mjs` names chat messages under `paragraph` | Reconciling moves the whole conversational surface up two points | decision — a design call, not a migration |
| — | No token defines the loading-delay threshold, and neither `Spinner` nor `Progress` carries one | Every surface picks its own number or picks none. Orphaned by the constraints rewrite; the only one of those five not already in this register | decision — a token plus a component default |

### 2f Docs debt

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I5 | **Closed 2026-08-10.** `CHANGELOG.md` exists and all six owed entries are backfilled, plus the three from that day — `SplitButton` losing `orientation`, `Tabs` moving to its new Figma node, and `Badge`'s four status variants landing in Figma. `CONTRIBUTING.md` now names the file rather than saying "the changelog" | — | — |
| M16 | Compositions exist and are not documented | An agent cannot pick what it cannot read | protocol — `composition.md` |
| M10 | No automated accessibility suite, no i18n framework and no screen reviewed right to left | Every check on `/docs/accessibility` is done by a person or not at all. The page now states this as the contract | decision — tooling and scope. An a11y linter and an i18n linter are the two candidates |

### 2g Storybook

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I13 | Storybook 8.6 against 10.4. v9 removed `addon-essentials` and moved `@storybook/blocks` | Two majors. Own branch. Now unblocked | protocol |

## Phase 3 — New components

I20 is closed — the package is `dbui-chat` as of 2026-08-08, before any chat component lands in it.

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| ~~B12~~ | ~~The `Components/Chat/Thread` `Pieces` story wedges the renderer in headless Chrome~~ | **Stale — there is no `Pieces` story.** The Thread file exports `FullThread`, `EmptyState`, `Messages`, `ReasoningStates`, `Tasks`, `Plans`, `SourcesInActionRow`, `Composer` and `ResponseMarkdown`. Headless Chrome cannot screenshot *any* Storybook story on this machine, so the symptom was never specific to this one — see the note under the parity section |

Then the seven primitives Phase 1 scoped. Each is `decision — new component`, and the decision is
Phase 1's output rather than a fresh one.

| # | What | What it costs |
| --- | --- | --- |
| M5 | `Table` has no selection API. The checkbox column, the indeterminate header, persistence across pages and select-all-matching are hand-composed every time | The most repeated composition in the system |
| M6 | No filter-bar composition and no single-date picker. `ControlsBar` gives the row; the tag row, clear-all, result count and URL sync are rebuilt per surface | Correct per surface means different per surface |
| M2 | Nothing carries provenance. No component pairs a value with its freshness, its scope or its completeness | A truncated result looks like a different thing on every surface. The widest distance between what the principles ask and what the components do |
| M3 | No run component. A named operation with elapsed time, a cancel and a link to its result is rebuilt on every surface that has runs | The core object of a workbench has no primitive |
| M4 | No step indicator and no draft persistence. `Progress` draws a bar and carries no step labels, no completed state and no way back | The largest single gap on `/docs/patterns` |
| M7 | No typed-confirmation composition, nothing computes a blast radius, and undo is not a capability. `sonner.tsx` exports only the `Toaster` | Destructive flows are improvised where they matter most |
| M14 | `Empty` has no failure variant, and no disclosure primitive owns async content or persists its open state | An error in an empty region falls back to `Alert` and loses the composition |

Then the two new sets.

- [ ] Chat thread components — from the separate file, into `dbui-chat`
- [ ] Charts and their inner components, with **M13** below
- [ ] Tree parity with the prototype
- [ ] Decide once: React-first with Figma following in one pass, or lockstep. React-first grows I1.
- [ ] Per component: JSDoc tags, Figma + Code Connect, index entry, gallery demo, CHANGELOG line

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| ~~M13~~ | ~~The viz semantics carry ten categorical and ten sequential steps and nothing else~~ | **Closed.** `viz-neutral-*` is the inert set and `viz-level-*` the state set — five levels over `base`/`subtle`/`strong`. `PALETTE_VARS` borrows nothing; R10 now names all four families. The borrow was worse than untidy: `status-text-positive` and `status-text-negative` sit 0.8 L\* apart, so passed and high-risk were the same colour in greyscale on the one comparison a security page exists to make | — |
| B7 | `SegmentedBar` clamps the Vega view height to `barHeight` | `showLegend` is a prop that draws nothing | decision — the height prop is the contract and widening it moves every call site |
| ~~B15~~ | ~~`StatCard` and `SegmentedBar` Code Connect fail to parse~~ | **Closed.** Both mapped a Figma property the node does not have — `figma.boolean("Show link")` on a component with no properties, and `figma.enum("Type")` where the axis is `Colors` — and fed each into a ternary. Code Connect serializes a value map but not a conditional, so both files published nothing. `ToggleButton` still fails the same way and is open | — |
| B16 | `ToggleButton` Code Connect fails to parse, and every `dbui` connect file warns `Import could not be resolved` for the `../components/ui/*` alias | One component publishes nothing; the alias warning is 500 lines of noise that hid B15 for weeks | file — same conditional-in-`example` shape as B15; the alias needs checking against `figma.config.json` `paths` |

### Charts, 2026-08-16

Six large charts now exist alongside the medium tier: `Viz/Large/Bar`, `Stacked Bar`, `Line`,
`Multiline`, `Treemap`, `Heatmap`, all **1160 × 208** — a 1112 × 168 band plus axes, taken from the
usage-page mocks rather than invented. `Heatmap` is the one new React component; the other five
needed no code, because width is measured and height is a prop.

Two things worth not relearning:

- **`density-scalar` does not reach `dbui-viz`.** There are no references to it in the package, so a
  large chart is a bigger `height`, never a scaled component. Only `--db-type-scalar` crosses over,
  and only for chart label sizes.
- **The medium tier is now explicit per chart type.** `Viz/Medium/Bar` was a `Type=Bar|Stacked` set
  and is two components; `Viz/Card/*` is one card per chart rather than `TimeSeries`/`Distribution`.
  A variant one level down is invisible in the component browser, so designers detached and rebuilt
  the tile instead of swapping it.

`Heatmap` cost three bugs that a screenshot would only have shown as a blank chart, which is why
`yarn design:verify-heatmap` exists: a temporal x scale has no `bandwidth` so cells had no width; the
Vega expression language has no `undefined` literal and read the word as a signal name; and
Vega-Lite filters null rows before the mark, so no-data cells vanished rather than rendering grey.
The script compiles the real spec, reads token values out of `tokens.css` so it cannot drift from the
palette, and asserts 180 cells, 28px rows, zero off-palette fills and a visible gap between the
empty cell and the lowest step, in both modes.

### Figma ↔ React parity, 2026-08-16

`yarn design:audit-viz` walks all 24 viz components in Figma against the nine steps in
`CONTRIBUTING.md` and exits non-zero on a gap. It found four real ones, now closed:

- **`MetricCard` had no `delta`.** Every `Viz/Card/*` header is `Viz/Inner/Metric` with
  `Show change=true`, rendering "+2.6% past 30d" — a thing the Figma card drew and React could not.
  It now takes `delta` / `deltaWindow` / `deltaTone`, matching `StatCard`, and the tone scale moved
  to `lib/delta-tone.ts` so the two cards cannot drift. It is not in the barrel on purpose: it is how
  the cards agree with each other, not a surface to compose against.
- **`Leaderboard` and `Legend` had no tsup entry.** They are the two charts with no Vega in them, and
  the barrel says out loud that a page needing only these should pull no chart runtime — which is
  precisely what the missing per-component path broke.
- **`metric-card.tsx` `@figma` pointed at `4995-9316`**, a node deleted in the card restructure. Dead
  since then, and invisible because nothing checks a JSDoc URL resolves.
- **Nine of ten viz components had no `variant-mappings.json` entry**, so the portal's Figma↔code
  table was blank for the whole family.

`yarn design:verify-cards` server-renders both cards and asserts the delta, its tone, and that the
two agree on the tone class — the check that would catch the shared scale being forked again.

### One palette rule, 2026-08-16

The same chart was three different colours depending on where you looked: Figma drew a bar in
`level/info/base` (`#A3E3F7`, pale enough to be weak as a mark), React defaulted it to
`categorical-1`, and the line was `sequential/5` in Figma against `theme.foreground` ink in React.
`DESIGN.md` now carries the rule — one series is `sequential-5`, peers are `categorical-1` upward,
a state is `level-*`, a track or tail is `viz-neutral-*` — and `design:audit-viz` fails when a React
default and its Figma binding disagree, including if the ink fallback comes back.

Both mediums now draw one shared 30-value series over one axis (Jan 7 → Feb 4, the range the usage
mocks use), so a story and its mock are checkable side by side rather than merely similar. The story
sections name the Figma layer they mirror.

Two bugs fell out of looking:

- **An ordinal x axis sorted alphabetically** in both `LineSeries` and `BarChart`, so "Jul 16" came
  before "Jul 2" and a chronological run rendered scrambled. Neither passed `sort`, and it was
  visible in a published story. Same bug as the Heatmap's, fixed the same way.
- **`level-info-base` was doing duty as a data accent.** It is a severity step, so a plain volume bar
  was claiming a risk rating — and at `#A3E3F7` it sits near 1.4:1 on white.

One residual: `DonutChart` with no per-slice palette falls back to `VIZ_SERIES_ORDER`, but the Figma
Donut only offers `Type=Sequential` and `Type=Status`. A categorical donut renders in code and has no
mock. Either add the variant or default the donut to the sequential ramp — not decided.

### Chat is built and was unreachable, 2026-08-17

The chat set reads as unpolished and the components are not the reason. There are 10 public
components, all with `@standard`, `@guideline` and `@constraint`, and Shell F `ChatWorkbench` already
implements the four-region layout. What was missing was every path to them:

- **The CLI never scanned `dbui-chat`.** `PATHS` had `ui`, `viz` and `icons`, so `dbui search message`
  returned `Alert` and two icons. This is the same hole that hid `Treemap`, and it was harder to see
  here because the whole category was absent rather than one component inside a category.
- **`component-index.md` had no `chat` section**, so nothing was categorized even once the CLI could
  read it. Added, with `Conversation` and `Response` marked `*code-only*` — a scroll container and a
  markdown renderer have nothing static to draw.
- **Not one chat component carried `@figma`.** Seven now do; the three that do not are the two
  code-only ones and the internal `Disclosure`.
- `variant-mappings.json` covered 4 of 10. Now 10 of 10.

Indexing a sibling package surfaced a second thing: **`components()` was about to publish
`Disclosure`**, which powers four components and is deliberately unexported. The CLI now treats
"public" as "re-exported from the package barrel", which is the honest definition and stops the
catalogue from listing something nobody can import.

`MessageActions` graduated from recipe to component. The Thread story had it as a local helper with
the comment *"This is a recipe, not a component"*, and that call was right on the arrangement and
wrong on the state: the thumbs are **one value, not two toggles**, and copy has a confirmed state.
Both are behaviour every call site would otherwise reimplement, which is the barrel's own test for
earning a place. Figma has drawn it as `.Actions` all along.

### Boards consolidated, and Details resolved, 2026-08-17

Every section on both component pages now holds either public components or nested parts, never both.
`.Inner Chat`, `.Inner Viz` and `.Inner Chrome` joined the existing `.Inner Content`, `.Inner Controls`
and `.Inner Overlays`, and the strays went where they belong: `.SliderField` into `.Inner Controls`,
and `Cursor` and `Track` renamed to `.Cursor` and `.Track` — both sat in inner sections without the
prefix that marks them, so every name-based tool read them as public.

**`Details` versus `Asset card` had a clear answer and it was not the obvious one.** `Asset card` was
the composed component — it instanced `Header`, `Asset details` and `Footer`, and its `.Row` had 21
instances across the file. `Details` was a *flattened copy*: raw frames, hardcoded text, no `.Row`
instances, zero usage. `Asset card`'s structure also maps one-to-one onto React — `DetailsHeader`
with icon, name, badge, path and actions, then rows, then a footer.

So the composed one survives as `Details`, its parts renamed to the React exports (`.DetailsHeader`,
`.DetailsRows`, `.DetailsRow`, `.DetailsFooter`), and the flat copy is deleted. Worth recording that
**React's `@figma` tag and its Code Connect both pointed at the flat copy** — the design side had two
candidates and the code picked the wrong one, silently, because nothing checks that a node is the
composed one rather than a snapshot of it.

`Recipes` now exists as a section, and the assembled Page Header lives there as
`Recipe/Page header with breadcrumb and tabs`. That closes B19: there is no longer a duplicate
`Page Header`, and the audit skips `Recipe/` because an arrangement has no single component to point
at — which is the definition rather than an exception.

Two Figma components still have no Code Connect, and both only became visible once the boards were
tidied: `AssistantPanel`, which is a real `dbui-shells` component, and `Preview Popup`, which is the
asset-shaped composition over `HoverCard`.

`MessageThumbnail` closed the last Figma-only piece — `.Thumbnail` was drawn, referenced by
`Message`'s `Content=Media` variant, and had nothing to render it. All 11 chat components now resolve
in both directions.

The `Conversation` demonstration frame is now `Recipe/Chat thread` in a `Recipes` section on the
Components page. Every element in it was already a live instance — no detached copies, no orphaned
mains — so the only thing wrong was where it lived: a demonstration of how components fit together
has no single component to place, which is what makes it a recipe rather than a component.

Two suspicions checked and dismissed, which is worth recording so they are not re-investigated:

- **`Details` is not flat.** It carries `surface/subtle`, a 1px `border/base` and an 8px radius, and
  its expanded row carries `surface/base` with the same border and radius. React's is
  `shape-container border border-border-base bg-surface-subtle`, and `--db-shape-container` resolves
  to 8px — so the two match exactly. `Card` is 16px because it sits on a page; `Details` is 8px
  because it sits inside a message, and reading quieter than a page card is the intent.
- **The chart does not overflow its panel.** An instance reported its `Line series` group 132px wider
  than the plot, but the source component's is 2px wider — the stroke. The instance figure is a stale
  group bound inside a resized instance, not geometry.

**The expanded Task's rail now matches React**, and this one was Figma catching up rather than both
moving. React draws the disclosed content as a 16px column holding a centred 2px `border-base` line,
then an 8px gap, then the rows — which puts the item icon at x=24 and its label at x=48, exactly under
the trigger's status icon and label. Figma had a 2px left border on the content frame and a 12px
padding instead, so the line sat flush at x=0 and the whole item column ran 12px left of the header it
belongs to. Nothing about that reads as wrong in isolation; it only shows up when you measure the two
columns against each other, which is why it survived several passes.

One trap worth recording: setting `layoutMode` on an existing Figma frame resets it to hug, so the
content shrank from 360 to 124 and wrapped every label. Sizing has to be re-asserted after the
layout mode changes, not before.

**Task rows are 20px on both sides.** They were 16 in Figma and 16 in React, which matched — but
16 is exactly the height of the 16px glyph inside them, so with rows 4px apart consecutive icons sat
4px from each other and read as touching. The fix is `min-h-5` on `TaskItem` and a fixed 20px row in
all six Figma variants, with contents centred so the label baseline does not move. Worth noting the
two sides *agreed* before this change: raising Figma alone would have introduced the drift the
`design:audit-figma` check exists to catch, which is why both moved together.

### The portal was the step being skipped, 2026-08-17

Everything else had a check. The portal did not, and it is the only running UI surface — so it is
simultaneously the only place a change can be *looked at* and the easiest place to forget. Nine
components shipped fully wired through the CLI, the index, Code Connect and Figma while being either
invisible or actively misdescribed on `/components`.

What was actually broken, none of which any existing check could see:

- **Twenty of 79 gallery rows had no demo tile**, so they rendered "No default state — fires from
  code. Open it in Storybook." That sentence is a claim about `Toast`, whose `toast()` is imperative;
  said of `Message` or `Task` it is simply false. All sixteen chat rows plus `Code Block`, `Terminal`,
  `Schema Browser` and `Dropzone` said it.
- **`AI Gradient Icon`'s tile existed and never rendered.** It was keyed `AiGradientIcon` while the
  row is named `AI Gradient Icon`, and the lookup is `demos[item.name]`. A tile keyed in any other
  shape fails silently — no type error, no lint error, no broken link.
- **The page had two Chat groups and two Chat tabs.** `ChatGallery.tsx` existed because
  `component-index.md` was once scoped to `packages/dbui`; when the CLI and index gained `dbui-chat`,
  the generated group arrived alongside the hand-written one. The hand-written file is deleted, the
  `after` splice with it, and `chat` is now named in the generator's `ORDER` so it keeps the position
  the splice was there to give it — after Content, not last.
- **`Aspect Ratio`, `Label` and `Date Range` had a row and no story**, so three names rendered as
  plain text with a "No story yet" badge. All three now have one.

`design:audit-portal` is the fix that outlasts this note. It checks four things offline — a row per
component, a story link per row, a tile per row, and no tile keyed to a row that does not exist — and
its exemption list has exactly one entry. `design:verify-story-ids` remains the fifth axis and needs a
running Storybook, so it stays separate.

**`DataTree` renders invalid HTML, and the portal is how that surfaced.** A tree row is a `<button>`,
and it renders the Focus and Overflow actions as `<button>`s *inside* it — unconditionally, whenever
the node is `selectable`. A button may not contain interactive content, so React reports a hydration
mismatch and the `/components` dev overlay carries it. Not introduced here: the row-as-button
structure predates this work, and the `Schema Browser` tile only made it visible on a page that gets
looked at. Left unfixed deliberately — the fix changes the DOM of the most-used content component in
the system, and belongs in its own change with the keyboard behaviour re-verified.

### The nine components from the AI Elements comparison, 2026-08-17

Built in React and wired through the discovery layer. Two decisions inside this worth not relitigating:

- **`Tool` did not become a component.** AI Elements has one, but our `Task` already declares "one per
  tool call", so a second component modelling the same call would mean two answers to "which do I
  reach for". The only thing it added was rendering the call's input and result, so those are
  `TaskInput` and `TaskOutput` — parts of `Task`.
- **`SchemaBrowser` is built on `Tree`.** A second tree would drift from the catalog tree a reader
  used ten seconds earlier, and `columnTypeIcons` already existed for exactly this. Columns are
  leaves, so they take no chevron and no focus action.

`CodeBlock` also replaced the hand-rolled `<pre>` inside `Response`, so a fenced block in an answer
and a standalone code surface are now the same component by construction — and fences gained a copy
control they never had.

Two constraints are deliberate losses, recorded so they are not read as gaps: **`CodeBlock` does no
syntax highlighting**, because every highlighter is a dependency the Databricks environment cannot
install and a block that colours in one product and not another is worse than one that never does;
and **`Terminal` strips ANSI codes** rather than rendering them, because eight fixed colours cannot
answer to a mode switch on a surface where contrast is the whole job.

The Figma side is now **done**. Eight components landed — `Confirmation` `5080:7831`, `Suggestions`
`5080:7848`, `Checkpoint` `5080:7857`, `Queue` `5080:7889` and `Artifact` `5080:7902` in
`Chat Components`; `Code Block` `5087:7835`, `Terminal` `5087:7848` and `Schema Browser` `5087:7890`
in `Content`. Every `@figma` tag is repointed off the `0-0` placeholder, every index row names its real
layer, and all eight have Code Connect and a `variant-mappings` entry. `Tool` never needed one, being
`TaskInput` / `TaskOutput`.

Three Figma Plugin API traps cost most of that pass, all with the same shape — a default that looks
like a layout bug:

- **`createFrame()` is 100×100 and stays there.** It does not hug unless told to, so every wrapper
  sat at exactly 100px tall no matter what it held. Set `layoutSizingVertical` on each frame you
  create, not just the component root.
- **`textAutoResize = 'HEIGHT'` fixes the width.** Reaching for it to make a component hug did the
  opposite: every label kept its old width and clipped, which is how `Add form validation` became
  `Add form va`. Labels want `WIDTH_AND_HEIGHT`; only text meant to wrap wants `HEIGHT`, and it needs
  `layoutSizingHorizontal = 'FILL'` alongside.
- **A frame stacked in a vertical parent does not fill it.** Left alone the rows keep the 100px
  default and clip, so set `FILL` on frames whose parent is `VERTICAL`.
- **Icon components live on the Icons page, not the Components page.** A `findOne` scoped to the
  current page silently returns nothing and the component publishes with no glyphs.

`design:audit-figma` now reports **no gaps** across all 90 components. Getting there turned up three
real problems the audit had been blind to rather than passing on:

- **The dump only covered the Components page.** Compositions moved to their own page, so `DataTree`,
  `FileTree`, `Navbar`, `ControlsBar`, `DateRange`, `Dropzone`, `PageHeader` and `PlatformHeader` all
  read as dead nodes and name mismatches — 14 of the 15 findings were this one omission. The dump now
  covers both pages and records which in a `pages` key.
- **`AssistantPanel` and `PreviewPopup` had a Figma master and a React implementation and nothing
  joining them.** Both are connected now, in `figma/Shells.figma.tsx`, and `figma.config.json` includes
  `dbui-shells` so the imports resolve.
- **The `Viz/Medium/Bar` split was left half-finished.** The set had been renamed to bare `Viz` — Figma
  auto-names a set from its variants' common prefix — while still carrying a `Type=Bar|Stacked Bar`
  axis. It is now two standalone components, `Viz/Medium/Bar` `5089:7826` and `Viz/Medium/Stacked Bar`
  `5089:7869`, with the one dependent instance repointed and the tag, audit and Code Connect ids
  updated. Repoint instances *before* deleting a set: `getMainComponentAsync` resolves to nothing once
  the variant is gone.

`dbui doctor` is clean too, which it was not before: `Platform Header` had no `@guideline`. Note there
are **two** PlatformHeaders — the slotted primitive in `dbui` that the CLI reads, and the filled-in
composition in `dbui-shells`. Both now carry guidelines, but a tag added to the shells one does not
clear the doctor warning.

One thing this did **not** do: publishing Code Connect needs a `FIGMA_ACCESS_TOKEN` that is not set
locally, so `figma connect parse` is the gate here and `publish` remains a manual step. The
"Import for X could not be resolved" warnings it prints are pre-existing and hit every file,
`Accordion` included.

Still open for the thread experience, in the order they matter:

| # | What | Why it matters |
| --- | --- | --- |
| M15 | A reader can now answer the agent — `Confirmation` takes a question, `Suggestions` offers next steps — but nothing returns a **selection** from a set of results. `Details` rows carry a `Selected` state with no multi-select or submit around it | Genie replying with twelve tables and asking "which ones" is the common case, and it is the one shape still missing |
| M16 | No `Notebook` widget for an inline notebook reply, and no compute-shaped `Details` | Two of the four reply types the product needs have no component |
| M17 | Logs have icons and story mocks only. `Terminal` and `SchemaBrowser` now exist, but `ChatWorkbench`'s preview tabs still fake their content with `Response` code fences | The components landed; the shell has not been rewired to use them |
| M18 | Shell F's rail is threads-only. `Navbar` already ships `NavbarSection` groups, but nothing combines nav items and threads in one rail | The described left nav cannot be built from the shell as it stands |
| B22 | `DataTree` nests `<button>` inside `<button>` — the row is a button and its Focus / Overflow actions are buttons within it. Invalid HTML, and React reports a hydration mismatch on any page holding a tree | It is the most-used content component, so the fix needs its own change with keyboard nav re-verified. Repro: `/components`, dev overlay |

### Library-wide Figma parity, 2026-08-17

`yarn design:audit-figma` checks the whole library, not just viz, and answers three questions that
fail independently: does a counterpart exist, can you navigate to it **in both directions**, and do
the variants agree. It reads `scripts/design-lint/.figma-component-dump.json` rather than Figma, so
it runs offline and in CI; `--how` says how to refresh the dump.

It found 53 things. Twenty-one were the audit misreading the index's own conventions — `*code-only*`
is a deliberate marker for the 11 components with no Figma counterpart, a parenthetical after a layer
name is a qualifier, and the "Removed" section's two-column table is not a category. Those are fixed
in the checker. Of the rest, closed straight away:

- **`DonutChart`'s `@figma` pointed at `4970-9243`, a node that does not exist.** The second dead
  JSDoc URL found this week, after `MetricCard`'s. Nothing had ever checked that an `@figma` tag
  resolves, which is exactly why both survived — a dead link looks identical to a live one in review.
- **Five Figma layer names in `component-index.md` did not match Figma**, so the React → Figma lookup
  failed on all five: `Radio Tile` vs `Radio tile`, `Tree` vs `Data Tree`, `PlatformNav` vs
  `Platform Nav`, `Progress` vs `Progress Bar`, `Alert Dialog` vs `AlertDialog`. Four are a space or
  a capital, which is the failure mode a human reviewer skims straight past.
- **`Field` had no `@figma` tag** despite the index naming `Form Input` for it.
- **`MetricCard`'s layer cell used a shorthand** — `Viz/Card/Bar · Line · Leaderboard` — that reads
  fine and resolves to nothing. Spelled out.

Open, in `TRACKER` terms:

| # | What | What it costs |
| --- | --- | --- |
| ~~B17~~ | ~~`HoverCard` exists in React with no Figma component~~ | **Closed.** Built as a `Hover Card` set in Overlays, cloned from `Popover` so every token binding came with it, with the four `Arrow` variants that map to React's `side`. Tagged and connected both ways. `Preview Popup` turned out to be the *asset-shaped composition* built on top of it, not the primitive — which is why the gap read as filled |
| ~~B18~~ | ~~15 Figma components no Code Connect claims~~ | **Mostly closed.** Added Code Connect for the 7 chat components, `Data Tree`, `File Tree`, `Date Range` and `Controls Bar`, and put `dbui-chat` in `figma.config.json` — the whole package was invisible from Figma because its path alias was never registered. Four remain and all four are B19 or below |
| B19 | Two Figma components share a name, and in both cases the second is a **composition example published as a component**: `Page Header` (Compositions, 1000×116, breadcrumb + title + tabs nested) alongside the real one (Header, 1200×48, one row); `Slider` (200×40, label + value + a nested `Slider`) alongside the primitive. React's own JSDoc says a page header is a *single row* with tabs as a **sibling, not nested**, so the Compositions one models a structure the code forbids | A by-name lookup cannot resolve either, and one of each pair documents the wrong contract |
| B21 | `Dropzone` exists in Figma with no React component and no index row — invisible to the React → Figma check because that only walks indexed components | A component designers can specify and nobody can build |
| ~~B20~~ | ~~Seven components with Figma variants have no `variant-mappings.json` entry~~ | **Closed.** Filled all seven plus `Hover Card`'s `Arrow`. Two entries that existed were also wrong: `segment-control` listed a `Slider` option Figma had renamed to `Default`, and `avatar` filed its `Type` options under a `Size` key. Both are the drift this check exists to catch |

Note the audit deliberately does **not** compare variant names for equality. Button's own JSDoc
records `Primary → default`, and demanding equality would flag every intentional rename while missing
the thing that actually breaks: an axis or option that exists in Figma and is written down nowhere.
`variant-mappings.json` is the artifact whose job is that translation, so coverage of it is the test.

### Viz stories are one group, 2026-08-16

All seven charts are stories under `Components/Viz/Charts`. Heatmap and Leaderboard had their own
titles, which filed them a level above the charts they belong with, and `Legend` had one despite
being `Viz/Inner/Legend` — only ever placed beside something. Legend now appears inside the Donut and
Treemap stories where the pairing is, and `component-index.md` marks it an inner part rather than a
peer of the six. It keeps its row so it stays searchable and `dbui doctor` stays at zero uncategorized.

Two things this fixed on the way:

- **The gallery could not link any chart that shared a story file.** It indexed stories only by the
  leaf of the title, so `Components/Viz/Charts` answered to "Charts" and nothing else — Bar Chart,
  Line Series, Donut Chart, Segmented Bar and Treemap were all reported as having no story while
  their story sat right there. It now also indexes each export, under both its identifier and its
  sidebar `name`. Linked went from 51 to 56 of 59; the three left are Aspect Ratio, Label and
  Date Range, which genuinely have no story.
- **The five original charts had no source or mapping panel.** Only Leaderboard and Legend did. Every
  chart story now ends with `ComponentMeta` and `ProductionMap`, which is also what stopped folding
  the other two in from being a downgrade.

An export whose name matches the component it imports collides, so `Leaderboard` and `Heatmap` are
`LeaderboardRows` and `HeatmapGrid` carrying a `name` — the convention `TreemapTiles` already used.
The story id follows the identifier, not the name, which is why the gallery indexes both.

**Headless Chrome cannot screenshot the Storybook dev server on this machine.** Every variant of
`--screenshot`, `--dump-dom`, `--virtual-time-budget` and `--headless=old|new` either hangs or writes
zero bytes against `localhost:6006`, though it renders a local `file://` fine. Both verify scripts
exist because of it. Do not spend another hour on the browser — render the thing directly instead.

## Phase 4 — Prove it agrees with itself

- [ ] `yarn design:audit` — should be boring if 2b landed
- [ ] Figma parity for the chat and chart sets
- [ ] **Patterns, second wave** — chat preview surface (in-thread vs sidebar vs soft tab), chart
      type by data shape, chart interaction defaults

## Phase 5 — Shells

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| M8 | The layout gaps on `/docs/layout` — most shells have no module, no chat shell, no canvas shell, no bottom-edge panel, the shell does not use the region components, panels do not persist, rails do not resize, navigation closes rather than collapses, and no linter reads structure | "Shell first" is a rule the shells cannot yet satisfy | decision — the shell set is curated |

- [ ] Landing, chat thread, list, details with viz, notebook editor, dashboard and its editor, canvas
- [ ] Asset detail templates
- [ ] Treat each shell as the test of the Phase 1 and Phase 4 decisions. A shell that has to break
      one means the decision was wrong, not that the shell is special.

## Phase 6 — Patterns closes the loop

- [ ] **Patterns, third wave** — page-level composition: what goes where, what a page owes the reader
- [ ] `dbui pattern <job>` — "let someone pick one of five things" returns the answer and why
- [ ] Final prose cut on the pages that churned through Phases 3–5

## Release gate

| # | What | What it costs | Fix |
| --- | --- | --- | --- |
| I19 | The public artifact is scoped to tokens, components and `dbui-viz`, with patterns and shells held back, and nothing in the repo draws that line. `platform-header.tsx` sits in `packages/dbui` rendering `DatabricksLogo` while `dbui-shells` carries its own. `composition.md` ships in `packages/dbui`'s `files` and documents only shells. `CLAUDE.md` makes `<Base>` rule 6. `install.md` and `install.sh` copy `dbui-shells` unconditionally and verify against `Base`. `data-tree.tsx` is the undecided case — the tree is generic, its `DATA_KIND_ICON` map is Unity Catalog | A public install that follows the published doc fails at its own verification step, and the rules it copies point at code it does not have | protocol — `dbui-shells` imports `dbui` and never the reverse, so the split costs no refactor. What moves is `platform-header.tsx`, `composition.md` out of the public package, and a shells branch through `CLAUDE.md` and both install surfaces |
| I21 | `packages/dbui/package.json` declares MIT and the repository has no root `LICENSE`. The vendored dependencies each carry their own | The artifact being scoped for public release states a license nothing grants | decision — yours, and it gates the release rather than the scoping work |

## Deferred — no phase yet

The icon switch, Lucide or bring-your-own outside Databricks · breakpoint tokens

## The React linter

The total `react-lint.js` prints is not a count of problems. Run it for the current number and read
the shape here.

- Almost all of it is in Storybook stories. Portal chrome is a distant second and shipped package
  code is the smallest slice by an order of magnitude
- Two causes are most of the total: type written as a px literal and color written as a hex
- Nearly half sit inside a `style={{}}` attribute — the table headers, row labels and grid gaps that
  frame a specimen, not the component being specified
- `text-[13px]` and `text-[12px]` are most of the type half. Both are values the ramp already
  carries, so the swap to `type-label` and `type-body` is mechanical

What lands in shipped code reduces to three rows above: I6, I7 and I12. The rest is story chrome,
and `gallery-demos.tsx` is the one story file that also renders to users, on `/components`.

## Measurements the open calls rest on

Recorded because nothing else holds them and the calls cannot be made without them.

- **Elevation is bridged, and the measurement that said it could not be is superseded.** The old
  note compared `elevation-1` and `elevation-3` against `shadow-lg` and `shadow-xs` — the numbered
  scale that ran the other way, with 1 as the highest. That scale is gone: the stops are `xs`
  through `xl` ascending, and `tokens.css` points every `--shadow-*` at its `--db-elevation-*`
  counterpart, so `shadow-xs` *is* `elevation-xs` at every call site that already used it. The
  bridge happened; what the old bullet measured no longer exists to measure.
- **Motion is bridged as of 2026-08-11, and two stops are still idle.**
  `--default-transition-duration` now points at `--db-duration-fast`, so all 30 bare `transition-*`
  call sites read the token — a value-for-value no-op, since Tailwind's own default was the same
  150ms, but the family now owns it and moving `fast` moves all of them. Easing is bridged too:
  `ease-linear`, `ease-standard` and `ease-exit` mint classes, and Tailwind's `ease-in`, `ease-out`
  and `ease-in-out` are closed so a curve nobody chose emits no timing function. `duration-default`
  and `duration-slow` remain unread, and cannot be minted as classes at all — `--duration-*` is not
  a namespace, so a call site that wants one writes `duration-[var(--db-duration-slow)]`. M1 to M4 in
  `verify-spacing-scale.mjs` pin all of it against the shipped CSS.
- **Space and size deliberately do not carry the same stops.** 5, 7 and 12 are size stops and not
  space stops, so `h-5` is `--db-size-5` while `p-5` is the multiplier. The snap pass touches `p-5`
  and `p-12` and must leave `h-5` and `h-12` alone. K5b and K13b pin it.
- **A missing stop in `size` does not fail.** A height utility reads `--height-*` first and
  `--spacing-*` second, so `h-6` renders from `--db-space-6` whether or not size owns a 6. `size-6`
  was dropped once and nothing moved. K12 pins the precedence.
- **The consumption scan measures the multiplier gap.** Run
  `node scripts/generate-token-consumption.mjs` rather than quoting a ratio from here.

The surface ramp measurement that was here has moved to `packages/dbui/docs/tokens.md` under
**Surface**, next to the elevation facts it interacts with, where someone choosing a fill meets it
before writing the bug rather than after.

## Done since the last entry

- **`/docs/constraints` and `/docs/principles` were split by what each settles.** The constraints
  page was the negative of the principles page — seven of its seventeen entries restated a don't
  already published there — so it had not earned its place. Principles is now six craft principles;
  Constraints is five responsibility ones: Agency, Accountability, Custody, Honesty, Stewardship.
  Trust and Feedback moved off Principles and became C1 and C2, since they were ethics wearing
  craft clothes and the source of four of the seven duplicates. Consistency and Fluency backfilled
  the two craft dimensions that were missing, measured against ten published systems — consistency
  is the one dimension every source names, and Nielsen's seventh binds novice and expert into one
  interface. Ids changed from `S*`/`I*`/`B*` to `C1`–`C5`; the two rows here that cited S2 and S3
  now cite `token-rules.md`. `notes/constraints-page-cuts.md` holds all seventeen retired rows with
  the owner each moved to.
- **`/docs/accessibility` states a contract instead of a promise.** Added Color, Keyboard and
  Patterns sections: what a DBUI primitive carries, what the composed screen still owes, and which
  component to use for each hard pattern. The reliance table is unchanged apart from trimming.
  Contrast and color-vision-deficiency evidence is a stub until the suite is run — no numbers were
  invented.
- **`Tabs` has two first-class variants.** `pill` stopped being `@internal`; the deprecation
  conflated a treatment with a role, since `Tabs` is a tablist over panels and `SegmentControl` is a
  toggle group with no panel. `default` indexes a page, `pill` switches one. `TabsTrigger` went to
  `type-label`, and `tabsTriggerVariants` is now exported so the docs section nav wears the look
  without the role.
- **The interaction alpha ladder is monotonic, and B13 and B15 both close on it.** The two were one
  defect: `action-selected-*` had no values of its own. `selected-base` and `default-hover` were
  both 0.06 light and 0.08 dark, `selected-hover` and `default-press` both 0.10 and 0.12 — measured
  identical, so pointing at an unselected control painted it the exact fill of a selected one. Fixed
  by lifting only the selected family: `selected-base` 0.06→0.08 light and 0.08→0.10 dark,
  `selected-hover` 0.10→0.12 and 0.12→0.14. `action-default-*` did not move, because `default-hover`
  is the wash almost every control reads. `selected-press` did not move either, for the reason in
  B16. Light runs 100.00 / 94.69 / 92.91 / 91.12 / 89.32 / 87.51 and dark 7.37 / 16.50 / 18.69 /
  20.84 / 22.96 / 25.05, strictly ordered. Every consumer swept in both themes.
- **`scroll-container-gutter` reads all four edges.** It accepted `px` alone while its message said
  the container "clips on both axes", which is how `PlatformNav` read as safe with 3px of every
  focus ring cut off the bottom. Also fixed the tokenizer, which read `overflow-y-auto` out of a
  JSDoc comment inside a `cn()` call. Cost three new warnings, all logged as B14.
- **`NavbarItem` has a focus ring and a disabled state.** It was falling back to Chrome's
  `outline: 1px auto`. Verified with real Tab events: 21/21 items reached, the UA outline gone, in
  both themes. The ring measures 3.351:1 against the rail under light and 3.777:1 under dark.
- **The current item in the nav rail has a boundary.** `surface-accent` measures 1.154:1 under light
  and 1.113:1 under dark against the rail. `border-border-accent` measures 4.867:1 and 4.951:1 and
  holds through hover. All 21 outer boxes byte-identical before and after in both themes.
- **`NavbarNewButton` and `SegmentControlItem` no longer invert in dark.** Same defect and the same
  pair of tokens: a `surface-base` fill on a `surface-subtle` track, which is the whitest step under
  light and the darkest under dark. Light `#FFFFFF` on `#FAFAFA`, dL +0.04403; dark `#11171C` on
  `#1F272D`, dL −0.01116 — a well rather than a card. `dark:bg-surface-strong` puts dark at
  +0.01375 and leaves light byte-identical. Of the 48 class strings using `bg-surface-base`, 27
  carried a border, 12 a ring and 5 an existing swap; those two were the only shipped consumers
  relying on luminance alone.
- **`cn()` resolves Tailwind conflicts.** `twMerge(clsx(...))` against a config that teaches
  tailwind-merge the `type-*` ramp, the numbered radius stops, `shadow-focus` and `max-h-none`. A
  `className` passed to a DBUI component now overrides the component's own utilities. Verified by
  screenshotting every story light and dark before and after and byte-comparing.
- The CLI reads a JSDoc tag to its end. `@constraints` blocks, wrapped tags and the summaries they
  were corrupting all print now, including Button's `aria-label` rule.
- `icon-index.md`, `component-rules.md` and `DESIGN.md` no longer count the icons or the components.
- `audit-legacy-tokens.mjs` no longer reports live semantics as leftovers and exits clean.
- `resizable.tsx` no longer carries `ring-offset-background`.
