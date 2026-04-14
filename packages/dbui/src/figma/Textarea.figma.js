// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=724-658
// source=apps/portal/src/components/ui/textarea.tsx
// component=Textarea
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

// ─── Text ───
const text = instance.findText('Placeholder') || instance.findText('Text')
const placeholder = text ? text.textContent : 'Placeholder'

// ─── Build output ───
const disabledProp = state === 'disabled' ? ' disabled' : ''
const invalidProp = state === 'invalid' ? ' aria-invalid="true"' : ''

export default {
  example: figma.tsx`<Textarea placeholder="${placeholder}"${disabledProp}${invalidProp} />`,
  imports: ['import { Textarea } from "@/components/ui/textarea"'],
  id: 'textarea',
  metadata: {
    nestable: true,
  }
}
