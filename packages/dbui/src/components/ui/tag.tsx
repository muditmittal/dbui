"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

function Tag({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tag"
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-muted px-1 py-0 text-[13px] leading-[20px] font-normal text-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TagIcon({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tag-icon"
      className={cn("flex shrink-0 items-center", className)}
      {...props}
    >
      {children}
    </span>
  )
}

function TagLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tag-label"
      className={cn("shrink-0 whitespace-nowrap", className)}
      {...props}
    />
  )
}

function TagValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <>
      <span
        data-slot="tag-divider"
        className="h-5 w-px shrink-0 bg-border"
        aria-hidden="true"
      />
      <span
        data-slot="tag-value"
        className={cn("shrink-0 whitespace-nowrap text-muted-foreground", className)}
        {...props}
      />
    </>
  )
}

function TagRemove({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="tag-remove"
      type="button"
      aria-label="Remove tag"
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-sm p-0 text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      ×
    </button>
  )
}

export { Tag, TagIcon, TagLabel, TagValue, TagRemove }
