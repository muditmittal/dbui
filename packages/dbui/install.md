# DBUI Install — Agent Instructions

> Audience: an AI coding agent (Cursor, Claude Code, Isaac, Copilot, etc.) setting up DBUI in a user's project.
> Goal: install DBUI into a React + Tailwind v4 project. Read top to bottom. No `npm install` of DBUI itself.

## What DBUI is

DBUI is Databricks' component library — 46 components, 451 icons, 162 design tokens. Built on shadcn/ui + Base UI + Tailwind CSS v4 with DuBois tokens.

Distribution: **clone + copy + tsconfig alias**. All runtime deps (Base UI, CVA, clsx, tailwind-merge, sonner, vaul, and their transitive deps) ship vendored inside `./dbui/vendor/`. The consumer's tsconfig extends a provided paths file that maps everything.

---

## Preflight — STOP if any check fails

Run all six checks before any action. Each check has an explicit decision. Do not improvise.

### 1. Confirm target folder

Ask the user verbatim:

> "Install DBUI into `$(pwd)`? (yes / no / different path)"

- `no` or unknown → STOP.
- different path → `cd` there and restart preflight from step 1.

### 2. Existing project?

Does `./package.json` exist at the target folder?

- **YES** → continue to check 3.
- **NO** → ask the user verbatim:

  > "There is no `package.json` here. Should I create a new React + Tailwind v4 project? (yes / no / different path)"

  - `yes` → run:
    ```bash
    npm create vite@latest . -- --template react-ts
    npm install tailwindcss @tailwindcss/vite
    ```
    This is the ONLY `npm install` in the entire flow. It may hang behind corporate firewalls or TLS-inspected VPNs (Palo Alto GlobalProtect, Zscaler, Netskope). If it hangs, abort and tell the user.
  - `no` → STOP.
  - different path → `cd` there and restart preflight from step 1.

### 3. React version

Read `./package.json`. Confirm `react` and `react-dom` resolve to `>=18.0.0`.

- Both present and `>=18` → continue.
- Missing or older → STOP. Tell the user: "DBUI requires React 18+. Upgrade first, then re-run install."

### 4. Tailwind v4 (not v3)

Check two things:
- `tailwindcss` is in `./package.json` at version `>=4`.
- A CSS file under `./src/` contains `@import "tailwindcss"`.

- Both true → continue.
- On v3 or missing → STOP. Tell the user: "DBUI requires Tailwind v4. Migrate using https://tailwindcss.com/docs/upgrade-guide, then re-run install."

### 5. Existing `./CLAUDE.md`?

Does a `CLAUDE.md` exist at the project root?

- YES → in Install step 5, APPEND the DBUI block. Do not overwrite.
- NO → in Install step 5, copy `./dbui/CLAUDE.md` verbatim.

### 6. Existing tsconfig path aliases?

Read `./tsconfig.json` (and any referenced `tsconfig.app.json` / `tsconfig.base.json`). Look for `compilerOptions.paths`.

- Exists → in Install step 2, MERGE paths from `./dbui/vendor/tsconfig-paths.json` into the existing `paths` object. Do not use `extends`.
- Missing → in Install step 2, use `"extends": "./dbui/vendor/tsconfig-paths.json"`.

### Do not install any of these

None of the following are DBUI dependencies. Do not add them proactively. If the user explicitly asks for one later, fine.

- Starters: `next-forge`, `create-t3-app`, `create-next-app --example …`, Vercel templates that auto-add vendors.
- Auth: Arcjet, Clerk, Auth0, NextAuth, Descope, Supabase Auth.
- Databases / ORMs: Prisma, Drizzle, Convex, Supabase, Neon, Turso.
- State / data: Redux, Zustand, Jotai, React Query, SWR, Apollo.
- AI SDKs: Vercel AI SDK, LangChain, OpenAI SDK.
- Icon packs: lucide-react, @heroicons/react, react-icons. DBUI already has 451 icons.
- UI libs: shadcn CLI, Radix, Mantine, Chakra, MUI. DBUI replaces these.

---

## Install

### Step 1 — Sync DBUI source

```bash
if [ -d ~/dbui/.git ]; then
  (cd ~/dbui && git pull --ff-only)
else
  git clone https://github.com/muditmittal/dbui.git ~/dbui
fi
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
```

Idempotent. Same block handles first install AND every update.

### Step 2 — Path aliases

DBUI vendors all its deps inside `./dbui/vendor/`. No `npm install`.

Based on Preflight check 6:

- **No existing paths** → edit `./tsconfig.json`:
  ```json
  { "extends": "./dbui/vendor/tsconfig-paths.json" }
  ```
- **Existing paths** → read `./dbui/vendor/tsconfig-paths.json` and merge each entry into the project's existing `compilerOptions.paths`. Do not use `extends` (it replaces, doesn't merge).

**For Vite projects**, also update `vite.config.ts`:

```ts
import { dbuiAliases } from "./dbui/vendor/vite-aliases.js"

export default defineConfig({
  resolve: { alias: { ...dbuiAliases, ...yourExistingAliases } },
})
```

