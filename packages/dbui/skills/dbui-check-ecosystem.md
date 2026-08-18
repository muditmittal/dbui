---
name: dbui-check-ecosystem
description: Check whether a design fits the platform it has to live in — the permission model, object kinds, compute, scale, naming vintages, preview availability, and whether the capability already exists elsewhere. Requires local organization context and degrades cleanly without it. Triggers when the user asks about ecosystem fit, overlap with existing features, what stakeholders will ask, or as one of five parallel checks dispatched by dbui-review.
---

# Check ecosystem fit

**The only check that needs context DBUI does not ship with.** Everything else here works
out of the box; this one reads local files describing the organization a design lands in.

## First, find the context

```bash
ls ./context/ecosystem/ 2>/dev/null || ls .context/ecosystem/ 2>/dev/null
```

**Found** → proceed. **Not found** → return immediately:

```
CHECK: ecosystem
STATUS: skipped — no ./context/ecosystem/ found

FIX
IMPROVE
WORKING
```

**Do not substitute general UX judgment for missing context**, and do not speculate about
a platform you cannot read. A skipped check is honest; an invented one is worse than
nothing. The other four checks already cover everything that does not need this.

## What the context holds

Four files, read in this order:

| File | Gives you |
|---|---|
| `users.md` | Who the design is for, and what breaks for that group |
| `areas.md` | Which part of the product, and **how settled it is** |
| `platform.md` | What is factually possible. **The only file you may assert from** |
| `critique.md` | The themes. Each declares whether it yields a fact or a question |

## Procedure

### 1. Establish maturity before anything else

From `areas.md`. **Established** means fit in, and novelty is a cost. **New** means this
sets a precedent including its mistakes. **Growing** means several inconsistent attempts
exist and convergence is the valuable work.

**This is not a finding — it is what shapes every finding below.** Most review
disagreements are really a disagreement about which of the three is happening.

### 2. Run the fact-yielding themes first

`critique.md` marks five themes as yielding **facts**. These produce `FIX` lines, because
the platform decides and the design can simply be wrong: the permission chain, governed
versus ungoverned objects, capability by object kind, preview as a compliance wall, and
whose credentials an action runs under.

**Cite the platform fact in every one.** "This shows a grant that will not take effect —
reading a table needs three" is a correction a builder can act on. "Permissions may be
incomplete" is not.

### 3. Then the question-yielding themes

Scope to the relevant ones — **three to five total across both groups**, not fourteen.
These produce `IMPROVE`: volume at real customer scale, the hidden tail, names that do not
identify, the name a user would search for, compute as a precondition, an answer reaching
someone who cannot check it, cost arriving late, whether it already renders elsewhere, and
discoverability.

### 4. Respect the markers

- **`(Unverified)`** — never assert. Raise as a question or leave it out.
- **⚠️ unmeasured** — a timing usable for choosing a treatment, never a figure to quote.
- **Never quote a count** of nav items, securable types or privileges. All three are
  recorded as traps rather than figures.
- **Never invent a team, a date, an owner or a priority.** The context deliberately omits
  them because they go stale invisibly. Name the **gate** — "this needs a security design
  review before private preview" — and leave the rest to a person.

### 5. Overlap is a prompt, never a finding

Duplication in this platform is unusually high, so "does this already exist" is almost
always worth asking. But **no ownership map exists**, so you can name the neighbourhood
and never the team. Phrase it as a question the builder should go answer.

### 6. Stay in your lane

**Do not report general UX issues.** If the finding would hold for any product, it belongs
to `dbui-check-guidelines`. The test: **would this finding survive if the product were not
Databricks?** If yes, it is not yours.

## Output contract

Return exactly this. No preamble.

```
CHECK: ecosystem
STATUS: ran

FIX
- <headline> :: <detail> :: <theme id> · <the platform fact it violates>

IMPROVE
- <headline> :: <detail> :: <theme id>

WORKING
- <headline> :: <detail> :: <theme id>
```

After the contract, two lines: **the maturity you established**, and **the stakeholder
questions worth preparing for** — those are review prep rather than findings, and the
orchestrator places them separately.
