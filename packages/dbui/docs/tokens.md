# DBUI Tokens — START HERE

> Entry point for the token system. Read this first; it links to the deeper docs.
> **Status (2026-08-03):** migration complete. Stages A–C landed, the legacy
> `globals.css` colour layer is pruned, and every component consumes the
> generated `--db-*` semantics. Components still carry `text-[13px]` literals
> rather than the `type-*` ramp; that is the remaining follow-up.

---

## The 5 files that matter

| File | Role |
| --- | --- |
| `packages/dbui/src/tokens/theme.config.mjs` | **The one file you edit.** Primitives, semantics (light/dark), scalars, space/radius/type/elevation. |
| `packages/dbui/src/tokens/tokens.css` | **Generated.** The shipped CSS: `--db-*` vars + `@theme` Tailwind color utilities. Never hand-edit. |
| `scripts/design-lint/generate-tokens.mjs` | The generator: config → `tokens.css` + `tokens.json`. |
| `scripts/design-lint/verify-token-sync.mjs` | Proves config ↔ `tokens.css` ↔ Figma parity. |
| `scripts/design-lint/tokens.json` | **Generated.** Linter allowlist consumed by `react-lint` + `figma-lint`. |

Also shipped, untouched by this system: `globals.css` (legacy shadcn-flat tokens,
still consumed by components) and `viz.css` (separate `dbui-viz` palette).

## Commands

```bash
yarn design:tokens        # regenerate tokens.css + tokens.json from theme.config.mjs
yarn design:verify-sync   # prove config ↔ tokens.css ↔ Figma are 1:1
yarn design:lint:react    # component + token compliance in .tsx
```

Workflow for any value change: **edit `theme.config.mjs` → `yarn design:tokens` →
`yarn design:verify-sync` → commit.**

## Invariants (don't break these)

1. **Primitives never ship as CSS.** They're generator input only — resolved inline
   into each semantic. `tokens.css` contains **0** primitive vars, so product code
   can't reference the palette by construction.
2. **`--db-` prefixes CSS vars; Tailwind utilities stay unprefixed.**
   `--db-surface-base` is the var; `bg-surface-base` is the class. The `@theme` layer
   maps `--color-surface-base → var(--db-surface-base)`. `bg-`/`text-`/`border-` are
   Tailwind's property prefixes, not our naming choice.
3. **Generated files are never hand-edited** (`tokens.css`, `tokens.json`).
4. **Figma Code Connect:** semantics carry `codeSyntax.WEB = var(--db-<name>)` (84/84);
   primitives have WEB codeSyntax **cleared** (182/182) since they don't ship.
5. **Everything dimensional is scalar-tied.** Space scales by
   `spacing-scalar × density-scalar`; type size/line-height/tracking all scale by
   `type-scalar`. One dial re-flows the system.

## What ships today

| Group | Count | Notes |
| --- | --- | --- |
| Color semantics | 84 × light/dark | 20 carry alpha; all have a Tailwind utility |
| Color primitives | 182 | config + Figma only, **0 in CSS** |
| Scalars | 5 | `spacing-unit`, `density`, `spacing`, `sizing`, `type` |
| Space | 9 steps + 2 inline | `3xs` 2px → `2xl` 48px at scalar 1 |
| Radius | 6 | `sm` 4 → `full` 999px (fixed anchors) |
| Size | 2 element + 5 icon | Control heights 24/32; icons 12–24. Driven by `sizing-scalar` |
| Border width | 3 | `none` 0, `thin` 1, `thick` 2 (focus on non-filled controls) |
| Type | 14 steps | One ramp, named by what the text is — see below |
| Fonts | 2 | Figtree (text), Commit Mono (code) — loaded in the portal via CDN |
| Elevation | 4 | `1` highest (dialog) → `3` soft (toast), `0` flat |
| Motion | 6 durations + 1 easing | Two bands; one curve for the whole system |

## Type ramp

Named by what the text *is*, not how big it is. The split that matters most is
**label vs body**: both are 13px, but a label is single-line by definition and body
wraps, so they take different leading.

`label` at 13/16 is deliberate — the line box equals the 16px icon box, so text and
icon align in a row without adjustment, and a 24px control gets 4px of breathing room
instead of 2px.

Every utility is the **whole style**: family, size, line-height, tracking, weight and
case. Never pair one with `leading-*`, `font-*` or `uppercase`.

