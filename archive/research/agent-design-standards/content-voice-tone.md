# Content: Voice & Tone — ⭐ Content-Led Section

> This section defines the *written-content* contract for Databricks product surfaces — the words, not the pixels. It's deliberately first-class: the 20 peer systems essentially ignore content (only ~2/20 define any real writing rules), so a strong, comprehensive content contract is one of DBUI's biggest best-in-class opportunities.
>
> Seeds marked **`[PROPOSED]`** are best-in-class starting drafts drawn from common Databricks/DuBois conventions — brand/content partners can refine later. Items marked **`[INPUT NEEDED]`** are the few that genuinely need a decision (e.g., the exact voice adjectives).
>
> Authored in the standard dual-audience template (Principle → Standards → Guidelines → Examples) so machine-checkable parts feed the design linter directly.

---

## 1. Voice attributes

**Principle.** Databricks' product voice is consistent across every surface, regardless of who wrote the copy.

- **`[INPUT NEEDED]`** — the 3–5 adjectives that define the voice.
  - `[PROPOSED]` candidates to react to: **Clear · Confident · Technical-but-human · Direct · Trustworthy** (no hype, no filler).
- **`[INPUT NEEDED]`** — one line each on what each attribute *means* and *does not* mean.

### Guidelines (may)
- Lead with the answer/action; avoid throat-clearing ("Great question!", "In order to…").
- Prefer plain verbs over jargon when both are accurate.

---

## 2. Tone by surface (the tone matrix)

**Principle.** Voice is constant; **tone flexes by context**. Same personality, different register.

| Surface | Tone | `[INPUT NEEDED]` guidance |
|---------|------|-----------------------------|
| Marketing / landing | `[PROPOSED]` confident, aspirational | |
| Core product UI | `[PROPOSED]` neutral, efficient, precise | |
| Onboarding / empty states | `[PROPOSED]` encouraging, guiding | |
| Errors / destructive actions | `[PROPOSED]` calm, plain, blame-free, actionable | |
| AI / Genie / agentic surfaces | `[INPUT NEEDED]` — how does agent copy differ? | |
| Docs / help | `[PROPOSED]` instructional, complete | |

---

## 3. Casing & capitalization

**Principle.** One casing rule applied everywhere removes a whole class of inconsistency.

### Standards (must) — *pending founder confirmation*
| # | Rule | Check |
|---|------|-------|
| S1 | `[PROPOSED]` **Sentence case** for headings, buttons, labels, menu items (not Title Case) | regex on UI strings |
| S2 | `[INPUT NEEDED]` product/feature name capitalization (e.g., Unity Catalog, Genie, AI/BI) | glossary match |
| S3 | `[INPUT NEEDED]` acronym handling (SQL, API, ML) | glossary match |

### Examples
- ✅ `[PROPOSED]` "Create pipeline" · "Add data source"
- ❌ `[PROPOSED]` "Create Pipeline" · "ADD DATA SOURCE"

---

## 4. Terminology & glossary

**Principle.** Approved terms build trust; banned terms create confusion or legal/brand risk.

| Concept | ✅ Approved | ❌ Avoid | Note |
|---------|-----------|---------|------|
| `[INPUT NEEDED]` | | | |

- `[PROPOSED]` seed rules: use official product names exactly; avoid "blacklist/whitelist", "master/slave"; don't invent feature names.
- **`[INPUT NEEDED]`** — the authoritative product-name list + any legally-sensitive terms.

---

## 5. Microcopy patterns

**Principle.** Buttons, labels, tooltips, and placeholders follow repeatable patterns so they feel like one product.

### Standards (must) — *pending*
| # | Element | Pattern | Check |
|---|---------|---------|-------|
| S1 | Buttons | `[PROPOSED]` verb + object, sentence case ("Run query") | pattern check |
| S2 | Labels | `[PROPOSED]` noun, concise, no trailing colon | pattern check |
| S3 | Tooltips | `[INPUT NEEDED]` | |
| S4 | Placeholders | `[PROPOSED]` example-driven, not instructions ("name@company.com") | |

---

## 6. System-state copy (error · empty · loading · success)

**Principle.** The hardest moments deserve the clearest words.

| State | Pattern | `[INPUT NEEDED]` |
|-------|---------|--------------------|
| **Error** | `[PROPOSED]` what happened + why + how to fix; no blame; no raw stack traces to end users | |
| **Empty** | `[PROPOSED]` what this is + the one action to fill it | |
| **Loading** | `[PROPOSED]` honest, specific if possible ("Loading tables…") | |
| **Success** | `[PROPOSED]` brief confirmation + next step | |

### Examples
- ✅ `[PROPOSED]` "Couldn't connect to the warehouse. Check your permissions and try again."
- ❌ `[PROPOSED]` "Error 500: request failed."

---

## 7. AI & agent-surface copy

**Principle.** Agentic surfaces (Genie, assistants) set expectations about capability, confidence, and control.

- **`[INPUT NEEDED]`** — how the assistant refers to itself; how it expresses uncertainty; how it asks for confirmation on consequential actions; how it cites/【shows】sources.
- `[PROPOSED]` seeds: state uncertainty plainly; confirm before destructive/irreversible actions; never fabricate results or metrics.

---

## 8. Inclusive & accessible language

**Principle.** Language is part of accessibility and brand trust.

### Standards (must) — *pending*
- `[PROPOSED]` Plain language; avoid idioms that don't translate.
- `[PROPOSED]` No ableist/violent metaphors; inclusive defaults.
- `[INPUT NEEDED]` — reading-level target, localization constraints.

---

## 9. Numbers, units, dates & data formatting

**Principle.** A data platform lives and dies on how it renders numbers.

- **`[INPUT NEEDED]`** — number formatting (thousands separators, abbreviations like 1.2K/1.2M), date/time format + timezone display, units, precision/rounding, empty/null rendering.
- `[PROPOSED]` seed: ISO-ish, locale-aware, consistent null token ("—").

---

## How this feeds the tools (step 10)
Rows in **Standards (must)** tables above are written to be mechanically checkable — casing, glossary/banned-term matches, microcopy patterns, error-copy structure, null tokens. Once founders confirm them, they become the **content lint rules** in the design linter, giving everyone predictable, on-brand copy without manual review.

---

*Owner: `[INPUT NEEDED]` · Reviewers: design + brand + legal as needed · Last updated: 2026-07-23 (scaffold).*
