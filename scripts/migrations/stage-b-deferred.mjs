/**
 * Legacy utilities deliberately left in place for Stage B of the token
 * migration. These are the value shifts — the neutral redesign — and they must
 * land as one reviewed change rather than trickling in with the renames.
 *
 * Shared by the Stage A codemod and the legacy-token audit so that
 * "not migrated yet" can be told apart from "missed". Any legacy utility that
 * appears in neither this list nor the codemod's MAP is a gap, and the audit
 * exits non-zero when it finds one.
 */
export const STAGE_B_DEFERRED = [
  // Primary action family — blue #2272B4 becomes neutral #171717
  "bg-primary",
  "text-primary",
  "text-primary-foreground",
  "bg-primary-foreground",
  "bg-primary-hover",
  "bg-primary-press",
  "text-primary-hover",
  "text-primary-press",
  "border-primary",
  "border-primary-hover",
  "border-primary-press",
  "outline-primary",
  "border-b-primary",

  // Focus ring — blue becomes near-black
  "border-ring",
  "ring-ring",
  "shadow-focus",

  // Interaction states — blue tint removed
  "bg-hover",
  "border-hover",
  "bg-press",
  "bg-active",

  // Form borders — lighter at rest, emphasis moves to hover and focus
  "border-input",
  "bg-input",
  "text-input",

  // No filled warning action exists in the semantic set. Needs a design
  // decision before it can be mapped at all.
  "bg-warning",

  // Chart palette expands from 5 hues to 10 and the hues shift
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
]
