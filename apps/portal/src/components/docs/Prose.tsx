import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "dbui/components/ui/table"

import { anchorOffset } from "./anchor"

/**
 * Primitives for the docs pages written as React rather than MDX — Foundations,
 * Icons, Components, Accessibility. They match the principles and tokens pages,
 * which set their own markup inline.
 *
 * These are deliberately separate from `DocKit`. That module is a client module
 * built for the MDX pages, and it is under active edit for syntax highlighting.
 *
 * Nothing here sets a measure. The docs column is capped once, on `<article>` in
 * `app/docs/layout.tsx`, so every block on every page shares one right edge.
 */

/** Page title and the one sentence that says what the page is for. */
export function DocHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="type-title-1 text-text-strong">{title}</h1>
      <p className="type-paragraph text-text-subtle">{children}</p>
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
  return <p className="type-paragraph text-text-subtle">{children}</p>
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
 * Scrolls inside its own container rather than widening the page, and overrides
 * DBUI's `whitespace-nowrap`: right for a data table, wrong for documentation
 * whose cells hold sentences.
 */
export function RefTable({
  columns,
  rows,
}: {
  columns: Column[]
  rows: Array<Record<string, React.ReactNode>>
}) {
  return (
    <div className="w-full overflow-x-auto">
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
    </div>
  )
}

/**
 * Names the file that owns what the page describes. Every page here renders a
 * source that lives elsewhere in the repo, and a reader who is about to change
 * something needs to know which file to open.
 */
export function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2 border border-border-base bg-surface-subtle px-4 py-3">
      <div className="type-label-bold text-text-strong">Source of truth</div>
      <p className="type-body mt-1 text-text-subtle">{children}</p>
    </div>
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
