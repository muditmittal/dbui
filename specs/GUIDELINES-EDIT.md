# Component Guidelines & Constraints

> Edit this file to refine guidelines and constraints for each component.
> These feed into specs, documentation, and design review checklists.

---

# ACTIONS

## Button
**Guidelines:**
- Use to trigger all click actions, no state memory
- Default to Outline for text, Ghost for icon buttons

**Constraints:**
- Avoid icons for Menu button variants
- No icons for Link variant - only exception is trailing NewWindow for external links
- Limit to one Primary button on a page or dialog

---

## Icon Button
**Guidelines:**
- Default to Ghost
- Show aria-label on hover as tooltip

**Constraints:**
- Avoid Primary for icon-only
- Limit to one Primary button on a page or dialog

---

## Toggle Button
**Guidelines:**
- Use when button needs to save state
- Pill variant used as quick filters

**Constraints:**
- Filter variant auto-swaps checkbox/checkmark — don't override icon
- Pill variant should be used in groups, not standalone
- Icon variant requires aria-label

---

## Segment Control
**Guidelines:**
- Use Slider for primary view switching (tab-like)
- Use Outline for secondary or compact controls
- Items distribute equally across available width

**Constraints:**
- Minimum 2 items, maximum 5 items
- Labels should be single words or very short phrases
- Avoid icons with text

---

## Split Button
**Guidelines:**
- Use when there's a primary action with related alternatives
- Primary action should be the most common choice
- Limit dropdown to 3-5 related actions

**Constraints:**
- Max 2 variants: Primary and Outline only
- Dropdown items must be related to the primary action
- Never nest SplitButtons inside menus

---

# CONTROLS

## Label
**Guidelines:**
- Use Bold style (13px Semibold) for form labels
- Short hint text below label is prefered over tooltips

**Constraints:**
- Required indicator is a red asterisk, not the word "required"

---

## Form Input
**Guidelines:**
- Use to wrap Label + Input + helper text as a single unit
- Default to vertical layout (label above input)

**Constraints:**
- Error message replaces helper text, never stacks below it
- Only one validation state at a time (error, warning, or success)

---

## Input
**Guidelines:**
- Default to md size (32px) unless inside a toolbar or table
- Validation is border-only — no ring shadows

**Constraints:**
- Never use placeholder as a substitute for a label
- Focus shows border-ring only, no shadow-focus

---

## Input Group
**Guidelines:**
- Use to attach icons, buttons, or text to an input
- Addon buttons default to Ghost variant

**Constraints:**
- Inner input must use InputGroupInput, not plain Input
- Don't nest InputGroups

---

## Textarea
**Guidelines:**
- Defaults to field-sizing: content (auto-grows)
- Same validation styling as Input — border-only

**Constraints:**
- Don't set explicit rows unless content has a known max length
- No resize handle when auto-sizing is enabled

---

## Select
**Guidelines:**
- Default to Outline; use Ghost inside toolbars
- Popup left-aligns with trigger and matches trigger width

**Constraints:**
- Over 15 options, switch to Combobox
- Ghost variant gains border on hover only

---

## Combobox
**Guidelines:**
- Use when the list has 10+ options and users need search
- Popup left-aligns with trigger and matches trigger width

**Constraints:**
- Under 5 options, use Select instead
- Chevron icon has no independent hover state

---

## Typeahead Combobox
**Guidelines:**
- Use for multi-value selection with removable chips
- Best for tagging, multi-select filters, email recipients

**Constraints:**
- Chips must be removable via X button
- Don't use for single-value selection — use Combobox

---

## Dropdown Menu
**Guidelines:**
- Popup left-aligns with trigger (align="start")
- Destructive items go last, separated by a divider

**Constraints:**
- Menu items use bg-hover on focus, not bg-accent
- Destructive hover uses bg-destructive with destructive-foreground text

---

## Checkbox
**Guidelines:**
- Use indeterminate for parent when children are partially selected
- Group related checkboxes vertically

**Constraints:**
- Label uses Paragraph style (13px Regular), not Bold
- No standalone checkboxes — always pair with a visible label

---

## Radio
**Guidelines:**
- Default to the most common or recommended option pre-selected
- For on/off, use Switch instead

**Constraints:**
- Minimum 2 options
- Label uses Paragraph style (13px Regular), not Bold

---

## Radio Tile
**Guidelines:**
- Use for visual selection with icon + title + description
- Limit to 2-5 options

**Constraints:**
- Title is required; icon and description are optional
- Don't mix tiles with different content structures in the same group

---

## Switch
**Guidelines:**
- Use for immediate toggles that take effect without a save action
- Small size (20x12) is for compact UIs only (tables, toolbars)

**Constraints:**
- Never use inside a form that requires submit — use Checkbox instead
- Place to the right of its label

---

## Slider
**Guidelines:**
- Always show the current value near the slider
- For discrete choices, use Segment Control or Radio instead

**Constraints:**
- Minimum track width 200px
- Don't use for exact number entry — pair with an Input

---

# CONTENT

## Accordion
**Guidelines:**
- First item can be open by default for the most important content
- Use for settings panels and filter groups

**Constraints:**
- Don't nest accordions inside accordions
- Don't use for primary navigation — use Tabs

---

## Aspect Ratio
**Guidelines:**
- Use to enforce consistent image/video proportions in cards and grids
- Default to 16:9 for media content

**Constraints:**
- Don't use for text-only containers
- Always set on the wrapper, not the child

---

