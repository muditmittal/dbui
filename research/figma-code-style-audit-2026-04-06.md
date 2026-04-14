# Figma ↔ Code Style Audit Report

> Date: 2026-04-06
> Audited by: Claude (sequential subagent audit)
> Scope: All 25 published Figma components (excluding icons)

## Summary

- **~730 individual property checks** across 25 components
- **~103 mismatches found**
- **~100 fixes applied** to code
- **5 decisions resolved** with user

## Fixes by Component

| # | Component | Fixes | Key Changes |
|---|-----------|-------|-------------|
| 1 | Button | 2 | Danger focus: shadow-none + overflow-clip |
| 2 | Icon Button | 1 | Danger hover: removed bg-destructive/10 (no bg in Figma) |
| 3 | Split Button | 1 | Separator: bg-primary-foreground/20 |
| 4 | Toggle Button | 5 | Selected shadow removed, outline shadow added, button/selected fill→accent |
| 5 | Segment Control | 2 | Unselected text→muted-foreground, outline selected text→accent-foreground |
| 6 | Input | 6 | px-3, py-0, bg-background, shadow-focus, leading-[20px] |
| 7 | Textarea | 6 | Same as Input pattern: px-3, bg-background, shadow-focus, leading-[20px], min-h-14 |
| 8 | Checkbox | 2 | shadow-xs on checked/indeterminate, checked+danger→red fill |
| 9 | Radio | 1 | shadow-xs on selected state |
| 10 | Switch | 3 | shadow-xs on checked, small border scoped, small thumb translate fixed |
| 11 | Select | 15 | Major overhaul: padding, bg, shadow-focus, disabled tokens, ghost hover, size-driven spacing |
| 12 | Combobox/InputGroup | 4 | InputGroup: bg-background, shadow-xs, hover:border-primary, active:border-primary-press |
| 13 | TypeaheadCombobox | 6 | Chips container: rounded-sm, px-2, shadow-xs, focus shadow. Chip: gap, padding, font-weight |
| 14 | DropdownMenu | 4 | MenuItem: px-2, gap-2, rounded-sm. Applied to all 4 item sub-components |
| 15 | Alert | 4 | p-3, gap-1, description text-foreground. Removed duplicate `destructive` variant (kept `danger`) |
| 16 | Toast | 1 | Border-radius: var(--radius-sm) |
| 17 | Dialog | 5 | Overlay: var(--overlay), rounded-lg, border-border shadow-lg, title 22px, footer simplified |
| 18 | AlertDialog | 4 | Same overlay + radius + border + footer fixes as Dialog |
| 19 | Slider | 3 | Track: bg-border, rounded-sm. Thumb: shadow-xs, removed hover/active rings |
| 20 | Tabs | 1 | TabsTrigger: gap-2 (8px) |
| 21 | Radio Tile | 4 | Title: font-normal. Disabled: border-disabled, shadow-none, text-disabled-foreground |
| 22 | Tooltip | 3 | px-2 py-1, rounded-sm, leading-[16px] |
| 23 | Popover | 4 | w-280, p-3, rounded-sm, border-border |
| 24 | HoverCard | 4 | w-280, p-3, rounded-sm, border-border (aligned to Popover) |
| 25 | Drawer | 6 | Overlay: bg-skeleton, shadow-lg, max-w-360, header/footer padding, title 22px |
| 26 | Card | 4 | rounded-lg (was xl), title leading-[20px], corners matched |
| 27 | Avatar | 1 | Fallback: font-semibold |
| 28 | Badge | 1 | rounded-full (was rounded-4xl) |
| 29 | Table | 0 | All correct |
| 30 | Skeleton | 2 | rounded-sm, bg-skeleton |

## Decisions Made

| # | Decision | Resolution |
|---|----------|------------|
| 1 | Icon Button danger hover bg | Removed `bg-destructive/10` from code — Figma shows no bg fill on hover |
| 2 | Icon Button danger disabled opacity | User removed opacity from Figma — code uses token-based disabled styling |
| 3 | Input disabled fill | Using `bg-disabled` in code — confirmed DuBois uses fill |
| 4 | Checkbox checked+danger | Updated code to red fill (`bg-destructive`) — matches Figma |
| 5 | Dialog vs Drawer overlay | Dialog uses `--overlay` token (darker). Drawer uses `--skeleton` token (lighter). Intentional — task modals need focus, drawers need subtlety. |

## Remaining Notes

- **Toast**: Sonner library controls internal shadow/padding/font-size. We override bg/text/border/radius via CSS vars but font-size (14px default vs our 13px) and shadow may not match. Low severity — toasts are transient. A `cn-toast` CSS class in globals.css could fix if needed.
- **Badge**: Figma is first draft, not finalized. Kept `font-semibold` in code despite Figma showing Regular.
- **HoverCard Figma node**: Draft may not be saved/published. Aligned code to match Popover conventions.

## Pattern Consistency Established

These patterns are now consistent across ALL form controls (Input, Textarea, Select, Combobox):
- `bg-background` (explicit white fill)
- `px-3` default / `px-2` small (12px / 8px horizontal padding)
- `py-0` (no vertical padding — height controls vertical centering)
- `shadow-xs` on default state
- `hover:border-primary` on hover
- `active:border-primary-press` on press
- `focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-focus` on focus
- `disabled:bg-disabled disabled:border-disabled disabled:text-disabled-foreground disabled:shadow-none` on disabled
- `aria-invalid:border-destructive` + destructive ring shadow on danger
- `text-[13px] leading-[20px]` typography
- `rounded-sm` (4px) radius