| Utility | Size / line | Weight | Family | Use for |
| --- | --- | --- | --- | --- |
| `type-hint` | 12 / 16 | 400 | sans | Captions, helper text, timestamps |
| `type-eyebrow` | 12 / 16 | 600 | sans | Overlines. Carries its own caps and tracking |
| `type-label` | 13 / 16 | 400 | sans | Single-line UI — buttons, menu items, cells |
| `type-label-bold` | 13 / 16 | 600 | sans | Column headers, form labels |
| `type-body` | 13 / 20 | 400 | sans | Wrapping 13px — descriptions in Alert, Empty, Card, RadioTile |
| `type-body-bold` | 13 / 20 | 600 | sans | Emphasis inside a wrapping description |
| `type-code` | 13 / 20 | 400 | mono | Inline code, identifiers, paths |
| `type-block` | 14 / 22 | 400 | mono | Code blocks — a step down from paragraph, since mono reads larger |
| `type-paragraph` | 15 / 22 | 400 | sans | Read as language — chat messages, docs, empty states |
| `type-paragraph-bold` | 15 / 22 | 600 | sans | Bold inside prose (markdown `**` in a Genie answer) |
| `type-title-4` | 16 / 24 | 600 | sans | Small heading |
| `type-title-3` | 20 / 28 | 600 | sans | Subsection heading |
| `type-title-2` | 24 / 32 | 600 | sans | Section heading (−0.2 tracking) |
| `type-title-1` | 32 / 40 | 600 | sans | Page heading (−0.4 tracking) |

**Why `type-` and not `text-`.** Tailwind's `text-` prefix already means colour, so a
size called `text-text` sitting beside a colour called `text-text-subtle` would be
genuinely ambiguous. `type-*` keeps the two axes legible:
`class="type-paragraph text-text-subtle"` reads correctly.

**There is no `data` style — numbers live on the component.** Use
`<TableCell numeric>` and `<TableHead numeric>`. Tabular figures are a correctness
property rather than a look: a reader never sees "tabular", only misalignment when it
is missing, and Figtree's digits vary by about 3px across 0–9. A numeric cell also needs
right alignment, which no type style can express. Outside a table — KPI cards,
key-value pairs, chart tooltips — apply `tabular-nums` directly.

**Why `code` has no bold.** Code emphasis is carried by colour — syntax highlighting —
never by weight.

**Density is not a second ramp.** `--db-type-scalar` scales the whole ramp
proportionally from one dial. A parallel "comfortable" ramp would inflate controls along
with prose, which is not what a roomier reading mode should do.

## Next step — migration

`token-migration-plan.md` is the playbook: **Stage A** clean renames (invisible),
**Stage B** value shifts / the neutral redesign (visible, needs review), **Stage C**
`globals.css` cleanup. ~68 files across `dbui`, `dbui-shells`, `dbui-genie`, grouped
into 6 review batches. Mechanism: per-component utility rewrite (`bg-primary` →
`bg-action-primary-base`).

Two things deliberately deferred to migration:

- **Space and radius scale tokens are not wired into Tailwind `@theme`** (colors and type
  are). Generating `gap-md`/`rounded-md` would collide with Tailwind defaults. Consume via
  `var(--db-space-md)` until then.
- **Components still declare `text-[13px]` literals** rather than `text-interface`. The
  ramp utilities exist and the docs pages use them; migrating the 94 component call sites
  is a follow-up. The linter allowlist still permits the legacy SF Pro stack until then.

## Deeper docs

| Doc | What's in it |
| --- | --- |
| `token-rules.md` | The contract: architecture, naming, Figma↔code mapping, semantic catalog, machine-enforceable rules **R1–R13**. |
| `token-migration-map.md` | Legacy → semantic mapping, usage counts, and the **4 locked decisions** (neutral selection, warning, 72% scrim, expanded chart palette). |
| `token-migration-plan.md` | Stage-by-stage execution plan, `globals.css` cleanup diff, file batches, per-stage verification. |
| `scripts/design-lint/README.md` | The linters, their rules, and the compliance scores. |

## Known noise (not token-related)

`yarn design:lint:react` currently reports ~57 pre-existing errors — off-scale
spacing (`w-[400px]`), raw `<button>`/`<input>`, and hardcoded colors in
in-progress stories/shells. **None come from the token system.** Don't chase them
as part of token work.
