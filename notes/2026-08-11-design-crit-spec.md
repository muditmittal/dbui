# Design review — spec

**Status:** draft for review. Guidelines and Standards are built; tier 3 is not. Not a contract.

A tool that reviews a design the way an experienced Databricks reviewer would: what a user will
expect, what a stakeholder will ask, and what already exists elsewhere in the platform that this
overlaps. Three tiers over one target, and only the first of them blocks anything.

`crit` was the working name for tier 3 and is now **review prep**, because the tool prepares you for
a review rather than being one. The filename still says crit; the tiers below are authoritative.

---

## The four tiers

One ladder, and what orders it is **who settles the question**. At the bottom the machine is right
and you are wrong. At the top nobody is right and the point is to have the argument early. Authority
moves from the machine to the person as you climb, and the useful window moves earlier.

| Tier | Question | Settled by | Verdict | Window |
|---|---|---|---|---|
| **0 · Audit** | Does the system agree with itself? | The repo | pass / fail, gates | every change to DBUI |
| **1 · Standards** | Does this obey DBUI primitives and the normative floor? | The source | pass / caution / note | 90–100% |
| **2 · Guidelines** | Does this meet established UX standards? | A cited standard, then judgment | met / needs review / n/a | 50–90% |
| **3 · Review prep** | Is this the right thing, and what will be asked? | Nobody. It is a discussion | none | 20–80% |

Tier 0 is `yarn design:audit` and tier 1 is `yarn dbui check`. Both exist. Tiers 2 and 3 are new.

**Standards and guidelines rather than checks and heuristics**, because the repo already uses that
pair with that meaning: `@standard` and `@guideline` are live JSDoc tags on components for
must-follow versus should-follow, and `archive/research/agent-design-standards/README.md` set out to
define "standards (must-follow) and guidelines (may-follow)". The naming is not new, it is the
existing one applied consistently. **Review prep** rather than crit, because the tool prepares you
for a review rather than being one.

**The verdict vocabularies differ on purpose.** If guidelines said pass and fail they would be read
as gates and gamed within a month; if review prep carried a score someone would optimize it. Three
tiers, three vocabularies, and only tier 1 blocks anything.

Because `check` and `audit` now name tiers 1 and 0, the umbrella running 1 through 3 needs its own
verb. `dbui review <target>` — not `design-check`, which would collide with the tier below it.

## Guidelines and Patterns are not competitors

The question was whether Guidelines replaces the Patterns layer. It does not, and conflating them
would lose the more useful half of each.

**A Pattern is a Guideline we have already answered.** The guideline states what the reader needs;
the pattern states what to build. `TRACKER.md` P1 — two options go to SegmentControl, more than two
to DropdownMenu — is a decided answer drawn from a finite set of DBUI primitives. The heuristic
behind it is about when a reader benefits from seeing every option at once, and it is true for a team
that has never heard of DBUI.

That gives the two layers a clean division and a mechanical test for which one a sentence belongs to:

> **Would this still be true and useful for a team that does not use DBUI?**
> Yes → heuristic. No → pattern.

"Sticky header on a long table" passes — heuristic. "Use `<Table sticky>`" fails — pattern. A
heuristic never names a DBUI component; a pattern almost always does.

The payoff runs in the direction people do not expect. Patterns today are assertions with no stated
rationale — P3 says sticky header by default and cites nothing. Once the heuristics carry sources,
**every pattern can cite the heuristic it satisfies**, which makes the Patterns layer more defensible
than it is now. That is worth building even if the review tool never ships.

The failure mode to watch is the one that already cost the constraints page its place: two layers
restating each other. The test above is the guard. Apply it in review, not after.

---

## Three outputs, three sources

| Output | Runs on | Who else has it |
|---|---|---|
| How well this meets user expectations | Published UX standards | Everyone. Commodity |
| What a stakeholder will ask | Databricks review transcripts | Only us |
| What this overlaps elsewhere in the platform | Surface + ownership inventory | Only us, and it is the least built |

Value per unit of effort runs in reverse order to that list. Overlap is the failure that costs most
and gets caught latest.

---

## Knowledge base

### Layer 1 — external standards

Every entry carries source, URL, license, retrieval date, and a reuse bucket. **Bucket A** is openly
licensed and stored verbatim with the required notice. **Bucket B** is free to read but all rights
reserved — store our own restatement plus a citation, never cache the prose. That distinction is what
lets us answer "where did this rule come from" in a review without hedging.

| Source | Bucket | Covers |
|---|---|---|
| W3C WCAG 2.2 + ARIA Authoring Practices Guide | A | The only hard pass/fail. `grid`, `treegrid`, combobox, dialog contracts |
| Red Hat PatternFly | A (MIT) | Enterprise console patterns. Closest published analogue to what we ship |
| IBM Carbon, incl. Carbon for AI and data-viz | A (Apache-2.0, docs repo included) | The one enterprise system whose guidance prose is openly licensed. AI label inside a dense table |
| GOV.UK Design System + Service Manual | A (OGL v3) | Error messages, content discipline, researched status vocabulary for runs |
| Nielsen's ten heuristics | B, explicit grant, credit required | The baseline frame |
| NN/g free articles | B | Complex applications, data tables, CASTLE, response-time thresholds |
| Shneiderman, *The Eyes Have It* (1996) | B, free PDF | Lineage graphs. Tree and network data; the relate, history and extract tasks |
| Cognitive Dimensions of Notations | B, free Cambridge PDFs | Query editors and notebooks. Viscosity, hidden dependencies, premature commitment |
| Microsoft HAX + Google PAIR | B | AI over data, organized by interaction phase including "when the AI is wrong" |

**Baymard is excluded.** Their terms prohibit paraphrase by name and ban automated extraction even
under a paid subscription ($2,400–$8,400/yr), their license forbids deriving inspiration for similar
services while they ship competing AI UX tools, and their guideline scope is homepage, category,
product, cart, checkout, account. No configuration of including it is both legal and useful.

Also excluded on license grounds: Atlassian Design System (forbids adaptation and derivative works,
documentation included), Shopify Polaris (field-of-use restricted to the Shopify ecosystem), NN/g
paid reports (no external redistribution).

Cognitive Dimensions and Shneiderman are the two that matter most and that nobody else cites. Neither
Nielsen nor Carbon can express what is wrong with out-of-order notebook execution; hidden
dependencies can.

### Review prep is forum-agnostic, and stage is the durable axis

Decided 2026-08-12, and it simplifies the tool considerably.

Databricks runs at least three review forums — a weekly design critique, a Design Review broadcast to
around three hundred people, and Product Excellence Reviews that carry sign-offs. The tool models
**none of them**. It assumes only that an internal stakeholder review exists and prepares the builder
for it.

The reason is that **forums churn and stages do not.** Names, cadences and audiences change every
year or two; the process doc describing those three is already four years old. A tool that branched
on forum would be encoding the most perishable thing in the system, and would need re-teaching every
reorganization.

What survives is **stage** — concept, detailed, pre-ship. Note that even Product Excellence, the most
formal of the three, defines its two gates by stage rather than by ceremony: at the napkin phase, and
a few weeks before private preview. Stage is what the forums are themselves organized around, so it
is the layer to reason on.

Consequences. `forum` stays in the coded bank as provenance, never as an input the tool branches on.
`stage` is a first-class field and drives which tier leads the report. And there is no "which review
are you preparing for?" prompt, because the honest answer is that it does not change the questions
worth rehearsing.

### Layer 2 — the Databricks question bank

Derived by coding review transcripts into structured entries. Not raw text — the bank is the asset,
and it is worth building even if the tool never ships.

Per entry: verbatim question, normalized form, dimension, the trigger in the design that provoked it,
asker role, review stage, and the outcome of that review.

**Outcome is what makes it useful.** A question asked in every review that changes nothing is noise.
A question asked in six reviews that sent four back is the first thing the tool should say. Weight by
consequence, not frequency.

### Layer 3 — the Databricks platform baseline

What the product is, what it is called, who uses it, where it is going.

**This layer lives outside the repo**, at `~/.cache/dbui-databricks-baseline/`. This repository is
public, and the baseline mixes public documentation with material derived from internal sources —
named owners, internal system names, unreleased status, telemetry, pricing. The rule adopted
2026-08-12 is that **no internal-derived Databricks research is committed here at all**, even where a
given paragraph happens to be public-sourced, because a mixed directory is one careless edit away
from leaking and nobody can see provenance in a diff.

What stays in the repo is [`research/ux-standards/`](../research/ux-standards/README.md) — openly
licensed, publicly citable, and safe by construction.

