"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Page Header
 * @guideline Use at top of every content surface — breadcrumb + title bar + tabs
 * @constraint One per content surface
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3247-5956
 */

/**
 * PageHeader — vertical stack: breadcrumb row, title bar, tabs.
 * Figma: Page Header — px-4 py-2, gap-2 (8px between sections).
 *
 * Usage:
 *   <PageHeader>
 *     <Breadcrumb>...</Breadcrumb>
 *     <PageHeaderTitleBar>
 *       <PageHeaderTitle>
 *         <PageHeaderBack onClick={goBack} />
 *         <Notebook className="size-5 text-muted-foreground" />
 *         <h1>Page Title</h1>
 *       </PageHeaderTitle>
 *       <PageHeaderActions>
 *         <Button variant="outline">Label</Button>
 *         <Button>Create</Button>
 *       </PageHeaderActions>
 *     </PageHeaderTitleBar>
 *     <Tabs>...</Tabs>
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
        "flex flex-col gap-2 px-4 py-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageHeaderTitleBar — horizontal row: title left + actions right.
 * Figma: .TitleBar — flex justify-between.
 */
function PageHeaderTitleBar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-title-bar"
      className={cn(
        "flex items-center justify-between",
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
 * PageHeaderTitle — left side of title bar: icon + title + copy/star buttons.
 * Figma: .PageTitle — flex gap-2 items-center.
 */
function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-title"
      className={cn(
        "flex items-center gap-2",
        "[&_svg:not([class*='size-'])]:size-4",
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

export { PageHeader, PageHeaderTitleBar, PageHeaderBack, PageHeaderTitle, PageHeaderActions }
