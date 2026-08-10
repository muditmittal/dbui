"use client"

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "dbui/components/ui/avatar"

import { cn } from "../lib/utils"
import type { MessageRole } from "../lib/types"

/**
 * @standard Message
 * @guideline One Message per turn; pass from="user" or from="assistant"
 * @guideline User turns render as a right-aligned filled pill, assistant turns as flush body text
 * @guideline Put markdown answers inside Response, not MessageContent, so formatting is handled
 * @constraint Do not give assistant turns a bubble — Databricks assistant answers sit flush on the surface
 * @constraint Avatars are optional; omit them in narrow side panels
 */

function Message({
  from,
  className,
  ...props
}: React.ComponentProps<"div"> & { from: MessageRole }) {
  return (
    <div
      data-slot="message"
      data-from={from}
      className={cn(
        "flex w-full gap-2",
        from === "user" ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    />
  )
}

function MessageContent({
  from = "assistant",
  className,
  ...props
}: React.ComponentProps<"div"> & { from?: MessageRole }) {
  return (
    <div
      data-slot="message-content"
      data-from={from}
      className={cn(
        "min-w-0 type-body text-text-base",
        from === "user"
          ? "max-w-[85%] rounded-2 bg-surface-subtle px-3 py-2"
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
