import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "dbui/components/ui/checkbox"

const meta: Meta = {
  title: "Controls/Checkbox",
  argTypes: {
    disabled: { control: "boolean" },
    showLabel: { control: "boolean", name: "Show Label" },
    label: { control: "text", if: { arg: "showLabel" } },
  },
  args: {
    disabled: false,
    showLabel: true,
    label: "Accept terms and conditions",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb" disabled={args.disabled} />
      {args.showLabel && <label className="text-[13px] leading-[20px] font-normal" htmlFor="cb">{args.label}</label>}
    </div>
  ),
}

export const States: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="s1" />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="s1">Unchecked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s2" defaultChecked />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="s2">Checked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s3" disabled />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="s3">Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s4" defaultChecked disabled />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="s4">Checked + Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s5" indeterminate />
        <label className="text-[13px] leading-[20px] font-normal" htmlFor="s5">Indeterminate</label>
      </div>
    </div>
  ),
}
