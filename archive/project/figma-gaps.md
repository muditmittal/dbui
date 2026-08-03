# Figma ↔ React Gap Report (April 25, 2026)

This document tracked all naming and structural gaps between the React DBUI components and their Figma counterparts. **Most gaps are now resolved.** Remaining work is at the bottom.

**Legend**

- ✅ FIXED — applied this session
- ⏳ DEFERRED — needs structural change (visual layout impact); waiting for owner approval
- ❌ NOT DOING — explicitly scoped out

---

## Naming convention rule (CONFIRMED)

Only **separate Figma component masters that are hidden from the Assets panel** get the dot prefix. Layer names match React export names with **no dot**.

- `.AlertDialog` → COMPONENT, hidden from Assets panel → has dot
- `AlertDialogHeader` → FRAME slot inside `.AlertDialog` → no dot, matches React `<AlertDialogHeader>`

This document and `figma-mapping.md` follow this rule throughout.

---

## ✅ Fixed components

### 1. Alert (`949:962`) — ✅

- ✅ A1: `Frame 1` → `AlertIcon` (8 nodes — fixed the Pattern A bug)
- ✅ A2: inner `.AlertIcon` instance reverted to `Icon` (8 nodes)
- ✅ A3: `Action` → `AlertAction` (8 nodes)
- ✅ A4: `Title` → `AlertTitle` (8 nodes)
- ✅ A5: `Description` → `AlertDescription` (8 nodes)
- ✅ Drop dots: `.AlertContent` → `AlertContent`, `.AlertClose` → `AlertClose` (16 nodes)

### 2. AlertDialog (`882:4166`) — ✅

- ✅ AD1: `Subtitle` → `AlertDialogDescription`
- ✅ AD2: `Title` → `AlertDialogTitle`
- ✅ AD3: `Button` ×2 in footer → `AlertDialogCancel` (left) + `AlertDialogAction` (right)
- ✅ AD5: removed `AlertDialogMedia` from React `alert-dialog.tsx`
- ✅ Drop dots: `.AlertDialogHeader/Footer/Icon` → no dot
- ❌ AD4: `Content` FRAME — left as-is (no React equivalent for the column wrapper inside header)

### 3. Toast (`968:944`) — ✅

- ✅ T1: `Frame 1` → `ToastIcon` (4 nodes)
- ✅ T2: inner `.ToastIcon` instance reverted to `Icon` (4 nodes)
- ✅ Drop dots: `.ToastContent` → `ToastContent`, `.ToastClose` → `ToastClose`
- ✅ `Title` → `ToastTitle`, `Description` → `ToastDescription`

### 4. Card (`3154:4736`) — partially ✅

- ✅ C1: `Title` → `CardTitle` (in Type=Post, Type=Source)
- ✅ C2: literal-string descriptions → `CardDescription`
- ✅ C3: `Button` (Type=Post) → `CardAction`
- ✅ Drop dots: `.CardHeader/Content/Tags/Metadata` → no dot
- ⏳ C5/C6: structural — add `CardHeader`/`CardFooter` slots to all 4 variants. **Plan needed before applying.**
- ⏳ C4: wrap `Icon Button` ×3 (Type=Source) in `CardAction` slot
- ⏳ C7: replace ad-hoc `Badge` FRAME with `Badge` instance (Type=Source)
- ⏳ C8: decide on `.AssetTitle` (separate component) — needs your input

### 5. Tooltip (`1060:3708`) — ✅

- ✅ Drop dots: `.TooltipContent` → `TooltipContent`, `.TooltipArrow` → `TooltipArrow`

### 6. Tag (`3154:4442`) — ✅

- ✅ Drop dots: `.TagIcon`/`.TagRemove`/`.TagDivider` → no dot
- ✅ TG1: `Key` → `TagLabel`
- ✅ TG2: `Value` → `TagValue`

### 7. Empty (`3130:1793`) — ✅

- ✅ Drop dots: `.EmptyHeader` → `EmptyHeader`
- ✅ E4: `.EmptyActions` → `EmptyContent` (matches React)
- ✅ E3: wrapped `GridDash` in `EmptyMedia` FRAME (transparent auto-layout, visual unchanged)

### 8. Slider (`1039:2406`) — ❌ skipped per user

- ❌ Layout structure left untouched (user noted Figma hack would break)

### 9. Progress Bar (`3157:2839`) — ✅

- ✅ P1: `.ProgressBar` master → `.ProgressTrack`
- ✅ Drop dot: `.ProgressIndicator` (frame inside instance) → `ProgressIndicator`
- ✅ P3: `Title` → `ProgressLabel`
- ✅ P4: `50%` → `ProgressValue`
- ✅ `Header` → `ProgressHeader`, `Status` → `ProgressStatus` (added prefix for clarity)

### 10. Tabs (`1048:1469`) — partially ✅

- ✅ Drop dot: `.TabsTrigger` instances → `TabsTrigger`
- ⏳ TB1: add Icon variant slot to `.TabsTrigger` master (structural, deferred)

### 11. Editor Tabs (`3179:5135`) — ✅

- ✅ ET1: `Notebook icon` → `EditorTabIcon` (8 nodes)
- ✅ ET2: `Close icon`/`CloseSmall` standardized → `EditorTabClose` (8 nodes)
- ✅ ET3: `.AssetName` → `EditorTabLabel` (8 nodes)
- ✅ ET4: `Icon Button` (add button) → `EditorTabAddButton`
- ✅ Drop dot: `.EditorTab` instances → `EditorTab` (8 nodes)

### 12. Breadcrumb (`3140:1914`) — ✅

- ✅ BR1: `Label` (Leaf=False) → `BreadcrumbLink`
- ✅ BR2: `Label` (Leaf=True) → `BreadcrumbPage`
- ✅ BR3: `ChevronRight` (instance layer) → `BreadcrumbSeparator`
- ✅ Drop dot: `.BreadcrumbItem` instances → `BreadcrumbItem`

### 13. Page Header (`3247:5956`) — ✅

- ✅ PH1: `.TitleBar` master → `.PageHeaderTitleBar`
- ✅ PH2: `.PageActions` master → `.PageHeaderActions`
- ✅ PH3: first `Icon Button` (back button) → `PageHeaderBack`
- ✅ `Page Title` TEXT → `PageHeaderTitleText`
- ✅ Drop dots from instance layers throughout

### 14. Accordion (`3155:1983`) — ✅

- ✅ AC5: `Close Button` (misleading) → `AccordionTrigger`
- ✅ AC7: `Slot` → `AccordionContent`
- ✅ Drop dot: `.AccordionItem` instances → `AccordionItem`

### 15. Avatar (`1084:1542`) — partially ✅

- ✅ AV1: variant property `Size=Initials/Icon` → `Type=Initials/Icon`
- ✅ Inner `Initials`/`UserOutline` → `AvatarFallback` (matches React `<AvatarFallback>`)
- ⏳ AV2: add Image variant
- ⏳ AV3: add `AvatarBadge` slot
- ⏳ AV4: add Avatar Group component

### 16. Button (master `477:773` / shared `.ActionLabel` `692:557`) — ✅

- ✅ BU1: `Icon` → `ButtonIcon` (in `.ActionLabel`, cascades to all consumers)
- ✅ BU2: `Menu` → `ButtonChevron` (cascades to all consumers)

### 17. DropdownMenu (`787:706` / item master `766:671`) — ✅

- ✅ DM1: `.MenuLabel` master → `.DropdownMenuItemContent`
- ✅ DM2: `.MenuTrailing` master → `.DropdownMenuItemTrailing`
- ✅ DM3: `Icon Wrap` → `DropdownMenuItemIcon`
- ✅ DM4: `Description` → `DropdownMenuItemDescription`
- ✅ DM5: `Count` → `DropdownMenuItemBadge`
- ✅ DM6: `Hint` → `DropdownMenuShortcut`
- ✅ DM7: `Indicator` → `DropdownMenuItemIndicator`
- ✅ Drop dots from `.DropdownMenuItem` instance layers
- ⏳ DM8: structural variants for `DropdownMenuLabel` (section header), `DropdownMenuSeparator`, `DropdownMenuSearch`, `DropdownMenuEmpty`, `DropdownMenuLoading`, `DropdownMenuFooter`

### 18. Dialog (`882:2798`) — ✅

- ✅ D1: `.DialogBody` master → `.DialogContent`
- ✅ D2: `Icon` slot → `DialogHeaderIcon`
- ✅ D3: `Title` → `DialogTitle`
- ✅ D4: `Subtitle` → `DialogDescription`
- ✅ D5: `Close Button` → `DialogClose`
- ✅ D6: `.Slot` → `DialogContentSlot`
- ✅ D7: `Button` ×2 in footer → `DialogCancel` + `DialogAction`
- ✅ Drop dots: `.DialogHeader/.DialogFooter` instance layers → no dot

### 19. Drawer (`1060:3937`) — ⏳ deferred

- ⏳ DR1: restructure as own family (own `.DrawerHeader`/`.DrawerFooter`/`.DrawerTitle`/`.DrawerDescription`/`.DrawerClose`). User said "keep separate" — needs full structural rebuild. **Plan needed before applying.**

### 20. Popover (`1060:3832`) — ✅

- ✅ PO1: `.Slot` → `PopoverContent`
- ✅ PO2: `.Tip` → `PopoverArrow`

### 21. Select (`732:601`) — ✅

- ✅ SE1: `Select` TEXT → `SelectValue` (24 nodes)
- ✅ SE2: `Icon` → `SelectIcon` (24 nodes)
- ✅ SE3: `Chevron` → `SelectChevron` (24 nodes)

### 22. Form Input (`3157:3399`) / Field Label (`3157:2854`) / `.InputContent` (`670:550`) — ✅

- ✅ FI1: `Title` → `FieldLabel`
- ✅ FI2: `*` → `FieldRequired`
- ✅ FI3: `Hint text` → `FieldHint`
- ✅ FI4: `Left Icon` → `InputLeading`
- ✅ FI5: `Right Icon` → `InputTrailing`
- ✅ FI6: `Right Action` → `InputTrailingAction`
- ✅ FI8: `Error text` → `FieldError`

---

## Components audited + fixed (this pass)

### 23. Switch (`717:650`) — ✅

- ✅ `Thumb` ELLIPSE → `SwitchThumb` (across all 20 variants)

### 24. Checkbox (`713:650`) — ✅

- ✅ `Icon` INSTANCE → `CheckboxIndicator` (across all checked/indeterminate variants)

### 25. Radio (`715:650`) — ✅

- ✅ `Dot` ELLIPSE → `RadioIndicator` (across all selected variants)

### 26. Pagination (`3140:1999`) — ✅

- ✅ `Icon Button` (left chevron) → `PaginationPrevious`
- ✅ `Icon Button` (right chevron) → `PaginationNext`
- ✅ `Toggle Button` ×N → `PaginationLink`

### 27. Key Value Pair (`3178:3901`) — ✅

- ✅ `.Value` master → `.KeyValueValue`
- ✅ `Frame 2147226489` (auto-generated) → `KeyValueItems` wrapper
- ✅ Drop dot: `.KeyValueItem` instances → `KeyValueItem`
- ✅ `.Value` instance layers → `KeyValueValue`
- ✅ `Key label` → `KeyValueKey`

---

## Components audited + fixed (this pass, continued)

### 28. DropdownMenu `.MenuRow` cleanup — ✅

- ✅ `.MenuRow` master → `.DropdownMenuRow`
- ✅ Variant `Type=DropdownItem` → `Type=Item`
- ✅ Variant `Type=Section Header` → `Type=Label` + inner `Section header` TEXT → `DropdownMenuLabel`
- ✅ Variant `Type=Divider` → `Type=Separator` + inner `Line` LINE → `DropdownMenuSeparator`
- ✅ Inner `Icon` FRAME (Loading variant) → `DropdownMenuLoadingIcon`
- ✅ Inner `Message` TEXT (Loading variant) → `DropdownMenuLoadingMessage`
- ✅ Inner `No results found.` TEXT (Empty variant) → `DropdownMenuEmpty`

### 29. Combobox / Typeahead Combobox (`811:976`, `842:889`) — ✅

- ✅ `Label`/`Value`/`Select` TEXT → `ComboboxValue`
- ✅ `Label` FRAME (input wrapper in Press/Focus state) → `ComboboxInput`
- ✅ `Badge` INSTANCE → `ComboboxBadge`
- ✅ `Clear` FRAME → `ComboboxClear`
- ✅ `Chevron` INSTANCE → `ComboboxChevron`

### 30. Table (`3157:2794`) — ✅

