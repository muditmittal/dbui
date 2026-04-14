y# DBUI Design System — Agent Rules

> These rules govern all AI-assisted work in this repo, especially Figma MCP integration.
> Read `research/DESIGN-SYSTEM-DECISIONS.md` for full rationale behind each decision.

## Project Overview

DBUI is a shadcn-based component library reskinned with Databricks DuBois design tokens. It bridges Figma ↔ Code via Code Connect and is documented at a portal site.

- **Figma file:** `OftbSQf85jOPln9RhSEhVv` (DBUI-Design-System)
- **Portal:** dbuidesign.vercel.app
- **Architecture:** Yarn monorepo — see `ARCHITECTURE.md`

---

## 1. Component Organization

- **Source of truth (code):** `packages/dbui/src/components/ui/` — the DuBois-reskinned components
- **Icons:** `packages/dbui/src/components/icons/` — 451 React icon components, one per file
- **Variant utilities:** `packages/dbui/src/lib/button-variants.ts` (CVA definitions)
- **Tokens:** `packages/dbui/src/tokens/globals.css` — CSS custom properties
- **Code Connect:** `packages/dbui/src/figma/*.figma.js` — maps Figma components to code
- **LLM context:** `packages/dbui/llms.txt` — single-file reference for AI tools
- **Registry:** `apps/portal/src/app/r/` — dynamic shadcn registry API (serves live source)
- **Portal:** `apps/portal/` — preview/inspection tool (imports from dbui package)
- **Legacy kit:** `apps/dbui/` — original shadcn base (superseded by packages/dbui)
- **Config:** `figma.config.json` at repo root

IMPORTANT: When implementing Figma designs, use components from `packages/dbui/src/components/ui/`. This is the authoritative DuBois-reskinned set.

---

## 2. Design Token System

### Token Architecture (162 total tokens)
- **47 semantic colors** — defined as CSS custom properties in `apps/portal/src/app/globals.css`
- **68 primitive colors** — in Figma only (Primitives collection)
- **8 radius** — `--radius-sm` (4px) through `--radius-2xl` (999px)
- **7 spacing** — 8px base scale
- **5 shadow effects** — xs through xl
- **8 text styles** — Hint, Paragraph, Bold, Title 4–1, Code
- **19 typography variables** — size, line-height, weight

### Figma Variable Collections
```
Semantic (47 colors, 2 modes: Light/Dark)
├── surface/    — background, card, popover, secondary, muted, accent, sidebar
├── text/       — foreground, *-foreground pairs
├── action/     — primary, destructive, warning, success, ring, hover, press, disabled
├── border/     — border, input, border-accessible
├── chart/      — chart-1 through chart-5
├── utility/    — overlay, code-background, skeleton
└── brand/      — ai-gradient-start/mid/end

Numbers (radius, spacing)
Typography (size, line-height, weight)
Effects (shadow xs–xl)
```

