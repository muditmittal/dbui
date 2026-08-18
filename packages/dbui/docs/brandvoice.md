# Product UI: Voice and tone

> The standard for user-facing copy in the Databricks product UI. It governs
> navigation, titles, buttons, descriptions, tooltips, modals, empty states and
> errors, so the product reads as one cohesive, professional, task-oriented
> experience.
>
> This file is the source of truth for the content design linters. Flag anything
> inaccurate or missing to the author.

## Core principles

The Databricks voice is professional, authoritative and concise, but human and
approachable. **American spelling throughout** — color, behavior, optimize,
canceled. This applies to code comments and token names as well as UI copy.

| Principle | Meaning | Do | Don't |
|---|---|---|---|
| Clear over clever | Plain, precise words instead of marketing jargon | Query sample data | Unleash insights |
| Direct and concise | Lead with the primary action, use the fewest words possible | Delete catalog | Click here to delete the catalog |
| Honest, not hype | State what is true, including technical limits | Runs on serverless compute | Blazing-fast compute |
| Smart but approachable | Assume competence; explain the new, not the obvious | Deleting removes all child objects | Oops, careful |

## Voice and tone scale

Voice is the constant personality of the product. Tone flexes with the user's
context and the stakes involved.

A tone carries no example of its own. Every context a tone names has a moment
below, and those moments are the examples — a specimen here as well would be the
same string under a second heading.

| Tone | Context | Guidance |
|---|---|---|
| Warm | Empty states, onboarding, success toasts | Brief encouragement for first-run or success moments |
| Neutral | Nav labels, page titles, field labels | The default instructive, matter-of-fact style |
| Cautious | Errors, delete confirmations, permission grants | Firm and precise for destructive or security actions |

## Tone in UI context

Grouped by tone, three to five moments each. A tone with one moment reads as an
exception to Neutral rather than a register of its own. Within Cautious the order
escalates, from a retryable error to the change that cannot be taken back.

| Moment | Tone | Guidance | Example |
|---|---|---|---|
| Empty state | Warm | Title of six words or fewer, one sentence for the next step | No queries yet. Create a query to start. |
| No results | Warm | Repeat the term searched, then offer one way to widen it | No tables match “orders”. Search all catalogs or try a shorter term. |
| Onboarding | Warm | Name the first step and what it makes possible. One sentence | Create your first query to explore your data. |
| Success toast | Warm | Name what finished and what it produced. No congratulation | Run finished in 4 minutes and wrote 1,284 rows. |
| Navigation label | Neutral | Noun, 1–2 words, matches the destination exactly | SQL warehouses |
| Page title | Neutral | Names the object or task, no end punctuation | Create a metastore |
| Button / CTA | Neutral | Verb plus object. Loading uses the present continuous | Add data · Saving… · Delete |
| Description | Neutral | Explains what and why in two sentences or fewer | Genie answers questions about your data. |
| Tooltip | Neutral | Adds information not already in the label. No final period | Serverless compute starts in seconds |
| Error message | Cautious | State what happened, why, and what to do next | Couldn't run the query. Retry in a few seconds. |
| Permission denied | Cautious | Name the missing privilege and who can grant it | You need SELECT on main.sales to run this query. Ask the catalog owner for access. |
| Limit reached | Cautious | State the limit, then the one way to proceed | You've reached the limit of 100 concurrent queries. Wait for a run to finish. |
| Downstream impact | Cautious | Name the downstream consumers the change affects, with counts | Renaming this table breaks 3 dashboards and 1 pipeline that read from it. |
| Destructive action | Cautious | State the exact irreversible consequence | Deleting this catalog removes 42 tables. This can't be undone. |

## Sentence casing and punctuation

Use sentence case for every UI string — capitalize only the first word. Never use
title case for generic labels. Follow US English, and do not use semicolons.

| Exception | Casing | Example |
|---|---|---|
| Branded products | Title Case | Unity Catalog, Delta Live Tables |
| Generic terms | lowercase | notebook, cluster, job, lakehouse |
| Permission tokens | ALL CAPS | ALL PRIVILEGES, CAN MANAGE |
| Common acronyms | As-is | SQL, API, ML |

## Grammar and mechanics

| Category | Rule | Guidance |
|---|---|---|
| Person | Use "you" | Use "you" or an implied "you". Avoid "we". |
| Tense | Present tense | Prefer "save" over "will save" |
| Voice | Active voice | Prefer "You deleted the table" over the passive |
| Clarity | Plain language | 15–20 words per sentence; remove intensifiers such as "very" |
| Data | Numerals | Digits for all numerals in a sentence, e.g. "In 1,234 days" |
| Punctuation | Style | No serial comma. No emoji, no exclamation points. |

## Quality checklists

### Accessibility

| Rule | Guideline |
|---|---|
| Alt text | 70–155 characters, front-load key terms, end with a period |
| Icon controls | Must have a non-empty `aria-label` |
| Stand-alone text | Link and button text must make sense alone — never "click here" |
| Contrast | Meet WCAG AA, minimum 4.5:1 for body text |
| Spatial references | Use element labels, never location or direction |

### Globalization

