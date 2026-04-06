"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioTileGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-tile-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioTile({
  className,
  children,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-tile"
      className={cn(
        "group/radio-tile relative flex flex-col gap-1 rounded-sm border border-input bg-background p-4 text-[13px] shadow-xs transition-all outline-none select-none hover:border-primary-hover active:border-primary-press data-checked:border-primary data-checked:shadow-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      {children}
    </RadioPrimitive.Root>
  )
}

function RadioTileHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-header"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
      <RadioPrimitive.Indicator
        data-slot="radio-tile-indicator"
        className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background data-checked:border-primary data-checked:bg-primary"
      >
        <span className="size-1.5 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </div>
  )
}

function RadioTileTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function RadioTileDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-tile-description"
      className={cn("text-[12px] text-muted-foreground", className)}
      {...props}
    />
  )
}

export { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription }
