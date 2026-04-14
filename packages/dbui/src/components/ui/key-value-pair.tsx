import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * KeyValuePair — container for key-value rows.
 * Maps to Figma .Key Value (Type: Horizontal/Vertical/Flexible).
 *
 * - horizontal: key (120px fixed) + value, side by side
 * - vertical: key (12px Hint) above value
 * - flexible: key + value share space equally, value right-aligned
 */
function KeyValuePair({
  className,
  layout = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "horizontal" | "vertical" | "flexible"
}) {
  return (
    <div
      data-slot="key-value-pair"
      data-layout={layout}
      className={cn(
        "flex flex-col gap-0 text-[13px]",
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
        "flex items-center gap-1 py-2 text-[13px] font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

function KeyValueRow({
  className,
  layout = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "horizontal" | "vertical" | "flexible"
}) {
  return (
    <div
      data-slot="key-value-row"
      className={cn(
        "flex items-center py-0.5",
        layout === "vertical"
          ? "flex-col items-start gap-0.5"
          : "flex-row gap-0",
        className
      )}
      {...props}
    />
  )
}

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
        "overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground",
        layout === "vertical"
          ? "w-full shrink-0 text-[12px] leading-[16px]"
          : layout === "flexible"
            ? "min-w-0 flex-1 text-[13px] leading-[20px]"
            : "w-[120px] shrink-0 text-[13px] leading-[20px]",
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
        "flex min-h-px min-w-px flex-1 items-center gap-2 text-[13px] leading-[20px] text-foreground",
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
        "flex min-h-px min-w-px flex-1 items-center justify-end gap-2 text-[13px] leading-[20px] text-foreground text-right",
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
  KeyValueRow,
  KeyValueKey,
  KeyValueValue,
  KeyValueValueEnd,
  KeyValueGrid,
}
