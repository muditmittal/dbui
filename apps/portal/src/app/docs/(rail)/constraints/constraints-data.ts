/**
 * The constraint set, as data.
 *
 * Every field is a plain string and nothing here imports React, so the whole
 * array can be handed to an agent without rendering anything. That is the point
 * rather than a convenience: a constraint that only exists as a rendered page
 * cannot reach the thing writing the code.
 *
 * ── What this page is for ──
 *
 * Constraints are the responsibility layer. Companies run their business on
 * what sits behind these screens, and each entry closes off a way the interface
 * could mislead the person accountable for it.
 *
 * Craft is not here. `/docs/principles` owns it. The split is what each page
 * settles: a principle decides between two designs that are both defensible,
 * and a constraint is a line that does not bend when a deadline argues with it.
 *
 * That split is a correction, not a preference. This page used to hold
 * seventeen constraints across Closed sets, Interaction and Behavior, and seven
 * of them restated a don't already published on `/docs/principles` — motion
 * explaining a change, the delayed loading indicator, one primary action per
 * surface, automation showing its work first, a number carrying its source.
 * A page that is the negative of another page has not earned its place. What
 * was craft went back to whichever file already owned it; what was left is
 * below, joined by the three subjects nothing in the system covered at all:
 * custody, dark patterns and stewardship of the commons.
 *
 * `notes/constraints-page-cuts.md` holds the retired craft rows verbatim,
 * including the system gaps each one recorded, and names the owner each moved
 * to. Nothing was dropped without a forwarding address.
 *
 * ── The shape ──
 *
 * The same shape as `/docs/principles`: an aspect, a claim, and three
 * independent dos and don'ts rather than three mirrored pairs. As there, the
 * last don't in each set is what the constraint gives up. A constraint that
 * costs nothing is a slogan.
 *
 * `broken` is the observation that proves the line was crossed, and it is
 * required. A rule whose failure cannot be described as something a person can
 * see is a preference, and two reviewers will disagree about a preference
 * forever. `check` says who can see it — nothing says `lint`, because no rule
 * in the React linter reads structure, behavior or intent.
 *
 * Neither `broken` nor `check` renders. They are here because they are what
 * qualifies a row to be on this page at all, and because the CLI is meant to
 * lift this array unchanged.
 */

export type Constraint = {
  id: string
  /** The dimension of responsibility this closes off. */
  aspect: string
  /** The line, in the form worth remembering. */
  statement: string
  meaning: string
  dos: string[]
  donts: string[]
  /** The observation that proves the line was crossed. */
  broken: string
  check: "review" | "screen"
}

export const CONSTRAINTS: Constraint[] = [
  {
    id: "C1",
    aspect: "Agency",
    statement: "The machine prepares, the person decides",
    meaning:
      "Automation earns its place by handing the decision back, visibly, wherever judgment is required. On data someone is accountable for, generation is only usable if the generated thing can be read before it runs.",
    dos: [
      "Show what was generated before it runs",
      "Make an automated action visible and reversible",
      "Pause where the consequence is wide or irreversible",
    ],
    donts: [
      "Run generated work and show only its result",
      "Put the opt-out behind an administrator",
      "Build a flow that never pauses for a decision",
    ],
    broken: "The outcome is visible and the thing that produced it is not.",
    check: "review",
  },
  {
    id: "C2",
    aspect: "Accountability",
    statement: "Nothing is asserted without a way to check it",
    meaning:
      "Source, freshness and scope travel with the thing being shown. A subtly wrong join reads as confidently as a right one — the trace is what tells them apart.",
    dos: [
      "Show the query behind a generated answer",
      "State freshness and completeness on the value itself, not in a banner above it",
      "Report which objects failed, not how many succeeded",
    ],
    donts: [
      "Present a number with no way back to its source",
      "Report a partial failure as a success",
      "Trade the trace away to save space",
    ],
    broken:
      "A value survives being copied out of the screen without the caveat that qualified it, or an operation over many objects reports one outcome.",
    check: "review",
  },
  {
    id: "C3",
    aspect: "Custody",
    statement: "Data never appears or moves without its boundary",
    meaning:
      "Companies run their business on what sits behind these screens. What a person can see, and where it goes when they act, is never left implied.",
    dos: [
      "Name the permission that is missing when something is not visible",
      "Say when a permission removed rows, rather than showing a shorter list",
      "Name the destination before data leaves the surface it is on",
    ],
    donts: [
      "Render a permission-filtered result as though it were the whole",
      "Move, copy or export on an action that did not say so",
      "Keep a total clean when the honest one needs a caveat",
    ],
    broken:
      "Two people with different grants see the same count and neither is told why, or data reaches a destination the control that sent it never named.",
    check: "review",
  },
  {
    id: "C4",
    aspect: "Honesty",
    statement: "Nothing is built to work against the reader",
    meaning:
      "Every interface choice is also a choice about whose interest it serves. A pattern that lifts a number by making someone act against their own judgment is a defect, whatever it does to the number.",
    dos: [
      "Make the safe path at least as easy as the destructive one",
      "Default to the reversible choice",
      "Let leaving cost no more than arriving",
    ],
    donts: [
      "Pre-select the riskier option, or word a decline so that declining costs something",
      "Manufacture urgency the system does not have",
      "Trade a person's judgment for a better number",
    ],
    broken:
      "The destructive control takes fewer clicks than the safe one, or the decline is worded as a loss.",
    check: "screen",
  },
  {
    id: "C5",
    aspect: "Stewardship",
    statement: "No surface optimizes itself at the system's expense",
    meaning:
      "The system is a commons, and every local exception is withdrawn from a shared vocabulary that only works while everyone spends it. A gap reported is worth more than a gap worked around.",
    dos: [
      "Report a missing component as a gap",
      "Spend the closed sets rather than extending them",
      "Fix the shared thing when the local fix would have been faster",
    ],
    donts: [
      "Build a one-off where a component already exists",
      "Add a fifth value to a set that closed at four",
      "Take the fast local fix over the slower shared one",
    ],
    broken:
      "A screen renders an interactive element no package exports, or a token, badge variant or sentence names a state the closed set does not already carry.",
    check: "review",
  },
]

/**
 * Kinds of rule that do not belong on this page, and where each goes instead.
 * Listed because the exclusion is the argument: a page that accepts everything
 * teaches nobody what a constraint is.
 */
export const CUT = [
  {
    kind: "Craft",
    why: "Density, motion, hierarchy, the delayed loading indicator, one primary action per surface. These decide between two defensible designs, which is what a principle is for. `/docs/principles` owns them.",
  },
  {
    kind: "Anything the linter reads",
    why: "A semantic token over a hex, a type class unpaired with `leading-`, a padding on the space family. Those say what to type. `yarn dbui check` already refuses them, and a machine-settled question needs no page.",
  },
  {
    kind: "Token rules",
    why: "The four status words, the four weights of emphasis, chart color never crossing interface color. `docs/token-rules.md` states these as R2 and R10 and the generator enforces the closed sets. Restating them here made a second owner.",
  },
  {
    kind: "Component thresholds",
    why: "Ten options before a `Combobox`, seven tabs, five breadcrumb levels. These pick between two components rather than closing a possibility, and they are already the component's own JSDoc.",
  },
  {
    kind: "Preferences",
    why: "Anything whose failure is a matter of taste. If the broken case cannot be described as an observation, two reviewers will disagree about it forever.",
  },
]
