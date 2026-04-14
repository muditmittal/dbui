// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2892
// source=apps/portal/src/components/ui/checkbox.tsx
// component=Checkbox Group
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<fieldset className="grid gap-2">
  <legend className="text-[13px] font-semibold">Options</legend>
  <div className="flex items-center gap-2">
    <Checkbox id="option-1" />
    <Label htmlFor="option-1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="option-2" />
    <Label htmlFor="option-2">Option 2</Label>
  </div>
</fieldset>`,
  imports: [
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { Label } from "@/components/ui/label"',
  ],
  id: 'checkbox-group',
  metadata: { nestable: false }
}
