import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "dbui/components/ui/textarea"

const meta: Meta<typeof Textarea> = {
  title: "Inputs/Textarea",
  component: Textarea,
  args: {
    placeholder: "Type your message here...",
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: "This is a longer piece of text that fills the textarea." },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Invalid content" },
}
