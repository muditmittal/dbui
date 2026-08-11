"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "dbui/components/ui/collapsible"
import { ChevronRight } from "dbui/components/icons/ChevronRight"

import { cn } from "../lib/utils"

/**
 * Internal. Not exported from the package barrel.
 *
 * Reasoning, Task, Plan and Sources are all "the agent showing its work behind a
 * chevron". They were four copies of the same trigger: open state, rotation,
 * focus ring, and a content rail. The copies drifted — one gained a focus
 * shadow the others lacked — so the mechanics live here and each component
 * supplies only its own trigger content and tone.
 */

export interface DisclosureProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Sets `data-slot` on the wrapper, so each caller keeps its own hook. */
  slot: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Rendered after the chevron for "leading", before it for "trailing". */
  trigger: React.ReactNode
  /**
   * Reasoning puts the chevron after its label because the label is the subject
   * and the chevron is an aside. The three list disclosures lead with it, so
   * their rows align down the thread.
   */
  chevron?: "leading" | "trailing"
  triggerClassName?: string
  /**
   * Draw the vertical rail beside the disclosed content.
   *
   * The rail is its own 16px column rather than a `border-l` on the content box,
   * so it centers under the trigger's leading glyph instead of hugging the left
   * edge. That also puts the content column at 24px — the same offset as the
   * trigger's second slot — so an icon in a content row lands directly under the
   * status glyph above it, and its label under the title.
   */
  rail?: boolean
  /** Wraps the children, inside the rail's content column when `rail` is set. */
  contentClassName?: string
  className?: string
  children?: React.ReactNode
}

export function useDisclosureState({
  open,
  defaultOpen = false,
  onOpenChange,
}: Pick<DisclosureProps, "open" | "defaultOpen" | "onOpenChange">) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  return { isOpen, handleOpenChange }
}

export function Disclosure({
  slot,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  chevron = "leading",
  triggerClassName,
  rail = false,
  contentClassName,
  className,
  children,
  ...props
}: DisclosureProps) {
  const { isOpen, handleOpenChange } = useDisclosureState({
    open,
    defaultOpen,
    onOpenChange,
  })

  const marker = (
    <span
      className={cn(
        "inline-flex shrink-0 transition-transform [&_svg]:size-4",
        isOpen && "rotate-90"
      )}
    >
      <ChevronRight />
    </span>
  )

  return (
    <div data-slot={slot} className={cn("w-full", className)} {...props}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-2 rounded-1 text-left outline-none",
            "focus-visible:border focus-visible:border-focus-ring",
            triggerClassName
          )}
        >
          {chevron === "leading" ? marker : null}
          {trigger}
          {chevron === "trailing" ? marker : null}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {rail ? (
            <div className="mt-2 flex gap-2">
              <div aria-hidden className="flex w-4 shrink-0 justify-center">
                <span className="h-full border-l-2 border-border-base" />
              </div>
              <div className={cn("min-w-0 flex-1", contentClassName)}>
                {children}
              </div>
            </div>
          ) : (
            <div className={cn("mt-2", contentClassName)}>{children}</div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
