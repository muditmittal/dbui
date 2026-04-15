# DBUI

Databricks component library built on [shadcn/ui](https://ui.shadcn.com), reskinned with DuBois design tokens.

## Install

```bash
npm install dbui
```

## Setup

Import the token stylesheet in your root CSS:

```css
@import "dbui/tokens/globals.css";
```

## Tailwind CSS v4

DBUI requires Tailwind CSS v4 with the `@tailwindcss/postcss` plugin. In your `postcss.config.js`:

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

In your root CSS file:

```css
@import "tailwindcss";
@import "dbui/tokens/globals.css";
```

## Usage

```tsx
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { Dialog, DialogTrigger, DialogContent } from "dbui/components/ui/dialog"
import { Plus } from "dbui/components/icons/Plus"
```

## What's included

- **46 components** — Buttons, inputs, selects, dialogs, menus, tables, and more
- **451 icons** — Full Databricks DuBois icon set
- **162 design tokens** — Colors, radius, spacing, shadows, typography
- **Dark mode** — All tokens support light and dark modes

## LLM Context

For AI-assisted development, load `dbui/llms.txt` — it contains component selection guides, composition recipes, and mandatory rules.

## Storybook

Browse all components at [dbuidesign.vercel.app](https://dbuidesign.vercel.app)

## Stack

React 19 · Next.js 15 · Tailwind CSS v4 · Base UI · CVA
