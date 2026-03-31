# shadcn-db Design System Decisions

> Reference document for the shadcn-to-DuBois design system bridge.
> Captures all token mapping decisions, component mapping, design principles,
> and rationale for what was added, removed, or changed.

---

## 1. Design Principles (from shadcn, applied to DB)

### 1.1 Surface/Foreground Pairing
Every surface has a guaranteed-contrast text companion: `--{name}` + `--{name}-foreground`.

Examples:
- `--primary` (blue button fill) + `--primary-foreground` (white text on it)
- `--warning` (orange) + `--warning-foreground` (white text on it)
- `--background` (page fill) + `--foreground` (default text)

### 1.2 Semantic Role, Not Visual Description
Tokens describe what they do, not what they look like.
- `--primary` not `--blue`
- `--destructive` not `--red`
- `--muted` not `--light-grey`

### 1.3 Minimal Tokens, Maximum Composability
Interactive states (hover, press, focus) are handled by **opacity composition**, not separate tokens.
- Ghost button hover: fill `--primary` at 8% opacity
- Ghost button press: fill `--primary` at 16% opacity
- List item hover: fill `--primary` at 8% opacity

Exception: **filled buttons** that darken on hover need explicit tokens because alpha makes colors lighter, not darker.

### 1.4 Single-Purpose Tokens, No Overlap
- `--border` = decorative borders, dividers
- `--input` = form input borders (intentionally darker)
- `--ring` = focus indicator only

### 1.5 Opacity as the Interaction Model
Replaces DuBois's per-variant-per-state token explosion:
- DuBois: `actionDefaultBackgroundHover: rgba(34,114,180,0.08)` (separate token)
- shadcn-db: `--primary` fill at 8% opacity (composable)

This collapses ~38 DuBois action tokens into ~6 base tokens + opacity.

### 1.6 Dark Mode = Full Value Swap
Not "invert" or "darken by X%" — each mode has independently chosen values.

### 1.7 No Redundant Semantic Aliases
If two tokens would have identical values, only one exists:
- `--link` removed → use `--primary` (same hex)
- `--info` removed → use `--primary` (same hex)
- `--text-placeholder` removed → use `--muted-foreground` (close enough)

---

## 2. Token Inventory

### 2.1 Complete Token List (47 semantic color + 68 primitives + 8 radius + 7 spacing + 5 shadows + 8 text styles + 19 typography vars = 162 total)

#### Surfaces (16 tokens, 8 pairs)
| Token | Pair | Light | Dark | Notes |
|-------|------|-------|------|-------|
| --background | --foreground | #FFFFFF | #11171C | Page body. DB uses cool grey800 for dark (not neutral800). |
| --card | --card-foreground | #FFFFFF | #11171C | Alias to --background in DB. |
| --popover | --popover-foreground | #FFFFFF | #11171C | Alias to --background. |
| --secondary | --secondary-foreground | #F7F7F7 | #1F272D | Tinted surface. Zebra stripes, panels. |
| --muted | --muted-foreground | #F7F7F7 | #1F272D | Same as --secondary in DB. Descriptions, captions. |
| --accent | --accent-foreground | #F7F7F7 | #1F272D | Same as --secondary in DB. Interactive hover highlights. |
| --sidebar | --sidebar-foreground | #FFFFFF | #11171C | Alias to --background. |
| --sidebar-accent | --sidebar-accent-foreground | #F7F7F7 | #1F272D | Alias to --secondary. |

#### Actions (10 tokens, 5 pairs)
| Token | Pair | Light | Dark | Notes |
|-------|------|-------|------|-------|
| --primary | --primary-foreground | #2272B4 | #4299E0 | BIGGEST CHANGE: neutral/black → blue. Defines DB brand. |
| --destructive | --destructive-foreground ★ | #C82D4C | #E65B77 | Danger/error. ★ foreground was missing, now added. |
| --warning ★ | --warning-foreground ★ | #BE501E | #DE7921 | New semantic state for alerts, validation, badges. |
| --success ★ | --success-foreground ★ | #277C43 | #3BA65E | New semantic state for validation, status indicators. |
| --sidebar-primary | --sidebar-primary-foreground | #2272B4 | #4299E0 | Alias to --primary. |

#### Interactive States (4 tokens — filled buttons only)
| Token | Light | Dark | Notes |
|-------|-------|------|-------|
| --primary-hover ★ | #0E538B (blue700) | #8ACAFF (blue400) | Filled primary button hover. Alpha can't darken. |
| --primary-active ★ | #04355D (blue800) | #BAE1FC (blue300) | Filled primary button press. |
| --destructive-hover ★ | #9E102C (red700) | #F792A6 (red400) | Filled danger button hover. |
| --destructive-active ★ | #630316 (red800) | #FBD0D8 (red300) | Filled danger button press. |

