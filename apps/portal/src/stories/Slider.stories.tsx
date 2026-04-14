import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "dbui/components/ui/slider"

const meta: Meta<typeof Slider> = {
  title: "Controls/Slider",
  component: Slider,
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
}
