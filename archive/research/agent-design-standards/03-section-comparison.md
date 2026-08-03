# 03 · Section-by-Section Comparison Across the 20 (Step 5)

What each of the 20 cohort systems actually **defines** in each of the 9 canonical sections — not just whether a section exists (that was the April study), but its *content*. Evidence is drawn from the parsed YAML token front matter and section prose (`data/sections/<key>.json`, `data/section-signals.tsv`).

**How to read:** each section gives (a) the **common pattern**, (b) the **range & outliers**, and (c) a short **Databricks read** — a bridge toward the standards work in steps 6–8, not the final standard.

> ⚠️ **Surface caveat.** These files analyze **marketing websites**, so type is larger (16px base) and layouts more banded than a dense product app. Databricks' product UI (13px base, data tables, catalogs) is intentionally denser. Read patterns for *principles* (accent discipline, role-based color, elevation restraint), and re-scale the *magnitudes*.

---

## Master token table (all 20)

| System | Mode | Primary | Accent | Roles | Body | Radius scale (px) | Space base | Comps | Type families |
|--------|------|---------|--------|------:|-----:|-------------------|-----------|------:|---------------|
| Vercel | light | `#171717` | `#0070f3` | 36 | 16 | 0/4/6/8/12/16/…/100/9999 | 4 | 41 | Geist + Geist Mono |
| Replicate | light | `#ea2804` | `#ea2804` | 26 | 16 | 0/4/6/10/16/9999 | 2 | 20 | rb-freigeist + basier-square |
| ClickHouse | dark | `#faff69` | `#22c55e` | 24 | 16 | 4/6/8/12/9999 | 4 | 27 | Inter + JetBrains Mono |
| HashiCorp | dark | `#000000` | `#2b89ff` | 30 | 16 | 4/6/8/12/16/24/9999 | 1 | 22 | hashicorpSans |
| Cohere | light | `#17171c` | — | 23 | 16 | 4/8/16/22/30/32/9999 | 2 | 14 | CohereText + Unica77 |
| Together AI | light | `#000000` | `#fc4c02` | 13 | 16 | 0/4/8/9999 | 2 | 36 | The Future + PP Neue Montreal Mono |
| Sentry | dark/dual | `#150f23` | `#c2ef4e` | 21 | 16 | 4/6/8/10/12/18/9999 | 2 | 21 | Sentri Display + Rubik |
| Airtable | light | `#181d26` | `#1b61c9` | 28 | 14 | 2/6/10/12/9999 | 4 | 26 | Haas Groot Disp + Haas |
| MongoDB | light | `#00ed64` | `#7b3ff2` | 34 | 16 | 4/6/8/12/16/24/9999 | 4 | 44 | Euclid Circular A + Source Code Pro |
| Claude | light | `#cc785c` | `#5db8a6` | 25 | 16 | 4/6/8/12/16/9999 | 4 | 29 | Copernicus + StyreneB |
| PostHog | light | `#f7a501` | `#2c84e0` | 29 | 16 | 0/2/4/6/8/9999 | 2 | 30 | IBM Plex Sans + ui-monospace |
| Figma | light | `#000000` | `#ff3d8b` | 20 | 18 | 2/6/8/24/32/50/9999 | 1 | 23 | figmaSans + figmaMono |
| Warp | dark | `#f7f5f0` | — | 9 | 16 | 0/1/2/3/4/6/9999 | 2 | 27 | Inter |
| Mintlify | light | `#0a0a0a` | — | 32 | 16 | 4/6/8/12/16/24/9999 | 4 | 51 | Inter + Geist Mono |
| Cal.com | light | `#111111` | — | 26 | 16 | 4/6/8/12/16/9999 | 4 | 26 | Cal Sans + Inter |
| Expo | light | `#000000` | `#ab6400` | 28 | 16 | 0/4/6/8/12/16/24/9999 | 4 | 22 | Inter |
| Cursor | light | `#f54e00` | — | 22 | 16 | 0/4/6/8/12/16/9999 | 4 | 25 | CursorGothic |
| Linear | dark | `#5e6ad2` | — | 23 | 16 | 4/6/8/12/16/24/9999 | 4 | 21 | Linear Display + Linear Text |
| Notion | light | `#5645d4` | — | 47 | 16 | 4/6/8/12/16/20/24/9999 | 4 | 50 | Notion Sans |
| Webflow | light | `#080808` | `#7a3dff` | 19 | 16 | 0/2/4/8/9999 | 2 | 32 | WF Visual Sans |

