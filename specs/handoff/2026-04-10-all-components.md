# Action Components

---

## 1. Button

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Ghost hover text color | `text-primary-hover` | ✅/❌ → |
| 2 | Secondary hover text color | `text-accent-foreground` (not `text-primary-hover`) | ✅/❌ → |
| 3 | Danger press background | `bg-destructive/20` (20% opacity fill) | ✅/❌ → |
| 4 | Danger focus | `border-2 border-ring shadow-none` (blue focus, no shadow) | ✅/❌ → |
| 5 | Link variant has no shadow and no height constraint | `!h-auto !rounded-none !px-0 !shadow-none` | ✅/❌ → |
| 6 | Disabled on filled (default/destructive) text color | ✅ Resolved: `action/disabled-foreground` everywhere | ✅ |

### Full Spec

**Layout**
| Property | md (32px) | sm (24px) | icon-md | icon-sm |
|----------|----------|----------|---------|---------|
| Height | 32px | 24px | 32×32 | 24×24 |
| Padding H | `spacing/spacing-mid` (12px) | `spacing/spacing-sm` (8px) | — | — |
| Gap | `spacing/spacing-xs` (4px) | same | — | — |
| Radius | `radius/radius-sm` (4px) | same | same | same |
| Border width | 1px (no token — constant, becomes 2px on focus) | same | same | same |
| Border color | transparent (base — variants override via Variant Colors table below) | same | same | same |

**Variant Colors**
| Variant | Fill | Text | Border | Shadow |
|---------|------|------|--------|--------|
| default (Primary) | `action/primary` | `action/primary-foreground` | transparent | `shadow/shadow-xs` |
| outline | transparent | `text/foreground` | `border/input` | `shadow/shadow-xs` |
| secondary | `surface/secondary` | `text/secondary-foreground` | transparent | `shadow/shadow-xs` |
| ghost | transparent | `text/foreground` | transparent | none |
| link | transparent | `action/primary` | none | none |
| destructive | `action/destructive` | `action/destructive-foreground` | transparent | `shadow/shadow-xs` |
| danger | transparent | `action/destructive` | `action/destructive` | `shadow/shadow-xs` |

**Hover Colors**
| Variant | Hover bg | Hover border | Hover text |
|---------|---------|-------------|------------|
| default | `action/primary-hover` | — | — |
| outline | `action/hover` | `action/primary` | ⚠️ (`action/primary-hover`), (or `action/primary`?) |
| secondary | `action/hover` | — | `text/accent-foreground` |
| ghost | `action/hover` | — | ⚠️ (`action/primary-hover`), (or `action/primary`?) |
| link | — | — | `action/primary-hover` + underline |
| destructive | `action/destructive-hover` | — | — |
| danger | — | `action/destructive-hover` | `action/destructive-hover` |

**Press Colors**
| Variant | Press bg | Press border | Press text |
|---------|---------|-------------|------------|
| default | `action/primary-press` | — | — |
| outline | `action/press` | `action/primary-press` | `action/primary-press` |
| secondary | `action/press` | — | `action/primary-press` |
| ghost | `action/press` | — | `action/primary-press` |
| link | — | — | `action/primary-press` + underline |
| destructive | `action/destructive-press` | — | — |
| danger | `action/destructive` @ 20% | `action/destructive-press` | `action/destructive-press` |

**Disabled**
| Variant | Disabled bg | Disabled text | Disabled border | Disabled shadow |
|---------|------------|--------------|----------------|----------------|
| default | `action/disabled` | `action/disabled-foreground` | transparent | none |
| outline | transparent | `text/disabled-foreground` | `action/disabled` | none |
| secondary | transparent | `text/disabled-foreground` | — | none |
| ghost | — | `text/disabled-foreground` | — | — |
| link | — | `text/disabled-foreground` | — | — |
| destructive | `action/disabled` | `action/disabled-foreground` | transparent | none |
| danger | transparent | `text/disabled-foreground` | `action/disabled` | none |

---

## 2. Split Button

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Separator color between buttons | `bg-primary-foreground/20` (white @ 20% on filled) | ✅/❌ → |
| 2 | Split button uses same variant styles as Button (default, outline only) | Yes, via `buttonVariants` | ✅/❌ → |

### Full Spec
- Container: `flex w-fit items-stretch`, no gap (buttons are flush)
- Child buttons: right-side button loses `rounded-r`, left-side button loses `rounded-l` via CSS selectors
- Separator: `bg-primary-foreground/20`, vertical, `self-stretch`
- Orientation: horizontal (default) or vertical
- Uses same `buttonVariants` as Button — all variant/state/disabled specs from Button apply

