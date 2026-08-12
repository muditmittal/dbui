# Topic map

Every link here points at a primary source. Curated, not exhaustive — the best four to eight
documents per topic rather than every page that mentions it. Bucket letters follow `sources.json`:
**A** openly licensed and adaptable, **A-v** openly licensed but verbatim only, **B** free to read
but restate rather than copy.

Fourteen topics. The first eight are the ones a data workbench gets wrong most often.

Every bucket A and A-v document below is also extracted to markdown under `extracts/`, with
frontmatter carrying its URL, license and commit. Bucket B is deliberately not extracted — those are
read at the source.

---

## 1. Status, progress and long-running work

Job runs, pipeline execution, query progress. The topic where Databricks surfaces diverge most from
each other, and where the published guidance is better than people expect.

**GOV.UK** (A) — the researched status vocabulary. They tested and rejected "Incomplete" because
screen reader users could not distinguish it from "Complete".
- [Task list pages](https://design-system.service.gov.uk/patterns/task-list-pages/)
- [Task list component](https://design-system.service.gov.uk/components/task-list/)
- [Tag component](https://design-system.service.gov.uk/components/tag/) — the status label itself

**Carbon** (A)
- [Status indicator pattern](https://carbondesignsystem.com/patterns/status-indicator-pattern/)
- [Loading pattern](https://carbondesignsystem.com/patterns/loading-pattern/)
- [Progress indicator](https://carbondesignsystem.com/components/progress-indicator/usage/)
- [Inline loading](https://carbondesignsystem.com/components/inline-loading/usage/)

**W3C** (A-v)
- [Status messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) — announcing a change without moving focus
- [Timing adjustable (2.2.1)](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)

**NN/g** (B) — the thresholds. 0.1s instantaneous, 1s preserves flow of thought, 10s is the attention
limit. Past 10s you need a percent-done indicator *and* a signposted way to interrupt. Looped
animation is for 2–9s only.
- [Response times: the 3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/)
- [Progress indicators make a slow system less insufferable](https://www.nngroup.com/articles/progress-indicators/)

---

## 2. Errors, validation and recovery

**W3C** (A-v) — the normative floor. Four criteria, and the last one is the one enterprise tools miss.
- [Error identification (3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)
- [Error suggestion (3.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion)
- [Error prevention, legal financial data (3.3.4)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data)
- [Error prevention, all (3.3.6)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all) — reversible, checked, or confirmed

**GOV.UK** (A) — the best free writing on error copy anywhere.
- [Validation pattern](https://design-system.service.gov.uk/patterns/validation/)
- [Error message component](https://design-system.service.gov.uk/components/error-message/)
- [Error summary component](https://design-system.service.gov.uk/components/error-summary/)
- [Problem with the service pages](https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/)
- [Service unavailable pages](https://design-system.service.gov.uk/patterns/service-unavailable-pages/)

**Carbon** (A)
- [Notification pattern](https://carbondesignsystem.com/patterns/notification-pattern/)
- [Notification component](https://carbondesignsystem.com/components/notification/usage/)

**PatternFly** (A) — a writing guide specifically for error copy, MIT licensed.
- [Error messages](https://www.patternfly.org/content-design/writing-guides/error-messages)
- [Alert](https://www.patternfly.org/components/alert) · [Notification drawer](https://www.patternfly.org/components/notification-drawer)

---

## 3. Empty, loading, partial, disabled and read-only states

The state matrix. `TRACKER.md` P7 already names seven states per input; this is the published
grounding for the page-level equivalents.

**Carbon** (A) — the most complete published set, and the only system with a distinct read-only
pattern, which matters when permissions downgrade a view rather than hiding it.
- [Empty states pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/)
- [Disabled states](https://carbondesignsystem.com/patterns/disabled-states/)
- [Read-only states pattern](https://carbondesignsystem.com/patterns/read-only-states-pattern/)
- [Loading pattern](https://carbondesignsystem.com/patterns/loading-pattern/)

**PatternFly** (A)
- [Skeleton](https://www.patternfly.org/components/skeleton/)
- [Empty state](https://www.patternfly.org/components/empty-state/)

---

## 4. Tables and dense data

**PatternFly** (A) — the closest published analogue to a catalog or job list. Sticky headers, compact
variants, and a composed toolbar-plus-table-plus-pagination resource list.
- [Table](https://www.patternfly.org/components/table/)
- [Toolbar](https://www.patternfly.org/components/toolbar/)
- [Pagination](https://www.patternfly.org/components/pagination/)
- [Data list](https://www.patternfly.org/components/data-list/)
- [Primary detail pattern](https://www.patternfly.org/patterns/primary-detail/)
- [Card view pattern](https://www.patternfly.org/patterns/card-view/)

**Carbon** (A)
- [Data table](https://carbondesignsystem.com/components/data-table/usage/)
- [Structured list](https://carbondesignsystem.com/components/structured-list/usage/)
- [Pagination](https://carbondesignsystem.com/components/pagination/usage/)

**W3C APG** (A) — the behavioral contract. `grid` for an interactive table, `table` for a static one.
- [Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [Table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)

**NN/g** (B) — four user tasks: find records matching criteria, compare, view or edit a single row,
act on records. A clean rubric for critiquing any grid.
- [Data tables: four major user tasks](https://www.nngroup.com/articles/data-tables/)

---

## 5. Filtering, search and faceting

No authoritative free standard exists here — the organization with the most usability-test hours on
filtering is Baymard, and their terms make them unusable. Be honest in any heuristic we publish about
which rules are asserted rather than sourced.

**Carbon** (A)
- [Filtering pattern](https://carbondesignsystem.com/patterns/filtering/)
- [Search pattern](https://carbondesignsystem.com/patterns/search-pattern/)

**W3C APG** (A) — the interaction contract for the controls filtering is built from.
- [Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

**Abby Covert** (B) — a catalog is an information architecture problem before it is a table problem.
- [IA heuristics](https://abbycovert.com/ia-tools/ia-heuristics/)

---

## 6. Lineage, graphs and dependency chains

Genuinely thin. There is no prescriptive citable UX standard for lineage. The two sources below are
the closest, and a published heuristic here should be framed as structured questions rather than
asserted rules.

**Shneiderman 1996** (B) — the only real grounding. Free PDF, author-hosted. His taxonomy explicitly
covers **tree** and **network** data, and the tasks include **relate**, **history** and **extract** —
which is precisely what most lineage views omit. You can see the graph, but you cannot ask how two
nodes relate, cannot retrace your exploration, and cannot pull out a subgraph.
- [The Eyes Have It (PDF)](http://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf)
- Overview first, zoom and filter, then details on demand

**Carbon** (A) — the only openly licensed guidance touching node-and-edge diagrams.
- [Flow charts](https://carbondesignsystem.com/data-visualization/flow-charts/)
- [Spatial charts](https://carbondesignsystem.com/data-visualization/spatial-charts/)

**W3C APG** (A) — for the tree half of lineage, where hierarchy is the real structure.
- [Treegrid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/)
- [Treeview pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)

**Forsell & Johansson** (B) — the only empirically derived heuristic set for interactive visual
displays. Paywalled at ACM; the list is reproduced in
[this free follow-up study](https://isr.tecnico.ulisboa.pt/wp-content/uploads/2015/11/HCII-553-Heuristic-evaluation-in-Information-Visualization-using-three-sets-of-heuristics-an-exploratory-study.pdf).

---

## 7. Notation surfaces — query editors and notebooks

The topic where standard UX vocabulary fails completely. Nielsen cannot express what is wrong with
out-of-order notebook execution; Cognitive Dimensions can, and it is the least-used good idea in this
field. Microsoft adopted it for API usability studies.

**Cognitive Dimensions of Notations** (B) — free Cambridge PDFs.
- [Resource site](https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/)
- [Green & Blackwell tutorial (PDF)](https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/CDtutorial.pdf)
- [Blackwell & Green book chapter (PDF)](https://www.cl.cam.ac.uk/~afb21/publications/BlackwellGreen-CDsChapter.pdf)

The dimensions that earn their place immediately: **viscosity** (how much work a small change costs —
restructuring a query to add one filter), **hidden dependencies** (out-of-order cell execution),
**premature commitment** (choosing a cluster before you know the workload), **progressive evaluation**
(can you run a fragment), **error-proneness**, and **visibility**.

**Carbon** (A)
- [Code snippet](https://carbondesignsystem.com/components/code-snippet/usage/)

---

## 8. AI-generated content and assistants

**Carbon for AI** (A) — the single most directly useful openly licensed thing found. Defines the AI
label as a mandatory marker on AI-generated content and the trigger for an explainability popover,
and covers where the label goes *inside a data table* depending on which cells are AI-generated.
- [Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
- [AI label component](https://carbondesignsystem.com/components/ai-label/usage/)

**PatternFly** (A) — a full chatbot and conversation pattern set under an MIT license, which makes it
the only openly licensed *conversation* design guidance found here.
- [About PatternFly AI](https://www.patternfly.org/patternfly-ai/about-ai)
- [Conversation design](https://www.patternfly.org/patternfly-ai/conversation-design)

**Microsoft HAX** (B) — 18 guidelines, CHI 2019, validated across 20 products with 49 practitioners.
Organized by interaction phase: initially, during interaction, **when the AI system is wrong**, and
over time. That third phase is the one most AI features ship without designing.
- [Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)

**Google PAIR** (B)
- [People + AI Guidebook](https://pair.withgoogle.com/guidebook/) — mental models, explainability and trust, errors and graceful failure

**NN/g** (B) — mechanical rather than conceptual, and consumer-chatbot framed, but the transferable
parts are concrete: suggested prompts as buttons not text, do not autoscroll to the end of a response,
let users resize the panel.
- [10 guidelines for AI chatbots](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/)
- [5 dimensions of site-specific AI chatbots](https://www.nngroup.com/articles/dimensions-of-ai-chatbots/) — notes that identifying an AI as AI is legally required in some regions including the EU from August 2026

---

## 9. ARIA authoring and keyboard

**W3C APG** (A) — 30 patterns, and the license permits adaptation. The workbench-relevant set:
- [All patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) · [Treegrid](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) · [Treeview](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) · [Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) · [Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) · [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) · [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [Dialog modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) · [Alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) · [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) · [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [Window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) — resizable panels, which `TRACKER.md` P6 has open
- [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) · [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) · [Feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/)

**W3C WCAG 2.2** (A-v) — the criteria that bite in dense keyboard UIs.
- [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) · [No keyboard trap (2.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap)
- [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) · [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- [Focus not obscured, minimum (2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) — new in 2.2, and exactly the defect `TRACKER.md` B14 records in three tree rails
- [Focus appearance (2.4.13)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) · [Target size, minimum (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

**PatternFly** (A) — carries a per-component accessibility document for roughly 70 components, plus a
product-level scorecard. `TRACKER.md` M10 records that we have no automated accessibility suite and
no scope; the scorecard is a published model for what one would assert.
- [Accessibility](https://www.patternfly.org/accessibility/about-accessibility) · [Product scorecard](https://www.patternfly.org/accessibility/product-scorecard)
- [Design for accessibility](https://www.patternfly.org/accessibility/design) · [Test your product](https://www.patternfly.org/accessibility/test-your-product)

---

## 10. Navigation and page structure

**PatternFly** (A)
- [Page](https://www.patternfly.org/components/page/) · [Masthead](https://www.patternfly.org/components/masthead/) · [Navigation](https://www.patternfly.org/components/navigation/) · [Drawer](https://www.patternfly.org/components/drawer/)
- [Dashboard pattern](https://www.patternfly.org/patterns/dashboard/)

**Carbon** (A)
- [UI shell header](https://carbondesignsystem.com/components/UI-shell-header/usage/) · [UI shell left panel](https://carbondesignsystem.com/components/UI-shell-left-panel/usage/) · [UI shell right panel](https://carbondesignsystem.com/components/UI-shell-right-panel/usage/)
- [Global header pattern](https://carbondesignsystem.com/patterns/global-header/)
- [Overflow content](https://carbondesignsystem.com/patterns/overflow-content/)

**GOV.UK** (A)
- [Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/)
- [Step by step navigation](https://design-system.service.gov.uk/patterns/step-by-step-navigation/)

**NN/g** (B) — the best short published definition of "complex application", and it reads like a
description of this product: highly trained users, large underlying datasets, variable underlying
tasks, handoff across roles and tools, high-impact actions to mitigate.
- [8 design guidelines for complex applications](https://www.nngroup.com/articles/complex-application-design/)
- [Progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

---

## 11. Destructive actions and reversibility

`TRACKER.md` M7 records that nothing computes a blast radius and undo is not a capability. This is the
external grounding for closing it.

**W3C** (A-v) — the strongest normative lever available. 3.3.4 and 3.3.6 require that a submission is
reversible, checked, or confirmed.
- [Error prevention, all (3.3.6)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all)

**Carbon** (A)
- [Dialog pattern](https://carbondesignsystem.com/patterns/dialog-pattern/)
- [Common actions](https://carbondesignsystem.com/patterns/common-actions/)

**W3C APG** (A)
- [Alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)

**GOV.UK** (A)
- [Check answers](https://design-system.service.gov.uk/patterns/check-answers/) — the confirm-before-commit pattern
- [Interruption pages](https://design-system.service.gov.uk/patterns/interruption-pages/)

---

## 12. Charts and data visualization

**Carbon** (A) — openly licensed data-viz guidance, which is rare.
- [Getting started](https://carbondesignsystem.com/data-visualization/getting-started/) · [Chart anatomy](https://carbondesignsystem.com/data-visualization/chart-anatomy/) · [Chart types](https://carbondesignsystem.com/data-visualization/chart-types/)
- [Color palettes](https://carbondesignsystem.com/data-visualization/color-palettes/) · [Legends](https://carbondesignsystem.com/data-visualization/legends/) · [Axes and labels](https://carbondesignsystem.com/data-visualization/axes-and-labels/)
- [Dashboards](https://carbondesignsystem.com/data-visualization/dashboards/) · [Gantt charts](https://carbondesignsystem.com/data-visualization/gantt-charts/)

Directly relevant to `TRACKER.md` M13, which records that the viz semantics carry ten categorical and
ten sequential steps and nothing for state.

---

## 13. Content, voice and naming

Our own `packages/dbui/docs/brandvoice.md` is the contract. These are the external sources it should
be reconciled against, not replaced by.

**PatternFly** (A) — the most directly comparable artifact to our own `brandvoice.md`, and openly
licensed, so it can be reconciled against ours line by line rather than admired from a distance.
- [Content design overview](https://www.patternfly.org/content-design/overview) · [Brand voice and tone](https://www.patternfly.org/content-design/brand-voice-and-tone) · [Best practices](https://www.patternfly.org/content-design/best-practices)
- Grammar: [capitalization](https://www.patternfly.org/content-design/grammar/capitalization) · [terminology](https://www.patternfly.org/content-design/grammar/terminology) · [punctuation](https://www.patternfly.org/content-design/grammar/punctuation) · [numerics](https://www.patternfly.org/content-design/grammar/numerics) · [truncation](https://www.patternfly.org/content-design/grammar/truncation) · [units and symbols](https://www.patternfly.org/content-design/grammar/units-and-symbols)
- [Tooltips](https://www.patternfly.org/content-design/writing-guides/tooltips) · [Accessibility and localization](https://www.patternfly.org/content-design/accessibility-and-localization)

**GOV.UK** (A) — the strongest free writing guidance in existence.
- [Content style guide](https://www.gov.uk/guidance/style-guide)
- [Writing for user interfaces](https://design-system.service.gov.uk/styles/)

**Carbon** (A)
- [Content guidelines](https://carbondesignsystem.com/guidelines/content/overview/)

**W3C** (A-v)
- [Labels or instructions (3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)
- [Headings and labels (2.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)

---

## 14. Critique method

How the review itself should be structured. This governs the *output* of the crit tool rather than
what it looks for.

**Connor & Irizarry, _Discussing Design_** (B) — the canonical citation. A well-formed critique
statement identifies a specific aspect, relates it to an objective or best practice, and describes how
and why. Critique is distinct from reaction-based feedback ("I don't like this colour") and directive
feedback ("make it blue"). Four inputs: goals, context and constraints, principles, rationale. Timing
sweet spot 20–80% complete.
- [Book](https://www.oreilly.com/library/view/discussing-design/9781491902399/)
- [Open-access summary of the framework](https://umnlibraries.manifoldapp.org/read/effective-design-critique-strategies-across-disciplines-67a61290-9f8f-4550-b00c-ec5e50277482/section/fede7300-cdcc-42fb-8698-8ef74b177d9d)

**Jakob Nielsen** (B)
- [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — explicit permission to use with attribution
- [How to run a UX design critique](https://www.uxtigers.com/post/design-crit) — personal blog, less institutional weight than NN/g-branded work

**Ben Shneiderman** (B)
- [Eight golden rules](https://www.cs.umd.edu/~ben/goldenrules.html) — 6th edition wording, which differs from the commonly quoted version

**NN/g** (B)
- [CASTLE framework](https://www.nngroup.com/articles/castle-framework/) — Cognitive load, Advanced feature usage, Satisfaction, Task efficiency, Learnability, Errors. Built because HEART does not fit workplace applications where users cannot choose the product.
