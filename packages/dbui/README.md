# DBUI

Databricks component library — 46 components, 451 icons, 162 design tokens. Built on shadcn/ui + Base UI + Tailwind CSS v4, reskinned with DuBois design tokens.

## Install

Tell your AI agent (Cursor, Claude Code, Isaac, Copilot):

> Use https://dbuidesign.vercel.app/install to set up DBUI in this project.

The agent will fetch the install doc, run the preflight checks (existing project? React 18+? Tailwind v4?), clone the DBUI source into `./dbui/` and `./dbui-shells/`, wire up tsconfig path aliases, import tokens, copy AI rules into `CLAUDE.md`, and verify the Databricks Base Shell renders.

No `npm install` of DBUI. All deps (Base UI, CVA, clsx, tailwind-merge, sonner, vaul) ship vendored inside `./dbui/vendor/`.

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

- **46 components** — Buttons, inputs, selects, dialogs, menus, tables, trees, and more
- **451 icons** — Full Databricks DuBois icon set
- **162 design tokens** — Colors, radius, spacing, shadows, typography
- **Dark mode** — All tokens support light and dark modes
- **Page shells** — Base Shell, Catalog Explorer (via `dbui-shells`)
- **Figma Code Connect** — 55 component mappings
- **AI rules** — CLAUDE.md enforces component-only code generation

## Storybook

Browse all components locally:

```bash
cd ~/dbui && yarn install && yarn storybook
```

## Feedback

Open an issue at [github.com/muditmittal/dbui/issues](https://github.com/muditmittal/dbui/issues)