import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "dbui/components/ui/checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Controls/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <label htmlFor="terms" className="text-[13px] leading-[20px]">Accept terms and conditions</label>
    </div>
  ),
}
