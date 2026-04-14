import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "dbui/components/ui/tooltip"
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverTrigger } from "dbui/components/ui/popover"
import { Button } from "dbui/components/ui/button"
import { Kbd } from "dbui/components/ui/kbd"

/**
 * Tooltip and Popover — maps to Figma .Tip (Type: Tooltip / Popover).
 */
const meta: Meta = {
  title: "Overlays/Tooltip",
  argTypes: {
    type: { control: "radio", options: ["tooltip", "popover"], name: "Type (.Tip)" },
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
    content: { control: "text" },
    showShortcut: { control: "boolean", name: "Show Keyboard Shortcut", if: { arg: "type", eq: "tooltip" } },
  },
  args: {
    type: "tooltip",
    side: "top",
    content: "Helpful tip text",
    showShortcut: false,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <TooltipProvider>
      <div className="flex items-center justify-center p-20">
        {args.type === "tooltip" ? (
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Hover me
            </TooltipTrigger>
            <TooltipContent side={args.side}>
              {args.content}
              {args.showShortcut && <Kbd>⌘K</Kbd>}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Click me
            </PopoverTrigger>
            <PopoverContent side={args.side}>
              <PopoverHeader>
                <PopoverTitle>Popover Title</PopoverTitle>
                <PopoverDescription>{args.content}</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </TooltipProvider>
  ),
}
