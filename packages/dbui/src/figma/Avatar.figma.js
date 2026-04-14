// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1084-1542
// source=apps/portal/src/components/ui/avatar.tsx
// component=Avatar
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Size (Figma "Size" maps to code type prop) ───
const type = instance.getEnum('Size', {
  'Initials': 'initials',
  'Icon': 'icon',
})

const typeProp = type !== 'initials' ? figma.tsx` type="${type}"` : ''

export default {
  example: figma.tsx`<Avatar${typeProp}>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`,
  imports: ['import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"'],
  id: 'avatar',
  metadata: {
    nestable: false,
    props: { type }
  }
}