**For Next.js / Webpack / Rspack**, add the same aliases to `resolve.alias`. The full list lives in `./dbui/vendor/tsconfig-paths.json`.

### Step 3 — Import tokens

Add to the project's root CSS (usually `./src/index.css` or `./src/app/globals.css`):

```css
@import "tailwindcss";
@import "./dbui/src/tokens/globals.css";
```

### Step 4 — Install DBUI skills (Cursor users)

```bash
mkdir -p .cursor/skills
cp -r ./dbui/skills/* .cursor/skills/
```

Re-run after every DBUI update to refresh skills. Claude Code users can skip this — `CLAUDE.md` and the `docs/` folder provide equivalent guidance.

### Step 5 — Wire up AI rules

Based on Preflight check 5:

- **No `./CLAUDE.md`** → `cp ./dbui/CLAUDE.md ./CLAUDE.md`.
- **Existing `./CLAUDE.md`** → APPEND this block to it. Do not overwrite.

  ```md
  ## DBUI — Design System Rules

  This project uses DBUI for all UI. Read `./dbui/CLAUDE.md` before writing any UI code. Key rules:

  - Always use components from `dbui/components/ui/*`. Never raw `<button>`, `<input>`, `<div role="dialog">`.
  - Always use icons from `dbui/components/icons/{Name}`. Never lucide, heroicons, or any other icon package.
  - Always use semantic tokens (`bg-action-primary-base`, `text-text-base`). Never hardcode hex colors.
  - Every page wraps in `<Base>` from `dbui-shells`.
  - Base UI uses `render={<Component />}`, not Radix `asChild`.

  Full rules: `./dbui/CLAUDE.md`. Component picker: `./dbui/docs/component-index.md`. Icon picker: `./dbui/docs/icon-index.md`.
  ```

**For Cursor specifically (recommended)** — also create `.cursor/rules/dbui.mdc`:

```mdc
---
description: DBUI design system rules — use DBUI components, never raw HTML
globs: ["**/*.tsx", "**/*.jsx"]
alwaysApply: true
---

(paste the contents of ./dbui/CLAUDE.md here)
```

`alwaysApply: true` + a TSX/JSX glob fires the rule on every UI file. Catches cases where the LLM forgets the root `CLAUDE.md` mid-session.

### Step 6 — First page (verification)

Create or replace the project's home page with:

```tsx
import { Base } from "dbui-shells"

export default function Home() {
  return (
    <Base defaultActive="catalog">
      <div className="flex items-center justify-center h-full type-body text-text-subtle">
        DBUI is installed. Start building here.
      </div>
    </Base>
  )
}
```

Then start the project's existing dev server (`npm run dev`, `yarn dev`, etc.). The full Databricks shell should render.

---

## Post-install verification

Run each check. If any fails, the install is incomplete.

1. `./dbui/src/components/ui/button.tsx` exists.
2. `./dbui-shells/src/shells/Base.tsx` exists.
3. `./CLAUDE.md` mentions DBUI.
4. `./tsconfig.json` either `extends` `./dbui/vendor/tsconfig-paths.json` OR has its paths merged.
5. The project's root CSS imports `./dbui/src/tokens/globals.css`.
6. Dev server starts without import errors.
7. The home page renders the Databricks Base Shell (header at 48px, sidebar at 180px, content surface in the center).

---

## After install — files inside the project

These now live in the user's project. They govern ongoing use, not installation.

| When you need to... | Read |
|---|---|
| Global usage rules | `./dbui/CLAUDE.md` |
| Pick the right component | `./dbui/docs/component-index.md` |
| Find the right icon | `./dbui/docs/icon-index.md` |
| Write user-facing copy | `./dbui/docs/brandvoice.md` |
| Pick a page-level layout | `./dbui/composition.md` |
| Cross-cutting layout / spacing rules | `./dbui/docs/component-rules.md` |
| Per-component rules | `./dbui/src/components/ui/<name>.tsx` (JSDoc `@guideline` / `@constraint`) |
| Entity icons for trees | `./dbui/src/components/icons/entity-icons.ts` |
| Design token values | `./dbui/src/tokens/globals.css` |

**Single source of truth:** per-component rules live ONLY in the component's JSDoc. Per-icon details live ONLY in `icon-index.md`. Cross-cutting layout rules live ONLY in `component-rules.md`. Shell-level composition lives ONLY in `composition.md`. Voice/tone lives ONLY in `brandvoice.md`. If two sources disagree, the more specific one wins (JSDoc > index > `CLAUDE.md`).

---

## Update DBUI later

Re-run Step 1 (sync) and Step 4 (skills copy). Same idempotent block. Steps 2 (path aliases), 3 (CSS import), 5 (AI rules wiring), and 6 (first page) are one-time only.

Do **not** auto-overwrite `./CLAUDE.md` on update — the user may have customized it. Only re-copy if the user explicitly asks.

---

## Known gaps

Not yet in DBUI — compose from primitives as interim:

- DatePicker, Stepper, Banner, CodeBlock, Virtualized lists.
- Chart (`recharts` not bundled — non-critical).
- Resizable / ResizablePanel (`react-resizable-panels` not bundled — non-critical).
