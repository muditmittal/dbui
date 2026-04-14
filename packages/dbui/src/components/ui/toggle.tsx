"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Toggle Button styles for DBUI.
 *
 * Figma component: "Toggle Button" (4 variants × 2 sizes × 5 states)
 *
 * Variants: default (no border), filter (border-input + shadow), pill (shadow + checkbox pattern), icon (icon-only)
 * Sizes:    sm (24px), md (32px) — matches Button sizing
 * States:   Default, Hover, Press, Selected, Disabled
 */
const toggleVariants = cva(
  [
    "group/toggle inline-flex items-center justify-center gap-1",
    "rounded-sm border border-transparent",
    "text-[13px] leading-[20px] font-normal whitespace-nowrap",
    "transition-all outline-none select-none",
    "text-foreground",
    "hover:bg-hover",
    "active:bg-press",
    "focus-visible:border-2 focus-visible:border-ring",
    "disabled:pointer-events-none disabled:text-disabled-foreground",
    "aria-pressed:bg-accent aria-pressed:border-primary aria-pressed:text-accent-foreground",
    "data-[state=on]:bg-accent data-[state=on]:border-primary data-[state=on]:text-accent-foreground",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        filter:
          "border-input shadow-xs hover:border-primary disabled:border-disabled disabled:shadow-none aria-pressed:border-primary data-[state=on]:border-primary",
        pill: [
          "shadow-xs border-input bg-transparent gap-2 rounded-full",
          "hover:bg-hover hover:border-primary",
          "aria-pressed:bg-accent aria-pressed:text-primary-press aria-pressed:border-primary aria-pressed:shadow-none",
          "data-[state=on]:bg-accent data-[state=on]:text-primary-press data-[state=on]:border-primary data-[state=on]:shadow-none",
          "disabled:border-disabled disabled:shadow-none",
        ].join(" "),
        icon: "bg-transparent",
      },
      size: {
        sm: "h-6 min-w-6 px-2",
        md: "h-8 min-w-8 px-3",
        "icon-sm": "size-6",
        "icon-md": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "md",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
