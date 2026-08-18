"use client"

import * as React from "react"

import { CheckCircle } from "dbui/components/icons/CheckCircle"
import { Circle } from "dbui/components/icons/Circle"
import { Running } from "dbui/components/icons/Running"

import { Disclosure } from "./disclosure"
import { cn } from "../lib/utils"

/**
 * @standard Queue
 * @guideline Use in the rail beside a thread for work the agent is holding — what is pending, what is running, what is done
 * @guideline Group by state and put pending first. A reader opens the rail to answer "what is left", so the answer goes at the top
 * @guideline Keep completed collapsed. It is there to be trusted, not read
 * @guideline Pass `count` on each section so a collapsed section still answers its own question
 * @constraint Not a `Plan`. A plan is the argument for doing the work and lives in the transcript; a queue is the state of the work and lives in the rail. The same items can appear in both
 * @constraint Not a `Task`. A task is one thing that already happened, with evidence inside it. A queue item is a line with a state and nothing to open
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5080-7889
 */

export type QueueItemStatus = "pending" | "running" | "done"

const STATUS_ICON: Record<QueueItemStatus, React.ComponentType> = {
  pending: Circle,
  running: Running,
  done: CheckCircle,
}

function Queue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="queue"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

export interface QueueSectionProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  label: React.ReactNode
  /** Shown beside the label, so a collapsed section still answers itself. */
  count?: number
  defaultOpen?: boolean
  children?: React.ReactNode
}

function QueueSection({
  label,
  count,
  defaultOpen = true,
  className,
  children,
  ...props
}: QueueSectionProps) {
  return (
    <Disclosure
      slot="queue-section"
      defaultOpen={defaultOpen}
      className={className}
      contentClassName="flex flex-col gap-1"
      trigger={
        <span className="flex min-w-0 items-center gap-2 type-label text-text-subtle">
          <span className="truncate">{label}</span>
          {count === undefined ? null : (
            <span className="text-text-disabled">{count}</span>
          )}
        </span>
      }
      {...props}
    >
      {children}
    </Disclosure>
  )
}

export interface QueueItemProps extends React.ComponentProps<"div"> {
  status?: QueueItemStatus
}

function QueueItem({
  status = "pending",
  className,
  children,
  ...props
}: QueueItemProps) {
  const Glyph = STATUS_ICON[status]

  return (
    <div
      data-slot="queue-item"
      data-status={status}
      className={cn(
        // min-h-5 for the same reason TaskItem has it: the row is otherwise
        // exactly as tall as its 16px glyph, and consecutive icons read as touching.
        "flex min-h-5 min-w-0 items-center gap-2 type-label",
        status === "done" ? "text-text-subtle" : "text-text-base",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
          status === "done" && "text-status-text-positive",
          status === "running" && "text-text-base",
          status === "pending" && "text-text-disabled"
        )}
      >
        <Glyph />
      </span>
      {/* Done work is struck through, so the row reads as settled without a
          second colour doing the work. */}
      <span className={cn("min-w-0 truncate", status === "done" && "line-through")}>
        {children}
      </span>
    </div>
  )
}

export { Queue, QueueSection, QueueItem }
