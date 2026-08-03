# Databricks Docs — Voice & Tone Research (Area A)

**Area A scope:** Get started, workspace basics, notebooks, files / Git folders, AI/BI dashboards, Genie, general onboarding & tutorials.
**Source:** docs.databricks.com (aws/en variant only, for consistency).
**Researcher note:** Every observation below is backed by a page actually fetched during this session. No conventions were invented. Where a dimension is inconsistent, both examples are shown.
**Date:** 2026-07-22

---

## 0. Does a formal Databricks documentation style guide exist?

**No public, Databricks-authored documentation style guide was found.** A web search for "Databricks documentation style guide voice tone" surfaced only indirect evidence:

- **A former Databricks Support writer's account (Medium):** "Databricks requires active voice in its documentation." and "Brand guidelines therefore prohibit promise-making in writing, and sometimes future tense." — https://medium.com/@battle_elf/good-words-sounding-professional-vs-upholding-brand-experience-3b32b428cac9 (third-party, not authoritative, but corroborated by observed docs behavior below).
- **Databricks "Staff Technical Writer" job posting:** the role requires "maintaining a consistent voice, a clear and engaging tone, and a solid grasp of grammar and usage rules" and "Proficiency in Markdown-style formats with Git and GitHub." — https://www.databricks.com/company/careers/product/staff-technical-writer-platform-8025165002 (implies an internal style guide/voice standard exists but is not published).
- **`databricks/scala-style-guide` (GitHub)** is a *code* style guide ("Use Java docs style instead of Scala docs style"), NOT a documentation prose style guide — https://github.com/databricks/scala-style-guide.

**Conclusion:** Databricks almost certainly maintains an *internal* docs style guide (active voice, no future promises, sentence-case headings — all consistently observed), but there is **no publicly available Databricks Docs style guide**. The standard below is reverse-engineered from the live docs.

---

## 1. Point of view / person

**Convention: Second person ("you" / "your") is the dominant POV, addressing the reader directly. The company refers to itself in the third person as "Databricks" (never "we") for recommendations and behaviors. First-person "we" is extremely rare.**

- "This tutorial walks you through using a Databricks notebook to query sample data…" — https://docs.databricks.com/aws/en/getting-started/quick-start
- "To complete the tasks in this article, you must meet the following requirements" — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- Company-as-third-person for recommendations: "Databricks recommends using volumes for managing all access to non-tabular data…" — https://docs.databricks.com/aws/en/getting-started/concepts
- "your organization" / "your team" for org-level framing: "an environment for your team to access Databricks assets" — https://docs.databricks.com/aws/en/getting-started/concepts
- Rare first-person plural (in tutorial narration only): "Among these functions that we use in this tutorial are the Apache Spark `orderBy()`…" — https://docs.databricks.com/aws/en/getting-started/dataframes
- Rare first-person in a support aside: "to speed things up we provide them for you here." — https://docs.databricks.com/aws/en/notebooks/best-practices

**Consistency:** Very consistent. "you"/"Databricks" is the near-universal pairing; "we" appears only incidentally.

---

## 2. Tense & mood

**Convention: Present tense is the default. Steps use the imperative mood. Future tense ("will") is largely avoided except in tutorial outcome statements.**

- Present tense describing system behavior: "Databricks creates and opens a new, blank notebook in the `Drafts` folder…" — https://docs.databricks.com/aws/en/notebooks/notebooks-manage
- Present tense system result: "A blank notebook opens in the workspace." — https://docs.databricks.com/aws/en/getting-started/quick-start
- Imperative steps: "Copy and paste the following code into the new empty notebook cell." / "Press `Shift+Enter` to run the cell and then move to the next cell." — https://docs.databricks.com/aws/en/getting-started/quick-start
- Future tense (allowed for tutorial outcomes): "By the end of this tutorial, you will understand what a DataFrame is…" — https://docs.databricks.com/aws/en/getting-started/dataframes
- Future tense (system, occasional): "The form dynamically updates based on your selection." (present) vs "the model will be registered" (future) — https://docs.databricks.com/aws/en/getting-started/ml-get-started

**Consistency:** Present + imperative is dominant and consistent. Future "will" appears occasionally in onboarding/tutorial framing but is not used for promises about the product — consistent with the "no future promises" claim from the Medium source.

