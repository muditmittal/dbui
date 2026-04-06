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
        "w-full min-w-0 rounded-sm border border-input bg-transparent text-[13px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[13px] file:font-semibold file:text-foreground placeholder:text-muted-foreground focus-visible:border-2 focus-visible:border-ring disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_rgba(200,45,76,0.2),0_1px_0_rgba(0,0,0,0.05)] data-[validation=warning]:border-warning data-[validation=warning]:shadow-[0_0_0_3px_rgba(190,80,30,0.2),0_1px_0_rgba(0,0,0,0.05)] data-[validation=success]:border-success data-[validation=success]:shadow-[0_0_0_3px_rgba(39,124,67,0.2),0_1px_0_rgba(0,0,0,0.05)] md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        size === "default" && "h-8 px-2.5 py-1",
        size === "sm" && "h-6 px-2 py-0.5",
        className
      )}
      {...props}
    />
  )
}

export { Input }