This is what lets review prep say "this overlaps Catalog Explorer" rather than generic UX advice.

**Rev 2 cut it to three sections** — product surfaces, the object model, and personas — after the
first pass came back with too much that was ephemeral. Adoption percentages, ticket ids, preview
statuses and analyst placements are gone rather than caveated: they age within a quarter, cannot be
checked from outside, and two sources usually disagree, at which point the rule says drop both. What
survived is structure, which ages in years.

Two consequences for the tier that reads it. First, the baseline **never produces an assertion, only
a question** — the source is degraded by MCP and permission failures and its author says so. Second,
it carries the same honesty device as the other two layers: a table naming what it does not cover, so
review prep knows when to stay quiet. Right now that table is longer than the baseline. Notebooks,
the workspace shell, developer experience, every non-governance persona, the control-plane split,
compute, AI and ML objects, external positioning, customer voice and anything regulatory all have
**no backing at all**.

One finding from that layer lands on DBUI rather than on the tool, and it argues that accessibility
work here propagates further than it looks. The specifics are internal and are recorded outside this
repo; `TRACKER.md` M10 is the matching open decision.

### The corpus, as it actually is

Located 2026-08-12 in Google Drive rather than delivered as files: **22 documents**, Gemini meeting
notes rather than raw transcripts, which is better — each carries named attendees, a Summary, an
explicit **Decisions** section, assigned **Next steps**, and a **Details** section of bullets naming
who said what against a timestamp.

Two properties of the corpus decide what the bank can honestly claim.

**Twenty of the twenty-two are GovHub.** Cross-area material exists in Drive — rolling design-team
notes, a Discovery design sync — and was **deliberately left out**. So the coverage skew is a
standing condition rather than a gap awaiting a fix, and the bank must say so wherever it speaks.

**They are working sessions, not stakeholder reviews.** The same seven people meet weekly to design
together. That yields what a team debates among itself, which is not the same as what a room of
stakeholders asks someone presenting. Expect the bank to be strong on recurring design tensions and
weak on the adversarial question — and do not paper over the difference, because the adversarial
question is the one review prep exists to rehearse.

Raw transcripts live outside the repo, in `~/.cache/dbui-review-transcripts/`. They carry named
people, unreleased work and candid criticism, and this repo is scoped for a public release. Only the
**de-identified** coded bank may come in, and even that sits with shells and patterns on the internal
side of the line.

### The coverage matrix — how a narrow sample stops being a problem

The consolidated themes file we have samples one platform area. Treating it as the whole picture
would ship a tool that is confident and wrong outside that area.

The fix is to make coverage a field rather than an assumption. Every theme carries which areas it has
been observed in, how many reviews support it, and its expected transferability — universal, likely,
or area-specific. The tool states the area it is reviewing, returns universal themes plus that area's
specific ones, and prints its own coverage caveat: *this rests on four reviews from governance and
none from ML.*

Empty cells are then a visible collection backlog rather than a silent blind spot. The matrix's row
labels should come from the same surface inventory that powers the overlap check, so the two stay in
one vocabulary.

**Division of labor:** the external sources make the bank complete; the transcripts make it
Databricks. Without Layer 1, a narrow sample yields a narrow tool. Without Layer 2, it is a generic
UX bot. The matrix is where they meet.

---

## Topics

Settled. Thirteen heuristic topics plus one that governs the output rather than the design, each
already mapped to primary sources in
[`research/ux-standards/topics.md`](../research/ux-standards/topics.md).

Status and long-running work · errors, validation and recovery · empty, loading, partial, disabled and
read-only states · tables and dense data · filtering, search and faceting · lineage, graphs and
dependency chains · notation surfaces (query editors and notebooks) · AI-generated content and
assistants · ARIA authoring and keyboard · navigation and page structure · destructive actions and
reversibility · charts and data visualization · content, voice and naming. The fourteenth, critique
method, sets the shape of the report.

Two of these are thin in the published record — **lineage** has essentially one citable source, and
**faceted filtering**'s deepest research sits behind a license we cannot use. Say so in the published
heuristic rather than inventing a citation.

### The heuristic record

One shape, so the page, `dbui guideline` and the review tool read a single source — the way
`constraints-data.ts` already works and `TRACKER.md` Phase 0 asks Patterns to.

