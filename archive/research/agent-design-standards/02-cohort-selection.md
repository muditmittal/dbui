# 02 · Cohort Selection — The 20 Closest to Databricks (Step 4)

From the 40 `site-analysis` candidates in the five target categories, we select **20 systems** that best match Databricks' profile. Selection is **scored and reproducible**, not vibes — so anyone can audit or re-tune it.

**Script:** `scripts/agent-ds-select.mjs` · **Inputs:** `data/fit-attributes.json` (curated) + `data/catalog.json` (metrics) · **Output:** `data/cohort-scores.{json,tsv}`

---

## Databricks profile we're matching

> Enterprise B2B **data & AI platform** · **dual-mode (light + dark)** product UI · **information-dense** surfaces (tables, catalogs, notebooks, dashboards) · **technical audience** (data engineers, scientists, analysts, developers) · a single restrained brand accent (**DuBois/Databricks blue `#2272B4`**) on a neutral canvas · a **product-app** surface, not a marketing splash.

> **Mode-neutrality note (added 2026-07-23):** Databricks supports light and dark equally. An earlier version weighted a "light-first" axis; we now treat mode as **neutral**. The axis below is retained in the scoring artifact for reproducibility but **reinterpreted as "neutral/dual-mode product surface"** (rewards restrained, mode-flexible surfaces — light *or* disciplined dark). The delivered cohort deliberately spans both modes (5 dark exemplars: Linear, ClickHouse, HashiCorp, Sentry, Warp). Re-running fully mode-neutral is a documented option (see end).

## Scoring model

Six axes. Five are hand-scored 0–3 in `fit-attributes.json` (auditable); the sixth is computed from catalog metrics.

| Axis | Weight | 0 → 3 meaning |
|------|:------:|---------------|
| **Domain** | ×3 | consumer/creative → data/AI/dev-infra |
| **Audience** | ×2 | consumer → enterprise-technical |
| **Neutral/dual-mode surface** | ×2 | cinematic/consumer-dark → restrained, mode-flexible product surface |
| **Density** | ×2 | sparse hero → data-dense app surface |
| **Accent discipline** | ×1 | gradient-heavy → single restrained accent |
| **File quality** | ×1 | (computed: front matter + length + rule discipline + tables) |

