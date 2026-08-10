"use client"

import * as React from "react"
import { cva, type VariantProps } from "../../lib/cva"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"

/**
 * @standard Input Group
 * @guideline Use to attach icons, buttons, or text to an input
 * @guideline Addon buttons default to Ghost variant
 * @constraint Inner input must use InputGroupInput, not plain Input
 * @constraint Don't nest InputGroups
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3178-3973
 *
 * The shell owns the border and the focus ring; the inner control draws neither.
 * Two things were removed here for that to hold.
 *
 * `active:border-focus-ring` gave a pressed group the focus color, so press and
 * focus were indistinguishable and the focus token described something that was
 * not focus. No other input control carries a press border, so the group now
 * matches them.
 *
 * A pair of `in-data-[slot=combobox-content]:focus-within:*` rules used to strip
 * the border and ring from a group nested inside a combobox popup — which is
 * where the popup's own search field lives. That suppressed the indicator on the
 * one element actually holding focus, which fails WCAG 2.4.7. It had also
 * stopped working: it cancelled `ring-0`, and the treatment moved to
 * `shadow-focus`, which is a box-shadow that `ring-0` does not touch. So it was
 * both wrong and dead. The search field in a popup now shows focus like any
 * other field, and the trigger loses it because the popup is portalled out of
 * the trigger's subtree and `focus-within` no longer matches.
 */

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        // Focus thickens this control's own edge rather than ringing it. Everything
        // else in the system takes the ring, and that stays true — the ring is for a
        // control with one edge to draw around. A group's edge is shared with the
        // addon sitting inside it, so a ring around the whole assembly says the
        // addon has focus when only the field does.
        //
        // The 2px comes from the 1px border plus a 1px inset ring, not from
        // `border-2`. Widening the border eats a pixel of the inside, which drops the
        // group's inner radius to 2px while the flush addon's outer corner stays at
        // 4px — the corner then pokes through the curve. An inset ring changes no
        // geometry, so the radii keep matching and nothing shifts on focus.
        //
        // Deliberately not `overflow-hidden`. Clipping was the obvious way to make
        // a flush addon follow the group's corners, and it does — but a parent
        // that clips also clips a *child's* focus ring, so the addon button's
        // indicator came out sliced to a hard square on three sides. The addon
        // carries its own corner instead.
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-1 border border-input-border-base bg-surface-base shadow-xs transition-colors outline-none hover:border-input-border-hover has-disabled:bg-surface-disabled has-disabled:border-border-disabled has-disabled:shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-focus-ring has-[[data-slot=input-group-control]:focus-visible]:inset-ring-1 has-[[data-slot=input-group-control]:focus-visible]:inset-ring-focus-ring has-[[data-slot][aria-invalid=true]]:border-action-negative-base has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-action-negative-base/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-surface-strong/30 dark:has-disabled:bg-surface-strong/80 dark:has-[[data-slot][aria-invalid=true]]:ring-action-negative-base/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-2 type-label-bold text-text-subtle select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--db-radius-2)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:-ml-1 has-[>kbd]:-ml-0.5",
        // A trailing addon is a cell of the control, not something floating in
        // it. Figma's set draws a rule between the field and the addon, and the
        // addon runs edge to edge behind it.
        //
        // So: `self-stretch` for full height, the seam as a left border, and no
        // padding of its own — a button child fills the cell instead of sitting
        // inset inside it with its own rounded corners. Square on the seam side,
        // the group's own corner on the outer side.
        "inline-end": [
          "order-last self-stretch border-l border-input-border-base p-0",
          "[&>button]:h-full [&>button]:shape-l-square [&>button]:shape-r-control [&>button]:px-3",
          // An icon-only addon is square rather than text-width.
          "[&>button:has(>svg:only-child)]:aspect-square [&>button:has(>svg:only-child)]:px-0",
          // The addon takes the same thickened edge as the field, so focus reads the
          // same whichever half of the group holds it. Its own ring would also sit
          // half outside the group and collide with the group's border.
          "[&>button]:focus-visible:shadow-none [&>button]:focus-visible:inset-ring-2 [&>button]:focus-visible:inset-ring-focus-ring",
          "has-[>kbd]:pr-2 has-[>kbd]:pl-2",
        ].join(" "),
        "block-start":
          "order-first w-full justify-start px-3 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-3 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 type-label shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--db-radius-2)-3px)] px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--db-radius-2)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 type-label text-text-subtle [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  size: _nativeSize,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        // The group draws focus, so the control must not. `Input` brings
        // `focus-visible:shadow-focus`, and `shadow-none` here does not cancel it —
        // the two sit in different variant groups, so both survive `cn()`. Left
        // alone it rings the control, which is a borderless flex child ending at the
        // seam, so the indicator came out as a hard box around the field only.
        "flex-1 shape-square border-0 bg-transparent shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none shape-square border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
