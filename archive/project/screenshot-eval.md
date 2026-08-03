# Screenshot Eval

A stress-test of how close DBUI gets to pixel-perfect recreation of real Databricks product screens, used to identify gaps in the design system, tune the resolver/lint tools, and prioritize new compositions.

> **Status:** in progress (started Apr 26, 2026). Figma page: `Screenshot Eval` (id `3747:3`) in file `OftbSQf85jOPln9RhSEhVv`.

## Source screenshots

10 product screens were provided, all approximately the same frame size, captured from the E2 Dogfood workspace:

| # | Screen | Archetype |
|---|---|---|
| 1 | Homepage | Hero landing |
| 2 | Recents | List page |
| 3 | Workspace | Tree browser (file) |
| 4 | Catalog | Tree browser (data) |
| 5 | Jobs & Pipelines | List page |
| 6 | Compute | List page |
| 7 | Discover | Hero landing |
| 8 | Marketplace | Hero landing |
| 9 | SQL Editor | Tree browser (query) |
| 10 | Dashboards | List page |

Source images live in `assets/` and are referenced by the build scripts.

## Pattern analysis (pre-build)

### Universal shell — present on all 10 screens

- **Top header (48px)**: workspace switcher (left), search input (center, ~400px min), env badges + workspace switcher chevron + app switcher + profile avatar (right).
- **Left rail (180px)**: pinned `+ New` button at top, then nav sections — top group (Workspace, Recents, Catalog, Jobs & Pipelines, Compute, Discover, Marketplace), `SQL`, `Data Engineering`, `AI/ML`. Status pill at the bottom (red dot during transitions, Databricks logo when idle).
- This maps cleanly to `<Base>` + `<PlatformNav>` + `<PlatformHeader>` in code, and to `Base Shell` (`3567:1638`) + `Platform Header` (`3225:4233`) + `Platform Nav` (`3179:14163`) in Figma.

### Three archetypes

| Archetype | Screens | Key elements |
|---|---|---|
| **Hero landing** | Homepage, Discover, Marketplace | Brand/title block, search bar in body, optional promo strip, sectioned card grids |
| **List page** | Recents, Jobs & Pipelines, Compute, Dashboards | Page header (title + actions) → optional sub-tabs → optional inline-create cards → filter pill row → body (table or cards) |
| **Tree browser** | Workspace, Catalog, SQL Editor | Left tree pane (file / data / query) with header (status, search, actions) → right pane (breadcrumb + page header + filter row + table) |

### Recurring sub-patterns

| Sub-pattern | Screens | Existing DBUI fit | Gap? |
|---|---|---|---|
| Filter pill row (search + chip dropdowns + toggle pills) | Recents, Jobs, Compute, Discover, Dashboards, Marketplace | Composed of `Input`, `Select`, `Toggle` | Composition gap (no `FilterPillBar`) |
| Tab pills (Suggested / Favorites / Popular) | Homepage, Catalog, Discover, Recents | `Toggle` (pill variant) | Composition gap |
| Sub-tabs (in-page, full text) | Compute, Jobs | `Tabs` | OK |
| List row (icon + title/subtitle + meta cols + type) | Homepage, Recents, Catalog | None — closest is `Table` row but visually different | **Component gap** |
| Data table with status icon + actions cell | Workspace, Compute, Jobs, Dashboards | `Table` | Action cell pattern needed |
| Asset card (preview thumb + title + description) | Discover, Dashboards | `Card` (structural-only) | **Composition gap** |
| Domain card (icon + title + multi-line description) | Discover | None | **Component gap** |
| Provider/logo card (logo + name) | Marketplace | None | **Component gap** |
| Inline-create card (icon + title + description, clickable) | Jobs | None | **Component gap** |
| Promo banner / hero strip | Homepage, Marketplace | `Alert` is closest but wrong | **Component gap** |

### Composition wishlist — ranked

1. **`ListPage` shell** — used on 4–5 screens. Slot for header, optional sub-tabs, optional inline-create row, filter pills, body. Highest leverage.
2. **`HeroLanding` shell** — Homepage, Discover, Marketplace.
3. **`BrowserShell`** — generalize `CatalogExplorer` to handle file/data/query trees with a configurable header.
4. **`ListRow`** + **`AssetCard`** + **`DomainCard`** + **`ProviderCard`** + **`InlineCreateCard`** — five row/card primitives that show up everywhere.
5. **`FilterPillBar`** — opinionated horizontal row of search + dropdowns + toggles.
6. **`TabPills`** — explicit pill-styled segment toggle (currently composed ad-hoc with `Toggle`).
7. **`PromoBanner`** — page-level promotional strip with icon + title + description + CTA.

