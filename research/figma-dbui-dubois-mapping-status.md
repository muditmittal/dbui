# Figma ↔ DBUI ↔ DuBois — Mapping Status

> Last updated: 2026-04-05
> Figma file: `OftbSQf85jOPln9RhSEhVv` (DBUI-Design-System)
> DBUI components: `apps/portal/src/components/ui/`
> DuBois source: `universe/design-system/src/design-system/`

---

## Component File Mapping (25 Figma → 24 DBUI → 23 DuBois)

| # | Figma Component | Figma Node | Code Connect | DBUI Code File | DBUI Component | DuBois Component | Status |
|---|----------------|------------|-------------|---------------|---------------|-----------------|--------|
| 1 | Button | `477:773` | `Button.figma.js` | `button.tsx` + `button-variants.ts` | `Button` | `Button` | ✅ |
| 2 | Icon Button | `566:534` | `IconButton.figma.js` | `button.tsx` + `button-variants.ts` | `Button` (icon sizes) | `Button` (icon prop) | ✅ |
| 3 | Split Button | `580:527` | `SplitButton.figma.js` | `split-button.tsx` | `SplitButton` | `SplitButton` | ✅ |
| 4 | Toggle Button | `478:613` | `ToggleButton.figma.js` | `toggle.tsx` | `Toggle` | `ToggleButton` | ✅ |
| 5 | Segment Control | `481:661` | `SegmentControl.figma.js` | `segment-control.tsx` | `SegmentControl` | `SegmentedControlGroup` | ✅ |
| 6 | Input | `722:658` | `Input.figma.js` | `input.tsx` | `Input` | `Input` | ✅ |
| 7 | Textarea | `724:658` | `Textarea.figma.js` | `textarea.tsx` | `Textarea` | `Input.TextArea` | ✅ |
| 8 | Checkbox | `713:650` | `Checkbox.figma.js` | `checkbox.tsx` | `Checkbox` | `Checkbox` | ✅ |
| 9 | Radio | `715:650` | `Radio.figma.js` | `radio-group.tsx` | `RadioGroupItem` | `Radio` | ✅ |
| 10 | Switch | `717:650` | `Switch.figma.js` | `switch.tsx` | `Switch` | `Switch` | ✅ |
| 11 | Select | `732:601` | `Select.figma.js` | `select.tsx` | `Select` | `Select` (wraps DialogCombobox) | ✅ |
| 12 | Combobox | `811:976` | `Combobox.figma.js` | `combobox.tsx` | `Combobox` | `DialogCombobox` | ✅ |
| 13 | TypeaheadCombobox | `842:889` | `TypeaheadCombobox.figma.js` | `combobox.tsx` | `ComboboxChips` | `TypeaheadCombobox` | ✅ |
| 14 | DropdownMenu | `787:706` | `DropdownMenu.figma.js` | `dropdown-menu.tsx` | `DropdownMenu` | `DropdownMenu` | ✅ |
| 15 | Dialog | `882:2798` | `Dialog.figma.js` | `dialog.tsx` | `Dialog` | `Modal` | ✅ |
| 16 | AlertDialog | `882:4236` | `AlertDialog.figma.js` | `alert-dialog.tsx` | `AlertDialog` | `Modal` (confirmation) | ✅ |
| 17 | Alert | `949:962` | `Alert.figma.js` | `alert.tsx` | `Alert` | `Alert` | ✅ |
| 18 | Toast | `968:944` | `Toast.figma.js` | `sonner.tsx` | `Toaster` (sonner) | `Notification` | ✅ |
| 19 | Tabs | `1048:1469` | `Tabs.figma.js` | `tabs.tsx` | `Tabs` | `Tabs` | ✅ |
| 20 | Slider | `1039:2406` | `Slider.figma.js` | `slider.tsx` | `Slider` | `Slider` | ✅ |
| 21 | Radio tile | `1021:3727` | `RadioTile.figma.js` | `radio-tile.tsx` | `RadioTile` | `RadioTile` | ✅ |
| 22 | Tooltip | `1060:3708` | `Tooltip.figma.js` | `tooltip.tsx` | `Tooltip` | `Tooltip` | ✅ |
| 23 | Popover | `1060:3832` | `Popover.figma.js` | `popover.tsx` | `Popover` | `Popover` | ✅ |
| 24 | HoverCard | `1071:1721` | `HoverCard.figma.js` | `hover-card.tsx` | `HoverCard` | `HoverCard` | ✅ |
| 25 | Drawer | `1060:3937` | `Drawer.figma.js` | `drawer.tsx` | `Drawer` | `Drawer` | ✅ |

