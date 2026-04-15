# Component Guidelines & Constraints

Edit this file to update guidelines and constraints across all components.
Run the sync script to push changes back to individual manifests.

## Accordion

**Guidelines:**
- Use to progressively disclose content in limited space
- First item can be open by default for the most important content
- Use for FAQs, settings panels, and filter groups

**Constraints:**
- Don't nest accordions inside accordions
- Keep headers concise — they're the primary scanning mechanism
- Don't use for primary navigation — use Tabs instead

## Alert Dialog

**Guidelines:**
- Use for destructive or irreversible actions that need explicit confirmation
- Confirm button should use Destructive variant for dangerous actions
- Description should clearly state the consequence

**Constraints:**
- Must have both Cancel and Confirm actions
- Cannot be dismissed by clicking overlay — only via buttons
- Don't use for informational dialogs — use Dialog instead

## Alert

**Guidelines:**
- Use for persistent inline messages that relate to page content
- Always include a descriptive title
- Danger for errors, Warning for caution, Success for confirmation

**Constraints:**
- Icon color must match variant (info=foreground, danger=destructive, warning=warning, success=success)
- Close button is optional — omit for critical messages
- Don't use for transient feedback — use Toast instead

## Avatar

**Guidelines:**
- Use to represent users or entities
- Always provide a fallback (initials or default icon)
- Use in headers, comment threads, and user lists

**Constraints:**
- Image must have alt text for accessibility
- Initials should be 1-2 characters max
- Don't use for decorative purposes — it implies a user

## Badge

**Guidelines:**
- Use for status labels, counts, or categorization
- Keep text short — 1-2 words maximum
- Use destructive for error or critical status

**Constraints:**
- Don't use as buttons — badges are not interactive
- Use outline variant for low-emphasis or neutral status
- Don't combine badge with long text — truncation looks broken

## Breadcrumb

**Guidelines:**
- Use to show hierarchical navigation path
- Last item is the current page (non-clickable)
- Use in page headers below the platform header

**Constraints:**
- Don't use more than 5 levels — use ellipsis for deep hierarchies
- Separator uses ChevronRight, not slash
- Don't use for non-hierarchical navigation

## Button

**Guidelines:**
- Use Primary for the single most important action on a page or dialog
- Use Outline as the default for secondary actions alongside Primary
- Use Destructive only inside AlertDialog or as a confirmed final action

**Constraints:**
- Link variant: NO icons — only exception is trailing NewWindow for external links
- Icon-only buttons (icon-sm/icon-md) MUST have aria-label
- Max one Primary button per visible area

## Card

**Guidelines:**
- Use to group related content into a visual container
- Cards should have a clear hierarchy: header, content, optional footer
- Use rounded-xl (16px) border radius

**Constraints:**
- Don't nest cards inside cards
- Cards use shadow, not border for elevation
- Don't use for full-width content — cards imply bounded areas

## Checkbox

**Guidelines:**
- Use for multi-select from a list of options
- Use indeterminate for parent checkbox when children are partially selected
- Group related checkboxes vertically

**Constraints:**
- Label text must use Paragraph style (13px Regular), not Bold
- Always pair with a visible label — no standalone checkboxes
- Indeterminate is a visual-only state — it resolves to checked or unchecked on click

## Combobox

**Guidelines:**
- Use when the list has 10+ options and users benefit from search
- Placeholder should say 'Search...' to indicate typeahead
- Use for entity pickers (users, tables, schemas)

**Constraints:**
- Menu items use bg-hover on highlight, not bg-accent
- Chevron is a plain icon with no hover state
- Don't use for fewer than 5 options — use Select instead

## Dialog

**Guidelines:**
- Use for focused tasks that require user attention
- Always include a clear title and primary action
- Footer actions: primary right, cancel left

**Constraints:**
- Max one dialog open at a time — never stack
- Close button must be visible (top-right, icon-md size)
- Don't use for simple confirmations — use AlertDialog instead

## Drawer

**Guidelines:**
- Use for secondary content or actions that don't warrant a full page
- Slides in from the right by default
- Good for detail panels, settings, and filters

**Constraints:**
- Don't use for primary workflows — use Dialog instead
- Content should be scrollable independently
- Always include a close mechanism (X button or swipe)

## Dropdown Menu

