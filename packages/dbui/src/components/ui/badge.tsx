import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "../../lib/cva"

import { cn } from "../../lib/utils"

/**
 * @standard Badge
 * @guideline Keep text to 1-2 words
 * @guideline Default to Outline for neutral/low-emphasis status
 * @guideline Reach for a status variant only when the color carries meaning — serves "Calm carries the work"
 * @constraint Badges are not interactive — don't use as buttons
 * @constraint Don't combine with long text — truncation looks broken
 * @constraint Don't use a status variant for decoration or category — neutral variants exist for that
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1088-1544
 */

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden shape-pill px-2 py-0.5 type-hint whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        fill: "bg-surface-subtle text-text-subtle",
        outline: "border border-border-base text-text-subtle",
        positive:
          "border border-status-border-positive bg-status-surface-positive text-status-text-positive",
        negative:
          "border border-status-border-negative bg-status-surface-negative text-status-text-negative",
        warning:
          "border border-status-border-warning bg-status-surface-warning text-status-text-warning",
        info: "border border-status-border-info bg-status-surface-info text-status-text-info",
      },
    },
    defaultVariants: {
      variant: "fill",
    },
  }
)

function Badge({
  className,
  variant = "fill",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
