// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1088-1544
// source=packages/dbui/src/components/ui/badge.tsx
// component=Badge
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Fill': 'default',
  'Outline': 'outline',
})

const variantProp = variant !== 'default' ? figma.tsx` variant="${variant}"` : ''

export default {
  example: figma.tsx`<Badge${variantProp}>Badge</Badge>`,
  imports: ['import { Badge } from "@/components/ui/badge"'],
  id: 'badge',
  metadata: {
    nestable: false,
    props: { variant }
  }
}
