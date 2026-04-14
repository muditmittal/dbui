import type { Meta, StoryObj } from "@storybook/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "dbui/components/ui/popover"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"

const meta: Meta<typeof Popover> = {
  title: "Feedback/Popover",
  component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
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
  ),
}
