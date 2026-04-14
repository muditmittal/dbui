import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "dbui/components/ui/progress"

const meta: Meta = {
  title: "Content/Progress",
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: { value: 45 },
}
export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[300px]">
      <Progress value={args.value} />
    </div>
  ),
}
