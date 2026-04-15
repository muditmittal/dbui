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
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>State</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Off</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="flex items-center gap-2">
                <Switch />
                <span className="text-[13px] text-foreground">Notifications</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>On</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-[13px] text-foreground">Auto-save</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Disabled</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div className="flex items-center gap-2">
                <Switch disabled />
                <span className="text-[13px] text-muted-foreground">Managed by admin</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
