import type { Meta, StoryObj } from "@storybook/react"
import { Toggle, FilterToggle } from "dbui/components/ui/toggle"
import { Bold } from "@/components/icons/Bold"
import { Notebook } from "@/components/icons/Notebook"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/toggle?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Actions/Toggle",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Toggle</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Default</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Selected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Default</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="default">Label</Toggle>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="default" defaultPressed>Label</Toggle>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Filter</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <FilterToggle>Filter</FilterToggle>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <FilterToggle defaultPressed>Filter</FilterToggle>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Icon</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="icon" size="icon-md" aria-label="Bold"><Bold /></Toggle>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="icon" size="icon-md" aria-label="Bold" defaultPressed><Bold /></Toggle>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>Pill</td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="pill"><Notebook /> Notebooks</Toggle>
            </td>
            <td style={{ padding: "14px 24px 14px 0" }}>
              <Toggle variant="pill" defaultPressed><Notebook /> Notebooks</Toggle>
            </td>
          </tr>
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="toggle" />

      <ProductionMap componentKey="toggle" />
    </div>
  ),
}
