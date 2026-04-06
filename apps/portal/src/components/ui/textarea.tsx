import * as React from "react"

import { cn } from "@/lib/utils"

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
        "flex field-sizing-content min-h-16 w-full rounded-sm border border-input bg-transparent px-2.5 py-2 text-[13px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press placeholder:text-muted-foreground focus-visible:border-2 focus-visible:border-ring disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_rgba(200,45,76,0.2),0_1px_0_rgba(0,0,0,0.05)] data-[validation=warning]:border-warning data-[validation=warning]:ring-3 data-[validation=warning]:ring-warning/20 data-[validation=success]:border-success data-[validation=success]:ring-3 data-[validation=success]:ring-success/20 md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
