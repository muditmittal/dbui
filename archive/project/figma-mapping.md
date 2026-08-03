# Figma ↔ React Component Mapping

Canonical reference for every component in the DBUI design system, mapping Figma layer names to React exports. **This is the single source of truth** when LLMs or humans need to translate between design and code.

> **Companion docs**
>
> - `component-index.md` — what each React component is for and when to use it.
> - `icon-index.md` — list of all 451 icons and their canonical names.
> - `brandvoice.md` — copy and tone guidelines.
> - JSDoc on each component file — detailed behavioral rules and constraints.

If something here disagrees with Figma or the React source, **the latter wins**. Update this doc to match.

---

## Universal naming rules

There is **one rule** for the dot prefix: only **separate Figma component masters that are hidden from the Assets panel** get the dot. Everything else (layer names, public components, variant property values) uses plain names.


| Figma node                                                                                       | Convention                                                             | Example                                                              |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Public component master** (visible in Assets panel)                                            | Title Case, spaces allowed, **no dot**                                 | `Alert Dialog`, `Editor Tabs`, `Page Header`                         |
| **Variant property values**                                                                      | Title Case, spaces allowed                                             | `Variant=Danger, Layout=Inline`, `Type=Action, State=Hover`          |
| **Private inner component master** (hidden from Assets panel — leading `.` makes Figma hide it)  | **No spaces**, leading **dot**, matches React export exactly           | `.AlertDialog`, `.DropdownMenuItem`, `.TabsTrigger`, `.KeyValueItem` |
| **Layer name** (FRAME, INSTANCE, TEXT, VECTOR — anything that isn't a separate component master) | **No spaces**, **no dot**, matches the React subcomponent name exactly | `AlertIcon`, `AlertTitle`, `BreadcrumbSeparator`, `DialogClose`      |
| **React export**                                                                                 | PascalCase, no dot, no spaces                                          | `AlertDialogHeader`, `TooltipArrow`                                  |


### Why the dot prefix only on hidden masters

Figma hides components whose name starts with `.` from the Assets panel. We use the dot **only** for inner masters we don't want designers to drop on a canvas (e.g., `.DropdownMenuItem` is composed inside `Dropdown Menu`).

For everything else — including layer names that match React subcomponents — we **do not** use a dot. This way an LLM (or human) can tell, at a glance, whether something is a separate component master or just a layer slot:

- See a dot → separate Figma component master, instantiable on its own.
- No dot → either a public component (designer-facing) or a layer inside a parent.

### Why this naming maps cleanly to React

In React, every export is just `PascalCase`. By making Figma layer names match React export names exactly (without any prefix), an LLM can grep the React source for `<AlertIcon>`, find the matching Figma layer also called `AlertIcon`, and trust the mapping is 1:1.

For Figma component masters, the dot is metadata for Figma's UI (hide from Assets panel) — it is dropped when you reference the matching React component.

---

## Top-level components (55)

Each row is a public Figma component → its React entry point. The Figma node IDs are stable and used by Code Connect.


| Figma name         | React component     | Figma node ID                          |
| ------------------ | ------------------- | -------------------------------------- |
| Accordion          | `Accordion`         | 590:1245                               |
| Alert              | `Alert`             | 949:962                                |
| Alert Dialog       | `AlertDialog`       | 882:4236                               |
| Aspect Ratio       | `AspectRatio`       | 3179:2920                              |
| Avatar             | `Avatar`            | 3157:2562                              |
| Badge              | `Badge`             | 595:1281                               |
| Breadcrumb         | `Breadcrumb`        | 3140:1914                              |
| Button             | `Button`            | 477:298                                |
| Card               | `Card`              | 3154:4736                              |
| Checkbox           | `Checkbox`          | 587:1213                               |
| Checkbox Group     | `CheckboxGroup`     | 595:1234                               |
| Checkbox Label     | `CheckboxLabel`     | 595:1239                               |
| Combobox           | `Combobox`          | 1024:3877                              |
| Dialog             | `Dialog`            | 882:4185                               |
| Drawer             | `Drawer`            | 882:4205                               |
| Dropdown Menu      | `DropdownMenu`      | 787:706                                |
| Dropdown Menu Item | `DropdownMenuItem`  | 786:765                                |
| Editor Tabs        | `EditorTabs`        | 1052:1480                              |
| Empty              | `Empty`             | 3130:1793                              |
| Form Input         | `FormInput`         | 3179:5083                              |
| Icon Button        | `IconButton`        | 566:490                                |
| Input              | `Input`             | 587:1162                               |
| Input Group        | `InputGroup`        | 597:1290                               |
| Key Value Pair     | `KeyValuePair`      | 3178:3901                              |
| Label              | `Label`             | 587:1191                               |
| Page Header        | `PageHeader`        | 3247:5956                              |
| Pagination         | `Pagination`        | 3179:5135                              |
| Platform Header    | `PlatformHeader`    | 3463:6039                              |
| Platform Nav       | `PlatformNav`       | 3463:6045                              |
| Popover            | `Popover`           | 1037:3870                              |
| Progress Bar       | `Progress`          | 3157:2839                              |
| Radio              | `Radio`             | 587:1224                               |
| Radio Group        | `RadioGroup`        | 595:1244                               |
| Radio Label        | `RadioLabel`        | 595:1249                               |
| Radio Tile         | `RadioTile`         | 1067:3990                              |
| Segment Control    | `SegmentControl`    | 593:1271                               |
| Select             | `Select`            | 3179:5111                              |
| Separator          | `Separator`         | 1067:3970                              |
| Shell              | `Shell`             | 3463:6039                              |
| Skeleton           | `Skeleton`          | 1067:3980                              |
| Slider             | `Slider`            | 1039:2406                              |
| Spinner            | `Spinner`           | 3157:2569                              |
| Split Button       | `SplitButton`       | 3179:5070                              |
| Status             | `Status`            | 566:475                                |
| Switch             | `Switch`            | 595:1231                               |
| Switch Label       | `SwitchLabel`       | 595:1254                               |
| Table              | `Table`             | 3179:6090                              |
| Tabs               | `Tabs`              | 1048:1469                              |
| Tag                | `Tag`               | 3154:4442                              |
| Textarea           | `Textarea`          | 587:1182                               |
| Toast              | `Toast`             | 968:944                                |
| Toggle Button      | `ToggleButton`      | 477:387                                |
| Tooltip            | `Tooltip`           | 1060:3708                              |
| Tree               | `Tree`              | (composition — see component-index.md) |
| Typeahead Combobox | `TypeaheadCombobox` | 1024:3877                              |


---

## Layer naming inside each component

Layer names match the corresponding React export name **exactly** with **no dot**. The dot is only on separate Figma component masters (see next section).

### Alert (`949:962`)


| Figma layer                          | React                                  |
| ------------------------------------ | -------------------------------------- |
| `AlertIcon` (FRAME slot)             | `<AlertIcon>`                          |
| `Icon` (INSTANCE inside `AlertIcon`) | the icon child (e.g. `<DangerFill />`) |
| `AlertContent` (FRAME)               | `<AlertContent>`                       |
| `AlertTitle` (TEXT)                  | `<AlertTitle>`                         |
| `AlertDescription` (TEXT)            | `<AlertDescription>`                   |
| `AlertAction` (INSTANCE)             | `<AlertAction>`                        |
| `AlertClose` (INSTANCE)              | `<AlertClose>`                         |


### AlertDialog (public `882:4236` / inner master `.AlertDialog` `882:4166`)


| Figma layer                     | React                      |
| ------------------------------- | -------------------------- |
| `AlertDialogHeader` (FRAME)     | `<AlertDialogHeader>`      |
| `AlertDialogIcon` (FRAME slot)  | `<AlertDialogIcon>`        |
| `AlertDialogTitle` (TEXT)       | `<AlertDialogTitle>`       |
| `AlertDialogDescription` (TEXT) | `<AlertDialogDescription>` |
| `AlertDialogFooter` (FRAME)     | `<AlertDialogFooter>`      |
| `AlertDialogCancel` (INSTANCE)  | `<AlertDialogCancel>`      |
| `AlertDialogAction` (INSTANCE)  | `<AlertDialogAction>`      |


### Toast (`968:944`)


| Figma layer                          | React            |
| ------------------------------------ | ---------------- |
| `ToastIcon` (FRAME slot)             | (sonner-managed) |
| `Icon` (INSTANCE inside `ToastIcon`) | actual icon      |
| `ToastContent` (FRAME)               | (sonner-managed) |
| `ToastTitle` (TEXT)                  | (sonner-managed) |
| `ToastDescription` (TEXT)            | (sonner-managed) |
| `ToastClose` (FRAME)                 | (sonner-managed) |


### Card (`3154:4736`)


| Figma layer                                                      | React                                         |
| ---------------------------------------------------------------- | --------------------------------------------- |
| `CardHeader` (FRAME — currently in Type=Source only)             | `<CardHeader>`                                |
| `CardContent` (FRAME)                                            | `<CardContent>`                               |
| `CardTitle` (TEXT)                                               | `<CardTitle>`                                 |
| `CardDescription` (TEXT)                                         | `<CardDescription>`                           |
| `CardAction` (INSTANCE)                                          | `<CardAction>`                                |
| `CardTags` (FRAME)                                               | (composition; designers wrap `Tag` instances) |
| `CardMetadata` (FRAME)                                           | (composition)                                 |
| *(open: `CardFooter` to be added across all variants — pending)* | `<CardFooter>`                                |


### Tooltip (`1060:3708`)


| Figma layer               | React              |
| ------------------------- | ------------------ |
| `TooltipContent` (FRAME)  | `<TooltipContent>` |
| `TooltipArrow` (INSTANCE) | `<TooltipArrow>`   |


### Tag (`3154:4442`)


| Figma layer            | React                    |
| ---------------------- | ------------------------ |
| `TagIcon` (INSTANCE)   | `<TagIcon>`              |
| `TagLabel` (TEXT)      | `<TagLabel>`             |
| `TagDivider` (VECTOR)  | rendered by `<TagValue>` |
| `TagValue` (TEXT)      | `<TagValue>`             |
| `TagRemove` (INSTANCE) | `<TagRemove>`            |


### Empty (`3130:1793`)


| Figma layer                                  | React                |
| -------------------------------------------- | -------------------- |
| `EmptyMedia` (FRAME — wraps icon)            | `<EmptyMedia>`       |
| `GridDash` (INSTANCE — inside `EmptyMedia`)  | the icon child       |
| `EmptyHeader` (FRAME)                        | `<EmptyHeader>`      |
| `EmptyTitle` (TEXT)                          | `<EmptyTitle>`       |
| `EmptyDescription` (TEXT)                    | `<EmptyDescription>` |
| `EmptyContent` (FRAME — was `.EmptyActions`) | `<EmptyContent>`     |


### Progress Bar (`3157:2839` / inner `.ProgressTrack` master `1060:3972`)


| Figma layer                 | React                           |
| --------------------------- | ------------------------------- |
| `ProgressHeader` (FRAME)    | (composition)                   |
| `ProgressLabel` (TEXT)      | `<ProgressLabel>`               |
| `ProgressValue` (TEXT)      | `<ProgressValue>`               |
| `ProgressTrack` (INSTANCE)  | `<ProgressTrack>`               |
| `ProgressIndicator` (FRAME) | `<ProgressIndicator>`           |
| `ProgressStatus` (TEXT)     | (no React export — design-only) |


### Tabs (`1048:1469` / inner master `.TabsTrigger` `1046:2618`)


| Figma layer                          | React                       |
| ------------------------------------ | --------------------------- |
| `TabsTrigger` (INSTANCE)             | `<TabsTrigger>`             |
| `Label` (TEXT inside `.TabsTrigger`) | children of `<TabsTrigger>` |


### Editor Tabs (`3179:5135` / inner master `.EditorTab` `3179:5040`)


| Figma layer                                         | React                                |
| --------------------------------------------------- | ------------------------------------ |
| `EditorTab` (INSTANCE)                              | `<EditorTab>`                        |
| `EditorTabIcon` (INSTANCE — leading)                | `<EditorTabIcon>`                    |
| `EditorTabLabel` (FRAME — was `.AssetName`)         | (composition)                        |
| `EditorTabClose` (INSTANCE)                         | (rendered by `<EditorTab closable>`) |
| `EditorTabAddButton` (INSTANCE — was `Icon Button`) | `<EditorTabAddButton>`               |


### Breadcrumb (`3140:1914` / inner master `.BreadcrumbItem` `3140:1906`)


| Figma layer                                                               | React                   |
| ------------------------------------------------------------------------- | ----------------------- |
| `BreadcrumbItem` (INSTANCE)                                               | `<BreadcrumbItem>`      |
| `BreadcrumbLink` (TEXT — Leaf=False variant)                              | `<BreadcrumbLink>`      |
| `BreadcrumbPage` (TEXT — Leaf=True variant)                               | `<BreadcrumbPage>`      |
| `BreadcrumbSeparator` (INSTANCE — instance of `ChevronRight` icon master) | `<BreadcrumbSeparator>` |


### Page Header (`3247:5956` / inner masters `.PageHeaderTitleBar` / `.PageHeaderTitle` / `.PageHeaderActions`)


| Figma layer                                     | React                           |
| ----------------------------------------------- | ------------------------------- |
| `PageHeaderTitleBar` (INSTANCE)                 | `<PageHeaderTitleBar>`          |
| `PageHeaderTitle` (INSTANCE)                    | `<PageHeaderTitle>`             |
| `PageHeaderBack` (INSTANCE — first icon button) | `<PageHeaderBack>`              |
| `PageHeaderTitleText` (TEXT)                    | children of `<PageHeaderTitle>` |
| `PageHeaderActions` (INSTANCE)                  | `<PageHeaderActions>`           |


### Accordion (`3155:1983` / inner master `.AccordionItem` `3155:1901`)


| Figma layer                                                   | React                |
| ------------------------------------------------------------- | -------------------- |
| `AccordionItem` (INSTANCE)                                    | `<AccordionItem>`    |
| `AccordionTrigger` (INSTANCE — was misleading `Close Button`) | `<AccordionTrigger>` |
| `AccordionContent` (INSTANCE — was generic `Slot`)            | `<AccordionContent>` |


### Avatar (`1084:1542`)


| Figma layer                                         | React                             |
| --------------------------------------------------- | --------------------------------- |
| (variant property `Type=Initials|Icon`, was `Size`) | `<Avatar type="initials"|"icon">` |
| `AvatarFallback` (TEXT or INSTANCE)                 | `<AvatarFallback>`                |


### Button (master `477:773` / shared inner `.ActionLabel` `692:557`)


| Figma layer (inside `.ActionLabel`) | React                  |
| ----------------------------------- | ---------------------- |
| `ButtonIcon` (INSTANCE)             | `<ButtonIcon>`         |
| `Label` (TEXT)                      | children of `<Button>` |
| `ButtonChevron` (INSTANCE)          | `<ButtonChevron>`      |


### DropdownMenu (`787:706` / inner masters `.DropdownMenuItem` / `.DropdownMenuItemContent` / `.DropdownMenuItemTrailing`)


| Figma layer                                                 | React                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| `DropdownMenuItem` (INSTANCE)                               | `<DropdownMenuItem>`                                                 |
| `DropdownMenuItemContent` (INSTANCE — was `.MenuLabel`)     | (composition; not a public React export)                             |
| `DropdownMenuItemTrailing` (INSTANCE — was `.MenuTrailing`) | (composition)                                                        |
| `DropdownMenuItemIcon` (FRAME — was `Icon Wrap`)            | `<DropdownMenuItemIcon>`                                             |
| `DropdownMenuItemText` (FRAME — was `Text Column`)          | (composition)                                                        |
| `Label` (TEXT)                                              | children of `<DropdownMenuItem>`                                     |
| `DropdownMenuItemDescription` (TEXT)                        | `<DropdownMenuItemDescription>`                                      |
| `DropdownMenuItemBadge` (TEXT — was `Count`)                | `<DropdownMenuItemBadge>`                                            |
| `DropdownMenuShortcut` (TEXT — was `Hint`)                  | `<DropdownMenuShortcut>`                                             |
| `DropdownMenuItemIndicator` (FRAME — was `Indicator`)       | rendered by `<DropdownMenuCheckboxItem>` / `<DropdownMenuRadioItem>` |


### Dialog (`882:2798` / inner masters `.DialogContent` (was `.DialogBody`) / `.DialogHeader` / `.DialogFooter`)


| Figma layer                                   | React                      |
| --------------------------------------------- | -------------------------- |
| `DialogContent` (INSTANCE)                    | `<DialogContent>`          |
| `DialogHeader` (INSTANCE)                     | `<DialogHeader>`           |
| `DialogHeaderIcon` (FRAME slot)               | `<DialogHeaderIcon>`       |
| `DialogTitle` (TEXT)                          | `<DialogTitle>`            |
| `DialogDescription` (TEXT — was `Subtitle`)   | `<DialogDescription>`      |
| `DialogClose` (INSTANCE — was `Close Button`) | `<DialogClose>`            |
| `DialogContentSlot` (INSTANCE — was `.Slot`)  | (children slot)            |
| `DialogFooter` (INSTANCE)                     | `<DialogFooter>`           |
| `DialogCancel` (INSTANCE)                     | (composed; cancel button)  |
| `DialogAction` (INSTANCE)                     | (composed; primary action) |


### Popover (`1060:3832`)


| Figma layer                               | React              |
| ----------------------------------------- | ------------------ |
| `PopoverContent` (INSTANCE — was `.Slot`) | `<PopoverContent>` |
| `PopoverArrow` (INSTANCE — was `.Tip`)    | `<PopoverArrow>`   |


### Select (`732:601`)


| Figma layer                | React             |
| -------------------------- | ----------------- |
| `SelectIcon` (INSTANCE)    | leading-icon slot |
| `SelectValue` (TEXT)       | `<SelectValue>`   |
| `SelectChevron` (INSTANCE) | trailing chevron  |


### Form Input / Field (`Label` master `3157:2854` / `.InputContent` master `670:550`)


| Figma layer                                           | React                       |
| ----------------------------------------------------- | --------------------------- |
| `FieldLabel` (TEXT — was `Title`)                     | label text inside `<Field>` |
| `FieldRequired` (TEXT — was `*`)                      | required indicator          |
| `FieldHint` (TEXT — was `Hint text`)                  | hint text                   |
| `FieldError` (TEXT — was `Error text`)                | error text                  |
| `InputLeading` (INSTANCE — was `Left Icon`)           | leading icon slot           |
| `InputTrailing` (INSTANCE — was `Right Icon`)         | trailing icon slot          |
| `InputTrailingAction` (INSTANCE — was `Right Action`) | trailing action button      |


---

## Where the names are not 1:1 (and why)

Some React exports have no Figma counterpart. This is by design — Figma optimises for visual composition, not API surface. The following React subcomponents are intentionally not separate Figma components:


| React export                                                       | Why no separate Figma layer                                                                |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `AlertDialogTrigger`, `DialogTrigger`, `DropdownMenuTrigger`, etc. | The trigger is a `Button` instance — designers compose with the existing Button component. |
| `AlertDialogTitle`, `DialogTitle`, etc.                            | Title is a styled text node inside the header — semantic role, not a separate component.   |
| `AlertDialogDescription`, etc.                                     | Same as above for description text.                                                        |
| `AlertDialogAction`, `AlertDialogCancel`                           | These are `Button` instances inside the footer.                                            |
| `AlertDialogPortal`, `AlertDialogOverlay`                          | Browser/DOM concerns — no visual representation in Figma.                                  |
| `TabsList`, `TabsContent`                                          | Containers; the visual unit designers care about is `.TabsTrigger`.                        |
| `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`          | Encoded inside `.BreadcrumbItem` as text styles + variant.                                 |
| `SelectGroup`, `SelectLabel`, `SelectSeparator`                    | Encoded inside the Select dropdown as menu items.                                          |


**Rule of thumb**: If a React export's only job is semantics (title vs. description, trigger vs. action), it usually does not need a Figma component — the `data-slot` attribute is the contract. If it has distinct visual styling that designers compose differently, it deserves a Figma component.

---

## Code-only components (React but not Figma)

These ship in React but have no public Figma component — they are utilities or compositions:

- `Tree` — built from `Section`, `TreeNode`, etc. (no top-level Figma master)
- `DataTable` — composes `Table` + state
- `CatalogExplorer`, `Shell`, etc. (in `dbui-shells`) — application-shell primitives

---

## Figma-only components (Figma but not React)

None as of April 2026. Every Figma component master has a React export or is an internal slot.

---

## Drift-prevention process

Figma and React drift apart unless we follow a discipline. Three layers protect us:

### 1. Per-change discipline (manual)

When you change a component on either side:

- **React change**: update JSDoc with `@figma <node-url>` if the URL changed. Update this file's row if the component name or structure changed.
- **Figma change**: if you rename a layer, update this file. If you change variant properties, update the React `props` to match.
- **Both sides change together** for any structural change (new prop, new slot, etc.).

### 2. Code Connect as the runtime contract

Files in `figma/*.figma.tsx` are the **executable** version of this mapping. They reference Figma node IDs, so they will fail loudly if a node moves or is renamed. Run `npx figma connect publish` from `db-design-system/` to verify.

### 3. Drift-check script (planned)

A script in `scripts/figma-drift-check.ts` will:

1. Pull current Figma component names via the Figma API.
2. Compare against this file's tables.
3. Report mismatches.

Run it via `yarn figma:check` before merging significant design or code changes.

---

### Pagination (`3140:1999`)
| Figma layer | React |
|---|---|
| `PaginationPrevious` (INSTANCE — was first `Icon Button`) | `<PaginationPrevious>` |
| `PaginationLink` ×N (INSTANCEs — were `Toggle Button`) | `<PaginationLink>` |
| `PaginationNext` (INSTANCE — was last `Icon Button`) | `<PaginationNext>` |

### Key Value Pair (`3178:3901` / inner master `.KeyValueItem` `3178:3688` / `.KeyValueValue` was `.Value`)
| Figma layer | React |
|---|---|
| `KeyValueItems` (FRAME — was auto-generated `Frame …`) | (composition wrapper) |
| `KeyValueItem` (INSTANCE) | `<KeyValueItem>` |
| `KeyValueKey` (TEXT — was `Key label`) | `<KeyValueKey>` |
| `KeyValueValue` (INSTANCE — was `.Value`) | `<KeyValueValue>` |

### Switch (`717:650`) / Checkbox (`713:650`) / Radio (`715:650`)
| Figma layer | React |
|---|---|
| `SwitchThumb` (ELLIPSE — was `Thumb`) | `data-slot="switch-thumb"` |
| `CheckboxIndicator` (INSTANCE — was `Icon`) | `data-slot="checkbox-indicator"` |
| `RadioIndicator` (ELLIPSE — was `Dot`) | `data-slot="radio-indicator"` |

### DropdownMenu Row (`786:826` master `.DropdownMenuRow` — was `.MenuRow`)
A unified row component with type variants. Each variant maps to a different React export.

| Variant | React equivalent | Inner layer |
|---|---|---|
| `Type=Item` | `<DropdownMenuItem>` | wraps `DropdownMenuItem` instance |
| `Type=Label` (was `Section Header`) | `<DropdownMenuLabel>` | `DropdownMenuLabel` (TEXT) |
| `Type=Separator` (was `Divider`) | `<DropdownMenuSeparator>` | `DropdownMenuSeparator` (LINE) |
| `Type=Search` | `<DropdownMenuSearch>` | `Input` instance |
| `Type=Loading` | `<DropdownMenuLoading>` | `DropdownMenuLoadingIcon` + `DropdownMenuLoadingMessage` |
| `Type=Empty` | `<DropdownMenuEmpty>` | `DropdownMenuEmpty` (TEXT) |
| `Type=Add New` | (no direct React export — designer-only) | `Button` instance |
| `Type=Footer` | `<DropdownMenuFooter>` | 2 `Button` instances |

### Combobox (`811:976`) / Typeahead Combobox (`842:889`)
| Figma layer | React |
|---|---|
| `ComboboxValue` (TEXT — was `Label`/`Value`/`Select`) | `<ComboboxValue>` |
| `ComboboxInput` (FRAME — was `Label` wrapper in Press/Focus) | `<ComboboxInput>` |
| `ComboboxBadge` (INSTANCE — was `Badge`) | (badge inside trigger) |
| `ComboboxClear` (FRAME — was `Clear`) | `<ComboboxClear>` |
| `ComboboxChevron` (INSTANCE — was `Chevron`) | trigger chevron |

### Table (`3157:2794` / inner masters `.TableColumn` `3156:2097`, `.TableCell` `3155:3218`, `.TableSortButton` `3155:3179`, `.TableCellContent` `3155:3060`)
| Figma layer | React |
|---|---|
| `TableColumn` (INSTANCE) | (composition; React is row-based) |
| `TableCell` (INSTANCE) | `<TableCell>` / `<TableHead>` (variants) |
| `TableHeadLabel` (TEXT — was `Header label`) | children of `<TableHead>` |
| `TableCellContent` (INSTANCE / TEXT — was `.Content` / `Cell value`) | children of `<TableCell>` |
| `TableSortButton` (INSTANCE — was `.Sort`) | `<TableSortButton>` |

### Platform Header (`3225:4233` / inner masters `.PlatformHeaderLeft`, `.PlatformHeaderRight`, `.DatabricksLogo`)
| Figma layer | React |
|---|---|
| `PlatformHeaderLeft` (INSTANCE — was `.Workspace nav`) | `<PlatformHeaderLeft>` |
| `PlatformHeaderRight` (INSTANCE — was `.PlatformActions`) | `<PlatformHeaderRight>` |
| `DatabricksLogo` (INSTANCE — was `.Databricks`) | `<DatabricksLogo />` icon |
| `PlatformHeaderBadge` (TEXT — was `Section label`) | `<PlatformHeaderBadge>` |
| `Input` (INSTANCE) inside Platform Header | content of `<PlatformHeaderCenter>` |

### Platform Nav / Navbar (`3179:14163` public Figma name `Platform Nav` / inner masters `.NavbarItem`, `.NavbarSection`)
| Figma layer | React |
|---|---|
| `NavbarItem` (INSTANCE — was `.NavItem`) | `<NavbarItem>` |
| `NavbarItemIcon` (INSTANCE — was `Notebook icon`) | `<NavbarItemIcon>` |
| `NavbarItemLabel` (TEXT — was `Section text`) | children of `<NavbarItem>` |
| `NavbarSection` (INSTANCE — was `.NavSection`) | `<NavbarSection>` |
| `NavbarSectionHeader` (FRAME — was `.Section header`) | `<NavbarSectionHeader>` |
| `NavbarSectionHeaderTitle` (TEXT — was `Section title`) | children of `<NavbarSectionHeader>` |
| `NavbarSectionHeaderChevron` (INSTANCE — was `Notebook icon` in Section header) | chevron in `<NavbarSectionHeader>` |
| `NavbarPrimarySection` (FRAME — was `Section`) | (top primary section, no React equivalent) |
| `NavbarNewButton` (INSTANCE — was `Button`) | `<NavbarNewButton>` |

### SegmentControl (`481:661`)
- Variant property `Variant=Default` (was `Variant=Slider`) — matches React `variant="default"`
- Inner: `.SegmentControlItem` instances; designers use the actual icon name as the layer name (Bold, Italic, Plus, etc.)

### Split Button (`580:527`)
| Figma layer | React |
|---|---|
| `Button` (INSTANCE — main action) | `<Button>` |
| `SplitButtonMenuTrigger` (INSTANCE — was `Icon Button`) | menu trigger button |

---

## React-only components (no Figma counterpart)

These React exports have **no public Figma component**. Some are headless utilities, others are composed visually using existing Figma components.

| React file | Why no Figma equivalent |
|---|---|
| `button-group.tsx` (`ButtonGroup`, etc.) | Layout primitive — designers use Auto Layout |
| `chart.tsx` (`ChartContainer`, etc.) | Data visualization wrapper around `recharts` — content-driven, no fixed design |
| `collapsible.tsx` (`Collapsible`, etc.) | Headless primitive used internally by Accordion |
| `context-menu.tsx` (`ContextMenu`, etc.) | Reuses `Dropdown Menu` design — appears on right-click |
| `field.tsx` (`Field`, `FieldSet`, `FieldLegend`, etc.) | Used inside `Form Input`; not represented as a top-level Figma component |
| `hover-card.tsx` (`HoverCard`, etc.) | Reuses `Popover` design |
| `item.tsx` (`Item`, `ItemGroup`, `ItemSeparator`) | Generic primitive used by other components |
| `kbd.tsx` (`Kbd`, `KbdGroup`) | Keyboard shortcut display — could be added to Figma as a small component |
| `menubar.tsx` (`Menubar`, etc.) | Reuses `Dropdown Menu` design |
| `native-select.tsx` (`NativeSelect`) | HTML fallback for `Select` — no design treatment needed |
| `resizable.tsx` (`ResizablePanelGroup`, etc.) | Interaction primitive — handled in dev |
| `scroll-area.tsx` (`ScrollArea`, `ScrollBar`) | Custom scrollbar — interaction-only |
| `toggle-group.tsx` (`ToggleGroup`, `ToggleGroupItem`) | Headless primitive used internally by `SegmentControl` |
| `direction.tsx` | RTL/LTR direction utility — no UI |

### Components that are React + Figma but had a missing Code Connect file (now added)

- **Tree** (`data-tree.tsx`): React exports `Tree`, `Section`, `TreeNode`, `TreeNodeTag`. Figma master at `3211:5106` (with inner `.TreeNode` master at `3179:24295`). **Code Connect file added April 2026 → `figma/Tree.figma.tsx`.**

---

## Drawer — intended structure (TODO, manual restructure)

Drawer in Figma currently composes `AlertDialog` + `.DialogBody` parts. React `Drawer` uses the `vaul` library and has its own subcomponents (`DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`). The two should be aligned — Drawer should be its own component family, not a composition of Dialog parts.

**Intended Figma structure** (to be applied later):

```
Drawer (public component)
├── .DrawerContent (private inner master) — the side panel
│   ├── .DrawerHeader
│   │   ├── DrawerTitle (TEXT)
│   │   ├── DrawerDescription (TEXT)
│   │   └── DrawerClose (icon button)
│   ├── DrawerContentSlot — body content slot
│   └── .DrawerFooter
│       ├── DrawerCancel (button)
│       └── DrawerAction (button)
```

**Why we're not doing it now**: requires creating new private masters and moving instances. Owner has flagged for manual restructure.

---

## Private inner component masters (the dot-prefixed ones)

These are separate Figma component masters whose names start with `.` so they are hidden from the Assets panel. They match React exports exactly without the dot.


| Figma master | React | Master node ID |
| --- | --- | --- |
| `.AccordionItem` | `AccordionItem` | `3155:1901` |
| `.AlertDialog` | (rendered by `AlertDialogContent`) | `882:4166` |
| `.BreadcrumbItem` | `BreadcrumbItem` | `3140:1906` |
| `.DatabricksLogo` (was `.Databricks`) | `DatabricksLogo` icon | `3215:8646` |
| `.DialogContent` (was `.DialogBody`) | (rendered by `DialogContent`) | `882:3980` |
| `.DialogFooter` | (rendered by `DialogFooter`) | `882:2657` |
| `.DialogHeader` | (rendered by `DialogHeader`) | `882:2642` |
| `.DropdownMenuItem` | `DropdownMenuItem` | `766:671` |
| `.DropdownMenuItemContent` (was `.MenuLabel`) | (composition) | `763:595` |
| `.DropdownMenuItemTrailing` (was `.MenuTrailing`) | (composition) | `764:602` |
| `.ContentSlot` (was `.Slot`) | (children slot used by Dialog/Drawer/Accordion bodies) | `882:2799` |
| `.DropdownMenuRow` (was `.MenuRow`) | (designer convenience — type variants map to many React exports) | `786:826` |
| `.EditorTab` | `EditorTab` | `3179:5040` |
| `.InputContent` | (rendered inside `Input`) | `670:550` |
| `.KeyValueItem` (was `.Key Value`) | `KeyValueItem` | `3178:3688` |
| `.KeyValueValue` (was `.Value`) | `KeyValueValue` | `3178:3565` |
| `.NavbarItem` (was `.NavItem`) | `NavbarItem` | `3179:13944` |
| `.NavbarSection` (was `.NavSection`) | `NavbarSection` | `3179:13998` |
| `.OverlayArrow` (was `.Tip`) | (shared arrow master used by Tooltip + Popover) | `1060:3755` |
| `.PageHeaderActions` (was `.PageActions`) | `PageHeaderActions` | `3228:6529` |
| `.PageHeaderTitle` (was `.PageTitle`) | `PageHeaderTitle` | `3228:6358` |
| `.PageHeaderTitleBar` (was `.TitleBar`) | `PageHeaderTitleBar` | `3228:6533` |
| `.PlatformHeaderLeft` (was `.Workspace nav`) | `PlatformHeaderLeft` | `3215:8664` |
| `.PlatformHeaderRight` (was `.PlatformActions`) | `PlatformHeaderRight` | `3225:4208` |
| `.ProgressTrack` (was `.ProgressBar`) | `ProgressTrack` | `1060:3972` |
| `.SegmentControlItem` | (encoded as variant) | `589:898` |
| `.SliderHandle` (was `.Thumb`) | (slider thumb) | `1021:3859` |
| `.TableCell` | `TableCell` / `TableHead` | `3155:3218` |
| `.TableCellContent` (was `.Content`) | children of `<TableCell>` | `3155:3060` |
| `.TableColumn` (was `.Column`) | (composition) | `3156:2097` |
| `.TableSortButton` (was `.Sort`) | `TableSortButton` | `3155:3179` |
| `.TabsTrigger` (was `.TabItem`) | `TabsTrigger` | `1046:2618` |


---

## Naming-gap log (April 2026)

All historical naming gaps have been resolved through two passes (April 22 and April 25).

### Renames applied to Figma (executed via `use_figma`)

**Top-level component masters (5):**

1. `.Key Value` → `.KeyValueItem`
2. `.PageTitle` → `.PageHeaderTitle`
3. `.TabItem` → `.TabsTrigger`
4. `.Level` → `.BreadcrumbItem`
5. `.Thumb` (Slider master) → `.SliderHandle`

**Inner frames (21 rules, 60+ nodes across all variants):**


| #   | Parent       | Rename                                  |
| --- | ------------ | --------------------------------------- |
| 6   | Alert        | `Icon` → `.AlertIcon` (8 nodes)         |
| 7   | Alert        | `Content` → `.AlertContent` (8 nodes)   |
| 8   | Alert        | `Close` → `.AlertClose` (8 nodes)       |
| 9   | Alert Dialog | `Header` → `.AlertDialogHeader`         |
| 10  | Alert Dialog | `Footer` → `.AlertDialogFooter`         |
| 11  | Alert Dialog | `Icon` → `.AlertDialogIcon`             |
| 12  | Card         | `Header` → `.CardHeader`                |
| 13  | Card         | `Content` → `.CardContent` (2 nodes)    |
| 14  | Card         | `Tags` → `.CardTags` (2 nodes)          |
| 15  | Card         | `Metadata` → `.CardMetadata`            |
| 16  | Tooltip      | `Content` → `.TooltipContent` (4 nodes) |
| 17  | Tooltip      | `.Tip` → `.TooltipArrow` (4 nodes)      |
| 18  | Toast        | `Icon` → `.ToastIcon` (4 nodes)         |
| 19  | Toast        | `Content` → `.ToastContent` (4 nodes)   |
| 20  | Toast        | `Close` → `.ToastClose` (4 nodes)       |
| 21  | Tag          | `Key` → `.TagIcon` (2 nodes)            |
| 22  | Tag          | `Icon Button` → `.TagRemove` (2 nodes)  |
| 23  | Tag          | `Divider` → `.TagDivider`               |
| 24  | Empty        | `EmptyHeader` → `.EmptyHeader`          |
| 25  | Empty        | `Actions` → `.EmptyActions`             |
| 26  | Progress Bar | `.Thumb` → `.ProgressIndicator`         |


### Renames / additions applied to React


| Change                                                              | File                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `KeyValueRow` → `KeyValueItem` (function + export + consumers)      | `packages/dbui/src/components/ui/key-value-pair.tsx` + `apps/portal/src/stories/KeyValuePair.stories.tsx` |
| `TreeItem` → `TreeNode` (function + export + consumers)             | `packages/dbui/src/components/ui/data-tree.tsx`, story files, `dbui-shells/CatalogExplorer.tsx`           |
| Added `AlertDialogIcon` export                                      | `packages/dbui/src/components/ui/alert-dialog.tsx`                                                        |
| Added `TooltipArrow` export (auto-rendered inside `TooltipContent`) | `packages/dbui/src/components/ui/tooltip.tsx`                                                             |