**Inner component with Code Connect:**

| Figma Component | Figma Node | Code Connect | DBUI Component | DuBois Equivalent |
|----------------|------------|-------------|---------------|-------------------|
| .DropdownMenuItem | `766:671` | `DropdownMenuItem.figma.js` | `DropdownMenuItem` | `DropdownMenu.Item` |

---

## Variant Mapping — Component by Component

### 1. Button / Icon Button

| Figma Variant | DBUI `variant=` | DuBois Equivalent | Match |
|--------------|----------------|-------------------|-------|
| Primary | `"default"` | `type="primary"` | ✅ |
| Outline | `"outline"` | default (no type set) — bordered secondary | ✅ |
| Secondary | `"secondary"` | `type="tertiary"` — grey filled | ✅ |
| Ghost | `"ghost"` | — | ⚠️ Not in DuBois |
| Link | `"link"` | `type="link"` | ✅ |
| Destructive | `"destructive"` | `danger={true} type="primary"` — filled red | ✅ |
| Danger | `"danger"` | `danger={true}` (default type) — bordered red | ✅ |

> Icon Button uses the same variants minus Link (icon-only link is not a valid pattern).

### 2. Split Button

| Figma Variant | DBUI `variant=` | DuBois Equivalent | Match |
|--------------|----------------|-------------------|-------|
| Primary | `"default"` | `type="primary"` | ✅ |
| Outline | `"outline"` | `type="default"` — bordered | ✅ |

### 3. Toggle Button

| Figma Variant | DBUI `variant=` | DuBois Equivalent | Match |
|--------------|----------------|-------------------|-------|
| Default | `"default"` | (only style — no variant prop) | ✅ |
| Outline | `"outline"` | — | ⚠️ Not in DuBois |
| Button | `"button"` | — | ⚠️ Not in DuBois |
| Icon | `"icon"` + `size="icon-md"` | `icon` prop on ToggleButton | ✅ |

### 4. Segment Control

| Figma Variant | DBUI `variant=` | DuBois Equivalent | Match |
|--------------|----------------|-------------------|-------|
| Default | `"default"` | (only style — no variant prop) | ✅ |
| Outline | `"outline"` | — | ⚠️ Not in DuBois |

### 5. Input

| Figma State (functional) | DBUI Prop | DuBois Equivalent | Match |
|-------------------------|----------|-------------------|-------|
| Danger | `aria-invalid="true"` | `validationState` (error) | ✅ |
| Warning | `validation="warning"` | — | ⚠️ Not in DuBois |
| Success | `validation="success"` | — | ⚠️ Not in DuBois |

### 6. Textarea

| Figma State (functional) | DBUI Prop | DuBois Equivalent | Match |
|-------------------------|----------|-------------------|-------|
| Danger | `aria-invalid="true"` | Inherits from Input | ✅ |

> DBUI Textarea also supports `validation="warning|success"` — Figma doesn't expose these as Textarea states.

### 7. Checkbox

| Figma Checked | DBUI Prop | DuBois Equivalent | Match |
|--------------|----------|-------------------|-------|
| Unchecked | (default) | `isChecked={false}` | ✅ |
| Checked | `defaultChecked` | `isChecked={true}` | ✅ |
| Indeterminate | `indeterminate` | `isChecked={null}` | ✅ |

### 8. Radio

