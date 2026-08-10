import * as React from "react"
import Link from "next/link"

import { DocHeader, DocSection, DocSubsection, Para, Code, RefTable } from "@/components/docs/Prose"
import { DefaultPageFigure, ScrollFigure, EdgeFigure } from "@/components/LayoutDiagrams"
import { regions, scrollOwners, spacing, shellModules } from "@/components/layout-data"
import { shells } from "@/components/shell-data"
import {
  FRAME_RULES,
  PAGE_RULES,
  SCROLL_RULES,
  PANEL_RULES,
  RHYTHM_RULES,
  NESTING,
  ARCHETYPES,
  SHELL_MODULE,
  type Rule,
} from "@/components/layout-rules"

/**
 * The layout guide.
 *
 * It owns one thing no other file does: the rules that hold across every shell.
 * `composition.md` fixes each shell's own regions and renders them on Templates,
 * component JSDoc fixes each component's constraints and `/docs/patterns` fixes
 * behavior. This page is what is true when you do not yet know which shell you
 * are in — the decision order, the region grammar, who owns a scroll, what an
 * edge means and what cannot nest inside what.
 *
 * Every rule is rendered in the same four slots, and the shape is the point. A
 * rule with a named default, one named exception and an observable failure can
 * be applied without taste and checked without argument. A sentence that cannot
 * fill those slots was left out rather than padded into them, which is why some
 * sections are short.
 *
 * No value is written here. Insets, panel widths, scroll owners and the spacing
 * basis all come from `layout-data.ts`, which reads them out of the component
 * that owns them, and the shell list comes from `composition.md` through the CLI.
 *
 * Nothing sets a measure. The docs column is capped once, on `<article>` in
 * `app/docs/layout.tsx`.
 */

/**
 * Where the rule can be seen to have been broken. Two answers, no third — and
 * neither of them is the linter, which checks tokens, type and spacing rather
 * than structure.
 *
 * Rendered on the statement row rather than as a fifth slot. As a slot it was a
 * fourth labeled line repeating one of two strings under every rule on the
 * page, which is the shape of information nobody reads after the third time.
 */
const CHECK_LABEL: Record<Rule["checked"], string> = {
  screen: "see it on screen",
  review: "see it in the diff",
}

/**
 * An inline link inside prose. The docs pages style every link at the call site
 * rather than setting a rule for `a`, so an unstyled `<Link>` in a paragraph
 * renders as body text and stops being a link to anyone who is not hovering it.
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

/**
 * A rule, in four slots.
 *
 * The identifier is rendered because these rules get cited — in a review, in a
 * commit message, in an agent's own reasoning about why it moved something —
 * and a rule that has to be quoted in full to be referred to gets paraphrased
 * instead, which is how a rule turns into a preference.
 */
function RuleList({ rules }: { rules: Rule[] }) {
  return (
    <div className="overflow-hidden rounded-2 border border-border-base">
      {rules.map((rule) => (
        <div key={rule.id} className="flex flex-col gap-3 border-b border-border-base px-4 py-4 last:border-b-0">
          <div className="flex items-baseline gap-4">
            <span className="type-code w-8 shrink-0 text-text-subtle tabular-nums">{rule.id}</span>
            <h4 className="type-label-bold m-0 min-w-0 flex-1 text-text-strong">{rule.statement}</h4>
            <span className="type-hint hidden shrink-0 text-text-subtle sm:block">
              {CHECK_LABEL[rule.checked]}
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:pl-12">
            <Slot label="Default">{rule.fallback}</Slot>
            <Slot label="Exception">{rule.exception}</Slot>
            <Slot label="Broken when">{rule.broken}</Slot>
          </div>
        </div>
      ))}
    </div>
  )
}

/** What the system cannot express today. Same treatment the patterns page gives it. */
function Gap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border-subtle py-3 last:border-b-0 sm:flex-row sm:gap-5">
      <span className="type-label-bold w-48 shrink-0 text-text-strong">{title}</span>
      <span className="type-body text-text-subtle">{children}</span>
    </div>
  )
}

/**
 * The four questions, in the order they have to be answered.
 *
 * First because it is the only part of the page that is a procedure. Everything
 * below is a rule that applies once a question here has an answer, and a reader
 * who starts in the middle picks a shell before knowing what scrolls, which is
 * the decision that is expensive to undo.
 */
