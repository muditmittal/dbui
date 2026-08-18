---
name: dbui-check-voice
description: Check every user-facing string in a design against DBUI voice and tone — sentence case, action verbs, banned words, error message structure, product naming. Triggers when the user asks about copy, wording, labels, microcopy, tone or naming, or as one of five parallel checks dispatched by dbui-review.
---

# Check voice and tone

Every string a user reads. **`./dbui/docs/brandvoice.md` is the authority** — read it
rather than working from the summary below, which is a checklist and not the rules.

## Procedure

### 1. Extract every user-facing string

From code: string literals in JSX, `aria-label`, `placeholder`, `title`, `alt`, toast and
error messages, empty-state copy, button and menu labels, column headers, tooltip text.

From a design or screenshot: read the visible text, including truncated labels — **a
truncated string is a copy problem, not only a layout one.**

**Skip** identifiers, keys, test IDs, and anything the user never sees. Do not report on
variable names.

### 2. Run the mechanical checks

These are decidable and should be reported as `FIX`:

- **Emoji** in product UI → remove
- **Exclamation marks** → remove
- **Banned words** — utilize, leverage, seamless, robust, simply, just, please, kindly
- **Title Case headings** → sentence case
- **Generic button labels** — OK, Yes, No, Submit, Done → the action verb
- **A button label that is a noun** where an action is performed → verb form
- **An error that does not name a next step** → "Something went wrong" and its family

### 3. Check product and feature naming

`brandvoice.md` is the single source for product names, and **every naming vintage is
still in circulation** — docs, decks, telemetry and billing disagree by design.

- A **superseded name** in user-facing copy → `FIX`, with the current one
- A name that is current but **not what a user would search for** → `IMPROVE`
- **Capitalization** has no published rule and the docs are not self-consistent, so raise
  an inconsistency *within this design* and do not import an argument from elsewhere

### 4. Check the things that need a reader

Not mechanical, so these are `IMPROVE`:

- **A label that describes the mechanism rather than the outcome.** "Sync metadata" versus
  "Refresh table list."
- **A number with no unit.** "Popularity 31,538" — of what, over what window, and is high
  good.
- **A word doing two jobs** in one surface, or two words doing one job.
- **Copy that promises more than the system does.** "Instantly", "automatically", "always"
  — check each against what actually happens.

### 5. Stay in your lane

**Do not report layout, spacing, or component choice.** Truncation is in scope only as
"this string cannot survive its container."

**Do not report whether an error message is *placed* well** — that is G13 and belongs to
`dbui-check-guidelines`. You own whether the sentence names a cause and a next step.

## Output contract

Return exactly this. No preamble.

```
CHECK: voice
STATUS: ran

FIX
- <the string, quoted> :: <what is wrong and the replacement> :: <rule>

IMPROVE
- <the string, quoted> :: <the decision to make> :: <rule>

WORKING
- <headline> :: <detail>
```

**Quote the actual string** in every finding — a voice finding without the offending text
cannot be acted on. Where a fix is obvious, give the replacement rather than describing
it. State a section as empty rather than dropping it.
