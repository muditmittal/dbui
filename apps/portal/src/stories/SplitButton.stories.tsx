import type { Meta, StoryObj } from "@storybook/react"
import { SplitButton, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "@/components/icons/ChevronDown"

const meta: Meta = {
  title: "Actions/SplitButton",
  argTypes: {
    variant: { control: "radio", options: ["default", "outline"], name: "Variant" },
    size: { control: "radio", options: ["md", "sm"], name: "Size" },
  },
  args: {
    variant: "default",
    size: "md",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => {
    const iconSize = args.size === "sm" ? "icon-sm" : "icon-md"
    return (
      <SplitButton>
        <Button variant={args.variant} size={args.size}>Save</Button>
        <SplitButtonSeparator />
        <Button variant={args.variant} size={iconSize} aria-label="More options"><ChevronDown /></Button>
      </SplitButton>
    )
  },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-muted-foreground">Primary · Default</p>
          <SplitButton>
            <Button>Save</Button>
            <SplitButtonSeparator />
            <Button size="icon-md" aria-label="More"><ChevronDown /></Button>
          </SplitButton>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-muted-foreground">Primary · Small</p>
          <SplitButton>
            <Button size="sm">Save</Button>
            <SplitButtonSeparator />
            <Button size="icon-sm" aria-label="More"><ChevronDown /></Button>
          </SplitButton>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-muted-foreground">Outline · Default</p>
          <SplitButton>
            <Button variant="outline">Options</Button>
            <SplitButtonSeparator />
            <Button variant="outline" size="icon-md" aria-label="More"><ChevronDown /></Button>
          </SplitButton>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-muted-foreground">Outline · Small</p>
          <SplitButton>
            <Button variant="outline" size="sm">Options</Button>
            <SplitButtonSeparator />
            <Button variant="outline" size="icon-sm" aria-label="More"><ChevronDown /></Button>
          </SplitButton>
        </div>
      </div>
    </div>
  ),
}
