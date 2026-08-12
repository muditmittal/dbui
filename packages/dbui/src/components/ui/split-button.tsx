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
/**
 * Only the edges that meet another child are squared.
 *
 * This used to square every child's right edge and then hand the last one a
 * `rounded-r-1!` back, which made the group an authority on its own outer corner —
 * and a wrong one: the left cap kept whatever shape its child had, so once a
 * default-size Button became a pill the assembly came out round on the left and 4px
 * on the right.
 *
 * Inverting the selector removes the opinion. A child with a following `[data-slot]`
 * sibling has its right edge flattened, a child with a preceding one has its left
 * edge flattened, and the two caps are left alone — so the group's corner is
 * whatever its children's size gives them, at every size, with no `!` needed.
 *
 * It also retires a special case. A native select renders a hidden `<select>` after
 * its trigger, which is not a `[data-slot]`, so the old "is last" test failed on it
 * and a separate rule had to put that corner back. The new test asks whether a
 * `[data-slot]` follows, and nothing does, so the trigger is a cap like any other.
 */
const splitButtonVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-raised has-[>[data-slot=split-button]]:gap-2 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 [&>[data-slot]:has(~[data-slot])]:shape-r-square [&>[data-slot]~[data-slot]]:shape-l-square [&>[data-slot]~[data-slot]]:-ml-px has-[>[data-slot]:hover]:*:data-slot:border-input-border-hover"
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

/**
 * `size` exists for the corner alone. The height comes from the row via the
 * group's `items-stretch`, but the corner cannot be inferred that way, and the
 * group above promises to follow its children's size at every size — which a
 * hardcoded pill would have broken the moment the assembly went small.
 */
function SplitButtonText({
  className,
  render,
  size = "md",
  ...props
}: useRender.ComponentProps<"div"> & { size?: "sm" | "md" }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 border bg-surface-subtle px-3 type-label-bold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          size === "sm" ? "shape-control" : "shape-control-lg",
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
