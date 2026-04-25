# Brand Voice

> **RULE: Read this file before writing any user-facing copy** — labels, titles, descriptions, error messages, empty states, toasts, button labels, tooltips. Adjectives don't work for AI; concrete rules and examples do. This file is built for that.

This file is the content side of the design system. Component rules say *how the box looks*; this file says *what goes inside*.

---

## Tone — fixed dimensions (1–5 scale)

Databricks product UI sits at:


| Dimension                     | Scale                        | Databricks                                                                                                         |
| ----------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Funny ↔ Serious               | 1 = comedic · 5 = grave      | **4** — Serious. We're a data and AI platform; people make load-bearing decisions in this product. Don't be funny. |
| Formal ↔ Casual               | 1 = corporate · 5 = casual   | **3** — Neutral-casual. Contractions are fine. No "esteemed user". No "hey there 👋".                              |
| Respectful ↔ Irreverent       | 1 = deferential · 5 = cheeky | **2** — Respectful, never cheeky. We talk to data engineers; they don't want jokes when their job fails.           |
| Enthusiastic ↔ Matter-of-fact | 1 = effusive · 5 = clinical  | **4** — Matter-of-fact. State the thing, then move on. No exclamation marks in product copy. No "Awesome!".        |


If something you write reads as funny, cheeky, effusive, or visibly Marketing™ — rewrite it.

---

## Vocabulary

### Always use (preferred)


| Concept                     | Use this                              |
| --------------------------- | ------------------------------------- |
| The product itself          | Databricks                            |
| The hierarchical data layer | Unity Catalog                         |
| AI/BI assistant             | Genie                                 |
| Compute resources           | compute, cluster, warehouse           |
| User identity               | user (subject), people (collective)   |
| The unit of work            | job, pipeline, query, notebook        |
| Activate / turn on          | enable                                |
| Deactivate / turn off       | disable                               |
| Remove permanently          | delete                                |
| Remove temporarily          | unshare, hide, archive                |
| Make visible to others      | share                                 |
| Verb for an LLM acting      | run, generate, ask                    |
| Permission state            | access, permissions, granted, revoked |


### Never use (banned)

These read as marketing speak, jargon, or noise. Replace.


| Don't                                       | Do                                                          |
| ------------------------------------------- | ----------------------------------------------------------- |
| utilize                                     | use                                                         |
| leverage                                    | use                                                         |
| in order to                                 | to                                                          |
| at this time                                | now (or omit)                                               |
| please be advised                           | (omit; just say it)                                         |
| kindly                                      | (omit)                                                      |
| robust                                      | reliable, fast, accurate (whichever is true)                |
| seamless                                    | (omit; describe the actual benefit)                         |
| cutting-edge / state-of-the-art             | (omit; let the feature speak)                               |
| best-in-class                               | (omit)                                                      |
| ecosystem                                   | platform, products                                          |
| solution                                    | feature, product, service                                   |
| stakeholders                                | the specific role (admin, data engineer, …)                 |
| synergies / circle back / low-hanging fruit | never                                                       |
| holistic                                    | (omit; be specific)                                         |
| empower / unlock                            | help, let, give                                             |
| simply / just                               | (omit — usually condescending)                              |
| folks / guys / y'all                        | people, users, team                                         |
| awesome / amazing / great                   | (omit; show, don't tell)                                    |
| 🎉 / 🚀 / ✨ / any emoji                     | never in product copy. Reserve for marketing surfaces only. |


### Capitalization

- **Sentence case** for everything: page titles, section headings, button labels, tabs, menu items, table column headers. Not Title Case.
- Exceptions: brand names (Databricks, Unity Catalog, Genie, Mosaic AI), proper nouns, acronyms (SQL, API, JWT).
- "Databricks" is always one word, capital D.
- "lakehouse" is lowercase.
- "Unity Catalog" is two words, both capitalized.

### Punctuation

- **No exclamation marks** in product UI. Ever. (Marketing copy is a different file.)
- Em dash (`—`) preferred over en dash or two hyphens.
- Oxford comma always.
- Periods inside parentheses only when the parens enclose a full sentence.
- Smart quotes (`"` `'`) in body copy; straight quotes inside code/identifiers.
- Single space after periods.

### Numbers

- Spell out zero through nine in prose, use digits for 10+.
- Always digits in metrics, table cells, and IDs.
- Use thin separators in big numbers (`1,234,567`).
- Time and dates: localized via locale APIs — never hardcode formats.

---

## Sentence structure

- **Short.** Average 10–15 words. Cut anything you can cut.
- **Active voice.** "Databricks deleted the table" not "the table was deleted".
- **Imperative for actions.** "Save changes", not "You can save changes" or "Save your changes".
- **Contractions allowed.** "can't", "don't", "you're". Use them; they read more human.
- **No rhetorical questions.** "Want to delete this?" → "Delete this catalog?".
- **One thought per sentence.** Two thoughts → two sentences.
- **No hedging.** "may", "might", "could potentially" — pick one. If the system *will* do it, say "will". If it might fail, say what causes failure.

---

## Component-specific microcopy

### Button labels

- **Verb-first, action-oriented**: "Save", "Delete", "Run query", "Share", "Copy path".
- Match the destructive verb in confirmations: dialog says "Delete this table?" → button says "Delete" (not "OK", not "Yes").
- Cancel buttons literally say "Cancel".
- Don't add the object when the context is obvious: in a Delete dialog for a single table, the button is "Delete", not "Delete table".
- Loading state is a verb in present continuous: "Saving…", "Running…", "Generating…" (with one ellipsis character `…`, not three dots).

### Page titles & section headings

- Noun, not action. "Dashboards" not "View dashboards". "Permissions" not "Manage permissions".
- Plural for collections, singular for a specific entity. "Catalogs" for the list page; "main" for a specific catalog.

### Empty states (`Empty` component)

Template:

```
<title>           ≤6 words, sentence case, noun phrase
<description>     1 sentence, ≤20 words, says what this surface is for and what to do next
<primary action>  imperative verb, matches what the user does to populate this surface
```

On-brand:

> **No dashboards yet**
> Dashboards are interactive views built from queries and tables. Create your first one to share insights with the team.
> [ Create dashboard ]

Off-brand:

> **You don't have any dashboards! 🎉**
> Looks like you haven't created any dashboards yet. No worries — let's get started!
> [ Get started ]

Why the off-brand fails: emoji, exclamation, "no worries" hedging, vague CTA, condescending tone.

### Error messages (`Alert` variant=danger, error toast)

Three parts in order: **what happened → why → what to do next.**

On-brand:

> Couldn't run the query. The warehouse is starting up. Retry in a few seconds, or pick a different warehouse.

Off-brand:

> ⚠️ Oh no! Something went wrong. Please try again later.

Why the off-brand fails: emoji, "Oh no", no diagnosis, no actionable next step, "later" is unmeasurable.

### Confirmations (`AlertDialog`)

Title states the action. Description lists the irreversible consequence. Buttons use the action verb.

On-brand:

> **Delete `users` table?**
> All rows, columns, history, and permissions will be deleted. This can't be undone.
> [ Cancel ] [ Delete ]

Off-brand:

> **Are you sure?**
> This will delete the table forever. Are you sure you want to continue?
> [ No ] [ Yes ]

Why the off-brand fails: vague title, "forever" is informal, double-asks, generic Yes/No buttons that don't say what happens.

### Toasts (`Sonner`)

One short past-tense or imperative line. No title. No icon emoji. Auto-dismiss handles itself.

On-brand:

> Path copied
> Table deleted
> Query saved as draft

Off-brand:

> Successfully copied path to clipboard! ✓
> Your table has been deleted from Unity Catalog.

Why the off-brand fails: "Successfully" adds nothing, the checkmark is component chrome (not copy), full sentences are too long for transient feedback.

### Tooltips

- One line. ≤8 words.
- Capitalize the first word. No final period.
- Describe what the action does, not the icon name.

On-brand: `Open in new tab`, `Copy table path`, `Run query`
Off-brand: `Click to open in a new browser tab.`, `Copy.`, `External link icon`

### Field labels & helper text

- Label is a noun phrase, sentence case. "Workspace name", "Catalog owner", "Default schedule".
- Helper text below the label is a single sentence. State *what the field is for*, not *how to fill it in*.
- Required indicator is a red asterisk after the label, no word "required".
- Placeholder is an example value, not a label substitute. "e.g. `analytics_prod`" — never just repeat the label.
- Error messages **replace** helper text (don't stack). State the constraint that's violated, not "Invalid".

On-brand label set:

> **Catalog name** 
> Lowercase letters, digits, and underscores. 3–63 characters.
> [ analytics_prod ]
> *(error)* Must start with a letter.

### Status / Badge text

- One word when possible. Two words max. Sentence case. No punctuation.
- Use the system's vocabulary: `Running`, `Failed`, `Pending`, `Succeeded`, `Active`, `Disabled`, `Draft`.
- Don't invent statuses ("In progress" → use `Running`).

### Tab labels

- Single word when possible. "Overview", "Permissions", "History", "Lineage", "Insights".
- Plural for tabs that show a list of things ("Columns", "Schemas"); singular for a unique view ("Overview").
- No icons in tab labels.

### Page header descriptions

- One sentence, factual. What this page is for, no marketing.

On-brand: *"Dashboards turn queries and tables into shareable visualizations."*
Off-brand: *"Welcome to Dashboards! Build amazing data stories that captivate your audience."*

---

## How tone shifts by surface

The brand voice doesn't change, but the *register* does:


| Surface                | Register                             | Example                                               |
| ---------------------- | ------------------------------------ | ----------------------------------------------------- |
| Page titles            | Plain noun                           | `Dashboards`                                          |
| Empty states           | Direct, slightly warmer              | `No dashboards yet`                                   |
| Error toasts           | Minimal, factual                     | `Couldn't save query`                                 |
| Confirmation dialogs   | Concrete consequence                 | `All rows, columns, and permissions will be deleted.` |
| Tooltips               | Imperative verb phrase               | `Copy table path`                                     |
| Field labels           | Noun phrase                          | `Catalog name`                                        |
| Helper text            | Direct constraint                    | `Lowercase letters, digits, and underscores.`         |
| Onboarding / first-run | Slightly more guiding                | `Connect a catalog to get started.`                   |
| Marketing surfaces     | (different file — out of scope here) | —                                                     |


---

## Quick checklist before shipping copy

- No emoji in product UI
- No exclamation marks
- No banned words (utilize, leverage, seamless, robust, etc.)
- Sentence case for headings and labels
- Buttons use the action verb (`Delete`, not `OK`)
- Empty/error/loading states have designed copy, not placeholder
- Error messages have *cause* + *next step*, not just "Something went wrong"
- Tooltips ≤8 words, no period
- Confirmations name the consequence (`This can't be undone.`)
- Status terms match the system's vocabulary (`Running`, not `In progress`)
- Numbers: spell 0–9 in prose, digits 10+
- No rhetorical questions
- No "please", "kindly", "simply", "just"

