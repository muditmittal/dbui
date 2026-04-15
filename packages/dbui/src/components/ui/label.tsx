"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Label
 * @guideline Use Bold style (13px Semibold) for form labels
 * @guideline Short hint text below label is preferred over tooltips
 * @constraint Required indicator is a red asterisk, not the word "required"
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3157-2854
 */

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-[13px] leading-[20px] font-semibold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
