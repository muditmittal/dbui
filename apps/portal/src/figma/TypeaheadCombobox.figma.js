// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=842-889
// source=apps/portal/src/components/ui/combobox.tsx
// component=TypeaheadCombobox (multi-select with chips)
const figma = require('figma')
const instance = figma.selectedInstance

// ─── State ───
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
  'Danger': 'invalid',
})

// ─── Show Clear ───
const showClear = instance.getBoolean('Show Clear')

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''
const invalidProp = state === 'invalid' ? ' aria-invalid="true"' : ''

export default {
  example: figma.tsx`<Combobox multiple>
  <ComboboxChips>
    <ComboboxChip value="option-1">Option 1</ComboboxChip>
    <ComboboxChip value="option-2">Option 2</ComboboxChip>
    <ComboboxChipsInput placeholder="Search..."${disabledProp}${invalidProp} />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="option-1">Option 1</ComboboxItem>
      <ComboboxItem value="option-2">Option 2</ComboboxItem>
      <ComboboxItem value="option-3">Option 3</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  imports: [
    'import { Combobox, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"',
  ],
  id: 'typeahead-combobox',
  metadata: {
    nestable: false,
  }
}
