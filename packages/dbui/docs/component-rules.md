# DBUI Component Rules

> Cross-cutting rules that apply to multiple components: icons, buttons, menus, spacing, layout defaults.
> Component-level constraints live in `@constraints` JSDoc blocks in each component file — check there first.

**Companion docs:**

- `composition.md` — shell-level rules (page layouts, regions, scaling)
- `docs/icon-index.md` — **always search before inserting any icon**
- `docs/compositions/*.md` — behavior contracts for complex components
- `install.md` — agent install instructions (served at https://dbuidesign.vercel.app/install.md)

---

## Global Layout Rules

### Spacing Rhythm (3 tiers)


| Spacing   | Token          | Tailwind          | When to use                                                                                                                 |
| --------- | -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **16px**  | spacing-md     | `gap-4`           | **Default.** Between page header ↔ control bar, control bar ↔ table, table ↔ pagination. Between any two distinct sections. |
| **8px**   | spacing-sm     | `gap-2`           | **Within a component.** Inside title bars, control bars, table cells, card headers. Between icon and label.                 |
| **24px**  | spacing-lg     | `gap-6`           | **Dense separation.** Between info blocks in sidebars, between bounded card sections. Only when 16px isn't enough.          |
| **1-4px** | spacing-xs/xxs | `gap-0.5`/`gap-1` | **Inside controls only.** Internal padding of inputs, buttons, segment items. Never for page layout.                        |


### Page Padding


| Zone        | Padding     | Notes                          |
| ----------- | ----------- | ------------------------------ |
| Page header | `px-4 py-3` | 16px horizontal, 12px vertical |
| Page body   | `px-6 py-4` | 24px horizontal, 16px vertical |


### Common Layout Patterns

**List page:** `PageHeader → ControlsBar → Table → [gap-4] → Pagination` — PageHeader and ControlsBar each carry their own `py-2` so the natural 16px (`gap-4`) rhythm falls out without extra wrappers

**Detail page with sidebar:** Main content `[gap-6]` sidebar. Sidebar sections separated by `gap-6`. Within each sidebar section: `gap-2`.

**Form:** Field groups separated by `gap-4`. Label to input: `gap-2`. Input to helper text: `gap-1`.

### Platform Shell


| Element          | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Header height    | 48px (`h-12`)                                                |
| Navbar width     | 180px (`w-[180px]`)                                          |
| Content surface  | `bg-surface-base rounded-2 shadow-md border border-border-base` |
| Shell background | `bg-surface-subtle`                                                   |
| Content margin   | 8px bottom + right (`pb-2 pr-2`)                             |


---

## Icon Selection Rules

> Icons are tagged with semantic descriptions. **Read the description before inserting any icon.**

### The tagging system

Every icon file has a JSDoc comment in this format:

```
/** use:<category> <primary_concept> | <product_area> | <synonym1>, <synonym2>, ... */
```

### Four categories


| Category            | Meaning                                                    | When to use                                                                                  | Example                                  |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `**use:object**`    | Represents a **Databricks product concept** or data entity | In nav items, table cells, cards, tree nodes — anywhere an object is being *identified*      | `Beaker` → `use:object Experiment        |
| `**use:action`**    | Represents a **verb** the user can perform                 | In buttons, toolbar actions, menu items — anywhere something *happens* on click              | `Trash` → `use:action delete             |
| `**use:indicator`** | Represents a **status or state**                           | In status badges, table status cells, alerts — anywhere showing *what state something is in* | `Running` → `use:indicator running       |
| `**use:component`** | Used **inside a specific component's chrome**              | Built into controls — chevrons in selects, check in checkbox, close in dialogs               | `ChevronDown` → `use:component open menu |


### How to find the right icon

1. **Determine the category** — Are you identifying an object? Triggering an action? Showing status? Decorating a control?
2. **Search by concept** — The primary concept after `use:<category>` is the Databricks product name (e.g., "Experiment", "Jobs", "Unity Catalog"). Search for it.
3. **Search by synonym** — If you don't know the Databricks name, search the synonyms after the `|`. E.g., searching "flask" finds Beaker → Experiment.

### Critical object → icon mappings (most commonly confused)


| Databricks Concept | Icon Name       | Why it's not obvious  |
| ------------------ | --------------- | --------------------- |
| Experiments        | `Beaker`        | Flask/lab metaphor    |
| Jobs / Lakeflow    | `Workflows`     | DAG/pipeline metaphor |
| Compute            | `Cloud`         | Cloud resource        |
| Features           | `Lightning`     | Feature engineering   |
| Unity Catalog      | `Catalog`       | Book/index metaphor   |
| SQL Warehouse      | `Database`      | Server metaphor       |
| Genie              | `SparkleDouble` | AI sparkle            |
| Marketplace        | `Storefront`    | Shop metaphor         |
| Alerts             | `Notification`  | Bell metaphor         |
| Serving Endpoints  | `Plug`          | Connection metaphor   |


### Don'ts

- **Don't guess icon names.** Always grep `packages/dbui/src/components/icons/` for the concept.
- **Don't use `use:component` icons outside their designated control.** ChevronDown belongs in selects/menus, not as a decorative element.
- **Don't use `use:action` icons to represent objects.** Trash means "delete action", not "deleted items folder".
- **Don't use `use:indicator` icons as actions.** CheckCircleFill means "success status", not "approve button" — use Check for the action.

---

## Component Composition Rules

> These are also embedded as @constraints JSDoc in each component file.

## Button Composition


| Rule                                    | Severity | Why                                                                               |
| --------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| **Link variant: no icons**              | Error    | Links are inline text. Icons make them look like buttons.                         |
| **Link variant: no chevron**            | Error    | Links don't trigger menus. Only trailing icon allowed: external link (NewWindow). |
| **Ghost buttons: prefer icon-only**     | Warning  | Ghost with icon+label competes with Outline. Use ghost for toolbar icon buttons.  |
| **Icon-only buttons need `aria-label`** | Error    | Accessibility.                                                                    |
| **Destructive only in confirmed flows** | Warning  | Never show a red filled button without prior confirmation context.                |


## Focus

One treatment, everywhere: **`focus-visible:border-focus-ring focus-visible:shadow-focus`**
— a 1px offset and a 2px ring.

### Why the offset is not decoration

A focus indicator must clear 3:1 against the page *and* against whatever the
control is filled with (WCAG 1.4.11, AA). Those pull opposite ways, and no single
ring color satisfies both:

| | Ring vs page | Ring vs primary fill |
| --- | --- | --- |
| Light `#404040` | 10.37:1 ✅ | 1.73:1 ❌ |
| Dark `#F6F7F9` | 16.84:1 ✅ | 1.33:1 ❌ |

The 1px offset splits one impossible boundary into two easy ones — 17.93:1 and
10.37:1 light, 12.66:1 and 16.84:1 dark. Remove the offset and the indicator
disappears into every filled control in the system.

### Rules

| Rule | Severity | Why |
| --- | --- | --- |
| **Every focusable control shows an indicator** | Error | 2.4.7 Focus Visible. No component opts out. |
| **Use the pair, not one half of it** | Error | A border alone is 1px and vanishes on a filled control; a ring alone fails 1.4.11 against the fill. |
| **Never a translucent indicator** | Error | `ring-focus-ring/50` blends to `#A0A0A0` over white — 2.61:1, a fail. It looks softer and measures worse than the page. |
| **`:focus-visible`, never `:focus`** | Error | Pointer users should not see it; keyboard users always should. |
| **`outline-none` only beside its replacement** | Error | In the same class list, so the two can never drift apart. |
| **Never Tailwind's `ring-*` for focus** | Error | `ring-*` has no theme namespace in v4, so it can never resolve to a DBUI token. |

### The exceptions

Two, both because an outset ring has nowhere to go. Each says so in its own source.

A **full-bleed row** — a tree row that spans its rail edge to edge — uses
`focus-visible:ring-2 ring-focus-ring ring-inset` instead. An outset ring would be
clipped on both sides and read as two vertical bars. It stays conformant because it
is full opacity. `DataTree` is the only component entitled to this.

A **composite field** — a shell holding both a field and its own addon — thickens its
edge to 2px rather than ringing it: `border-focus-ring` plus `inset-ring-1
inset-ring-focus-ring`. The ring is for a control with one edge to draw around, and a
group's edge is shared with the addon inside it, so ringing the assembly claims the
addon has focus when only the field does. `InputGroup` is the only component entitled
to this. Three things it depends on:

- The 2px is a border plus an inset ring, never `border-2`. Widening the border eats a
  pixel of the inside, dropping the shell's inner radius below the flush addon's outer
  corner so the corner pokes through the curve. An inset ring changes no geometry.
- The inner control must cancel its own indicator with `focus-visible:shadow-none`.
  `shadow-none` alone does not — it and `focus-visible:shadow-focus` sit in different
  variant groups, so both survive `cn()`, and the control then rings itself as a
  borderless child ending at the seam.
- The addon takes the same thickened edge scoped to itself, so focus reads the same
  whichever half holds it.

Everything else keeps the ring, `Input` and `Select` included. If you are reaching for
a third exception, the answer is almost certainly the ring.

## Assemblies — grouped and attached controls

Two or more controls butted together share edges, and the question every one of
them raises is what the shared outline is allowed to say. The rule that settles
it: **the outline expresses the object, the fill expresses the affordance.**

So an outline reacts to hover only when the parts are the same kind of control.
A fill always reacts locally, to the part the pointer is actually over.

| Assembly | Parts | Outline on hover | Example |
| --- | --- | --- | --- |
| **One purpose, one kind** | segments of a single choice | does not react — selection is the loud state | `SegmentControl` |
| **One kind, different actions** | two buttons, one object | reacts across the whole assembly | `SplitButton` |
| **Shell with addons** | one field, addons inside its border | reacts — the shell *is* one control | `InputGroup` |
| **Separate boxes attached** | an input and a button, each with its own box | does **not** react across the seam | `FacetedFilter` |

The last row is the one that gets built wrong. An input's border says "type
here" and a button's says "press here"; lightening both because the pointer is
over one of them claims they are a single control and misstates what a click
will do. Each keeps its own hover.

**Focus is not hover, and it does propagate.** When a field inside an assembly
takes focus the whole assembly is one focused region — the caret is in it and
keystrokes go to it — so it carries one ring on the outside and the internal seam
goes quiet. `FacetedFilter` does this by dropping the trailing button's outer
borders and shadow on `group-focus-within`, leaving only the seam line.

### Seams

Butt edges with a negative margin, never by deleting a border.

| Rule | Severity | Why |
| --- | --- | --- |
| **Overlap with `-ml-px` / `-mr-px`** | Error | Every item keeps four borders, so a focused item can draw a complete ring and lift above its neighbors with `focus-visible:relative z-10`. |
| **Never `border-l-0` on a neighbor** | Error | Deleting the shared edge leaves a focused item able to draw only three sides of its ring. This is what retired `ButtonGroup`. |
| **Square the inner corners, round the ends** | Error | `shape-l-square` / `shape-r-square` on the inner edges, `shape-control` on the outer ones. |

## Menu Buttons


| Rule                                    | Severity | Why                                                       |
| --------------------------------------- | -------- | --------------------------------------------------------- |
| **Menu triggers: no leading icon**      | Warning  | The chevron is the affordance. A leading icon adds noise. |
| **Menu triggers: outline or secondary** | Warning  | Primary is for the main page action, not selectors.       |


## Dropdown Menu Items


| Rule                                           | Severity | Why                                                                                  |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| **Icon consistency within group**              | Error    | If one item has an icon, all items in that group must. Mixed alignment looks broken. |
| **Destructive items: always last + separator** | Error    | Dangerous actions separated from safe ones.                                          |
| **Shortcuts use symbols (⌘⇧⌥⌃)**               | Warning  | macOS convention.                                                                    |


## Alerts


| Rule                          | Severity | Why                                                              |
| ----------------------------- | -------- | ---------------------------------------------------------------- |
| **Always include AlertIcon**  | Error    | Icon provides severity distinction beyond color (accessibility). |
| **Always include AlertTitle** | Error    | Title is the primary communication.                              |


## Dialogs


| Rule                                         | Severity | Why                                                     |
| -------------------------------------------- | -------- | ------------------------------------------------------- |
| **Primary action rightmost**                 | Error    | Cancel left, confirm right — platform convention.       |
| **Non-alert dialogs must have close button** | Error    | Users need an escape hatch. Only AlertDialogs can omit. |


## Inputs


| Rule                            | Severity | Why                                                           |
| ------------------------------- | -------- | ------------------------------------------------------------- |
| **Decorative icons: left only** | Warning  | Right side reserved for status indicators and action buttons. |


## Navigation


| Rule                             | Severity | Why                                                  |
| -------------------------------- | -------- | ---------------------------------------------------- |
| **Navbar items must have icons** | Error    | Sidebar is icon-first. Label-only items look broken. |


## Tables


| Rule                                       | Severity | Why                                                |
| ------------------------------------------ | -------- | -------------------------------------------------- |
| **Show sort indicator even when unsorted** | Warning  | Users need to discover which columns are sortable. |


## Universal


| Rule                        | Severity | Why                                                                       |
| --------------------------- | -------- | ------------------------------------------------------------------------- |
| **No hardcoded hex colors** | Error    | Breaks dark mode and theming. Use semantic tokens.                        |
| **No inline icon sizing**   | Error    | Icons inherit size from parent. Use `size-4` class or `[&_svg]` selector. |


