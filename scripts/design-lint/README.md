# DBUI Design Lint

Two linters that enforce DBUI compliance:

- **react-lint** — scans `.ts` and `.tsx` for non-DBUI components, drift off the token families, and
  the non-negotiables in `AGENTS.md`. With no path it reads every source tree that ships UI: the
  portal, the shells, the components, Genie and viz. Files carrying a generated header are skipped,
  because a file nobody wrote is not a file anybody fixes
- **figma-lint** — scans a Figma frame/page/component for non-DBUI instances and unbound colors/spacing/fonts/radii

Both produce a markdown report listing **violations + recommended fixes**.

---

## Quick start

```bash
# React lint
yarn design:lint:react                                              # whole repo
yarn design:lint:react apps/portal/src/stories/Card.stories.tsx     # single file
yarn design:lint:react --json > /tmp/report.json                    # machine-readable
yarn design:verify-rules                                            # prove every rule still works

# Regenerate the two allowlists the rules read
yarn design:tokens            # theme.config.mjs → tokens.css, type.css, tokens.json
yarn design:sync-components   # the packages → dbui-components.json

# Figma lint — generates the runtime payload
yarn design:lint:figma --target 3247:5956 > /tmp/figma-lint.js
# Then ask Cursor (with Figma MCP) to run the script via use_figma:
#   use_figma({ fileKey: "OftbSQf85jOPln9RhSEhVv", code: <contents of /tmp/figma-lint.js> })
```

---

## What each lint checks

### react-lint

**Components and composition**

| Rule | Level | What it catches |
|---|---|---|
| `no-raw-interactive-html` | error | `<button>`, `<input>`, `<select>` or `<textarea>` where a DBUI control exists. `packages/dbui/src/components/ui/` is exempt from this rule alone — `Button` is a `<button>`, and a raw control there is DBUI defining what it exports. |
| `no-as-child` | error | `asChild` on any element. Base UI has no such prop — it accepts it, drops it, and renders its own element around the child. Use `render`. |
| `non-dbui-component` | error | A name imported from a DBUI package that the package does not export. Either the import is broken or `dbui-components.json` is stale. |

**Colour**

| Rule | Level | What it catches |
|---|---|---|
| `no-arbitrary-color` | error | `bg-[#abc]` where the hex is not a DBUI value. |
| `no-hardcoded-hex` | error | A hex inside a longer className value, like `shadow-[0_0_0_1px_#abc]`. |
| `inline-hardcoded-color` | error | `style={{ color: '#abc' }}`. |
| `no-module-color-literal` | error | A colour written into a module rather than a className — a `.ts` palette, a hoisted style object. Allowlisted or not: a value in a module has one value in both modes. |
| `no-primitive-token` | error | A raw primitive consumed directly — `var(--interface-neutral-600)`. Product code takes semantics only (R2). |
| `no-legacy-token` | error | A shadcn-flat name the migration deleted — `bg-primary`, `text-foreground`, `var(--muted)`. Nothing declares it, so the property drops silently. |

**Dimensions**

| Rule | Level | What it catches |
|---|---|---|
| `off-scale-spacing` | error | A padding, margin, gap or inset off the space family, in either spelling — `gap-1.5` as well as `gap-[6px]`. |
| `off-scale-size` | error | The same for a width, height or icon box against the size family, which carries different stops. |
| `inline-off-scale-spacing` | warning | The same in an inline style. |
| `non-token-radius` | warning | `rounded-[Npx]` that is not a radius stop. |
| `prefer-token-class` | warning | A value that is on a family but written as `[…]` instead of named. |

**Type**

| Rule | Level | What it catches |
|---|---|---|
| `px-type-literal` | error | `text-[13px]` or `leading-[16px]` — on the ramp, and still unable to follow it when the root size changes. |
| `off-ramp-type-size` | error | `text-[Npx]` where N is not a ramp size. |
| `off-ramp-line-height` | warning | `leading-[Npx]` where N is not a ramp line height. |
| `type-class-conflict` | error | A `type-*` utility paired with `leading-`, `font-` or a case utility. Each ramp class is the whole style. |
| `inline-type-literal` | error | `fontSize`, `lineHeight`, `fontWeight`, `fontFamily`, `letterSpacing` or `textTransform` in an inline style. |

