/**
 * The pattern set, as data.
 *
 * Every field is a plain string. Nothing here imports React, and nothing here
 * carries markup beyond backticks for a component name, so the whole array can
 * be serialized and shipped through `dbui pattern --json` without a second copy
 * drifting away from this one. `docs/PatternKit.tsx` does the rendering.
 *
 * A pattern is behavior, so `behavior` is the load-bearing field. `moment` is a
 * trigger or an elapsed threshold, `does` is what renders, and `invariant` is
 * what has to survive the transition — the part that gets dropped when a
 * pattern is described in prose.
 *
 * `gap` is required whenever DBUI cannot express the pattern in full. Documenting
 * behavior the system does not support is how a design system loses its authority.
 */

export type PatternPart = {
  /** DBUI export name, or a short phrase when the pattern needs something we lack. */
  component: string
  role: string
}

export type PatternMoment = {
  moment: string
  does: string
  invariant: string
}

export type Pattern = {
  id: string
  name: string
  group: string
  /** One line, the failure the pattern prevents. The index entry and the search result. */
  summary: string
  intent: string
  use: string[]
  avoid: string[]
  anatomy: PatternPart[]
  behavior: PatternMoment[]
  gap?: string
  /** Plain prose. `Guidance` is shared with the principles page and renders text verbatim. */
  dos: string[]
  donts: string[]
}

export const PATTERN_GROUPS = [
  {
    name: "Finding your way in",
    summary:
      "Everything that happens before the work starts. A workbench opens onto more objects than anyone can read, so the first job of the interface is to get the reader from everything to the few rows that matter.",
  },
  {
    name: "Acting at scale",
    summary:
      "One click that changes many objects. The cost of a mistake scales with the selection, so these patterns are mostly about making scope visible and keeping the exit open.",
  },
  {
    name: "Work that outlives the click",
    summary:
      "A query, a job or a scan runs longer than the person is willing to watch. These are the patterns general design systems cover least well and where a workbench has the most to say.",
  },
] as const

/**
 * Patterns that belong here and are not here yet. Each row names the reason,
 * and in most cases the reason is that DBUI has nothing to hang the pattern on,
 * so the entry would be a heading followed by a gap.
 */
export const DEFERRED = [
  {
    name: "Saving and inline editing",
    why: "Explicit against automatic saving is a genuine decision, but nothing in DBUI marks a field as dirty, saving or saved, and there is no inline-edit affordance. The entry would be gap end to end.",
  },
  {
    name: "Form validation",
    why: "The rules belong to `Field` and its JSDoc owns them. Only the cross-field timing question is pattern-shaped, and it is small enough to live inside multi-step flows for now.",
  },
  {
    name: "Search",
    why: "Covered inside filtering, where it currently lives in practice. It earns its own entry when search stops being one input in a `ControlsBar`.",
  },
  {
    name: "Comparison and diff",
    why: "Real for a workbench — two query plans, two schema versions, two runs. There is no component for it, so anything written now would be a proposal rather than documentation.",
  },
  {
    name: "Command surfaces and shortcuts",
    why: "`Kbd` renders a shortcut. Nothing dispatches one, and there is no command palette, so there is no behavior to document.",
  },
  {
    name: "Notifications and activity",
    why: "`Sonner` covers the moment after an action. Anything that has to persist past it has no home in the system.",
  },
  {
    name: "New and changed feature callouts",
    why: "Nothing in DBUI marks something as new, and the honest guidance today is not to.",
  },
]

