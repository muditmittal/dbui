"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "../../lib/utils"

/**
 * @standard Radio
 * @guideline Default to the most common or recommended option pre-selected
 * @guideline For on/off, use Switch instead
 * @constraint Minimum 2 options
 * @constraint Label uses Paragraph style (13px Regular), not Bold
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=715-650
 */

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input-border-base bg-surface-base outline-none hover:border-input-border-hover hover:bg-action-default-hover group-hover/field:border-input-border-hover group-hover/field:bg-action-default-hover active:bg-action-selected-press active:border-input-border-focus data-checked:hover:bg-action-primary-hover data-checked:hover:border-action-primary-hover data-checked:group-hover/field:bg-action-primary-hover data-checked:group-hover/field:border-action-primary-hover data-checked:active:bg-action-primary-press after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-focus-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:border-border-disabled data-checked:disabled:bg-surface-disabled aria-invalid:border-action-negative-base aria-invalid:aria-checked:border-action-primary-base dark:bg-surface-strong/30 dark:aria-invalid:border-action-negative-base/50 dark:aria-invalid:ring-action-negative-base/40 data-checked:border-action-primary-base data-checked:bg-action-primary-base data-checked:shadow-xs data-checked:text-action-label-inverse-base dark:data-checked:bg-action-primary-base",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-action-label-inverse-base" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
