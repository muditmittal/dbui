/**
 * The guideline set, as data.
 *
 * Every field is a plain string and nothing here imports React, so the whole
 * array can be handed to an agent without rendering anything — the same reason
 * `constraints-data.ts` is built this way. A guideline that only exists as a
 * rendered page cannot reach the thing writing the code.
 *
 * ── What this page is for ──
 *
 * Guidelines are the quality layer for the surfaces a data and AI workbench is
 * actually made of: a job that runs for nine minutes, a table of four hundred
 * thousand rows, a lineage graph, a notebook, an assistant that is sometimes
 * wrong. Each one says what good looks like for that surface, and cites the
 * published source it rests on.
 *
 * ── The four neighbours, and why none of them owns this ──
 *
 * `/docs/principles` is craft in the abstract — six dimensions that decide
 * between two defensible designs. `/docs/constraints` is responsibility — five
 * lines that do not bend. Both are about *how to think*. Guidelines are about
 * *a specific surface*, which is why they cross those two rather than repeating
 * them: "calm carries the work" is a principle, and "past ten seconds show
 * progress and a way to stop" is a guideline.
 *
 * `/docs/standards` is the third neighbour and the sharpest boundary. It owns the
 * machine-decidable rules — all twenty-five, with the commands that run them.
 * Nothing here restates one. A guideline that a linter could settle belongs
 * there instead, and the day one of these becomes checkable it moves.
 *
 * The fourth is Patterns. A pattern is a guideline we have already answered:
 * the guideline says what the reader needs, the pattern says which DBUI
 * component to reach for. The test for which file a sentence belongs in is
 * whether it would still be true and useful for a team that does not use DBUI.
 * "Sticky header on a long table" passes and lives here; "use `<Table sticky>`"
 * fails and lives in Patterns. No guideline below names a DBUI component.
 *
 * ── Copy is not here ──
 *
 * `packages/dbui/docs/brandvoice.md` owns voice, tone, terminology and product
 * names, and is maintained with Databricks content writers. G13 carries only
 * the structural content decisions that file does not cover — how much a
 * surface explains and where the explanation lives — and points at it for
 * everything else. Do not add a word list here.
 *
 * ── The shape ──
 *
 * Follows `constraints-data.ts`: an aspect, a claim, and three independent dos
 * and don'ts rather than three mirrored pairs. As there, the last don't in each
 * set is what the guideline gives up. A guideline that costs nothing is a
 * slogan.
 *
 * Three fields do not render and are here because they qualify a row to be on
 * this page at all.
 *
 * `sources` is required and is the reason this page can claim authority. Every
 * entry resolves to a row in `research/ux-standards/sources.json`, with the
 * reuse bucket that decides whether we may quote or must restate. A guideline
 * with no source is an opinion, and opinions belong in a review rather than in
 * a published set.
 *
 * `evidence` is honesty about the published record rather than about our
 * confidence. Two topics are marked `thin` because the record genuinely is:
 * lineage rests on essentially one citable paper, and the deepest research on
 * faceted filtering sits behind a license that prohibits paraphrase. Saying so
 * is worth more than inventing a citation.
 *
 * `appliesWhen` is what lets a review skip what does not apply. A lineage
 * widget does not owe the filtering guidelines, and reporting them as unmet is
 * noise that teaches people to skim.
 */

/**
 * A rule and the concrete case that shows it. The example is required: a
 * guideline argued in the abstract is one two people can agree with and still
 * ship opposite screens.
 */
export type Rule = { rule: string; example: string }

/**
 * A published source. `bucket` mirrors `research/ux-standards/sources.json`:
 * `A` is openly licensed and adaptable, `A-v` is openly licensed for copying
 * but not for derivative works, `B` is free to read and must be restated
 * rather than quoted.
 */
export type Source = { name: string; url: string; bucket: "A" | "A-v" | "B" }

