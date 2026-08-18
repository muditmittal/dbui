# Component Index

> **RULE: Always search this index before reaching for a component.** Never guess, never invent. If nothing here fits, flag the gap — don't roll your own.

This file is a **discovery aid**. It tells you which component to pick. Per-component rules (`@guideline`, `@constraint`) live in the source file's JSDoc — read it before using the component you picked.

## Lookup

1. **Pick a category** from the table below — `action` / `controls` / `content` / `overlays` / `feedback` / `compositions` / `viz`. The first four are the groups the Figma library uses, in its order, so a category means the same thing in both places. This narrows the search.
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

The `viz` category is a sibling package, so it takes its own path:

```tsx
import { BarChart } from "dbui-viz/components/bar-chart"
import { Leaderboard } from "dbui-viz/components/leaderboard"
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
| `viz`          | Encodes a number as length, angle, area or colour                           | BarChart, DonutChart, Leaderboard, Treemap  |
| `chat`         | A turn in an agent conversation, or the trace behind one                    | Message, Reasoning, Task, Details           |


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
| `RadioTile`    | Visual one-of-many with icon + title + description (2–5 options)                         | Plain text labels → use `RadioGroup`; >5 options → use `Select`                               | radio cards, big radio, choice tiles               | `Radio tile`                              |
| `ContextMenu`  | Right-click actions on a target                                                          | Left-click action menus → use `DropdownMenu`                                                  | right-click menu, secondary menu                   | *code-only*                               |
| `DropdownMenu` | Click-triggered action menus, kebab/overflow menus, item-level menus                     | Hover-only menus; lists with search → use `Combobox`                                          | action menu, kebab, overflow, ⋯ menu, more menu    | `Dropdown Menu`                           |
| `Menubar`      | App-level menu bar (File / Edit / View / …)                                              | Single trigger menus → use `DropdownMenu`                                                     | app menu, menu bar                                 | *code-only*                               |
| `InputGroup`   | Attach icons, buttons, or text addons to an `Input` (e.g. search + clear, prefix/suffix) | Standalone inputs without addons → use `Input` directly                                       | input addon, addon group, prefix/suffix input      | `Input Group`                             |

### `content` — 30 items


| Component      | Use for                                                                              | Avoid for                                                                                               | Synonyms                                     | Figma layer      |
| -------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------- |
| `AiGradientIcon` | Marking something as Genie or AI — paints a DBUI icon with the brand gradient       | Chrome around the AI (composers, toolbars, panel edges); status or state; more than one per surface     | genie icon, ai icon, gradient icon, sparkle  | *code-only*      |
| `Avatar`       | User identity (image, fallback initials, default icon)                               | Decorative purposes — Avatar implies a real user entity                                                 | profile pic, user image, initials            | `Avatar`         |
| `Card`         | Bounded content surfaces with elevation (rounded-4, shadow)                          | Full-width / unbounded content; nesting cards inside cards                                              | container, panel, surface, tile              | `Card`           |
| `Chart`        | Data visualization (recharts wrapper)                                                | Static decoration — Chart implies real data                                                             | graph, plot, viz, dataviz                    | *code-only*      |
| `DataTree`     | Hierarchical data browsing (catalogs, schemas, tables) — every node has a typed icon | User-mutable file hierarchies → use `FileTree`; flat lists → use `Table`                                | tree, hierarchy, catalog tree, nav tree      | `Data Tree`      |
| `FileTree`     | Workspace file hierarchies — folders, notebooks, queries, pipeline files              | Data entities (catalogs, schemas, tables) → use `DataTree`; flat lists → use `Table`                    | file tree, workspace tree, folder tree, repo tree | `File Tree` |
| `Item`         | Generic list-item slot used inside menus, navbars, and command lists                 | Custom one-off list rows — prefer purpose-specific components first                                     | list item, list row                          | *code-only*      |
| `Kbd`          | Inline keyboard shortcut markup (`⌘K`, `Ctrl+P`)                                     | Modifier indicators in body copy without keys → just text                                               | keyboard, shortcut, key, hotkey              | *code-only*      |
| `KeyValuePair` | Metadata in detail panels and sidebars, key beside value by default                  | Editable values → use `Field` + `Input`                                                                 | metadata, definition list, dl, properties    | `Key Value Pair` |
| `MetricCard`   | One metric, its shape and one way into the surface behind it — the overview card unit | A total with no chart → use `StatCard`; a card with nowhere to go — the handoff link is required         | overview card, widget, kpi card, metric tile | `Viz/Card/Bar` · `Viz/Card/Line` · `Viz/Card/Leaderboard` · `Viz/Card/Donut` · `Viz/Card/Treemap` · `Viz/Card/SegmentedBar` |
| `StatCard`     | One headline total in a row of peers — the KPI band at the top of an overview         | Anything with a chart or a viz slot → use `MetricCard`; a single total on its own — it reads as a peer    | kpi, stat, metric tile, headline number      | `Viz/Card/Metric` |
| `Table`        | Structured data with sortable columns, row hover, optional row actions               | Layout grids → use Tailwind grid/flex; hierarchical data → `DataTree`                                   | grid, datagrid, datatable                    | `Table`          |
| `Tag`          | Removable filter chips, key:value labels in faceted filters                          | Read-only status → use `Badge`; persistent labels with no remove → `Badge`                              | chip, pill, removable label, filter chip     | `Tag`            |
| `Breadcrumb`   | Hierarchical path back to root (last item is current page)                           | Non-hierarchical navigation → use `Tabs` or `Navbar`                                                    | trail, path, hierarchy nav                   | `Breadcrumb`     |
| `CodeBlock`     | A block of code on its own — a query the agent wrote, a snippet in a doc, a preview tab                | Highlighting — there is none by design; prose with inline code → `Response`                              | code, snippet, pre, syntax, code view        | `Code Block`      |
| `SchemaBrowser` | Reading a table's shape — columns, their types, which are keys                                        | The table's rows → use `Table`; a catalog hierarchy → use `DataTree`                                     | schema, columns, table shape, DDL, fields    | `Schema Browser`      |
| `Terminal`      | Command output a reader watches arrive — a build, a test run, a pipeline log                           | Prose the agent wrote → `Response`; a static file → `CodeBlock`                                          | log, console, output, stdout, shell          | `Terminal`      |
| `EditorTabs`   | Code-editor style closeable tabs with file-type icons                                | General view switching → use `Tabs`                                                                     | code tabs, file tabs, editor tab bar         | `Editor Tabs`    |
| `Navbar`       | Top-level product navigation (workspace switcher, global actions)                    | Page-level tabs → use `Tabs`; in-page sections → use `Accordion`                                        | top nav, navigation bar, header nav          | `Platform Nav`   |
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
| `Progress` | Determinate progress with a known endpoint (percentage or step count)               | Indeterminate progress → use `Spinner`                                          | progress bar, loading bar                   | `Progress Bar`  |
| `Skeleton` | Initial-load placeholders that match the shape of the incoming content              | Loads longer than ~3 s → switch to `Spinner`; data-empty states → `Empty`       | shimmer, placeholder, loading shape         | `Skeleton`  |
| `Spinner`  | Indeterminate loading >1 s                                                          | Initial page loads → use `Skeleton` first                                       | loader, throbber, busy indicator            | `Spinner`   |
| `Status`   | Status with icon + label (running, error, success, online, …)                       | Plain counts/labels → use `Badge`; interactive → use `Button`                   | status dot, state indicator, status pill    | `Status`    |


### `overlays` — 6 items


| Component     | Use for                                                                  | Avoid for                                                                                    | Synonyms                                         | Figma layer    |
| ------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------- |
| `AlertDialog` | Confirming destructive or irreversible actions                           | Non-destructive confirmations → use `Dialog`                                                 | confirm modal, are you sure, destructive confirm | `AlertDialog` |
| `Dialog`      | Focused tasks and forms in an overlay (max one open at a time)           | Destructive confirmations → use `AlertDialog`; secondary detail panels → use `Drawer`        | modal, popup, overlay, lightbox                  | `Dialog`       |
| `Drawer`      | Detail panels, settings, secondary content sliding in from the right     | Primary workflows → use `Dialog`; in-flow content → use `Card`                               | slide-out, side panel, sheet                     | `Drawer`       |
| `HoverCard`   | Rich preview content on hover (user profiles, link previews)             | Anything interactive — HoverCard is read-only → use `Popover`                                | rich tooltip, hover preview, profile card        | `Hover Card`   |
| `Popover`     | Date pickers, color pickers, mini-forms, rich tooltips with content      | Plain text → use `Tooltip`; complex content → use `Dialog`                                   | floating panel, picker, popout                   | `Popover`      |
| `Tooltip`     | One-line hover hints, especially on icon-only buttons (`size="icon-md"`) | Interactive content → use `Popover`; rich preview → `HoverCard`; >1 line of text → `Popover` | hint, hover hint, title attribute                | `Tooltip`      |


### `compositions` — 5 items


A composition assembles components to solve an interface problem, rather than being a part. It is
still one thing you place once, which is what separates it from a shell: `PageHeader` is a
composition, a page is a shell.


| Component        | Use for                                                                           | Avoid for                                                                                           | Synonyms                                       | Figma layer       |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------- |
| `ControlsBar`    | Filter / search / sort row below `PageHeader` (Shell A list pages, etc.)          | Inline filters inside a card or table — render those locally; one `ControlsBar` per surface         | filter bar, control bar, toolbar, search bar   | `Controls Bar`    |
| `DateRange`      | Pair of start + end date fields (run history, audit windows, time-window filters) | Single date → flag the gap (no `DatePicker` primitive yet)                                          | date picker pair, time window, start/end dates | `Date Range`      |
| `Dropzone`       | A file upload target that accepts a drop and a click — ingestion, volume uploads  | A busy or uploading state → replace it with progress; a single hidden input with no target           | file upload, drop target, drag and drop, upload area | `Dropzone`  |
| `PageHeader`     | Top of every content surface — title row + optional Tabs row                      | Filter/search controls — render `<ControlsBar>` as a sibling below; only one PageHeader per surface | title bar, page title row                      | `Page Header`     |
| `PlatformHeader` | The Databricks top bar (sidebar toggle, search, workspace, Genie, apps, profile)  | Custom top bars — every product page uses PlatformHeader via `Base` shell                           | top bar, app header, platform bar              | `Platform Header` |


### `viz` — 8 items


Import from `dbui-viz`, not `dbui`. The six charts render through Vega-Lite; `Leaderboard` and `Legend` are DOM and pull no chart dependency.

`Legend` is an **inner part**, not a chart. Figma files it as `Viz/Inner/Legend` and it is only ever
placed beside something else, so it has no Storybook entry of its own — it is shown inside the Donut
and Treemap stories, where the pairing happens. It is listed here so it stays discoverable and
searchable, not because it is a peer of the six.

Charts come in two sizes in Figma and one in code — width is measured, height is a prop, so a
large chart is a bigger number and not a different component. `Viz/Medium/*` is the 376×168 card
tile; `Viz/Large/*` is the 1160×208 full-width chart that sits between a control bar and a table.


| Component      | Use for                                                                              | Avoid for                                                                                          | Synonyms                                        | Figma layer         |
| -------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------- |
| `BarChart`     | Counts or amounts across categories or time buckets; stacks when a datum has `series` | Five named rows a reader compares by name → use `Leaderboard`                                       | column chart, histogram, bars, stacked bar      | `Viz/Medium/Bar` · `Viz/Medium/Stacked Bar` · `Viz/Large/Bar` · `Viz/Large/Stacked Bar` |
| `DonutChart`   | A small part-to-whole split where the total matters (`centerValue`)                   | A breakdown inline in a row or cell → `SegmentedBar`; a full pie — the hole holds the total         | pie chart, ring chart, donut                    | `Viz/Medium/Donut`  |
| `Heatmap`      | One measure across two ordered axes — activity by day and four-hour window            | A single series over time → `LineSeries`; nested sizes → `Treemap`; fewer than ~10 columns          | matrix, grid chart, density map, calendar heatmap | `Viz/Large/Heatmap` |
| `Leaderboard`  | Top-N rows where the bar length *is* the value and the label sits over the bar        | A continuous series → `BarChart`; a colour key with no magnitude → `Legend`                         | bar list, ranked rows, top N, leaderboard       | `Viz/Medium/Leaderboard` |
| `Legend`       | **Inner part.** A colour key with a value column, beside a chart that cannot draw its own | Placing it on its own — it encodes no magnitude and reads as a chart that failed to draw. Magnitude as bar length → `Leaderboard`; a legend the chart can draw itself | key, chart legend, swatch list, inner | `Viz/Inner/Legend`  |
| `LineSeries`   | A metric over time; drop the axes for an inline sparkline; multi-line when data has `series` | Comparing unordered categories → `BarChart`                                                    | line chart, trend, time series, sparkline, area, multiline | `Viz/Medium/Line` · `Viz/Large/Line` · `Viz/Large/Multiline` |
| `SegmentedBar` | Part-to-whole in a single row — asset types, cost split, health mix (≤5 segments)     | A task with a known endpoint → `Progress`; six or more segments — group the tail into "Others"       | stacked bar, percentage bar, health bar, split  | `Viz/Medium/Segmented Bar` |
| `Treemap`      | Two-level hierarchies sized by a metric — catalogs by schema size, cost by service    | Flat comparisons → `BarChart`; anything under 240px tall                                            | tree map, tiles, nested rectangles              | `Viz/Medium/Treemap` · `Viz/Large/Treemap` |


### `chat` — 16 items


Import from `dbui-chat`, not `dbui`. The package holds a turn and the trace behind it; the layout
around them is Shell F, `ChatWorkbench` in `dbui-shells`.

A component earns a place here only if it carries chat-specific behaviour, a durable state model, or
a visual contract that must hold across products. An arrangement of Button and Tooltip is a **recipe**
and lives in the stories, which is why there is no `AnswerActions` here — `MessageActions` is the one
that graduated, because the feedback pair is a single value rather than two toggles.

`Conversation` and `Response` are `*code-only*` on purpose: one is a scroll container and the other a
markdown renderer, and neither has anything static to draw.


| Component        | Use for                                                                              | Avoid for                                                                                        | Synonyms                                       | Figma layer      |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- |
| `Conversation`   | The scrolling transcript — sticks to the latest turn while streaming, releases on scroll up | The composer, which sits outside it so it never scrolls away                                 | thread, transcript, scroll container           | *code-only*      |
| `Details`        | Answering "what is this asset" in the thread — a table, model or dashboard the agent named | A record with twenty fields → send them to the asset's own surface                           | asset card, asset details, entity card, accordion widget | `Details` |
| `Message`        | One turn. `from="user"` is a filled box, `from="assistant"` is flush body text        | Markdown answers → put `Response` inside it; something the agent did → `Task`                    | turn, bubble, chat message                     | `Message`        |
| `MessageActions` | The row that acts on an answer — copy, feedback, share, then `Sources`                | A user turn — a reader cannot rate their own question; next steps, which are their own widget    | action row, answer actions, feedback row       | `.Actions`       |
| `MessageThumbnail` | Media attached to a turn — a dropped image, a chart the agent produced                  | A preview of the thing → open it in the workbench; a tile that sizes to its own image           | attachment, media tile, image thumbnail        | `.Thumbnail`     |
| `Plan`           | The checklist the agent keeps across a long run — what is still left                  | Steps that already happened → `Task`. Never reorder items as they complete                       | checklist, todo list, steps, agent plan        | `Plan`           |
| `PromptInput`    | The composer. `accent="ai"` for the Genie gradient border                            | Placing it inside `Conversation` — it would scroll away                                          | composer, chat input, message box, prompt      | `Prompt Input`   |
| `Reasoning`      | The thinking trace — "Thought for 40s". With no children it is a live status row      | The answer itself; more than one per turn                                                        | thinking, chain of thought, thought trace      | `Reasoning`      |
| `Response`       | Every assistant answer — renders the markdown models emit, with zero dependencies    | Text you wrote yourself → `MessageContent`; raw HTML, which it never renders                     | markdown, answer body, rendered response       | *code-only*      |
| `Sources`        | Naming what an answer drew on, inside `MessageActions` as its last child              | Acting on the answer — that is the rest of the row; a source that does not resolve                | citations, references, grounding, provenance   | `Sources`        |
| `Artifact`       | Something the agent produced that a reader can open — a notebook, a query, a dashboard               | An asset that already existed → `Details`; the whole of the thing — it is a handle, so cap the preview | generated file, output, produced artifact      | `Artifact`      |
| `Checkpoint`     | A point in the thread a reader can return to                                                        | One per message — that is a scrollbar, not a history                                                  | restore point, snapshot, revert, history       | `Checkpoint`      |
| `Confirmation`   | A question the agent needs answered before it continues — approving a destructive step               | A step a reader may ignore → `Suggestions`; three outcomes, which is a menu                            | confirm, approve, are you sure, ask user       | `Confirmation`      |
| `Queue`          | The state of work the agent is holding, in the rail — pending, running, done                         | The argument for the work → `Plan`; one thing that happened, with evidence → `Task`                    | todo list, work queue, pending, backlog        | `Queue`      |
| `Suggestions`    | Next steps a reader may take or ignore, under the answer they follow from                           | A choice the agent needs an answer to → `Confirmation`; eight of them, which is a results page         | quick replies, follow-ups, next steps, prompts | `Suggestions`      |
| `Task`           | One thing the agent did on its own — read a file, ran a query. Past tense, with the object | Something the user did → `Message`; intended work → `Plan`                                   | tool call, step, agent action, trace           | `Task`           |


---

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

