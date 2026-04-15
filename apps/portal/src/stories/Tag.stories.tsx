import type { Meta, StoryObj } from "@storybook/react"
import { Tag, TagIcon, TagLabel, TagValue, TagRemove } from "dbui/components/ui/tag"
import { Key } from "@/components/icons/Key"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/tag.manifest.json"

const meta: Meta = {
  title: "Content/Tag",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tag</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 180 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Default</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>With Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Label only</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Tag><TagLabel>environment</TagLabel></Tag>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Tag><TagLabel>environment</TagLabel><TagRemove /></Tag>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Key : Value</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Tag><TagIcon><Key /></TagIcon><TagLabel>env</TagLabel><TagValue>production</TagValue></Tag>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Tag><TagIcon><Key /></TagIcon><TagLabel>env</TagLabel><TagValue>production</TagValue><TagRemove /></Tag>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
