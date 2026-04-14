"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * Navbar — fixed-width sidebar navigation.
 * Maps to Figma Platform Shell navbar (180px, flex-col, gap-4).
 */
function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        "flex w-[180px] flex-col gap-4 px-2 py-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * NavbarSection — collapsible group of nav items.
 * Maps to Figma .NavSection (Expanded: True/False).
 *
 * Usage:
 *   <NavbarSection>
 *     <NavbarSectionHeader expanded onToggle={...}>SQL</NavbarSectionHeader>
 *     <NavbarItem><Notebook />Editor</NavbarItem>
 *     <NavbarItem active><Query />Queries</NavbarItem>
 *   </NavbarSection>
 */
function NavbarSection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-section"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  )
}

/**
 * NavbarSectionHeader — collapsible section title with chevron.
 * Maps to Figma .NavSection header row.
 *
 * - Collapsed: label + ChevronRight
 * - Expanded: label + ChevronDown
 */
function NavbarSectionHeader({
  className,
  expanded,
  onToggle,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  expanded?: boolean
  onToggle?: () => void
}) {
  return (
    <button
      type="button"
      data-slot="navbar-section-header"
      data-expanded={expanded || undefined}
      aria-expanded={expanded}
      onClick={onToggle}
      className={cn(
        "flex w-full items-center gap-1 rounded-sm px-2 py-1 text-[12px] leading-[16px] text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate text-left">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("size-4 shrink-0 transition-transform", expanded && "rotate-90")}
      >
        <path
          d="M6 4L10 8L6 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

/**
 * NavbarItem — single navigation item.
 * Maps to Figma .NavItem (State: Default/Hover × Selected: True/False).
 *
 * Figma spec:
 * - h-7 (28px), w-160, gap-2 (8px), px-2, py-1, rounded-sm
 * - Default: text-foreground, font-normal
 * - Hover: bg-hover
 * - Selected: bg-active, text-accent-foreground, font-semibold
 *
 * @constraints
 * - MUST include an icon (via NavbarItemIcon). Label-only items look broken in the sidebar.
 */
function NavbarItem({
  className,
  active = false,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      data-slot="navbar-item"
      data-active={active || undefined}
      className={cn(
        "flex h-7 w-full items-center gap-2 rounded-sm px-2 py-1 text-[13px] leading-[20px] font-normal text-foreground text-left",
        "hover:bg-hover",
        active && "bg-active text-accent-foreground font-semibold",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * NavbarItemIcon — leading icon slot inside NavbarItem.
 * Maps to Figma .NavItem icon instance swap.
 */
function NavbarItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navbar-item-icon"
      className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavbarNewButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="navbar-new-button"
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-lg bg-background px-3 shadow-md text-[13px] leading-[20px] font-semibold text-secondary-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton }
