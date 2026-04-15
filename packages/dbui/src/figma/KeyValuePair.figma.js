// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3178-3901
// source=packages/dbui/src/components/ui/key-value-pair.tsx
// component=Key Value Pair
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Layout ───
const layout = instance.getEnum('Layout', {
  'Horizontal': 'horizontal',
  'Vertical': 'vertical',
})

const flexDir = layout === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-4'

export default {
  example: figma.tsx`<div className="flex ${flexDir}">
  <dt className="text-[13px] font-semibold text-foreground">Key</dt>
  <dd className="text-[13px] text-muted-foreground">Value</dd>
</div>`,
  imports: [],
  id: 'key-value-pair',
  metadata: {
    nestable: false,
    props: { layout }
  }
}
