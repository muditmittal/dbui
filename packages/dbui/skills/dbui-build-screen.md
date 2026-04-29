---
name: dbui-build-screen
description: Build a full Databricks product screen from a screenshot, description, or design brief. Triggers when asked to "build a page", "implement this screen", "create a view", given a screenshot of Databricks UI, or asked to compose multiple DBUI components into a full layout. This is the primary screen-building workflow.
---

# Build a screen with DBUI

## When to use

- Given a screenshot of Databricks UI to implement
- Asked to "build a page", "create a screen", "make a dashboard view"
- Composing multiple DBUI components into a full product surface

## Procedure

### Phase 1 — Identify the shell

1. Read `./dbui/composition.md`. Identify which of the five shells matches the layout:
   - **Shell A (List)** — tabular list with filters. Used for: Jobs list, Compute list, Pipelines list.
   - **Shell B (Data Tree)** — left tree + center content + optional right metadata. Used for: Catalog Explorer.
   - **Shell C (File Tree)** — file browser layout. Used for: Workspace file browser.
   - **Shell D (Editor)** — editor-centric, nav hidden by default. Used for: Notebook, SQL Editor.
   - **Shell E (Asset Detail)** — three-column detail: tree (260px) + main (flex-1) + metadata sidebar (280px). Used for: Table details, Model details.

2. If unsure, default to Shell A (most common). Every shell starts with `<Base>` from `dbui-shells`.

### Phase 2 — Map regions to components

For each region of the identified shell, determine which DBUI component fills it.

1. Read `./dbui/docs/component-index.md` and search by the region's purpose.
2. Use the `dbui-pick-component` skill if you're uncertain about a specific region.
3. Use the `dbui-pick-icon` skill for every icon — never guess.

**Common region → component mappings:**

| You see in the screenshot | Region | DBUI component |
|---|---|---|
| Left sidebar with product icons | Nav | `Navbar` + `NavbarItem` (every item MUST have an icon) |
| Expandable tree (catalogs, files) | Tree panel | `DataTreeView` or `FileTreeView` + entity icons from `entity-icons.ts` |
| Tabs below a title | Content header | `Tabs` + `TabsList` + `TabsTrigger` |
| Data table with headers | Content body | `Table` + `TableHeader` + `TableBody` |
| Right sidebar with metadata | Metadata panel | `KeyValuePair` + `Separator` sections, 13px semibold headers |
| Breadcrumb path | Content header | `Breadcrumb` + `BreadcrumbList` + `BreadcrumbItem` |
| Blue filled button | Action | `Button` (variant="default" — this is the primary style) |
| Bordered button | Action | `Button variant="outline"` |
| Search + filter bar | Filter region | `InputGroup` + `InputGroupAddon` + `InputGroupButton` |
| Empty state with icon + message | Content body | `Empty` (title + description + optional action button) |
| Loading rows | Content body | `Skeleton` inside `TableCell` |

### Phase 3 — Write the code

1. **Start with `<Base>`.** Every page wraps in it:
   ```tsx
   import { Base } from "dbui-shells"

   <Base defaultActive="catalog">
     {/* page content here */}
   </Base>
   ```

2. **Import from `dbui/components/ui/*`** and `dbui/components/icons/*`. Never from @radix-ui, @base-ui, lucide, heroicons.

3. **Use semantic tokens only.** `bg-primary`, `text-foreground`, `border-border`. Never hardcode hex.

4. **Base font is 13px, not 14px.** Body: `text-[13px] leading-[20px]`. Labels: `text-[13px] leading-[20px] font-semibold`. Captions: `text-[12px] leading-[16px] text-muted-foreground`.

5. **Spacing rhythm: 8 / 16 / 24.** Inside a component: `gap-2`. Between fields: `gap-4`. Between blocks: `gap-6`. Page padding: `px-6 py-4`.

### Phase 4 — Validate

Run this checklist before considering the screen complete:

**Components:**
- [ ] Every interactive element uses a DBUI component (no raw `<button>`, `<input>`, etc.)
- [ ] Every icon was looked up in `icon-index.md`, not guessed
- [ ] Tree nodes use entity icons from `entity-icons.ts`
- [ ] Menu items: if one has an icon, ALL must have icons
- [ ] `asChild` is not used anywhere — use `render={<Component />}` instead

**Layout:**
- [ ] Page wraps in `<Base>` from `dbui-shells`
- [ ] Surfaces: shell background is `bg-muted`, content surface is `bg-background border rounded-md`
- [ ] Spacing uses 8/16/24 rhythm, not arbitrary values

**Typography:**
- [ ] Body text is `text-[13px]`, not `text-sm` (which is 14px in Tailwind)
- [ ] Font weight is `font-semibold` (600), not `font-medium` (500)

**Tokens:**
- [ ] No hardcoded hex colors (`bg-[#...]` or `text-[#...]`)
- [ ] No arbitrary pixel values where a token exists

**Copy** (read `./dbui/docs/brandvoice.md`):
- [ ] No emoji in product UI
- [ ] No exclamation marks
- [ ] No banned words: "utilize", "leverage", "seamless", "robust", "simply", "just"
- [ ] Buttons use action verbs ("Delete", "Save"), not generic ("OK", "Yes")
- [ ] Error messages state cause + next step, not "Something went wrong"
