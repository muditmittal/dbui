# Inner Components — Figma ↔ Code Mapping

> These are hidden Figma components (prefixed with `.`) that provide composition flexibility.
> They define HOW visible components assemble internally.

## Phase 1: Universal Building Blocks

### .ActionLabel → Button sub-components
**Figma ID:** `692:557` | **Variants:** Size: Default/Small

Maps to the content inside every Button. In code, this is expressed as compound components:

| Figma Property | Code Equivalent | Usage |
|---|---|---|
| Show Icon = true | `<ButtonIcon>` | `<Button><ButtonIcon><Plus /></ButtonIcon>Label</Button>` |
| Label text | Direct children | `<Button>Label</Button>` |
| Show Menu = true | `<ButtonChevron />` | `<Button>Options<ButtonChevron /></Button>` |
| Size = Default | `size="md"` | Default 32px height, gap-2 (8px) between icon/label |
| Size = Small | `size="sm"` | 24px height, gap-1 (4px) between icon/label |

**File:** `packages/dbui/src/components/ui/button.tsx`

### .InputContent → InputGroup pattern
**Figma ID:** `670:550` | **Variants:** Content: Placeholder/Value × Size: Default/Small

Maps to the InputGroup + InputGroupAddon composition. No new components needed — the existing pattern handles all Figma variants:

| Figma Property | Code Equivalent | Usage |
|---|---|---|
| Show Icon = true (left) | `<InputGroupAddon align="inline-start">` | Leading icon |
| Placeholder text | `<InputGroupInput placeholder="..." />` | HTML placeholder |
| Value text | `<InputGroupInput value="..." />` | Controlled value |
| Show Indicator (right icon) | `<InputGroupAddon align="inline-end">` | Status/validation icon |
| Show Action (right button) | `<InputGroupAddon align="inline-end"><InputGroupButton>` | Clear/action button |
| Size = Default | Default (h-8, px-3) | 32px height |
| Size = Small | `size="sm"` on Input | 24px height |

**File:** `packages/dbui/src/components/ui/input-group.tsx`

### .MenuLabel + .MenuTrailing → DropdownMenuItem sub-components
**Figma IDs:** `763:595`, `764:602`

| Figma Component | Code Equivalent | Usage |
|---|---|---|
| .MenuLabel Show Icon | `<DropdownMenuItemIcon>` | `<DropdownMenuItem><DropdownMenuItemIcon><Edit /></DropdownMenuItemIcon>Edit</DropdownMenuItem>` |
| .MenuLabel With Description | `<DropdownMenuItemDescription>` | Secondary text below label |
| .MenuTrailing Type=Hint | `<DropdownMenuShortcut>` | Keyboard shortcut text (e.g., "⌘K") |
| .MenuTrailing Type=Count | `<DropdownMenuItemBadge>` | Numeric count badge |
| .MenuTrailing Type=Icon | Trailing icon in children | Custom trailing icon |

**File:** `packages/dbui/src/components/ui/dropdown-menu.tsx`

### .DropdownMenuItem → DropdownMenuItem variants
**Figma ID:** `766:671` | **Variants:** Type × State (22 total)

| Figma Type | Code Pattern |
|---|---|
| Action | `<DropdownMenuItem>` (default) |
| SingleSelect | `<DropdownMenuRadioItem>` |
| MultiSelect | `<DropdownMenuCheckboxItem>` |
| Submenu | `<DropdownMenuSubTrigger>` |
| Destructive | `<DropdownMenuItem variant="destructive">` |

States (Default/Hover/Press/Disabled/Selected) are handled by CSS — not props.

### .MenuRow → Menu structural components
**Figma ID:** `786:826` | **Variants:** 8 types

| Figma Type | Code Component |
|---|---|
| DropdownItem | `<DropdownMenuItem>` |
| Section Header | `<DropdownMenuLabel>` |
| Divider | `<DropdownMenuSeparator>` |
| Search | `<DropdownMenuSearch>` |
| Empty | `<DropdownMenuEmpty>` |
| Loading | `<DropdownMenuLoading>` |
| Add New | `<DropdownMenuItem>` with Plus icon |
| Footer | `<DropdownMenuFooter>` with Cancel/Apply buttons |

