# DBUI Install — Agent Instructions

> Audience: an AI coding agent (Cursor, Claude Code, Isaac, Copilot, etc.) setting up DBUI in a user's project.
> Goal: install DBUI into a React + Tailwind v4 project. Read top to bottom. No `npm install` of DBUI itself.
> Humans: https://dbuidesign.vercel.app/install

## What DBUI is

DBUI is Databricks' component library — components, icons, and design tokens. Built on shadcn/ui + Base UI + Tailwind CSS v4 with DuBois tokens.

Distribution: **clone + copy + tsconfig alias**. All runtime deps (Base UI, CVA, clsx, tailwind-merge, sonner, vaul, reselect, and their transitive deps) ship vendored inside `./dbui/vendor/`. The consumer's tsconfig extends a provided paths file that maps everything.

---

## Preflight — STOP if any check fails

Run all checks before any action. Each check has an explicit decision. Do not improvise.

### 1. Confirm target folder

Ask the user verbatim:

> "Install DBUI into `$(pwd)`? (yes / no / different path)"

- `no` or unknown → STOP.
- different path → `cd` there and restart preflight from step 1.

### 2. Package registry (Databricks managed machines)

On Databricks-managed Macs, Jamf redirects `registry.npmjs.org` and `registry.yarnpkg.com` to `127.0.0.1`. Public npm hangs. Point every package manager at the sanctioned mirror **before** any `npm` / `yarn` / `pnpm` command in this flow:

```bash
# npm — one-shot
npm_config_registry=https://npm-proxy.dev.databricks.com <command>

# npm — project .npmrc (preferred for ongoing work)
echo 'registry=https://npm-proxy.dev.databricks.com' >> .npmrc

# yarn — .yarnrc.yml
# npmRegistryServer: "https://npm-proxy.dev.databricks.com"
```

DBUI itself still needs no `npm install`. This step only unblocks scaffolding and the project's own deps. Skip it only when `npm view react version` already succeeds without a custom registry.

### 3. Existing project?

Does `./package.json` exist at the target folder?

- **YES** → continue to check 4.
- **NO** → ask the user verbatim:

  > "There is no `package.json` here. Should I create a new React + Tailwind v4 project? (yes / no / different path)"

  - `yes` → run (with the registry from check 2 if needed):
    ```bash
    npm create vite@latest . -- --template react-ts
    npm install
    npm install tailwindcss @tailwindcss/vite
    ```
    This is the ONLY `npm install` in the entire flow. If it hangs, verify check 2 — do not abort silently.

    The Vite template ships its own `src/index.css` and does not wire Tailwind, so the scaffold is not finished yet. Replace `src/index.css` with `@import "tailwindcss";` and add `tailwindcss()` to `plugins` in `vite.config.ts` before continuing. Check 5 tests exactly this.
  - `no` → STOP.
  - different path → `cd` there and restart preflight from step 1.

### 4. React version

Read `./package.json`. Confirm `react` and `react-dom` resolve to `>=18.0.0`.

- Both present and `>=18` → continue.
- Missing or older → STOP. Tell the user: "DBUI requires React 18+. Upgrade first, then re-run install."

### 5. Tailwind v4 (not v3)

Check two things:
- `tailwindcss` is in `./package.json` at version `>=4`.
- The project's root CSS file contains `@import "tailwindcss"`. Usually `./src/index.css`, `./src/app/globals.css` or `./app/globals.css`.

- Both true → continue.
- Version is `>=4` and only the import is missing, because check 3 just scaffolded this project → finish the scaffold as check 3 describes, then re-run this check. Never send someone to a migration guide for a project this install created.
- On v3, or `tailwindcss` absent → STOP. Tell the user: "DBUI requires Tailwind v4. Migrate using https://tailwindcss.com/docs/upgrade-guide, then re-run install."

### 6. Existing `./CLAUDE.md`?

Does a `CLAUDE.md` exist at the project root?

