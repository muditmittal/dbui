# DESIGN.md for AI agents — corpus study & Databricks implications

**Prepared for:** Databricks design / platform leadership  
**Date:** July 22, 2026 (revived from May 13, 2026 study)  
**Corpus:** 151 design-system packages from [Open Design](https://github.com/nexu-io/open-design)  
**Databricks lens:** DBUI — enterprise data & AI product UI

---

## Executive summary

Teams are converging on a single idea: **give coding agents a plain-text design contract** (`DESIGN.md`) instead of hoping they infer taste from Figma exports or generic Tailwind defaults.

We analyzed **every bundled package** in the largest public corpus (151 systems spanning Vercel, Linear, Stripe, Notion, Supabase, Figma, and dozens more). For Databricks, the relevant comparison set is **52 dev-friendly / enterprise-adjacent systems** — not consumer brands like Starbucks or Ferrari.

**Three findings that matter for DBUI:**

1. **Structure beats vibes for agent output.** Dev-friendly `DESIGN.md` files are more table-heavy, more prescriptive, and **83% include an "Agent Prompt Guide"** (vs 39% of consumer systems). That section — hex quick-reference, copy-paste prompts, numbered non-negotiables — is the highest-leverage addition DBUI does not yet ship as one file.

2. **The ecosystem moved fast since May.** Open Design grew **149 → 151 packages** and migrated to a **2.0 package shape**: `manifest.json` + `DESIGN.md` + `tokens.css` + `components.html` + previews on every system. Google **open-sourced the DESIGN.md spec** (April 2026) with YAML token front matter and a CLI linter. The bar for "agent-ready design system" is now machine-readable tokens *plus* prose, not markdown alone.

3. **DBUI is ahead on product depth, behind on agent packaging.** Compared to the corpus, DBUI already wins on component catalog, icon governance (451 icons), shell compositions, and operational rules in `CLAUDE.md`. The gap is a **single canonical visual brief** (`DBUI_DESIGN.md`) in the shape agents actually read — with Databricks category metadata: *Enterprise B2B · Data & AI Platform · Light-first product UI*.

---

## What we studied

| Input | Scale |
|-------|------|
| `DESIGN.md` prose files | 151 |
| Median length | 184 lines (~200 mean) |
| Dev-friendly reference cohort | 52 systems |
| Packages with `tokens.css` + `manifest.json` | 151 / 151 (100%) |

**Method:** Programmatic inventory (35 fields per package) + qualitative deep-reads of 13 dev-friendly exemplars (Linear, Vercel, Cursor, Notion, Supabase, Resend, ClickHouse, etc.). Reproducible via `node scripts/design-md-corpus-study.mjs`.

---

## Corpus findings (July 2026 refresh)

### Section coverage — all 151 packages

| Section | Coverage | Notes |
|---------|----------|-------|
| Color, typography, components | **100%** | Table stakes |
| Visual theme / layout / depth | **~99%** | Nearly universal |
| Agent Prompt Guide | **54%** overall · **83% dev-friendly** | Key differentiator |
| Do's and Don'ts | 49% overall · **71% dev-friendly** | Prescriptive rules |
| Accessibility | **61%** (↑ from ~3% in May corpus) | Ecosystem backfill |
| Iconography | 6% | Rare everywhere |
| Data visualization | 2% | **Whitespace for Databricks** |

### Dev-friendly vs consumer cohort

| Priority | Dev-friendly (n=52) | Consumer / style (n=99) |
|----------|--------------------:|------------------------:|
| Agent Prompt Guide | **83%** | 39% |
| Do's and Don'ts | **71%** | 37% |
| Responsive rules | **83%** | 40% |
| Motion / animation | 48% | **85%** |
| Voice / tone narrative | 85% | 88% |

**Interpretation:** For enterprise product UI, agents need **exact tokens, layout rules, and runnable prompts** — not brand poetry or motion essays. Databricks should optimize for the left column.

### Proposed Databricks category (from prior analysis)

When we publish DBUI's agent-facing design file, tag it explicitly:

> **Category:** Enterprise B2B · Data & AI Platform · Light-first product UI

This slots DBUI alongside ClickHouse, Supabase, Sentry, HashiCorp — not Airbnb or Spotify.

---

## What changed in the ecosystem (May → July 2026)

| Development | Source | Implication for DBUI |
|-------------|--------|----------------------|
| Google open-sourced **DESIGN.md spec** + CLI linter (`@google/design.md` v0.2+) | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | Consider YAML front matter for tokens + `designmd lint` in CI (warn-only) |
| Open Design **2.0 package contract** | [nexu-io/open-design](https://github.com/nexu-io/open-design) | `DESIGN.md` + `tokens.css` + `manifest.json` is the new baseline; DBUI already has `globals.css` — align naming |
| **getdesign** CLI catalog | [getdesign.md](https://getdesign.md) | 28 npm versions; ~2.5K weekly downloads; still inspiration files, not official brand docs |
| New product systems in corpus | Open Design | **+2** since May: `perplexity`, `tom-modern`; expanded AI & LLM category (now 15) |
| Accessibility sections | Open Design backfill | 61% of packages now mention a11y (was ~3% in our May scan) — DBUI should cite our focus-ring spec explicitly |

---

## DBUI: strengths vs gaps

| Dimension | Corpus typical | DBUI today | Verdict |
|-----------|----------------|------------|---------|
| Component catalog | Prose in §4 | `component-index.md` with when-to-use / avoid-for | **Ahead** |
| Icons | ~6% mention | 451 icons + semantic index | **Far ahead** |
| Shell / page patterns | Rare | Base shell + 5 compositions | **Ahead** |
| Agent Prompt Guide | 83% of dev-friendly peers | Fragmented across `CLAUDE.md`, skills, install | **Gap** |
| Visual theme narrative | §1 cold open in every file | Split across multiple docs | **Gap** |
| Single fetchable URL | Common pattern | `/install` exists; no `/design` yet | **Small gap** |
| Anti-slop / wrong-fit rules | ~half of corpus | Partial in `CLAUDE.md` | **Gap** |

---

## Recommended next steps (unchanged in intent, updated in context)

### 1. Ship `packages/dbui/DBUI_DESIGN.md` (~300–400 lines)

Nine-section shape from the May study, with **§9 Agent Prompt Guide** as the centerpiece:

- Quick color reference (role · Tailwind · CSS var · hex light/dark)
- 5–8 copy-paste example prompts (list page, detail page, destructive dialog, form field, empty state)
- 8 numbered non-negotiables (no raw HTML, no lucide, no `text-sm`, always `<Base>`, etc.)

**Signature move to repeat:** *13px body · DuBois blue · shell-first · sentence case.*

### 2. Split responsibilities cleanly

| File | Job |
|------|-----|
| `DBUI_DESIGN.md` | *What* to make — visual language, tokens, taste |
| `CLAUDE.md` | *How* to make it correctly — rules, Figma MCP, lint |
| `install.md` | Agent bootstrap — preflight, copy, verify |

### 3. Evaluate Google DESIGN.md spec alignment (optional Phase 2)

- Add YAML front matter mirroring `globals.css` semantic tokens
- Run `npx @google/design.md lint` as a **warning-only** check in design lint pipeline
- Do **not** block PRs — surface drift to designers

### 4. Publish for leadership / field

- This brief + `research/design-md-corpus/data/index.md` for tables
- Deep qualitative analysis: `research/2026-05-13-design-md-corpus-study.md` (HTML companion for presentations)

---

## Appendix: reproducibility

```bash
cd db-design-system
node scripts/design-md-corpus-study.mjs
open research/design-md-corpus/data/index.md
```

Corpus clone: `git clone https://github.com/nexu-io/open-design.git ~/open-design`

**Data files:** `research/design-md-corpus/data/inventory.tsv`, `summary.json`
