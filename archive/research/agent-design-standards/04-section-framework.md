# 04 · The DBUI Section Framework (Steps 6–8 foundation)

This is the section structure we will use to author Databricks' agent-and-human design standards. It intentionally **departs from the inherited 9-section shape** derived from the corpus, and reorganizes around what an enterprise **data & AI** platform actually needs.

---

## Core philosophy

**1. Define best-in-class — study as baseline, then decide.**
Goal: the clearest, most comprehensive design principles, standards, guidelines, examples, and best practices for a data & AI platform — for agents *and* humans. We already have strong components in Figma + React; what's missing is this written contract. Each section is built by (a) **documenting what the top-20 define** (baseline), (b) naming the **best-in-class pattern**, then (c) **deciding DBUI's answer** — keeping what DBUI already does well and adopting a better pattern where the field has one. We're defining what's excellent, not just cataloguing what exists.

**2. One artifact, two readers.** Every section is written so a **human** can read it top-to-bottom as rationale *and* an **agent/linter** can consume the machine-checkable middle. See the section template below.

**3. Standards vs. Guidelines.**
- **Standards (must)** — objective, token-referenced, mechanically checkable. These become linter rules.
- **Guidelines (may)** — judgment calls and preferences that need a human. These inform review, not hard gates.

**4. Everything checkable feeds the linter.** If a Standard can't be expressed as a check, it's probably a Guideline. This keeps step 10 (the linter) honest.

**5. Dual-mode.** Databricks supports **light and dark as equal first-class modes**. Color and contrast standards are written as **light/dark parity** rules (every role resolves in both).

---

## The section set (11)

Grouped into four layers. ⭐ = content-led (we draft a strong baseline; brand/founders can refine later). `NEW` = not in the inherited 9.

### A. Foundation
| # | Section | Covers |
|---|---------|--------|
| 1 | **Overview & Principles** | Brand atmosphere, personality, the signature moves, who it serves, the design values that anchor every downstream decision |
| 2 | **Content: Voice & Tone** ⭐ `NEW` | Written-content contract — voice attributes, tone-by-surface, casing, terminology/glossary, microcopy, system-state copy, AI-surface copy, inclusive language. Biggest whitespace vs. the 20. → `content-voice-tone.md` |

### B. Visual language (tokens)
| # | Section | Covers |
|---|---------|--------|
| 3 | **Color & Theme** | Role-based semantic tokens, the single reserved accent, **light/dark parity**, surface ladders, contrast |
| 4 | **Typography** | Families (SF Pro Text/Display, SF Mono), the 13px product scale, weights, casing ties to Content |
| 5 | **Layout, Spacing & Density** | 8px spacing scale, app-shell, **data-table & row density** (elevated for a data app), Base-shell composition |
| 6 | **Shape, Depth & Elevation** | Radius scale (control/popup/card/pill), shadow tiers (xs→lg), hairlines, focus rings |

### C. Building blocks
| # | Section | Covers |
|---|---------|--------|
| 7 | **Iconography** `NEW` | The 451 governed icons, semantic categories (`object`/`action`/`indicator`/`component`), selection rules |
| 8 | **Components & States** | Token-referenced component specs, the full state matrix (hover/press/focus/disabled/loading), interaction + **motion** (demoted here as a guideline) |
| 9 | **Data Visualization** `NEW` | Chart types, categorical/sequential color mapping, dense-data display, table-vs-chart guidance — corpus whitespace, core to Databricks |

### D. Behavior & governance
| # | Section | Covers |
|---|---------|--------|
| 10 | **Accessibility** `NEW/elevated` | WCAG targets, contrast in both modes, focus visibility, keyboard, ARIA, motion-reduction |
| 11 | **Do's & Don'ts + Agent Guidance** | The prescriptive token-referenced rule block (linter backbone) + how an agent should consume/iterate the doc + honest Known Gaps |

### Mapping from the inherited 9
- **Keep:** Overview, Color, Typography, Layout, Components, Do's/Don'ts, Agent Guidance
- **Merge:** Shapes + Depth → §6
- **Demote:** standalone Motion → a guideline inside §8 (we're a dense product, not a marketing site)
- **Add:** Content Voice & Tone (§2), Iconography (§7), Data Visualization (§9), Accessibility (§10)

---

## Per-section internal template (the dual-audience contract)

Every section — including the founder content section — is authored in this exact shape:

```markdown
## <Section name>

**Principle.** <one sentence — the human takeaway>

### Standards (must)          ← agents + linter read this
| # | Rule | Token / check | Mode | Rationale |
|---|------|---------------|------|-----------|
| S1 | <objective, checkable rule> | `--token` / regex / value | light+dark | <why> |

### Guidelines (may)          ← human judgment
- <preference or judgment call, with the tradeoff>

### Examples                  ← both
- ✅ Do: <concrete, token-referenced>
- ❌ Don't: <concrete anti-pattern>

### Baseline & decision       ← provenance
- **Top-20 baseline:** <what the studied systems do — the evidence>
- **DBUI decision:** <what we chose, and why — best-in-class rationale>
```

Why this works for both readers:
- **Humans** get Principle → Rationale → Examples → the *why* behind the decision (narrative).
- **Agents** get the Standards table (token-referenced, unambiguous).
- **The linter** consumes Standards rows directly; Guidelines become warnings/suggestions, not failures.

---

## Inputs to gather while drafting (content-led)
These have real answers we'll draft a best-in-class baseline for; brand/content partners can refine later. Not gates.
1. **Voice attributes** — the 3–5 adjectives that define Databricks' product voice.
2. **Casing** — confirm sentence case as the universal rule (headings, buttons, labels).
3. **Terminology** — approved vs. banned terms (product-name usage, "AI/BI", feature capitalization).
4. **AI-surface voice** — how copy differs on agentic/Genie surfaces vs. standard product UI.

→ Content baseline: [`content-voice-tone.md`](content-voice-tone.md). Next: steps 6–8 populate each section's Standards/Guidelines from the cohort best-practices + current DBUI.
