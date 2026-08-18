---
name: dbui-review
description: Full design review — runs standards, guidelines, voice, principles and ecosystem-fit checks in parallel and synthesizes one critique. Triggers after building a screen or set of screens with dbui-build-screen, when the user shares a Figma frame, screenshot or URL and asks what to improve, when preparing for a design review or crit, or when the user says "review", "critique", "crit", "feedback", "how does this look", or "what would people ask".
---

# Review a design

**This skill orchestrates. It does not do the checking itself.** Five specialist checks
run in parallel and this synthesizes their output into one critique.

Use `dbui-validate` alone for a fast compliance pass. Use this when the design is worth
judging.

## The five checks

| Check | Skill | Decides |
|---|---|---|
| Standards | `dbui-validate` | Tokens, components, composition. Binary |
| Guidelines | `dbui-check-guidelines` | 13 general UX topics. Judgment |
| Voice | `dbui-check-voice` | Every user-facing string |
| Principles | `dbui-check-principles` | 6 principles, 5 constraints. Constraints are hard |
| Ecosystem | `dbui-check-ecosystem` | 14 Databricks themes. Needs local context, degrades if absent |

## Procedure

### 1. Frame it, and confirm before dispatching

**Do this first and sequentially** — three of the five checks scope themselves by the
frame, so dispatching before it is settled wastes the run.

State what you think you are looking at and **wait for correction**:

> "This looks like an agentic issue-resolution flow for Lakebase, at concept stage.
> Reviewing for direction rather than detail — correct me if it is further along."

Establish four things: **user group** · **area** · **stage** (concept, detailed,
pre-ship) · **surface**. If the design is a set of screens, also establish whether the
flow between them is in scope.

### 2. Dispatch all five in parallel

**Send one message containing five `Task` calls.** They share no state and have no
ordering dependency, so running them sequentially only costs time.

Each subagent gets: the frame from step 1, the design input (file paths, or attach the
images via `file_attachments`), and an instruction to follow its skill file and return
**only** in the contract below.

```
Follow the skill at ./dbui/skills/<skill-name>.md.

Frame: <user group> · <area> · <stage> · <surface>
Input: <paths, or "attached screenshots">

Return only the output contract from your skill file. No preamble.
```

**Do not summarize a check yourself if its subagent fails.** Report that it did not run.

### 3. The output contract every check returns

Each check returns findings in exactly three severities. **This is what makes synthesis
possible** — do not accept freeform prose from a subagent.

```
CHECK: <name>
STATUS: ran | skipped — <reason>

FIX
- <headline> :: <detail> :: <source>

IMPROVE
- <headline> :: <detail> :: <source>

WORKING
- <headline> :: <detail>
```

- **FIX** — a violation, a factual error, or a broken rule. Not a preference.
- **IMPROVE** — a judgment call the builder should make on purpose.
- **WORKING** — done right, named specifically. **Never omit this section.**

Empty sections are stated as empty, not dropped.

### 4. Synthesize

**Dedupe first.** Multiple checks will catch the same thing — a vague button label will
appear in voice, guidelines and possibly standards. **Merge into one finding and
attribute it to the strictest check that caught it.** A reader seeing the same problem
three times stops reading.

**Then order by severity, not by check.** Nobody wants five sections named after
skills. The checks are how the work was done; they are not how it is read.

**Resolve conflicts openly.** If two checks disagree, say so — that is a real tension in
the system and worth surfacing rather than silently picking a winner.

## Output format

```
## Review — <area> · <stage>

### What's working
Two to four things, named specifically. Not effort, not "good structure."

### What should be fixed
Violations and factual errors. Each with the rule or fact it breaks. Omit the section
if genuinely empty — never pad it.

### What can be improved
Judgment calls. Each one: what the design does, then the decision to make. No counts,
no scores.

### What you'll be asked
Questions a reviewer will raise, each with a plausible answer sketched so the builder
arrives with a position.
```

**Two sentences per finding, maximum.** If a finding needs a paragraph it is two
findings, or it is not a finding.

**Close with one next action.** One, not a list.

**State which checks ran.** One line at the end: `Checks: standards, guidelines, voice,
principles · ecosystem skipped (no context found)`. A review missing a tier must not
read like a complete one.

## Running one check alone

Every check is independently invokable and useful on its own. A builder who only wants
copy reviewed should be sent to `dbui-check-voice`, not through this. When a user asks
for one thing, run that one thing — **do not upsell the full review.**

## Boundaries

**Never invent a team, a date, an owner, or a priority.** Where the context does not
name one, say so and name the *gate* instead.

**Never total findings into a score.** "12 guidelines fail" is work for the reader.
"Button labels read better as verbs — yours is a noun" is useful. The goal is that a
choice becomes intentional, not that a count goes down.

**Confirmation is worth as much as correction.** A review that is all faults gets read
defensively and acted on selectively.
