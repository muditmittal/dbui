import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "dbui/components/ui/badge"

const meta: Meta = {
  title: "Content/Badge",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
    label: { control: "text" },
  },
  args: {
    variant: "default",
    label: "Badge",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Badge variant={args.variant}>{args.label}</Badge>
  ),
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}
