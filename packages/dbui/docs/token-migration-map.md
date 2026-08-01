# DBUI Token Migration Map (legacy → semantic)

> The durable mapping from the **legacy shadcn-flat tokens** in `globals.css`
> (`--background`, `--primary`, `--muted-foreground`, …) to the new
> **`Color: Semantic`** set in `theme.config.mjs` → `tokens.css` / Figma. This is the reference for the
> eventual component swap. It is **not applied yet** — the semantic layer is
> additive and coexists with legacy until we deliberately flip components.
>
> Companion docs: `token-rules.md` (the contract + linter rules),
> `canvases/token-mapping.canvas.tsx` (interactive swatches).

**Status:** mapping locked · swap **not started** · 4 open decisions **resolved** (below).

---

## Locked decisions (2026-08-01)

| # | Legacy | Decision | New target |
| --- | --- | --- | --- |
| 1 | `--active` (selected background) | **Active selection goes neutral** — no blue wash | `action/selected/base` (black@6% / white@8%) |
| 2 | `--warning` (text + border, no filled action) | **Keep as-is for now** — no filled warning action | `status/text-warning` · `status/border-warning` |
| 3 | `--overlay` (scrim) | **Return to 72% opacity** (85% dark) | `utility/scrim` → `rgba(0,0,0,.72)` / `rgba(0,0,0,.85)` ✅ applied |
| 4 | `--chart-1…5` | **Adopt the new expanded palette** | `viz/categorical/1…10` |

Decision 3 is the only one that changed a token **value**; it's already applied in
Figma + `tokens.css`. The other three are mapping choices that take effect when
components are swapped.

---

## 1. Clean maps — rename only, no visible change

These aliases can be swapped 1:1 with no (or imperceptible) visual difference.

| Legacy | → Semantic | Notes |
| --- | --- | --- |
| `--background` / `--card` / `--popover` | `surface/base` | exact both modes |
| `--foreground` | `text/base` | dark exact; light +2 steps lighter |
| `--muted-foreground` | `text/subtle` | dark exact; light darker = better AA · **215 uses** |
| `--muted` / `--secondary` | `surface/subtle` | dark exact |
| `--accent` | `surface/accent` | light exact; dark 1 step deeper |
| `--accent-foreground` | `text/accent` | light exact |
| `--primary-foreground` / `--destructive-foreground` | `action/label-inverse/base` | exact |
| `--destructive` | `action/negative/base` | exact both |
| `--destructive-hover` | `action/negative/hover` | exact |
| `--destructive-press` | `action/negative/press` | exact |
| `--success` | `action/positive/base` | exact (rename success→positive) |
| `--border` | `border/base` | dark solid → white@10% |
| `--disabled` | `surface/disabled` | solid gray → alpha role token |
| `--disabled-foreground` | `text/disabled` | solid → alpha role token |
| `--code-background` | `surface/inset` | alpha |
| `--skeleton` | `utility/surface-skeleton` | alpha |
| `--surface-info` | `status/surface-info` | light exact; dark alpha → solid 900 |
| `--surface-success` | `status/surface-positive` | success → positive |
| `--surface-warning` | `status/surface-warning` | — |
| `--surface-danger` | `status/surface-negative` | danger → negative |

---

## 2. Value shifts — the neutral redesign (these change how the app looks)

These are the deliberate visual changes. **Must ship as a reviewed step**, not
silently with the additive layer.

| Legacy | → Semantic | Shift |
| --- | --- | --- |
| `--primary` | `action/primary/base` | **blue #2272B4 → neutral #171717** · **74 uses** · the redesign |
| `--primary-hover` | `action/primary/hover` | neutral@90% |
| `--primary-press` | `action/primary/press` | neutral@80% |
| `--ring` | `focus/ring` | blue → dark/bold neutral ring |
| `--hover` | `action/default/hover` | blue tint removed → neutral |
| `--press` | `action/selected/press` | blue tint removed → neutral |
| `--input` | `input/border-base` | lighter at rest; emphasis moves to hover/focus |

> ⚠️ Adopting `--primary`/`--ring` flips light-mode primary from DuBois blue to
> neutral/black (the shadcn-style redesign). Deliberate; keep it a separate PR.

---

## 3. Dead — 0 usages, drop instead of migrate

`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`,
`--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`,
`--border-accessible`, `--card-foreground`, `--warning-foreground`, `--success-foreground`.

---

## 4. Keep as their own layer (not part of the semantic set)

| Token | Why |
| --- | --- |
| `--icon-folder` (`#8ACAFF`) | asset accent (= `viz/*` blue/400); theme-constant |
| `--ai-gradient` (start/mid/end) | brand gradient — stays its own layer |

---

## 5. Swap plan (later, per user: "once token work is stable and documented")

> **Execution detail lives in `token-migration-plan.md`** — the exact per-component
> utility rewrites (Stage A clean / B redesign / C cleanup), the `globals.css`
> cleanup diff, and the ~68-file batch order. Mechanism chosen: **per-component
> rewrite**. Nothing applied yet.

1. Keep the additive generated `tokens.css` layer shipping (done).
2. When a component migrates, replace its legacy utility with the semantic one
   (`bg-primary` → `bg-action-primary-base`, `text-muted-foreground` → `text-text-subtle`).
3. Ship §1 (clean maps) freely — no visual change.
4. Ship §2 (value shifts) as a **single reviewed redesign PR**.
5. Delete §3 dead tokens.
6. Once nothing references a legacy alias, remove it from `globals.css`.

Roughly: **26 clean renames · 7 value shifts · 4 resolved decisions · 12 dead · 2 kept**.
