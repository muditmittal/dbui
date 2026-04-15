import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "dbui/components/ui/input"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/input.manifest.json"

const meta: Meta = {
  title: "Controls/Input",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Input</h2>

      {/* Sizes */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ ...label }}>Sizes</div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 4 }}>Default</div>
            <Input placeholder="Placeholder" />
          </div>
          <div style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 4 }}>Small</div>
            <Input size="sm" placeholder="Placeholder" />
          </div>
        </div>
      </div>

      {/* Validation */}
      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Validation</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Normal</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 240 }}><Input defaultValue="Input text" /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Danger</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 240 }}><Input defaultValue="Bad input" aria-invalid /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Warning</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 240 }}><Input defaultValue="Needs attention" validation="warning" /></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Success</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <div style={{ width: 240 }}><Input defaultValue="Looks good" validation="success" /></div>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
