# Component Index

> **RULE: Always search this index before reaching for a component.** Never guess, never invent. If nothing here fits, flag the gap — don't roll your own.

This file is a **discovery aid**. It tells you which component to pick. Per-component rules (`@guideline`, `@constraint`) live in the source file's JSDoc — read it before using the component you picked.

## Lookup

1. **Pick a category** from the table below — `action` / `controls` / `content` / `overlays` / `feedback` / `compositions`. The first four are the groups the Figma library uses, in its order, so a category means the same thing in both places. This narrows the search.
2. **Jump to that category's section** in the index and scan alphabetically by name, or grep within the section by **synonym** (e.g. "modal" → Dialog, "popup" → Popover, "kebab" → DropdownMenu).
3. Read the **Use for** column to confirm fit and the **Avoid for** column to rule out near-matches.
4. Open the source file at `dbui/components/ui/<name>.tsx` and read its JSDoc for full guidelines, constraints, and the Figma node link.
5. **Translating from a Figma layer name?** Use the **Figma** column at the right of each row (forward lookup), or read `docs/figma-mapping.md` for the canonical translation table including inner components, slots, and edge cases.

## Import path

```tsx
import { Button } from "dbui/components/ui/button"
import { Combobox } from "dbui/components/ui/combobox"
// ...
```

