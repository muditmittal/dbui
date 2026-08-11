# DBUI Color Token Rules

> The contract for DBUI's color token system: how tokens are structured, named, and
> connected across Figma and code — and the machine-enforceable rules a
> token-compliance linter checks. Colors only; spacing/radius/type live in
> `scripts/design-lint/tokens.json` and `component-rules.md`.

> 👉 **New here? Read `tokens.md` first** — it's the short entry point (current status,
> the 5 files that matter, commands, invariants, next step). This doc is the full contract.

**Companion docs & files:**

- `packages/dbui/docs/tokens.md` — START HERE entry point / current status
- `packages/dbui/src/tokens/theme.config.mjs` — **the one authored source** (primitives, semantics, scalars, scale)
- `packages/dbui/src/tokens/tokens.css` — **generated** shipped CSS (`--db-*` semantics + scale). Do not hand-edit.
- `packages/dbui/src/tokens/globals.css` — legacy shadcn-flat tokens (still shipped)
- `scripts/design-lint/generate-tokens.mjs` — the generator: config → `tokens.css` + `tokens.json` (`yarn design:tokens`)
- `scripts/design-lint/verify-token-sync.mjs` — proves config ↔ tokens.css ↔ Figma parity (`yarn design:verify-sync`)
- `scripts/design-lint/tokens.json` — generated allowlist read by both linters
- `scripts/design-lint/README.md` — the linters themselves
- Figma file `OftbSQf85jOPln9RhSEhVv` → collections **Color: Primitive**, **Color: Semantic**

---

## 1. Architecture — two tiers, one legacy layer

Counts are deliberately absent. `yarn design:verify-sync` prints both on every
run and is the only place they cannot go stale.

```
PRIMITIVES  (Figma "Color: Primitive")            ── raw palette, mode-agnostic
    │  interface/{neutral,cool,warm}/{050…900}
    │  status/{red,yellow,green,blue}/{050…900}
    │  viz/{pink,plum,purple,indigo,cyan,teal,sage,lime,gold,orange,brown}/{050…900}
    │  base/{white,black}
    ▼  aliased by
SEMANTICS   (Figma "Color: Semantic")             ── role tokens, Light + Dark modes
    │  structure     surface/*  text/*  border/*  utility/*
    │  interaction   action/*   input/* focus/*   link/*
    │  status        status/*
    │  viz           viz/*
    ▼  consumed by
PRODUCT CODE (components, stories, compositions)

LEGACY      (globals.css: --background, --primary, --muted-foreground, …)
            shadcn-flat names still shipped so existing components keep working.
            Being migrated onto the semantic layer; do not add new legacy tokens.
```

- **Primitives are generator input only.** They live in `theme.config.mjs` and Figma's
  "Color: Primitive" collection — and **ship in NO CSS**. `tokens.css` never contains
  `--db-interface-neutral-600`; the generator resolves each semantic to its final
  hex/rgba value inline. Product code therefore *cannot* reference a primitive, by
  construction.
- **Semantics are what ships and what code consumes.** In the source, every solid
  semantic **references a primitive** and a small closed set of **alpha semantics** use
  `{ ref, a }` (see R4). The generator resolves both into `--db-*` vars in `tokens.css`.
- **Modes:** Light values live in `:root`, Dark in `.dark`. Dark solids move onto the
  `interface/cool/*` ramp; status/viz stay on their hued ramps; alpha tokens flip
  black↔white.
- **Dimensions, too, is generated.** `theme.config.mjs` also defines the two scalar
  dials (`--db-density-scalar`, `--db-type-scalar`) and the space / size / radius /
  border / type / elevation / motion tokens, the first four of which derive from the
  grid unit and the density dial via `calc()`. This doc covers colors; the same source
  and generator produce those. See `tokens.md` for the rules that govern them.
- **Type is the one layer whose stops ship.** "Primitives never ship" is a color
  rule, and type is a deliberate exception rather than a violation: a type context
  changes what a style measures *after* the class is on the element, and a custom
  property is the only thing that can be swapped that late. Color has nothing
  equivalent to swap, so nothing here is relaxed. `tokens.md` owns the type rules.

### The four families

The semantic layer is organized into four families. A family answers one
question — **what does this color?** — and each of the four answers is
something positive, so no family is defined by what it is not.

| Family | What it colors | Prefixes |
| --- | --- | --- |
| `structure` | The substrate a screen is made of | `surface/` `text/` `border/` `utility/` |
| `interaction` | What you operate, and how it responds | `action/` `input/` `focus/` `link/` |
| `status` | Feedback about what happened | `status/` |
| `viz` | Data encoded as color | `viz/` |

**A family is a grouping, never a prefix.** No token name carries one.
`surface/base` is not `structure/surface/base`. The family exists in the
section structure of `theme.config.mjs`, in this table, and on the portal's
Tokens page — and nowhere in a name, a CSS variable, or a Tailwind utility.
See R14.

**How a family is named:** one holding a single prefix takes that prefix's
name; one holding several takes a superset name that is none of them. This is
what rules out the two names the taxonomy nearly shipped with. `action` would
have named a four-prefix family after one of its four, leaving `focus/ring`,
`input/border/hover` and `link/base` reading as filed elsewhere. `base` would
have named the structure family with a word that `-base` already spends as the
resting-variant suffix in `surface/base` and `action/primary/base`. Both are
one word carrying two meanings at two levels — the exact ambiguity the family
layer exists to remove.

Three placements are worth stating because the obvious reading is wrong:

- **`input/`** is a border and still `interaction`. The state ladder decides
  it: no `border/*` token names a state and both input tokens do. A decorative
  rule is drawn once; a field border lightens under the pointer so the field
  reads as operable.
  `border/emphasis` does not break this, and the distinction is the point of the
  placement. It is a **weight** — the step above `strong` — and a component
  chooses to reach it under a pointer, exactly as one may reach `border/strong`
  on hover today. A token named `border/hover` would break it, which is why the
  spotlight's halo is not called that. The test is whether the name states a
  state, not whether a state can reach the value.
- **`utility/`** is `structure`. A scrim is a layer over the substrate, and the
  two skeletons are placeholders shaped like the surface and the line of text
  they stand in for. `status` is the tempting alternative, since a skeleton
  does say "loading" — but status is closed at four sentiments per R8 and
  loading is not one of them.
- **A sentiment word means different things in different families.**
  `action/positive/base` fills the button that confirms; `status/text/positive`
  reports that something succeeded. Collapsing the two is what a single
  catch-all family made easy.

---

## 2. Naming & code mapping

| Layer | Figma name | CSS custom property | Tailwind utility |
| --- | --- | --- | --- |
| Primitive | `interface/neutral/600` | _none — not shipped (generator input)_ | _none (intentional)_ |
| Semantic | `surface/base` | `--db-surface-base` | `bg-surface-base` |
| Semantic | `text/subtle` | `--db-text-subtle` | `text-text-subtle` |
| Semantic | `action/primary/base` | `--db-action-primary-base` | `bg-action-primary-base` |

- **Delimiter:** Figma slash `/` → code hyphen `-`.
- **Prefix:** every shipped CSS variable is namespaced `--db-` so consumers can tell a
  Databricks token from their own. **Tailwind utilities stay unprefixed** (`bg-surface-base`)
  — the `@theme` layer maps `--color-surface-base → var(--db-surface-base)`. So component
  code doesn't change shape; only the underlying var name gained a prefix.
- **Code Connect:** every **semantic** Figma variable carries `codeSyntax.WEB =
  var(--db-<hyphenated-name>)`. **Primitive** variables have their WEB codeSyntax
  **cleared** — they don't ship in code, so Dev Mode shows no misleading var.
- **Order convention:** group first, then modifier — `surface/accent`, `text/accent`,
  `border/accent` (never `accent/surface`). State suffix last — `action/primary/hover`.

---

## 3. The pipeline

```
packages/dbui/src/tokens/theme.config.mjs   ← THE source of truth (primitives + semantics + scale)
   │  node scripts/design-lint/generate-tokens.mjs   (yarn design:tokens)
   ├─▶ packages/dbui/src/tokens/tokens.css   ← shipped CSS (--db-* semantics resolved inline, @theme utils, scale)
   └─▶ scripts/design-lint/tokens.json       ← generated allowlist (hex ∪, alpha, primitive names, semantic names)
                                                   │
                                                   ├─▶ react-lint.js   (scans .tsx for arbitrary values / raw primitives)
                                                   └─▶ figma-lint.js   (scans a frame for unbound / primitive-bound fills)

Figma (Color: Primitive + Color: Semantic)   ← design source; kept in parity with the config
   codeSyntax.WEB = var(--db-<name>) on semantics; cleared on primitives
```

- **When values change:** edit `theme.config.mjs` → `yarn design:tokens` → `yarn
  design:verify-sync` → commit. Never hand-edit `tokens.css` or `tokens.json`.
- **When Figma changes:** refresh `.figma-token-dump.json` (see header of
  `verify-token-sync.mjs`) and run `yarn design:verify-sync` to prove config ↔ Figma parity.

---

## 4. Compliance rules (linter-enforceable)


Each rule states **what** is enforced, **why**, and **how a linter detects it**.
`✅ live` = already checked by react-lint/figma-lint; `◐ partial` = one shape of
it is checked; `🔜 planned` = for the token-compliance linter. The rule names in
the Status column are the react-lint rules — `scripts/design-lint/README.md`
lists all nineteen with their severities.

