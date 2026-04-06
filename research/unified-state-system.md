# Unified State System — Token Map

> Single source of truth for all component states across the design system.
> Derived from Button component token usage. Apply everywhere.
> Created: 2026-04-04

---

## Standard States (6)

All interactive components use these 6 states:

| # | State | Description |
|---|-------|-------------|
| 1 | **Default** | Resting state |
| 2 | **Hover** | Mouse over |
| 3 | **Press** | Mouse down / active |
| 4 | **Focus** | Keyboard focus |
| 5 | **Disabled** | Non-interactive |
| 6 | **Danger** | Validation error / destructive context (was "Error") |

Loading state is Button-specific, not universal.

---

## Pattern A: Filled Surface (Primary fill with white content)

**Applies to:** Button Primary/Destructive, Checkbox checked, Radio selected, Switch on-track

| State | Fill | Stroke | Effect Style | Content (icon/text) |
|-------|------|--------|-------------|---------------------|
| Default | `action/primary` | none | `shadow/shadow-xs` | `action/primary-foreground` |
| Hover | `action/primary-hover` | none | `shadow/shadow-xs` | `action/primary-foreground` |
| Press | `action/primary-press` | none | `shadow/shadow-xs` | `action/primary-foreground` |
| Focus | `action/primary` | none | `shadow/shadow-focus` | `action/primary-foreground` |
| Disabled | `action/disabled` | none | none | `action/disabled-foreground` |

For destructive variants, substitute `action/destructive*` for `action/primary*`.

---

## Pattern B: Bordered Surface (Stroke with transparent/tinted fill)

**Applies to:** Button Outline/Secondary/Ghost, Checkbox unchecked, Radio unselected, Input, Select, Textarea

| State | Fill | Stroke | Effect Style | Content (icon/text) |
|-------|------|--------|-------------|---------------------|
| Default | none | `border/input` | `shadow/shadow-xs` | `text/foreground` |
| Hover | `action/hover` (8% opacity) | `action/primary` | `shadow/shadow-xs` | `text/foreground` |
| Press | `action/press` (16% opacity) | `action/primary-press` | `shadow/shadow-xs` | `text/foreground` |
| Focus | none | `action/ring` | `shadow/shadow-focus` | `text/foreground` |
| Disabled | none | `action/disabled` | none | `action/disabled-foreground` |
| Danger | none | `action/destructive` | destructive ring (spread=3, @20%) + shadow-xs | `text/foreground` |

**Note:** Disabled uses explicit tokens — NOT opacity: 0.5. Every disabled state must use `action/disabled` for stroke/fill and `action/disabled-foreground` for content.

---

## Pattern C: Checkbox/Radio Unchecked Specific

Same as Pattern B but smaller (16x16), no padding, 4px radius.

| State | Fill | Stroke | Effect | Notes |
|-------|------|--------|--------|-------|
| Default | near-transparent | `border/input` | none | Very subtle fill for hit target |
| Hover | `action/hover` (8%) | `action/primary-hover` | none | Blue tint + darker border |
| Press | `action/press` (16%) | `action/primary-press` | none | Deeper tint |
| Focus | `surface/background` (white) | `action/primary` | focus ring frame | White fill makes ring visible |
| Disabled | `action/disabled` | `action/disabled` | none | Explicit disabled tokens |

---

## Pattern D: Switch Off-Track

| State | Track Fill | Thumb Fill |
|-------|-----------|-----------|
| Default | `border/input` | `surface/background` |
| Hover | `action/primary-hover` (subtle) | `surface/background` |
| Press | `action/primary-press` (subtle) | `surface/background` |
| Focus | `border/input` + focus ring | `surface/background` |
| Disabled | `action/disabled` | `surface/background` |

---

## Danger State (Form Controls)

For Input, Select, Textarea — replaces "Error":

| Property | Token |
|----------|-------|
| Stroke | `action/destructive` |
| Fill | none |
| Effect | Destructive ring (spread=3, destructive color @20%) + shadow-xs |
| Content | `text/foreground` (unchanged) |

---

## Disabled Rules (Universal)

**NEVER use `opacity: 0.5` on the frame.** Instead:

| Property | Disabled Token |
|----------|---------------|
| Fill (if filled) | `action/disabled` |
| Stroke (if bordered) | `action/disabled` |
| Text/Icon content | `action/disabled-foreground` |
| Effect | none (remove all shadows) |

---

## Shadow Rules

| State | Effect |
|-------|--------|
| Default, Hover, Press | `shadow/shadow-xs` effect style |
| Focus | `shadow/shadow-focus` effect style |
| Disabled | none |
| Danger | destructive ring + `shadow/shadow-xs` effects |

Exception: Checkbox/Radio (16x16) — DuBois shows shadow-xs on filled (checked) states but not on unchecked bordered states. Follow DuBois reference.

---

## State Name Alignment

| Old Name | New Name | Used In |
|----------|----------|---------|
| Error | **Danger** | Input, Select, Textarea, any validation |
| Active | **Press** | All interactive components |

All component sets use: `State=Default|Hover|Press|Focus|Disabled|Danger`
(Danger only on form controls that support validation)

---

## Component × State Matrix

| Component | Default | Hover | Press | Focus | Disabled | Danger |
|-----------|---------|-------|-------|-------|----------|--------|
| Button | x | x | x | x | x | - |
| Input | x | x | x | x | x | x |
| Textarea | x | x | x | x | x | x |
| Select | x | x | x | x | x | x |
| Checkbox (unchecked) | x | x | x | x | x | - |
| Checkbox (checked) | x | x | x | x | x | - |
| Radio (unselected) | x | x | x | x | x | - |
| Radio (selected) | x | x | x | x | x | - |
| Switch (off) | x | x | x | x | x | - |
| Switch (on) | x | x | x | x | x | - |
