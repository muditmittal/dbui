# Selection Controls — DuBois ↔ DBUI Mapping

> Complete mapping of DuBois selection primitives to DBUI equivalents.
> Created: 2026-04-05. Source: DuBois codebase + Glean research.

---

## Architecture Comparison

### DuBois: 3 primitives, 2 architectures

```
DialogCombobox (Popover-based, custom keyboard nav)
├── Select / SimpleSelect (single-select wrapper)
│   └── Recommended: SimpleSelect (self-contained)
└── Used directly for multi-select, checkbox items, search, footer

TypeaheadCombobox (Downshift + Floating UI, separate architecture)
├── Single-select: search input → filtered menu items
└── Multi-select: chip input → filtered checkbox items
```

### DBUI: 3 primitives, 1 architecture (Base-UI)

```
Select (Base-UI Select)
├── SelectTrigger (static value display)
├── SelectContent → SelectItem (single-select, check indicator)
└── SelectGroup, SelectLabel, SelectSeparator

DropdownMenu (Base-UI Menu)
├── DropdownMenuTrigger (any Button)
├── DropdownMenuContent → DropdownMenuItem (actions)
├── DropdownMenuCheckboxItem, DropdownMenuRadioItem (selection)
└── DropdownMenuSub (nested menus)

Combobox (Base-UI Combobox)
├── ComboboxInput (searchable trigger)
├── ComboboxContent → ComboboxItem (filtered items)
├── ComboboxChips + ComboboxChip (multi-select chip trigger)
└── ComboboxEmpty, ComboboxSeparator, ComboboxGroup
```

---

## DuBois Use Cases → DBUI Component

| DuBois Use Case | DuBois Component | DBUI Component | Status |
|----------------|-----------------|----------------|--------|
| Small static option list (e.g., sort order) | `SimpleSelect` | `Select` | ✅ Full parity |
| Static option list with groups | `Select` + `SelectOptionGroup` | `Select` + `SelectGroup` | ✅ Full parity |
| Action menu (copy, paste, delete) | `DropdownMenu` | `DropdownMenu` | ✅ Full parity |
| Context menu (right-click) | `ContextMenu` | `ContextMenu` (code exists) | ✅ Code only |
| Single-select with search/filter | `DialogCombobox` + `Search` | `Combobox` | ✅ Full parity |
| Multi-select with checkboxes | `DialogCombobox` + `multiSelect` | `DropdownMenu` + `CheckboxItem` | ✅ Full parity |
| Searchable multi-select with chips | `TypeaheadCombobox` + `MultiSelectInput` | `Combobox` + `ComboboxChips` | ⚠️ Code exists, Figma gap |
| Chip trigger with "+N" overflow | `showTagAfterValueCount` + `CountBadge` | ❌ | Gap: Figma + Code |
| Footer actions (Clear All, Apply) | `DialogComboboxFooter` + `AddButton` | ❌ | Gap: Figma + Code |
| "Add new item" in dropdown | `DialogComboboxAddButton` | ❌ | Gap: Figma + Code |
| Loading state in dropdown | `DialogComboboxContent` `loading` | ❌ | Gap: Figma |
| Empty state in dropdown | `DialogComboboxEmpty` | ✅ Code (`ComboboxEmpty`) | Gap: Figma only |
| Inline label on trigger ("Label: Value") | `withInlineLabel` | ❌ | Gap: Figma + Code |
| Bare/borderless trigger | `isBare` | ❌ | Gap: low priority |
| Hint column on items (metadata) | `hintColumn` / `hintColumnWidthPercent` | ⚠️ `.MenuTrailing` covers some | Extend `.MenuTrailing` |
| Disabled item with reason tooltip | `disabledReason` | ❌ | Code-only pattern |

---

## DuBois DialogCombobox Sub-Components (16 total)

