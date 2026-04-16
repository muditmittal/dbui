# Catalog Explorer — Design Decisions & Rules

> Contextual details captured during the build of the Catalog Explorer surface.
> These encode Databricks-specific patterns that should be consistent across surfaces.

---

## Tree Component (DBUI)

### Hierarchy
- **Data Tree**: Fixed 3-level namespace — Catalog → Schema → Table/View/Model/Volume/Function → Columns
- **File Tree**: Infinite nesting — folders and files at any level
- Both share the same `Tree` primitive with identical behaviors

### Node behavior
| Property | Controls | Default |
|----------|----------|---------|
| `leaf` | Expandability (chevron) | `false` |
| `selectable` | Selection + hover style | `true` — consumer decides |
| `expandable` | Force chevron without children | `false` |

### Selection styles
- **Selectable rows**: `hover:bg-hover` (blue tint), selected: `bg-active` (#F0F8FF)
- **Non-selectable rows** (columns, section headers): `hover:bg-muted` (grey), no selection highlight
- Icons use `text-foreground` when selected or expanded, `text-muted-foreground` otherwise

### Chevron styles
- **Collapsed** (ChevronRight): `text-input` (#CBCBCB) — subtle, muted
- **Expanded** (ChevronDown): `text-muted-foreground` (#6F6F6F) — bolder

### Trail lines
- Vertical `border-l` connecting expanded parent to children
- **Last expanded node**: `border-foreground` (#161616) — dark, draws attention
- **All other expanded nodes**: `border-border` (#EBEBEB) — light
- On collapse: highlight returns to **parent level** (not chronological stack)
- On user expand only — `defaultExpanded` nodes don't get the dark line

### Indentation
- **8px per depth level** — NOT 16px
- Done via chevron area width (16px base + 8px per level), not paddingLeft
- All items keep the same `px-1` (4px) padding

### Sections (Data Tree only)
- Collapsible group headers: 12px Regular `text-muted-foreground`
- Catalogs inside sections indent to depth 1 (8px offset from section chevron)
- Sections are not selectable
- Sections are keyboard-navigable

### Keyboard navigation
- Arrow Up/Down: move focus between visible nodes
- Arrow Right: expand current node
- Arrow Left: collapse current node
- Section headers participate in navigation

### Hover actions
- **Target icon** (Focus): visible on expandable + selectable nodes
- **Overflow icon** (Menu): visible on all selectable nodes
- Both appear on hover, 24×24, `hover:bg-hover active:bg-press`
- `stopPropagation` prevents triggering row click/expand

### Empty state
- Expandable nodes with no children show "No items" in `text-muted-foreground`
- Text aligns with where child labels would be (after chevron + icon + gaps)

---

## Entity Icons

### Rule: Always reference `entity-icons.ts`
When populating tree nodes, ALWAYS read `dbui/components/icons/entity-icons.ts` for correct icon mapping. Never guess.

### Data Tree icons
| Entity | Icon | Notes |
|--------|------|-------|
| Catalog (personal) | `CatalogUserHome` | my_catalog |
| Catalog (workspace) | `CatalogHome` | main |
| Catalog (standard) | `Catalog` | customers, dbt_catalog |
| Catalog (shared) | `CatalogShared` | Delta Sharing catalogs |
| Catalog (system) | `CatalogGear` | hive_metastore |
| Schema | `Database` | All schemas |
| Table | `Table` | Standard table |
| View | `TableView` | Virtual table |
| Streaming table | `TableStream` | Real-time |
| Sync table | `TableLightning` | Auto-refreshed |
| Online table | `TableGlobe` | Low-latency serving |
| Metric view | `TableMeasure` | AI/BI KPI |
| Feature table | `TableModel` | ML features |
| Model | `Models` | ML model registry |
| Volume | `FolderCloud` | Managed storage |
| Function | `Function` | UDF / SQL function |

### Column type icons
| Type | Icon |
|------|------|
| ID / Key | `Hash` |
| Integer | `Numbers` |
| Decimal / Float | `Decimal` |
| String / Text | `Letters` |
| Boolean | `Binary` |
| Timestamp / Date | `CalendarClock` |

### File Tree icons
| Entity | Icon | Expanded icon |
|--------|------|---------------|
| Folder | `Folder` | `FolderOpen` |
| Git folder | `FolderBranch` | — |
| Pipeline folder | `FolderSolidPipeline` | — |
| Notebook | `Notebook` | — |
| Query | `Query` | — |
| File | `File` | — |
| Dashboard | `Dashboard` | — |

---

## Catalog Explorer Header

### Root switcher
- Always visible as header chip: `./` + entity icon + label
- Default root: "Catalog" with Data icon
- `bg-muted` default, `hover:bg-hover`, `active:bg-press`
- Click opens dropdown with breadcrumb path (indented 12px per level) + "Go to" shortcuts
- Current level highlighted with `bg-active`

### Back button
- Only visible when focused deeper than root
- Clicking goes up one level in the path

### Action buttons
- 3 buttons in `gap-1` (4px) container
- **Status dot** (warehouse picker): search + grouped warehouses with status, badges, sizes
- **Plus** (create/add): grouped by entity type with icons, Table/View have submenus
- **Overflow** (governance): hub with description, Delta sharing, Clean rooms, credentials, connections, DBFS
- All menus `align="start"` (left-aligned to button)
- Buttons use `icon-md` size (32×32) with `text-muted-foreground` icons

---

## Catalog Explorer Landing Page

### Filters
- Use `Toggle variant="pill"` — NOT Tabs
- Suggested / Recents / Favorites (toggle group, one active at a time)

### Action buttons (top right)
| Button | Variant | Contents |
|--------|---------|----------|
| Govern | `outline` | No chevron |
| Connect | `outline` | + ButtonChevron (menu) |
| Share | `outline` | UserGroup icon + label + ButtonChevron |
| Create | `default` (primary) | + ButtonChevron (menu) |

### Table rows
- Icon: `text-muted-foreground`, 16×16, aligned to top of asset name (`items-start` + `mt-0.5`)
- Asset name: Paragraph style (13px Regular `text-foreground`) — NOT Bold
- Subtitle (path): 12px/16px `text-muted-foreground`, flush below name
- Reason + Type columns: `text-muted-foreground`

### Load more
- Centered, `text-primary`, ChevronDown icon

---

## Faceted Filter

### Layout
- Search input + filter button in a single InputGroup-style row
- Chips appear in a **separate row below** the input — pushes tree down
- `px-2` margins to align with root switcher

### Chips
- Grouped per facet: `Tag: billing +2` (not individual chips)
- `bg-active` background
- Label (`Tag:`) in `text-muted-foreground`, value in `text-foreground`
- `+N` count for multiple values in same facet
- `max-w-[200px]` with truncation
- Close button: `hover:bg-hover active:bg-press`
- **Clickable**: clicking chip text opens that facet's popover left-aligned to the chip

### Popover
- `align="start"` (left-aligned to filter button)
- Nested items (e.g., "env") show checkbox + chevron — parent is selectable too
- "Show can-use only" toggle at bottom of root level

---

## Button Icon Colors

### Rule: Icons in buttons use `text-muted-foreground`
- **Icon-only buttons** (`icon-sm`, `icon-md`): `text-muted-foreground` via size class
- **Icon + Label buttons** (`ButtonIcon` wrapper): `text-muted-foreground` via ButtonIcon component
- On hover: transitions to `text-primary-hover` via variant styles

### Rule: Hover and press use action tokens
- All interactive elements: `hover:bg-hover` (primary@8%), `active:bg-press` (primary@16%)
- Never use `hover:bg-primary` for non-filled interactive elements
