// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2854
// source=packages/dbui/src/components/ui/label.tsx
// component=Label
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Label htmlFor="email">Email address</Label>`,
  imports: ['import { Label } from "@/components/ui/label"'],
  id: 'label',
  metadata: {
    nestable: false,
  }
}
