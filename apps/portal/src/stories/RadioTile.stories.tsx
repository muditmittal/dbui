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
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/radio-tile.manifest.json"

const meta: Meta = {
  title: "Controls/RadioTile",
  parameters: { layout: "padded" },
}

export default meta

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

const rowLabel: React.CSSProperties = {
  fontSize: 12,
  color: "#6F6F6F",
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Radio Tile</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 140 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>Unselected</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <RadioTileGroup className="max-w-sm grid-cols-1">
                <RadioTile value="standard">
                  <RadioTileHeader>
                    <RadioTileTitle>Standard Compute</RadioTileTitle>
                  </RadioTileHeader>
                  <RadioTileDescription>General purpose compute for most workloads</RadioTileDescription>
                </RadioTile>
              </RadioTileGroup>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>Selected</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <RadioTileGroup defaultValue="performance" className="max-w-sm grid-cols-1">
                <RadioTile value="performance">
                  <RadioTileHeader>
                    <RadioTileTitle>Performance Compute</RadioTileTitle>
                  </RadioTileHeader>
                  <RadioTileDescription>Optimized for compute-intensive tasks</RadioTileDescription>
                </RadioTile>
              </RadioTileGroup>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "top", ...rowLabel }}>With icon + description</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
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
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
