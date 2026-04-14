import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "dbui/components/ui/drawer"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"

const meta: Meta<typeof Drawer> = {
  title: "Feedback/Drawer",
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit cluster</DrawerTitle>
          <DrawerDescription>Update your cluster configuration.</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 py-4 flex flex-col gap-3">
          <Input placeholder="Cluster name" defaultValue="My Cluster" />
          <Input placeholder="Node type" defaultValue="i3.xlarge" />
        </div>
        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Right: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
          <DrawerDescription>View resource details.</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 py-4">
          <p className="text-[13px] text-muted-foreground">
            Side drawers are useful for detail panels, settings, and secondary navigation.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}
