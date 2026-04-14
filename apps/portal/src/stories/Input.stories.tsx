import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "dbui/components/ui/input"

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    validation: { control: "select", options: [undefined, "warning", "success"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input..." },
}

export const WithValue: Story = {
  args: { defaultValue: "Hello world" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Bad input" },
}

export const Warning: Story = {
  args: { validation: "warning", defaultValue: "Needs attention" },
}

export const Success: Story = {
  args: { validation: "success", defaultValue: "Looks good" },
}