---

## 3. Voice (active vs passive) & sentence density

**Convention: Active voice dominates instructional and procedural text. Passive voice appears in conceptual/reference definitions. Sentences are short-to-medium and skimmable.**

- Active, directive: "Use Git folders to develop code in notebooks and files while following software development best practices…" — https://docs.databricks.com/aws/en/repos/
- Passive in reference definitions: "User identities are represented by email addresses." / "Service principals are represented by an application ID." — https://docs.databricks.com/aws/en/getting-started/concepts
- Passive system description: "The cell is immediately executed." / "Because the cell is run in a new session, temporary views… are not supported…" — https://docs.databricks.com/aws/en/notebooks/notebooks-code
- Dense-but-scannable definitional sentences: "Unity Catalog is a unified governance solution for data and AI assets on Databricks that provides centralized access control, auditing, lineage, and data discovery capabilities…" — https://docs.databricks.com/aws/en/getting-started/concepts

**Consistency:** Mostly active. Passive is confined to conceptual "X is represented by…" / "X is supported…" reference patterns.

---

## 4. Heading / title capitalization

**Convention: SENTENCE CASE for both page titles and section headings. Proper nouns and product names retain their own capitalization (Unity Catalog, Genie One, Databricks Runtime, Git).**

- Page titles (sentence case): "Get started tutorials on Databricks" — https://docs.databricks.com/aws/en/getting-started/ ; "Sign up for Databricks Free Edition" — https://docs.databricks.com/aws/en/getting-started/free-edition ; "Work with files on Databricks" — https://docs.databricks.com/aws/en/files/ ; "Develop code in Databricks notebooks" — https://docs.databricks.com/aws/en/notebooks/notebooks-code ; "Create and manage a Genie Agent" — https://docs.databricks.com/aws/en/genie/set-up
- Section headings (sentence case): "Accounts and workspaces", "Authentication and authorization", "Computation management" — https://docs.databricks.com/aws/en/getting-started/concepts ; "Manage Genie access", "Review query suggestions" — https://docs.databricks.com/aws/en/genie/set-up
- Proper nouns preserved inside sentence-case headings: "What is Databricks Free Edition?" — https://docs.databricks.com/aws/en/getting-started/free-edition ; "SQL syntax highlighting and autocomplete in Python commands" — https://docs.databricks.com/aws/en/notebooks/notebooks-code

**Inconsistency (step headings):** Step labels vary between colon and period across pages:
- Colon style: "Step 1: Create a new notebook" — https://docs.databricks.com/aws/en/getting-started/quick-start
- Period style: "Step 1. Create a dashboard" — https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard

Both are sentence case; only the separator differs.

---

## 5. Procedure / step style

**Convention: Numbered, imperative steps. The "To <goal>, <do X>" infinitive-first pattern is the standard lead-in for procedures. "complete the following steps" is a common framing.**

- Infinitive-first lead-in + imperative: "To create a notebook in your workspace, click New in the sidebar, and then click Notebook." — https://docs.databricks.com/aws/en/getting-started/quick-start
- Colon-introduced numbered list: "To clone a notebook: 1. With the notebook open, click File… 2. (Optional) Edit the new name…" — https://docs.databricks.com/aws/en/notebooks/notebooks-manage
- "complete the following steps" framing: "To create your first visualization, complete the following steps:" — https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard
- Optional steps flagged with "(Optional)": "(Optional) Click Browse to change the workspace location…" — https://docs.databricks.com/aws/en/notebooks/notebooks-manage

**Consistency:** Very consistent. Numbered imperative steps + "To X, …" is the house pattern throughout tutorials and how-tos.

---

## 6. Admonitions / callouts

**Convention: Lowercase-labeled admonitions: `note`, `tip`, `important`, `warning`, plus status callouts `preview` ("This feature is in Public Preview."), `beta`, and a Genie-specific `prompt` callout. Tone is neutral and directive; warnings state consequences plainly.**

