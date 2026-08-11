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
          // `p-1` is the scroll container's gutter, not decoration: a scroll
          // container clips on all four edges, so without it the focus ring on
          // the first and last turn is cut off. ConversationContent carries the
          // remaining inset, so the total is unchanged.
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1"
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
      className={cn("flex flex-col gap-4 p-3", className)}
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
        "absolute bottom-3 left-1/2 z-raised -translate-x-1/2 shape-pill shadow-md",
        className
      )}
      {...props}
    >
      <ChevronDown />
    </Button>
  )
}

/**
 * Empty state for a thread with no turns yet.
 *
 * The identity block is centred in the region and the starter prompts sit at the
 * foot of it, next to the composer rather than under the title. A reader opening
 * a panel reads the name once; what they act on is the row of prompts, and that
 * belongs where their pointer already is.
 *
 * Pass `media` already wrapped in AiGradientIcon — the gradient is what marks
 * this as Genie, and this component does not decide that on the caller's behalf.
 */
function ConversationEmpty({
  title = "Genie",
  description,
  media,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Empty>, "children"> & {
  title?: string
  description?: string
  media?: React.ReactNode
  /** Starter prompts. Rendered at the foot of the region, not under the title. */
  children?: React.ReactNode
}) {
  return (
    <Empty
      data-slot="conversation-empty"
      // justify-between rather than the centred default: the identity block owns
      // the middle and the prompts hold the bottom edge.
      className={cn("h-full justify-between gap-6 p-3", className)}
      {...props}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6">
        {media ? (
          <EmptyMedia className="mb-0 [&_svg]:size-12">{media}</EmptyMedia>
        ) : null}
        <EmptyHeader className="gap-2">
          <EmptyTitle className="type-title-2 text-text-strong">{title}</EmptyTitle>
          {description ? (
            <EmptyDescription>{description}</EmptyDescription>
          ) : null}
        </EmptyHeader>
      </div>
      {children ? (
        <div className="flex w-full flex-wrap items-start gap-2">{children}</div>
      ) : null}
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
