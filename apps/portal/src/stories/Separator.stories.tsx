import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "dbui/components/ui/separator"

const meta: Meta = { title: "Content/Separator" }
export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="text-[13px]">Content above</div>
      <Separator />
      <div className="text-[13px]">Content below</div>
      <div className="flex items-center gap-4 h-8">
        <span className="text-[13px]">Left</span>
        <Separator orientation="vertical" />
        <span className="text-[13px]">Right</span>
      </div>
    </div>
  ),
}
