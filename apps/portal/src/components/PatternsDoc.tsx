import * as React from "react"
import Link from "next/link"

import { DocHeader, DocSection, Para, Code, Command, RefTable } from "@/components/docs/Prose"
import { Guidance } from "@/components/docs/Guidance"
import { PatternSpecimen } from "@/components/PatternSpecimens"
import { PATTERNS, PATTERN_GROUPS, DEFERRED, type Pattern } from "@/components/patterns-data"

/**
 * Each pattern is one line of intent, an example of the behavior, and the calls
 * that are easy to get wrong as do-and-don't rows.
 *
 * It used to be a paragraph and a three-column table of moment, what renders and
 * what must stay true. That table was precise and unread: it described behavior
 * in the register of a specification, so a reader looking for a decision had to
 * translate every row before they could act on it. The invariants survived the
 * conversion — they are the clause after the dash in most of the don'ts, which
 * is the only place a reader ever needed them.
 *
 * Two patterns show a table instead of an example, because a ladder of
 * thresholds and a mapping from endpoint to indicator are lookups rather than
 * moments. Two show neither and say why.
 *
 * Nothing here sets a measure. The docs column is capped once, on `<article>`
 * in `app/docs/layout.tsx`.
 */

/**
 * Backtick spans become inline code. No other markup is supported, on purpose:
 * `patterns-data.ts` holds nothing but plain strings so the same objects can be
 * emitted as JSON, and one escape hatch for a component name is the whole budget.
 *
 * `Guidance` renders its rows verbatim, so a do or a don't never carries ticks.
 */
export function ticks(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <Code key={i}>{part.slice(1, -1)}</Code>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  )
}

/** Names the block below it. Used only where the block would otherwise be unlabeled. */
function SlotLabel({ children }: { children: React.ReactNode }) {
  return <div className="type-eyebrow text-text-subtle">{children}</div>
}