- **note** (caveat / clarification): "Free Edition replaced the legacy Databricks Community Edition, which was retired in 2025. If you previously used Community Edition, sign up for Free Edition to continue your work." — https://docs.databricks.com/aws/en/getting-started/free-edition
- **tip** (helpful shortcut): "If you don't know your catalog and schema names, click Catalog in the sidebar." — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- **important** (deprecation / must-know): "Storing and accessing data using DBFS root or DBFS mounts is a deprecated pattern and not recommended by Databricks." — https://docs.databricks.com/aws/en/getting-started/concepts
- **important** (permission prerequisite): "To save your DataFrame in Unity Catalog, you must have `CREATE` table privileges on the catalog and schema." — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- **warning** (safety / trust): "Only run code in someone else's notebook if you trust the owner of that notebook." — https://docs.databricks.com/aws/en/notebooks/notebooks-collaborate
- **preview** (feature status): "This feature is in Public Preview." — https://docs.databricks.com/aws/en/workspace/workspace-browser/
- **beta** (feature status): "This feature is in Beta. Workspace admins can control access to this feature from the Previews page." — https://docs.databricks.com/aws/en/repos/git-operations-with-repos
- **prompt** (Genie Code call-to-action): "Tell Genie Code (Agent mode) to do this for you:" — https://docs.databricks.com/aws/en/getting-started/quick-start

**Consistency:** Consistent labels and neutral tone. `note`/`tip`/`important`/`warning` behave as expected; `preview`/`beta`/`prompt` are Databricks-specific additions.

---

## 7. Contractions, Oxford comma, numerals

**Contractions: USED (informal-but-professional).**
- "If you don't know your catalog and schema names…" — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- "If your Git provider isn't listed, try selecting GitHub…" — https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
- "the changes are likely due to line ending differences" / "It can't contain `* text eol=crlf`." — https://docs.databricks.com/aws/en/repos/errors-troubleshooting
- "repositories you'll access" — https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider

**Oxford comma: USED consistently.**
- "notebooks, libraries, dashboards, and experiments" — https://docs.databricks.com/aws/en/getting-started/concepts
- "cloning, branching, committing, and pushing" — https://docs.databricks.com/aws/en/repos/git-operations-with-repos
- "students, educators, hobbyists, and anyone interested in learning…" — https://docs.databricks.com/aws/en/getting-started/free-edition

**Numerals: Digits are the default, including small numbers in technical/UI contexts.**
- "There are 4 types of widgets" — https://docs.databricks.com/aws/en/notebooks/widgets
- "up to 30 tables or views" / "up to 10,000 conversations" — https://docs.databricks.com/aws/en/genie/set-up
- "Access tokens expire after 8 hours. Refresh tokens expire after 6 months of inactivity" — https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
- "Click Sample Data to view 100 rows of data" — https://docs.databricks.com/aws/en/getting-started/import-visualize-data

**Inconsistency (numerals):** Narrative prose occasionally spells out numbers, even mixing within one sentence: "Query results are limited to valid rides that are under 10 miles and cost less than fifty dollars." — https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard (digits for "10 miles", spelled "fifty dollars").

---

## 8. UI element references

**Convention: UI labels (buttons, menu items, tabs, fields) are set in bold and referred to by their exact on-screen label. Menu paths use " > " between segments. Keyboard shortcuts are written out with "+" and OS qualifiers.**

- Button/label by name: "Click Save." / "Click Publish in the upper-right corner of the dashboard." — https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard
- Menu path with ">": "Select Edit > Format Cell(s)." / "Select Edit > Format Notebook." — https://docs.databricks.com/aws/en/notebooks/notebooks-code
- Menu path with ">": "Click Create > Git folder." — https://docs.databricks.com/aws/en/repos/git-operations-with-repos
- Settings path: "Go to Settings > Developer, scroll down to Experimental features, and turn on Tabs for notebooks and files." — https://docs.databricks.com/aws/en/notebooks/notebooks-manage
- Keyboard shortcut: "Keyboard shortcut: Press Cmd+Shift+F." — https://docs.databricks.com/aws/en/notebooks/notebooks-code
- Keyboard shortcut w/ OS: "press `Option + Plus sign (+)` (Mac) or `Alt + Plus (+)` (Windows/Linux)" — https://docs.databricks.com/aws/en/notebooks/notebook-ui