---

## 3. Toggle Button

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Selected (pressed) state for default/icon | `bg-accent border-primary text-accent-foreground` | ✅/❌ → |
| 2 | Selected state for button variant | `bg-accent text-primary-press border-primary shadow-none` | ✅/❌ → |
| 3 | Default variant has no border and no shadow in unselected state | Yes — transparent border, no shadow | ✅/❌ → |
| 4 | Outline variant selected state | Same as default/icon (`bg-accent border-primary`) | ✅/❌ → |

### Full Spec

**Layout** — identical to Button (h-8/h-6, px-3/px-2, rounded-sm)

**Variant specifics (unselected state)**
| Variant | Border | Shadow | Bg |
|---------|--------|--------|-----|
| default | transparent | none | transparent |
| outline | `border-input` | `shadow-xs` | transparent |
| button | `border-input` | `shadow-xs` | transparent |
| icon | transparent | none | transparent |

**Selected state overrides**
| Variant | Bg | Border | Text | Shadow |
|---------|-----|--------|------|--------|
| default | `bg-accent` | `border-primary` | `text-accent-foreground` | — |
| outline | `bg-accent` | `border-primary` | `text-accent-foreground` | — |
| button | `bg-accent` | `border-primary` | `text-primary-press` | none |
| icon | `bg-accent` | `border-primary` | `text-accent-foreground` | — |

---

## 4. Segment Control

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default variant container bg | `bg-muted` | ✅/❌ → |
| 2 | Default variant selected item | `bg-background shadow-xs text-foreground` (no border) | ✅/❌ → |
| 3 | Default variant unselected text | `text-muted-foreground` | ✅/❌ → |
| 4 | Default md: container padding `p-1 gap-1`, item height `h-6 px-2` | Correct? | ✅/❌ → |
| 5 | Default sm: container padding `p-0.5 gap-0.5`, item height `h-5 px-2` | Correct? | ✅/❌ → |
| 6 | Outline variant: items have `border-input` between them, collapse doubles with `-ml-px` | Correct? | ✅/❌ → |
| 7 | Outline selected: `bg-accent border-primary text-accent-foreground shadow-none` | Correct? | ✅/❌ → |
| 8 | Outline container: `bg-background shadow-xs p-0 gap-0` | Correct? | ✅/❌ → |

### Full Spec

**Container**
| Variant | Bg | Padding (md) | Padding (sm) | Gap (md) | Gap (sm) | Shadow | Radius |
|---------|-----|-------------|-------------|---------|---------|--------|--------|
| default | `bg-muted` | `p-1` | `p-0.5` | `gap-1` | `gap-0.5` | none | `rounded-sm` |
| outline | `bg-background` | `p-0` | `p-0` | `gap-0` | `gap-0` | `shadow-xs` | `rounded-sm` |

**Item (default variant)**
| Size | Height | Padding | Radius | Border |
|------|--------|---------|--------|--------|
| md | `h-6` | `px-2` | `rounded-sm` | transparent |
| sm | `h-5` | `px-2` | `rounded-sm` | transparent |

**Item (outline variant)**
| Size | Height | Padding | Radius | Border |
|------|--------|---------|--------|--------|
| md | `h-8` | `px-3` | `rounded-none` (flush, first/last get `rounded-l/r-sm`) | `border-input` |
| sm | `h-6` | `px-2` | same | same |

---

# Form Controls

---

## 5. Input

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Focus state: `border-2 border-ring` + `shadow-focus` (BOTH border thickens AND ring) | Yes — code has both | ✅/❌ → |
| 2 | Hover: only border changes (`border-primary`), no bg change | Correct | ✅/❌ → |
| 3 | Disabled: `bg-disabled text-disabled-foreground border-disabled shadow-none` | Correct | ✅/❌ → |
| 4 | Active/press: `border-primary-press` (darker blue border on mousedown) | Correct | ✅/❌ → |

### Full Spec

**Layout**
| Property | Default (32px) | Small (24px) |
|----------|---------------|-------------|
| Height | 32px | 24px |
| Padding H | `spacing/spacing-mid` (12px) | `spacing/spacing-sm` (8px) |
| Padding V | `spacing/spacing-0` (0px) | same |
| Radius | `radius/radius-sm` (4px) | same |
| Border | 1px, `border/input` | same |
| Shadow | `shadow/shadow-xs` | same |
| Bg | `surface/background` | same |
| Text style | `Paragraph` (13px/20px) | same |
| Placeholder color | `text/muted-foreground` | same |

