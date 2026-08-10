"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"

import { cn } from "../../lib/utils"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Check } from "../icons/Check"

/** @standard Menubar (excluded — maps to DropdownMenu) */

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex h-8 items-center gap-0.5 rounded-3 border p-1",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-1 px-2 py-0.5 type-label-bold outline-hidden select-none hover:bg-surface-subtle aria-expanded:bg-surface-subtle",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      // Only the override. Surface, padding, shadow, ring and the side
      // animations all come from DropdownMenuContent, which this renders —
      // restating them changed nothing and meant every sweep across the popup
      // family had to edit menubar as a second copy. A menubar menu is wider
      // than a dropdown, which is the one thing that is genuinely different.
      className={cn("min-w-36", className)}
      {...props}
    />
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      // Only the group name, which MenubarItemIcon and MenubarShortcut hang
      // their focus rules on. Everything else came from DropdownMenuItem
      // already.
      //
      // The dropped `…text-status-text-negative!` was not redundant, it was
      // wrong. tailwind-merge does not treat `x` and `x!` as the same utility,
      // so both survived the merge and the important one outranked
      // DropdownMenuItem's `data-[variant=destructive]:focus:*:[svg]:…-inverse`
      // whatever the order. A focused destructive item kept a red icon on the
      // red focus fill — measured at rgb(200,45,76) on rgb(200,45,76), which is
      // not low contrast but none.
      className={cn("group/menubar-item", className)}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-1 px-2 py-1 type-label outline-hidden select-none focus:bg-action-default-hover data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <Checkbox
        checked={checked}
        className="pointer-events-none"
        tabIndex={-1}
      />
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-1 py-1 pr-2 pl-8 type-label outline-hidden select-none focus:bg-action-default-hover data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"
        data-slot="menubar-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <Check className="size-4" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={className}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={className}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      // The menubar-scoped focus rule only. DropdownMenuShortcut carries the
      // same declaration keyed to its own group, and the item is in both
      // groups, so this is belt and braces rather than the belt.
      className={cn("group-focus/menubar-item:text-text-subtle", className)}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={className}
      {...props}
    />
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      // Only the override — DropdownMenuSubContent's floor is min-w-24.
      className={cn("min-w-32", className)}
      {...props}
    />
  )
}

/**
 * MenubarItemIcon — leading icon inside a menu item.
 * Maps to Figma .MenuLabel "Show Icon" + "Icon" instance swap.
 *
 * Usage: <MenubarItem><MenubarItemIcon><Pencil /></MenubarItemIcon>Edit</MenubarItem>
 */
function MenubarItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-item-icon"
      className={cn(
        "pointer-events-none shrink-0 text-text-subtle group-focus/menubar-item:text-text-base [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * MenubarItemDescription — secondary description text below label.
 * Maps to Figma .MenuLabel Content="With Description".
 */
function MenubarItemDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-item-description"
      className={cn(
        "block type-hint text-text-subtle group-focus/menubar-item:text-text-base/70",
        className
      )}
      {...props}
    />
  )
}

/**
 * MenubarItemBadge — trailing count/badge.
 * Maps to Figma .MenuTrailing Type="Count".
 */
function MenubarItemBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-item-badge"
      className={cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center shape-pill bg-surface-subtle px-2 type-label-bold text-text-subtle group-focus/menubar-item:bg-text-accent/10 group-focus/menubar-item:text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * MenubarSearch — search input inside menubar dropdown.
 * Maps to Figma .MenuRow Type="Search".
 */
function MenubarSearch({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="p-1" data-slot="menubar-search">
      <Input
        type="text"
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  )
}

/**
 * MenubarEmpty — empty state shown when no results match.
 * Maps to Figma .MenuRow Type="Empty".
 */
function MenubarEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-empty"
      className={cn(
        "flex items-center justify-center px-2 py-4 type-body text-text-subtle",
        className
      )}
      {...props}
    >
      {children ?? "No results found."}
    </div>
  )
}

/**
 * MenubarLoading — loading spinner state.
 * Maps to Figma .MenuRow Type="Loading".
 */
function MenubarLoading({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-loading"
      className={cn(
        "flex items-center justify-center gap-2 px-2 py-4 type-body text-text-subtle",
        className
      )}
      {...props}
    >
      <svg
        className="size-4 animate-spin"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.5A6.5 6.5 0 1 0 14.5 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {children ?? "Loading..."}
    </div>
  )
}

/**
 * MenubarFooter — action buttons at bottom of menubar dropdown.
 * Maps to Figma .MenuRow Type="Footer" (Cancel + Apply pattern).
 */
function MenubarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border-base p-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarItemIcon,
  MenubarItemDescription,
  MenubarItemBadge,
  MenubarSearch,
  MenubarEmpty,
  MenubarLoading,
  MenubarFooter,
}
