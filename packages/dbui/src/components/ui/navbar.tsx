"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { ChevronDown } from "../icons/ChevronDown"

/**
 * @standard Navbar
 * @guideline Use for top-level product navigation (workspace switcher, global actions)
 * @guideline Fixed to top of viewport
 * @constraint Don't duplicate navigation that belongs in Tabs or Breadcrumb
 * @constraint Max one Navbar per page
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3179-14163
 */

/**
 * Navbar — fixed-width sidebar navigation.
 * Figma: 180px, flex-col, no gap between items.
 */
function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        "flex w-full flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * NavbarSection — collapsible group of nav items.
 * Separated from previous section by a border-top + padding.
 */
function NavbarSection({
  className,
  children,
  defaultExpanded = true,
  ...props
}: React.ComponentProps<"div"> & { defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const childArray = React.Children.toArray(children)
  const header = childArray.find(
    (child) => React.isValidElement(child) && (child as React.ReactElement<any>).props?.["data-slot"] === "navbar-section-header"
  )
  const items = childArray.filter(
    (child) => !(React.isValidElement(child) && (child as React.ReactElement<any>).props?.["data-slot"] === "navbar-section-header")
  )

  return (
    <div
      data-slot="navbar-section"
      className={cn("flex flex-col border-t border-border pt-2 mt-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child.type as any)?.displayName === "NavbarSectionHeader") {
          return React.cloneElement(child as React.ReactElement<any>, {
            expanded,
            onToggle: () => setExpanded(!expanded),
          })
        }
        if (expanded) return child
        return null
      })}
    </div>
  )
}

/**
 * NavbarSectionHeader — section title with chevron toggle.
 * 12px Hint style, muted-foreground, ChevronDown rotates when collapsed.
 */
function NavbarSectionHeader({
  className,
  expanded = true,
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
        "flex w-full items-center gap-1 px-2 py-1 text-[12px] leading-[16px] text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate text-left">{children}</span>
      <ChevronDown
        className={cn("size-3 shrink-0 text-muted-foreground transition-transform", !expanded && "-rotate-90")}
      />
    </button>
  )
}
NavbarSectionHeader.displayName = "NavbarSectionHeader"

/**
 * NavbarItem — single navigation item.
 * h-7 (28px), gap-2, px-2, rounded-sm.
 * Active: bg-accent, text-accent-foreground, font-semibold.
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
        "flex h-7 w-full items-center gap-2 rounded-sm px-2 text-[13px] leading-[20px] font-normal text-foreground text-left",
        "hover:bg-hover",
        active && "bg-accent text-accent-foreground font-semibold [&_[data-slot=navbar-item-icon]]:text-accent-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * NavbarItemIcon — leading icon slot.
 */
function NavbarItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navbar-item-icon"
      className={cn(
        "pointer-events-none flex shrink-0 items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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
