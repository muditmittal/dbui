import type { Meta, StoryObj } from "@storybook/react"
import {
  RadioTileGroup,
  RadioTile,
  RadioTileHeader,
  RadioTileTitle,
  RadioTileDescription,
  RadioTileIcon,
} from "dbui/components/ui/radio-tile"
import { Cloud } from "@/components/icons/Cloud"
import { Gear } from "@/components/icons/Gear"
import { Lightning } from "@/components/icons/Lightning"

const meta: Meta = {
  title: "Controls/RadioTile",
  argTypes: {
    showIcon: { control: "boolean", name: "Show Icon" },
    showDescription: { control: "boolean", name: "Show Description" },
    columns: { control: "radio", options: [1, 2, 3], name: "Grid Columns" },
    disabled: { control: "boolean" },
  },
  args: {
    showIcon: false,
    showDescription: true,
    columns: 1,
    disabled: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <RadioTileGroup
      defaultValue="standard"
      disabled={args.disabled}
      className={`max-w-lg ${args.columns === 1 ? "grid-cols-1" : args.columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}
    >
      <RadioTile value="standard">
        <RadioTileHeader>
          {args.showIcon && <RadioTileIcon><Gear /></RadioTileIcon>}
          <RadioTileTitle>Standard</RadioTileTitle>
        </RadioTileHeader>
        {args.showDescription && (
          <RadioTileDescription>General purpose compute for most workloads</RadioTileDescription>
        )}
      </RadioTile>
      <RadioTile value="performance">
        <RadioTileHeader>
          {args.showIcon && <RadioTileIcon><Lightning /></RadioTileIcon>}
          <RadioTileTitle>Performance</RadioTileTitle>
        </RadioTileHeader>
        {args.showDescription && (
          <RadioTileDescription>Optimized for compute-intensive tasks</RadioTileDescription>
        )}
      </RadioTile>
      <RadioTile value="memory">
        <RadioTileHeader>
          {args.showIcon && <RadioTileIcon><Cloud /></RadioTileIcon>}
          <RadioTileTitle>Memory Optimized</RadioTileTitle>
        </RadioTileHeader>
        {args.showDescription && (
          <RadioTileDescription>For large datasets that need to fit in memory</RadioTileDescription>
        )}
      </RadioTile>
    </RadioTileGroup>
  ),
}

export const WithIcons: StoryObj = {
  render: () => (
    <RadioTileGroup defaultValue="on-demand" className="max-w-lg grid-cols-2">
      <RadioTile value="on-demand">
        <RadioTileHeader>
          <RadioTileIcon><Gear /></RadioTileIcon>
          <RadioTileTitle>On-Demand</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Pay as you go, no commitment</RadioTileDescription>
      </RadioTile>
      <RadioTile value="serverless">
        <RadioTileHeader>
          <RadioTileIcon><Cloud /></RadioTileIcon>
          <RadioTileTitle>Serverless</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Auto-scaling, zero management</RadioTileDescription>
      </RadioTile>
    </RadioTileGroup>
  ),
}

export const Disabled: StoryObj = {
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
