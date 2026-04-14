import type { Meta, StoryObj } from "@storybook/react"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"

const meta: Meta<typeof SegmentControl> = {
  title: "Actions/SegmentControl",
  component: SegmentControl,
}

export default meta
type Story = StoryObj<typeof SegmentControl>

export const Default: Story = {
  render: () => (
    <SegmentControl defaultValue="list">
      <SegmentControlItem value="list">List</SegmentControlItem>
      <SegmentControlItem value="grid">Grid</SegmentControlItem>
      <SegmentControlItem value="board">Board</SegmentControlItem>
    </SegmentControl>
  ),
}

export const Small: Story = {
  render: () => (
    <SegmentControl defaultValue="a" size="sm">
      <SegmentControlItem value="a" size="sm">A</SegmentControlItem>
      <SegmentControlItem value="b" size="sm">B</SegmentControlItem>
      <SegmentControlItem value="c" size="sm">C</SegmentControlItem>
    </SegmentControl>
  ),
}
