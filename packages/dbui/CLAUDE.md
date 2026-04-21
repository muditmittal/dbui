# DBUI — AI Rules

> When you open a new project and see this file, follow the setup instructions first, then build with DBUI.

## First-Time Project Setup (do this automatically)

If this project does NOT yet have DBUI configured (no `dbui` path alias in tsconfig, no globals.css import), run these steps:

1. **Check if the DBUI repo exists locally:**
   ```bash
   ls ~/dbui/packages/dbui/src/components/ui/button.tsx
   ```
   If it doesn't exist, clone it:
   ```bash
   git clone https://github.com/muditmittal/dbui.git ~/dbui
   cd ~/dbui && yarn install
   ```

2. **Add path aliases** to this project's `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "dbui/*": ["../../../dbui/packages/dbui/src/*"],
         "dbui-shells/*": ["../../../dbui/packages/dbui-shells/src/*"]
       }
     }
   }
   ```
   Adjust the relative path based on this project's location relative to `~/dbui`. If using webpack/vite/next, also add resolve aliases in the bundler config:
   ```js
   // next.config.ts or webpack config
   resolve: {
     alias: {
       "dbui": path.resolve(os.homedir(), "dbui/packages/dbui/src"),
       "dbui-shells": path.resolve(os.homedir(), "dbui/packages/dbui-shells/src"),
     }
   }
   ```

3. **Import tokens** in the project's root CSS file:
   ```css
   @import "tailwindcss";
   @import "dbui/tokens/globals.css";
   ```

4. **Install peer dependencies** if not already present:
   ```bash
   npm install react react-dom @base-ui/react class-variance-authority clsx tailwindcss
   ```

Once configured, all `dbui/...` and `dbui-shells/...` imports will resolve. You only need to do this once per project.

---

## Rules

1. **DBUI components only.** Never use raw `<button>`, `<input>`, `<div role="dialog">`. If it exists in DBUI, use it.
2. **DBUI icons only.** Never install lucide, heroicons, or any icon package. All 451 icons are in `dbui/components/icons/`.
3. **Semantic tokens only.** Never hardcode hex colors or pixel values. Use `bg-primary`, `text-foreground`, `rounded-sm`, etc.
4. **Base UI `render` prop.** Not Radix `asChild`. Example: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`
5. **Shell first.** Every page starts with `<Base>`. Never build header/nav/chrome from scratch.
6. **Tree for hierarchies.** Never fake trees with nested divs or NavbarItems. Use `<DataTreeView>` or `<FileTreeView>`.

## Where to look

| When you need to... | Read this file |
|---------------------|----------------|
| Find the right component | `~/dbui/packages/dbui/llms.txt` → "When to use what" table |
| Compose a page layout | `~/dbui/packages/dbui/llms.txt` → "COMPOSITION RECIPES" |
| Find an icon by concept | `~/dbui/icon-index.csv` — canonical 449-icon index |
| Get entity icons for trees | `~/dbui/packages/dbui/src/components/icons/entity-icons.ts` |
| Check component props | `~/dbui/packages/dbui/llms.txt` → "Key props for stateful components" |
| See token values | `~/dbui/packages/dbui/src/tokens/globals.css` |
| Browse all components | Run `cd ~/dbui && yarn workspace portal storybook` |

## Every page starts with the Base Shell

```tsx
import { Base } from "dbui-shells"

<Base defaultActive="catalog">
  {/* Your page content goes here */}
</Base>
```

The Shell provides:
- **Platform Header** (48px) — sidebar toggle, search, workspace switcher, Genie Code, app switcher, profile menu
- **Platform Nav** (180px sidebar) — collapsible, with all nav items grouped by category
- **Content Surface** — white rounded panel where your page lives
- **Assistant Panel** — Genie Code side panel, toggled from header

## Databricks page anatomy

```
┌─────────────────────────────────────────────────────┐
│ Platform Header (48px, bg-muted)                    │
├────────┬────────────────────────────────────────────┤
│Sidebar │ Content surface (bg-background, rounded-md)│
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
  <DropdownMenuItem><DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>Edit</DropdownMenuItem>
  <DropdownMenuItem><DropdownMenuItemIcon><Copy /></DropdownMenuItemIcon>Duplicate</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive"><DropdownMenuItemIcon><Trash /></DropdownMenuItemIcon>Delete</DropdownMenuItem>
</DropdownMenuContent>
```

**Tree nodes always need entity icons — never guess:**
```tsx
import { dataEntityIcons } from "dbui/components/icons/entity-icons"

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
- `from "lucide-react"` → replace with `from "dbui/components/icons/..."`
- `bg-[#` or `text-[#` → replace with semantic token
- `<button` or `<input` (lowercase) → replace with DBUI component
- `asChild` → replace with `render={<Component />}`
- Nested `<div>` faking a tree → replace with `DataTreeView`
- `text-sm` → replace with `text-[13px]` (Databricks base is 13px, not 14px)
- `font-medium` → replace with `font-semibold` (Databricks uses 600, not 500)
- No `<Base>` wrapper → add it, every page needs it

## Import pattern

```tsx
import { Base } from "dbui-shells"
import { Button, ButtonIcon, ButtonChevron } from "dbui/components/ui/button"
import { DataTreeView } from "dbui/components/ui/data-tree"
import { Search } from "dbui/components/icons/Search"
import { dataEntityIcons } from "dbui/components/icons/entity-icons"
```

CSS setup (one-time in root stylesheet):
```css
@import "tailwindcss";
@import "dbui/tokens/globals.css";
```

## Updating DBUI

To get the latest components, tokens, and icons:
```bash
cd ~/dbui && git pull
```
All projects referencing `~/dbui` pick up changes immediately.
