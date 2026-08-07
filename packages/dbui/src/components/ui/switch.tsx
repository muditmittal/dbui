"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"

/**
 * @standard Switch
 * @guideline Use for immediate toggles that take effect without a save action
 * @guideline Small size (20x12) is for compact UIs only (tables, toolbars)
 * @constraint Never use inside a form that requires submit — use Checkbox instead
 * @constraint Place to the right of its label
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=717-650
 */

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-focus-ring focus-visible:shadow-focus aria-invalid:border-action-negative-base data-[size=default]:border data-[size=default]:border-transparent data-[size=default]:h-4 data-[size=default]:w-7 data-[size=sm]:h-3 data-[size=sm]:w-5 dark:aria-invalid:border-action-negative-base/50 dark:aria-invalid:ring-action-negative-base/40 data-checked:bg-action-primary-base data-checked:shadow-xs data-checked:hover:bg-action-primary-hover data-checked:group-hover/field:bg-action-primary-hover data-checked:active:bg-action-primary-press data-unchecked:bg-border-strong data-unchecked:hover:bg-action-default-hover data-unchecked:group-hover/field:bg-action-default-hover data-unchecked:hover:border-input-border-hover data-unchecked:group-hover/field:border-input-border-hover data-unchecked:active:bg-action-selected-press data-unchecked:active:border-focus-ring dark:data-unchecked:bg-border-strong/80 data-disabled:cursor-not-allowed data-disabled:bg-surface-disabled data-disabled:shadow-none data-checked:data-disabled:bg-surface-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-surface-base ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-2 dark:data-checked:bg-action-label-inverse-base group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-text-base group-data-[size=sm]/switch:border group-data-[size=sm]/switch:group-data-unchecked/switch:border-input-border-base group-data-[size=sm]/switch:group-data-checked/switch:border-action-primary-base group-data-[size=sm]/switch:group-data-unchecked/switch:group-hover/switch:border-input-border-hover group-data-[size=sm]/switch:group-data-unchecked/switch:group-active/switch:border-focus-ring group-data-[size=sm]/switch:group-data-checked/switch:group-hover/switch:border-action-primary-hover group-data-[size=sm]/switch:group-data-checked/switch:group-active/switch:border-action-primary-press group-data-[size=sm]/switch:group-data-disabled/switch:border-border-disabled"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
