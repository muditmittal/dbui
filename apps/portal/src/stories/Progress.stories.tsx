import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "dbui/components/ui/progress"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/progress-bar.manifest.json"

const meta: Meta = {
  title: "Content/Progress",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Progress</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Value</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {[0, 33, 66, 100].map((value) => (
            <tr key={value}>
              <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>{value}%</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <div className="w-[260px]"><Progress value={value} /></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