**Note:** In the fetched markdown, bolding is stripped, but UI labels ("New", "Notebook", "Save", "Create") are consistently rendered as emphasized terms in the live docs, and the source clearly treats them as discrete UI strings.

---

## 9. Code / identifier / command formatting

**Convention: Inline code (backticks) for identifiers, object names, commands, values, paths, and privileges. Fenced code blocks are labeled by language (SQL, Python, Scala, R, Bash, Console, text). Placeholders use angle brackets `<...>`.**

- Inline identifiers/paths: "Query the `samples.nyctaxi.trips` table in Unity Catalog…" — https://docs.databricks.com/aws/en/getting-started/quick-start
- Inline privilege names: "you must have the `WRITE VOLUME` privilege on a volume, the `USE SCHEMA` privilege on the parent schema…" — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- Inline command/magic: "Line magics are prefixed with `%` and apply to a single line. Cell magics are prefixed with `%%`…" — https://docs.databricks.com/aws/en/notebooks/notebooks-code
- Language-labeled code blocks (SQL): `SELECT * FROM samples.nyctaxi.trips` — https://docs.databricks.com/aws/en/getting-started/quick-start
- Angle-bracket placeholders: "replace `<catalog_name>` and `<schema_name>` with your values" — https://docs.databricks.com/aws/en/getting-started/import-visualize-data
- Angle brackets in shell examples: "git clone https://<username>:<personal-access-token>@github.com/<org>/<repo-name>.git" — https://docs.databricks.com/aws/en/repos/errors-troubleshooting

**Consistency:** Very consistent. Every object name, path, command, value, and privilege is in backticks; every block is language-tagged.

---

## 10. Link phrasing

**Convention: "See <Target>." is the dominant cross-reference form. "For more information, see <Target>." and "To learn more about X, see <Target>." are the longer variants. Links use the destination page title as the anchor text (descriptive, not "click here").**

- "See Manage users." / "See Service principals." / "See Compute." — https://docs.databricks.com/aws/en/getting-started/concepts
- "To learn more about creating and managing notebooks, see Manage Databricks notebooks." — https://docs.databricks.com/aws/en/getting-started/quick-start
- "For information about online training resources, see Get free Databricks training." — https://docs.databricks.com/aws/en/getting-started/
- "For more information, see VPC peering." — https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
- "See also Apache Spark PySpark API reference." — https://docs.databricks.com/aws/en/getting-started/dataframes
- Next-steps list pattern: "To learn about adding data from CSV file to Unity Catalog and visualize data, see Tutorial: Import and visualize CSV data from a notebook." — https://docs.databricks.com/aws/en/getting-started/quick-start

**Consistency:** Very consistent. "See X" / "For more information, see X" / "To learn more…, see X" cover essentially all cross-references.

---

## 11. Terminology — exact casing & usage

Observed casing (product names Title Case; generic technical concepts lowercase):

| Term | Observed casing | Source example |
| --- | --- | --- |
| Unity Catalog | Title Case (always) | "Unity Catalog is a unified governance solution…" — concepts |
| notebook | lowercase (generic); "Databricks notebooks" | "Databricks notebooks provide real-time coauthoring…" — notebooks/ |
| workspace | lowercase | "a workspace is a Databricks deployment in the cloud" — concepts |
| compute | lowercase | "you must have permission to use an existing compute resource" — quick-start |
| cluster | lowercase | "A set of computation resources… on which you run notebooks and jobs." — concepts |
| lakehouse | lowercase | "build real-time transactional applications alongside your lakehouse data" — free-edition |
| job / Lakeflow Jobs | "jobs" lowercase; product "Lakeflow Jobs" Title Case | "See Lakeflow Jobs" — concepts |
| Genie / Genie One / Genie Agents / Genie Code | Title Case (all Genie sub-brands) | "Genie is the Databricks AI experience for users." — genie/ |
| Genie Spaces → Genie Agents | rename noted explicitly | "Genie Agents were formerly known as Genie Spaces." — genie/set-up |
| AI/BI dashboards | "AI/BI" caps w/ slash | "AI/BI dashboards feature AI-assisted authoring…" — dashboards/ |
| Delta / Delta Lake / Delta tables | Title Case | "By default, all tables created in Databricks are Delta tables." — concepts |
| DataFrame | camelCase Title (capital D, capital F) | "A DataFrame is a two-dimensional labeled data structure…" — dataframes |
| Git folders (formerly Repos) | "Git" caps, "folders" lowercase; rename noted | "Git folder (formerly Repos)" — concepts |
| Databricks Runtime | Title Case | "Databricks Runtime includes Apache Spark…" — concepts |
| Catalog Explorer | Title Case | "Catalog Explorer allows you to explore and manage data…" — concepts |
| SQL warehouse | "SQL" caps, "warehouse" lowercase | "A computation resource on which you run SQL queries." — concepts |
| catalog / schema / table / view / volume | lowercase (generic objects) | "Schemas, also known as databases, are contained within catalogs…" — concepts |
| Free Edition | Title Case | "Databricks Free Edition is a no-cost version of Databricks…" — free-edition |
| serverless compute | lowercase | "your new workspace includes serverless compute and default storage" — free-edition |
| permission levels | ALL CAPS (CAN READ, CAN EDIT, CAN MANAGE) | "NO PERMISSIONS, CAN READ, CAN RUN, CAN EDIT, and CAN MANAGE" — notebooks-collaborate |

