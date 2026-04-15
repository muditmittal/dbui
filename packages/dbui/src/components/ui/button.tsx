"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "../../lib/button-variants"
import { cn } from "../../lib/utils"
import { Loading as LoadingIcon } from "../icons/Loading"

/**
 * @standard Button
 * @guideline Use to trigger all click actions, no state memory
 * @guideline Default to Outline for text, Ghost for icon buttons
 * @constraint Avoid icons for Menu button variants
 * @constraint No icons for Link variant - only exception is trailing NewWindow for external links
 * @constraint Limit to one Primary button on a page or dialog
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=477-773
 */

/**
 * Button — primary action component.
 *
 * Composition (maps to Figma .ActionLabel inner component):
 *   <Button>Label</Button>                          — text only
 *   <Button><ButtonIcon><Plus /></ButtonIcon>Label</Button>  — icon + label
 *   <Button><ButtonIcon><Plus /></ButtonIcon>Label<ButtonChevron /></Button>  — menu button
 *   <Button size="icon-md"><Plus /></Button>         — icon only
 *
 * @constraints
 * - LINK variant: NO icons. No ButtonIcon, no ButtonChevron. Only allowed trailing
 *   icon is NewWindow for external links.
 * - GHOST variant: prefer icon-only (size icon-sm/icon-md). Ghost with icon+label
 *   competes visually with Outline. Use ghost for toolbar icon buttons.
 * - ICON-ONLY (size icon-sm/icon-md): MUST have aria-label for accessibility.
 * - MENU TRIGGER (with ButtonChevron): avoid leading ButtonIcon. The chevron is
 *   the affordance. Prefer outline or secondary variant — not primary.
 * - DESTRUCTIVE: should only appear inside AlertDialog or as the final confirmed action.
 *   Never as the first button a user encounters.
 */
function Button({
  className,
  variant = "default",
  size = "md",
  loading = false,
  loadingText,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingText?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={props.disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || props.disabled || undefined}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "pointer-events-none"
      )}
      {...props}
    >
      {loading ? (
        <>
          <LoadingIcon className="animate-spin" />
          {loadingText ?? <span className="opacity-0">{children}</span>}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

/**
 * ButtonIcon — leading or trailing icon slot inside Button.
 * Maps to Figma .ActionLabel "Show Icon" + "Icon" instance swap.
 *
 * Usage: <Button><ButtonIcon><SearchIcon /></ButtonIcon>Search</Button>
 */
function ButtonIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-icon"
      className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * ButtonChevron — trailing chevron for menu-trigger buttons.
 * Maps to Figma .ActionLabel "Show Menu" + "Menu" instance swap (default: ChevronDown).
 *
 * Usage: <Button>Options<ButtonChevron /></Button>
 */
function ButtonChevron({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-chevron"
      className={cn(
        "pointer-events-none shrink-0 text-current/60 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

export { Button, ButtonIcon, ButtonChevron }
export { buttonVariants } from "../../lib/button-variants"