**Guidelines:**
- Use for contextual actions triggered by a button click
- Group related items with separators
- Destructive items go last, separated from other items

**Constraints:**
- Menu items use bg-hover on focus, not bg-accent
- Disabled items use text-disabled-foreground, not opacity
- Destructive hover uses bg-destructive with destructive-foreground text

## Editor Tabs

**Guidelines:**
- Use for code editor-style tab switching
- Each tab represents an open file or document
- Active tab is visually elevated from the tab bar

**Constraints:**
- Tabs must be closeable via X button
- Show file type icon before the label
- Don't use for general navigation — use regular Tabs

## Empty

**Guidelines:**
- Use when a view has no content to display
- Include a clear message explaining why it's empty
- Offer a primary action to populate the view

**Constraints:**
- Center vertically and horizontally in the content area
- Don't show empty state if data is loading — show Skeleton
- Keep the message helpful, not apologetic

## Icon Button

**Guidelines:**
- Use for toolbar actions where the icon alone is sufficient
- Prefer Ghost for low-emphasis repeated actions
- Always provide aria-label for accessibility

**Constraints:**
- MUST have aria-label — no visible text to convey meaning
- Avoid Primary variant for icon-only — it's visually heavy without a label
- Never use without a tooltip to explain the action

## Input Group

**Guidelines:**
- Use to combine an input with related addons (icons, buttons, text)
- Addons can be placed inline-start, inline-end, block-start, or block-end
- Focus state applies to the entire group border

**Constraints:**
- Inner input/textarea must use InputGroupInput/InputGroupTextarea — not plain Input
- Addon buttons use InputGroupButton with ghost variant by default
- Don't nest InputGroups inside other InputGroups

## Input

**Guidelines:**
- Use for single-line text entry
- Always pair with a visible label above
- Use placeholder text sparingly — it disappears on focus

**Constraints:**
- Never use placeholder as a substitute for a label
- Validation border is the only visual change — no ring shadows
- Disabled inputs use bg-muted background

## Pagination

**Guidelines:**
- Use for navigating through paged data
- Show current page clearly
- Use ellipsis for large page counts

**Constraints:**
- Don't use for fewer than 2 pages
- Always show previous/next buttons even when disabled
- Current page should be visually distinct

## Popover

**Guidelines:**
- Use for rich interactive content attached to a trigger
- Good for date pickers, color pickers, and mini-forms
- Closes on outside click

**Constraints:**
- Don't use for simple text — use Tooltip instead
- Keep content focused — if it grows complex, use Dialog
- Position away from screen edges

## Progress Bar

**Guidelines:**
- Use for determinate progress with a known endpoint
- Show percentage or step count nearby
- Use for uploads, installations, and multi-step processes

**Constraints:**
- Don't use for indeterminate progress — use Spinner
- Minimum visible width should be 4px even at 0%
- Don't animate backwards — only forwards

## Radio Tile

**Guidelines:**
- Use for visual selection with rich content (icon + title + description)
- Limit to 2-5 options for scanability
- Selected tile gets accent border and radio indicator

**Constraints:**
- Always include a title — icon and description are optional
- Radio indicator must be visible on both selected and unselected states
- Don't mix tiles with different content structures in the same group

## Radio

**Guidelines:**
- Use when only one option can be selected from a group
- Default to the most common or recommended option
- List options in logical order (alphabetical, frequency, or severity)

**Constraints:**
- Minimum 2 options — for on/off use Switch instead
- Label text must use Paragraph style (13px Regular)
- Never use radio buttons for actions — they're for selection only

## Segment Control

**Guidelines:**
- Use Slider for primary view switching (tab-like)
- Use Outline for secondary or compact controls
- Items distribute equally across available width

**Constraints:**
- Minimum 2 items, maximum 5 items
- Labels should be single words or very short phrases
- Don't mix icons and text within the same control

## Select

**Guidelines:**
- Use for choosing one option from a predefined list
- Use Ghost variant inside toolbars or compact layouts
- Default to the most common option or show placeholder

**Constraints:**
- Don't use for more than ~15 options — use Combobox with search instead
- Ghost variant has no border by default — gains border on hover
- Menu items use bg-hover on focus, not bg-accent

## Separator

**Guidelines:**
- Use to visually divide sections of content
- Horizontal for stacking, vertical for side-by-side
- Use within menus to group related items

