# 05 · Standards & Guidelines — §3 Color & Theme  *(format proof)*

> **This is the worked example for steps 6–8.** It shows the exact shape every one of the 11 sections will take: **Principle → Standards (must) → Guidelines (may) → Examples → Baseline & decision.** Standards rows are token-referenced and checkable — they drop straight into the step-10 linter. Once the format is confirmed, the remaining 10 sections follow this template.
>
> Evidence base: the 20-system section study (`data/section-signals.tsv`, `03-section-comparison.md`). DBUI values: `packages/dbui/src/tokens/globals.css` + `CLAUDE.md`.

---

## §3 Color & Theme

**Principle.** One reserved brand accent on a neutral canvas; every color is a semantic *role*, and every role resolves in both light and dark. Color carries meaning (action, status, selection) — never decoration.

### Standards (must)  — agents + linter read this

| # | Rule | Token / check | Mode | Rationale |
|---|------|---------------|------|-----------|
| S1 | **No raw color.** Every color references a semantic token; no hex/rgb/hsl literals in component code. | regex: no `#[0-9a-f]{3,8}`, `rgb(`, `hsl(` in `className`/style | light+dark | Tokens are the only way parity + theming hold. |
| S2 | **Single reserved chromatic accent.** DuBois blue is the only brand chroma for interactive emphasis. Don't introduce a second brand hue. | `--primary` `#2272B4`; no other saturated brand blues/purples | light+dark | The cohort's discipline: one accent, everything else neutral. |
| S3 | **Every surface pairs with a foreground.** A surface token must have a matching `-foreground`; text uses the pair, never an arbitrary color. | each `--{surface}` has `--{surface}-foreground` | light+dark | Guarantees legible pairing in both modes. |
| S4 | **Light/dark parity.** Every role defined in one mode is defined in the other; no mode-only roles. | role set(light) == role set(dark) | light+dark | Dark is first-class, not a port. |
| S5 | **Status colors are reserved.** `destructive`/`warning`/`success` only signal status — never decorative fills or borders. | `--destructive` `#C82D4C`, `--warning` `#BE501E`, `--success` `#277C43` used only on status UI | light+dark | Keeps semantic signal trustworthy. |
| S6 | **Interactive states via opacity composition** (non-filled): hover = `--hover` (primary@8%), press = `--press` (primary@16%). Filled buttons use explicit `--primary-hover`/`--primary-press`. | `bg-hover`/`bg-press`; filled → `--primary-hover`/`--primary-press` | light+dark | One composition rule = predictable states. |
| S7 | **Text contrast meets WCAG AA in both modes** — 4.5:1 body, 3:1 large/UI. | computed contrast(fg,bg) ≥ 4.5 / 3.0 | light+dark | Enterprise + a11y baseline (see §10). |
| S8 | **Accent is reserved, not a background.** `--primary` is for primary action, selection, and focus — not large surface fills. Selected/active backgrounds use `--accent` (`#D7EDFE`). | large fills ≠ `--primary`; selection → `--accent` | light+dark | Restraint is the whole aesthetic. |

### Guidelines (may)  — human judgment

- Canvas stays neutral (white / near-black); let content and the single accent do the work.
- Chart/data-viz palettes (`--chart-1…5`) are a **separate system** from UI accent — don't reuse the brand blue as a categorical series color. (Full rules in §9.)
- Prefer `--border` for decorative dividers, `--input` for form borders (darker), `--ring` for focus — don't collapse them into one grey.
- When adding a new role, extend by **composition** (opacity over an existing token) before minting a new hex.

### Examples  — both

- ✅ Do: `<Button className="bg-primary text-primary-foreground">` · selected row `bg-accent text-accent-foreground` · hover `bg-hover`.
- ✅ Do: define `--muted` **and** `--muted-foreground` for both `:root` and `.dark`.
- ❌ Don't: `style={{ background: "#2272B4" }}` (raw hex — S1) · a green "New" badge using `--success` for decoration (S5) · a purple secondary accent (S2) · a full-bleed `bg-primary` hero panel (S8).

### Baseline & decision  — provenance

- **Top-20 baseline:** All 20 use **role-based semantic tokens**; role counts range **9 (Warp) → 47 (Notion)**, median ~25. **Single reserved accent is near-universal** — many even keep "primary" near-black (`#171717` Vercel, `#000` Together/Figma/Expo) and carry chroma in one separate accent (`#0070f3`, `#fc4c02`, `#ff3d8b`). Mode split ~**15 light / ~5 dark** (Linear, ClickHouse, HashiCorp, Warp, Sentry) — a reflection of these brands' *marketing* surfaces, **not** a light-first law.
- **DBUI decision:** Keep what we already do better than the cohort — **47 semantic roles × 2 modes** with **strict surface/`-foreground` pairing** (looser in the cohort) — and codify it as the standard. Adopt the cohort's **single-accent discipline** (S2, S8) and make **light/dark parity** the load-bearing rule (S4) since we're dual-mode. Contrast (S7) is elevated to a must because we're an enterprise data app with dense text.

---

*Format check:* if this shape works, the remaining sections (§1 Overview, §2 Content, §4 Typography, §5 Layout/Density, §6 Shape/Depth, §7 Iconography, §8 Components/States, §9 Data-Viz, §10 Accessibility, §11 Do's/Don'ts + Agent Guidance) get authored the same way.
