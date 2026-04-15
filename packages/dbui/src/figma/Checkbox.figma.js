// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=713-650
// source=packages/dbui/src/components/ui/checkbox.tsx
// component=Checkbox
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Checked ───
// Figma: Unchecked/Checked/Indeterminate
// Code: defaultChecked (boolean), indeterminate handled by parent
const checked = instance.getEnum('Checked', {
  'Unchecked': false,
  'Checked': true,
  'Indeterminate': 'indeterminate',
})

// ─── State ───
// Figma "Press" = CSS :active
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
})

// ─── Build output ───
const checkedProp = checked === true ? ' defaultChecked' : ''
const indeterminateProp = checked === 'indeterminate' ? ' indeterminate' : ''
const disabledProp = state === 'disabled' ? ' disabled' : ''

export default {
  example: figma.tsx`<Checkbox${checkedProp}${indeterminateProp}${disabledProp} />`,
  imports: ['import { Checkbox } from "@/components/ui/checkbox"'],
  id: 'checkbox',
  metadata: {
    nestable: true,
  }
}
