import type { Meta, StoryObj } from "@storybook/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "dbui/components/ui/popover"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/popover.manifest.json"

const meta: Meta = {
  title: "Overlays/Popover",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Popover</h2>

      <div style={{ paddingTop: 8 }}>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-semibold leading-[20px]">Dimensions</p>
              <Input placeholder="Width" defaultValue="100%" />
              <Input placeholder="Height" defaultValue="auto" />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ marginTop: 200 }}>
        <ComponentMeta manifest={manifest} />
      </div>
    </div>
  ),
}
