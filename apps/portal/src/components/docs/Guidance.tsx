import { Badge } from "dbui"

/**
 * One stacked list rather than two columns. The columns were only earning their
 * keep while every do had a mirrored don't; once the items became independent,
 * side-by-side asked the reader to compare things that were not comparable.
 *
 * Extracted from PrinciplesDoc so every page that gives do-and-don't guidance
 * renders it the same way. Two renderers drift.
 */
export function Guidance({ dos, donts }: { dos: string[]; donts: string[] }) {
  const rows = [
    ...dos.map((text) => ({ text, tone: "do" as const })),
    ...donts.map((text) => ({ text, tone: "dont" as const })),
  ]

  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {rows.map(({ text, tone }, i) => (
        <div
          key={text}
          className={`flex items-start gap-4 px-4 py-2.5 ${
            i < rows.length - 1 ? "border-b border-border-base" : ""
          }`}
        >
          {/* Fixed gutter rather than a fixed pill width: the two labels are
              different lengths, and the text column is what needs to line up. */}
          <span className="w-14 shrink-0">
            <Badge variant={tone === "do" ? "positive" : "negative"}>
              {tone === "do" ? "Do" : "Don't"}
            </Badge>
          </span>
          <span className="type-body text-text-base">{text}</span>
        </div>
      ))}
    </div>
  )
}
