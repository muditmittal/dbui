"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toggleVariants } from "./toggle"

/**
 * @standard Segment Control
 * @guideline Use Slider for primary view switching (tab-like)
 * @guideline Use Outline for secondary or compact controls
 * @guideline Items distribute equally across available width
 * @constraint Minimum 2 items, maximum 5 items
 * @constraint Labels should be single words or very short phrases
 * @constraint Avoid icons with text
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=481-661
 */

/**
 * Segment Control styles for DBUI.
 *
 * Figma component: "Segment Control" (2 variants × 2 sizes)
 *
 * ── Default variant ──
 * Container: bg-muted, rounded-sm, p-1 (Default) / p-0.5 (Small), gap-1 / gap-0.5
 * Selected item: bg-background, shadow-xs, NO border, rounded-sm
 * Unselected items: transparent, no border, no shadow
 *
 * ── Outline variant ──
 * Container: bg-background, rounded-sm, shadow-xs, p-0, gap-0
 * Selected item: bg-active, border-primary (blue), NO rounded corners (flush)
 * Unselected items: no fill, border-input (grey dividers), shadow-xs, NO rounded corners
 *
 * Supports both single and multiple selection via Base UI ToggleGroup primitive.
 * Default is single selection (segment control pattern).
 */
const SegmentControlContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical"
    registerItem?: (value: string, el: HTMLButtonElement | null) => void
    activeValue?: string
  }
>({
  size: "md",
  variant: "default",
  orientation: "horizontal",
})

function SegmentControl({
  className,
  variant,
  size,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="segment-control"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "group/segment-control inline-flex items-center rounded-sm",
        // Default variant: muted bg container with padding and gap
        variant !== "outline" && [
          "bg-muted",
          size === "sm" ? "p-0.5 gap-0.5" : "p-1 gap-1",
        ],
        // Outline variant: white bg container, no padding/gap, with shadow
        variant === "outline" && "bg-background p-0 gap-0 shadow-xs",
        orientation === "vertical" && "flex-col items-stretch",
        className
      )}
      {...props}
    >
      <SegmentControlContext.Provider
        value={{ variant, size, orientation }}
      >
        {children}
      </SegmentControlContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function SegmentControlItem({
  className,
  children,
  variant = "default",
  size = "md",
  onPressedChange,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(SegmentControlContext)
  const resolvedSize = context.size || size
  const resolvedVariant = context.variant || variant
  const isOutline = resolvedVariant === "outline"

  return (
    <TogglePrimitive
      data-slot="segment-control-item"
      onPressedChange={onPressedChange}
      className={cn(
        "relative z-10 flex-1 inline-flex items-center justify-center gap-1",
        "text-[13px] leading-[20px] font-normal whitespace-nowrap",
        "transition-colors outline-none select-none",
        "focus-visible:border-2 focus-visible:border-ring focus:z-20",
        "disabled:pointer-events-none disabled:text-disabled-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // ── Default (slider) variant items: rounded pills, no border ──
        !isOutline && [
          "rounded-sm border border-transparent text-muted-foreground",
          "hover:text-foreground",
          "aria-pressed:bg-background aria-pressed:shadow-xs aria-pressed:text-foreground",
          "data-[state=on]:bg-background data-[state=on]:shadow-xs data-[state=on]:text-foreground",
        ],

        // ── Outline variant items: flush (no radius), with input border dividers ──
        isOutline && [
          "rounded-none border border-input shadow-xs",
          "hover:bg-hover",
          "active:bg-press",
          "not-first:-ml-px",
          "first:rounded-l-sm",
          "last:rounded-r-sm",
          "aria-pressed:bg-active aria-pressed:border-primary aria-pressed:shadow-none aria-pressed:text-accent-foreground aria-pressed:relative aria-pressed:z-10",
          "data-[state=on]:bg-active data-[state=on]:border-primary data-[state=on]:shadow-none data-[state=on]:text-accent-foreground data-[state=on]:relative data-[state=on]:z-10",
        ],

        // Sizes
        resolvedSize === "sm"
          ? isOutline ? "h-6 min-w-6 px-2" : "h-5 min-w-5 px-2"
          : isOutline ? "h-8 min-w-8 px-3" : "h-6 min-w-6 px-2",
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { SegmentControl, SegmentControlItem }
