"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"

import { cn } from "../lib/utils"

/**
 * @standard Suggestion
 * @guideline Use for next steps a reader may take or ignore — a follow-up question, a related asset, a narrower scope
 * @guideline Put it under the answer it follows from, as the last thing in the turn. A suggestion above an answer is a menu
 * @guideline Write each one as the thing the reader would have typed: "Show me the failing tables", not "Failing tables"
 * @guideline Three or four. A row of eight is a search results page, and a reader who has to read all of them would rather type
 * @constraint Ignorable by design — nothing here blocks and nothing is required. A choice the agent needs an answer to is a `Confirmation`
 * @constraint Not the composer's business. These sit in the transcript beside the answer that produced them, so they scroll away with it rather than following the reader down the page
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5080-7848
 */

export interface SuggestionsProps extends React.ComponentProps<"div"> {
  /** Names the row for assistive tech. */
  label?: string
}

function Suggestions({
  label = "Suggested next steps",
  className,
  children,
  ...props
}: SuggestionsProps) {
  return (
    <div
      data-slot="suggestions"
      role="group"
      aria-label={label}
      // Wraps rather than scrolls: a horizontally scrolling row hides its own
      // last item, and a suggestion nobody sees is not a suggestion.
      className={cn("flex min-w-0 flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface SuggestionProps
  extends Omit<React.ComponentProps<typeof Button>, "variant" | "size"> {
  /** The text sent when it is picked. Defaults to the visible label. */
  value?: string
  onPick?: (value: string) => void
}

function Suggestion({
  value,
  onPick,
  className,
  children,
  onClick,
  ...props
}: SuggestionProps) {
  return (
    <Button
      data-slot="suggestion"
      type="button"
      variant="outline"
      size="sm"
      className={cn("shape-pill", className)}
      onClick={(event) => {
        onClick?.(event)
        onPick?.(value ?? (typeof children === "string" ? children : ""))
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export { Suggestions, Suggestion }
