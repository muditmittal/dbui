import * as React from "react"
import Link from "next/link"

/**
 * The one visual language the docs diagrams are drawn in.
 *
 * Everything here is DOM, borders and semantic tokens — no image, no SVG, no
 * chart library — so a diagram restyles with the theme, survives a token change
 * and stays legible in dark mode without a second asset to keep in step.
 *
 * The rules both diagrams share: one hairline frame, hairline dividers inside
 * it, an eyebrow to name a lane or a column, mono for anything that is a literal
 * name in the system, and no color. Color is not withheld to be austere — it is
 * withheld because neither diagram has a meaning to give it. The borders already
 * say which things are grouped and the type already says what they are, so a hue
 * on top of that would be decoration, and decoration in a diagram reads as
 * information that turns out not to be there.
 *
 * These are presentational and hold no state, so they render inside a server
 * page and a client module alike.
 */

/**
 * The frame. A caption sits under it rather than over it, because a diagram is
 * read before its caption and a line above the frame delays the picture.
 */
export function Figure({
  caption,
  children,
}: {
  caption?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <div className="overflow-hidden rounded-md border border-border-base">{children}</div>
      {caption ? <figcaption className="type-hint text-text-subtle">{caption}</figcaption> : null}
    </figure>
  )
}

/**
 * A band inside a Figure. The divider is on the row rather than between rows so
 * a caller can map over data without tracking which item is last.
 */
export function FigureRow({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`border-b border-border-subtle last:border-b-0 ${className}`}>{children}</div>
  )
}

/**
 * A lane inside a Figure that holds something of a different kind from the rows
 * beside it. It carries a fill rather than a heavier border: a second border
 * weight would read as a second level of grouping, and there is only one.
 */
export function FigureAside({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex shrink-0 flex-col gap-3 border-t border-border-subtle bg-surface-subtle px-4 py-3 md:border-t-0 md:border-l ${className}`}
    >
      {children}
    </div>
  )
}

/** Names a lane or a column. Never a value — only what the slot beneath it is. */
export function FigureLabel({ children }: { children: React.ReactNode }) {
  return <div className="type-eyebrow text-text-subtle">{children}</div>
}

export type Term = { label: string; href?: string }

/**
 * The sub-categories of one thing, as a run rather than a list. A list would
 * give each term a line and turn five short words into five rows, which is what
 * makes an inventory look longer than the thing it inventories.
 *
 * The separator is hidden from assistive technology: it is a visual join, and
 * read aloud it interrupts every term.
 */
export function Terms({ items }: { items: Term[] }) {
  return (
    <span className="type-hint flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-text-subtle">
      {items.map((term, i) => (
        <React.Fragment key={term.label}>
          {i > 0 ? <span aria-hidden="true">&middot;</span> : null}
          {term.href ? (
            <Link
              href={term.href}
              className="text-text-subtle no-underline hover:text-text-strong"
            >
              {term.label}
            </Link>
          ) : (
            <span>{term.label}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  )
}

/**
 * One segment of something being taken apart — a layer of a stack, a part of a
 * name. The label above it says what the slot is, the body says what is in it,
 * and the note below says what question it answers.
 */
export function FigureSlot({
  label,
  value,
  note,
  className = "",
}: {
  label: string
  value: React.ReactNode
  note?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 px-4 py-3 ${className}`}>
      <FigureLabel>{label}</FigureLabel>
      <div className="type-code text-text-strong">{value}</div>
      {note ? <div className="type-hint text-text-subtle">{note}</div> : null}
    </div>
  )
}
