"use client"

import * as React from "react"
import { Button, ButtonIcon } from "dbui/components/ui/button"

import { cn } from "../lib/utils"

/**
 * @standard Suggestion
 * @guideline Use for starter prompts before a thread begins, or offered actions mid-thread
 * @guideline Keep labels to a short verb phrase — "Analyze data", not a full sentence
 * @guideline Pair with SparkleFill in ButtonIcon when the suggestion triggers an agent action
 * @constraint Use outline buttons; a suggestion is never the page's primary action
 * @constraint Cap at 4-6 suggestions — beyond that use a menu
 */

function Suggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestions"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

function Suggestion({
  variant = "outline",
  size = "sm",
  type = "button",
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="suggestion"
      type={type}
      variant={variant}
      size={size}
      // type-body because whitespace-normal undoes Button's single-line
      // assumption, and a wrapped suggestion on the label line box would set
      // its second line 4px tight against the first. Important because the
      // ramp utilities are emitted alphabetically, so plain type-body would
      // lose to the type-label the Button already carries.
      className={cn("h-auto py-1 text-left type-body! whitespace-normal", className)}
      {...props}
    />
  )
}

export { Suggestions, Suggestion, ButtonIcon as SuggestionIcon }
