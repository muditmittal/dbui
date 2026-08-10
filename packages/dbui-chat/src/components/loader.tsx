"use client"

import * as React from "react"
import { Spinner } from "dbui/components/ui/spinner"

import { cn } from "../lib/utils"

/**
 * @standard Loader
 * @guideline Use between submitting a prompt and the first streamed token
 * @guideline Swap the label for the actual step when you know it — "Searching catalog", not "Thinking"
 * @constraint Replace Loader with Reasoning as soon as reasoning text starts streaming
 * @constraint One Loader per turn
 */

function Loader({
  label = "Thinking",
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="loader"
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-2 type-label text-text-subtle",
        className
      )}
      {...props}
    >
      <Spinner className="size-4" />
      <span className="animate-pulse">{label}</span>
    </div>
  )
}

export { Loader }
