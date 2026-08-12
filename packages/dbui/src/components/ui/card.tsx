"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Card
 * @guideline Takes shape-container-lg (16px); its header, footer and image caps
 *   take shape-container-md, the 12px a corner becomes when it nests inside 16px
 * @guideline A resting card is a hairline ring and no elevation. Elevation is what says
 *   "this one you can press", so set interactive on a card that is itself a target
 * @guideline Set interactive for the resting lift and the pointer cursor; add spotlight on
 *   top where a reader dwells and compares — a grid of assets to choose between
 * @guideline Elevation moves one stop under the pointer, xs to sm. Two stops is a card
 *   jumping off the page; none is a card that does not answer
 * @constraint Don't nest cards inside cards
 * @constraint Don't use for full-width content — Cards imply bounded areas
 * @constraint spotlight is decoration and must never be the only sign a card is
 *   interactive — pair it with interactive, or with a control inside the card
 * @constraint Never put spotlight on a dense repeating list. It is a per-card pointer
 *   handler and a per-card repaint, and twenty of them under one pointer is a scroll
 *   that stutters for decoration
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3154-4736
 */

/**
 * Writes the pointer's position into two custom properties the `spotlight-border`
 * utility reads. Batched into a frame because pointermove fires faster than the
 * compositor can paint, and the write is the whole cost — no state, no render.
 */
function useSpotlight(enabled: boolean) {
  const frame = React.useRef(0)

  React.useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    },
    []
  )

  return React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Touch and pen have no hover. Tracking them would light a card on tap and
      // leave it lit, which reads as a selection nobody made.
      if (!enabled || event.pointerType !== "mouse") return

      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        el.style.setProperty("--db-spotlight-x", `${x}px`)
        el.style.setProperty("--db-spotlight-y", `${y}px`)
      })
    },
    [enabled]
  )
}

function Card({
  className,
  size = "default",
  type = "post",
  interactive = false,
  spotlight = false,
  onPointerMove,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  type?: "post" | "asset-preview" | "source" | "asset-result"
  /**
   * The card is itself a target. Rests at the `xs` elevation stop and takes the
   * pointer cursor, so a pressable card is told apart from one that merely
   * contains a control.
   */
  interactive?: boolean
  /**
   * Track the pointer with a highlight on the card's edge, and lift one stop to
   * `sm` while the pointer is over it. Swaps the resting ring for a border of
   * the same weight, so content shifts by 1px.
   */
  spotlight?: boolean
}) {
  const handleSpotlight = useSpotlight(spotlight)

  return (
    <div
      data-slot="card"
      data-size={size}
      data-type={type}
      data-interactive={interactive || undefined}
      data-spotlight={spotlight || undefined}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        handleSpotlight(event)
      }}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden shape-container-lg bg-surface-base py-4 type-body text-text-base ring-1 ring-text-base/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:shape-t-container-md *:[img:last-child]:shape-b-container-md",
        // The ring goes because the halo needs a real border to paint into, and a
        // ring outside a border would draw two edges.
        spotlight && "spotlight-border ring-0",
        // One stop, xs at rest and sm under the pointer. Tailwind's default
        // transition duration is the same 150ms as --db-duration-fast, so the
        // lift already runs at the system's fast stop.
        interactive && "cursor-pointer shadow-control transition-shadow",
        spotlight && "transition-shadow hover:shadow-raised",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 shape-t-container-md px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "type-body-bold",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("type-body text-text-subtle", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center shape-b-container-md border-t bg-surface-subtle/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
