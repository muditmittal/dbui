# Agent-First Design Standards for DBUI — Research Initiative

**Goal:** define a durable set of **standards (must-follow)** and **guidelines (may-follow)** for the Databricks design system that can be handed to any LLM — alongside our Figma + React component specs — so it produces output that adheres to Databricks brand principles. A second goal is a **design linter** anyone at the company can run to critique design output (looks, behavior, voice) against those standards, whether or not they use DBUI.

**Why this exists / durability principle.** The specific repos we study will come and go (in April 2026 we studied one popular corpus; by July the center of gravity moved to another). Our *process* and *provenance* must outlast any single repo, so anyone can audit how we reached our conclusions and rebuild confidence in the output. Every source we read is recorded with its repo URL, commit SHA, fetch date, and an authenticity tier — see [`01-source-catalog.md`](01-source-catalog.md).

---

## The 10-step plan

| # | Step | Status | Deliverable |
|---|------|--------|-------------|
| 1 | Fetch new source (`voltagent/awesome-design-md`) | ✅ | catalog |
| 2 | Re-fetch original source (`nexu-io/open-design`) | ✅ | catalog |
| 3 | Catalog all sources (provenance-tracked) | ✅ | [`01-source-catalog.md`](01-source-catalog.md) |
| 4 | Select 20 systems closest to Databricks | ✅ | [`02-cohort-selection.md`](02-cohort-selection.md) |
| 5 | Compare what all 20 define across the 9 sections | ✅ | [`03-section-comparison.md`](03-section-comparison.md) |
| — | **DBUI section framework** (supersedes the inherited 9) | ✅ | [`04-section-framework.md`](04-section-framework.md) |
| — | **Content: Voice & Tone** (content-led section) | ✅ baseline drafted | [`content-voice-tone.md`](content-voice-tone.md) |
| 6–8 | **Best practices → DBUI standards & guidelines**, per section | 🔵 in progress — §3 Color worked as format proof | [`05-standards-color-theme.md`](05-standards-color-theme.md) |
| 9 | Decide how to document so any LLM finds them | ⏳ | — |
| 10 | Build design linters usable without DBUI | ⏳ | — |

**This set covers steps 1–5** (the evidence base) **plus the authoring framework** (doc 04) and the **first worked standards section** (doc 05) that the rest of steps 6–8 follow.

### Guiding principles (set with the team)
- **Best-in-class:** define the clearest, most comprehensive principles/standards/guidelines/examples for a data & AI platform — for agents *and* humans. The 20-system study is the **baseline**; we then decide DBUI's answer.
- **Study → decide:** keep what DBUI already does well; adopt a better pattern where the field has one. Document what's excellent, not just what exists.
- **Dual-mode:** light and dark are equal first-class modes.
- **Two readers:** every standard must be useful to a **human** (rationale) and an **agent/linter** (checkable rule).

---

## What a "DESIGN.md" actually is (and isn't)

[`DESIGN.md`](https://stitch.withgoogle.com/docs/design-md/overview/) is a convention (originating with Google Stitch) for a **plain-text design contract an AI agent reads to generate consistent UI**. It complements `AGENTS.md` (how to build the project) with *how it should look and feel*. Markdown is the format LLMs parse most reliably — no Figma export or JSON tooling required.

**Critical caveat for confidence:** almost none of the corpus files are *official, brand-published* design systems. They are **third-party analyses / reconstructions** of how a brand's rendered website looks. We tier every file by authenticity (below) and treat the cohort as *"how the agent-design community documents brands for LLMs"* — which is exactly the format we must produce — **not** as ground truth about how Linear or Vercel document internally.

### Authenticity tiers

| Tier | Meaning | Confidence |
|------|---------|-----------|
| `site-analysis` | Analyzed from a brand's real rendered site (voltagent/getdesign.md); carries structured YAML token front matter | **Highest available** — reproducible, token-rich |
| `inspired-by` | "Design System Inspired by X" reconstruction (nexu-io) | Medium — prose-only, interpretive |
| `stub` | Generated 8-section filler with placeholder tokens | Discard — not real analysis |
| `official` | Published by the brand itself | Not present in either corpus |

---

## Canonical 9-section frame

The two corpora use slightly different section shapes. voltagent's `site-analysis` files use **8 core sections** (present in 20/20 of our cohort) plus 3 optional meta-sections; the classic Open Design shape used a different 9. We reconcile both into **one canonical 9-section frame** used throughout this study:

| # | Canonical section | Maps from | In cohort |
|---|-------------------|-----------|-----------|
| 1 | **Overview / Visual Theme** | Overview, Visual Theme & Atmosphere | 20/20 |
| 2 | **Color** | Colors, Color Palette & Roles | 20/20 |
| 3 | **Typography** | Typography | 20/20 |
| 4 | **Layout & Spacing** | Layout, Spacing, Grid | 20/20 |
| 5 | **Depth & Elevation** | Elevation & Depth, Shadows | 20/20 |
| 6 | **Shape & Radius** | Shapes, Radius, Corners | 20/20 |
| 7 | **Components** | Components, Component Stylings | 20/20 |
| 8 | **Do's & Don'ts** | Do's and Don'ts, Anti-patterns | 20/20 |
| 9 | **Agent Guidance** | Responsive Behavior + Iteration Guide + Known Gaps | 16/20 |

> **This 9-section frame is the *analysis scaffold* for the corpus study (steps 3–5) only.** It is the industry-inherited shape, not a law. The **DBUI authoring framework we'll actually write standards against is different** — an 11-section, dual-mode structure that adds Content Voice & Tone, Iconography, Data Visualization, and Accessibility. See **[`04-section-framework.md`](04-section-framework.md)**.

---

## Reproduce

```bash
# 1. Clone / refresh both corpora (siblings of this repo's parent)
git clone https://github.com/voltagent/awesome-design-md.git ~/awesome-design-md
git clone https://github.com/nexu-io/open-design.git ~/open-design

# 2. Build the provenance-tracked catalog
node scripts/agent-ds-catalog.mjs      # -> data/catalog.{json,tsv}

# 3. Score + select the closest-20 cohort
node scripts/agent-ds-select.mjs       # -> data/cohort-scores.{json,tsv}

# 4. Extract tokens + 9-section bodies for the cohort
node scripts/agent-ds-sections.mjs     # -> data/sections/*.json, data/section-signals.tsv
```

## Files

| Path | What |
|------|------|
| `scripts/agent-ds-catalog.mjs` | Walks both repos → provenance catalog with authenticity tiers |
| `scripts/agent-ds-select.mjs` | Scores candidates on Databricks-fit axes → 20-system cohort |
| `scripts/agent-ds-sections.mjs` | Parses YAML token front matter + splits the 9 sections |
| `data/catalog.{json,tsv}` | Every system across both sources, deduped + tiered |
| `data/fit-attributes.json` | Curated Databricks-fit scores (auditable inputs to selection) |
| `data/cohort-scores.{json,tsv}` | Full scoring table + chosen 20 |
| `data/section-signals.tsv` | One row per cohort system: tokens + per-section signals |
| `data/sections/<key>.json` | Full structured extract per system (tokens + 9 section bodies) |

**Provenance of this run:** voltagent `664b3e78` (2026-06-16) · open-design `034c3895` (2026-07-22) · generated 2026-07-22.
