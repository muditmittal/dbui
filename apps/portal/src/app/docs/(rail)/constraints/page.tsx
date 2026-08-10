import * as React from "react"
import Link from "next/link"

import { DocHeader, DocSection, DocSubsection, Para, Code, Command, RefTable, SourceNote } from "@/components/docs/Prose"
import { Guidance } from "@/components/docs/Guidance"
import {
  FRAME_RULES,
  PAGE_RULES,
  SCROLL_RULES,
  PANEL_RULES,
  RHYTHM_RULES,
} from "@/components/layout-rules"
import { PATTERNS } from "@/components/patterns-data"
import { CONSTRAINTS, CONSTRAINT_GROUPS, CUT, type Constraint } from "./constraints-data"

export const metadata = { title: "Constraints — DBUI" }

/**
 * The constraints page.
 *
 * A rule says what to type. A constraint says what the system will not do, and
 * therefore what may be relied on without checking. The linter owns the first
 * kind and this page owns the second — but only the second kind that no single
 * file already owns, which is why the layout rules are counted here and not
 * restated. Duplicating them is the drift `CONTRIBUTING.md` exists to prevent.
 *
 * Every row was mined rather than written: from the patterns' invariants, the
 * `@constraint` JSDoc across the packages, `composition.md`, `DESIGN.md` and
 * the principles. Nothing here is new policy. What is new is the form — a
 * closure, what it buys, and the observation that proves it was ignored.
 *
 * The data lives beside this file rather than in `src/components/`, so the
 * route is self-contained and the array can be lifted into the CLI unchanged.
 *
 * Nothing sets a measure. The docs column is capped once, on `<article>` in
 * `app/docs/layout.tsx`.
 */

/** Backtick spans become inline code. No other markup, so the data stays serializable. */
function ticks(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <Code key={i}>{part.slice(1, -1)}</Code>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  )
}

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

function Slot({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="type-eyebrow w-24 shrink-0 pt-1 text-text-subtle">{label}</span>
      <span className="type-body text-text-base">{children}</span>
    </div>
  )
}

const CHECK_LABEL: Record<Constraint["check"], string> = {
  screen: "on screen",
  review: "in the diff",
}

/**
 * A constraint, in three slots and a fourth where the system contradicts it.
 *
 * The identifier renders because these get cited — in a review, in a commit
 * message, in an agent's own reasoning — and a constraint that has to be quoted
 * in full to be referred to gets paraphrased instead.
 */
