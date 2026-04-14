import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "dbui/components/ui/toggle"
import { Bold } from "@/components/icons/Bold"

const meta: Meta<typeof Toggle> = {
  title: "Actions/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "button", "icon"] },
    size: { control: "select", options: ["sm", "md", "icon-sm", "icon-md"] },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { children: "Toggle" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

export const IconOnly: Story = {
  args: { variant: "icon", size: "icon-md", "aria-label": "Bold" },
  render: (args) => (
    <Toggle {...args}><Bold /></Toggle>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="icon" size="icon-md" aria-label="Bold"><Bold /></Toggle>
      <Toggle variant="button">Button</Toggle>
    </div>
  ),
}