| # | Rule | Detection | Status |
| --- | --- | --- | --- |
| **R1** | **No raw color literals in product code.** No `#hex`, `rgb()`, `hsl()`, `oklch()` anywhere in `.ts` or `.tsx` — className arbitraries, inline `style`, or a plain object in a module. Use a token. | Arbitrary value / inline style whose color isn't in `tokens.json` colors, plus any color literal outside a JSX attribute — allowlisted or not, since a value in a module cannot have two modes. | ✅ live (`no-arbitrary-color`, `no-hardcoded-hex`, `inline-hardcoded-color`, `no-module-color-literal`) |
| **R2** | **Never consume primitives directly.** Product code uses semantics only; `--interface-*`, `--status-*`, `--viz-<hue>-*`, `--base-*` are off-limits (they aren't Tailwind utilities and shouldn't appear in `var()`/arbitraries). | `var(--interface-…)`, `bg-[var(--status-blue-600)]`, etc. in `.tsx`. | ✅ live (`no-primitive-token` in code; `primitive-bound-fill/stroke` in Figma) |
| **R3** | **Use the role-correct token.** Fills use `surface/*` or `action/*`; text uses `text/*`/`action/label*`/`status/text-*`; borders use `border/*`/`input/*`/`status/border-*`. Don't cross roles (e.g. `text-border-base`). | Utility prefix (`bg-`/`text-`/`border-`) vs the token's role group. | 🔜 planned |
| **R4** | **Only alpha semantics use an alpha ref.** The closed set is: `*/hover`, `*/press`, `action/selected/*`, `surface/inset`, `surface/disabled`, `border/disabled`, `text/disabled`, `utility/*`. Every other semantic **must reference a primitive** (`"interface.neutral.600"`), not an alpha `{ ref, a }`. | In `theme.config.mjs`, a semantic outside the set whose value is a `{ ref, a }` object instead of a dotted primitive path. | 🔜 planned |
| **R5** | **Light/Dark parity.** Every semantic is defined in both `:root` and `.dark`, with identical names across modes. | Set-diff of `--db-*` names between the two blocks of `tokens.css`. | ✅ live (`verify-token-sync`) |
| **R6** | **Disabled = 3 role tokens.** Only `surface/disabled`, `border/disabled`, `text/disabled`. No per-variant disabled tokens (`action/primary/disabled`, etc.). `action/default` disabled keeps its light fill and only mutes its label. | Any semantic matching `/disabled/` outside the three role tokens. | 🔜 planned |
| **R7** | **State vocabulary = base · hover · press.** No `active`, `focus`, `selected` as an action state suffix (`press` maps to CSS `:active`; focus is its own `focus/*` group; selection is `action/selected/*`). | Semantic name ending in a disallowed state suffix. | 🔜 planned |
| **R8** | **Status vocabulary = info · negative · positive · warning**, each with the `surface`/`border`/`text` triplet. No `danger`/`error`/`success`/`confirm` names. | Status token whose sentiment word isn't in the allowed set, or a missing triplet member. | 🔜 planned |
| **R9** | **Focus is `focus/ring` (+ `focus/ring-offset`).** Don't reuse `border/*` or `action/*` for focus rings. | Focus styling bound to a non-focus token. | 🔜 planned |
| **R10** | **Charts use `viz/categorical/*` or `viz/sequential/*`.** Never hand-pick hue primitives for a series. | `viz/<hue>/<step>` referenced by chart code instead of a `viz/categorical`/`sequential` token. | ◐ partial (`no-module-color-literal` catches a hue resolved into a chart module, which is the form this took; naming the wrong *semantic* is still unchecked) |
| **R11** | **Config ↔ tokens.css ↔ Figma parity.** Semantic Figma vars carry `codeSyntax.WEB = var(--db-<name>)`; every config semantic ships as a `--db-*` var and a `--color-*` utility; every shipped value round-trips from the config; no primitive leaks into `tokens.css`. | `verify-token-sync.mjs` diffs the config, `tokens.css`, and the `.figma-token-dump.json` snapshot. | ✅ live (`design:verify-sync`) |
| **R12** | **Additive changes only.** New tokens are added; renames/removals require a documented deprecation. `tokens.css`/`tokens.json` are generated, never hand-edited. | PR diff removes a token name without a deprecation entry; manual edit to a generated file. | 🔜 planned (CI) |
| **R13** | **Every semantic resolves.** No dangling primitive ref in the config; no primitive defined but unused-and-undocumented. | The generator throws on an unknown ref; resolve graph over `theme.config.mjs`. | ✅ authoring check (generator) |
| **R14** | **A family is never a prefix.** The four families group the semantic layer and do not appear in any name. `status` and `viz` are prefixes *as well as* families and stay so; `structure` and `interaction` are families only. | A semantic name beginning `structure-` or `interaction-`, in the config, `tokens.css` or a Figma variable path. | 🔜 planned |

### Figma-side (figma-lint, ✅ live)
- `non-token-fill` / `non-token-stroke` — every fill/stroke must be **bound to a
  variable** (not a loose hex). This is R1 for design.
- `primitive-bound-fill` / `primitive-bound-stroke` — a fill/stroke bound to a
  `Color: Primitive` variable instead of a `Color: Semantic` token is the design
  equivalent of R2 (warning).
- `summary.tokenCompliance.scorePct` — share of color properties bound to a
  semantic token: the headline "are these mocks using the design system?" number.

---

---

The catalog of semantic values is `src/tokens/tokens.css`, rendered on the
portal's Tokens page and printed by `dbui token`. Migration status is in
`TRACKER.md`.
