import * as React from "react"
import { Badge } from "dbui/components/ui/badge"

import { DocAccordionItem } from "@/components/docs/DocAccordion"
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

/** No anchor of its own. The section above it owns the jump target. */
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
 * reader to rebuild each rule by tracking across them, so the name and the
 * meaning become the disclosure header and the pair goes to `Guidance`, which
 * is where every do-and-don't in these docs lives.
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
    <DocAccordionItem
      variant="list"
      value={name}
      header={
        <>
          <span className="type-title-4 text-text-strong">{name}</span>
          {/* Same as the principles cards: a flex-column header slot, so the
              docs column's element default does not reach it, and no `measure`
              because the card already caps the line. */}
          <span className="type-paragraph text-text-subtle">{meaning}</span>
        </>
      }
    >
      <Guidance dos={[write]} donts={[avoid]} header={{ rule: "Rules", example: "Example" }} />
    </DocAccordionItem>
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

export type Moment = { term: string; guidance: string; example: string }

/**
 * The scale as one object rather than three rows. Tone is a continuum and the
 * table never said so — a reader met Warm, Neutral and Cautious as three
 * unrelated labels and had to infer the axis they sit on.
 *
 * The rail is three token bands, not the mixed gradient the mock draws. Nine
 * hand-mixed steps would be nine colors nothing else in the system declares,
 * and a decorative ramp is not worth a private palette.
 */
export function ToneScale({ zones }: { zones: Array<{ tone: Tone; where: string }> }) {
  const band = {
    Warm: "bg-status-surface-info",
    Neutral: "bg-surface-base",
    Cautious: "bg-status-surface-warning",
  } as const

  return (
    <div className="flex flex-col gap-4 rounded-2 bg-surface-subtle px-6 py-8">
      <div className="flex">
        {zones.map((zone) => (
          <span
            key={zone.tone}
            className="type-label-bold flex-1 text-center text-text-strong"
          >
            {zone.where}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex h-12 overflow-hidden rounded-full border border-border-base"
      >
        {zones.map((zone) => (
          <span key={zone.tone} className={`flex-1 ${band[zone.tone]}`} />
        ))}
      </div>
      <div className="flex">
        {zones.map((zone) => (
          <span key={zone.tone} className="flex flex-1 justify-center">
            <Badge variant={TONE_VARIANT[zone.tone]}>{zone.tone}</Badge>
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * The moments a tone governs, listed under the tone rather than in a table of
 * their own. Read as one flat table, a moment sat next to every other one it
 * had nothing to do with and the tone column did all the sorting; read under
 * its tone, the grouping is the point.
 *
 * This list is the tone's only set of examples. The panel used to open with a
 * standalone specimen and then repeat it here under an "In UI context" heading,
 * which read as two kinds of example and was one — for Cautious, literally the
 * same sentence twice.
 */
function MomentList({ moments }: { moments: Moment[] }) {
  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {moments.map((moment, i) => (
        <div
          key={moment.term}
          className={`flex flex-col items-start gap-1 px-4 py-3 ${
            i < moments.length - 1 ? "border-b border-border-base" : ""
          }`}
        >
          <span className="type-label-bold text-text-strong">{moment.term}</span>
          <span className="type-body text-text-subtle">{moment.guidance}</span>
          <Specimen>{moment.example}</Specimen>
        </div>
      ))}
    </div>
  )
}

/**
 * Tone, term, guidance and example were four columns and all four wrapped. The
 * tone is the one field with a fixed vocabulary, so it goes to a badge in a
 * fixed gutter — the same shape `Guidance` uses — and the rest becomes the
 * disclosure header, with the moments it governs behind it.
 *
 * The header states what the tone is for, so the panel owes the reader
 * evidence rather than a restatement: it holds the moments and nothing else.
 */
export function ToneEntry({
  tone,
  term,
  guidance,
  moments,
}: {
  tone: Tone
  term: string
  guidance: string
  moments: Moment[]
}) {
  return (
    <DocAccordionItem
      variant="list"
      value={tone}
      header={
        <span className="flex w-full items-start gap-4">
          <span className="w-20 shrink-0">
            <Badge variant={TONE_VARIANT[tone]}>{tone}</Badge>
          </span>
          <span className="flex min-w-0 flex-col items-start gap-1">
            <span className="type-label-bold text-text-strong">{term}</span>
            <span className="type-body text-text-subtle">{guidance}</span>
          </span>
        </span>
      }
    >
      <MomentList moments={moments} />
    </DocAccordionItem>
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
