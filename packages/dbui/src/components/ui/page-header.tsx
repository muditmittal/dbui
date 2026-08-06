"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Page Header
 * @guideline Single horizontal row at the top of a content surface — title left, actions right.
 * @guideline For sibling tabs, render <Tabs> as a sibling below — not nested inside.
 * @guideline For filter / search / sort controls, render <ControlsBar> as a sibling below.
 * @guideline For breadcrumb (Shell E), render <Breadcrumb> as a sibling above.
 * @constraint One per content surface.
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3860-1619
 */

/**
 * PageHeader — single horizontal row: title (left) + actions (right).
 * Matches Figma "Page Header" — px-4 py-2, justify-between, items-center, gap-2.
 *
 * The 3 sibling regions of a list-page chrome are now flat:
 *   <PageHeader />     — title + actions
 *   <Tabs />           — optional tabs (sibling)
 *   <ControlsBar />    — optional filter/sort row (sibling)
 *
 * Usage (title only):
 *   <PageHeader>
 *     <PageHeaderTitle>
 *       <h1 className="type-title-3">Compute</h1>
 *     </PageHeaderTitle>
 *   </PageHeader>
 *
 * Usage (title + actions, with tabs as sibling):
 *   <PageHeader>
 *     <PageHeaderTitle>
 *       <h1 className="type-title-3">Agents</h1>
 *     </PageHeaderTitle>
 *     <PageHeaderActions>
 *       <Button variant="outline">Register MCP Server</Button>
 *       <Button>Create Agent</Button>
 *     </PageHeaderActions>
 *   </PageHeader>
 *   <Tabs defaultValue="agents">
 *     <TabsList>...</TabsList>
 *   </Tabs>
 *   <ControlsBar>...</ControlsBar>
 */
function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex items-center justify-between gap-2 px-4 py-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageHeaderBack — back/navigation button.
 * Maps to Figma .PageHeaderBack icon button.
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
        "inline-flex size-8 shrink-0 items-center justify-center rounded-1 text-text-base hover:bg-action-default-hover",
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
 * PageHeaderTitle — left side of the header: optional back button + icon + title text + secondary icon buttons.
 * Maps to Figma .PageHeaderTitle (the left cluster inside Page Header).
 */
function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-title"
      className={cn(
        "flex min-w-0 items-center gap-2",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageHeaderActions — right-aligned action buttons.
 * Maps to Figma .PageHeaderActions (icon buttons + primary/secondary CTAs).
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
