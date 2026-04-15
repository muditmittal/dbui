"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "../../lib/utils"

/**
 * @standard Separator
 * @guideline Use border token for color — never hardcode
 * @guideline In menus, use the component's built-in separator, not a generic one
 * @constraint Don't stack multiple separators adjacent to each other
 * @constraint Don't use as a decorative element — it implies content grouping
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3177-2832
 */

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
