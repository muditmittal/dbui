# DBUI Change Impact Map

When a change happens in Figma or React, this doc tells you **every file that needs to change in lockstep**.

Use it as a checklist before you commit, or pair it with the design-lint scripts to verify the result.

---

## Quick lookup

|  Type of change  |  Files to update                                                                                                       |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Rename a Figma component | `figma-mapping.md` · matching `figma/<Component>.figma.tsx` · the React component's `@figma` JSDoc URL (if changed) · `packages/dbui/docs/figma-gaps.md` log |
| Rename a React export    | the component file in `packages/dbui/src/components/ui/<x>.tsx` · all consumers in `packages/dbui-shells/src/**` and `apps/portal/src/stories/<X>.stories.tsx` · matching `figma/<Component>.figma.tsx` import · `figma-mapping.md` · `dbui-components.json` (lint allow-list) |
| Add a new variant in Figma   | matching `figma/<Component>.figma.tsx` (`figma.enum`) · React component variant prop · `<X>.stories.tsx` (showcase the variant) |
| Add a new variant in React   | the component file (variant prop + class logic) · the matching `figma/<Component>.figma.tsx` (or add new `figma.connect` for the variant node) · `<X>.stories.tsx` |
| Add a new color/spacing/type token   | `packages/dbui/src/tokens/globals.css` · `scripts/design-lint/tokens.json` · `figma-mapping.md` (if exposed as a Figma variable) · `packages/dbui/composition.md` (if it's shell-level) |
| Add a new component (React + Figma)  | new `.tsx` in `packages/dbui/src/components/ui/` · new entry in the package's `index.ts` exports · new `figma/<Component>.figma.tsx` · new story in `apps/portal/src/stories/` · `figma-mapping.md` row · `dbui-components.json` allow-list · `component-index.md` · JSDoc with `@standard`, `@guideline`, `@constraint`, `@figma` |
| Add a new icon                       | new SVG in `packages/dbui/src/components/icons/<Name>.svg` · new React wrapper `<Name>.tsx` · `icon-index.md` · (optional) Figma master |
| Change a JSDoc rule                  | the component file · `composition.md` if the rule is shell-level · `composition-rules.ts` if encoded for the lint · `component-rules.md` if it's a cross-cutting rule |
| Add a Figma variable             | Figma file · `tokens.json` (the lint's source of truth) · `globals.css` (so the same token is available in code) |
| Restructure a Figma master       | `figma-mapping.md` · `figma/<Component>.figma.tsx` example · React component (if structure should change too) · `figma-gaps.md` log |

---

## Detailed flows

### 1. Renaming a Figma layer or master

**You renamed `.MenuLabel` → `.DropdownMenuItemContent` in Figma.**

| File | What to update |
| --- | --- |
| `packages/dbui/docs/figma-mapping.md` | Update the master row: old name → new name, master node ID, React equivalent. |
| `packages/dbui/docs/figma-gaps.md` | Append to the rename log so we have history. |
| `figma/DropdownMenu.figma.tsx` | Verify import path — Figma master IDs don't change on rename, so the `figma.connect()` URL still works. No code change usually. |
| **Lint follow-up** | Run `yarn design:lint:figma --target <root-frame>` on a sample to confirm no new "non-dbui" violations. |

### 2. Renaming a React export

**You renamed `KeyValueRow` → `KeyValueItem`.**

| File | What to update |
| --- | --- |
| `packages/dbui/src/components/ui/key-value-pair.tsx` | The `function` and `export` declarations. |
| `apps/portal/src/stories/KeyValuePair.stories.tsx` | Imports + JSX usage. |
| `packages/dbui-shells/src/**` | Any consumer that used the old name. |
| `figma/KeyValuePair.figma.tsx` | Update example imports. |
| `packages/dbui/docs/figma-mapping.md` | Update the React equivalent column. |
| `scripts/design-lint/dbui-components.json` | Replace `KeyValueRow` with `KeyValueItem` in the allow-list. |
| `packages/dbui/docs/component-index.md` | Update the row if the role changed. |
| **Lint follow-up** | `yarn design:lint:react` to confirm no leftover references. |

### 3. Adding a new component (React + Figma together)

**You added `RadioTile`.**

| File | What to update |
| --- | --- |
| `packages/dbui/src/components/ui/radio-tile.tsx` | New file with components + JSDoc (`@standard`, `@guideline`, `@constraint`, `@figma`). |
| `packages/dbui/src/index.ts` | Re-export from the package barrel. |
| `apps/portal/src/stories/RadioTile.stories.tsx` | New story showing usage. |
| `figma/RadioTile.figma.tsx` | New Code Connect file pointing at the Figma master node. |
| `packages/dbui/docs/figma-mapping.md` | New row in "Top-level components" table + any inner-master rows. |
| `packages/dbui/docs/component-index.md` | New entry in the appropriate category. |
| `scripts/design-lint/dbui-components.json` | Add to the `ui` array. |
| (optional) `packages/dbui/composition.md` | If RadioTile has shell-level composition rules (rare for an item-level component). |
| (optional) `packages/dbui/src/rules/composition-rules.ts` | If the component has lintable rules (e.g. "RadioTile must be inside RadioTileGroup"). |

### 4. Adding a new color or spacing token

**You added `--surface-info` for an info banner background.**

| File | What to update |
| --- | --- |
| `packages/dbui/src/tokens/globals.css` | Define the `--surface-info` CSS variable in `:root` and `.dark`. |
| `scripts/design-lint/tokens.json` | Add the new hex value to `colors.light` / `colors.dark`. Add `surface-info` to `colors.tokens.surface-status`. |
| Figma file | Create the matching variable so designers can bind to it. Update tokens.json with the variable scope if needed. |
| `packages/dbui/docs/figma-mapping.md` | Mention the new token (in a "tokens" section if you add one). |
| (optional) `packages/dbui/composition.md` | If the token is for a shell-level surface. |

### 5. Changing a constraint in JSDoc

**You added `@constraint Button.link must not have <ButtonIcon>`.**

| File | What to update |
| --- | --- |
| `packages/dbui/src/components/ui/button.tsx` | The JSDoc. |
| `packages/dbui/src/rules/composition-rules.ts` | Add a rule object so the React lint can flag violations. |
| `packages/dbui/docs/component-index.md` | Note in the "Avoid for / Use X instead" column. |

---

## "Where does this rule live?" — single source of truth map

| Rule type | Lives in | Don't put it elsewhere |
| --- | --- | --- |
| Per-component behavior, props, slots | the component's JSDoc | not in `component-index.md` |
| Cross-cutting rules (icons, buttons, menus, spacing) | `docs/component-rules.md` | not in individual JSDocs |
| Shell-level layout (page header + sidebar + content + tree) | `composition.md` | not in component JSDoc |
| Designer-facing icon catalog | `docs/icon-index.md` | not in code comments |
| Voice/tone for copy | `docs/brandvoice.md` | not in component JSDoc |
| Figma ↔ React naming | `docs/figma-mapping.md` | not in JSDoc, not in CC files |
| Code-form linter rules | `src/rules/composition-rules.ts` and `src/rules/layout-rules.ts` | not duplicated in markdown |

If you ever see a rule duplicated in two places, the more specific source wins (JSDoc beats index, index beats `llms.txt`).

---

## Pre-commit checklist

Run before committing changes that touch components or design tokens:

```bash
# 1. Build still works
yarn workspace dbui-src build

# 2. React lint passes (errors fail the build; warnings advisory)
yarn design:lint:react

# 3. (Optional) Figma lint on the frame you touched
yarn design:lint:figma --target <NODE_ID>
# Then ask Cursor (with Figma MCP) to run the printed payload.
```
