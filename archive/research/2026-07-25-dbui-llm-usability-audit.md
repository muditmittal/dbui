# DBUI LLM-Usability Audit — 2026-07-25

**Date:** 2026-07-25
**Scope:** `packages/dbui` (component library, tokens, docs). Read-only.
**Question:** Is dbui usable *by LLMs* to build good UI fast, the way shadcn/ui is? Where does dbui diverge from shadcn in ways that make LLM output wrong or broken?
**Status:** Findings logged only. **No changes made.** Remediation intentionally deferred (see "Why deferred").

---

## Verdict

dbui's **code quality is high** — arguably cleaner than many shadcn forks — and its **AI-guidance layer is better than stock shadcn** (near-total `@guideline`/`@constraint` JSDoc, `component-index.md`, machine-readable rules). But dbui is **shadcn-inspired, not shadcn-compatible**. Four structural contract differences cause a shadcn-trained LLM's default output to fail, and three of the four fail *silently* rather than erroring. None are visual; all are fixable later without touching the design.

---

## Method (what was tested)

- Read-only inspection of `/Users/mudit.mittal/db-design-system` — no code executed, no files modified.
- Systematic review of `packages/dbui/src/components/ui/` (61 files), `src/lib/`, `src/tokens/globals.css`, `src/rules/`, `src/index.ts`, `package.json`, `vendor/tsconfig-paths.json`.
- Docs cross-check: `CLAUDE.md`, `docs/component-index.md`, `docs/component-rules.md`, `composition.md`, `install.md`, `skills/dbui-pick-component.md` — claims spot-checked against actual code.
- Repo-wide searches for `components.json`, `registry.json`, `@base-ui`, `asChild`, `forwardRef`, `data-slot`, `"use client"`, hardcoded hex/rgb/oklch.
- Comparison baseline: shadcn/ui conventions as of 2026 (Radix primitives, `asChild`, `@/` import aliases, `components.json` registry, `cn = twMerge(clsx(...))`).
- Two highest-impact findings were **verified by hand** (marked VERIFIED below); the remainder come from the systematic pass.

---

## Environment constraint (important context)

**Databricks does not permit installing npm packages** in the target environment. This is why dbui uses a copy-vendor install (git clone + `cp -r` + tsconfig path alias) with vendored dependencies rather than an npm/registry install.

Implication for this audit: the otherwise-obvious recommendation to "ship `components.json` + a registry so `npx shadcn add` works" **may not be viable internally**, since that path assumes network + npm access. Any future distribution work must be evaluated against this constraint, and likely needs an offline/vendored variant rather than a standard shadcn registry. Recorded here so the recommendation isn't blindly actioned later.

Separately noted by the owner: the current base setup is not yet clean enough for arbitrary Databricks users to install and use easily. Treated as known, out of scope for this pass.

---

## Findings

Severity = how much it degrades LLM output. All items are **status: deferred**.

### A. shadcn divergences that affect LLM output

**A1 — [HIGH] `asChild` does not work; Base UI uses a `render` prop. Fails silently. (VERIFIED)**
34 of 61 UI components import `@base-ui/react` (not Radix). Composition uses Base UI's `render` prop; only ~6 files use it. Triggers do not accept `asChild`, and `dropdown-menu.tsx` accepts then *discards* it:

```29:34:packages/dbui/src/components/ui/dropdown-menu.tsx
function DropdownMenuTrigger({
  asChild: _asChild,
  ...props
}: MenuPrimitive.Trigger.Props & { asChild?: boolean }) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}
```

Effect: the reflexive `<DialogTrigger asChild><Button/></DialogTrigger>` yields nested `<button><button>` (invalid HTML, broken styling); for DropdownMenu it is dropped with no type error. Highest-frequency LLM failure mode.

**A2 — [HIGH] Default `@/...` imports do not resolve.**
dbui uses `dbui/components/ui/*`, `dbui/components/icons/*`, `dbui/lib/utils`. Consumer aliasing maps only the `dbui/*` prefix:

```3:5:packages/dbui/vendor/tsconfig-paths.json
    "paths": {
      "dbui/*": ["./dbui/src/*"],
      "dbui-shells/*": ["./dbui-shells/src/*"],
```

An LLM emitting shadcn-standard `@/components/ui/button` resolves against the consuming app's own `@/` → module-not-found.

**A3 — [HIGH] No `components.json`, no registry.**
Repo-wide search returned **0** `components.json` and **0** `registry.json`. `apps/portal/src/app/r/` (referenced in docs) does not exist. So `npx shadcn@latest add ...` — the first action a shadcn-trained agent takes — is impossible. *See environment constraint above before actioning.*

