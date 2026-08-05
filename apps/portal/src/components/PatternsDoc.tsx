import Link from "next/link"

import { DocHeader, DocSection, Para, Code, Command, RefTable } from "@/components/docs/Prose"
import { PatternEntry, ticks } from "@/components/docs/PatternKit"
import { PATTERNS, PATTERN_GROUPS, DEFERRED } from "@/components/patterns-data"

/**
 * A pattern is a sequence, not a picture. Every entry therefore renders the
 * same six slots in the same order, and the behavior table is the widest of
 * them — moment, what renders, what has to survive.
 *
 * The page carries no live specimens. A demo of a filter bar shows a filter bar
 * and says nothing about what happens when re-filtering takes two seconds, so
 * it costs the reader calm and returns nothing the table did not already say.
 */

const SLOTS = [
  {
    slot: "Intent",
    answers: "What goes wrong without it",
    note: "One paragraph, and it names the failure rather than the feature.",
  },
  {
    slot: "Decision",
    answers: "Whether this is the pattern",
    note: "Two lists. The second one points at the pattern or component to use instead.",
  },
  {
    slot: "Anatomy",
    answers: "Which parts build it",
    note: "DBUI exports only, each with the job it is doing here.",
  },
  {
    slot: "Behavior",
    answers: "What happens, when, and what survives it",
    note: "The load-bearing slot. Moments in the order they occur, including the ones that go wrong.",
  },
  {
    slot: "Where DBUI stops",
    answers: "What the system cannot express today",
    note: "Present whenever there is a gap. Absent means the pattern is fully supported.",
  },
  {
    slot: "Guidance",
    answers: "The calls that are easy to get wrong",
    note: "Independent points, not mirrored pairs.",
  },
]

export function PatternsDoc() {
  return (
    <>
      <DocHeader title="Patterns">
        Recurring behavior — what the interface does, in what order, and what has to stay true
        while it happens.
      </DocHeader>

      <DocSection title="What a pattern is here">
        <Para>
          A component is a thing. A pattern is a sequence. Nothing on this page can be settled by
          looking at a screenshot, because the decisions live in the transitions — what shows while
          a query is too slow to be instant but too fast to walk away from, what happens to a
          selection when the filter under it changes, which of forty operations is allowed to fail
          without failing the other thirty-nine.
        </Para>
        <Para>
          So every pattern is written as a state machine rather than a layout. The behavior table is
          the pattern. Read it first, and read the rest only if you are building the thing.
        </Para>
      </DocSection>

      <DocSection title="How to read one">
        <RefTable
          columns={[
            { key: "slot", header: "Slot", width: "w-[22%]" },
            { key: "answers", header: "Answers", width: "w-[30%]" },
            { key: "note", header: "Note", width: "w-[48%]" },
          ]}
          rows={SLOTS}
        />
        <Para>
          Patterns compose. Bulk selection almost always sits on top of filtering, and a destructive
          action at scale is bulk selection plus a confirmation ladder plus a long-running
          operation. Where two patterns meet, the behavior table of the narrower one wins.
        </Para>
      </DocSection>

      <DocSection title="The set">
        <div className="flex flex-col">
          {PATTERNS.map((pattern, i) => (
            <Link
              key={pattern.id}
              href={`#${pattern.id}`}
              className="flex items-baseline gap-5 border-b border-border-subtle px-3 py-3 no-underline transition-colors hover:bg-surface-hover"
            >
              <span className="type-hint w-5 shrink-0 text-text-subtle tabular-nums">{i + 1}</span>
              <span className="type-label-bold w-56 shrink-0 text-text-strong">{pattern.name}</span>
              <span className="type-body text-text-subtle">{pattern.summary}</span>
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
            <div className="mt-6 flex flex-col gap-14">
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
          Seven patterns that belong on this page are not on it. In almost every case the reason is
          the same: DBUI has nothing to hang them on, so the entry would be a heading followed by a
          gap. They are listed rather than quietly omitted, because a reader who cannot find
          &ldquo;saving&rdquo; here should learn that it is missing on purpose.
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
          Every field behind this page is a plain string in one array, so a pattern can be handed to
          an agent without rendering anything. The behavior table is the part that matters here: three
          named columns and one row per moment serialize without loss, which is exactly what a prose
          description of the same sequence cannot do.
        </Para>
        <Command>yarn dbui search &lt;query&gt; --json</Command>
        <Para>
          There is no <Code>dbui pattern</Code> command yet. Until there is, the array in{" "}
          <Code>patterns-data.ts</Code> is the source and this page is one view of it. The shape a
          pattern should take over the CLI and MCP — and how it should reach an agent from a
          component&rsquo;s own JSDoc — is an open question, not a decided one.
        </Para>
      </DocSection>
    </>
  )
}
