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

1. Read `./dbui/composition.md`. Identify which of the six shells matches the layout:
   - **Shell A (List)** — tabular list with filters. Used for: Jobs list, Compute list, Pipelines list.
   - **Shell B (Data Tree)** — left tree + center content + optional right metadata. Used for: Catalog Explorer.
   - **Shell C (File Tree)** — file browser layout. Used for: Workspace file browser.
   - **Shell D (Editor)** — editor-centric, nav hidden by default. Used for: Notebook, SQL Editor.
   - **Shell E (Asset Detail)** — three-column detail: tree (260px) + main (flex-1) + metadata sidebar (280px). Used for: Table details, Model details.
   - **Shell F (Chat Workbench)** — conversation rail + thread + tabbed preview + 48px tool rail. Used for: Genie, and any surface whose answer is a thread. Turns come from `dbui-chat`; the shell owns layout and the transcript's scroll.

2. If unsure, default to Shell A (most common). Every shell starts with `<Base>` from `dbui-shells`.

3. **Shells can nest.** Catalog Explorer uses Shell B (tree panel) with Shell E (three-column detail) nested inside its content area. If the screenshot shows both a tree AND a detail view with metadata sidebar, you need both.

### Phase 2 — Map regions to components

For each region of the identified shell, determine which DBUI component fills it.

1. Read `./dbui/docs/component-index.md` and search by the region's purpose.
2. Use the `dbui-pick-component` skill if you're uncertain about a specific region.
3. Use the `dbui-pick-icon` skill for every icon — never guess.
4. Working from a Figma file rather than a screenshot? Read `./dbui/docs/figma-mapping.md`. Nested Figma layers are slots, not missing components, and a Figma variant is often a different child subtree rather than a prop.

**Common region → component mappings:**

| You see in the screenshot | Region | DBUI component |
|---|---|---|
| Left sidebar with product icons | Nav | `Navbar` + `NavbarItem` (every item MUST have an icon) |
| Expandable tree (catalogs, files) | Tree panel | `DataTree` or `FileTree` + entity icons from `entity-icons.ts` |
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

3. **Use semantic tokens only.** `bg-action-primary-base`, `text-text-base`, `border-border-base`. Never hardcode hex.

4. **Use the named type ramp, not pixel values.** Each `type-*` class is the whole style — family, size, line-height, weight and case — so never pair it with `leading-`, `font-` or `uppercase`. Single-line UI (buttons, menu items, cells): `type-label`, or `type-label-bold` for column headers and form labels. Text that wraps (descriptions, helper blocks): `type-body`. Anything read as language (chat messages, docs, empty states): `type-paragraph`. Captions: `type-hint`. Overlines: `type-eyebrow` (it already applies caps). Code: `type-code` inline, `type-code-block` for blocks.

   A px literal is not just off-system, it is now unanswerable: a style resolves to different measurements per type **context**, so a number that matches on a desktop workbench is wrong on a phone. Name the style and both are right. You never declare a context — the ramp switches itself on viewport width.

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
- [ ] Surfaces: shell background is `bg-surface-subtle`, content surface is `bg-surface-base border border-border-base rounded-2`
- [ ] Spacing uses 8/16/24 rhythm, not arbitrary values

**Typography:**
- [ ] Text uses a `type-*` class, not `text-sm` or a `text-[13px]` literal
- [ ] Text that wraps uses `type-body` or `type-paragraph`, never `type-label`
- [ ] Numbers in a table use `<TableCell numeric>` and `<TableHead numeric>` — never a type class
- [ ] No `leading-`, `font-` or `uppercase` paired with a `type-*` class — it carries all three

**Tokens:**
- [ ] No hardcoded hex colors (`bg-[#...]` or `text-[#...]`)
- [ ] No arbitrary pixel values where a token exists

**Copy** (read `./dbui/docs/brandvoice.md`):
- [ ] No emoji in product UI
- [ ] No exclamation marks
- [ ] No banned words: "utilize", "leverage", "seamless", "robust", "simply", "just"
- [ ] Buttons use action verbs ("Delete", "Save"), not generic ("OK", "Yes")
- [ ] Error messages state cause + next step, not "Something went wrong"

## After the build

The checklist above is hygiene. For judgment, hand off to **`dbui-review`** — it dispatches
five checks in parallel (standards, guidelines, voice, principles, ecosystem fit) and
synthesizes one critique.

**Most of what you just built is compliant by construction**, so the review's value is in
the bespoke parts: anything improvised because no component fit, any `className` doing a
prop's job, any string you wrote rather than took from a spec. Point the review at those
specifically.

Offer it rather than assuming it: *"Want me to run the full review before you share
this?"* — and if the user only wants one thing checked, send them to that single check
instead of the orchestrator.
