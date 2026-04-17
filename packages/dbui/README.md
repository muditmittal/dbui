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

## Claude Code Integration

DBUI ships with a Claude Code skill that ensures your AI assistant uses ONLY DBUI components — no raw HTML, no random shadcn, no guessed tokens.

**Setup (one-time):**

```bash
# Copy the skill into your project
cp -r node_modules/@muditmittal/dbui/.claude/skills/dbui-consumer .claude/skills/dbui
```

**Use:**

```
/dbui Build a form with email input, password input, and submit button
```

Claude will generate code using exclusively DBUI components, semantic tokens, and correct icon imports. The skill loads the full component API reference and enforces 7 rules that prevent common mistakes.

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
