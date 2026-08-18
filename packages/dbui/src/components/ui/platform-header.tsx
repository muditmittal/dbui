"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @standard Platform Header
 * @guideline Never place this on a page. The `Base` shell renders it, so a page
 * that adds its own ends up with two top bars.
 * @guideline Fill all three slots, in order — Left, Center, Right. The bar is
 * `justify-between`, so a missing Center pulls the right cluster into the middle
 * of the window rather than leaving a gap where search belongs.
 * @constraint The bar is 48px and the Center slot is 552px. Both are fixed because
 * every product page shares this bar, and a page that sets its own height moves
 * the content below it out of alignment with every other page.
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3225-4233
 */

/**
 * PlatformHeader — the 48px top bar of the Databricks platform shell.
 * Maps to Figma Platform Shell → platformHeader composition.
 *
 * Slots:
 *   left:   .Workspace nav (sidebar toggle + cloud badge + logo)
 *   center: Search input (552px, cmd+P shortcut)
 *   right:  .PlatformActions (catalog select + genie + app grid + avatar)
 *
 * Usage:
 *   <PlatformHeader>
 *     <PlatformHeaderLeft>
 *       <Button variant="ghost" size="icon-md"><SidebarOpen /></Button>
 *       <PlatformHeaderBadge>Production</PlatformHeaderBadge>
 *       <DatabricksLogo />
 *     </PlatformHeaderLeft>
 *     <PlatformHeaderCenter>
 *       <SearchInput />
 *     </PlatformHeaderCenter>
 *     <PlatformHeaderRight>
 *       <Button variant="ghost" size="icon-md"><App /></Button>
 *       <Avatar />
 *     </PlatformHeaderRight>
 *   </PlatformHeader>
 */
function PlatformHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="platform-header"
      className={cn(
        "flex h-12 items-center justify-between px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * PlatformHeaderLeft — left slot: sidebar toggle + cloud badge + logo.
 * Maps to Figma .Workspace nav.
 */
function PlatformHeaderLeft({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="platform-header-left"
      className={cn(
        "flex items-center gap-1",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * PlatformHeaderCenter — center slot: search input.
 * Maps to Figma Platform Shell search (552px fixed, 32px height).
 */
function PlatformHeaderCenter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="platform-header-center"
      className={cn(
        "flex w-[552px] items-center",
        className
      )}
      {...props}
    />
  )
}

/**
 * PlatformHeaderRight — right slot: catalog select, genie, app grid, avatar.
 * Maps to Figma .PlatformActions.
 */
function PlatformHeaderRight({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="platform-header-right"
      className={cn(
        "flex items-center gap-1",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * PlatformHeaderBadge — cloud/workspace name badge.
 * Maps to Figma .Workspace nav "Cloud badge" text.
 */
function PlatformHeaderBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="platform-header-badge"
      className={cn(
        "type-label text-text-base",
        className
      )}
      {...props}
    />
  )
}

export {
  PlatformHeader,
  PlatformHeaderLeft,
  PlatformHeaderCenter,
  PlatformHeaderRight,
  PlatformHeaderBadge,
}
