import type { Meta, StoryObj } from "@storybook/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogHeaderIcon, DialogTitle, DialogTrigger } from "dbui/components/ui/dialog"
import { Button } from "dbui/components/ui/button"
import { WarningFill } from "@/components/icons/WarningFill"

const meta: Meta = {
  title: "Overlays/Dialog",
  parameters: {
    docs: {
      description: {
        component: [
          "### Constraints",
          "- **Non-alert dialogs** MUST have `showCloseButton=true`. Users need an escape hatch.",
          "- **DialogFooter:** Primary action button must be RIGHTMOST. Cancel/secondary on left.",
          "- **Sizes:** normal (640px) for forms, wide (880px) for tables/previews, extrawide (1200px) for full editors.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["normal", "wide", "extrawide"], name: "Size (.DialogBody)" },
    showIcon: { control: "boolean", name: "Show Header Icon (.DialogHeader)" },
    showCloseButton: { control: "boolean", name: "Show Close Button" },
    showFooter: { control: "boolean", name: "Show Footer (.DialogFooter)" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    size: "normal",
    showIcon: false,
    showCloseButton: true,
    showFooter: true,
    title: "Dialog Title",
    description: "This is a description of the dialog content.",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open Dialog
      </DialogTrigger>
      <DialogContent size={args.size} showCloseButton={args.showCloseButton}>
        <DialogHeader>
          {args.showIcon && <DialogHeaderIcon><WarningFill /></DialogHeaderIcon>}
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>
        <div className="px-4 py-4 text-[13px] text-muted-foreground">
          Dialog body content goes here. This maps to the Figma .Slot inner component.
        </div>
        {args.showFooter && (
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  ),
}

export const Sizes: StoryObj = {
  name: "Sizes (.DialogBody)",
  render: () => (
    <div className="flex gap-3">
      {(["normal", "wide", "extrawide"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" />}>
            {size}
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size} · {size === "normal" ? "640px" : size === "wide" ? "880px" : "1200px"}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}
