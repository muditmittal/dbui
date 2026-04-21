import type { Meta, StoryObj } from "@storybook/react"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/segment-control?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Actions/SegmentControl",
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

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Segment Control</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Slider</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <SegmentControl defaultValue="list" variant="default">
                <SegmentControlItem value="list">List</SegmentControlItem>
                <SegmentControlItem value="grid">Grid</SegmentControlItem>
                <SegmentControlItem value="board">Board</SegmentControlItem>
              </SegmentControl>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Outline</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <SegmentControl defaultValue="list" variant="outline">
                <SegmentControlItem value="list">List</SegmentControlItem>
                <SegmentControlItem value="grid">Grid</SegmentControlItem>
                <SegmentControlItem value="board">Board</SegmentControlItem>
              </SegmentControl>
            </td>
          </tr>
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="segment-control" />

      <ProductionMap componentKey="segment-control" />
    </div>
  ),
}
