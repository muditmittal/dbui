/**
 * The pattern set, as data.
 *
 * Every field is a plain string. Nothing here imports React, and nothing here
 * carries markup beyond backticks for a component name, so the whole array can
 * be serialized and shipped through `dbui pattern --json` without a second copy
 * drifting away from this one. `PatternsDoc.tsx` does the rendering.
 *
 * A pattern is behavior, so `dos` and `donts` are the load-bearing fields. They
 * absorbed a three-column behavior table that read like a specification: the
 * moment and what renders now sit inside the rule, and the invariant — the part
 * a prose description always drops — is the clause after the dash.
 *
 * `states` is the exception, present only where the pattern really is a lookup
 * rather than a rule: three checkbox states, four rungs of friction, one
 * indicator per kind of endpoint. Converting those to guidance loses the
 * mapping.
 *
 * `specimen` names a live or drawn example in `PatternSpecimens.tsx`. `noSpecimen`
 * is required when there is none, because a missing example should read as a
 * judgment rather than an omission.
 *
 * `gap` is required whenever DBUI cannot express the pattern in full. Documenting
 * behavior the system does not support is how a design system loses its authority.
 */

export type PatternPart = {
  /** DBUI export name, or a short phrase when the pattern needs something we lack. */
  component: string
  role: string
}

/** A mapping the reader looks up rather than a rule they follow. */
export type PatternStates = {
  label: string
  columns: string[]
  rows: string[][]
}

export type Pattern = {
  id: string
  name: string
  group: string
  /** One line, what the pattern protects. The index entry and the search result. */
  summary: string
  /** One line, the failure it prevents. Never a restatement of the summary. */
  intent: string
  anatomy: PatternPart[]
  states?: PatternStates
  /** Key into `PatternSpecimens`. */
  specimen?: string
  /** Why this pattern has no example. Required when `specimen` is absent. */
  noSpecimen?: string
  gap?: string
  /** Plain prose. `Guidance` is shared with the principles page and renders text verbatim. */
  dos: string[]
  donts: string[]
}

export const PATTERN_GROUPS = [
  {
    name: "Finding your way in",
    summary:
      "Everything before the work starts. A workbench opens onto more objects than anyone can read.",
  },
  {
    name: "Acting at scale",
    summary:
      "One click that changes many objects. The cost of a mistake scales with the selection.",
  },
  {
    name: "Work that outlives the click",
    summary:
      "A query, a job or a scan runs longer than anyone is willing to watch.",
  },
] as const

/**
 * Patterns that belong here and are not here yet. In almost every case DBUI has
 * nothing to hang the pattern on, so the entry would be a heading followed by a
 * gap.
 */
export const DEFERRED = [
  {
    name: "Saving and inline editing",
    why: "Nothing marks a field as dirty, saving or saved, and there is no inline-edit affordance.",
  },
  {
    name: "Form validation",
    why: "`Field` owns the rules. Only cross-field timing is pattern-shaped, and it sits inside multi-step flows.",
  },
  {
    name: "Search",
    why: "Covered inside filtering. It earns an entry when search stops being one input in a `ControlsBar`.",
  },
  {
    name: "Comparison and diff",
    why: "Real for a workbench, but no component carries it, so anything written now would be a proposal.",
  },
  {
    name: "Command surfaces",
    why: "`Kbd` renders a shortcut. Nothing dispatches one and there is no command palette.",
  },
  {
    name: "Notifications and activity",
    why: "`Sonner` covers the moment after an action. Anything that outlives it has no home.",
  },
  {
    name: "New and changed callouts",
    why: "Nothing marks something as new, and the honest guidance today is not to.",
  },
]

