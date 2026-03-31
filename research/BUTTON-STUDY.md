# Button Component Study: DuBois vs DBUI

> Reference doc for building the Button Figma component.
> Covers all button-like patterns across both systems, coverage gaps, and decisions.

---

## 1. Variant Coverage Map

| # | DuBois Variant | DBUI Variant | Token Family | Status | Notes |
|---|---|---|---|---|---|
| 1 | **Primary** (filled blue) | `default` | actionPrimary | Covered | Blue fill, white text |
| 2 | **Default/Secondary** (bordered) | `outline` | actionDefault | Covered | Border + transparent bg |
| 3 | — | `secondary` | — | **New** | Grey fill — not in DuBois. Useful for lower-emphasis actions |
| 4 | **Tertiary** (borderless, blue text) | `ghost` | actionTertiary | **Tweaked** | DuBois uses blue text; DBUI uses grey foreground. Prefer DBUI treatment |
| 5 | **Link** (underline on hover) | `link` | actionLink | Covered | Blue text + underline hover |
| 6 | **Danger Primary** (filled red) | `destructive` | actionDangerPrimary | Covered | Red fill, white text |
| 7 | **Danger Secondary** (red border) | — | actionDangerDefault | **Gap** | Red border + transparent bg. Add as `destructive-outline` in DBUI. Long-term: consolidate to single destructive variant |

### Decision: 7 variants for Figma Button

```
Primary | Outline | Secondary (New) | Ghost (Tweaked) | Link | Destructive | Destructive-outline (Gap fill, sunset later)
```

---

## 2. Size Coverage

| DuBois Size | DuBois Height | DBUI Size | DBUI Height | Status |
|---|---|---|---|---|
| small | 24px | `xs` | 24px (h-6) | Covered |
| — | — | `sm` | 28px (h-7) | **New** — not in DuBois |
| middle (default) | 32px | `default` | 32px (h-8) | Covered |
| — | — | `lg` | 36px (h-9) | **New** — not in DuBois |

### Decision: Keep all 4 DBUI sizes

DBUI's XS/SM/Default/LG gives more granularity than DuBois's small/middle. Fine for prototyping.

---

## 3. Icon Handling

### Icon-only buttons

DBUI treats icon-only as a **size variant** of Button, not a separate component:
- `size="icon"` → 32px square
- `size="icon-xs"` → 24px square
- `size="icon-sm"` → 28px square
- `size="icon-lg"` → 36px square

DuBois does the same — icon-only is a mode of Button when `icon` is passed without `children`. Auto-squares and removes border.

### Decision: Icon-only = size variant in Figma

In the Figma component, handle this via a **boolean `iconOnly` property** that:
- Hides the label
- Switches to square dimensions matching the current size
- Removes visible border (tertiary-style, like DuBois)

This keeps it as one Button component, not a separate IconButton.

### Buttons with icons (icon + text)

DBUI uses `data-icon` attribute pattern:
- `data-[icon=inline-start]` → icon before label, reduces left padding
- `data-[icon=inline-end]` → icon after label, reduces right padding
- SVG default: 16px (`size-4`), smaller at xs/sm sizes

DuBois uses `icon` (start) and `endIcon` (end) props.

### Decision: Icon placement = Figma property

Figma property **Icon** with values: `None | Start | End`
- Toggles icon slot visibility
- Adjusts padding per DBUI token values

---

## 4. States

| State | DuBois | DBUI | Notes |
|---|---|---|---|
| Default | ✅ | ✅ | |
| Hover | ✅ | ✅ | Filled variants darken; ghost/secondary use opacity overlays |
| Active/Press | ✅ | ✅ | DBUI adds `translate-y-px` micro-animation |
| Focus | ✅ | ✅ | 3px ring at 50% opacity of ring color |
| Disabled | ✅ | ✅ | 50% opacity, pointer-events-none |
| Loading | ✅ | ❌ **Gap** | DuBois has built-in `loading` prop with spinner + a11y label |
| aria-expanded | — | ✅ | DBUI styles expanded state (accent bg) for menu triggers |

### Decision: Add Loading state

Loading is critical for Databricks workflows (long-running queries, saves, deploys).

**Figma approach:** Add a boolean **Loading** property that:
- Replaces the start icon slot with a spinner
- Optionally dims the label or replaces with loading text
- Maintains button dimensions (no layout shift)

**Code approach:** Add `loading` and `loadingText` props to DBUI Button component. When `loading=true`:
- Render spinner in icon-start position
- Set `disabled` automatically
- Use `loadingText` or keep existing label
- Add `aria-busy="true"` + screen-reader-only loading description

---

## 5. Button-Adjacent Components

### In scope for Button component

These are handled via Button variants/props — **not separate components**:

