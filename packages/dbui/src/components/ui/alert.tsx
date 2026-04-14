import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Alert — DBUI
 *
 * Figma component: "Alert" (4 variants × 2 layouts × removable)
 *
 * Structure: [Icon] [Content: Title + Description + Action(stacked)] [Action(inline)] [Close]
 * Layout: flex row, gap-sm (8px), p-mid (12px), rounded-md (8px)
 *
 * Variants: danger, warning, info, success
 * Layouts: inline (action beside title), stacked (action below description)
 * Removable: optional close button
 */
const alertVariants = cva(
  "group/alert flex w-full items-start gap-2 rounded-md border p-3 text-[13px] leading-[20px]",
  {
    variants: {
      variant: {
        info:    "bg-muted border-border",
        warning: "bg-surface-warning border-warning",
        success: "bg-surface-success border-success",
        danger:  "bg-surface-danger border-destructive",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

/**
 * @constraints
 * - ALWAYS include AlertIcon with the variant-appropriate icon:
 *   danger=DangerFill, warning=WarningFill, info=InfoFill, success=CheckCircleFill.
 * - ALWAYS include AlertTitle. Description is supplementary.
 * - INLINE layout: action button uses size="sm". STACKED layout: action uses size="md".
 * - Action button placement: inline=beside content, stacked=inside content below description.
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn(
        "flex shrink-0 items-center py-0.5 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=danger]/alert:text-destructive",
        "group-data-[variant=warning]/alert:text-warning",
        "group-data-[variant=success]/alert:text-success",
        "group-data-[variant=info]/alert:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold text-[13px] leading-[20px] group-data-[variant=danger]/alert:text-destructive group-data-[variant=warning]/alert:text-warning group-data-[variant=success]/alert:text-success group-data-[variant=info]/alert:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-[13px] leading-[20px] text-foreground", className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function AlertClose({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="alert-close"
      type="button"
      aria-label="Dismiss"
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {props.children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose }
