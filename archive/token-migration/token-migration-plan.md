# DBUI Token Migration — Execution Plan (per-component rewrite)

> **Review-before-apply.** This is the exact set of changes to move components off
> the legacy shadcn-flat tokens (`globals.css`) onto the new semantic layer
> (generated `tokens.css`). **Nothing here is applied yet.** Mechanism chosen: **per-component
> rewrite** — swap legacy Tailwind utilities (`bg-primary`) for semantic ones
> (`bg-action-primary-base`) in each component. `globals.css` itself only changes
> at **Stage C** (cleanup), once nothing references the legacy names.
>
> Decisions: see `token-migration-map.md`. Contract: `token-rules.md`.
> Surface: **~68 files** across `dbui`, `dbui-shells`, `dbui-genie`.

## Stages

| Stage | Utilities | Visual impact | Gate |
| --- | --- | --- | --- |
| **A** | Clean renames (§1) | none / imperceptible | ship freely |
| **B** | Value shifts + decisions (§2) — **the neutral redesign** | **visible** | before/after baseline + review |
| **C** | `globals.css` cleanup (§3) | none | after A+B land, legacy unused |

Prereqs already true: all 84 semantic Tailwind utilities exist (`@theme` in generated `tokens.css`), `yarn design:verify-sync` is green, and `no-primitive-token` guards new work.

---

## §1 Stage A — clean renames (no visual change)

Rewrite these utilities everywhere they appear. Values are equal or imperceptibly
closer to spec (e.g. `text-muted-foreground` gets *darker* in light = better AA).

| Legacy utility | → Semantic utility | Note |
| --- | --- | --- |
| `bg-background` `bg-card` `bg-popover` | `bg-surface-base` | exact |
| `text-foreground` `text-card-foreground` `text-popover-foreground` | `text-text-base` | headings → `text-text-strong` (judge per use) |
| `bg-muted` `bg-secondary` | `bg-surface-subtle` | dark exact; light `#F7F7F7`→`#FAFAFA` |
| `text-muted-foreground` | `text-text-subtle` | light darker (AA↑) · **~215 uses** |
| `text-secondary-foreground` | `text-text-base` | — |
| `bg-accent` | `bg-surface-accent` | dark 1 step deeper |
| `text-accent-foreground` | `text-text-accent` | light exact |
| `bg-destructive` | `bg-action-negative-base` | exact |
| `text-destructive-foreground` | `text-action-label-inverse-base` | white on fill |
| `bg-destructive-hover` | `bg-action-negative-hover` | exact |
| `bg-destructive-press` | `bg-action-negative-press` | exact |
| `bg-success` | `bg-action-positive-base` | exact |
| `text-success` | `text-status-text-positive` | colored text |
| `text-warning` | `text-status-text-warning` | decision 2 (no filled warning) |
| `border-warning`* | `border-status-border-warning` | if present |
| `border-border` | `border-border-base` | dark solid→white@10% (subtler) |
| `bg-disabled` | `bg-surface-disabled` | solid gray → alpha 12% |
| `text-disabled-foreground` | `text-text-disabled` | solid → alpha 38% (more legible) |
| `bg-code-background` | `bg-surface-inset` | alpha |
| `bg-skeleton` | `bg-utility-surface-skeleton` | alpha |
| `bg-overlay` | `bg-utility-scrim` | 72%/85% restored = matches legacy (decision 3) |
| `bg-surface-info` | `bg-status-surface-info` | — |
| `bg-surface-success` | `bg-status-surface-positive` | success→positive |
| `bg-surface-warning` | `bg-status-surface-warning` | — |
| `bg-surface-danger` | `bg-status-surface-negative` | danger→negative |

\* `border-warning` may not exist as a utility; include only if grep finds it.

---

## §2 Stage B — value shifts + decisions (the redesign, needs review)

These **change how the app looks**. Land as one reviewed PR with a visual baseline.

| Legacy utility | → Semantic utility | Shift |
| --- | --- | --- |
| `bg-primary` | `bg-action-primary-base` | **blue `#2272B4` → neutral `#171717`** · ~74 uses |
| `text-primary-foreground` | `text-action-label-inverse-base` | stays white; safe, but travels with primary |
| `bg-primary-hover` | `bg-action-primary-hover` | neutral@90% |
| `bg-primary-press` | `bg-action-primary-press` | neutral@80% |
| `border-ring` `ring-ring` `ring-*` | `border-focus-ring` / `ring-focus-ring` | blue → neutral, dark & bold |
| `bg-hover` | `bg-action-default-hover` | blue tint removed → neutral |
| `bg-press` | `bg-action-selected-press` | blue tint removed → neutral |
| `bg-active` | `bg-action-selected-base` | **blue selection → neutral** (decision 1) — hits Toggle/SegmentControl/Tabs |
| `border-input` | `border-input-border-base` | lighter at rest; emphasis moves to hover/focus |
| `bg-chart-1…5` | `bg-viz-categorical-1…5` | expanded palette; hues shift (decision 4) |

