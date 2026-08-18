"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "dbui/components/ui/tooltip"
import { Copy } from "dbui/components/icons/Copy"
import { Check } from "dbui/components/icons/Check"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"
import { ThumbsDown } from "dbui/components/icons/ThumbsDown"
import { Share } from "dbui/components/icons/Share"

import { cn } from "../lib/utils"

/**
 * @standard Message Actions
 * @guideline Use under an assistant answer, as the last thing in the turn — it acts on the answer above it
 * @guideline Put `Sources` inside it as the last child. The row wraps, so the trigger sits inline with the buttons and the list it opens takes the next full-width line
 * @guideline Pass `copyText` the same string the answer was rendered from, not the DOM text — a reader pasting an answer expects the markdown back
 * @guideline Omit a handler to omit its control. A row with a dead share button is worse than a row without one
 * @constraint Feedback is one value, not two toggles — thumbs up and down are mutually exclusive, and the component enforces it rather than trusting each call site
 * @constraint Never put it on a user turn. The row acts on an answer, and a reader cannot rate their own question
 * @constraint Not a place for next steps. This row is about the answer that exists; a choice the reader has to make is its own widget
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17680
 */

export type MessageFeedback = "up" | "down"

export interface MessageActionsProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** The text the copy control writes. Omit to hide it. */
  copyText?: string
  /** Current feedback. Controlled — pass `null` for none given. */
  feedback?: MessageFeedback | null
  onFeedbackChange?: (value: MessageFeedback | null) => void
  /** Omit to hide the share control. */
  onShare?: () => void
  /** `Sources`, last. */
  children?: React.ReactNode
}

/** How long the copy control stays confirmed before returning to its icon. */
const COPIED_MS = 2000

function MessageActions({
  copyText,
  feedback = null,
  onFeedbackChange,
  onShare,
  className,
  children,
  ...props
}: MessageActionsProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const copy = async () => {
    if (!copyText) return
    try {
      await navigator.clipboard.writeText(copyText)
    } catch {
      // A denied clipboard permission is not worth breaking the row over, but
      // confirming a copy that did not happen would be a lie.
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), COPIED_MS)
  }

  // Clicking the active thumb clears it — a reader who mis-clicked can undo,
  // which is why feedback is a value rather than two independent toggles.
  const vote = (value: MessageFeedback) =>
    onFeedbackChange?.(feedback === value ? null : value)

  return (
    <TooltipProvider>
      <div
        data-slot="message-actions"
        className={cn("flex flex-wrap items-center gap-1", className)}
        {...props}
      >
        {copyText ? (
          <Action
            label={copied ? "Copied" : "Copy"}
            icon={copied ? <Check /> : <Copy />}
            onClick={copy}
          />
        ) : null}

        {onFeedbackChange ? (
          <>
            <Action
              label="Good response"
              icon={<ThumbsUp />}
              pressed={feedback === "up"}
              onClick={() => vote("up")}
            />
            <Action
              label="Bad response"
              icon={<ThumbsDown />}
              pressed={feedback === "down"}
              onClick={() => vote("down")}
            />
          </>
        ) : null}

        {onShare ? (
          <Action label="Share" icon={<Share />} onClick={onShare} />
        ) : null}

        {children}
      </div>
    </TooltipProvider>
  )
}

/**
 * One control in the row. Ghost and icon-sm throughout, so the row reads as a
 * utility strip rather than a set of decisions.
 */
function Action({
  label,
  icon,
  pressed,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  pressed?: boolean
  onClick?: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            aria-pressed={pressed}
            data-pressed={pressed || undefined}
            className={pressed ? "text-text-base" : undefined}
            onClick={onClick}
          />
        }
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export { MessageActions }
