# DBUI Enforcement Rules

These rules are NON-NEGOTIABLE. Violating any of them invalidates the output.

## Rule 1: DBUI Components Only

EVERY UI element MUST use a DBUI component. Never create raw HTML.

```
WRONG: <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
RIGHT: <Button>Save</Button>

WRONG: <input type="text" className="border rounded px-3 py-2" />
RIGHT: <Input placeholder="Enter value" />

WRONG: <div className="flex items-center gap-2 p-4 border rounded-lg bg-yellow-50">
RIGHT: <Alert variant="warning"><AlertIcon><WarningFill /></AlertIcon>...

WRONG: <div className="fixed inset-0 bg-black/50"><div className="bg-white rounded-lg p-6">
RIGHT: <Dialog><DialogContent>...
```

If you think a component doesn't exist, search `@muditmittal/dbui/components/ui/` first. The component index in the API reference above lists ALL 46+ components.

## Rule 2: DBUI Icons Only

NEVER install lucide-react, heroicons, react-icons, or any icon package.
ALL 456 icons are in `@muditmittal/dbui/components/icons/{Name}`.

```
WRONG: import { Search } from "lucide-react"
RIGHT: import { Search } from "@muditmittal/dbui/components/icons/Search"
```

To find the right icon, grep by concept:
```bash
grep "use:object Experiment" node_modules/@muditmittal/dbui/src/components/icons/
grep "use:action delete" node_modules/@muditmittal/dbui/src/components/icons/
```

For entity icons (catalogs, schemas, tables), ALWAYS use entity-icons.ts:
```typescript
import { dataEntityIcons, fileEntityIcons, columnTypeIcons } from "@muditmittal/dbui/components/icons/entity-icons"
```

## Rule 3: Semantic Tokens Only

NEVER hardcode colors, spacing, or radius.

```
WRONG: bg-[#2272B4]  text-[#C82D4C]  border-[#EBEBEB]  rounded-[4px]  p-[12px]
RIGHT: bg-primary     text-destructive border-border      rounded-sm     px-3
```

Import tokens in your root CSS:
```css
@import "@muditmittal/dbui/tokens/globals.css";
```

## Rule 4: Base UI Trigger Pattern

DBUI uses Base UI, not Radix. Triggers use `render` prop, NOT `asChild`:

```
WRONG: <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
RIGHT: <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
```

## Rule 5: Tree for Hierarchies

For ANY hierarchical data (catalogs, files, schemas, folders), use the Tree component:

```
WRONG: Nested <NavbarItem> with manual pl-4 indentation
WRONG: Recursive <div> with expand/collapse state
RIGHT: <DataTreeView sections={...} /> for catalog browsing
RIGHT: <FileTreeView nodes={...} /> for file browsing
```

Entity icons for tree nodes come from `entity-icons.ts`. NEVER guess icon names.

## Rule 6: Composition Patterns

Follow these mandatory composition rules:

- **Link button variant**: NO icons (only exception: trailing NewWindow for external links)
- **Menu triggers**: outline or secondary variant, never primary. The chevron is the affordance.
- **Dropdown menus**: left-align with trigger (`align="start"`)
- **If one menu item has an icon**: ALL items in that group must have icons
- **Destructive menu items**: always last, always preceded by separator
- **AlertDialog for confirmations**: can't be dismissed by overlay click (not Dialog)
- **Max one Primary button** per visible area
- **Error messages replace helper text**: never stack both below an input
- **Icon-only buttons**: MUST have aria-label for accessibility

## Rule 7: Screenshot-to-Component Mapping

When given a Databricks screenshot to implement:

| Visual element | DBUI component |
|---------------|----------------|
| Blue filled button | `<Button>` (variant="default") |
| Bordered button | `<Button variant="outline">` |
| Text-only button | `<Button variant="link">` |
| Left sidebar with product icons | `<Navbar>` + `<NavbarItem>` |
| Expandable tree with catalog icons | `<DataTreeView>` |
| Search + filter bar | `<InputGroup>` |
| Tabs below a title | `<Tabs>` + `<TabsList>` + `<TabsTrigger>` |
| Data table with headers | `<Table>` + `<TableHeader>` + `<TableBody>` |
| Right sidebar with key-value metadata | `<KeyValuePair>` + `<Separator>` |
| Green checkmark badge | `<Badge variant="outline"><CertifiedFill className="text-success" />` |
| Status dot (green/red/yellow) | `<Status status="success">` |
| Breadcrumb path | `<Breadcrumb>` |
| Page pagination | `<Pagination>` |
| Toast/snackbar | `toast.success()` / `toast.error()` (sonner) |
| Modal/dialog | `<Dialog>` |
| Confirmation popup | `<AlertDialog>` |
| Slide-out panel | `<Drawer>` |
| Dropdown with options | `<DropdownMenu>` |
| Select picker | `<Select>` (≤10 options) or `<Combobox>` (>10) |
| Loading skeleton | `<Skeleton>` |
| Empty state | `<Empty>` |
| Tag/chip | `<Tag>` (removable) or `<Badge>` (read-only) |