**Why only primary + destructive?**
- Warning/success: only used in static elements (alerts, badges). No filled buttons.
- Secondary/ghost/outline: use alpha composition (--primary at 8%/16% opacity).
- These 4 are optional — you can hardcode hex in Figma components instead.

#### Borders (6 tokens)
| Token | Light | Dark | Notes |
|-------|-------|------|-------|
| --border | #EBEBEB | #1F272D | Subtle dividers, card borders. |
| --input | #CBCBCB | #37444F | Form input borders. Intentionally darker than --border. |
| --ring | #2272B4 | #4299E0 | Focus indicator = primary blue. |
| --border-accessible ★ | #6F6F6F | #C0CDD8 | WCAG AA high-contrast border. |
| --sidebar-border | #EBEBEB | #1F272D | Alias to --border. |
| --sidebar-ring | #2272B4 | #4299E0 | Alias to --ring. |

#### Charts (5 tokens)
| Token | Value | Source |
|-------|-------|--------|
| --chart-1 | #4299E0 | blue500 |
| --chart-2 | #3BA65E | green500 |
| --chart-3 | #DE7921 | yellow500 |
| --chart-4 | #8A63BF | purple |
| --chart-5 | #C83243 | coral |

#### Utility (3 tokens)
| Token | Light | Dark | Notes |
|-------|-------|------|-------|
| --overlay ★ | rgba(0,0,0,0.26) | rgba(0,0,0,0.45) | Modal/drawer backdrop. |
| --code-background ★ | rgba(82,82,82,0.08) | #37444F | Inline code background. |
| --skeleton ★ | rgba(162,162,162,0.16) | rgba(144,164,181,0.16) | Skeleton shimmer. |

#### AI Brand (3 tokens)
| Token | Value | Notes |
|-------|-------|-------|
| --ai-gradient-start ★ | #4299E0 | DB AI gradient start (blue). |
| --ai-gradient-mid ★ | #CA42E0 | DB AI gradient mid (purple). |
| --ai-gradient-end ★ | #FF5F46 | DB AI gradient end (orange-red). |

#### Categorical Colors (11 tokens — deferred, add with Tag component)

Generic color tokens for distinguishing categories. Used by Tags, chart legends, status indicators, avatars — any UI needing N distinct colors. Named `--categorical-{color}`, NOT `--tag-{color}`, following shadcn's principle of semantic naming.

| Token | Light | Dark | DuBois primitive |
|-------|-------|------|-----------------|
| --categorical-brown | #A6630C | #A6630C | brown |
| --categorical-coral | #C83243 | #C83243 | coral |
| --categorical-indigo | #434A93 | #434A93 | indigo |
| --categorical-lemon | #FACB66 | #FACB66 | lemon |
| --categorical-lime | #308613 | #308613 | lime |
| --categorical-pink | #B45091 | #B45091 | pink |
| --categorical-purple | #8A63BF | #8A63BF | purple |
| --categorical-teal | #04867D | #04867D | teal |
| --categorical-turquoise | #137DAE | #137DAE | turquoise |
| --categorical-charcoal | #424242 | #424242 | neutral650 |
| --categorical-default | #161616 | #E8ECF0 | neutral800 / grey100 |

**Figma category**: `categorical/`

**How to use in components (Tag example):**
- Tag background: fill `--categorical-{color}` at 8% opacity
- Tag text: `--categorical-{color}` at 100% (or `--foreground` for default)
- Tag icon: `--categorical-{color}` at 80% opacity
- Tag close button: `--muted-foreground`

**Why not foreground pairs?**
Using the base categorical color directly for text works for most hues. If contrast testing reveals issues with specific colors (likely lemon on white), add `--categorical-{color}-foreground` overrides for just those 2-3 problem colors.

**Why deferred?**
These are component-level tokens, not base system tokens. Add them when building the Tag component in Figma, test contrast at that time, and decide if any foreground overrides are needed.

**DuBois comparison:**
DuBois defines 3 tokens per color per mode (tagBackground, tagText, tagIcon × 11 colors = 66 tokens). Our approach uses 11 base tokens + opacity composition = same visual result, ~85% fewer tokens.