/** Which DBUI components carry the pattern, and what each one is doing there. */
function Anatomy({ parts }: { parts: Pattern["anatomy"] }) {
  return (
    <div className="flex flex-col">
      {parts.map((part) => (
        <div
          key={part.component}
          className="flex flex-col gap-0.5 border-b border-border-subtle py-2 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <span className="type-code w-44 shrink-0 text-text-base">{part.component}</span>
          <span className="type-body text-text-subtle">{ticks(part.role)}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * A mapping the reader looks up. Kept as a table only where the pattern really
 * is one — three checkbox states, four rungs of friction, one indicator per kind
 * of endpoint. Converting those to do-and-don't rows loses the mapping.
 */
function States({ states }: { states: NonNullable<Pattern["states"]> }) {
  return (
    <div className="flex flex-col gap-2.5">
      <SlotLabel>{states.label}</SlotLabel>
      <RefTable
        columns={states.columns.map((header, i) => ({
          key: String(i),
          header,
          width: states.columns.length === 2 ? "w-1/2" : undefined,
        }))}
        rows={states.rows.map((row) =>
          Object.fromEntries(row.map((cell, i) => [String(i), ticks(cell)]))
        )}
      />
    </div>
  )
}

/** What the system cannot do today. Every pattern states it or omits the slot. */
function Gap({ children }: { children: string }) {
  return (
    <div className="rounded-2 border border-border-base bg-surface-subtle px-4 py-3">
      <div className="type-label-bold text-text-strong">Where DBUI stops</div>
      <p className="type-body mt-1 text-text-subtle">{ticks(children)}</p>
    </div>
  )
}

/** Why a pattern has no example. Placed where the example would have been. */
function NoSpecimen({ children }: { children: string }) {
  return (
    <div className="border-l border-border-base pl-4">
      <p className="type-body text-text-subtle">{ticks(children)}</p>
    </div>
  )
}

function PatternEntry({ pattern, index }: { pattern: Pattern; index: number }) {
  return (
    <section id={pattern.id} style={{ margin: 0, scrollMarginTop: "5rem" }}>
      {/*
        The number only. The group is the heading two lines up, so naming it
        again here was the page telling the reader something they had just read.
      */}
      <div className="type-eyebrow text-text-subtle" style={{ fontVariantNumeric: "tabular-nums" }}>
        {String(index).padStart(2, "0")}
      </div>

      <h3 className="type-title-3 mt-1 text-text-strong">{pattern.name}</h3>
      <p className="type-paragraph mt-2 text-text-subtle">{pattern.intent}</p>

      <div className="mt-6 flex flex-col gap-6">
        {pattern.specimen ? <PatternSpecimen id={pattern.specimen} /> : null}
        {pattern.noSpecimen ? <NoSpecimen>{pattern.noSpecimen}</NoSpecimen> : null}

        {pattern.states ? <States states={pattern.states} /> : null}

        <Guidance dos={pattern.dos} donts={pattern.donts} />

        <div className="flex flex-col gap-2.5">
          <SlotLabel>Anatomy</SlotLabel>
          <Anatomy parts={pattern.anatomy} />
        </div>

        {pattern.gap ? <Gap>{pattern.gap}</Gap> : null}
      </div>
    </section>
  )
}

export function PatternsDoc() {
  return (
    <>
      <DocHeader title="Patterns">
        Recurring behavior — what the interface does, in what order, and what has to stay true
        while it happens.
      </DocHeader>

      <DocSection title="The set">
        <Para>
          Patterns compose. Bulk selection sits on top of filtering, and a destructive action at
          scale is bulk selection plus a confirmation ladder plus a long-running operation. Where
          two meet, the narrower one wins.
        </Para>
        <div className="flex flex-col">
          {PATTERNS.map((pattern, i) => (
            <Link
              key={pattern.id}
              href={`#${pattern.id}`}
              className="flex items-baseline gap-x-5 gap-y-0.5 border-b border-border-subtle px-3 py-3 no-underline transition-colors hover:bg-surface-hover"
            >
              <span className="type-hint w-5 shrink-0 text-text-subtle tabular-nums">{i + 1}</span>
              {/*
                Stacks below sm. Two columns at 400px gave the summary four
                wrapped lines against a one-line name, which made an eight-row
                index read as the longest block on the page.
              */}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="type-label-bold shrink-0 text-text-strong sm:w-56">
                  {pattern.name}
                </span>
                <span className="type-body text-text-subtle">{pattern.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      </DocSection>

      {PATTERN_GROUPS.map((group) => {
        const members = PATTERNS.filter((p) => p.group === group.name)
        if (members.length === 0) return null

        return (
          <DocSection key={group.name} title={group.name}>
            <Para>{group.summary}</Para>
            <div className="mt-6 flex flex-col gap-16">
              {members.map((pattern) => (
                <PatternEntry
                  key={pattern.id}
                  pattern={pattern}
                  index={PATTERNS.indexOf(pattern) + 1}
                />
              ))}
            </div>
          </DocSection>
        )
      })}

      <DocSection title="What was left out">
        <Para>
          These belong here and are not here yet. They are listed rather than quietly omitted,
          because a reader who cannot find &ldquo;saving&rdquo; should learn that it is missing on
          purpose.
        </Para>
        <RefTable
          columns={[
            { key: "name", header: "Pattern", width: "w-[28%]" },
            { key: "why", header: "Why not yet", width: "w-[72%]" },
          ]}
          rows={DEFERRED.map((row) => ({ name: row.name, why: ticks(row.why) }))}
        />
      </DocSection>

      <DocSection title="Read the patterns as data">
        <Para>
          Every field behind this page is a plain string in one array, so a pattern can be handed
          to an agent without rendering anything. There is no <Code>dbui pattern</Code> command
          yet, so <Code>patterns-data.ts</Code> is the source and this page is one view of it.
        </Para>
        <Command>yarn dbui search &lt;query&gt; --json</Command>
      </DocSection>
    </>
  )
}
