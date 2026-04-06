# Input Family Build Brief — for `/figma-generate-library`

> Pass this entire document as context when invoking the skill.
> Created: 2026-04-04

---

## Context

**File:** `OftbSQf85jOPln9RhSEhVv` (DBUI Design System)

**What exists already (DO NOT recreate):**
- 4 variable collections: Primitives (68), Semantic (51, Light/Dark), Numbers (14), Typography (19, Production/Wireframe)
- 8 text styles: Hint (12/16), Paragraph (13/20), Bold (13/20 Semibold), Code (13/20 Mono), Title 4-1
- 6 effect styles: shadow-xs, shadow-sm, shadow, shadow-md, shadow-lg, shadow-focus
- 450 icon components on Icons page (PascalCase names, 16x16, one component each)
- `.Action Label` building block (`154:157`) -- hidden component with Icon (INSTANCE_SWAP), Label (TEXT), Menu (INSTANCE_SWAP), Show Icon/Show Menu booleans
- `.SegmentControlItem` building block (`589:898`)
- Button family is finalized (on Archive page now) -- follow its patterns

**Components page is clean** -- only `.Action Label` and `.SegmentControlItem` remain. Build new components here.

---

## What to Build

Build the **Input family**: 3 component sets + 1 building block, in this order:

### 1. `.Input Content` (Building Block -- hidden component)

Similar to `.Action Label` but for input internals. Structure:

```
.Input Content
+-- Left Icon (INSTANCE, hidden by default) -- INSTANCE_SWAP to icon library
+-- Value/Placeholder (TEXT, FILL) -- editable text, uses Paragraph text style
+-- Right Icon (INSTANCE, hidden by default) -- INSTANCE_SWAP to icon library
+-- Right Button (INSTANCE, hidden by default) -- INSTANCE_SWAP (ghost icon button for clear/toggle/chevron)

Properties:
+-- Text: TEXT -> "Placeholder"
+-- Show Left Icon: BOOLEAN -> false
+-- Show Right Icon: BOOLEAN -> false
+-- Show Right Button: BOOLEAN -> false
+-- Left Icon: INSTANCE_SWAP -> Search icon default
+-- Right Icon: INSTANCE_SWAP -> any icon
+-- Right Button: INSTANCE_SWAP -> XCircle icon default
```

This lets designers toggle icons/buttons on/off without detaching.

### 2. Input (Component Set)

```
Properties:
+-- Size: Default (32px) | Small (24px)
+-- State: Default | Hover | Focus | Disabled | Error
+-- Contains: .Input Content instance (all properties exposed)

Variant matrix: 2 sizes x 5 states = 10 variants
```

### 3. Textarea (Component Set)

```
Properties:
+-- Size: Default | Small
+-- State: Default | Hover | Focus | Disabled | Error
+-- Contains: multi-line text node (no .Input Content -- just text, Paragraph style)

Height: min 80px, auto-layout vertical
Variant matrix: 2 sizes x 5 states = 10 variants
```

### 4. InputGroup (Component Set)

Composition component showing Input with external addons:

```
Properties:
+-- Variant: Plain | Prefix Text | Suffix Text | Prefix + Suffix
+-- State: Default | Focus | Error
+-- Contains: prefix text (e.g. "https://", "$"), Input instance, suffix text

Variant matrix: 4 variants x 3 states = 12 variants
```

InputGroup wraps the Input component instance with additional text/label addons outside the input border. This is distinct from the icon/button addons inside `.Input Content`.

---

## Mandatory Construction Rules

**ZERO hardcoded values.** Every property must be bound:

| Property | Default (32px) | Small (24px) |
|----------|---------------|--------------|
| Horizontal padding | `spacing/spacing-mid` (12px) | `spacing/spacing-sm` (8px) |
| Vertical padding | `spacing/spacing-0` | `spacing/spacing-0` |
| Gap | `spacing/spacing-xs` (4px) | `spacing/spacing-xs` (4px) |
| Corner radius (all 4) | `radius/radius-sm` | `radius/radius-sm` |
| Text style | `Paragraph` text style | `Paragraph` text style |

### Per-State Styling

| State | Stroke | Fill | Effect | Text | Frame opacity |
|-------|--------|------|--------|------|---------------|
| Default | `border/input` | none | `shadow/shadow-xs` style | `text/muted-foreground` (placeholder) | 1.0 |
| Hover | `action/primary-hover` | none | `shadow/shadow-xs` style | same | 1.0 |
| Focus | `action/ring`, weight=2 | none | `shadow/shadow-focus` + shadow-xs effects | `text/foreground` | 1.0 |
| Disabled | `border/input` | `border/input` @ 50% opacity | none | `text/muted-foreground` | 0.5 |
| Error | `action/destructive` | none | destructive ring (spread=3, @20%) + shadow-xs | `text/foreground` | 1.0 |

### Board Layout

- Grid: columns = sizes, rows = states
- Labels outside component set: size headers on top, state labels on left
- Labels use 12px SF Pro Text Semibold, `text/muted-foreground` color
- 20px internal padding in component set
- `get_screenshot` after every component for validation

---

## Real-World Use Cases This Must Support

Designers need to be able to configure these without detaching:

| Use Case | Left Icon | Text | Right Icon | Right Button |
|----------|----------|------|-----------|-------------|
| Plain text input | -- | Placeholder | -- | -- |
| Search | Search icon | Search... | -- | -- |
| Search + clear | Search icon | query text | -- | XCircle |
| Password | -- | ******* | -- | Visible/VisibleOff |
| Combobox trigger | -- | Select... | -- | ChevronDown |
| URL field | -- | example.com | -- | -- |
| With validation icon | -- | text | WarningFill | -- |

All achieved by toggling Show Left Icon / Show Right Icon / Show Right Button booleans and swapping icon instances.

---

## Reference: How Button Does It

Button uses `.Action Label` instance inside each variant. The `.Action Label`'s properties (Label, Show Icon, Show Menu, Icon, Menu) are exposed through the parent Button component. Follow this same pattern -- `.Input Content` properties should be accessible from the Input component set.

### .Action Label Structure (id: 154:157)

```
.Action Label (hidden component, dot-prefix)
+-- Icon (INSTANCE, hidden by default) -- INSTANCE_SWAP to any icon
+-- Label (TEXT) -- editable text
+-- Menu (INSTANCE, hidden by default) -- INSTANCE_SWAP (ChevronDown default)

Properties:
+-- Label#154:0: TEXT -> "Label"
+-- Show Icon#154:1: BOOLEAN -> false
+-- Show Menu#154:2: BOOLEAN -> false
+-- Icon#154:3: INSTANCE_SWAP -> Plus (default)
+-- Menu#154:4: INSTANCE_SWAP -> ChevronDown (default)
```

---

## Code Reference

### Input (`apps/portal/src/components/ui/input.tsx`)
- Single `<input>` wrapper, h-8 (32px), rounded-lg, border-input, shadow-xs, px-2.5
- States: hover (border-primary-hover), focus (border-ring + ring-3), disabled (opacity-50 + bg-input/50), error (aria-invalid -> border-destructive + ring)

### InputGroup (`apps/portal/src/components/ui/input-group.tsx`)
- Composable addon system: InputGroup > InputGroupAddon (align: inline-start/end, block-start/end) + InputGroupInput
- InputGroupButton: ghost buttons inside the input (clear, toggle, dropdown)
- InputGroupText: non-interactive text/icons (prefixes, suffixes)

### Textarea (`apps/portal/src/components/ui/textarea.tsx`)
- Multi-line input, min-h-16, same border/focus styling as Input
