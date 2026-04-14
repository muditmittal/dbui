"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

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

function NavbarSection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-section"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  )
}

function NavbarSectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-section-header"
      className={cn(
        "flex items-center gap-1 rounded-sm px-2 py-1 text-[12px] leading-[16px] text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

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
        "flex h-7 w-[160px] items-center gap-2 rounded-sm px-2 py-1 text-[13px] leading-[20px] font-normal text-foreground",
        "hover:bg-hover",
        active && "bg-accent text-accent-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
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

export { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarNewButton }
