// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3165-2582
// source=apps/portal/src/components/ui/switch.tsx
// component=Switch Label
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Label position ───
const label = instance.getEnum('Label', {
  'Left': 'left',
  'Right': 'right',
})

const orderClass = label === 'left' ? ' flex-row-reverse' : ''

export default {
  example: figma.tsx`<div className="flex items-center gap-2${orderClass}">
  <Switch id="setting" />
  <Label htmlFor="setting">Label</Label>
</div>`,
  imports: [
    'import { Switch } from "@/components/ui/switch"',
    'import { Label } from "@/components/ui/label"',
  ],
  id: 'switch-label',
  metadata: {
    nestable: false,
    props: { label }
  }
}
