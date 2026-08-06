"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "../../lib/utils"

/**
 * @standard Radio Tile
 * @guideline Use for visual selection with icon + title + description
 * @guideline Limit to 2-5 options
 * @constraint Title is required; icon and description are optional
 * @constraint Don't mix tiles with different content structures in the same group
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1021-3727
 */

function RadioTileGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-tile-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioTile({
  className,
  children,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-tile"
      className={cn(
        "group/radio-tile relative flex flex-col gap-1 rounded-1 border border-input-border-base bg-surface-base p-4 type-body shadow-xs transition-all outline-none select-none hover:border-input-border-hover active:border-input-border-focus data-checked:border-action-primary-base data-checked:shadow-none focus-visible:border-focus-ring focus-visible:ring-3 focus-visible:ring-focus-ring/50 disabled:cursor-not-allowed disabled:border-border-disabled disabled:shadow-none disabled:text-text-disabled disabled:opacity-50 aria-invalid:border-action-negative-base aria-invalid:ring-3 aria-invalid:ring-action-negative-base/20",
        className
      )}
      {...props}
    >
      {children}
    </RadioPrimitive.Root>
  )
}

function RadioTileHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-header"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
      <div
        data-slot="radio-tile-indicator"
        className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full border border-input-border-base bg-surface-base group-data-checked/radio-tile:border-action-primary-base group-data-checked/radio-tile:bg-action-primary-base"
      >
        <span className="size-1.5 rounded-full bg-action-label-inverse-base opacity-0 group-data-checked/radio-tile:opacity-100" />
      </div>
    </div>
  )
}

function RadioTileTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-title"
      className={cn("font-semibold text-text-base", className)}
      {...props}
    />
  )
}

function RadioTileDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-description"
      className={cn("type-body text-text-subtle", className)}
      {...props}
    />
  )
}

/**
 * RadioTileIcon — optional leading icon in the header.
 */
function RadioTileIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="radio-tile-icon"
      className={cn(
        "pointer-events-none shrink-0 text-text-subtle [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription, RadioTileIcon }
