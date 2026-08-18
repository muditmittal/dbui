---
name: dbui-check-guidelines
description: Check a design against the 13 DBUI guidelines — general UX topics like status, errors, empty states, tables, filtering, lineage, notation, AI output, keyboard, structure, consequence, charts and explanation. Triggers when the user asks whether a design follows best practice, mentions guidelines or heuristics, or as one of five parallel checks dispatched by dbui-review.
---

# Check guidelines

Thirteen guidelines, each a general UX topic. **These are judgment, not rules** — a
design may break one on purpose, and the job is to make that choice deliberate rather
than accidental.

Published in full at `/docs/guidelines` on the portal, with sources.

## The thirteen

| ID | Topic | Statement |
|---|---|---|
| G1 | Status | Work that outlasts attention reports itself |
| G2 | Errors | An error names what happened, why, and what to do next |
| G3 | States | Empty, loading and denied are different answers |
| G4 | Tables | A table serves four tasks, and most serve one |
| G5 | Filtering | A filter says what it did and how to undo it |
| G6 | Lineage | A graph answers how two things relate, not just that they do |
| G7 | Notation | An editor is judged by what a small change costs |
| G8 | AI | Design the wrong answer first |
| G9 | Keyboard | The widget's keyboard contract is already written |
| G10 | Structure | People arrive mid-task from somewhere else |
| G11 | Consequence | State the blast radius before the button, not after |
| G12 | Charts | A chart states what it excluded |
| G13 | Explanation | Explain the new, not the obvious, and put it where the decision is |

Six are marked critical, seven important, one nice-to-have. **Severity does not decide
whether to raise something** — relevance does.

## Procedure

### 1. Scope before you check

**A review that raises all thirteen is noise.** Each guideline has an `appliesWhen`
condition; pick the three to five that actually apply to what this surface does.

Rough map, though the surface decides:

- **Any long-running action** → G1, G11
- **Any failure path** → G2, G3
- **A list or table** → G4, G5, G10
- **A graph or dependency view** → G6
- **A code or query editor** → G7
- **Generated or inferred output** → G8, G13
- **A chart** → G12
- **Anything interactive** → G9

### 2. Check the ones you scoped

For each, three outcomes:

- **Handled** → say so, specifically. This is a `WORKING` line.
- **Missed, and it matters** → `IMPROVE`, with the decision to make.
- **Contradicted outright** → `FIX`. Rare for a guideline. Reserve it for cases where the
  design actively misleads: an axis truncated without marking, a chart drawn as complete
  when partial, a destructive action with no stated reach.

### 3. Do not restate the guideline

Name it, then talk about *this* design. "G2 says an error names what to do; yours says
'Something went wrong'" is useful. Three sentences on the philosophy of error messages
is not.

### 4. Two failures specific to this check

**Do not raise a Databricks-specific finding here.** If the real issue is the permission
chain, object kinds, or preview availability, that is `dbui-check-ecosystem` and will be
raised there. Raising it in both produces a duplicate the orchestrator has to merge.

**Do not raise copy here.** Wording, tone and banned words are `dbui-check-voice`. G2 is
about whether the error *names a next step*, not about how the sentence reads.

## Output contract

Return exactly this. No preamble.

```
CHECK: guidelines
STATUS: ran

FIX
- <headline> :: <detail> :: G<n>

IMPROVE
- <headline> :: <detail> :: G<n>

WORKING
- <headline> :: <detail> :: G<n>
```

Every line cites the guideline it came from. State a section as empty rather than
dropping it. **Also state which guidelines you scoped out and why** — one line, after the
contract, so the orchestrator knows what was not looked at.
