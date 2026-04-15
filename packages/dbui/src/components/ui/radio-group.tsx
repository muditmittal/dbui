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
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input bg-background outline-none hover:border-primary-hover hover:bg-hover group-hover/field:border-primary-hover group-hover/field:bg-hover active:bg-press active:border-primary-press data-checked:hover:bg-primary-hover data-checked:hover:border-primary-hover data-checked:group-hover/field:bg-primary-hover data-checked:group-hover/field:border-primary-hover data-checked:active:bg-primary-press after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled data-checked:disabled:bg-disabled aria-invalid:border-destructive aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:shadow-xs data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
