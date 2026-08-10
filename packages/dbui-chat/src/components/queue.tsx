"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "dbui/components/ui/collapsible"
import { Button } from "dbui/components/ui/button"
import { ChevronRight } from "dbui/components/icons/ChevronRight"
import { CloseSmall } from "dbui/components/icons/CloseSmall"

import { cn } from "../lib/utils"

/**
 * @standard Queue
 * @guideline Use when the composer accepts a prompt while the agent is still working — the queue is what it accepted
 * @guideline Show it directly above the composer, so the thing being added and the thing it joins are adjacent
 * @guideline Let every item be removable until it starts. A queue you cannot edit is a commitment nobody made
 * @constraint Render nothing when the queue is empty — an empty "0 queued" is a control reporting on itself
 * @constraint Order is arrival order and never changes. The queue is a promise about sequence
 * @constraint Not a Plan. A Plan is the agent's intent; a Queue is the user's backlog
 */

export interface QueueProps extends React.ComponentProps<"div"> {
  /** Item count for the trigger. Falsy renders nothing at all. */
  count: number
  /** Replaces the generated "N queued" text. */
  label?: string
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Queue({
  count,
  label,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: QueueProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  // An empty queue is not a small queue. See the constraint above.
  if (!count) return null

  return (
    <div data-slot="queue" className={cn("w-full", className)} {...props}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-1 rounded-1 type-label text-text-subtle outline-none",
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
          {label ?? `${count} queued`}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 flex flex-col gap-1">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export interface QueueItemProps extends React.ComponentProps<"div"> {
  /** Omit to make the item non-removable — use once it has started. */
  onRemove?: () => void
  /** Accessible name for the remove control. Defaults to "Remove from queue". */
  removeLabel?: string
}

function QueueItem({
  onRemove,
  removeLabel = "Remove from queue",
  className,
  children,
  ...props
}: QueueItemProps) {
  return (
    <div
      data-slot="queue-item"
      className={cn(
        "group/queue-item flex min-w-0 items-center gap-2 rounded-1 bg-surface-subtle px-2 py-1",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate type-label text-text-base">{children}</span>
      {onRemove && (
        // Always in the DOM, not revealed on hover. A control that appears only
        // under a pointer is unreachable by keyboard and invisible on a touch
        // screen, and this one is the only way to undo a queued prompt.
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <CloseSmall />
        </Button>
      )}
    </div>
  )
}

export { Queue, QueueItem }
