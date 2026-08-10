/**
 * The constraint set, as data.
 *
 * Every field is a plain string and nothing here imports React, so the whole
 * array can be handed to an agent without rendering anything. That is the point
 * rather than a convenience: a constraint that only exists as a rendered page
 * cannot reach the thing writing the code. `page.tsx` is one view of this file.
 *
 * A row earns its place by closing something off. `forbids` names what stops
 * being possible, `buys` names what you may therefore rely on and `broken`
 * names the observation that proves it was ignored. A sentence that cannot fill
 * those three is a rule about what to type, and the linter owns those.
 *
 * `principle` is the aspect word of the principle a constraint serves, matching
 * the eyebrow on `/docs/principles`. Empty means none of the six covers it,
 * which is a finding rather than an omission.
 *
 * `check` says who can see the violation. Nothing says `lint`, because no rule
 * in the React linter reads structure or behavior. That gap is stated on the
 * page.
 *
 * `gap` is required wherever the system cannot honor the constraint today.
 * A constraint the components contradict is worth more written down than left
 * out, and less than nothing written down as though it held.
 */

export type Constraint = {
  id: string
  group: string
  /** The closure, in the form worth remembering. */
  statement: string
  forbids: string
  buys: string
  broken: string
  /** Aspect word from `/docs/principles`, or empty when none of the six applies. */
  principle: string
  /** Where the system falls short of its own constraint. */
  gap?: string
  check: "review" | "screen"
}

export const CONSTRAINT_GROUPS = [
  {
    name: "Closed sets",
    summary:
      "What the system refuses to grow. Every other constraint rests on these, because none of them can hold while the vocabulary is still expanding.",
  },
  {
    name: "Interaction",
    summary:
      "What a control does in the moment it is used. The thinnest group here, and the section on gaps says why.",
  },
  {
    name: "Behavior",
    summary:
      "What the product does with data between one click and the next. Where a workbench differs from a website.",
  },
] as const

