"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "../../lib/utils"
import { Checkbox } from "./checkbox"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

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
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
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
        "px-2 py-1 text-[12px] leading-[16px] text-muted-foreground data-inset:pl-7",
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
      className={cn(
        "group/dropdown-menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-sm px-1.5 py-1 text-[13px] outline-hidden select-none focus:bg-hover data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground dark:data-[variant=destructive]:focus:bg-destructive data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive data-[variant=destructive]:focus:*:[svg]:text-destructive-foreground",
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
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-[13px] outline-hidden select-none focus:bg-hover data-inset:pl-7 data-popup-open:bg-hover data-open:bg-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
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
      className={cn("w-auto min-w-[96px] rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
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
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-sm py-1 pl-1.5 pr-1.5 text-[13px] outline-hidden select-none focus:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-sm py-1 pl-7 pr-1.5 text-[13px] outline-hidden select-none focus:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="size-4" />
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
      className={cn("-mx-1 my-1 h-px bg-border", className)}
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
        "ml-auto text-[12px] tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-foreground",
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
        "pointer-events-none shrink-0 text-muted-foreground group-focus/dropdown-menu-item:text-foreground [&_svg:not([class*='size-'])]:size-4",
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
        "block text-[12px] leading-[16px] text-muted-foreground font-normal group-focus/dropdown-menu-item:text-foreground/70",
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
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[12px] font-semibold text-muted-foreground group-focus/dropdown-menu-item:bg-accent-foreground/10 group-focus/dropdown-menu-item:text-foreground",
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
}: React.ComponentProps<"input">) {
  return (
    <div className="p-1" data-slot="dropdown-menu-search">
      <input
        type="text"
        className={cn(
          "flex h-8 w-full rounded-sm border border-input bg-background px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring",
          className
        )}
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
        "flex items-center justify-center px-2 py-4 text-[13px] text-muted-foreground",
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
        "flex items-center justify-center gap-2 px-2 py-4 text-[13px] text-muted-foreground",
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
        "flex items-center justify-end gap-2 border-t border-border p-2",
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
