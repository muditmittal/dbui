import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "dbui/components/ui/select"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/select.manifest.json"

const meta: Meta = {
  title: "Controls/Select",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Select</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Type</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Default</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Small</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Default</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 200 }}>
                <Select defaultValue="notebook">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="query">Query</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 200 }}>
                <Select defaultValue="notebook">
                  <SelectTrigger size="sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="query">Query</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Ghost</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 200 }}>
                <Select defaultValue="notebook">
                  <SelectTrigger variant="ghost"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="query">Query</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 200 }}>
                <Select defaultValue="notebook">
                  <SelectTrigger variant="ghost" size="sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="query">Query</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
