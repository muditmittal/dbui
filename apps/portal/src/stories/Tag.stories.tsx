import type { Meta, StoryObj } from "@storybook/react"
import { Tag, TagIcon, TagLabel, TagValue, TagRemove } from "dbui/components/ui/tag"
import { Key } from "@/components/icons/Key"

const meta: Meta = {
  title: "Content/Tag",
  argTypes: {
    showIcon: { control: "boolean", name: "Show Icon" },
    showValue: { control: "boolean", name: "Show Value (key:value)" },
    removable: { control: "boolean", name: "Removable" },
    label: { control: "text" },
    value: { control: "text", if: { arg: "showValue" } },
  },
  args: {
    showIcon: true,
    showValue: false,
    removable: false,
    label: "environment",
    value: "production",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Tag>
      {args.showIcon && <TagIcon><Key /></TagIcon>}
      <TagLabel>{args.label}</TagLabel>
      {args.showValue && <TagValue>{args.value}</TagValue>}
      {args.removable && <TagRemove />}
    </Tag>
  ),
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Tag><TagLabel>key only</TagLabel></Tag>
        <Tag><TagIcon><Key /></TagIcon><TagLabel>with icon</TagLabel></Tag>
        <Tag><TagLabel>key</TagLabel><TagValue>value</TagValue></Tag>
        <Tag><TagIcon><Key /></TagIcon><TagLabel>key</TagLabel><TagValue>value</TagValue></Tag>
        <Tag><TagLabel>removable</TagLabel><TagRemove /></Tag>
      </div>
    </div>
  ),
}