| Rule | Guideline |
|---|---|
| Whole strings | Never concatenate fragments at runtime |
| Expansion room | Leave roughly 30% extra space for translation; avoid fixed widths |
| Standard formats | ISO 8601 (`YYYY-MM-DD`) for all dates |
| Image text | Keep meaningful text out of images; use numbered callouts |

### Content quality

| Rule | Guideline |
|---|---|
| Sentence case | Throughout, except branded names |
| Banned words | Remove marketing terms such as "leverage", "utilize", "seamless" |
| Active verbs | Buttons must start with an active verb |
| Destructive actions | Explicitly state "This can't be undone" |

## Terminology

| Use | Not | Reason |
|---|---|---|
| click | click on, select | Standardizes interaction verbs |
| select / clear | toggle, check | Removes ambiguity for checkboxes |
| enter | type, input | Covers both typing and pasting |
| go to | proceed, navigate | Simpler, easier to translate |
| run | execute | Avoids violent imagery |
| log in | sign in | Databricks house style |
| built-in | native | Plainer and more inclusive |
| stop / cancel | kill, abort | Avoids violent imagery |
| in | within | Simpler |
| to | in order to, for the purpose of | Direct |
| or | and/or | "and" is implied |
| and | as well as | Ambiguous |
| can / might | may | "may" implies permission |
| because | as, since, due to the fact that | Simpler to translate |
| must | have to, need to, should | Precise and translatable |
| use | utilize, leverage | Simpler language |
| fewer | less | For countable things |
| verify / check | ensure, make sure | Precise |
| not valid | invalid | Plainer, more accessible |
| username | user name | Standardizes spelling |
| repository | repo | Avoids short forms |
| people / users | guys, folks | Inclusive and professional |
| allowlist / denylist | whitelist, blacklist | Inclusive and professional |
| primary / secondary | master, slave | Inclusive and professional |
| final check | sanity check | Inclusive and professional |

## Product names

The single source for product and feature naming. Everything that writes user-facing copy reads this
table — no second copy anywhere, and a rename lands here first.

Names churn faster than anything else in this file: eighteen entries below, almost all of them from a
single year. **Check this table rather than trusting a screenshot, a deck or a dashboard**, because
legacy names survive in telemetry, billing and doc URLs long after the UI stops using them.

| Use | Not | Reason |
|---|---|---|
| Lakeflow pipelines | Delta Live Tables, DLT, Lakeflow Declarative Pipelines, Spark Declarative Pipelines | Renamed twice. Lowercase *p* — the branded family is Lakeflow, the noun is generic |
| Lakeflow Jobs | Workflows | Avoid the legacy name |
| Lakeflow Connect | — | Ingestion. One of four Lakeflow products |
| Lakeflow Designer | Visual Data Prep, Designer | The sidebar and the docs disagree; the docs name wins in copy |
| AI/BI dashboards | Lakeview, legacy dashboards | Avoid the legacy name |
| Genie One | Databricks One | Renamed. The business-user surface |
| Genie Agents | Genie spaces, Genie data rooms | Renamed. A configured environment, not a UI |
| Genie Code | Databricks Assistant | Renamed. The developer assistant |
| OpenSharing | Delta Sharing | Renamed on donation to the Linux Foundation |
| AI Search | Vector Search, Mosaic AI Vector Search | Renamed |
| Unity AI Gateway | Mosaic AI Gateway, AI Gateway | Renamed |
| Supervisor Agent | Multi-Agent Supervisor | Renamed |
| Declarative Automation Bundles | Databricks Asset Bundles, DABs | Renamed |
| Git folders | Repos | Avoid the legacy name |
| SQL warehouse | SQL endpoint | Renamed in 2023 |
| Standard access mode | Shared access mode | Renamed. The API still says `USER_ISOLATION` |
| Dedicated access mode | Single user | Renamed. The API still says `SINGLE_USER` |
| Compute plane | Data plane | The docs moved to compute plane; three planes exist, not two |
| Free Edition | Community Edition | Renamed |
| Data quality monitoring | Lakehouse Monitoring | Renamed |

**The Genie family is three different things.** Genie One is the business-user surface. Genie Agents
are configured domain environments that power its answers. Genie Code is the developer assistant. All
three have an "Agent mode" and the three modes differ — this is the likeliest naming error to make.

**Lakeflow is an umbrella over four products** — Connect, pipelines, Jobs, Designer. Collapsing them
into "Lakeflow" loses the distinction the names exist to carry.

## Methodology

The topics here draw on agent-readable design-system files and a study of the
content principles of Adobe Spectrum, IBM Carbon and Material Design. The rules
come from a sample of more than 100 Databricks documentation pages, reconciled
with internal guidelines and refined to match the voice defined above.

## Sources

- `go/uitext` — the in-product UI text guide
- `go/docstyleguide` — voice, tone and audience
- `go/docstyleguide` — images, graphics, diagrams and screenshots (alt text)
- `go/docterms` — the A–Z word list, and the product and feature name lists
- Databricks Brand Guidelines — brand voice and punctuation

---

*Draft of 2026-07-23, maintained with Databricks content writers. Still being
refined; treat the terminology and product-name tables as the most stable part.*
