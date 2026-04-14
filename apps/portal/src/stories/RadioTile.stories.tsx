import type { Meta, StoryObj } from "@storybook/react"
import {
  RadioTileGroup,
  RadioTile,
  RadioTileHeader,
  RadioTileTitle,
  RadioTileDescription,
} from "dbui/components/ui/radio-tile"
import { Cloud } from "@/components/icons/Cloud"
import { Gear } from "@/components/icons/Gear"

const meta: Meta<typeof RadioTileGroup> = {
  title: "Controls/RadioTile",
  component: RadioTileGroup,
}

export default meta
type Story = StoryObj<typeof RadioTileGroup>

export const Default: Story = {
  render: () => (
    <RadioTileGroup defaultValue="standard" className="max-w-md grid-cols-1">
      <RadioTile value="standard">
        <RadioTileHeader>
          <RadioTileTitle>Standard</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>General purpose compute for most workloads</RadioTileDescription>
      </RadioTile>
      <RadioTile value="performance">
        <RadioTileHeader>
          <RadioTileTitle>Performance</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Optimized for compute-intensive tasks</RadioTileDescription>
      </RadioTile>
      <RadioTile value="memory">
        <RadioTileHeader>
          <RadioTileTitle>Memory Optimized</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>For large datasets that need to fit in memory</RadioTileDescription>
      </RadioTile>
    </RadioTileGroup>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <RadioTileGroup defaultValue="on-demand" className="max-w-lg grid-cols-2">
      <RadioTile value="on-demand">
        <RadioTileHeader>
          <Gear className="size-4 text-muted-foreground" />
          <RadioTileTitle>On-Demand</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Pay as you go, no commitment</RadioTileDescription>
      </RadioTile>
      <RadioTile value="serverless">
        <RadioTileHeader>
          <Cloud className="size-4 text-muted-foreground" />
          <RadioTileTitle>Serverless</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Auto-scaling, zero management</RadioTileDescription>
      </RadioTile>
    </RadioTileGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioTileGroup className="max-w-md grid-cols-1">
      <RadioTile value="available">
        <RadioTileHeader>
          <RadioTileTitle>Available</RadioTileTitle>
        </RadioTileHeader>
      </RadioTile>
      <RadioTile value="disabled" disabled>
        <RadioTileHeader>
          <RadioTileTitle>Disabled option</RadioTileTitle>
        </RadioTileHeader>
      </RadioTile>
    </RadioTileGroup>
  ),
}
