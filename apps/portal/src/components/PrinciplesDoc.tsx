import { Badge } from "dbui"

type Principle = {
  name: string
  aspect: string
  rule: string
  meaning: string
  dos: string[]
  donts: string[]
}

/**
 * Six principles, in the order they build on each other: who we serve, then how
 * the interface looks, speaks and restrains itself, then what it does with
 * automation and evidence.
 *
 * Each list carries three independent points rather than three mirrored pairs,
 * and the last don't in each set is the thing the principle gives up. A
 * principle nobody would argue against cannot settle a disagreement.
 */
const PRINCIPLES: Principle[] = [
  {
    name: "Built for people accountable for the data",
    aspect: "Audience",
    rule: "Design for the moment someone has to answer for a number.",
    meaning:
      "The same table is read by an engineer debugging a pipeline, an analyst checking a metric and a steward approving access — at different points in work that runs for weeks. Design the object to carry its own context, not the screen to one reader’s moment.",
    dos: [
      "Let an object explain itself wherever it appears — in search, in lineage, in a result",
      "Carry context across a handoff; people arrive mid-task from somewhere else",
      "Preserve place — filters, selection and scroll survive leaving and coming back",
    ],
    donts: [
      "Assume this screen is where the work started or where it ends",
      "Require someone to already know the name of what they are looking for",
      "Optimize for the person who set this up over the person who inherits it",
    ],
  },
  {
    name: "Calm carries the work",
    aspect: "Visuals",
    rule: "The frame recedes so the data advances.",
    meaning:
      "Color, weight and motion belong to the content. Chrome stays neutral, borders divide, and density is part of calm — forty quiet rows read easier than twelve decorated ones.",
    dos: [
      "Reserve color for meaning: status, selection, links",
      "Divide with borders; save shadow for what genuinely floats",
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
    rule: "Plain words, stated limits, named consequences.",
    meaning:
      "Say what is true, including the inconvenient parts. Our readers know the technical vocabulary and will discover the limits anyway — the only question is whether they hear it from us first.",
    dos: [
      "Name a limit before someone hits it",
      "Use the precise technical term over the friendlier approximation",
      "When something is uncertain, say what is known and what is missing",
    ],
    donts: [
      "Soften a destructive consequence to reduce friction",
      "Claim speed or quality the reader cannot verify",
      "Apologize, emote, or congratulate",
    ],
  },
  {
    name: "Every element earns its place",
    aspect: "Restraint",
    rule: "Anything added dilutes everything else.",
    meaning:
      "The test is subtraction: remove it, and if nothing breaks and nobody notices, it had not earned its place. Time counts as an element — a spinner that flashes and an animation that delays a result are both costs the user did not ask for.",
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
    aspect: "Automation",
    rule: "Automation clears the desk; a person still signs.",
    meaning:
      "The platform removes grunt work so attention goes to judgment. Automation earns its leverage by handing the decision back, visibly, at the point where thinking is required.",
    dos: [
      "Show what was generated before it runs",
      "Make automated actions visible and reversible",
      "Pause where the consequence is wide or irreversible",
    ],
    donts: [
      "Hide the scope of a bulk or generated operation",
      "Put the opt-out behind an administrator",
      "Design a flow so seamless it never pauses",
    ],
  },
  {
    name: "Show the trace, not just the outcome",
    aspect: "Evidence",
    rule: "Every value, state and answer carries where it came from.",
    meaning:
      "Source, freshness and scope travel with the thing being shown. A subtly wrong join reads just as confidently as a right one — the trace is the only thing that tells them apart.",
    dos: [
      "Show the query behind a generated answer",
      "State freshness and scope on anything cached or partial",
      "Answer “why can’t I see this?” with the permission that is missing",
    ],
    donts: [
      "Present a number with no way back to its source",
      "Make diagnosing a failure a scavenger hunt",
      "Trade the trace away for visual economy",
    ],
  },
]

/**
 * One stacked list rather than two columns. The columns were only earning their
 * keep while every do had a mirrored don't; once the items became independent,
 * side-by-side asked the reader to compare things that were not comparable.
 */
function Guidance({ dos, donts }: { dos: string[]; donts: string[] }) {
  const rows = [
    ...dos.map((text) => ({ text, tone: "do" as const })),
    ...donts.map((text) => ({ text, tone: "dont" as const })),
  ]

  return (
    <div className="overflow-hidden rounded-md border border-border-base">
      {rows.map(({ text, tone }, i) => (
        <div
          key={text}
          className={`flex items-start gap-4 px-4 py-2.5 ${
            i < rows.length - 1 ? "border-b border-border-base" : ""
          }`}
        >
          {/* Fixed gutter rather than a fixed pill width: the two labels are
              different lengths, and the text column is what needs to line up. */}
          <span className="w-14 shrink-0">
            <Badge variant={tone === "do" ? "positive" : "negative"}>
              {tone === "do" ? "Do" : "Don't"}
            </Badge>
          </span>
          <span className="type-body text-text-base">{text}</span>
        </div>
      ))}
    </div>
  )
}

export function PrinciplesDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Design principles</h1>
      <p className="type-paragraph mt-4 max-w-[64ch] text-text-subtle">
        Six principles for the Databricks interface. Each one gives something up — a principle
        nobody could disagree with cannot settle an argument. They build in order: the first says
        who we serve, and the rest largely follow from it.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {PRINCIPLES.map((p, i) => (
          <section key={p.name} style={{ margin: 0 }}>
            <div className="type-eyebrow flex items-baseline gap-2 text-text-subtle">
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p.aspect}</span>
            </div>

            <h2 className="type-title-3 mt-2 text-text-strong">{p.name}</h2>
            <p className="type-paragraph mt-1.5 max-w-[62ch] text-text-base">{p.rule}</p>
            <p className="type-body mt-3 max-w-[66ch] text-text-subtle">{p.meaning}</p>

            <div className="mt-6">
              <Guidance dos={p.dos} donts={p.donts} />
            </div>
          </section>
        ))}
      </div>

      <section
        className="rounded-md border border-border-base bg-surface-subtle p-6"
        style={{ margin: "64px 0 0" }}
      >
        <h2 className="type-title-4 text-text-strong" style={{ marginTop: 0 }}>
          Where these live
        </h2>
        <p className="type-body mt-2 max-w-[66ch] text-text-subtle">
          A principle only holds if the guidance cites it. Each component&rsquo;s{" "}
          <code className="type-code">@guideline</code> names the principle it serves, so a rule and
          its reason arrive together — in the source, in <code className="type-code">dbui component</code>,
          and in the MCP response an agent reads.
        </p>
        <p className="type-body mt-3 max-w-[66ch] text-text-subtle">
          Anything on this page that cannot be traced into a component rule is decoration, and
          should be cut.
        </p>
      </section>
    </>
  )
}