Every family, ramp step and legacy name these rules read comes from
`tokens.json`, which is generated from `theme.config.mjs`. None of them carries
its own copy of the scale.

The React report footer prints a **Token compliance** line: `NN% (good/total var() references use a semantic token; N use a raw primitive)`.

### Keeping the rules honest

`__fixtures__/violations.tsx` plants one deliberate defect per rule and
`__fixtures__/clean.tsx` writes the correct form of each.
`yarn design:verify-rules` asserts that every rule fires on the first and none
fire on the second, reading the rule list out of `react-lint.js` so a new rule
with no fixture fails the check.

Both halves have failed here unnoticed. `off-scale-spacing` read only bracket
values, so it watched 64 six-pixel sites land and said nothing.
`off-ramp-line-height` compared against a field the generator does not emit, so
it fired on every correct line height. A linter that never fires and one that
always fires look the same from the outside.

### figma-lint

| Rule | Level | What it catches |
|---|---|---|
| `non-dbui-component` | error | INSTANCE whose master isn't in DBUI's published library. |
| `instance-no-main-component` | warning | INSTANCE that lost its main component (detached or missing). |
| `non-token-fill` | error | Solid fill not bound to a variable AND not in the approved hex list. |
| `non-token-stroke` | error | Solid stroke not bound to a variable AND not approved. |
| `primitive-bound-fill` | warning | Fill bound to a **Color: Primitive** variable instead of a semantic token — the design equivalent of consuming a raw primitive (R2). |
| `primitive-bound-stroke` | warning | Stroke bound to a **Color: Primitive** variable instead of a semantic token. |
| `off-scale-spacing` | warning | Auto-layout `paddingTop/Right/Bottom/Left` or `itemSpacing` not on the 4px scale. |
| `non-token-font` | warning | Text node using a font outside SF Pro Text / SF Pro Display / SF Mono. |
| `off-ramp-type-size` | warning | Text font size not on the DBUI type ramp. |
| `non-token-radius` | warning | `cornerRadius` not in the radius set (4/8/12/16/24/999). |

Every violation includes a **fix** suggesting the closest valid token or DBUI replacement.

The Figma report's `summary.tokenCompliance` gives the headline **"are these mocks using the design system?"** score:

```jsonc
"tokenCompliance": {
  "colorProps": 128,      // solid fills + strokes checked
  "semanticBound": 112,   // bound to a Color: Semantic token  ← the good ones
  "primitiveBound": 4,    // bound to a raw primitive (R2 warning)
  "otherBound": 2,        // bound to a non-color collection (allowed)
  "unbound": 10,          // hardcoded hex (error unless it happens to be approved)
  "scorePct": 88          // semanticBound / colorProps
}
```

---

## Example output

```
# DBUI React Design Lint Report

Scanned 1 file.
- 3 errors
- 0 warnings
- 0 info

## apps/portal/src/components/DocsNav.tsx

| Line | Level | Rule | Element | Message | Fix |
| --- | --- | --- | --- | --- | --- |
| 13 | error | off-scale-spacing | <Link> | `py-1.5` is 6px, which the space family does not carry. | Nearest stop is 8px — py-2. |
| 13 | error | off-scale-spacing | <Link> | `pl-5` is 20px, which the space family does not carry. | Nearest stop is 24px — pl-6. |
| 13 | error | type-class-conflict | <Link> | `type-label` is paired with `font-semibold`. | Drop `font-semibold`. |
```

---

## Configuration

### Allow-listed components
`scripts/design-lint/dbui-components.json` — every DBUI export, by package, plus the icons.
**Generated, never hand-edited.** Re-run it whenever a component, shell or icon is added or removed:

