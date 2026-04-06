# Figma → Code Visual Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every visual discrepancy between Figma component designs and DBUI React component code, verified by side-by-side comparison.

**Architecture:** Each task targets one component file. Changes are CSS-level (Tailwind classes) — no API or structural changes. Every fix is derived from direct Figma node property inspection, not guesswork.

**Tech Stack:** Tailwind CSS v4, CVA, React 19, Base UI primitives

**Method:** For each component, the Figma node properties (fills, strokes, effects, strokeWeight, cornerRadius, padding, dimensions) have been extracted via `use_figma` Plugin API. Fixes are derived by comparing those values to the Tailwind classes in the React component.

---

## Systemic Issue: Focus State Pattern

**Affects:** Input, Textarea, Select, Combobox, Checkbox, Radio, Switch

Figma focus state uses **shadow-focus** effect (two stacked drop shadows):
- Shadow 1: `color: action/ring (#2272B4)`, spread: 3, offset: 0,0 — blue ring
- Shadow 2: `color: #FFFFFF`, spread: 1, offset: 0,0 — white gap
- Plus: `strokeWeight: 2` (border thickens to 2px)
- Plus: stroke color changes to `action/ring`

Code currently uses: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
- This creates a semi-transparent blue ring with NO white gap
- Border doesn't thicken to 2px

**Correct Tailwind:** `focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-focus`

Where `shadow-focus` is defined in globals.css as:
```css
--shadow-focus: 0 0 0 1px #fff, 0 0 0 3px var(--ring);
```

Check if `shadow-focus` already exists in globals.css. If not, add it. If a similar token exists, use it.

---

## Task 1: Add shadow-focus utility to globals.css

**Files:**
- Modify: `apps/portal/src/app/globals.css`

- [ ] **Step 1: Check if shadow-focus exists**

Search `globals.css` for `shadow-focus` or similar focus ring shadow definition.

- [ ] **Step 2: Add shadow-focus if missing**

In the `@theme inline` block where other shadows are defined, add:

```css
--shadow-focus: 0 0 0 1px #fff, 0 0 0 3px var(--ring);
```

This matches Figma's two-shadow focus effect: white 1px gap + blue 3px ring.

---

## Task 2: Fix Input focus + hover states

**Files:**
- Modify: `apps/portal/src/components/ui/input.tsx`

