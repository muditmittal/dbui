import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "dbui/components/ui/textarea"

const meta: Meta = {
  title: "Controls/Textarea",
  argTypes: {
    state: {
      control: "select",
      options: ["default", "disabled", "invalid", "warning", "success"],
      name: "State",
    },
    placeholder: { control: "text" },
    rows: { control: { type: "range", min: 2, max: 10, step: 1 } },
  },
  args: {
    state: "default",
    placeholder: "Placeholder",
    rows: 4,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[320px]">
      <Textarea
        placeholder={args.placeholder}
        rows={args.rows}
        disabled={args.state === "disabled"}
        aria-invalid={args.state === "invalid" || undefined}
        validation={args.state === "warning" ? "warning" : args.state === "success" ? "success" : undefined}
      />
    </div>
  ),
}

export const AllStates: StoryObj = {
  name: "All States ",
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Default</p>
        <Textarea placeholder="Placeholder" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Disabled</p>
        <Textarea placeholder="Disabled" disabled />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Danger — border + ring</p>
        <Textarea defaultValue="Invalid content" aria-invalid />
      </div>
      <p className="text-[11px] text-muted-foreground mt-2">Hover/Focus states are interactive. Focus shows blue outer ring.</p>
    </div>
  ),
}
