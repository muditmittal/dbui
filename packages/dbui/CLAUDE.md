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

## Screenshot → Code

When given a screenshot of Databricks UI to implement:

| You see | Use |
|---------|-----|
| Left sidebar with product icons | `Navbar` + `NavbarItem` |
| Expandable tree (catalogs, files) | `DataTreeView` or `FileTreeView` |
| Tabs below a title | `Tabs` + `TabsList` + `TabsTrigger` |
| Data table | `Table` + `TableHeader` + `TableBody` |
| Right sidebar with metadata | `KeyValuePair` + `Separator` sections |
| Modal/dialog | `Dialog` (task) or `AlertDialog` (confirmation) |
| Slide-out panel | `Drawer` |
| Dropdown with options | `DropdownMenu` |
| Select picker | `Select` (≤10) or `Combobox` (>10) |
| Status dot | `Status` |
| Tag/chip | `Tag` (removable) or `Badge` (read-only) |
| Toast notification | `toast()` from sonner |
| Loading placeholder | `Skeleton` (known shape) or `Spinner` (indeterminate) |
| Empty state | `Empty` |

## Before you commit

Scan your output for these violations:
- `from "lucide-react"` → replace with `from "@muditmittal/dbui/components/icons/..."`
- `bg-[#` or `text-[#` → replace with semantic token
- `<button` or `<input` (lowercase) → replace with DBUI component
- `asChild` → replace with `render={<Component />}`
- Nested `<div>` faking a tree → replace with `DataTreeView`

## Import pattern

```tsx
import { Button, ButtonIcon } from "@muditmittal/dbui/components/ui/button"
import { Search } from "@muditmittal/dbui/components/icons/Search"
```

CSS setup (one-time in root stylesheet):
```css
@import "tailwindcss";
@import "@muditmittal/dbui/tokens/globals.css";
```
