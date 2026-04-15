// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=787-804
// source=packages/dbui/src/components/ui/select.tsx
// component=SelectDropdown (composition)
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option-1">Option 1</SelectItem>
    <SelectItem value="option-2">Option 2</SelectItem>
    <SelectItem value="option-3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
  imports: ['import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"'],
  id: 'select-dropdown',
  metadata: {
    nestable: false,
  }
}
