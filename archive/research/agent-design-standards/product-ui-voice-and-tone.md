# Databricks product UI — voice and tone

This is the standard for user-facing copy in the Databricks product UI — navigation, titles, buttons, descriptions, tooltips, modals, empty states and errors. It defines how the product speaks so the experience stays cohesive, professional and task-oriented across every surface. It covers in-product copy and complements the Docs style guide, which governs documentation.

---

## Core principles

The Databricks voice is professional, authoritative and concise — yet human and approachable. Human does not mean overly polite. Approachable does not mean slangy.


| Principle              | Meaning                                             | Example                                                                  |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| Clear over clever      | Plain, precise words, not marketing jargon          | **Do:** "Query sample data" **Don't:** "Unleash insights"                |
| Direct and task-first  | Lead with the action or outcome                     | **Do:** "Create warehouse" **Don't:** "Here you can create a warehouse"  |
| Honest, not hype       | State what's true, including limits                 | **Do:** "Runs on serverless compute" **Don't:** "Blazing-fast compute"   |
| Smart but approachable | Assume competence. Explain the new, not the obvious | **Do:** "Deleting removes all child objects" **Don't:** "Oops, careful!" |


## Voice and tone scale

**Voice** is the constant — the principles above, how Databricks always sounds. **Tone** is how that voice flexes to the user's moment and stakes.


| Tone     | Guidance                                                      | Where it applies                                    | Example                                        |
| -------- | ------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------- |
| Warm     | Brief encouragement at first-run, empty and success moments   | Empty states, onboarding, success toasts            | "Create your first query to explore your data" |
| Neutral  | The default — instructive, direct, matter-of-fact             | Nav labels, page titles, field labels, descriptions | "Genie answers questions about your data"      |
| Cautious | Firm and precise for errors, destructive and security actions | Errors, delete confirmations, permission grants     | "Deleting this catalog can't be undone"        |


## Grammar and mechanics

1. **Person** — use "you" or the implied "you" in imperatives. The company is "Databricks", never "we".
2. **Tense and mood** — present tense, imperative. No future tense, except when comparing a future event to the present.
3. **Voice** — active. Prefer "Table deleted" or "You deleted the table" over the passive "The table was deleted".
4. **Verbs vs. nouns** — actions and buttons use verbs ("Create", "Run"). Nav, titles and labels use nouns ("Compute", "Queries").
5. **Plain and lean** — omit needless words. Cut intensifiers such as "very" and "extremely". Use the positive form. Keep sentences to 15–20 words.
6. **Consistent** — one term for one thing. If it's "foo" in one place, it's "foo" everywhere.
7. **Contractions** — use them freely ("don't", "can't").
8. **Numerals** — digits with thousands separators ("8 hours", "1,000 days"). Use digits for all numerals, IDs and metrics.
9. **Steppers** — "Step 1:", not "Step 1.".
10. **Acronyms** — avoid unless common (SQL, XML, OK). Spell out on first mention. No internal abbreviations ("Databricks Runtime", not "DBR"). No Latin ("e.g.", "i.e.", "etc.").
11. **Never pedantic or pushy** — not "One must ensure…", not "you'll break everything".
12. **Punctuation** — US English. No serial (Oxford) comma, per AP style — add one only to avoid confusion. Periods only for full sentences or clarity. No exclamation points. No emoji. Avoid semicolons and parentheses — use em dashes. Avoid "please" and "thank you".

## Sentence casing

**Use sentence case for every UI string — page and dialog titles, field names, table columns, group labels, buttons, links and instructional text. Capitalize only the first word. Never use title case.**


| Exception                                   | Casing                               | Example                                                                |
| ------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------- |
| Branded product / feature names             | Title case (match the official name) | Databricks Runtime · Delta Live Tables · Unity Catalog · Feature Store |
| Generic / industry terms, even for features | lowercase                            | notebook · workspace · cluster · job · namespace · lakehouse           |
| Permission tokens                           | ALL CAPS                             | ALL PRIVILEGES · CAN MANAGE                                            |
| Acronyms (common only)                      | as-is                                | SQL · API · ML                                                         |


- Capitalize a generic term only when it's the first or only word of a nav item, menu or page/dialog title, or when you point to a UI element ("Click **Workspace**").
- Don't capitalize a resource the user creates or owns ("Create a notebook", "in your workspace").
- Spell out an unfamiliar acronym on first mention, then abbreviate.

## UI moment tones


| Moment                | Tone     | Guidance                                                                                                        | Example                                                                         |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Navigation label      | Neutral  | Noun, 1–2 words, matches the destination                                                                        | "SQL warehouses"                                                                |
| Page title            | Neutral  | Names the object or task, no end punctuation                                                                    | "Create a metastore"                                                            |
| Button / CTA          | Neutral  | Verb plus object. Loading uses the present continuous. Confirmation buttons match the action verb               | "Add data" · "Saving…" · "Delete"                                               |
| Description           | Neutral  | What it is and what it's for, 2 sentences or fewer                                                              | "Genie answers questions about your data in natural language."                  |
| Tooltip               | Neutral  | Add information the label doesn't show. One line. End an actionable tooltip with a "Learn more" link, no period | "Serverless compute starts in seconds. Learn more"                              |
| Empty state           | Warm     | Title 6 words or fewer. One sentence naming the surface and the next step                                       | "No queries yet. Create a query to get started."                                |
| Onboarding modal      | Warm     | Value in the title, one primary action                                                                          | "Query data with Genie" → "Try Genie"                                           |
| Success toast         | Warm     | Factual and brief                                                                                               | "Table created."                                                                |
| Error                 | Cautious | What happened, why, what to do next. Name the error class when one exists                                       | "Couldn't run the query. The warehouse is starting up. Retry in a few seconds." |
| Destructive action    | Cautious | State the exact, irreversible consequence                                                                       | "Permanently removes all schemas, tables and volumes. This can't be undone."    |
| Security / governance | Cautious | Make scope and responsibility explicit                                                                          | "Granting ALL PRIVILEGES lets this group read, modify and delete every table."  |


---

# Checklists

## Accessibility checklist

- Alt text is **70–155 characters**, front-loads key terms, ends with a period, and never says "image of" or "photo of".
- Every icon-only control has a non-empty `aria-label` that names the action.
- Link and button text stands alone — no bare "here", "click here", "read more" or "learn more".
- Text meets WCAG AA contrast — at least 4.5:1 for body, at least 3:1 for large or UI text.
- Language is inclusive and non-offensive, and uses the singular "they".
- UI elements are referenced by label. Any location uses "upper-left / leftmost " with the element name — never a bare direction.

## Globalization checklist

- UI strings are whole, never concatenated from fragments at runtime.
- Labels leave room for translations about 30% longer. No fixed-width truncation.
- Dates and times use **ISO 8601** (YYYY-MM-DD).
- No semicolons. Use two sentences or a conjunction.
- No idioms, humor or US-centric references such as football or baseball.
- "and" is spelled out. Reserve "&" for tight labels.
- Meaningful text stays out of images and diagrams. Use adjacent copy or numbered callouts, 2 to 8 of them.
- Code-like terms — commands, parameters, filenames, identifiers — are formatted as inline code.

## Quality checklist

1. Sentence case throughout, with only brand and feature names in Title case?
2. No exclamation points and no emoji?
3. No banned or marketing words — "leverage", "utilize", "seamless", "robust", "unlock", "empower"?
4. No semicolons and no serial (Oxford) comma unless it's needed to avoid confusion?
5. Second person and active voice — "you", never "we" and no passive "was …"?
6. Buttons lead with a verb, and confirmation buttons match the action ("Delete")?
7. Errors give the cause and the next step, and name the error class when one exists?
8. Contractions used where they read naturally ("can't", "don't")?
9. Destructive consequences stated explicitly ("This can't be undone")?
10. Numerals as digits, with thousands separators?
11. Icon-only controls have an `aria-label`, and images have 70–155-character alt text?
12. Current product names used — "Lakeflow Jobs", "Git folders", "SQL warehouse", "AI/BI dashboards"?

## Product vocabulary

Use the terms customers use — industry-standard, not redefined or misused.

#### UI actions (verbs)


| Use                                      | Not                                  | Why                                                            |
| ---------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| click (menus, buttons, links)            | click on · choose · select           | one verb for one interaction                                   |
| select / clear (checkboxes, multiselect) | toggle · check/uncheck · mark/unmark | ambiguous otherwise                                            |
| enter                                    | type · input                         | "enter" means type or add data                                 |
| press (keyboard keys)                    | hit                                  | "hit" reads as violent                                         |
| go to                                    | proceed · navigate                   | simpler, easier to translate                                   |
| enable · turn on · turn off              | toggle *(as a verb)*                 | "toggle" is a noun or adjective only                           |
| run                                      | execute                              | "execute" reads as violent                                     |
| log in / log out                         | sign in · log on · log into          | Databricks house style. Use "sign in" only for cloud providers |


