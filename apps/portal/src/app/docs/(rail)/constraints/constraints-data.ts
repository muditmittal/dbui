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
 * below, joined by the subjects nothing in the system covered at all: custody,
 * choice architecture, and access as a line rather than a checklist.
 *
 * `notes/constraints-page-cuts.md` holds the retired craft rows verbatim,
 * including the system gaps each one recorded, and names the owner each moved
 * to. Nothing was dropped without a forwarding address.
 *
 * ── Two neighbours, stated here rather than in a `meaning` ──
 *
 * C4 Fairness is choice architecture — what a control costs to click, what is
 * preselected. Whether the sentence on it is honest belongs to `/docs/voice`.
 * C5 Access is the line; `/docs/accessibility` is the contract behind it, and
 * says what a primitive already carries versus what the composed screen owes.
 *
 * Both used to sit in the rendered `meaning`, which is the one field a reader
 * sees before opening anything. It has to fit two lines, so a cross-reference
 * for the next maintainer is the wrong thing to spend it on.
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

/**
 * A rule and the concrete case that shows it. The example is required: a
 * constraint argued in the abstract is a constraint two people can agree with
 * and still ship opposite screens.
 */
export type Rule = { rule: string; example: string }

export type Constraint = {
  id: string
  /** The dimension of responsibility this closes off. */
  aspect: string
  /** The line, in the form worth remembering. */
  statement: string
  meaning: string
  dos: Rule[]
  donts: Rule[]
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
      "Automation earns its place by handing the decision back. Generated work is only usable if it can be read before it runs.",
    dos: [
      {
        rule: "Show what was generated before it runs",
        example: "The generated SQL renders in the cell, and Run stays the reader's click.",
      },
      {
        rule: "Make an automated action visible and reversible",
        example: "An agent that renamed twelve columns lists them, each one undoable.",
      },
      {
        rule: "Pause where the consequence is wide or irreversible",
        example: "Dropping a table used by four dashboards stops to name them first.",
      },
    ],
    donts: [
      {
        rule: "Run generated work and show only its result",
        example: "A summary appears and the query that produced it is nowhere on the screen.",
      },
      {
        rule: "Put the opt-out behind an administrator",
        example: "Turning off auto-apply needs a workspace admin, so nobody turns it off.",
      },
      {
        rule: "Build a flow that never pauses for a decision",
        example: "A wizard that ends in a write with no step between the prompt and the commit.",
      },
    ],
    broken: "The outcome is visible and the thing that produced it is not.",
    check: "review",
  },
  {
    id: "C2",
    aspect: "Accountability",
    statement: "Nothing is asserted without a way to check it",
    meaning:
      "Source, freshness and scope travel with the value. A wrong join reads as confidently as a right one; the trace is what tells them apart.",
    dos: [
      {
        rule: "Show the query behind a generated answer",
        example: "\u201c14 accounts at risk\u201d opens to the join that counted them.",
      },
      {
        rule: "State freshness and completeness on the value itself, not in a banner above it",
        example: "\u201c81.3 GB \u00b7 as of 12 hours ago\u201d, so the caveat survives a screenshot.",
      },
      {
        rule: "Report which objects failed, not how many succeeded",
        example: "\u201c3 of 40 tables could not be scanned\u201d, each one named and retryable.",
      },
    ],
    donts: [
      {
        rule: "Present a number with no way back to its source",
        example: "A metric tile with no query, no owner and no timestamp.",
      },
      {
        rule: "Report a partial failure as a success",
        example: "A green toast after a job that skipped nine partitions.",
      },
      {
        rule: "Trade the trace away to save space",
        example: "The freshness stamp is the first thing cut when the card gets narrow.",
      },
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
      "Companies run their business on what sits behind these screens. What someone can see, and where data goes when they act, is never implied.",
    dos: [
      {
        rule: "Name the permission that is missing when something is not visible",
        example: "\u201cHidden \u2014 needs SELECT on main.finance\u201d, rather than an empty panel.",
      },
      {
        rule: "Say when a permission removed rows, rather than showing a shorter list",
        example: "\u201cShowing 214 of 900 \u2014 686 hidden by grants.\u201d",
      },
      {
        rule: "Name the destination before data leaves the surface it is on",
        example: "\u201cSend to Slack #analytics\u201d on the button, not \u201cShare\u201d.",
      },
    ],
    donts: [
      {
        rule: "Render a permission-filtered result as though it were the whole",
        example: "A row count that silently means \u201cthe rows you happen to be allowed\u201d.",
      },
      {
        rule: "Move, copy or export on an action that did not say so",
        example: "\u201cOpen in notebook\u201d that also writes the result to a new table.",
      },
      {
        rule: "Keep a total clean when the honest one needs a caveat",
        example: "Dropping the \u201cpartial\u201d qualifier because it spoils the tile.",
      },
    ],
    broken:
      "Two people with different grants see the same count and neither is told why, or data reaches a destination the control that sent it never named.",
    check: "review",
  },
  {
    id: "C4",
    aspect: "Fairness",
    statement: "Nothing is built to work against the reader",
    meaning:
      "Every interface choice serves someone's interest. A pattern that lifts a number by working against the reader's judgment is a defect, whatever it does to the number.",
    dos: [
      {
        rule: "Make the safe path at least as easy as the destructive one",
        example: "Cancel and Delete are the same size, the same distance, equally reachable.",
      },
      {
        rule: "Default to the reversible choice",
        example: "\u201cDetach\u201d is preselected over \u201cDelete permanently\u201d.",
      },
      {
        rule: "Let leaving cost no more than arriving",
        example: "One click enabled the sync; one click turns it off, in the same place.",
      },
    ],
    donts: [
      {
        rule: "Pre-select the riskier option, or word a decline so that declining costs something",
        example: "\u201cNo thanks, I don't want reliable pipelines.\u201d",
      },
      {
        rule: "Manufacture urgency the system does not have",
        example: "A countdown on a migration with no deadline behind it.",
      },
      {
        rule: "Trade a person's judgment for a better number",
        example: "Burying the cost estimate because showing it lowers conversion.",
      },
    ],
    broken:
      "The destructive control takes fewer clicks than the safe one, or the decline is worded as a loss.",
    check: "screen",
  },
  {
    id: "C5",
    aspect: "Access",
    statement: "No one is locked out of what they are accountable for",
    meaning:
      "A component meeting the bar does not mean the screen does. Composition is where someone gets shut out, and no component can refuse it.",
    dos: [
      {
        rule: "Make every action reachable from the keyboard, in an order that matches the page",
        example: "The row's overflow menu opens on Enter, not only on hover.",
      },
      {
        rule: "Carry state in something other than color as well",
        example: "A failed run reads \u201cFailed\u201d beside the red dot, not just red.",
      },
      {
        rule: "Name what a control does, not what it looks like",
        example: "\u201cRemove filter: owner is me\u201d, rather than \u201cClose\u201d.",
      },
    ],
    donts: [
      {
        rule: "Put an action behind hover alone",
        example: "A delete that only exists once the pointer is over the row.",
      },
      {
        rule: "Let a decision rest on a distinction some readers cannot see",
        example: "Two series told apart by red and green and nothing else.",
      },
      {
        rule: "Trap attention where it cannot get out",
        example: "A dialog that takes focus and never returns it to the trigger.",
      },
    ],
    broken:
      "The task cannot be completed with a keyboard alone, or the only carrier of a state is a color.",
    check: "screen",
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
    kind: "How the system is contributed to",
    why: "Reporting a gap instead of building a one-off, spending the closed sets rather than extending them. This was C5 Stewardship until 2026-08-11, and it failed the page's own test: every other constraint is owed to the person on the other side of the screen, and this one was owed to the design system. It is also already stated — `AGENTS.md` rule 1 and the ask-first boundary in `CONTRIBUTING.md` — so keeping it here made a second owner of a rule that had one. `Access` took the slot, which is the case this page was missing.",
  },
  {
    kind: "Preferences",
    why: "Anything whose failure is a matter of taste. If the broken case cannot be described as an observation, two reviewers will disagree about it forever.",
  },
]