### Token Principles
- IMPORTANT: Never hardcode hex colors — always use semantic tokens
- Surface/foreground pairing: every surface has a `--{name}-foreground` companion
- Interactive states use opacity composition: hover = primary@8%, press = primary@16%
- Exception: filled buttons use explicit `--primary-hover`, `--primary-press` (alpha can't darken)
- `--border` = decorative dividers, `--input` = form borders (darker), `--ring` = focus indicator
- No redundant aliases: `--link` removed (use `--primary`), `--info` removed (use `--primary`)

### CSS Token Reference
```css
/* Light mode values — see packages/dbui/src/tokens/globals.css for full list */
--primary: #2272B4;          /* Databricks blue */
--primary-foreground: #FFFFFF;
--accent: #D7EDFE;           /* blue200 — selected/active backgrounds */
--destructive: #C82D4C;
--warning: #BE501E;
--success: #277C43;
--background: #FFFFFF;
--foreground: #161616;
--border: #EBEBEB;
--input: #CBCBCB;
--ring: #2272B4;
--hover: rgba(34, 114, 180, 0.08);
--press: rgba(34, 114, 180, 0.16);
--overlay: rgba(64, 63, 63, 0.72);
--ai-gradient: linear-gradient(90deg, #4299E0 24%, #CA42E0 47%, #FF5F46 76%);
```

---

## 3. Typography

- **Font family:** SF Pro Text (body), SF Pro Display (headings), SF Mono (code)
- **Base font size:** 13px (NOT shadcn's 14px or browser 16px)
- **Font weight:** Regular (400) for body, Semibold (600) for labels/headings
- IMPORTANT: All components use `text-[13px] leading-[20px] font-normal` — not `text-sm font-medium`
- Tailwind overrides: `text-sm` → `text-[13px]`, `text-xs` → `text-[12px]`, `font-medium` → `font-semibold`

---

## 4. Component Styling Patterns

### Radius
- Buttons, inputs, selects, menu items: `rounded-sm` (4px) — mapped via `--radius-sm`
- Dialogs, popups, dropdowns, alerts: `rounded-md` (8px) — mapped via `--radius-md`
- Cards: `rounded-xl` (16px) — mapped via `--radius-xl`
- Badges, pills: `rounded-full` (999px)

### Shadows
- Form controls (inputs, selects, buttons): `shadow-xs` (0 1px 0 rgba(0,0,0,0.05))
- Popovers, dropdowns: `shadow-md` + `ring-1 ring-foreground/10`
- Dialogs: `shadow-lg` + `ring-1 ring-foreground/10`
- Ghost/link variants: no shadow

### Interactive States (non-filled variants)
- Hover background: `bg-hover` (primary@8% opacity)
- Hover border: `border-primary` on form controls
- Press background: `bg-press` (primary@16% opacity)
- Disabled: `bg-disabled text-disabled-foreground pointer-events-none shadow-none`

### Interactive States (filled variants — Primary, Destructive)
- Hover: `bg-primary-hover` / `bg-destructive-hover` (explicit darker token)
- Press: `bg-primary-press` / `bg-destructive-press`

### Focus Rules
- Text inputs (Input, Textarea, Select, Combobox): `focus-visible:border-ring` (1px border change only, NO shadow-focus, NO border-2)
- Filled buttons (Primary, Destructive): `focus-visible:shadow-focus` (outer ring)
- Non-filled buttons (Outline, Ghost, Link, Danger): `focus-visible:border-2 focus-visible:border-ring`
- Checkbox, Radio, Switch: `focus-visible:shadow-focus` (outer ring always)
- Danger variant focus: uses `border-ring` (blue) NOT `border-destructive` (red)

### Validation States
- Error: `border-destructive` (1px border only, NO outer ring shadow)
- Warning: `border-warning` (1px border only)
- Success: `border-success` (1px border only)
- Validation states are border-only at rest. No ring, no shadow changes.

---

## 5. Figma MCP Integration Rules

### Required Flow for Implementing Figma Designs
1. Run `get_design_context` for the target node(s)
2. Run `get_screenshot` for visual reference
3. Map Figma tokens to CSS custom properties (see token mapping below)
4. Reuse components from `apps/portal/src/components/ui/`
5. Validate against screenshot for 1:1 parity

### Figma → Code Token Mapping
| Figma Variable Path | CSS Custom Property | Tailwind Class |
|---------------------|--------------------:|----------------|
| `surface/background` | `--background` | `bg-background` |
| `text/foreground` | `--foreground` | `text-foreground` |
| `action/primary` | `--primary` | `bg-primary` / `text-primary` |
| `action/primary-foreground` | `--primary-foreground` | `text-primary-foreground` |
| `action/destructive` | `--destructive` | `bg-destructive` / `text-destructive` |
| `border/input` | `--input` | `border-input` |
| `border/border` | `--border` | `border-border` |
| `action/ring` | `--ring` | `border-ring` / `ring-ring` |
| `action/hover` | `--hover` | `bg-hover` |
| `action/press` | `--press` | `bg-press` |
| `action/disabled` | `--disabled` | `bg-disabled` |
| `text/muted-foreground` | `--muted-foreground` | `text-muted-foreground` |

### Figma → Code Naming Differences
| Figma Name | Code Name | Notes |
|------------|-----------|-------|
| "Primary" variant | `variant="default"` | CVA default; Figma label matches DuBois |
| "Danger" variant | `variant="danger"` | Bordered red; distinct from filled `destructive` |
| Size "Default" | `size="md"` | 32px height |
| Size "Small" | `size="sm"` | 24px height |
| `primary-press` | `--primary-press` | Standardized — Figma renamed from `primary-active` to `primary-press` (2026-04-10) |
| `destructive-press` | `--destructive-press` | Standardized — Figma renamed from `destructive-active` to `destructive-press` (2026-04-10) |

---

## 6. Figma Component Building Rules

When creating or updating Figma components via `use_figma`:

### PREFER SKILLS OVER RAW API:
- IMPORTANT: When building or updating Figma components, prefer invoking `/figma-generate-library` or `/figma-generate-design` skills over raw `use_figma` calls. These skills produce production-grade components with proper layout, variable bindings, and designer-friendly structure.
- Only use raw `use_figma` for targeted fixes (e.g., adding a shadow, renaming variants, binding a variable) — NOT for creating full components from scratch.

### ZERO HARDCODED VALUES (mandatory for every component):
- IMPORTANT: Every visual property must be bound to a Figma variable or style. No hardcoded hex, pixel values, or raw font settings anywhere.
- Before marking any component done, run an audit `use_figma` call to verify all bindings.

### Property Binding Rules

**Layout — must use Numbers/spacing variables:**
- `paddingLeft`, `paddingRight` → spacing token (Default size=`spacing/spacing-mid`/12px, Small=`spacing/spacing-sm`/8px)
- `paddingTop`, `paddingBottom` → spacing token (even if 0 — use `spacing/spacing-0`)
- `itemSpacing` (gap) → spacing token if > 0 (typically `spacing/spacing-xs`/4px)
- IMPORTANT: ALL four padding values must be variable-bound on EVERY variant, including zero values

**Corner Radius — must use Numbers/radius variables:**
- All four corners (`topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius`) → `radius/radius-sm` for form controls, `radius/radius-md` for containers

**Colors — must use Semantic variables:**
- Stroke/border → bound via `setBoundVariableForPaint` to semantic variable
- Fill/background → bound via `setBoundVariableForPaint` to semantic variable
- Text fill → bound via `setBoundVariableForPaint` on text node
- No raw hex anywhere — every color comes from a Figma variable

**Typography — must use text styles:**
- IMPORTANT: Every text node must have a `textStyleId` applied (e.g., `Paragraph`, `Hint`, `Bold`)
- Never set `fontSize`, `fontName`, `lineHeight` directly — always via text style
- If text style doesn't exist, create it first as a local style

**Effects — must use effect styles:**
- Form control default/hover: apply `shadow/shadow-xs` effect style
- Focus states: apply `shadow/shadow-focus` effect style (+ `shadow/shadow-xs` effects appended)
- Error states: destructive ring (spread=3, destructive@20% opacity) + `shadow/shadow-xs` effects
- Disabled states: no effects
- Exception: spread shadow colors can't bind to variables (Figma limitation) — hardcoded OK but document exact values

### Form Control State Rules (Input, Select, Textarea, Combobox)

| State | Stroke Variable | Fill | Effect | Text Color | Opacity |
|-------|----------------|------|--------|------------|---------|
| Default | `border/input` | none | `shadow/shadow-xs` style | `text/muted-foreground` (placeholder) or `text/foreground` (value) | 1.0 |
| Hover | `action/primary-hover` | none | `shadow/shadow-xs` style | same as Default | 1.0 |
| Focus | `action/ring`, strokeWeight=2 | none | `shadow/shadow-focus` + `shadow/shadow-xs` effects | `text/foreground` | 1.0 |
| Disabled | `border/input` | `border/input` @ 50% opacity | none | `text/muted-foreground` | 0.5 on frame |
| Error | `action/destructive` | none | destructive ring + `shadow/shadow-xs` effects | `text/foreground` | 1.0 |

### Size → Token Mapping (Form Controls)

| Property | Default (32px) | Small (24px) |
|----------|---------------|--------------|
| Height | 32px fixed | 24px fixed |
| Horizontal padding | `spacing/spacing-mid` (12px) | `spacing/spacing-sm` (8px) |
| Vertical padding | `spacing/spacing-0` (0px) | `spacing/spacing-0` (0px) |
| Corner radius | `radius/radius-sm` (4px) | `radius/radius-sm` (4px) |
| Text style | `Paragraph` (13px/20px) | `Paragraph` (13px/20px) |
| Gap | `spacing/spacing-xs` (4px) | `spacing/spacing-xs` (4px) |

### Available Text Styles

| Style | Font | Size/Line-height | Use for |
|-------|------|-----------------|---------|
| Hint | SF Pro Text Regular | 12px/16px | Captions, helper text |
| Paragraph | SF Pro Text Regular | 13px/20px | Body text, input values, placeholders |
| Bold | SF Pro Text Semibold | 13px/20px | Labels, emphasis |
| Code | SF Mono Regular | 13px/20px | Code snippets |
| Title 4 | SF Pro Display Semibold | 13px/20px | Small headings |
| Title 3 | SF Pro Display Semibold | 18px/24px | Section headings |
| Title 2 | SF Pro Display Semibold | 22px/28px | Page headings |
| Title 1 | SF Pro Display Semibold | 32px/40px | Large headings |

### Available Effect Styles

| Style | Effect | Use for |
|-------|--------|---------|
| `shadow/shadow-xs` | 0,1 offset, 0 radius, 5% black | Form controls default |
| `shadow/shadow-sm` | 0,2 offset, 3 radius + 0,1 offset | Elevated buttons (active tabs) |
| `shadow/shadow` | 0,3 offset, 6 radius | Cards |
| `shadow/shadow-md` | 0,2 offset, 16 radius, 8% black | Popovers, dropdowns |
| `shadow/shadow-lg` | 0,8 offset, 40 radius, 13% black | Dialogs, modals |
| `shadow/shadow-focus` | Blue ring (3px spread) + white gap (1px) | Focus indicator |

### DO:
- Use auto-layout for all component frames
- Match the variant × state matrix pattern from existing Button component
- Return all created node IDs from every `use_figma` call

### BOARD LAYOUT & PRESENTATION (mandatory for every Figma change):
- IMPORTANT: Every component set must be inspectable by anyone without explanation
- **Grid layout:** Columns = sizes, rows = states. Consistent spacing (e.g., 48px row gap, variant-width + 20px column gap)
- **Variant labels:** Add text labels OUTSIDE the component set — variant names along the top, state names along the left side. Use 12px SF Pro Text Semibold, `text/muted-foreground` color
- **Column/row headers:** Size labels ("Default", "Small") as column headers above the grid. State labels ("Default", "Hover", "Press", "Focus", "Disabled", "Loading") as row headers to the left
- **Component set sizing:** Resize the component set frame to tightly fit all variants with 20px padding on all sides
- **After ANY addition:** Reflow the grid so new variants slot into the correct row/column position, not appended to a random edge
- **Variant ordering:** Match the order of other component sets in the file (e.g., if Button goes Primary→Outline→Secondary→Ghost→Link→Destructive→Danger left to right, IconButton should too)
- **Visual check:** Always run `get_screenshot` after layout changes to confirm nothing is clipped, overlapping, or out of grid

### DON'T:
- Don't overlap existing content — position new nodes away from (0,0)
- Don't modify existing Button, IconButton, SplitButton, ToggleButton, SegmentControl, or Icon components — these are finalized (except for layout/label fixes)
- Don't create new tokens — reuse existing 162 tokens via opacity composition
- Don't use `figma.notify()` — it throws "not implemented"
- Don't leave new variants at random positions — always reflow the grid
- Don't skip labels — unlabeled component boards are not shippable

### Component Property Structure (follow Button pattern)
```
ComponentName
├── Variant: [variant values]     ← visual style differences
├── Size: Default | Small         ← height differences
├── State: Default | Hover | Press | Focus | Disabled | Loading
└── Content: via nested instances (.Action Label pattern)
```

---

## 7. Icon System

- **451 icons** in `packages/dbui/src/components/icons/`, one React component per file
- **Naming:** PascalCase matching DuBois names (e.g., `ChevronDown.tsx`)
- **Default size:** 16×16px (`size-4`) via `[&_svg:not([class*='size-'])]:size-4`
- **Code Connect:** All mapped in `packages/dbui/src/figma/icons.figma.tsx`
- **Figma:** Icons page with all 451 icons as components

### Icon Selection — READ BEFORE INSERTING ANY ICON

Every icon has a semantic tag: `/** use:<category> <concept> | <product_area> | <synonyms> */`

**Categories:**
| Category | Meaning | Use in |
|----------|---------|--------|
| `use:object` | Databricks product concept | Nav items, table cells, cards, tree nodes |
| `use:action` | Verb the user performs | Buttons, toolbar actions, menu items |
| `use:indicator` | Status or state | Status badges, alert icons, table status cells |
| `use:component` | Control chrome | Only inside the designated control (chevrons, checks, close) |

**How to find the right icon:**
1. Determine category — object? action? status? control?
2. `grep "use:object Experiment" packages/dbui/src/components/icons/` (search by concept)
3. `grep "flask\|lab" packages/dbui/src/components/icons/` (search by synonym)

**NEVER guess. NEVER use `use:component` icons outside their control. NEVER use `use:action` icons to represent objects.**

See `specs/composition-rules.md` → "Icon Selection Rules" for the full mapping table.

---

## 8. Frameworks & Build

- **Framework:** React 19 + Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Class Variance Authority (CVA)
- **Headless primitives:** Base UI (`@base-ui/react`) — NOT Radix directly
- **Build:** Turbopack (dev), Webpack (prod), Yarn workspaces
- **Path aliases:** `@/` maps to `src/` in each workspace

---

## 9. Asset Handling

- IMPORTANT: If Figma MCP returns a localhost source for an image/SVG, use it directly
- IMPORTANT: Do NOT install new icon packages — all icons are in `apps/dbui/src/components/icons/`
- Static assets go in `public/` directory of the relevant app
- Icons are React components, not SVG files — import as `import { IconName } from "@/components/icons/IconName"`

---

## 10. Research & Decision References

Before making design decisions, consult these files:

| Topic | File |
|-------|------|
| All token/component/naming decisions | `research/DESIGN-SYSTEM-DECISIONS.md` |
| Button variant analysis & DuBois comparison | `research/BUTTON-STUDY.md` |
| Tier 1 component study (Input/Select/Tabs/Dialog) | `research/TIER1-COMPONENT-STUDY.md` |
| DuBois component inventory (65 components) | `research/dubois-design-system-reference.md` |
| Icon codebase reconciliation | See memory: `project_icon_codebase_reconciliation.md` |
| Component audit (27 customized, 9 gaps, 29 as-is) | See memory: `project_component_audit.md` |

---

## 11. Code Connect

Code Connect files live in `apps/portal/src/figma/*.figma.js` and follow this pattern:
- URL comment with Figma node ID
- `getEnum()` for Variant, Size, State mappings
- `findInstance()` / `findText()` for nested content extraction
- Template export with `example`, `imports`, `id`, `metadata`

**Connected components:** Button, IconButton, SplitButton, ToggleButton, SegmentControl, 600+ Icons
**Config:** `figma.config.json` at repo root — includes `apps/portal/src/figma/*.figma.js`

---

## 12. Component Publication Rule

IMPORTANT: Every time a component is finalized (approved in both Figma and code), update ALL of the following:

1. **This file (CLAUDE.md)** — add to Section 6 "don't modify" list, update token/component counts, add to Code Connect list
2. **research/DESIGN-SYSTEM-DECISIONS.md** — update component audit section, migration status
3. **research/BUTTON-STUDY.md** or relevant component study — mark items as resolved
4. **Memory files** — update `project_button_decisions.md`, `project_component_audit.md`, or create new memory for the component family
5. **Code Connect** — create/update `.figma.js` file in `apps/portal/src/figma/`
6. **Portal** — ensure component appears on `/components` page with correct preview

This ensures no documentation drifts from the source of truth. If any of these are skipped, the next sanity check will catch it.

---

## 13. Sanity Check Workflow

When the user says **"sanity check"**, **"audit"**, or **"verify consistency"**, run this 4-stage workflow. Do NOT skip stages. Report findings as a single diff table at the end.

### Stage 1: Figma Audit

Check the Figma file (`OftbSQf85jOPln9RhSEhVv`) for the components in scope:

| Check | How | Pass Criteria |
|-------|-----|---------------|
| All fills/strokes bound to variables | `use_figma`: inspect fills/strokes for `boundVariables` | No hardcoded hex on any semantic color |
| Variant names match convention | `get_metadata`: read variant property values | Names match Figma→Code mapping table (§5) |
| State coverage complete | `get_metadata`: count variants per state | Every component has: Default, Hover, Press/Active, Focus, Disabled. Loading if applicable |
| Size coverage matches code | `get_metadata`: check Size property values | Figma sizes map to code sizes per naming table (§5) |
| Shadows use correct values | `use_figma`: inspect effects array | shadow-xs on controls, shadow-md on popovers, shadow-lg on dialogs |
| Typography correct | `use_figma`: check fontSize, fontName, lineHeight | 13px/20px SF Pro Text Regular body, 13px/16px Semibold labels |
| Component positioned cleanly | `get_metadata`: check x/y, no overlaps | No overlapping variants, grid layout maintained |

**Output:** List of issues per component. If clean, report "Figma: ✅ all checks pass."

### Stage 2: Code ↔ Figma Sync Audit

Compare Figma component properties against code component API:

| Check | How | Pass Criteria |
|-------|-----|---------------|
| Variant list matches | Compare Figma `Variant` enum vs CVA `variant` keys | Every Figma variant has a code equivalent (per naming map) |
| Size list matches | Compare Figma `Size` enum vs CVA `size` keys | Every Figma size has a code equivalent |
| Props/states covered | Compare Figma `State` enum vs code CSS states | Hover/focus/disabled/active all styled in code |
| Token usage consistent | Compare Figma variable bindings vs Tailwind classes | Same semantic token used in both (e.g., Figma `action/primary` = code `bg-primary`) |
**Output:** Table of mismatches. Format:
```
| Component | Issue | Figma State | Code State | Action Needed |
```
Flag each issue as: `auto-fix` (safe to fix without approval) or `needs-approval` (design decision required).

### Stage 2.5: Code Connect Audit

Code Connect files (`.figma.js`) are the translation layer between Figma components and code. They tell Figma Dev Mode what code snippet to display when a designer selects a component. They are NOT the source components — they're mapping files that translate Figma's variant names/properties into code props/imports.

| Check | How | Pass Criteria |
|-------|-----|---------------|
| Code Connect file exists | Check `apps/portal/src/figma/` for `.figma.js` | Every finalized Figma component has a Code Connect mapping |
| Figma node URL correct | Read `// url=` comment at top of `.figma.js` | URL points to the correct component set node ID in the Figma file |
| Variant enum mappings current | Read `getEnum()` calls in `.figma.js` | All Figma variant options appear (e.g., if Figma has State=Danger, the getEnum must include `'Danger': 'invalid'`) |
| State mapping correct | Compare Figma State names → code equivalents | Press → `:active` (CSS), Danger → `aria-invalid`, Disabled → `disabled` attr |
| Import path correct | Read `imports` array | Matches actual component export path in `components/ui/` |
| Nested instance mapping | Check `findInstance()` / `findText()` calls | Nested properties (e.g., `.InputContent` text) correctly extracted |
| Published to Figma | Run `npx figma connect publish --dry-run` or check Figma Dev Mode | No validation errors, all components show code snippets in Dev Mode |

**How Code Connect works (reference):**
```
Figma Component (designer)
    ↓  .figma.js file reads Figma properties (getEnum, findText, getBoolean, etc.)
    ↓  Translates to code props (variant="default", disabled, aria-invalid, etc.)
    ↓  Outputs a code snippet string via figma.tsx``
Code Component (developer sees this in Figma Dev Mode)
```

**Output:** List of missing or stale Code Connect files. If clean, report "Code Connect: ✅ all checks pass."

### Stage 3: Portal Audit

Check that the documentation portal reflects current component state:

| Check | How | Pass Criteria |
|-------|-----|---------------|
| Component on /components page | Read `apps/portal/src/app/components/page.tsx` | Component has a preview section |
| Variants shown correctly | Read component preview section | All code variants rendered in preview |
| Status badge correct | Check badge (new/tweaked/gap/covered) | Matches actual coverage status |
| DuBois comparison accurate | Check any VariantBar or comparison UI | Shows correct DuBois equivalent |

**Output:** List of portal gaps. If clean, report "Portal: ✅ all checks pass."

### Stage 4: Documentation Audit

Check that all decision docs and memory files are current:

| Check | How | Pass Criteria |
|-------|-----|---------------|
| CLAUDE.md accurate | Read this file | Component counts, token counts, finalized list all current |
| DESIGN-SYSTEM-DECISIONS.md | Read §5 and §12 | Migration status matches reality |
| Component study docs | Read relevant study .md | Open questions resolved, variant tables match |
| Memory files current | Read relevant memory files | Button decisions, component audit reflect latest |
| Spreadsheet alignment | Note any spreadsheet-dependent items | Flag items that need manual spreadsheet update |

**Output:** List of stale documentation. If clean, report "Docs: ✅ all checks pass."

### Final Report Format

After all 4 stages, present a single summary:

```
## Sanity Check Report — [Component Name(s)] — [Date]

### Summary
- Figma:        ✅ / ⚠️ N issues
- Code:         ✅ / ⚠️ N issues
- Code Connect: ✅ / ⚠️ N issues
- Portal:       ✅ / ⚠️ N issues
- Docs:         ✅ / ⚠️ N issues

### Issues Found
| # | Stage | Component | Issue | Severity | Action |
|---|-------|-----------|-------|----------|--------|
| 1 | Figma | Input     | ... | auto-fix | ... |

### Recommended Actions
1. [Auto-fixable items — can proceed immediately]
2. [Items needing your approval — decision required]
3. [Spreadsheet updates — manual action needed]
```

Wait for user approval before making any changes flagged as `needs-approval`.

### Running Partial Checks

- **"sanity check figma"** → Stage 1 only
- **"sanity check code"** → Stage 2 only
- **"sanity check code-connect"** → Stage 2.5 only
- **"sanity check portal"** → Stage 3 only
- **"sanity check docs"** → Stage 4 only
- **"sanity check [component name]"** → All 5 stages, scoped to that component
- **"sanity check"** (no qualifier) → All 5 stages, all recently changed components