---

## 6. Textarea

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Min height is `min-h-14` (56px, ~3 lines) | Correct? | ✅/❌ → |
| 2 | Vertical padding is `py-2` (unlike Input which is `py-0`) | Correct? | ✅/❌ → |
| 3 | Uses `field-sizing-content` to auto-grow | Correct? | ✅/❌ → |

### Full Spec
Same as Input except:
| Property | Value |
|----------|-------|
| Min height | `min-h-14` |
| Padding | `px-3 py-2` |
| Auto-grow | `field-sizing-content` |
| No size prop | single size only |

All states (hover/focus/disabled/validation) identical to Input.

---

## 7. Checkbox

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Unchecked default: `border-input bg-background`, no shadow | Correct? | ✅/❌ → |
| 2 | Checked: `bg-primary border-primary text-primary-foreground shadow-xs` (gains shadow when checked) | Correct? | ✅/❌ → |
| 3 | Checked+hover: `bg-primary-hover border-primary-hover` (darker blue) | Correct? | ✅/❌ → |
| 4 | Indeterminate follows exact same styling as checked | Correct? | ✅/❌ → |
| 5 | Focus: `shadow-focus` (not `border-2 border-ring`) | Correct? | ✅/❌ → |
| 6 | Error+checked: `bg-destructive border-destructive text-destructive-foreground` | Correct? | ✅/❌ → |
| 7 | Hit target extends via `after:absolute after:-inset-x-3 after:-inset-y-2` | Correct? | ✅/❌ → |

### Full Spec
| Property | Value |
|----------|-------|
| Size | `size-4` (16px) |
| Radius | `rounded-[4px]` |
| Border | `border border-input` (unchecked) |
| Bg | `bg-background` (unchecked) |
| Check icon | `CheckSmall` (16px) |
| Indeterminate icon | `Dash` (16px) |

---

## 8. Radio

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Unselected: `border-input bg-background`, same as checkbox unchecked | Correct? | ✅/❌ → |
| 2 | Selected: `bg-primary border-primary shadow-xs` with white inner dot | Correct? | ✅/❌ → |
| 3 | Inner dot: `size-1.5 rounded-full bg-primary-foreground` centered absolutely | Correct? | ✅/❌ → |
| 4 | Selected+hover: `bg-primary-hover border-primary-hover` | Correct? | ✅/❌ → |
| 5 | Focus: `shadow-focus` (same as checkbox, not border-2) | Correct? | ✅/❌ → |

### Full Spec
| Property | Value |
|----------|-------|
| Size | `size-4` (16px), `rounded-full` |
| Border | `border border-input` (unselected) |
| Bg | `bg-background` (unselected) |
| Inner dot | `size-1.5 rounded-full bg-primary-foreground` |
| Hit target | `after:absolute after:-inset-x-3 after:-inset-y-2` |

States follow checkbox pattern exactly (selected = filled primary, hover darkens, etc.)

---

## 9. Switch

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default size: track `h-4 w-7`, thumb `size-3.5` | Correct? | ✅/❌ → |
| 2 | Small size: track `h-3 w-5`, thumb `size-3` | Correct? | ✅/❌ → |
| 3 | Unchecked track: `bg-input` (grey) | Correct? | ✅/❌ → |
| 4 | Unchecked hover: track gets `bg-hover border-primary-hover` | Correct? | ✅/❌ → |
| 5 | Checked: `bg-primary shadow-xs` | Correct? | ✅/❌ → |
| 6 | Checked hover: `bg-primary-hover` | Correct? | ✅/❌ → |
| 7 | Thumb is always `bg-background` (white) | Correct? | ✅/❌ → |
| 8 | Small thumb has `border border-input` (unchecked) / `border-primary` (checked) for definition | Correct? | ✅/❌ → |
| 9 | Default size has `border border-transparent` on track (no visible border) | Correct? | ✅/❌ → |
| 10 | Focus: `shadow-focus` on track | Correct? | ✅/❌ → |
| 11 | Disabled: `bg-disabled shadow-none` on track, for both checked and unchecked | Correct? | ✅/❌ → |

### Full Spec