| Field | Why |
|---|---|
| `id` | Stable and citable from outside, e.g. `H-STATUS-03` |
| `topic` | One of the thirteen |
| `statement` | One sentence. Names no DBUI component — that is the pattern's job |
| `rationale` | Why it holds. What breaks without it |
| `source` | An id in `research/ux-standards/sources.json`, plus the deep URL |
| `bucket` | A, A-v or B. Decides whether we may quote or must restate |
| `appliesWhen` | The condition that makes it relevant, so **not applicable** is computed rather than guessed |
| `evaluate` | What a reader looks for to decide met or needs review |
| `severity` | What it costs when unmet |

`appliesWhen` is the field that keeps the report honest. A lineage widget does not need the filtering
heuristics, and reporting them as unmet is noise that teaches people to skim.

---

## Input

Accepts any of, degrading by what it is given:

| Given | What becomes available |
|---|---|
| Figma node | Structure, tokens, variants via the Figma MCP. The richest input, and where designers are at 20–80% |
| React code | Everything the linter sees, plus real component and state structure |
| Screenshot | Vision only. Layout and density read; behavior and state do not |
| Written intent, PRD, spec | No visual critique, but the stakeholder-question and overlap outputs work at full strength |

The stakeholder and overlap outputs need the least and are worth the most, so a written description
alone is a supported entry point rather than a degraded one.

---

## Output contract

Every finding is an **aspect → standard → consequence** triple: the specific thing in the design, the
standard it relates to, and what follows from it. This is Connor and Irizarry's definition of a
well-formed critique statement in *Discussing Design*, and enforcing it mechanically is what makes
output read as grounded rather than generated.

**A finding that cannot name its standard is reaction-based feedback and is suppressed.** That single
rule does most of the work.

Each finding carries severity and confidence. Assertions stay visually separate from open questions.
Heuristic evaluation quality is known to degrade when the evaluator lacks domain knowledge, so the
honest design surfaces questions for a domain expert rather than performing final judgment.

### The report

Worked against a real case — a lineage widget rendered inside a chat thread.

```
Checks       3 objects with findings, 1 clean       (14 pass · 3 caution · 10 note)
Heuristics   5 need review, 4 met, 4 not applicable
Review prep  6 questions · 2 prior art · 3 working
```

**Count objects, not findings.** Ten failures on one widget reads as catastrophic and is usually one
hand-built control emitting ten rules. `react-lint.js` already groups this way through `byObject` and
names the diagnosis. `TRACKER.md` says it outright: the total the linter prints is not a count of
problems. Lead with the object count and keep the raw numbers in the tail.

**Never total the heuristics.** "7 of 12" is a score, and a score gets optimized. Report the count
needing review and stay quiet about the rest. Exclude not-applicable from the headline entirely.

**Lead with the tier that matches the stage.** All three always running is right; all three getting
equal billing is not. At 30% complete a hex literal is noise and review prep is the whole value. At
95% it inverts. Where the stage is not supplied, infer it from the input — a Figma node with no built
code cannot be at 95%.

### Review prep buckets

| Bucket | What it holds | Source |
|---|---|---|
| **Questions** | What you will be asked, ranked by consequence, not frequency | The transcript bank |
| **Live debates** | Arguments the forum has not settled, that your design touches | The debates register |
| **Prior art** | Where this overlaps something already shipped — inside Databricks first, outside second | Surface inventory |
| **What's working** | What to preserve through the next iteration | Guidelines met, notably |
| **Ideas** | Explicitly last, explicitly marked as ideation | — |

Four notes on that table, each of which was a decision.

**Prior art is not optional.** It was missing from the first draft of the buckets and it is the
highest-value output in the tool. For the lineage-in-chat example it is the whole ballgame: lineage
already exists in Catalog Explorer, and the real question is whether this is a second implementation
of it. Internal overlap ranks above external inspiration, which is the same question pointed
outward.

**What's working must meet the same bar as everything else.** An appreciation that does not name its
standard is flattery, which is precisely the reaction-based feedback Connor and Irizarry exclude. It
earns a place because telling someone what not to break in the next iteration is real information.

**Ideas sit apart from the critique.** *Discussing Design* separates critique from ideation for a
reason: mixed together, the questions read as leading and the reader defends rather than thinks.
Keep them last and labelled, or gate them behind an explicit ask.

