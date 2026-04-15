// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=717-650
// source=packages/dbui/src/components/ui/switch.tsx
// component=Switch
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Size ───
const size = instance.getEnum('Size', {
  'Default': 'default',
  'Small': 'sm',
})

// ─── On ───
// Figma: false/true
// Code: defaultChecked (boolean)
const on = instance.getEnum('On', {
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
const checkedProp = on ? ' defaultChecked' : ''
const disabledProp = state === 'disabled' ? ' disabled' : ''

export default {
  example: figma.tsx`<Switch${checkedProp}${disabledProp} />`,
  imports: ['import { Switch } from "@/components/ui/switch"'],
  id: 'switch',
  metadata: {
    nestable: true,
  }
}
