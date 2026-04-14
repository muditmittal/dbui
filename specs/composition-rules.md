# DBUI Design Rules

> Layout defaults + component composition constraints.
> These rules encode Databricks DuBois conventions that differentiate DBUI from generic shadcn.
> Global rules live here. Component-level rules live in @constraints JSDoc blocks in each component file.

---

## Global Layout Rules

### Spacing Rhythm (3 tiers)

| Spacing | Token | Tailwind | When to use |
|---------|-------|----------|-------------|
| **16px** | spacing-md | `gap-4` | **Default.** Between page header ↔ control bar, control bar ↔ table, table ↔ pagination. Between any two distinct sections. |
| **8px** | spacing-sm | `gap-2` | **Within a component.** Inside title bars, control bars, table cells, card headers. Between icon and label. |
| **24px** | spacing-lg | `gap-6` | **Dense separation.** Between info blocks in sidebars, between bounded card sections. Only when 16px isn't enough. |
| **1-4px** | spacing-xs/xxs | `gap-0.5`/`gap-1` | **Inside controls only.** Internal padding of inputs, buttons, segment items. Never for page layout. |

### Page Padding

| Zone | Padding | Notes |
|------|---------|-------|
| Page header | `px-4 py-3` | 16px horizontal, 12px vertical |
| Page body | `px-6 py-4` | 24px horizontal, 16px vertical |

### Common Layout Patterns

**List page:** `PageHeader → [gap-4] → ControlBar → [gap-4] → Table → [gap-4] → Pagination`

**Detail page with sidebar:** Main content `[gap-6]` sidebar. Sidebar sections separated by `gap-6`. Within each sidebar section: `gap-2`.

**Form:** Field groups separated by `gap-4`. Label to input: `gap-1.5`. Input to helper text: `gap-1`.

### Platform Shell

| Element | Value |
|---------|-------|
| Header height | 48px (`h-12`) |
| Navbar width | 180px (`w-[180px]`) |
| Content surface | `bg-background rounded-[8px] shadow-md border border-border` |
| Shell background | `bg-muted` |
| Content margin | 8px bottom + right (`pb-2 pr-2`) |

---

## Icon Selection Rules

> 450 icons are tagged with semantic descriptions. **Read the description before inserting any icon.**

### The tagging system

Every icon file has a JSDoc comment in this format:
```
/** use:<category> <primary_concept> | <product_area> | <synonym1>, <synonym2>, ... */
```

### Four categories

| Category | Meaning | When to use | Example |
|----------|---------|-------------|---------|
| **`use:object`** | Represents a **Databricks product concept** or data entity | In nav items, table cells, cards, tree nodes — anywhere an object is being *identified* | `Beaker` → `use:object Experiment \| AI \| flask, lab, test, training` |
| **`use:action`** | Represents a **verb** the user can perform | In buttons, toolbar actions, menu items — anywhere something *happens* on click | `Trash` → `use:action delete \| remove, discard, destroy` |
| **`use:indicator`** | Represents a **status or state** | In status badges, table status cells, alerts — anywhere showing *what state something is in* | `Running` → `use:indicator running \| in progress, active, spinning` |
| **`use:component`** | Used **inside a specific component's chrome** | Built into controls — chevrons in selects, check in checkbox, close in dialogs | `ChevronDown` → `use:component open menu \| expand, dropdown` |

### How to find the right icon

1. **Determine the category** — Are you identifying an object? Triggering an action? Showing status? Decorating a control?
2. **Search by concept** — The primary concept after `use:<category>` is the Databricks product name (e.g., "Experiment", "Jobs", "Unity Catalog"). Search for it.
3. **Search by synonym** — If you don't know the Databricks name, search the synonyms after the `|`. E.g., searching "flask" finds Beaker → Experiment.

### Critical object → icon mappings (most commonly confused)

| Databricks Concept | Icon Name | Why it's not obvious |
|---|---|---|
| Experiments | `Beaker` | Flask/lab metaphor |
| Jobs / Lakeflow | `Workflows` | DAG/pipeline metaphor |
| Compute | `Cloud` | Cloud resource |
| Features | `Lightning` | Feature engineering |
| Unity Catalog | `Catalog` | Book/index metaphor |
| SQL Warehouse | `Database` | Server metaphor |
| Genie | `SparkleDouble` | AI sparkle |
| Marketplace | `Storefront` | Shop metaphor |
| Alerts | `Notification` | Bell metaphor |
| Serving Endpoints | `Plug` | Connection metaphor |

### Don'ts

- **Don't guess icon names.** Always grep `packages/dbui/src/components/icons/` for the concept.
- **Don't use `use:component` icons outside their designated control.** ChevronDown belongs in selects/menus, not as a decorative element.
- **Don't use `use:action` icons to represent objects.** Trash means "delete action", not "deleted items folder".
- **Don't use `use:indicator` icons as actions.** CheckCircleFill means "success status", not "approve button" — use Check for the action.

---

## Component Composition Rules

> These are also embedded as @constraints JSDoc in each component file.

## Button Composition

| Rule | Severity | Why |
|------|----------|-----|
| **Link variant: no icons** | Error | Links are inline text. Icons make them look like buttons. |
| **Link variant: no chevron** | Error | Links don't trigger menus. Only trailing icon allowed: external link (NewWindow). |
| **Ghost buttons: prefer icon-only** | Warning | Ghost with icon+label competes with Outline. Use ghost for toolbar icon buttons. |
| **Icon-only buttons need `aria-label`** | Error | Accessibility. |
| **Destructive only in confirmed flows** | Warning | Never show a red filled button without prior confirmation context. |

## Menu Buttons

| Rule | Severity | Why |
|------|----------|-----|
| **Menu triggers: no leading icon** | Warning | The chevron is the affordance. A leading icon adds noise. |
| **Menu triggers: outline or secondary** | Warning | Primary is for the main page action, not selectors. |

## Dropdown Menu Items

| Rule | Severity | Why |
|------|----------|-----|
| **Icon consistency within group** | Error | If one item has an icon, all items in that group must. Mixed alignment looks broken. |
| **Destructive items: always last + separator** | Error | Dangerous actions separated from safe ones. |
| **Shortcuts use symbols (⌘⇧⌥⌃)** | Warning | macOS convention. |

## Alerts

| Rule | Severity | Why |
|------|----------|-----|
| **Always include AlertIcon** | Error | Icon provides severity distinction beyond color (accessibility). |
| **Always include AlertTitle** | Error | Title is the primary communication. |

## Dialogs

| Rule | Severity | Why |
|------|----------|-----|
| **Primary action rightmost** | Error | Cancel left, confirm right — platform convention. |
| **Non-alert dialogs must have close button** | Error | Users need an escape hatch. Only AlertDialogs can omit. |

## Inputs

| Rule | Severity | Why |
|------|----------|-----|
| **Decorative icons: left only** | Warning | Right side reserved for status indicators and action buttons. |

## Navigation

| Rule | Severity | Why |
|------|----------|-----|
| **Navbar items must have icons** | Error | Sidebar is icon-first. Label-only items look broken. |

## Tables

| Rule | Severity | Why |
|------|----------|-----|
| **Show sort indicator even when unsorted** | Warning | Users need to discover which columns are sortable. |

## Universal

| Rule | Severity | Why |
|------|----------|-----|
| **No hardcoded hex colors** | Error | Breaks dark mode and theming. Use semantic tokens. |
| **No inline icon sizing** | Error | Icons inherit size from parent. Use `size-4` class or `[&_svg]` selector. |
