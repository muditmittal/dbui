import { cva } from "./cva"

/**
 * Shared button variant styles for DBUI.
 *
 * Variants: default/primary (primary filled), outline (bordered), secondary (grey filled),
 *           ghost (minimal), link (text-only), destructive (danger filled), danger (danger bordered)
 * Sizes:    sm (24px), md (32px), icon-sm (24×24), icon-md (32×32)
 *
 * Figma variant names → code values:
 *   Primary → "default", Outline → "outline", Secondary → "secondary",
 *   Ghost → "ghost", Link → "link", Destructive → "destructive", Danger → "danger"
 *
 * Figma component: "Button" (7 variants × 2 sizes × 6 states)
 * Figma component: "Icon Button" (6 variants × 2 sizes × 5 states) → uses icon-sm/icon-md sizes
 *
 * Token usage:
 * - Filled hover/press: --primary-hover, --primary-press, --destructive-hover, --destructive-press
 * - Non-filled hover/press bg: --hover (primary@8%), --press (primary@16%)
 * - Non-filled hover text: --primary-hover (outline/ghost), --accent-foreground (secondary)
 * - Non-filled press text: --primary-press (all non-filled)
 * - Disabled: per-variant (filled → bg-disabled + white text, non-filled → transparent + disabled-foreground)
 * - Focus: filled → shadow-focus (white gap + blue ring), non-filled → border-2 border-ring
 * - Focus on Danger: uses border-ring (blue) NOT border-destructive — consistent system focus ring
 * - Shadow: shadow-xs on filled/bordered variants (not ghost/link)
 */
export const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-sm border border-transparent",
    "text-[13px] leading-[20px] font-normal whitespace-nowrap",
    "transition-all outline-none select-none",
    "disabled:pointer-events-none",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-xs bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none disabled:border-transparent",
        ].join(" "),
        outline: [
          "shadow-xs border-input",
          "hover:bg-hover hover:border-primary hover:text-primary-hover",
          "active:bg-press active:border-primary-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:border-disabled disabled:text-disabled-foreground disabled:bg-transparent disabled:shadow-none",
        ].join(" "),
        secondary: [
          "shadow-xs bg-muted text-secondary-foreground",
          "hover:bg-hover hover:text-accent-foreground",
          "active:bg-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:bg-transparent disabled:text-disabled-foreground disabled:shadow-none",
        ].join(" "),
        ghost: [
          "text-foreground",
          "hover:bg-hover hover:text-primary-hover",
          "active:bg-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:text-disabled-foreground",
        ].join(" "),
        link: [
          "text-primary underline-offset-4",
          "!h-auto !rounded-none !px-0 !shadow-none",
          "hover:underline hover:text-primary-hover",
          "active:underline active:text-primary-press",
          "focus-visible:border-ring",
          "disabled:text-disabled-foreground disabled:bg-transparent",
        ].join(" "),
        destructive: [
          "shadow-xs bg-destructive text-destructive-foreground",
          "hover:bg-destructive-hover",
          "active:bg-destructive-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none disabled:border-transparent",
        ].join(" "),
        danger: [
          "shadow-xs border-destructive text-destructive",
          "hover:border-destructive-hover hover:text-destructive-hover",
          "active:bg-destructive/20 active:border-destructive-press active:text-destructive-press",
          "focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-none focus-visible:overflow-clip",
          "disabled:border-disabled disabled:text-disabled-foreground disabled:bg-transparent disabled:shadow-none",
        ].join(" "),
      },
      size: {
        sm: "h-6 gap-1 px-2",
        md: "h-8 gap-1 px-3",
        "icon-sm": "size-6 text-muted-foreground",
        "icon-md": "size-8 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
