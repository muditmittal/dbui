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
 * @standard Reasoning
 * @guideline Use for the model's thinking trace — renders the "Thought for 40s" affordance
 * @guideline Set isStreaming while the model is still thinking; pass duration once it settles
 * @guideline Override `label` for a waiting state, e.g. "Waiting for user response"
 * @constraint Collapsed by default — reasoning is secondary to the answer
 * @constraint Keep reasoning above the answer it produced, never below
 */

export interface ReasoningProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Seconds spent thinking. Ignored while isStreaming. */
  duration?: number
  isStreaming?: boolean
  /** Replaces the generated trigger text. */
  label?: string
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Reasoning({
  duration,
  isStreaming = false,
  label,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: ReasoningProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const triggerText =
    label ??
    (isStreaming
      ? "Thinking"
      : duration !== undefined
        ? `Thought for ${duration}s`
        : "Thought process")

  return (
    <div data-slot="reasoning" className={cn("w-full", className)} {...props}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger
          className={cn(
            "flex items-center gap-1 rounded-sm type-label text-text-subtle outline-none",
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
          <span className={cn(isStreaming && "animate-pulse")}>
            {triggerText}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 border-l-2 border-border-base pl-3 type-body text-text-subtle">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { Reasoning }
