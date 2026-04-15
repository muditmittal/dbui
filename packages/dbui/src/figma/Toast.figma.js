// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=968-944
// source=packages/dbui/src/components/ui/sonner.tsx
// component=Toast
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Type ───
const type = instance.getEnum('Type', {
  'Success': 'success',
  'Info': 'info',
  'Warning': 'warning',
  'Error': 'error',
})

// ─── Removable ───
const removable = instance.getBoolean('Removable')

// ─── Build output ───
export default {
  example: figma.tsx`toast.${type}("Your message here")`,
  imports: ['import { toast } from "sonner"'],
  id: 'toast',
  metadata: {
    nestable: false,
    props: {
      type,
    }
  }
}
