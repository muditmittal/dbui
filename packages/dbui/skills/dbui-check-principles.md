---
name: dbui-check-principles
description: Check a design against the six DBUI craft principles and the five constraints. Principles are defensible positions; constraints are unbendable lines. Triggers when the user asks whether a design fits the system's intent, mentions principles, constraints, agency, accountability, custody, fairness or access, or as one of five parallel checks dispatched by dbui-review.
---

# Check principles and constraints

**Two different kinds of thing, and conflating them is the main failure of this check.**

- **Principles** are positions the system takes. A design can argue with one and win.
- **Constraints** are lines the system does not cross. A design that crosses one is
  wrong, and the finding is a `FIX` regardless of how good the rest is.

Both are published on the portal — principles under `/docs/principles`, constraints under
`/docs/constraints`, each with do and don't detail. **The statements below are the whole
test; the portal has the reasoning.**

## The five constraints — hard lines

| ID | Aspect | The line |
|---|---|---|
| C1 | **Agency** | The machine prepares, the person decides |
| C2 | **Accountability** | Nothing is asserted without a way to check it |
| C3 | **Custody** | Data never appears or moves without its boundary |
| C4 | **Fairness** | Nothing is built to work against the reader |
| C5 | **Access** | No one is locked out of what they are accountable for |

**What crossing each looks like in practice:**

- **C1** — an action taken without a decision point. Auto-apply, auto-accept, a default
  that commits. An agent that acts and reports rather than proposes and waits.
- **C2** — a claim with no way to verify it. A confidence score with no basis, "validated"
  with nothing to open, a generated summary with no path to the source.
- **C3** — a value shown without its scope. A number that could be workspace or account
  and does not say. Data crossing a boundary — region, workspace, catalog, compliance —
  without the crossing being visible.
- **C4** — a dark pattern, however mild. A destructive action styled as primary,
  consent buried in a flow, an opt-out harder than an opt-in, a cost hidden until after.
- **C5** — a person accountable for something who cannot reach it. Read-only where
  responsibility is real, or a fix offered to someone without the privilege to apply it.

## The six principles — defensible positions

| Principle | The test |
|---|---|
| **Built for people accountable for the data** | Does this respect that the reader answers for this to someone else? |
| **Calm carries the work** | Is anything competing for attention it has not earned? |
| **Clear over clever, honest over hype** | Would a plainer version be worse, or just less impressive? |
| **Every element earns its place** | What would be lost by deleting this? |
| **Learned once, true everywhere** | Does this behave the way its siblings elsewhere behave? |
| **Easy the first time, fast the thousandth** | Does the beginner path tax the expert, or the expert path abandon the beginner? |

## Procedure

### 1. Check all five constraints, every time

**Do not scope constraints.** There are five, they are short, and a crossed line is the
most expensive thing this whole review can miss. Check each explicitly and say which held.

### 2. Then check the principles that apply

Scope these. Two to four, based on what the surface does. **"Learned once, true
everywhere" is the one most often relevant and most often skipped** — it is where a
one-off variant of an existing pattern gets caught.

### 3. Separate a violation from a tension

A design frequently serves one principle at the cost of another — density against calm,
first-time ease against thousandth-time speed. **That is a tension, not a violation.** Name
both sides and let the builder choose. `IMPROVE`, never `FIX`.

### 4. Stay in your lane

**Do not report token or component violations** — that is `dbui-validate`. "Every element
earns its place" is about whether the element should exist, not whether it uses the right
spacing token.

**Do not report platform facts.** If the issue is that the permission model cannot answer
what the design claims, that is `dbui-check-ecosystem`. C5 Access is about whether the
*design* locks out an accountable person, not about how grants resolve.

## Output contract

Return exactly this. No preamble.

```
CHECK: principles
STATUS: ran

FIX
- <headline> :: <detail> :: C<n> <aspect>

IMPROVE
- <headline> :: <detail> :: <principle name, or C<n> as a tension>

WORKING
- <headline> :: <detail> :: <principle or constraint>
```

**Every `FIX` here must cite a constraint**, not a principle — a principle cannot generate
a FIX. If you want to raise a principle strongly, it is still an `IMPROVE`.

After the contract, one line: **which constraints you checked and confirmed held.** A
constraint check that reports nothing is indistinguishable from one that did not run.
