import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Key Value Pair
 * @guideline Use for metadata display in detail panels and sidebars
 * @guideline Key is de-emphasized, value is primary — read the arrangement, not a color name
 * @guideline `horizontal` is the default: key beside value, on a fixed key column. Reach for
 *   `vertical` only when the value is too long to sit beside its key, and `flexible` when the
 *   value is a figure that should align to the right edge.
 * @constraint `layout` does not cascade. KeyValueItem and KeyValueKey each read their own prop,
 *   so a non-default arrangement must be passed to both — passing it only to KeyValuePair
 *   changes the container width and nothing else.
 * @constraint Keep keys short — they're labels, not sentences
 * @constraint Don't use for editable fields — use Form Input
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3178-3901
 */

/**
 * KeyValuePair — container for key-value rows.
 * Maps to Figma Key Value Pair (Layout: Horizontal/Vertical), whose two variants differ
 * only in width — which is all this component's `layout` controls.
 *
 * - horizontal, flexible: fills its container
 * - vertical: the fixed sidebar column width
 *
 * The arrangement inside each row is set on KeyValueItem and KeyValueKey, not here.
 */
function KeyValuePair({
  className,
  layout = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "horizontal" | "vertical" | "flexible"
}) {
  return (
    <div
      data-slot="key-value-pair"
      data-layout={layout}
      className={cn(
        "flex flex-col gap-0 type-body",
        layout === "horizontal" ? "w-full" : layout === "flexible" ? "w-full" : "w-[280px]",
        className
      )}
      {...props}
    />
  )
}

function KeyValueTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="key-value-title"
      className={cn(
        "flex items-center gap-1 py-2 type-body-bold text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * KeyValueItem — one row. Sets the arrangement.
 * Maps to Figma .Key Value (Type: Horizontal/Vertical/Flexible).
 *
 * - horizontal: key beside value
 * - vertical: key above value
 * - flexible: key beside value, both sharing the row
 */
function KeyValueItem({
  className,
  layout = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "horizontal" | "vertical" | "flexible"
}) {
  return (
    <div
      data-slot="key-value-row"
      className={cn(
        "flex items-center py-1",
        layout === "vertical"
          ? "flex-col items-start gap-0.5"
          : "flex-row gap-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * KeyValueKey — the label. Must be given the same `layout` as its KeyValueItem.
 *
 * - horizontal: fixed key column, so keys line up down the panel and values start on one edge
 * - vertical: full width above the value, on the smaller Hint step — a stacked key reads as a
 *   caption to its value, where a beside key reads as one column of a two-column table
 * - flexible: shares the row with the value instead of holding a fixed column
 */
function KeyValueKey({
  className,
  layout = "horizontal",
  ...props
}: React.ComponentProps<"span"> & {
  layout?: "horizontal" | "vertical" | "flexible"
}) {
  return (
    <span
      data-slot="key-value-key"
      className={cn(
        "overflow-hidden text-ellipsis whitespace-nowrap text-text-subtle",
        layout === "vertical"
          ? "w-full shrink-0 type-hint"
          : layout === "flexible"
            ? "min-w-0 flex-1 type-label"
            : "w-[120px] shrink-0 type-label",
        className
      )}
      {...props}
    />
  )
}

function KeyValueValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="key-value-value"
      className={cn(
        "flex min-h-px min-w-px flex-1 items-center gap-2 type-label text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * KeyValueValueEnd — right-aligned value for flexible layout.
 * Maps to Figma .Key Value Type="Flexible" (value text-right).
 */
function KeyValueValueEnd({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="key-value-value-end"
      className={cn(
        "flex min-h-px min-w-px flex-1 items-center justify-end gap-2 type-label text-text-base text-right",
        className
      )}
      {...props}
    />
  )
}

function KeyValueGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="key-value-grid"
      className={cn(
        "flex w-full gap-4",
        className
      )}
      {...props}
    />
  )
}

export {
  KeyValuePair,
  KeyValueTitle,
  KeyValueItem,
  KeyValueKey,
  KeyValueValue,
  KeyValueValueEnd,
  KeyValueGrid,
}
