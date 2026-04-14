// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=732-601
// source=apps/portal/src/components/ui/select.tsx
// component=Select (trigger)
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Default': 'default',
  'Ghost': 'ghost',
})

// ─── Size ───
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
const text = instance.findText('Select...')
const placeholder = text ? text.textContent : 'Select...'

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''
const invalidProp = state === 'invalid' ? ' aria-invalid="true"' : ''
const sizeProp = size !== 'default' ? figma.tsx` size="${size}"` : ''
const ghostProp = type === 'ghost' ? figma.tsx` variant="ghost"` : ''

export default {
  example: figma.tsx`<Select>
  <SelectTrigger${ghostProp}${sizeProp}${disabledProp}${invalidProp}>
    <SelectValue placeholder="${placeholder}" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option-1">Option 1</SelectItem>
    <SelectItem value="option-2">Option 2</SelectItem>
    <SelectItem value="option-3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
  imports: ['import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"'],
  id: 'select-trigger',
  metadata: {
    nestable: true,
  }
}
