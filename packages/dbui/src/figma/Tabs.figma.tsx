import figma from "@figma/code-connect"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

figma.connect(
  Tabs,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1048-1469",
  {
    example: () => (
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content for tab 1</TabsContent>
        <TabsContent value="tab-2">Content for tab 2</TabsContent>
        <TabsContent value="tab-3">Content for tab 3</TabsContent>
      </Tabs>
    ),
  }
)
