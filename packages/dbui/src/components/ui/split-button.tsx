import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "../../lib/cva"

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

// A split button is a row. The vertical stack that used to sit on an
// `orientation` axis here had no call site in the repo and no counterpart in
// the Figma component set, so the seam rules are the base string now.
const splitButtonVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-raised has-[>[data-slot=split-button]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-1 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 *:data-slot:shape-r-square [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-1! [&>[data-slot]~[data-slot]]:shape-l-square [&>[data-slot]~[data-slot]]:-ml-px has-[>[data-slot]:hover]:*:data-slot:border-input-border-hover"
)

function SplitButton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="split-button"
      className={cn(splitButtonVariants(), className)}
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
          "flex items-center gap-2 rounded-3 border bg-surface-subtle px-3 type-label-bold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
        "relative self-stretch bg-action-label-inverse-base/20 data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
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
