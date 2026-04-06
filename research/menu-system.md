# Menu System Architecture v2

> Revised plan based on code investigation and design decisions.
> Created: 2026-04-04. Replaces v1.

---

## Design Principles

1. **Mirror code structure** — each Figma item component maps 1:1 to code components
2. **Merge only when visually identical** — DropdownMenu + ContextMenu share items (identical styling)
3. **Separate when interaction models differ** — Select, Combobox, Command each get own items
4. **Designers follow rules** — clear guidance on when to use which component

---

## Item Components (Building Blocks)

### 1. `.DropdownMenuItem`

**Maps to code:** `DropdownMenuItem`, `ContextMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubTrigger`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuSubTrigger`

```
Variant axes:
├── Type: Action | SingleSelect | MultiSelect | Submenu
├── State: Default | Hover | Selected | Disabled
│   (Selected only valid for SingleSelect and MultiSelect)
├── Content: Label Only | With Description

Properties:
├── Label: TEXT → "Option"
├── Description: TEXT → "Description" (With Description only)
├── Show Icon: BOOLEAN → false
├── Icon: INSTANCE_SWAP → any icon
├── Show Shortcut: BOOLEAN → false (Action and Submenu only)
├── Shortcut: TEXT → "⌘K"
├── Destructive: BOOLEAN → false (Action only — red text variant)
```

**Indicator rules by Type:**
- Action: no indicator
- SingleSelect: Check icon on LEFT (pl-7, indicator at left-1.5) — DuBois convention
- MultiSelect: Checkbox instance on LEFT
- Submenu: ChevronRight on RIGHT (ml-auto)

**Variant matrix:**

| Type | Default | Hover | Selected | Disabled | Total |
|------|---------|-------|----------|----------|-------|
| Action | x | x | - | x | 3 |
| SingleSelect | x | x | x | x | 4 |
| MultiSelect | x | x | x | x | 4 |
| Submenu | x | x | - | x | 3 |

× 2 Content = **28 variants**

**Styling (from code):**
- Layout: flex, gap-1.5, rounded-md (radius-sm)
- Padding (Action/Submenu): px-1.5 py-1
- Padding (SingleSelect/MultiSelect): py-1 pr-1.5 pl-7 (left space for indicator)
- Hover: bg-accent, text-accent-foreground
- Disabled: opacity-50, pointer-events-none (code uses opacity here, not explicit tokens)
- Destructive: text-destructive, hover bg-destructive/10
- Icons: size-4, shrink-0

---

### 2. `.SelectItem`

**Maps to code:** `SelectItem`

```
Variant axes:
├── State: Default | Hover | Selected | Disabled
├── Content: Label Only | With Description

Properties:
├── Label: TEXT → "Option"
├── Description: TEXT → "Description"
├── Show Icon: BOOLEAN → false (for asset/resource icons)
├── Icon: INSTANCE_SWAP
```

**Indicator:** Check icon on RIGHT (absolute right-2) — auto-visible on Selected state.

**Variant matrix:** 4 states × 2 content = **8 variants**

**Styling (from code):**
- Layout: flex, w-full, gap-1.5, rounded-md
- Padding: py-1 pr-8 pl-1.5 (right space for check indicator)
- Hover: focus:bg-accent, focus:text-accent-foreground
- Disabled: opacity-50, pointer-events-none

---

### 3. `.ComboboxItem`

**Maps to code:** `ComboboxItem`

```
Variant axes:
├── State: Default | Highlighted | Selected | Disabled
├── Content: Label Only | With Description

Properties:
├── Label: TEXT → "Option"
├── Description: TEXT → "Description"
├── Show Icon: BOOLEAN → false
├── Icon: INSTANCE_SWAP
```

**Indicator:** Check icon on RIGHT (absolute right-2) — auto-visible on Selected state.

**Note:** Uses "Highlighted" not "Hover" — matches code's `data-highlighted` (keyboard navigation state).

**Variant matrix:** 4 states × 2 content = **8 variants**

**Styling (from code):**
- Layout: flex, w-full, gap-2 (not 1.5), rounded-md
- Padding: py-1 pr-8 pl-1.5
- Highlighted: data-highlighted:bg-accent, data-highlighted:text-accent-foreground
- Disabled: opacity-50, pointer-events-none

---

### 4. `.CommandItem`

**Maps to code:** `CommandItem`

```
Variant axes:
├── State: Default | Selected | Disabled
├── Content: Label Only | With Description