#### UI element names (nouns)


| Use                                                                                   | Not                                             |
| ------------------------------------------------------------------------------------- | ----------------------------------------------- |
| sidebar                                                                               | left nav · left navigation pane                 |
| dialog                                                                                | dialog box · pop-up · pop-up window             |
| drop-down menu / drop-down list                                                       | dropdown                                        |
| pane                                                                                  | panel                                           |
| checkbox                                                                              | check box · box                                 |
| kebab (⋮) · hamburger (☰) · meatballs (⋯) · bento (3×3) menus                         | three-dot menu *(first mention OK as an alias)* |
| notebook · widget · tab · tile · breadcrumb · banner · alert · placeholder · username | *(all one word, lowercase)*                     |


#### Plain words


| Use                  | Not                                                        | Why                                                  |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| to                   | in order to · for the purpose of                           | wordy                                                |
| because              | as · since · due to the fact that                          | "as" and "since" are ambiguous and hard to translate |
| use                  | utilize · leverage                                         | plainer                                              |
| or                   | and/or                                                     | "and" is implied                                     |
| and · in addition to | as well as                                                 | ambiguous                                            |
| can · might          | may                                                        | "may" implies permission                             |
| fewer                | less                                                       | for countable things                                 |
| must · we recommend  | have to · need to · should                                 | precise, translatable                                |
| verify · check       | ensure · make sure · be sure                               | precise                                              |
| in                   | within                                                     | simpler                                              |
| *(remove)*           | please · thank you · simply · just · generally · note that | unnecessary and can read as condescending            |


#### Marketing jargon to remove

Describe what's actually new instead of using these words.

> best-in-class · disruptive · revolutionary · innovative · seamless · effortless · futureproof · leading edge · paradigm shift · digital transformation · unlock · empower · powerful · world-class · blazing-fast · robust · unique · easy/easily · delve into · multifaceted · "#1 / largest" · download counts · queries-per-second stats

#### Inclusive and non-offensive language

Avoid terms that are ableist, violent, biased or too casual.


| Use                              | Not                       |
| -------------------------------- | ------------------------- |
| allowlist / denylist             | whitelist / blacklist     |
| primary / secondary · main       | master / slave            |
| built-in                         | native                    |
| breach                           | invade                    |
| not valid                        | invalid                   |
| perimeter network                | DMZ · demilitarized zone  |
| stop · cancel · end              | kill · abort              |
| stops responding · fails         | hang                      |
| person · people · person-hours   | man · mankind · man-hours |
| they / their / them              | he/she · s/he             |
| people · users · team · everyone | guys · folks · y'all      |
| doesn't understand · ignore      | blind to · dumb           |
| complicated · complex            | crazy · insane            |
| final check for completeness     | sanity check              |


Keep a banned term only when it's in UI text, an error or code you can't change — then work with eng and design to fix it.

## Product and feature names

Respect current names — renames are active.


| Use                                                                        | Not                                     |
| -------------------------------------------------------------------------- | --------------------------------------- |
| Git folders (feature) · Git folder (asset)                                 | Repos · Databricks Repos                |
| Lakeflow Jobs (feature) · jobs (resource)                                  | Workflows                               |
| Lakeflow Spark Declarative Pipelines / SDP (feature) · pipeline (resource) | Delta Live Tables · DLT                 |
| SQL warehouse                                                              | SQL endpoint                            |
| admin settings                                                             | admin console                           |
| the Databricks platform                                                    | Lakehouse Platform · lakehouse platform |
| AI/BI dashboards                                                           | Lakeview · legacy dashboards            |
| repository                                                                 | repo                                    |
| username                                                                   | user name                               |


When a branded name may confuse, use the branded name in the nav, the industry term on buttons and filters, then a tooltip to connect the two. For example, "Lakeflow Spark Declarative Pipelines" in the nav, "pipeline" in the UI, plus a tooltip that bridges them.

---

# Sources

- **go/uitext** — the in-product UI text guide.
- **go/docstyleguide** — *Voice, tone, and audience*.
- **go/docstyleguide** — *Images, graphics, diagrams, and screenshots* (alt text).
- **go/docterms** — the A–Z word list, and the product and feature name lists.
- **Databricks Brand Guidelines** — brand voice and punctuation.

