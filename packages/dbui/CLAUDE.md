# DBUI — AI Rules

> Copy this file to your project root. Claude will follow these rules automatically.

## Rules

1. **DBUI components only.** Never use raw `<button>`, `<input>`, `<div role="dialog">`. If it exists in DBUI, use it.
2. **DBUI icons only.** Never install lucide, heroicons, or any icon package. All 456 icons are in `@muditmittal/dbui/components/icons/`.
3. **Semantic tokens only.** Never hardcode hex colors or pixel values. Use `bg-primary`, `text-foreground`, `rounded-sm`, etc.
4. **Base UI `render` prop.** Not Radix `asChild`. Example: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`
5. **Tree for hierarchies.** Never fake trees with nested divs or NavbarItems. Use `<DataTreeView>` or `<FileTreeView>`.

## Where to look

| When you need to... | Read this file |
|---------------------|----------------|
| Find the right component | `node_modules/@muditmittal/dbui/llms.txt` → "When to use what" table |
| Compose a page layout | `node_modules/@muditmittal/dbui/llms.txt` → "COMPOSITION RECIPES" |
| Find an icon by concept | `grep "use:object concept" node_modules/@muditmittal/dbui/src/components/icons/` |
| Get entity icons for trees | `node_modules/@muditmittal/dbui/src/components/icons/entity-icons.ts` |
| Check component props | `node_modules/@muditmittal/dbui/llms.txt` → "Key props for stateful components" |
| See token values | `node_modules/@muditmittal/dbui/src/tokens/globals.css` |

## Databricks page anatomy

Every Databricks product page follows this structure. Use it as your starting point.

```
┌─────────────────────────────────────────────────────┐
│ Platform Header (48px, bg-muted)                    │
├────────┬────────────────────────────────────────────┤
│Sidebar │ Content surface (bg-background, rounded-lg)│
│180px   │                                            │
│bg-muted│ ┌─ Breadcrumb ──────────────────────────┐  │
│        │ │ Catalog > main > users                │  │
│Navbar  │ ├─ Title row ───────────────────────────┤  │
│  items │ │ Icon + Name          Actions buttons  │  │
│  with  │ ├─ Tabs ────────────────────────────────┤  │
│  icons │ │ Overview | Details | Permissions       │  │
│        │ ├─ Tab content ─────────────────────────┤  │
│        │ │                                       │  │
│        │ │ (table, form, cards, etc.)            │  │
│        │ │                                       │  │
│        │ └───────────────────────────────────────┘  │
├────────┴────────────────────────────────────────────┤
```

For detail pages (Catalog Explorer, table details), add a tree panel and metadata sidebar:
- **Left (260px):** Tree header + search + `<DataTreeView>`
- **Center (flex-1):** Breadcrumb → title → tabs → content
- **Right (280px):** `<KeyValuePair>` sections separated by `<Separator>`

Each column scrolls independently.

## Screenshot → Code

When given a screenshot of Databricks UI to implement:

| You see | Use |
|---------|-----|
| Left sidebar with product icons | `Navbar` + `NavbarItem` (every item MUST have an icon) |
| Expandable tree (catalogs, files) | `DataTreeView` or `FileTreeView` — read entity-icons.ts for correct icons |
| Tabs below a title | `Tabs` + `TabsList` + `TabsTrigger` |
| Data table with headers | `Table` + `TableHeader` + `TableBody` |
| Right sidebar with metadata | `KeyValuePair` + `Separator` sections, 13px semibold headers |
| Breadcrumb path | `Breadcrumb` + `BreadcrumbList` + `BreadcrumbItem` |
| Blue filled button | `Button` (variant="default" — this is the primary style) |
| Bordered button | `Button variant="outline"` |
| Button with chevron | `Button` + `ButtonChevron` (menu trigger — use outline, never primary) |
| Button with leading icon | `Button` + `ButtonIcon` wrapper |
| Green checkmark badge | `<Badge variant="outline"><CertifiedFill className="text-success" />` |
| Status dot | `Status` (12 statuses: online, running, error, etc.) |
| Modal/dialog | `Dialog` (task) or `AlertDialog` (confirmation — can't dismiss by clicking outside) |
| Slide-out panel | `Drawer` |
| Dropdown with options | `DropdownMenu` — always `align="start"`, destructive items last |
| Select picker | `Select` (≤10 options) or `Combobox` (>10 or needs search) |
| Tag/chip | `Tag` (removable, key:value) or `Badge` (read-only label) |
| Toast notification | `toast.success()` / `toast.error()` from sonner |
| Loading rows | `Skeleton` inside `TableCell` |
| Empty state with icon | `Empty` (title + description + optional action button) |
| Search + filter bar | `InputGroup` + `InputGroupAddon` + `InputGroupButton` |

## Patterns LLMs get wrong

These are the #1 mistakes from our audit. Internalize them.

**Icon-only buttons use `text-muted-foreground` automatically:**
```tsx
// Size icon-md or icon-sm makes the icon muted — don't add the class yourself
<Button size="icon-md" variant="ghost" aria-label="Search"><Search /></Button>
```

**Icons inside label buttons also muted — use ButtonIcon wrapper:**
```tsx
<Button variant="outline">
  <ButtonIcon><Share /></ButtonIcon>   {/* ← muted automatically */}
  Share
  <ButtonChevron />                    {/* ← trailing menu chevron */}
</Button>
```

**Menu item consistency — if one has an icon, ALL must:**
```tsx
<DropdownMenuContent align="start">
  <DropdownMenuItem><DropdownMenuItemIcon><Pencil /></...>Edit</DropdownMenuItem>
  <DropdownMenuItem><DropdownMenuItemIcon><Copy /></...>Duplicate</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive"><DropdownMenuItemIcon><Trash /></...>Delete</DropdownMenuItem>
</DropdownMenuContent>
```

**Tree nodes always need entity icons — never guess:**
```tsx
import { dataEntityIcons } from "@muditmittal/dbui/components/icons/entity-icons"

const nodes = [
  { id: "cat1", label: "main", icon: dataEntityIcons.catalogWorkspace, children: [
    { id: "schema1", label: "default", icon: dataEntityIcons.schema, children: [
      { id: "tbl1", label: "users", icon: dataEntityIcons.table },
    ]}
  ]}
]
<DataTreeView sections={[{ label: "My organization", nodes }]} />
```

**Form fields — label above, helper below, error replaces helper:**
```tsx
<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter name" />
  <span className="text-[12px] text-muted-foreground">Helper text here</span>
</div>
```

## Typography (Databricks uses 13px base, not 14px or 16px)

| Use | Class |
|-----|-------|
| Body text, input values | `text-[13px] leading-[20px]` |
| Labels, emphasis | `text-[13px] leading-[20px] font-semibold` |
| Captions, helper text | `text-[12px] leading-[16px] text-muted-foreground` |
| Page titles | `text-[22px] font-semibold` |
| Section headings | `text-[18px] font-semibold` |

## Before you commit

Scan your output for these violations:
- `from "lucide-react"` → replace with `from "@muditmittal/dbui/components/icons/..."`
- `bg-[#` or `text-[#` → replace with semantic token
- `<button` or `<input` (lowercase) → replace with DBUI component
- `asChild` → replace with `render={<Component />}`
- Nested `<div>` faking a tree → replace with `DataTreeView`
- `text-sm` → replace with `text-[13px]` (Databricks base is 13px, not 14px)
- `font-medium` → replace with `font-semibold` (Databricks uses 600, not 500)

## Import pattern

```tsx
import { Button, ButtonIcon, ButtonChevron } from "@muditmittal/dbui/components/ui/button"
import { DataTreeView } from "@muditmittal/dbui/components/ui/data-tree"
import { Search } from "@muditmittal/dbui/components/icons/Search"
import { dataEntityIcons } from "@muditmittal/dbui/components/icons/entity-icons"
```

CSS setup (one-time in root stylesheet):
```css
@import "tailwindcss";
@import "@muditmittal/dbui/tokens/globals.css";
```