export const PATTERNS: Pattern[] = [
  {
    id: "empty-states",
    name: "Empty states",
    group: "Finding your way in",
    summary: "Four kinds of nothing, four ways out",
    intent:
      "Treating every cause as one state sends the reader to the wrong exit, and they take it.",
    specimen: "empty-states",
    anatomy: [
      { component: "Empty", role: "The container, centered in the region it replaces" },
      { component: "EmptyMedia", role: "One icon at `variant=\"icon\"`. No illustration, no color" },
      { component: "EmptyTitle", role: "Six words or fewer, naming the cause" },
      { component: "EmptyDescription", role: "One sentence, and it is the next step" },
      { component: "EmptyContent", role: "At most one action, and only when there is one to offer" },
      { component: "Skeleton", role: "Holds the region until the count is known" },
      { component: "Alert", role: "Replaces `Empty` when the cause is a failure" },
    ],
    gap: "`Empty` has no failure variant, so an error in an empty region falls back to `Alert` and loses the centered composition. Nothing pairs the two, so the choice drifts between surfaces.",
    dos: [
      "Name the cause in the title. No queries yet and no results for that filter are different screens",
      "Keep filter and search controls mounted and populated behind an empty result",
      "Let a healthy zero read as healthy, with no action attached to it",
      "Say which grant is missing when permission is the reason, and who can grant it",
      "Give the create action the same label the page header carries, and the same behavior",
    ],
    donts: [
      "Render an empty state while a request is in flight — zero rows and unknown rows look nothing alike",
      "Offer a create action when the cause is a filter, a search term or a missing grant",
      "Word a permission block as if the objects do not exist — absence and denial are different facts",
      "Clear the search term. It has to be correctable rather than retyped",
      "Reset filters, scroll or selection on retry. A retry is not a reset",
      "Apologize, or explain the outage in terms of the system that failed",
    ],
  },
  {
    id: "filtering",
    name: "Filtering",
    group: "Finding your way in",
    summary: "Narrowing that stays legible, reversible and shareable",
    intent:
      "The controls are the easy half. Someone arriving at a shared link has to see what was excluded.",
    specimen: "filtering",
    anatomy: [
      { component: "ControlsBar", role: "One per surface, a sibling below `PageHeader`" },
      { component: "InputGroup", role: "Free-text search inside the bar, with a clear affordance" },
      { component: "Select", role: "A facet with ten or fewer fixed values" },
      { component: "Combobox", role: "A facet with more than ten, or one that needs its own search" },
      { component: "DateRange", role: "Time windows — run history, audit ranges, freshness" },
      { component: "Tag", role: "One per applied filter, each removable" },
    ],
    gap: "There is no filter-bar composition. `ControlsBar` gives the row, but the tag row, the clear-all control, the result count and URL synchronization are rebuilt per surface. There is also no single-date picker.",
    dos: [
      "Keep filter state in the URL so a view survives a reload, a share and a back button",
      "Render every active filter as a removable tag, including the ones inherited from another page",
      "Show a clear-all control as soon as a second filter is active",
      "Say how many rows matched, next to the filters that produced the number",
      "Dim the rows already on screen while the new set resolves",
    ],
    donts: [
      "Hide an active filter behind an overflow control — a hidden filter is a wrong answer that looks right",
      "Blank a table someone is reading. Only the first load gets a skeleton",
      "Use tabs for what is really a filter. A tab implies a different subject, not a smaller one",
      "Keep rows selected after a filter change removes them from view",
      "Restore a narrowed view from memory in the tab. A shared link and a back button have to agree",
      "Style an inherited filter differently from a chosen one",
      "Reach for filters under about twenty items — sort the column instead",
    ],
  },
  {
    id: "progressive-disclosure",
    name: "Progressive disclosure",
    group: "Finding your way in",
    summary: "Depth on the same surface, without losing the reader's place",
    intent:
      "What goes wrong is rarely that too much is hidden. It is that the reader loses their place when a region opens.",
    specimen: "progressive-disclosure",
    anatomy: [
      { component: "Collapsible", role: "One region, opening in place, siblings still visible" },
      { component: "Accordion", role: "Sibling regions where one open at a time is enough" },
      { component: "Drawer", role: "Detail for a selected row, beside the list rather than over it" },
      { component: "Dialog", role: "A focused task that has to finish first" },
      { component: "Popover", role: "A small interactive detail anchored to its trigger" },
      { component: "HoverCard", role: "Read-only preview. Nothing inside it is clickable" },
      { component: "Tooltip", role: "One line, on an icon-only trigger" },
      { component: "DataTree", role: "Hierarchy, where expanding is the navigation" },
    ],
    gap: "No disclosure primitive owns its own asynchronous content, so open-then-fill is written per surface. Open state is local to the component, so persisting it across a navigation is too. `Collapsible` is documented only as an inner primitive of `Accordion`.",
    dos: [
      "Name the contents in the trigger, so a closed region is still legible",
      "Open the region first and fill it second, with a skeleton between",
      "Open a region automatically when it holds a search match or a validation error",
      "Pick one affordance per kind of depth and hold it across every surface",
      "Keep open and closed alongside the filters and the scroll position",
    ],
    donts: [
      "Label a trigger more or details",
      "Hide a required field, a destructive consequence or an error behind a disclosure",
      "Move the trigger, or anything above it, when the region opens",
      "Collapse a region when its content fails. The error is the only explanation there is",
      "Count a search match the reader cannot see",
      "Nest an accordion inside an accordion",
      "Use a chevron to trigger a menu. The kebab is the menu affordance",
    ],
  },
  {
    id: "bulk-selection",
    name: "Bulk selection",
    group: "Acting at scale",
    summary: "Knowing what is selected across pages, filters and failures",
    intent:
      "Selecting is trivial. Knowing what is selected after a page turn, a filter change or nine failures is the pattern.",
    specimen: "bulk-selection",
    states: {
      label: "The header checkbox",
      columns: ["Rows selected on this page", "Header reads", "And means only"],
      rows: [
        ["None", "Clear", "Nothing is selected anywhere"],
        ["Some", "Indeterminate", "Partial selection. Never loading, never unknown"],
        ["All", "Selected", "This page. Crossing pages takes a second control"],
      ],
    },
    anatomy: [
      { component: "Checkbox", role: "One per row, plus a header checkbox that goes indeterminate" },
      { component: "Badge", role: "The count, and the scope word next to it" },
      { component: "ControlsBar", role: "Where the summary and the bulk actions sit" },
      { component: "SplitButton", role: "A primary bulk action with its alternatives" },
      { component: "AlertDialog", role: "Required as soon as the action is destructive" },
      { component: "Sonner", role: "The result, including the partial one" },
    ],
    gap: "`Table` has no selection API, so the checkbox column, the indeterminate header, persistence across pages and select-all-matching are composed by hand every time. `ControlsBar` has no selection variant either.",
    dos: [
      "Put the scope in words beside the count: this page, this filter, or every matching object",
      "Make crossing the page boundary its own control, with the real number in the label",
      "State how many selected rows are off-screen once the reader pages forward",
      "Drop rows from the selection when a filter change removes them, and let the count fall visibly",
      "Keep failed rows selected after a partial failure, so retry is the obvious next click",
      "Keep a clear-selection control reachable from every page",
    ],
    donts: [
      "Let one click cross the page boundary. Selecting everything that matches is a separate decision",
      "Reuse the indeterminate checkbox to mean anything other than partial selection",
      "Reflow the table when the bulk region appears. Reserve the space or overlay it",
      "Blank, reorder or re-sort the table while a bulk action runs",
      "Re-run a success when retrying a partial failure",
      "Report a bulk result as success when part of it failed",
      "Give the surface a second primary action. The bulk one is not it",
    ],
  },
  {
    id: "destructive-at-scale",
    name: "Destructive actions at scale",
    group: "Acting at scale",
    summary: "Friction scaled to the blast radius, not to the nerves",
    intent:
      "Dropping a schema takes every table under it, every grant on them and an unknown number of dashboards downstream, none of which is on screen.",
    noSpecimen:
      "The pattern is a ladder of thresholds rather than a moment, so the table below is the example. The one part that is temporal — an undo window closing — comes from the vendored toast library rather than from DBUI, so a demo would show behavior the system does not own.",
    states: {
      label: "The friction ladder",
      columns: ["When", "What the interface requires"],
      rows: [
        [
          "Reversible, everything affected on screen",
          "No dialog. It runs, and `Sonner` carries the undo",
        ],
        [
          "Irreversible and narrow",
          "`AlertDialog` naming the object and the exact consequence",
        ],
        [
          "Reaches objects that are not on screen",
          "The same dialog, plus a computed count by object type",
        ],
        [
          "Irreversible and wide",
          "Confirm stays inert until the object's name is entered exactly",
        ],
      ],
    },
    anatomy: [
      { component: "AlertDialog", role: "The confirmation. The overlay does not dismiss it" },
      { component: "Button", role: "`variant=\"destructive\"` on confirm, with the object's name in the label" },
      { component: "Input", role: "Typed confirmation, for the widest acts only" },
      { component: "Alert", role: "The blast radius, above the controls" },
      { component: "Table", role: "The dependency list, once it is longer than a sentence" },
      { component: "Sonner", role: "The undo window, where the act is reversible" },
    ],
    gap: "There is no typed-confirmation composition. Undo is not a system capability either — `sonner.tsx` exports only the `Toaster`, so an action inside a toast comes from the vendored library and is neither wrapped nor documented. Nothing computes or renders a blast radius.",
    dos: [
      "Count what will be affected and break the count down by object type",
      "List what depends on it, or say the check could not run",
      "Put the object's name in the confirm control so the button says what it destroys",
      "Hold everything uncommitted until the undo window closes",
      "Close the dialog on confirm and report through the long-running pattern",
      "Name each failure individually when part of the operation fails",
    ],
    donts: [
      "Confirm a reversible action. Every unnecessary dialog costs the next one its authority",
      "Spend a typed confirmation on something narrow. It is a budget and it runs out",
      "Give the destructive control the default focus. Cancel takes it",
      "Soften the sentence. The consequence goes in plain words or it is not stated",
      "Estimate a count. A number nobody verified is worse than no number",
      "Say nothing about dependents. Silence reads as there are none",
      "Report a partial delete as a delete",
    ],
  },
  {
    id: "multi-step-flows",
    name: "Multi-step flows",
    group: "Acting at scale",
    summary: "One commit point, and going back is always free",
    intent:
      "Everything entered is provisional until the last step, so the whole question is where the commit point sits and what going back costs.",
    noSpecimen:
      "DBUI has no step indicator, so the rail every wizard needs would have to be invented here. An example built out of parts the system does not ship is a proposal, not documentation.",
    anatomy: [
      { component: "Dialog", role: "The container when the flow returns the reader where they started" },
      { component: "PageHeader", role: "The container when the flow deserves its own URL" },
      { component: "Progress", role: "Position through a counted set of steps" },
      { component: "Field", role: "Each input, with its label and its error in one place" },
      { component: "Button", role: "Back and next. Next is primary, back never is" },
      { component: "KeyValuePair", role: "The review step, one row per decision" },
      { component: "AlertDialog", role: "The confirmation on abandoning entered data" },
    ],
    gap: "There is no step indicator. `Progress` draws a bar toward a known endpoint but carries no step labels, no completed and remaining states and no way back to a finished step. This is the largest gap on the page. Draft persistence is not a system capability either.",
    dos: [
      "Show the total number of steps before the reader commits to starting",
      "Validate on leaving a step, and block the move when it fails",
      "Make back free from every step, including the review",
      "Mark the earlier step a later choice invalidated, and say what changed",
      "List every decision on the review step, each linking to the step that set it",
      "Hand a slow commit to the long-running pattern instead of holding the dialog open",
      "Name the step an error came from, and take the reader to it",
    ],
    donts: [
      "Use a wizard for steps that do not depend on each other. That is a form with sections",
      "Wrap a wizard around an object that already exists. Edit it in place instead",
      "Write partial state at each step. That is an editor wearing a wizard's clothes",
      "Validate on keystroke inside a step",
      "Claim a saved draft the system does not store",
      "Lose an entered value on back, or ask for it twice after a failed commit",
      "Leave a half-created object unmentioned. It is the worst outcome this pattern has",
    ],
  },
  {
    id: "long-running-operations",
    name: "Long-running operations",
    group: "Work that outlives the click",
    summary: "Releasing the reader without losing track of the work",
    intent:
      "General design systems treat this as a loading state and stop, which is why it is the pattern most often rebuilt badly.",
    specimen: "long-running",
    states: {
      label: "Which indicator",
      columns: ["What is known", "What renders"],
      rows: [
        ["It finishes before an indicator would be visible", "Nothing. The result replaces what was there"],
        ["It is still running past the flicker threshold", "The trigger takes a busy state where it stands"],
        ["It is running and the endpoint is unknowable", "`Spinner` beside a label naming the work"],
        ["It is running and the endpoint is real", "`Progress` with the step count or percentage"],
        ["It runs longer than anyone should watch", "A named run with a `Status`, and the reader is released"],
        ["Several are running at once", "One summary with a count, detail one click away"],
      ],
    },
    anatomy: [
      { component: "Spinner", role: "Indeterminate work, past the flicker threshold" },
      { component: "Progress", role: "Determinate work, where the endpoint is genuinely known" },
      { component: "Status", role: "The state of a named run, icon and label together" },
      { component: "Sonner", role: "The completion notice, for a reader who has moved on" },
      { component: "Alert", role: "A failure that needs a decision rather than a glance" },
      { component: "Button", role: "A cancel that genuinely cancels, or no cancel at all" },
    ],
    gap: "There is no run component. The composed object — a named operation with elapsed time, a cancel, a result link and a lifecycle — is rebuilt on every surface that has runs. `Spinner` and `Progress` have no built-in delay and no token defines the flicker threshold, so each surface picks its own. Nothing re-fetches on window focus.",
    dos: [
      "Pick the indicator from what is known about the endpoint, not from how the wait feels",
      "Keep the trigger's width and label when it takes a busy state",
      "Release the reader as soon as the work has an identity they can return to",
      "Say plainly that the work continues after they navigate away",
      "Re-fetch run state when the tab regains focus",
      "Keep the inputs, so a failed run is re-runnable without re-entering anything",
      "Keep canceled distinct from failed everywhere the outcome is shown",
    ],
    donts: [
      "Show a determinate bar for work with no knowable end. A reader can time an invented endpoint",
      "Animate progress backwards, or park it at the last percent",
      "Trust state that was fetched before the tab lost focus",
      "Offer a cancel for work that is past the point of canceling",
      "Make a toast the only place a completion was recorded. The run's own state is the record",
      "Render a column of spinners where one count would do",
    ],
  },
  {
    id: "partial-results",
    name: "Partial results",
    group: "Work that outlives the click",
    summary: "Saying so, at the number, when the answer is incomplete",
    intent:
      "A truncated result is plausible, well formatted and wrong, and it looks exactly like a right one.",
    specimen: "partial-results",
    anatomy: [
      { component: "Alert", role: "The region-level statement of what is missing and why" },
      { component: "Badge", role: "The marker on the result itself — sampled, truncated, cached" },
      { component: "Status", role: "Per-source outcome, when a result comes from several" },
      { component: "Tooltip", role: "One line of detail behind the marker" },
      { component: "KeyValuePair", role: "Freshness and scope in a detail panel" },
      { component: "Empty", role: "When the permission filter removed everything" },
    ],
    gap: "Nothing in DBUI carries provenance. No component pairs a value with its freshness, its scope or its completeness, so a truncated result looks like a different thing in each product area. This is the widest distance on the page between what the principles ask for and what the components can do.",
    dos: [
      "State the gap at the number or the row, not only in a banner at the top",
      "Mark every aggregate computed over a sample or a truncated set",
      "Name which source failed and which ones did not",
      "Put freshness beside the data, with a refresh control",
      "Carry the caveat into exports, copies and anything an agent reads back",
      "Send a permission filter that removed every row to an empty state naming the missing grant",
    ],
    donts: [
      "Filter rows for permission without saying that rows were filtered",
      "Show a truncated count where a total belongs",
      "Render a number derived from a sample as a plain number",
      "Write some data may be missing when you know exactly what is missing",
      "Let a dismissible banner be the only record. The banner is dismissible, the fact is not",
      "Hedge a complete answer",
    ],
  },
]