**File:** `packages/dbui/src/components/ui/dropdown-menu.tsx`

---

## Phase 2: Navigation & Tabs

### .TabItem → TabsTrigger + TabsIcon
**Figma ID:** `1046:2618` | **States:** Default/Hover/Press/Selected/Disabled

| Figma Property | Code Equivalent |
|---|---|
| Icon bool | `<TabsIcon>` sub-component |
| State Default | text-muted-foreground |
| State Hover | text-primary-hover |
| State Press | text-primary-press |
| State Selected | text-foreground + border-b-primary (3px) |
| State Disabled | text-disabled-foreground |

**File:** `packages/dbui/src/components/ui/tabs.tsx`

### .NavItem → NavbarItem + NavbarItemIcon
**Figma ID:** `3179:13944` | **Variants:** State: Default/Hover × Selected: T/F

| Figma Property | Code Equivalent |
|---|---|
| Icon instance swap | `<NavbarItemIcon>` sub-component |
| Default | text-foreground, font-normal |
| Hover | bg-hover |
| Selected=True | bg-active, text-accent-foreground, font-semibold |

**File:** `packages/dbui/src/components/ui/navbar.tsx`

### .NavSection → NavbarSection + NavbarSectionHeader
**Figma ID:** `3179:13998` | **Variants:** Expanded: T/F

| Figma Property | Code Equivalent |
|---|---|
| Expanded=False | Collapsed header with ChevronRight |
| Expanded=True | Header with ChevronDown + child NavbarItems |
| Section title | text-[12px] text-muted-foreground (Hint style) |

NavbarSectionHeader now accepts `expanded` and `onToggle` props. Chevron rotates via CSS transform.

**File:** `packages/dbui/src/components/ui/navbar.tsx`

### .EditorTab → EditorTab + EditorTabIcon
**Figma ID:** `3179:5040` | **Variants:** State: Default/Hover/Press × Selected: T/F

| Figma Property | Code Equivalent |
|---|---|
| Notebook icon | `<EditorTabIcon>` sub-component |
| .AssetName | Tab label as children |
| CloseSmall | Built-in close button (`closable` prop) |
| Selected=True | bg-background, text-foreground |
| Selected=False | bg-transparent, text-muted-foreground |

**File:** `packages/dbui/src/components/ui/editor-tabs.tsx`

---

## Phase 3: Data Display

### .TableCell + .Content + .Sort → Table sub-components
**Figma IDs:** `3155:3218`, `3155:3060`, `3155:3179`

| Figma Inner Component | Code Equivalent | Usage |
|---|---|---|
| .Content Cell type="Text" | Default `<TableCell>` children | Plain text cell |
| .Content Cell type="With Icon" | `<TableCellIcon>` + text | Icon + text in cell |
| .Content Cell type="Title" | `<TableCellTitle>` + `<TableCellTitleContent>` + `<TableCellMeta>` | Two-line: name + metadata |
| .Content Cell type="Expandable" | `<TableCellExpandable>` | Chevron + code-styled expandable row |
| .Content Cell type="User" | `<TableCellUser>` | Avatar + name |
| .Content Cell type="Status" | `<TableCellStatus>` | Status icon + label |
| .Content Cell type="Time" | `<TableCellTime>` | Duration bar + value |
| .Content Cell type="Tag Group" | Tags in `<TableCell>` | Wrap Tag components |
| .Sort Sorted=T/F | `<TableSortButton>` | Sort indicator in `<TableHead>` |
| .TableCell Type=Header | `<TableHead>` + `<TableSortButton>` | Header with sort |
| .TableCell Type=Checkbox | Checkbox in `<TableCell>` | Row selection |
| .TableCell Type=Action | Overflow icon button in `<TableCell>` | Row actions |

