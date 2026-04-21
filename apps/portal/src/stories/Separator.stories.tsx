import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "dbui/components/ui/separator"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/separator?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Content/Separator",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Separator</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Orientation</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Horizontal</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="w-[300px]">
                <div className="text-[13px] mb-2">Content above</div>
                <Separator />
                <div className="text-[13px] mt-2">Content below</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12, verticalAlign: "top" }}>Vertical</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="flex items-center gap-4 h-8">
                <span className="text-[13px]">Left</span>
                <Separator orientation="vertical" />
                <span className="text-[13px]">Right</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>


      <ComponentMeta source={componentSource} />

      <ProductionMap componentKey="separator" />
    </div>
  ),
}
