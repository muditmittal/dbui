import { cn } from "../../lib/utils"

/** @standard Kbd (excluded — maps to inner .MenuTrailing) */

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-1 bg-surface-subtle px-1 type-label-bold text-text-subtle select-none in-data-[slot=tooltip-content]:bg-surface-base/20 in-data-[slot=tooltip-content]:text-surface-base dark:in-data-[slot=tooltip-content]:bg-surface-base/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
