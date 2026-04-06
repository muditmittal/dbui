# DuBois ↔ DBUI Component Mapping — Comprehensive Study

> Variant-by-variant comparison of DuBois and DBUI for Buttons, Text Inputs, and Selection Controls.
> Created: 2026-04-05. Sources: DuBois reference doc, BUTTON-STUDY.md, DBUI codebase, selection-controls.md.

---

## 1. BUTTONS

### 1a. Button

| # | DuBois Prop/Variant | DuBois Value | DBUI Code Equivalent | DBUI Figma | Status |
|---|---|---|---|---|---|
| | **Variant / Type** | | | | |
| 1 | `type="primary"` | Filled blue button | `variant="default"` | Variant=Primary | ✅ Match |
| 2 | Default (no type) = Secondary | Bordered button | `variant="outline"` | Variant=Outline | ✅ Match |
| 3 | `type="tertiary"` | Borderless, blue text | `variant="ghost"` | Variant=Ghost | ⚡ Tweaked — DBUI uses grey foreground, not blue text. Intentional. |
| 4 | `type="link"` | Text with underline on hover | `variant="link"` | Variant=Link | ✅ Match |
| 5 | `danger` + `type="primary"` | Filled red | `variant="destructive"` | Variant=Destructive | ✅ Match |
| 6 | `danger` + default | Red bordered | `variant="danger"` | Variant=Danger | ✅ Match |
| 7 | — | — | `variant="secondary"` | Variant=Secondary | ➕ DBUI-only — grey filled, not in DuBois |
| | **Sizes** | | | | |
| 8 | `size="middle"` (default) | 32px | `size="md"` | Size=Default (32px) | ✅ Match |
| 9 | `size="small"` | 24px | `size="sm"` | Size=Small (24px) | ✅ Match |
| 10 | — | — | `size="icon-md"` | Icon Button 32×32 | ✅ Separate Figma component (IconButton) |
| 11 | — | — | `size="icon-sm"` | Icon Button 24×24 | ✅ Separate Figma component |
| | **Icon Handling** | | | | |
| 12 | `icon` prop (start position) | Icon before label | `.ActionLabel` Show Icon=true | .ActionLabel | ✅ Match |
| 13 | `endIcon` prop | Icon after label | `.ActionLabel` Show Icon (swap position) | .ActionLabel | ✅ Match — same component, swap icon |
| 14 | `icon` without children | Icon-only mode | IconButton component | IconButton | ✅ Match |
| | **States** | | | | |
| 15 | Default | Resting | ✅ | State=Default | ✅ Match |
| 16 | Hover | Mouse over | ✅ CSS hover | State=Hover | ✅ Match |
| 17 | Active/Press | Mouse down | ✅ CSS active | State=Press | ✅ Match |
| 18 | Focus | Keyboard focus | ✅ CSS focus-visible | State=Focus | ✅ Match |
| 19 | `disabled` | Non-interactive | ✅ disabled attr | State=Disabled | ✅ Match |
| 20 | `loading` / `loadingDescription` | Spinner + disabled | ❌ No native loading prop | State=Loading (Figma) | ⚠️ Gap — Figma has Loading state but code doesn't have `loading` prop |
| | **Other Props** | | | | |
| 21 | `href` | Renders as `<a>` | ✅ `render={<a>}` via Base-UI | — | ✅ Match (code pattern) |
| 22 | `htmlType` | submit/reset/button | ✅ `type` HTML attr | — | ✅ Match |
| 23 | `aria-expanded` | Menu trigger styling | ✅ accent bg on expanded | — | ✅ Match |

### 1b. SplitButton

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `type="default"` | Secondary + dropdown | `SplitButton` + `Button variant="outline"` | SplitButton | ✅ Match |
| 2 | `type="primary"` | Primary + dropdown | `SplitButton` + `Button variant="default"` | SplitButton | ✅ Match |
| 3 | `size="middle"` | 32px | Inherits Button md | Figma Default | ✅ Match |
| 4 | `size="small"` | 24px | Inherits Button sm | Figma Small | ✅ Match |
| 5 | `dropdownMenuRootProps` | Menu config | `DropdownMenu` as child | SplitButton composition | ✅ Match |

### 1c. ToggleButton

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `pressed` / `defaultPressed` | Boolean pressed state | `pressed` via Toggle primitive | ToggleButton Selected state | ✅ Match |
| 2 | `size="middle"` | 32px | `size="md"` | Size=Default | ✅ Match |
| 3 | `size="small"` | 24px | `size="sm"` | Size=Small | ✅ Match |
| 4 | `icon` | Icon content | Children content | Icon via Toggle | ✅ Match |
| 5 | Default + Outline variants | Two visual styles | `variant="default" \| "outline"` | Variant=Default, Outline | ✅ Match |

