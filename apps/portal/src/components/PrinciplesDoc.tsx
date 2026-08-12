import Link from "next/link"

import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { Guidance } from "@/components/docs/Guidance"
import { DocHeader, Para } from "@/components/docs/Prose"

type Principle = {
  name: string
  aspect: string
  meaning: string
  dos: string[]
  donts: string[]
}

/**
 * Six principles of craft, in the order they build on each other: who we serve,
 * then how the interface looks, speaks and structures itself, then how it holds
 * together across surfaces and across repeated use.
 *
 * Craft only. Ethics is not here — `/docs/constraints` owns it. The split is
 * what each page settles: a principle decides between two designs that are both
 * defensible, and a constraint is a line that does not bend when a deadline
 * argues with it. Trust and Feedback used to sit in this array and were the two
 * that failed that test; they are Agency and Accountability on the constraints
 * page now. Do not restate either here — the two pages restating each other is
 * what cost the constraints page its place once already.
 *
 * `aspect` names the dimension of the system the principle governs rather than
 * the virtue it praises, so two principles can be told apart by what they
 * decide. Each list carries three independent points rather than three mirrored
 * pairs, and the last don't in each set is the thing the principle gives up. A
 * principle nobody would argue against cannot settle a disagreement.
 *
 * Consistency and Fluency were added after reading what ten published systems
 * name. Consistency is the one dimension every source carries — Nielsen's
 * fourth heuristic, Carbon's "builds consistency", Apple's Familiarity, Fluent's
 * "Natural on every platform" — and it was the only such dimension missing here.
 * Fluency is Nielsen's seventh, which binds the novice and the expert into one
 * interface; Salesforce ranks it second of four and Polaris put productivity
 * above simplicity outright. Neither had a home in the four that preceded them.
 */
const PRINCIPLES: Principle[] = [
  {
    name: "Built for people accountable for the data",
    aspect: "Audience",
    meaning:
      "An engineer, an analyst and a steward read the same table. Design the object to carry its own context, not the screen for one reader.",
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
      "Color, weight and motion belong to the content, not the frame. Forty quiet rows read better than twelve decorated ones.",
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
      "Say what is true, including the inconvenient parts. People find the limits anyway; the only question is whether they hear it from you first.",
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
      "The test is subtraction: remove it, and if nothing breaks and nobody notices, it had not earned its place. Time counts too.",
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
    name: "Learned once, true everywhere",
    aspect: "Consistency",
    meaning:
      "A control that looks a certain way behaves that way everywhere. Predictability rather than sameness: two things that differ should look like they differ.",
    dos: [
      "Give the same job the same control, on every surface it appears",
      "Make two things look different when they behave differently",
      "Reach for the existing pattern before inventing beside it",
    ],
    donts: [
      "Give one job two different controls on two surfaces",
      "Make two things that behave differently look the same",
      "Reword or rearrange because this one screen would read better alone",
    ],
  },
  {
    name: "Easy the first time, fast the thousandth",
    aspect: "Fluency",
    meaning:
      "One interface serves someone doing this once and someone doing it four hundred times a day. A path that repeats earns a shortcut.",
    dos: [
      "Give a repeated action a keyboard route and a bulk form",
      "Let the interface remember what was chosen last time",
      "Reveal depth on demand — the advanced control is one step in, not on the surface",
    ],
    donts: [
      "Make the expert walk the beginner's path every time",
      "Hide a capability where nothing hints it exists",
      "Leave the teaching on screen after it has been learned",
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
      <DocHeader title="Design principles">
        When two solutions are both defensible, these decide which one ships.
      </DocHeader>

      <Para>
        Six dimensions of craft — the half this system controls directly.{" "}
        <Link href="/docs/constraints" className="text-text-accent no-underline hover:underline">
          Constraints
        </Link>{" "}
        is the other half: what a screen owes the person on the other side of it.
      </Para>

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
                <span className="type-title-4 text-text-strong">{principle.name}</span>
                {/* A span because the trigger's header is a flex column, which
                    puts it outside the docs column's `p, li, figcaption`
                    default.

                    No `measure`. The cap exists to stop running text spanning
                    the full docs column; inside a card the card is already the
                    narrower container, so the two caps compound and leave a
                    short ragged column with empty card beside it. One container
                    should decide a line length, and here it is the card. */}
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
