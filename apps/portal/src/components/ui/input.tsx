import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

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
        "w-full min-w-0 rounded-sm border border-input bg-transparent text-[13px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[13px] file:font-semibold file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[validation=warning]:border-warning data-[validation=warning]:ring-3 data-[validation=warning]:ring-warning/20 data-[validation=success]:border-success data-[validation=success]:ring-3 data-[validation=success]:ring-success/20 md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        size === "default" && "h-8 px-2.5 py-1",
        size === "sm" && "h-6 px-2 py-0.5",
        className
      )}
      {...props}
    />
  )
}

export { Input }
