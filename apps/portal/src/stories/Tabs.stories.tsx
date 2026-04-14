import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsIcon } from "dbui/components/ui/tabs"
import { Notebook } from "@/components/icons/Notebook"
import { Gear } from "@/components/icons/Gear"
import { Home } from "@/components/icons/Home"

const meta: Meta = {
  title: "Content/Tabs",
  argTypes: {
    showIcons: { control: "boolean", name: "Show Icons (.TabItem)" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
  args: {
    showIcons: false,
    orientation: "horizontal",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Tabs defaultValue="home" orientation={args.orientation}>
      <TabsList>
        <TabsTrigger value="home">
          {args.showIcons && <TabsIcon><Home /></TabsIcon>}
          Home
        </TabsTrigger>
        <TabsTrigger value="notebooks">
          {args.showIcons && <TabsIcon><Notebook /></TabsIcon>}
          Notebooks
        </TabsTrigger>
        <TabsTrigger value="settings">
          {args.showIcons && <TabsIcon><Gear /></TabsIcon>}
          Settings
        </TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Home content</TabsContent>
      <TabsContent value="notebooks">Notebooks content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
}
