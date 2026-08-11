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
| Tokens | Color, type and all four Dimensions families live and bridged — elevation and motion unconsumed |
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
| M11 | **Mostly closed 2026-08-11, and the description was wrong twice.** Elevation is not pure black with no dark value — every stop carries both modes and the dark alphas are an order up (`xs` is 0.05 light and 0.45 dark), which is exactly what makes it draw against `surface-base` in dark. It is not unconsumed either: `--shadow-xs` … `--shadow-xl` bridge to `--db-elevation-*`, so every `shadow-*` call site in the system has been reading elevation all along, and `Card`'s new `interactive`/`spotlight` stops read `xs` and `sm` deliberately. Motion has its first explicit consumer too — `effects.css` transitions the spotlight halo over `--db-duration-fast` on `--db-ease-standard`. What remains is narrower: `default` and `slow` still have no consumer, and no call site names a duration outside that one file | Two of the three claims were false, so the row was arguing for work already done | decision — whether the bare `transition-*` call sites should name a duration, or keep riding Tailwind's 150ms default, which equals `fast` |
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
| B12 | The `Components/Chat/Thread` `Pieces` story wedges the renderer in headless Chrome. `Runtime.evaluate` and `Page.captureScreenshot` both time out | The one story no automated visual check can cover — and the surface Phase 3 is about to grow | file — bisect the story; `Response`'s hand-written markdown parser renders the widest input there |

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
| M13 | The viz semantics carry ten categorical and ten sequential steps and nothing else. A chart meaning healthy borrows `status-text-*`, one meaning no data borrows `text-disabled` | The chart layer contradicts `token-rules.md` R10 in one direction | decision — a `viz` state and inert set |
| B7 | `SegmentedBar` clamps the Vega view height to `barHeight` | `showLegend` is a prop that draws nothing | decision — the height prop is the contract and widening it moves every call site |

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
- **Motion has one consumer and two idle stops.** `effects.css` runs the spotlight halo on
  `--db-duration-fast` and `--db-ease-standard`. `default` and `slow` are still unread. Pointing
  `--default-transition-duration` at `fast` remains a true no-op, because the bare `transition-*`
  call sites already run at Tailwind's default, which is the same 150ms — including `Card`'s
  elevation lift, which is why that lift needed no duration of its own.
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
