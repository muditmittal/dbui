"use client"

import * as React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "dbui/components/ui/accordion"

import { cn } from "../lib/utils"

/**
 * @standard Details
 * @guideline Use in a thread to answer "what is this asset" without sending the reader to
 *   another surface — a table, a model, a dashboard the agent just named
 * @guideline Every row is a fact with a value. Put the value in `summary` so a collapsed
 *   card still answers the question; the panel is the evidence behind the answer
 * @guideline Open at most one row by default, and only the row the answer turns on
 * @constraint Exactly one row opens at a time. Two open panels in a card this narrow means
 *   the reader scrolls to compare, which is what the surface being summarised is for
 * @constraint Not a table. A row is one labelled fact, not a record — six rows is the shape,
 *   twenty is a page
 * @constraint Never the only place a value appears. The card is a summary, so every row
 *   should be reachable on the asset's own surface too
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17814
 */

function Details({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="details"
      className={cn(
        "flex w-full min-w-0 flex-col shape-container border border-border-base bg-surface-subtle",
        className
      )}
      {...props}
    />
  )
}

export interface DetailsHeaderProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Entity icon for the asset kind. */
  icon?: React.ReactNode
  title: React.ReactNode
  /** Trailing mark on the name — certified, deprecated. */
  badge?: React.ReactNode
  /** Where the asset lives, e.g. a catalog path. */
  path?: React.ReactNode
  /** Overflow menu or a single control, top right. */
  actions?: React.ReactNode
}

function DetailsHeader({
  icon,
  title,
  badge,
  path,
  actions,
  className,
  ...props
}: DetailsHeaderProps) {
  return (
    <div
      data-slot="details-header"
      className={cn("flex items-start gap-2 p-3", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-w-0 items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0">
          {icon}
          <span className="min-w-0 truncate type-title-4 text-text-base">
            {title}
          </span>
          {badge}
        </div>
        {path ? (
          // Indented past the icon and its gap, so the path hangs under the name
          // rather than under the glyph.
          <span className="min-w-0 truncate pl-6 type-body text-text-subtle">
            {path}
          </span>
        ) : null}
      </div>
      {actions}
    </div>
  )
}

/**
 * The rows. One opens at a time — Base UI's accordion is single-open by default,
 * which is the behaviour this card wants, so nothing here has to enforce it.
 */
function DetailsRows({
  className,
  ...props
}: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion
      data-slot="details-rows"
      className={cn("gap-0 p-2", className)}
      {...props}
    />
  )
}

export interface DetailsRowProps
  extends Omit<React.ComponentProps<typeof AccordionItem>, "children"> {
  /** The fact's name. */
  label: React.ReactNode
  /** The answer, shown while collapsed. Omit for a row that is only a heading. */
  summary?: React.ReactNode
  /** Sits before the summary — a Status dot, a small entity glyph. */
  summaryIcon?: React.ReactNode
  /** The evidence. Omit for a row that states a value and has nothing behind it. */
  children?: React.ReactNode
}

function DetailsRow({
  label,
  summary,
  summaryIcon,
  className,
  children,
  ...props
}: DetailsRowProps) {
  const labelNode = (
    <span className="min-w-0 flex-1 truncate text-left type-body text-text-base">
      {label}
    </span>
  )

  const summaryNode = summary ? (
    // Hidden once the row is open, because the panel restates the value in full.
    // The same variant the accordion's own chevrons use, so an open row reads as
    // a heading over its evidence rather than the answer twice.
    <span className="flex shrink-0 items-center gap-1 type-body-bold text-text-base group-aria-expanded/accordion-trigger:hidden [&_svg]:size-4 [&_svg]:shrink-0">
      {summaryIcon}
      {summary}
    </span>
  ) : null

  // A row with nothing behind it is not a disclosure. Rendering it as one would
  // put a chevron on a control that opens an empty panel.
  if (!children) {
    return (
      <div
        data-slot="details-row"
        className={cn(
          "flex w-full items-center gap-1 rounded-2 px-2 py-2",
          className
        )}
      >
        {labelNode}
        {summaryNode}
      </div>
    )
  }

  return (
    <AccordionItem
      data-slot="details-row"
      // The system accordion rules its items apart; here each row is its own
      // block that becomes a raised panel when open, so the rule would draw a
      // line between two cards.
      className={cn(
        "border-0 not-last:border-b-0",
        "data-open:shape-container data-open:border data-open:border-border-base data-open:bg-surface-base",
        className
      )}
      {...props}
    >
      <AccordionTrigger className="items-center gap-1 rounded-2 px-2 py-2 type-body">
        {labelNode}
        {summaryNode}
      </AccordionTrigger>
      <AccordionContent className="px-2 pb-2">{children}</AccordionContent>
    </AccordionItem>
  )
}

function DetailsFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="details-footer"
      className={cn(
        "px-4 py-2 text-right type-body text-text-subtle",
        className
      )}
      {...props}
    />
  )
}

export { Details, DetailsHeader, DetailsRows, DetailsRow, DetailsFooter }
