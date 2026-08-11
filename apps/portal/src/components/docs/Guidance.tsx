import type * as React from "react"

import { Badge } from "dbui"

/**
 * One stacked list rather than two columns. The columns were only earning their
 * keep while every do had a mirrored don't; once the items became independent,
 * side-by-side asked the reader to compare things that were not comparable.
 *
 * Extracted from PrinciplesDoc so every page that gives do-and-don't guidance
 * renders it the same way. Two renderers drift.
 *
 * `header` is opt-in. A guidance list that sits alone under a heading needs no
 * column names, but one that opens out of an accordion arrives with no run-up,
 * so the two columns say what they are — the same header row every other table
 * in the product carries.
 */
export function Guidance({
  dos,
  donts,
  header,
  gutter = "w-14",
}: {
  /**
   * Nodes rather than strings, so a rule can name the file it is about and link
   * to it. Most items are still plain text and read better that way — a rule
   * with two links in it is a paragraph wearing a badge.
   */
  dos: React.ReactNode[]
  donts: React.ReactNode[]
  header?: { rule: string; example: string }
  /**
   * A width utility for the badge column. Defaults to the badges' own size, which
   * is right for a list that stands alone.
   *
   * Widen it when this sits directly under another table that has a left column of
   * its own — the two share an outer edge, so matching the gutter is what puts both
   * text columns on the same line. The caller passes the width because the caller
   * is the one that knows what it is aligning to.
   */
  gutter?: string
}) {
  const rows = [
    ...dos.map((text) => ({ text, tone: "do" as const })),
    ...donts.map((text) => ({ text, tone: "dont" as const })),
  ]

  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {header ? (
        <div className="flex items-start gap-4 border-b border-border-base bg-surface-subtle px-4 py-2">
          <span className={`type-eyebrow ${gutter} shrink-0 text-text-subtle`}>{header.rule}</span>
          <span className="type-eyebrow text-text-subtle">{header.example}</span>
        </div>
      ) : null}
      {/* Keyed by position, because an item is no longer guaranteed to be a
          string. These lists are written out in full at the call site and never
          reordered at runtime, so the index is stable. */}
      {/*
        `py-4` rather than `py-2`, and the reading style rather than the interface
        one. A rule is the only thing on these pages that has to be read rather than
        scanned — the tables around it are for finding a name — and `type-body` was
        sized for a single line in a control. `type-paragraph` is the Reading
        register: two steps up, and 22px of line where there was 20.
      */}
      {rows.map(({ text, tone }, i) => (
        <div
          key={i}
          className={`flex items-start gap-4 px-4 py-4 ${
            i < rows.length - 1 ? "border-b border-border-base" : ""
          }`}
        >
          {/* Fixed gutter rather than a fixed pill width: the two labels are
              different lengths, and the text column is what needs to line up.
              `mt-0.5` optically centers the 20px badge on the first 22px line —
              `items-start` alone hangs it a touch high against reading text. */}
          <span className={`${gutter} mt-0.5 shrink-0`}>
            <Badge variant={tone === "do" ? "positive" : "negative"}>
              {tone === "do" ? "Do" : "Don't"}
            </Badge>
          </span>
          <span className="type-paragraph text-text-base">{text}</span>
        </div>
      ))}
    </div>
  )
}
