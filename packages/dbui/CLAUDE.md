# DBUI — AI Rules

> When you see this file in a project, DBUI is already installed. The `./dbui/` and `./dbui-shells/` folders contain all components, icons, and tokens. Read this file before writing any UI code.
>
> Not installed yet? Setup lives at https://dbuidesign.vercel.app/install — fetch that URL and follow it.

---

## Rules

1. **DBUI components only.** Never use raw `<button>`, `<input>`, `<div role="dialog">`. If it exists in DBUI, use it.
2. **DBUI icons only.** Never install lucide, heroicons, or any icon package. All 451 icons are in `dbui/components/icons/`.
3. **Semantic tokens only.** Never hardcode hex colors or pixel values. Use `bg-action-primary-base`, `text-text-base`, `rounded-sm`, etc.
4. **Base UI `render` prop.** Not Radix `asChild`. Example: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`
5. **Shell first.** Every page starts with `<Base>`. Never build header/nav/chrome from scratch.
6. **Tree for hierarchies.** Never fake trees with nested divs or NavbarItems. Use `<DataTreeView>` or `<FileTreeView>`.

## Where to look

**Read these BEFORE writing any UI.** They're the discovery layer; the JSDoc on each component is the rules layer.


| When you need to...                                                  | Read                                                                                                                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Pick the right component                                             | `./dbui/docs/component-index.md` — searchable component table (category, when to use, avoid for, synonyms)             |
| Find the right icon                                                  | `./dbui/docs/icon-index.md` — searchable 449-icon index                                                                |
| Pick a page-level layout / shell                                     | `./dbui/composition.md` — five named shells with regions, scaling, scroll, primary action                              |
| Write any user-facing copy                                           | `./dbui/docs/brandvoice.md` — vocabulary, tone, microcopy templates                                                    |
| Apply cross-cutting layout/spacing rules                             | `./dbui/docs/component-rules.md` — spacing rhythm, page padding, icon selection, button rules                          |
| Read full guidelines/constraints for a specific component            | `./dbui/src/components/ui/<name>.tsx` — `@guideline` and `@constraint` JSDoc at the top of the file                    |
| Get entity icons for trees                                           | `./dbui/src/components/icons/entity-icons.ts` — never guess these                                                      |
| See token values                                                     | `./dbui/src/tokens/globals.css`                                                                                        |
| Browse all components live                                           | [https://dbuidesign.vercel.app](https://dbuidesign.vercel.app)                                                         |


**Single source of truth:** per-component rules live ONLY in the component's JSDoc. Per-icon details live ONLY in `icon-index.md`. Cross-cutting layout rules live ONLY in `component-rules.md`. Shell-level composition lives ONLY in `composition.md`. Voice/tone lives ONLY in `brandvoice.md`. If something feels duplicated, the more specific source wins (JSDoc > index > CLAUDE.md).

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
│ Platform Header (48px, bg-surface-subtle)                    │
├────────┬────────────────────────────────────────────┤
│Sidebar │ Content surface (bg-background, rounded-md)│
│180px   │                                            │
│bg-surface-subtle│ ┌─ Breadcrumb ──────────────────────────┐  │
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


| You see                           | Use                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| Left sidebar with product icons   | `Navbar` + `NavbarItem` (every item MUST have an icon)                              |
| Expandable tree (catalogs, files) | `DataTreeView` or `FileTreeView` — read entity-icons.ts for correct icons           |
| Tabs below a title                | `Tabs` + `TabsList` + `TabsTrigger`                                                 |
| Data table with headers           | `Table` + `TableHeader` + `TableBody`                                               |
| Right sidebar with metadata       | `KeyValuePair` + `Separator` sections, 13px semibold headers                        |
| Breadcrumb path                   | `Breadcrumb` + `BreadcrumbList` + `BreadcrumbItem`                                  |
| Blue filled button                | `Button` (variant="default" — this is the primary style)                            |
| Bordered button                   | `Button variant="outline"`                                                          |
| Button with chevron               | `Button` + `ButtonChevron` (menu trigger — use outline, never primary)              |
| Button with leading icon          | `Button` + `ButtonIcon` wrapper                                                     |
| Green checkmark badge             | `<Badge variant="outline"><CertifiedFill className="text-success" />`               |
| Status dot                        | `Status` (12 statuses: online, running, error, etc.)                                |
| Modal/dialog                      | `Dialog` (task) or `AlertDialog` (confirmation — can't dismiss by clicking outside) |
| Slide-out panel                   | `Drawer`                                                                            |
| Dropdown with options             | `DropdownMenu` — always `align="start"`, destructive items last                     |
| Select picker                     | `Select` (≤10 options) or `Combobox` (>10 or needs search)                          |
| Tag/chip                          | `Tag` (removable, key:value) or `Badge` (read-only label)                           |
| Toast notification                | `toast.success()` / `toast.error()` from sonner                                     |
| Loading rows                      | `Skeleton` inside `TableCell`                                                       |
| Empty state with icon             | `Empty` (title + description + optional action button)                              |
| Search + filter bar               | `InputGroup` + `InputGroupAddon` + `InputGroupButton`                               |


## Patterns LLMs get wrong

These are the #1 mistakes from our audit. Internalize them.

**Icon-only buttons use `text-text-subtle` automatically:**

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
  <span className="text-[12px] text-text-subtle">Helper text here</span>
</div>
```

## Typography reminder

Databricks base is **13px**, not 14px or 16px. Body: `text-[13px] leading-[20px]`. Labels: same + `font-semibold`. Captions: `text-[12px] leading-[16px] text-text-subtle`. Page title: `text-[22px] font-semibold`. Section heading: `text-[18px] font-semibold`.

Full type system → `./dbui/docs/component-rules.md`.

## Before you commit

Scan your output for these violations:

**Code:**

- `from "lucide-react"` (or any other icon pkg) → use `from "dbui/components/icons/<Name>"`
- `bg-[#` or `text-[#` or any hex/rgb/oklch → semantic token (`bg-action-primary-base`, `text-text-base`, …)
- Lowercase `<button`, `<input`, `<select>`, `<dialog>`, `<details>` → DBUI component
- `asChild` → `render={<Component />}`
- Nested `<div>` faking a tree → `DataTreeView` or `FileTreeView`
- `text-sm` → `text-[13px]` (Databricks base is 13px, not 14px)
- `font-medium` → `font-semibold` (Databricks uses 600, not 500)
- No `<Base>` wrapper → add it, every page needs it
- Component picked without checking `docs/component-index.md` first → check; if no match, flag the gap

**Copy:** (run brand-voice checklist from `docs/brandvoice.md`)

- Emoji in product UI → remove
- Exclamation marks → remove
- Banned words: `utilize`, `leverage`, `seamless`, `robust`, `simply`, `just`, `please`, `kindly` → rewrite
- Title Case in headings → sentence case
- Generic OK/Yes/No buttons → use the action verb (`Delete`, `Save`, `Cancel`)
- "Are you sure?" / "Something went wrong" → state the action and the consequence; state the cause and the next step

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

To get the latest components, tokens, and icons, run the **same idempotent sync block** that does the first install:

```bash
if [ -d ~/dbui/.git ]; then
  (cd ~/dbui && git pull --ff-only)
else
  git clone https://github.com/muditmittal/dbui.git ~/dbui
fi
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
```

This block is the install path AND the update path — re-run it whenever you want to refresh DBUI.

**Do NOT auto-copy `./dbui/CLAUDE.md` to the project root** during updates — that would overwrite any customizations the user made. If the user explicitly asks to refresh AI rules, copy it; otherwise leave the root `CLAUDE.md` alone.

