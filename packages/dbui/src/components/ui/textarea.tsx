import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Textarea
 * @guideline Defaults to field-sizing: content (auto-grows)
 * @guideline Same validation styling as Input — border-only
 * @constraint Don't set explicit rows unless content has a known max length
 * @constraint No resize handle when auto-sizing is enabled
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=724-658
 */

function Textarea({
  className,
  validation,
  ...props
}: React.ComponentProps<"textarea"> & {
  validation?: "warning" | "success"
}) {
  return (
    <textarea
      data-slot="textarea"
      data-validation={validation}
      className={cn(
        "flex field-sizing-content min-h-14 w-full rounded-sm border border-input-border-base bg-surface-base px-3 py-2 type-body shadow-xs transition-colors outline-none hover:border-input-border-hover active:border-input-border-focus placeholder:text-text-subtle focus-visible:border-focus-ring disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-action-negative-base data-[validation=warning]:border-status-border-warning data-[validation=success]:border-action-positive-base dark:bg-surface-strong/30 dark:disabled:bg-surface-strong/80 dark:aria-invalid:border-action-negative-base/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
