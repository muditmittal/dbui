// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=949-962
// source=apps/portal/src/components/ui/alert.tsx
// component=Alert
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Danger': 'destructive',
  'Warning': 'warning',
  'Info': 'info',
  'Success': 'success',
})

// ─── Layout ───
const layout = instance.getEnum('Layout', {
  'Inline': 'inline',
  'Stacked': 'stacked',
})

// ─── Removable ───
const removable = instance.getBoolean('Removable')

// ─── Build output ───
const variantProp = variant !== 'info' ? figma.tsx` variant="${variant}"` : ''

export default {
  example: figma.tsx`<Alert${variantProp}>
  <AlertTitle>Heading</AlertTitle>
  <AlertDescription>Description text goes here.</AlertDescription>
</Alert>`,
  imports: ['import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"'],
  id: 'alert',
  metadata: {
    nestable: false,
    props: {
      variant,
    }
  }
}
