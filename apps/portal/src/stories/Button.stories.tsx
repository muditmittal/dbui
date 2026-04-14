import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "@/components/icons/ChevronDown"
import { Plus } from "@/components/icons/Plus"

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "link", "destructive", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "icon-sm", "icon-md"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="icon-sm"><Plus /></Button>
      <Button size="icon-md"><Plus /></Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button><Plus /> Create</Button>
      <Button variant="outline">Options <ChevronDown /></Button>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    children: "Saving...",
  },
}

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: "Saving...",
    children: "Save",
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
}
