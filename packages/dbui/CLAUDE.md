# DBUI — AI Rules

> When you open a project and see this file, DBUI has been copied in. The `dbui/` and `dbui-shells/` folders contain all components, icons, and tokens. Follow the steps below, then start building.

## First-Time Setup

Check each condition before acting. Skip anything already done. Do not recreate anything that exists.

DBUI ships pre-bundled. The whole install is **clone + copy + tsconfig alias**. **No `npm install` is required for DBUI itself or any of its dependencies** — Base UI, CVA, clsx, tailwind-merge, sonner, vaul are inlined into `packages/dbui/dist/`.

The setup has two parts:

1. **Bootstrap** — only if starting from scratch with no React project. Skip if a working project exists.
2. **Add DBUI** — always required.

---

### Bootstrap (skip if `package.json` already exists)

DBUI is UI code only. Do NOT scaffold a framework on behalf of the user.

- **If `package.json` already exists** → skip this whole section, jump to "Add DBUI" below.
- **If there is no `package.json`** → STOP and ask the user. Suggest this one-liner, do not run heavier templates:
  ```bash
  npm create vite@latest . -- --template react-ts
  npm install tailwindcss @tailwindcss/vite
  ```
  This is the only `npm install` in the entire flow. Once the project shell exists, never run `npm install` again on the user's behalf for anything DBUI-related.

**DO NOT install any of these — they have nothing to do with DBUI and bloat the project:**

- Heavyweight starters: `next-forge`, `create-t3-app`, `create-next-app --example …`, any Vercel template that auto-adds vendors
- Security/auth: **Arcjet**, Clerk, Auth0, NextAuth, Descope, Supabase Auth
- Databases / ORMs: Prisma, Drizzle, Convex, Supabase, Neon, Turso
- State / data libs: Redux, Zustand, Jotai, React Query, SWR, Apollo
- AI SDKs: Vercel AI SDK, LangChain, OpenAI SDK
- Icon packs: lucide-react, @heroicons/react, react-icons (DBUI already has 451 icons)
- UI libs: shadcn/ui CLI, Radix, Mantine, Chakra, MUI (DBUI replaces these)

If the user explicitly asks for one of these later, fine — but never add them proactively.

---

### Add DBUI

#### 1. Add path aliases

If `tsconfig.json` doesn't already map `dbui/*` and `dbui-shells/*`, add:

```json
{
  "compilerOptions": {
    "paths": {
      "dbui/*": ["./dbui/dist/*"],
      "dbui/components/icons/*": ["./dbui/src/components/icons/*"],
      "dbui/tokens/*": ["./dbui/src/tokens/*"],
      "dbui-shells/*": ["./dbui-shells/src/*"]
    }
  }
}
```

The main `dbui/*` alias points at the **pre-built `dist/`** — components ship pre-bundled with all dependencies (Base UI, CVA, clsx, tailwind-merge, sonner, vaul) inlined. Icons and tokens stay on `src/` because they're tiny per-file modules and CSS, respectively.

If using Vite or Webpack, add the equivalent `resolve.alias` entries so the bundler resolves them too.

#### 2. Import DBUI tokens in root CSS

```css
@import "tailwindcss";
@import "./dbui/src/tokens/globals.css";
```

#### 3. Wire up AI assistant rules

If the project does NOT already have a `CLAUDE.md` at the root:

```bash
cp ./dbui/CLAUDE.md ./CLAUDE.md
```

If the project ALREADY has a `CLAUDE.md` at the root, **do not overwrite it.** Append a DBUI section instead — see "Adding DBUI to an existing project" below for the recommended snippet. For Cursor specifically, also create `.cursor/rules/dbui.mdc` with `alwaysApply: true` and a `**/*.tsx` glob, copying the contents of `./dbui/CLAUDE.md` into the body. Without this step, the AI assistant will keep generating raw `<button>` and `<input>` instead of DBUI components.

#### 4. Create the first page

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

Then start the project's existing dev server (`npm run dev`, `yarn dev`, etc.). The full Databricks shell renders. Done.

---

## Adding DBUI to an existing project

Yes, DBUI works in existing projects. Prerequisites:

| Requirement | Why |
|---|---|
| **React 18+ and react-dom 18+** | DBUI declares them as peerDependencies |
| **Tailwind v4** (not v3) | DBUI uses v4-only token features. If on v3, migrate first using the [Tailwind v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) |
| **A bundler with path-alias support** | Vite, Next.js, Webpack, Parcel, Rspack — all fine. Plain `tsc` without a bundler will not work |
| **No aggressive global CSS resets** | Universal resets like `* { all: revert; }` will override DBUI's tokens. Reset rules should be scoped, not universal |

DBUI coexists with other UI libraries (Material UI, Chakra, etc.) at runtime — it just adds its own components, doesn't replace theirs. New code should use DBUI; old code can stay until you migrate it.

**Critical: make AI assistants prioritize DBUI** when there's competition with prior tooling.

If your existing CLAUDE.md doesn't say anything about UI, append this snippet:

```md
## DBUI — Design System Rules

This project uses DBUI for all UI. **Read `./dbui/CLAUDE.md` before writing any UI code.** Key rules:

- Always use components from `dbui/components/ui/*`. Never raw `<button>`, `<input>`, `<div role="dialog">`.
- Always use icons from `dbui/components/icons/{Name}`. Never lucide, heroicons, or any other icon package.
- Always use semantic tokens (`bg-primary`, `text-foreground`). Never hardcode hex colors.
- Every page wraps in `<Base>` from `dbui-shells`.
- Base UI uses `render={<Component />}`, not Radix `asChild`.

Full rules: `./dbui/CLAUDE.md`. Component picker: `./dbui/docs/component-index.md`. Icon picker: `./dbui/docs/icon-index.md`.
```

If your existing CLAUDE.md already mentions a UI library (shadcn, MUI, Mantine, etc.), edit those instructions to redirect to DBUI for new code. The LLM follows whatever the latest CLAUDE.md says — it won't auto-prefer DBUI just because the folder exists.

---

## Rules

1. **DBUI components only.** Never use raw `<button>`, `<input>`, `<div role="dialog">`. If it exists in DBUI, use it.
2. **DBUI icons only.** Never install lucide, heroicons, or any icon package. All 451 icons are in `dbui/components/icons/`.
3. **Semantic tokens only.** Never hardcode hex colors or pixel values. Use `bg-primary`, `text-foreground`, `rounded-sm`, etc.
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

## Typography reminder

Databricks base is **13px**, not 14px or 16px. Body: `text-[13px] leading-[20px]`. Labels: same + `font-semibold`. Captions: `text-[12px] leading-[16px] text-muted-foreground`. Page title: `text-[22px] font-semibold`. Section heading: `text-[18px] font-semibold`.

Full type system → `./dbui/docs/component-rules.md`.

## Before you commit

Scan your output for these violations:

**Code:**

- `from "lucide-react"` (or any other icon pkg) → use `from "dbui/components/icons/<Name>"`
- `bg-[#` or `text-[#` or any hex/rgb/oklch → semantic token (`bg-primary`, `text-foreground`, …)
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

To get the latest components, tokens, and icons:

```bash
cd ~/dbui && git pull
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
cp ./dbui/CLAUDE.md ./CLAUDE.md
```

The pre-built `dist/` ships in git, so no rebuild step is needed. No `npm install` either.

