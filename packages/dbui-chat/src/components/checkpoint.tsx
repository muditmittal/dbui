"use client"

import * as React from "react"
import { Button } from "dbui/components/ui/button"
import { History } from "dbui/components/icons/History"

import { cn } from "../lib/utils"

/**
 * @standard Checkpoint
 * @guideline Use to mark a point in a thread the user can return to — after the agent commits a set of changes
 * @guideline Label it with what changed, not the time: "3 files changed", not "2 minutes ago"
 * @guideline Wire the action to restore both the conversation and whatever the agent touched, or do not offer it
 * @constraint Sits between turns, never inside a Message. It marks the seam, so it cannot belong to either side
 * @constraint Quiet by default. It is an escape hatch, and an escape hatch that competes with the answer is a distraction
 * @constraint Never render more than one as restorable-to-here at a time
 */

export interface CheckpointProps extends React.ComponentProps<"div"> {
  /** What this point represents, e.g. "3 files changed". */
  label: React.ReactNode
  /** Omit for a marker with no action — a record rather than an offer. */
  onRestore?: () => void
  /** Action text. Defaults to "Restore". */
  restoreLabel?: string
}

function Checkpoint({
  label,
  onRestore,
  restoreLabel = "Restore",
  className,
  ...props
}: CheckpointProps) {
  return (
    <div
      data-slot="checkpoint"
      // A rule through the middle with the label sitting in it, because the thing
      // being communicated is a boundary between turns rather than a row of its own.
      // `group` so the action can stay quiet until the seam is approached.
      className={cn("group/checkpoint flex w-full items-center gap-2", className)}
      {...props}
    >
      <span aria-hidden className="h-px flex-1 bg-border-subtle" />
      <span className="inline-flex shrink-0 items-center gap-1 type-hint text-text-subtle [&_svg]:size-3">
        <History />
        {label}
      </span>
      {onRestore && (
        <Button
          variant="link"
          size="sm"
          onClick={onRestore}
          // Reachable at all times for the keyboard; the pointer just gets a
          // stronger cue on approach.
          className="shrink-0 type-hint text-text-subtle hover:text-text-base"
        >
          {restoreLabel}
        </Button>
      )}
      <span aria-hidden className="h-px flex-1 bg-border-subtle" />
    </div>
  )
}

export { Checkpoint }
