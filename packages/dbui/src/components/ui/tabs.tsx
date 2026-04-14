"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * Tabs list variants.
 * - default: lined tabs with bottom border indicator
 * - pill: INTERNAL — maps to SegmentControl Slider. Use SegmentControl instead.
 */
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "gap-4 border-b border-border bg-transparent rounded-none",
        /** @internal Use SegmentControl Slider variant instead */
        pill: "gap-1 rounded-md bg-muted p-[3px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent py-1.5 text-[13px] font-semibold whitespace-nowrap text-muted-foreground transition-all outline-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-primary-hover active:text-primary-press focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:text-disabled-foreground aria-disabled:pointer-events-none aria-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default variant (lined): active tab gets primary bottom border
        "group-data-[variant=default]/tabs-list:data-active:border-b-primary group-data-[variant=default]/tabs-list:data-active:text-foreground",
        // Pill variant: active tab gets bg + shadow
        "group-data-[variant=pill]/tabs-list:rounded-md group-data-[variant=pill]/tabs-list:border-none group-data-[variant=pill]/tabs-list:px-1.5 group-data-[variant=pill]/tabs-list:py-0.5 group-data-[variant=pill]/tabs-list:data-active:bg-background group-data-[variant=pill]/tabs-list:data-active:text-foreground group-data-[variant=pill]/tabs-list:data-active:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-[13px] outline-none", className)}
      {...props}
    />
  )
}

/**
 * TabsIcon — leading icon slot inside TabsTrigger.
 * Maps to Figma .TabItem "Icon" boolean prop.
 *
 * Usage: <TabsTrigger value="sql"><TabsIcon><Query /></TabsIcon>SQL</TabsTrigger>
 */
function TabsIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tabs-icon"
      className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIcon, tabsListVariants }
