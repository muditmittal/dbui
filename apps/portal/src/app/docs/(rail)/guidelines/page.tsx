import Link from "next/link"

import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { Guidance } from "@/components/docs/Guidance"
import { DocHeader, Para } from "@/components/docs/Prose"

import { GUIDELINES, type Source } from "./guidelines-data"

export const metadata = { title: "Guidelines — DBUI" }

/**
 * The guidelines page.
 *
 * Thirteen surfaces a data and AI workbench is made of, rendered in the same
 * shape as `/docs/principles` and `/docs/constraints` — an aspect, a claim, and
 * a do-and-don't set behind a disclosure. Three pages that look alike on
 * purpose: a reader who has learned to read one can read the others without
 * being taught again.
 *
 * What this page adds to those two is a citation. Principles and constraints
 * are ours and are argued from the system's own position; a guideline is only
 * here because something published says so, and the source renders next to the
 * rules rather than in a footnote. That is the whole reason the page can claim
 * authority, so `sources` is required in the data and a row without one does
 * not belong.
 *
 * `evidence` renders, and it renders as a caveat rather than a badge of
 * quality. Two topics are marked thin because the published record is thin —
 * saying so where a reader will see it is the point, and it is the same
 * discipline `research/ux-standards/` applies to itself.
 *
 * `appliesWhen` does not render. It is for review prep, which uses it to decide
 * that a lineage widget does not owe the filtering guidelines, and it is in the
 * data because the CLI is meant to lift the array unchanged.
 */

/**
 * An inline link inside prose. The docs pages style links at the call site
 * rather than setting a rule for `a`, so an unstyled `<Link>` renders as body
 * text and stops looking like a link.
 */
function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-text-accent no-underline hover:underline">
      {children}
    </Link>
  )
}

/**
 * The sources for one guideline, under its rules.
 *
 * Outbound and plain — no favicon, no card. A reader either wants to open the
 * standard or does not, and the row above it is what they came for. The list
 * carries no bucket letter either: the reuse bucket governs what *we* may
 * publish, which is a maintainer's problem and not a reader's.
 */
function Sources({ sources, thin }: { sources: Source[]; thin: boolean }) {
  return (
    <div className="mt-6 border-t border-border-subtle pt-4">
      <span className="type-eyebrow text-text-subtle">Sources</span>
      <ul className="mt-2 flex flex-col gap-1">
        {sources.map((source) => (
          <li key={source.url} className="type-label">
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-text-accent no-underline hover:underline"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
      {thin && (
        <p className="type-body mt-3 text-text-subtle">
          The published record on this topic is thin. These rules carry more of our judgment than
          the others, and they should be argued rather than cited.
        </p>
      )}
    </div>
  )
}

export default function GuidelinesPage() {
  return (
    <>
      <DocHeader title="Guidelines">
        What good looks like on the surfaces this product is made of.
      </DocHeader>

      {/* `Para` carries no vertical margin — the docs column styles `p` for
          measure alone, and consecutive paragraphs get their rhythm from a flex
          parent. `DocSection` supplies one; a page opening straight into prose
          does not, so two Paras render as one block without this. */}
      <div className="flex flex-col gap-3">
        <Para>
          <DocLink href="/docs/principles">Principles</DocLink> decide between two defensible
          designs and <DocLink href="/docs/constraints">constraints</DocLink> rule one out. Both are
          about how to think. A guideline is about one surface — a run that takes nine minutes, a
          graph, an assistant that is sometimes wrong — and each one cites the published standard it
          rests on.
        </Para>

        <Para>
          None of these is enforced. <DocLink href="/docs/standards">Standards</DocLink> owns
          everything a linter can settle, and nothing here restates a rule from it. A guideline that
          becomes checkable moves.
        </Para>
      </div>

      <DocAccordion variant="card" className="mt-10">
        {GUIDELINES.map((guideline, i) => (
          <DocAccordionItem
            key={guideline.aspect}
            variant="card"
            value={guideline.aspect}
            header={
              <>
                <span className="type-eyebrow flex items-baseline gap-2 text-text-subtle">
                  {/* Tabular figures keep the thirteen numbers in one column. */}
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{guideline.aspect}</span>
                </span>
                <span className="type-title-4 text-text-strong">{guideline.statement}</span>
                {/* A span because the trigger's header is a flex column, which
                    puts it outside the docs column's `p, li, figcaption`
                    default. No `measure` — the card is already the narrower
                    container, and two caps compound. See PrinciplesDoc. */}
                <span className="type-paragraph text-text-subtle">{guideline.meaning}</span>
              </>
            }
          >
            <Guidance
              dos={guideline.dos}
              donts={guideline.donts}
              header={{ rule: "Rules", example: "Example" }}
            />
            <Sources sources={guideline.sources} thin={guideline.evidence === "thin"} />
          </DocAccordionItem>
        ))}
      </DocAccordion>
    </>
  )
}
