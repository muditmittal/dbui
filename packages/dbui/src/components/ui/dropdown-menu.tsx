"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "../../lib/utils"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { ChevronRight } from "../icons/ChevronRight"
import { Check } from "../icons/Check"

/**
 * @standard Dropdown Menu
 * @guideline Popup left-aligns with trigger (align="start")
 * @guideline Destructive items go last, separated by a divider
 * @constraint Menu items use bg-action-default-hover on focus, not bg-surface-accent
 * @constraint Destructive hover uses bg-action-negative-base with destructive-foreground text
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=787-706
 */

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({
  asChild: _asChild,
  ...props
}: MenuPrimitive.Trigger.Props & { asChild?: boolean }) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto shape-container bg-surface-base p-1 text-text-base shadow-lg ring-1 ring-text-base/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 type-hint text-text-subtle data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * @constraints
 * - ICON CONSISTENCY: if one item in a group has DropdownMenuItemIcon, ALL items
 *   in that group must. Mixed icon/no-icon creates misaligned labels.
 * - DESTRUCTIVE ITEMS: must appear at the bottom, preceded by a DropdownMenuSeparator.
 * - SHORTCUTS: use symbols (⌘⇧⌥⌃), not text (Cmd/Shift/Alt/Ctrl).
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      // The destructive icon rules are descendant selectors, not `*:[svg]:`,
      // and must stay that way. DropdownMenuItemIcon wraps the icon in a span,
      // so a direct-child selector reaches a bare `<Trash />` and misses a
      // wrapped one — and the wrapper's own `group-focus:text-text-base` then
      // painted it the inverse of the right color. Reaching the svg itself
      // beats what it would otherwise inherit from the wrapper, which leaves
      // one owner of that color instead of two that can disagree.
      className={cn(
        "group/dropdown-menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-1 px-2 py-1 type-label outline-hidden select-none focus:bg-action-default-hover data-inset:pl-8 data-[variant=destructive]:text-status-text-negative data-[variant=destructive]:focus:bg-action-negative-base data-[variant=destructive]:focus:text-action-label-inverse-base dark:data-[variant=destructive]:focus:bg-action-negative-base data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:[&_svg]:text-status-text-negative data-[variant=destructive]:focus:[&_svg]:text-action-label-inverse-base",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex min-h-7 cursor-default items-center gap-2 rounded-1 px-2 py-1 type-label outline-hidden select-none focus:bg-action-default-hover data-inset:pl-8 data-popup-open:bg-action-default-hover data-open:bg-action-default-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-24 shape-container bg-surface-base p-1 text-text-base shadow-lg ring-1 ring-text-base/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
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
      data-slot="dropdown-menu-checkbox-item"
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

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-1 py-1 pr-2 pl-8 type-label outline-hidden select-none focus:bg-action-default-hover data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <Check className="size-4" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border-base", className)}
      {...props}
    />
  )
}

/**
 * DropdownMenuShortcut — keyboard shortcut hint on trailing side.
 * Maps to Figma .MenuTrailing Type="Hint".
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto type-hint text-text-subtle group-focus/dropdown-menu-item:text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * DropdownMenuItemIcon — leading icon inside a menu item.
 * Maps to Figma .MenuLabel "Show Icon" + "Icon" instance swap.
 *
 * Usage: <DropdownMenuItem><DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>Edit</DropdownMenuItem>
 */
function DropdownMenuItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-item-icon"
      className={cn(
        "pointer-events-none shrink-0 text-text-subtle group-focus/dropdown-menu-item:text-text-base [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * DropdownMenuItemDescription — secondary description text below label.
 * Maps to Figma .MenuLabel Content="With Description".
 *
 * Usage:
 *   <DropdownMenuItem>
 *     <div>
 *       <div>Option</div>
 *       <DropdownMenuItemDescription>Helper text</DropdownMenuItemDescription>
 *     </div>
 *   </DropdownMenuItem>
 */
function DropdownMenuItemDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-item-description"
      className={cn(
        "block type-hint text-text-subtle group-focus/dropdown-menu-item:text-text-base/70",
        className
      )}
      {...props}
    />
  )
}

/**
 * DropdownMenuItemBadge — trailing count/badge.
 * Maps to Figma .MenuTrailing Type="Count".
 */
function DropdownMenuItemBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-item-badge"
      className={cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center shape-pill bg-surface-subtle px-2 type-label-bold text-text-subtle group-focus/dropdown-menu-item:bg-text-accent/10 group-focus/dropdown-menu-item:text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * DropdownMenuSearch — search input inside dropdown.
 * Maps to Figma .MenuRow Type="Search".
 */
function DropdownMenuSearch({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="p-1" data-slot="dropdown-menu-search">
      <Input
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  )
}

/**
 * DropdownMenuEmpty — empty state shown when no results match.
 * Maps to Figma .MenuRow Type="Empty".
 */
function DropdownMenuEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-empty"
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
 * DropdownMenuLoading — loading spinner state.
 * Maps to Figma .MenuRow Type="Loading".
 */
function DropdownMenuLoading({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-loading"
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
 * DropdownMenuFooter — action buttons at bottom of dropdown.
 * Maps to Figma .MenuRow Type="Footer" (Cancel + Apply pattern).
 */
function DropdownMenuFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border-base p-2",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemDescription,
  DropdownMenuItemBadge,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSearch,
  DropdownMenuEmpty,
  DropdownMenuLoading,
  DropdownMenuFooter,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
