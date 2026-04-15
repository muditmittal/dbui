import type { Meta, StoryObj } from "@storybook/react"
import {
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "dbui/components/ui/drawer"
import { Button } from "dbui/components/ui/button"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/drawer.manifest.json"

const meta: Meta = {
  title: "Overlays/Drawer",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Drawer</h2>

      {/* Static structure preview */}
      <div className="w-[360px] rounded-lg border border-border bg-background shadow-lg">
        <DrawerHeader>
          <DrawerTitle>Edit cluster</DrawerTitle>
          <DrawerDescription>Update your cluster configuration.</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 py-4">
          <p className="text-[13px] text-muted-foreground">
            Drawer content area — forms, details, or settings go here. Content scrolls independently.
          </p>
        </div>
        <DrawerFooter>
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </DrawerFooter>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
