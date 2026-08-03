# 01 · Source Catalog (Steps 1–3)

A durable, provenance-tracked inventory of every DESIGN.md-style source we study. The point is auditability: repos change, but this catalog records exactly *what* we read, *from where*, at *which commit*, on *what date*, and *how authentic* it is.

**Generated:** 2026-07-22 · **Script:** `scripts/agent-ds-catalog.mjs` · **Data:** `data/catalog.{json,tsv}`

---

## Sources fetched

| Source | Repo | Commit | Committed | Role |
|--------|------|--------|-----------|------|
| **voltagent** (new) | [voltagent/awesome-design-md](https://github.com/voltagent/awesome-design-md) | `664b3e78` | 2026-06-16 | Primary — getdesign.md "site analysis" packs |
| **open-design** (original) | [nexu-io/open-design](https://github.com/nexu-io/open-design) | `034c3895` | 2026-07-22 | Secondary — bundled reconstructions + stubs |

Both are cloned as siblings of the workspace (`~/awesome-design-md`, `~/open-design`). Re-running the catalog script against fresh clones regenerates everything.

---

## What each source is

- **voltagent/awesome-design-md** — a curated collection of `DESIGN.md` files "extracted from real websites" by getdesign.md. **73 systems**, each a folder with `DESIGN.md` + `README.md`. Crucially, **64/74 carry structured YAML front matter** (`colors`, `typography`, `spacing`, `rounded`, `components` as token maps with `{colors.primary}`-style references). This is the higher-quality, machine-readable tier — and the reason we switched primary sources.
- **nexu-io/open-design** — the "Open Design" desktop app's bundled design systems (**~152 systems**). A mix of reprocessed *"Design System Inspired by X"* prose files and **57 generated 8-section stubs** with placeholder tokens. Adds `tokens.css` / `manifest.json` enrichment but the prose is thinner and more interpretive.

### Why we changed primary source (vs. the April study)

The April 2026 study used nexu-io as primary. Comparing the *same* system across both shows voltagent is materially richer and more authentic:

| | voltagent (`site-analysis`) | nexu-io (`inspired-by`) |
|---|---|---|
| Linear file | **548 lines**, YAML token front matter, "design-analysis" | 370 lines, "Inspired by Linear", prose-only |
| Vercel file | **737 lines**, full `colors`/`typography`/`components` maps | shorter, no structured tokens |
| Generated stubs | 0 | 57 (37% of corpus) |
| Machine-readable tokens | 64/74 | 1/152 |

**Takeaway:** the durable lesson isn't "use voltagent" — it's "prefer the tier with reproducible, token-level structure, and record provenance so the choice is auditable."

---

## Catalog summary

**154 unique systems** after union + slug-normalization across both sources (`linear.app` / `linear-app` / `Linear` all collapse to one key).

| Metric | Count |
|--------|------:|
| Unique systems | 154 |
| In **both** sources | 71 |
| voltagent-only | 3 |
| open-design-only | 80 |

### By authenticity tier (best available per system)

| Tier | Systems | Use |
|------|--------:|-----|
| `site-analysis` | 75 | **Study these** — token-rich, from real sites |
| `stub` | 57 | Discard — generated filler |
| `inspired-by` | 12 | Context only — prose reconstructions |
| `other` | 10 | Case-by-case |

### By category (voltagent taxonomy)

| Category | Systems | In target cohort? |
|----------|--------:|-------------------|
| AI & LLM Platforms | 12 | ✅ |
| Backend, Database & DevOps | 8 | ✅ |
| Developer Tools & IDEs | 7 | ✅ |
| Productivity & SaaS | 7 | ✅ |
| Design & Creative Tools | 6 | ✅ |
| Media & Consumer Tech | 12 | — |
| Fintech & Crypto | 7 | — |
| Automotive | 7 | — |
| E-commerce & Retail | 5 | — |
| Uncategorized (mostly nexu stubs/only) | 81 | — |

The **five target categories total 40 site-analysis systems** — the candidate pool for the cohort (step 4). All 40 are in the highest authenticity tier.

---

## Data-quality notes

- **Slug normalization:** trailing `.app/.ai/.com/.io/.dev` and separators are stripped for the join key (so `x.ai` → `x`, `mistral-ai` → `mistral`). Display names preserved.
- **Tier classification is heuristic:** stubs are detected by shared boilerplate (`"Token from style foundations"` + `"Keep outputs recognizable to this style family"`); `site-analysis` by presence of YAML token front matter; `inspired-by` by the `# Design System Inspired by` H1.
- **No official brand docs** exist in either corpus — every file is third-party analysis. Confidence framing in [`README.md`](README.md#authenticity-tiers) applies throughout.
- The `Uncategorized` bucket is large only because the voltagent README taxonomy covers voltagent systems; nexu-only systems (mostly stubs) inherit no category. This does not affect the cohort, which is drawn entirely from categorized `site-analysis` systems.

→ Continue to [`02-cohort-selection.md`](02-cohort-selection.md).
