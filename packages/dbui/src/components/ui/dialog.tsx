"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Close as CloseIcon } from "../icons/Close"

/**
 * @standard Dialog
 * @guideline Footer actions: primary right-aligned, cancel left-aligned
 * @guideline Uses shadow-xl with ring-1 ring-text-base/10
 * @constraint Max one dialog open at a time — never stack
 * @constraint For simple confirmations, use Alert Dialog instead
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=882-2798
 */

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-overlay bg-[var(--db-utility-scrim)] duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * @constraints
 * - Non-alert dialogs MUST have showCloseButton=true. Users need an escape hatch.
 *   Only AlertDialog can omit the close button (it requires an explicit decision).
 * - DialogFooter: primary action button must be RIGHTMOST. Cancel/secondary on left.
 * - Sizes: normal (640px) for forms, wide (880px) for tables/previews,
 *   extrawide (1200px) for full editors. Don't use extrawide for simple confirmations.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "normal",
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  size?: "normal" | "wide" | "extrawide"
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        className={cn(
          "data-open:animate-enter data-closed:animate-exit fixed top-1/2 left-1/2 z-modal grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-0 shape-container border border-border-base bg-surface-base type-body shadow-xl duration-100 outline-none data-[size=normal]:sm:max-w-[640px] data-[size=wide]:sm:max-w-[880px] data-[size=extrawide]:sm:max-w-[1200px]",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-md"
                // Icon-only, so the glyph is the whole control and a screen
                // reader has nothing to read without this. Button's own
                // @constraint has required it since before the rule existed.
                aria-label="Close"
              />
            }
          >
            <CloseIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/**
 * DialogHeader — header area with optional icon, title, and description.
 * Maps to Figma .DialogHeader (Icon + Content + Close Button).
 *
 * Usage:
 *   <DialogHeader>
 *     <DialogHeaderIcon><WarningFill /></DialogHeaderIcon>
 *     <DialogTitle>Title</DialogTitle>
 *     <DialogDescription>Description</DialogDescription>
 *   </DialogHeader>
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * DialogHeaderIcon — optional leading icon in dialog header.
 * Maps to Figma .DialogHeader "Icon" frame (hidden by default, shown for confirmation dialogs).
 */
function DialogHeaderIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header-icon"
      className={cn(
        "inline-flex size-10 items-center justify-center shape-container bg-surface-subtle [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border-base p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("type-title-3", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "type-body text-text-subtle *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-text-base",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogHeaderIcon,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