**Constraints:**
- Use border token for color — never hardcode
- Don't use multiple separators adjacent to each other
- In menus, use the component's built-in separator, not a generic one

## Skeleton

**Guidelines:**
- Use as a placeholder while content is loading
- Match the skeleton shape to the content it replaces
- Animate with a subtle pulse

**Constraints:**
- Don't show skeleton for more than 3 seconds — switch to a spinner
- Match the dimensions of actual content
- Don't mix skeleton and real content in the same container

## Slider

**Guidelines:**
- Use for selecting a value within a continuous range
- Always show the current value near the slider
- Use for settings like volume, opacity, or budget

**Constraints:**
- Don't use for discrete choices — use SegmentControl or RadioGroup
- Minimum track width should be 200px
- Disabled slider shows muted colors

## Spinner

**Guidelines:**
- Use for indeterminate loading that takes more than 1 second
- Center within the loading area
- Pair with a label for accessibility ('Loading...')

**Constraints:**
- Don't use for page-level loading — use Skeleton instead
- Keep size proportional to the area it's in
- Always set aria-label or screen reader text

## Split Button

**Guidelines:**
- Use when there's a primary action with related alternatives
- Primary action should be the most common choice
- Limit dropdown to 3-5 related actions

**Constraints:**
- Max 2 variants: Primary and Outline only
- Dropdown items must be related to the primary action
- Never nest SplitButtons inside menus

## Status

**Guidelines:**
- Use to indicate the current state of an entity
- Always pair icon with a text label for clarity
- Use in tables, cards, and detail views

**Constraints:**
- Icon must match the semantic meaning (check=success, x=error, etc.)
- Don't use custom colors — stick to semantic tokens
- Don't use for actions — status is read-only

## Switch

**Guidelines:**
- Use for immediate on/off toggles that take effect without a save action
- Label should describe the setting, not the action
- Place to the right of its label

**Constraints:**
- Never use inside a form that requires a submit button — use Checkbox instead
- Small size is for compact UIs only (tables, toolbars)
- Don't use for multi-step or reversible choices

## Tabs

**Guidelines:**
- Use for switching between related views in the same context
- First tab should be the default/most common view
- Keep tab labels short — single words preferred

**Constraints:**
- Don't use for navigation between unrelated pages — use Navbar
- Tab content should load instantly — no loading states in the tab bar
- Minimum 2 tabs, maximum 7

## Tag

**Guidelines:**
- Use for removable labels and filter chips
- Always include a remove button for user-created tags
- Group tags horizontally with 4px gap

**Constraints:**
- Remove button must be accessible via keyboard
- Don't use for status — use Badge instead
- Max width should truncate with ellipsis

## Textarea

**Guidelines:**
- Use for multi-line text input
- Field auto-sizes to content with field-sizing-content
- Always pair with a visible label above

**Constraints:**
- Same validation styling as Input — border-only, no ring shadows
- Disabled uses bg-muted background
- Don't set explicit rows unless content has a known max length

## Toast

**Guidelines:**
- Use for transient feedback after an action (save, delete, copy)
- Auto-dismisses after a few seconds
- Use success for confirmations, error for failures

**Constraints:**
- Don't use for critical errors that need user action — use Alert
- Keep message to one line
- Don't stack more than 3 toasts

## Toggle Button

**Guidelines:**
- Use Default for toolbar on/off toggles
- Use Filter for filter bar chips with checkbox behavior
- Use Pill for tab-like segment switching

**Constraints:**
- Filter variant auto-swaps checkbox/checkmark — don't override icon
- Pill variant should be used in groups, not standalone
- Icon variant requires aria-label

## Tooltip

**Guidelines:**
- Use to provide additional context for UI elements
- Keep tooltip text short — one line max
- Always add tooltips to icon-only buttons

**Constraints:**
- 8px offset from trigger element
- Don't put interactive content in tooltips — use Popover instead
- Don't use for essential information — it's hidden by default

## Typeahead Combobox

**Guidelines:**
- Use for multi-value selection with tags/chips
- Selected items appear as removable chips above the input
- Use for tagging, multi-select filters, email recipients

**Constraints:**
- Chips must be removable via X button
- Input should remain functional after chip selection
- Don't use for single-value selection — use Combobox instead

