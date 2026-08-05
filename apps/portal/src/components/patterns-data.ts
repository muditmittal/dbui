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

export const PATTERNS: Pattern[] = [
  {
    id: "empty-states",
    name: "Empty states",
    group: "Finding your way in",
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
]