### 1d. SegmentedControl

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `SegmentedControlGroup` | Container, RadioGroup-based | `SegmentControl` (ToggleGroup-based) | SegmentControl | ✅ Match |
| 2 | `SegmentedControlButton` | Individual segment | `SegmentControlItem` | .SegmentControlItem | ✅ Match |
| 3 | `size="middle"` | 32px | `size="md"` | Size=Default | ✅ Match |
| 4 | `size="small"` | 24px | `size="sm"` | Size=Small | ✅ Match |
| 5 | `onlyIcon` | Icon-only segments | Icon support in children | Supported | ✅ Match |
| 6 | — | — | `orientation="vertical"` | — | ➕ DBUI-only — DuBois is horizontal only |

---

## 2. TEXT INPUTS

### 2a. Input

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| | **Sizes** | | | | |
| 1 | `size="middle"` (default) | 32px | `size="default"` | Size=Default (32px) | ✅ Match |
| 2 | `size="small"` | 24px | `size="sm"` | Size=Small (24px) | ✅ Match |
| | **Validation States** | | | | |
| 3 | `validationState="error"` | Red border + ring | `aria-invalid="true"` | State=Danger | ✅ Match |
| 4 | `validationState="warning"` | Yellow/amber treatment | ❌ | ❌ | ❌ Gap — DuBois has warning, DBUI doesn't |
| 5 | `validationState="success"` | Green treatment | ❌ | ❌ | ❌ Gap — DuBois has success, DBUI doesn't |
| | **Other States** | | | | |
| 6 | Default | Resting | ✅ | State=Default | ✅ Match |
| 7 | Hover | Mouse over | ✅ CSS hover | State=Hover | ✅ Match |
| 8 | Focus | Keyboard focus | ✅ CSS focus-visible | State=Focus | ✅ Match |
| 9 | `disabled` | Non-interactive | ✅ disabled attr | State=Disabled | ✅ Match |
| 10 | Active/Press | Mouse down | ✅ CSS active | State=Press | ✅ Match |
| | **Special Props** | | | | |
| 11 | `locked` | Read-only with lock icon | ❌ | ❌ | 🚫 Excluded — rare pattern, compose with InputGroup + lock icon |
| 12 | `hasValue` | Styling for filled state | N/A — CSS handles via `:not(:placeholder-shown)` | N/A | 🚫 Excluded — CSS handles this |
| 13 | `type` | text, password, number, etc. | ✅ HTML type attr | N/A | ✅ Match |

### 2b. Input.Password

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `Input.Password` | Password input with toggle | `InputGroup` + `InputGroupButton` composition | Not a dedicated component | 🚫 Excluded — compose with InputGroup (eye icon + toggle) |

### 2c. Input.TextArea / Textarea

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `Input.TextArea` | Multi-line text input | `Textarea` (standalone) | Textarea (6 variants) | ✅ Match |
| 2 | `autoSize` | Auto-expand height | ❌ | ❌ | ❌ Gap — would need JS implementation |
| 3 | Validation states | Same as Input | `aria-invalid` for error only | State=Danger | ⚠️ Partial — only error, no warning/success |

### 2d. Input.Group / InputGroup

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `Input.Group` | Prefix/suffix container | `InputGroup` | .InputContent (Figma inner component) | ✅ Match |
| 2 | Prefix addon | Text/icon before input | `InputGroupAddon align="inline-start"` | .InputContent with icon | ✅ Match |
| 3 | Suffix addon | Text/icon/button after input | `InputGroupAddon align="inline-end"` | .InputContent with icon | ✅ Match |
| 4 | Button addon | Action button inside input | `InputGroupButton` | Button instance inside | ✅ Match |

### 2e. Label / Field

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `Label` component | Form label with `required`, `infoPopoverProps` | ❌ No dedicated Label component | ❌ | ❌ Gap — no Field/Label wrapper component |
| 2 | `FormMessage` | Error message display | ❌ | ❌ | ❌ Gap — no form error message component |
| 3 | `required` indicator | Asterisk on label | ❌ | ❌ | ❌ Gap — compose manually |

---

## 3. SELECTION CONTROLS