*(“Primary” is the brand's headline color; several set it to near-black ink and carry the chroma in a separate `accent`/`link`. Radius scales abbreviated; `9999` = pill.)*

---

## 1 · Overview / Visual Theme  — *20/20*

**What they define:** a 1–3 sentence "atmosphere" statement naming the canvas, the single signature move, and the brand personality. Every file opens here.

**Common pattern**
- Lead with the **canvas polarity** ("warm cream", "near-white", "near-pure black") and one **signature move** (Vercel's mesh gradient at hero-only; Linear's four-step dark ladder; ClickHouse's yellow-on-black voltage; Claude's cream vs. "any other AI tool").
- Frame the brand against a **contrast reference** ("not the cool gray-white every other AI brand uses").
- Name the **protagonist content**: real product UI / code, not marketing illustration.

**Range & outliers:** warmth varies (Claude/Replicate/Cursor = warm cream; Vercel/Figma/Cohere = cool neutral). Only 4–5 go dark by choice (Linear, ClickHouse, HashiCorp, Warp, Sentry) and each frames darkness as a deliberate identity statement.

**Databricks read:** we lack a single crisp atmosphere line. Candidate: *"Information-dense, dual-mode enterprise surface; DuBois blue as the only chroma; real data UI is the hero."*

---

## 2 · Color  — *20/20*

**What they define:** a **role-named palette** (not raw swatches) — `primary`, `on-primary`, `ink`/`body`/`mute`, `canvas`/`surface-1..4`, `hairline`, `link`, `semantic-*` — averaging **26 roles** (range 9–47).

**Common pattern**
- **Mode split: 15/20 light, ~5 dark/dual** — but note this reflects these brands' *marketing* surfaces, not a universal principle. Databricks supports **light and dark equally**; we read this as "pick a default and make both modes first-class," not "go light."
- **One chromatic accent, reserved.** The single loudest, most repeated rule across all Do's/Don'ts: reserve the accent for CTAs / focus / brand mark — *never* decorative fills. "No second accent" appears near-verbatim in Vercel, Linear, ClickHouse, Notion, Claude, Cohere.
- **Ink ≠ accent.** Many treat **near-black as `primary`** (Vercel `#171717`, Cal `#111`, Figma/Expo/Together `#000`, Webflow `#080808`) and hold chroma in a separate `link`/`accent`. Databricks does the opposite (blue *is* primary) — a legitimate divergence to defend in step 8.
- **Surface ladders** (`surface-1..4`) express hierarchy via elevation steps, not color.

**Range & outliers:** accent hue is idiosyncratic (orange, coral, lime, purple, green, yellow). Warp is minimalist (9 roles); Notion is maximal (47, incl. pastel card tints).

**Databricks read:** we're aligned on single reserved accent + role-based tokens (our 47 semantic tokens × 2 modes exceed the cohort norm). The relevant standard for us is **light/dark parity** — every role must resolve in both modes. Watch item: we pair every surface with a `-foreground`, which the cohort does loosely — a Databricks *strength* to keep as a standard.

---

## 3 · Typography  — *20/20*

**What they define:** a named type scale (display → body → caption → code) with `fontFamily / size / weight / lineHeight / letterSpacing` per role.

**Common pattern**
- **16px body in 18/20** (marketing surface). **16/20 ship a monospace family** for code/technical labels — the "voice of the platform." **16/20 use a custom/brand primary font**, not generic Inter.
- **Weight discipline:** display 600, body 400; explicit "don't go heavier" rules (Linear resists 700+, Claude keeps serif at 400, ClickHouse caps at 700).
- **Negative letter-spacing on display** in ~10/20; sentence-case headlines are the norm, all-caps is called out as forbidden (Vercel).
- **"Don't substitute generic Inter"** appears repeatedly (Notion, Claude) — signature type is treated as brand identity.

**Range & outliers:** Claude is the only serif-display system (Copernicus); most are geometric/grotesk sans + mono.

**Databricks read:** we already have SF Pro (Text/Display) + SF Mono and a **13px** product base — *denser* than the cohort's 16px marketing base, which is correct for a data app. Our mono coverage matches the 16/20 norm. Gap: we should state the scale + weight rules as prescriptively as the cohort does.

---

## 4 · Layout & Spacing  — *20/20*

**What they define:** a spacing scale + section rhythm + container/grid rules.

**Common pattern**
- **4px/8px base grid** (4px base in 11/20, 2px in 7/20). Scale is near-universal: `4/8/12/16/24/32/48`.
- **96px section rhythm in 18/20** — a large vertical unit ("band") separating major page sections.
- **Banded, full-width composition** with polarity flips between bands (a marketing-surface trait).

**Range & outliers:** container widths and column counts are under-specified across the board — layout is the *least* prescriptive section (mostly spacing tokens + rhythm, little grid math).

**Databricks read:** our 8px-based 7-step spacing scale matches. The cohort's marketing "band rhythm" is **not** directly transferable to dense product screens — our layout standard should instead codify app-shell density, table/row spacing, and the Base-shell composition (a Databricks-specific extension the cohort has no analog for).

---

## 5 · Depth & Elevation  — *20/20*

**What they define:** shadow tokens + border/hairline usage + layering strategy.

**Common pattern**
- **Elevation restraint is a rule, not a default.** "No heavy drop shadows" appears in Vercel, Linear, Cohere, Notion, Claude.
- Depth comes from **hairline borders + surface-ladder steps + stacked *small* shadows** (Vercel's "stacked small offsets + inset hairline ring" vs. a single Material drop).
- Dark systems express depth through **surface luminance steps**, not shadow.

**Range & outliers:** shadow-forward systems are rare; most lean border/flat. Figma allows slightly larger radii + soft elevation on floating panels.

**Databricks read:** matches our tiered shadow spec (xs on controls → md on popovers → lg on dialogs) and hairline/ring focus model. Keep "flat + hairline first, shadow sparingly" as a standard.

---

## 6 · Shape & Radius  — *20/20*

**What they define:** a radius scale, per-component radius assignment, and pill usage.

**Common pattern**
- **Pill radius (`9999`) in 20/20** — universal for badges/tags; some also for CTAs.
- **Small radii for controls:** `4/6/8` for buttons/inputs, `12/16/24` for cards.
- **Pill-vs-rectangle is a brand fork:** pill CTAs (Vercel, Cohere, Replicate, MongoDB) vs. explicitly anti-pill (Linear, ClickHouse, Notion — "rectangular-sober, not pills"). Both camps state it as a *rule*.

**Range & outliers:** Figma uses larger card radii (24/32/50); Warp uses a fine-grained low scale (1/2/3/4/6).

**Databricks read:** our radius model (`sm` 4px controls · `md` 8px popups · `xl` 16px cards · `full` pills) sits squarely in the norm. We're a rectangle-controls / pill-badges system like Linear/Notion — worth stating explicitly as a standard so agents don't pill-round buttons.

---

## 7 · Components  — *20/20*

**What they define:** **token-referenced component specs** — averaging **29 components** each (range 9–51), each as `{ backgroundColor, textColor, typography, rounded, padding, height }` with `{colors.primary}`-style references.

**Common pattern**
- Components are defined **compositionally from tokens**, not as raw values — the single most important structural idea for agent-generated UI (change a token, every component follows).
- Coverage centers on **button variants, inputs, cards, badges, nav, code blocks, pricing tiers** (marketing-biased set).
- **State coverage is thin** — mostly default + hover/pressed for buttons; little focus/disabled/error in the marketing analyses.

**Range & outliers:** Mintlify (51), Notion (50), MongoDB (44) are the most complete; Warp (9 roles, but 27 comps) leanest palette.

**Databricks read:** **this is our biggest structural advantage.** DBUI already ships real React + Figma components with full state matrices (hover/press/focus/disabled/loading), Code Connect, and 451 governed icons — far beyond the cohort's marketing-component lists. The opportunity is *packaging* our specs in the same token-referenced shape agents read, plus states the cohort omits.

---

## 8 · Do's & Don'ts  — *20/20*

**What they define:** ~13–16 prescriptive bullets each, split Do / Don't, phrased as hard rules ("non-negotiable", "never", "only").

**Common pattern (the cross-cohort meta-rules):**
1. **Reserve the accent** — CTAs/focus/mark only, never decorative fill.
2. **No second chromatic accent.**
3. **Type discipline** — fixed weights, negative display tracking, no generic-font substitution.
4. **Elevation restraint** — hairlines + small stacked shadows, no heavy drops.
5. **Radius consistency** — commit to pill *or* rectangle per role and hold it.
6. **Show real product UI / code**, not illustrations of it.
7. **Surface-rhythm** — alternate surface modes between bands (marketing-specific).

**Range & outliers:** Vercel/ClickHouse/Sentry are the most rule-dense (16–14 bullets); all are specific and token-referenced ("Reserve `{colors.primary}` for…").

**Databricks read:** this is the **highest-leverage section to author** for DBUI and the natural backbone of the linter (step 10) — most rules are mechanically checkable (accent-on-fill, font substitution, radius drift, heavy shadow). Our `CLAUDE.md` has fragments; the cohort shows the value of a single dense, token-referenced Do/Don't block.

---

## 9 · Agent Guidance (Responsive · Iteration · Known Gaps)  — *16/20*

**What they define:** the meta-section telling an agent *how to use the file* — responsive behavior (16/20), an **Iteration Guide** (16/20: "when generating, always… / if unsure…"), and **Known Gaps** (15/20: honest "this file doesn't cover X").

**Common pattern**
- **Iteration Guide** restates the non-negotiables as generation instructions and gives fallbacks for ambiguity.
- **Known Gaps** is a maturity signal — explicitly listing what the analysis didn't capture (e.g., real interaction states, motion, data-dense screens).
- Responsive coverage is breakpoint-light — mostly "stack on mobile," reflecting the marketing-surface bias.

**Range & outliers:** 4/20 omit this meta-section entirely (thinner files). None cover data-viz or dense-table responsiveness — a corpus-wide blank.

**Databricks read:** this section is where a Databricks DESIGN doc can **leapfrog** the cohort: an explicit agent iteration protocol, honest gaps, and — uniquely — **data-density, table, and data-viz guidance** that no analyzed system provides.

---

## Cross-section synthesis (preview of Step 6 "Best Practices")

The durable, cross-cohort patterns most relevant to Databricks:

1. **Role-based semantic tokens with light/dark parity** — the cohort skews light (15/20 marketing surfaces), but the transferable principle for Databricks is that every role resolves cleanly in *both* modes.
2. **Role-based color tokens** (avg 26 roles) with **one reserved accent** — the single most-repeated rule.
3. **Components composed from token references** — the key to agent-consistent output.
4. **Prescriptive, token-referenced Do/Don't rules** — the differentiator section and the linter's backbone.
5. **Type + radius + elevation discipline** stated as hard rules, not defaults.
6. **An "how to iterate" meta-section + honest Known Gaps** distinguishes mature files.
7. **Whitespace for Databricks:** data-density, tables, and **data-visualization** guidance — absent across all 20.

**Two Databricks divergences to defend (not fix) in step 8:** (a) blue *is* primary (cohort favors near-black primary + separate accent); (b) 13px dense product base (cohort is 16px marketing). Both are correct for an enterprise data platform and should be stated as deliberate standards.

→ Steps 6–8 will convert these into DBUI **best practices → standards vs guidelines**, per section.
