import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "dbui/components/ui/table"

import { anchorOffset } from "./anchor"

/**
 * Primitives for the docs pages written as React rather than MDX — Foundations,
 * Icons, Components, Accessibility, and now Principles and Tokens too, which
 * used to set their own header markup inline and had drifted apart from this one
 * by a few pixels each.
 *
 * These are deliberately separate from `DocKit`. That module is a client module
 * built for the MDX pages, and it is under active edit for syntax highlighting.
 *
 * The article in `app/docs/layout.tsx` caps the column; the primitives that
 * carry running text add `measure` on top of it, so prose breaks at a readable
 * line while tables and figures keep the full width. It goes on the primitive
 * rather than on the article because only the primitive knows which of its
 * `type-paragraph` elements is a paragraph and which is a table cell — a
 * descendant rule at the layout level cannot tell those apart. A page that
 * writes its prose through `DocHeader` and `Para` therefore gets the measure
 * without asking for it.
 *
 * There is no `SourceNote` any more. Ten pages ended with a boxed "Source of
 * truth" naming the file behind them — `composition.md`, `theme.config.mjs`, a
 * generator script. That is the repository's internal arrangement, and the site
 * is the thing a reader is meant to trust; a footer citing a file they cannot
 * open reads as a disclaimer on the page above it. What those notes said that a
 * reader actually needed is now in the pages themselves.
 */

/**
 * Page title and the one sentence that says what the page is for.
 *
 * Every page goes through here, including the two that used to write this markup
 * inline: Principles set the title-to-deck gap to 8px and Tokens to 12px against
 * this one's 16px. Three spacings for one relationship, and none of them wrong
 * on its own — the kind of drift a second copy produces, visible only by loading
 * two pages one after the other.
 *
 * The deck takes the whole column rather than the measure, which is what
 * `deck-column` says. The measure is sized for running text and the deck is not
 * that — it is one sentence under a title, and capping it at 46ch broke the short
 * ones onto a second line holding a single word. Long decks are the argument for
 * the cap, so if one needs three lines at the full column it is too long to be a
 * deck.
 *
 * It names the column rather than saying `max-w-none`, which is what it used to
 * say. That worked only while every docs page was 44rem wide, so "none" meant "the
 * column" by accident of the container. Tokens and Icons now render in `(wide)`
 * with no container cap, where "none" meant 1104px and the deck ran past 150
 * characters.
 */
export function DocHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="type-title-1 text-text-strong">{title}</h1>
      <p className="deck-column type-paragraph text-text-subtle">{children}</p>
    </header>
  )
}

/**
 * Space goes between sections, not inside them. A heading, its opening sentence
 * and its table are one unit; the gap above separates that unit from the next.
 *
 * An `id` makes the section a jump target, and it brings the scroll margin with
 * it. The offset is measured by the page's sticky bar rather than assumed, so a
 * heading lands below the chrome at every type scale; without a bar the fallback
 * still clears the site header.
 */
export function DocSection({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} style={id ? anchorOffset : undefined} className="mt-14 flex flex-col gap-4">
      <h2 className="type-title-3 text-text-strong">{title}</h2>
      {children}
    </section>
  )
}

export function DocSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 flex flex-col gap-3">
      <h3 className="type-title-4 text-text-strong">{title}</h3>
      {children}
    </section>
  )
}

export function Para({ children }: { children: React.ReactNode }) {
  return <p className="type-paragraph measure text-text-subtle">{children}</p>
}

/** Inline code, on the code text style. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="type-code rounded-1 bg-surface-inset px-1 py-0.5 text-text-base">
      {children}
    </code>
  )
}

type Column = { key: string; header: string; width?: string; mono?: boolean }

/**
 * Overrides DBUI's `whitespace-nowrap`: right for a data table, wrong for
 * documentation whose cells hold sentences. Wrapping is also why no scroll
 * container is needed here, which matters — a scroll container is what `Table`
 * would have to pin its header against, and one this size never scrolls.
 */
export function RefTable({
  columns,
  rows,
}: {
  columns: Column[]
  rows: Array<Record<string, React.ReactNode>>
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead
              key={c.key}
              className={`type-label-bold h-auto py-2.5 align-bottom whitespace-normal! ${c.width ?? ""}`}
            >
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {columns.map((c) => (
              <TableCell
                key={c.key}
                className={`py-2.5 align-top whitespace-normal! ${
                  c.mono ? "type-code text-text-base" : "type-body text-text-base"
                }`}
              >
                {row[c.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** A command to run, shown as the answer to "where do I get this as data?". */
export function Command({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2 border border-border-base bg-surface-inset px-4 py-3">
      <code className="type-code text-text-base">{children}</code>
    </div>
  )
}