| Sub-component | Purpose | DBUI Equivalent |
|--------------|---------|----------------|
| `DialogCombobox` | Root wrapper | `Select` / `Combobox` / `DropdownMenu` |
| `DialogComboboxTrigger` | Button trigger with display options | `SelectTrigger` / `ComboboxInput` |
| `DialogComboboxContent` | Popover content container | `SelectContent` / `ComboboxContent` / `DropdownMenuContent` |
| `DialogComboboxOptionList` | Scrollable list wrapper | `ComboboxList` / `SelectContent` (built-in) |
| `DialogComboboxOptionListSelectItem` | Single-select radio item | `SelectItem` / `.SelectItem` (Figma) |
| `DialogComboboxOptionListCheckboxItem` | Multi-select checkbox item | `DropdownMenuCheckboxItem` / `.DropdownMenuItem` Type=MultiSelect |
| `DialogComboboxOptionListSearch` | Search input in dropdown | `.MenuRow` Type=Search (Figma) / `ComboboxInput` in content |
| `DialogComboboxCountBadge` | "+N" overflow counter | ❌ Gap |
| `DialogComboboxFooter` | Footer area for actions | ❌ Gap |
| `DialogComboboxAddButton` | "Add new item" button | ❌ Gap |
| `DialogComboboxSectionHeader` | Group header label | `.MenuGroup` (Figma) / `SelectLabel` / `ComboboxLabel` |
| `DialogComboboxSeparator` | Visual divider | `.MenuSeparator` (Figma) / `SelectSeparator` |
| `DialogComboboxHintRow` | Hint/helper text row | ❌ Gap (niche) |
| `DialogComboboxEmpty` | Empty state message | `ComboboxEmpty` (code) / ❌ Figma gap |
| `DialogComboboxCustomButtonTriggerWrapper` | Custom button trigger | Compose with any Button |
| `DialogComboboxControlledList` | Controlled item rendering | Code pattern, no Figma needed |

---

## DuBois TypeaheadCombobox Sub-Components (12 total)

