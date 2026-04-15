// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2911
// source=packages/dbui/src/components/ui/radio-group.tsx
// component=Radio Label
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<div className="flex items-center gap-2">
  <RadioGroupItem value="option" id="option" />
  <Label htmlFor="option">Option label</Label>
</div>`,
  imports: [
    'import { RadioGroupItem } from "@/components/ui/radio-group"',
    'import { Label } from "@/components/ui/label"',
  ],
  id: 'radio-label',
  metadata: { nestable: false }
}
