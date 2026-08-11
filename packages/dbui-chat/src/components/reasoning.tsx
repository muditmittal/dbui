"use client"

import * as React from "react"
import { SparkleFill } from "dbui/components/icons/SparkleFill"

import { Disclosure } from "./disclosure"
import { cn } from "../lib/utils"

/**
 * @standard Reasoning
 * @guideline Use for the model's thinking trace — renders the "Thought for 40s" affordance
 * @guideline Set isStreaming while the model is still thinking; pass duration once it settles
 * @guideline Override `label` for a waiting state, e.g. "Waiting for user response"
 * @guideline Render it with no children for the gap between submitting and the first token — it
 *   becomes a live status row instead of a disclosure, so a turn needs no separate loader
 * @constraint Collapsed by default — reasoning is secondary to the answer
 * @constraint Keep reasoning above the answer it produced, never below
 * @constraint One per turn
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
  const triggerText =
    label ??
    (isStreaming
      ? "Thinking"
      : duration !== undefined
        ? `Thought for ${duration}s`
        : "Thought process")

  const face = (
    <>
      <span aria-hidden className="inline-flex shrink-0 [&_svg]:size-4">
        <SparkleFill />
      </span>
      <span className={cn("min-w-0 truncate", isStreaming && "animate-pulse")}>
        {triggerText}
      </span>
    </>
  )

  // No body means there is nothing to disclose. A chevron that opens an empty
  // rail is a control that lies, so this renders as a status line instead — and
  // that is the state a separate loader component used to occupy.
  if (!children) {
    return (
      <div
        data-slot="reasoning"
        data-streaming={isStreaming || undefined}
        role="status"
        aria-live="polite"
        className={cn(
          "flex w-full items-center gap-2 type-body-bold text-text-subtle",
          className
        )}
        {...props}
      >
        {face}
      </div>
    )
  }

  return (
    <Disclosure
      slot="reasoning"
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      chevron="trailing"
      className={className}
      trigger={face}
      triggerClassName="type-body-bold text-text-subtle hover:text-text-base"
      rail
      contentClassName="type-body text-text-subtle"
      {...props}
    >
      {children}
    </Disclosure>
  )
}

export { Reasoning }