| Figma Selected | DBUI Prop | DuBois Equivalent | Match |
|---------------|----------|-------------------|-------|
| false | (default) | Standard radio | ✅ |
| true | `RadioGroup defaultValue` | `Radio.Group value` | ✅ |

### 9. Switch

| Figma On | DBUI Prop | DuBois Equivalent | Match |
|---------|----------|-------------------|-------|
| false | (default) | `checked={false}` | ✅ |
| true | `defaultChecked` | `checked={true}` | ✅ |

### 10. Select

| Figma Type | DBUI `variant=` | DuBois Equivalent | Match |
|-----------|----------------|-------------------|-------|
| Default | `"default"` | Default trigger (bordered) | ✅ |
| Ghost | `"ghost"` | `isBare={true}` on DialogComboboxTrigger | ✅ |

### 11. Combobox

No variant props. All three systems: searchable single-select. ✅

### 12. TypeaheadCombobox

No variant props. All three systems: multi-select with chips/tags. ✅

### 13. DropdownMenu

No variant props at the menu level. Item types mapped below. ✅

### 14. .DropdownMenuItem (inner component)

| Figma Type | DBUI Component | DuBois Equivalent | Match |
|-----------|---------------|-------------------|-------|
| Action | `DropdownMenuItem` | `DropdownMenu.Item` | ✅ |
| SingleSelect | `DropdownMenuRadioItem` | `DropdownMenu.RadioItem` | ✅ |
| MultiSelect | `DropdownMenuCheckboxItem` | `DropdownMenu.CheckboxItem` | ✅ |
| Submenu | `DropdownMenuSubTrigger` | `DropdownMenu.SubTrigger` | ✅ |
| Destructive | `DropdownMenuItem variant="destructive"` | — | ⚠️ Not in DuBois |

### 15. Dialog

No visual variants — size only (mapped via `.DialogBody` inner component).

| Figma .DialogBody Size | DBUI `size=` | DuBois `size=` | Match |
|-----------------------|-------------|---------------|-------|
| Normal · 640px | `"normal"` | `"normal"` | ✅ |
| Wide · 880px | `"wide"` | `"wide"` | ✅ |
| Extrawide · 1200px | `"extrawide"` | `"extraWide"` | ✅ |

### 16. AlertDialog

No visual variants. DBUI adds `size="default|sm"` for layout (centered vs compact). DuBois handles this within Modal. ✅

### 17. Alert

| Figma Variant | DBUI `variant=` | DuBois `type=` | Match |
|--------------|----------------|---------------|-------|
| Info | `"info"` | `"info"` | ✅ |
| Warning | `"warning"` | `"warning"` | ✅ |
| Danger | `"destructive"` | `"error"` | ✅ (name differs) |
| Success | `"success"` | — | ⚠️ Not in DuBois |

> DBUI Alert also has `"danger"` (bordered red) and `"default"` (neutral) variants — Figma has `Layout: Inline|Stacked` instead.

### 18. Toast

| Figma Type | DBUI (sonner) | DuBois (Notification) | Match |
|-----------|--------------|----------------------|-------|
| Success | `toast.success()` | — | ⚠️ |
| Info | `toast.info()` | — | ⚠️ |
| Warning | `toast.warning()` | — | ⚠️ |
| Error | `toast.error()` | — | ⚠️ |

> DuBois Notification is a Radix Toast compound with no typed variants. DBUI uses sonner which provides typed toasts out of the box. Different architecture — not a gap, just a different approach.

---

### 19. Tabs

Tabs is a single component (not a component set). The tab bar is composed from `.TabItem` inner components. No variant axis on the outer component — matches DuBois lined tabs pattern.

| Feature | DBUI | DuBois | Match |
|---------|------|--------|-------|
| Lined tabs (standard) | `variant="default"` | `Tabs` (default) | ✅ |
| Pill tabs (shadcn-style) | `variant="pill"` | — | ⚠️ Not in DuBois |

> DBUI also has a `pill` variant (muted bg container) from shadcn. DuBois only has lined.

### 20. Slider

No visual variants. States (Default/Hover/Press/Focus/Disabled) are CSS-driven. Single vs range is controlled by passing an array value.

