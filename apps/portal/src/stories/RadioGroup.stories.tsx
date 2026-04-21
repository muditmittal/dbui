import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/radio-group?raw"
import { ProductionMap } from "./components/ProductionMap"

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
        <label className="group/field flex cursor-pointer items-center gap-2 py-1.5">
          <RadioGroupItem value="option-1" id="rg-1" />
          <span className="text-[13px] leading-[20px]">Selected option</span>
        </label>
        <label className="group/field flex cursor-pointer items-center gap-2 py-1.5">
          <RadioGroupItem value="option-2" id="rg-2" />
          <span className="text-[13px] leading-[20px]">Unselected option</span>
        </label>
        <label className="group/field flex cursor-pointer items-center gap-2 py-1.5">
          <RadioGroupItem value="option-3" id="rg-3" disabled />
          <span className="text-[13px] leading-[20px] text-disabled-foreground">Disabled option</span>
        </label>
      </RadioGroup>


      <ComponentMeta source={componentSource} componentKey="radio-group" />

      <ProductionMap componentKey="radio-group" />
    </div>
  ),
}
