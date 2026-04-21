import type { Meta, StoryObj } from "@storybook/react"
import { SplitButton, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "@/components/icons/ChevronDown"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/split-button?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Actions/SplitButton",
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
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Split Button</h2>

      <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0", width: 100 }}>Variant</th>
            <th style={{ ...label, textAlign: "left", padding: "0 24px 12px 0" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {([
            ["default", "Primary"],
            ["outline", "Outline"],
          ] as const).map(([v, name]) => (
            <tr key={v}>
              <td style={{ padding: "14px 24px 14px 0", color: "#6F6F6F", fontSize: 12 }}>{name}</td>
              <td style={{ padding: "14px 24px 14px 0" }}>
                <SplitButton>
                  <Button variant={v}>Save</Button>
                  <SplitButtonSeparator />
                  <Button variant={v} size="icon-md" aria-label="More options"><ChevronDown /></Button>
                </SplitButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <ComponentMeta source={componentSource} componentKey="split-button" />

      <ProductionMap componentKey="split-button" />
    </div>
  ),
}