**`--shadow-focus` dependency:** `globals.css` defines
`--shadow-focus: 0 0 0 1px white, 0 0 0 3px var(--ring)`. When `--ring` is retired,
repoint this to `var(--focus-ring)` (do it in Stage B so focus rings shift with the
rest of the redesign).

**Selection components to eyeball in Stage B:** `toggle`, `toggle-group`,
`segment-control`, `tabs`, `editor-tabs`, `navbar`, `PlatformNav` — all currently
key off blue `--active`/`--primary`.

---

## §3 Stage C — `globals.css` cleanup (exact diff, after A+B)

Once no component references a legacy utility, delete the legacy layer. **Keep the
brand/asset tokens** (`--ai-gradient*`, `--icon-folder`) — they are their own layer.

**Delete these `@theme inline` mappings** (globals.css ~L55–109):
`--color-background, -foreground, -card, -card-foreground, -popover, -popover-foreground, -primary, -primary-foreground, -secondary, -secondary-foreground, -muted, -muted-foreground, -accent, -accent-foreground, -destructive, -destructive-foreground, -border, -input, -ring, -chart-1…5, -sidebar*, -warning, -warning-foreground, -success, -success-foreground, -primary-hover, -primary-press, -destructive-hover, -destructive-press, -border-accessible, -hover, -press, -active, -disabled, -disabled-foreground, -overlay, -code-background, -skeleton, -surface-info/success/warning/danger`.
**Keep:** `--color-icon-folder`, `--color-ai-gradient-*`.

**Delete the matching `:root` + `.dark` declarations** (globals.css ~L136–280) for the
same names. **Keep** `--icon-folder`, `--ai-gradient*`, and update
`--shadow-focus` → `var(--focus-ring)`.

**Dead now (0 usages — delete, don't migrate):** `--sidebar` +7 sidebar vars,
`--border-accessible`, `--card-foreground`, `--popover-foreground`,
`--secondary-foreground`, `--warning-foreground`, `--success-foreground`.
*(Re-confirm zero usage with grep at cleanup time.)*

After cleanup, run `yarn design:tokens` so `tokens.json` drops the retired
hexes, then `yarn design:lint:react` (should be clean) and `yarn design:verify-sync`.

---

## §4 File batches (~68 files) — suggested review order

Do Stage A per batch (safe), then Stage B across all in one PR.

1. **Form controls** — `input`, `textarea`, `native-select`, `select`, `combobox`, `checkbox`, `radio-group`, `radio-tile`, `switch`, `slider`, `field`, `input-group`, `date-range`
2. **Actions** — `button`, `split-button`, `button-group`, `toggle`, `toggle-group`, `segment-control`, `badge`, `tag`, `kbd`, `pagination`
3. **Overlays / menus** — `dropdown-menu`, `context-menu`, `menubar`, `popover`, `hover-card`, `dialog`, `alert-dialog`, `drawer`, `sonner`
4. **Containers / nav / data** — `card`, `item`, `accordion`, `tabs`, `editor-tabs`, `breadcrumb`, `navbar`, `platform-header`, `page-header`, `table`, `avatar`, `empty`, `alert`, `status`, `progress`, `key-value-pair`, `scroll-area`, `resizable`, `chart`, `data-tree`
5. **Shells** — `Base`, `PlatformHeader`, `PlatformNav`, `AssistantPanel`, `FacetedFilter`, `SearchPopup`, `CatalogExplorer`, `DataTreeExplorer`, `FileTreeExplorer`, `PreviewPopup`
6. **Genie** — `message`, `response`, `reasoning`, `follow-ups`, `prompt-input`, `loader`

---

## §5 Per-stage verification

- **A:** `yarn design:lint:react` (no new `no-primitive-token`/arbitrary-color); visual diff should be ~noise. Storybook stories render unchanged.
- **B:** capture before/after of Batch-2/selection stories; review the neutral redesign deliberately; confirm focus rings, primary buttons, toggles.
- **C:** `yarn design:tokens` → `yarn design:lint:react` clean → `yarn design:verify-sync` green; grep confirms no legacy utility remains.

## §6 Notes / open

- `text-foreground` → most map to `text-text-base`; promote headings to `text-text-strong` where the design intends emphasis (not mechanical).
- `text-primary-foreground` is used broadly as "on-fill text"; it maps to `action-label-inverse-base`. On non-primary fills (destructive/positive) it's the same white — safe.
- Keep `bg-ai-gradient*` and `text-icon-folder` untouched.
- Figma component library should mirror these swaps (rebind component fills to the same semantic tokens) so Dev Mode stays truthful — track separately.
