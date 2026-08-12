# Databricks platform baseline

The platform model the crit tier reasons against. Timestamped and versioned, because it goes stale —
product names move, surfaces launch, preview statuses change. A crit that reasons against a platform
that no longer exists is worse than no crit.

**Current: [`baseline-2026-08-11.md`](baseline-2026-08-11.md) · Rev 1**

Each refresh writes a new dated file rather than editing the last one, so a critique can name the
baseline it was made against and a reader can diff two revisions.

---

## Where it comes from

The user's own `db-bricksearch` plugin — a Claude Code and Cursor plugin they authored. It exists in
**three parallel copies**, and they are not identical.

| Copy | Path | Date | Role |
|---|---|---|---|
| **Plugin** | `~/.claude/plugins/cache/experimental-plugin-marketplace/db-bricksearch/1.5.0/` | 2026-04-27 | **Authoritative** reference library. 58 files, 564 KB |
| **Cursor mirror** | `~/.cursor/docs/research/` | 2026-04-16 | Older. Adds `INDEX.md` and 22 earlier outputs. 8.4 MB, but 92% is three raw doc dumps |
| **Live user data** | `~/.claude/bricksearch/` | 2026-08-07 | **Freshest.** Nine research outputs, 284 KB |

v1.5.0 is the newest version that exists, not merely the newest installed.

The substantive Databricks content is:

- **`skills/research/references/intel/`** — 15 tiered intel files across six product areas plus nine
  business functions, and a market landscape directory of 14 files
- **`skills/research/references/knowledge.md`** — 21 KB validated-facts knowledge base, the densest
  single file
- **`~/.claude/bricksearch/output/`** — nine multi-agent research reports through 2026-08-07. Two
  carry most of the design value: `2026-08-06-govhub-personas-roles-permissions.md` (the only real
  persona source) and `2026-08-07-databricks-accessibility-guidelines.md` (Du Bois, WCAG posture)

### There are no mindmaps

Searched by filename across several spellings, by extension for every `.mmd` and `.canvas` on the
machine, and by grepping file contents. Zero hits in bricksearch. The `.mmd` files that do exist
belong to unrelated plugins — `brickfinder`, `support-agent`, `qpl-debugger`,
`money-agentic-onboarding`. The Databricks knowledge here is prose tables and link registries.

---

## Two housekeeping problems worth fixing at the source

Neither blocks the baseline, both will cause drift.

**`~/CLAUDE.md` points at the wrong copy.** It names `~/.cursor/docs/research/INDEX.md` as the single
source of truth. That file is 2026-04-16 and was superseded on 2026-04-27 when the plugin split it
into `ROUTER.md`, `PHASE-*.md`, `OVERVIEW.md` and `FORMATTING-REF.md`. Live data is in a third place
again. Three roots, and the pointer aims at the oldest.

**The knowledge base has never been appended to.** `knowledge.md` is byte-identical across all three
copies at 21,123 bytes, while nine research runs have completed since — so validated facts from May
through August 2026 were never written back, despite that being a documented step. It also declares
its own 90-day expiry and every fact in it is March or April 2026.

---

## Refreshing

There is no script for this yet; the sources are prose, not data. The procedure:

1. Re-read `intel/` and `knowledge.md` from the **plugin** copy, and everything newer in
   `~/.claude/bricksearch/output/`
2. Work the **known staleness** checklist at the foot of the current baseline — it exists so a refresh
   starts from what was already suspect rather than from scratch
3. Re-check preview and GA statuses, which move fastest and age worst
4. Reconcile terminology against `packages/dbui/docs/brandvoice.md`. Corrections land **there**,
   since it is the contract for DBUI copy; this baseline points at it and never duplicates the table
5. Write a new dated file, bump the revision, and append to the revision log
6. Update the pointer at the top of this README

Refresh when the crit tool starts asserting something a reviewer contradicts, and at minimum whenever
`~/.claude/bricksearch/output/` gains material on a surface the baseline calls strong.

---

## Coverage, in one line

Three sections survived review: **product surfaces, the object model, and personas**, and each is
marked with what it is still missing. Everything else was cut in Rev 2 for being ephemeral rather
than structural.

The gaps are the larger half, and the baseline's "what this does not cover" table names them so
review prep knows when to stay quiet. Treat it as binding, the same way the thin topics in
[`../ux-standards/`](../ux-standards/README.md) are.
[`open-questions.md`](open-questions.md) is the plan for closing them.
