import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"

const meta: Meta = {
  title: "Controls/RadioGroup",
  argTypes: {
    orientation: { control: "radio", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
  },
  args: {
    orientation: "vertical",
    disabled: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <RadioGroup defaultValue="option-1" orientation={args.orientation} disabled={args.disabled} className={args.orientation === "horizontal" ? "flex-row" : ""}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="r1" />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="r1">Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="r2" />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="r2">Option 2</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="r3" />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="r3">Option 3</label>
      </div>
    </RadioGroup>
  ),
}