**Live debates is the bucket this design was missing**, and it came from reading a review skill a
colleague assembled from a different forum. Four entries in theirs: whether two scope switchers can
coexist, whether workspace selection should be additive, whether a soft tab should reimplement a page
or host it, whether a security control undercuts the AI story.

None of those is a guideline, because there is no right answer yet. None is a question from history,
because none is settled. They are **unresolved institutional arguments**, and a designer whose work
touches one will be asked about it with certainty — which makes them the highest-value thing review
prep can surface and the easiest to be blindsided by.

They are also the fastest-decaying content in the system. A debate resolves and the entry becomes
actively wrong, where a stale guideline merely becomes dull. Every entry carries the date it was last
seen open, and an unrefreshed register is worse than none.

**No bucket carries a verdict.** Review prep is the tier where nobody is right.

---

## Evaluation

Hold out five transcripts. Give the tool only the design that was reviewed and score whether it
predicts the questions actually asked. Cheap, honest, and it converts the thing from a vibes exercise
into something defensible. It also reveals when the bank is saturated and more transcripts stop
paying.

---

## Build order

Five projects, and the order changed once the corpus landed.

1. **Heuristics.** Now first, because it has **no data dependency** — `research/ux-standards/` is
   built and sourced, so this can start today while transcripts are still being gathered. It also
   ships value on its own twice over: a topic-scoped design lint, and a citable rationale for every
   Pattern that currently asserts without one.
2. **The question bank.** Data work, gated on transcripts arriving. Stands alone as an asset.
3. **The overlap index.** Gated on the internal surface inventory. Highest value, least built.
4. **The review-prep skill.** Reads 2 and 3. House style is a flat file at
   `packages/dbui/skills/dbui-review-prep.md` with `name` and a trigger `description` — matching the
   four skills already there, which are flat files, not `SKILL.md` directories.
5. **`dbui review`.** Fuses tiers 1 through 3. Last, and the smallest piece.

The reordering matters: the earlier plan put the question bank first, which would have stalled the
whole thing behind a data-collection task. Heuristics breaks that dependency.

---

## Inputs needed

**Tier 1 — no product without these**

- Transcripts across platform areas, not one. Per review: surface, stage, attendees by role, and
  outcome (approved, approved with changes, sent back, killed). Roughly 20–30 before themes stabilize;
  under 10 is pattern-matching on noise.
- The consolidated themes file, plus which area it samples. Treated as a hypothesis to test against
  the transcripts, not as source of truth.
- Three to five reviews that went well and three to five that went badly, labeled. Specifically the
  crit that improved a design and the crit that missed something that bit us later. These calibrate
  severity better than volume does.

**Tier 2 — what makes it Databricks rather than generic**

- The surface and ownership inventory. Forty to sixty entries with owning team and one line each is
  enough to make the overlap check real. Highest-leverage single input.
- Known overlap precedents — the real cases where two teams shipped the same thing.
- Persona or CUJ material. Nothing in the live packages carries one today.

**Tier 3 — cheap to produce, sharpens it considerably**

- Stakeholder profiles for recurring reviewers: the legitimate repeated concern each one owns. Highest
  signal per word available anywhere in this project.
- Escalation or decision records where a crit disagreement was resolved.

**Not needed:** NN/g or Baymard content. We should not cache the first and cannot use the second.

---

## Open questions

- **Heuristics against principles and constraints.** Mostly resolved: the thirteen topics are
  *surfaces* (status, tables, lineage) while the six principles are *craft dimensions* (audience,
  visuals, voice) — different axes, so they cross rather than collide. Still worth one pass to
  confirm no heuristic restates a constraint, because two layers restating each other cost the
  constraints page its place once already.
- **Where the report lives.** Terminal, a portal page, or a comment written back into Figma.
- **Transcript handling.** Whether they are de-identified, and where the coded bank is stored given
  that it holds attributable internal review content.
- **Whether the bank is public.** Settled 2026-08-12, and more sharply than expected: **this
  repository is public.** Heuristics are publishable and would carry real authority outside. The
  question bank, the overlap index and the platform baseline are not, and they now live outside the
  repo entirely rather than merely being marked internal. See Layer 3.
- **Databricks baseline refresh.** The baseline is dated and versioned, and each refresh writes a new
  dated file so a critique can name the revision it was made against. What is still open is the
  trigger: no cadence is set, and terminology is the shortest-lived section — twelve product renames
  landed in roughly a year.
