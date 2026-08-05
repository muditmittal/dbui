import { Check } from "dbui/components/icons/Check"
import { Close } from "dbui/components/icons/Close"

type Principle = {
  name: string
  aspect: string
  rule: string
  meaning: string[]
  loses: string
  dos: string[]
  donts: string[]
}

/**
 * Six principles, in the order they build on each other: who we serve, then how
 * the interface looks, speaks and restrains itself, then what it does with
 * automation and evidence.
 *
 * Each carries something that loses. A principle nobody would argue against —
 * "be accessible", "be consistent" — cannot settle a disagreement, and every
 * design system that ships those ends up with principles nothing cites.
 */
const PRINCIPLES: Principle[] = [
  {
    name: "Built for people accountable for the data",
    aspect: "Audience",
    rule: "Design for the moment someone has to answer for a number.",
    meaning: [
      "Our users are data engineers, analysts, scientists, stewards and admins. What unites them is not skill level — it is that someone will ask them whether a number is right, who can see it, and what it cost.",
      "That means every role gets the same craft, not just the same feature coverage. If the notebook has an affordance the SQL editor lacks, that is a defect rather than a roadmap item.",
    ],
    loses: "The ability to invest in whichever persona is loudest this quarter.",
    dos: [
      "Assume competence — explain the new, not the obvious",
      "Make “who can see this?” reachable in one step",
      "Hold two surfaces side by side and fix the one that is behind",
    ],
    donts: [
      "Hide complexity behind a simplified view that cannot be inspected",
      "Congratulate the user — they are at work, not playing a game",
      "Ship a governance screen only an admin could love",
    ],
  },
  {
    name: "Calm carries the work",
    aspect: "Visuals",
    rule: "The frame recedes so the data advances.",
    meaning: [
      "Color, weight and motion belong to the content. Chrome stays neutral, borders do the work shadows do in other systems, and nothing in the frame competes with the thing being read.",
      "Density is part of calm, not opposed to it. A screen showing forty rows quietly is calmer than one showing twelve with decoration. Calm is the absence of noise, not the presence of space.",
    ],
    loses: "Brand expression inside the product.",
    dos: [
      "Let status and data carry color; keep the frame neutral",
      "Divide with borders; reach for shadow only when something genuinely floats",
      "Keep chrome out of vertical space a table could use",
    ],
    donts: [
      "Make a chrome element the most colorful thing on screen",
      "Read calm as airy and add whitespace to a dense table",
      "Use blue as a brand fill — it is a link color",
    ],
  },
  {
    name: "Clear over clever, honest over hype",
    aspect: "Voice",
    rule: "Plain words, stated limits, named consequences.",
    meaning: [
      "Say what is true, including the parts that are inconvenient. Lead with the action. Use the fewest words that still carry the consequence.",
      "This governs every string in the product — buttons, empty states, errors, tooltips, and anything an AI surface generates on our behalf.",
    ],
    loses: "Marketing warmth, and the comfort of vague error messages.",
    dos: [
      "“Delete catalog” — name the action and its object",
      "“Deleting removes all child objects” — name the consequence",
      "“Runs on serverless compute” — state the fact",
    ],
    donts: [
      "“Unleash insights” — jargon standing in for meaning",
      "“Blazing-fast compute” — a claim nobody can check",
      "“Oops, something went wrong” — no cause, no next step",
    ],
  },
  {
    name: "Every element earns its place",
    aspect: "Restraint",
    rule: "Anything added dilutes everything else.",
    meaning: [
      "The test is subtraction: remove it, and if nothing breaks and nobody notices, it had not earned its place. The burden of proof sits with whoever is adding.",
      "Time counts as an element. A spinner that flashes for eighty milliseconds and an animation that delays a result are both costs paid by the user for something they did not ask for.",
    ],
    loses: "Flexibility, optionality, and most delight.",
    dos: [
      "One primary action per surface",
      "Animate only when it clarifies cause and effect",
      "Delay a spinner ~150ms, then hold it ~300ms so it cannot flicker",
    ],
    donts: [
      "Ship a second way to do something that already works",
      "Use a badge as decoration — badges carry counts and states",
      "Add a transition that makes the answer arrive later",
    ],
  },
  {
    name: "Automate the work, surface the decision",
    aspect: "Leverage",
    rule: "Automation clears the desk; a person still signs.",
    meaning: [
      "The platform exists to remove grunt work so its users can spend attention on judgment. Automation earns its leverage by handing the decision back, visibly, at the point where thinking is required.",
      "The failure mode is a flow so seamless it never pauses where someone should have looked.",
    ],
    loses: "The seamless demo.",
    dos: [
      "Show what was generated before it runs",
      "Make every automated action visible and reversible",
      "Let a user turn it off without asking an admin",
    ],
    donts: [
      "Act before the user has read the proposal",
      "Bury the scope of a bulk operation",
      "Enable AI by default and gate the opt-out behind an administrator",
    ],
  },
  {
    name: "Show the trace, not just the outcome",
    aspect: "Trust",
    rule: "Every value, state and answer carries where it came from.",
    meaning: [
      "Source, freshness and scope travel with the thing being shown. A subtly wrong join reads just as confidently as a right one — the trace is the only thing that tells them apart.",
      "Trace means the lineage graph, the reasoning behind a generated answer, and the stack behind a failure. Our users already think in all three.",
    ],
    loses: "Visual economy, and sometimes speed of display.",
    dos: [
      "Show the query a generated answer ran",
      "State freshness on anything cached or partial",
      "Answer “why can’t I see this?” with the grant that is missing",
      "Surface the real error inline, not a code to look up",
    ],
    donts: [
      "Present a computed number with no way back to its source",
      "Show a partial result as though it were complete",
      "Make a failure require visiting six log surfaces",
    ],
  },
]

