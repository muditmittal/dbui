import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { Guidance } from "@/components/docs/Guidance"

type Principle = {
  name: string
  aspect: string
  meaning: string
  dos: string[]
  donts: string[]
}

/**
 * Six principles, in the order they build on each other: who we serve, then how
 * the interface looks, speaks and structures itself, then what it asks the
 * reader to trust and what it tells them back.
 *
 * `aspect` names the dimension of the system the principle governs rather than
 * the virtue it praises, so two principles can be told apart by what they
 * decide. Each list carries three independent points rather than three mirrored
 * pairs, and the last don't in each set is the thing the principle gives up. A
 * principle nobody would argue against cannot settle a disagreement.
 */
const PRINCIPLES: Principle[] = [
  {
    name: "Built for people accountable for the data",
    aspect: "Audience",
    meaning:
      "The same table is read by an engineer debugging a pipeline, an analyst checking a metric and a steward approving access. Design the object to carry its own context, not the screen for one reader.",
    dos: [
      "Let an object explain itself wherever it appears — in search, in lineage, in a result",
      "Carry context across a handoff — people arrive mid-task from somewhere else",
      "Preserve place — filters, selection and scroll survive leaving and coming back",
    ],
    donts: [
      "Assume this screen is where the work started or where it ends",
      "Require someone to know the name of what they are looking for",
      "Optimize for the person who set this up over the person who inherits it",
    ],
  },
  {
    name: "Calm carries the work",
    aspect: "Visuals",
    meaning:
      "Color, weight and motion belong to the content, not the frame. Density is part of calm — forty quiet rows read better than twelve decorated ones.",
    dos: [
      "Reserve color for meaning: status, selection, links",
      "Divide with borders — save shadow for what genuinely floats",
      "Treat density as a feature — fit more without adding noise",
    ],
    donts: [
      "Move something unless the motion explains a change",
      "Substitute whitespace for hierarchy",
      "Express the brand inside the product",
    ],
  },
  {
    name: "Clear over clever, honest over hype",
    aspect: "Voice",
    meaning:
      "Say what is true, including the inconvenient parts. People using the product know the technical terms and will find the limits anyway — the only question is whether they hear it from you first.",
    dos: [
      "Name a limit before someone hits it",
      "Use the precise technical term over the friendlier approximation",
      "When something is uncertain, say what is known and what is missing",
    ],
    donts: [
      "Soften a destructive consequence to reduce friction",
      "Claim speed or quality the reader cannot verify",
      "Apologize, emote or congratulate",
    ],
  },
  {
    name: "Every element earns its place",
    aspect: "Structure",
    meaning:
      "The test is subtraction: remove it, and if nothing breaks and nobody notices, it had not earned its place. Time counts too — a spinner that flashes costs more than it saves.",
    dos: [
      "Put the burden of proof on whoever is adding",
      "Keep one primary action per surface",
      "Spend the budget on the thing being read, not the frame around it",
    ],
    donts: [
      "Ship a second way to do something that already works",
      "Let a loading state flicker — delay it, then hold it",
      "Add delight that costs the user time",
    ],
  },
  {
    name: "Automate the work, surface the decision",
    aspect: "Trust",
    meaning:
      "The platform removes repetitive work so attention goes to judgment. Automation earns its place by handing the decision back, visibly, where thinking is required.",
    dos: [
      "Show what was generated before it runs",
      "Make automated actions visible and reversible",
      "Pause where the consequence is wide or irreversible",
    ],
    donts: [
      "Hide the scope of a bulk or generated operation",
      "Put the opt-out behind an administrator",
      "Build a flow that never pauses for a decision",
    ],
  },
  {
    name: "Show the trace, not just the outcome",
    aspect: "Feedback",
    meaning:
      "Source, freshness and scope travel with the thing being shown. A subtly wrong join reads as confidently as a right one — the trace is what tells them apart.",
    dos: [
      "Show the query behind a generated answer",
      "State freshness and scope on anything cached or partial",
      "Answer “why can’t I see this?” with the permission that is missing",
    ],
    donts: [
      "Present a number with no way back to its source",
      "Make diagnosing a failure a scavenger hunt",
      "Trade the trace away to save space",
    ],
  },
]

/**
 * Each principle collapses to its claim and opens to its evidence. The trigger
 * keeps the number, the dimension, the name and the meaning, so a page nobody
 * has clicked still states all six in full; only the do-and-don't rows, which
 * are read when settling a specific argument, wait behind the disclosure.
 */
export function PrinciplesDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Design principles</h1>
      <p className="type-paragraph mt-2 text-text-subtle">
        When two designs both look reasonable, these decide which one ships.
      </p>

      <img
        src="/docs/principles-hero.png"
        alt="Abstract mark for the design principles: a dark cog with an open eye at its center, resolving into a red stepped pattern."
        width={864}
        height={300}
        className="mt-10 h-auto w-full rounded-2"
      />

      <DocAccordion variant="card" className="mt-10">
        {PRINCIPLES.map((principle, i) => (
          <DocAccordionItem
            key={principle.aspect}
            variant="card"
            value={principle.aspect}
            header={
              <>
                <span className="type-eyebrow flex items-baseline gap-2 text-text-subtle">
                  {/* Tabular figures keep the six numbers in one column. */}
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{principle.aspect}</span>
                </span>
                <span className="type-title-3 text-text-strong">{principle.name}</span>
                <span className="type-paragraph text-text-subtle">{principle.meaning}</span>
              </>
            }
          >
            <Guidance
              dos={principle.dos}
              donts={principle.donts}
              header={{ rule: "Rules", example: "Example" }}
            />
          </DocAccordionItem>
        ))}
      </DocAccordion>
    </>
  )
}
