"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "../../lib/utils"

type SegmentControlVariantProps = {
  variant?: "default" | "outline" | null
  size?: "sm" | "md" | null
}

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
 * Container: bg-surface-subtle, rounded-1, p-1 (Default) / p-0.5 (Small), gap-1 / gap-0.5
 * Selected item: bg-surface-base, shadow-xs, NO border, rounded-1
 * Unselected items: transparent, no border, no shadow
 *
 * ── Outline variant ──
 * Container: bg-surface-base, rounded-1, shadow-xs, p-0, gap-0
 * Selected item: bg-action-selected-base, border-border-strong (blue), NO rounded corners (flush)
 * Unselected items: no fill, border-input-border-base (grey dividers), shadow-xs, NO rounded corners
 *
 * Single-select radio-group semantics by default: exactly one item is active
 * at all times. Clicking the active item is a no-op (cannot toggle off all
 * items). Pass `required={false}` to opt out (rare).
 *
 * For multi-select, pass `multiple` (Base UI ToggleGroup pass-through).
 */
const SegmentControlContext = React.createContext<
  SegmentControlVariantProps & {
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "md",
  variant: "default",
  orientation: "horizontal",
})

/**
 * SegmentControl props.
 *
 * `required` (default `true`) enforces radio-group semantics: at least one item
 * must remain selected at all times. Clicking the active item is a no-op.
 * Set `required={false}` to allow toggling all items off (rare — prefer a
 * separate Toggle if that's the intent).
 */
type SegmentControlOwnProps = SegmentControlVariantProps & {
  orientation?: "horizontal" | "vertical"
  required?: boolean
}

function SegmentControl({
  className,
  variant,
  size,
  orientation = "horizontal",
  required = true,
  onValueChange,
  children,
  ...props
}: ToggleGroupPrimitive.Props & SegmentControlOwnProps) {
  const handleValueChange = React.useCallback<
    NonNullable<ToggleGroupPrimitive.Props["onValueChange"]>
  >(
    (next, details) => {
      if (required && next.length === 0) {
        details.cancel()
        return
      }
      onValueChange?.(next, details)
    },
    [onValueChange, required],
  )

  return (
    <ToggleGroupPrimitive
      data-slot="segment-control"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      onValueChange={handleValueChange}
      className={cn(
        "group/segment-control inline-flex items-center rounded-1",
        // Default variant: muted bg container with padding and gap
        variant !== "outline" && [
          "bg-surface-subtle",
          size === "sm" ? "p-0.5 gap-0.5" : "p-1 gap-1",
        ],
        // Outline variant: white bg container, no padding/gap, with shadow
        variant === "outline" && "bg-surface-base p-0 gap-0 shadow-xs",
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
}: TogglePrimitive.Props & SegmentControlVariantProps) {
  const context = React.useContext(SegmentControlContext)
  const resolvedSize = context.size || size
  const resolvedVariant = context.variant || variant
  const isOutline = resolvedVariant === "outline"

  return (
    <TogglePrimitive
      data-slot="segment-control-item"
      onPressedChange={onPressedChange}
      className={cn(
        "relative flex-1 inline-flex items-center justify-center gap-1",
        "type-label whitespace-nowrap",
        "transition-colors outline-none select-none",
        "focus-visible:border-2 focus-visible:border-focus-ring focus-visible:z-20",
        "disabled:pointer-events-none disabled:text-text-disabled",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // ── Default (slider) variant items: rounded pills, no border ──
        !isOutline && [
          "rounded-1 text-text-subtle",
          "hover:text-text-base",
          "aria-pressed:bg-surface-base aria-pressed:shadow-xs aria-pressed:text-text-base",
        ],

        // ── Outline variant items: flush (no radius), with input border dividers ──
        // Items overlap by -1px on the left so neighbors share a single 1px divider.
        // Pressed item also overlaps -1px on the RIGHT and gets z-10 so its 4 blue
        // borders sit on top of the adjacent grey ones at every edge.
        isOutline && [
          "rounded-0 border border-input-border-base shadow-xs",
          "hover:bg-action-default-hover",
          "active:bg-action-selected-press",
          "not-first:-ml-px",
          "first:rounded-l-1",
          "last:rounded-r-1",
          "aria-pressed:bg-action-selected-base aria-pressed:border-border-strong aria-pressed:shadow-none aria-pressed:text-text-strong",
          "aria-pressed:relative aria-pressed:z-10 aria-pressed:not-last:-mr-px",
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