function List({ items, tone }: { items: string[]; tone: "do" | "dont" }) {
  const positive = tone === "do"
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div
        className={`type-eyebrow ${positive ? "text-status-text-positive" : "text-status-text-negative"}`}
      >
        {positive ? "Do" : "Don't"}
      </div>
      <ul className="flex flex-col gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item} className="type-body flex gap-2 text-text-base">
            <span
              className={`mt-0.5 shrink-0 ${positive ? "text-status-text-positive" : "text-status-text-negative"}`}
            >
              {positive ? <Check className="size-4" /> : <Close className="size-4" />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PrinciplesDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Design principles</h1>
      <p className="type-paragraph mt-4 max-w-[68ch] text-text-subtle">
        Six principles for the Databricks interface. They exist to settle arguments, so each one
        names something that loses — a principle nobody would disagree with cannot decide anything.
      </p>
      <p className="type-body mt-4 max-w-[68ch] text-text-subtle">
        They build in order. The first says who we serve; the rest are close to derivable from it.
      </p>

      <div className="mt-14 flex flex-col gap-14">
        {PRINCIPLES.map((p, i) => (
          <section key={p.name} style={{ margin: 0 }}>
            <div className="flex items-baseline gap-3">
              <span className="type-data text-text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="type-eyebrow text-text-subtle">{p.aspect}</span>
            </div>

            <h2 className="type-title-3 mt-2 text-text-strong">{p.name}</h2>
            <p className="type-paragraph mt-2 max-w-[62ch] text-text-base">{p.rule}</p>

            <div className="mt-5 max-w-[68ch] flex-col gap-3">
              {p.meaning.map((para) => (
                <p key={para} className="type-body mt-3 text-text-subtle">
                  {para}
                </p>
              ))}
            </div>

            <p className="type-body mt-4 max-w-[68ch] text-text-subtle">
              <span className="type-body-bold text-text-base">What loses: </span>
              {p.loses}
            </p>

            <div className="mt-6 flex flex-col gap-6 rounded-md border border-border-base bg-surface-base p-5 sm:flex-row sm:gap-10">
              <List items={p.dos} tone="do" />
              <List items={p.donts} tone="dont" />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-md border border-border-base bg-surface-subtle p-6" style={{ margin: "64px 0 0" }}>
        <h2 className="type-title-4 text-text-strong">How these stay alive</h2>
        <p className="type-body mt-2 max-w-[68ch] text-text-subtle">
          Principles die when the guidance beneath them stops citing them. Of the design systems we
          studied, only Shopify Polaris links its principles down into the density, color and motion
          pages beneath — and it is the only one whose principles are demonstrably still in use.
          Salesforce states four above twenty-two pattern pages that never mention them again.
        </p>
        <p className="type-body mt-3 max-w-[68ch] text-text-subtle">
          So each component&rsquo;s <code className="type-code">@guideline</code> should name the
          principle it serves. If a principle cannot be traced into the component rules, it is
          decoration.
        </p>
      </section>
    </>
  )
}