**File:** `packages/dbui/src/components/ui/table.tsx`

### .Key Value → KeyValuePair (enhanced)
**Figma ID:** `3178:3688`

| Figma Type | Code Layout | Key Style | Value Alignment |
|---|---|---|---|
| Horizontal | `layout="horizontal"` | 120px fixed, 13px | Left |
| Vertical | `layout="vertical"` | Full width, 12px Hint | Left |
| Flexible | `layout="flexible"` | Flex-1, 13px | Right (`<KeyValueValueEnd>`) |

**File:** `packages/dbui/src/components/ui/key-value-pair.tsx`

### .DataTreeNode → DataTree (new)
**Figma ID:** `3179:24295` | **Variants:** Type × Selected × Hover (12 total)

| Figma Property | Code Equivalent |
|---|---|
| Type=Header | `<DataTreeNode type="header">` |
| Type=Open folder | `<DataTreeNode type="folder" expanded>` |
| Type=Focused folder | `<DataTreeNode type="folder" selected>` |
| Type=File | `<DataTreeNode type="file">` |
| Selected=True | `selected` prop → bg-active, text-accent-foreground |
| Hover=True | CSS hover → bg-hover |
| Nesting depth | `depth` prop → indent via paddingLeft |
| .HoverActions | `<DataTreeNodeActions>` (visible on hover) |

**File:** `packages/dbui/src/components/ui/data-tree.tsx`

---

## Phase 4: Dialog/Overlay Building Blocks

### .DialogHeader → DialogHeader + DialogHeaderIcon
**Figma ID:** `882:2642`

Existing `DialogHeader`, `DialogTitle`, `DialogDescription` already match. Added:
- **`DialogHeaderIcon`** — optional 40×40 icon holder (bg-muted, rounded-md) for confirmation-style dialogs

**File:** `packages/dbui/src/components/ui/dialog.tsx`

### .DialogFooter, .DialogBody, .AlertDialog, .Slot, .Tip
All already fully covered by existing components:
- `.DialogFooter` → `DialogFooter` ✅
- `.DialogBody` → `DialogContent` with `size` prop (normal/wide/extrawide) ✅
- `.AlertDialog` → `AlertDialogContent` ✅
- `.Slot` → Generic `children` ✅
- `.Tip Tooltip` → `TooltipContent` (dark bg, arrow) ✅
- `.Tip Popover` → `PopoverContent` (light bg, arrow) ✅

## Phase 5: Composition Pieces (Platform Shell)

### .PageTitle + .PageActions → PageHeader (new)
**Figma IDs:** `3228:6358`, `3228:6529`

| Code Component | Maps To | Figma Spec |
|---|---|---|
| `<PageHeader>` | Container | flex, items-center, gap-2, px-4 py-3 |
| `<PageHeaderBack>` | .PageTitle back button | 32px ghost icon button, ChevronLeft default |
| `<PageHeaderTitle>` | .PageTitle text | Title 2: 22px/28px semibold, truncate |
| `<PageHeaderActions>` | .PageActions | flex gap-2, right-aligned buttons |

**File:** `packages/dbui/src/components/ui/page-header.tsx`

### .Workspace nav + .PlatformActions → PlatformHeader (new)
**Figma IDs:** `3215:8664`, `3225:4208`

| Code Component | Maps To | Figma Spec |
|---|---|---|
| `<PlatformHeader>` | Platform Shell header | h-12 (48px), px-3 py-2, justify-between |
| `<PlatformHeaderLeft>` | .Workspace nav | Sidebar toggle + cloud badge + logo, gap-1 |
| `<PlatformHeaderCenter>` | Search input | w-[552px] fixed center slot |
| `<PlatformHeaderRight>` | .PlatformActions | Catalog + Genie + App grid + Avatar, gap-1 |
| `<PlatformHeaderBadge>` | Cloud badge text | 14px text |

**File:** `packages/dbui/src/components/ui/platform-header.tsx`
