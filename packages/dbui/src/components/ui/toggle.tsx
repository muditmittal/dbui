"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "../../lib/cva"

import { cn } from "../../lib/utils"

/**
 * @standard Toggle Button
 * @guideline Use when button needs to save state
 * @guideline Pill variant used as quick filters
 * @constraint Filter variant auto-swaps checkbox/checkmark — don't override icon
 * @constraint Pill variant should be used in groups, not standalone
 * @constraint Icon variant requires aria-label
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=478-613
 */

/**
 * Toggle Button styles for DBUI.
 *
 * Figma component: "Toggle Button" (4 variants × 2 sizes × 5 states)
 *
 * Variants: default (no border), filter (border-input-border-base + shadow), pill (shadow + checkbox pattern), icon (icon-only)
 * Sizes:    sm (24px), md (32px) — matches Button sizing
 * States:   Default, Hover, Press, Selected, Disabled
 */
const toggleVariants = cva(
  [
    "group/toggle inline-flex items-center justify-center gap-1",
    "rounded-sm border",
    "text-[13px] leading-[20px] font-normal whitespace-nowrap",
    "transition-all outline-none select-none",
    "text-text-base",
    "hover:bg-action-default-hover",
    "active:bg-action-selected-press",
    "focus-visible:border-2 focus-visible:border-focus-ring",
    "disabled:pointer-events-none disabled:text-text-disabled",
    "aria-pressed:bg-action-selected-base aria-pressed:border-border-strong aria-pressed:text-text-strong",
    "data-[state=on]:bg-action-selected-base data-[state=on]:border-border-strong data-[state=on]:text-text-strong",
    "aria-invalid:border-action-negative-base aria-invalid:ring-action-negative-base/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent",
        filter:
          "border-input-border-base shadow-xs hover:border-input-border-hover disabled:border-border-disabled disabled:shadow-none aria-pressed:border-border-strong data-[state=on]:border-border-strong",
        pill: [
          "shadow-xs border-input-border-base bg-transparent gap-2 rounded-full",
          "hover:bg-action-default-hover hover:border-input-border-hover",
          "aria-pressed:bg-action-selected-base aria-pressed:text-text-strong aria-pressed:border-border-strong aria-pressed:shadow-none",
          "data-[state=on]:bg-action-selected-base data-[state=on]:text-text-strong data-[state=on]:border-border-strong data-[state=on]:shadow-none",
          "disabled:border-border-disabled disabled:shadow-none",
        ].join(" "),
        icon: "border-transparent bg-transparent",
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

/**
 * FilterToggle — Toggle with built-in checkbox→checkmark swap.
 * Maps to Figma Toggle Button variant="Filter".
 *
 * OFF: empty checkbox + label
 * ON: check icon + label, active bg + primary border
 *
 * Usage: <FilterToggle>Filter label</FilterToggle>
 */
function FilterToggle({
  className,
  size = "md",
  children,
  defaultPressed,
  pressed: controlledPressed,
  onPressedChange,
  ...props
}: Omit<TogglePrimitive.Props, "children"> &
  Pick<VariantProps<typeof toggleVariants>, "size"> & {
    children?: React.ReactNode
  }) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed ?? false)
  const isPressed = controlledPressed ?? internalPressed

  return (
    <TogglePrimitive
      data-slot="toggle"
      pressed={controlledPressed}
      defaultPressed={defaultPressed}
      onPressedChange={(pressed, event) => {
        setInternalPressed(pressed)
        onPressedChange?.(pressed, event)
      }}
      className={cn(toggleVariants({ variant: "filter", size }), className)}
      {...props}
    >
      {isPressed ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0">
          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input-border-base" />
      )}
      {children}
    </TogglePrimitive>
  )
}

export { Toggle, FilterToggle, toggleVariants }