#### Border Radius (8 tokens)
| Token | Current | Proposed | DB Equivalent |
|-------|---------|----------|---------------|
| --radius | 10px | 8px | borderRadiusMd |
| --radius-sm | 6px | 4px | borderRadiusSm — buttons, inputs |
| --radius-md | 8px | 8px | borderRadiusMd — cards, dialogs |
| --radius-lg | 10px | 12px | borderRadiusLg — modals |
| --radius-xl | 14px | 16px | borderRadiusXl — large containers |
| --radius-2xl | 18px | 16px | same as xl, consider merging |
| --radius-3xl | 22px | 999px | borderRadiusFull — pills |
| --radius-4xl | 26px | 999px | redundant, remove |

#### Typography
| Property | Current | Proposed | Notes |
|----------|---------|----------|-------|
| Font (body) | Geist Sans | SF Pro Text | Body text: Hint, Paragraph, Bold |
| Font (titles) | Geist Sans | SF Pro Display | Headings: Title 1–4 |
| Font (mono) | Geist Mono | SF Mono | Code blocks, inline code |
| Base size | 16px | 13px | MAJOR — defines DB dense enterprise feel |
| Weights | 400/500/600/700 | 400/600 only | DB constrains to regular + semibold |

Type scale: 12px / 13px (base) / 18px / 22px / 32px — 5 intentional steps.

##### Text Styles — DuBois names (Figma) ↔ Tailwind (code)

Figma text styles use DuBois names. Engineers use Tailwind classes. This table is the canonical mapping.

| Figma Style | Size/LH | Weight | Font | Tailwind | When to use |
|-------------|---------|--------|----------|-----|-------------|
| Hint | 12/16 | 400 | SF Pro Text | `text-xs` | Captions, timestamps, labels, fine print |
| Paragraph | 13/20 | 400 | SF Pro Text | `text-sm` or `text-base` | DEFAULT body text — descriptions, form labels, table cells |
| Bold | 13/20 | 600 | SF Pro Text | `text-sm font-semibold` | Emphasized body — table headers, form labels, nav items |
| Title 4 | 13/20 | 600 | SF Pro Display | `text-sm font-semibold` | Smallest heading — card titles, sidebar headers (will diverge from Bold) |
| Title 3 | 18/24 | 600 | SF Pro Display | `text-lg font-semibold` | Mid heading — section titles, dialog headers |
| Title 2 | 22/28 | 600 | SF Pro Display | `text-xl font-semibold` | Major heading — page sections, modal titles |
| Title 1 | 32/40 | 600 | SF Pro Display | `text-3xl font-semibold` | Page heading — hero text, top-level titles. Largest in system |
| Code | 13/20 | 400 | SF Mono | `font-mono text-sm` | Code blocks, inline code, terminal output |

**Collapsed sizes:** `text-base` (16px) → 13px (=Paragraph). `text-2xl` (24px) → 22px (=Title 2). `text-4xl+` → not used.
**Weight rules:** `font-medium` (500) → 600. `font-bold` (700) → capped at 600. DB only uses 400/600.

##### Typography Theming (Typography variable collection)

Typography variables live in a separate "Typography" collection with independent modes (Production / Wireframe). This allows switching type themes without affecting color modes (Light/Dark).

| Variable | Type | Production | Wireframe | Scopes |
|----------|------|-----------|-----------|--------|
| font/body | String | SF Pro Text | Space Grotesk | FONT_FAMILY |
| font/display | String | SF Pro Display | Space Grotesk | FONT_FAMILY |
| font/mono | String | SF Mono | Fira Code | FONT_FAMILY |
| size/hint | Float | 12 | 12 | FONT_SIZE |
| size/paragraph | Float | 13 | 14 | FONT_SIZE |
| size/title-4 | Float | 13 | 14 | FONT_SIZE |
| size/title-3 | Float | 18 | 18 | FONT_SIZE |
| size/title-2 | Float | 22 | 24 | FONT_SIZE |
| size/title-1 | Float | 32 | 36 | FONT_SIZE |
| size/code | Float | 13 | 14 | FONT_SIZE |
| line-height/hint | Float | 16 | 16 | LINE_HEIGHT |
| line-height/paragraph | Float | 20 | 22 | LINE_HEIGHT |
| line-height/title-4 | Float | 20 | 22 | LINE_HEIGHT |
| line-height/title-3 | Float | 24 | 28 | LINE_HEIGHT |
| line-height/title-2 | Float | 28 | 32 | LINE_HEIGHT |
| line-height/title-1 | Float | 40 | 44 | LINE_HEIGHT |
| line-height/code | Float | 20 | 22 | LINE_HEIGHT |
| weight/regular | Float | 400 | 400 | FONT_WEIGHT |
| weight/semibold | Float | 600 | 600 | FONT_WEIGHT |

