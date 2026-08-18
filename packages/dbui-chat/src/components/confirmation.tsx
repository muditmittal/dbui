"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"
import { CheckCircle } from "dbui/components/icons/CheckCircle"
import { XCircle } from "dbui/components/icons/XCircle"
import { QuestionMark } from "dbui/components/icons/QuestionMark"

import { cn } from "../lib/utils"

/**
 * @standard Confirmation
 * @guideline Use when the agent needs an answer before it can continue — approving a destructive step, choosing between two paths, confirming a scope
 * @guideline Name the consequence in the body, not the buttons. "Drop 3 tables in main.staging" is the question; the button says "Drop tables"
 * @guideline Once answered it stays in the thread as a record of what was decided, which is why `state` is a value and not an unmount
 * @guideline For a choice with no consequence — a next step a reader may ignore — reach for `Suggestion` instead. This component blocks
 * @constraint Two outcomes, accept and reject. Three is a menu, and a menu in a transcript is a question the reader has to re-read to answer
 * @constraint Never auto-dismiss and never time out. A question the agent stopped waiting for is a decision made by nobody
 * @constraint The rejected state is not an error. A reader declining is the system working, so it takes a neutral mark rather than a danger one
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5080-7831
 */

export type ConfirmationState = "request" | "accepted" | "rejected"

export interface ConfirmationProps
  extends Omit<React.ComponentProps<"div">, "children" | "title"> {
  /** The question, in one line. */
  title: React.ReactNode
  /** What it will do, and to what. */
  children?: React.ReactNode
  state?: ConfirmationState
  /** Defaults to "Confirm". Say the verb, not "Yes". */
  acceptLabel?: string
  rejectLabel?: string
  onAccept?: () => void
  onReject?: () => void
  /** Shown in place of the buttons once answered. Defaults to a generated line. */
  outcome?: React.ReactNode
}

function Confirmation({
  title,
  children,
  state = "request",
  acceptLabel = "Confirm",
  rejectLabel = "Cancel",
  onAccept,
  onReject,
  outcome,
  className,
  ...props
}: ConfirmationProps) {
  const answered = state !== "request"
  const Glyph =
    state === "accepted" ? CheckCircle : state === "rejected" ? XCircle : QuestionMark

  return (
    <div
      data-slot="confirmation"
      data-state={state}
      className={cn(
        "flex w-full min-w-0 flex-col gap-3 shape-container border border-border-base bg-surface-subtle p-3",
        // Answered is a record rather than a prompt, so it stops asking for attention.
        answered && "bg-surface-base",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-start gap-2">
        <span
          aria-hidden
          className={cn(
            "mt-0.5 shrink-0 [&_svg]:size-4",
            state === "accepted" && "text-status-text-positive",
            // Declining is the system working, so it is not a danger colour.
            state === "rejected" && "text-text-subtle",
            state === "request" && "text-text-subtle"
          )}
        >
          <Glyph />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="type-body-bold text-text-base">{title}</p>
          {children ? (
            <div className="type-body text-text-subtle">{children}</div>
          ) : null}
        </div>
      </div>

      {answered ? (
        <p className="type-hint text-text-subtle">
          {outcome ??
            (state === "accepted" ? `${acceptLabel} — confirmed` : "Declined")}
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <Button type="button" size="sm" onClick={onAccept}>
            {acceptLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReject}
          >
            {rejectLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { Confirmation }
