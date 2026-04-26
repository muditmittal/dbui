/**
 * DBUI Composition Rules
 *
 * These rules encode design preferences for how components should be composed.
 * They serve as both documentation for LLMs and humans, and can be enforced
 * by linters or Storybook decorators in the future.
 *
 * Each rule has:
 * - id: unique identifier
 * - component: which component it applies to
 * - rule: the constraint
 * - rationale: why this rule exists
 * - severity: "error" (must never happen) or "warning" (prefer to avoid)
 */

export const compositionRules = [
  // ─── Button Rules ───
  {
    id: "button-link-no-icon",
    component: "Button",
    rule: "Link variant must not have a leading icon (ButtonIcon).",
    rationale: "Link buttons are inline text affordances. Icons make them look like regular buttons, breaking the visual hierarchy.",
    severity: "error" as const,
  },
  {
    id: "button-link-no-chevron",
    component: "Button",
    rule: "Link variant must not have a trailing chevron (ButtonChevron).",
    rationale: "Links don't trigger menus. The only acceptable trailing element on a link is an external-link icon when opening a new window.",
    severity: "error" as const,
  },
  {
    id: "button-ghost-prefer-no-icon",
    component: "Button",
    rule: "Ghost buttons should prefer icon-only (size icon-sm/icon-md) over icon+label.",
    rationale: "Ghost buttons with icons and labels compete visually with outlined buttons. Use ghost for icon-only toolbar actions.",
    severity: "warning" as const,
  },
  {
    id: "button-icon-only-needs-aria",
    component: "Button",
    rule: "Icon-only buttons (size icon-sm/icon-md) must have aria-label.",
    rationale: "Icons alone are not accessible. Screen readers need a text label.",
    severity: "error" as const,
  },
  {
    id: "button-destructive-confirm",
    component: "Button",
    rule: "Destructive buttons should only appear inside AlertDialog or as the final action in a confirmed flow.",
    rationale: "Red filled buttons signal irreversible danger. They should never be the first thing a user sees without context.",
    severity: "warning" as const,
  },

  // ─── Menu Button Rules ───
  {
    id: "menu-button-no-icon",
    component: "Button + DropdownMenu",
    rule: "Menu trigger buttons (with ButtonChevron) should not have a leading icon.",
    rationale: "Menu buttons already have a trailing chevron as their affordance. A leading icon adds visual noise and makes the button look like an action button rather than a selector.",
    severity: "warning" as const,
  },
  {
    id: "menu-button-outline-or-secondary",
    component: "Button + DropdownMenu",
    rule: "Menu trigger buttons should use outline or secondary variant, not primary.",
    rationale: "Primary is reserved for the main action on a page. Menu buttons are selectors, not primary actions.",
    severity: "warning" as const,
  },

  // ─── Link Rules ───
  {
    id: "link-external-icon-only",
    component: "Link / Button[variant=link]",
    rule: "The only icon allowed on a link is a trailing external-link icon (NewWindow) when the link opens in a new tab.",
    rationale: "Links are text-only affordances. The external-link icon is the only visual cue that's informational rather than decorative.",
    severity: "error" as const,
  },

  // ─── DropdownMenu Rules ───
  {
    id: "menu-item-icon-consistency",
    component: "DropdownMenuItem",
    rule: "If one menu item in a group has an icon, all items in that group must have icons.",
    rationale: "Mixed icon/no-icon items create misaligned labels. Either all items have icons or none do.",
    severity: "error" as const,
  },
  {
    id: "menu-destructive-last",
    component: "DropdownMenuItem",
    rule: "Destructive menu items must appear at the bottom, separated by a DropdownMenuSeparator.",
    rationale: "Dangerous actions should be visually separated from safe actions to prevent accidental clicks.",
    severity: "error" as const,
  },
  {
    id: "menu-shortcut-consistency",
    component: "DropdownMenuShortcut",
    rule: "Keyboard shortcuts should use the ⌘/⇧/⌥/⌃ symbols, not Cmd/Shift/Alt/Ctrl text.",
    rationale: "Consistent with macOS conventions and the Databricks platform.",
    severity: "warning" as const,
  },

  // ─── Alert Rules ───
  {
    id: "alert-always-has-icon",
    component: "Alert",
    rule: "Alerts must always include an AlertIcon with the variant-appropriate icon (DangerFill, WarningFill, InfoFill, CheckCircleFill).",
    rationale: "The icon provides immediate visual distinction between alert severities. Without it, users rely solely on color which is not accessible.",
    severity: "error" as const,
  },
  {
    id: "alert-always-has-title",
    component: "Alert",
    rule: "Alerts must always include an AlertTitle.",
    rationale: "The title is the primary communication. Description is supplementary.",
    severity: "error" as const,
  },

  // ─── Dialog Rules ───
  {
    id: "dialog-footer-primary-right",
    component: "DialogFooter",
    rule: "Primary action button must be the rightmost button in the footer.",
    rationale: "Consistent with platform convention. Cancel/secondary on the left, confirm/primary on the right.",
    severity: "error" as const,
  },
  {
    id: "dialog-close-always-visible",
    component: "Dialog",
    rule: "Non-alert dialogs must always have a close button (showCloseButton=true).",
    rationale: "Users need an escape hatch. Only AlertDialogs (which require an explicit decision) can omit the close button.",
    severity: "error" as const,
  },

  // ─── Input Rules ───
  {
    id: "input-icon-left-only",
    component: "InputGroup",
    rule: "Decorative icons go on the left (inline-start). Right side is reserved for status indicators and action buttons.",
    rationale: "Left icon identifies the input purpose (search, filter). Right side is for interactive elements (clear, validation status).",
    severity: "warning" as const,
  },

  // ─── Navbar Rules ───
  {
    id: "navbar-item-always-has-icon",
    component: "NavbarItem",
    rule: "Navbar items must always include an icon.",
    rationale: "The sidebar is a constrained space where icons serve as primary recognition. Label-only items look broken.",
    severity: "error" as const,
  },

  // ─── Table Rules ───
  {
    id: "table-header-always-sortable-indicator",
    component: "TableHead",
    rule: "If a column is sortable, always show the TableSortButton, even when unsorted.",
    rationale: "The sort icon indicates sortability. Hiding it until sorted means users can't discover which columns are sortable.",
    severity: "warning" as const,
  },

  // ─── General Rules ───
  {
    id: "no-hardcoded-colors",
    component: "*",
    rule: "Never use hardcoded hex colors. Always use semantic tokens (bg-primary, text-foreground, etc.).",
    rationale: "Hardcoded colors break dark mode and theming.",
    severity: "error" as const,
  },
  {
    id: "icon-size-never-inline",
    component: "*",
    rule: "Never set icon size inline (width/height attributes). Use the parent's [&_svg] selector or size-4 class.",
    rationale: "Icons inherit their size from the parent component. Inline sizing fights the design system.",
    severity: "error" as const,
  },
] as const

export type CompositionRule = (typeof compositionRules)[number]
export type RuleSeverity = CompositionRule["severity"]
