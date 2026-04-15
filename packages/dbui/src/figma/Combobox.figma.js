// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=811-976
// source=packages/dbui/src/components/ui/combobox.tsx
// component=Combobox (trigger)
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Size ───
// Code doesn't have a size prop on ComboboxInput yet — maps via InputGroup
const size = instance.getEnum('Size', {
  'Default': 'default',
  'Small': 'sm',
})

// ─── State ───
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
  'Danger': 'invalid',
})

// ─── Text ───
const text = instance.findText('Search...')
const placeholder = text ? text.textContent : 'Search...'

// ─── Show Clear ───
const showClear = instance.getBoolean('Show Clear')

// ─── Label ───
const showLabel = instance.getBoolean('Show Label')
const labelText = instance.findText('Label:')
const label = showLabel && labelText ? labelText.textContent : ''

// ─── Badge ───
const showBadge = instance.getBoolean('Show Badge')

// ─── Build output ───
const disabledProp = state === 'disabled' ? figma.tsx` disabled` : ''
const invalidProp = state === 'invalid' ? figma.tsx` aria-invalid="true"` : ''
const clearProp = showClear ? figma.tsx` showClear` : ''

export default {
  example: figma.tsx`<Combobox>
  <ComboboxInput placeholder="${placeholder}"${clearProp}${disabledProp} />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="option-1">Option 1</ComboboxItem>
      <ComboboxItem value="option-2">Option 2</ComboboxItem>
      <ComboboxItem value="option-3">Option 3</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  imports: ['import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"'],
  id: 'combobox-trigger',
  metadata: {
    nestable: true,
  }
}
