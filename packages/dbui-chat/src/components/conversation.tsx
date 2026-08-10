"use client"

import * as React from "react"
import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "dbui/components/ui/empty"

import { cn } from "../lib/utils"

/**
 * @standard Conversation
 * @guideline Wrap every message thread in Conversation so it sticks to the latest turn while streaming
 * @guideline Put turns inside ConversationContent; put the composer OUTSIDE Conversation so it never scrolls away
 * @guideline Render ConversationEmpty as the only child when there are no turns yet
 * @constraint The scroll viewport is an overflow container, not ScrollArea — custom scrollbars fight auto-scroll anchoring
 * @constraint Auto-scroll pauses as soon as the user scrolls up, so reading history is never interrupted
 */

interface ConversationContextValue {
  isAtBottom: boolean
  scrollToBottom: (behavior?: ScrollBehavior) => void
}

const ConversationContext =
  React.createContext<ConversationContextValue | null>(null)

function useConversation(): ConversationContextValue {
  const context = React.useContext(ConversationContext)
  if (!context) {
    throw new Error("useConversation must be used inside <Conversation>")
  }
  return context
}

/** Distance from the bottom (px) still treated as "at the bottom". */
const BOTTOM_THRESHOLD = 24

function Conversation({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = React.useState(true)

  const scrollToBottom = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current
      if (!viewport) return
      viewport.scrollTo({ top: viewport.scrollHeight, behavior })
    },
    []
  )

  const handleScroll = React.useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const distance =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
    setIsAtBottom(distance <= BOTTOM_THRESHOLD)
  }, [])

  // Keep the newest content in view while streaming, but only while the user
  // has not scrolled away.
  React.useEffect(() => {
    const viewport = viewportRef.current
    const content = viewport?.firstElementChild
    if (!viewport || !content || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(() => {
      if (isAtBottom) scrollToBottom("auto")
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [isAtBottom, scrollToBottom])

  const value = React.useMemo(
    () => ({ isAtBottom, scrollToBottom }),
    [isAtBottom, scrollToBottom]
  )

  return (
    <ConversationContext.Provider value={value}>
      <div
        data-slot="conversation"
        className={cn("relative flex min-h-0 flex-1 flex-col", className)}
        {...props}
      >
        <div
          ref={viewportRef}
          onScroll={handleScroll}
          data-slot="conversation-viewport"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {children}
        </div>
      </div>
    </ConversationContext.Provider>
  )
}

function ConversationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="conversation-content"
      className={cn("flex flex-col gap-4 p-4", className)}
      {...props}
    />
  )
}

/**
 * Floating "jump to latest" control. Renders only when the user has scrolled
 * away from the bottom.
 */
function ConversationScrollButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { isAtBottom, scrollToBottom } = useConversation()
  if (isAtBottom) return null

  return (
    <Button
      data-slot="conversation-scroll-button"
      variant="outline"
      size="icon-md"
      aria-label="Scroll to latest message"
      onClick={() => scrollToBottom()}
      className={cn(
        "absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full shadow-md",
        className
      )}
      {...props}
    >
      <ChevronDown />
    </Button>
  )
}

/** Empty state for a thread with no turns yet. */
function ConversationEmpty({
  title = "Ask Genie anything",
  description,
  media,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Empty>, "children"> & {
  title?: string
  description?: string
  media?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <Empty
      data-slot="conversation-empty"
      className={cn("h-full", className)}
      {...props}
    >
      <EmptyHeader>
        {media ? <EmptyMedia variant="icon">{media}</EmptyMedia> : null}
        <EmptyTitle>{title}</EmptyTitle>
        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      {children}
    </Empty>
  )
}

export {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmpty,
  useConversation,
}
