import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "dbui/components/ui/switch"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/switch.manifest.json"

const meta: Meta = {
  title: "Controls/Switch",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Switch</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Size</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Off</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Default</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Switch />
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Switch defaultChecked />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Small</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Switch size="sm" />
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Switch size="sm" defaultChecked />
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