File names are kebab-case; component exports are PascalCase. Some files export multiple components (e.g. `dropdown-menu.tsx` exports `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, …). Read the source for the full export list.

## Categories


| Category       | What it does                                                                | Examples                                    |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| `action`       | Does something the moment it is clicked                                     | Button, SplitButton, Toggle, SegmentControl |
| `controls`     | Collects or changes a value the screen reads later                          | Checkbox, Combobox, DateRange, Input        |
| `content`      | Shows what the screen already has, and arranges it                          | Avatar, Card, Chart, DataTree               |
| `feedback`     | Reports what the system is doing or what just happened                      | Sonner, Alert, Badge, Empty                 |
| `overlays`     | Puts content above the page and takes focus with it                         | AlertDialog, Dialog, Drawer, HoverCard      |
| `compositions` | Frames the page, so a screen takes it from a shell rather than building one | ControlsBar, PageHeader, PlatformHeader     |


---

## Full index — grouped by category


### `action` — 4 items


| Component        | Use for                                                                          | Avoid for                                                                          | Synonyms                                           | Figma layer                                  |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| `Button`         | Any click action — primary CTAs, toolbar actions, icon buttons, menu triggers    | State that persists across clicks → use `Toggle`; on/off settings → `Switch`       | CTA, action button, click button                   | `Button` (label) · `Icon Button` (icon-only) |
| `SplitButton`    | A primary action with related alternatives in a dropdown (3–5 alternatives)      | Unrelated actions → split into separate `Button`s; >5 actions → use `DropdownMenu` | combo button, primary + dropdown, action with menu | `Split Button`                               |
| `Toggle`         | Buttons that need to remember pressed state (icon toolbar toggles, filter pills) | Stateless actions → use `Button`; on/off settings → `Switch`                       | toggle button, sticky button                       | `Toggle Button`                              |
| `SegmentControl` | Single-value selection in toolbars (2–5 single-word items)                       | Primary view switching → use `Tabs`; >5 items → `Select`                           | segmented buttons, pill toggle, segment toggle     | `Segment Control`                            |


### `controls` — 14 items


| Component      | Use for                                                                                  | Avoid for                                                                                     | Synonyms                                           | Figma layer                               |
| -------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| `Checkbox`     | Multi-select within a group, indeterminate parent states, form fields with submit        | On/off settings that take effect immediately → use `Switch`                                   | checkmark, multiselect                             | `Checkbox`                                |
| `Combobox`     | Pick one or many from 10+ options with search                                            | Fewer than 10 fixed options → use `Select`                                                    | typeahead, autocomplete, picker, searchable select | `Combobox` · `Typeahead Combobox` (multi) |
| `Input`        | Single-line text fields, numbers, search, email — md size by default                     | Multi-line → use `Textarea`; >10 options → `Combobox`; search inside a control → `InputGroup` | text field, text input, textbox                    | `Input`                                   |
| `NativeSelect` | Native HTML `<select>` for accessibility-first or environments without JS                | Anything else — prefer `Select` for visual consistency                                        | html select, native dropdown                       | *code-only*                               |
| `Select`       | Pick one from ≤10 fixed options                                                          | More than 10 options or needs search → use `Combobox`                                         | dropdown, picker, single-select                    | `Select`                                  |
| `Slider`       | Continuous range selection where the rough value matters more than the exact one         | Exact number entry → pair with `Input`; discrete steps → use `SegmentControl` or `RadioGroup` | range, drag bar, range slider                      | `Slider`                                  |
| `Switch`       | Immediate on/off toggles that take effect without a save action                          | Inside forms requiring submit → use `Checkbox`; multi-select → `Checkbox`                     | on/off, slider toggle, switch toggle               | `Switch`                                  |
| `Textarea`     | Multi-line text input that auto-grows (`field-sizing: content`)                          | Single-line input → use `Input`; rich text → flag the gap                                     | multiline input, big text, textbox multiline       | `Textarea`                                |
| `RadioGroup`   | One-of-many choice for 2–7 options with text labels                                      | On/off → use `Switch`; visual tile choices → use `RadioTile`                                  | radios, single-select, exclusive choice            | `Radio Group`                             |
| `RadioTile`    | Visual one-of-many with icon + title + description (2–5 options)                         | Plain text labels → use `RadioGroup`; >5 options → use `Select`                               | radio cards, big radio, choice tiles               | `Radio Tile`                              |
| `ContextMenu`  | Right-click actions on a target                                                          | Left-click action menus → use `DropdownMenu`                                                  | right-click menu, secondary menu                   | *code-only*                               |
| `DropdownMenu` | Click-triggered action menus, kebab/overflow menus, item-level menus                     | Hover-only menus; lists with search → use `Combobox`                                          | action menu, kebab, overflow, ⋯ menu, more menu    | `Dropdown Menu`                           |
| `Menubar`      | App-level menu bar (File / Edit / View / …)                                              | Single trigger menus → use `DropdownMenu`                                                     | app menu, menu bar                                 | *code-only*                               |
| `InputGroup`   | Attach icons, buttons, or text addons to an `Input` (e.g. search + clear, prefix/suffix) | Standalone inputs without addons → use `Input` directly                                       | input addon, addon group, prefix/suffix input      | `Input Group`                             |

### `content` — 23 items


| Component      | Use for                                                                              | Avoid for                                                                                               | Synonyms                                     | Figma layer      |
| -------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------- |
| `Avatar`       | User identity (image, fallback initials, default icon)                               | Decorative purposes — Avatar implies a real user entity                                                 | profile pic, user image, initials            | `Avatar`         |
| `Card`         | Bounded content surfaces with elevation (rounded-4, shadow)                          | Full-width / unbounded content; nesting cards inside cards                                              | container, panel, surface, tile              | `Card`           |
| `Chart`        | Data visualization (recharts wrapper)                                                | Static decoration — Chart implies real data                                                             | graph, plot, viz, dataviz                    | *code-only*      |
| `DataTree`     | Hierarchical data browsing (catalogs, schemas, tables) — every node has a typed icon | User-mutable file hierarchies → use file-tree variants of DataTree; flat lists → use `Table`            | tree, hierarchy, catalog tree, nav tree      | `Tree`           |
| `Item`         | Generic list-item slot used inside menus, navbars, and command lists                 | Custom one-off list rows — prefer purpose-specific components first                                     | list item, list row                          | *code-only*      |
| `Kbd`          | Inline keyboard shortcut markup (`⌘K`, `Ctrl+P`)                                     | Modifier indicators in body copy without keys → just text                                               | keyboard, shortcut, key, hotkey              | *code-only*      |
| `KeyValuePair` | Metadata in detail panels and sidebars, key beside value by default                  | Editable values → use `Field` + `Input`                                                                 | metadata, definition list, dl, properties    | `Key Value Pair` |
| `Table`        | Structured data with sortable columns, row hover, optional row actions               | Layout grids → use Tailwind grid/flex; hierarchical data → `DataTree`                                   | grid, datagrid, datatable                    | `Table`          |
| `Tag`          | Removable filter chips, key:value labels in faceted filters                          | Read-only status → use `Badge`; persistent labels with no remove → `Badge`                              | chip, pill, removable label, filter chip     | `Tag`            |
| `Breadcrumb`   | Hierarchical path back to root (last item is current page)                           | Non-hierarchical navigation → use `Tabs` or `Navbar`                                                    | trail, path, hierarchy nav                   | `Breadcrumb`     |
| `EditorTabs`   | Code-editor style closeable tabs with file-type icons                                | General view switching → use `Tabs`                                                                     | code tabs, file tabs, editor tab bar         | `Editor Tabs`    |
| `Navbar`       | Top-level product navigation (workspace switcher, global actions)                    | Page-level tabs → use `Tabs`; in-page sections → use `Accordion`                                        | top nav, navigation bar, header nav          | `PlatformNav`    |
| `Pagination`   | Paged tables with previous/next, ellipsis for large counts                           | Fewer than 2 pages; infinite scroll                                                                     | pager, page nav                              | `Pagination`     |
| `Tabs`         | Switch between sibling content panels of equal importance (2–7 tabs)                 | Unrelated pages → use `Navbar`; closeable per-file → `EditorTabs`; toolbar selection → `SegmentControl` | tab bar, view switcher                       | `Tabs`           |
| `Accordion`    | Settings panels, filter groups, FAQ-style content                                    | Primary navigation → use `Tabs`. Don't nest accordions.                                                 | collapsible sections, expandable, disclosure | `Accordion`      |
| `AspectRatio`  | Lock image/video proportions inside cards and grids                                  | Text-only containers — apply only to media wrappers                                                     | ratio box, media frame                       | `Aspect Ratio`   |
| `Collapsible`  | Single show/hide toggle (one expandable region)                                      | Multiple sibling regions → use `Accordion`                                                              | expandable, show more, disclosure            | *code-only*      |
| `Direction`    | RTL/LTR direction wrapping                                                           | (utility — wrap as needed)                                                                              | rtl, ltr, dir                                | *code-only*      |
| `Field`        | Form field wrapper that pairs Label + control + helper/error text                    | Free-floating inputs without labels — Inputs should always have a Label                                 | form field, form row                         | `Form Input`     |
| `Label`        | The name of a form field                                                             | Sub-labels or helper text — use a span with `text-text-subtle` instead                                  | form label, field label                      | `Label`          |
| `Resizable`    | Resizable split panels (e.g. tree rail + detail)                                     | Fixed-width panels — only use when the user should resize                                               | splitter, gutter, resizable panels           | *code-only*      |
| `ScrollArea`   | Overflowing content that needs custom-styled scrollbars                              | Page-level scroll — let the browser handle it                                                           | scrollbox, scroll container                  | *code-only*      |
| `Separator`    | Visual divider between content groups                                                | Decorative use — only when grouping is real                                                             | divider, hr, line, rule                      | `Separator`      |


### `feedback` — 8 items


| Component  | Use for                                                                             | Avoid for                                                                       | Synonyms                                    | Figma layer |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- | ----------- |
| `Sonner`   | Transient feedback toasts after an action (save, copy, delete)                      | Critical errors that need user action → use `Alert`; persistent state → `Badge` | toast, toaster, snackbar, notification      | `Toast`     |
| `Alert`    | Persistent inline messages tied to page content (info / warning / danger / success) | Transient feedback → use `Sonner` (Toast)                                       | banner, info bar, message bar, notice       | `Alert`     |
| `Badge`    | Short status labels and counts (1–2 words)                                          | Interactive triggers → use `Button`; status with icon → `Status`                | label, count, status pill, chip (read-only) | `Badge`     |
| `Empty`    | Zero-data states with title, description, primary action                            | While loading → use `Skeleton`; recoverable error → use `Alert`                 | empty state, blank slate, zero state        | `Empty`     |
| `Progress` | Determinate progress with a known endpoint (percentage or step count)               | Indeterminate progress → use `Spinner`                                          | progress bar, loading bar                   | `Progress`  |
| `Skeleton` | Initial-load placeholders that match the shape of the incoming content              | Loads longer than ~3 s → switch to `Spinner`; data-empty states → `Empty`       | shimmer, placeholder, loading shape         | `Skeleton`  |
| `Spinner`  | Indeterminate loading >1 s                                                          | Initial page loads → use `Skeleton` first                                       | loader, throbber, busy indicator            | `Spinner`   |
| `Status`   | Status with icon + label (running, error, success, online, …)                       | Plain counts/labels → use `Badge`; interactive → use `Button`                   | status dot, state indicator, status pill    | `Status`    |


### `overlays` — 6 items


| Component     | Use for                                                                  | Avoid for                                                                                    | Synonyms                                         | Figma layer    |
| ------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------- |
| `AlertDialog` | Confirming destructive or irreversible actions                           | Non-destructive confirmations → use `Dialog`                                                 | confirm modal, are you sure, destructive confirm | `Alert Dialog` |
| `Dialog`      | Focused tasks and forms in an overlay (max one open at a time)           | Destructive confirmations → use `AlertDialog`; secondary detail panels → use `Drawer`        | modal, popup, overlay, lightbox                  | `Dialog`       |
| `Drawer`      | Detail panels, settings, secondary content sliding in from the right     | Primary workflows → use `Dialog`; in-flow content → use `Card`                               | slide-out, side panel, sheet                     | `Drawer`       |
| `HoverCard`   | Rich preview content on hover (user profiles, link previews)             | Anything interactive — HoverCard is read-only → use `Popover`                                | rich tooltip, hover preview, profile card        | `Hover Card`   |
| `Popover`     | Date pickers, color pickers, mini-forms, rich tooltips with content      | Plain text → use `Tooltip`; complex content → use `Dialog`                                   | floating panel, picker, popout                   | `Popover`      |
| `Tooltip`     | One-line hover hints, especially on icon-only buttons (`size="icon-md"`) | Interactive content → use `Popover`; rich preview → `HoverCard`; >1 line of text → `Popover` | hint, hover hint, title attribute                | `Tooltip`      |


### `compositions` — 4 items


| Component        | Use for                                                                           | Avoid for                                                                                           | Synonyms                                       | Figma layer       |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------- |
| `ControlsBar`    | Filter / search / sort row below `PageHeader` (Shell A list pages, etc.)          | Inline filters inside a card or table — render those locally; one `ControlsBar` per surface         | filter bar, control bar, toolbar, search bar   | `Controls Bar`    |
| `DateRange`      | Pair of start + end date fields (run history, audit windows, time-window filters) | Single date → flag the gap (no `DatePicker` primitive yet)                                          | date picker pair, time window, start/end dates | `Date Range`      |
| `PageHeader`     | Top of every content surface — title row + optional Tabs row                      | Filter/search controls — render `<ControlsBar>` as a sibling below; only one PageHeader per surface | title bar, page title row                      | `Page Header`     |
| `PlatformHeader` | The Databricks top bar (sidebar toggle, search, workspace, Genie, apps, profile)  | Custom top bars — every product page uses PlatformHeader via `Base` shell                           | top bar, app header, platform bar              | `Platform Header` |

### Removed


Both were renamed shims that carried the older border treatment — `ButtonGroup`
squared a neighbor's border away with `border-l-0`, which leaves a focused item
able to draw only three sides of its ring, and `ToggleGroup` used a padded inset
track rather than the flush seam. Nothing imported either one.


| Component     | Use instead      |
| ------------- | ---------------- |
| `ButtonGroup` | `SplitButton`    |
| `ToggleGroup` | `SegmentControl` |


---

## How this index relates to JSDoc

This file gives you **discovery** — pick the right component fast.
The component source files give you **rules** — how to use the component you picked.

```
component-index.md          dbui/components/ui/<name>.tsx
   (you are here)                  (full guidelines)
        │                                 │
        └── pick a component  →  read its @guideline / @constraint JSDoc  →  use it
```

Every row in this index has a corresponding JSDoc block at the top of its source file in this format:

```ts
/**
 * @standard <Display Name>
 * @guideline <positive use rule>
 * @guideline <positive use rule>
 * @constraint <negative use rule — what NOT to do>
 * @constraint <negative use rule>
 * @figma <node URL>
 */
```

The index intentionally **does not** repeat `@guideline` or `@constraint` text. If a rule is added or changed, update it in the JSDoc only — this index doesn't need to track wording.

If you ever feel an "Avoid for" entry contradicts a JSDoc constraint, the **JSDoc wins**. File a fix here.

## What does NOT belong in this index

- Per-component prop APIs → JSDoc + TypeScript types
- Variant lists → component source + Code Connect (`figma/*.figma.tsx`)
- Composition rules between many components → `composition.md`
- Cross-cutting layout rules → `docs/component-rules.md`
- Icon picking → `docs/icon-index.md`
- Content/voice/tone → `docs/brandvoice.md`
- Setup / install / framework rules → `CLAUDE.md`
- Figma ↔ React naming, inner-component slot encodings → `docs/figma-mapping.md` (this file's `Figma` column links there)

