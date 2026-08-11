"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "../../lib/utils"

/**
 * @standard Tooltip
 * @guideline Default to 8px offset from trigger
 * @guideline Always add tooltips to icon-only buttons
 * @constraint No interactive content in tooltips — use Popover instead
 * @constraint Keep to one line of text
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1060-3708
 */

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * TooltipArrow — the small triangular pointer at the edge of the tooltip.
 * Matches Figma `.TooltipArrow`. Auto-rendered inside `<TooltipContent>` by default;
 * exported for cases where consumers want to compose explicitly or customize.
 */
function TooltipArrow({
  className,
  ...props
}: TooltipPrimitive.Arrow.Props) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        "z-tooltip size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-text-base fill-text-base data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
        className
      )}
      {...props}
    />
  )
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-tooltip"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "data-open:animate-enter data-closed:animate-exit z-tooltip inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-2 rounded-1 bg-text-base px-2 py-1 type-hint text-surface-base has-data-[slot=kbd]:pr-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-tooltip **:data-[slot=kbd]:rounded-1 data-[state=delayed-open]: data-[state=delayed-open]: data-[state=delayed-open]:",
            className
          )}
          {...props}
        >
          {children}
          <TooltipArrow />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow, TooltipProvider }
