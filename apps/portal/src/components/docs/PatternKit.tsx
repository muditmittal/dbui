import * as React from "react"

import { Code, RefTable } from "@/components/docs/Prose"
import { Guidance } from "@/components/docs/Guidance"
import type { Pattern } from "@/components/patterns-data"

/**
 * Renderers for the Patterns page.
 *
 * `patterns-data.ts` holds nothing but strings so the same objects can be
 * emitted as JSON for the CLI and the MCP server. Formatting therefore has to
 * happen here: a cell writes `Table` in backticks and this module turns it into
 * the code style, the way a JSDoc tag does.
 *
 * Nothing here sets a measure. The docs column is capped once, on `<article>`
 * in `app/docs/layout.tsx`.
 */

/** Backtick spans become inline code. No other markup is supported, on purpose. */
function ticks(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <Code key={i}>{part.slice(1, -1)}</Code>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  )
}

/** A slot label. Every pattern renders the same set in the same order. */
function SlotLabel({ children }: { children: React.ReactNode }) {
  return <div className="type-eyebrow text-text-subtle">{children}</div>
}

/**
 * Reach for it, and reach for something else. Stacked rather than side by side
 * for the same reason `Guidance` is: the two lists are independent, and columns
 * ask the reader to pair items that do not pair.
 */
function Decision({ use, avoid }: { use: string[]; avoid: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {[
        { label: "Reach for it when", items: use },
        { label: "Reach for something else when", items: avoid },
      ].map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <div className="type-label-bold text-text-strong">{group.label}</div>
          <ul className="flex flex-col gap-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {group.items.map((item) => (
              <li key={item} className="type-body flex gap-2.5 text-text-subtle">
                <span aria-hidden className="text-text-subtle">&mdash;</span>
                <span>{ticks(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Which DBUI components carry the pattern, and what each one is doing there. */
function Anatomy({ parts }: { parts: Pattern["anatomy"] }) {
  return (
    <div className="flex flex-col">
      {parts.map((part) => (
        <div
          key={part.component}
          className="flex flex-col gap-0.5 border-b border-border-subtle py-2 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <span className="type-code w-44 shrink-0 text-text-base">{part.component}</span>
          <span className="type-body text-text-subtle">{ticks(part.role)}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * The reason this page exists. A pattern is a sequence, and a sequence needs a
 * column for when, a column for what renders, and a column for the thing that
 * has to survive it — the invariant is what prose keeps dropping and what an
 * agent has no way to infer.
 */
function Behavior({ rows }: { rows: Pattern["behavior"] }) {
  return (
    <RefTable
      columns={[
        { key: "moment", header: "Moment", width: "w-[26%]" },
        { key: "does", header: "What the interface does", width: "w-[38%]" },
        { key: "invariant", header: "What must stay true", width: "w-[36%]" },
      ]}
      rows={rows.map((row) => ({
        moment: ticks(row.moment),
        does: ticks(row.does),
        invariant: ticks(row.invariant),
      }))}
    />
  )
}

/** What the system cannot do today. Every pattern states it or omits the slot. */
function Gap({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border-base bg-surface-subtle px-4 py-3">
      <div className="type-label-bold text-text-strong">Where DBUI stops</div>
      <p className="type-body mt-1 text-text-subtle">{ticks(String(children))}</p>
    </div>
  )
}

function Slot({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 flex flex-col gap-2.5">
      <SlotLabel>{label}</SlotLabel>
      {children}
    </div>
  )
}

/** One pattern, six slots, always in this order. */
export function PatternEntry({ pattern, index }: { pattern: Pattern; index: number }) {
  return (
    <section id={pattern.id} style={{ margin: 0, scrollMarginTop: "5rem" }}>
      <div className="type-eyebrow flex items-baseline gap-2 text-text-subtle">
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(index).padStart(2, "0")}
        </span>
        <span>{pattern.group}</span>
      </div>

      <h3 className="type-title-3 mt-2 text-text-strong">{pattern.name}</h3>
      <p className="type-paragraph mt-2 text-text-subtle">{pattern.intent}</p>

      <Slot label="Decision">
        <Decision use={pattern.use} avoid={pattern.avoid} />
      </Slot>

      <Slot label="Anatomy">
        <Anatomy parts={pattern.anatomy} />
      </Slot>

      <Slot label="Behavior">
        <Behavior rows={pattern.behavior} />
      </Slot>

      {pattern.gap ? (
        <div className="mt-7">
          <Gap>{pattern.gap}</Gap>
        </div>
      ) : null}

      <Slot label="Guidance">
        <Guidance dos={pattern.dos} donts={pattern.donts} />
      </Slot>
    </section>
  )
}