### 3a. Checkbox

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `isChecked={true}` | Checked state | `defaultChecked` / controlled | Checked=Checked | ✅ Match |
| 2 | `isChecked={false}` | Unchecked state | Default (no prop) | Checked=Unchecked | ✅ Match |
| 3 | `isChecked={null}` | Indeterminate | `indeterminate` prop | Checked=Indeterminate | ✅ Match |
| 4 | `isDisabled` | Disabled | `disabled` | State=Disabled | ✅ Match |
| 5 | `onChange` | Change handler | `onCheckedChange` (Base-UI) | N/A | ✅ Match (code) |
| 6 | `CheckboxGroup` | Group container, `layout="vertical \| horizontal"` | ❌ No dedicated group component | ❌ No Figma group | ❌ Gap — compose with flex container |
| 7 | States: Default, Hover, Press, Focus | | ✅ All CSS states | All in Figma | ✅ Match |
| 8 | `aria-invalid` | Error styling | ✅ | ❌ No Danger state in Figma | ⚠️ Gap — code has invalid, Figma Checkbox has no Danger state |

### 3b. Radio

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `Radio.Group` | Group container | `RadioGroup` | ❌ No Figma group | ⚠️ Gap — code has group, no Figma component |
| 2 | `layout="vertical"` | Vertical stacking | `className="flex flex-col gap-2"` | ❌ | 🚫 Excluded — compose with CSS |
| 3 | `layout="horizontal"` | Horizontal stacking | `className="flex gap-2"` | ❌ | 🚫 Excluded — compose with CSS |
| 4 | Individual radio item | | `RadioGroupItem` | Radio (10 variants) | ✅ Match |
| 5 | Selected/unselected | | `data-checked` | Selected=true/false | ✅ Match |
| 6 | `disabled` | | `disabled` | State=Disabled | ✅ Match |
| 7 | States: Default, Hover, Press, Focus | | ✅ All CSS states | All in Figma | ✅ Match |

### 3c. Switch

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `checked` / `defaultChecked` | On/off state | ✅ Same props | On=true/false | ✅ Match |
| 2 | `disabled` | Disabled | ✅ | State=Disabled | ✅ Match |
| 3 | `checkedChildren` | Text inside track when on | ❌ | ❌ | 🚫 Excluded — DuBois-specific, rarely used |
| 4 | `unCheckedChildren` | Text inside track when off | ❌ | ❌ | 🚫 Excluded — same |
| 5 | `size` | No sizes in DuBois | `size="sm" \| "default"` | ❌ No size variant in Figma | ⚠️ Gap — code has size, Figma doesn't |
| 6 | States: Default, Hover, Press, Focus | | ✅ All CSS states | All in Figma | ✅ Match |

### 3d. Select (Simple/Static)

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| | **Trigger** | | | | |
| 1 | `placeholder` | Placeholder text | `SelectValue placeholder=` | Select trigger Text prop | ✅ Match |
| 2 | `size` | Via DialogComboboxTrigger `triggerSize` | `SelectTrigger size="sm" \| "default"` | Size=Default/Small | ✅ Match |
| 3 | `validationState` | Error on trigger | `aria-invalid` | State=Danger | ✅ Match |
| 4 | `disabled` | Disabled trigger | `disabled` | State=Disabled | ✅ Match |
| 5 | States: Hover, Focus | | ✅ CSS | State=Hover, Focus, Press | ✅ Match |
| 6 | `value` (single string) | DuBois Select wraps DialogCombobox with single-select | ✅ Single value | — | ✅ Match |
| | **Content / Dropdown** | | | | |
| 7 | `SelectOption` | Single-select item | `SelectItem` | .SelectItem | ✅ Match |
| 8 | `SelectOptionGroup` | Group header | `SelectGroup` + `SelectLabel` | .MenuGroup + .MenuRow Type=Header | ✅ Match |
| 9 | Separator | | `SelectSeparator` | .MenuSeparator / .MenuRow Type=Divider | ✅ Match |
| 10 | Check indicator | Left side (DuBois convention) | Right side (DBUI code) | Left side (Figma .SelectItem) | ⚡ Difference — DuBois=left, DBUI code=right, Figma=left. Need to align. |
| 11 | `disabled` on item | Disabled with tooltip | `disabled` on item | .SelectItem State=Disabled | ⚠️ Partial — no `disabledReason` tooltip |

