# Figma ↔ Code Connect Component Map

> Last updated: 2026-04-05
> Figma file: `OftbSQf85jOPln9RhSEhVv` (DBUI-Design-System)

## Top-Level Components (25 in Figma → 24 code components)

Button and Icon Button share a single DBUI component (`Button` with icon-size variants).

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
| 22 | Tooltip | `1069:1573` | `Tooltip.figma.js` | `tooltip.tsx` | `Tooltip` | `Tooltip` | ✅ |
| 23 | Popover | `1070:1573` | `Popover.figma.js` | `popover.tsx` | `Popover` | `Popover` | ✅ |
| 24 | HoverCard | `1071:1721` | `HoverCard.figma.js` | `hover-card.tsx` | `HoverCard` | `HoverCard` | ✅ |
| 25 | Drawer | `1072:1721` | `Drawer.figma.js` | `drawer.tsx` | `Drawer` | `Drawer` | ✅ |

## Inner Components with Code Connect

| Figma Component | Figma Node | Code Connect | DBUI Code File | DBUI Component | DuBois Component | Status |
|----------------|------------|-------------|---------------|---------------|-----------------|--------|
| .DropdownMenuItem | `766:671` | `DropdownMenuItem.figma.js` | `dropdown-menu.tsx` | `DropdownMenuItem` | `DropdownMenu.Item` | ✅ |

## Inner Components (Figma only, no Code Connect needed)

These are building blocks used inside top-level components. They don't appear independently in code.

| Figma Component | Figma Node | Used By |
|----------------|------------|---------|
| .ActionLabel | `692:557` | Button, Toggle Button, Segment Control |
| .InputContent | `670:550` | Input |
| .MenuLabel | `763:595` | .DropdownMenuItem |
| .MenuTrailing | `764:602` | .DropdownMenuItem |
| .MenuRow | `786:826` | DropdownMenu |
| .SegmentControlItem | `589:898` | Segment Control |
| .Chip | `858:1106` | TypeaheadCombobox |
| .DialogBody | `882:3980` | Dialog (Size: Normal 640px / Wide 880px / Extrawide 1200px) |
| .AlertDialogBody | — | AlertDialog |
| .TabItem | `1047:1687` | Tabs (State: Default/Hover/Press/Active/Disabled) |
| .Thumb | — | Slider (inner thumb with handle) |

## Figma → Code Naming Map

| Figma Name | Code Prop | Notes |
|------------|-----------|-------|
| Variant: Primary | `variant="default"` | CVA default |
| Variant: Danger | `variant="danger"` | Bordered red, distinct from filled destructive |
| Size: Default | `size="md"` or `size="default"` | 32px height |
| Size: Small | `size="sm"` | 24px height |
| State: Disabled | `disabled` attribute | HTML attribute |
| State: Danger | `aria-invalid="true"` | ARIA attribute |
| State: Warning | `validation="warning"` | Input/Textarea only |
| State: Success | `validation="success"` | Input/Textarea only |
| State: Selected | `defaultPressed` (Toggle), `defaultChecked` (Checkbox/Switch) | Varies by component |
| Checked: Indeterminate | `indeterminate` prop | Checkbox only |
| Dialog Size: Normal | `size="normal"` (640px) | Default |
| Dialog Size: Wide | `size="wide"` (880px) | |
| Dialog Size: Extrawide | `size="extrawide"` (1200px) | |

## File Locations

- **DBUI code components:** `apps/portal/src/components/ui/`
- **Button variants:** `apps/portal/src/lib/button-variants.ts`
- **Code Connect files:** `apps/portal/src/figma/*.figma.js`
- **Icon Code Connect:** `apps/dbui/src/components/icons/icons.figma.tsx`
- **Config:** `figma.config.json` (repo root)