**Consistency:** Very consistent. The rule of thumb: **branded product/feature names = Title Case; generic architecture concepts = lowercase; permission/privilege names = ALL CAPS.**

---

## 12. Overall tone

**Convention: Task-oriented, neutral, professional, and instructional. Minimal marketing (present mainly on landing/overview pages). No emoji. No exclamation points observed in instructional text. Light, occasional warmth. Polite in support/help contexts.**

- Task-oriented opening: "This article introduces fundamental components you need to understand in order to use Databricks effectively." — https://docs.databricks.com/aws/en/getting-started/concepts
- Mild marketing warmth on overview pages: "so that you can quickly transform data into sharable insights." — https://docs.databricks.com/aws/en/dashboards/
- Benefit framing (onboarding): "It's ideal for learning, prototyping, and collaborative exploration." — https://docs.databricks.com/aws/en/getting-started/free-edition
- Polite support tone: "If you have any questions about setting up Databricks and need live help, please e-mail help@databricks.com." — https://docs.databricks.com/aws/en/getting-started/
- Neutral troubleshooting tone (no blame, states cause + fix): "This error occurs when Databricks can't reach your Git server over HTTPS. It typically indicates a network connectivity issue…" — https://docs.databricks.com/aws/en/repos/errors-troubleshooting

**Consistency:** Consistent. Deeper how-to/reference pages are strictly neutral and task-focused; overview/landing pages carry a slightly warmer, benefit-oriented tone. No emoji or exclamation anywhere in the sampled corpus.

---

## Snippet bank (verbatim, with URLs)

1. **Page title (sentence case):** "Get started tutorials on Databricks" — https://docs.databricks.com/aws/en/getting-started/
2. **Intro sentence (2nd person, present):** "This tutorial walks you through using a Databricks notebook to query sample data stored in Unity Catalog using SQL, Python, Scala, and R and then visualize the query results in the notebook." — https://docs.databricks.com/aws/en/getting-started/quick-start
3. **Section heading (sentence case):** "Authentication and authorization" — https://docs.databricks.com/aws/en/getting-started/concepts
4. **Procedure step (imperative + keyboard):** "Press `Shift+Enter` to run the cell and then move to the next cell." — https://docs.databricks.com/aws/en/getting-started/quick-start
5. **"To X, …" pattern + menu path:** "To create a notebook in your workspace, click New in the sidebar, and then click Notebook." — https://docs.databricks.com/aws/en/getting-started/quick-start
6. **Admonition (important, deprecation):** "Storing and accessing data using DBFS root or DBFS mounts is a deprecated pattern and not recommended by Databricks." — https://docs.databricks.com/aws/en/getting-started/concepts
7. **Admonition (warning, safety):** "Only run code in someone else's notebook if you trust the owner of that notebook." — https://docs.databricks.com/aws/en/notebooks/notebooks-collaborate
8. **Recommendation (company third-person):** "Databricks recommends using volumes for managing all access to non-tabular data on cloud object storage." — https://docs.databricks.com/aws/en/getting-started/concepts
9. **Error / troubleshooting sentence (neutral, cause+fix):** "This error indicates that a problem occurred while deleting folders. The repository is now in an inconsistent state. Delete and re-clone the repository to reset its state." — https://docs.databricks.com/aws/en/repos/errors-troubleshooting
10. **Cross-reference phrasing:** "To learn more about creating and managing notebooks, see Manage Databricks notebooks." — https://docs.databricks.com/aws/en/getting-started/quick-start

