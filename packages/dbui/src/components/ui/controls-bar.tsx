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
 * Usage (filters only):
 *   <ControlsBar>
 *     <ControlsBarFilters>
 *       <InputGroup>
 *         <InputGroupAddon><Search /></InputGroupAddon>
 *         <InputGroupInput placeholder="Filter" />
 *       </InputGroup>
 *       <Select>...</Select>
 *     </ControlsBarFilters>
 *   </ControlsBar>
 *
 * Usage (filters + actions):
 *   <ControlsBar>
 *     <ControlsBarFilters>
 *       <InputGroup>...</InputGroup>
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
