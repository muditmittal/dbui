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
        // 16px, not the size-aware pair the single-line controls take. This grows
        // with its content, and a pill on a grown box is a stadium — but 4px next
        // to pill siblings read as unrounded rather than as a deliberate contrast.
        // A fixed 16px looks intended at any height, which is the job here.
        // `resize-none` honors the @constraint above, which the class list never
        // enforced — the browser drew its grip regardless, and at a 16px corner
        // that grip crosses the curve. Auto-sizing already fits the box to the
        // text, so the handle was duplicating what the field does by itself.
        "flex field-sizing-content resize-none min-h-12 w-full shape-container-lg border border-input-border-base bg-surface-base px-3 py-2 type-body shadow-control transition-colors outline-none hover:border-input-border-hover active:border-focus-ring placeholder:text-text-subtle focus-visible:border-focus-ring focus-visible:shadow-focus disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-action-negative-base data-[validation=warning]:border-status-border-warning data-[validation=success]:border-action-positive-base dark:bg-surface-strong/30 dark:disabled:bg-surface-strong/80 dark:aria-invalid:border-action-negative-base/50",
 className
      )}
      {...props}
    />
  )
}

export { Textarea }
