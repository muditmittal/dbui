import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "../../lib/cva"

import { cn } from "../../lib/utils"
import { Separator } from "./separator"

/**
 * @standard Split Button
 * @guideline Use when there's a primary action with related alternatives
 * @guideline Primary action should be the most common choice
 * @guideline Limit dropdown to 3-5 related actions
 * @constraint Max 2 variants: Primary and Outline only
 * @constraint Dropdown items must be related to the primary action
 * @constraint Never nest SplitButtons inside menus
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=580-527
 */

const splitButtonVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=split-button]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-sm [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-sm! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-sm! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function SplitButton({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof splitButtonVariants>) {
  return (
    <div
      role="group"
      data-slot="split-button"
      data-orientation={orientation}
      className={cn(splitButtonVariants({ orientation }), className)}
      {...props}
    />
  )
}

function SplitButtonText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-[13px] font-semibold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "split-button-text",
    },
  })
}

function SplitButtonSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="split-button-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-primary-foreground/20 data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  SplitButton,
  SplitButtonSeparator,
  SplitButtonText,
  splitButtonVariants,
}
