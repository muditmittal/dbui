"use client"

import * as React from "react"
import { Button } from "dbui/components/ui/button"
import { Textarea } from "dbui/components/ui/textarea"
import { ArrowUp } from "dbui/components/icons/ArrowUp"
import { Stop } from "dbui/components/icons/Stop"
import { Close } from "dbui/components/icons/Close"

import { cn } from "../lib/utils"
import type { ChatStatus, PromptContextItem, PromptSubmission } from "../lib/types"

/**
 * @standard Prompt Input
 * @guideline Compose it: PromptInput > [PromptInputContext] > PromptInputTextarea > PromptInputActions
 * @guideline Put tool affordances in PromptInputActions as plain ghost icon Buttons, and
 *   PromptInputSubmit last — the row splits leading tools from the trailing submit on its own
 * @guideline Set accent="ai" for Genie surfaces — it applies the AI gradient border
 * @guideline Show the object a prompt is scoped to with PromptInputContext, not placeholder text
 * @constraint The whole container is the field: clicking any part of it that is not a
 *   control puts the caret in the textarea, and the focus ring belongs to the container
 * @constraint Enter submits, Shift+Enter inserts a newline — never swap these
 * @constraint Keep the composer OUTSIDE Conversation so it does not scroll away
 * @constraint Never disable submit while streaming — swap it to a stop control instead
 * @constraint The accuracy disclaimer is not part of this component. It is product copy, so it
 *   belongs to the surface, which is also what lets one composer serve a panel and a full page
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17704
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

/** Controls that own their own click, and must not have it stolen. */
const INTERACTIVE =
  "button, a, input, textarea, select, [role='button'], [contenteditable='true']"

function PromptInput({
  onSubmit,
  accent = "default",
  className,
  children,
  onMouseDown,
  ...props
}: PromptInputProps) {
  const formRef = React.useRef<HTMLFormElement>(null)

  /**
   * The composer is a box with one line of text in it and a lot of space around
   * that line. Clicking the space did nothing, which made the box look like a
   * decoration around a small field rather than the field itself. Anywhere that
   * is not a control now puts the caret in the textarea, at the end of whatever
   * is already typed.
   *
   * mousedown rather than click, and prevented, so focus never lands on the form
   * first — that flashes the ring on and off again.
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLFormElement>) => {
    onMouseDown?.(event)
    if (event.defaultPrevented) return
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return

    const textarea = formRef.current?.querySelector<HTMLTextAreaElement>(
      'textarea[data-slot="prompt-input-textarea"]'
    )
    if (!textarea) return

    event.preventDefault()
    textarea.focus()
    const end = textarea.value.length
    textarea.setSelectionRange(end, end)
  }

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
      ref={formRef}
      data-slot="prompt-input"
      data-accent={accent}
      onSubmit={handleSubmit}
      onMouseDown={handleMouseDown}
      className={cn(
        // cursor-text because the whole box behaves as the field.
        "flex w-full cursor-text flex-col gap-4 shape-container-lg bg-surface-base p-4 shadow-control",
        accent === "default" && "border border-border-base focus-within:border-focus-ring",
        // The ring goes on the container, not the textarea. The textarea has no
        // visible edge of its own, so a ring around it drew a second box inside
        // the first — and the thing the reader is typing into is the box.
        "focus-within:shadow-focus",
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
function PromptInputContext({
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
      data-slot="prompt-input-context"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    >
      {items.map((item) => (
        <span
          key={item.id}
          data-slot="prompt-input-context-item"
          className="inline-flex items-center gap-1 rounded-1 border border-border-base bg-surface-subtle px-2 py-0.5 type-hint text-text-base"
        >
          {/* The ramp has no bold hint, and pairing `font-*` with a ramp class is
              forbidden, so the label/detail split is carried by colour alone. */}
          <span>{item.label}</span>
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
        // `dark:bg-transparent` is not redundant. Textarea carries its own
        // `dark:bg-surface-strong/30`, and cn() treats a `dark:` class and an
        // unprefixed one as different properties, so the bare `bg-transparent`
        // leaves the dark fill standing — a visible box behind the placeholder.
        "min-h-5 resize-none border-0 bg-transparent p-0 shadow-none dark:bg-transparent",
        // `shadow-none` on its own is not enough: Textarea sets the focus ring
        // under `focus-visible:`, a different variant, so an unprefixed
        // `shadow-none` leaves it standing and the ring draws a box inside the
        // composer. PromptInput carries the ring for the whole container.
        "hover:border-0 focus-visible:border-0 focus-visible:shadow-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * The composer's control row. Leading children are tool affordances; the submit
 * goes last and is pushed right by `justify-between`, so a composer with no tools
 * still lands its submit in the same place.
 */
function PromptInputActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-actions"
      className={cn(
        "flex items-center justify-between gap-2 [&>*:only-child]:ml-auto",
        className
      )}
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
      {isBusy ? <Stop /> : <ArrowUp />}
    </Button>
  )
}

export {
  PromptInput,
  PromptInputContext,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputSubmit,
}