**Theme switching:** Set the Typography collection mode on a parent frame. All child text using these variables updates instantly. Independent from color mode — you can combine Dark + Wireframe, Light + Production, etc.

**Adding new themes:** Add a mode to the Typography collection (e.g., "Presentation", "Accessibility Large"), set values, done. No need to create new text styles.

#### Spacing (7 tokens — DuBois 1:1)
| Figma Name | Value | Tailwind |
|------------|-------|----------|
| spacing-0 | 0px | p-0 |
| spacing-xs | 4px | p-1 |
| spacing-sm | 8px (base unit) | p-2 |
| spacing-mid | 12px | p-3 |
| spacing-md | 16px | p-4 |
| spacing-lg | 24px | p-6 |
| spacing-xl | 32px | p-8 |

#### Shadows (5 effect styles)
| Level | Light | Dark | Notes |
|-------|-------|------|-------|
| xs ★ | 0 1px 0 0 rgba(0,0,0,.05) | 0 1px 0 0 rgba(0,0,0,.45) | Button edge |
| sm | 0 2px 3px -1px rgba(0,0,0,.05), 0 1px 0 0 rgba(0,0,0,.02) | 0 2px 3px -1px rgba(0,0,0,.45), 0 1px 0 0 rgba(0,0,0,.26) | Cards |
| md | 0 3px 6px 0 rgba(0,0,0,.05) | 0 3px 6px 0 rgba(0,0,0,.45) | Popovers |
| lg | 0 2px 16px 0 rgba(0,0,0,.08) | 0 2px 16px 0 rgba(0,0,0,.61) | Modals |
| xl | 0 8px 40px 0 rgba(0,0,0,.13) | 0 8px 40px 0 rgba(0,0,0,.87) | Top-level overlays |

Dark mode shadows are dramatically heavier (0.45-0.87 alpha). Intentional for DB layered dark UI.

---

## 3. Tokens Removed (and Why)

### 3.1 Tokens removed from our proposal (shadcn principle violations)

