import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "dbui/components/ui/badge"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/badge.manifest.json"

const meta: Meta = {
  title: "Content/Badge",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Badge</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 120 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {([
            { variant: "default" as const, name: "Default" },
            { variant: "secondary" as const, name: "Secondary" },
            { variant: "outline" as const, name: "Outline" },
            { variant: "destructive" as const, name: "Destructive" },
          ]).map(({ variant, name }) => (
            <tr key={variant}>
              <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", fontSize: 12, color: "#6F6F6F" }}>{name}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <Badge variant={variant}>{name}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
