import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * @standard Badge
 * @guideline Keep text to 1-2 words
 * @guideline Default to Outline for neutral/low-emphasis status
 * @constraint Badges are not interactive — don't use as buttons
 * @constraint Don't combine with long text — truncation looks broken
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1088-1544
 */

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-0.5 text-[12px] font-normal text-muted-foreground whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        fill: "bg-secondary",
        outline: "border border-border",
      },
    },
    defaultVariants: {
      variant: "fill",
    },
  }
)

function Badge({
  className,
  variant = "default",
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