export type Guideline = {
  id: string
  /** The surface this governs. */
  aspect: string
  /** The claim, in the form worth remembering. */
  statement: string
  meaning: string
  dos: Rule[]
  donts: Rule[]
  /** Required. Every guideline resolves to something a reader can open. */
  sources: Source[]
  /** How well the published record backs this topic, not how sure we are. */
  evidence: "sourced" | "thin"
  /** The condition that makes this relevant, so a review can skip the rest. */
  appliesWhen: string
}

export const GUIDELINES: Guideline[] = [
  {
    id: "G1",
    aspect: "Status",
    statement: "Work that outlasts attention reports itself",
    meaning:
      "A query, a job, a pipeline and an agent turn all outlive the moment someone starts them. The surface owes elapsed state, a way out, and a terminal answer.",
    appliesWhen: "The surface starts work that can run longer than a few seconds.",
    dos: [
      {
        rule: "Name every terminal state before designing the happy path",
        example:
          "Not started, queued, running, succeeded, failed, cancelled. GOV.UK rejected \"incomplete\" because screen reader users could not tell it from \"complete\".",
      },
      {
        rule: "Past ten seconds, show progress and a signposted way to stop",
        example:
          "Ten seconds is the limit of attention. A nine-minute job with no cancel is a job someone kills by closing the tab.",
      },
      {
        rule: "Say what finished and what it produced",
        example: "Run finished in 4 minutes and wrote 1,284 rows — not a bare success tick.",
      },
    ],
    donts: [
      {
        rule: "Loop an animation for work that runs longer than it can cover",
        example:
          "A looped spinner reads as progress for two to nine seconds. At forty it reads as a hang.",
      },
      {
        rule: "Report a percentage the system cannot compute",
        example: "A bar that sits at 90% for six minutes costs more trust than no bar.",
      },
      {
        rule: "Design only the state the reader is watching",
        example:
          "The cost is real: a run that continues after navigation needs somewhere to be found again, which is a second surface.",
      },
    ],
    sources: [
      {
        name: "GOV.UK task list pattern",
        url: "https://design-system.service.gov.uk/patterns/task-list-pages/",
        bucket: "A",
      },
      {
        name: "NN/g response times",
        url: "https://www.nngroup.com/articles/response-times-3-important-limits/",
        bucket: "B",
      },
      {
        name: "NN/g progress indicators",
        url: "https://www.nngroup.com/articles/progress-indicators/",
        bucket: "B",
      },
      {
        name: "Carbon status indicator",
        url: "https://carbondesignsystem.com/patterns/status-indicator-pattern/",
        bucket: "A",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G2",
    aspect: "Errors",
    statement: "An error names what happened, why, and what to do next",
    meaning:
      "Three parts, and most shipped errors carry one. The reader is trying to finish something, not to learn that a thing went wrong.",
    appliesWhen: "The reader can supply input the system rejects, or an operation can fail.",
    dos: [
      {
        rule: "Put the error where the thing is, and repeat it where the reader looks first",
        example:
          "The field carries the message; a summary at the top links to each field. Long forms need both.",
      },
      {
        rule: "Name the missing privilege and who can grant it",
        example:
          "You need SELECT on main.sales to run this query. Ask the catalog owner for access.",
      },
      {
        rule: "Make a consequential submission reversible, checked, or confirmed",
        example:
          "WCAG 3.3.6 accepts any one of the three. Picking none is the common failure.",
      },
    ],
    donts: [
      {
        rule: "Report the system's problem as the reader's mistake",
        example: "Invalid input says nothing. Which input, and what would be valid?",
      },
      {
        rule: "Validate a field before the reader has finished with it",
        example: "An error that appears on the third character is noise, not help.",
      },
      {
        rule: "Keep the message short at the cost of the next step",
        example:
          "A precise error costs more words than a generic one. Spend them.",
      },
    ],
    sources: [
      {
        name: "WCAG 3.3.1 error identification",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification",
        bucket: "A-v",
      },
      {
        name: "WCAG 3.3.6 error prevention, all",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all",
        bucket: "A-v",
      },
      {
        name: "GOV.UK validation pattern",
        url: "https://design-system.service.gov.uk/patterns/validation/",
        bucket: "A",
      },
      {
        name: "PatternFly error messages",
        url: "https://www.patternfly.org/content-design/writing-guides/error-messages",
        bucket: "A",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G3",
    aspect: "States",
    statement: "Empty, loading and denied are different answers",
    meaning:
      "A surface that renders data it does not control has more states than the one it was designed in. Three of them look identical if nobody decides otherwise.",
    appliesWhen: "The surface renders data whose shape, size or availability it does not control.",
    dos: [
      {
        rule: "Tell nothing-yet apart from nothing-matched apart from not-permitted",
        example:
          "No queries yet invites a first action. No tables match \"orders\" offers a wider search. You do not have access names who can grant it.",
      },
      {
        rule: "Give read-only its own treatment",
        example:
          "A field the reader may see but not edit is not a disabled field. Disabled says try later; read-only says not yours.",
      },
      {
        rule: "Design the partial case",
        example:
          "Sampled, truncated, cached, permission-filtered. A result missing rows the reader cannot see is a different claim from a complete one.",
      },
    ],
    donts: [
      {
        rule: "Use disabled where read-only is meant",
        example: "Disabled removes it from the tab order, so the reader cannot even read it.",
      },
      {
        rule: "Let an empty state flash before data arrives",
        example: "No results, then forty rows, reads as a bug the reader will report.",
      },
      {
        rule: "Fold every failure into one empty state",
        example:
          "Distinct states cost distinct copy and distinct art. The alternative is one state that is wrong five ways.",
      },
    ],
    sources: [
      {
        name: "Carbon empty states",
        url: "https://carbondesignsystem.com/patterns/empty-states-pattern/",
        bucket: "A",
      },
      {
        name: "Carbon read-only states",
        url: "https://carbondesignsystem.com/patterns/read-only-states-pattern/",
        bucket: "A",
      },
      {
        name: "Carbon disabled states",
        url: "https://carbondesignsystem.com/patterns/disabled-states/",
        bucket: "A",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G4",
    aspect: "Tables",
    statement: "A table serves four tasks, and most serve one",
    meaning:
      "Find records matching criteria, compare them, read or edit a single one, act on many. A table designed for scanning fails the person editing, and the failure is invisible until they try.",
    appliesWhen: "Rows the reader scans, compares, edits, or acts on in bulk.",
    dos: [
      {
        rule: "Decide which of the four tasks the table is for, and say so",
        example:
          "A job list is find and act. A schema browser is find and read. Those are different tables.",
      },
      {
        rule: "Keep the header and the row's identity visible while scanning",
        example: "A sticky header and a pinned name column. At row 200 both are the only orientation left.",
      },
      {
        rule: "Right-align and tabular-figure the numbers",
        example: "Comparison down a column is the whole reason the number is in a table.",
      },
    ],
    donts: [
      {
        rule: "Make the reader scroll horizontally to edit one record",
        example:
          "Editing a single row in a forty-column table is a detail view's job, not a grid's.",
      },
      {
        rule: "Paginate what the reader is trying to compare",
        example: "Two rows on different pages cannot be compared at all.",
      },
      {
        rule: "Serve every task at once",
        example:
          "Bulk selection, inline edit and dense scanning in one grid means three compromised affordances.",
      },
    ],
    sources: [
      {
        name: "NN/g data tables: four major user tasks",
        url: "https://www.nngroup.com/articles/data-tables/",
        bucket: "B",
      },
      { name: "PatternFly table", url: "https://www.patternfly.org/components/table/", bucket: "A" },
      { name: "APG grid pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/", bucket: "A" },
    ],
    evidence: "sourced",
  },
  {
    id: "G5",
    aspect: "Filtering",
    statement: "A filter says what it did and how to undo it",
    meaning:
      "Filtering is the most common way a reader ends up looking at the wrong thing while believing it is the whole thing.",
    appliesWhen: "The reader narrows a set by facet, query, or scope.",
    dos: [
      {
        rule: "Show the active filters as objects the reader can remove one at a time",
        example: "Three tags above the table, each with its own clear, plus a clear all.",
      },
      {
        rule: "Say what the count is counting",
        example: "412 of 8,904 tables. A bare 412 hides whether the filter or the data is the limit.",
      },
      {
        rule: "Survive leaving and coming back",
        example: "Filters in the URL. A reader who opens a row and returns has not started over.",
      },
    ],
    donts: [
      {
        rule: "Let an empty result look the same as an empty catalog",
        example: "No results should name the term and offer the way back.",
      },
      {
        rule: "Apply a filter the reader did not set without saying so",
        example:
          "A permission-scoped list is filtered. If that is invisible the reader concludes the data is missing.",
      },
      {
        rule: "Put every facet on the surface",
        example:
          "Progressive disclosure costs discoverability. Accept it for the long tail, not for the two facets everyone uses.",
      },
    ],
    sources: [
      { name: "Carbon filtering", url: "https://carbondesignsystem.com/patterns/filtering/", bucket: "A" },
      {
        name: "APG combobox pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
        bucket: "A",
      },
      { name: "Abby Covert, IA heuristics", url: "https://abbycovert.com/ia-tools/ia-heuristics/", bucket: "B" },
    ],
    evidence: "thin",
  },
  {
    id: "G6",
    aspect: "Lineage",
    statement: "A graph answers how two things relate, not just that they do",
    meaning:
      "Most lineage views render the topology and stop. The reader arrived with a question about two specific nodes and leaves without an answer.",
    appliesWhen: "The surface renders nodes and edges — lineage, dependencies, a DAG, an execution graph.",
    dos: [
      {
        rule: "Overview first, zoom and filter, then details on demand",
        example:
          "A thousand-node graph opens at the shape and lets the reader descend. It does not open at node one.",
      },
        {
        rule: "Answer relate, history and extract",
        example:
          "How does this table reach that dashboard, what did I already expand, and can I take this subgraph with me.",
      },
      {
        rule: "Give the graph a non-graph reading",
        example:
          "A tree or a list of upstream and downstream objects. The graph is a view of the relationship, not the only one.",
      },
    ],
    donts: [
      {
        rule: "Render the full graph on load",
        example: "Beyond a few hundred nodes a full render is a picture of a haystack.",
      },
      {
        rule: "Lose the reader's exploration when they pan away",
        example: "No history means every question restarts from the whole graph.",
      },
      {
        rule: "Make the layout carry meaning it cannot hold",
        example:
          "Position is spent on legibility. It cannot also encode ownership, freshness and criticality.",
      },
    ],
    sources: [
      {
        name: "Shneiderman, The Eyes Have It (1996)",
        url: "http://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf",
        bucket: "B",
      },
      {
        name: "Carbon flow charts",
        url: "https://carbondesignsystem.com/data-visualization/flow-charts/",
        bucket: "A",
      },
      {
        name: "APG treegrid pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/",
        bucket: "A",
      },
    ],
    evidence: "thin",
  },
  {
    id: "G7",
    aspect: "Notation",
    statement: "An editor is judged by what a small change costs",
    meaning:
      "Query editors and notebooks are notation surfaces, and standard usability vocabulary cannot describe what goes wrong in them. Cognitive Dimensions can.",
    appliesWhen: "The reader writes, edits or executes notation — SQL, Python, a config, a formula.",
    dos: [
      {
        rule: "Let the reader evaluate a fragment",
        example:
          "Running one cell or one selected statement. Progressive evaluation is how people actually work.",
      },
      {
        rule: "Make dependencies visible before they bite",
        example:
          "A cell whose result depends on a cell that has since changed should say so. Out-of-order execution is a hidden-dependency failure.",
      },
      {
        rule: "Keep a small change small",
        example:
          "Adding one filter should not require restructuring the query. High viscosity is the most common editor complaint nobody has words for.",
      },
    ],
    donts: [
      {
        rule: "Force a choice before the reader has the information to make it",
        example:
          "Picking compute before knowing the workload is premature commitment, and it is expensive to undo.",
      },
      {
        rule: "Hide state that changes what the notation means",
        example: "An invisible session variable makes identical code produce different results.",
      },
      {
        rule: "Optimize the surface for reading over editing",
        example:
          "The two want different things. A workbench should say which one it chose.",
      },
    ],
    sources: [
      {
        name: "Cognitive Dimensions of Notations",
        url: "https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/",
        bucket: "B",
      },
      {
        name: "Green & Blackwell tutorial",
        url: "https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/CDtutorial.pdf",
        bucket: "B",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G8",
    aspect: "AI",
    statement: "Design the wrong answer first",
    meaning:
      "Every AI feature ships the good case. The phase that decides whether people keep using it is the one where the system is wrong, and it is usually undesigned.",
    appliesWhen: "The surface shows generated, inferred, retrieved or summarized content.",
    dos: [
      {
        rule: "Mark generated content where it appears",
        example:
          "Including inside a table, where only some cells are generated. The marker is also the way in to why.",
      },
      {
        rule: "Make every generated action revertible",
        example:
          "The agent changed six things. The reader needs to undo one of them without undoing the other five.",
      },
      {
        rule: "Show the basis, not only the answer",
        example: "Which tables it read, which rows it sampled, what it could not see.",
      },
    ],
    donts: [
      {
        rule: "Present a generated value with the same authority as a queried one",
        example: "A number that came from a model and one that came from a table must not look alike.",
      },
      {
        rule: "Move the reader's viewport as the response streams",
        example: "Autoscrolling to the end takes the paragraph they were reading away from them.",
      },
      {
        rule: "Offer the capability everywhere it could technically go",
        example:
          "Generative help is not the right answer for every situation, and the surface pays for each place it appears.",
      },
    ],
    sources: [
      {
        name: "Carbon for AI",
        url: "https://carbondesignsystem.com/guidelines/carbon-for-ai/",
        bucket: "A",
      },
      {
        name: "PatternFly conversation design",
        url: "https://www.patternfly.org/patternfly-ai/conversation-design",
        bucket: "A",
      },
      {
        name: "Microsoft HAX guidelines",
        url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/",
        bucket: "B",
      },
      { name: "Google PAIR guidebook", url: "https://pair.withgoogle.com/guidebook/", bucket: "B" },
    ],
    evidence: "sourced",
  },
  {
    id: "G9",
    aspect: "Keyboard",
    statement: "The widget's keyboard contract is already written",
    meaning:
      "Grid, treegrid, combobox, dialog and splitter all have published key-by-key behavior. Inventing one produces a control that looks familiar and does not answer the keys people press.",
    appliesWhen: "Always.",
    dos: [
      {
        rule: "Take the APG contract for the role, whole",
        example:
          "A treegrid answers arrow keys for both rows and cells, and Left collapses before it moves.",
      },
      {
        rule: "Announce a change without moving focus",
        example:
          "A row count updating after a filter is a status message. Stealing focus to say so loses the reader's place.",
      },
      {
        rule: "Keep the focused element visible and unobscured",
        example:
          "A sticky header that covers the focused row fails 2.4.11, and three tree rails in this system did exactly that.",
      },
    ],
    donts: [
      {
        rule: "Give a control a role its behavior does not honor",
        example: "Announcing grid and then not implementing cell navigation is worse than a plain table.",
      },
      {
        rule: "Reach for a positive tabindex to fix an order problem",
        example: "The DOM order is the bug. The tabindex is a second bug on top of it.",
      },
      {
        rule: "Assume the pointer path is the whole design",
        example:
          "Every hover affordance owes a keyboard equivalent, and that is real work per control.",
      },
    ],
    sources: [
      { name: "ARIA Authoring Practices Guide", url: "https://www.w3.org/WAI/ARIA/apg/patterns/", bucket: "A" },
      {
        name: "WCAG 2.4.11 focus not obscured",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum",
        bucket: "A-v",
      },
      {
        name: "WCAG 4.1.3 status messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
        bucket: "A-v",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G10",
    aspect: "Structure",
    statement: "People arrive mid-task from somewhere else",
    meaning:
      "A workbench screen is rarely where the work started. The page owes orientation to someone who did not walk the path that was designed for them.",
    appliesWhen: "Any page-level composition.",
    dos: [
      {
        rule: "Let the object explain itself wherever it appears",
        example: "A table opened from search, from lineage and from a query result reads the same.",
      },
      {
        rule: "Reveal depth on demand",
        example:
          "The advanced control is one step in, not on the surface and not three menus down.",
      },
      {
        rule: "Preserve place across a round trip",
        example: "Scroll, selection, expansion and filters survive opening a detail and coming back.",
      },
    ],
    donts: [
      {
        rule: "Require the reader to know the name of what they are looking for",
        example: "Search-only navigation fails everyone who inherited the workspace.",
      },
      {
        rule: "Hide a capability where nothing hints it exists",
        example: "Progressive disclosure has a cost, and the cost is paid in discoverability.",
      },
      {
        rule: "Optimize for the person who set this up",
        example:
          "They will not be the main reader for long. The person who inherits it is.",
      },
    ],
    sources: [
      {
        name: "NN/g complex applications",
        url: "https://www.nngroup.com/articles/complex-application-design/",
        bucket: "B",
      },
      {
        name: "NN/g progressive disclosure",
        url: "https://www.nngroup.com/articles/progressive-disclosure/",
        bucket: "B",
      },
      { name: "PatternFly page", url: "https://www.patternfly.org/components/page/", bucket: "A" },
    ],
    evidence: "sourced",
  },
  {
    id: "G11",
    aspect: "Consequence",
    statement: "State the blast radius before the button, not after",
    meaning:
      "The reader deleting a catalog knows what they intend. They do not know what else reads from it, and the system does.",
    appliesWhen: "An action is irreversible, or affects objects the reader is not looking at.",
    dos: [
      {
        rule: "Name the downstream consumers with counts",
        example: "Renaming this table breaks 3 dashboards and 1 pipeline that read from it.",
      },
      {
        rule: "State the exact irreversible consequence",
        example: "Deleting this catalog removes 42 tables. This can't be undone.",
      },
      {
        rule: "Scale the friction to the radius",
        example:
          "A typed confirmation for the irreversible one; a toast with undo for the reversible one.",
      },
    ],
    donts: [
      {
        rule: "Soften a destructive consequence to reduce friction",
        example: "The reader finds out anyway. The only question is whether they heard it from you.",
      },
      {
        rule: "Rely on a confirm dialog to carry a consequence it never states",
        example: "Are you sure? asks the reader to confirm something they were never told.",
      },
      {
        rule: "Treat undo as a substitute for a warning",
        example:
          "Computing a blast radius is expensive and it is still the right thing to build.",
      },
    ],
    sources: [
      {
        name: "WCAG 3.3.6 error prevention, all",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all",
        bucket: "A-v",
      },
      {
        name: "GOV.UK check answers",
        url: "https://design-system.service.gov.uk/patterns/check-answers/",
        bucket: "A",
      },
      { name: "Carbon dialog pattern", url: "https://carbondesignsystem.com/patterns/dialog-pattern/", bucket: "A" },
    ],
    evidence: "sourced",
  },
  {
    id: "G12",
    aspect: "Charts",
    statement: "A chart states what it excluded",
    meaning:
      "Charts in a workbench are read as evidence. The axis that starts at forty and the series that was truncated are the two ways they mislead.",
    appliesWhen: "The surface encodes data visually rather than as text or rows.",
    dos: [
      {
        rule: "Label the axes and the units on the chart",
        example: "A reader who screenshots it into a deck takes the labels with them.",
      },
      {
        rule: "Say when the data is sampled, partial or still arriving",
        example: "A partial series drawn as a complete one is the most expensive chart bug.",
      },
      {
        rule: "Reserve categorical color for categories",
        example:
          "A chart meaning healthy and a chart meaning category three should not borrow the same ramp.",
      },
    ],
    donts: [
      {
        rule: "Encode a quantity in a channel that cannot carry it",
        example: "Area and hue read as approximate. Position and length read as exact.",
      },
      {
        rule: "Truncate an axis without marking it",
        example: "A y-axis starting at forty triples the apparent difference.",
      },
      {
        rule: "Add a dimension because the data has one",
        example:
          "A fourth encoded variable costs the legibility of the first three.",
      },
    ],
    sources: [
      {
        name: "Carbon chart anatomy",
        url: "https://carbondesignsystem.com/data-visualization/chart-anatomy/",
        bucket: "A",
      },
      {
        name: "Carbon color palettes",
        url: "https://carbondesignsystem.com/data-visualization/color-palettes/",
        bucket: "A",
      },
      {
        name: "Forsell & Johansson infovis heuristics",
        url: "https://isr.tecnico.ulisboa.pt/wp-content/uploads/2015/11/HCII-553-Heuristic-evaluation-in-Information-Visualization-using-three-sets-of-heuristics-an-exploratory-study.pdf",
        bucket: "B",
      },
    ],
    evidence: "sourced",
  },
  {
    id: "G13",
    aspect: "Explanation",
    statement: "Explain the new, not the obvious, and put it where the decision is",
    meaning:
      "Structural content decisions only: how much a surface explains, where the explanation lives, and what happens when text does not fit. Voice, tone, terminology and product names belong to brandvoice.md.",
    appliesWhen: "The surface teaches, defines, or shows text it cannot guarantee will fit.",
    dos: [
      {
        rule: "Put the explanation at the decision, not in a help page",
        example: "What a privilege grants belongs beside the grant control.",
      },
      {
        rule: "Decide the truncation rule per field, not per layout",
        example:
          "A table name truncates in the middle because the suffix distinguishes it. A description truncates at the end.",
      },
      {
        rule: "Leave room for the string to grow",
        example: "Roughly 30% for translation, and identifiers customers chose are longer than yours.",
      },
    ],
    donts: [
      {
        rule: "Teach the same thing on every visit",
        example: "Onboarding left on screen after it is learned is permanent cost for one-time value.",
      },
      {
        rule: "Truncate the part that carries the meaning",
        example: "catalog.schema.orders_daily_v2 truncated at the end is every table in the schema.",
      },
      {
        rule: "Explain everything that could be explained",
        example:
          "Assume competence. The tooltip on an obvious control is noise that hides the one that matters.",
      },
    ],
    sources: [
      {
        name: "PatternFly truncation",
        url: "https://www.patternfly.org/content-design/grammar/truncation",
        bucket: "A",
      },
      {
        name: "PatternFly accessibility and localization",
        url: "https://www.patternfly.org/content-design/accessibility-and-localization",
        bucket: "A",
      },
      {
        name: "NN/g progressive disclosure",
        url: "https://www.nngroup.com/articles/progressive-disclosure/",
        bucket: "B",
      },
    ],
    evidence: "sourced",
  },
]

/**
 * Topics considered and not given a guideline, with the reason. Kept for the
 * same purpose as `CUT` in `constraints-data.ts`: the next person to propose
 * one of these should find out here that it was already weighed.
 */
export const CUT: { kind: string; why: string }[] = [
  {
    kind: "Critique method — how a review is run and how feedback is formed",
    why: "It governs the review's own output rather than a design. It belongs to review prep, not to a set a designer checks work against.",
  },
  {
    kind: "Voice, tone, terminology, product names, banned words",
    why: "`packages/dbui/docs/brandvoice.md` owns it and is maintained with Databricks content writers. G13 carries only the structural content decisions that file does not cover.",
  },
  {
    kind: "Information density — row heights, how much fits",
    why: "There is no rigorous public standard. The pixel figures circulating in 2026 come from SEO articles citing nothing. Density is a decision our own tokens encode, not a citation we can make.",
  },
  {
    kind: "Anything a linter settles — token drift, raw HTML, missing alt text",
    why: "`/docs/standards` owns all twenty-five rules and the commands that run them. A guideline that becomes checkable moves there.",
  },
]
