// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3970
// source=apps/portal/src/components/ui/spinner.tsx
// component=Spinner
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Spinner />`,
  imports: ['import { Spinner } from "@/components/ui/spinner"'],
  id: 'spinner',
  metadata: {
    nestable: false,
  }
}
