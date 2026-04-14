import * as React from "react"

import { cn } from "../../lib/utils"

function KeyValuePair({
  className,
  layout = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="key-value-pair"
      data-layout={layout}
      className={cn(
        "flex flex-col gap-0 text-[13px]",
        layout === "horizontal" ? "w-full" : "w-[280px]",
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
  layout?: "horizontal" | "vertical"
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
  layout?: "horizontal" | "vertical"
}) {
  return (
    <span
      data-slot="key-value-key"
      className={cn(
        "shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground",
        layout === "vertical"
          ? "w-full text-[12px] leading-[16px]"
          : "w-[120px] text-[13px] leading-[20px]",
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
  KeyValueGrid,
}
