"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * PageHeader — top bar of a content page inside the platform shell.
 * Maps to Figma .PageTitle + .PageActions composition.
 *
 * Usage:
 *   <PageHeader>
 *     <PageHeaderBack onClick={goBack} />
 *     <PageHeaderTitle>My Table</PageHeaderTitle>
 *     <PageHeaderActions>
 *       <Button variant="ghost" size="icon-md"><Pencil /></Button>
 *       <Button>Save</Button>
 *     </PageHeaderActions>
 *   </PageHeader>
 */
function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex items-center gap-2 px-4 py-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageHeaderBack — back/navigation button.
 * Maps to Figma .PageTitle back Icon Button.
 */
function PageHeaderBack({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="page-header-back"
      aria-label="Go back"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-foreground hover:bg-hover",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {props.children ?? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
        >
          <path
            d="M10 4L6 8L10 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

/**
 * PageHeaderTitle — page title text.
 * Maps to Figma .PageTitle "Page Title" text node (Title 2: 22px/28px semibold).
 */
function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn(
        "flex-1 truncate text-[22px] leading-[28px] font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageHeaderActions — right-aligned action buttons.
 * Maps to Figma .PageActions (icon buttons + primary/secondary CTAs).
 */
function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn(
        "flex shrink-0 items-center gap-2",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { PageHeader, PageHeaderBack, PageHeaderTitle, PageHeaderActions }
