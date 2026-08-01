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

```
PRIMITIVES  (Figma "Color: Primitive", 182 vars)  ── raw palette, mode-agnostic
    │  interface/{neutral,cool,warm}/{050…900}
    │  status/{red,yellow,green,blue}/{050…900}
    │  viz/{pink,plum,purple,indigo,cyan,teal,sage,lime,gold,orange,brown}/{050…900}
    │  base/{white,black}
    ▼  aliased by
SEMANTICS   (Figma "Color: Semantic", 84 vars)    ── role tokens, Light + Dark modes
    │  surface/* text/* border/* action/* input/* focus/* link/* status/* utility/* viz/*
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
- **Scale, too, is generated.** `theme.config.mjs` also defines the scalar dials
  (`--db-density-scalar`, `--db-spacing-scalar`, `--db-sizing-scalar`, `--db-type-scalar`)
  and the space / radius / type / elevation tokens that derive from them via `calc()`.
  This doc covers colors; the same source and generator produce those.

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
  var(--db-<hyphenated-name>)` (84/84). **Primitive** variables have their WEB codeSyntax
  **cleared** (182/182) — they don't ship in code, so Dev Mode shows no misleading var.
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

## 4. Semantic catalog (reference)

Every token below is defined in both modes. "Light / Dark" show the aliased primitive
(or `rgba` for alpha tokens).

