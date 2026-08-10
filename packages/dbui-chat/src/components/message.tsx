"use client"

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "dbui/components/ui/avatar"

import { cn } from "../lib/utils"
import type { MessageRole } from "../lib/types"

/**
 * @standard Message
 * @guideline One Message per turn; pass from="user" or from="assistant" on Message only — MessageContent inherits it
 * @guideline User turns render as a right-aligned filled pill, assistant turns as flush body text
 * @guideline Put markdown answers inside Response, not MessageContent, so formatting is handled
 * @constraint Do not give assistant turns a bubble — Databricks assistant answers sit flush on the surface
 * @constraint Avatars are optional; omit them in narrow side panels
 */

/**
 * The turn's role, published by `Message` so its content does not have to be told
 * again. `MessageContent` used to default to "assistant" on its own, which meant
 * `<Message from="user"><MessageContent>` — the obvious way to write it — rendered a
 * user turn as flush assistant text. The parent's `justify-end` could not save it
 * either, because the assistant branch is `w-full`. The bug was silent: correct
 * markup, wrong turn.
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
        className={cn(
          "flex w-full gap-2",
          from === "user" ? "justify-end" : "justify-start",
          className
        )}
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
          ? "max-w-[85%] shape-container bg-surface-subtle px-3 py-2"
          : "w-full",
        className
      )}
      {...props}
    />
  )
}

function MessageAvatar({
  src,
  name,
  className,
  ...props
}: React.ComponentProps<typeof Avatar> & { src?: string; name?: string }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : undefined

  return (
    <Avatar
      data-slot="message-avatar"
      className={cn("size-6 shrink-0", className)}
      {...props}
    >
      {src ? <AvatarImage src={src} alt={name ?? ""} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export { Message, MessageContent, MessageAvatar }
