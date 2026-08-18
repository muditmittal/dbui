"use client"

import * as React from "react"
import { CheckSmall } from "dbui/components/icons/CheckSmall"
import { CircleOutline } from "dbui/components/icons/CircleOutline"
import { CloseSmall } from "dbui/components/icons/CloseSmall"
import { Running } from "dbui/components/icons/Running"

import { Disclosure } from "./disclosure"
import { cn } from "../lib/utils"

/**
 * @standard Plan
 * @guideline Use for the checklist the agent maintains across a long run — the thing that says what is left
 * @guideline Keep exactly one item active. Two active items means the plan is not a plan
 * @guideline Phrase each item as the work, not the tool: "Add dark mode support", not "Edit theme.ts"
 * @guideline Open it while the run is in flight and let the reader collapse it — this is the one trace worth showing by default
 * @constraint Not a Task list. A Task is one thing that already happened; a Plan item is one thing intended
 * @constraint Never reorder items as they complete. The order is the argument
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4849-5156
 */

export type PlanItemStatus = "pending" | "active" | "done" | "cancelled"

export interface PlanProps extends React.ComponentProps<"div"> {
  /** Replaces the generated "N steps" trigger text. */
  label?: string
  /** Shown beside the label — pass the remaining count. */
  count?: number
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Plan({
  label,
  count,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: PlanProps) {
  const triggerText = label ?? (count !== undefined ? `${count} steps` : "Plan")

  return (
    <Disclosure
      slot="plan"
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={className}
      trigger={<span className="min-w-0 truncate">{triggerText}</span>}
      // No gap override: the inherited 8px puts the label at the same 24px offset
      // as a PlanItem's text, so the trigger reads as the list's first row.
      triggerClassName="type-label-bold text-text-base hover:text-text-strong"
      contentClassName="flex flex-col gap-1"
      {...props}
    >
      {children}
    </Disclosure>
  )
}

/**
 * The indicator carries the state and the type step carries the emphasis, so the
 * active item reads as current even in a greyscale screenshot. `done` keeps full
 * contrast rather than dimming: a finished step is the record of what happened, and
 * a reader auditing a run needs to read it as easily as the one in flight.
 *
 * These are the bare glyphs, not `Status`. `Status` covers all four states but
 * draws them circled, and it announces itself as a live region — four per plan
 * would be four announcements for one list.
 */
const INDICATOR: Record<PlanItemStatus, React.ReactNode> = {
  pending: <CircleOutline />,
  active: <Running className="motion-safe:animate-loop" />,
  done: <CheckSmall />,
  cancelled: <CloseSmall />,
}

const ITEM_TONE: Record<PlanItemStatus, string> = {
  pending: "text-text-subtle",
  active: "type-label-bold text-text-base",
  done: "text-text-base",
  cancelled: "text-text-subtle line-through",
}

const INDICATOR_TONE: Record<PlanItemStatus, string> = {
  pending: "text-border-strong",
  active: "text-link-base",
  done: "text-status-text-positive",
  cancelled: "text-text-subtle",
}

export interface PlanItemProps extends React.ComponentProps<"div"> {
  status?: PlanItemStatus
  /** Secondary line under the item. */
  description?: React.ReactNode
}

function PlanItem({
  status = "pending",
  description,
  className,
  children,
  ...props
}: PlanItemProps) {
  return (
    <div
      data-slot="plan-item"
      data-status={status}
      className={cn("flex min-w-0 items-start gap-2", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          // Matches the type-label line box, so the glyph sits on the first line
          // rather than the middle of a wrapped item.
          "inline-flex h-4 shrink-0 items-center [&_svg]:size-4",
          INDICATOR_TONE[status]
        )}
      >
        {INDICATOR[status]}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block type-label", ITEM_TONE[status])}>{children}</span>
        {description && (
          <span className="block type-hint text-text-subtle">{description}</span>
        )}
      </span>
    </div>
  )
}

export { Plan, PlanItem }
