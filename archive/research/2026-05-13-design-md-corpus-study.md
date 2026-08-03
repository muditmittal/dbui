# Open Design `DESIGN.md` Corpus — Comprehensive Study (n=149)

**Date:** 2026-05-13
**Corpus:** `/Users/mudit.mittal/open-design/design-systems/` — every `DESIGN.md` (n=149)
**Bias:** weighted toward 51 dev-friendly systems (Developer Tools, AI & LLM, Backend & Data, Productivity & SaaS, Design & Creative)
**Companion:** `2026-05-13-design-md-corpus-study.html` (same content as a viewable HTML page)

---

## TL;DR for DBUI

Dev-friendly DESIGN.md files differ structurally from consumer ones — they are **more prescriptive**, more **table-heavy**, more **agent-runnable**. The Agent Prompt Guide section appears in **84% of dev-friendly files vs 39% of consumer ones**. The five concrete moves to steal:

1. **Author a single canonical `DBUI_DESIGN.md`** in the 9-section shape, with `## 9. Agent Prompt Guide` as the most important section (Quick Color Reference + 5–8 Example Component Prompts + Iteration Guide with non-negotiables).
2. **Pick a signature move and repeat it** — Linear has weight 510; Vercel has shadow-as-border; Cursor has oklab borders; Resend has frost borders. DBUI's candidate: **"13px Inter / DuBois blue / shell-first / sentence-case copy."**
3. **Phrase rules as non-negotiables** (8 of 81 Agent Guides explicitly use the word *non-negotiable*; the dev-friendly cohort uses *never*/*always* on average 18× per file).
4. **Spell out an anti-slop list aligned to your tokens** — "no indigo/lavender as accent, no emoji icons, no fake metrics, no decorative gradients."
5. **Treat the Storybook portal as Layer B**, not the system prompt — like Open Design's daemon, the system prompt should be a *single markdown file*, not a multi-page site.

---

## Methodology


| Step | What                                                                                                                                               | Output                                                 |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1    | Walked every folder under `design-systems/`, opened each `DESIGN.md`                                                                               | 149 files                                              |
| 2    | Regex-extracted: H1, category tag, ## headings, table rows, code fences, hex/oklch counts, font mentions, "non-negotiable"/"never"/"always" counts | `/tmp/design-md-inventory.tsv` (29 columns × 149 rows) |
| 3    | Extracted full text of §1 Visual Theme, §2 Color, §3 Typography, §7 Do's/Don'ts, §9 Agent Prompt Guide for every file that has them                | `/tmp/corpus_*.txt`                                    |
| 4    | Computed per-category section coverage; built dev-friendly vs non-dev comparison                                                                   | `/tmp/corpus_data.json`                                |
| 5    | Verbatim deep reads on 13 dev-friendly systems for representative quotes                                                                           | this report                                            |
| 6    | Cross-corpus phrase frequency on §1, §7, §9 to surface recurring vocabulary                                                                        | embedded below                                         |


The 51 dev-friendly systems (across 5 categories): airtable · arc · cal · canva · cisco · claude · clay · clickhouse · cohere · composio · cursor · discord · duolingo · elevenlabs · expo · figma · framer · github · hashicorp · huggingface · intercom · linear-app · lovable · minimax · mintlify · miro · mission-control · mistral-ai · mongodb · notion · ollama · openai · opencode-ai · posthog · raycast · replicate · resend · runwayml · sanity · sentry · slack · superhuman · supabase · together-ai · vercel · voltagent · warp · webex · webflow · x-ai · zapier.

---

## 1 · The canonical 9-section format

Open Design's `design-systems/README.md` defines the consumer shape; in practice **139 / 149 files use strict numbered `## 1.` … `## 9.` H2s** and **10 use unnumbered equivalents**. Across the full corpus, three sections are universal (100%), four are present in roughly half the corpus (50–54%), and four niche sections appear rarely.


| §   | Section                       | Present in | %        |
| --- | ----------------------------- | ---------- | -------- |
| 1   | **Visual Theme & Atmosphere** | 148 / 149  | **99%**  |
| 2   | **Color Palette & Roles**     | 149 / 149  | **100%** |
| 3   | **Typography Rules**          | 149 / 149  | **100%** |
| 4   | **Component Stylings**        | 149 / 149  | **100%** |
| 5   | **Layout Principles**         | 79 / 149   | 53%      |
| 6   | **Depth & Elevation**         | 79 / 149   | 53%      |
| 7   | **Do's and Don'ts**           | 73 / 149   | 49%      |
| 8   | **Responsive Behavior**       | 79 / 149   | 53%      |
| 9   | **Agent Prompt Guide**        | 81 / 149   | **54%**  |
| —   | Motion / Animation            | 70 / 149   | 47%      |
| —   | Voice / Tone                  | 61 / 149   | 41%      |
| —   | Accessibility                 | 4 / 149    | **3%**   |
| —   | Iconography                   | 2 / 149    | 1%       |
| —   | Data Visualization            | 0 / 149    | **0%**   |


**Takeaway for DBUI:** §§1–4 are table stakes. **§9 Agent Prompt Guide** is the differentiator and the most agent-actionable section. **Accessibility / iconography / data viz** are corpus-wide gaps — **DBUI's existing 449-icon index, focus-ring rules, and table component already give it best-in-class coverage on those three**.

### Length distribution


| Bucket (lines) | Files | Comment                                                                             |
| -------------- | ----- | ----------------------------------------------------------------------------------- |
| < 100          | 17    | Hand-authored starters + thin awesome-design-skills imports                         |
| 100–200        | 36    | Awesome-design-skills systems (lighter format)                                      |
| 200–300        | 56    | The sweet spot for full 9-section product systems                                   |
| 300–400        | 31    | Linear, Vercel, Cursor, Notion, Mintlify class                                      |
| 400+           | 9     | Outliers (Slack, Sanity, Lovable, Mission Control, Starbucks, Vodafone, Kami, Urdu) |


Median: **178 lines**, mean: **198 lines**. The 200–300-line band is where most real systems land.

---

## 2 · Dev-friendly vs Non-dev cohort

The corpus splits naturally into two cohorts with **fundamentally different priorities**.


| Section            | Dev-friendly (n=51) | Non-dev (n=98) | Delta   |
| ------------------ | ------------------- | -------------- | ------- |
| Agent Prompt Guide | **84%**             | 39%            | **+45** |
| Do's and Don'ts    | **73%**             | 37%            | **+36** |
| Layout             | **80%**             | 39%            | **+41** |
| Depth / Elevation  | **80%**             | 39%            | **+41** |
| Responsive         | **80%**             | 39%            | **+41** |
| Motion / Animation | 20%                 | **61%**        | −41     |
| Voice / Tone       | 6%                  | **59%**        | −53     |


**Interpretation.** Dev-friendly systems lean **structural and prescriptive** — they tell the agent *which exact hex, which weight, which radius*. Consumer-brand systems lean **emotional and atmospheric** — they tell the model *what the brand feels like* via Motion and Voice/Tone narratives. DBUI's product is enterprise B2B data tooling; the **dev-friendly cohort is the right reference set**, not Apple, Spotify, or Starbucks.

The clearest pattern in the dev-friendly subset: every system has a **§9 Agent Prompt Guide** with the same internal structure (Quick Color Reference → Example Component Prompts → Iteration Guide). The 8 systems that *don't* have it (huggingface, openai, github, canva, arc, discord, duolingo, mission-control) are the awesome-design-skills imports, not the awesome-design-md product systems.

---

## 3 · Twelve recurring patterns

Pulled from the §1 / §7 / §9 corpora and corroborated by phrase frequency across all files (`/tmp/corpus_agent_guide.txt` and friends). Frequency counts in parentheses are from the 81-file Agent Guide corpus unless noted.

### Pattern 1 — Narrative cold open in §1, no bullets first

The first paragraph of §1 establishes *taste* for the model. It always reads like art-direction copy, not a spec.

> *"Vercel's website is the visual thesis of developer infrastructure made invisible — a design system so restrained it borders on philosophical. The page is overwhelmingly white (`#ffffff`) with near-black (`#171717`) text, creating a gallery-like emptiness where every element earns its pixel."* — vercel/DESIGN.md

> *"Linear's website is a masterclass in dark-mode-first product design — a near-black canvas (`#08090a`) where content emerges from darkness like starlight."* — linear-app/DESIGN.md

> *"Cursor's website is a study in warm minimalism meets code-editor elegance … not pure black, not neutral gray, but a deeply warm near-black with a yellowish undertone that evokes old paper, ink, and craft."* — cursor/DESIGN.md

Each opens with a **metaphor**, then a **color reference**, then a **principle**. DBUI's equivalent might begin: *"DBUI is the visual language of Databricks — enterprise data infrastructure made trustworthy. Surfaces are high-information, low-decoration: a quiet `bg-muted` shell wrapping a white content surface with `rounded-md` borders, where the only chromatic color is the Databricks blue (`#2272B4`) reserved for primary actions."*

### Pattern 2 — Quick Color Reference at the top of §9

**All 43 dev-friendly §9 sections lead with a flat list of hex values mapped to roles**, not Tailwind names, not CSS vars. The model sees: "Primary CTA: `#5e6ad2`" and can paste-copy.

```markdown
### Quick Color Reference
- Primary CTA: Vercel Black (`#171717`)
- Background: Pure White (`#ffffff`)
- Heading text: Vercel Black (`#171717`)
- Body text: Gray 600 (`#4d4d4d`)
- Border (shadow): `rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`
- Link: Link Blue (`#0072f5`)
- Focus ring: Focus Blue (`hsla(212, 100%, 48%, 1)`)
```

DBUI should add this list **at the top of §9** even though we discourage hardcoded hex elsewhere — the agent needs the literal value to compose code.

### Pattern 3 — Example Component Prompts as paste-ready strings

The defining feature. Every dev-friendly §9 has **5–6 prompt strings the user can copy** into another agent. They're written *as imperatives the model can re-utter*.

> *"Create a hero section on white background. Headline at 48px Geist weight 600, line-height 1.00, letter-spacing -2.4px, color #171717. Subtitle at 20px Geist weight 400, line-height 1.80, color #4d4d4d. Dark CTA button (#171717, 6px radius, 8px 16px padding) and ghost button …"* — vercel

> *"Design a card on dark background: `rgba(255,255,255,0.02)` background, `1px solid rgba(255,255,255,0.08)` border, 8px radius. Title at 20px Inter Variable weight 590, letter-spacing -0.24px …"* — linear-app

> *"Design a feature card with #fdfdf8 background, 1px #bfc1b7 border, 4px radius, IBM Plex Sans heading at 20px weight 700, and 16px body text at weight 400 with 1.50 line-height in olive ink (#4d4f46)"* — posthog

This is what makes the file **runnable inside other LLMs**. DBUI's portal should output a handful of these per page archetype (list page, detail page, dialog, form).

### Pattern 4 — Iteration Guide as numbered non-negotiables

The third §9 sub-section is always called something like **"Iteration Guide"** or **"Non-negotiables"** and is a numbered list of 5–8 rules. The word **"non-negotiable"** appears literally in 9 of 81 Agent Guides; "never" + "always" appears **~3,500 times across the corpus**.

> 1. Always set font-feature-settings `"cv01", "ss03"` on all Inter text — this is non-negotiable for Linear's look
> 2. Letter-spacing scales with font size: -1.584px at 72px, -1.056px at 48px, -0.704px at 32px, normal below 16px
> 3. Three weights: 400 (read), 510 (emphasize/navigate), 590 (announce)
> 4. Surface elevation via background opacity: `rgba(255,255,255, 0.02 → 0.04 → 0.05)` — never solid backgrounds on dark
> 5. Brand indigo (`#5e6ad2` / `#7170ff`) is the only chromatic color — everything else is grayscale
>
> — linear-app

The pattern: each rule **encodes one variable** and **states the failure mode**. *"Three weights: 400, 510, 590"* not *"use Inter at appropriate weights."*

### Pattern 5 — One signature move per system

Each dev-friendly system has a **single memorable mechanism** that gets repeated across §1, §4, §9. It's the thing an agent should *recognize and reproduce*:


| System     | Signature move                                                                       |
| ---------- | ------------------------------------------------------------------------------------ |
| Vercel     | **Shadow-as-border** — `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` replaces CSS borders |
| Linear     | **Weight 510** (between regular and medium) + `cv01 ss03` OpenType features          |
| Supabase   | **Translucent borders** as the depth mechanism on dark backgrounds (no shadows)      |
| Cursor     | `**oklab()`** border color for perceptual uniformity                                 |
| Notion     | **Warm-tinted grays** (yellow-brown undertone, never blue-gray)                      |
| Resend     | **Frost borders** (`rgba(214, 235, 253, 0.19)`) on pure black, no shadows            |
| Raycast    | **Double-ring shadow** (outer hairline + inset highlight) for keyboard keys          |
| ClickHouse | **Neon Volt `#faff69`** as the sole chromatic accent; everything else mono           |
| PostHog    | **Warm parchment** `#fdfdf8` background, sage-tinted borders, never pure white       |
| Sentry     | **Inset shadow** on every primary button, warm-purple shadows not gray               |


A DBUI candidate: **the "muted shell" pattern** — `bg-muted` outer chrome, `bg-background` rounded-md content surface, both with `1px` border, primary blue reserved for actions only.

### Pattern 6 — Three weights, three roles

A near-universal rule among dev-friendly systems: declare exactly three font weights and map each to one role.


| System   | The three weights                                                  |
| -------- | ------------------------------------------------------------------ |
| Vercel   | 400 (body) · 500 (UI/interact) · 600 (announce)                    |
| Linear   | 400 (read) · 510 (emphasize) · 590 (announce)                      |
| Notion   | 400, 500, 600, 700 (four — but Notion is the rare exception)       |
| Supabase | 400 default · 500 only for buttons/nav                             |
| Sentry   | 400 (body) · 500 (nav) · 600 (titles) · 700 (CTAs)                 |
| Cursor   | Implicit single-weight default with weight in display via tracking |
| Resend   | 400 throughout; weight is not the emphasis mechanism               |


DBUI's existing rule: **400 (body) / 600 (semibold for labels and headings) / no bold**. That's already in line with the corpus.

### Pattern 7 — Letter-spacing as a function of font size

**113 mentions of "letter-spacing" across 81 §9 sections.** Every dev-friendly system has a *formula* (not a vibe) for tracking at scale.

> *"Letter-spacing scales with font size: -2.4px at 48px, -1.28px at 32px, -0.96px at 24px, normal at 14px"* — vercel
>
> *"Letter-spacing scales with font size: -1.584px at 72px, -1.056px at 48px, -0.704px at 32px, normal below 16px"* — linear-app
>
> *"Letter-spacing scales with font size for CursorGothic: -2.16px at 72px, -0.72px at 36px, -0.325px at 26px, normal at 16px"* — cursor

DBUI's typography table (currently in `docs/component-rules.md`) does **not** publish a letter-spacing curve. **Add one.** Even *"0 for all DBUI typography; bias toward natural Inter spacing"* is a rule — but most products use negative tracking on display.

### Pattern 8 — Borders are the depth mechanism, especially on dark

Multiple dev systems explicitly *forbid drop shadows* on dark surfaces, relying on **translucent borders** instead.

> *"Depth comes from borders (`#242424` → `#2e2e2e` → `#363636`), not shadows"* — supabase
> *"Don't add box-shadows — they're invisible on dark backgrounds and break the border-defined depth system."* — supabase

> *"Don't drop shadows for elevation on dark surfaces — use background luminance stepping instead"* — linear-app

> *"No shadows — use frost borders for depth against the void"* — resend

DBUI is a light-first system, so shadows still work — but the corpus pattern of **explicitly forbidding the alternative depth mechanism** is worth copying. State *"DBUI uses `shadow-xs` on form controls and `shadow-md` on popovers — never rely on borders alone, never use heavier shadows."*

### Pattern 9 — Token names with rationale, not just hex

Color blocks always include a **role name** alongside the value: not `"#5e6ad2"` but `"Brand Indigo (#5e6ad2)"`. This trains the agent to use named tokens.

> *"Primary CTA background: `#ebeae5` (warm cream button)"* — cursor
> *"Brand Accent: 'Neon Volt (#faff69)'"* — clickhouse
> *"Background: Pure White (`#ffffff`)"* — vercel

DBUI maps to **CSS-variable names** (`--primary`, `--muted`, `--accent`), but the table in §2 should still spell out **role + Tailwind class + CSS var + literal hex** so the model has all four representations.

### Pattern 10 — Warm vs cool color tilt is intentional

Half a dozen systems *explicitly* warn against neutral gray, demanding either a warm or cool tilt.

> *"Always use warm tones — `#f2f1ed` background, `#26251e` text, never pure white/black for primary surfaces"* — cursor
> *"Always use warm neutrals — Notion's grays have yellow-brown undertones (`#f6f5f4`, `#31302e`, `#615d59`, `#a39e98`), never blue-gray"* — notion
> *"Use `#171717` instead of `#000000` for primary text — the micro-warmth matters"* — vercel
> *"Don't use pure black (`#000000`) for backgrounds — always use the warm purple-blacks"* — sentry

DBUI's `#161616` foreground and `#FFFFFF` background are **technically neutral**. The decision is fine, but it should be **stated as intentional**, not implicit.

### Pattern 11 — Pill (9999px) for one specific use, never general

Pill shapes are extreme radii (`9999px` / `border-radius: 9999px`) and the corpus treats them as **a specific signal**, not a general decoration.

> *"Pill shape (9999px) for CTAs and badges, standard radius (4px–16px) for containers"* — resend
> *"Pill (9999px) for primary actions, 6px for secondary, 8-16px for cards"* — supabase
> *"Don't use pill radius (9999px) on primary action buttons — pills are for badges/tags only"* — vercel

The advice **contradicts itself across systems** — but every system *has* a rule. DBUI uses `rounded-full` only for `Badge`-style pills and avatars. That's a stance worth stating explicitly.

### Pattern 12 — A single anti-pattern paragraph

Most dev-friendly systems include 4–6 *negative* rules — explicit failure modes. The pattern is *"don't X — Y is the system."*

> *"Don't use pure white (`#ffffff`) as primary text — `#f7f8f8` prevents eye strain"* — linear
> *"Don't use solid colored backgrounds for buttons — transparency is the system"* — linear
> *"Don't increase body text letter-spacing — Geist is designed to run tight"* — vercel
> *"Don't introduce additional colors — the palette is strictly black, neon, green, and gray"* — clickhouse

This is **opt-in anti-slop**, scoped to each system's own brand. Open Design *also* ships a generic `craft/anti-ai-slop.md` (the seven cardinal sins — Tailwind indigo, two-stop gradients, emoji icons, sans serif where a serif is bound, rounded-card-with-left-border, invented metrics, lorem ipsum) — DBUI should have its own token-aware equivalent.

---

## 4 · Fifteen best practices to adopt (prioritized for DBUI)


| #   | Practice                                                 | Source                                         | DBUI status                                              |
| --- | -------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| 1   | Add a `## 9. Agent Prompt Guide` with three subsections  | 84% of dev-friendly corpus                     | **Missing**                                              |
| 2   | Five paste-ready Example Component Prompts per archetype | Vercel, Linear, Notion, Supabase               | **Missing**                                              |
| 3   | "Iteration Guide" with 6–8 numbered non-negotiables      | Linear, Cursor, ClickHouse                     | **Partially in `CLAUDE.md` Rules section**               |
| 4   | A signature move re-stated everywhere                    | Vercel (shadow-as-border), Linear (510 weight) | **Missing** — propose "muted-shell + 13px + DuBois blue" |
| 5   | Quick Color Reference (literal hex + role) at top of §9  | Universal                                      | **Missing**                                              |
| 6   | Letter-spacing scale formula                             | 113 mentions in corpus                         | **Missing**                                              |
| 7   | Explicit anti-pattern paragraph (5–8 don'ts)             | 73 of 149 files                                | **Partial** — `CLAUDE.md` "Patterns LLMs get wrong"      |
| 8   | "Three weights, three roles" rule                        | Vercel, Linear, Supabase, Sentry               | **Already aligned** (400/600)                            |
| 9   | One narrative paragraph in §1 (cold open)                | 99% of corpus                                  | **Missing** as a single paragraph                        |
| 10  | Per-section "Do" and "Don't" split, not combined         | Notion-style                                   | **Missing** structure                                    |
| 11  | Token name + Tailwind + CSS var + hex in one table row   | Most dev systems                               | **Partially done** in `globals.css` comments             |
| 12  | Generic anti-slop ruleset (DBUI-token-aligned)           | `craft/anti-ai-slop.md`                        | **Missing**                                              |
| 13  | Breakpoint table for shell collapse                      | 53% of corpus, 80% of dev cohort               | **Implicit in `composition.md`**                         |
| 14  | Explicit forbidden colors (indigo, lavender as accent)   | Vercel, Supabase, ClickHouse                   | **Missing**                                              |
| 15  | "Wrong-fit redirect" — when not to use DBUI              | warm-editorial pattern                         | **Missing**                                              |


---

## 5 · Anti-patterns / things to AVOID

Two layers: **AI-slop generic** (visible across the corpus as warnings) and **wrong-cohort-for-DBUI** (don't copy these even though they're popular).

### 5.1 AI-slop universal warnings

Distilled from Open Design's `craft/anti-ai-slop.md` plus matching Don't lines across 73 files. Each rule is followed by the DBUI-native equivalent.


| AI tell                                                                            | What the corpus says to avoid                                    | DBUI's existing rule                                                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Default Tailwind indigo** (`#6366f1`, `#4f46e5`, `#7c3aed`, `#a855f7`) as accent | "Indigo is the textbook AI tell" — `craft/anti-ai-slop.md`       | Use `bg-primary` (DuBois blue `#2272B4`). Never `text-indigo-*`, `bg-violet-*`                      |
| **Two-stop "trust" gradient** on heroes (purple→blue, blue→cyan)                   | "A flat surface + intentional type beats this every time"        | DBUI has the `--ai-gradient` token reserved exclusively for AI/Genie surfaces — use it nowhere else |
| **Emoji as feature icons** (✨🚀🎯⚡🔥💡) inside buttons / headings                  | "Use 1.6–1.8px-stroke monoline SVG with `currentColor`"          | DBUI ships 451 monoline icons. Never use emoji in product UI                                        |
| **Sans-serif where a serif is bound**                                              | Vercel, Cursor, Resend explicitly                                | DBUI is sans-only; rule N/A but worth stating                                                       |
| **Rounded card + colored left-border accent** (the "AI dashboard tile")            | "Drop either the radius or the left border"                      | DBUI's Status and Alert components are the only place a colored border is sanctioned                |
| **Invented metrics** ("10× faster", "99.9% uptime", "3× more productive")          | "Either pull from a real source or use a labelled placeholder"   | DBUI's `brandvoice.md` has the equivalent rule; restate in install.md                               |
| **Filler copy** (`lorem ipsum`, "feature one/two/three", "placeholder text")       | "An empty section is a design problem to solve with composition" | Already in `brandvoice.md`                                                                          |
| **Drop shadows on inputs**                                                         | Vercel, Linear, Resend all forbid                                | DBUI: `shadow-xs` only on filled buttons; form inputs use border, not shadow                        |


### 5.2 What to NOT copy from the broader corpus

DBUI is enterprise data tooling. **Do not** emulate any of the following clusters even though they're well-represented in the corpus:


| Cluster (n files)                                                                                                                     | Why it's wrong for DBUI                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Automotive** (bmw, bugatti, ferrari, lamborghini, renault, tesla — 7)                                                               | Cinematic dark mode + scroll-driven hero + glossy chrome. Not B2B product UX.                        |
| **Fintech consumer** (binance, coinbase, kraken, revolut, wise — 7)                                                                   | Aggressive green/red, "trust gradients," large hero stats. Reads as marketing, not workbench.        |
| **E-Commerce & Retail** (airbnb, meta, nike, shopify, starbucks — 5)                                                                  | Photography-heavy, generous whitespace, emotional copy. Wrong information density for data products. |
| **Media & Consumer** (apple, ibm, nvidia, pinterest, playstation, spacex, spotify, theverge, uber, vodafone, wired, xiaohongshu — 12) | Brand-led, not product-led. Atmosphere over utility.                                                 |
| **Bold & Expressive / Themed & Unique** (16 systems with names like "agentic", "elegant", "morphism", "noir")                         | Decorative-only; not designed for actual product surfaces.                                           |


**Specifically dangerous if borrowed wholesale:** Apple-style oversize hero typography, Starbucks-style brand-color saturation, fintech green-red signal colors, automotive scroll-driven storytelling. These read as marketing-site signals, not as data-platform workbenches.

### 5.3 Tactical pitfalls to call out in DBUI's anti-slop list

A proposed `docs/anti-slop.md` for DBUI, modelled on Open Design's `craft/anti-ai-slop.md` but token-aware:

1. **Default shadcn / Tailwind indigo, violet, purple anywhere as accent.** DBUI uses `bg-primary` (DuBois blue). Indigo is the textbook AI tell.
2. **Two-stop gradient on a hero, marketing band, or empty state.** DBUI surfaces are flat. The `--ai-gradient` token is reserved for Genie/AI affordances only.
3. **Emoji as functional icons.** All product icons must come from `dbui/components/icons/*`. Emoji are allowed only as Slack-style status pills inside `Tag`, never in headings, buttons, table cells, or nav.
4. **Lucide / Heroicons / React Icons imports.** DBUI has 451 monoline icons; importing another set is a regression.
5. **Hardcoded hex / rgb / oklch in Tailwind classes.** Always semantic tokens — `bg-primary`, not `bg-[#2272B4]`.
6. `**<button>`, `<input>`, `<select>`, `<dialog>` without a wrapping DBUI component.** Use the DBUI primitive.
7. `**asChild` instead of Base UI's `render` prop.** Radix pattern, ignored by Base UI.
8. **Colored-left-border "status card"** as a generic layout. DBUI's `Status` and `Alert` are the only sanctioned places for a colored accent stroke.
9. **Invented metrics or numbers in copy.** Use real data or a `--data-placeholder` token-styled placeholder.
10. **Pill radius on primary action buttons.** Pills are reserved for `Badge` and `Tag` only.
11. `**text-sm` / `font-medium`.** DBUI base is 13px / semibold (600). The shadcn defaults are wrong here.
12. **Title Case headings.** DBUI is sentence case throughout (except product / brand names).
13. **"Are you sure?" / "Something went wrong"** generic dialog copy. State the action and the consequence (`brandvoice.md` rule).
14. **Banned words**: `utilize`, `leverage`, `seamless`, `robust`, `simply`, `just`, `please`, `kindly` (already in `brandvoice.md`).
15. **Three-dot menu without a `DropdownMenu`** — never raw a `<button>` and a popover.

---

## 6 · Dev-friendly cohort deep-dive

Each entry: signature move + one verbatim quote + one DBUI takeaway.

### vercel · Developer Tools · 314 lines

**Signature move:** *Shadow-as-border.* Vercel replaces every CSS border with a 1px-spread box-shadow, enabling smooth rounded corners and layerable depth without the box-model implications.

> *"Use shadow-as-border (`0px 0px 0px 1px rgba(0,0,0,0.08)`) instead of traditional CSS borders … Don't use traditional CSS `border` on cards — use the shadow-border technique"* — vercel

**For DBUI:** Probably *don't* adopt — DBUI uses real borders consistently and that's clearer for an enterprise system. But adopt Vercel's posture of **stating the depth mechanism as a non-negotiable**.

### linear-app · Productivity & SaaS · 371 lines

**Signature move:** *Inter weight 510* + `cv01 ss03` OpenType features applied globally to every text node.

> *"Always set font-feature-settings `'cv01', 'ss03'` on all Inter text — this is non-negotiable for Linear's look"*

**For DBUI:** Inter is already DBUI's font; adopting `cv01 ss03` could be a low-cost upgrade. Investigate.

### supabase · Backend & Data · 259 lines

**Signature move:** *Hierarchical translucent borders* on dark surfaces (`#242424` → `#2e2e2e` → `#363636`) as the sole depth mechanism — *no shadows.*

> *"Don't add box-shadows — they're invisible on dark backgrounds and break the border-defined depth system."*

**For DBUI:** Less relevant (DBUI is light-first), but **borrow the principle**: declare one depth mechanism and forbid the other.

### sentry · Backend & Data · 266 lines

**Signature move:** *Warm-purple shadow tones* (not gray) + inset shadow on every button for tactile feel.

> *"Maintain the warm purple shadow tones — shadows should feel purple-tinted, not neutral gray"*

**For DBUI:** Not adoptable directly, but the lesson is: **shadow color is a brand choice**. DBUI's shadows are pure black at 5–13% — that's a deliberate stance to publish.

### cursor · Developer Tools · 313 lines

**Signature move:** *Warm off-white canvas* (`#f2f1ed`) with `oklab()` borders for perceptual uniformity.

> *"Always use warm tones — `#f2f1ed` background, `#26251e` text, never pure white/black for primary surfaces"*

**For DBUI:** Cursor's three-font system (display Gothic / serif body / mono code) is a near-mirror of DBUI's SF Pro Display / SF Pro Text / SF Mono — but DBUI doesn't yet **publish the three-voice rule explicitly**. Steal that framing.

### clickhouse · Backend & Data · 285 lines

**Signature move:** *Neon Volt* (`#faff69`) — one chromatic accent against pure black, weight 900 hero, sharp 4–8px radius, charcoal borders as depth.

> *"Don't introduce additional colors — the palette is strictly black, neon, green, and gray"*

**For DBUI:** Wrong aesthetic (dark, neon), but **right discipline**: one accent, everything else achromatic. DBUI already does this with DuBois blue.

### posthog · Backend & Data · 260 lines

**Signature move:** *Warm parchment canvas* (`#fdfdf8`) + sage-tinted borders, IBM Plex Sans throughout, PostHog Orange (`#F54E00`) on hover only.

> *"Ensure hover states flash PostHog Orange (#F54E00) — if hovering feels bland, you're missing this"*

**For DBUI:** *Forced warmth.* DBUI's whites are pure neutral, which is fine — but PostHog's commitment to a *specific* hue ("never neutral gray, always sage") is the kind of conviction DBUI could publish.

### notion · Productivity & SaaS · 313 lines

**Signature move:** *Warm-tinted grays with yellow-brown undertones* (`#f6f5f4`, `#615d59`, `#a39e98`) — explicitly anti-blue-gray.

> *"Always use warm neutrals — Notion's grays have yellow-brown undertones, never blue-gray"*

**For DBUI:** Notion's four-weight system (400/500/600/700) is the only major dev-friendly system with four weights, not three — illustrates that DBUI's two-weight system (400/600) is on the lean end.

### raycast · Developer Tools · 272 lines

**Signature move:** *Double-ring shadow* (outer hairline + inset highlight) for keyboard caps; positive letter-spacing on body text (atypical).

> *"Verify letter-spacing is positive (+0.2px) on body text — negative spacing breaks the Raycast aesthetic"*

**For DBUI:** Raycast's keyboard-cap shadow technique is directly applicable to DBUI's `Kbd` component.

### resend · Productivity & SaaS · 307 lines

**Signature move:** *Frost borders* (`rgba(214, 235, 253, 0.19)`) as the universal structural element on pure black. Three-font system with strict role separation.

> *"Three fonts, three roles: Domaine (hero), ABC Favorit (sections), Inter (body) — never cross"*

**For DBUI:** Steal the *"never cross"* phrasing — most DBUI docs say "for headings, use…" without explicitly forbidding the alternative.

### claude · AI & LLM · 316 lines

**Signature move:** *Anthropic warm parchment* (`#f5f4ed`) + ivory cards + terracotta brand color, serif + sans pairing.

> *"Reference specific color names — 'use Olive Gray (#5e5d59)' not 'make it gray'"*

**For DBUI:** Direct lesson — **always reference a token by name, not by description.** "Use `text-muted-foreground`" not "use a lighter gray."

### cohere · AI & LLM · 270 lines

**Signature move:** *22px corner radius* repeated as a brand motif — every container that can be 22px is 22px.

**For DBUI:** DBUI's radius system is 4/8/16/full. Stating "everything in DBUI is 4px for controls, 8px for popups, 16px for cards" as a **motif rule** (not a parameter) is the move.

### mintlify · Productivity & SaaS · 330 lines

**Signature move:** *Documentation-as-design* — typography table for h1–h6 + body + code; explicit table-of-contents pattern; opinionated about nav width.

**For DBUI:** DBUI doesn't ship docs UI (Mintlify does), but the way Mintlify structures `## 3. Typography` as **a single ~30-row table** is the move DBUI's `component-rules.md` should adopt.

---

## 7 · What DBUI does well versus the corpus


| Dimension         | Corpus state                      | DBUI state                                                              | Verdict                              |
| ----------------- | --------------------------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| Component catalog | Mostly prose lists in §4          | `component-index.md` with category / when-to-use / avoid-for / synonyms | **DBUI better**                      |
| Icon governance   | Mentioned in 2/149 files          | `icon-index.md` with 449 icons + semantic categories                    | **DBUI dramatically better**         |
| Accessibility     | Mentioned in 4/149 files          | Focus-ring spec across all interactive components                       | **DBUI better**                      |
| Data viz          | 0/149 files                       | Charts + chart-1..5 tokens + `Status` + `Tag` for data                  | **DBUI uniquely covered**            |
| Install / setup   | 0/149 files address this          | `install.md` + Preflight + agent-runnable                               | **DBUI uniquely covered**            |
| Shell composition | Marketing-site oriented in corpus | `composition.md` with 5 product shells (A–E)                            | **DBUI better for product surfaces** |
| Brand voice       | Mentioned in ~40% of corpus       | `brandvoice.md` operational checklist with banned words                 | **DBUI better**                      |


**Headline:** DBUI's strengths are in *product surface depth* (components, icons, shells, voice, install) — the things a real engineering team needs once they've adopted the system. The corpus is stronger at *initial visual taste* (§1 Visual Theme narratives + §9 Agent Prompt Guide). The gap is recoverable in one file.

---

## 8 · DBUI gaps mapped to the 9-section format

For each canonical section, where DBUI's coverage lives today and what to add.


| §   | Section                   | Where DBUI covers it                                                                                          | Status / gap                                                                                                                                                 |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Visual Theme & Atmosphere | Not a single narrative — split across root `CLAUDE.md` (Databricks context) + `packages/dbui/CLAUDE.md` intro | **Add a 200-word cold open** to a new `DBUI_DESIGN.md`. Snippet A below.                                                                                     |
| 2   | Color Palette & Roles     | `globals.css` tokens; root `CLAUDE.md` token table                                                            | **Build a 4-column table**: Role · Tailwind class · CSS var · Literal hex (light + dark)                                                                     |
| 3   | Typography Rules          | `component-rules.md` typography section + `packages/dbui/CLAUDE.md` typography reminder                       | **Add a 10-row table**: page title / section / body / small / caption / button label / table header / etc. → font, size, line-height, weight, letter-spacing |
| 4   | Component Stylings        | `component-index.md` (best in corpus) + per-component JSDoc                                                   | **Nothing to add** — point §4 at `component-index.md`                                                                                                        |
| 5   | Layout Principles         | `composition.md` (5 shells) + `component-rules.md` spacing tiers                                              | **Already excellent** — point §5 at `composition.md`                                                                                                         |
| 6   | Depth & Elevation         | Distributed across `globals.css` shadow tokens + JSDoc                                                        | **Write a 4-tier table** mapping shadow-xs / shadow-md / shadow-lg / shadow-focus to context                                                                 |
| 7   | Do's and Don'ts           | "Patterns LLMs get wrong" + "Before you commit" in `CLAUDE.md`                                                | **Restructure** as paired Do/Don't bullets; add explicit forbidden colors/imports/patterns                                                                   |
| 8   | Responsive                | Implicit in `composition.md`                                                                                  | **Extract a single breakpoint table** for shell-to-rail collapse                                                                                             |
| 9   | Agent Prompt Guide        | **Missing entirely.** Implicit in skills + `install.md` Preflight                                             | **Author from scratch.** Snippet B below.                                                                                                                    |


---

## 9 · Concrete next steps for DBUI

### Phase 1 — Single new file (highest leverage)

Author `**packages/dbui/DBUI_DESIGN.md`** in 9-section shape, ~300–400 lines. The skeleton:

```markdown
# DBUI Design System

> Category: Enterprise B2B · Data & AI Platform · Light-first product UI
> Databricks' design language. Quiet shell, dense content, semantic-blue actions.

## 1. Visual theme & atmosphere
[Snippet A below]

## 2. Color palette & roles
[4-column table: role | Tailwind | CSS var | hex (light+dark)]

## 3. Typography rules
[10-row table + 3 voices: SF Pro Display / SF Pro Text / SF Mono]

## 4. Component stylings
See `./docs/component-index.md` for the catalog. Conventions:
- All components built with CVA variants
- Base UI primitives with `render={<Component />}`, never `asChild`
- 13px body / 600 semibold labels / never `text-sm` or `font-medium`

## 5. Layout principles
See `./composition.md` for the five shells (A–E). The four spacing tiers:
gap-2 inside components; gap-4 between form fields; gap-6 between major blocks;
gap-8 between page sections.

## 6. Depth & elevation
[4-tier table: shadow-xs → shadow-md → shadow-lg → shadow-focus]

## 7. Do's and Don'ts
[Paired bullets, ~10 each]

## 8. Responsive behavior
[Single breakpoint table for shell + rail collapse]

## 9. Agent prompt guide
[Snippet B below]
```

### Snippet A — §1 Visual theme cold open

```markdown
DBUI is the visual language of Databricks — enterprise data and AI infrastructure
made trustworthy through quiet, dense, information-first UI. Product surfaces
follow a two-layer pattern: a `bg-muted` outer shell carries the platform nav
and header, wrapping a `bg-background` rounded-md content surface where the
actual work happens. Every page starts with the Base shell. The personality is
typographic discipline (13px body, 600 semibold for any emphasis), tight 4px
radii on controls, and restrained color: DuBois blue (`#2272B4`) is the only
chromatic accent in default product chrome — semantic destructive / warning /
success appear only where meaning demands them. Agents should bias to
**subtraction** (fewer frames, fewer boxes), **one primary action per region**,
and **semantic tokens** (`bg-primary`, `text-foreground`) over literal hex.

**Key characteristics:**
- 13px Inter / SF Pro Text base — never 14px or 16px
- Two-layer shell: `bg-muted` chrome + `bg-background` rounded-md content
- Three voices: SF Pro Display (headings), SF Pro Text (body), SF Mono (code)
- DuBois blue (`#2272B4`) as the only chromatic action color in default chrome
- Two weights: 400 (read) + 600 semibold (emphasize / label / heading)
- 4px control radius / 8px popover radius / 16px card radius / full pill for badges
- Light-first; dark mode supported via paired tokens, not a separate palette
- Shadows are quiet (`shadow-xs` 5% black) — depth comes from borders + tokens
```

### Snippet B — §9 Agent Prompt Guide

```markdown
## 9. Agent prompt guide

### Quick color reference
| Role | Tailwind | CSS var | Light | Dark |
|---|---|---|---|---|
| Page background | `bg-background` | `--background` | `#FFFFFF` | `#0A0A0A` |
| Page foreground | `text-foreground` | `--foreground` | `#161616` | `#FAFAFA` |
| Muted chrome (shell, headers) | `bg-muted` | `--muted` | `#F6F6F6` | `#1A1A1A` |
| Secondary text | `text-muted-foreground` | `--muted-foreground` | `#6F6F6F` | `#A0A0A0` |
| Primary CTA | `bg-primary` | `--primary` | `#2272B4` | `#5AA9E6` |
| Primary text on primary | `text-primary-foreground` | `--primary-foreground` | `#FFFFFF` | `#FFFFFF` |
| Hover overlay (non-filled) | `bg-hover` | `--hover` | `rgba(34,114,180,0.08)` | `rgba(90,169,230,0.10)` |
| Active overlay | `bg-press` | `--press` | `rgba(34,114,180,0.16)` | `rgba(90,169,230,0.18)` |
| Destructive | `bg-destructive` / `text-destructive` | `--destructive` | `#C82D4C` | `#E54466` |
| Warning | `text-warning` | `--warning` | `#BE501E` | `#E07A41` |
| Success | `text-success` | `--success` | `#277C43` | `#3FA565` |
| Border decorative | `border-border` | `--border` | `#EBEBEB` | `#2A2A2A` |
| Border form | `border-input` | `--input` | `#CBCBCB` | `#3F3F3F` |
| Focus ring | `border-ring` | `--ring` | `#2272B4` | `#5AA9E6` |

### Non-negotiables
1. **Never** raw `<button>`, `<input>`, `<select>`, `<dialog>` — always the DBUI primitive.
2. **Never** import from `lucide-react`, `@heroicons/`*, `react-icons` — DBUI ships 451 monoline icons.
3. **Never** hardcode `#`, `rgb(`, `oklch()` in JSX — semantic tokens only.
4. **Never** `text-sm` or `font-medium` — DBUI base is `text-[13px]` and `font-semibold`.
5. **Never** Title Case in headings or button labels — sentence case throughout.
6. **Never** `asChild` — Base UI uses `render={<Component />}`.
7. **Always** wrap every page in `<Base>` from `dbui-shells`.
8. **Always** use `DataTreeView` / `FileTreeView` for hierarchy — never nested divs.
9. **Always** `align="start"` for dropdowns and popovers.

### Example component prompts
- "Build Shell A list page in DBUI: `<Base defaultActive='catalog'><PageHeader>…</PageHeader><ControlsBar>…</ControlsBar><Table>…</Table></Base>` — use only `dbui/components/ui/`* imports; spacing follows `gap-4` between regions; primary action goes in `PageHeaderActions`."
- "Render a detail page in DBUI Shell E: left tree at 260px width using `DataTreeView`; center column with `Breadcrumb` → `PageHeaderTitle` → `Tabs` → tab content; right metadata sidebar at 280px with `KeyValuePair` rows separated by `Separator`. Each column scrolls independently."
- "Confirm-destructive flow in DBUI: open `AlertDialog`, never `Dialog`. Action button uses `variant='destructive'`. Title states the action ('Delete catalog?'), description states the consequence, and never starts with 'Are you sure?'"
- "Form field in DBUI: `<Field>` containing `<Label>` (semibold 13px) above `<Input>` (32px height, `border-input`, `shadow-xs`), helper text below in `text-muted-foreground text-[12px]`. Error replaces helper text and adds `border-destructive` on the input (no ring, no shadow change)."
- "Empty state in DBUI: `<Empty>` component with a single 24px icon, 13px semibold title sentence-cased, 13px regular description in `text-muted-foreground`, optional outline button below. No illustrations, no marketing copy, no exclamation marks."

### Iteration guide (mentally run before answering)
1. Did I read `./docs/component-index.md` before picking a component?
2. Did I read `./docs/icon-index.md` before picking an icon?
3. Did I use `<Base>` as the page wrapper?
4. Did I use semantic tokens, not literal hex?
5. Did I use `text-[13px]` and `font-semibold` (never `text-sm` / `font-medium`)?
6. Did I use the `render` prop on Base UI triggers (never `asChild`)?
7. Did my copy pass `brandvoice.md` — sentence case, no banned words, action-stated consequences?
8. Is the page wrapped in the right shell from `composition.md` (A/B/C/D/E)?
```

### Phase 2 — Add `docs/anti-slop.md`

A token-aligned version of `craft/anti-ai-slop.md`. Use the 15-rule list from §5.3 above as the seed. ~80 lines.

### Phase 3 — Wire `DBUI_DESIGN.md` into the install flow

- Update `packages/dbui/install.md` "After install — files inside the project" table to list `DBUI_DESIGN.md` as the primary visual / behavior reference (above `CLAUDE.md`, which becomes the operational ruleset).
- Keep `CLAUDE.md` focused on **rules + reference index**, not visual narrative.
- The two files now have non-overlapping jobs: `DBUI_DESIGN.md` = *what to make*; `CLAUDE.md` = *how to make it correctly*.

### Phase 4 — Storybook portal mention (low priority)

`dbuidesign.vercel.app` already redirects `/install`. Optionally add a `/design` redirect to `DBUI_DESIGN.md` so the visual-narrative file is also one-URL-fetchable. Single line in `vercel.json` if desired.

---

## 10 · Appendix

- Inventory TSV: `/tmp/design-md-inventory.tsv` (29 columns × 149 rows)
- Section corpora: `/tmp/corpus_visual_theme.txt`, `/tmp/corpus_color.txt`, `/tmp/corpus_typography.txt`, `/tmp/corpus_donts.txt`, `/tmp/corpus_agent_guide.txt`
- Category × section matrix: `/tmp/corpus_data.json`
- Open Design source: `/Users/mudit.mittal/open-design/design-systems/`

---

**Previous version of this report (sampled 10–12 files) is superseded.** The HTML companion at `research/2026-05-13-design-md-corpus-study.html` contains the same content with visual charts and a navigable table of contents.