### 3e. Combobox (= DuBois DialogCombobox)

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| | **Root** | | | | |
| 1 | `value` (string[]) | Always array | `Combobox` root manages value | Combobox trigger | ✅ Match |
| 2 | `multiSelect` | Multi-selection mode | Via `DropdownMenuCheckboxItem` pattern | .DropdownMenuItem Type=MultiSelect | ✅ Match |
| 3 | `stayOpenOnSelection` | Keep open after pick | Base-UI handles via `closeOnSelect` | N/A | ✅ Match (code) |
| 4 | `label` / `id` | Accessibility | ✅ | N/A | ✅ Match |
| | **Trigger (DialogComboboxTrigger)** | | | | |
| 5 | Single value display | "Selected Item" | `ComboboxValue` / text in trigger | Combobox trigger Text prop | ✅ Match |
| 6 | Multi-value comma display | "Item1, Item2, Item3" | ❌ No comma-separated display | Combobox trigger Text = comma string | ⚠️ Partial — Figma supports via text override, code needs custom render |
| 7 | `showTagAfterValueCount` | Collapse to "+N" badge | ❌ | Combobox Show Badge + .CountBadge | ⚠️ Figma only — code gap |
| 8 | `allowClear` / `onClear` | Clear (×) button | `ComboboxClear` / `showClear` | Combobox Show Clear | ✅ Match |
| 9 | `withInlineLabel` | "Label: Value" pattern | ❌ | Combobox Show Label + Label text | ⚠️ Figma only — code gap |
| 10 | `withChevronIcon` | Show/hide chevron | ✅ Default behavior | Chevron in trigger | ✅ Match |
| 11 | `isBare` | Borderless trigger | ❌ | ❌ | 🚫 Excluded — niche pattern |
| 12 | `triggerSize` | Button size variant | N/A (inherits input sizing) | Size=Default/Small | ✅ Match |
| 13 | `renderDisplayedValue` | Custom value renderer | ❌ | ❌ | 🚫 Excluded — compose in code |
| 14 | `removable` / `onRemove` | Removable trigger tag | ❌ | ❌ | 🚫 Excluded — niche |
| 15 | `validationState` | Error state | `aria-invalid` | State=Danger | ✅ Match |
| | **Content** | | | | |
| 16 | `DialogComboboxContent` | Popover container | `ComboboxContent` | SelectDropdown / DropdownMenu compositions | ✅ Match |
| 17 | `matchTriggerWidth` | Width matches trigger | ✅ CSS `w-(--anchor-width)` | N/A | ✅ Match |
| 18 | `loading` | Loading state in content | ❌ | .MenuRow Type=Loading | ⚠️ Figma only — code gap |
| 19 | `textOverflowMode` | Ellipsis vs multiline | ❌ | ❌ | 🚫 Excluded — CSS handles |
| | **Items** | | | | |
| 20 | `DialogComboboxOptionListSelectItem` | Radio-style single-select | `SelectItem` / `ComboboxItem` | .SelectItem / .ComboboxItem | ✅ Match |
| 21 | `DialogComboboxOptionListCheckboxItem` | Checkbox multi-select | `DropdownMenuCheckboxItem` | .DropdownMenuItem Type=MultiSelect | ✅ Match |
| 22 | `indeterminate` on checkbox item | Partial selection | ❌ | ❌ | 🚫 Excluded — rare |
| 23 | `icon` on item | Leading icon | `.MenuLabel` Show Icon | .MenuLabel Show Icon=true | ✅ Match |
| 24 | `hintColumn` / `hintColumnWidthPercent` | Right-side metadata text | ❌ Code gap | `.MenuTrailing` Type=Hint | ⚠️ Figma only — code could use `DropdownMenuShortcut` |
| 25 | `disabled` / `disabledReason` | Disabled with tooltip | `disabled` (no reason tooltip) | State=Disabled | ⚠️ Partial — no reason tooltip |
| 26 | `dangerouslyHideCheck` | Hide check indicator | ❌ | ❌ | 🚫 Excluded — discouraged by DuBois |
| | **Supporting Components** | | | | |
| 27 | `DialogComboboxOptionListSearch` | Search input in dropdown | `.MenuRow` Type=Search (Figma) | .MenuRow Type=Search | ✅ Match |
| 28 | `DialogComboboxSectionHeader` | Group header | `.MenuGroup` / `.MenuRow` Type=Header | .MenuRow Type=Header | ✅ Match |
| 29 | `DialogComboboxSeparator` | Divider | `.MenuSeparator` / `.MenuRow` Type=Divider | .MenuRow Type=Divider | ✅ Match |
| 30 | `DialogComboboxEmpty` | Empty state | `ComboboxEmpty` | .MenuRow Type=Empty | ✅ Match |
| 31 | `DialogComboboxFooter` | Footer area | ❌ Code gap | .MenuRow Type=Footer | ⚠️ Figma only — code gap |
| 32 | `DialogComboboxAddButton` | "Add new" action | ❌ Code gap | .MenuRow Type=Add New | ⚠️ Figma only — code gap |
| 33 | `DialogComboboxCountBadge` | "+N" overflow badge | ❌ Code gap | .CountBadge | ⚠️ Figma only — code gap |