**Track**
| Property | Default | Small |
|----------|---------|-------|
| Height | `h-4` (16px) | `h-3` (12px) |
| Width | `w-7` (28px) | `w-5` (20px) |
| Radius | `rounded-full` | same |
| Border | `border border-transparent` | none |

**Thumb**
| Property | Default | Small |
|----------|---------|-------|
| Size | `size-3.5` (14px) | `size-3` (12px) |
| Bg | `bg-background` | same |
| Radius | `rounded-full` | same |
| Checked translate | `translate-x-[calc(100%-2px)]` | `translate-x-2` |

---

## 10. Select

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default trigger: `border-input shadow-xs bg-background` (same as Input) | Correct? | ✅/❌ → |
| 2 | Ghost trigger: `border-transparent shadow-none`, gains `border-primary shadow-xs` on hover | Correct? | ✅/❌ → |
| 3 | Ghost default padding reduced: `px-2` (not `px-3`) at md size | Correct? | ✅/❌ → |
| 4 | Dropdown popup: `rounded-lg shadow-md ring-1 ring-foreground/10` | Correct? | ✅/❌ → |
| 5 | Item highlight (focused): `bg-accent text-accent-foreground` | Correct? | ✅/❌ → |
| 6 | Chevron icon: `text-muted-foreground` always | Correct? | ✅/❌ → |

### Full Spec

**Trigger Layout**
| Property | Default (32px) | Small (24px) |
|----------|---------------|-------------|
| Height | 32px | 24px |
| Padding H | `spacing/spacing-mid` (12px) | `spacing/spacing-sm` (8px) |
| Padding V | `spacing/spacing-0` | same |
| Gap | ⚠️ (8px), (`spacing/spacing-sm`?) | ⚠️ (4px), (`spacing/spacing-xs`?) |
| Radius | `radius/radius-sm` (4px) | same |
| Width | fit-content | same |

**Popup**
| Property | Token / Value |
|----------|--------------|
| Radius | `radius/radius-md` (8px) |
| Shadow | `shadow/shadow-md` |
| Ring | ⚠️ (1px `text/foreground` @ 10%), (no token — manual `ring-1 ring-foreground/10`?) |
| Bg | `surface/background` |
| Min width | 144px |
| Width | matches trigger (anchor-width) |

**Item**
| Property | Token / Value |
|----------|--------------|
| Padding | ⚠️ `pl-8 pr-1.5 py-1` — (no spacing tokens for these?) |
| Radius | ⚠️ (6px), (`radius/radius-sm`? but `rounded-md` = 6px not 4px) |
| Text style | `Paragraph` |
| Highlight | `surface/accent` + `text/accent-foreground` |

---

## 11. Combobox

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Input uses `InputGroup` wrapper (not standalone input styling) | Correct? | ✅/❌ → |
| 2 | Popup has internal search input styled: `border-input/30 bg-input/30 shadow-none` | Correct? | ✅/❌ → |
| 3 | Popup: `rounded-lg shadow-md ring-1 ring-foreground/10` (same as Select) | Correct? | ✅/❌ → |
| 4 | Item styling identical to Select item (`bg-accent` on highlight, check indicator right-aligned) | Correct? | ✅/❌ → |
| 5 | Small size input: `h-6` | Correct? | ✅/❌ → |

### Full Spec
- Trigger area: `InputGroup` with `ComboboxInput` + `ComboboxTrigger` (chevron) + optional `ComboboxClear` (X)
- Trigger button (chevron): `variant="ghost" size="icon-sm"`
- Clear button: `variant="ghost" size="icon-sm"`, hidden when no trigger visible
- Popup: same as Select popup (rounded-lg, shadow-md, ring)
- Items: same as Select items (rounded-md, bg-accent on focus, check right-aligned at `right-2`)
- Empty state: `text-muted-foreground` centered, `text-[13px]`

---

## 12. TypeaheadCombobox (Multi-select with chips)

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Chips container: `rounded-sm border border-input shadow-xs px-2 py-1 min-h-8` | Correct? | ✅/❌ → |
| 2 | Individual chip: `h-[21px] bg-muted rounded-sm pl-1 pr-0.5 text-[12px]` | Correct? | ✅/❌ → |
| 3 | Chip remove button: `variant="ghost" size="icon-sm"` with `opacity-50 hover:opacity-100` | Correct? | ✅/❌ → |
| 4 | Focus on chips container: `border-2 border-ring shadow-focus` (same pattern as Input) | Correct? | ✅/❌ → |
| 5 | Error on chips container: `border-destructive` + destructive ring shadow | Correct? | ✅/❌ → |
| 6 | Chip max-width: `max-w-[160px]` with overflow clip | Correct? | ✅/❌ → |

