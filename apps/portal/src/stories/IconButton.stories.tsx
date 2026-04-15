import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Gear } from "@/components/icons/Gear"
import { Trash } from "@/components/icons/Trash"
import { Search } from "@/components/icons/Search"
import { Pencil } from "@/components/icons/Pencil"
import { Filter } from "@/components/icons/Filter"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/icon-button.manifest.json"

const meta: Meta = {
  title: "Actions/IconButton",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Icon Button</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Default</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Small</th>
          </tr>
        </thead>
        <tbody>
          {([
            ["default", "Primary", <Plus />],
            ["outline", "Outline", <Gear />],
            ["ghost", "Ghost", <Search />],
            ["secondary", "Secondary", <Pencil />],
            ["danger", "Danger", <Trash />],
            ["destructive", "Destructive", <Filter />],
          ] as [string, string, React.ReactNode][]).map(([v, name, icon]) => (
            <tr key={v}>
              <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>{name}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <Button variant={v as any} size="icon-md" aria-label={name}>{icon}</Button>
              </td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <Button variant={v as any} size="icon-sm" aria-label={name}>{icon}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
