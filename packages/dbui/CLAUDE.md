# DBUI — AI Rules

> When you open a project and see this file, DBUI has been copied in. The `dbui/` and `dbui-shells/` folders contain all components, icons, and tokens. Follow the steps below, then start building.

## First-Time Setup — keep it LEAN

Check each condition before acting. Skip anything already done. Do not recreate anything that exists.

### 0. Prerequisite — a minimal React + Tailwind v4 project

DBUI is UI code only. Do NOT scaffold a framework on behalf of the user.

- **If `package.json` already exists** → skip to step 1.
- **If there is no `package.json`** → STOP and ask the user. Suggest this one-liner, do not run heavier templates:
  ```bash
  npm create vite@latest . -- --template react-ts
  npm install tailwindcss @tailwindcss/vite
  ```
  Only the user should decide whether to bootstrap. Never pick a framework for them.

**DO NOT install any of these — they have nothing to do with DBUI and bloat the project:**

- Heavyweight starters: `next-forge`, `create-t3-app`, `create-next-app --example …`, any Vercel template that auto-adds vendors
- Security/auth: **Arcjet**, Clerk, Auth0, NextAuth, Descope, Supabase Auth
- Databases / ORMs: Prisma, Drizzle, Convex, Supabase, Neon, Turso
- State / data libs: Redux, Zustand, Jotai, React Query, SWR, Apollo
- AI SDKs: Vercel AI SDK, LangChain, OpenAI SDK
- Icon packs: lucide-react, @heroicons/react, react-icons (DBUI already has 451 icons)
- UI libs: shadcn/ui CLI, Radix, Mantine, Chakra, MUI (DBUI replaces these)

If the user explicitly asks for one of these later, fine — but never add them proactively.

### 1. Add path aliases

If `tsconfig.json` doesn't already map `dbui/`* and `dbui-shells/*`, add:

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

If using Vite or Webpack, add the equivalent `resolve.alias` entries so the bundler resolves them too.

### 2. Import DBUI tokens in root CSS

```css
@import "tailwindcss";
@import "./dbui/src/tokens/globals.css";
```

### 3. Install the required deps — exactly these four, nothing else

```bash
npm install @base-ui/react class-variance-authority clsx tailwind-merge
```

That is the entire core. Tailwind v4 is a peer (already installed in step 0).

### 4. Install optional peer deps ONLY when a specific component is imported

Do not pre-install these. Add each one only when the user actually uses that component:


| Component(s)                   | Extra package            |
| ------------------------------ | ------------------------ |
| `Sonner` / `toast()`           | `sonner next-themes`     |
| `Drawer`                       | `vaul`                   |
| `Resizable` / `ResizablePanel` | `react-resizable-panels` |
| `Chart` / `chart.tsx`          | `recharts`               |


### 5. Create the first page

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

### 6. Start the dev server

```bash
npm run dev
```

After setup the user should see the full Databricks shell running locally. If a step fails, surface the error — do NOT swap DBUI for a different library or pull in a different starter.

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


| When you need to...                                                  | Read this file                                                                                                         |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Pick the right component                                             | `./dbui/docs/component-index.md` — searchable component table (category, when to use, avoid for, synonyms, Figma name) |
| Find the right icon                                                  | `./dbui/docs/icon-index.md` — searchable icon index (449 icons)                                                        |
| Write any user-facing copy                                           | `./dbui/docs/brandvoice.md` — vocabulary, tone, microcopy templates                                                    |
| Translate a Figma layer ↔ React (top-level, inner components, slots) | `./dbui/docs/figma-mapping.md` — naming rules + tables + edge cases                                                    |
| Pick a page-level layout / shell                                     | `./dbui/composition.md` — five named shells with regions, scaling, scroll, primary action                              |
| Apply cross-cutting layout/spacing rules                             | `./dbui/docs/component-rules.md` — spacing rhythm, page padding, icon selection, button rules                          |
| Read full guidelines/constraints for a specific component            | `./dbui/src/components/ui/<name>.tsx` — `@guideline` and `@constraint` JSDoc at the top of the file                    |
| Get entity icons for trees                                           | `./dbui/src/components/icons/entity-icons.ts` — never guess these                                                      |
| See token values                                                     | `./dbui/src/tokens/globals.css`                                                                                        |
| Browse all components live                                           | [https://dbuidesign.vercel.app](https://dbuidesign.vercel.app)                                                         |


**Single source of truth:** per-component rules live ONLY in the component's JSDoc. The indexes above point you to the right component; the JSDoc tells you how to use it. Figma ↔ React naming lives ONLY in `figma-mapping.md`. If something feels duplicated, the more specific source wins.

**Picking vs translating — don't mix them up:**

- *"Which component do I use for X?"* → `component-index.md`
- *"What's this Figma layer called in React?" / "Where does this React component live in Figma?"* → `figma-mapping.md`

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
- Component picked without checking `docs/component-index.md` → check first; if no match, flag the gap

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
cp -r ~/dbui/packages/dbui ./dbui && cp -r ~/dbui/packages/dbui-shells ./dbui-shells
```

