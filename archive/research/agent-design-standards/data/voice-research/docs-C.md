# Docs Voice & Tone Research — Area C: Databricks SQL + AI/ML

**Scope:** Databricks SQL (warehouses, queries, SQL editor) and AI/ML — Mosaic AI, MLflow, Model Serving, agents / Agent Framework, Foundation Model APIs, AI Search (Vector Search), AI Functions.
**Source:** docs.databricks.com (aws/en). All observations are backed by pages actually fetched (URL list at bottom).
**Unique pages read:** 31

---

## Dimensions

### 1. Point of view / person
- **Second person ("you") addressed to the reader**, throughout how-to and concept pages.
  - "This page introduces the core concepts **you** need to use Databricks SQL effectively." — https://docs.databricks.com/aws/en/sql/get-started/concepts
  - "**You** can use dashboards to build data visualizations and share reports with **your** team." — https://docs.databricks.com/aws/en/dashboards/
- **Third person for Databricks-the-company**, especially recommendations: "**Databricks recommends** using serverless SQL warehouses when available." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
- First-person plural is essentially absent. No "we."

### 2. Tense
- **Present tense** dominates for descriptions and system behavior.
  - "Databricks SQL **is** a cloud data warehouse built on lakehouse architecture. It **runs** directly on your data lake…" — https://docs.databricks.com/aws/en/sql/
  - "Model Serving **provides** a unified interface to deploy, govern, and query AI models…" — https://docs.databricks.com/aws/en/machine-learning/model-serving/
- Future tense only for scheduled/roadmap behavior: "Starting in late May 2026, the new SQL editor **will be** enabled by default for all workspaces." — https://docs.databricks.com/aws/en/sql/user/sql-editor/

### 3. Mood (imperative for procedures)
- **Procedures are imperative, verb-first.**
  - "**Click** SQL Warehouses in the sidebar. **Click** Create SQL warehouse. **Enter** a Name for the warehouse." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
  - "**Select** Playground from the left navigation pane under AI/ML." — https://docs.databricks.com/aws/en/large-language-models/ai-playground
- Concept pages are declarative, not imperative.

### 4. Voice (active vs passive)
- **Active voice is the default** in concept/how-to prose: "Model Serving **automatically scales up or down** to meet demand changes." — https://docs.databricks.com/aws/en/machine-learning/model-serving/
- **Passive voice appears in reference/algorithmic descriptions** where the actor is the system: "Relevance scores **are calculated** using Okapi BM25." / "Scores **are normalized** so that the highest possible score is 1." — https://docs.databricks.com/aws/en/generative-ai/vector-search
- Reference function pages use impersonal declarative: "**Returns** the sum calculated from the values of a group." — https://docs.databricks.com/aws/en/sql/language-manual/functions/sum

### 5. Sentence density
- Short, single-idea sentences; concept pages lean heavily on **definition tables** (Interface | Description) rather than prose. — https://docs.databricks.com/aws/en/sql/get-started/concepts
- Landing pages are card lists of link + one-sentence gloss: "**SQL editor** — Write and run SQL queries with integrated AI assistance, code comments, and version history." — https://docs.databricks.com/aws/en/sql/

### 6. Heading / title capitalization — **sentence case**
- **Page titles are sentence case**, proper nouns preserved:
  - "Create a SQL warehouse" — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
  - "Enrich data using AI Functions" — https://docs.databricks.com/aws/en/large-language-models/ai-functions
  - "Deploy models using Model Serving" — https://docs.databricks.com/aws/en/machine-learning/model-serving/
- **Section headings are sentence case**: "Configure SQL warehouse settings", "Monitor and govern ML systems", "Requirements", "Additional resources".
- **Question-form headings** are common on concept pages: "What is Model Serving?", "What are Databricks Foundation Model APIs?", "How does AI Search work?" — model-serving / foundation-model-apis / vector-search
- Proper-noun product names keep their internal capitalization inside sentence-case headings (e.g., "Databricks SQL", "Foundation Model APIs", "AI Search").

### 7. Procedure / step style
- Numbered ordered lists, imperative, with **UI targets in bold**. Nested optional steps prefixed "(Optional)".
  - "4. (Optional) Configure warehouse settings. See Configure SQL warehouse settings." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
- Longer tutorials use **"Step N. <verb phrase>"** headings: "Step 1. Clone the agent app template", "Step 8. Deploy the agent to Databricks Apps." — https://docs.databricks.com/aws/en/generative-ai/agent-framework/author-agent

### 8. How-to vs concept vs reference tone differences
- **How-to:** imperative, task-scoped, screenshot/UI-oriented ("Click Stop in the upper-right corner."). — https://docs.databricks.com/aws/en/machine-learning/model-serving/manage-serving-endpoints
- **Concept:** declarative present tense, tables, question headings, some persuasive "Why use…" framing.
- **Reference (SQL function / data types / API):** terse, telegraphic, starts with an **"Applies to:" banner** and a one-line definition; uses formal type notation.
  - "**Applies to:** Databricks SQL Databricks Runtime" + "Returns the sum calculated from the values of a group." — https://docs.databricks.com/aws/en/sql/language-manual/functions/sum
  - "BIGINT — Represents 8-byte signed integer numbers." — https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-datatypes

### 9. Admonition labels + tone
- Labels observed (rendered lowercase for the standard set): **note**, **important**, **warning**, **tip**. Status labels are capitalized: **Beta**, **Preview** / **Public Preview**.
  - note: "Query results are shared with all collaborators and are limited to 64,000 rows." — https://docs.databricks.com/aws/en/sql/user/sql-editor/
  - important: "If the old cluster cannot be terminated within 4 hours due to long-running queries, Databricks forcefully terminates the cluster to complete the recycling process." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
  - warning: "In Databricks Runtime, if spark.sql.ansi.enabled is `false`, an overflow of `BIGINT` does not cause an error but "wraps" the result instead." — https://docs.databricks.com/aws/en/sql/language-manual/functions/sum
  - tip: "If your agent uses only Databricks-hosted tools and does not need custom logic between tool calls, you can use the Supervisor API (Beta)…" — https://docs.databricks.com/aws/en/generative-ai/agent-framework/author-agent
- Admonition tone is calm, factual, no exclamation points.

### 10. Beta / Preview labeling language
- Consistent patterns: **"This feature is in Public Preview."** / **"<Feature> is in Beta."** / inline **"(Beta)"** or **"(Preview)"** appended to feature names.
  - "This feature is in Public Preview and is not available for serving endpoints that serve External models." — https://docs.databricks.com/aws/en/machine-learning/model-serving/manage-serving-endpoints
  - "Warehouse-level statement timeouts are in Beta. A workspace admin must enable the Warehouse Statement Timeout preview from the Previews page." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create
  - Inline: "Agent Services (Beta)", "ai_prep_search(Beta)", "ai_top_drivers(Beta)" — build-genai-apps / ai-functions
  - "AI Runtime (Preview)" + "This feature is in Public Preview." — https://docs.databricks.com/aws/en/machine-learning/train-model/

### 11. Contractions
- **Contractions are used** freely in conversational how-to/get-started prose.
  - "If **you're** new to Databricks SQL, start with the concepts…" — https://docs.databricks.com/aws/en/sql/
  - "If **you're** just getting started with Databricks, consider trying MLflow…" — https://docs.databricks.com/aws/en/mlflow/
  - "…even if they **don't** have access to the workspace." — https://docs.databricks.com/aws/en/dashboards/
- Formal reference pages prefer full forms ("does not", "cannot").

### 12. Oxford comma
- **Oxford comma is used consistently.**
  - "…including queries, SQL warehouses, dashboards, and data management." — https://docs.databricks.com/aws/en/sql/
  - "…track experiments, compare model performance, and manage the complete model development lifecycle." — https://docs.databricks.com/aws/en/machine-learning/

### 13. Numerals
- **Numerals for all quantities/measurements**, including small numbers: "64,000 rows", "10 concurrent queries", "45 minutes", "4 hours", "2 and 6 seconds", "over 25K queries per second", "less than 50 ms", "10-20x faster". — sql-editor / create / warehouse-types / model-serving / vector-search
- **Legal/data-retention text spells out then repeats numeral in parens**: "up to thirty (30) days", "fourteen (14) days". — https://docs.databricks.com/aws/en/machine-learning/model-serving/
- Units: space usage varies ("50 ms", "250msec", "100KB", "10MB", "48px" n/a) — minor inconsistency around ms/KB spacing.

### 14. UI / menu path formatting
- **UI element names in bold**; menu drilling uses **">"**.
  - "click **+ New** > **App**." / "Click **Agents** > **Agent - OpenAI Agents SDK**." — agent-framework-notebook
  - "Click **File** > **Copy legacy query ID**." — https://docs.databricks.com/aws/en/sql/user/sql-editor/
- Sidebar/nav targets named directly: "Click **SQL Warehouses** in the sidebar."

### 15. Code / SQL / identifier formatting
- **Inline code font (backticks) for identifiers, functions, params, tokens, env vars**: `ai_query`, `expr`, `BIGINT`, `databricks-`, `ResponsesAgent`, `failOnError`, `databricks.yml`. — ai-query / functions/sum / author-agent
- **SQL keywords uppercased** in examples: `SELECT`, `FROM`, `VALUES`, `FILTER`, `DISTINCT`. — functions/sum
- **Code blocks are language-labeled** (SQL, Python, Bash, YAML, Scala, JSON). — multiple pages
- Data-type / API references use uppercase type tokens and formal notation: `DECIMAL(p,s)`, `ARRAY < elementType >`, `STRUCT`. — sql-ref-datatypes

### 16. Link phrasing
- **"See <descriptive target>."** is the dominant cross-reference form (extremely frequent).
  - "See Connect to a SQL warehouse." — sql/
  - "See Manage Databricks previews." — create
  - "For details, see Warehouse-level timeout." — create
- Inline links are descriptive noun phrases (the feature/page name), not "click here" or bare URLs.

### 17. Terminology — exact casing (as observed)
- **Databricks SQL** (both caps); **SQL warehouse** (lowercase "warehouse"); **SQL editor** (lowercase "editor"); **SQL Warehouses** capitalized only as the literal sidebar label.
- **MLflow** (capital M, L; lowercase "flow"); **MLflow Tracing**, **MLflow Model Registry**.
- **Model Serving** (both caps).
- **Foundation Model APIs** / **Foundation Models** (title case).
- **Unity Catalog**; **Models in Unity Catalog**.
- **AI Functions** (caps); function names lowercase code font (`ai_query`, `ai_summarize`).
- **AI Search** — note active rebrand: "Databricks AI Search (formerly Databricks Vector Search)". "Vector search" lowercase used generically for the technique. — https://docs.databricks.com/aws/en/generative-ai/vector-search
- **AI/BI** (dashboards), **AI Playground**, **AI Gateway** / **Unity AI Gateway**, **AI Runtime**.
- **Genie**, **Genie One**, **Genie Agents**, **Genie Code** (title case sub-brands). — https://docs.databricks.com/aws/en/genie/
- **Agent Evaluation**, **MLflow Tracing**, **Model Context Protocol (MCP)**, **Databricks Apps**, **Feature Store** / **Databricks Feature Store**.
- **"Mosaic AI" branding is largely absent** in current pages; the umbrella is now "Build AI agents on Databricks" / "generative AI" rather than "Mosaic AI." — https://docs.databricks.com/aws/en/generative-ai/guide/introduction-generative-ai-apps
- **Inconsistency:** "gen AI" vs "generative AI" vs "GenAI" all appear. E.g. "Serve and query **gen AI** large language models", "**generative AI** and AI agents", "MLflow Tracing - **GenAI** observability". — build-genai-apps / machine-learning / mlflow3 tracing

### 18. Overall tone; marketing creep; emoji/exclamation
- Baseline tone is **factual, instructional, restrained**. **No emoji. No exclamation points** observed. Table checkmarks use "✓". — warehouse-types
- **Marketing creep is real and concentrated on newer AI product pages**, using superlatives and social proof:
  - "MLflow is **the largest open source AI engineering platform**… With **over 30 million monthly downloads, thousands of organizations rely on MLflow each day to ship AI to production with confidence**." — https://docs.databricks.com/aws/en/mlflow/
  - "AI Functions are **simple to use, fast, and scalable**." + heavy repetition of **"state-of-the-art research techniques"** (used ~10×). — https://docs.databricks.com/aws/en/large-language-models/ai-functions
  - "Model Serving is designed for high-availability, low-latency production use and can support **over 25K queries per second** with an overhead latency of **less than 50 ms**." — https://docs.databricks.com/aws/en/machine-learning/model-serving/
- **Core SQL and reference pages are noticeably drier** and free of superlatives (e.g., the `sum` function page and data-types page are pure spec prose). The AI-vs-core tone gap is the clearest stylistic split in this area.
- "Databricks recommends…" is the standardized way to give guidance across both old and new pages.

---

## Snippet bank (verbatim, with URL)

1. **Concept intro (product landing):** "Databricks SQL is a cloud data warehouse built on lakehouse architecture. It runs directly on your data lake, supports ANSI SQL with Delta Lake extensions, and provides the tools to build highly performant, cost-effective data warehouses without moving your data." — https://docs.databricks.com/aws/en/sql/

2. **Procedure step (how-to):** "1. Click SQL Warehouses in the sidebar. 2. Click Create SQL warehouse. 3. Enter a Name for the warehouse." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create

3. **Reference definition (SQL function):** "Applies to: Databricks SQL Databricks Runtime — Returns the sum calculated from the values of a group." — https://docs.databricks.com/aws/en/sql/language-manual/functions/sum

4. **warning admonition:** "In Databricks Runtime, if spark.sql.ansi.enabled is `false`, an overflow of `BIGINT` does not cause an error but "wraps" the result instead." — https://docs.databricks.com/aws/en/sql/language-manual/functions/sum

5. **note admonition:** "Query results are shared with all collaborators and are limited to 64,000 rows." — https://docs.databricks.com/aws/en/sql/user/sql-editor/

6. **Beta labeling:** "Warehouse-level statement timeouts are in Beta. A workspace admin must enable the Warehouse Statement Timeout preview from the Previews page. See Manage Databricks previews." — https://docs.databricks.com/aws/en/compute/sql-warehouse/create

7. **Marketing-tinged AI concept intro:** "MLflow is the largest open source AI engineering platform for agents, LLMs, and ML models… With over 30 million monthly downloads, thousands of organizations rely on MLflow each day to ship AI to production with confidence." — https://docs.databricks.com/aws/en/mlflow/

8. **Rebrand / terminology sentence:** "Databricks AI Search (formerly Databricks Vector Search) is a search solution that is built into the Databricks Data Intelligence Platform and integrated with its governance and productivity tools." — https://docs.databricks.com/aws/en/generative-ai/vector-search

9. **Question-form concept heading + answer:** "What are Databricks Foundation Model APIs? — Model Serving now supports Foundation Model APIs which allow you to access and query state-of-the-art open models from a serving endpoint." — https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/

10. **Tutorial step heading (imperative, "Step N."):** "Step 8. Deploy the agent to Databricks Apps — After configuring authentication, deploy your agent to Databricks." — https://docs.databricks.com/aws/en/generative-ai/agent-framework/author-agent

---

## Full URL list (31 unique pages fetched)

