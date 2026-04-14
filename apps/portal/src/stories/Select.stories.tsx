import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator } from "dbui/components/ui/select"
import { Search } from "@/components/icons/Search"

const meta: Meta = {
  title: "Controls/Select",
  argTypes: {
    variant: { control: "radio", options: ["default", "ghost"], name: "Type (Default / Ghost)" },
    size: { control: "radio", options: ["default", "sm"], name: "Size" },
    showIcon: { control: "boolean", name: "Show Icon (Search)" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    variant: "default",
    size: "default",
    showIcon: false,
    disabled: false,
    placeholder: "Select an option...",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[240px]">
      <Select>
        <SelectTrigger size={args.size} variant={args.variant} disabled={args.disabled}>
          {args.showIcon && <Search className="size-4 shrink-0 text-muted-foreground" />}
          <SelectValue placeholder={args.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <SelectItem value="notebook">Notebook</SelectItem>
            <SelectItem value="query">Query</SelectItem>
            <SelectItem value="dashboard">Dashboard</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Data</SelectLabel>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const AllStates: StoryObj = {
  name: "All States ",
  render: () => (
    <div className="flex flex-col gap-3 w-[240px]">
      {[
        { label: "Default", props: {} },
        { label: "Ghost", props: { variant: "ghost" as const } },
        { label: "With Icon", props: {}, icon: true },
        { label: "Small", props: { size: "sm" as const } },
        { label: "Disabled", props: { disabled: true } },
        { label: "Danger (invalid)", props: { "aria-invalid": true } },
      ].map(({ label, props, icon }) => (
        <div key={label} className="flex flex-col gap-1">
          <p className="text-[12px] text-muted-foreground">{label}</p>
          <Select defaultValue="notebook">
            <SelectTrigger {...props}>
              {icon && <Search className="size-4 shrink-0 text-muted-foreground" />}
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="notebook">Notebook</SelectItem>
              <SelectItem value="query">Query</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground mt-2">Hover/Focus states are interactive.</p>
    </div>
  ),
}
