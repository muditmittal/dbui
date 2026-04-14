import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Controls/RadioGroup",
  component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="r1" />
        <label htmlFor="r1" className="text-[13px] leading-[20px]">Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="r2" />
        <label htmlFor="r2" className="text-[13px] leading-[20px]">Option 2</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="r3" />
        <label htmlFor="r3" className="text-[13px] leading-[20px]">Option 3</label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="rd1" />
        <label htmlFor="rd1" className="text-[13px] leading-[20px]">Disabled selected</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="rd2" />
        <label htmlFor="rd2" className="text-[13px] leading-[20px]">Disabled</label>
      </div>
    </RadioGroup>
  ),
}
