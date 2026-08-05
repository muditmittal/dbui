---
name: dbui-validate
description: Validate that code follows DBUI design system rules. Triggers when code is complete and needs a compliance check, when reviewing a PR for DBUI violations, after building a screen with dbui-build-screen, or when the user asks to "check", "lint", "validate", or "audit" DBUI usage.
---

# Validate DBUI compliance

## When to use

- After writing or editing any `.tsx` file that uses DBUI components
- After completing a screen build (run this as the final step of `dbui-build-screen`)
- When reviewing code for design system violations
- When the user says "check", "lint", "validate", or "audit"

## Procedure

Read the file(s) under review. For each file, check every rule below. Report violations grouped by severity.

### Errors (must fix)

**Raw HTML elements:**
Scan for lowercase JSX tags that have DBUI equivalents:
- `<button` → use `Button` from `dbui/components/ui/button`
- `<input` → use `Input` from `dbui/components/ui/input`
- `<select` → use `Select` from `dbui/components/ui/select`
- `<textarea` → use `Textarea` from `dbui/components/ui/textarea`
- `<dialog` → use `Dialog` from `dbui/components/ui/dialog`
- `<details` / `<summary` → use `Accordion` or `Collapsible`

**Non-DBUI icon imports:**
Scan import statements for:
- `from "lucide-react"` or `from "lucide-react/*"`
- `from "@heroicons/*"`
- `from "react-icons/*"`
- `from "@radix-ui/react-icons"`
Replace with `from "dbui/components/icons/{Name}"`.

**Hardcoded colors:**
Scan className strings and style objects for:
- `bg-[#` or `text-[#` → replace with semantic token (`bg-action-primary-base`, `text-text-base`, etc.)
- `color: "#` or `background: "#` in style objects → replace with `var(--token-name)`
Look up the closest token in `./dbui/src/tokens/globals.css`.

**asChild usage:**
Scan for `asChild` prop on any Base UI primitive → replace with `render={<Component />}`.

**Missing Base shell:**
If the file exports a top-level page component (`export default function Page/App/Layout`), verify it wraps children in `<Base>` from `dbui-shells`.

### Warnings (should fix)

**Typography drift:**
- `text-sm`, `text-xs` or any `text-[Npx]` → should be a `type-*` class off the ramp
- A `type-*` paired with `leading-`, `font-`, `tracking-` or `uppercase` → drop the
  companion, the ramp class already carries it
- `font-medium` on its own → should be `font-semibold` (Databricks uses weight 600, not 500)

Pick the step by what the text is: `type-label` for single-line UI, `type-body` when
it wraps, `type-hint` for captions and helper text, `type-paragraph` for prose. See
`./dbui/docs/tokens.md`.

**Arbitrary values where tokens exist:**
Scan className for bracket values and check if a token covers them:
- `p-[13px]` → `p-3` (12px) or `p-4` (16px)
- `rounded-[8px]` → `rounded-md`
- `shadow-[...]` → `shadow-xs`, `shadow-sm`, `shadow-md`, etc.
Look up `./dbui/src/tokens/globals.css` and `./dbui/docs/component-rules.md` for the token scales.

**Spacing rhythm violations:**
Check gap/padding values against the 8/16/24 rhythm:
- Inside a component: `gap-2` (8px)
- Between form fields/sections: `gap-4` (16px)
- Between major blocks: `gap-6` (24px)

**Inconsistent menu icons:**
If a `DropdownMenu` has one `DropdownMenuItem` with a `DropdownMenuItemIcon`, ALL items must have icons.

### Info (nice to have)

**Component not in DBUI:**
If a PascalCase JSX tag is neither a DBUI component nor a project-local component, flag it as info: "Component `X` is not in DBUI — verify it's a project-specific component, not a third-party import that should be replaced."

**Copy review:**
For any user-facing string literal in JSX, check against `./dbui/docs/brandvoice.md`:
- Emoji → remove
- Exclamation marks → remove
- Banned words: "utilize", "leverage", "seamless", "robust", "simply", "just", "please", "kindly"
- Generic button labels: "OK", "Yes", "No" → use the action verb
- Title Case headings → sentence case

## Output format

Report findings as:

```
## DBUI Validation — <filename>

### Errors (N)
- Line X: <rule> — <description>. Fix: <suggestion>.

### Warnings (N)
- Line X: <rule> — <description>. Fix: <suggestion>.

### Info (N)
- Line X: <rule> — <description>.

### Result: PASS / FAIL (N errors, N warnings)
```

PASS if zero errors. Warnings don't fail the check but should be addressed.
