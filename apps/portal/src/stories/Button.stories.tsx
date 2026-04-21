import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonIcon, ButtonChevron } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Search } from "@/components/icons/Search"
import { Filter } from "@/components/icons/Filter"
import { Pencil } from "@/components/icons/Pencil"
import { Download } from "@/components/icons/Download"
import { Trash } from "@/components/icons/Trash"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/button?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Actions/Button",
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "link", "destructive", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "icon-sm", "icon-md"],
    },
    label: { control: "text" },
    showIcon: { control: "boolean", name: "Show Icon" },
    icon: {
      control: "select",
      options: ["Plus", "Search", "Filter", "Pencil", "Download", "Trash"],
      if: { arg: "showIcon" },
    },
    showChevron: { control: "boolean", name: "Show Chevron" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    label: "Button",
    showIcon: false,
    icon: "Plus",
    showChevron: false,
    loading: false,
    disabled: false,
  },
}

export default meta

const iconMap: Record<string, React.ReactNode> = {
  Plus: <Plus />,
  Search: <Search />,
  Filter: <Filter />,
  Pencil: <Pencil />,
  Download: <Download />,
  Trash: <Trash />,
}

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

function AllVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Row per variant — Default size, then Small */}
      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Default</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Icon + Label</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Icon Only</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Menu</th>
          </tr>
        </thead>
        <tbody>
          {([
            ["default", "Primary"],
            ["outline", "Outline"],
            ["secondary", "Secondary"],
            ["ghost", "Ghost"],
            ["link", "Link"],
            ["destructive", "Destructive"],
            ["danger", "Danger"],
          ] as const).map(([v, name]) => (
            <tr key={v}>
              <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>{name}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <Button variant={v}>{name}</Button>
              </td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                {v === "link" ? (
                  <span style={{ fontSize: 11, color: "#CBCBCB" }}>—</span>
                ) : (
                  <Button variant={v}><ButtonIcon><Plus /></ButtonIcon>{name}</Button>
                )}
              </td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                {v === "link" ? (
                  <span style={{ fontSize: 11, color: "#CBCBCB" }}>—</span>
                ) : (
                  <Button variant={v} size="icon-md" aria-label={name}><Plus /></Button>
                )}
              </td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                {v === "link" ? (
                  <span style={{ fontSize: 11, color: "#CBCBCB" }}>—</span>
                ) : (
                  <Button variant={v}>{name}<ButtonChevron /></Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Button</h2>

      {/* All key variants */}
      <AllVariants />


      <ComponentMeta source={componentSource} componentKey="button" />

      <ProductionMap componentKey="button" />
    </div>
  ),
}
