# DBUI Design Lint

Two linters that enforce DBUI compliance:

- **react-lint** — scans `.ts` and `.tsx` for non-DBUI components, drift off the token families,
  accessibility defects, and the non-negotiables in `AGENTS.md`. With no path it reads every source
  tree that ships UI: the portal, the shells, the components, chat and viz. Files carrying a
  generated header are skipped, because a file nobody wrote is not a file anybody fixes
- **figma-lint** — scans a Figma frame/page/component for non-DBUI instances and off-set or unbound
  color, spacing, radius, size, border, font, type size and line height

Both produce a markdown report listing **violations + recommended fixes**, and both emit the same
finding schema so one report can join them.

---

## The three verbs

Everything routes through three commands. The split is what each one is for: **generate** writes
artifacts, **audit** passes or fails, **measure** reports numbers without a verdict.

```bash
yarn design:generate   # 9 generators, in dependency order. Writes tokens, indexes, portal data.
yarn design:audit      # the gate. Exits non-zero on any error.
yarn design:measure    # token parity, orphans, dimensional usage. Always exits 0.
```

`design:audit` runs, in order — each must pass before the next:

| Step | Asserts |
|---|---|
| `verify-token-sync` | config ↔ tokens.css ↔ Figma agree. `--strict` also fails when Figma values cannot be compared |
| `verify-rules` | every lint rule fires, stays silent on the correct form, and classifies into the schema |
| `verify-spacing-scale` | the dimensional families are defined and bridged (59 assertions) |
| `verify-us-spelling` | American spelling in authored files, per `brandvoice.md` |
| `react-lint` | the 25 rules below |

## Individual commands

```bash
# React lint
yarn design:lint:react                                              # whole repo
yarn design:lint:react apps/portal/src/stories/Card.stories.tsx     # single file
yarn design:lint:react --json > /tmp/report.json                    # machine-readable envelope
yarn design:verify-rules                                            # prove every rule still works
yarn design:spelling                                                # add --fix to rewrite

# Regenerate the two allowlists the rules read
yarn design:tokens            # theme.config.mjs → tokens.css, type.css, tokens.json
yarn design:sync-components   # the packages → dbui-components.json

# Figma lint — generates the runtime payload
yarn design:lint:figma --target 3247:5956 > /tmp/figma-lint.js
# Then ask Cursor (with Figma MCP) to run the script via use_figma:
#   use_figma({ fileKey: "OftbSQf85jOPln9RhSEhVv", code: <contents of /tmp/figma-lint.js> })
```

## How these are invoked

They are **plain Node scripts behind yarn commands**. Not skills, and not an MCP server.

| Caller | How |
|---|---|
| A person | `yarn design:audit` in a terminal |
| An agent in this repo | the same command — `AGENTS.md` tells it to run `yarn design:lint:react <path>` on any file it changes |
| CI | not wired. `TRACKER` M1 is the open decision |
| Figma | the one exception — `design:lint:figma` prints a payload that an **MCP host** runs through the Figma plugin API via `use_figma`. It cannot run headless, so it is on-demand and per-frame rather than part of `design:audit` |

The asymmetry is worth stating plainly: **code is checked exhaustively and Figma is sampled.** Any
report combining the two inherits that.

---

## What each lint checks

### react-lint

**Components and composition**

| Rule | Level | What it catches |
|---|---|---|
| `no-raw-interactive-html` | error | `<button>`, `<input>`, `<select>` or `<textarea>` where a DBUI control exists. `packages/dbui/src/components/ui/` is exempt from this rule alone — `Button` is a `<button>`, and a raw control there is DBUI defining what it exports. |

**Accessibility**

Only defects decidable from the source. Contrast, focus order, reading order and landmark structure
are absent on purpose — none is knowable without rendering, and a rule that guessed at them would
report confidently and be wrong. `/docs/accessibility` says those are done by a person.

