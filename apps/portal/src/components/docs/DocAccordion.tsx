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
  className,
  children,
}: {
  /** `card` separates each entry; `list` runs them together under one border. */
  variant: "card" | "list"
  className?: string
  children: React.ReactNode
}) {
  return (
    <Accordion
      multiple
      hiddenUntilFound
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
      {/* `cn` concatenates, it does not merge, so the two class strings both
          reach the stylesheet and source order decides. `underline` is emitted
          after `no-underline` and the trigger's focus radius after the card's,
          so both need `!` to lose. Underlining a whole three-line header on
          hover reads as a broken link, and a rounder focus ring than the card
          it sits in shows its corners. */}
      <AccordionTrigger className="items-start gap-4 rounded-2! px-4 py-4 hover:no-underline!">
        <span className="flex min-w-0 flex-1 flex-col gap-2">{header}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4">{children}</AccordionContent>
    </AccordionItem>
  )
}
