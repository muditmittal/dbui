"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"
import { History } from "dbui/components/icons/History"

import { cn } from "../lib/utils"

/**
 * @standard Checkpoint
 * @guideline Use to mark a point in the thread a reader can return to — after the agent finished a change, before it starts a risky one
 * @guideline Say what the state was, not that a checkpoint happened: "Before the schema change" beats "Checkpoint 3"
 * @guideline Pass `onRestore` only where restoring is actually wired. A restore control that does nothing is worse than a plain marker
 * @constraint It is a rule across the thread, not a turn. It spans the full width and sits between turns, because it belongs to the transcript rather than to either side of it
 * @constraint One per meaningful state. A checkpoint after every message is a scrollbar, not a history
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5080-7857
 */

export interface CheckpointProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** What the state was at this point. */
  label: React.ReactNode
  /** When it was taken. */
  timestamp?: React.ReactNode
  /** Wire it only where restoring works. */
  onRestore?: () => void
  restoreLabel?: string
}

function Checkpoint({
  label,
  timestamp,
  onRestore,
  restoreLabel = "Restore",
  className,
  ...props
}: CheckpointProps) {
  return (
    <div
      data-slot="checkpoint"
      // A rule with a label in it: the lines make it read as a divider in the
      // transcript rather than another turn competing for the column.
      className={cn("flex w-full min-w-0 items-center gap-2", className)}
      {...props}
    >
      <span aria-hidden className="h-px flex-1 bg-border-base" />
      <span className="flex shrink-0 items-center gap-2 type-hint text-text-subtle">
        <span aria-hidden className="[&_svg]:size-4">
          <History />
        </span>
        <span className="truncate">{label}</span>
        {timestamp ? (
          <span className="text-text-disabled">{timestamp}</span>
        ) : null}
      </span>
      {onRestore ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-5 shrink-0 px-1"
          onClick={onRestore}
        >
          {restoreLabel}
        </Button>
      ) : null}
      <span aria-hidden className="h-px flex-1 bg-border-base" />
    </div>
  )
}

export { Checkpoint }