### 3f. TypeaheadCombobox (Chip-based searchable select)

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| | **Input / Trigger** | | | | |
| 1 | `TypeaheadComboboxInput` | Single-select search input | `ComboboxInput` | Combobox trigger (searchable) | ✅ Match |
| 2 | `TypeaheadComboboxMultiSelectInput` | Multi-select with chips | `ComboboxChips` + `ComboboxChipsInput` | TypeaheadCombobox trigger | ✅ Match |
| 3 | `TypeaheadComboboxSelectedItem` | Individual chip/tag | `ComboboxChip` | .Chip | ✅ Match |
| 4 | `showTagAfterValueCount` | Collapse chips to "+N" | ❌ Code gap | ❌ Not in TypeaheadCombobox Figma yet | ❌ Gap — both code and Figma |
| 5 | `allowClear` | Clear all button | `showClear` on ComboboxInput | TypeaheadCombobox Show Clear | ✅ Match |
| 6 | `showComboboxToggleButton` | Show chevron toggle | ✅ Chevron in trigger | Chevron in TypeaheadCombobox | ✅ Match |
| 7 | `clearInputValueOnFocus` | Clear search on focus | ❌ | N/A | 🚫 Excluded — behavior prop |
| 8 | `removeSelectedItem` | Remove chip callback | `ComboboxChipRemove` | .Chip Removable prop | ✅ Match |
| | **Menu Items** | | | | |
| 9 | `TypeaheadComboboxMenuItem` | Single-select item | `ComboboxItem` | .ComboboxItem | ✅ Match |
| 10 | `TypeaheadComboboxCheckboxItem` | Multi-select checkbox item | ❌ No ComboboxCheckboxItem | ❌ No .ComboboxCheckboxItem | ❌ Gap — multi-select in Typeahead uses checkbox items |
| 11 | `isDisabled` / `disabledReason` | Disabled with tooltip | `disabled` (no reason) | State=Disabled | ⚠️ Partial |
| 12 | `hintContent` | Right-side hint text | ❌ | `.MenuTrailing` Type=Hint | ⚠️ Figma only |
| 13 | `textOverflowMode` | Ellipsis vs multiline | ❌ | ❌ | 🚫 Excluded |
| | **Supporting** | | | | |
| 14 | `TypeaheadComboboxSectionHeader` | Group header | `ComboboxGroup` + `ComboboxLabel` | .MenuRow Type=Header | ✅ Match |
| 15 | `TypeaheadComboboxSeparator` | Divider | `ComboboxSeparator` | .MenuRow Type=Divider | ✅ Match |
| 16 | `TypeaheadComboboxFooter` | Footer area | ❌ Code gap | .MenuRow Type=Footer | ⚠️ Figma only |
| 17 | `TypeaheadComboboxAddButton` | "Add new" action | ❌ Code gap | .MenuRow Type=Add New | ⚠️ Figma only |

### 3g. DropdownMenu

