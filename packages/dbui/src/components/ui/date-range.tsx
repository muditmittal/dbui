"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { Calendar } from "../icons/Calendar"
import { XCircleFill } from "../icons/XCircleFill"

/**
 * @standard Date Range
 * @guideline Use for selecting a start + end date pair (Run history, Job runs, audit windows, etc.).
 * @guideline Pair two <DateRangeField>s inside a <DateRange>. The container only handles layout — pickers attach to each field.
 * @constraint Width is HUG by default; let the surrounding control bar / form decide.
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3885-3146
 */

/**
 * DateRange — horizontal layout for two date fields (start + end).
 * Pure layout primitive: 8px gap between fields, items-center.
 *
 * Usage:
 *   <DateRange>
 *     <DateRangeField placeholder="Start: MM/DD/YYYY" value="04/24/2026" onClear={...} />
 *     <DateRangeField placeholder="End: MM/DD/YYYY" value="04/26/2026" onClear={...} />
 *   </DateRange>
 *
 * Pickers (calendar popovers) attach per-field; we don't ship a date picker primitive yet.
 */
function DateRange({
 className,
  ...props
}: React.ComponentProps<"div">) {
 return (
    <div
 data-slot="date-range"
 className={cn(
        "flex items-center gap-2",
 className
      )}
      {...props}
    />
  )
}

/**
 * DateRangeField — single date field trigger styled like an Input.
 * Calendar icon (left) + value/placeholder + optional clear button.
 *
 * Default size is `default` (32px). `sm` (24px) matches the Combobox/Input small variant.
 *
 * For now this is a button-style trigger only — no real picker behavior.
 * A consumer can wrap this in a <Popover> (or future <DatePicker>) to provide selection.
 */
function DateRangeField({
 className,
 icon,
 placeholder,
 value,
 onClear,
 size = "default",
 disabled,
  ...props
}: Omit<React.ComponentProps<"button">, "size" | "value"> & {
  /** Leading icon, defaults to <Calendar /> */
 icon?: React.ReactNode
  /** Placeholder text shown when no value */
 placeholder?: string
  /** Selected value text, e.g. "Start: 04/24/2026, 12:00 PM" */
 value?: string
  /** When provided + value present, renders a clear (×) button on the right */
 onClear?: () => void
 size?: "sm" | "default"
}) {
 const showClear = onClear && value && !disabled

 return (
    <button
 type="button"
 data-slot="date-range-field"
 data-size={size}
 disabled={disabled}
 className={cn(
        "group/date-range-field inline-flex shrink-0 items-center rounded-1 border border-input-border-base bg-surface-base type-label shadow-xs transition-colors outline-none",
        "hover:border-input-border-hover focus-visible:border-focus-ring focus-visible:shadow-focus",
        "disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled disabled:shadow-none disabled:pointer-events-none",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
 size === "default" && "h-8 gap-2 px-3",
 size === "sm" && "h-6 gap-1 px-2",
 className
      )}
      {...props}
    >
      <span className="flex shrink-0 items-center text-text-subtle">
        {icon ?? <Calendar />}
      </span>
      <span
 className={cn(
          "min-w-0 flex-1 truncate text-left",
 value ? "text-text-base" : "text-text-subtle"
        )}
      >
        {value ?? placeholder}
      </span>
      {showClear && (
        <span
 role="button"
 aria-label="Clear date"
 tabIndex={-1}
 onClick={(e) => {
 e.stopPropagation()
 onClear?.()
          }}
 className="inline-flex shrink-0 items-center justify-center text-text-subtle hover:text-text-base"
        >
          <XCircleFill className="size-3.5" />
        </span>
      )}
    </button>
  )
}

export { DateRange, DateRangeField }
