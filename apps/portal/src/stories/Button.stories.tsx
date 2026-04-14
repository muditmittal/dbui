import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonIcon, ButtonChevron } from "dbui/components/ui/button"
import { Plus } from "@/components/icons/Plus"
import { Search } from "@/components/icons/Search"
import { Filter } from "@/components/icons/Filter"
import { Pencil } from "@/components/icons/Pencil"
import { Download } from "@/components/icons/Download"
import { Trash } from "@/components/icons/Trash"

/**
 * Interactive playground that maps to Figma's .ActionLabel inner component.
 * Toggle Show Icon, Show Chevron, and pick an icon to match any Figma variant.
 */
const meta: Meta = {
  title: "Actions/Button",
  parameters: {
    docs: {
      description: {
        component: [
          "### Constraints",
          "- **Link variant:** NO icons. No ButtonIcon, no ButtonChevron. Only trailing icon allowed: NewWindow for external links.",
          "- **Ghost variant:** Prefer icon-only (`size: icon-sm/icon-md`). Ghost with icon+label competes with Outline.",
          "- **Icon-only** (`size: icon-sm/icon-md`): MUST have `aria-label`.",
          "- **Menu trigger** (with ButtonChevron): Avoid leading ButtonIcon. Prefer outline or secondary variant — not primary.",
          "- **Destructive:** Should only appear inside AlertDialog or as the final confirmed action.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "link", "destructive", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "icon-sm", "icon-md"],
    },
    label: { control: "text" },
    showIcon: { control: "boolean", name: "Show Icon (.ActionLabel)" },
    icon: {
      control: "select",
      options: ["Plus", "Search", "Filter", "Pencil", "Download", "Trash"],
      if: { arg: "showIcon" },
    },
    showChevron: { control: "boolean", name: "Show Menu Chevron (.ActionLabel)" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    label: "Button",
    showIcon: false,
    icon: "Plus",
    showChevron: false,
    loading: false,
    disabled: false,
  },
}

export default meta

const iconMap: Record<string, React.ReactNode> = {
  Plus: <Plus />,
  Search: <Search />,
  Filter: <Filter />,
  Pencil: <Pencil />,
  Download: <Download />,
  Trash: <Trash />,
}

export const Playground: StoryObj = {
  render: (args: any) => (
    <Button
      variant={args.variant}
      size={args.size}
      loading={args.loading}
      disabled={args.disabled}
    >
      {args.showIcon && <ButtonIcon>{iconMap[args.icon] || <Plus />}</ButtonIcon>}
      {args.label}
      {args.showChevron && <ButtonChevron />}
    </Button>
  ),
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="icon-sm"><Plus /></Button>
      <Button size="icon-md"><Plus /></Button>
    </div>
  ),
}

export const IconCompositions: StoryObj = {
  name: "Icon Compositions (.ActionLabel)",
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-[12px] text-muted-foreground">Maps to Figma .ActionLabel — icon + label + optional chevron</p>
      <div className="flex items-center gap-3">
        <Button><ButtonIcon><Plus /></ButtonIcon>Create</Button>
        <Button variant="outline"><ButtonIcon><Search /></ButtonIcon>Search</Button>
        <Button variant="secondary"><ButtonIcon><Filter /></ButtonIcon>Filter</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">Options<ButtonChevron /></Button>
        <Button variant="secondary"><ButtonIcon><Filter /></ButtonIcon>Filter<ButtonChevron /></Button>
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm"><ButtonIcon><Plus /></ButtonIcon>Create</Button>
        <Button size="sm" variant="outline">Options<ButtonChevron /></Button>
      </div>
    </div>
  ),
}

export const Loading: StoryObj = {
  args: {
    label: "Saving...",
    loading: true,
  },
  render: (args: any) => (
    <Button loading={args.loading}>{args.label}</Button>
  ),
}

export const Disabled: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
}