export const PATTERNS: Pattern[] = [
  {
    id: "empty-states",
    name: "Empty states",
    group: "Finding your way in",
    summary: "Four different kinds of nothing, four different ways out",
    intent:
      "A region with no rows has at least four unrelated causes, and each one has a different way out. Treating them as one state is the most common failure in this pattern — a table filtered down to nothing that says “create your first query” has sent the reader to the wrong action, and they will create a second query they did not need.",
    use: [
      "A region that normally holds a collection has nothing to show",
      "The reason for the nothing is known, and the way out differs by reason",
      "A queue is legitimately at zero and that is a good outcome",
    ],
    avoid: [
      "The request is still in flight — use `Skeleton` in the shape of the incoming rows",
      "A region that already holds content hit a recoverable error — use `Alert` above it",
      "One field is blank inside a form — use `Field` helper text",
    ],
    anatomy: [
      { component: "Empty", role: "The container, centered in the content area it replaces" },
      { component: "EmptyMedia", role: "One icon at `variant=\"icon\"`. No illustration, no color" },
      { component: "EmptyTitle", role: "Six words or fewer, naming the cause rather than the absence" },
      { component: "EmptyDescription", role: "One sentence, and it is the next step" },
      { component: "EmptyContent", role: "At most one primary action, and only when there is one to offer" },
      { component: "Alert", role: "Stands in for `Empty` when the cause is a failure" },
      { component: "Skeleton", role: "What occupies the region until the count is known" },
    ],
    behavior: [
      {
        moment: "Request in flight",
        does: "`Skeleton` rows matching the shape of the incoming table",
        invariant: "`Empty` never renders on the way to data. Zero rows and unknown rows look nothing alike",
      },
      {
        moment: "Zero rows, no filter applied",
        does: "`Empty` naming what the region holds, with the action that creates the first one",
        invariant: "The action carries the same label as the one in `PageHeader`, and does the same thing",
      },
      {
        moment: "Zero rows, filters applied",
        does: "`Empty` naming the active filters, with a clear-filters action",
        invariant: "Every filter control stays mounted and keeps its value. The way out is where the way in was",
      },
      {
        moment: "Zero rows, search term entered",
        does: "`Empty` repeating the term, with a clear-search action",
        invariant: "The term stays in the input so it can be corrected rather than retyped",
      },
      {
        moment: "Permission hides every row",
        does: "`Empty` naming the grant that is missing and who can give it",
        invariant: "Never worded as if the objects do not exist. Absence and denial are different facts",
      },
      {
        moment: "The request failed",
        does: "`Alert` at `variant=\"danger\"` in the region, with a retry action",
        invariant: "Filters, scroll and selection survive the retry. A retry is not a reset",
      },
      {
        moment: "Zero rows and that is the healthy state",
        does: "`Empty` with a title and no action",
        invariant: "No action is invented to fill the slot. An empty failure queue is good news",
      },
    ],
    gap: "`Empty` has no failure variant, so an error in an otherwise empty region falls back to `Alert` and loses the centered composition. Nothing pairs the two, so the choice is made per surface and drifts between them.",
    dos: [
      "Name the cause in the title — “no results for that filter” and “no queries yet” are different states with different exits",
      "Keep filter and search controls mounted, populated and reachable behind an empty result",
      "Let a healthy zero read as healthy, with no call to action attached to it",
      "Say which grant is missing when permission is the reason, and who can grant it",
    ],
    donts: [
      "Serve one empty state for every cause and let the reader work out which one they hit",
      "Offer a create action when the reason is a filter, a search term or a missing grant",
      "Render an empty state while a request is still in flight",
      "Apologize, or explain the outage in terms of the system that failed",
    ],
  },
  {
    id: "filtering",
    name: "Filtering",
    group: "Finding your way in",
    summary: "Narrowing that stays legible, reversible and shareable",
    intent:
      "Filtering is how a workbench gets from a hundred thousand objects to the four being worked on. The controls are the easy half. The hard half is that the narrowed view has to stay legible, reversible and shareable — someone arriving at a link should be able to tell what has been excluded without reading every control, and someone who came back after lunch should find the same view they left.",
    use: [
      "The collection is large enough that scanning fails, and the reader knows an attribute of what they want",
      "The narrowed view is worth sharing or returning to",
      "Several attributes combine — owner and status and time window at once",
    ],
    avoid: [
      "Fewer than about twenty items — sort the column instead",
      "The reader knows the exact name — put search first and filters second",
      "The choice changes what the page is about rather than narrowing it — use `Tabs`",
    ],
    anatomy: [
      { component: "ControlsBar", role: "One per surface, a sibling below `PageHeader`, never nested in it" },
      { component: "ControlsBarFilters", role: "The left cluster. Wraps to a second line rather than truncating" },
      { component: "InputGroup", role: "Free-text search inside the bar, with a clear affordance" },
      { component: "Select", role: "A facet with ten or fewer fixed values" },
      { component: "Combobox", role: "A facet with more than ten, or one that needs its own search" },
      { component: "DateRange", role: "Time windows — run history, audit ranges, freshness" },
      { component: "Tag", role: "One per applied filter, each removable" },
      { component: "Empty", role: "The filtered-to-zero state, with a clear-filters action" },
    ],
    behavior: [
      {
        moment: "A filter is applied",
        does: "Results narrow and a removable `Tag` appears for it",
        invariant: "Applied filters read as text somewhere, not only as the state of a control",
      },
      {
        moment: "Re-filtering takes longer than a moment",
        does: "The current rows stay and dim while the new set resolves",
        invariant: "A table someone is reading is never blanked to a skeleton. Only the first load gets a skeleton",
      },
      {
        moment: "Zero matches",
        does: "`Empty` naming the active filters, offering to clear them",
        invariant: "Every control keeps its value, so one filter can be relaxed rather than all of them dropped",
      },
      {
        moment: "A filter is removed",
        does: "Results widen and the tag disappears",
        invariant: "Scroll returns to the top. Rows selected under the old filter are released, and the count says so",
      },
      {
        moment: "The reader leaves the page and comes back",
        does: "The same narrowed view loads",
        invariant: "State is restored from the URL, not from memory in the tab. A shared link and a back button agree",
      },
      {
        moment: "A filter arrives preset from another surface",
        does: "Its `Tag` renders alongside the ones set here, styled identically",
        invariant: "An inherited filter is as visible and as removable as a chosen one",
      },
      {
        moment: "More than about four filters are active",
        does: "Tags wrap to a second line and a clear-all control appears",
        invariant: "No active filter is ever collapsed behind an overflow control",
      },
    ],
    gap: "There is no filter-bar composition. `ControlsBar` gives the row, but the applied-filter tag row, the clear-all control, the result count and URL synchronization are rebuilt per surface today. There is also no single-date picker — `DateRange` is the only date control.",
    dos: [
      "Keep filter state in the URL so a narrowed view survives a reload, a share and a back button",
      "Render every active filter as a removable tag, including the ones inherited from another page",
      "Show a clear-all control as soon as a second filter is active",
      "Say how many rows matched, near the filters that produced the number",
    ],
    donts: [
      "Hide an active filter behind an overflow control — a hidden filter is a wrong answer that looks right",
      "Replace visible results with a skeleton while re-filtering",
      "Use tabs for what is really a filter. A tab implies a different subject, not a smaller one",
      "Keep rows selected after a filter change removes them from view",
    ],
  },
  {
    id: "progressive-disclosure",
    name: "Progressive disclosure",
    group: "Finding your way in",
    summary: "Depth on the same surface, without losing the reader's place",
    intent:
      "A catalog object carries forty attributes and three of them matter right now. Disclosure is choosing the three. What actually goes wrong is rarely that too much is hidden — it is that the reader loses their place when a region opens, or that the same kind of depth sits behind a chevron here, a drawer there and a dialog somewhere else, so nothing can be learned once.",
    use: [
      "A minority of readers need a detail that would cost every reader a scan",
      "The detail belongs to the object in view, and leaving the object would break the task",
      "One surface has to serve both a scan and an inspection",
    ],
    avoid: [
      "Everyone needs it. That is not disclosure, that is a layout problem",
      "Opening it hides what it was opened from — that is a page, not a disclosure",
      "The content is a list of actions — use `DropdownMenu`",
      "The field is required. A requirement is never hidden",
    ],
    anatomy: [
      { component: "Collapsible", role: "One region, opening in place, siblings still visible" },
      { component: "Accordion", role: "A set of sibling regions where one open at a time is enough" },
      { component: "Drawer", role: "Detail for a selected row, beside the list rather than over it" },
      { component: "Dialog", role: "A focused task that has to finish before the reader goes back" },
      { component: "Popover", role: "A small interactive detail anchored to its trigger" },
      { component: "HoverCard", role: "Read-only preview. Nothing inside it is clickable" },
      { component: "Tooltip", role: "One line, on an icon-only trigger" },
      { component: "DataTree", role: "Hierarchy, where expanding is the navigation" },
    ],
    behavior: [
      {
        moment: "Trigger at rest",
        does: "A chevron and a label naming what is inside",
        invariant: "The label says what the region holds. Never “more” or “details”",
      },
      {
        moment: "Region opens",
        does: "Content expands in place below the trigger",
        invariant: "The trigger does not move and nothing above it reflows. The reader keeps their anchor",
      },
      {
        moment: "Content is still loading when the region opens",
        does: "The region opens at once and holds a `Skeleton`",
        invariant: "Opening never waits on a fetch. Opening is instant, filling is not",
      },
      {
        moment: "Content fails to load",
        does: "`Alert` inside the open region, with a retry",
        invariant: "The region stays open. Collapsing on failure hides the only explanation",
      },
      {
        moment: "The reader leaves the surface and returns",
        does: "The region is in the state they left it",
        invariant: "Open and closed is state worth keeping, and it belongs with the filters and the scroll",
      },
      {
        moment: "A search matches text inside a closed region",
        does: "The region opens and the match is marked",
        invariant: "Never count a match the reader cannot see",
      },
      {
        moment: "A field inside a closed region fails validation",
        does: "The region opens and stays open, focus moves to the field",
        invariant: "A form never reports an error the reader has to go hunting for",
      },
      {
        moment: "A drawer opens for a row",
        does: "The list stays visible and the row is marked as selected",
        invariant: "The drawer and the selected row are one fact shown twice, so closing one clears the other",
      },
    ],
    gap: "No disclosure primitive owns its own asynchronous content. Each takes children and knows nothing about loading, so the skeleton-on-open behavior above is written per surface. Open state is local to the component, so persisting it across a navigation is also per surface. `Collapsible` is documented only as an inner primitive of `Accordion` and carries no rules of its own.",
    dos: [
      "Name the contents in the trigger, so a closed region is still legible",
      "Open the region first and fill it second, with a skeleton in between",
      "Open a region automatically when it holds a search match or a validation error",
      "Pick one affordance per kind of depth and hold it across every surface",
    ],
    donts: [
      "Hide a required field, a destructive consequence or an error behind a disclosure",
      "Nest an accordion inside an accordion",
      "Use a chevron to trigger a menu. The kebab is the menu affordance",
      "Move the trigger, or the content above it, when the region opens",
    ],
  },
  {
    id: "bulk-selection",
    name: "Bulk selection",
    group: "Acting at scale",
    summary: "Knowing what is selected across pages, filters and failures",
    intent:
      "The moment a table grows a checkbox column, every action on the page acquires a second meaning: does this apply to the row under my cursor or to the 812 rows I selected three filters ago. Bulk selection is almost entirely a scope problem. Selecting is trivial. Knowing what is selected — across a page boundary, across a filter change, after nine of forty operations failed — is the pattern.",
    use: [
      "The same action gets applied to many objects and doing it one at a time is the actual complaint",
      "The set can be described in words: this page, this filter, every match",
      "The result of the action is inspectable afterwards",
    ],
    avoid: [
      "The action is only ever taken on one object — put it in a row-level `DropdownMenu`",
      "The collection is small enough to act on directly",
      "The action cannot be previewed or reversed. Keep it single-object until one of those is true",
    ],
    anatomy: [
      { component: "Checkbox", role: "One per row, plus a header checkbox that goes indeterminate" },
      { component: "Table", role: "The rows. Selection state is held by the surface, not the component" },
      { component: "ControlsBar", role: "Where the selection summary and the bulk actions sit" },
      { component: "Badge", role: "The count, and the scope word next to it" },
      { component: "SplitButton", role: "A primary bulk action with its related alternatives" },
      { component: "Pagination", role: "The boundary the selection has to survive, or explicitly not" },
      { component: "AlertDialog", role: "Required as soon as the bulk action is destructive" },
      { component: "Sonner", role: "The result, including the partial one" },
    ],
    behavior: [
      {
        moment: "Nothing selected",
        does: "No bulk region. Row actions behave as usual",
        invariant: "The surface still has exactly one primary action, and it is not a bulk one",
      },
      {
        moment: "First row selected",
        does: "The bulk region appears with a count, a scope word and the actions",
        invariant: "Its appearance does not reflow the table. Reserve the space or overlay it",
      },
      {
        moment: "Header checkbox clicked",
        does: "Every row on the current page is selected",
        invariant: "“All” means this page unless the interface says otherwise in words, right next to the count",
      },
      {
        moment: "Some rows selected, not all",
        does: "The header checkbox goes indeterminate",
        invariant: "Indeterminate means partial selection and nothing else. Never loading, never unknown",
      },
      {
        moment: "A full page is selected and more pages match",
        does: "A separate control offers to select every matching object, naming the number",
        invariant: "Crossing the page boundary is a decision the reader makes, never a consequence of one click",
      },
      {
        moment: "The reader pages forward with a selection held",
        does: "The count persists and states how many selected rows are off-screen",
        invariant: "A number the reader cannot see is still a number they are accountable for",
      },
      {
        moment: "A filter changes under a live selection",
        does: "Rows that no longer match leave the selection and the count drops visibly",
        invariant: "The count never covers rows the reader can no longer open and inspect",
      },
      {
        moment: "The bulk action runs",
        does: "Affected rows take a pending state in place and the selection is held",
        invariant: "The table is not blanked, not reordered and not blocked while the work runs",
      },
      {
        moment: "Some succeed and some fail",
        does: "Successes leave the selection, failures stay selected and carry a per-row reason",
        invariant: "Retry acts only on what failed. A partial failure never re-runs a success",
      },
      {
        moment: "Everything succeeds",
        does: "Selection clears and `Sonner` reports the count",
        invariant: "The number in the toast matches the number in the confirmation that preceded it",
      },
    ],
    gap: "`Table` has no selection API. The checkbox column, the header's indeterminate state, persistence across pages and select-all-matching are composed by hand on every surface that needs them. There is no bulk action bar either — `ControlsBar` is the right home but has no selection variant, so the count, the scope word, the clear control and the actions are laid out from scratch each time.",
    dos: [
      "Put the scope in words beside the count: this page, this filter, or every matching object",
      "Make crossing the page boundary its own control, with the real number in the label",
      "Keep failed rows selected after a partial failure, so retry is the obvious next click",
      "Keep a clear-selection control reachable from every page, including the ones with no selected rows on them",
    ],
    donts: [
      "Let a filter change the selected set without changing the visible count",
      "Reuse the indeterminate checkbox to mean anything other than partial selection",
      "Blank, reorder or re-sort the table while a bulk action is running",
      "Report a bulk result as success when part of it failed",
    ],
  },
  {
    id: "destructive-at-scale",
    name: "Destructive actions at scale",
    group: "Acting at scale",
    summary: "Friction scaled to the blast radius, not to the nerves",
    intent:
      "Dropping one table is a confirmation. Dropping a schema is a different act — it takes every table under it, every grant attached to them and an unknown number of dashboards downstream, none of which is on the screen when the button is clicked. Friction has to scale with two things at once: how wide the blast radius is and whether the act can be taken back. The top rung of that ladder is not more friction. It is showing the radius.",
    use: [
      "The action removes, overwrites or revokes something, and repeating it will not bring it back",
      "The number of affected objects is larger than the number on screen",
      "Other objects depend on what is about to change",
    ],
    avoid: [
      "Repeating the action undoes it. Just do it, with no dialog at all",
      "Everything affected is visible and reversible — an undo window is enough",
      "The friction is compensating for a bad default. Fix the default",
    ],
    anatomy: [
      { component: "AlertDialog", role: "The confirmation. Carries both cancel and confirm, and the overlay does not dismiss it" },
      { component: "Button", role: "`variant=\"destructive\"` on confirm, and the object's name in the label" },
      { component: "Input", role: "Typed confirmation, for the widest and least reversible acts only" },
      { component: "Alert", role: "The blast radius, stated inside the dialog before the controls" },
      { component: "Table", role: "The dependency list, once it is longer than a sentence" },
      { component: "Sonner", role: "The undo window, where the act is reversible" },
      { component: "Badge", role: "The count, by object type" },
    ],
    behavior: [
      {
        moment: "Reversible, and everything affected is on screen",
        does: "It runs. `Sonner` reports it and carries an undo action",
        invariant: "No dialog. Confirming a reversible act trains people to dismiss the dialog that matters",
      },
      {
        moment: "The undo window is open",
        does: "The toast holds for its full duration and the row shows as pending",
        invariant: "Nothing is committed until the window closes. Undo restores, it does not re-create",
      },
      {
        moment: "Undo is clicked",
        does: "The row returns to the state it was in",
        invariant: "It is the same object with the same identity, not a copy wearing the same name",
      },
      {
        moment: "Irreversible, and narrow",
        does: "`AlertDialog` names the object and the exact consequence",
        invariant: "The sentence says the act cannot be undone. Cancel takes focus, not confirm",
      },
      {
        moment: "The act reaches objects that are not on screen",
        does: "The dialog states the count by object type, above the controls",
        invariant: "The count is computed, not estimated. A number nobody verified is worse than no number",
      },
      {
        moment: "Something downstream depends on it",
        does: "Dependents are listed, or the dialog says the check could not run",
        invariant: "Saying nothing about dependents reads as “there are none”",
      },
      {
        moment: "Irreversible and wide",
        does: "Confirm stays inert until the object's name is entered exactly",
        invariant: "Typing forces a re-read, so the name in the field is the name in the sentence above it",
      },
      {
        moment: "Confirm is clicked",
        does: "The dialog closes and the work reports through the long-running pattern",
        invariant: "The dialog does not sit and spin. Confirming and reporting are separate moments",
      },
      {
        moment: "Part of the operation fails",
        does: "Failures are named individually and successes are not retried",
        invariant: "A partial delete is never reported as a delete",
      },
    ],
    gap: "There is no typed-confirmation composition — `AlertDialog` plus `Input` plus the match check is assembled by hand each time. Undo is not a system capability either: `sonner.tsx` exports only the `Toaster`, so an action inside a toast comes from the vendored library and is neither wrapped nor documented. Nothing in DBUI computes or renders a blast radius, so the counts above are the surface's job to produce.",
    dos: [
      "Scale the friction to the blast radius and the reversibility, not to how nervous the action feels",
      "Count what will be affected and break the count down by object type",
      "Say what could not be checked when a dependency lookup fails or times out",
      "Put the object's name in the confirm control so the button says what it destroys",
    ],
    donts: [
      "Confirm a reversible action. Every unnecessary dialog costs the next one its authority",
      "Spend a typed confirmation on something narrow. It is a budget and it runs out",
      "Give the destructive control the default focus",
      "Soften the sentence. The consequence goes in plain words or it is not stated",
    ],
  },
  {
    id: "multi-step-flows",
    name: "Multi-step flows",
    group: "Acting at scale",
    summary: "One commit point, and going back is always free",
    intent:
      "A wizard exists because a task has a real order — later choices depend on earlier ones, and the whole thing commits at once. That second half is what separates it from a long form. Everything entered is provisional until the last step, so the pattern is about where the commit point sits, what going back costs and what happens when step four fails after steps one to three already changed something.",
    use: [
      "Later steps depend on earlier ones, so the order is real rather than cosmetic",
      "The task creates something that does not exist yet, so there is nothing to edit incrementally",
      "The inputs are unlikely to all be at hand, and breaking the task up is a kindness",
    ],
    avoid: [
      "The steps are independent. That is a form with sections, and a wizard makes it slower",
      "The object already exists. Edit it in place and save per section",
      "There are two steps. Two steps is one dialog",
      "The reader will run this weekly. A wizard serves the first time, not the fiftieth",
    ],
    anatomy: [
      { component: "Dialog", role: "The container when the flow is short and returns the reader where they started" },
      { component: "PageHeader", role: "The container when the flow is long enough to deserve its own URL" },
      { component: "Progress", role: "Position through a counted set of steps" },
      { component: "Field", role: "Each input, with its label and its error in one place" },
      { component: "Button", role: "Back and next. Next is primary, back never is" },
      { component: "KeyValuePair", role: "The review step, one row per decision made" },
      { component: "AlertDialog", role: "The confirmation on abandoning a flow that holds entered data" },
    ],
    behavior: [
      {
        moment: "The flow opens",
        does: "Step one, with the total number of steps visible",
        invariant: "The reader knows how long this is before they commit to starting it",
      },
      {
        moment: "A step is left",
        does: "Validation runs for that step and blocks the move if it fails",
        invariant: "Validation happens on leaving a step, never on every keystroke inside it",
      },
      {
        moment: "Back is clicked",
        does: "The previous step returns with every value intact",
        invariant: "Going back is free. A flow that loses input on back is a flow people abandon",
      },
      {
        moment: "A later choice invalidates an earlier answer",
        does: "The affected step is marked and the reader is told what changed",
        invariant: "An earlier answer is never silently discarded and never silently left wrong",
      },
      {
        moment: "The flow is abandoned part-way",
        does: "`AlertDialog` names what will be lost",
        invariant: "Only promise a saved draft if something actually saved it",
      },
      {
        moment: "The review step",
        does: "Every decision listed, each linking back to the step that set it",
        invariant: "The review is the last place a mistake is still cheap, so nothing is summarized away",
      },
      {
        moment: "Commit is clicked",
        does: "Step navigation disables and one indeterminate indicator runs",
        invariant: "There is one commit point, and nothing was written before it",
      },
      {
        moment: "The commit runs longer than a few seconds",
        does: "It hands off to the long-running pattern and releases the reader",
        invariant: "A dialog does not hold someone hostage to a provisioning job",
      },
      {
        moment: "The commit fails",
        does: "The flow returns to the step that caused it with the error attached to the field",
        invariant: "Nobody re-enters something they already entered",
      },
      {
        moment: "The commit partly succeeds",
        does: "What was created is named, and the flow offers to finish the rest",
        invariant: "A half-created object that is never mentioned again is the worst outcome this pattern has",
      },
    ],
    gap: "There is no step indicator. `Progress` draws a bar toward a known endpoint but carries no step labels, no completed and remaining states and no way back to a finished step, so the numbered rail every wizard needs is built per surface. This is the largest gap on the page. Draft persistence is not a system capability either, so a flow cannot honestly tell the reader their progress is saved.",
    dos: [
      "Put the whole flow behind one commit point, and write nothing before it",
      "Make back free from every step, including the review",
      "Name the step an error came from, and take the reader to it",
      "Hand a slow commit to the long-running pattern instead of holding the dialog open",
    ],
    donts: [
      "Use a wizard for steps that do not depend on each other",
      "Write partial state at each step. That is an editor wearing a wizard's clothes",
      "Validate on keystroke inside a step",
      "Claim a saved draft the system does not store",
    ],
  },
  {
    id: "long-running-operations",
    name: "Long-running operations",
    group: "Work that outlives the click",
    summary: "Releasing the reader without losing track of the work",
    intent:
      "A query runs for under a minute. A pipeline runs for most of an hour. A permission scan across a metastore runs for as long as it runs. General design systems treat this as a loading state and stop there, which is why it is the pattern most often rebuilt badly. The interface has three jobs: match the indicator to the wait, release the reader from watching, and still tell the truth when they come back to a tab they left open all afternoon.",
    use: [
      "The work continues after the click and the reader has no reason to sit and watch",
      "The duration is unknown, or long enough that watching wastes their time",
      "The work has an identity the reader can come back to",
    ],
    avoid: [
      "The work finishes faster than an indicator can render. Show nothing",
      "The flow genuinely cannot continue without the result. Block, but bound the block",
      "Everything is fast and only the network is slow. That is a loading state inside one region",
    ],
    anatomy: [
      { component: "Spinner", role: "Indeterminate work, once it has run past the flicker threshold" },
      { component: "Progress", role: "Determinate work, and only where the endpoint is genuinely known" },
      { component: "Skeleton", role: "The first paint of a region, before anything is on screen" },
      { component: "Status", role: "The state of a named run, icon and label together" },
      { component: "Badge", role: "How many are running, when there are several" },
      { component: "Sonner", role: "The completion notice, for a reader who has moved on" },
      { component: "Alert", role: "A failure that needs a decision rather than a glance" },
      { component: "Button", role: "A cancel that genuinely cancels, or no cancel at all" },
    ],
    behavior: [
      {
        moment: "The work finishes before an indicator would be visible",
        does: "Nothing. The result simply replaces what was there",
        invariant: "An indicator that flashes costs more attention than the wait it covered",
      },
      {
        moment: "Still running past the flicker threshold",
        does: "The trigger takes a busy state where it stands",
        invariant: "The trigger keeps its width and its label. A button that resizes moves the page under the cursor",
      },
      {
        moment: "Running with no knowable endpoint",
        does: "`Spinner` beside a label naming the work",
        invariant: "Never `Progress`. A bar against an invented endpoint is a claim the reader can time",
      },
      {
        moment: "Running with a real endpoint",
        does: "`Progress` with the step count or percentage beside it",
        invariant: "It never animates backwards and it never parks at the last percent waiting",
      },
      {
        moment: "Running longer than anyone should watch",
        does: "The work becomes a named run with a `Status`, and the reader is released",
        invariant: "Navigating away does not cancel the work, and the interface says so before they navigate",
      },
      {
        moment: "The reader returns to a tab left open",
        does: "State is re-fetched on focus",
        invariant: "A page left open for an hour shows now, not then. Stale optimism is the worst failure here",
      },
      {
        moment: "The work finishes while the reader is elsewhere",
        does: "`Sonner` names what finished and links to it",
        invariant: "The toast is a courtesy, never the record. The run's own state is the record",
      },
      {
        moment: "The work fails",
        does: "`Alert` with what failed, why and the next action",
        invariant: "The inputs survive, so a failed run is re-runnable without re-entering anything",
      },
      {
        moment: "The work is canceled",
        does: "The run reads as canceled",
        invariant: "Canceled is a third outcome. It is neither a success nor an error and never renders as one",
      },
      {
        moment: "Cancellation is requested and cannot be honored",
        does: "The control says the work is past the point of canceling",
        invariant: "Never offer a cancel the system will not act on",
      },
      {
        moment: "Many operations run at once",
        does: "One summary carrying a count, with the detail one click away",
        invariant: "A column of spinners tells the reader nothing they could not have counted",
      },
    ],
    gap: "There is no run component. `Status` gives one state pill and `Progress` gives one bar, but the composed object — a named operation with elapsed time, a cancel, a result link and a lifecycle — is rebuilt on every surface that has runs. `Spinner` and `Progress` have no built-in delay and no token defines the flicker threshold, so each surface picks its own and they disagree. Nothing re-fetches on window focus.",
    dos: [
      "Pick the indicator from what is known about the endpoint, not from how the wait feels",
      "Release the reader as soon as the work has an identity they can return to",
      "Say plainly that the work continues after they navigate away",
      "Keep canceled distinct from failed everywhere the outcome is shown",
    ],
    donts: [
      "Show a determinate bar for work with no knowable end",
      "Trust state that was fetched before the tab lost focus",
      "Offer a cancel control for work that cannot be canceled",
      "Make a toast the only place a completion was ever recorded",
    ],
  },
  {
    id: "partial-results",
    name: "Partial results",
    group: "Work that outlives the click",
    summary: "Saying so, at the number, when the answer is incomplete",
    intent:
      "The most dangerous screen in a data product is the one that is subtly incomplete. A query that hit its row limit, a lineage graph missing the assets the reader has no grant on, a search that skipped a catalog it could not reach — each returns a plausible, well-formatted, wrong answer that looks exactly like a right one. Every rule below is the same rule in a different place: state the gap where the data is, not in a footnote under it.",
    use: [
      "The result is truncated, sampled, cached, stale or filtered by permission",
      "One source failed and the others succeeded",
      "A reader could act on the incomplete version without knowing it is incomplete",
    ],
    avoid: [
      "The result is complete. Never hedge a good answer",
      "Nothing is missing and the query is merely slow — that is a long-running operation",
      "Everything failed. That is an error, not a partial result",
    ],
    anatomy: [
      { component: "Alert", role: "The region-level statement of what is missing and why" },
      { component: "Badge", role: "The marker on the result itself — sampled, truncated, cached" },
      { component: "Status", role: "Per-source outcome, when a result is assembled from several" },
      { component: "Tooltip", role: "One line of detail behind the marker" },
      { component: "KeyValuePair", role: "Freshness and scope in a detail panel" },
      { component: "Empty", role: "When the permission filter removed everything" },
      { component: "Table", role: "The rows that did come back, rendered normally" },
    ],
    behavior: [
      {
        moment: "The result hit a row limit",
        does: "A `Badge` on the result and the limit named where the count is",
        invariant: "The number on screen is labeled as the limit. It is never presented as the total",
      },
      {
        moment: "The result is a sample",
        does: "The sampling is stated with the result, and every aggregate over it carries the same mark",
        invariant: "A number derived from a sample never renders as a plain number",
      },
      {
        moment: "Permission removed rows or columns",
        does: "The result renders, with a statement that content was filtered out",
        invariant: "Rows are never dropped silently. A quiet filter is how a wrong decision gets made confidently",
      },
      {
        moment: "Permission removed everything",
        does: "`Empty` naming the grant that is missing",
        invariant: "No access and no data never share a state",
      },
      {
        moment: "One source of several failed",
        does: "The sources that worked render, and the one that failed is named",
        invariant: "Name the source. “Some data may be missing” is what you write when you did not look",
      },
      {
        moment: "The data is cached or stale",
        does: "Freshness sits beside the data, with a refresh control",
        invariant: "Freshness travels with the number, not with the page the number is on",
      },
      {
        moment: "A partial result is exported or copied",
        does: "The caveat goes with it",
        invariant: "A number that leaves the screen loses its context, so the context has to leave with it",
      },
      {
        moment: "The reader dismisses the notice",
        does: "The banner closes and the inline markers stay",
        invariant: "What is dismissible is the banner. The fact is not dismissible",
      },
    ],
    gap: "Nothing in DBUI carries provenance. No component pairs a value with its freshness, its scope or its completeness — `Badge`, `Alert`, `Status` and `KeyValuePair` are the parts, and every surface assembles them differently, so a truncated result looks like a different thing in each product area. Of everything on this page, this is the widest distance between what the design principles ask for and what the components can do.",
    dos: [
      "State the gap at the number or the row, not only in a banner at the top of the page",
      "Name which source failed and which ones did not",
      "Mark every aggregate computed over a sample or a truncated set",
      "Carry the caveat into exports, copies and anything an agent reads back",
    ],
    donts: [
      "Filter rows for permission without saying that rows were filtered",
      "Write “some data may be missing” when you know exactly what is missing",
      "Let a dismissible banner be the only record that a result was incomplete",
      "Show a truncated count where a total belongs",
    ],
  },
]