- YES → in Install step 5, APPEND the DBUI block. Do not overwrite.
- NO → in Install step 5, copy `./dbui/CLAUDE.md` verbatim.

### 7. Which tsconfig owns app source?

Find the tsconfig that owns `compilerOptions` for app source — `./tsconfig.app.json` in current Vite templates, `./tsconfig.json` elsewhere. Note which one it is. Install step 2 merges into that file, whether or not it already has `paths`.

**Never use `"extends": "./dbui/vendor/tsconfig-paths.json"`.** Relative `paths` resolve against the directory of the config that declares them, so through `extends` every alias would point inside `./dbui/vendor/` and nothing would resolve. Merging is the only route that works.

### Do not install any of these

None of the following are DBUI dependencies. Do not add them proactively. If the user explicitly asks for one later, fine.

- Starters: `next-forge`, `create-t3-app`, `create-next-app --example …`, Vercel templates that auto-add vendors.
- Auth: Arcjet, Clerk, Auth0, NextAuth, Descope, Supabase Auth.
- Databases / ORMs: Prisma, Drizzle, Convex, Supabase, Neon, Turso.
- State / data: Redux, Zustand, Jotai, React Query, SWR, Apollo.
- AI SDKs: Vercel AI SDK, LangChain, OpenAI SDK.
- Icon packs: lucide-react, `@heroicons/react`, react-icons. DBUI already ships its icon set.
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

### Step 2 — Path aliases and bundler config

DBUI vendors all its deps inside `./dbui/vendor/`. No `npm install` of those packages.

In the tsconfig identified by Preflight check 7, copy every entry from `./dbui/vendor/tsconfig-paths.json` into `compilerOptions.paths`, keeping any entries already there. No `baseUrl` is needed — the paths resolve against the tsconfig's own directory, and `baseUrl` is deprecated in current TypeScript.

**For Vite projects**, update `vite.config.ts` to include DBUI aliases **and** the Tailwind v4 plugin:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { dbuiAliases } from "./dbui/vendor/vite-aliases.js"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { ...dbuiAliases, /* ...yourExistingAliases */ } },
})
```

Installing `tailwindcss` and `@tailwindcss/vite` is not enough — the plugin must be in `plugins`.

**For Next.js / Webpack / Rspack**, add the same aliases to `resolve.alias`. The full list lives in `./dbui/vendor/tsconfig-paths.json`.

### Step 3 — Import tokens

Add to the project's root CSS (usually `./src/index.css` or `./src/app/globals.css`). The path is **relative to the CSS file**, not the project root:

```css
@import "tailwindcss";
@import "../dbui/src/tokens/globals.css";
```

If the CSS file lives at the project root instead of under `./src/`, use `./dbui/src/tokens/globals.css`.

### Step 4 — Install DBUI skills (Cursor users)

```bash
mkdir -p .cursor/skills
cp -r ./dbui/skills/* .cursor/skills/
```

Re-run after every DBUI update to refresh skills. Claude Code users can skip this — `CLAUDE.md` and the `docs/` folder provide equivalent guidance.

### Step 5 — Wire up AI rules

Based on Preflight check 6:

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
4. The app tsconfig has every path from `./dbui/vendor/tsconfig-paths.json` merged into `compilerOptions.paths`, including `reselect`, and does not `extends` that file.
5. The project's root CSS imports `dbui/src/tokens/globals.css` with a path that resolves from that CSS file.
6. Vite projects: `vite.config.ts` includes `tailwindcss()` and `dbuiAliases`.
7. Dev server starts without import errors.
8. The home page renders the Databricks Base Shell (header at 48px, sidebar at 180px, content surface in the center).

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

`Chart` and `Resizable` are the two components the vendor folder does not cover. They are declared as peer dependencies, so a project that uses either has to install it — `recharts` for `Chart`, `react-resizable-panels` for `Resizable`. Every other component works with no `npm install`. Import them only after installing the peer, since a bare import fails to type-check.