## Avatar
**Guidelines:**
- Always provide a fallback (initials or default icon)
- Initials are 1-2 characters max

**Constraints:**
- Don't use for decorative purposes — Avatar implies a user entity
- Image must have alt text

---

## Badge
**Guidelines:**
- Keep text to 1-2 words
- Default to Outline for neutral/low-emphasis status

**Constraints:**
- Badges are not interactive — don't use as buttons
- Don't combine with long text — truncation looks broken

---

## Breadcrumb
**Guidelines:**
- Last item is the current page (non-clickable)
- Separator uses ChevronRight, not slash

**Constraints:**
- Max 5 levels — use ellipsis for deeper hierarchies
- Don't use for non-hierarchical navigation

---

## Card
**Guidelines:**
- Uses rounded-xl (16px) radius — the largest radius in the system
- Cards use shadow for elevation, not border

**Constraints:**
- Don't nest cards inside cards
- Don't use for full-width content — Cards imply bounded areas

---

## Editor Tabs
**Guidelines:**
- Use for code editor-style tab switching with closeable tabs
- Show file type icon before the label

**Constraints:**
- Tabs must be closeable via X button
- Don't use for general navigation — use regular Tabs

---

## Empty
**Guidelines:**
- Include a primary action to populate the view
- Center vertically and horizontally in the content area

**Constraints:**
- Don't show empty state while loading — show Skeleton instead
- Keep the message helpful, not apologetic

---

## Key Value Pair
**Guidelines:**
- Use for metadata display in detail panels and sidebars
- Key uses muted-foreground; value uses foreground

**Constraints:**
- Keep keys short — they're labels, not sentences
- Don't use for editable fields — use Form Input

---

## Navbar
**Guidelines:**
- Use for top-level product navigation (workspace switcher, global actions)
- Fixed to top of viewport

**Constraints:**
- Don't duplicate navigation that belongs in Tabs or Breadcrumb
- Max one Navbar per page

---

## Pagination
**Guidelines:**
- Use ellipsis for large page counts
- Always show previous/next buttons, even when disabled

**Constraints:**
- Don't use for fewer than 2 pages
- Don't use for infinite scroll — those load automatically

---

## Progress Bar
**Guidelines:**
- Use for determinate progress with a known endpoint
- Show percentage or step count nearby

**Constraints:**
- For indeterminate progress, use Spinner instead
- Don't animate backwards

---

## Separator
**Guidelines:**
- Use border token for color — never hardcode
- In menus, use the component's built-in separator, not a generic one

**Constraints:**
- Don't stack multiple separators adjacent to each other
- Don't use as a decorative element — it implies content grouping

---

## Skeleton
**Guidelines:**
- Match the skeleton shape to the content it replaces
- Use for initial page loads and lazy-loaded sections

**Constraints:**
- Don't show skeleton for more than 3 seconds — switch to Spinner
- Don't mix skeleton and real content in the same container

---

## Spinner
**Guidelines:**
- Use for indeterminate loading that takes more than 1 second
- Default to page-center placement

**Constraints:**
- For initial page loads, prefer Skeleton over Spinner
- Always set aria-label for screen readers

---

## Status
**Guidelines:**
- Always pair icon with a text label
- Icon must match semantic meaning (check=success, x=error)

**Constraints:**
- Stick to semantic color tokens — no custom colors
- Status is read-only — don't use for actions

---

## Tabs
**Guidelines:**
- First tab is the default view
- Keep labels to single words when possible

**Constraints:**
- Min 2, max 7 tabs
- Don't use for navigation between unrelated pages — use Navbar

---

## Tag
**Guidelines:**
- Use for removable labels and filter chips
- Group horizontally with 4px gap

**Constraints:**
- Don't use for status — use Badge instead
- Truncate with ellipsis at max width

---

# OVERLAYS

## Alert
**Guidelines:**
- Use for persistent inline messages related to page content
- Default to info variant; use Danger/Warning/Success for semantic states

**Constraints:**
- Don't use for transient feedback — use Toast instead
- Omit close button for critical messages that can't be dismissed

---

## Alert Dialog
**Guidelines:**
- Use for destructive or irreversible actions that need explicit confirmation
- Confirm button uses Destructive variant for dangerous actions

**Constraints:**
- Must have both Cancel and Confirm actions
- Cannot be dismissed by clicking overlay — buttons only

---

## Dialog
**Guidelines:**
- Footer actions: primary right-aligned, cancel left-aligned
- Uses shadow-lg with ring-1 ring-foreground/10

**Constraints:**
- Max one dialog open at a time — never stack
- For simple confirmations, use Alert Dialog instead

---

## Drawer
**Guidelines:**
- Slides in from the right by default
- Use for detail panels, settings, and secondary content

**Constraints:**
- Don't use for primary workflows — use Dialog instead
- Content scrolls independently from the page

---

## Popover
**Guidelines:**
- Left-aligns with trigger (align="start"), 4px offset
- Use for date pickers, color pickers, and mini-forms

**Constraints:**
- For simple text, use Tooltip instead
- If content grows complex, switch to Dialog

---

## Toast
**Guidelines:**
- Use for transient feedback after an action (save, delete, copy)
- Auto-dismisses after a few seconds

**Constraints:**
- Don't use for critical errors that need user action — use Alert
- Max 3 toasts stacked at once

---

## Tooltip
**Guidelines:**
- Default to 8px offset from trigger
- Always add tooltips to icon-only buttons

**Constraints:**
- No interactive content in tooltips — use Popover instead
- Keep to one line of text

---