```bash
yarn design:sync-components   # node scripts/design-lint/sync-components.mjs
```

It reads each package's barrel and resolves `export *` through the compiler, so a re-export cannot
go missing. Hand-maintained, this file had drifted both ways — 83 exports absent and 10 names still
listed that nothing exported — and its `icons` key held a placeholder string instead of the 456
icon names, so every icon in the tree came back as an unknown component.

### Token source & generator
`packages/dbui/src/tokens/theme.config.mjs` is the **one authored source** for all color tokens (primitives + semantics) and the scale system (scalars, space/radius/type/elevation). The generator turns it into the shipped CSS and the linter allowlist — both **generated, never hand-edited**:

```bash
yarn design:tokens   # theme.config.mjs → tokens.css (--db-* semantics + scale) + tokens.json
```

Primitives are **generator input only** — they resolve inline into the semantics and ship in no CSS.

### Token compliance rules
`packages/dbui/docs/token-rules.md` — the full color-token contract (architecture, naming, Figma↔code Code Connect, and the machine-enforceable rules R1–R13). This is the spec the token-compliance linter implements.

### Figma ↔ code sync check
`yarn design:verify-sync` proves the token system is 1:1 across `theme.config.mjs`, `tokens.css`, and Figma (primitive/semantic parity, light/dark parity, one utility per semantic, no primitive leaking into code, and a value round-trip). It reads `.figma-token-dump.json` — refresh that snapshot with the `use_figma` dump documented at the top of `verify-token-sync.mjs` whenever Figma variables change.

```bash
yarn design:verify-sync
```

---

## Roadmap

### Short term
- [x] **Token generator**: `yarn design:tokens` generates `tokens.css` (+ `tokens.json`) from the single source `theme.config.mjs`.
- [x] **Sync script (components)**: `yarn design:sync-components` regenerates `dbui-components.json` from the packages.
- [x] **Token-compliance R2 (primitive-direct)**: `no-primitive-token` (code) + `primitive-bound-fill/stroke` (Figma) + a compliance score on both sides.
- [ ] **Token-compliance rules R3–R12**: implement the remaining `🔜 planned` checks in `docs/token-rules.md` (role mismatch, light/dark parity, disabled model, Figma↔code parity).
- [ ] **Storybook badge**: render the lint report inside a Storybook addon panel so designers see it next to each story.
- [ ] **CI**: run `yarn design:lint:react` on every PR; fail on errors, comment on warnings.

### Medium term
- [ ] **Figma plugin packaging**: turn `figma-lint.runtime.js` into a real Figma plugin (`manifest.json`, UI panel) so designers can lint a frame without going through MCP.
- [ ] **Auto-fix**: for clear cases (`w-[320px]` → `w-80`, `bg-[#FFFFFF]` → `bg-background`), emit a fix that can be applied via codemod.

### Long term
- [ ] **Token-aware suggestions**: instead of "use a token", say _exactly_ which token (`bg-[#2272B4]` → `bg-primary`).
- [ ] **Component-aware lint**: enforce composition rules (e.g. "Link variant must not have `<ButtonIcon>`") — already encoded as data in `packages/dbui/src/rules/composition-rules.ts`.

---

## How it integrates with the design-to-code workflow

```
┌─────────────┐                                          ┌─────────────┐
│   Figma     │                                          │   React     │
│   Library   │                                          │   Library   │
└──────┬──────┘                                          └──────┬──────┘
       │                                                        │
       │  edit                                                  │  edit
       ▼                                                        ▼
┌─────────────┐                                          ┌─────────────┐
│ figma-lint  │  ←─ shared tokens.json + components.json ─→│ react-lint  │
│ (on a frame)│                                          │ (on a file) │
└──────┬──────┘                                          └──────┬──────┘
       │                                                        │
       └─→ violations + fixes ←─────── designers + devs ────────┘
              (markdown report, JSON for CI)
```

**Single source of truth**: `tokens.json` and `dbui-components.json` are read by both lints. Update them in one place when the design system changes.
