import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "dbui/components/ui/tabs"

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 text-[13px]">Account settings go here.</TabsContent>
      <TabsContent value="tab2" className="p-4 text-[13px]">Password settings go here.</TabsContent>
      <TabsContent value="tab3" className="p-4 text-[13px]">General settings go here.</TabsContent>
    </Tabs>
  ),
}

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList variant="pill">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 text-[13px]">Overview content.</TabsContent>
      <TabsContent value="tab2" className="p-4 text-[13px]">Analytics content.</TabsContent>
      <TabsContent value="tab3" className="p-4 text-[13px]">Reports content.</TabsContent>
    </Tabs>
  ),
}
