// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2875
// source=packages/dbui/src/components/ui/checkbox.tsx
// component=Checkbox Label
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  imports: [
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { Label } from "@/components/ui/label"',
  ],
  id: 'checkbox-label',
  metadata: { nestable: false }
}
