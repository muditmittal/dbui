import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "dbui/components/ui/textarea"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/textarea.manifest.json"

const meta: Meta = {
  title: "Controls/Textarea",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Textarea</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Validation</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Default</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 320 }}><Textarea placeholder="Placeholder" /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Danger</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 320 }}><Textarea defaultValue="Invalid content" aria-invalid /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Warning</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 320 }}><Textarea defaultValue="Needs attention" validation="warning" /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Success</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 320 }}><Textarea defaultValue="Looks good" validation="success" /></div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
