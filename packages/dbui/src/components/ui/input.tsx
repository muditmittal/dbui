import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"

/**
 * @standard Input
 * @guideline Default to md size (32px) unless inside a toolbar or table
 * @guideline Validation is border-only — no ring shadows
 * @constraint Never use placeholder as a substitute for a label
 * @constraint Focus shows border-focus-ring only, no shadow-focus
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=722-658
 */

function Input({
  className,
  type,
  size = "default",
  validation,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  size?: "sm" | "default"
  validation?: "warning" | "success"
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      data-validation={validation}
      className={cn(
        "w-full min-w-0 rounded-1 border border-input-border-base bg-surface-base type-label shadow-xs transition-colors outline-none hover:border-input-border-hover active:border-input-border-focus file:inline-flex file:h-6 file:border-0 file:bg-transparent file:type-label-bold file:text-text-base placeholder:text-text-subtle focus-visible:border-focus-ring disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-action-negative-base data-[validation=warning]:border-status-border-warning data-[validation=success]:border-action-positive-base dark:bg-surface-strong/30 dark:disabled:bg-surface-strong/80 dark:aria-invalid:border-action-negative-base/50",
        size === "default" && "h-8 px-3 py-0",
        size === "sm" && "h-6 px-2 py-0",
        className
      )}
      {...props}
    />
  )
}

export { Input }
