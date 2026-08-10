"use client"

import * as React from "react"

/**
 * A bar that pins part-way down a page, and publishes where its own bottom edge
 * lands so the tables beside it pin against that line rather than against a
 * number somebody worked out by hand.
 *
 * `Table` places its header at `--db-sticky-offset` and knows nothing else, so
 * the page owes it the height of everything already pinned above the table. The
 * docs layout answers that for the site header and for a `StickyBar`. A plate
 * further down the page is the third case, and it was answered by adding the
 * tab row's `h-8` to the header offset in a class string — which was right on
 * the day it was written and wrong the moment the row gained padding and a
 * rule. Nothing said so. The calc still computed, and the table header pinned
 * into the plate by the difference, which grew with the type scale because
 * every term in it is rem.
 *
 * So the plate measures itself. The published number is its used `top` plus its
 * rendered height, which is where its lower edge comes to rest once pinned —
 * read fresh each time rather than derived from the classes it happens to
 * carry, so restyling the row cannot put the two out of step again.
 *
 * `top` rather than the current `getBoundingClientRect().top`, because the
 * offset has to be the same before the reader has scrolled far enough to pin
 * anything.
 *
 * ### Why not `StickyBar`
 *
 * `StickyBar` measures itself the same way, and publishes `--docs-anchor-offset`
 * on the document element. Both parts are wrong for a plate:
 *
 * - That variable is the scroll margin a jump target has to clear. This plate
 *   sits *inside* one section rather than above all of them, so adding its
 *   height there would land every anchor on the page short by it.
 * - It is published globally, and this offset is local by nature — the tables
 *   under the plate need it and the tables elsewhere on the same page must not
 *   have it. Hence a scope element instead of the document root, and no second
 *   variable for a call site to compose by hand.
 *
 * So this mirrors the measuring rather than reusing the component, and
 * `StickyBar` is left alone: it is right about the one bar a page pins under
 * its header.
 */

/** The offset `Table` reads to place its own pinned header. */
const STICKY_OFFSET_VAR = "--db-sticky-offset"

export function StickyPlate({
  bar,
  children,
  className = "",
}: {
  /** What pins. Rendered inside the plate. */
  bar: React.ReactNode
  /** What pins under it. Everything here inherits the measured offset. */
  children: React.ReactNode
  className?: string
}) {
  const scope = React.useRef<HTMLDivElement>(null)
  const plate = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = plate.current
    const host = scope.current
    if (!el || !host) return

    const measure = () => {
      const top = parseFloat(getComputedStyle(el).top)
      const bottom = (Number.isFinite(top) ? top : 0) + el.getBoundingClientRect().height
      host.style.setProperty(STICKY_OFFSET_VAR, `${bottom}px`)
    }

    measure()
    // The plate's height moves with the type scale, which the footer control
    // changes at any time. The resize listener is for the other term: `top`
    // resolves from a variable, so it can move without the plate's own box
    // moving at all.
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
      host.style.removeProperty(STICKY_OFFSET_VAR)
    }
  }, [])

  return (
    // `contents`, so the scope carries the variable and no box. The plate and
    // the content below it stay direct flex items of whatever they were in
    // before, and the gap between them is unchanged.
    <div ref={scope} className="contents">
      <div
        ref={plate}
        // Pinned at the site header, read from the same variable the docs rail
        // and the table headers read rather than restated as `top-14`. `z-1`
        // sits under the header's `z-10` so the plate slides beneath it, and
        // over the table below, which is `position: relative` and would
        // otherwise paint through the plate on its way past. Opaque, because
        // the page scrolls underneath.
        className={`sticky top-(--docs-header-offset) z-1 bg-surface-base ${className}`}
      >
        {bar}
      </div>
      {children}
    </div>
  )
}
