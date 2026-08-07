"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "../../lib/utils"
import { CheckSmall } from "../icons/CheckSmall"
import { Dash } from "../icons/Dash"

/**
 * @standard Checkbox
 * @guideline Use indeterminate for parent when children are partially selected
 * @guideline Group related checkboxes vertically
 * @constraint Label uses Paragraph style (13px Regular), not Bold
 * @constraint No standalone checkboxes — always pair with a visible label
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=713-650
 */

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-1 border border-input-border-base bg-surface-base transition-colors outline-none hover:border-input-border-hover hover:bg-action-default-hover group-hover/field:border-input-border-hover group-hover/field:bg-action-default-hover active:bg-action-selected-press active:border-focus-ring data-checked:hover:bg-action-primary-hover data-checked:hover:border-action-primary-hover data-checked:group-hover/field:bg-action-primary-hover data-checked:group-hover/field:border-action-primary-hover data-checked:active:bg-action-primary-press data-indeterminate:hover:bg-action-primary-hover data-indeterminate:hover:border-action-primary-hover data-indeterminate:group-hover/field:bg-action-primary-hover data-indeterminate:group-hover/field:border-action-primary-hover data-indeterminate:active:bg-action-primary-press group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-focus-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:border-border-disabled data-checked:disabled:bg-surface-disabled data-checked:disabled:text-text-disabled data-indeterminate:disabled:bg-surface-disabled data-indeterminate:disabled:text-text-disabled aria-invalid:border-action-negative-base aria-invalid:data-checked:bg-action-negative-base aria-invalid:data-checked:border-action-negative-base aria-invalid:data-checked:text-action-label-inverse-base aria-invalid:data-indeterminate:bg-action-negative-base aria-invalid:data-indeterminate:border-action-negative-base aria-invalid:data-indeterminate:text-action-label-inverse-base dark:bg-surface-strong/30 dark:aria-invalid:border-action-negative-base/50 dark:aria-invalid:ring-action-negative-base/40 data-checked:border-action-primary-base data-checked:bg-action-primary-base data-checked:text-action-label-inverse-base data-checked:shadow-xs data-indeterminate:border-action-primary-base data-indeterminate:bg-action-primary-base data-indeterminate:text-action-label-inverse-base data-indeterminate:shadow-xs disabled:shadow-none data-checked:disabled:shadow-none data-indeterminate:disabled:shadow-none dark:data-checked:bg-action-primary-base dark:data-indeterminate:bg-action-primary-base",
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
        <Dash className="hidden size-2.5! group-data-indeterminate/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
