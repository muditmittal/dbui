// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=722-658
// source=packages/dbui/src/components/ui/input.tsx
// component=Input
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Size ───
const size = instance.getEnum('Size', {
  'Default': 'default',
  'Small': 'sm',
})

// ─── State ───
// States are CSS-driven. Only Disabled and Danger map to HTML attributes.
// Figma "Press" = CSS :active, "Danger" = aria-invalid
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
  'Danger': 'invalid',
  'Warning': undefined,
  'Success': undefined,
})

// ─── Content from nested .InputContent ───
const inputContent = instance.findInstance('.InputContent')
let placeholder = 'Placeholder'
let value = ''
let showValue = false

if (inputContent && inputContent.type === 'INSTANCE') {
  const contentVariant = inputContent.getEnum('Content', {
    'Placeholder': 'placeholder',
    'Value': 'value',
  })

  if (contentVariant === 'placeholder') {
    const placeholderText = inputContent.findText('Placeholder')
    if (placeholderText) placeholder = placeholderText.textContent
  } else {
    showValue = true
    const valueText = inputContent.findText('Value')
    if (valueText) value = valueText.textContent
    // Still read placeholder for the placeholder prop
    const placeholderText = inputContent.findText('Placeholder')
    if (placeholderText) placeholder = placeholderText.textContent
  }
}

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''
const invalidProp = state === 'invalid' ? ' aria-invalid="true"' : ''
const valueProp = showValue ? figma.tsx` defaultValue="${value}"` : ''
const sizeProp = size !== 'default' ? figma.tsx` size="${size}"` : ''

export default {
  example: figma.tsx`<Input${sizeProp} placeholder="${placeholder}"${valueProp}${disabledProp}${invalidProp} />`,
  imports: ['import { Input } from "@/components/ui/input"'],
  id: 'input',
  metadata: {
    nestable: true,
  }
}
