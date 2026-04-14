import type { Meta, StoryObj } from "@storybook/react"
import { Toggle, FilterToggle } from "dbui/components/ui/toggle"
import { Bold } from "@/components/icons/Bold"
import { Notebook } from "@/components/icons/Notebook"

/**
 * Toggle Button — 4 variants with unique behaviors.
 *
 * - **Default:** Plain text toggle, no border
 * - **Filter:** Checkbox when OFF → Check icon when ON. Unique to Databricks.
 * - **Pill:** Rounded pill with icon + label. Uses Plus icon by default.
 * - **Icon:** Icon-only toggle (e.g., Bold, ThumbsUp)
 */
const meta: Meta<typeof Toggle> = {
  title: "Actions/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: ["default", "filter", "pill", "icon"] },
    size: { control: "select", options: ["sm", "md", "icon-sm", "icon-md"] },
    disabled: { control: "boolean" },
    pressed: { control: "boolean", name: "Pressed (selected)" },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
    pressed: false,
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Playground: Story = {
  render: (args) => (
    args.variant === "filter" ? (
      <FilterToggle size={args.size} disabled={args.disabled} defaultPressed={args.pressed}>
        Filter
      </FilterToggle>
    ) : (
      <Toggle
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
        defaultPressed={args.pressed}
      >
        {args.variant === "icon" ? <Bold /> :
         args.variant === "pill" ? <><Notebook /> Notebooks</> :
         "Label"}
      </Toggle>
    )
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[12px] text-muted-foreground mb-2">Default — plain text, no border</p>
        <div className="flex items-center gap-3">
          <Toggle variant="default">Default</Toggle>
          <Toggle variant="default" defaultPressed>Default (on)</Toggle>
        </div>
      </div>
      <div>
        <p className="text-[12px] text-muted-foreground mb-2">Filter — checkbox OFF → checkmark ON. Unique to Databricks.</p>
        <div className="flex items-center gap-3">
          <FilterToggle>Filter</FilterToggle>
          <FilterToggle defaultPressed>Filter (on)</FilterToggle>
        </div>
      </div>
      <div>
        <p className="text-[12px] text-muted-foreground mb-2">Pill — rounded, icon + label</p>
        <div className="flex items-center gap-3">
          <Toggle variant="pill"><Notebook /> Notebooks</Toggle>
          <Toggle variant="pill" defaultPressed><Notebook /> Notebooks</Toggle>
        </div>
      </div>
      <div>
        <p className="text-[12px] text-muted-foreground mb-2">Icon — icon only</p>
        <div className="flex items-center gap-3">
          <Toggle variant="icon" size="icon-md" aria-label="Bold"><Bold /></Toggle>
          <Toggle variant="icon" size="icon-md" aria-label="Bold" defaultPressed><Bold /></Toggle>
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Toggle variant="default" size="sm">Small</Toggle>
        <Toggle variant="default" size="md">Default</Toggle>
      </div>
      <div className="flex items-center gap-3">
        <Toggle variant="pill" size="sm"><Notebook /> Small</Toggle>
        <Toggle variant="pill" size="md"><Notebook /> Default</Toggle>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle variant="default" disabled>Default</Toggle>
      <FilterToggle disabled>Filter</FilterToggle>
      <Toggle variant="pill" disabled><Notebook /> Pill</Toggle>
      <Toggle variant="icon" size="icon-md" aria-label="Bold" disabled><Bold /></Toggle>
    </div>
  ),
}
