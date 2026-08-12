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
/**
 * A rule on its own, or a rule paired with the concrete case that shows it.
 *
 * The paired form exists because `header` has always named two columns and the
 * rows only ever rendered one, so "Example" sat above the rules. A page that
 * supplies examples now gets the column it was promised; a page that does not
 * renders exactly as before.
 */
export type GuidanceItem =
  | React.ReactNode
  | { rule: React.ReactNode; example: React.ReactNode }

function split(item: GuidanceItem): { rule: React.ReactNode; example: React.ReactNode | null } {
  if (item && typeof item === "object" && !Array.isArray(item) && "rule" in item) {
    const paired = item as { rule: React.ReactNode; example: React.ReactNode }
    return { rule: paired.rule, example: paired.example }
  }
  return { rule: item as React.ReactNode, example: null }
}

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
  dos: GuidanceItem[]
  donts: GuidanceItem[]
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
    ...dos.map((item) => ({ ...split(item), tone: "do" as const })),
    ...donts.map((item) => ({ ...split(item), tone: "dont" as const })),
  ]
  const paired = rows.some((r) => r.example !== null)

  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {header ? (
        <div className="flex items-start gap-4 border-b border-border-base bg-surface-subtle px-4 py-2">
          {paired ? (
            <>
              {/* The badge column takes no label once there is a real example
                  column — "Rules" over the Do/Don't pills was the header naming
                  the wrong thing. */}
              <span className={`${gutter} shrink-0`} aria-hidden />
              <div className="grid flex-1 gap-x-4 sm:grid-cols-2">
                <span className="type-eyebrow text-text-subtle">{header.rule}</span>
                <span className="type-eyebrow text-text-subtle">{header.example}</span>
              </div>
            </>
          ) : (
            <>
              <span className={`type-eyebrow ${gutter} shrink-0 text-text-subtle`}>
                {header.rule}
              </span>
              <span className="type-eyebrow text-text-subtle">{header.example}</span>
            </>
          )}
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
      {rows.map(({ rule, example, tone }, i) => (
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
          {paired ? (
            // Stacks on narrow widths: a rule and its example are one thought,
            // and two columns squeezed to 20 characters each is not readable.
            <div className="grid flex-1 gap-x-4 gap-y-1 sm:grid-cols-2">
              <span className="type-paragraph text-text-base">{rule}</span>
              {example ? (
                <span className="type-paragraph text-text-subtle">{example}</span>
              ) : (
                <span aria-hidden />
              )}
            </div>
          ) : (
            <span className="type-paragraph text-text-base">{rule}</span>
          )}
        </div>
      ))}
    </div>
  )
}
