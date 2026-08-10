# DBUI

Databricks component library — components, the DuBois icon set and semantic design tokens. Built on shadcn/ui + Base UI + Tailwind CSS v4, reskinned with DuBois design tokens.

## Install

Tell your AI agent (Cursor, Claude Code, Isaac, Copilot):

> Use https://dbuidesign.vercel.app/install.md to set up DBUI in this project.

The agent will fetch the install doc, run the preflight checks (registry, existing project? React 18+? Tailwind v4?), clone the DBUI source into `./dbui/` and `./dbui-shells/`, wire up tsconfig path aliases, import tokens, copy AI rules into `CLAUDE.md`, and verify the Databricks Base Shell renders.

No `npm install` of DBUI. All deps (Base UI, CVA, clsx, tailwind-merge, sonner, vaul, reselect) ship vendored inside `./dbui/vendor/`.

On Databricks-managed machines, point npm/yarn at `https://npm-proxy.dev.databricks.com` before scaffolding — public npm is blocked. Human overview: https://dbuidesign.vercel.app/install

### Manual install

```bash
git clone https://github.com/muditmittal/dbui.git ~/dbui
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
cp ./dbui/CLAUDE.md ./CLAUDE.md
```

Then read `./dbui/install.md` for path-alias and CSS-token setup.

### Update

```bash
cd ~/dbui && git pull
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
```

## What's included

- **Components** — Buttons, inputs, selects, dialogs, menus, tables, trees, and more
- **Icons** — Full Databricks DuBois icon set
- **Design tokens** — Colors, radius, spacing, shadows, typography
- **Dark mode** — All tokens support light and dark modes
- **Page shells** — Via `dbui-shells`
- **Figma Code Connect** — Component and icon mappings
- **AI rules** — CLAUDE.md enforces component-only code generation

For the current counts, run `yarn dbui doctor` — it reads them from source rather
than from this file, which is why none are written here.

## Storybook

Browse all components locally:

```bash
cd ~/dbui && yarn install && yarn workspace portal storybook
```

## Feedback

Open an issue at [github.com/muditmittal/dbui/issues](https://github.com/muditmittal/dbui/issues)