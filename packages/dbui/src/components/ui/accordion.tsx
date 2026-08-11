"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "../../lib/utils"
import { ChevronDown } from "../icons/ChevronDown"
import { ChevronUp } from "../icons/ChevronUp"

/**
 * @standard Accordion
 * @guideline First item can be open by default for the most important content
 * @guideline Use for settings panels and filter groups
 * @constraint Don't nest accordions inside accordions
 * @constraint Don't use for primary navigation — use Tabs
 * @constraint Trigger hover is a surface-hover fill, never an underline — the clickable target is the whole block, not the words in it
 * @guideline Give the trigger the same radius as whatever encloses it, so the hover fill lands on the enclosure's corners
 * @constraint A container that clips (overflow-hidden) cuts the trigger's outset focus ring — swap it for inset-ring there rather than leaving the trigger with only its border
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3155-1983
 */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
 return (
    <AccordionPrimitive.Root
 data-slot="accordion"
 className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
 return (
    <AccordionPrimitive.Item
 data-slot="accordion-item"
 className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
 className,
 children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
 return (
    <AccordionPrimitive.Header className="flex">
      {/* `surface-hover` rather than an underline. The trigger is a block the
 full width of its item and its header is free to wrap, so the hover
 has to describe an area — an underline drawn across three lines of a
 heading reads as a broken link, which is why every consumer that put
 real content in a header ended up canceling it. `surface-hover` is
 the token minted for exactly this: hover on a target too large for a
 control tint. */}
      <AccordionPrimitive.Trigger
 data-slot="accordion-trigger"
 className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-3 border border-transparent py-3 text-left type-body-bold transition-all outline-none hover:bg-surface-hover focus-visible:border-focus-ring focus-visible:shadow-focus focus-visible:after:border-focus-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-text-subtle",
 className
        )}
        {...props}
      >
        {children}
        <ChevronDown data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUp data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
 className,
 children,
  ...props
}: AccordionPrimitive.Panel.Props) {
 return (
    <AccordionPrimitive.Panel
 data-slot="accordion-content"
 className="overflow-hidden type-body data-open:animate-expand data-closed:animate-collapse"
      {...props}
    >
      <div
 className={cn(
          "h-(--accordion-panel-height) pt-0 pb-3 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-base [&_p:not(:last-child)]:mb-4",
 className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
