import Link from "next/link"

import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { Guidance } from "@/components/docs/Guidance"
import { DocHeader, Para } from "@/components/docs/Prose"

import { CONSTRAINTS } from "./constraints-data"

export const metadata = { title: "Constraints — DBUI" }

/**
 * The constraints page.
 *
 * Five lines the system does not cross, rendered in the same shape as
 * `/docs/principles` — an aspect, a claim, and a do-and-don't set that opens
 * behind a disclosure. The two pages look alike on purpose: they are the two
 * halves of one answer, and a reader who has learned to read one can read the
 * other without being taught twice.
 *
 * What they are not is each other's negative. That version of this page existed
 * until 2026-08-08 and is why this one was rewritten — seven of its seventeen
 * entries restated a don't already on `/docs/principles`. `constraints-data.ts`
 * carries the full account, and `notes/constraints-page-cuts.md` holds the
 * retired rows with the owner each moved to.
 *
 * `broken` and `check` are in the data and are not rendered. They are the bar
 * for being on this page rather than something a reader acts on, which is the
 * same relationship `buys` had to the set this replaced.
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

export default function ConstraintsPage() {
  return (
    <>
      <DocHeader title="Constraints">
        What the system will not do. People act on this data and are accountable for it, so each
        line below closes off a way the interface could mislead them.
      </DocHeader>

      <Para>
        Craft is not here. <DocLink href="/docs/principles">Design principles</DocLink> decides
        between two designs that are both defensible; a constraint is the line that does not bend
        when a deadline argues with it. Nothing below is machine-checked — no rule in the React
        linter reads structure, behavior or intent — so each one names the observation that proves
        it was crossed, and a person is what sees it.
      </Para>

      <DocAccordion variant="card" className="mt-10">
        {CONSTRAINTS.map((constraint, i) => (
          <DocAccordionItem
            key={constraint.aspect}
            variant="card"
            value={constraint.aspect}
            header={
              <>
                <span className="type-eyebrow flex items-baseline gap-2 text-text-subtle">
                  {/* Tabular figures keep the five numbers in one column. */}
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{constraint.aspect}</span>
                </span>
                <span className="type-title-4 text-text-strong">{constraint.statement}</span>
                {/* A span because the trigger's header is a flex column, which
                    puts it outside the docs column's `p, li, figcaption`
                    default. It is still the paragraph a reader reads before
                    opening anything, so it takes the measure explicitly. */}
                <span className="type-paragraph measure text-text-subtle">
                  {constraint.meaning}
                </span>
              </>
            }
          >
            <Guidance
              dos={constraint.dos}
              donts={constraint.donts}
              header={{ rule: "Rules", example: "Example" }}
            />
          </DocAccordionItem>
        ))}
      </DocAccordion>
    </>
  )
}
