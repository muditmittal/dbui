# DESIGN.md corpus study (revived)

Research on how peer design systems document visual language for AI coding agents, and what Databricks (DBUI) should adopt.

## Quick start

```bash
# 1. Ensure corpus is present (clone once)
git clone https://github.com/nexu-io/open-design.git ~/open-design
cd ~/open-design && git pull

# 2. Regenerate analysis
node scripts/design-md-corpus-study.mjs
node scripts/design-md-category-audit.mjs
node scripts/generate-category-audit-html.mjs
node scripts/generate-corpus-browser.mjs
```

Outputs land in `research/design-md-corpus/data/`:
- `inventory.tsv` — one row per package (35 columns)
- `summary.json` — aggregate stats + cohort comparison
- `category-audit.json` — three-lens category audit + guideline mining
- `meta-category-matrix.tsv` — metadata category × topic coverage %

## Documents

| File | Audience | Purpose |
|------|----------|---------|
| [`source-index.html`](source-index.html) | Browse yourself | **All 151 systems** grouped by company type — click to open local DESIGN.md files |
| [`patterns.html`](patterns.html) | Browse yourself | **Common patterns** analysis across the full corpus |
| [`preview.html`](preview.html) | Quick summary | One-page executive snapshot (local, no network) |
| [`LEADERSHIP-BRIEF.md`](LEADERSHIP-BRIEF.md) | Exec / design leadership | Polished executive summary |
| [`../2026-05-13-design-md-corpus-study.md`](../2026-05-13-design-md-corpus-study.md) | Deep dive | Original qualitative analysis + DBUI_DESIGN.md skeleton |

## Corpus source

- **Primary:** [nexu-io/open-design](https://github.com/nexu-io/open-design) — 151 bundled packages (as of July 2026)
- **Upstream product systems:** [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) / [getdesign.md](https://getdesign.md)
- **Format spec:** [google-labs-code/design.md](https://github.com/google-labs-code/design.md) (Google Stitch, open-sourced April 2026)

Local path: `~/open-design/design-systems/`

## Databricks reference cohort

For DBUI, compare against **52 dev-friendly** product systems across:

- AI & LLM
- Developer Tools
- Productivity & SaaS
- Backend & Data
- Design & Creative

See `data/summary.json` → `dev_friendly_slugs` for the full list.
