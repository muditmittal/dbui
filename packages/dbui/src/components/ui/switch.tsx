"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"

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
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus aria-invalid:border-destructive data-[size=default]:border data-[size=default]:border-transparent data-[size=default]:h-4 data-[size=default]:w-7 data-[size=sm]:h-3 data-[size=sm]:w-5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:shadow-xs data-checked:hover:bg-primary-hover data-checked:active:bg-primary-press data-unchecked:bg-input data-unchecked:hover:bg-hover data-unchecked:hover:border-primary-hover data-unchecked:active:bg-press data-unchecked:active:border-primary-press dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:shadow-none data-checked:data-disabled:bg-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-2 dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground group-data-[size=sm]/switch:border group-data-[size=sm]/switch:group-data-unchecked/switch:border-input group-data-[size=sm]/switch:group-data-checked/switch:border-primary group-data-[size=sm]/switch:group-data-unchecked/switch:group-hover/switch:border-primary-hover group-data-[size=sm]/switch:group-data-unchecked/switch:group-active/switch:border-primary-press group-data-[size=sm]/switch:group-data-checked/switch:group-hover/switch:border-primary-hover group-data-[size=sm]/switch:group-data-checked/switch:group-active/switch:border-primary-press group-data-[size=sm]/switch:group-data-disabled/switch:border-disabled"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
