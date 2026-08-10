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
export function DocAccordion({
  variant,
  defaultValue,
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
  className?: string
  children: React.ReactNode
}) {
  return (
    <Accordion
      multiple
      hiddenUntilFound
      defaultValue={defaultValue}
      className={[
        variant === "card"
          ? "gap-10"
          : "overflow-hidden rounded-2 border border-border-base",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </Accordion>
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
  return (
    <AccordionItem
      value={value}
      className={variant === "card" ? "rounded-2 border border-border-base" : "border-border-base"}
    >
      <AccordionTrigger className={`items-start gap-4 px-4 py-4 ${TRIGGER_BY_VARIANT[variant]}`}>
        <span className="flex min-w-0 flex-1 flex-col gap-2">{header}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4">{children}</AccordionContent>
    </AccordionItem>
  )
}
