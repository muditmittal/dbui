"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "../../lib/utils"
import { CheckSmall } from "../icons/CheckSmall"
import { Dash } from "../icons/Dash"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-background transition-colors outline-none hover:border-primary-hover hover:bg-hover group-hover/field:border-primary-hover group-hover/field:bg-hover active:bg-press active:border-primary-press data-checked:hover:bg-primary-hover data-checked:hover:border-primary-hover data-checked:group-hover/field:bg-primary-hover data-checked:group-hover/field:border-primary-hover data-checked:active:bg-primary-press data-indeterminate:hover:bg-primary-hover data-indeterminate:hover:border-primary-hover data-indeterminate:group-hover/field:bg-primary-hover data-indeterminate:group-hover/field:border-primary-hover data-indeterminate:active:bg-primary-press group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled data-checked:disabled:bg-disabled data-checked:disabled:text-disabled-foreground data-indeterminate:disabled:bg-disabled data-indeterminate:disabled:text-disabled-foreground aria-invalid:border-destructive aria-invalid:data-checked:bg-destructive aria-invalid:data-checked:border-destructive aria-invalid:data-checked:text-destructive-foreground aria-invalid:data-indeterminate:bg-destructive aria-invalid:data-indeterminate:border-destructive aria-invalid:data-indeterminate:text-destructive-foreground dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:shadow-xs data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:shadow-xs disabled:shadow-none data-checked:disabled:shadow-none data-indeterminate:disabled:shadow-none dark:data-checked:bg-primary dark:data-indeterminate:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="group/indicator grid place-content-center text-current transition-none [&>svg]:size-4"
      >
        <CheckSmall className="hidden group-data-checked/indicator:block" />
        <Dash className="hidden group-data-indeterminate/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