const DECISIONS: Array<{ question: string; answers: React.ReactNode }> = [
  {
    question: "What is the unit of content, and which container scrolls?",
    answers: "The archetype, named below beside the container each one scrolls.",
  },
  {
    question: "Which shell already has those regions?",
    answers: "One of the shells in composition.md. If none of them fits, ask before inventing another.",
  },
  {
    question: "Which optional regions does the page earn?",
    answers: "Breadcrumb, tabs and featured band, each at a fixed slot and none of them by default.",
  },
  {
    question: "Which edges hold a panel, and what is each one's state on load?",
    answers:
      "Two ranks on the left, one on every other edge. The left opens with the page and the rest start closed.",
  },
]

export function LayoutDoc() {
  const columnScrolls = scrollOwners.filter((owner) => owner.kind === "column")
  const boundedScrolls = scrollOwners.filter((owner) => owner.kind === "bounded")
  const pageRegions = regions.filter((region) => region.scope === "region")
  const shellsWithModule = shells.filter((shell) => SHELL_MODULE[shell.id])
  const shellsWithoutModule = shells.filter((shell) => !SHELL_MODULE[shell.id])

  return (
    <>
      <DocHeader title="Layout">
        How a screen is framed before anything goes in it — the regions every page has, which
        container owns the scroll and what an edge is allowed to hold.
      </DocHeader>

      <div className="mt-8 flex flex-col gap-6">
        <Para>
          A workbench screen is mostly decided before its first component is chosen. The frame fixes
          what is always on screen, the archetype fixes which container scrolls and the region order
          fixes what can sit next to what. Once those three are settled the rest of a page is
          assembly, which is the point — a page that took a position on all three is fast to build
          and possible to review.
        </Para>
        <Para>
          Every rule below states a default to fall back to, the one case that overrides it and the
          observation that proves it was ignored. A sentence that could not fill those slots is not
          here. That is why the panel section is long and the rhythm section is short.
        </Para>
      </div>

      <DocSection title="Decide in this order">
        <Para>
          Each question narrows the next. Answering them out of order is what produces a page that
          has to be rebuilt: picking the shell before knowing what scrolls commits you to a scroll
          contract you have not read.
        </Para>
        <div className="overflow-hidden rounded-2 border border-border-base">
          {DECISIONS.map((decision, i) => (
            <div
              key={decision.question}
              className="flex gap-4 border-b border-border-base px-4 py-3 last:border-b-0"
            >
              <span className="type-hint w-3 shrink-0 pt-1 text-text-subtle tabular-nums">
                {i + 1}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="type-label-bold text-text-strong">{decision.question}</span>
                <span className="type-body text-text-subtle">{decision.answers}</span>
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="The frame and the default page">
        <Para>
          Three regions exist before a page has any content of its own, and most pages add three
          more. The order is the rule. A reader who has seen this ladder once can place a breadcrumb
          or a tab set without asking, and a reviewer who has seen it can tell in one glance that a
          featured band ended up below the controls bar it should sit above.
        </Para>

        <DefaultPageFigure />

        <Para>
          The page header and the controls bar carry the same inset and the same gap, which is what
          lets them stack without a wrapper between them. Both come from the component rather than
          from the page.
        </Para>

        <RefTable
          columns={[
            { key: "region", header: "Region", width: "w-40" },
            { key: "component", header: "Component", mono: true, width: "w-36" },
            { key: "classes", header: "What it sets", mono: true },
          ]}
          rows={pageRegions.map((region) => ({
            region: region.label,
            component: region.component,
            classes: region.classes.join(" "),
          }))}
        />

        <RuleList rules={PAGE_RULES} />

        <DocSubsection title="The frame">
          <Para>
            The frame is the part no page owns. It sets the height, takes the scroll away and leaves
            one column for the page to fill.
          </Para>
          <RuleList rules={FRAME_RULES} />
        </DocSubsection>
      </DocSection>

      <DocSection title="Scroll ownership">
        <Para>
          This is the rule most often broken and the easiest to see. The app frame is fixed to the
          viewport and hides its own overflow, so nothing scrolls until a column asks to. Which
          column that is depends on the archetype and on nothing else.
        </Para>

        <ScrollFigure />

        <RuleList rules={SCROLL_RULES} />

        <DocSubsection title="Every scroll the shells own">
          <Para>
            Measured from <Code>dbui-shells</Code> rather than listed, so a second scroll added to a
            shell appears here instead of quietly breaking the rule above. A column scroll is sized
            by its parent and owns one column. A bounded scroll is capped by a maximum height, which
            is what makes a long menu safe to put inside a fixed row.
          </Para>
          <RefTable
            columns={[
              { key: "kind", header: "Kind", width: "w-24" },
              { key: "classes", header: "What it sets", mono: true },
              { key: "file", header: "File", mono: true },
            ]}
            rows={[...columnScrolls, ...boundedScrolls].map((owner) => ({
              kind: owner.kind,
              classes: owner.classes,
              file: owner.file.replace("packages/dbui-shells/src/", ""),
            }))}
          />
        </DocSubsection>
      </DocSection>

      <DocSection title="Panels">
        <Para>
          The product has a lot of collapsible panels and wants to read as a simple screen. Those
          two are only in tension when panels are treated as a feature. They stop being in tension
          when each edge means one fixed thing and the number that can be open is bounded — then a
          reader learns the edges once instead of learning every screen.
        </Para>
        <Para>
          What makes a workbench feel complicated is rarely the count of panels. It is an edge that
          holds navigation on one screen and metadata on the next, because that removes the reader&rsquo;s
          ability to predict what closing something will cost them.
        </Para>

        <EdgeFigure />

        <RuleList rules={PANEL_RULES} />

        <DocSubsection title="Panel or dialog">
          <Para>
            One question separates them. If the reader can keep working while it is open it is a
            panel, and it docks to the edge that matches its content. If the work has to stop it is a
            dialog, and it takes focus, dims the page and offers a way out. A drawer is the
            in-between case the system supports — detail read alongside the page, never a workflow.
            Anything with a cancel button was a dialog all along.
          </Para>
          <Para>
            Behavior belongs to <DocLink href="/docs/patterns">patterns</DocLink>, which owns what happens
            when one of these opens, closes or has to hold unsaved work.
          </Para>
        </DocSubsection>
      </DocSection>

      <DocSection title="The archetypes">
        <Para>
          Archetypes are separated by structure and not by appearance. A dashboard list and a catalog
          landing look nothing alike and are the same archetype. A notebook and a table detail look
          similar and are not. The three questions that actually separate them are what the unit of
          content is, which container scrolls and what stands in for the page header.
        </Para>

        <RefTable
          columns={[
            { key: "name", header: "Archetype", width: "w-24" },
            { key: "unit", header: "Unit of content" },
            { key: "scroll", header: "Owns the scroll" },
            { key: "chrome", header: "Chrome", width: "w-40" },
            { key: "shell", header: "Shell", width: "w-16" },
          ]}
          rows={ARCHETYPES.map((archetype) => ({
            name: archetype.name,
            unit: archetype.unit,
            scroll: archetype.scroll,
            chrome: archetype.chrome,
            shell: archetype.shell,
          }))}
        />

        <Para>
          A page is one archetype. A list page that grows an editor pane is two pages. The one
          exception is that an archetype can appear inside a panel of another — a conversation beside
          a list is a panel on the right edge, not a second archetype, and it follows the panel rules
          rather than the chat rules.
        </Para>

        <Para>
          The regions, scaling and scroll contract of each shell live in{" "}
          <Code>composition.md</Code> and render on <DocLink href="/docs/shells">Shells</DocLink>. Agents
          read the same definitions from <Code>dbui shell</Code>. This page does not repeat them.
        </Para>

        <RefTable
          columns={[
            { key: "id", header: "Shell", width: "w-16" },
            { key: "name", header: "Name", width: "w-48" },
            { key: "purpose", header: "For" },
            { key: "module", header: "Start from", mono: true, width: "w-36" },
          ]}
          rows={shells.map((shell) => ({
            id: shell.id,
            name: shell.name,
            purpose: shell.purpose,
            module: SHELL_MODULE[shell.id] ?? "—",
          }))}
        />
      </DocSection>

      <DocSection title="Rhythm">
        <Para>
          Spacing between regions is not set by the page. Each region carries its own padding and the
          stack that holds them adds nothing, so the gap between two regions is the sum of the two
          paddings and comes out even without anyone measuring it. That is the whole rhythm rule, and
          it is why a page that reaches for a space utility between regions looks slightly wrong
          everywhere rather than obviously wrong somewhere.
        </Para>
        <Para>
          Which scale those paddings are on is worth being exact about, because the system has two
          and only one of them is read.
        </Para>

        <RefTable
          columns={[
            { key: "scale", header: "Scale", mono: true, width: "w-36" },
            { key: "state", header: "State", width: "w-32" },
            { key: "what", header: "What it is" },
          ]}
          rows={[
            {
              scale: spacing.tokenFamily.name,
              // "Read by nothing" beside a page whose padding is visibly even
              // reads as a claim about the page rather than about the token. The
              // padding is real and comes from the row below, which is the half
              // of the fact this cell was leaving out.
              state: spacing.tokenFamily.live ? "Live" : "Superseded",
              what: `Generated from theme.config.mjs and shipped in tokens.css. The padding you see comes from the utility below instead, so nothing reads any of these ${spacing.tokenFamily.tokens} steps.`,
            },
            {
              scale: spacing.utility.name,
              state: "Live",
              what: `Tailwind's step, now resolving to ${spacing.utility.resolvesTo ?? spacing.utility.value}. Every padding and gap in the system resolves through it — ${spacing.utility.uses} uses across ${spacing.utility.files} files.`,
            },
          ]}
        />

        <Para>
          So a spacing rule here is a rule about Tailwind&rsquo;s step, not about the space tokens —
          but that step is now the grid unit from <Code>theme.config.mjs</Code> multiplied by the
          density dial, so turning the dial moves every padding and gap on the page. A page that
          hardcodes a padding to look denser opts out of that.
        </Para>

        <RuleList rules={RHYTHM_RULES} />
      </DocSection>

      <DocSection title="What cannot nest inside what">
        <Para>
          Each row names the failure rather than the principle, because the failure is what a
          reviewer can see. Every one of these is reachable by composing two components that are each
          correct on their own, which is why they need stating at the layout level at all.
        </Para>
        <RefTable
          columns={[
            { key: "container", header: "This", width: "w-40" },
            { key: "never", header: "Never holds", width: "w-56" },
            { key: "failure", header: "What goes wrong" },
          ]}
          rows={NESTING.map((row) => ({
            container: row.container,
            never: row.never,
            failure: row.failure,
          }))}
        />
      </DocSection>

      <DocSection title="Where DBUI stops">
        <Para>
          The rules above describe what the system can express. These are the places where the
          product does something the system cannot, so a screen that needs one of them is building
          past the edge rather than using it.
        </Para>
        <div className="flex flex-col">
          <Gap title="Most shells have no module">
            <>
              <Code>composition.md</Code> specifies {shells.length} shells and{" "}
              <Code>dbui-shells</Code> exports{" "}
              {shellModules.map((name, i) => (
                <React.Fragment key={name}>
                  {i > 0 ? ", " : ""}
                  <Code>{name}</Code>
                </React.Fragment>
              ))}
              . Only {shellsWithModule.length} of them is a shell. Shell{" "}
              {shellsWithoutModule.map((shell) => shell.id).join(", shell ")} are assembled from
              components each page at a time, so the scroll contract is re-decided each time with
              them.
            </>
          </Gap>
          <Gap title="No chat shell">
            <>
              <Code>dbui-chat</Code> ships the transcript primitives and{" "}
              <Code>AssistantPanel</Code> ships one docked instance, so a conversation inside a panel
              is supported. A full-page conversation has no shell, which means no region order and no
              scroll contract, and the bottom-anchored scroll rule is currently enforced only by the
              conversation component itself.
            </>
          </Gap>
          <Gap title="No canvas shell">
            Dashboards and pipelines are surfaces where position carries meaning and both axes
            scroll. Nothing in the system describes that, so the archetype is listed above with no
            shell to start from.
          </Gap>
          <Gap title="No bottom-edge panel">
            The editor output pane is specified with a resize handle and a dismiss control, and no
            component implements it. The bottom edge in the diagram above is empty for that reason.
          </Gap>
          <Gap title="The shell does not use the region components">
            <>
              The catalog explorer builds its own title row and filter row rather than composing{" "}
              <Code>PageHeader</Code> and <Code>ControlsBar</Code>, and it sets a different
              horizontal inset from the one those two carry. So the region rules above hold for a
              page assembled from the components and are not enforced by the one shell that ships.
            </>
          </Gap>
          <Gap title="Panels do not persist">
            Nothing remembers whether a panel was open across navigation or a reload. Panel state is
            held in component state in the shell, so every page load returns to the defaults. The
            rule that opens the left rail and closes everything else is what keeps that from being
            noticeable, and it is the reason the right edge has to start closed.
          </Gap>
          <Gap title="Rails are not resizable">
            <>
              <Code>composition.md</Code> gives tree rails a resize range. <Code>Resizable</Code>{" "}
              exists as a utility and no shell uses it, so rail widths are fixed at the values the
              panel table above reports.
            </>
          </Gap>
          <Gap title="Navigation closes rather than collapsing">
            The nav is specified to collapse to an icon rail, which is what would satisfy the rule
            about collapsing to a width. The shell removes it instead, so the reader loses the
            product context rather than keeping a narrow version of it.
          </Gap>
          <Gap title="No linter checks structure">
            The React linter checks tokens, type and spacing. None of the rules on this page is
            machine-checked, which is why each one names where it can be seen instead.
          </Gap>
        </div>
      </DocSection>
    </>
  )
}
