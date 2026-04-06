// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1048-1469
// source=apps/portal/src/components/ui/tabs.tsx
// component=Tabs
const figma = require('figma')
const instance = figma.selectedInstance

// Tabs is a single component (not a component set) — no variant props.
// Designers compose by swapping .TabItem instances between Active/Default states.

export default {
  example: figma.tsx`<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">Content for tab 1</TabsContent>
  <TabsContent value="tab-2">Content for tab 2</TabsContent>
  <TabsContent value="tab-3">Content for tab 3</TabsContent>
</Tabs>`,
  imports: ['import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"'],
  id: 'tabs',
  metadata: {
    nestable: false,
  }
}
