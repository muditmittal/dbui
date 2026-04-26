# DBUI Design Lint

Two linters that enforce DBUI compliance:

- **react-lint** — scans `.tsx` files for non-DBUI components and arbitrary token values
- **figma-lint** — scans a Figma frame/page/component for non-DBUI instances and unbound colors/spacing/fonts/radii

Both produce a markdown report listing **violations + recommended fixes**.

---

## Quick start

```bash
# React lint
yarn design:lint:react                                              # whole repo
yarn design:lint:react apps/portal/src/stories/Card.stories.tsx     # single file
yarn design:lint:react --json > /tmp/report.json                    # machine-readable

# Figma lint — generates the runtime payload
yarn design:lint:figma --target 3247:5956 > /tmp/figma-lint.js
# Then ask Cursor (with Figma MCP) to run the script via use_figma:
#   use_figma({ fileKey: "OftbSQf85jOPln9RhSEhVv", code: <contents of /tmp/figma-lint.js> })
```

---

## What each lint checks

### react-lint

| Rule | Level | What it catches |
|---|---|---|
| `non-dbui-component` | info | A `<PascalCase>` element that isn't in `dbui-components.json`. Could be intentional (custom product code) or a typo. |
| `prefer-dbui-wrapper` | warning | Plain HTML tag (`<div>`, `<button>`, `<h1>`, etc.) where a DBUI wrapper is usually preferred (`Card`, `Button`, `PageHeaderTitle`, etc.). |
| `no-arbitrary-color` | error | Tailwind arbitrary color like `bg-[#abc]` or `text-[#fafafa]` that isn't a DBUI hex. |
| `prefer-token-class` | warning | Arbitrary value matches a DBUI token but uses `[…]` syntax — should be a named class. |
| `off-scale-spacing` | error | Spacing utility like `p-[7px]`, `gap-[5px]` that isn't on the 4px scale. |
| `off-ramp-type-size` | error | `text-[Npx]` where N isn't on the type ramp (12, 13, 16, 22, 32). |
| `off-ramp-line-height` | warning | `leading-[Npx]` not on the ramp. |
| `non-token-radius` | warning | `rounded-[Npx]` not a DBUI radius (4/8/12/16/24/999). |
| `inline-hardcoded-color` | error | `style={{ color: '#abc' }}` with a non-token hex. |
| `inline-off-scale-spacing` | warning | Inline `style` with off-scale `padding`/`margin`/`gap`/etc. |

### figma-lint

| Rule | Level | What it catches |
|---|---|---|
| `non-dbui-component` | error | INSTANCE whose master isn't in DBUI's published library. |
| `instance-no-main-component` | warning | INSTANCE that lost its main component (detached or missing). |
| `non-token-fill` | error | Solid fill not bound to a variable AND not in the approved hex list. |
| `non-token-stroke` | error | Solid stroke not bound to a variable AND not approved. |
| `off-scale-spacing` | warning | Auto-layout `paddingTop/Right/Bottom/Left` or `itemSpacing` not on the 4px scale. |
| `non-token-font` | warning | Text node using a font outside SF Pro Text / SF Pro Display / SF Mono. |
| `off-ramp-type-size` | warning | Text font size not on the DBUI type ramp. |
| `non-token-radius` | warning | `cornerRadius` not in the radius set (4/8/12/16/24/999). |

Every violation includes a **fix** suggesting the closest valid token or DBUI replacement.

---

## Example output

```
# DBUI React Design Lint Report

Scanned 1 file.
- 0 errors
- 6 warnings
- 2 info

## apps/portal/src/stories/Card.stories.tsx

| Line | Level | Rule | Element | Message | Fix |
| --- | --- | --- | --- | --- | --- |
| 26 | warning | prefer-dbui-wrapper | <div> | <div> is allowed but a DBUI wrapper is usually preferred. | Consider wrapping content semantics in <Card>, <Field>, etc. |
| 40 | warning | prefer-token-class | <Card> | w-[320px] is on-scale but arbitrary — prefer the named utility. | Replace with w-80. |
| 73 | info | non-dbui-component | <ComponentMeta> | <ComponentMeta> is not a known DBUI component. | Verify intentional. If it's local product code, this is fine. |
```

---

## Configuration

### Allow-listed components
`scripts/design-lint/dbui-components.json` — every DBUI export. Re-generate when components are added/removed:

```bash
# Regenerate from source (currently a manual step — TODO: add a sync script)
grep -hE "^export \{" packages/dbui/src/components/ui/*.tsx | … > scripts/design-lint/dbui-components.json
```

### Allow-listed tokens
`scripts/design-lint/tokens.json` — colors, spacing, type ramp, fonts, radii. Re-generate when `packages/dbui/src/tokens/globals.css` changes.

---

## Roadmap

### Short term
- [ ] **Sync scripts**: auto-regenerate `dbui-components.json` and `tokens.json` from source.
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