Figma Input states (Default size, from node inspection):
- **Default:** stroke=input (#CBCBCB), strokeWeight=1, fill=background, shadow-xs
- **Hover:** stroke=primary (#2272B4), strokeWeight=1, fill=background (NO bg tint)
- **Press:** stroke=primary-press (#04355D), strokeWeight=1, fill=background (NO bg tint)
- **Focus:** stroke=ring (#2272B4), strokeWeight=2, shadow-focus (3px blue ring + 1px white gap)
- **Disabled:** stroke=disabled (#D8D8D8), fill=background, no shadow
- **Danger:** stroke=destructive, shadow = destructive ring (3px spread, 20% opacity) + shadow-xs

- [ ] **Step 1: Fix focus state**

Find: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
Replace with: `focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-focus`

- [ ] **Step 2: Verify hover is correct**

Hover should be: `hover:border-primary` (no bg-hover). This was already fixed in previous session — verify it's still correct.

- [ ] **Step 3: Fix danger/invalid ring**

Find: `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`
Replace with: `aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_color-mix(in_srgb,var(--destructive)_20%,transparent),0_1px_0_rgba(0,0,0,0.05)]`

Or if a cleaner approach: define `--shadow-danger` in globals.css.

---

## Task 3: Fix Textarea focus (same pattern as Input)

**Files:**
- Modify: `apps/portal/src/components/ui/textarea.tsx`

Same fixes as Task 2 — the Textarea Figma states are identical to Input.

- [ ] **Step 1: Fix focus state**

Same find/replace as Input Task 2 Step 1.

- [ ] **Step 2: Fix danger/invalid ring**

Same find/replace as Input Task 2 Step 3.

---

## Task 4: Fix Select focus + border radius

**Files:**
- Modify: `apps/portal/src/components/ui/select.tsx`

Figma Select (from inspection):
- All sizes: cornerRadius=4 (rounded-sm) ✓ (already fixed)
- Small: h=24 ✓ (already fixed)
- Focus: strokeWeight=2 + shadow-focus
- Hover: stroke=primary (not primary-hover) ✓ (already fixed)

- [ ] **Step 1: Fix focus state in SelectTrigger**

Find: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
Replace with: `focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-focus`

- [ ] **Step 2: Fix danger/invalid ring**

Same pattern as Input.

---

## Task 5: Fix Combobox focus

**Files:**
- Modify: `apps/portal/src/components/ui/combobox.tsx`

- [ ] **Step 1: Fix focus state on ComboboxChips**

Find the focus-within styles and update to match shadow-focus pattern.

- [ ] **Step 2: Fix danger/invalid ring**

Same pattern.

---

## Task 6: Fix Checkbox focus + icon size

**Files:**
- Modify: `apps/portal/src/components/ui/checkbox.tsx`

Figma Checkbox:
- Focus: stroke=ring, strokeWeight=1, shadow-focus (same two-shadow pattern)
- Check icon: 16×16 Icon instance inside 16×16 frame
- Indeterminate: Dash icon 16×16

- [ ] **Step 1: Fix focus state**

Find: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
Replace with: `focus-visible:border-ring focus-visible:shadow-focus`

Note: Checkbox focus does NOT use strokeWeight=2 (it stays 1px unlike inputs). Just adds shadow-focus.

- [ ] **Step 2: Fix check icon size**

Find: `[&>svg]:size-3.5` (14px)
Replace with: `[&>svg]:size-4` (16px) — matches Figma's 16×16 icon

- [ ] **Step 3: Fix danger/invalid ring**

Same pattern.

---

## Task 7: Fix Radio focus + dot size

**Files:**
- Modify: `apps/portal/src/components/ui/radio-group.tsx`

Figma Radio:
- Focus: same shadow-focus pattern as Checkbox
- Selected dot: 6×6 ✓ (already fixed)

- [ ] **Step 1: Fix focus state**

Same as Checkbox — update to shadow-focus.

- [ ] **Step 2: Fix danger/invalid ring**

Same pattern.

---

## Task 8: Fix Switch hover/press/focus

**Files:**
- Modify: `apps/portal/src/components/ui/switch.tsx`

Figma Switch (from inspection):
- **Off Default:** fill=input (#CBCBCB), no strokes, no effects. Thumb 14×14 (default) / 12×12 (small)
- **Off Hover:** fill=hover (primary@8%), stroke=primary-hover (#0E538B)
- **Off Press:** fill=press (primary@16%), stroke=primary-press (#04355D)
- **Off Focus:** fill=input, shadow-focus (blue ring + white gap)
- **On Default:** fill=primary, shadow-xs
- **On Hover:** fill=primary-hover, shadow-xs
- **On Press:** fill=primary-press, shadow-xs
- **On Focus:** fill=primary, shadow-focus

Current code issues:
- Off hover uses `ring-primary/30` but Figma uses `stroke=primary-hover`
- Missing press state for unchecked
- Focus uses `ring-3` not shadow-focus

- [ ] **Step 1: Fix unchecked hover**

Replace unchecked hover ring with: `data-unchecked:hover:border data-unchecked:hover:border-primary-hover data-unchecked:hover:bg-hover`

- [ ] **Step 2: Fix unchecked press**

Add: `data-unchecked:active:border-primary-press data-unchecked:active:bg-press`

- [ ] **Step 3: Fix focus state**

Replace `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` with `focus-visible:shadow-focus`

---

## Task 9: Fix Split Button architecture

**Files:**
- Modify: `apps/portal/src/components/ui/split-button.tsx`
- Modify: `apps/portal/src/app/components/page.tsx` (preview section)

Figma Split Button (from inspection):
- **Container:** white fill (#FFF), cornerRadius=4, horizontal auto-layout
- **Primary variant:** itemSpacing=1 (1px white gap shows through as separator), children are Button + IconButton instances with primary fill
- **Outline variant:** itemSpacing=0 (shared border), children are Button + IconButton with input stroke
- **Button child:** left corners rounded (4), right corners flat (0)
- **IconButton child:** left corners flat (0), right corners rounded (4)

The current `SplitButton` component uses complex CSS selectors and a `SplitButtonSeparator` component. The Figma design doesn't use a separator — it uses the container's white background showing through a 1px gap.

- [ ] **Step 1: Fix border radius from lg to sm**

In `splitButtonVariants`, replace all `rounded-r-lg` with `rounded-r-sm` and `rounded-b-lg` with `rounded-b-sm`.

- [ ] **Step 2: Update preview to not use SplitButtonSeparator for Primary variant**

In `page.tsx`, the Split Button preview should use the container gap approach, not the Separator component. For Primary variant, set `className="gap-px bg-background"` on the SplitButton container (1px gap with white showing through). For Outline variant, keep 0 gap.

Actually, the simpler fix: the SplitButton container already has `itemSpacing` via the CSS. The issue is that the preview JSX puts a `<SplitButtonSeparator>` between buttons. Remove the separator from the Primary previews and let the container handle it.

- [ ] **Step 3: Update preview JSX**

Replace the Split Button preview section to show proper Primary (no separator, buttons flush with 1px gap from container) and Outline (shared borders, no gap).

---

## Task 10: Fix Toggle preview to show all 4 Figma variants

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` (preview section only)

Figma Toggle has 4 variants: Default, Outline, Icon, Button (checkbox+label).
Current preview only shows Default and Outline.

- [ ] **Step 1: Update Toggle preview**

Add Icon variant (icon-only toggle) and Button variant (checkbox + label) to the preview rows.

---

## Task 11: Update portal preview force-state CSS

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx`

The `FORCE_STATE_FORM_CSS` that simulates hover/focus/press states in the VariantBar comparison table needs to match the updated component styles.

- [ ] **Step 1: Update focus state CSS**

Replace `box-shadow: 0 0 0 3px color-mix(...)` with the shadow-focus value: `box-shadow: 0 0 0 1px #fff, 0 0 0 3px var(--color-ring)`. Also add `border-width: 2px` for input-family focus.

- [ ] **Step 2: Update hover CSS for inputs**

Verify hover CSS matches: border-primary only, no bg-hover for inputs.

---

## Task 12: Visual verification

- [ ] **Step 1: Start dev server**

```bash
NODE_OPTIONS="--max-old-space-size=8192" yarn dev
```

- [ ] **Step 2: Check each component at localhost:3000/components**

Compare portal rendering against Figma screenshots. Verify:
- Focus rings show white gap + blue ring (not semi-transparent blue)
- Split Button has clean 1px separation (not grey divider)
- Checkbox icons are full 16×16
- Switch hover shows border change (not ring)
- All border radii are 4px (rounded-sm) not 8px

- [ ] **Step 3: Fix any remaining issues found during visual check**
