import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/radio.manifest.json"

const meta: Meta = {
  title: "Controls/RadioGroup",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Radio Group</h2>

      <RadioGroup defaultValue="option-1">
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
          <RadioGroupItem value="option-1" id="rg-1" />
          <label htmlFor="rg-1" style={{ fontSize: 13, lineHeight: "20px", fontWeight: 400 }}>Selected option</label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
          <RadioGroupItem value="option-2" id="rg-2" />
          <label htmlFor="rg-2" style={{ fontSize: 13, lineHeight: "20px", fontWeight: 400 }}>Unselected option</label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
          <RadioGroupItem value="option-3" id="rg-3" disabled />
          <label htmlFor="rg-3" style={{ fontSize: 13, lineHeight: "20px", fontWeight: 400, opacity: 0.5 }}>Disabled option</label>
        </div>
      </RadioGroup>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
