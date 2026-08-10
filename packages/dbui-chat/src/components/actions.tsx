"use client"

import * as React from "react"
import { Button } from "dbui/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "dbui/components/ui/tooltip"

import { cn } from "../lib/utils"

/**
 * @standard Actions
 * @guideline Use under an assistant answer for copy, feedback and overflow controls
 * @guideline Order them copy, thumbs up, thumbs down, overflow — matching Genie
 * @guideline Every Action needs a `label`; it becomes both the tooltip and the accessible name
 * @constraint Icon-only ghost buttons only — actions must not compete with the answer
 * @constraint Actions belongs to assistant turns, not user turns
 */

function Actions({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <TooltipProvider>
      <div
        data-slot="actions"
        className={cn("flex items-center gap-0.5", className)}
        {...props}
      >
        {children}
      </div>
    </TooltipProvider>
  )
}

export interface ActionProps
  extends Omit<React.ComponentProps<typeof Button>, "aria-label"> {
  /** Tooltip text and accessible name. Required. */
  label: string
}

function Action({
  label,
  variant = "ghost",
  size = "icon-sm",
  type = "button",
  className,
  children,
  ...props
}: ActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            data-slot="action"
            type={type}
            variant={variant}
            size={size}
            aria-label={label}
            className={className}
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export { Actions, Action }
