"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import type { MessageRole } from "../lib/types"

/**
 * @standard Message
 * @guideline One Message per turn; pass from="user" or from="assistant" on Message only — MessageContent inherits it
 * @guideline User turns render as a full-width filled box, assistant turns as flush body text
 * @guideline Put markdown answers inside Response, not MessageContent, so formatting is handled
 * @constraint Do not give assistant turns a fill — Databricks assistant answers sit flush on the surface
 * @constraint Do not right-align or width-cap the user turn. The thread is a transcript, not a
 *   messaging app, and a workbench prompt is often long enough that a cap forces a ragged column
 */

/**
 * The turn's role, published by `Message` so its content does not have to be told
 * again. `MessageContent` used to default to "assistant" on its own, which meant
 * `<Message from="user"><MessageContent>` — the obvious way to write it — rendered a
 * user turn as flush assistant text. The bug was silent: correct markup, wrong turn.
 */
const MessageFromContext = React.createContext<MessageRole>("assistant")

function Message({
  from,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { from: MessageRole }) {
  return (
    <MessageFromContext.Provider value={from}>
      <div
        data-slot="message"
        data-from={from}
        className={cn("flex w-full flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </MessageFromContext.Provider>
  )
}

function MessageContent({
  from,
  className,
  ...props
}: React.ComponentProps<"div"> & { from?: MessageRole }) {
  // Explicit prop still wins, for a turn that renders content of the other role —
  // a quoted user prompt inside an assistant summary.
  const inherited = React.useContext(MessageFromContext)
  const role = from ?? inherited

  return (
    <div
      data-slot="message-content"
      data-from={role}
      className={cn(
        "min-w-0 type-body text-text-base",
        role === "user"
          ? "w-full shape-container bg-surface-subtle px-4 py-3 shadow-control"
          : "w-full",
        className
      )}
      {...props}
    />
  )
}

export { Message, MessageContent }