### Full Spec
- Container acts like an Input visually (border, shadow, radius, focus/error states)
- Chips inside: muted bg pills with text + optional remove button
- Inline input: `min-w-16 flex-1 outline-none` (grows to fill remaining space)
- Dropdown: identical to Combobox popup, anchored to chips container

---

# Feedback Components

---

## 13. Dialog

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Container: `border border-border rounded-lg shadow-lg p-4` | Correct? | ✅/❌ → |
| 2 | Title: `text-[22px] leading-[28px] font-semibold` (Title 2 style) | Correct? | ✅/❌ → |
| 3 | Description: `text-[13px] text-muted-foreground` | Correct? | ✅/❌ → |
| 4 | Close button: ghost `icon-sm` at `top-2 right-2` | Correct? | ✅/❌ → |
| 5 | Footer: `-mx-4 -mb-4 p-4 pt-0` (bleeds to edges, no top padding) | Correct? | ✅/❌ → |
| 6 | Overlay: `bg-[var(--overlay)]` with `backdrop-blur-xs` | Correct? | ✅/❌ → |

### Full Spec

**Sizes**
| Size | Max width |
|------|-----------|
| normal | `640px` |
| wide | `880px` |
| extrawide | `1200px` |

**Layout**
| Property | Token / Value |
|----------|--------------|
| Padding | ⚠️ (16px), (`spacing/spacing-lg`?) |
| Gap | ⚠️ (16px), (`spacing/spacing-lg`?) |
| Radius | `radius/radius-md` (8px) |
| Border | 1px, `border/border` |
| Shadow | `shadow/shadow-lg` |
| Position | fixed, centered |
| Header gap | ⚠️ (8px), (`spacing/spacing-sm`?) |

---

