import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Gear } from "@/components/icons/Gear"
import { Trash } from "@/components/icons/Trash"
import { Search } from "@/components/icons/Search"
import { Pencil } from "@/components/icons/Pencil"
import { Filter } from "@/components/icons/Filter"

const iconMap: Record<string, React.ReactNode> = {
  Plus: <Plus />, Gear: <Gear />, Trash: <Trash />,
  Search: <Search />, Pencil: <Pencil />, Filter: <Filter />,
}

const meta: Meta = {
  title: "Actions/IconButton",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "danger"],
    },
    size: { control: "radio", options: ["icon-sm", "icon-md"] },
    icon: { control: "select", options: ["Plus", "Gear", "Trash", "Search", "Pencil", "Filter"] },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "icon-md",
    icon: "Plus",
    disabled: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Button variant={args.variant} size={args.size} disabled={args.disabled} aria-label="Action">
      {iconMap[args.icon] || <Plus />}
    </Button>
  ),
}

export const AllVariants: StoryObj = {
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

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-sm" variant="outline" aria-label="Small"><Plus /></Button>
      <Button size="icon-md" variant="outline" aria-label="Default"><Plus /></Button>
    </div>
  ),
}

export const Disabled: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-md" disabled aria-label="Add"><Plus /></Button>
      <Button size="icon-md" variant="outline" disabled aria-label="Settings"><Gear /></Button>
    </div>
  ),
}
