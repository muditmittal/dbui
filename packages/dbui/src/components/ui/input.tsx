import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"

/**
 * @standard Input
 * @guideline Default to md size (32px) unless inside a toolbar or table
 * @guideline Validation is border-only — no ring shadows
 * @constraint Never use placeholder as a substitute for a label
 * @constraint Focus shows border-ring only, no shadow-focus
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
        "w-full min-w-0 rounded-sm border border-input bg-background text-[13px] leading-[20px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[13px] file:font-semibold file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:bg-muted disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive data-[validation=warning]:border-warning data-[validation=success]:border-success md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        size === "default" && "h-8 px-3 py-0",
        size === "sm" && "h-6 px-2 py-0",
        className
      )}
      {...props}
    />
  )
}

export { Input }
