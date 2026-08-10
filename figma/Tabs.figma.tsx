import figma from "@figma/code-connect"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

// The Variant property lives on the Figma set but on TabsList in code: Tabs is
// the root that owns state, and the strip is what carries the treatment.
figma.connect(
  Tabs,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4825-3132",
  {
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Pill: "pill",
      }),
    },
    example: ({ variant }) => (
      <Tabs defaultValue="tab-1">
        <TabsList variant={variant}>
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
