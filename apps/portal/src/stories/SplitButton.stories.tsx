import type { Meta, StoryObj } from "@storybook/react"
import { SplitButton, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "@/components/icons/ChevronDown"

const meta: Meta<typeof SplitButton> = {
  title: "Actions/SplitButton",
  component: SplitButton,
}

export default meta
type Story = StoryObj<typeof SplitButton>

export const Primary: Story = {
  render: () => (
    <SplitButton>
      <Button>Save</Button>
      <SplitButtonSeparator />
      <Button size="icon-md"><ChevronDown /></Button>
    </SplitButton>
  ),
}

export const Outline: Story = {
  render: () => (
    <SplitButton>
      <Button variant="outline">Options</Button>
      <SplitButtonSeparator />
      <Button variant="outline" size="icon-md"><ChevronDown /></Button>
    </SplitButton>
  ),
}