## Per-screen log

Each screen below records: source vs. recreation (light + dark), DBUI components used, faked elements, missing icons/tokens, fidelity score, and lessons.

### 1 — Homepage

- **Figma:** Light frame `3753:4`, Dark frame `3753:438`. Section label `3753:3`.
- **Components used:** `Platform Header` (instance), `Platform Nav` (instance).
- **Components faked (gap candidates):**
  - **Hero block** (title + mascot + subtitle) — built from raw Text + Ellipse. Should be a `WorkspaceHero` composition.
  - **Body search bar** — built from raw Frame + circle + text. The header `Input` component was wrong shape (not pill, no shortcut slot). **Gap: a `Searchbar` with pill shape, search icon slot, and shortcut chip slot.**
  - **Promo banner** — Frame + Rectangle (logo placeholder) + Text + button frame. **Gap: `PromoBanner` composition** (icon + title + description + CTA).
  - **Tab pills row** — built from raw Frame children with manual styling. Each pill = Frame + Ellipse (icon placeholder) + Text. **Gap: `TabPills` composition** (or just the Toggle component should produce this with less ceremony).
  - **List rows** — Frame + Rectangle (icon placeholder) + nested Frame + Text. **Gap: `ListRow` composition** (icon + title + subtitle + meta cols + type label).
- **Icons faked:** search glyph (used circle), tab pill icons (sparkle, star, popular, mosaic, calendar — all dots), list item icons (dashboard, schema, query, volume, catalog, table — all rectangles), external-link in Register button (rectangle), workspace mascot (ellipse).
- **Tokens used:** `surface/background`, `surface/muted`, `surface/card`, `text/foreground`, `text/muted-foreground`, `border/border`, `action/primary` — all bound. Dark mode flipped automatically for my content.
- **Tokens missing / approximated:** the orange "Databricks" logo in the banner is hardcoded `#FF6B35` — no brand token for it.
- **Lint findings:** not run yet.
- **Fidelity:** 3/5 — structural match is good, but icon placeholders + faked compositions break the "professional product" feel. With the proper compositions below, fidelity would jump to 4–4.5.
- **Lessons:**
  1. **Major design system finding: Platform Nav and Platform Header have dark-mode contrast bugs.** The nav items in dark are nearly unreadable. The `text/sidebar-foreground` and `surface/sidebar` variables have empty `scopes: []` — they were likely defined but never wired into the component. The "Microsoft Azure" workspace badge in the header also doesn't flip. This is a higher-priority bug than any composition gap.
  2. **Platform Nav content is drifted from the real product.** Currently has: Recents, Workspace, Catalog, Workflows, Compute, Marketplace + SQL/DE/ML sections. Real product has: Workspace, Recents, Catalog, **Jobs & Pipelines**, Compute, **Discover**, Marketplace + SQL/DE/AI/ML sections including **Agents**, **AI Gateway**, **Serving**. Needs a one-pass update.
  3. **Workspace mascot is not in the system.** Every Databricks workspace has a customizable mascot/icon. Currently no slot for it.
  4. **Auto-layout `layoutGrow` requires parent's primary axis to be `FIXED`.** Cost me one round-trip. Worth documenting in the figma-use skill.
  5. **`use_figma` clone preserves variable bindings.** Cloning Light → Dark worked perfectly for my custom content. But it doesn't help for components that were built without proper variable bindings (the Platform Nav/Header issue).
- **Time spent:** ~6 use_figma calls + 2 screenshot fetches.

### 2 — Recents