| Sub-component | Purpose | DBUI Equivalent |
|--------------|---------|----------------|
| `TypeaheadComboboxRoot` | Root wrapper | `Combobox` |
| `TypeaheadComboboxInput` | Single-select search input | `ComboboxInput` |
| `TypeaheadComboboxMultiSelectInput` | Multi-select input with chips | `ComboboxChips` + `ComboboxChipsInput` |
| `TypeaheadComboboxSelectedItem` | Individual chip/tag | `ComboboxChip` |
| `TypeaheadComboboxToggleButton` | Dropdown toggle | Chevron in `ComboboxInput` |
| `TypeaheadComboboxMenu` | Dropdown menu | `ComboboxContent` + `ComboboxList` |
| `TypeaheadComboboxMenuItem` | Single-select item | `ComboboxItem` |
| `TypeaheadComboboxCheckboxItem` | Multi-select checkbox item | ❌ Gap (Combobox doesn't have checkbox items) |
| `TypeaheadComboboxSectionHeader` | Group header | `ComboboxGroup` + `ComboboxLabel` |
| `TypeaheadComboboxSeparator` | Divider | `ComboboxSeparator` |
| `TypeaheadComboboxFooter` | Footer area | ❌ Gap |
| `TypeaheadComboboxAddButton` | "Add new" action | ❌ Gap |

---

## Key Trigger Props — DuBois vs DBUI

### DialogComboboxTrigger props

| Prop | Type | Purpose | DBUI Status |
|------|------|---------|-------------|
| `minWidth` / `maxWidth` / `width` | `number \| string` | Sizing | CSS class (Tailwind) |
| `removable` / `onRemove` | `boolean` / `fn` | Removable tag pattern | ❌ Gap |
| `allowClear` / `onClear` | `boolean` / `fn` | Clear button (×) | ✅ `ComboboxInput` `showClear` |
| `showTagAfterValueCount` | `number` | Collapse chips to "+N" badge | ❌ Gap |
| `withChevronIcon` | `boolean` | Show/hide chevron | ✅ Default behavior |
| `withInlineLabel` | `boolean` | "Label: Value" in trigger | ❌ Gap |
| `isBare` | `boolean` | Borderless variant | ❌ Gap |
| `triggerSize` | `ButtonSize` | Size variant | ✅ `size` prop |
| `renderDisplayedValue` | `(value) => ReactNode` | Custom value renderer | ❌ Gap (compose) |
| `validationState` | `FormElementValidationState` | Error state | ✅ `aria-invalid` (Danger state) |

### TypeaheadComboboxMultiSelectInput props

| Prop | Type | Purpose | DBUI Status |
|------|------|---------|-------------|
| `selectedItems` / `setSelectedItems` | `T[]` / `Dispatch` | Selected items state | ✅ `ComboboxChips` |
| `getSelectedItemLabel` | `(item) => ReactNode` | Chip label renderer | ✅ `ComboboxChip` children |
| `showTagAfterValueCount` | `number` | Collapse to "+N" | ❌ Gap |
| `width` / `maxHeight` | sizing | Sizing | CSS |
| `allowClear` | `boolean` | Clear all | ✅ `ComboboxChipRemove` per chip |

---

## Figma Component Inventory — Current State

### Triggers (in Figma)

| Component | Variants | Properties | Node ID |
|-----------|----------|-----------|---------|
| Select | 12 (Size × State) | Text, Show Icon, Icon | 732:601 |
| Combobox | 12 (Size × State) | Text, Show Clear | 811:976 |
| Button (for DropdownMenu trigger) | 82 (Variant × Size × State) | via .ActionLabel Show Menu | Button set |

### Missing Trigger Variants (Figma)

| Variant | What it shows | Priority |
|---------|--------------|----------|
| **ComboboxChips trigger** | Input with chips inside, typing area, clear all | High |
| **ComboboxChips overflow** | Same but chips collapse to "+3" badge | High |
| **Select with inline label** | "Region: US West" pattern | Medium |

### Dropdown Content Items (in Figma)

| Component | Variants | Node ID |
|-----------|----------|---------|
| .DropdownMenuItem | 18 (Type × State) | 766:671 |
| .SelectItem | 5 (State) | 783:684 |
| .ComboboxItem | 5 (State) | 783:690 |
| .MenuRow | 6 (Type) | 786:826 |
| .MenuLabel | 2 (Content) | 763:595 |
| .MenuTrailing | 3 (Type) | 764:602 |
| .MenuGroup | 1 | 783:692 |
| .MenuSeparator | 1 | 783:694 |

### Missing Dropdown Content (Figma)

| What | How to build | Priority |
|------|-------------|----------|
| **Footer row** (Clear All / Apply) | New `.MenuRow` Type=Footer variant | High |
| **Empty state** | New `.MenuRow` Type=Empty variant | High |
| **Loading state** | New `.MenuRow` Type=Loading variant | Medium |
| **"Add new" row** | New `.MenuRow` Type=AddButton variant | Medium |
| **Hint text on items** | Extend `.MenuTrailing` Type=Hint (or reuse Type=Text) | Medium |

---

## Proposed Plan — Surgical Extensions

### Phase 1: Extend Existing Inner Components

1. **`.MenuRow`** — Add 3 new Type variants:
   - `Type=Footer` — horizontal row with outline buttons (Clear All / Apply)
   - `Type=Empty` — centered muted text ("No results found")
   - `Type=Loading` — spinner + "Loading..." text

2. **`.MenuTrailing`** — Already has Type=Text which covers hint text. Verify it works for item metadata display.

### Phase 2: New Trigger Variants

3. **ComboboxChips trigger** — New Figma component showing:
   - Chips inside an input-like container
   - Typing area after chips
   - Clear button
   - Overflow state: chips collapse to "+3 more" badge
   - States: Default, Focus, Disabled, Danger

### Phase 3: Composition Updates

4. Update **DropdownMenu** and **SelectDropdown** compositions to show footer and empty state examples.

### Phase 4: Code + Code Connect

5. Add `variant="info" | "warning" | "error"` to Alert (code)
6. Code Connect for new Figma components
7. Update portal /components page

---

## LLM Compatibility Note

Extended shadcn components will NOT confuse LLMs because:
1. shadcn is copy-paste code, not an npm package — LLMs read actual source
2. CVA variant definitions are self-documenting lookup tables
3. Code Connect maps Figma variants directly to code props
4. NOT extending creates worse outcomes — LLMs hallucinate custom code when no component matches

Key rule: Use shadcn prop patterns (`variant`, `size`, boolean flags) with DuBois naming conventions (`"info"`, `"warning"`, `"error"`).