Properties:
├── Label: TEXT → "Option"
├── Description: TEXT → "Description"
├── Show Icon: BOOLEAN → false
├── Icon: INSTANCE_SWAP
├── Show Shortcut: BOOLEAN → false
├── Shortcut: TEXT → "⌘K"
```

**Indicator:** Check icon on RIGHT (ml-auto, opacity-based) — visible on Selected.
Hidden when Shortcut is shown.

**Variant matrix:** 3 states × 2 content = **6 variants**

**Styling (from code — DIFFERENT from others):**
- Layout: flex, gap-2, rounded-sm (NOT rounded-md)
- Padding: px-2 py-1.5 (NOT px-1.5 py-1)
- Selected: data-selected:bg-muted (NOT bg-accent)
- Disabled: data-[disabled=true]:opacity-50

---

## Shared Building Blocks

### .MenuGroup — Group header label
```
Properties:
├── Label: TEXT → "Group"
```
Styling: 12px semibold, muted-foreground, px-1.5 py-1

### .MenuSeparator — Divider line
1px bg-border, full width, my-1

### MenuContent — Popover shell
surface/popover, shadow-md, ring-1 ring-foreground/10, radius-md, p-1

---

## Trigger Components

### Select — Custom select trigger
```
Variant axes: Size (Default/Small) × State (Default/Hover/Press/Focus/Disabled/Danger)
= 12 variants

Properties: Text, Show Icon, Icon
```
Already built — node `732:601`.

### Combobox — Searchable select trigger (future)
```
Variant axes: Size (Default/Small) × State (Default/Hover/Press/Focus/Disabled/Danger)
= 12 variants

Properties: Content (Placeholder/Value/Typing), Placeholder, Value, Show Clear
```

### DropdownMenu trigger — covered by Button family
Menu buttons use Button with `.ActionLabel` Show Menu = true.

### ContextMenu trigger — not visual (right-click)

### Command trigger — covered by Input with search icon

---

## Usage Rules for Designers and Agents

```
.DropdownMenuItem — Action menus and context menus
├── Trigger label NEVER changes based on selection
├── Type=Action: click executes a command (Copy, Paste, Delete)
├── Type=SingleSelect: one active option shown with check (Sort By, View Mode)
├── Type=MultiSelect: multiple options toggled (Show Columns)
├── Type=Submenu: opens nested menu (Share → Email, Link, Slack)
├── Can include Destructive items (Delete, Remove)
├── Can include keyboard Shortcuts (⌘C, ⌘V)

.SelectItem — Select dropdowns
├── Trigger label UPDATES to show selected option
├── User picks ONE option from a list
├── Check indicator appears on the selected option (right side)
├── No destructive variant, no shortcuts
├── Used with Select trigger component

.ComboboxItem — Searchable/filterable dropdowns
├── Same as SelectItem but within a searchable context
├── State uses "Highlighted" (keyboard nav) not "Hover"
├── Used with Combobox trigger component
├── Can be single or multi-select (future)

.CommandItem — Command palettes
├── Visually distinct: tighter radius, different padding, muted selected bg
├── Optimized for keyboard-driven search + execute
├── Check and Shortcut are mutually exclusive (right slot)
├── Used with Command dialog/input
```

---

## Build Order

| Phase | Component | Variants | Depends on |
|-------|-----------|----------|-----------|
| 1 | Delete old .MenuItem | — | — |
| 2a | .DropdownMenuItem | 28 | Checkbox |
| 2b | .SelectItem | 8 | — |
| 2c | .ComboboxItem | 8 | — |
| 2d | .CommandItem | 6 | — |
| 3 | Reference compositions | 4-6 | All items |
| 4 | Combobox trigger | 12 | — |
| 5 | Code Connect for all | — | All above |

---

## Key Differences from v1

| v1 (old) | v2 (current) |
|----------|-------------|
| One monolithic `.MenuItem` (28 variants) | 4 purpose-specific items (50 total) |
| Figma-first architecture | Code-first architecture |
| SingleSelect check on RIGHT | SingleSelect check on LEFT (DuBois convention) |
| No usage rules | Clear rules per component |
| Hard to maintain | Each component maps 1:1 to code |
