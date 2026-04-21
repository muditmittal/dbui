import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsIcon } from "dbui/components/ui/tabs"
import { Home } from "@/components/icons/Home"
import { Notebook } from "@/components/icons/Notebook"
import { Gear } from "@/components/icons/Gear"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/tabs?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Content/Tabs",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tabs</h2>

      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="notebooks">Notebooks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <div className="text-[13px] text-muted-foreground p-4">Home content</div>
        </TabsContent>
        <TabsContent value="notebooks">
          <div className="text-[13px] text-muted-foreground p-4">Notebooks content</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="text-[13px] text-muted-foreground p-4">Settings content</div>
        </TabsContent>
      </Tabs>


      <ComponentMeta source={componentSource} componentKey="tabs" />

      <ProductionMap componentKey="tabs" />
    </div>
  ),
}