1. https://docs.databricks.com/aws/en/sql/
2. https://docs.databricks.com/aws/en/machine-learning/
3. https://docs.databricks.com/aws/en/sql/get-started/concepts
4. https://docs.databricks.com/aws/en/sql/user/sql-editor/
5. https://docs.databricks.com/aws/en/compute/sql-warehouse/create
6. https://docs.databricks.com/aws/en/generative-ai/agent-framework/build-genai-apps
7. https://docs.databricks.com/aws/en/sql/language-manual/functions/sum
8. https://docs.databricks.com/aws/en/large-language-models/ai-functions
9. https://docs.databricks.com/aws/en/generative-ai/vector-search
10. https://docs.databricks.com/aws/en/machine-learning/model-serving/
11. https://docs.databricks.com/aws/en/mlflow/
12. https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/
13. https://docs.databricks.com/aws/en/generative-ai/tutorials/agent-framework-notebook
14. https://docs.databricks.com/aws/en/sql/user/queries/
15. https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-datatypes
16. https://docs.databricks.com/aws/en/sql/user/alerts/
17. https://docs.databricks.com/aws/en/large-language-models/ai-query/index
18. https://docs.databricks.com/aws/en/generative-ai/agent-framework/author-agent
19. https://docs.databricks.com/aws/en/dashboards/
20. https://docs.databricks.com/aws/en/generative-ai/external-models/
21. https://docs.databricks.com/aws/en/mlflow3/genai/tracing/
22. https://docs.databricks.com/aws/en/machine-learning/model-serving/manage-serving-endpoints
23. https://docs.databricks.com/aws/en/large-language-models/ai-playground
24. https://docs.databricks.com/aws/en/sql/get-started/
25. https://docs.databricks.com/aws/en/generative-ai/agent-evaluation/
26. https://docs.databricks.com/aws/en/machine-learning/train-model/
27. https://docs.databricks.com/aws/en/compute/sql-warehouse/warehouse-types
28. https://docs.databricks.com/aws/en/genie/
29. https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/
30. https://docs.databricks.com/aws/en/machine-learning/feature-store/
31. https://docs.databricks.com/aws/en/generative-ai/guide/introduction-generative-ai-apps

(One additional attempt — https://docs.databricks.com/aws/en/sql/user/queries/query-profile — timed out and is excluded from the count.)

---

## 5-sentence synthesis

Databricks SQL and AI/ML docs speak directly to the reader in **second person ("you")** and refer to the company in third person ("Databricks recommends…"), using **present tense**, **active voice**, and short single-idea sentences, with **imperative verb-first steps** for procedures and declarative prose plus definition tables for concepts. **Titles and section headings are sentence case** (proper product nouns preserved), concept pages frequently use **question-form headings** ("What is Model Serving?"), and reference pages are terse and spec-like, opening with an "Applies to:" banner and a one-line definition. Mechanics are consistent: **Oxford comma**, **numerals for all quantities** (with legal text spelling out then parenthesizing, e.g., "thirty (30) days"), **contractions in casual how-to prose but full forms in reference**, **bold UI labels with ">" menu paths**, **backticked identifiers with uppercased SQL keywords**, and **"See <page>." cross-references**; admonitions are calm and lowercase (note/important/warning/tip) with capitalized status flags (Beta, Public Preview) attached inline or as "This feature is in Public Preview." Terminology is stable — Databricks SQL, SQL warehouse, MLflow, Model Serving, Foundation Model APIs, Unity Catalog, AI Functions — with two live shifts: **Vector Search is being rebranded to "AI Search,"** and **"gen AI"/"generative AI"/"GenAI" are used inconsistently** while the old "Mosaic AI" umbrella has largely disappeared. The biggest tonal split is that **newer AI product pages carry marketing creep** (superlatives, social-proof metrics, repeated "state-of-the-art research techniques") whereas **core SQL and reference pages stay dry and factual**; no emoji or exclamation points appear anywhere.
