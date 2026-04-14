import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "dbui/components/ui/avatar"

const meta: Meta = {
  title: "Content/Avatar",
  argTypes: {
    size: { control: "radio", options: ["sm", "default", "lg"] },
    type: { control: "radio", options: ["initials", "icon"] },
    initials: { control: "text" },
  },
  args: {
    size: "default",
    type: "initials",
    initials: "MM",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Avatar size={args.size} type={args.type}>
      <AvatarFallback>{args.initials}</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm"><AvatarFallback>S</AvatarFallback></Avatar>
      <Avatar size="default"><AvatarFallback>M</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>L</AvatarFallback></Avatar>
    </div>
  ),
}

export const Group: StoryObj = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
}
