---
name: dbui-pick-component
description: Find the right DBUI component for a use case. Triggers when you need to pick a component, are unsure which component to use, see a raw HTML element that should be a DBUI component, or encounter "which component" questions. Always invoke this skill BEFORE guessing a component name.
---

# Pick a DBUI component

## When to use

- You need a UI element and aren't sure which DBUI component to use
- You see raw `<button>`, `<input>`, `<select>`, `<dialog>`, or any native HTML interactive element — it must be replaced with a DBUI component
- You're choosing between similar components (e.g. Dialog vs AlertDialog, Select vs Combobox, Badge vs Tag)

## Procedure

1. **Read the component index.** Open `./dbui/docs/component-index.md`. This is the canonical lookup table with columns: Component, Category, Use for, Avoid for, Synonyms.

2. **Search by concept, not name.** If you're looking for "a dropdown with options", search for "dropdown", "menu", "select", "picker" — the Synonyms column handles aliasing. If you're looking for "a confirmation popup", search for "confirm", "alert", "modal".

3. **Check the Category column** to narrow results:
   - `action` → Button, SplitButton
   - `input` → Input, Textarea, Select, Combobox, Checkbox, Switch, Slider, DateRange
   - `selection` → Tabs, SegmentControl, RadioGroup, RadioTile
   - `menu` → DropdownMenu, ContextMenu, Menubar
   - `overlay` → Dialog, AlertDialog, Drawer, Popover, HoverCard, Tooltip, Sonner
   - `feedback` → Alert, Badge, Status, Spinner, Skeleton, Progress, Empty
   - `display` → Table, DataTree, Card, KeyValuePair, Avatar, Tag, Item, Chart, Kbd
   - `navigation` → Navbar, Breadcrumb, Pagination, EditorTabs
   - `layout` → Accordion, Collapsible, Resizable, ScrollArea, Separator, AspectRatio, Direction, Field, Label, InputGroup
   - `chrome` → PageHeader, ControlsBar, PlatformHeader

4. **Read the "Avoid for" column** on your top match. This prevents near-miss selections (e.g. Dialog says "Avoid for: destructive confirmations" → use AlertDialog instead).

5. **Read the component's JSDoc** at `./dbui/src/components/ui/<name>.tsx`. Look for `@guideline` and `@constraint` annotations — these are the per-component rules.

6. **Get the import path:**
   ```tsx
   import { ComponentName } from "dbui/components/ui/<kebab-name>"
   ```
   File names are kebab-case; exports are PascalCase. Some files export multiple components (e.g. `dropdown-menu.tsx` → `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, …).

## Common confusions

| You want | Use | NOT |
|---|---|---|
| Confirm a destructive action | `AlertDialog` | `Dialog` (dismissible by clicking outside) |
| Pick from >10 options | `Combobox` | `Select` (no search) |
| Pick from ≤10 fixed options | `Select` | `Combobox` (overkill) |
| Toggle between 2–4 views | `SegmentControl` | `Tabs` (for content sections) |
| Removable chip with key:value | `Tag` | `Badge` (not removable) |
| Read-only status label | `Badge` | `Tag` (has remove button) |
| Slide-out panel | `Drawer` | `Dialog` (centered overlay) |
| Hierarchical data (catalog, files) | `DataTree` or `FileTree` | Nested divs or NavbarItems |
| Three-dot menu | `DropdownMenu` | `Popover` (for rich content, not menus) |

## Translating from Figma

Figma components are deeply nested on purpose — one `Dropdown Menu` covers every row a menu can hold. A nested layer is **not** a component you need to build, and a Figma variant is often a different child subtree rather than a prop. Read `./dbui/docs/figma-mapping.md` before you conclude something is missing, or run `dbui composition <name>` for the worked recipes.

## If nothing fits

Flag the gap. Do NOT build a one-off component from raw HTML. Say: "DBUI doesn't have a component for [X] — this is a gap to flag to the design system team." Then compose from the closest available primitives as an interim.
