import type { Meta, StoryObj } from "@storybook/react"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Grid } from "@/components/icons/Grid"
import { List } from "@/components/icons/List"
import { Rows } from "@/components/icons/Rows"

const meta: Meta = {
  title: "Actions/SegmentControl",
  argTypes: {
    variant: { control: "radio", options: ["default", "outline"], name: "Variant (Slider / Outline)" },
    size: { control: "radio", options: ["sm", "md"], name: "Size" },
    showIcons: { control: "boolean", name: "Show Icons (.SegmentControlItem)" },
    iconOnly: { control: "boolean", name: "Icon Only", if: { arg: "showIcons" } },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    showIcons: false,
    iconOnly: false,
    disabled: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <SegmentControl
      defaultValue="list"
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
    >
      <SegmentControlItem value="list">
        {args.showIcons && <List />}
        {!args.iconOnly && "List"}
      </SegmentControlItem>
      <SegmentControlItem value="grid">
        {args.showIcons && <Grid />}
        {!args.iconOnly && "Grid"}
      </SegmentControlItem>
      <SegmentControlItem value="board">
        {args.showIcons && <Rows />}
        {!args.iconOnly && "Board"}
      </SegmentControlItem>
    </SegmentControl>
  ),
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Slider (default) — Default size</p>
        <SegmentControl defaultValue="list" variant="default">
          <SegmentControlItem value="list">List</SegmentControlItem>
          <SegmentControlItem value="grid">Grid</SegmentControlItem>
          <SegmentControlItem value="board">Board</SegmentControlItem>
        </SegmentControl>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Slider (default) — Small</p>
        <SegmentControl defaultValue="list" variant="default" size="sm">
          <SegmentControlItem value="list">List</SegmentControlItem>
          <SegmentControlItem value="grid">Grid</SegmentControlItem>
          <SegmentControlItem value="board">Board</SegmentControlItem>
        </SegmentControl>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Outline — Default size</p>
        <SegmentControl defaultValue="list" variant="outline">
          <SegmentControlItem value="list">List</SegmentControlItem>
          <SegmentControlItem value="grid">Grid</SegmentControlItem>
          <SegmentControlItem value="board">Board</SegmentControlItem>
        </SegmentControl>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Outline — Small</p>
        <SegmentControl defaultValue="list" variant="outline" size="sm">
          <SegmentControlItem value="list">List</SegmentControlItem>
          <SegmentControlItem value="grid">Grid</SegmentControlItem>
          <SegmentControlItem value="board">Board</SegmentControlItem>
        </SegmentControl>
      </div>
    </div>
  ),
}

export const WithIcons: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Icon + Label</p>
        <SegmentControl defaultValue="list" variant="outline">
          <SegmentControlItem value="list"><List /> List</SegmentControlItem>
          <SegmentControlItem value="grid"><Grid /> Grid</SegmentControlItem>
          <SegmentControlItem value="board"><Rows /> Board</SegmentControlItem>
        </SegmentControl>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Icon only</p>
        <SegmentControl defaultValue="list" variant="outline">
          <SegmentControlItem value="list" aria-label="List"><List /></SegmentControlItem>
          <SegmentControlItem value="grid" aria-label="Grid"><Grid /></SegmentControlItem>
          <SegmentControlItem value="board" aria-label="Board"><Rows /></SegmentControlItem>
        </SegmentControl>
      </div>
    </div>
  ),
}

export const Disabled: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <SegmentControl defaultValue="list" variant="default" disabled>
        <SegmentControlItem value="list">List</SegmentControlItem>
        <SegmentControlItem value="grid">Grid</SegmentControlItem>
      </SegmentControl>
      <SegmentControl defaultValue="list" variant="outline" disabled>
        <SegmentControlItem value="list">List</SegmentControlItem>
        <SegmentControlItem value="grid">Grid</SegmentControlItem>
      </SegmentControl>
    </div>
  ),
}
