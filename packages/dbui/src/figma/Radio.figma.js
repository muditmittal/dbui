// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=715-650
// source=packages/dbui/src/components/ui/radio-group.tsx
// component=RadioGroupItem
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Selected ───
// Figma: false/true
// Code: Selection is managed by RadioGroup parent's `value` or `defaultValue` prop.
// RadioGroupItem exposes `value` to identify itself within the group.
const selected = instance.getEnum('Selected', {
  'false': false,
  'true': true,
})

// ─── State ───
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
})

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''
// Show defaultValue on RadioGroup when the item is selected
const groupDefaultValue = selected ? ' defaultValue="option-1"' : ''

export default {
  example: figma.tsx`<RadioGroup${groupDefaultValue}>
  <RadioGroupItem value="option-1"${disabledProp} />
</RadioGroup>`,
  imports: [
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
  ],
  id: 'radio',
  metadata: {
    nestable: true,
  }
}