export const CONSTRAINTS: Constraint[] = [
  {
    id: "S1",
    group: "Closed sets",
    statement: "Status is four words and nothing adds a fifth.",
    forbids:
      "A fifth sentiment, and a synonym for one of the four — danger, error, success, confirm.",
    buys:
      "A color anywhere in the product means one of four things, so the vocabulary is learned once and read everywhere.",
    broken:
      "A token, a badge variant or a sentence names a state the four do not already cover.",
    principle: "Visuals",
    check: "review",
  },
  {
    id: "S2",
    group: "Closed sets",
    statement: "Text has four weights of emphasis and opacity never makes a fifth.",
    forbids: "An opacity utility standing in for a de-emphasized foreground.",
    buys:
      "Every foreground has a contrast ratio measured against the surface it belongs on. A color arrived at by opacity has none, and nothing measures it later.",
    broken: "An opacity utility on text, or on a control that holds text.",
    gap: "Nine components dim a disabled control with `opacity-50` rather than the three disabled tokens, so the system breaks this itself.",
    principle: "Evidence",
    check: "review",
  },
  {
    id: "S3",
    group: "Closed sets",
    statement: "Chart color and interface color never cross.",
    forbids:
      "Picking a hue for a series by hand, and using a chart color to carry a state.",
    buys:
      "A mark can never be mistaken for a status, which is the one confusion a data product cannot afford.",
    broken:
      "A chart module resolves a hue directly, or a status renders in a chart color.",
    gap: "The chart semantics carry a categorical ramp and a sequential ramp and nothing else. A chart that means healthy or unhealthy borrows `status-text-*` today, so the constraint holds in one direction only.",
    principle: "Visuals",
    check: "review",
  },
  {
    id: "S4",
    group: "Closed sets",
    statement: "A missing component is a gap to report, not a component to build.",
    forbids: "A one-off control, and any icon package.",
    buys:
      "Everything on screen carries documented rules, so a review reads rules rather than taste.",
    broken:
      "A screen renders an interactive element no package exports. The linter catches a raw element and an unknown import. It does not catch a one-off assembled correctly out of parts.",
    principle: "Restraint",
    check: "review",
  },

  {
    id: "I1",
    group: "Interaction",
    statement: "Nothing moves under the pointer.",
    forbids:
      "A control that resizes when it takes a busy state, a region that shifts its own trigger as it opens, and a bar that reflows the table above it.",
    buys:
      "A second click lands where it was aimed. At a table's density that is the difference between selecting a row and opening one.",
    broken: "Click twice in the same place and the second click hits something else.",
    principle: "Visuals",
    check: "screen",
  },
  {
    id: "I2",
    group: "Interaction",
    statement: "A loading indicator is delayed and then held. It never flashes.",
    forbids:
      "An indicator that can appear and disappear inside the time it takes to notice it.",
    buys: "A screen on a fast network is still.",
    broken: "A spinner blinks on a response that was already fast.",
    gap: "No token defines the threshold and neither `Spinner` nor `Progress` carries a delay, so every surface picks its own number or picks none.",
    principle: "Restraint",
    check: "screen",
  },
  {
    id: "I3",
    group: "Interaction",
    statement: "Zero rows and unknown rows never render the same.",
    forbids: "An empty state while a request is in flight.",
    buys:
      "An empty state is always a fact about the data rather than a fact about the network.",
    broken: "An empty state appears and is then replaced by rows.",
    principle: "Evidence",
    check: "screen",
  },
  {
    id: "I4",
    group: "Interaction",
    statement: "Nothing is reachable only by hover.",
    forbids:
      "An action that exists only inside a hover surface, and a row control that appears on hover with no keyboard route to it.",
    buys: "Touch and the keyboard reach everything the mouse does.",
    broken: "Tab through the screen and a control never takes focus.",
    principle: "",
    check: "screen",
  },
  {
    id: "I5",
    group: "Interaction",
    statement: "Motion explains a change or does not happen.",
    forbids: "An entrance, a pulse or a transition that marks no change of state.",
    buys:
      "Movement carries meaning, so it can be watched for rather than tuned out.",
    broken: "Something animates and nothing about the screen is different afterwards.",
    gap: "The three duration tokens have no consumer. Every transition in the components runs at the bundler's default, so the system has an opinion about when to move and no value for how long.",
    principle: "Visuals",
    check: "screen",
  },
  {
    id: "I6",
    group: "Interaction",
    statement: "One primary action per surface, and it is never destructive.",
    forbids:
      "Two filled buttons competing on one surface, and a destructive control reachable before a confirmation.",
    buys:
      "The main action is found without reading, and nothing irreversible sits where the eye goes first.",
    broken:
      "Two filled buttons in one header, or a red filled button that runs on the first click.",
    principle: "Restraint",
    check: "review",
  },

  {
    id: "B1",
    group: "Behavior",
    statement: "Friction matches the blast radius, in both directions.",
    forbids:
      "An irreversible action that runs without naming its consequence, and a dialog on something reversible.",
    buys:
      "A confirmation carries information, because it stays rare enough to still be read.",
    broken:
      "A dialog says nothing the button label did not, or something wide runs on one click.",
    principle: "Automation",
    check: "review",
  },
  {
    id: "B2",
    group: "Behavior",
    statement: "A selection is lost only when its objects are.",
    forbids:
      "Clearing a selection on a page turn, a sort or a refresh, and keeping rows selected that a filter has removed.",
    buys:
      "The count beside a bulk action is always true, which is the only thing that makes the action safe to press.",
    broken:
      "The count changes for a reason the reader did not cause, or fails to change when they did.",
    principle: "Audience",
    check: "screen",
  },
  {
    id: "B3",
    group: "Behavior",
    statement: "What narrows a view lives in the URL.",
    forbids: "Holding filters, search or sort only in memory.",
    buys: "A shared link, a reload and the back button all show the same rows.",
    broken: "Reloading a filtered page returns the unfiltered one.",
    gap: "Nothing in the system does this. There is no filter-bar composition, so URL synchronization is written per surface and correct per surface.",
    principle: "Audience",
    check: "screen",
  },
  {
    id: "B4",
    group: "Behavior",
    statement: "An incomplete answer says so where the number is.",
    forbids:
      "A value derived from a sample, a truncation or a cache rendered as a plain value, and a permission filter that removes rows silently.",
    buys: "A number with no marker on it is a number that was checked.",
    broken:
      "A banner at the top of a region is the only place the caveat appears, or the value survives being copied out without it.",
    gap: "Nothing in DBUI carries provenance. No component pairs a value with its freshness, its scope or its completeness, so the marker is composed differently on every surface.",
    principle: "Evidence",
    check: "review",
  },
  {
    id: "B5",
    group: "Behavior",
    statement: "A partial failure is never reported as a success.",
    forbids: "A summary that counts what succeeded and not what did not.",
    buys:
      "The exact set that failed can be retried, instead of running the whole operation again.",
    broken: "An operation over many objects reports one outcome.",
    principle: "Voice",
    check: "review",
  },
  {
    id: "B6",
    group: "Behavior",
    statement: "Work that outlives the click gets an identity the reader can return to.",
    forbids:
      "Holding a reader on a screen for work that has a run, and letting a toast be the only record that something happened.",
    buys:
      "Navigating away is never a loss, which is what lets the interface release someone rather than trap them.",
    broken: "Closing the tab is the only way to find out what happened.",
    gap: "There is no run component. A named operation with elapsed time, a cancel and a link to its result is rebuilt on every surface that has runs.",
    principle: "Automation",
    check: "screen",
  },
  {
    id: "B7",
    group: "Behavior",
    statement: "Automation shows what it will do before it does it.",
    forbids: "A generated query, filter or bulk edit that executes and shows only its result.",
    buys:
      "The decision stays with the person, which is what makes generation usable on data someone is accountable for.",
    broken: "The outcome is visible and the thing that produced it is not.",
    principle: "Automation",
    check: "review",
  },
]

/**
 * Candidates that were collected and cut. Listed because the cut is the
 * argument: a page of sixty entries where half are lint rules teaches nobody
 * what a constraint is.
 */
export const CUT = [
  {
    kind: "Anything the linter reads",
    why: "A semantic token over a hex, a type class unpaired with `leading-`, a padding on the space family. Those say what to type. `yarn dbui check` already refuses them, and a constraint that a machine settles does not need a page.",
  },
  {
    kind: "Component thresholds",
    why: "Ten options before a `Combobox`, seven tabs, five breadcrumb levels. These pick between two components rather than closing a possibility, and they are already the component's own JSDoc.",
  },
  {
    kind: "Facts of construction",
    why: "Primitives ship in no CSS. Nothing can consume one, so nothing can break it. A constraint that cannot be violated is an architecture note.",
  },
  {
    kind: "Preferences",
    why: "Anything whose failure is a matter of taste. If the broken case cannot be described as an observation, two reviewers will disagree about it forever.",
  },
]
