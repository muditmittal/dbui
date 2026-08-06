import * as React from "react"
import Link from "next/link"
import { Badge } from "dbui/components/ui/badge"

import { Guidance } from "@/components/docs/Guidance"
import { RefTable } from "@/components/docs/Prose"

/**
 * Renderers for the Voice and tone page.
 *
 * The page is a standard the reader returns to rather than reads through, so it
 * needs anchors and a way in. `Prose.tsx` sets no `id` on a section — every page
 * that used it so far is read top to bottom — so the section wrapper is repeated
 * here with one added.
 *
 * Nothing here sets a measure. The docs column is capped once, on `<article>`
 * in `app/docs/layout.tsx`.
 */

/**
 * The same shape as `DocSection`, plus the anchor. The scroll margin clears the
 * sticky header, which would otherwise sit on top of the heading it just
 * scrolled to.
 */
export function AnchoredSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-14 flex scroll-mt-20 flex-col gap-4">
      <h2 className="type-title-3 text-text-strong">{title}</h2>
      {children}
    </section>
  )
}

/** No anchor of its own. The jump list stops at the section above it. */
export function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 flex flex-col gap-3">
      <h3 className="type-title-4 text-text-strong">{title}</h3>
      {children}
    </section>
  )
}

/**
 * A principle is a short read, not a row. Four columns of principle, meaning,
 * do and don't put four wrapped paragraphs beside each other and asked the
 * reader to rebuild each rule by tracking across them, so each principle gets
 * its own heading and the pair goes to `Guidance`, which is where every
 * do-and-don't in these docs lives.
 */
export function PrincipleEntry({
  name,
  meaning,
  write,
  avoid,
}: {
  name: string
  meaning: string
  write: string
  avoid: string
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="type-title-4 text-text-strong">{name}</h3>
        <p className="type-paragraph text-text-subtle">{meaning}</p>
      </div>
      <Guidance dos={[write]} donts={[avoid]} />
    </section>
  )
}

/**
 * The example is the only thing on this page written in the product's voice
 * rather than about it, so it is set apart as a specimen. Sized to its content:
 * a sample that stretches the full measure reads as a field to fill in.
 */
function Specimen({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-body w-fit max-w-full rounded-1 bg-surface-inset px-2 py-1 text-text-base">
      {children}
    </span>
  )
}

const TONE_VARIANT = {
  Warm: "info",
  Neutral: "outline",
  Cautious: "warning",
} as const

export type Tone = keyof typeof TONE_VARIANT

/**
 * Tone, term, guidance and example were four columns and all four wrapped. The
 * tone is the one field with a fixed vocabulary, so it goes to a badge in a
 * fixed gutter — the same shape `Guidance` uses — and the rest stacks into one
 * column that reads top to bottom.
 */
export function ToneEntry({
  tone,
  term,
  guidance,
  example,
}: {
  tone: Tone
  term: string
  guidance: string
  example: string
}) {
  return (
    <div className="flex items-start gap-4 px-4 py-3">
      <span className="w-20 shrink-0 pt-0.5">
        <Badge variant={TONE_VARIANT[tone]}>{tone}</Badge>
      </span>
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        <span className="type-label-bold text-text-strong">{term}</span>
        <span className="type-body text-text-subtle">{guidance}</span>
        <Specimen>{example}</Specimen>
      </div>
    </div>
  )
}

/** The bordered, divided container the entry lists share with `Guidance`. */
export function EntryList({ children }: { children: React.ReactNode }) {
  return (
    <div className="divide-y divide-border-base overflow-hidden rounded-2 border border-border-base">
      {children}
    </div>
  )
}

/**
 * The word lists stay tables. Every cell is a word or a short phrase, the rows
 * are parallel, and there are enough of them that a stacked list would run for
 * pages — this is what a table is for.
 *
 * What the table was missing is weight. All three columns arrived at the same
 * emphasis, so the answer, the thing being replaced and the footnote read as
 * equals. The word to use now leads and the reason recedes.
 */
export function WordTable({
  rows,
  widths,
}: {
  rows: Array<{ use: string; not: string; reason: string }>
  widths: [string, string]
}) {
  return (
    <RefTable
      columns={[
        { key: "use", header: "Use", width: widths[0] },
        { key: "not", header: "Not", width: widths[1] },
        { key: "reason", header: "Reason" },
      ]}
      rows={rows.map((row) => ({
        use: <span className="type-body-bold text-text-strong">{row.use}</span>,
        not: row.not,
        reason: <span className="text-text-subtle">{row.reason}</span>,
      }))}
    />
  )
}

/**
 * One wrapped row rather than a stacked list. The reader is picking a
 * destination, not reading the titles, and a vertical list of nine would cost
 * more height than the first section it is trying to reach.
 */
export function JumpTo({ sections }: { sections: Array<{ id: string; title: string }> }) {
  return (
    <nav
      aria-label="On this page"
      className="rounded-2 border border-border-base bg-surface-subtle px-4 py-3"
    >
      <div className="type-label-bold text-text-strong">On this page</div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="type-body text-text-accent no-underline hover:underline"
          >
            {section.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