- ✅ `.Column` master → `.TableColumn`
- ✅ `.Sort` master → `.TableSortButton`
- ✅ `.Content` master → `.TableCellContent`
- ✅ Drop dot: `.Column` instances → `TableColumn`, `.TableCell` instances → `TableCell`, `.Sort` instances → `TableSortButton`, `.Content` instances → `TableCellContent`
- ✅ `Cell value` TEXT → `TableCellContent`
- ✅ `Header label` TEXT → `TableHeadLabel`

### 31. Platform Header (`3225:4233`) — ✅

- ✅ `.Workspace nav` master → `.PlatformHeaderLeft`
- ✅ `.PlatformActions` master → `.PlatformHeaderRight`
- ✅ `.Databricks` master → `.DatabricksLogo`
- ✅ `Section label` TEXT → `PlatformHeaderBadge`
- ✅ Drop dot: `.PlatformHeaderLeft`/`.PlatformHeaderRight`/`.DatabricksLogo` instance layers → no dot

### 32. Platform Nav / Navbar (`3179:14163`) — ✅

- ✅ `.NavItem` master → `.NavbarItem`
- ✅ `.NavSection` master → `.NavbarSection`
- ✅ `.Section header` FRAME → `NavbarSectionHeader`
- ✅ `Notebook icon` INSTANCE (in NavbarItem) → `NavbarItemIcon`
- ✅ `Notebook icon` INSTANCE (in NavbarSectionHeader, the chevron) → `NavbarSectionHeaderChevron`
- ✅ `Section text` TEXT → `NavbarItemLabel`
- ✅ `Section title` TEXT → `NavbarSectionHeaderTitle`
- ✅ `Button` (top, workspace switcher) → `NavbarNewButton`
- ✅ `Section` FRAME (primary section at top) → `NavbarPrimarySection`
- ✅ Drop dot: `.NavItem`/`.NavSection` instance layers → no dot

> **Note**: the public Figma component is still named `Platform Nav` (matches user-facing language). The React file is `navbar.tsx` exporting `Navbar`, `NavbarSection`, `NavbarItem`, etc. Inner masters and layers now match React naming.

### 33. SegmentControl (`481:661`) — ✅

- ✅ Variant `Variant=Slider` → `Variant=Default` (matches React `variant="default"`)
- ⏳ Outline variant not yet in Figma — designers will add when needed

### 34. Split Button (`580:527`) — ✅

- ✅ `Icon Button` (menu trigger / chevron) → `SplitButtonMenuTrigger`

### 35-37. Status / Icon Button / Aspect Ratio — ✓ no naming gaps

- Inner icons already use meaningful names (Info, Warning, Danger, Plus, etc.)
- Variant property names already match React conventions

### 38-40. Skeleton / Spinner / Separator — ✓ trivial

- Single visual element each, no inner gaps

### 41. Field / Label — ✓ no gaps

- Field is auxiliary; Label master inner already aligned (FieldLabel, FieldRequired, FieldHint)

---

## Pending structural changes — user decisions


| #   | Component                                                  | Decision                                                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Card** — add `CardHeader`/`CardFooter` to all 4 variants | ❌ NOT DOING (user inspected, would be chaotic)                                                                                                                                                                                            |
| 2   | **Drawer** — full restructure as its own family            | ⏳ User will do manually later. Intended structure documented in `figma-mapping.md`.                                                                                                                                                       |
| 3   | **Tabs** — add Icon variant slot                           | ⏳ User will add manually                                                                                                                                                                                                                  |
| 4   | **Empty** — wrap `GridDash` in `EmptyMedia` FRAME          | ✅ DONE (transparent wrapper, visual unchanged)                                                                                                                                                                                            |
| 5   | **Avatar** — Image variant, AvatarBadge slot, AvatarGroup  | ❌ NOT DOING (not on platform yet)                                                                                                                                                                                                         |
| 6   | **DropdownMenu** — additional row types                    | The unified `.MenuRow` master already covers this with type variants. **Recommend** rename `.MenuRow` → `.DropdownMenuRow` and clean up variant value names (`Section Header` → `Label`, `Divider` → `Separator`). Pending user approval. |


---

## React-side changes applied

- `packages/dbui/src/components/ui/alert-dialog.tsx`: removed `AlertDialogMedia` export.

