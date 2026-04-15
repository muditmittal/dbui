import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "dbui/components/ui/slider"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/slider.manifest.json"

const meta: Meta = {
  title: "Controls/Slider",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Slider</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>State</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Default</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px] flex items-center gap-3">
                <Slider defaultValue={[50]} max={100} min={0} />
                <span className="text-[13px] text-muted-foreground w-8 text-right">50</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Disabled</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px] flex items-center gap-3">
                <Slider defaultValue={[30]} max={100} min={0} disabled />
                <span className="text-[13px] text-muted-foreground w-8 text-right">30</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
