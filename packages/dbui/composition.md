# DBUI Composition Rules

> How DBUI components combine into product surfaces. Component-internal details (slots, icons, internal spacing, hover states) live **in the component code and JSDoc** — not here. This file covers **region layout, scaling, adjacency, scroll, and action hierarchy** at the shell level.

**Companion docs:**
- `CLAUDE.md` — AI rules, component routing
- `docs/component-rules.md` — cross-cutting rules for icons, buttons, menus, spacing
- `docs/icon-index.md` — searchable icon lookup (**always check before inserting icons**)
- `docs/compositions/*.md` — behavior contracts for complex components
- `llms.txt` — component API quick reference

---

## The layering

Every rule in this file answers one of these questions:
- **Which shell?** — pick from the five below
- **What regions?** — their widths and scaling
- **What's adjacent?** — what may/may not sit next to what
- **Where scrolls?** — one vertical scroll container per shell
- **Where is primary action?** — at the shell level, not the component level

Anything else (what icon a slot uses, what hover color is applied, what a component's min-width is internally) belongs in the component itself.

---

## Always-present chrome

### Platform Header
- **Component:** `<PlatformHeader>` — `import { PlatformHeader } from "@muditmittal/dbui/components/ui/platform-header"`
- **Placement:** sticky top, `bg-muted`, full viewport width
- **Height:** 48px, fixed across all shells and breakpoints
- **Scaling:** stretches horizontally. Internal collapse behavior (search, right-side slots) is the component's responsibility.
- **Z-order:** above everything except modals and toasts
- **Adjacency:** nothing sits above it; Product Nav sits directly below, left-anchored

### Product Nav
- **Component:** `<Navbar>` — `import { Navbar, NavbarItem } from "@muditmittal/dbui/components/ui/navbar"`
- **Width:** 180px expanded · 48px collapsed (icon-only)
- **Scaling:** auto-collapses to icon-only at ≤1280px; user can toggle collapse at any viewport
- **Hideable:** via toggle in the Platform Header (leftmost). When hidden, content takes the full width (minus header).
- **Default visibility per shell:**
  | Shell | Default |
  |---|---|
  | A List | visible |
  | B Data Tree | visible |
  | C File Tree | visible |
  | **D Editor** | **hidden** |
  | E Asset Detail | visible |

### Content container
- `bg-background` (white), rounded top-left corner (`rounded-tl-lg`)
- **The only scroll container on the page.** Header and nav do not scroll.
- Fills remaining space after header (top) and nav (left)

---

## Region widths — quick reference

| Region | Width | Resize | Collapses at |
|---|---|---|---|
| Platform Header | viewport | — | — |
| Product Nav | 180px | — | auto → 48px @ ≤1280px |
| Data Tree rail (Shell B) | 260px | 200–400px | icon-only @ ≤1024px |
| File Tree rail (Shell C) | 260px | 200–400px | icon-only @ ≤1024px |
| Editor tool rail (Shell D) | 44px | — | — |
| Editor tool panel (Shell D) | 260px | 200–400px | hidden @ ≤1024px |
| Asset Detail sidebar (Shell E) | 280px | — | hidden @ ≤1280px, toggle to show |
| List control bar search | 320px | grows to fill | collapses to icon @ ≤640px |

All region widths in `px`. Scaling is continuous between breakpoints (flex-based); the breakpoints listed are the **collapse thresholds**.

---

## The five shells

### Shell A — List page

**Purpose:** flat collections (Dashboards, Queries, Jobs, Pipelines, Notebooks, Clusters, Alerts, Warehouses).

**Regions (top → bottom):**
1. Page header — title left, primary action(s) right
2. Tabs (optional) — only for sibling variants (`Dashboards` / `Legacy dashboards`)
3. Featured band (optional) — promoted content card grid inside a `bg-muted` inset
4. Control bar — filter/search/sort
5. Table — paginated, first column always entity name, trailing overflow menu

**Scaling:** full-width content, single column. All regions stretch horizontally.

**Scroll:** the content container scrolls; header row and control bar may be sticky.

**Primary action location:** top-right of the page header.

**Adjacency:**
- ❌ No tree rail
- ❌ No metadata sidebar
- ❌ No breadcrumb at the top (page title is the root)

---

### Shell B — Data Tree + Detail (Catalog Explorer)

**Purpose:** hierarchical data entities (Catalogs → Schemas → Tables / Volumes / Models).

**Regions (left → right):**
1. Data tree rail — `<DataTreeView>` wrapped in a tree panel
2. Detail surface — flex-1

**Scaling:** tree rail fixed/resizable; detail surface fills remainder. Below 1024px, rail collapses to icon-only (hover-to-peek) and detail takes near-full width.

**Scroll:** tree and detail scroll independently.

**Two states of the detail surface:**
- **Landing (no node selected):** entity-type home (title + tabs for `Suggested` / `Recents` / `Favorites` + a list)
- **Node selected:** renders as **Shell E** inside this region

**Adjacency:**
- ❌ Breadcrumb on landing (the tree IS the breadcrumb)
- ✅ Breadcrumb when a node is selected (as part of Shell E)

---

### Shell C — File Tree + List (Workspace Browser)

**Purpose:** user-mutable hierarchies (Workspace, Repos, user folders).

**Regions:**
1. File tree rail — `<FileTreeView>`
2. Detail surface — list of the current folder's contents

**Scaling:** same as Shell B.

**Scroll:** same as Shell B.

**Key distinction from Shell B (enforced at the component level, not here):**
- Data Tree uses type-specific colored icons per entity
- File Tree uses a single blue `folder` icon; all other entity types use `text-muted-foreground`

**Adjacency:**
- ✅ Breadcrumb at top of detail surface (user navigates the path freely)
- ❌ No metadata sidebar
- ❌ No featured band

---

### Shell D — Editor (SQL Editor, Notebook, Pipeline editor)

**Purpose:** code/query authoring with live output.

**Regions (left → right):**
1. Tool rail — 44px, icon-only tool switcher
2. Tool panel — 260px, content of the active tool (Data tree, File tree, Variables, Connections, …)
3. Editor surface — vertically split:
   - **Top:** tab bar + editor toolbar + code editor
   - **Bottom:** output panel (resizable, dismissible)

**Scaling:**
- Tool rail fixed at 44px (never collapses)
- Tool panel behaves like a tree rail (200–400px, hides at ≤1024px)
- Editor/output split: default 60/40 vertical; resizable via drag handle between them
- Output collapses to minimum height when dismissed, tab bar retains quick-reopen control

**Scroll:**
- Tool panel scrolls internally
- Editor surface scrolls within its pane
- Output table scrolls within the output pane
- **No page-level scroll** — the editor's internal panes absorb all scrolling

**Switching tools in the tool rail:** only the tool panel updates. Editor/output state is preserved.

**Primary action location:** `Run` in the editor toolbar, top-left of the editor surface.

**Adjacency:**
- ❌ Product Nav visible by default (hidden for editor focus)
- ❌ Breadcrumb (tabs replace it)
- ❌ Metadata sidebar

---

### Shell E — Asset Detail

**Purpose:** detail view of a single entity (table, volume, model, schema, dashboard, query).

**Appears either:**
- **Inside Shell B** when a tree node is selected
- **Standalone** for entity types that don't live in a tree

**Regions (top → bottom, then left → right in the body):**
1. Breadcrumb — `Browse › catalog › schema › entity`, right-side copy-path button
2. Title row — entity type icon · name · qualifiers · action buttons
3. Sub-tabs — `Overview` (default) / `Columns` / `Details` / `Permissions` / `History` / `Lineage` / `Insights` / `Quality`
4. Body — two columns:
   - Main content (flex-1) — tab-dependent
   - Metadata sidebar (280px, sticky) — `<KeyValuePair>` sections separated by `<Separator>`

**Scaling:**
- Metadata sidebar hides at ≤1280px; accessible via a toggle that slides it in as an overlay
- Main content min-width 640px before sidebar is forced to hide
- Sub-tabs horizontally scroll if they exceed container width (rare — usually <8)

**Scroll:**
- Main content scrolls
- Sidebar scrolls independently, sticky top

**Primary action location:** top-right of the title row, rightmost position.

**Tab content ownership:** each tab's contents are the tab component's responsibility — not this file's.

---

## Cross-cutting rules at the shell level

### Breadcrumb presence
| Shell | Breadcrumb? |
|---|---|
| A List | no (title is root) |
| B Data Tree landing | no (tree is breadcrumb) |
| B Data Tree + selected node | yes (as part of Shell E) |
| C File Tree | yes |
| D Editor | no (tabs replace it) |
| E Asset Detail standalone | yes |

### Primary action location
Always top-right of the highest-level header available:
- Shell A: page header
- Shell B landing: tree panel header (create via `+`); detail uses tab controls
- Shell C: title row of detail
- Shell D: editor toolbar (Run + publish/share right)
- Shell E: title row

Destructive actions **never** appear as primary. They live in overflow menus or confirmation dialogs.

### Scroll ownership
**One vertical scroll container per shell.** Tree/tool rails and sidebars may have their own internal scroll. There is never a page-level scroll outside the content container.

### Forbidden compositions
- ❌ Tree rail on a List page (Shell A)
- ❌ Product Nav visible on Shell D by default
- ❌ Two metadata sidebars in one shell
- ❌ Nested tabs (tabs inside a tab)
- ❌ Breadcrumb on Shell A or on Shell B landing
- ❌ Primary action anywhere but top-right of its surface
- ❌ Page-level vertical scroll outside the content container

---

## Shells not yet codified (open questions)

Flagged for next round:
- Homepage — mixed-content shell
- Genie — chat shell
- Pipeline / Notebook / Ingestion — Shell D variants
- Designer — canvas shell
- Dashboards canvas — Shell E with canvas content type
- Modals / side sheets — overlay patterns (not a shell, but a shell mode)

---

## How to use this file

**When designing:** name the shell first. If a design doesn't fit A–E, ask before inventing. Most "new" screens are existing shells with new content types — not new shells.

**When reviewing:** scan the shell's Adjacency and Forbidden lists first. Composition bugs cluster there.

**When adding a shell:** propose it as a PR to this file before building. Include regions, scaling table, scroll ownership, primary-action location, and forbidden list.

**What does NOT belong here:**
- Which icon a header slot uses → component JSDoc
- Internal spacing of a component → component code
- "Never use primary button for destructive action" → `docs/component-rules.md`
- How `<FacetedFilter>` manages its pill state → `docs/compositions/faceted-filter.md`
