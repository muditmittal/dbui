"use client"

// The directive is here for the `StickyHeaders` context below, and it sits on the
// first line rather than under this comment because some toolchains only honor it
// there.
//
// This module was a server component until it held a context. Worth knowing that
// the failure was not local: `createContext` throws on the server, so the page that
// broke was Principles — which does not use the sticky option at all and only
// imports the file that does.

import * as React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "dbui/components/ui/accordion"

/**
 * The accordion the docs pages collapse their long entries into.
 *
 * Two things are deliberate and neither is cosmetic.
 *
 * `hiddenUntilFound` keeps every panel in the served HTML, hidden rather than
 * unmounted, so find-in-page can open one and anything that reads the document
 * without running the page still reads the guidance. A panel that only exists
 * after a click is a panel a crawler, an agent and a reader searching for a
 * phrase all see as absent.
 *
 * `multiple` lets a reader open two entries and compare them. These pages are
 * reference material, and a comparison the reader has to hold in their head is
 * a comparison they will get wrong.
 */
/**
 * Whether this accordion's headers pin, decided once on the accordion rather than
 * on each item.
 *
 * It has to be one decision because it takes two coordinated changes: the items
 * pin, and the root stops clipping with `overflow`. A pair of props that must
 * agree is a pair that will one day disagree, and the failure is silent — the
 * header keeps `position: sticky` and simply never sticks.
 */
const StickyHeaders = React.createContext(false)

export function DocAccordion({
  variant,
  defaultValue,
  sticky = false,
  className,
  children,
}: {
  /** `card` separates each entry; `list` runs them together under one border. */
  variant: "card" | "list"
  /**
   * Which entries start open. A page whose entries are specimens rather than
   * guidance needs one already showing, or the reader arrives at a stack of
   * closed bars and has to guess which one holds a color.
   */
  defaultValue?: string[]
  /**
   * Pin each item's header while its own panel is being read. See `StickyHeaders`
   * for why this is one prop and not two.
   */
  sticky?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <StickyHeaders.Provider value={sticky}>
      <Accordion
        multiple
        hiddenUntilFound
        defaultValue={defaultValue}
        className={[
          variant === "card"
            ? "gap-10"
            : `rounded-2 border border-border-base ${
                // `isolate`, so the pinned header's layer is spent inside this box.
                //
                // It has to be. The header needs to clear the tables scrolling under
                // it, which takes a positive z — and the page's tab strip pins on the
                // same layer, so an accordion header later in the document won the tie
                // and slid over the strip. Raising the strip instead would only move
                // the collision up to the site header.
                //
                // Isolated, the comparison never happens: the header outranks its own
                // siblings, and the accordion as a whole meets the strip at `auto`,
                // which loses to it. That is what isolation is for, and unlike
                // `overflow-hidden` it makes a stacking context without making a
                // scroll container, so the header still pins.
                sticky ? "isolate" : ""
              } ${
                // `overflow-hidden` and a pinned header are mutually exclusive:
                // hidden overflow makes this element a scroll container, and a
                // sticky descendant then resolves against a box that never scrolls,
                // so it holds `position: sticky` and never moves.
                //
                // Nothing replaces it here, and `clip-path` was the wrong idea
                // twice. A clip applies to the element AND its children as one
                // shape, so it cannot spare this element's border while trimming a
                // child's background — which is the only thing that needed
                // trimming. The rounding moves onto the child instead, in
                // `DocAccordionItem`.
                sticky ? "" : "overflow-hidden"
              }`,
          className ?? "",
        ].join(" ")}
      >
        {children}
      </Accordion>
    </StickyHeaders.Provider>
  )
}

