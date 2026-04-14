// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4442
// source=apps/portal/src/components/ui/tag.tsx
// component=Tag
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Tag>
  ${instance.getBoolean('Icon') ? figma.tsx`<TagIcon><KeyIcon /></TagIcon>` : ''}
  <TagLabel>${figma.findText(instance, '.TagLabel') || 'Key'}</TagLabel>
  ${instance.getBoolean('Value') ? figma.tsx`<TagValue>${figma.findText(instance, '.TagValue') || 'Value'}</TagValue>` : ''}
  ${instance.getBoolean('Closable') ? figma.tsx`<TagRemove />` : ''}
</Tag>`,
  imports: ['import { Tag, TagIcon, TagLabel, TagValue, TagRemove } from "@/components/ui/tag"'],
  id: 'tag',
  metadata: { nestable: false }
}
