import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Gear } from "@/components/icons/Gear"
import { Trash } from "@/components/icons/Trash"
import { Search } from "@/components/icons/Search"

const meta: Meta<typeof Button> = {
  title: "Actions/IconButton",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "danger"],
    },
    size: {
      control: "select",
      options: ["icon-sm", "icon-md"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    size: "icon-md",
    "aria-label": "Action",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: <Plus /> },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-md" variant="default" aria-label="Add"><Plus /></Button>
      <Button size="icon-md" variant="outline" aria-label="Settings"><Gear /></Button>
      <Button size="icon-md" variant="secondary" aria-label="Search"><Search /></Button>
      <Button size="icon-md" variant="ghost" aria-label="Search"><Search /></Button>
      <Button size="icon-md" variant="destructive" aria-label="Delete"><Trash /></Button>
      <Button size="icon-md" variant="danger" aria-label="Delete"><Trash /></Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-sm" variant="outline" aria-label="Small"><Plus /></Button>
      <Button size="icon-md" variant="outline" aria-label="Default"><Plus /></Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-md" disabled aria-label="Add"><Plus /></Button>
      <Button size="icon-md" variant="outline" disabled aria-label="Settings"><Gear /></Button>
    </div>
  ),
}
