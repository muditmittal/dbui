# DBUI Tokens — START HERE

> Entry point for the token system. Read this first; it links to the deeper docs.
> **Status (2026-08-01):** token system **built, generated, and green**. It is
> **additive** — legacy `globals.css` tokens still drive every component, so
> nothing renders differently yet. **Migration is the next body of work.**

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
| Space | 8 steps + 2 inline | `2xs`…`2xl` = 4→48px at scalar 1 |
| Radius | 6 | `sm` 4 → `full` 999px (fixed anchors) |
| Type | 5 steps | 12/16, 13/20, 16/22, 22/28·−0.2, 32/40·−0.4 (size/line/tracking px) |
| Fonts | 2 | DM Sans (text), Commit Mono (code) — **vars only, webfonts not loaded yet** |
| Elevation | 4 | `0` none → `3` soft (toast) |

## Next step — migration

`token-migration-plan.md` is the playbook: **Stage A** clean renames (invisible),
**Stage B** value shifts / the neutral redesign (visible, needs review), **Stage C**
`globals.css` cleanup. ~68 files across `dbui`, `dbui-shells`, `dbui-genie`, grouped
into 6 review batches. Mechanism: per-component utility rewrite (`bg-primary` →
`bg-action-primary-base`).

Two things deliberately deferred to migration:

- **Scale tokens are not wired into Tailwind `@theme`** (only colors are). Generating
  `text-md`/`gap-md`/`rounded-md` would collide with Tailwind defaults and the existing
  `text-[13px]` usage. Consume via `var(--db-font-size-md)` until then.
- **Webfont loading for DM Sans / Commit Mono.** Only the family vars exist; components
  still declare SF Pro, and the linter allowlist still permits it.

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