| Was Proposed | Violation | Use Instead |
|---|---|---|
| --info / --info-foreground | Same hex as --primary. Redundant. | --primary / --primary-foreground |
| --background-danger/success/warning/info | No `--background-{x}` pattern in shadcn. Breaks pairing. | Fill semantic color (--destructive/--warning/--success) at 8% opacity |
| --border-danger/warning/success/info | No `--border-{x}` semantic pattern in shadcn. | Stroke with semantic color at 30-50% opacity |
| --text-danger/warning/success | Base semantic color IS the text color. --destructive is already the red used for error text. | --destructive / --warning / --success directly |
| --text-placeholder | Same value as --muted-foreground (#6F6F6F). | --muted-foreground |
| --tooltip-background | Inverse of --foreground. Derivable. | --foreground (inverted context) |
| --link | Same hex as --primary. | --primary |
| --accent-hover / --accent-active | Alpha composition works for ghost interactions. | --primary fill at 8%/16% opacity in Figma |

### 3.2 DuBois tokens that become redundant (~38)

DuBois has separate tokens for every variant × state × property combination.
shadcn-db collapses these into base tokens + CSS pseudo-classes (code) or opacity (Figma).

**Transparent defaults (always rgba 0.00):**
actionDefaultBackgroundDefault, actionDangerDefaultBackgroundDefault, actionTertiaryBackgroundDefault, actionIconBackgroundDefault

**Duplicate hover/press patterns (all rgba blue 0.08/0.16):**
actionDefaultBackgroundHover/Press, actionTertiaryBackgroundHover/Press, actionIconBackgroundHover/Press, actionDangerDefaultBackgroundHover/Press

**Constant foreground (doesn't change on hover):**
actionPrimaryTextHover, actionPrimaryTextPress

**Icon tokens that mirror text tokens:**
actionDefaultIconDefault/Hover/Press, actionTertiaryIconDefault/Hover/Press, actionIconIconDefault/Hover/Press

**Derivable darker shades (now explicit as --primary-hover etc.):**
actionPrimaryBackgroundHover/Press, actionDangerPrimaryBackgroundHover/Press, actionDangerDefaultBorderHover/Press, actionDangerDefaultTextHover/Press, actionLinkHover/Press

**Composition patterns (use existing surface tokens):**
tableBackgroundSelectedDefault/Hover, tableBackgroundUnselectedDefault/Hover, progressFill/FillPrimary/Track, tooltipBackgroundTooltip

---

## 4. Figma Implementation Guide

### 4.1 Variable Collections to Create

1. **Primitives** (raw colors — not used directly in components)
   - DuBois full color ramps: blue100-800, green100-800, red100-800, yellow100-800
   - Grey scale: grey050-800 (cool)
   - Neutral scale: neutral050-800 (warm)
   - Accent colors: brown, coral, indigo, lemon, lime, pink, purple, teal, turquoise

2. **Semantic** (the ~47 tokens above — used in components)
   - 2 modes: Light / Dark
   - Organized by category: surface/, action/, border/, text/, chart/, utility/, brand/, status/
   - Semantic variables reference Primitive variables where possible

3. **Component** (component-specific overrides if needed)
   - Only if a component needs a value not derivable from Semantic tokens

### 4.2 How to Handle Hover States in Figma

**Filled buttons (primary, destructive):**
Use explicit `--primary-hover` / `--primary-active` variables on the hover/pressed variant.

**Ghost/outline/secondary buttons, list items, menu items:**
1. Set fill color to `--primary` variable
2. Set fill opacity to 8% (hover) or 16% (active)
3. This works because Figma separates color and opacity on fills

**Alert/banner backgrounds:**
1. Set fill color to `--destructive` / `--warning` / `--success`
2. Set fill opacity to 8-10%
3. Produces the tinted wash without needing a separate token

**Alert/banner borders:**
1. Set stroke color to `--destructive` / `--warning` / `--success`
2. Set stroke opacity to 30-50%
3. Produces the soft semantic border

### 4.3 Text Styles to Create

Uses DuBois names. Fonts bound to Typography collection variables for instant theme switching.

| Style Name | Font | Size | Line Height | Weight | Tailwind |
|---|---|---|---|---|---|
| Hint | SF Pro Text | 12px | 16px | 400 | `text-xs` |
| Paragraph | SF Pro Text | 13px | 20px | 400 | `text-sm` |
| Bold | SF Pro Text | 13px | 20px | 600 | `text-sm font-semibold` |
| Title 4 | SF Pro Display | 13px | 20px | 600 | `text-sm font-semibold` |
| Title 3 | SF Pro Display | 18px | 24px | 600 | `text-lg font-semibold` |
| Title 2 | SF Pro Display | 22px | 28px | 600 | `text-xl font-semibold` |
| Title 1 | SF Pro Display | 32px | 40px | 600 | `text-3xl font-semibold` |
| Code | SF Mono | 13px | 20px | 400 | `font-mono text-sm` |

### 4.4 Effect Styles to Create

5 shadow styles with Light/Dark mode values (see Shadow table in §2.1).

---

## 5. Component Mapping Summary

### 5.1 Counts
| Category | Count |
|----------|-------|
| Shared (both systems) | 32 |
| Near-equivalents | 13 |
| shadcn-only | 10 |
| DuBois-only (active UI) | 25 |
| DuBois infrastructure (skip) | 10 |
| DuBois legacy (skip) | 8 |
| DuBois storybook-only | 6 |
| **Unique UI concepts** | **~83** |

### 5.2 Migration Approach by Complexity

**Low complexity (token swap + minor props) — ~20 components:**
Accordion, Breadcrumb, Checkbox, Context Menu, Drawer, Dropdown Menu, Empty, Hover Card, Label, Navigation Menu, Popover, Progress, Radio Group, Slider, Spinner, Switch, Tabs, Tooltip, Collapsible, Separator, Scroll Area, Toggle, Textarea

**Medium complexity (variant/prop additions) — ~15 components:**
Alert (add warning/info), Card (add PreviewCard), Dialog (add sizes), Input (add validation + sizes), Pagination (add features), Select (different internals), Skeleton (add sub-types), Sonner/Toaster (reskin), Badge/Tag (different systems), Button Group/SplitButton, Calendar/DatePicker, Field/FormV2, Input Group, Menubar/Menu, Toggle Group/SegmentedControl

**High complexity (significant redesign) — ~8 components:**
Avatar (6 sizes + types + colors), Button (heights, loading, danger), Combobox (DB has 2 complex variants), Sidebar (completely different architectures), Table (DB has built-in actions/filters/select), Calendar/DatePicker (7 AntD variants), Badge vs Tag (fundamentally different variant systems), Tree (no shadcn equiv)

### 5.3 Components to Build New
RadioTile, ResourceStatusIndicator (→ "StatusIndicator"), Stepper, Tree (composition), Typography (text styles + component)

### 5.4 Components to Skip
All Legacy* (8), infrastructure (10), Colors (doc page), Steps (use Stepper), Space/Spacer (use flex/padding), Grid (use CSS Grid), Layout (use CSS), PageWrapper (use container)

---

## 6. Key Differences: DuBois vs shadcn Philosophy

| Aspect | DuBois | shadcn-db |
|--------|--------|-----------|
| Token count | ~180+ | ~66 |
| Color space | Hex + rgba | Hex (Figma) / oklch (CSS) |
| Hover/press | Separate token per variant per state | Base token + opacity composition |
| Primary color | Blue (#2272B4) | Blue (#2272B4) — changed from shadcn's neutral |
| Font base | 13px | 13px — changed from shadcn's 16px |
| Spacing base | 8px | 8px — already aligned with Tailwind |
| Component lib | Emotion + AntD | Radix + Tailwind |
| Dark mode | Separate semantic color files | CSS variable swap |
| Radius | 4px default | 4px (sm) — changed from shadcn's 6px |

---

## 7. Figma Variable Group Structure

```
Semantic collection (no "colors/" prefix — collection name provides context):
surface/
├── background, card, popover, secondary, muted, accent
├── sidebar, sidebar-accent
text/
├── foreground, card-foreground, popover-foreground
├── secondary-foreground, muted-foreground, accent-foreground
├── sidebar-foreground, sidebar-accent-foreground
action/
├── primary, primary-foreground
├── destructive, destructive-foreground
├── warning, warning-foreground
├── success, success-foreground
├── ring
├── sidebar-primary, sidebar-primary-foreground
├── primary-hover, primary-active
├── destructive-hover, destructive-active
border/
├── border, input, border-accessible
├── sidebar-border, sidebar-ring
chart/
├── chart-1 through chart-5
utility/
├── overlay, code-background, skeleton
brand/
├── ai-gradient-start, ai-gradient-mid, ai-gradient-end

numbers/
├── radius/
│   └── radius-0, radius-sm, radius, radius-md, radius-lg, radius-xl, radius-2xl, radius-3xl
└── spacing/
    └── spacing-0, spacing-xs, spacing-sm, spacing-mid, spacing-md, spacing-lg, spacing-xl

effects/
└── shadow/
    └── xs, sm, md, lg, xl
```

---

## 8. Spreadsheet Reference

All detailed data lives in the Google Sheet:
**shadcn-db: Design System Audit — shadcn vs DuBois**

Sheets:
- **Token Mapping** — Full token-by-token mapping with current/proposed values, DuBois sources, Figma categories
- **Component Mapping v2** — Every component from both systems with decisions, notes, effort ratings
- **DuBois Inventory** — All DuBois tokens extracted from source
- **shadcn Inventory** — All shadcn tokens and components
- **Color Conversion Reference** — 97 colors in Hex, RGB, HSL, OKLCH, Display P3
- **Comparison** — Side-by-side system comparison

---

## 9. Change Tracking

The Token Mapping spreadsheet includes a **"Last action (date + change)"** column on every section. This column serves as the 1:1 bridge between the spreadsheet and the Figma library.

### How to use

When making any change to the Figma library:

1. Make the change in Figma
2. Open the Token Mapping sheet
3. Find the corresponding token/row
4. Update the "Last action" column with: `YYYY-MM-DD — brief description`

Examples:
- `2026-03-27 — Created variable in Figma, Light+Dark modes`
- `2026-04-02 — Updated dark value from #1F272D to #232B33 per visual review`
- `2026-04-10 — Added to Button component as fill`

### Why this matters

- **Source of truth**: The spreadsheet is the single source of truth for what tokens exist, their values, and their status
- **Audit trail**: "Last action" creates a lightweight changelog without needing git history
- **Handoff**: Anyone reviewing the Figma library can check the sheet to understand what was changed and when
- **Gap detection**: Tokens without a "Last action" haven't been created in Figma yet

---

## 10. Deferred Decisions

### 10.1 Categorical Colors (for Tags, Avatars, Charts)

**Decision**: Add 11 `--categorical-{color}` tokens when building the Tag component.

**Approach**: One base color per hue. Use opacity composition for backgrounds (8%), direct color for text/icons. Test contrast and add foreground overrides only for colors that fail WCAG AA.

**See §2.1 "Categorical Colors" for full spec.**

### 10.2 Typography: text-base collapse

**Decision**: Defer whether text-base (16px) should collapse to 13px (matching text-sm) or remain distinct. Test in actual Figma layouts first.

### 10.3 Interactive state tokens

**Decision**: The 4 hover/active tokens (primary-hover, primary-active, destructive-hover, destructive-active) are included but optional. Can hardcode in Figma components instead if the token overhead isn't justified.

---

## 11. Hidden Mapping Nuances (Gotchas for Rebuilding from Scratch)

These are non-obvious issues discovered during the registry build. They don't show up in token audits because they live in **component source code**, not CSS variables. If you ever recreate the DBUI registry, these must be addressed manually.

### 11.1 Typography is hardcoded, not tokenized

**Problem:** shadcn components use Tailwind utility classes (`text-sm`, `font-medium`, `text-xs`) directly in component source files. Swapping `globals.css` tokens does NOT change typography — each component file must be edited.

**What we changed (150 replacements across 38 files):**

| shadcn class | Tailwind default | DuBois replacement | DuBois style |
|---|---|---|---|
| `text-sm` | 14px | `text-[13px]` | Paragraph/Bold |
| `text-xs` | 12px | `text-[12px]` | Hint |
| `text-base` | 16px | `text-[13px]` | Collapsed to Paragraph |
| `md:text-sm` | responsive 14px | `md:text-[13px]` | — |
| `font-medium` | weight 500 | `font-semibold` | DuBois only uses 400/600 |

**Why it matters:** If you install a new shadcn component via `npx shadcn add`, it will arrive with the default `text-sm` / `font-medium` classes. You must manually replace them before the component matches DBUI specs.

### 11.2 Border radius is hardcoded via Tailwind classes

**Problem:** shadcn components use `rounded-lg` for buttons, inputs, selects. Tailwind maps `rounded-lg` → `--radius-lg`. So `--radius-lg` must be set to the DuBois *button* radius (4px), not the DuBois `borderRadiusLg` (12px).

**CSS radius mapping (Figma ≠ CSS):**

| CSS variable | CSS value | Figma value | shadcn components that use it |
|---|---|---|---|
| `--radius-sm` | 2px | 4px | Inner elements |
| `--radius-md` | 4px | 8px | Inner component elements |
| `--radius-lg` | 4px | 12px | **Buttons, inputs, selects** (via `rounded-lg`) |
| `--radius-xl` | 8px | 16px | Cards, dialogs |
| `--radius-2xl` | 12px | 16px | Large containers |
| `--radius-3xl` | 999px | 999px | Pills |

### 11.3 Hover states differ fundamentally between shadcn and DuBois

**Problem:** shadcn uses grey (`--muted`) for hover highlights. DuBois uses blue tints.

**What we changed:**

| Token | shadcn default | DBUI (DuBois) | Purpose |
|---|---|---|---|
| `--accent` | `#F7F7F7` (grey) | `#F0F8FF` (blue100) | Interactive hover fill |
| `--accent-foreground` | `#161616` (dark) | `#2272B4` (blue600) | Text color on hover |

**Component changes (button-variants.ts):**
- Outline: `hover:bg-muted` → `hover:bg-accent hover:text-accent-foreground hover:border-primary`
- Secondary: `hover:bg-secondary/80` → `hover:bg-accent hover:text-accent-foreground`
- Ghost: `hover:bg-muted` → `hover:bg-accent hover:text-accent-foreground`
- Default (filled): `hover:bg-primary/80` → `hover:bg-primary-hover active:bg-primary-active`
- Destructive: `hover:bg-destructive/20` → `hover:bg-destructive-hover active:bg-destructive-active`

### 11.4 Shadows on interactive elements

**Problem:** shadcn does not apply shadows to buttons or inputs by default. DuBois uses `shadow-xs` (1px edge shadow) on filled/bordered interactive elements.

**What we changed:**
- Added `shadow-xs` to button variants: default, outline, secondary, destructive
- Added `shadow-xs` to input, textarea, select
- Ghost and link buttons: NO shadow (intentional — they have no visible fill/border)

### 11.5 Border weight on outline buttons

**Problem:** shadcn outline button uses `border-border` (`#EBEBEB` — very light). DuBois uses a darker border.

**What we changed:** `border-border` → `border-input` (`#CBCBCB` / neutral300) on the outline variant.

### 11.6 Checklist for adding new shadcn components

When you run `npx shadcn add <component>`, the new component arrives with shadcn defaults. Before it matches DBUI:

1. Replace `text-sm` → `text-[13px]`, `text-xs` → `text-[12px]`, `text-base` → `text-[13px]`
2. Replace `font-medium` → `font-semibold`
3. Replace `hover:bg-muted` → `hover:bg-accent hover:text-accent-foreground` on interactive elements
4. Add `shadow-xs` to filled/bordered interactive elements
5. Replace `border-border` → `border-input` on interactive element borders
6. Verify `rounded-lg` gives the expected radius (4px for buttons/inputs)
7. Test in both Light and Dark modes

---

---

## 12. DBUI Component Audit — Differences from shadcn Defaults

This section documents every DBUI customization applied to shadcn components. Use it to understand what changed, what still needs attention, and what to apply when adding new components.

### 12.1 Customizations Applied (27 files modified)

#### Fully customized components

| Component | Changes from shadcn |
|---|---|
| **button-variants.ts** | `shadow-xs` per variant (not ghost/link), `hover:bg-accent`/`text-accent-foreground` on outline/secondary/ghost, `hover:bg-primary-hover`/`active:bg-primary-active` on default, `hover:bg-destructive-hover`/`active:bg-destructive-active` on destructive, `border-input` on outline, `font-normal` (was `font-medium`) |
| **input.tsx** | `shadow-xs`, `hover:border-primary-hover` |
| **textarea.tsx** | `shadow-xs`, `hover:border-primary-hover` |
| **select.tsx** | `shadow-xs`, `hover:border-primary-hover` on trigger |
| **checkbox.tsx** | `hover:border-primary-hover`, `hover:bg-accent` (unchecked), `data-checked:hover:bg-primary-hover` (checked darkens) |
| **radio-group.tsx** | Same as checkbox: `hover:bg-accent`, `data-checked:hover:bg-primary-hover` |
| **toggle.tsx** | `hover:bg-accent hover:text-accent-foreground`, `hover:border-primary-hover` on outline |
| **dropdown-menu.tsx** | Items use `focus:bg-accent focus:text-accent-foreground` (already shadcn default, maps to our blue accent) |
| **context-menu.tsx** | Same accent pattern as dropdown |
| **combobox.tsx** | `data-highlighted:bg-accent data-highlighted:text-accent-foreground` |

#### Typography-only changes (global sweep — all 38 ui/ files)

Every component had: `text-sm` → `text-[13px]`, `text-xs` → `text-[12px]`, `text-base` → `text-[13px]`, `font-medium` → `font-semibold`.

#### Token remapping (globals.css)

| Token | shadcn default | DBUI value (light) | Why |
|---|---|---|---|
| `--accent` | `#F7F7F7` (grey) | `#F0F8FF` (blue100) | Interactive hover fill |
| `--accent-foreground` | `#161616` (dark) | `#0E538B` (blue700) | Hover text turns dark blue |
| `--primary` | grey/neutral | `#2272B4` (blue600) | DuBois brand primary |
| `--primary-hover` | (new) | `#0E538B` (blue700) | Filled button hover |
| `--primary-active` | (new) | `#04355D` (blue800) | Filled button press |
| `--radius-lg` | 10px | 4px | Buttons/inputs use `rounded-lg` |

### 12.2 Known Gaps — Components Needing Attention

These components are functional but don't yet match DuBois hover/interaction patterns:

| Component | Gap | Priority | Fix |
|---|---|---|---|
| **native-select.tsx** | Missing `shadow-xs` and `hover:border-primary-hover` | High | Add both to `<select>` element |
| **menubar.tsx** | MenubarTrigger uses `hover:bg-muted` | High | Change to `hover:bg-accent hover:text-accent-foreground` |
| **navigation-menu.tsx** | Trigger + Link use `hover:bg-muted` / `focus:bg-muted` | High | Change all to accent pattern |
| **command.tsx** | CommandItem uses `data-selected:bg-muted` | High | Change to `data-selected:bg-accent data-selected:text-accent-foreground` |
| **badge.tsx** | Outline/ghost variants use `hover:bg-muted` | Medium | Change to `hover:bg-accent hover:text-accent-foreground` |
| **combobox.tsx** | ComboboxChips missing `shadow-xs` and `hover:border-primary-hover` | Medium | Add both |
| **input-otp.tsx** | Missing `shadow-xs` on group container | Low | Add `shadow-xs` |
| **table.tsx** | Row hover uses `hover:bg-muted/50` | Low | Consider `hover:bg-accent/50` |
| **toggle.tsx** | Outline variant missing `shadow-xs` | Low | Add `shadow-xs` to outline |

### 12.3 Components That Are Fine As-Is

These need no DBUI-specific changes (layout, display, or correctly inheriting patterns):

aspect-ratio, avatar, breadcrumb, button (wrapper), button-group, carousel, chart, collapsible, direction, drawer, empty, hover-card, kbd, label, pagination, popover, progress, resizable, scroll-area, separator, sheet, skeleton, slider, sonner, spinner, switch, tooltip, toggle-group, alert

---

*Last updated: 2026-03-27*
*Authored by: Mudit Mittal + Claude Code*