## 14. AlertDialog

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default size max-width: `sm:max-w-sm` (~384px), not Dialog's 640px | Correct? | ✅/❌ → |
| 2 | sm size footer: `grid grid-cols-2` (buttons side by side) vs default: `flex justify-end` | Correct? | ✅/❌ → |
| 3 | Media slot: `size-10 rounded-md bg-muted` icon container | Correct? | ✅/❌ → |
| 4 | No close X button (unlike Dialog) | Correct? | ✅/❌ → |
| 5 | Title: `text-[13px] font-semibold` (NOT Title 2 like Dialog — smaller, since it's a confirmation) | Correct? | ✅/❌ → |
| 6 | sm size: centered text, default size: left-aligned on sm+ breakpoint | Correct? | ✅/❌ → |

### Full Spec
Same overlay/animation as Dialog. Key differences:
| Property | AlertDialog | Dialog |
|----------|------------|--------|
| Title size | `text-[13px] font-semibold` | `text-[22px] font-semibold` |
| Max width | `sm:max-w-sm` | `sm:max-w-[640px]` |
| Close button | None | Ghost icon-sm |
| Cancel button | `variant="outline"` via `AlertDialogCancel` | manual |
| Text alignment | centered (sm size), left (default size on sm+) | left |

---

## 15. Alert

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Info/default variant: `bg-foreground/[0.04]` (very subtle grey wash) | Correct? | ✅/❌ → |
| 2 | Warning/success/danger: `bg-{color}/8` (8% tint of the semantic color) | Correct? | ✅/❌ → |
| 3 | Description text is always `text-foreground` regardless of variant | Correct? | ✅/❌ → |
| 4 | Icon color: `text-muted-foreground` for info/default, `text-current` for warning/success/danger | Correct? | ✅/❌ → |
| 5 | Action slot: `absolute top-2 right-2` | Correct? | ✅/❌ → |
| 6 | Info and default variants are visually identical | Correct? | ✅/❌ → |

### Full Spec

**Layout**
| Property | Value |
|----------|-------|
| Padding | `p-3` |
| Gap | `gap-1` (title to description), `gap-x-2` (icon to text) |
| Radius | `rounded-lg` (8px) |
| Border | `border` (color per variant) |
| Grid | `grid-cols-[auto_1fr]` when icon present |
| Has action | `pr-18` for action slot space |

**Variant Colors**
| Variant | Bg | Border | Title text | Icon |
|---------|-----|--------|-----------|------|
| default/info | `bg-foreground/[0.04]` | `border-border` | `text-foreground` | `text-muted-foreground` |
| warning | `bg-warning/8` | `border-warning` | `text-warning` | `text-current` (warning) |
| success | `bg-success/8` | `border-success` | `text-success` | `text-current` (success) |
| danger | `bg-destructive/8` | `border-destructive` | `text-destructive` | `text-current` (destructive) |

---

## 16. Toast (Sonner)

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Toast bg/text/border use CSS vars: `--normal-bg: var(--background)`, `--normal-text: var(--foreground)`, `--normal-border: var(--border)` | Correct? | ✅/❌ → |
| 2 | Border radius: `var(--radius-sm)` (4px) | Correct? | ✅/❌ → |
| 3 | Icons: `size-4` for all types (success=CircleCheck, info=Info, warning=TriangleAlert, error=OctagonX, loading=Loader2+spin) | Correct? | ✅/❌ → |
| 4 | Sonner handles all positioning/animation — we only customize icons + CSS vars | Correct? | ✅/❌ → |

### Full Spec
Sonner is a third-party toast library. We customize via:
- CSS custom properties for colors/border
- Custom icon components per type
- `cn-toast` className for additional overrides
- All layout, stacking, positioning managed by sonner

---

## 17. Tooltip

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Bg is `bg-foreground` (dark, inverted) with `text-background` (light text) | Correct? | ✅/❌ → |
| 2 | Padding: `px-2 py-1` | Correct? | ✅/❌ → |
| 3 | Font: `text-[12px] leading-[16px]` (Hint style, not Paragraph) | Correct? | ✅/❌ → |
| 4 | Radius: `rounded-sm` (4px) | Correct? | ✅/❌ → |
| 5 | Arrow: `size-2.5 bg-foreground rounded-[2px]` rotated 45deg | Correct? | ✅/❌ → |
| 6 | Max width: `max-w-xs` (~320px) | Correct? | ✅/❌ → |
| 7 | No shadow on tooltip (just solid bg) | Correct? | ✅/❌ → |

### Full Spec
| Property | Token / Value |
|----------|--------------|
| Bg | `text/foreground` (inverted — dark bg) |
| Text | `surface/background` (inverted — light text) |
| Padding H | `spacing/spacing-sm` (8px) |
| Padding V | ⚠️ (4px), (`spacing/spacing-xs`?) |
| Text style | `Hint` (12px/16px) |
| Radius | `radius/radius-sm` (4px) |
| Max width | ⚠️ (320px), (no token — hardcoded `max-w-xs`) |
| Arrow | 10px, `text/foreground` fill, 2px corner radius, 45deg rotation |
| Shadow | none |
| Offset | 4px from trigger |

---

## 18. Popover

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Container: `shadow-md border border-border` (NOT `ring-1 ring-foreground/10` like Select/DropdownMenu) | Correct? Border instead of ring? | ✅/❌ → |
| 2 | Width: `w-[280px]` fixed | Correct? | ✅/❌ → |
| 3 | Padding: `p-3` | Correct? | ✅/❌ → |
| 4 | Radius: `rounded-sm` (4px) — NOT `rounded-lg` like Select/DropdownMenu | Correct? Seems inconsistent. | ✅/❌ → |
| 5 | Content gap: `gap-2.5` between children | Correct? | ✅/❌ → |

### Full Spec
| Property | Token / Value |
|----------|--------------|
| Width | 280px (hardcoded) |
| Padding | `spacing/spacing-mid` (12px) |
| Radius | ⚠️ (`radius/radius-sm` = 4px), (should this be `radius/radius-md` = 8px to match other popups?) |
| Bg | `surface/background` |
| Border | 1px, `border/border` |
| Shadow | `shadow/shadow-md` |
| Content gap | ⚠️ (10px), (no spacing token — between `spacing/spacing-sm` 8px and `spacing/spacing-mid` 12px) |
| Offset | 4px from trigger |

---

## 19. HoverCard

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Identical styling to Popover (`rounded-sm shadow-md border border-border p-3 w-[280px]`) | Correct? | ✅/❌ → |
| 2 | No internal structure defined (just a content slot) | Correct? | ✅/❌ → |

### Full Spec
Visually identical to Popover. Same width, padding, radius, shadow, border. Triggered on hover instead of click.

---

# Overlay Components

---

## 20. DropdownMenu

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Popup: `rounded-lg shadow-md ring-1 ring-foreground/10` (ring, NOT border — unlike Popover) | Correct? | ✅/❌ → |
| 2 | Item padding: `px-2 py-1 rounded-sm` | Correct? | ✅/❌ → |
| 3 | Item highlight: `focus:bg-accent focus:text-accent-foreground` | Correct? | ✅/❌ → |
| 4 | Destructive item: `text-destructive`, highlight becomes `bg-destructive/10 text-destructive` (stays red) | Correct? | ✅/❌ → |
| 5 | Label: `text-[12px] font-semibold text-muted-foreground px-2 py-1` | Correct? | ✅/❌ → |
| 6 | Separator: `h-px bg-border -mx-1 my-1` | Correct? | ✅/❌ → |
| 7 | Shortcut text: `text-[12px] text-muted-foreground ml-auto` | Correct? | ✅/❌ → |
| 8 | Checkbox/Radio items: check indicator at `right-2`, padding `pl-2 pr-8` | Correct? | ✅/❌ → |

### Full Spec

**Popup**
| Property | Token / Value |
|----------|--------------|
| Radius | `radius/radius-md` (8px) |
| Shadow | `shadow/shadow-md` |
| Ring | ⚠️ (1px `text/foreground` @ 10%), (no token — same question as Select popup) |
| Bg | `surface/background` |
| Padding | ⚠️ (4px), (`spacing/spacing-xs`?) |
| Min width | 128px |
| Offset | 4px from trigger |

**Items**
| Property | Token / Value |
|----------|--------------|
| Padding H | `spacing/spacing-sm` (8px) |
| Padding V | ⚠️ (4px), (`spacing/spacing-xs`?) |
| Radius | `radius/radius-sm` (4px) |
| Text style | `Paragraph` |
| Highlight | `surface/accent` + `text/accent-foreground` |
| Icon size | 16px |
| Gap | `spacing/spacing-sm` (8px) |

---

## 21. Drawer

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Left/right drawer max-width: `sm:max-w-[360px]` | Correct? | ✅/❌ → |
| 2 | Bottom drawer: `max-h-[80vh] rounded-t-xl border-t` | Correct? | ✅/❌ → |
| 3 | Overlay: `bg-skeleton` (not `bg-overlay` like Dialog) | Correct? Intentional difference? | ✅/❌ → |
| 4 | Bottom drawer has drag handle: `h-1 w-[100px] rounded-full bg-muted` | Correct? | ✅/❌ → |
| 5 | Title: `text-[22px] leading-[28px] font-semibold` (same as Dialog title) | Correct? | ✅/❌ → |
| 6 | Header padding: `px-6 pt-6 pb-2` | Correct? | ✅/❌ → |
| 7 | Footer padding: `px-6 pt-2 pb-6` | Correct? | ✅/❌ → |
| 8 | Shadow: `shadow-lg` | Correct? | ✅/❌ → |

### Full Spec

**Container**
| Direction | Radius | Border | Position |
|-----------|--------|--------|----------|
| bottom | `rounded-t-xl` | `border-t` | `inset-x-0 bottom-0` |
| right | `rounded-l-xl` | `border-l` | `inset-y-0 right-0` |
| left | `rounded-r-xl` | `border-r` | `inset-y-0 left-0` |
| top | `rounded-b-xl` | `border-b` | `inset-x-0 top-0` |

---

# Control Components

---

## 22. Tabs

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default (lined) variant: tab bar has `border-b border-border`, height `h-8` | Correct? | ✅/❌ → |
| 2 | Active tab indicator: `border-b-[3px] border-b-primary` (3px blue bottom border) | Correct? 3px not 2px? | ✅/❌ → |
| 3 | Tab text: `text-[13px] font-semibold` (bold, not regular) | Correct? | ✅/❌ → |
| 4 | Inactive tab text: `text-muted-foreground` | Correct? | ✅/❌ → |
| 5 | Tab hover: `text-primary-hover` | Correct? | ✅/❌ → |
| 6 | Tab gap: `gap-4` (default variant) | Correct? | ✅/❌ → |
| 7 | Pill variant: `bg-muted rounded-lg p-[3px] gap-1` container | Correct? | ✅/❌ → |
| 8 | Pill active: `bg-background shadow-sm text-foreground rounded-md` | Correct? | ✅/❌ → |
| 9 | Focus: `border-ring ring-[3px] ring-ring/50` | Correct? | ✅/❌ → |

### Full Spec

**Tab bar (default/lined)**
| Property | Value |
|----------|-------|
| Height | `h-8` |
| Border | `border-b border-border` |
| Gap | `gap-4` |
| Bg | transparent |

**Tab trigger**
| Property | Value |
|----------|-------|
| Font | `text-[13px] font-semibold` |
| Padding | `py-1.5` |
| Active indicator | `border-b-[3px] border-b-primary` |
| Inactive | `text-muted-foreground` + `border-b-[3px] border-transparent` |

**Pill variant tab bar**
| Property | Value |
|----------|-------|
| Bg | `bg-muted` |
| Radius | `rounded-lg` |
| Padding | `p-[3px]` |
| Gap | `gap-1` |

**Pill active tab**
| Property | Value |
|----------|-------|
| Bg | `bg-background` |
| Shadow | `shadow-sm` |
| Radius | `rounded-md` |

---

## 23. Slider

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Track: `h-1 rounded-sm bg-border` (4px tall, grey) | Correct? | ✅/❌ → |
| 2 | Range (filled portion): `bg-primary` | Correct? | ✅/❌ → |
| 3 | Thumb: `size-3.5 rounded-full bg-primary shadow-xs` (14px circle) | Correct? | ✅/❌ → |
| 4 | Thumb hover: `bg-primary-hover` | Correct? | ✅/❌ → |
| 5 | Thumb press: `bg-primary-press` | Correct? | ✅/❌ → |
| 6 | Thumb focus: `ring-3 ring-ring/50` (no border change) | Correct? | ✅/❌ → |
| 7 | Thumb disabled: `bg-disabled pointer-events-none` | Correct? | ✅/❌ → |
| 8 | Disabled track opacity: `opacity-50` on control wrapper | Correct? | ✅/❌ → |
| 9 | `thumbAlignment="edge"` — thumb stops at track edges, doesn't overflow | Correct? | ✅/❌ → |

### Full Spec

**Track**
| Property | Value |
|----------|-------|
| Height | `h-1` (4px) |
| Radius | `rounded-sm` |
| Bg | `bg-border` |

**Thumb**
| Property | Value |
|----------|-------|
| Size | `size-3.5` (14px) |
| Bg | `bg-primary` |
| Shadow | `shadow-xs` |
| Radius | `rounded-full` |
| Hit target | `after:absolute after:-inset-2` |

---

## 24. RadioTile

### 🔍 VERIFY — Uncertain decisions
| # | Question | My assumption | Your answer |
|---|----------|---------------|-------------|
| 1 | Default: `border-input bg-background p-4 rounded-sm shadow-xs` | Correct? | ✅/❌ → |
| 2 | Hover: `border-primary-hover` | Correct? | ✅/❌ → |
| 3 | Selected: `border-primary shadow-none` (shadow removed on selection) | Correct? | ✅/❌ → |
| 4 | Focus: `border-ring ring-3 ring-ring/50` | Correct? | ✅/❌ → |
| 5 | Radio indicator: `size-4 rounded-full border border-input` (unselected) → `border-primary bg-primary` (selected) | Correct? | ✅/❌ → |
| 6 | Inner dot: `size-1.5 rounded-full bg-primary-foreground` (same as Radio) | Correct? | ✅/❌ → |
| 7 | Title: `font-normal text-foreground` (not bold) | Correct? | ✅/❌ → |
| 8 | Description: `text-[12px] text-muted-foreground` | Correct? | ✅/❌ → |
| 9 | Disabled: `opacity-50 border-disabled shadow-none text-disabled-foreground` | Correct? | ✅/❌ → |
| 10 | Error: `border-destructive ring-3 ring-destructive/20` | Correct? | ✅/❌ → |

### Full Spec

**Container**
| Property | Token / Value |
|----------|--------------|
| Padding | ⚠️ (16px), (`spacing/spacing-lg`?) |
| Gap | ⚠️ (4px), (`spacing/spacing-xs`?) |
| Radius | `radius/radius-sm` (4px) |
| Border | 1px, `border/input` |
| Shadow | `shadow/shadow-xs` |
| Bg | `surface/background` |

**Group**
| Property | Token / Value |
|----------|--------------|
| Gap | `spacing/spacing-mid` (12px) |
| Layout | grid |

---

# Summary

**Total verify items:** ~95 questions across 24 components (Toast has 4, which are minor)

Most of these should be quick ✅ confirmations. Where something is ❌, just write the correct value and I'll update both this doc and the code.