**A4 — [MED] `cn()` omits `tailwind-merge`, so className overrides don't reliably win. (VERIFIED)**

```1:10:packages/dbui/src/lib/utils.ts
type ClassValue = string | number | boolean | null | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity)
    .filter((x): x is string | number => !!x && typeof x !== "boolean")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}
```

shadcn's `cn` is `twMerge(clsx(...))`. dbui's is a naive join, despite `clsx` and `tailwind-merge` both being declared dependencies in `packages/dbui/package.json`. Effect: passing `className="px-4"` to override a built-in `px-3` keeps *both*; the winner depends on CSS source order, not last-wins. This is the main mechanism LLMs use to tweak components.

Related, lower impact: `src/lib/cva.ts` is a local reimplementation of `class-variance-authority` rather than importing the package.

**A5 — [MED] Tailwind v4 CSS-first; radius scale redefined; a documented remap that isn't implemented.**
No `tailwind.config.*` exists; theming is `@theme inline` in `src/tokens/globals.css`. The radius scale is globally redefined (`--radius-sm` 4px, `md` 8px, `lg` 12px, `xl` 16px, `2xl` 24px, `3xl` 999px) vs stock Tailwind (2/6/8/12px), so `rounded-lg` renders 12px, not 8px.
More importantly, `CLAUDE.md` claims "Tailwind overrides: `text-sm` → 13px, `font-medium` → 600." **This is not implemented** — there are no `--text-sm` / `--font-weight-*` theme overrides; `body` merely sets `font-size: 13px` and components hardcode `text-[13px]`. An LLM trusting the docs and writing `text-sm`/`font-medium` silently gets 14px/500.

**A6 — [LOW] Modern shadcn API shape, but variant/size enums mismatch.**
Good: `data-slot` on ~57/61 files, 100% function components, zero `forwardRef`, props typed via `React.ComponentProps` / Base UI `*.Props`. Mismatch: Button sizes are `sm | md | icon-sm | icon-md` (`src/lib/button-variants.ts`) vs shadcn's `default | sm | lg | icon`, so `size="lg"`, `size="default"`, `size="icon"` silently fall back to the CVA default. Input/Select instead use `size="sm" | "default"` — so `size` means different literals on different components.

**A7 — [LOW] Inventory drift invites hallucinated imports.**
Approximate split of the 61 UI files vs shadcn: ~40 same-as-shadcn; ~4 renamed/restructured (`segment-control`, `combobox` covering shadcn's `command`+`popover`, `navbar`/`platform-header` vs shadcn `sidebar`); ~9-10 net-new (`data-tree`, `date-range`, `key-value-pair`, `status`, `tag`, `input-group`, `controls-bar`, `page-header`, `editor-tabs`, `radio-tile`); ~6 absent (Calendar/DatePicker, Form, Command, Carousel, Input-OTP, shadcn's Sidebar). LLMs will invent `<Command>`, `<Calendar>`, `<Form>`, `<Sidebar>`.

### B. Code quality / engineering

- **[Strength] B1 — TypeScript quality is high.** Props via `React.ComponentProps<...>` or Base UI `*.Props` with clean intersections/omits. Only ~8 `any` occurrences, confined to `navbar.tsx` and `data-tree.tsx`.
- **[Strength] B2 — Structure is remarkably consistent.** `"use client"` → imports → JSDoc → function component with `data-slot` + `cn(...)` → named exports. `@standard` JSDoc present in **61/61** files.
- **[MED] B3 — Accessibility is good but convention-enforced, not type-enforced.** Button manages `aria-busy`/`aria-disabled`; Dialog injects an `sr-only` close label. But icon-only sizes require a hand-written `aria-label` that nothing enforces, so a forgetful LLM ships an unlabeled button silently.
- **[MED] B4 — Cross-component coupling makes single-component installs infeasible.** `dialog`→`Button`, `combobox`→`Button`, `dropdown-menu`→`Checkbox`+`Input`, `data-tree`→~20 icon modules. No circular dependencies found. Fine for the whole-folder copy model; incompatible with shadcn's per-component registry model.
- **[LOW] B5 — One RSC gap.** 43/61 files declare `"use client"`. `tooltip.tsx` uses a client-only Base UI primitive but has no directive. Also `select.tsx` root lacks a `data-slot`.
- **[Strength] B6 — Little dead code; no leaked third-party icon imports.** Minor inconsistency: hand-rolled inline SVGs in `button.tsx` (ButtonChevron) and `dropdown-menu.tsx` (spinner) despite the "DBUI icons only" rule.
- **[Strength] B7 — Dark mode is clean.** No hardcoded hex/rgb/oklch anywhere in `components/ui/`; all color flows through semantic tokens defined for `:root` and `.dark`.

