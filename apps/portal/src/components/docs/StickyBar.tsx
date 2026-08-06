"use client"

import * as React from "react"

import { Button } from "dbui/components/ui/button"

/**
 * The two things a docs page needs to keep a control reachable while the reader
 * scrolls: a bar that pins under the site header, and a strip of section links
 * that says which section you are in.
 *
 * The offset cannot be a constant. The header is `h-14`, which is rem, and the
 * type-scale control in the footer moves the root font size — so the header is
 * 56px at 1x and taller at 1.2x and 1.4x. A hardcoded `top-14` would leave a
 * gap at the smaller scale and hide the first line of the bar at the larger one.
 * Both are measured instead, and re-measured when either box changes size.
 */

/**
 * How far an anchored heading has to clear: the header plus the bar pinned under
 * it. Written on the root element so a section anywhere on the page can consume
 * it without being handed a number.
 */
const OFFSET_VAR = "--docs-anchor-offset"

/**
 * Put this on anything a tab links to. The fallback covers the frame before the
 * bar has measured itself and the case where a page anchors without one.
 */
export const anchorOffset = { scrollMarginTop: `var(${OFFSET_VAR}, 8rem)` } as const

/** The one place that knows how to find the site header. */
const headerEl = () =>
  document.querySelector<HTMLElement>("body > header") ?? document.querySelector<HTMLElement>("header")

/**
 * A bar that pins under the site header.
 *
 * `top` is null until measured, so the first paint uses the class default and
 * the inline value takes over without a reflow the reader can see.
 */
export function StickyBar({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const [top, setTop] = React.useState<number | null>(null)
  const bar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const header = headerEl()
    const el = bar.current
    if (!header || !el) return

    const measure = () => {
      const headerHeight = header.getBoundingClientRect().height
      setTop(headerHeight)
      document.documentElement.style.setProperty(
        OFFSET_VAR,
        `${headerHeight + el.getBoundingClientRect().height}px`,
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    observer.observe(el)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty(OFFSET_VAR)
    }
  }, [])

  return (
    <div
      ref={bar}
      // Opaque, because the page scrolls underneath it. The header above is
      // translucent and blurred, and the hairline between the two is what keeps
      // the difference from reading as a seam.
      className={`sticky top-14 z-10 bg-surface-base ${className}`}
      style={top === null ? undefined : { top }}
    >
      {children}
    </div>
  )
}

export type DocSection = { id: string; label: string }

/**
 * Section links that pin under the header and mark the section you are in.
 *
 * Active is decided by position rather than by an IntersectionObserver: the
 * question is "which section have I scrolled into", and an observer answers
 * "which sections are visible", which on a docs page is usually two.
 *
 * The test is the first section whose *bottom* is still below the bar, not the
 * last one whose top has passed it. Both describe the same section, but the top
 * test is decided by a fraction of a pixel — a jump lands the heading exactly on
 * the bar, and whether it counts as arrived depends on how the browser rounded
 * the scroll offset. Testing the bottom edge puts the whole gap between two
 * sections between the two answers, so no tolerance constant is needed.
 *
 * Links rather than tab buttons. These move the reader down one document, so
 * the element is an anchor and the state is `aria-current` — a tablist would
 * claim there are panels being swapped.
 */
export function SectionTabs({ sections, label }: { sections: DocSection[]; label: string }) {
  const [active, setActive] = React.useState(sections[0]?.id ?? "")
  const strip = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const el = strip.current
    if (!el) return

    let frame = 0
    const pick = () => {
      frame = 0
      const boundary = el.getBoundingClientRect().bottom
      const present = sections.filter((section) => document.getElementById(section.id))
      const current = present.find((section) => {
        const node = document.getElementById(section.id)
        return node ? node.getBoundingClientRect().bottom > boundary : false
      })
      // The last section is usually shorter than a viewport, so the page runs out
      // of scroll before its heading reaches the bar and it becomes the one tab
      // that can never light up. At the end of the document the reader is in the
      // last section whatever the geometry says.
      const spent =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const last = present[present.length - 1]
      setActive((spent ? last : (current ?? last))?.id ?? "")
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick)
    }

    pick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [sections])

  // At the larger type scales the strip is wider than the measure, so the
  // active link can sit outside it. Scrolling the strip rather than the page is
  // what keeps the control usable at 1.4x.
  React.useEffect(() => {
    const el = strip.current
    const node = el?.querySelector<HTMLElement>(`[data-section="${active}"]`)
    if (!el || !node) return
    if (node.offsetLeft < el.scrollLeft) {
      el.scrollTo({ left: node.offsetLeft, behavior: "smooth" })
    } else if (node.offsetLeft + node.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({
        left: node.offsetLeft + node.offsetWidth - el.clientWidth,
        behavior: "smooth",
      })
    }
  }, [active])

  return (
    <StickyBar className="border-b border-border-base">
      <nav ref={strip} aria-label={label} className="flex gap-1 overflow-x-auto py-2">
        {sections.map((section) => {
          const current = section.id === active
          return (
            <Button
              key={section.id}
              size="sm"
              variant={current ? "secondary" : "ghost"}
              nativeButton={false}
              data-section={section.id}
              aria-current={current ? "true" : undefined}
              render={<a href={`#${section.id}`} />}
            >
              {section.label}
            </Button>
          )
        })}
      </nav>
    </StickyBar>
  )
}
