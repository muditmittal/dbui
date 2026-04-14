/**
 * @deprecated Renamed to Segment Control. Use `@/components/ui/segment-control` instead.
 * This file is kept for backwards compatibility during the transition.
 *
 * import { SegmentControl, SegmentControlItem } from "./segment-control"
 */
"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toggleVariants } from "./toggle"

/**
 * Toggle Group styles for DBUI.
 *
 * Figma component: "Toggle Group" (2 variants × 2 sizes)
 *
 * Container: bg-accent, p-0.5 (2px), rounded-sm
 * Outline variant: + border-input on container
 * Selected item: bg-white, border-primary, shadow-xs, text-accent-foreground
 * Non-selected items: transparent, text-foreground
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "md",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      className={cn(
        "group/toggle-group inline-flex items-center rounded-sm bg-accent p-0.5",
        variant === "outline" && "border border-input",
        orientation === "vertical" && "flex-col items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "md",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedSize = context.size || size

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex items-center justify-center gap-1",
        "rounded-sm border border-transparent",
        "text-[13px] leading-[20px] font-normal whitespace-nowrap",
        "transition-all outline-none select-none",
        "text-foreground",
        "hover:bg-hover",
        "active:bg-press",
        "focus-visible:border-2 focus-visible:border-ring focus:z-10",
        "disabled:pointer-events-none disabled:text-disabled-foreground",
        "aria-pressed:bg-background aria-pressed:border-primary aria-pressed:text-accent-foreground aria-pressed:shadow-xs",
        "data-[state=on]:bg-background data-[state=on]:border-primary data-[state=on]:text-accent-foreground data-[state=on]:shadow-xs",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        resolvedSize === "sm" ? "h-6 min-w-6 px-2" : "h-8 min-w-8 px-3",
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
