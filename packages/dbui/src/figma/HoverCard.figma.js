// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1071-1721
// source=packages/dbui/src/components/ui/hover-card.tsx
// component=HoverCard
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Build output ───
export default {
  example: figma.tsx`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#">@username</a>
  </HoverCardTrigger>
  <HoverCardContent>
    Preview content on hover.
  </HoverCardContent>
</HoverCard>`,
  imports: ['import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"'],
  id: 'hover-card',
  metadata: {
    nestable: false,
  }
}