| Pattern | How it maps | Figma approach |
|---|---|---|
| Icon-only button | `size="icon"` variant | `iconOnly` boolean property |
| Loading button | `loading` prop | `loading` boolean property |
| Menu button (opens dropdown) | Button + `aria-expanded` | Style note: use ghost or outline + chevron icon |

### In scope for ButtonGroup component (separate)

| Pattern | DuBois | DBUI | Notes |
|---|---|---|---|
| **ButtonGroup** | ✅ (H + V) | ✅ `button-group.tsx` | Adjacent buttons share borders/corners |
| **SplitButton** | ✅ (action + chevron) | ❌ Compose from Button + DropdownMenu | Solve as ButtonGroup + DropdownMenuTrigger |
| **ButtonGroupSeparator** | — | ✅ | Visual separator between grouped buttons |
| **ButtonGroupText** | — | ✅ | Text label within a button group |

### In scope for other components (not Button)

| Pattern | Component | Notes |
|---|---|---|
| **ToggleButton** | Toggle | Separate component, pressed/unpressed semantics |
| **ToggleGroup** | ToggleGroup | Container for multiple toggles |
| **SegmentedControl** | ToggleGroup (partial) | DuBois uses radio semantics; shadcn ToggleGroup uses toggle. Semantic gap to address when building ToggleGroup |
| **Tabs** | Tabs | Tab triggers are not buttons despite looking similar |
| **PillControl** | TBD | Filter chip / pill-shaped toggle. Rare in DuBois, storybook-only. **Defer** |
| **Toolbar** | TBD | Container for action buttons. Storybook-only in DuBois. **Defer** |
| **TableRowAction** | Table | Icon button in table row action column. Solve when building Table component |
| **InputGroupButton** | InputGroup | Ghost button inside input fields (search, clear, etc.). Solve when building InputGroup |
| **Sidebar.NavButton** | Sidebar | Navigation button with active state. Solve when building Sidebar |
| **PreviewCard titleActions** | Card | Action buttons in card headers. Solve when building Card |
| **Dialog action buttons** | Dialog | Footer buttons use standard Button component |
| **Notification close** | Toast/Sonner | Close button, uses icon-sm ghost |

---

## 6. Proposed Figma Component Properties

```
Button
├── Variant: Primary | Outline | Secondary | Ghost | Destructive | Destructive-outline | Link
├── Size: XS (24) | SM (28) | Default (32) | LG (36)
├── Icon: None | Start | End
├── Icon Only: boolean (false)
├── State: Default | Hover | Active | Disabled | Loading
├── Dark Mode: boolean (via Figma variable modes, not a prop)
└── [Label]: text override
```

### Variant × State matrix (what to build)

Not every variant × state combo needs unique treatment. The pattern:

| | Default | Hover | Active | Disabled | Loading |
|---|---|---|---|---|---|
| **Primary** | blue fill | darker blue | darkest blue | 50% opacity | spinner + dim |
| **Outline** | border + transparent | border-primary + accent bg | — | 50% opacity | spinner + dim |
| **Secondary** | grey fill | accent bg | — | 50% opacity | spinner + dim |
| **Ghost** | transparent | accent bg | — | 50% opacity | spinner + dim |
| **Destructive** | red fill | darker red | darkest red | 50% opacity | spinner + dim |
| **Destructive-outline** | red border + transparent | red border + red/8 bg | — | 50% opacity | spinner + dim |
| **Link** | blue text | underline | — | 50% opacity | — |

---

## 7. DuBois Token Families → DBUI Token Mapping

For reference when checking token coverage:

| DuBois Token Family | DBUI Tokens Used | Sub-tokens |
|---|---|---|
| actionPrimary | `--primary`, `--primary-foreground` | `--primary-hover`, `--primary-active` |
| actionDefault | `--input` (border), `--background` | `--primary-hover` (border hover) |
| actionTertiary | `--accent`, `--accent-foreground` | (opacity composition) |
| actionDangerPrimary | `--destructive`, `--destructive-foreground` | `--destructive-hover`, `--destructive-active` |
| actionDangerDefault | ❌ Missing | Need `--destructive` border + transparent bg |
| actionIcon | Reuses ghost tokens | (opacity composition) |
| actionLink | `--primary` | (underline) |
| actionDisabled | `opacity-50` | (cross-variant) |

---

## 8. Open Questions

1. **Destructive-outline tokens:** Do we need new semantic tokens (`--destructive-border`?) or can we compose from existing `--destructive` + opacity?
2. **Loading spinner design:** Use DuBois spinner component or create a simple animated SVG? What color — inherit text color?
3. **SegmentedControl vs ToggleGroup:** When we get to ToggleGroup, do we add radio semantics or keep it as-is?
4. **Ghost text color:** We chose DBUI grey treatment over DuBois blue. Confirm this holds for icon-only ghost buttons too?

---

*Created: 2026-03-27*
*Last updated: 2026-03-27*