---

## All URLs read (29 unique pages successfully fetched)

1. https://docs.databricks.com/aws/en/getting-started/
2. https://docs.databricks.com/aws/en/getting-started/free-edition
3. https://docs.databricks.com/aws/en/getting-started/concepts
4. https://docs.databricks.com/aws/en/getting-started/quick-start
5. https://docs.databricks.com/aws/en/getting-started/import-visualize-data
6. https://docs.databricks.com/aws/en/getting-started/dataframes
7. https://docs.databricks.com/aws/en/getting-started/ml-get-started
8. https://docs.databricks.com/aws/en/getting-started/free-training
9. https://docs.databricks.com/aws/en/notebooks/
10. https://docs.databricks.com/aws/en/notebooks/notebooks-code
11. https://docs.databricks.com/aws/en/notebooks/notebooks-manage
12. https://docs.databricks.com/aws/en/notebooks/best-practices
13. https://docs.databricks.com/aws/en/notebooks/ipython-kernel
14. https://docs.databricks.com/aws/en/notebooks/notebook-ui
15. https://docs.databricks.com/aws/en/notebooks/notebooks-collaborate
16. https://docs.databricks.com/aws/en/notebooks/widgets
17. https://docs.databricks.com/aws/en/repos/
18. https://docs.databricks.com/aws/en/repos/git-operations-with-repos
19. https://docs.databricks.com/aws/en/repos/errors-troubleshooting
20. https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
21. https://docs.databricks.com/aws/en/files/
22. https://docs.databricks.com/aws/en/dashboards/
23. https://docs.databricks.com/aws/en/dashboards/tutorials/
24. https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard
25. https://docs.databricks.com/aws/en/genie/
26. https://docs.databricks.com/aws/en/genie/set-up
27. https://docs.databricks.com/aws/en/genie/conversation-api
28. https://docs.databricks.com/aws/en/workspace/
29. https://docs.databricks.com/aws/en/workspace/workspace-browser/

**Also fetched (external, for the style-guide question):**
- https://www.databricks.com/company/careers/product/staff-technical-writer-platform-8025165002
- https://github.com/databricks/scala-style-guide
- https://medium.com/@battle_elf/good-words-sounding-professional-vs-upholding-brand-experience-3b32b428cac9

**URLs attempted that 404'd / timed out (not counted):** `workspace/get-started` (404), `genie/using-genie` (404), `genie/genie-one` (404), `dashboards/visualizations` (404), `dashboards/author-dashboards` (404), `notebooks/notebook-editor` (timeout).

**Unique-page count: 29.**

---

## 5-sentence synthesis of Area A voice

Databricks onboarding, notebook, Git-folder, dashboard, and Genie documentation speaks directly to the reader in the second person ("you"), refers to itself in the third person ("Databricks recommends"), and writes almost entirely in present tense with imperative steps, reserving future tense for occasional tutorial-outcome statements and never for product promises. The prose is predominantly active voice — passive appears only in conceptual "X is represented by…" reference definitions — and stays short, dense, and skimmable. Both page titles and section headings use sentence case, with product names (Unity Catalog, Genie One, Databricks Runtime, Git folders) preserved in Title Case and permission levels in ALL CAPS; the house terminology rule is branded-feature = Title Case, generic-concept = lowercase. Procedures follow a rigid "To <goal>, <imperative>…" / numbered-step pattern, cross-references are almost always "See X" or "For more information, see X", UI labels are bolded and joined by " > " in menu paths, and every identifier/command/path sits in backticks. The overall tone is task-oriented, neutral, and professional with lightly warmer benefit language on overview pages, standardized lowercase admonitions (note / tip / important / warning, plus Databricks-specific preview / beta / prompt), contractions and the Oxford comma used consistently, digits preferred for numerals, and zero emoji or exclamation points.