### C. LLM-friendliness assets (strengths worth preserving)

- **[Strength] C1 — Docs are extensive and mostly accurate.** `CLAUDE.md` (rules, screenshot→component map, "patterns LLMs get wrong"), `docs/component-index.md`, `docs/component-rules.md`, `docs/brandvoice.md`, `docs/icon-index.md`, `composition.md`, `install.md`.
- **[Strength] C2 — JSDoc coverage is essentially total** (`@standard` 61/61; most files carry 6-8 `@guideline`/`@constraint`/`@figma` tags). This is the single best LLM-steering asset and clearly exceeds stock shadcn.
- **[Strength] C3 — Rules are machine-consumable.** `rules/composition-rules.ts` and `rules/layout-rules.ts` export typed arrays and are re-exported from `src/index.ts`.
- **[LOW] C4 — Doc/code drift.** `docs/component-index.md` links to `docs/figma-mapping.md`, which has been deleted. `install.md` says "46 components" while the barrel exports 61. Icon count cited as 451 vs ~456 actual. Plus the A5 `text-sm`/`font-medium` claim.

---

## Ranked shadcn-parity gap (by LLM-failure impact)

1. `asChild` → `render` (silent breakage)
2. `@/...` imports don't resolve
3. No `components.json` / registry (note: constrained by Databricks no-npm policy)
4. `cn()` doesn't merge Tailwind classes
5. Missing/renamed components (Command, Calendar, Form, Sidebar)
6. Redefined radius scale + the false `text-sm`/`font-medium` remap claim
7. Size/variant enum mismatches

---

## Recommendations (logged, NOT actioned)

1. Real `asChild` adapter on every Trigger mapping to Base UI `render` — or throw loudly. Remove the silent-discard shim.
2. Fix `cn` to `twMerge(clsx(...))` (both deps already present).
3. Add `@/components/ui/*` and `@/lib/utils` compatibility aliases alongside the `dbui/*` ones.
4. Ship `components.json` + registry — **only if** the Databricks no-npm constraint can be satisfied; otherwise design an offline equivalent.
5. Add a "shadcn → dbui" translation table to `CLAUDE.md` / `component-index.md` (`asChild`→`render`, `@/`→`dbui/`, `Command`→`Combobox`, `Calendar`/`Form`/`Sidebar`→not available, `size="lg"/"icon"`→`md`/`icon-md`).
6. Reconcile docs vs code (dangling `figma-mapping.md`, component count, the `text-sm`/`font-medium` claim).
7. Add `"use client"` to `tooltip.tsx`; `data-slot` to the Select root.
8. Normalize or alias the `size` enum across Button/Input/Select.

### Why deferred
The owner does not yet want structural changes: the implications aren't fully understood, and the install/setup story is already a known pain point (compounded by the Databricks no-npm restriction). Changing `cn`, adding `asChild` adapters, or altering import aliases would ripple across existing components and the install path. Decision: **log now, revisit deliberately later.**

---

## Forward-looking standard (applies to all NEW code)

Existing code stays as-is, but anything added — `dbui-viz`, `dbui-genie`, and any new dbui component — must be LLM-friendly and respect shadcn principles:

1. **Composable subcomponents**, not monolithic props-bags (shadcn/Elements style).
2. **`data-slot` on every rendered element**; function components; props typed via `React.ComponentProps`.
3. **`className` override must win** — new packages need a `cn` that does `twMerge(clsx(...))`. *Open decision: reuse dbui's `cn` for consistency (inherits A4) vs ship a correct local `cn`.*
4. **Semantic tokens only** — no hardcoded colors or pixel values; light + dark via tokens.
5. **Match shadcn/AI-SDK-Elements naming** wherever a counterpart exists (`Conversation`, `Message`, `PromptInput`, `Reasoning`), so LLM priors transfer.
6. **Consistent `size`/`variant` enums**; alias shadcn's names rather than inventing new ones.
7. **`@standard` / `@guideline` / `@constraint` JSDoc on every component** — preserve dbui's biggest LLM advantage.
8. **Runtime-agnostic plain props** (no hard dependency on the `ai` package).
9. **Accessibility**: required `aria-label` for icon-only controls; keyboard support.
10. **`"use client"`** wherever a client-only primitive is used.

---

## Next: Part 2 (not yet run)

Owner will design reference screens in Figma. We then test whether LLMs can assemble complex UI from `dbui` + `dbui-viz` + `dbui-genie` against those specs, and feed observed failure modes back into JSDoc, `component-index.md`, and the rules files.
