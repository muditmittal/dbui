"use client"

import * as React from "react"

import { tabsListVariants, tabsTriggerVariants } from "dbui/components/ui/tabs"

import { ANCHOR_OFFSET_VAR } from "./anchor"

/**
 * The two things a docs page needs to keep a control reachable while the reader
 * scrolls: a bar that pins under the site header, and a strip of section links
 * that says which section you are in.
 *
 * The offset cannot be a constant. The header is `h-14`, which is rem, and the
 * type-scale control in the footer moves the root font size — so the header is
 * 56px at the default 1x and taller at 1.1x and 1.2x. A hardcoded `top-14`
 * would be right only at the default and hide the first line of the bar at both
 * larger stops. Both are measured instead, and re-measured when either box
 * changes size.
 *
 * One bar per page. Two would each publish an offset and the second would win,
 * so the first bar's sections would scroll to the wrong place.
 */

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
        ANCHOR_OFFSET_VAR,
        `${headerHeight + el.getBoundingClientRect().height}px`,
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    observer.observe(el)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty(ANCHOR_OFFSET_VAR)
    }
  }, [])

  return (
    <div
      ref={bar}
      // Opaque, because the page scrolls underneath it. The header above is
      // translucent and blurred, and the hairline between the two is what keeps
      // the difference from reading as a seam.
      //
      // `raised`, not `sticky`. The site header takes `sticky` and comes first in
      // the document, so an equal z-index put this bar on top of it — the bar was
      // sliding over the header rather than under. `raised` is still enough to
      // clear the content: `Table` is `position: relative` with `z-index: auto`,
      // which paints below any positive z-index but through a zero one on its way
      // past. That the two roles differ is why they are named rather than numbered.
      // The bottom edge belongs here, not to whichever child ends up last.
      //
      // It used to be the caller's job, and both callers got it from a child: the
      // section strip from its own tab list, the icon browser from a class on the
      // bar. Then the icon browser's rows were reordered and its last row became
      // a tab strip whose rule had been suppressed for a reason that the reorder
      // had just invalidated — so the bar pinned under the header with no edge at
      // all and the rows slid up behind an invisible boundary. Nothing failed.
      //
      // An opaque bar over scrolling content always needs the edge, so the
      // element that pins is the one that should carry it. A child that draws its
      // own rule now suppresses it instead, which is one decision in one place
      // rather than a thing every caller has to remember.
      className={`sticky top-14 z-raised border-b border-border-base bg-surface-base ${className}`}
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
 *
 * It still has to look exactly like a tab strip, and it gets that from the two
 * variant exports rather than a copy of their classes: `tabsListVariants` and
 * `tabsTriggerVariants` carry every rule, and this reproduces the attributes
 * those rules select on. The `group/tabs` wrapper is not decoration — the list's
 * `h-8` and `w-full` both hang off `group-data-horizontal/tabs`, which `Tabs`
 * would otherwise supply, and without it the bar silently loses its height and
 * stops spanning. `data-active` is what lights the indicator, through the same
 * declaration a real tab uses.
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
  // what keeps the control usable at the largest stop.
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
    // `mt-6` so the strip reads as a control rather than as a third line of the
    // deck. It sat flush against the description on both pages that use it, and
    // the margin only moves where the bar sits in flow — `StickyBar` measures its
    // own height for the anchor offset, which a margin does not change.
    // `border-b-0` opts out of the bar's edge, because the tab list below draws
    // one that has to be the visible line — see the note on the list. This is the
    // only place that opts out, and it does so for a reason inside the variant
    // rather than a fact about the surrounding layout.
    <StickyBar className="mt-6 border-b-0">
      <div className="group/tabs" data-orientation="horizontal">
        <nav
          ref={strip}
          aria-label={label}
          data-slot="tabs-list"
          data-variant="default"
          data-width="full"
          // The list keeps its own rule here, and the bar gives its own up above.
          // For `variant="default"` that rule is not a separator, it is the
          // baseline the 3px selected segment sits on — suppress it and the
          // indicator floats a pixel clear of the bar's edge instead of resting
          // on a line. `pill` has no such tie, which is why the icon browser
          // resolves the same collision the other way round.
          className={tabsListVariants({
            variant: "default",
            width: "full",
            className: "overflow-x-auto",
          })}
        >
          {sections.map((section) => {
            const current = section.id === active
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-section={section.id}
                data-active={current ? "" : undefined}
                aria-current={current ? "true" : undefined}
                className={tabsTriggerVariants()}
              >
                {section.label}
              </a>
            )
          })}
        </nav>
      </div>
    </StickyBar>
  )
}
