#!/usr/bin/env node
/**
 * agent-ds-explorer.mjs
 * Builds a single self-contained HTML page that lets you read what each of the
 * 20 cohort systems defines for each of the 9 sections, with a Databricks
 * recommendation preselected at the top of every category.
 *
 * Master-detail card per category (mirrors the Databricks catalog asset card):
 *   - header: category name + one-line "what they define"
 *   - left rail: Databricks (preselected) then the 20 systems
 *   - right panel: the selected item's actual section content
 *
 * Output: research/agent-design-standards/explorer.html (open in any browser)
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SECT = path.join(ROOT, "research/agent-design-standards/data/sections")
const PROD = path.join(ROOT, "research/agent-design-standards/data/product-systems")
const OUT = path.join(ROOT, "research/agent-design-standards/explorer.html")

// Only these 5 marketing systems remain (aesthetic reference).
const MARKETING = ["claude", "cursor", "linear", "vercel", "notion"]
// Enterprise product-baseline systems (the right reference for product UI).
const PRODUCT_KEYS = ["ads", "carbon", "spectrum", "primer"]
// Best-in-class component libraries (the agent-native distribution reference).
const LIBRARY_KEYS = ["shadcn", "mui", "chakra"]

// Section order + human labels + "what they define" subtitle.
// 13 sections: added Iconography, Data Visualization, Content, Accessibility.
const CATEGORIES = [
  ["overview",   "Overview / Theme",   "The 1–3 sentence atmosphere: canvas, the one signature move, brand personality."],
  ["colors",     "Color",              "Role-based palette (not raw swatches) + the single reserved chromatic accent."],
  ["typography", "Typography",         "Named type scale — families, sizes, weights, casing, letter-spacing."],
  ["layout",     "Layout & Spacing",   "Spacing scale, grid, density, and app-shell composition."],
  ["depth",      "Depth & Elevation",  "Shadow tokens, hairline usage, and layering strategy."],
  ["shapes",     "Shape & Radius",     "Radius scale, per-component radius assignment, and pill usage."],
  ["iconography","Iconography",        "Icon set, semantic categories, sizing, and selection rules."],
  ["components", "Components",          "Token-referenced component specs + the full state matrix."],
  ["dataviz",    "Data Visualization", "Chart types, categorical/sequential palettes, axes & labels, table-vs-chart."],
  ["content",    "Content: Voice & Tone","Voice, tone, casing, terminology, microcopy templates, message design."],
  ["accessibility","Accessibility",    "WCAG target, contrast in both modes, focus, keyboard, ARIA, reduced motion."],
  ["dosdonts",   "Do's & Don'ts",      "The prescriptive, token-referenced hard-rule block (linter backbone)."],
  ["agent",      "Agent Guidance",     "How agents consume the system: docs, MCP/llms.txt, skills, iteration, gaps."],
]

// Databricks recommendation per category (Markdown). GROUNDED IN THE ACTUAL
// DBUI CODEBASE — tokens/globals.css, brandvoice.md, composition.md,
// component-rules.md, CLAUDE.md, component-index.md — not invented.
// STRONG = already defined in code · GAP = genuinely missing.
const DBX = {
  overview: `### Overview

DBUI is the Databricks product design system — a shadcn base reskinned with **DuBois** tokens. It ships as two packages: \`dbui\` (components, icons, tokens) and \`dbui-shells\` (page shells). Every product page starts from the \`<Base>\` shell, so the platform header, nav, content surface, and assistant panel are consistent by construction.

The canvas is a **dual-mode enterprise surface** built for information density: 13px base type, a single blue chroma (DuBois \`--primary\`), and hairline separation over heavy shadow. Real product UI — catalogs, tables, notebooks, lineage — is the protagonist; chrome stays quiet so data can lead. Every semantic role resolves in both light and dark with no visual drift.

### Personality
Fixed on four axes (\`brandvoice.md\`): **Serious 4/5 · Neutral-casual 3 · Respectful 2 · Matter-of-fact 4**. People make load-bearing decisions in this product — the voice and visuals stay calm, precise, and never playful.

### Key characteristics
- **Dual-mode by default** — every token is defined in both \`:root\` and \`.dark\`; neither mode is primary.
- **One chroma** — DuBois blue \`--primary\` is the only accent; everything else is neutral or status.
- **Dense, not cramped** — 13px/20px base type and an 8px spacing rhythm tuned for tables and trees.
- **Shell-first** — all pages compose from \`<Base>\`; five named product shells cover the common layouts.
- **Hairline hierarchy** — borders and surface steps carry structure; shadow is reserved for true overlays.
- **Component-complete** — ~60 components with a full state matrix, mirrored in Figma via 56 Code Connect files.

### Known gaps
- No written principles/personality narrative chapter yet — the atmosphere above is the one thing to ratify; the sections below are already defined in code.`,

  colors: `### Colors
> Source: \`packages/dbui/src/tokens/globals.css\` — ~57 semantic role tokens, each defined in both light (\`:root\`) and dark (\`.dark\`).

### Brand & Accent
- **Primary** (\`--primary\` / \`bg-primary\`): the only brand chroma — actions, selection, focus. #2272B4 (light) / #4299E0 (dark).
- **Primary foreground** (\`--primary-foreground\`): text/icon on primary fills. #FFFFFF both modes.
- **Ring** (\`--ring\`): focus indicator; tracks primary. #2272B4 / #4299E0.
- **Accent** (\`--accent\` / \`bg-accent\`): selected / active row + nav background. #D7EDFE (light) / #04355D (dark).

### Surface
- **Background** (\`--background\`): page canvas. #FFFFFF / #0F0F0F.
- **Card / Popover** (\`--card\`, \`--popover\`): raised container fills.
- **Muted** (\`--muted\` / \`bg-muted\`): platform header, table header, selected-row rest.
- **Border** (\`--border\`): decorative hairlines and dividers. #EBEBEB / #2A2A2A.
- **Input** (\`--input\`): form-control borders, darker than \`--border\`. #CBCBCB / #3A3A3A.

### Text
- **Foreground** (\`--foreground\` / \`text-foreground\`): primary text. #161616 / #F2F2F2.
- **Muted foreground** (\`--muted-foreground\`): secondary text, placeholders, captions.
- Every surface has a paired \`-foreground\` — never place text on a surface without its companion.

### Interactive states
- **Hover** (\`--hover\` / \`bg-hover\`): non-filled hover — \`--primary\` @ 8%.
- **Press** (\`--press\` / \`bg-press\`): non-filled press — \`--primary\` @ 16%.
- **Filled controls** darken explicitly instead: \`--primary-hover\` / \`--primary-press\`, \`--destructive-hover\` / \`--destructive-press\` (alpha can't darken a fill).
- **Disabled** (\`--disabled\`, \`--disabled-foreground\`): \`pointer-events-none\`, no shadow.

### Semantic status
- **Destructive** (\`--destructive\`): errors, delete. #C82D4C.
- **Warning** (\`--warning\`): caution. #BE501E.
- **Success** (\`--success\`): confirmation. #277C43.
- Each pairs with a tinted surface: \`--surface-info\`, \`--surface-success\`, \`--surface-warning\`, \`--surface-danger\`.

### Charts
- **Categorical** (\`--chart-1\`…\`--chart-5\`): #4299E0 · #3BA65E · #DE7921 · #8A63BF · #C83243 — mode-stable so series identity holds across themes.

### Principles
- Blue **is** primary — a deliberate divergence from the near-black-primary + separate-accent pattern common elsewhere.
- Never hardcode hex in components; only semantic tokens.
- Compose states by opacity (hover/press) except on filled controls.

### Known gaps
- Docs elsewhere say "47 semantic colors"; the CSS defines ~57 — reconcile the count.`,

  typography: `### Typography
> Source: \`globals.css\` + \`component-rules.md\`.

### Font family
- **SF Pro Text** — body, labels, controls.
- **SF Pro Display** — headings (Title 1–4).
- **SF Mono** — code, IDs, tokens.

Base size is **13px / 20px** — denser than a 16px marketing base, correct for a data application.

### Hierarchy
| Style | Size | Line height | Weight | Use |
|---|---|---|---|---|
| Title 1 | 32px | 40px | 600 | Large page headings |
| Title 2 | 22px | 28px | 600 | Page headings |
| Title 3 | 18px | 24px | 600 | Section headings |
| Title 4 | 13px | 20px | 600 | Small headings |
| Bold | 13px | 20px | 600 | Labels, emphasis |
| Paragraph | 13px | 20px | 400 | Default body, input values |
| Code | 13px | 20px | 400 | Code (SF Mono) |
| Hint | 12px | 16px | 400 | Captions, helper text |

### Principles
- **Two weights only:** 400 body · 600 labels + headings.
- **Sentence case everywhere** (brand names + acronyms excepted).
- **Tailwind overrides:** \`text-sm\` → 13px · \`text-xs\` → 12px · \`font-medium\` → 600.

### Known gaps
- The ~19 typography variables aren't all exposed as CSS custom properties yet — some live only as Tailwind classes.`,

  layout: `### Layout
> Source: \`composition.md\`, \`component-rules.md\`, \`layout-rules.ts\`.

### Spacing rhythm
- **Within a component:** \`gap-2\` (8px).
- **Between page sections:** \`gap-4\` (16px).
- **Dense blocks:** \`gap-6\` (24px).
- **Page padding:** header \`px-4 py-3\` · body \`px-6 py-4\`.

### App shell (\`<Base>\`)
| Region | Size | Notes |
|---|---|---|
| Platform header | 48px | \`bg-muted\` |
| Platform nav | 180px | collapses to 48px ≤1280px |
| Assistant panel | 360px | Genie side panel |
| Tree rail | 260px | explorer shells |
| Detail sidebar | 280px | asset-detail shell |

Content surface is \`rounded-md\` with a 1px border.

### Named product shells
List · Data Tree + Detail · File Tree + List · Editor · Asset Detail — cover the common product layouts; pages pick one rather than composing chrome by hand.

### Tables
- Header row \`h-10\`, cells \`px-2\`, semibold.
- Body cells \`p-2\`.
- Row hover \`bg-muted/50\`, selected \`bg-muted\`.

### Known gaps
- No compact/comfortable **density API** yet.
- Spacing scale lives as Tailwind classes, not \`--spacing-*\` custom properties.`,

  depth: `### Elevation & Depth

DBUI is flat-and-hairline first; shadow signals a true overlay, not decoration.

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Body content |
| 1 (hairline) | 1px border / ring, no drop | Cards, table containers |
| 2 (control) | \`shadow-xs\` — \`0 1px 0 rgba(0,0,0,.05)\` | Inputs, selects, buttons |
| 3 (overlay) | \`shadow-md\` + \`ring-1 ring-foreground/10\` | Popovers, dropdowns, menus |
| 4 (dialog) | \`shadow-lg\` + ring | Modals, dialogs |

In dark mode, elevation reads through surface luminance steps, not larger shadows.

### Focus
- **Token:** \`--shadow-focus\` — \`0 0 0 1px white, 0 0 0 3px var(--ring)\`.
- **Text inputs:** \`border-ring\` only (1px), no ring shadow.
- **Filled buttons:** \`shadow-focus\`.
- **Non-filled buttons:** \`border-2 border-ring\`.
- **Danger controls:** focus is blue (\`--ring\`), never red.

### Known gaps
- \`shadow-xs\`…\`shadow-lg\` live as Tailwind utilities/prose; only \`--shadow-focus\` is a real token.`,

  shapes: `### Shapes
> Source: \`globals.css\` radius scale + \`CLAUDE.md\` assignment.

### Radius scale
| Token | Value | Use |
|---|---|---|
| \`--radius-sm\` | 4px | Buttons, inputs, selects, menu items |
| \`--radius-md\` | 8px | Popups, dialogs, dropdowns, alerts |
| \`--radius-lg\` | 12px | — |
| \`--radius-xl\` | 16px | Cards |
| \`--radius-2xl\` | 24px | Large containers |
| \`--radius-3xl\` | 999px | Badges, pills, avatars |

### Assignment
- **Controls** (buttons, inputs, menu items): \`rounded-sm\`.
- **Overlays** (popups, dialogs, dropdowns): \`rounded-md\`.
- **Cards:** \`rounded-xl\`.
- **Badges / pills:** \`rounded-full\`.

### Principles
- Rectangle controls, pill badges — never pill-round a button.

### Known gaps
- Doc drift: some copy says \`--radius-2xl\` = 999; the CSS defines \`--radius-3xl\` = 999 and \`--radius-2xl\` = 24.`,

  components: `### Components
> Source: \`component-index.md\`, \`composition-rules.ts\`, \`layout-rules.ts\`, component source.

~60 components across 10 categories, each mirrored in Figma via **56 Code Connect** files.

### State matrix
Every component defines: **Default · Hover · Press · Focus · Disabled · Loading.**

### Button
- **Variants:** \`default\` · \`outline\` · \`secondary\` · \`ghost\` · \`link\` · \`destructive\` · \`danger\` (bordered red, distinct from filled destructive).
- **Sizes:** \`sm\` 24px · \`md\` 32px · \`icon-sm\` · \`icon-md\`.
- Icon-only buttons require an \`aria-label\`.

### Menus & popups
- Align \`start\`, width \`w-(--anchor-width)\`, \`sideOffset: 4\`; flip to end only when space is tight.

### Status
- 12 states (online, running, error, …) with paired icon + color.

### Validation
- Border-only at rest: \`aria-invalid\` → destructive; \`data-validation="warning|success"\`. No ring or shadow change.

### Principles
- Compose from DBUI components; use the Base UI \`render\` prop, not \`asChild\`.`,

  dosdonts: `### Do's and Don'ts

### Do
- Build UI from DBUI components.
- Use DBUI icons, chosen via \`icon-index.md\`.
- Use semantic tokens for every color.
- Start every page from the \`<Base>\` shell.
- Use \`DataTreeView\` / \`FileTreeView\` for trees.
- Type at \`text-[13px]\`; label with \`font-semibold\`.
- Give icon-only buttons an \`aria-label\`.
- Write button labels verb-first (\`Delete\`, not \`OK\`).

### Don't
- Don't use raw \`<button>\` / \`<input>\` / \`<dialog>\`.
- Don't use lucide / heroicons or other icon sets.
- Don't hardcode hex / rgb / oklch.
- Don't build trees from nested \`<div>\`s.
- Don't use \`text-sm\` / \`font-medium\`.
- Don't use the Base UI \`asChild\` prop (use \`render\`).
- Don't use emoji, exclamation marks, or banned words.
- Don't pill-round buttons.

### Known gaps
- These rules are scattered across \`CLAUDE.md\`, \`component-rules.md\`, and \`brandvoice.md\`; the \`dbui-validate\` skill checks several. Consolidating them into one token-referenced block is the backbone for the step-10 linter (Atlassian ships this as an ESLint plugin).`,

  agent: `### Agent Guidance

### Discovery layer
- \`component-index.md\`, \`icon-index.md\`, \`composition.md\`, \`brandvoice.md\`, \`component-rules.md\`.
- Per-component \`@guideline\` / \`@constraint\` JSDoc.

### Skills
- \`dbui-pick-component\` · \`dbui-pick-icon\` · \`dbui-validate\` · \`dbui-build-screen\`.

### Machine-readable rules
- \`composition-rules.ts\`, \`layout-rules.ts\`; a Figma → Code → Code Connect → Portal → Docs sanity-check workflow; installable via \`install.md\`.

### Reference peers
- **Enterprise product:** Atlassian ADS (\`llms.txt\` + hosted MCP + ESLint plugins + Code Connect), IBM Carbon (\`carbon-mcp\`), Adobe Spectrum (MCP + agent skills + DTCG tokens + normative spec), GitHub Primer (DTCG tokens + a11y ESLint plugins).
- **Distribution model:** shadcn/ui — first-party MCP + \`llms.txt\` + registry. DBUI already is a shadcn-spec registry, so shipping these on top is a short hop.

### Known gaps
- DBUI has the content but not yet the distribution these peers ship: a public \`llms.txt\`, an MCP server, and DTCG-conformant tokens. Highest-leverage next move.`,

  iconography: `### Iconography
> Source: \`packages/dbui/src/components/icons\` (456 icons), \`icon-index.md\`, \`entity-icons.ts\`.

### The set
- **456 icons**, one PascalCase file each, named after DuBois.
- Default render **16×16** (\`size-4\`); mapped to Figma via \`icons.figma.tsx\` Code Connect.

### Semantic categories
Every icon carries a \`use:\` tag in its JSDoc.
| Category | Count | Use in |
|---|---|---|
| object | 152 | Nav, table cells, cards, tree nodes |
| action | 226 | Buttons, toolbar, menu items |
| indicator | 51 | Status badges, alert icons |
| component | 21 | Control chrome only (chevrons, checks, close) |

### Selection rules
- **Search \`icon-index.md\` first — never guess a name.**
- \`entity-icons.ts\` maps entities → icons (catalog → Catalog, schema → Database, table → Table).
- Watch known confusions: Beaker = Experiments, SparkleDouble = Genie, Cloud = Compute.
- Never use a \`component\` icon outside its control; never use an \`action\` icon to represent an object.

### Known gaps
- Icon **search** isn't exposed to agents over MCP the way ADS/Spectrum expose theirs — a delivery gap, not a content gap.`,

  dataviz: `### Data Visualization
> The least-defined section today — and, for a data platform, the biggest opportunity to lead.

### Categorical palette
- \`--chart-1\`…\`--chart-5\`: #4299E0 · #3BA65E · #DE7921 · #8A63BF · #C83243 — mode-stable across light/dark.

### Defined today
- A thin \`Chart\` wrapper over Recharts (currently deprioritized).

### Known gaps
- No chart-type selection guidance.
- No **sequential / diverging** scales (distinct from UI color).
- No axis / label typography spec.
- No table-vs-chart guidance for dense data.
- No chart accessibility rules.

### Proposed direction
Adopt a Carbon-style data-viz chapter: chart-type selection, categorical + sequential + diverging palettes kept separate from UI color, axis/label type, and table-vs-chart rules — central to catalogs, lineage, and dashboards.`,

  content: "", // Content: Voice & Tone — promoted from DBX_PROPOSED after it's defined (see below)

  accessibility: `### Accessibility

### Requirements defined today
- Icon-only buttons require an \`aria-label\`.
- Alerts carry an icon (severity is never color-only).
- \`--border-accessible\` token for stronger separation where needed.
- \`NativeSelect\` provided for accessibility-first selection.
- Base UI primitives supply keyboard behavior; buttons set \`aria-busy\` / \`aria-disabled\`.

### Focus model
- Text inputs: \`border-ring\` (1px).
- Filled buttons: \`shadow-focus\`.
- Non-filled buttons: \`border-2 border-ring\`.

### Known gaps
- No stated WCAG target, contrast tables, keyboard-interaction matrix, ARIA authoring guide, or reduced-motion policy.

### Proposed target
WCAG **2.2 AA** — **4.5:1** text / **3:1** large text + UI, verified in **both** modes — plus a focus-visible standard, a keyboard matrix, and a \`prefers-reduced-motion\` policy. Model the delivery on ADS (a dedicated a11y doc) and Spectrum (contrast as token context).`,
}

// Research & evidence panels — shown as a sub-tab on the Databricks item for a
// given category. Keyed by category. Lets us surface findings + evidence BEFORE
// changing the live recommendation. Filled from the voice-research agents.
const DBX_RESEARCH = {
  content: `### Research & evidence — Docs-aligned Voice & Tone
> Method: **119 unique \`docs.databricks.com\` pages** read across 4 areas (get-started/notebooks/dashboards/Genie · data engineering · SQL + AI/ML · governance/security/admin) + a depth study of **Adobe Spectrum, IBM Carbon, and Material 3** content guidelines. Every convention below is backed by a real page; quotes are verbatim. Raw findings: \`research/agent-design-standards/data/voice-research/\`.

### Is there a Docs style guide to align to?
- **No public Databricks documentation style guide exists.** Indirect evidence of an internal one: a Staff Technical Writer posting ("maintaining a consistent voice, a clear and engaging tone") and a former-writer account ("requires active voice… prohibits promise-making… sometimes future tense").
- But the live docs are **highly self-consistent across all four areas**, so the conventions below are safe to codify as the Docs house style.
- **Update — authoritative internal sources now located** (via internal LLM workspace search): the Confluence \`docstyle\` space, the internal brand-voice prompt (\`/Shared/suhas-kashyap/claude.md\`), and an internal *Elements of Style*. Their key rules are folded into the **Proposed (Product UI)** tab. **All three \`docstyle\` pages are now extracted and reconciled** into the Proposed tab: *images/alt-text* (alt text = 70–155 chars), *Voice, tone, and audience* (no please/thank-you; ableist/violent/exclusionary bans; ISO-8601; no semicolons), and *UI text guidance* / go/uitext (the primary product-UI source — sentence case; **AP no-serial comma**; feature-name casing; tooltip rules). go/uitext corrected two of my inferences: Oxford comma and exclamation points.

### What the Docs site actually does
| Dimension | Convention | Evidence (verbatim + path) |
|---|---|---|
| Person | 2nd-person "you"; company is 3rd-person "Databricks", never "we" | "Databricks recommends using volumes…" — \`/getting-started/concepts\` |
| Tense / mood | Present tense; imperative steps; future avoided (no promises) | "A blank notebook opens in the workspace." — \`/getting-started/quick-start\` |
| Voice | Active dominates; passive only in reference definitions | "User identities are represented by email addresses." — \`/getting-started/concepts\` |
| Capitalization | **Sentence case** titles + headings | "Remove unused data files with vacuum" — \`/delta/vacuum\` |
| — product names | **Title Case** | "Unity Catalog is a unified governance solution…" — \`/getting-started/concepts\` |
| — generic concepts | **lowercase** | notebook, workspace, compute, cluster, lakehouse |
| — permissions/privileges | **ALL CAPS** | "CAN READ, CAN EDIT, CAN MANAGE" — \`/notebooks/notebooks-collaborate\` |
| Procedures | "To <goal>, <imperative>…" + numbered steps | "To create a notebook…, click New in the sidebar…" — \`/getting-started/quick-start\` |
| Admonitions | lowercase \`note\`/\`tip\`/\`important\`/\`warning\` + \`preview\`/\`beta\` | "This feature is in Public Preview." — \`/workspace/workspace-browser/\` |
| UI references | Bold exact label; menu paths joined by \` > \` | "Select Edit > Format cell(s)." — \`/notebooks/notebooks-code\` |
| Code | Backticks for every identifier/command/path; language-tagged blocks | "the \`WRITE VOLUME\` privilege on a volume" — \`/getting-started/import-visualize-data\` |
| Links | "See <page title>." / "For more information, see …" (never "click here") | "For more information, see VPC peering." — \`/repos/get-access-tokens…\` |
| Oxford comma | Used consistently | "notebooks, libraries, dashboards, and experiments" — \`/getting-started/concepts\` |
| Numerals | Digits by default in technical/UI context | "view 100 rows of data" · "up to 10,000 conversations" — \`/genie/set-up\` |
| Emoji / "!" | None in the entire 119-page sample | — |
| Tone | Task-oriented, neutral; cautionary on security | "You are solely responsible for ensuring your own compliance…" — \`/security/privacy/security-profile\` |

### Tensions the standard must resolve
- **Terminology mid-rebrand** — Delta Live Tables/DLT → "**Lakeflow pipelines** / Spark Declarative Pipelines"; Vector Search → "**AI Search**"; Repos → **Git folders**; Genie Spaces → **Genie Agents**. → needs a living term list.
- **Marketing creep on newer AI pages** — superlatives + social-proof metrics ("over **30 million monthly downloads**", "**25K queries per second**", "state-of-the-art") vs. dry reference pages. → ban this register in product UI.
- **Numeral inconsistency** — "two days" vs "7 days"; "10,000" vs "10000" on one page. → pick one rule.
- **Contraction register mixes** within a single page ("there is no need" beside "don't need"). → pick one register.

### Peer depth benchmark — what "complete" looks like
All of Spectrum, Carbon, and Material define the same **11 building blocks**:
| Block | Spectrum | Carbon | Material 3 |
|---|:--:|:--:|:--:|
| Named voice pillars | ✅ 3 | ✅ IBM 9 traits | ✅ principles + descriptors |
| Voice-vs-tone distinction | ✅ | ✅ | ✅ |
| **Tone model that flexes by context/emotion** | ✅ 5-point spectrum (+frequency) | ✅ by journey phase | ✅ **tone-map grid** (axes × message types) |
| Capitalization = sentence case | ✅ | ✅ | ✅ |
| Grammar & mechanics | ✅ | ✅ | ✅ |
| Base external style | ✅ AP | ✅ IBM Style | ✅ AP |
| **Terminology / word list** (preferred vs avoid) | ✅ In-product word list | ✅ Action labels A–Z | ✅ content matrix |
| UI-text patterns (errors/onboarding/notifications) | ✅ | ✅ | ✅ |
| Accessibility writing (alt text, visible vs non-visible) | ✅ | ✅ | ✅ |
| Inclusive language | ✅ | ✅ | ✅ |
| Localization / global writing | ✅ | ✅ | ✅ |

**Standouts to match:** a **tone model by context** (Spectrum: Motivational→Helpful→Instructive→Reassuring→Supportive, each with a frequency; Material: pick 2 tone axes, plot onboarding/confirmation/error/empty-state) + a **preferred/avoid word list** (Carbon's Action labels A–Z is the exemplar).

### Where DBUI stands today
- **Have** (\`brandvoice.md\`): fixed tone axes, sentence case, no emoji/no "!", banned words, a numbers rule, and microcopy templates (buttons, empty states, errors, toasts, tooltips, labels).
- **Missing vs Docs + peers:** named **voice pillars**; explicit **voice-vs-tone**; a **context/emotion tone model**; the **product-name casing rule**; a **terminology/word list**; the company-voice "**Databricks recommends…**" pattern; **accessibility writing** (alt text, visible vs non-visible); **inclusive-language** guidance; **localization/global writing**.
- **Direct conflict to settle:** \`brandvoice.md\` says "spell 0–9", but the Docs (and Carbon/Material) use **digits** in UI/technical contexts.

### Proposed structure (now applied as the recommendation)
1. **Voice pillars** — 3–4 named, derived from the existing tone axes (Serious · Matter-of-fact · Respectful).
2. **Voice vs tone + a Databricks tone-by-context map** — onboarding · confirmation · empty state · error · destructive · notification.
3. **Capitalization** — sentence case + the product-name rule (branded = Title Case · generic = lowercase · permissions = ALL CAPS).
4. **Grammar & mechanics** — person ("you"; company = "Databricks", not "we"), present tense/active voice, contraction register, Oxford comma, **numerals = digits**, no emoji / no "!".
5. **Company voice** — the "Databricks recommends…" pattern for guidance/recommendations.
6. **Terminology / word list** — preferred vs avoid + current renames (Lakeflow, AI Search, Git folders, Genie Agents); verb-first button labels.
7. **Anti-marketing rule** — no superlatives or social-proof metrics in product UI.
8. **UI-text patterns** — keep + expand the existing templates.
9. **Accessibility writing** — alt text (≤125 chars, no "image of"), visible vs non-visible text, clear errors.
10. **Inclusive language** — people-first, bias-free.
11. **Localization / global writing** — translation-friendly, avoid idioms, spell out "and" where space allows.

### Decisions I need from you
- **Numerals:** switch to **digits for all numerals** in UI (matches Docs + Carbon + Material), overriding brandvoice's "spell 0–9"? *(recommend: yes)*
- **Contractions:** allow in product UI (Docs + all three peers do)? *(recommend: yes)*
- **Tone model:** adopt a context tone-map (Material-style)? *(recommend: yes)*
- **Word list:** start a preferred/avoid + product-name term list now? *(recommend: yes)*`,
}

// Proposed Product-UI Voice & Tone (draft for review — not the live rec).
const DBX_PROPOSED = {
  content: `### Product UI — Voice & Tone
> **Scope:** copy inside the product UI — nav, titles, buttons, descriptions, tooltips, modals, empty states, errors. Distinct from the Docs voice (Docs explains concepts; the UI helps users act). Grounded in **go/uitext + go/docterms + the docstyle pages**, reconciled with peers (Spectrum · Carbon · Material).

### Voice principles — the constant
> **Product-UI voice** (go/uitext): "professional, authoritative, and concise, but human and approachable" — human isn't overly polite, approachable isn't slangy. (Broader brand voice: go/docstyleguide + \`claude.md\`.)

| # | Principle | Meaning | Example |
|---|---|---|---|
| 1 | Clear over clever | Plain, precise words | **Do:** "Query sample data"<br>**Don't:** "Unleash insights" |
| 2 | Direct & task-first | Lead with the action or outcome | **Do:** "Create warehouse"<br>**Don't:** "Here you can create a warehouse" |
| 3 | Honest, not hype | State what's true, including limits | **Do:** "Runs on serverless compute"<br>**Don't:** "Blazing-fast compute" |
| 4 | Smart but approachable | Assume competence; explain the new, not the obvious | **Do:** "Deleting removes all child objects"<br>**Don't:** "Oops, careful!" |

### Voice vs. tone
> **Voice** is what we always sound like (the four principles). **Tone** is how that voice flexes to the user's moment and stakes — warm, neutral, or cautious.

### Tone scale
| # | Tone | Guidance | Example |
|---|---|---|---|
| 1 | Warm | Brief encouragement at first-run, empty, and success moments | **Do:** "Create your first query to explore your data"<br>**Don't:** "Welcome! 🎉 Unlock your data" |
| 2 | Neutral | The default — instructive, direct, matter-of-fact | **Do:** "Genie answers questions about your data"<br>**Don't:** "Genie is a powerful AI experience" |
| 3 | Cautious | Firm and precise for errors, destructive, and security actions | **Do:** "Deleting this catalog can't be undone"<br>**Don't:** "Are you sure?" |

### UX moments
| Moment | Tone | Guidance | Example |
|---|---|---|---|
| Navigation label | Neutral | Noun, 1–2 words, matches the destination | "SQL warehouses" |
| Page title | Neutral | Names the object or task, no end punctuation | "Create a metastore" |
| CTA / button | Neutral | Verb + object, specific | "Add data" |
| Description copy | Neutral | What it is + what it's for, ≤2 sentences | "Genie answers questions about your data in natural language." |
| Tooltip | Neutral | Add info beyond the label (don't repeat it); be brief; end with a "Learn more" link, no period | "Serverless compute starts in seconds. Learn more" |
| Empty state | Warm | State it's empty + one next step | "No queries yet. Create a query to get started." |
| Onboarding modal | Warm | Value in the title, one primary action | "Query data with Genie" → "Try Genie" |
| Success toast | Warm | Factual and brief | "Table created." |
| Error | Cautious | Specific + actionable + name the error class when one exists (the internal "Group 3 = good" bar) | "Can't cast 'abc' to a number (\`CAST_INVALID_INPUT\`). Fix the value or the column type." |
| Destructive action | Cautious | State the exact, irreversible consequence | "Permanently removes all schemas, tables, and volumes. This can't be undone." |
| Security / governance | Cautious | Make scope and responsibility explicit | "Granting ALL PRIVILEGES lets this group read, modify, and delete every table." |

### Terminology — use X, not Y
> Source of truth: **go/docterms** (the Databricks A–Z word list, ~200 entries). Highlights below; the full list governs. Use the terms customers use — industry-standard, not redefined or misused.

**UI actions (verbs)**
| Use | Not | Why |
|---|---|---|
| click (menus, buttons, links) | click on · choose · select | one verb for one interaction |
| select / clear (checkboxes, multiselect) | toggle · check/uncheck · mark/unmark | ambiguous otherwise |
| enter | type · input | "enter" = type or add data |
| press (keyboard keys) | hit | "hit" reads as violent |
| go to | proceed · navigate | simpler, easier to translate |
| enable · turn on · turn off | toggle *(as a verb)* | "toggle" is a noun/adjective only |
| run | execute | "execute" reads as violent |
| log in / log out | sign in · log on · log into | Databricks house style (go/docterms) — "sign in" only for cloud providers (AWS, Microsoft, Google) |

**UI element names (nouns)**
| Use | Not |
|---|---|
| sidebar | left nav · left navigation pane |
| dialog | dialog box · pop-up · pop-up window |
| drop-down menu / drop-down list | dropdown |
| pane | panel |
| checkbox | check box · box |
| kebab (⋮) · hamburger (☰) · meatballs (⋯) · bento (3×3) menus | three-dot menu *(first mention OK as alias)* |
| notebook · widget · tab · tile · breadcrumb · banner · alert · placeholder · username | *(all one word, lowercase)* |

**Plain words (clarity + localization)**
| Use | Not | Why |
|---|---|---|
| to | in order to · for the purpose of | wordy |
| because | as · since · due to the fact that | "as/since" are ambiguous, hard to translate |
| use | utilize · leverage | plainer |
| or | and/or | "and" is implied |
| and · in addition to | as well as | ambiguous |
| can · might | may | "may" implies permission |
| fewer | less | for countable things |
| must · we recommend | have to · need to · should | precise, translatable |
| verify · check | ensure · make sure · be sure | precise |
| in | within | simpler |
| *(remove)* | please · thank you · simply · generally · note that | unnecessary; can read as condescending |

**Marketing jargon — remove** *(describe what's actually new instead)*
> best-in-class · disruptive · revolutionary · innovative · seamless · effortless · futureproof · leading edge · paradigm shift · digital transformation · unlock · powerful · world-class · blazing-fast · unique · easy/easily · robust · delve into · multifaceted · "#1 / largest" · download counts · queries-per-second stats

**Inclusive / non-offensive** *(why: not inclusive — ableist, violent, or biased)*
| Use | Not |
|---|---|
| allowlist / denylist | whitelist / blacklist |
| primary / secondary · main | master / slave |
| built-in | native |
| breach | invade |
| not valid | invalid |
| perimeter network | DMZ · demilitarized zone |
| stop · cancel · end | kill · abort |
| stops responding · fails | hang |
| person · people · person-hours | man · mankind · man-hours |
| they / their / them | he/she · s/he |
| doesn't understand · ignore | blind to · dumb |
| complicated · complex | crazy · insane |
| final check for completeness | sanity check |

*Exception (all): keep a banned term only when it's in UI text, an error, or code you can't change — then work with eng/design to fix it.*

**Product & feature names** *(respect current names; renames are active)*
| Use | Not |
|---|---|
| Git folders (feature) · Git folder (asset) | Repos · Databricks Repos |
| Lakeflow Jobs (feature) · jobs (resource) | Workflows |
| Lakeflow Spark Declarative Pipelines / SDP (feature) · pipeline (resource) | Delta Live Tables · DLT |
| SQL warehouse | SQL endpoint |
| admin settings | admin console |
| the Databricks platform | Lakehouse Platform · lakehouse platform |
| AI/BI dashboards | Lakeview · legacy dashboards |
| repository | repo |
| username | user name |

> **Bridge branded ↔ industry terms:** when a branded name may confuse, use the branded name in the nav, the industry term on buttons/filters, and a tooltip to connect them (e.g., "Lakeflow Spark Declarative Pipelines" in nav, "pipeline" in the UI, tooltip bridging the two).

### Sentence casing
**Use sentence case for every UI string — page and dialog titles, field names, table columns, group labels, buttons, links, and instructional text. Capitalize only the first word. Never title case.**

Exceptions:
| Exception | Casing | Example |
|---|---|---|
| Branded product / feature names | Title case (match the official name) | Databricks Runtime · Delta Live Tables · Feature Store |
| Generic / industry terms — even for features | lowercase | notebook · workspace · cluster · job · namespace |
| Permission tokens | ALL CAPS | ALL PRIVILEGES · CAN MANAGE |
| Acronyms (common only) | As-is | SQL · API · ML |

- Capitalize a generic term only when it's the first or only word of a nav item, menu, or page/dialog title, or when you point to a UI element ("Click **Workspace**").
- Don't capitalize a resource the user creates or owns ("Create a notebook", "in your workspace").
- Spell out an unfamiliar acronym on first mention, then abbreviate.

### Grammar & mechanics
1. **Person** — "you" (or implied "you" in imperatives); the company is "Databricks", never "we". *(Tooltips may use "we recommend…" to save space.)*
2. **Tense & mood** — present tense, imperative; no future tense (except when comparing a future event to the present).
3. **Voice** — active (aim for >80% of copy).
4. **Verbs vs. nouns** — actions and buttons use verbs ("Create", "Run"); nav, titles, and labels use nouns ("Compute", "Queries").
5. **Plain & lean** — omit needless words; cut intensifiers ("very", "extremely"); positive form; 15–20 words per sentence.
6. **Consistent** — one term for one thing; if it's "foo" in one place, it's "foo" everywhere.
7. **Contractions** — use them freely ("don't", "can't").
8. **Numerals** — digits + thousands separators ("1,000 days", "8 hours").
9. **Steppers** — "Step 1:", not "Step 1.".
10. **Acronyms** — avoid unless common (SQL, XML, OK); spell out on first mention; no internal abbreviations ("Databricks Runtime", not "DBR"); no Latin ("e.g.", "i.e.", "etc.").
11. **No pedantic or pushy tone** — not "One must ensure…", not "you'll break everything".
12. **Punctuation** — US English; **no serial (Oxford) comma** (AP style — add only to avoid confusion); periods only for full sentences or clarity; **no exclamation points**; no emoji; avoid semicolons and parentheses (use em dashes); avoid "please" / "thank you".

### Accessibility (linter-checkable)
1. Alt text is **70–155 characters** (Databricks Docs standard), front-loads key terms, ends with a period, is unique (don't reuse it or match the file name), avoids all-caps, and never says "image of" / "photo of".
2. Icon-only controls have a non-empty \`aria-label\` that names the action.
3. Link and button text stands alone — ban "here", "click here", "read more", "learn more" as the entire label.
4. Text meets WCAG AA contrast (≥ 4.5:1 body, ≥ 3:1 large/UI text).
5. Use inclusive, non-offensive language — see the **Terminology → Inclusive** table; use singular "they".
6. Refer to UI elements by their label. If you must give a location, use "upper-left / lower-right / leftmost **<element>**" with the element name — never a bare direction (for screen readers and low-vision users).

### Localization / global audience (US English)
1. UI strings are whole — never concatenate fragments into a sentence at runtime (word order changes when translated).
2. Labels stay short — translated text runs ~30% longer; avoid fixed-width truncation.
3. Dates and times use **ISO 8601** (YYYY-MM-DD); avoid ambiguous formats.
4. **Avoid semicolons** (hard for ESL and localization) — use two sentences or a conjunction.
5. Avoid idioms, humor, and US-centric references (e.g., football, baseball).
6. Spell out "and"; reserve "&" for tight labels.
7. Keep meaningful text out of images and diagrams — it isn't localized; use adjacent copy or numbered callouts (2–8).
8. Format code-like terms (commands, parameters, filenames, product identifiers) as inline code so they aren't translated.

### Grounded in — internal sources
- **In-product UI text guide — go/uitext (aka go/text, go/uxwriting) ✔ primary source of truth**
- Voice/tone, inclusive language & global-audience — Docs style guide *Voice, tone, and audience* (go/docstyleguide) ✔
- Alt-text & image rules — Docs style guide *Images, graphics, diagrams, screenshots* (go/docstyleguide) ✔
- **Authoritative A–Z word list — go/docterms (full ~200-entry list) ✔ imported** · product/feature name lists · diagram templates (go/doc-diagrams)
- Brand voice — \`/Shared/suhas-kashyap/claude.md\`; writing standards — internal *Elements of Style*; error taxonomy — Serverless/Lakeflow grading
- **All three \`docstyle\` pages + go/docterms extracted & reconciled.** Decisions applied: **"log in / log out"** (Docs house style per go/docterms — "sign in" only for cloud providers); Oxford comma → **AP no-serial**; **exclamation points banned**; **"Enable" allowed** (ban "toggle" as a verb); "repository", not "repo".

### Decisions (resolved)
1. ✅ **"Log in / Log out"** — Docs team preference per go/docterms. Use "sign in" only for cloud providers (AWS/MS/Google).
2. ✅ **Adopt go/docterms** as the source-of-truth word list; the tables above are the product-UI overlay built on it.
3. ✅ **Tone scale = Warm / Neutral / Cautious.**
4. ✅ **Exclamation points banned.**

### Still open
- **Pipeline naming** — go/docterms says "Lakeflow Spark Declarative Pipelines / SDP"; the internal KB says "Lakeflow Pipelines". Which is current?`,
}

// Promote the finalized proposal into the live Content recommendation.
DBX.content = DBX_PROPOSED.content

// Product-baseline + component-library systems (authored from agent-facing docs).
const loadPS = (k) => JSON.parse(fs.readFileSync(path.join(PROD, k + ".json"), "utf8"))
const PRODUCT = PRODUCT_KEYS.map(loadPS)
const LIBRARY = LIBRARY_KEYS.map(loadPS)

// ---- load systems -----------------------------------------------------------
// Marketing cohort — reduced to the 5 aesthetic references.
const files = fs.readdirSync(SECT).filter((f) => f.endsWith(".json"))
const marketing = files
  .map((f) => JSON.parse(fs.readFileSync(path.join(SECT, f), "utf8")))
  .filter((d) => MARKETING.includes(d.key))
  .map((d) => ({
    key: d.key,
    display: d.display,
    category: d.category,
    descriptor: d.descriptor || "",
    mode: (d.tokens && d.tokens.mode) || "",
    tier: "marketing",
    sections: d.sections || {},
  }))
  .sort((a, b) => a.display.localeCompare(b.display))

// Enterprise product-baseline systems (ADS, Carbon, Spectrum, Primer).
const toEntry = (tier) => (d) => ({
  key: d.key,
  display: d.display,
  category: d.category,
  descriptor: d.descriptor || "",
  url: d.url || "",
  mode: d.mode || "",
  tier,
  sections: d.sections || {},
})
const product = PRODUCT.map(toEntry("product"))
// Best-in-class component libraries (shadcn/ui, MUI, Chakra UI).
const library = LIBRARY.map(toEntry("library"))

// dbxProposed retired: the finalized proposal is now the live DBX.content (Current recommendation).
const payload = { categories: CATEGORIES, dbx: DBX, dbxResearch: DBX_RESEARCH, dbxProposed: {}, product, library, marketing }

// short category chip label
const CATSHORT = {
  "AI & LLM Platforms": "AI/LLM",
  "Developer Tools & IDEs": "Dev Tools",
  "Backend, Database & DevOps": "Backend/Data",
  "Productivity & SaaS": "Productivity",
  "Design & Creative Tools": "Design",
  "Enterprise product": "Product DS",
  "Component library": "Library",
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Agent Design Standards — 20-System Explorer</title>
<style>
:root{
  --background:#ffffff; --foreground:#161616; --muted-foreground:#605e5c;
  --card:#ffffff; --border:#ebebeb; --input:#cbcbcb;
  --primary:#2272b4; --primary-foreground:#ffffff;
  --accent:#d7edfe; --accent-foreground:#0b4a7a; --hover:rgba(34,114,180,.08);
  --chip:#f2f2f0; --chip-fg:#44413f;
  --radius-sm:4px; --radius-md:8px; --radius-xl:16px;
  --shadow-card:0 2px 16px rgba(0,0,0,.08);
}
@media (prefers-color-scheme: dark){
  :root{
    --background:#0f0f0f; --foreground:#f2f2f2; --muted-foreground:#a3a3a3;
    --card:#161616; --border:#2a2a2a; --input:#3a3a3a;
    --accent:#12314c; --accent-foreground:#cfe6fb; --hover:rgba(66,153,224,.14);
    --chip:#242424; --chip-fg:#cfcfcf; --shadow-card:0 2px 16px rgba(0,0,0,.5);
  }
}
*{box-sizing:border-box}
body{margin:0;background:var(--background);color:var(--foreground);
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;
  font-size:13px;line-height:20px;}
.page{max-width:1120px;margin:0 auto;padding:32px 24px 96px;}
h1{font-size:22px;line-height:28px;font-weight:600;margin:0 0 4px;}
.sub{color:var(--muted-foreground);margin:0 0 8px;}
.toc{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0 28px;}
.toc a{font-size:12px;text-decoration:none;color:var(--accent-foreground);
  background:var(--accent);padding:3px 10px;border-radius:999px;}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;
  box-shadow:var(--shadow-card);margin:0 0 28px;overflow:hidden;}
.card-head{padding:16px 20px;border-bottom:1px solid var(--border);}
.card-head .t{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;}
.card-head .d{color:var(--muted-foreground);margin-top:2px;font-size:12px;}
.card-body{display:grid;grid-template-columns:300px 1fr;min-height:340px;}
.rail{border-right:1px solid var(--border);padding:8px;overflow:auto;max-height:560px;}
.rail-group{font-size:11px;text-transform:uppercase;letter-spacing:.04em;
  color:var(--muted-foreground);padding:8px 10px 4px;font-weight:600;}
.row{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--radius-sm);
  cursor:pointer;user-select:none;}
.row:hover{background:var(--hover);}
.row.active{background:var(--accent);}
.row .nm{font-weight:600;flex:0 0 auto;}
.row.active .nm{color:var(--accent-foreground);}
.row .chip{margin-left:auto;font-size:11px;color:var(--chip-fg);background:var(--chip);
  padding:1px 8px;border-radius:999px;white-space:nowrap;}
.row .chev{color:var(--muted-foreground);flex:0 0 auto;}
.row .dot{width:6px;height:6px;border-radius:999px;flex:0 0 auto;}
.dbx .nm{color:var(--primary);}
.detail{padding:20px 24px;overflow:auto;max-height:560px;}
.detail .dhead{display:flex;align-items:center;gap:8px;margin:0 0 4px;}
.detail .dhead .dt{font-size:15px;font-weight:600;}
.detail .dmeta{color:var(--muted-foreground);font-size:12px;margin:0 0 16px;}
.detail .dmeta a{color:var(--muted-foreground);}
.md h3{font-size:13px;font-weight:600;margin:18px 0 6px;}
.md h3:first-child{margin-top:0;}
.md p{margin:0 0 10px;}
.md ul{margin:0 0 10px;padding-left:18px;}
.md li{margin:2px 0;}
.md code{font-family:"SF Mono",ui-monospace,Menlo,monospace;font-size:12px;
  background:var(--chip);padding:1px 5px;border-radius:4px;}
.md strong{font-weight:600;}
.md blockquote{margin:0 0 12px;padding:6px 12px;border-left:3px solid var(--border);
  color:var(--muted-foreground);font-size:12px;background:var(--chip);border-radius:0 4px 4px 0;}
.md table{border-collapse:collapse;width:100%;margin:0 0 14px;font-size:12px;}
.md th,.md td{border:1px solid var(--border);padding:5px 9px;text-align:left;vertical-align:top;}
.md th{background:var(--chip);font-weight:600;white-space:nowrap;}
.md td code{background:transparent;padding:0;}
.badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;
  color:var(--primary);}
.tabs{display:flex;gap:4px;margin:0 0 16px;border-bottom:1px solid var(--border);}
.tab{appearance:none;background:none;border:none;cursor:pointer;font:inherit;
  font-size:12px;font-weight:600;color:var(--muted-foreground);padding:6px 10px;
  border-bottom:2px solid transparent;margin-bottom:-1px;}
.tab:hover{color:var(--foreground);}
.tab.active{color:var(--primary);border-bottom-color:var(--primary);}
.empty{color:var(--muted-foreground);font-style:italic;}
.legend{color:var(--muted-foreground);font-size:12px;margin:0 0 20px;}
</style>
</head>
<body>
<div class="page">
  <h1>Agent Design Standards — Explorer</h1>
  <p class="sub">Databricks recommendation (preselected), benchmarked against agent-first <strong>enterprise product</strong> systems, best-in-class <strong>component libraries</strong>, and a small set of marketing references — per section.</p>
  <p class="legend"><strong>Enterprise product</strong> systems (Atlassian ADS, IBM Carbon, Adobe Spectrum, GitHub Primer) are authored from their agent-facing docs (<code>llms.txt</code>, MCP, DTCG tokens, specs) — the right baseline for dense product UI. <strong>Component libraries</strong> (shadcn/ui, MUI, Chakra UI) are the agent-native distribution reference (MCP + registry + charts); shadcn is DBUI's own base. <strong>Marketing</strong> systems (5) are third-party site analyses — kept only as an aesthetic reference.</p>
  <div class="toc" id="toc"></div>
  <div id="cards"></div>
</div>
<script id="data" type="application/json">${JSON.stringify(payload).replace(/</g, "\\u003c")}</script>
<script>
const DATA = JSON.parse(document.getElementById("data").textContent);
const CATSHORT = ${JSON.stringify(CATSHORT)};

// tiny markdown renderer (headings ###, bold **, inline code, - lists, paragraphs)
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function inline(s){
  return esc(s)
    .replace(/&lt;br\\s*\\/?&gt;/g,"<br>")
    .replace(/\`([^\`]+)\`/g,"<code>$1</code>")
    .replace(/\\*\\*([^*]+)\\*\\*/g,"<strong>$1</strong>")
    .replace(/\\*([^*]+)\\*/g,"<em>$1</em>");
}
function md(src){
  if(!src||!String(src).trim()) return '<p class="empty">No content defined for this section in the source file.</p>';
  const lines=String(src).replace(/\\r/g,"").split("\\n");
  let out=[],inList=false,i=0;
  const closeList=()=>{if(inList){out.push("</ul>");inList=false;}};
  const isRow=(s)=>/^\\s*\\|.*\\|\\s*$/.test(s);
  const isSep=(s)=>/^\\s*\\|[\\s:|-]+\\|\\s*$/.test(s)&&s.includes("-");
  const cells=(s)=>s.trim().replace(/^\\|/,"").replace(/\\|$/,"").split("|").map(c=>c.trim());
  while(i<lines.length){
    const line=lines[i].replace(/\\s+$/,"");
    // GFM table: header row + separator row + body rows
    if(isRow(line)&&i+1<lines.length&&isSep(lines[i+1])){
      closeList();
      const head=cells(line);i+=2;const rows=[];
      while(i<lines.length&&isRow(lines[i])&&!isSep(lines[i])){rows.push(cells(lines[i]));i++;}
      let t='<table><thead><tr>'+head.map(h=>"<th>"+inline(h)+"</th>").join("")+"</tr></thead><tbody>";
      rows.forEach(r=>{t+="<tr>"+r.map(c=>"<td>"+inline(c)+"</td>").join("")+"</tr>";});
      t+="</tbody></table>";out.push(t);continue;
    }
    if(/^#{2,4}\\s+/.test(line)){closeList();out.push("<h3>"+inline(line.replace(/^#{2,4}\\s+/,""))+"</h3>");i++;continue;}
    if(/^>\\s?/.test(line)){closeList();out.push("<blockquote>"+inline(line.replace(/^>\\s?/,""))+"</blockquote>");i++;continue;}
    if(/^\\s*[-*]\\s+/.test(line)){if(!inList){out.push("<ul>");inList=true;}out.push("<li>"+inline(line.replace(/^\\s*[-*]\\s+/,""))+"</li>");i++;continue;}
    if(line.trim()===""){closeList();i++;continue;}
    closeList();out.push("<p>"+inline(line)+"</p>");i++;
  }
  closeList();
  return out.join("\\n");
}

const cards=document.getElementById("cards");
const toc=document.getElementById("toc");

DATA.categories.forEach(([key,label,subtitle],ci)=>{
  const a=document.createElement("a");a.href="#cat-"+key;a.textContent=label;toc.appendChild(a);

  const card=document.createElement("div");card.className="card";card.id="cat-"+key;
  card.innerHTML=\`
    <div class="card-head">
      <div class="t">🧩 \${label}</div>
      <div class="d">\${subtitle}</div>
    </div>
    <div class="card-body">
      <div class="rail"></div>
      <div class="detail"></div>
    </div>\`;
  const rail=card.querySelector(".rail");
  const detail=card.querySelector(".detail");

  const items=[];
  // Databricks first (preselected)
  items.push({dbx:true,group:"Databricks",display:"Databricks",category:"DBUI recommendation",content:DATA.dbx[key]||""});
  // Enterprise product systems next (the real baseline for product UI)
  DATA.product.forEach(s=>items.push({
    dbx:false,tier:"product",group:"Enterprise product systems",
    display:s.display,category:s.category,mode:s.mode,descriptor:s.descriptor,url:s.url,
    content:(s.sections&&s.sections[key])||""
  }));
  // Best-in-class component libraries (agent-native distribution reference)
  DATA.library.forEach(s=>items.push({
    dbx:false,tier:"library",group:"Component-library systems",
    display:s.display,category:s.category,mode:s.mode,descriptor:s.descriptor,url:s.url,
    content:(s.sections&&s.sections[key])||""
  }));
  // Marketing references last
  DATA.marketing.forEach(s=>items.push({
    dbx:false,tier:"marketing",group:"Marketing sites · aesthetic ref",
    display:s.display,category:s.category,mode:s.mode,descriptor:s.descriptor,
    content:(s.sections&&s.sections[key])||""
  }));

  function render(idx){
    [...rail.children].forEach(el=>{if(el.dataset&&el.dataset.idx!==undefined)el.classList.toggle("active",+el.dataset.idx===idx);});
    const it=items[idx];
    let meta;
    if(it.dbx){
      meta='<div class="dmeta">Proposed for DBUI · grounded in the actual codebase (globals.css, brandvoice.md, composition.md)</div>';
    }else{
      const link=it.url?' · <a href="'+esc(it.url)+'" target="_blank" rel="noopener">source ↗</a>':'';
      meta='<div class="dmeta">'+esc(it.category)+(it.mode?' · '+esc(it.mode):'')+(it.descriptor?' · '+esc(it.descriptor):'')+link+'</div>';
    }
    // Sub-tabs: only on the Databricks item, only where extra panels exist.
    const research=it.dbx?(DATA.dbxResearch&&DATA.dbxResearch[key]):null;
    const proposed=it.dbx?(DATA.dbxProposed&&DATA.dbxProposed[key]):null;
    const head='<div class="dhead"><span class="dt">'+esc(it.display)+'</span>'+(it.dbx?'<span class="badge">✔ recommended</span>':'')+'</div>';
    if(research||proposed){
      const panes=[{t:"rec",label:"Current recommendation",c:it.content}];
      if(proposed)panes.push({t:"prop",label:"Proposed (Product UI)",c:proposed});
      if(research)panes.push({t:"res",label:"Research &amp; evidence",c:research});
      detail.innerHTML=head+meta
        +'<div class="tabs">'
        +panes.map((p,i)=>'<button class="tab'+(i===0?' active':'')+'" data-t="'+p.t+'">'+p.label+'</button>').join('')
        +'</div>'
        +panes.map((p,i)=>'<div class="md tabpane" data-p="'+p.t+'"'+(i===0?'':' style="display:none"')+'>'+md(p.c)+'</div>').join('');
      const tabs=detail.querySelectorAll(".tab");
      tabs.forEach(btn=>btn.addEventListener("click",()=>{
        tabs.forEach(b=>b.classList.toggle("active",b===btn));
        detail.querySelectorAll(".tabpane").forEach(p=>{p.style.display=(p.dataset.p===btn.dataset.t)?"":"none";});
      }));
    }else{
      detail.innerHTML=head+meta+'<div class="md">'+md(it.content)+'</div>';
    }
  }

  // build rail rows with group headers
  let lastGroup=null;
  items.forEach((it,idx)=>{
    if(it.group!==lastGroup){
      const g=document.createElement("div");g.className="rail-group";g.textContent=it.group;rail.appendChild(g);
      lastGroup=it.group;
    }
    const row=document.createElement("div");
    row.className="row"+(it.dbx?" dbx":"");row.dataset.idx=idx;
    const chip=it.dbx?"recommended":(CATSHORT[it.category]||it.category);
    row.innerHTML='<span class="nm">'+esc(it.display)+'</span>'
      +'<span class="chip">'+esc(chip)+'</span>'
      +'<span class="chev">›</span>';
    row.addEventListener("click",()=>render(idx));
    rail.appendChild(row);
  });

  render(0);
  cards.appendChild(card);
});
</script>
</body>
</html>`

fs.writeFileSync(OUT, html)
const kb = (Buffer.byteLength(html) / 1024).toFixed(0)
console.log(
  `Wrote ${OUT} (${kb} KB) — ${product.length} product + ${library.length} library + ${marketing.length} marketing systems × ${CATEGORIES.length} categories`
)