| Feature | DBUI | DuBois | Match |
|---------|------|--------|-------|
| Single slider | `defaultValue={[50]}` | Single thumb | ✅ |
| Range slider | `defaultValue={[25, 75]}` | Multi-thumb via array | ✅ |
| Disabled | `disabled` | `State=Disabled` | ✅ |

### 21. Radio tile

| Figma Property | DBUI Prop | DuBois Equivalent | Match |
|---------------|----------|-------------------|-------|
| Selected=False | (default) | Standard RadioTile | ✅ |
| Selected=True | `RadioTileGroup defaultValue` | Selected RadioTile | ✅ |
| Icon (boolean) | Icon via children | Icon support | ✅ |
| Text (boolean) | Description via children | Support text | ✅ |

---

### 22. Tooltip

No variants. Single component — dark bg, white text, arrow. All three systems match. ✅

### 23. Popover

No variants. Overlay card with title, description, content slot. All three systems match. ✅

### 24. HoverCard

No variants. Preview card triggered on hover with avatar + content. All three systems match. ✅

### 25. Drawer

| Feature | DBUI | DuBois | Match |
|---------|------|--------|-------|
| Direction (left/right/top/bottom) | `direction` prop (Vaul) | — (right only implied) | ✅ |
| Size | Via className | `size="default\|small"` | ✅ |

---

## Gap Summary

All gaps are **additive** — DBUI/Figma extends DuBois with more variants. There are zero cases where DuBois has a variant missing from DBUI/Figma.

| # | Gap | Where it exists | Missing from | Reason |
|---|-----|----------------|-------------|--------|
| 1 | `ghost` button variant | Figma + DBUI | DuBois | Common UI pattern for toolbar/nav actions without chrome. Widely used in modern design systems. |
| 2 | `outline` toggle button | Figma + DBUI | DuBois | Provides a bordered toggle option to match the outline button family. Useful for form-embedded toggles. |
| 3 | `button` toggle variant | Figma + DBUI | DuBois | Toggle that looks like a regular button — fills primary when selected. For toolbar actions where toggle state needs high visibility. |
| 4 | `outline` segment control | Figma + DBUI | DuBois | Alternative segment style that reads as a button group. Matches outline toggle pattern. |
| 5 | `warning` input validation | Figma + DBUI | DuBois | Enables amber validation state for non-blocking warnings (e.g., "Name already exists but you can proceed"). |
| 6 | `success` input validation | Figma + DBUI | DuBois | Enables green validation state for confirmed-valid fields (e.g., "Connection test passed"). |
| 7 | `destructive` menu item | Figma + DBUI | DuBois | Red-styled menu item for dangerous actions (e.g., "Delete workspace"). Common in macOS/GitHub-style menus. |
| 8 | `success` alert | Figma + DBUI | DuBois | Green success banner for confirmations (e.g., "Cluster created successfully"). DuBois Alert only has info/error/warning. |
| 9 | `pill` tabs variant | DBUI only (code) | DuBois + Figma | Muted-bg pill-style tabs from shadcn. DuBois only has lined tabs. Kept in code as an option but not in Figma. |
| 10 | Typed toasts | Figma + DBUI (sonner) | DuBois (Radix Toast) | DuBois Notification has no semantic types — it's a raw toast compound. DBUI uses sonner which provides success/info/warning/error out of the box. Architectural difference, not a missing variant. |

---

## Reading This Report

- **Status ✅** = variant exists in all three systems (Figma, DBUI, DuBois) with a clear mapping
- **Status ⚠️** = variant exists in Figma + DBUI but has no DuBois equivalent (additive gap)
- **Figma Variant** = the value shown in Figma's variant property dropdown
- **DBUI Prop** = the React prop/value used in code
- **DuBois Equivalent** = the closest matching prop/value in the current DuBois codebase
- Interactive states (hover, press, focus, disabled, loading) are excluded — they're CSS-driven in all systems
- Size variants are excluded except where they carry semantic meaning (Dialog sizes)
