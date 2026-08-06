"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"

import { cn } from "../../lib/utils"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { ChevronRight } from "../icons/ChevronRight"
import { Check } from "../icons/Check"

/** @standard Context Menu (excluded — maps to DropdownMenu) */

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn("z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2 bg-surface-base p-1 text-text-base shadow-md ring-1 ring-text-base/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 type-hint text-text-subtle data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex min-h-7 cursor-default items-center gap-1.5 rounded-1 px-1.5 py-1 type-label outline-hidden select-none focus:bg-action-default-hover data-inset:pl-7 data-[variant=destructive]:text-status-text-negative data-[variant=destructive]:focus:bg-action-negative-base data-[variant=destructive]:focus:text-action-label-inverse-base dark:data-[variant=destructive]:focus:bg-action-negative-base data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-status-text-negative",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex min-h-7 cursor-default items-center gap-1.5 rounded-1 px-1.5 py-1 type-label outline-hidden select-none focus:bg-action-default-hover data-inset:pl-7 data-open:bg-action-default-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className="shadow-lg"
      side="right"
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-1 py-1 pl-1.5 pr-1.5 type-label outline-hidden select-none focus:bg-action-default-hover data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-1 py-1 pl-7 pr-1.5 type-label outline-hidden select-none focus:bg-action-default-hover data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <Check className="size-4" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border-base", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto type-hint text-text-subtle group-focus/context-menu-item:text-text-subtle",
        className
      )}
      {...props}
    />
  )
}

/**
 * ContextMenuItemIcon — leading icon inside a menu item.
 * Maps to Figma .MenuLabel "Show Icon" + "Icon" instance swap.
 *
 * Usage: <ContextMenuItem><ContextMenuItemIcon><Pencil /></ContextMenuItemIcon>Edit</ContextMenuItem>
 */
function ContextMenuItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-item-icon"
      className={cn(
        "pointer-events-none shrink-0 text-text-subtle group-focus/context-menu-item:text-text-base [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * ContextMenuItemDescription — secondary description text below label.
 * Maps to Figma .MenuLabel Content="With Description".
 */
function ContextMenuItemDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-item-description"
      className={cn(
        "block type-hint text-text-subtle group-focus/context-menu-item:text-text-base/70",
        className
      )}
      {...props}
    />
  )
}

/**
 * ContextMenuItemBadge — trailing count/badge.
 * Maps to Figma .MenuTrailing Type="Count".
 */
function ContextMenuItemBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-item-badge"
      className={cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-surface-subtle px-1.5 type-label-bold text-text-subtle group-focus/context-menu-item:bg-text-accent/10 group-focus/context-menu-item:text-text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * ContextMenuSearch — search input inside context menu.
 * Maps to Figma .MenuRow Type="Search".
 */
function ContextMenuSearch({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="p-1" data-slot="context-menu-search">
      <Input className={cn(className)} {...props} />
    </div>
  )
}

/**
 * ContextMenuEmpty — empty state shown when no results match.
 * Maps to Figma .MenuRow Type="Empty".
 */
function ContextMenuEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="context-menu-empty"
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
 * ContextMenuLoading — loading spinner state.
 * Maps to Figma .MenuRow Type="Loading".
 */
function ContextMenuLoading({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="context-menu-loading"
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
 * ContextMenuFooter — action buttons at bottom of context menu.
 * Maps to Figma .MenuRow Type="Footer" (Cancel + Apply pattern).
 */
function ContextMenuFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="context-menu-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border-base p-2",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuItemIcon,
  ContextMenuItemDescription,
  ContextMenuItemBadge,
  ContextMenuSearch,
  ContextMenuEmpty,
  ContextMenuLoading,
  ContextMenuFooter,
}