**Max score = 33.** Domain is weighted highest (data/AI is Databricks' sharpest differentiator); density and surface-fit follow. Mode is treated neutrally (see note above).

## Selection rule (keeps the mix you asked for)

Pure top-20-by-score skews **data/DevOps-heavy** and drops recognized exemplars (Linear, Notion). To preserve a deliberate **mix of AI · dev-tools · productivity · modern-aesthetic**, we apply **per-category quotas**, then fill remaining slots by global score:

`AI 4 · Dev Tools 4 · Backend/Data 4 · Productivity 4 · Design/Creative 3` → 19, + 1 wildcard by score (PostHog) = **20**. Backend/Data carries the wildcard because Databricks is itself a data platform.

---

## The chosen 20

| Category | Systems | Why they fit Databricks |
|----------|---------|--------------------------|
| **AI & LLM** (4) | Replicate, Cohere, Together AI, Claude | ML/AI platforms with disciplined single accents; Cohere is an enterprise dashboard aesthetic |
| **Developer Tools** (4) | Vercel, Cursor, Warp, Expo | technical audience, precise systems; Vercel is the canonical restrained light system |
| **Backend/Data/DevOps** (5) | ClickHouse, HashiCorp, Sentry, MongoDB, PostHog | closest domain analogs — analytics DBs, dense dashboards, enterprise infra |
| **Productivity & SaaS** (4) | Linear, Notion, Mintlify, Cal.com | the recognized agent-DS exemplars (Linear, Notion) + clean light SaaS |
| **Design & Creative** (3) | Figma, Airtable, Webflow | modern aesthetic quality; Airtable is a light, structured-data (tabular) app |

---

## Full scoring table (all 40 candidates)

★ = selected. `D` domain ·`A` audience ·`L` light ·`Dn` density ·`Ac` accent ·`Q` quality.

| # | ★ | System | Total | Breakdown | Category |
|--:|:-:|--------|------:|-----------|----------|
| 1 | ★ | Vercel | 30.89 | D3 A3 L3 Dn2 Ac3 Q2.9 | Dev Tools |
| 2 | ★ | Replicate | 29.34 | D3 A3 L3 Dn2 Ac2 Q2.3 | AI & LLM |
| 3 | ★ | ClickHouse | 29.00 | D3 A3 L2 Dn3 Ac2 Q2.0 | Backend/Data |
| 4 | ★ | HashiCorp | 28.03 | D3 A3 L2 Dn2 Ac3 Q2.0 | Backend/Data |
| 5 | ★ | Cohere | 27.79 | D3 A3 L2 Dn3 Ac1 Q1.8 | AI & LLM |
| 6 | ★ | Together AI | 27.69 | D3 A3 L2 Dn2 Ac2 Q2.7 | AI & LLM |
| 7 | ★ | Sentry | 27.67 | D3 A3 L1 Dn3 Ac2 Q2.7 | Backend/Data |
| 8 | ★ | Airtable | 27.39 | D2 A3 L3 Dn3 Ac1 Q2.4 | Design/Creative |
| 9 | ★ | MongoDB | 27.14 | D3 A3 L2 Dn2 Ac2 Q2.1 | Backend/Data |
| 10 | ★ | Claude | 26.56 | D3 A2 L3 Dn1 Ac3 Q2.6 | AI & LLM |
| 11 | ★ | PostHog | 26.46 | D3 A3 L1 Dn3 Ac1 Q2.5 | Backend/Data (wildcard) |
| 12 | | Supabase | 25.31 | D3 A3 L1 Dn2 Ac2 Q2.3 | Backend/Data |
| 13 | | Mistral AI | 25.27 | D3 A3 L2 Dn1 Ac2 Q2.3 | AI & LLM |
| 14 | ★ | Figma | 25.19 | D2 A3 L3 Dn2 Ac1 Q2.2 | Design/Creative |
| 15 | ★ | Warp | 24.95 | D3 A3 L1 Dn2 Ac2 Q2.0 | Dev Tools |
| 16 | ★ | Mintlify | 24.50 | D2 A3 L3 Dn1 Ac2 Q2.5 | Productivity |
| 17 | ★ | Cal.com | 24.44 | D2 A3 L3 Dn1 Ac2 Q2.4 | Productivity |
| 18 | ★ | Expo | 24.36 | D3 A3 L1 Dn2 Ac1 Q2.4 | Dev Tools |
| 19 | ★ | Cursor | 24.33 | D3 A3 L1 Dn2 Ac1 Q2.3 | Dev Tools |
| 20 | | Composio | 24.00 | D3 A3 L1 Dn2 Ac1 Q2.0 | Backend/Data |
| 21 | | OpenCode AI | 23.89 | D3 A3 L1 Dn2 Ac1 Q1.9 | AI & LLM |
| 22 | | Ollama | 23.14 | D3 A3 L1 Dn1 Ac2 Q2.1 | AI & LLM |
| 23 | ★ | Linear | 23.10 | D2 A3 L1 Dn2 Ac3 Q2.1 | Productivity |
| 24 | | Raycast | 21.62 | D2 A3 L1 Dn2 Ac1 Q2.6 | Dev Tools |
| 25 | ★ | Notion | 21.17 | D1 A2 L3 Dn2 Ac2 Q2.2 | Productivity |
| 26 | | xAI | 20.89 | D3 A2 L1 Dn1 Ac2 Q1.9 | AI & LLM |
| 27 | ★ | Webflow | 20.50 | D2 A2 L2 Dn1 Ac2 Q2.5 | Design/Creative |
| 28 | | Resend | 20.47 | D2 A3 L1 Dn1 Ac2 Q2.5 | Productivity |
| 29 | | Framer | 20.17 | D2 A2 L2 Dn1 Ac2 Q2.2 | Design/Creative |
| 30 | | Sanity | 19.15 | D2 A2 L1 Dn2 Ac2 Q1.2 | Backend/Data |
| 31 | | VoltAgent | 18.92 | D3 A2 L0 Dn1 Ac2 Q1.9 | AI & LLM |
| 32 | | Zapier | 18.90 | D2 A2 L2 Dn1 Ac1 Q1.9 | Productivity |
| 33 | | Minimax | 18.34 | D3 A2 L0 Dn1 Ac1 Q2.3 | AI & LLM |
| 34 | | Miro | 18.31 | D1 A2 L2 Dn2 Ac1 Q2.3 | Design/Creative |
| 35 | | Lovable | 17.84 | D2 A2 L2 Dn1 Ac1 Q0.8 | Dev Tools |
| 36 | | Intercom | 17.21 | D1 A2 L2 Dn1 Ac2 Q2.2 | Productivity |
| 37 | | ElevenLabs | 15.52 | D2 A2 L0 Dn1 Ac1 Q2.5 | AI & LLM |
| 38 | | Clay | 15.12 | D1 A1 L2 Dn1 Ac2 Q2.1 | Design/Creative |
| 39 | | Runway | 14.82 | D2 A1 L1 Dn1 Ac2 Q0.8 | AI & LLM |
| 40 | | Superhuman | 12.30 | D1 A2 L0 Dn1 Ac1 Q2.3 | Dev Tools |

---

## Notable calls & how to re-tune

- **Quotas over pure score** promoted **Linear (#23)** and **Notion (#25)** into the cohort over **Supabase (#12)** and **Mistral (#13)**. Rationale: Linear and Notion are the two most-referenced agent-DS exemplars and supply the "productivity + modern aesthetic" representation requested; a 6th backend system would have crowded out the mix. This is a deliberate, documented trade-off.
- **Sentry** scores high on density despite being dark/dual — kept as a data-dense dashboard analog (a rare case where dark is instructive for a data product).
- **To re-tune:** edit `data/fit-attributes.json` (axis scores) or the `QUOTA` map in `agent-ds-select.mjs` and re-run. E.g., to prioritize pure domain fit over aesthetic mix, drop quotas and take top-20 — that swaps in Supabase, Mistral, Composio, Ollama for Linear, Notion, Webflow, and one dev tool.

→ Continue to [`03-section-comparison.md`](03-section-comparison.md).
