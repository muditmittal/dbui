// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3130-1793
// source=apps/portal/src/components/ui/empty.tsx
// component=Empty
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <SearchIcon />
    </EmptyMedia>
    <EmptyTitle>No items found</EmptyTitle>
    <EmptyDescription>Get started by creating your first item.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
  imports: ['import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"'],
  id: 'empty',
  metadata: {
    nestable: false,
  }
}
