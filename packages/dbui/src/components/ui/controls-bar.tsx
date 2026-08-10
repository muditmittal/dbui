"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Controls Bar
 * @guideline Use below PageHeader (and Tabs, if present) for filter / search / sort controls.
 * @guideline Wrap filter clusters in <ControlsBarFilters>; trailing actions in <ControlsBarActions>. Both align via justify-between (filters left, actions right).
 * @constraint One per content surface. Sits as a sibling of PageHeader, not nested inside.
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3861-1658
 */

/**
 * ControlsBar — horizontal row of filter / search / sort controls + optional trailing actions.
 *
 * Padding (px-4 py-2) and gap (gap-2) match PageHeader so the two stack
 * cleanly inside a content surface without extra wrappers.
 *
 * Layout:
 *   - Filters only → left-aligned (one child collapses justify-between to flex-start).
 *   - Filters + actions → first cluster left, last cluster right.
 *
 * A search field here is an Input with a leading icon, not an InputGroup. The group
 * is for a field with its own control attached — a trailing button or a unit suffix.
 * Spending it on a decorative icon buys a second bordered cell, a seam and a focus
 * scope the field does not need.
 *
 * Usage (filters only):
 *   <ControlsBar>
 *     <ControlsBarFilters>
 *       <div className="relative w-45">
 *         <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle" />
 *         <Input placeholder="Filter tables" className="pl-8" />
 *       </div>
 *       <Select>...</Select>
 *     </ControlsBarFilters>
 *   </ControlsBar>
 *
 * Usage (filters + actions):
 *   <ControlsBar>
 *     <ControlsBarFilters>
 *       <Input ... />
 *       <Select>...</Select>
 *     </ControlsBarFilters>
 *     <ControlsBarActions>
 *       <Button variant="outline">Open editor</Button>
 *       <Button>Create query</Button>
 *     </ControlsBarActions>
 *   </ControlsBar>
 */
function ControlsBar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="controls-bar"
      className={cn(
        "flex items-center justify-between gap-2 px-4 py-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * ControlsBarFilters — left cluster of filter / search / sort controls.
 * Wraps to the next line when narrow (`flex-wrap`), so dense filter rows
 * (Query History style, 7+ controls) degrade gracefully.
 *
 * Mirrors Figma .ControlsBarFilters.
 */
function ControlsBarFilters({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="controls-bar-filters"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * ControlsBarActions — right cluster of trailing action buttons.
 * Visually the same primitive as ControlsBarFilters but named distinctly so
 * Figma layer naming and code naming stay 1:1.
 *
 * Mirrors Figma .ControlsBarActions.
 */
function ControlsBarActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="controls-bar-actions"
      className={cn(
        "flex shrink-0 items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

export { ControlsBar, ControlsBarFilters, ControlsBarActions }