### Surface — element backgrounds (`bg-*`)
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface/base` | base/white | cool/900 | Page / card background |
| `surface/subtle` | neutral/050 | cool/800 | Recessed panels, striping |
| `surface/strong` | neutral/100 | cool/700 | Raised wells, hover rows |
| `surface/inverse` | neutral/900 | cool/050 | Tooltips, inverted chips |
| `surface/accent` | blue/200 | blue/900 | Selected / active-nav background |
| `surface/inset` | `rgba 8%` | `rgba 8%` | Inset code wells |
| `surface/disabled` | `rgba 12%` | `rgba 12%` | Disabled control fill (role token, see R6) |

### Text — foreground (`text-*`)
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `text/base` | neutral/800 | cool/100 | Body text |
| `text/strong` | neutral/900 | base/white | Headings, emphasis |
| `text/subtle` | neutral/600 | cool/400 | Secondary / helper text (AA on strong surfaces) |
| `text/inverse` | base/white | cool/900 | Text on inverse/filled surfaces |
| `text/disabled` | `rgba 38%` | `rgba 38%` | Disabled text/label (role token) |
| `text/accent` | blue/700 | blue/400 | Accent-colored text |

### Border (`border-*`)
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `border/base` | neutral/200 | `rgba 10%` | Default dividers |
| `border/strong` | neutral/300 | `rgba 15%` | Emphasized separation |
| `border/subtle` | neutral/100 | `rgba 6%` | Faint hairlines |
| `border/inverse` | neutral/700 | cool/300 | Borders on inverse surfaces |
| `border/disabled` | `rgba 12%` | `rgba 12%` | Disabled control border (role token) |
| `border/accent` | blue/600 | blue/500 | Accent outline |

### Action — controls. `base` + `hover` + `press` only.
| Group | Light base | Dark base | Use |
| --- | --- | --- | --- |
| `action/default/*` | neutral/050 | cool/800 | Secondary/subtle button fill |
| `action/primary/*` | neutral/900 | cool/200 | Primary (filled) button |
| `action/selected/*` | `rgba 6%` | `rgba 8%` | Selected/toggle wash |
| `action/positive/*` | green/600 | green/500 | Confirm/positive filled |
| `action/negative/*` | red/600 | red/500 | Destructive filled |
| `action/label/*` | neutral/800 | cool/050 | Label on subtle controls |
| `action/label-inverse/*` | base/white | cool/900 | Label on filled controls |

`hover`/`press` for the non-filled groups (`default`, `selected`, `label*`) are **alpha
washes**; the filled groups (`primary`, `positive`, `negative`) step along their ramp
(hover=+100, press=+200) or use an alpha of their own base (primary).

### Input / Focus / Link
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `input/border-base` | neutral/200 | `rgba 15%` | Field border at rest |
| `input/border-hover` | neutral/400 | cool/500 | Field border hover |
| `input/border-focus` | neutral/900 | cool/200 | Field border focus |
| `focus/ring` | neutral/900 | cool/200 | Focus ring (dark & bold) |
| `focus/ring-offset` | base/white | cool/900 | Ring gap against surface |
| `link/base·hover·press·visited` | blue/600→800 | blue/400→200 | Hyperlinks |

### Status — `surface` + `border` + `text` triplet for info / negative / positive / warning
| Role | Info | Negative | Positive | Warning |
| --- | --- | --- | --- | --- |
| `status/surface-*` | blue/100·900 | red/100·900 | green/100·900 | yellow/100·900 |
| `status/border-*` | blue/700·500 | red/700·500 | green/700·500 | yellow/700·500 |
| `status/text-*` | blue/600·400 | red/600·400 | green/600·400 | yellow/600·400 |

### Utility & Viz
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `utility/scrim` | `rgba 30%` | `rgba 50%` | Modal/overlay scrim |
| `utility/surface-skeleton` | `rgba 12%` | `rgba 12%` | Skeleton block |
| `utility/text-skeleton` | `rgba 20%` | `rgba 20%` | Skeleton text line |
| `viz/categorical/1…10` | hued primitives | hued primitives | Discrete series (order fixed) |
| `viz/sequential/1…10` | cyan ramp | cyan ramp (reversed) | Continuous scales |

---

## 5. Compliance rules (linter-enforceable)

Each rule states **what** is enforced, **why**, and **how a linter detects it**.
`✅ live` = already checked by react-lint/figma-lint; `🔜 planned` = for the
token-compliance linter.

| # | Rule | Detection | Status |
| --- | --- | --- | --- |
| **R1** | **No raw color literals in product code.** No `#hex`, `rgb()`, `hsl()`, `oklch()` in `.tsx` (className arbitraries or inline `style`). Use a token. | Arbitrary value / inline style whose color isn't in `tokens.json` colors. | ✅ live (`no-arbitrary-color`, `inline-hardcoded-color`) |
| **R2** | **Never consume primitives directly.** Product code uses semantics only; `--interface-*`, `--status-*`, `--viz-<hue>-*`, `--base-*` are off-limits (they aren't Tailwind utilities and shouldn't appear in `var()`/arbitraries). | `var(--interface-…)`, `bg-[var(--status-blue-600)]`, etc. in `.tsx`. | ✅ live (`no-primitive-token` in code; `primitive-bound-fill/stroke` in Figma) |
| **R3** | **Use the role-correct token.** Fills use `surface/*` or `action/*`; text uses `text/*`/`action/label*`/`status/text-*`; borders use `border/*`/`input/*`/`status/border-*`. Don't cross roles (e.g. `text-border-base`). | Utility prefix (`bg-`/`text-`/`border-`) vs the token's role group. | 🔜 planned |
| **R4** | **Only alpha semantics use an alpha ref.** The closed set is: `*/hover`, `*/press`, `action/selected/*`, `surface/inset`, `surface/disabled`, `border/disabled`, `text/disabled`, `utility/*`. Every other semantic **must reference a primitive** (`"interface.neutral.600"`), not an alpha `{ ref, a }`. | In `theme.config.mjs`, a semantic outside the set whose value is a `{ ref, a }` object instead of a dotted primitive path. | 🔜 planned |
| **R5** | **Light/Dark parity.** Every semantic is defined in both `:root` and `.dark`, with identical names across modes. | Set-diff of `--db-*` names between the two blocks of `tokens.css`. | ✅ live (`verify-token-sync`) |
| **R6** | **Disabled = 3 role tokens.** Only `surface/disabled`, `border/disabled`, `text/disabled`. No per-variant disabled tokens (`action/primary/disabled`, etc.). `action/default` disabled keeps its light fill and only mutes its label. | Any semantic matching `/disabled/` outside the three role tokens. | 🔜 planned |
| **R7** | **State vocabulary = base · hover · press.** No `active`, `focus`, `selected` as an action state suffix (`press` maps to CSS `:active`; focus is its own `focus/*` group; selection is `action/selected/*`). | Semantic name ending in a disallowed state suffix. | 🔜 planned |
| **R8** | **Status vocabulary = info · negative · positive · warning**, each with the `surface`/`border`/`text` triplet. No `danger`/`error`/`success`/`confirm` names. | Status token whose sentiment word isn't in the allowed set, or a missing triplet member. | 🔜 planned |
| **R9** | **Focus is `focus/ring` (+ `focus/ring-offset`).** Don't reuse `border/*` or `action/*` for focus rings. | Focus styling bound to a non-focus token. | 🔜 planned |
| **R10** | **Charts use `viz/categorical/*` or `viz/sequential/*`.** Never hand-pick hue primitives for a series. | `viz/<hue>/<step>` referenced by chart code instead of a `viz/categorical`/`sequential` token. | 🔜 planned |
| **R11** | **Config ↔ tokens.css ↔ Figma parity.** Semantic Figma vars carry `codeSyntax.WEB = var(--db-<name>)`; every config semantic ships as a `--db-*` var and a `--color-*` utility; every shipped value round-trips from the config; no primitive leaks into `tokens.css`. | `verify-token-sync.mjs` diffs the config, `tokens.css`, and the `.figma-token-dump.json` snapshot. | ✅ live (`design:verify-sync`) |
| **R12** | **Additive changes only.** New tokens are added; renames/removals require a documented deprecation. `tokens.css`/`tokens.json` are generated, never hand-edited. | PR diff removes a token name without a deprecation entry; manual edit to a generated file. | 🔜 planned (CI) |
| **R13** | **Every semantic resolves.** No dangling primitive ref in the config; no primitive defined but unused-and-undocumented. | The generator throws on an unknown ref; resolve graph over `theme.config.mjs`. | ✅ authoring check (generator) |

### Figma-side (figma-lint, ✅ live)
- `non-token-fill` / `non-token-stroke` — every fill/stroke must be **bound to a
  variable** (not a loose hex). This is R1 for design.
- `primitive-bound-fill` / `primitive-bound-stroke` — a fill/stroke bound to a
  `Color: Primitive` variable instead of a `Color: Semantic` token is the design
  equivalent of R2 (warning).
- `summary.tokenCompliance.scorePct` — share of color properties bound to a
  semantic token: the headline "are these mocks using the design system?" number.

---

## 6. Migration status (legacy → semantic)

The shadcn-flat tokens in `globals.css` (`--background`, `--primary`,
`--muted-foreground`, …) are **still shipped** and still consumed by components. The new
semantic layer is **additive** — it coexists without changing rendered output yet.

**Rough mapping** (for the eventual component migration):

| Legacy | Semantic |
| --- | --- |
| `--background` / `--card` / `--popover` | `surface/base` |
| `--foreground` | `text/base` (headings → `text/strong`) |
| `--muted` / `--secondary` | `surface/strong` |
| `--muted-foreground` | `text/subtle` |
| `--primary` | `action/primary/base` |
| `--primary-foreground` | `action/label-inverse/base` |
| `--destructive` | `action/negative/base` / `status/text-negative` |
| `--accent` / `--accent-foreground` | `surface/accent` / `text/accent` |
| `--border` | `border/base` |
| `--input` | `input/border-base` |
| `--ring` | `focus/ring` |
| `--disabled*` | `surface/disabled` · `border/disabled` · `text/disabled` |

> ⚠️ Adopting the mapping flips light-mode `--primary` from DuBois blue `#2272B4` to
> neutral `#171717` (the shadcn redesign). That is a deliberate visual change and must be
> a separate, reviewed step — it is **not** part of the additive token layer.

When a component migrates, swap its legacy utility for the semantic one
(`bg-primary` → `bg-action-primary-base`) and drop the legacy alias once nothing uses it.