| # | DuBois Prop | DuBois Value | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|---|
| 1 | `DropdownMenu.Root` | Root | `DropdownMenu` | DropdownMenu | ✅ Match |
| 2 | `DropdownMenu.Trigger` | Trigger | `DropdownMenuTrigger` | Button with Show Menu=true | ✅ Match |
| 3 | `DropdownMenu.Content` | Popover content | `DropdownMenuContent` | DropdownMenu composition | ✅ Match |
| 4 | `DropdownMenu.Item` | Action item | `DropdownMenuItem` | .DropdownMenuItem Type=Action | ✅ Match |
| 5 | `variant="destructive"` on Item | Red destructive item | `variant="destructive"` | ❌ No destructive variant in Figma .DropdownMenuItem | ❌ Gap — code has destructive item variant, Figma doesn't |
| 6 | `DropdownMenu.CheckboxItem` | Checkbox multi-select | `DropdownMenuCheckboxItem` | .DropdownMenuItem Type=MultiSelect | ✅ Match |
| 7 | `DropdownMenu.RadioGroup` + `RadioItem` | Radio single-select | `DropdownMenuRadioGroup` + `RadioItem` | .DropdownMenuItem Type=SingleSelect | ✅ Match |
| 8 | `DropdownMenu.SubTrigger` + `SubContent` | Nested submenu | `DropdownMenuSub` + `SubTrigger` + `SubContent` | .DropdownMenuItem Type=Submenu | ✅ Match |
| 9 | `DropdownMenu.Label` | Group label | `DropdownMenuLabel` | .MenuRow Type=Header | ✅ Match |
| 10 | `DropdownMenu.Separator` | Divider | `DropdownMenuSeparator` | .MenuRow Type=Divider | ✅ Match |
| 11 | `inset` on items | Left padding for alignment | `inset` prop | ❌ No Figma equivalent | ⚠️ Code-only — CSS layout prop |
| 12 | Shortcut text | "⌘K" right-aligned | `DropdownMenuShortcut` | `.MenuTrailing` Type=Hint | ✅ Match |

### 3h. ContextMenu

| # | DuBois | DBUI Code | DBUI Figma | Status |
|---|---|---|---|---|
| 1 | Full compound (same sub-components as DropdownMenu) | ❌ No ContextMenu in portal code | ❌ No Figma component | ❌ Gap — but shares identical visuals with DropdownMenu |

---

## Summary: Gap Inventory

### Gaps to Close (prioritized)

| Priority | Gap | Component | Where | Action |
|----------|-----|-----------|-------|--------|
| 🔴 High | Button `loading` prop | Button | Code | Add `loading` + `loadingText` props |
| 🔴 High | Combobox footer/add-new in code | Combobox | Code | Add footer slot and add-new pattern |
| 🔴 High | ComboboxCountBadge in code | Combobox | Code | Add `showTagAfterValueCount` + CountBadge |
| 🟡 Med | Input warning/success validation | Input | Code + Figma | Add `validationState` or `data-state` pattern |
| 🟡 Med | DropdownMenuItem destructive variant in Figma | DropdownMenu | Figma | Add visual for destructive text items |
| 🟡 Med | ComboboxCheckboxItem for TypeaheadCombobox | Combobox | Code + Figma | Add checkbox item variant for multi-select typeahead |
| 🟡 Med | Switch size variant in Figma | Switch | Figma | Add Small size to Figma Switch |
| 🟡 Med | Checkbox Danger state in Figma | Checkbox | Figma | Add Danger/invalid visual state |
| 🟡 Med | Combobox inline label in code | Combobox | Code | Add `withInlineLabel` / `label` prop to trigger |
| 🟢 Low | CheckboxGroup component | Checkbox | Code | Add group wrapper with layout prop |
| 🟢 Low | RadioGroup Figma component | Radio | Figma | Composition showing radio group |
| 🟢 Low | Label/Field wrapper | Form | Code + Figma | Add Label + FormMessage components |
| 🟢 Low | ContextMenu | Context | Code + Figma | Port DropdownMenu visuals to ContextMenu |
| 🟢 Low | Textarea autoSize | Textarea | Code | JS auto-resize behavior |

### Intentional Exclusions

| Excluded | Reason |
|----------|--------|
| DuBois `locked` input state | Rare — compose with InputGroup + lock icon |
| DuBois `isBare` trigger | Niche borderless pattern |
| DuBois `renderDisplayedValue` | Code composition pattern, not a component |
| DuBois `checkedChildren`/`unCheckedChildren` on Switch | DuBois-specific, not standard |
| DuBois `indeterminate` checkbox in menus | Rare edge case |
| DuBois `dangerouslyHideCheck` | Discouraged by DuBois itself |
| DuBois `clearInputValueOnFocus` | Behavior prop, not visual |
| DuBois `textOverflowMode` | CSS handles this |

### DBUI-Only Additions (not in DuBois)

| Addition | Component | Rationale |
|----------|-----------|-----------|
| `variant="secondary"` (grey filled) | Button | Useful for lower-emphasis actions |
| `variant="danger"` (red bordered) | Button | Distinct from filled destructive |
| Line tabs variant | Tabs | Common UI pattern, DuBois only has pill-style |
| SegmentControl vertical orientation | SegmentControl | Extended flexibility |
| `.MenuRow` composition system | All menus | Cleaner Figma architecture than DuBois's per-component approach |
| TypeaheadCombobox as separate trigger | Combobox | Clearer mental model than DuBois's single DialogCombobox |
