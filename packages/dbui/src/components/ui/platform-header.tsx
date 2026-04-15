"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/** @standard Platform Header (composition) */

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
 * Maps to Figma .Workspace nav "Cloud badge" text (14px).
 */
function PlatformHeaderBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="platform-header-badge"
      className={cn(
        "text-[14px] leading-[20px] text-foreground",
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