| Rule | Level | What it catches |
|---|---|---|
| `a11y-icon-control-no-name` | error | A control at `size="icon-sm"` or `"icon-md"` with no `aria-label`, `aria-labelledby` or `title`. It renders no text, so the glyph is the whole control. `button.tsx` has carried this as a `@constraint` since before anything enforced it — and the shipped `Dialog` close button was breaking it. |
| `a11y-img-no-alt` | error | `<img>` with no `alt` attribute. `alt=""` passes: absence is the defect, emptiness is the correct way to say decorative. |
| `a11y-positive-tabindex` | error | `tabIndex` above 0, which lifts one element out of document order and pushes every other focusable thing on the page behind it. |
| `a11y-aria-hidden-focusable` | error | `aria-hidden` on something Tab still reaches. `tabIndex={-1}` settles it before the tag does, so the hidden-and-unfocusable pair passes. |
| `a11y-click-no-semantics` | error | `onClick` on a `div`, `span`, `li`, `td` or section element with no `role` and no `tabIndex` — the action exists for a mouse and for nothing else. |
| `no-as-child` | error | `asChild` on any element. Base UI has no such prop — it accepts it, drops it, and renders its own element around the child. Use `render`. |
| `non-dbui-component` | error | A name imported from a DBUI package that the package does not export. Either the import is broken or `dbui-components.json` is stale. |

**Color**

| Rule | Level | What it catches |
|---|---|---|
| `no-arbitrary-color` | error | `bg-[#abc]` where the hex is not a DBUI value. |
| `no-hardcoded-hex` | error | A hex inside a longer className value, like `shadow-[0_0_0_1px_#abc]`. |
| `inline-hardcoded-color` | error | `style={{ color: '#abc' }}`. |
| `no-module-color-literal` | error | A color written into a module rather than a className — a `.ts` palette, a hoisted style object. Allowlisted or not: a value in a module has one value in both modes. |
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
its own copy of the scale. That now holds for the Figma runtime too: it used to
keep its own radius allowlist and spell the stops out in each fix message, and
both agreed with the system by coincidence rather than by construction.

The React report footer prints a **Token compliance** line: `NN% (good/total var() references use a semantic token; N use a raw primitive)`.

### The finding schema

Both linters emit the same shape, because they judge the same properties against
the same sets and differ only in how a value reaches the surface:

| Field | Meaning |
| --- | --- |
| `surface` | `react` or `figma` |
| `object` | the join key — `file:line:element` in code, the node id in Figma |
| `family` | `value` or `structure` |
| `property` | `color`, `spacing`, `size`, `radius`, `type-size`, `line-height`, `font`, … |
| `verdict` | `off-set`, `unnamed`, `unreachable`, `stale`, `conflict`, `incomplete` |
| `channel` | `class`, `arbitrary`, `inline-style`, `module-literal`, `figma-paint`, `figma-binding`, … |

A rule name still says *how a value was written*; `property:verdict` says *what
is wrong*. `no-hardcoded-hex`, `no-arbitrary-color`, `inline-hardcoded-color` and
Figma's `non-token-fill` are four names for `color:off-set`.

`--json` returns `{ surface, scanned, summary, violations, byObject }`.
`byObject` groups findings on the thing they are about, so an element failing
three checks reads as one diagnosis rather than three lines.

### Keeping the rules honest

`__fixtures__/violations.tsx` plants one deliberate defect per rule and
`__fixtures__/clean.tsx` writes the correct form of each.
`yarn design:verify-rules` makes three assertions, reading the rule list out of
`react-lint.js` so a new rule with no fixture fails the check:

1. every rule fires on `violations.*`
2. none fires on `clean.tsx`
3. every rule has a `RULE_SCHEMA` entry, and every verdict is one the report
   knows how to read — otherwise a new rule falls through to the defaults and
   groups as its own property for ever, which is the flat list the schema
   replaces, returning one rule at a time

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
