"use client"

import * as React from "react"
import { ArrowRight } from "dbui/components/icons/ArrowRight"

import { cn } from "../lib/utils"

/**
 * @standard Follow Ups
 * @guideline Use after an assistant answer to offer the next question, one per line
 * @guideline Phrase each as the question the user would ask next, in their voice
 * @guideline Three follow-ups is the sweet spot; never more than five
 * @constraint Distinct from Suggestions — follow-ups are full questions listed vertically, suggestions are short chips in a row
 * @constraint Do not render the heading when there are no items
 */

function FollowUps({
  label = "Follow-ups",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="follow-ups"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {label ? (
        <div className="type-body-bold text-text-base">
          {label}
        </div>
      ) : null}
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

function FollowUp({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="follow-up"
      type="button"
      className={cn(
        "flex w-full items-start gap-2 rounded-sm px-1 py-1 text-left type-body text-text-subtle outline-none",
        "hover:bg-action-default-hover hover:text-text-base focus-visible:border focus-visible:border-focus-ring",
        className
      )}
      {...props}
    >
      <span className="mt-0.5 shrink-0 [&_svg]:size-4">
        <ArrowRight />
      </span>
      <span className="min-w-0">{children}</span>
    </button>
  )
}

export { FollowUps, FollowUp }
