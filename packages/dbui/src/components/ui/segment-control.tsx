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
 * @guideline Use Slider for a set of options sitting in a toolbar — a view mode, a unit, a
 * granularity. The inset track reads as a control, which is what it is
 * @guideline Use Outline for secondary or compact controls
 * @guideline Items distribute equally across available width
 * @constraint Nothing here is wired to what the selection changes. There is no panel, the group can
 * be `multiple` and it can be empty. Where a click swaps a panel, that is Tabs with
 * variant="pill" — which now carries its own fill, so the two no longer look alike
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
 * Container: bg-surface-inset, rounded-1, p-1 (Default) / p-0.5 (Small), gap-1 / gap-0.5
 * Selected item: bg-surface-base (surface-strong under dark), shadow-xs, NO border, rounded-1
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
        // Default variant: recessed track with padding and gap.
        //
        // `surface-inset`, not `surface-subtle`. The selected item is
        // `surface-base` and the track was `surface-subtle` — #FFFFFF on #FAFAFA,
        // a 2% step, so the one thing marking the selection was invisible and the
        // control read as transparent on transparent. `inset` is 8% black over
        // the page in light and 8% white in dark, which is both a visible groove
        // and the right name for what a segmented track is.
        variant !== "outline" && [
          "bg-surface-inset",
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
        "focus-visible:border-2 focus-visible:border-focus-ring focus-visible:shadow-focus focus-visible:z-20",
        "disabled:pointer-events-none disabled:text-text-disabled",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // ── Default (slider) variant items: rounded pills, no border ──
        // The track is surface-subtle and the pill has no border, so its fill is
        // the whole of "selected". surface-base is the far end of the surface
        // ramp in both themes — the whitest step under light, the darkest under
        // dark — so on a subtle track it sits above the backdrop in light and
        // below it in dark. The dark: step moves it to surface-strong, the
        // ramp's light end under dark. shadow-xs cannot cover the difference:
        // it is a 1px hard edge, and in dark it is black at 45%, which deepens
        // the recess rather than lifting the pill out of it.
        // `shape-control` at every size, deliberately not the size-aware pair.
        // A segment is not a standalone control with a pill edge — it is one cell
        // of a track, and the outline variant's cells are flush with shared
        // borders. Pointing these at `control-lg` would turn them into pills the
        // day that role is repointed, which is wrong in both variants. Naming the
        // role still gets them off the raw primitive.
        !isOutline && [
          "shape-control text-text-subtle",
          "hover:text-text-base",
          "aria-pressed:bg-surface-base aria-pressed:shadow-xs aria-pressed:text-text-base",
          "dark:aria-pressed:bg-surface-strong",
        ],

        // ── Outline variant items: flush (no radius), with input border dividers ──
        // Items overlap by -1px on the left so neighbors share a single 1px divider.
        // Pressed item also overlaps -1px on the RIGHT and gets z-10 so its 4 blue
        // borders sit on top of the adjacent grey ones at every edge.
 isOutline && [
          "shape-square border border-input-border-base shadow-xs",
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
