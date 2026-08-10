"use client"

import * as React from "react"
import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Textarea } from "dbui/components/ui/textarea"
import { Send } from "dbui/components/icons/Send"
import { Stop } from "dbui/components/icons/Stop"
import { Close } from "dbui/components/icons/Close"

import { cn } from "../lib/utils"
import type { ChatStatus, PromptContextItem, PromptSubmission } from "../lib/types"

/**
 * @standard Prompt Input
 * @guideline Compose it: PromptInput > [PromptInputContextBar] > PromptInputTextarea > PromptInputFooter > [PromptInputTools, PromptInputSubmit]
 * @guideline Set accent="ai" for Genie surfaces — it applies the AI gradient border
 * @guideline Show the object a prompt is scoped to with PromptInputContextBar, not placeholder text
 * @constraint Enter submits, Shift+Enter inserts a newline — never swap these
 * @constraint Keep the composer OUTSIDE Conversation so it does not scroll away
 * @constraint Never disable submit while streaming — swap it to a stop control instead
 */

const TEXTAREA_NAME = "prompt"

export interface PromptInputProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSubmit?: (
    submission: PromptSubmission,
    event: React.FormEvent<HTMLFormElement>
  ) => void
  /** "ai" applies the Genie gradient border using --ai-gradient. */
  accent?: "default" | "ai"
}

function PromptInput({
  onSubmit,
  accent = "default",
  className,
  children,
  ...props
}: PromptInputProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = String(data.get(TEXTAREA_NAME) ?? "").trim()
    const files = data
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)

    if (!text && files.length === 0) return
    onSubmit?.({ text, files: files.length > 0 ? files : undefined }, event)
    form.reset()
  }

  // The gradient border is painted as two stacked backgrounds — a solid surface
  // clipped to the padding box, and the AI gradient clipped to the border box.
  const aiBorderStyle: React.CSSProperties =
    accent === "ai"
      ? {
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(var(--db-surface-base), var(--db-surface-base)), var(--ai-gradient)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }
      : {}

  return (
    <form
      data-slot="prompt-input"
      data-accent={accent}
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-2 shape-container bg-surface-base p-2 shadow-xs",
        accent === "default" && "border border-input-border-base",
        "focus-within:border-focus-ring",
        className
      )}
      style={aiBorderStyle}
      {...props}
    >
      {children}
    </form>
  )
}

/** Pills naming the objects this prompt is scoped to. */
function PromptInputContextBar({
  items,
  onRemove,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  items: PromptContextItem[]
  onRemove?: (id: string) => void
}) {
  if (items.length === 0) return null

  return (
    <div
      data-slot="prompt-input-context-bar"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    >
      {items.map((item) => (
        <span
          key={item.id}
          data-slot="prompt-input-context-item"
          className="inline-flex items-center gap-1 rounded-1 border border-border-base bg-surface-subtle px-2 py-0.5 type-hint text-text-base"
        >
          <span className="font-semibold">{item.label}</span>
          {item.detail ? (
            <span className="text-text-subtle">{item.detail}</span>
          ) : null}
          {onRemove ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${item.label}`}
              className="size-4"
              onClick={() => onRemove(item.id)}
            >
              <Close />
            </Button>
          ) : null}
        </span>
      ))}
    </div>
  )
}

function PromptInputTextarea({
  className,
  placeholder = "Ask a question...",
  onKeyDown,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    // Enter submits; Shift+Enter is a newline. Ignore IME composition.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <Textarea
      data-slot="prompt-input-textarea"
      name={TEXTAREA_NAME}
      rows={1}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className={cn(
        "min-h-8 resize-none border-0 bg-transparent px-1 py-1 shadow-none",
        "hover:border-0 focus-visible:border-0",
        className
      )}
      {...props}
    />
  )
}

function PromptInputFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-footer"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function PromptInputTools({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-tools"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

/** A tool affordance in the composer footer (attach, mention, mode). */
function PromptInputButton({
  variant = "ghost",
  size = "icon-sm",
  type = "button",
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="prompt-input-button"
      type={type}
      variant={variant}
      size={size}
      className={className}
      {...props}
    />
  )
}

function PromptInputSubmit({
  status = "ready",
  label = "Send",
  stopLabel = "Stop generating",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  status?: ChatStatus
  label?: string
  stopLabel?: string
}) {
  const isBusy = status === "streaming" || status === "submitted"

  return (
    <Button
      data-slot="prompt-input-submit"
      type={isBusy ? "button" : "submit"}
      variant="ghost"
      size="icon-md"
      aria-label={isBusy ? stopLabel : label}
      className={className}
      {...props}
    >
      {isBusy ? <Stop /> : <Send />}
    </Button>
  )
}

export {
  PromptInput,
  PromptInputContextBar,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  ButtonIcon as PromptInputButtonIcon,
}
