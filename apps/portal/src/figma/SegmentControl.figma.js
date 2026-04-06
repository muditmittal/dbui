// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=481-661
// source=apps/portal/src/components/ui/segment-control.tsx
// component=SegmentControl
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Variant ───
const variant = instance.getEnum('Variant', {
  'Default': 'default',
  'Outline': 'outline',
})

// ─── Size ───
const size = instance.getEnum('Size', {
  'Default': 'md',
  'Small': 'sm',
})

// ─── Collect items ───
// First child is a Toggle Button instance (selected item),
// remaining children are .SegmentControlItem instances (unselected items).
// We extract label text from each child's nested .Action Label > Label text node.
const items = []
for (const child of instance.children || []) {
  if (child.type !== 'INSTANCE') continue

  const actionLabel = child.findInstance('.Action Label')
  if (!actionLabel) continue

  const labelText = actionLabel.findText('Label')
  const label = labelText ? labelText.textContent : 'Label'

  // Check if this is the selected item (Toggle Button component)
  const isSelected = child.mainComponent?.parent?.name === 'Toggle Button'
    || child.mainComponent?.name?.includes('Selected')

  items.push({ label, isSelected })
}

// ─── Build output ───
const variantProp = variant !== 'default' ? ` variant="${variant}"` : ''
const sizeProp = size !== 'md' ? ` size="${size}"` : ''

const itemsCode = items
  .map(({ label, isSelected }) => {
    const valueProp = `value="${label.toLowerCase().replace(/\s+/g, '-')}"`
    const pressedProp = isSelected ? ' defaultPressed' : ''
    return `  <SegmentControlItem ${valueProp}${pressedProp}>${label}</SegmentControlItem>`
  })
  .join('\n')

export default {
  example: figma.tsx`
<SegmentControl${variantProp}${sizeProp} defaultValue="${items.find(i => i.isSelected)?.label?.toLowerCase().replace(/\s+/g, '-') || 'label'}">
${itemsCode}
</SegmentControl>
  `,
  imports: [
    'import { SegmentControl, SegmentControlItem } from "@/components/ui/segment-control"',
  ],
  id: 'segment-control',
  metadata: {
    nestable: false,
    props: {
      variant,
      size,
    }
  }
}
