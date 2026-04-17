# DBUI

Databricks component library built on [shadcn/ui](https://ui.shadcn.com), reskinned with DuBois design tokens.

## Install

```bash
# Components + icons + tokens
yarn add @muditmittal/dbui

# Or with page shells (Catalog Explorer, Platform Shell)
yarn add @muditmittal/dbui-shells
```

## Setup

DBUI requires Tailwind CSS v4. In your root CSS file:

```css
@import "tailwindcss";
@import "@muditmittal/dbui/tokens/globals.css";
```

## AI-Assisted Development

DBUI ships with a `CLAUDE.md` that teaches Claude (and other LLMs) to use ONLY DBUI components.

**Setup (one-time):**

```bash
cp node_modules/@muditmittal/dbui/CLAUDE.md .
```

That's it. Every conversation with Claude in your project will now follow DBUI rules — correct components, semantic tokens, proper icons. No special commands needed, just chat normally.

Give Claude a screenshot and it will generate code using exclusively DBUI components.

## Usage

```tsx
import { Button, ButtonIcon } from "@muditmittal/dbui/components/ui/button"
import { Input } from "@muditmittal/dbui/components/ui/input"
import { Dialog, DialogTrigger, DialogContent } from "@muditmittal/dbui/components/ui/dialog"
import { Search } from "@muditmittal/dbui/components/icons/Search"
```

## What's included

- **46 components** — Buttons, inputs, selects, dialogs, menus, tables, trees, and more
- **456 icons** — Full Databricks DuBois icon set
- **162 design tokens** — Colors, radius, spacing, shadows, typography
- **Dark mode** — All tokens support light and dark modes
- **Page shells** — Platform Shell, Catalog Explorer (via `@muditmittal/dbui-shells`)
- **Claude Code skill** — Enforced component-only code generation
- **LLM context file** — `llms.txt` with component API, composition recipes, and decision tables

## LLM Context (manual)

If you're not using Claude Code, feed `llms.txt` into your AI tool:

```bash
cat node_modules/@muditmittal/dbui/llms.txt | pbcopy
```

## Storybook

Browse all components at [dbuidesign.vercel.app](https://dbuidesign.vercel.app)

## Feedback

Open an issue at [github.com/muditmittal/dbui](https://github.com/muditmittal/dbui/issues)

## Stack

React 19 · Next.js 15 · Tailwind CSS v4 · Base UI · CVA
