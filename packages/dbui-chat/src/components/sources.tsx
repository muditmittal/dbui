"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "dbui/components/ui/collapsible"
import { ChevronRight } from "dbui/components/icons/ChevronRight"

import { cn } from "../lib/utils"

/**
 * @standard Sources
 * @guideline Use under an assistant answer to name what it drew on — tables, notebooks, docs
 * @guideline Give each Source the entity icon for its kind, so a table and a doc are told apart before the label is read
 * @guideline Name the asset, not the URL: "main.sales.orders", not the workspace link
 * @constraint Collapsed by default, and only ever below the answer it supports
 * @constraint Every entry must resolve. A source the reader cannot open is a claim, not a citation
 * @constraint Not Actions. Actions act on the answer; Sources explain where it came from
 */

export interface SourcesProps extends React.ComponentProps<"div"> {
  /** Entry count for the trigger. */
  count: number
  /** Replaces the generated "N sources" text. */
  label?: string
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Sources({
  count,
  label,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: SourcesProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  return (
    <div data-slot="sources" className={cn("w-full", className)} {...props}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger
          className={cn(
            "flex items-center gap-1 rounded-1 type-label text-text-subtle outline-none",
            "hover:text-text-base focus-visible:border focus-visible:border-focus-ring"
          )}
        >
          <span
            className={cn(
              "inline-flex shrink-0 transition-transform [&_svg]:size-4",
              isOpen && "rotate-90"
            )}
          >
            <ChevronRight />
          </span>
          {/* Singular at one. "1 sources" is the tell that a count was interpolated
              rather than written. */}
          {label ?? `${count} ${count === 1 ? "source" : "sources"}`}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 flex flex-col gap-1">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export interface SourceProps extends React.ComponentProps<"a"> {
  /** Entity icon for the asset kind. */
  icon?: React.ReactNode
}

function Source({ icon, className, children, ...props }: SourceProps) {
  return (
    <a
      data-slot="source"
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-1 type-label text-link-base no-underline outline-none",
        "hover:text-link-hover hover:underline",
        "focus-visible:border focus-visible:border-focus-ring focus-visible:shadow-focus",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-text-subtle",
        className
      )}
      {...props}
    >
      {icon}
      <span className="min-w-0 truncate">{children}</span>
    </a>
  )
}

export { Sources, Source }