function ConstraintList({ items }: { items: Constraint[] }) {
  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {items.map((c) => (
        <div key={c.id} className="flex flex-col gap-3 border-b border-border-base px-4 py-4 last:border-b-0">
          <div className="flex items-baseline gap-4">
            <span className="type-code w-8 shrink-0 text-text-subtle tabular-nums">{c.id}</span>
            <h4 className="type-label-bold m-0 min-w-0 flex-1 text-text-strong">{c.statement}</h4>
            <span className="type-hint hidden shrink-0 text-text-subtle sm:block">
              {c.principle ? `${c.principle} · ` : ""}
              {CHECK_LABEL[c.check]}
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:pl-10">
            <Slot label="Forbids">{ticks(c.forbids)}</Slot>
            <Slot label="Buys">{ticks(c.buys)}</Slot>
            <Slot label="Broken when">{ticks(c.broken)}</Slot>
            {c.gap ? <Slot label="System gap">{ticks(c.gap)}</Slot> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

/** What the system cannot hold. Same treatment the layout and patterns pages give it. */
function Gap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border-subtle py-3 last:border-b-0 sm:flex-row sm:gap-6">
      <span className="type-label-bold w-48 shrink-0 text-text-strong">{title}</span>
      <span className="type-body text-text-subtle">{children}</span>
    </div>
  )
}

export default function ConstraintsPage() {
  const layoutRuleCount =
    FRAME_RULES.length +
    PAGE_RULES.length +
    SCROLL_RULES.length +
    PANEL_RULES.length +
    RHYTHM_RULES.length
  const unheld = CONSTRAINTS.filter((c) => c.gap)

  return (
    <>
      <DocHeader title="Constraints">
        What the system will not do, so that everything built on it can rely on what it will.
      </DocHeader>

      <div className="mt-8 flex flex-col gap-6">
        <Para>
          A design system is consistent because it repeats itself. It is good because it refuses
          things. A refusal is worth more than a convention, because a convention has to be checked
          every time and a refusal only has to be read once.
        </Para>
        <Para>
          That matters most for an agent. Given a component and no constraint, a model invents a
          reasonable answer, and the next model invents a different reasonable answer. Given a
          closure it stops inventing. Every entry below exists to remove a decision rather than to
          inform one.
        </Para>
      </div>

      <DocSection title="What counts as a constraint here">
        <Para>
          A rule says what to type. Use a semantic token, never a hex. A constraint says what the
          system will not do, and therefore what you can rely on without looking. Both are useful
          and only one of them belongs on a page — the linter already refuses the first kind, and a
          machine-settled question does not need prose.
        </Para>
        <Guidance
          dos={[
            "State it as a closure. Something that was possible stops being possible",
            "Name what it buys. A constraint with no payoff is a preference with better grammar",
            "Name the observation that proves it was broken, so two reviewers reach the same verdict",
            "Say where the system contradicts it. A constraint the components break is still worth writing down, once it says so",
          ]}
          donts={[
            "Write one that cannot be violated. If nothing can break it, it is a fact about how the system is built",
            "Write one about syntax. That belongs in the linter, where it costs nobody a decision",
            "Write one that only picks between two components. That is the component's own guidance",
            "Restate one that already has an owner. Two statements of the same rule drift, and the drift is silent",
          ]}
        />
        <Para>
          Applying that cut left {CONSTRAINTS.length} constraints. The candidates that did not
          survive are worth naming, because the cut is the argument.
        </Para>
        <RefTable
          columns={[
            { key: "kind", header: "Cut", width: "w-[30%]" },
            { key: "why", header: "Why", width: "w-[70%]" },
          ]}
          rows={CUT.map((row) => ({ kind: row.kind, why: ticks(row.why) }))}
        />
      </DocSection>

      <DocSection title="Structure is settled somewhere else">
        <Para>
          Constraints fall into three areas — interaction, page layout and product behavior. Page
          layout is not below, and that is a decision rather than an omission.{" "}
          <DocLink href="/docs/layout">Layout</DocLink> already carries {layoutRuleCount} rules in
          exactly this shape: a statement, a default, the one exception and the observation that
          proves it was ignored. Moving them would take a set that works away from the page a person
          reads while framing a screen. Copying them would create the second statement that{" "}
          <Code>CONTRIBUTING.md</Code> exists to prevent, and the copy would be the one that goes
          stale.
        </Para>
        <Para>
          So structure is referenced and not repeated. The one structural constraint below is I6,
          which is about the rank of an action rather than the position of a region, and no file
          held it whole — <Code>DESIGN.md</Code> had the surface half and{" "}
          <Code>button.tsx</Code> the component half.
        </Para>
        <Para>
          A fourth group appeared that those three do not name, and it goes first. The closed sets
          are the constraint the other two depend on: nothing about how a control behaves can hold
          while the vocabulary it is written in keeps growing.
        </Para>
        <Para>
          Each constraint carries two words on its right. The first is the aspect of the{" "}
          <DocLink href="/docs/principles">principle</DocLink> it serves, and the second is where a
          violation can be seen. I4 is the only one with no principle beside it, because none of the
          six says anything about input — a reader who can only use a keyboard is not somebody the
          principles have met.
        </Para>
      </DocSection>

      {CONSTRAINT_GROUPS.map((group) => {
        const members = CONSTRAINTS.filter((c) => c.group === group.name)
        if (members.length === 0) return null
        return (
          <DocSection key={group.name} title={group.name}>
            <Para>{group.summary}</Para>
            <ConstraintList items={members} />
          </DocSection>
        )
      })}

      <DocSection title="Where the system cannot hold its own constraints">
        <Para>
          Of the {CONSTRAINTS.length} constraints above, {unheld.length} carry a system gap and are
          marked in place. These are the wider holes underneath them.
        </Para>
        <div className="flex flex-col">
          <Gap title="Interaction is the thinnest layer">
            Every interaction constraint above is a prohibition. Not one of them has a positive
            default behind it, because the system ships none: no threshold for when an indicator may
            appear, no duration anything reads, no model for focus order across a screen and no
            keyboard contract above the single component Base UI gives us. So the honest reading of
            that group is that we know what interaction must not do and have never said what it
            should.
          </Gap>
          <Gap title="Behavior is the best covered and the least reachable">
            The {PATTERNS.length} patterns carry more behavioral truth than anything else in the
            system, and there is no <Code>dbui pattern</Code> command. An agent can read every
            component rule and no behavior rule.
          </Gap>
          <Gap title="Nothing here is machine-checked">
            The React linter reads tokens, type and spacing. No rule reads structure, behavior or
            interaction, which is why every constraint above names where a person can see it
            instead. Two of them are statically checkable today and are proposed below.
          </Gap>
          <Gap title="Four components' constraints reach no agent">
            <>
              The CLI parses <Code>@constraint</Code> and drops the block form{" "}
              <Code>@constraints</Code>. <Code>button</Code>, <Code>dialog</Code>,{" "}
              <Code>alert</Code> and <Code>dropdown-menu</Code> write the block form, so the two
              most-used components in the system have constraints that no agent surface has ever
              printed.
            </>
          </Gap>
          <Gap title="A constraint has no home in the source">
            <>
              A component constraint lives in its JSDoc, beside the code it governs. A system
              constraint governs no one file, so it lives in a page. That is why this file is data
              rather than markup, and why the section below matters more than the list above.
            </>
          </Gap>
        </div>
      </DocSection>

      <DocSection title="How a constraint reaches an agent">
        <Para>
          A component rule already travels. <Code>@guideline</Code> and <Code>@constraint</Code> are
          parsed out of the source, printed by <Code>dbui component</Code> and served over MCP from
          the same function. A system constraint has no equivalent, so today it reaches an agent
          only if someone thought to paste this page. Three changes would close that, smallest
          first.
        </Para>

        <DocSubsection title="Fix the parser before anything else">
          <Para>
            One line in the CLI&rsquo;s JSDoc reader. It matches <Code>@constraint</Code> and never
            the plural, so four components hold constraints that are invisible everywhere. Pair it
            with an assertion, in the shape of the rule verifier, that no unparsed{" "}
            <Code>@constraints</Code> block survives anywhere in the packages — otherwise the same
            tag returns the next time someone writes a list.
          </Para>
        </DocSubsection>

        <DocSubsection title="dbui constraints">
          <Para>
            The array behind this page is already the record: an id, a group, the closure, what it
            forbids, what it buys, the observable failure, the principle it serves and where the
            system falls short. Lifting it into <Code>packages/dbui/src/rules/</Code> beside the
            composition rules, and reading it from the CLI, makes it a typed envelope over the same
            API that MCP already exposes. Nothing new has to be built for the MCP half.
          </Para>
          <Command>dbui constraints [group | id] --json</Command>
          <Para>
            One field is worth adding that the page does not need: how the constraint is enforced —
            a lint rule name, a human review or an observation on screen. An agent that knows a
            constraint is unchecked treats it differently from one the linter will catch, and today
            every one of them is unchecked.
          </Para>
        </DocSubsection>

        <DocSubsection title="Put them where an agent already looks">
          <Para>
            The highest-leverage change is not a new command. It is that{" "}
            <Code>dbui check</Code> already reads a file, already knows which components it imports
            and already prints a report an agent acts on. Adding a block that names the constraints
            in scope for that file, and marks the ones nothing can verify, turns a lint run from
            what did I get wrong into what should I look at before saying this is done.
          </Para>
          <Para>
            Two of the constraints above are checkable in the linter as it stands, and either would
            be the first rule it has that is not about a token: an opacity utility on something that
            holds text (S2), and a second filled button on one surface (I6). The rest need a person,
            and the record should say so rather than imply a coverage the system does not have.
          </Para>
        </DocSubsection>
      </DocSection>

      <SourceNote>
        <>
          Nothing here is new. Each constraint was mined from the invariants on{" "}
          <DocLink href="/docs/patterns">Patterns</DocLink>, the <Code>@constraint</Code> JSDoc
          across the packages, <Code>composition.md</Code>, <Code>DESIGN.md</Code> and the{" "}
          <DocLink href="/docs/principles">principles</DocLink>. What this page owns is the form,
          and the constraints that cross components, pages and time so no single file holds them.
          Where one already has an owner it is cited rather than restated.
        </>
      </SourceNote>
    </>
  )
}
