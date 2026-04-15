import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "dbui/components/ui/avatar"
import { User } from "@/components/icons/User"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/avatar.manifest.json"

const meta: Meta = {
  title: "Content/Avatar",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Avatar</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 140 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Initials fallback</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Avatar><AvatarFallback>MM</AvatarFallback></Avatar>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Icon fallback</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Avatar><AvatarFallback><User className="size-4" /></AvatarFallback></Avatar>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", verticalAlign: "middle", ...rowLabel }}>Group</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <AvatarGroup>
                <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
                <AvatarGroupCount>+5</AvatarGroupCount>
              </AvatarGroup>
            </td>
          </tr>
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