/**
 * What the trigger has to override, and why it differs by variant.
 *
 * Radius. The corner has to match whatever encloses the trigger, because the
 * hover fill is painted on the trigger and its corners are read against the
 * enclosure's. A card encloses its trigger in a rounded border, so the trigger
 * borrows the card's radius. A list row has no border of its own — it is a
 * square band between two dividers — so a rounded trigger there leaves the fill
 * curving away from four straight edges.
 *
 * Focus. A card trigger has the accordion's `gap-10` around it, so an outset
 * ring has somewhere to land. A list trigger is full-bleed: it spans its
 * container's whole padding box, so the outset ring is drawn outside that box
 * and `overflow-hidden` takes the left and right off it, leaving an indicator
 * that renders on two sides only. An inset ring is drawn inside the element,
 * where no ancestor's clip can reach it. Dropping the clip instead looks worse
 * than the bug: the ring then projects square corners past the container's
 * rounded ones, and the hover fill escapes the same corners.
 *
 * `cn` concatenates rather than merges, so both class strings reach the
 * stylesheet and Tailwind's ordering decides. `rounded-2` and `ring-0` are both
 * emitted before the trigger's own `rounded-3` and `ring-3`, so both need `!`
 * to win. `rounded-none` is a static utility, emitted after every functional
 * one, so it wins on its own.
 */
const TRIGGER_BY_VARIANT = {
  card: "rounded-2!",
  list: "rounded-none focus-visible:ring-0! focus-visible:inset-ring-3 focus-visible:inset-ring-focus-ring/50",
} as const

/**
 * `header` is what a collapsed page says. It carries the whole claim — name,
 * label and meaning — so the six principles read as six principles before
 * anything is opened, and the panel holds the evidence rather than the point.
 */
export function DocAccordionItem({
  value,
  variant,
  header,
  children,
}: {
  value: string
  variant: "card" | "list"
  header: React.ReactNode
  children: React.ReactNode
}) {
  /**
   * Read from the accordion rather than taken as a prop.
   *
   * For a panel long enough that its heading scrolls away — a color family runs to
   * four tables — where the reader is stops being answerable from what is on
   * screen. It pins at `--db-sticky-offset`, which the docs layout resolves to the
   * site header plus whatever bar is pinned under it, so the header lands below the
   * section tabs rather than behind them.
   */
  const sticky = React.useContext(StickyHeaders)

  /**
   * The trigger cannot be the pinned element, and it took a measurement to see it.
   *
   * A sticky box travels inside its containing block, and `AccordionTrigger` wraps
   * its button in a heading element sized to the button — so the trigger had
   * `position: sticky` and a resolved `top: 89px` and nowhere at all to go. Pinning
   * needs a parent that spans the header and the panel, which is the item.
   *
   * Hence a wrapper here rather than a `[&>h3]` selector on the item. The heading
   * belongs to DBUI's `AccordionTrigger` and is not part of its documented surface,
   * so a class naming it would work today and break silently the day that element
   * changes. This adds a box the portal owns instead.
   *
   * Opaque, because the panel scrolls underneath. `raised` clears the tables on
   * their way past and stays below the site header's `sticky`.
   */
  const header_ = (
    <AccordionTrigger className={`items-start gap-4 px-4 py-4 ${TRIGGER_BY_VARIANT[variant]}`}>
      <span className="flex min-w-0 flex-1 flex-col gap-2">{header}</span>
    </AccordionTrigger>
  )

  return (
    <AccordionItem
      value={value}
      className={`group/accordion-item ${
        variant === "card" ? "rounded-2 border border-border-base" : "border-border-base"
      }`}
    >
      {/*
        The wrapper takes the enclosure's corners on the ends where it meets them.
        Its background is opaque — the panel scrolls under it — and a child's
        background paints above its parent's border, so a square-cornered white box
        at the top of the list erased the arc the accordion had just drawn. The
        corner was not being clipped; it was being covered.
        
        `first`/`last` read the ITEM's position, which is why the group is on the
        item rather than here: among its own siblings this wrapper is always first,
        and that says nothing about whether it sits at the top of the list.
        
        `overflow-hidden` is safe on this element and not on the accordion. It makes
        a scroll container, which breaks a sticky DESCENDANT — and the only thing
        inside is the trigger, whose hover fill is exactly what needs clipping to
        these corners.
      */}
      {sticky ? (
        <div className="sticky top-(--db-sticky-offset) z-raised overflow-hidden bg-surface-base group-first/accordion-item:rounded-t-2 group-last/accordion-item:rounded-b-2">
          {header_}
        </div>
      ) : (
        header_
      )}
      <AccordionContent className="px-4 pt-2 pb-4">{children}</AccordionContent>
    </AccordionItem>
  )
}
