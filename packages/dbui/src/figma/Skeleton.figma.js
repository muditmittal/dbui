// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3128-1778
// source=apps/portal/src/components/ui/skeleton.tsx
// component=Skeleton
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Skeleton className="h-5 w-[200px]" />`,
  imports: ['import { Skeleton } from "@/components/ui/skeleton"'],
  id: 'skeleton',
  metadata: {
    nestable: false,
  }
}