- **Figma:** Light frame `3760:543`, Dark frame `3760:762`.
- **Components used:** `Platform Header`, `Platform Nav`. Active item still defaults to Catalog (gap: nav doesn't have `Recents` as the active state in our defaults, also there's no easy way to override an INSTANCE's active item from the outside).
- **Components faked:**
  - **Page header** (just the title) — built from a Frame + Text. Trivial, but a `PageHeader` component exists at `3247:5956` (1000×116) — I should have used it. Friction point: `compose-figma-frame` doesn't currently know to suggest using `Page Header` for "page header with title only" cases.
  - **Filter row** — Frame + Frame (search box) + 2 dropdown frames. **Gap: `FilterPillBar` composition** (slot for search + N filter chips/dropdowns + N toggle pills).
  - **Search input** — Same as before, missing real search icon. Built from Frame + Ellipse + Text. **Gap: `Searchbar` primitive** (Input is too generic; product-grade search needs icon + placeholder + optional shortcut + clear button as a single component).
  - **List rows** — Same as Homepage. Same `ListRow` gap.
- **Tokens used:** Same set as Homepage. All variable-bound. Light/Dark flipped automatically.
- **Fidelity:** 4/5 — visual structure matches the source closely. Gaps are content-level (real icons, dropdown chevron should be Lucide-style not the polygon I drew, active nav item should be Recents).
- **Lessons:**
  1. **The auto-layout sizing-mode-vs-resize order bug bit me again.** Calling `frame.resize(w, 0)` BEFORE adding children locks both axes to FIXED. Children added later don't expand the frame. Correct order: create → add children (auto-grows) → set primary FIXED → resize ONLY primary axis. Counter stays AUTO. **This needs a one-line fix in the figma-use skill `gotchas.md`** with a clear WRONG/CORRECT example.
  2. **List row pattern is highly repeatable.** Once I had the working pattern, building Recents was much faster than Homepage. A `ListRow` composition with slots for icon / title / subtitle / meta / type would collapse 30 lines of code per row to one line.
  3. **The list pattern I built is identical to the Homepage list rows minus one column.** This confirms the `ListPage` composition prior — the body slot for both screens is the same `ListRow` repeating component.
  4. **Cloning Light → Dark works reliably.** Same approach as screen 1, no new issues.
  5. **Active state inheritance is a real problem.** I can't tell the Platform Nav instance "make the Recents item active" without component-level variant property control, which the existing component doesn't expose. Friction point for any screen recreation.
- **Time spent:** ~3 use_figma calls + 2 screenshot fetches (faster than screen 1 thanks to learned pattern).

### 3 — Workspace (tree browser)

- **Figma:** Light frame `3764:867`, Dark frame `3764:1086`.
- **Components used:** `Platform Header`, `Platform Nav`. Everything else built raw.
- **Components faked:**
  - **Tree pane** — Frame + Frame (header) + repeated row Frames with chevron (Polygon) + icon (Rectangle) + text. **Gap: `Tree` component exists at `3179:24295` but I didn't reach for it because (a) I wasn't sure if it'd let me override every label, (b) the tree pane has its own header row that's not part of `Tree`. Higher-level: `BrowserShell` composition needed.**
  - **Breadcrumb** — Built from raw Frame + Text + slash separators. **`Breadcrumb` component exists at `3140:1914` but its variants weren't obvious.** Friction: `compose-figma-frame` should suggest `Breadcrumb` for any "X / Y / Z" pattern.
  - **Page header row** — Title + star icon + action buttons. **The `Page Header` component at `3247:5956` is 1000×116 and has its own structure but again, I didn't know which slots map to my needs.** Friction: I'd want a `dbui_explain_component` that returns "here's what slots/props this component has" so I can pick instead of build raw.
  - **Action buttons** (Send feedback / ... / Share / Create) — Built raw. Should use `Button` component instances with primary variant for Create. Same friction: instance variant control is hard to figure out programmatically.
  - **Filter row** — Same as before. `FilterPillBar` gap.
  - **Data table** — Built from raw Frame rows + Text cells. **The `Cell type=*` and `.TableCell` / `.TableColumn` components exist** but again, I didn't reach for them. The friction is real: when faced with a deadline, I built raw frames because the existing components aren't obviously composable.
- **Tokens used:** All standard. The "Drafts" / row name being styled blue (primary) matches the source — bound `text/accent-foreground` would have been more correct than `action/primary` but visually similar.
- **Fidelity:** 4/5 for layout, 2.5/5 for "did I use the system" — too much built raw.
- **Lessons:**
  1. **The biggest finding so far: I'm reaching for raw frames over existing components.** The `Page Header`, `Breadcrumb`, `Tree`, `Cell type=*`, `Button`, `Select` components all exist but the activation cost (figuring out variants, slots, overrides) is higher than just building it raw. **This is the #1 thing to fix in the workflow.** Either through a `dbui_explain_component` MCP tool, or by adding richer slots and a "default usage" example to each component's Figma description.
  2. **Tree component (`.TreeNode`) is an inner component — I'd need to find a 'public' Tree wrapper to actually use it.** The Catalog Explorer shell uses `DataTreeView` which is React-only. There's no Figma-public composition for "rendered tree."
  3. **Breadcrumb separator: I used `/` text. The DBUI breadcrumb uses ChevronRight icons.** Off-token but visually similar.
  4. **Composing the action button row (icon-only "..." + Send feedback + Share + Create) was annoying.** A `PageHeaderActions` slot pattern would help.
- **Time spent:** ~1 use_figma call (built everything in one shot now that the pattern is established) + 1 screenshot.

### 4 — Catalog (tree browser with cluster status)

- **Figma:** Light frame `3765:1191`, Dark frame `3765:1410`.
- **New patterns surfaced:**
  - **Cluster status header** (green dot + warehouse name + "Serverless" badge + size badge) — a compound primitive that appears in `CatalogExplorer` shell. Should be hoisted into a `WarehouseStatusBadge` or the `BrowserShell` header.
  - **Tree pane with action icons** (gear / refresh / + plus) in a row — repeated pattern in tree headers across Workspace, Catalog, SQL Editor.
  - **Page header with chevron-everywhere split buttons** (Govern ▾ / Connect ▾ / Share ▾ / Create ▾) — needs `SplitButton` group/cluster.
- **Fidelity:** 4/5. Tree contents and action buttons all match.

### 5 — Jobs & Pipelines (list page with sub-tabs + create cards)

- **Figma:** Light frame `3766:1515`, Dark frame `3766:1734`.
- **Lessons:**
  - **Forgot to set Content frame to auto-layout.** All children stacked at y=0. Cost one round-trip to fix. **Action:** my `makeShell` helper should default Content to VERTICAL auto-layout. Updating going forward.
  - **Sub-tabs (text + underline)** — distinct from the Tab pills used elsewhere. The DBUI `Tabs` component handles this but I built it raw because the variant wasn't obvious.
  - **Inline-create card row** (Ingestion / ETL / Job, three side-by-side cards with icon + title + description) — clear `InlineCreateCard` composition gap, used 1x here but could appear elsewhere.
  - **Status mini-circles** (5 circles per row, green/red/empty) for Recent runs column — a `StatusDotsRun` micro-component would be useful.
- **Fidelity:** 4/5.

### 6 — Compute (list page with many sub-tabs + complex table)

- **Figma:** Light frame `3773:1839`, Dark frame `3773:2058`.
- **New patterns:**
  - **Pinned/unpinned column** — first column in compute table. Conceptually similar to a "favorite" toggle but with stateful icon. `PinnedRowIndicator` micro-component candidate.
  - **State circle column** — green for running, gray for stopped, with various sub-states. Similar to `Status` component which exists at `3174:4132` but I didn't reach for it.
  - **Warning/error inline indicators** — orange triangles next to "10.6 ML" runtime versions when deprecated. The `Warning` icon exists, but the inline-warning-with-text pattern doesn't.
  - **Split button** (Create with Personal Compute) — left segment is text button, right segment is chevron-only dropdown. `SplitButton` exists in DBUI but I used raw frames.
- **Fidelity:** 4/5.

### 7 — Discover (hero landing with domain cards)

- **Figma:** Light frame `3774:2163`, Dark frame `3774:2382`.
- **New patterns:**
  - **Hero search bar** (rounded pill, large, no shortcut) — different from header search. Strong case for `HeroSearch` variant of `Searchbar`.
  - **Domain card** (icon-with-color + title + multi-line description + optional metadata) — never appeared elsewhere. Distinct enough to be its own component. `DomainCard` composition gap.
  - **Asset card with thumbnail** (header row with icon + title + type, then thumbnail image area, then optional sparkline overlay) — appears here and on Dashboards. **Strong `AssetCard` composition gap.**
  - **Sparkline visualization** — currently faked with a line + dots. **Major component gap: `Sparkline` / `MiniChart`.** Same issue on Dashboards.
- **Fidelity:** 4/5.

### 8 — Marketplace (branded hero with provider cards)

- **Figma:** Light frame `3775:2487`, Dark frame `3775:2706`.
- **Issues / lessons:**
  - **Hero text got cropped** because heroLeft + heroRight + auto-layout sizing wasn't tight enough. The mocked-up text width vs container width didn't match. **Lesson: For complex hero areas, use explicit FIXED widths per column instead of layoutGrow.** This is a Figma-specific gotcha worth documenting.
  - **Provider card** (logo box + provider name) — used in 2 different sizes here. `ProviderCard` composition gap. The sizes are: small-tile (in hero, ~160×40) and large-tile (in featured, ~265×140).
  - **Pick card** (provider attribution + Free/badge + title + description + tag icon) — distinct from asset cards on Discover/Dashboards. `MarketplacePickCard` candidate, but maybe just a variant of `AssetCard`.
- **Fidelity:** 3.5/5 (cropped hero hurt it).

### 9 — SQL Editor (tree + editor tabs + output panel)

- **Figma:** Light frame `3776:2811`, Dark frame `3776:3030`.
- **New patterns:**
  - **Editor tabs** with close (×) icon and `+` add tab — `Editor Tabs` component at `3179:5135` exists. I built raw tabs but the actual component is right there.
  - **Editor toolbar** (Run primary + warehouse selector + name input + right action cluster) — repeated pattern, candidate for `EditorToolbar` composition.
  - **Line number gutter** (left margin with line numbers, separator) — exists in `EditorTabs` adjacent area but not as its own component. Trivial composition.
  - **Empty state** — used here for output panel. **The `Empty` component at `3130:1793` exists** but I built raw. Same pattern as everywhere: components exist but aren't easy to find/use.
- **Fidelity:** 4/5.

### 10 — Dashboards (list page with hybrid card grid + table)

- **Figma:** Light frame `3777:3135`, Dark frame `3777:3354`.
- **New patterns:**
  - **List + Grid view toggle** in section header — paginated dropdown, common UX. `ViewModeToggle` component candidate.
  - **Suggested vs All** dual-section pattern — Suggested is card grid (4 wide), All is table. Same data, different views. `DualViewSection` composition?
  - **Hybrid filters** (Domain dropdown + favorited toggle pill + certified toggle pill) — same `FilterPillBar` gap.
- **Fidelity:** 4/5.

## Aggregate gap report

### Component gaps — ranked by frequency × pain

| Component | Used on screens | Pain level | Sketch |
|---|---|---|---|
| **`ListRow`** | 1, 2, 4 (10+ rows each) | High | Frame [Icon, [Name + Sub], MetaCol1, MetaCol2, Type] with slots, optional avatar variant |
| **`AssetCard`** | 7, 8, 10 | High | Frame [Header(icon, title, subtitle, badge?), Thumbnail, optional Sparkline overlay] |
| **`FilterPillBar`** | 2, 5, 6, 7, 8, 10 | High | Frame [Search, ...FilterChips, ...TogglePills, ...Spacer, RightActions] |
| **`Sparkline` / `MiniChart`** | 7, 10 | High | New primitive — line, area, bar variants. Foundational for any analytics-adjacent view |
| **`DataTableRow`** | 3, 5, 6, 10 | High | Generic `<tr>` with N typed cells (Text, Status, User, Time, Tags, Actions) — `Cell type=*` exists but lacks composition |
| **`PromoBanner`** | 1, 8 | Medium | Frame [Icon, [Title + Description], CTA] |
| **`Searchbar`** (vs raw Input) | All 10 | Medium | Variants: header (552px shortcut), body (rounded pill no shortcut), filter (small) |
| **`InlineCreateCard`** | 5, 1 (banner-ish) | Medium | Frame [Icon, Title, Description] clickable card |
| **`SplitButton` cluster** | 6, 10 | Medium | `SplitButton` component exists but the Figma variants weren't accessible via my workflow |
| **`DomainCard`** | 7 | Medium | Frame [Icon-with-color-bg, Title, Multi-line description, Metadata] |
| **`ProviderCard`** | 8 | Medium | Frame [Logo box, Name] — small + large variants |
| **`StatusDotsRun`** (mini status circles) | 5 | Low-Medium | Row of N circles with state (success/fail/pending/empty) |
| **`PinnedIndicator`** | 6 | Low | Filled vs empty pin icon column cell |
| **`EmptyState`** (the existing `Empty` is fine, just docs) | 9 | Low (docs) | `Empty` component exists; needs better discoverability |
| **`SubTabs` (text + underline)** | 5, 6 | Low | Probably already in `Tabs` — just needs variant clarity |
| **`Breadcrumb`** | 3 | Low (docs) | Component exists at `3140:1914` but variants weren't clear |
| **`BrowserShell` (tree + detail)** | 3, 4, 9 | Medium-High | Top-level shell that takes a tree pane + content pane, with header customization slots |
| **`HeroLanding` shell** | 1, 7, 8 | Medium | Top-level shell for hero + sectioned card grids (Discover/Marketplace/Homepage) |
| **`ListPage` shell** | 2, 5, 6, 10 | Medium | Top-level shell with PageHeader + SubTabs + InlineCreate + Filter + Body slots |

### Icon gaps

Icons I had to fake with placeholder rectangles or ellipses:

- **Search glyph** (used in every screen 10+ times) — `Search` icon exists but I never reached for it
- **Chevron icons** (down/right/left) — `ChevronDown` etc. exist; I used `Polygon` triangles
- **External link arrow** (in Register button on Homepage) — a `LinkExternal` or arrow-out-of-box exists
- **Star / favorite** (on workspace breadcrumb) — `Star` icon exists
- **Workspace mascot** — no slot in system; per-workspace customizable image asset; needs slot pattern
- **Domain card icons** (Sales, Customer Usage, System Tables, Marketing, etc.) — currently colored squares; could use existing icons (Storefront, Users, Database, Megaphone, etc.) but wasn't worth the lookup time per icon
- **Provider logos** in Marketplace (AccuWeather, D&B, Glean, S&P Global, etc.) — these are 3rd-party brand assets, not DBUI icons, but a `ProviderLogo` slot pattern would help

**Tooling friction:** `dbui_resolve_icon` returns matches but the loop "search → import → instance" is many calls. A batch tool: `dbui_import_icons(['Search', 'ChevronDown', 'Star', ...])` that returns `{ Search: nodeId, ... }` would compress this dramatically.

### Token gaps

Mostly OK. The semantic tokens I needed (`bg`, `muted`, `card`, `fg`, `mfg`, `border`, `primary`, `success`, `warning`, `destructive`) all existed and worked. Notable misses:

- **Brand colors** (Databricks orange `#FF6B35` for the promo logo) — no token. I hardcoded.
- **Domain card backgrounds** — pastel tints (green, yellow, purple, blue, lavender). These look like brand-specific accent variants but aren't in the system.
- **Action button hover/press for primary** — bound but I only used the base `primary`, not `primary-hover` or `primary-press`. They're there if needed.

### Tooling friction — what to fix in dbui-mcp

1. **`dbui_explain_component(name)`** — returns the component's variants, slots, props, and a one-line "default usage" example. Today I have to inspect components manually before using them, which is why I built so much raw.
2. **`dbui_import_icons([...])` batch** — single call to import N icons by name. Compresses what's currently a search-import-place loop per icon.
3. **`dbui_render_workspace_shell(spec)`** — high-level helper that takes `{ activeNavItem, workspaceName, theme }` and returns a positioned shell ready for content. Compresses the 30-line skeleton that I copy-pasted across all 10 screens.
4. **`dbui_compose_figma_frame` improvements:**
   - Suggest `Page Header` for "page header with title" inputs.
   - Suggest `Breadcrumb` for "X / Y / Z" patterns.
   - Suggest `Empty` for empty-state inputs.
   - Suggest `Editor Tabs` for tabbed editor inputs.
   - Suggest existing `Cell type=*` for table cells.
5. **Active state propagation** — Platform Nav doesn't expose an `activeItem` instance property, so every screen shows "Catalog" highlighted. Need to either: (a) add an `activeItem` component property to the Navbar, or (b) document a "detach + edit" pattern as acceptable for screens.

### Design system bugs — must fix before scaling

1. **`text/sidebar-foreground` and `surface/sidebar` variables have empty `scopes: []`** — they were defined but never wired into the Platform Nav component. Result: nav items are unreadable in dark mode. **Highest-priority fix.**
2. **Workspace badge ("Microsoft Azure" placeholder) doesn't theme.** Same root cause.
3. **Platform Nav content drift.** Has "Workflows" instead of "Jobs & Pipelines"; missing "Discover", "Agents", "AI Gateway", "Serving"; wrong order. Needs a one-pass update.
4. **No `activeItem` override path.** As above.

### What worked very well

1. **Variable-bound fills + explicit mode per frame.** Light → Dark cloning was effectively free. This is the right pattern.
2. **Component instances of Platform Header / Platform Nav.** Drop-in worked first time on every screen.
3. **Pattern reuse across screens.** Once I had the `tableRow` / `tree row` / `pill` helpers, screens 5–10 were each ~1 use_figma call to build.
4. **The figma-use skill `gotchas.md`** caught the `resize() before sizing modes` mistake on screen 2. After that, I never made it again.

### Build stats

- Total `use_figma` calls: ~25 across 10 screens
- Total screenshots fetched: 10 light + 0 dark spot-checks (cloned automatically)
- Average per screen after pattern was established: 1 build call + 1 screenshot
- First two screens (1, 2) took ~50% of the time due to learning the auto-layout sizing rules

## Aggregate gap report

> _Synthesized after all 10 screens are built._

