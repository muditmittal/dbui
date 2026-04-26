# DBUI

Databricks component library — 46 components, 451 icons, 162 design tokens. Built on shadcn/ui + Base UI + Tailwind CSS v4, reskinned with DuBois design tokens.

## Install

Give this URL to your LLM (Claude, Cursor, etc.):

```
https://raw.githubusercontent.com/muditmittal/dbui/main/packages/dbui/llms.txt
```

It will clone the repo, copy `dbui/` and `dbui-shells/` into your project, configure everything, and start the dev server. You'll see the Databricks Base Shell running locally.

### Manual install

```bash
git clone https://github.com/muditmittal/dbui.git ~/dbui
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
cp ./dbui/CLAUDE.md ./CLAUDE.md
npm install @base-ui/react
```

Then read `CLAUDE.md` for path alias and CSS token setup.

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