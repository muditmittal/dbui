# DBUI — AI Rules

> When you open a project and see this file, DBUI is already installed. The `dbui/` and `dbui-shells/` folders contain all components, icons, and tokens. Start building immediately.

## First-Time Setup (LLM does this automatically — skip any step already done)

Check each condition before acting. Do not recreate anything that already exists.

1. **If no `package.json` exists**, scaffold a React project first:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint --no-import-alias
   ```

2. **If `tsconfig.json` doesn't have `dbui/*` paths**, add them:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "dbui/*": ["./dbui/src/*"],
         "dbui-shells/*": ["./dbui-shells/src/*"]
       }
     }
   }
   ```
   If using webpack/vite, also add equivalent resolve aliases in bundler config.

3. **If root CSS doesn't import DBUI tokens**, add:
   ```css
   @import "tailwindcss";
   @import "./dbui/src/tokens/globals.css";
   ```

4. **Install the one required dependency:**
   ```bash
   npm install @base-ui/react
   ```

5. **If no page renders the Base Shell yet**, create one (e.g., `app/page.tsx`):
   ```tsx
   import { Base } from "dbui-shells"

   export default function Home() {
     return (
       <Base defaultActive="catalog">
         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
           <p style={{ fontSize: 13, color: "#6F6F6F" }}>DBUI is installed. Start building here.</p>
         </div>
       </Base>
     )
   }
   ```

6. **Start the dev server:** `npm run dev`

After setup, the designer should see the full Databricks shell running locally.

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
| Find the right component | `./dbui/llms.txt` → "When to use what" table |
| Compose a page layout | `./dbui/llms.txt` → "COMPOSITION RECIPES" |
| Find an icon by concept | `./dbui/docs/icon-index.md` — canonical 449-icon index |
| Get entity icons for trees | `./dbui/src/components/icons/entity-icons.ts` |
| Check component props | `./dbui/llms.txt` → "Key props for stateful components" |
| See token values | `./dbui/src/tokens/globals.css` |
| Browse all components | https://dbuidesign.vercel.app |

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
@import "./dbui/src/tokens/globals.css";
```

## Updating DBUI

To get the latest components, tokens, and icons:
```bash
cd ~/dbui && git pull
cp -r ~/dbui/packages/dbui ./dbui && cp -r ~/dbui/packages/dbui-shells ./dbui-shells
```
