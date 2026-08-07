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
 * - Filled hover/press: action-primary-hover/-press, action-negative-hover/-press
 * - Non-filled fill and states: action-default-base/-hover/-press. `selected` is a
 *   state a control is in, not a state it passes through, so a press on an
 *   unselected control reads the default family.
 * - Non-filled label: action-label-base/-hover/-press
 * - Disabled: per-variant (filled → bg-surface-disabled + inverse label, non-filled → transparent + text-text-disabled)
 * - Focus: filled → shadow-focus (white gap + blue ring), non-filled → border-2 border-focus-ring
 * - Focus on Danger: uses border-focus-ring (blue) NOT border-action-negative-base — consistent system focus ring
 * - Shadow: shadow-xs on filled/bordered variants (not ghost/link)
 */
export const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-1 border",
    "type-label whitespace-nowrap",
    "transition-all outline-none select-none",
    "disabled:pointer-events-none",
    "aria-invalid:border-action-negative-base aria-invalid:ring-2 aria-invalid:ring-action-negative-base/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-xs border-transparent bg-action-primary-base text-action-label-inverse-base",
          "hover:bg-action-primary-hover",
          "active:bg-action-primary-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-surface-disabled disabled:text-text-disabled disabled:shadow-none disabled:border-transparent",
        ].join(" "),
        outline: [
          "shadow-xs border-input-border-base",
          "hover:bg-action-default-hover hover:border-input-border-hover hover:text-action-label-hover",
          "active:bg-action-default-press active:border-focus-ring active:text-action-label-press",
          "focus-visible:border-2 focus-visible:border-focus-ring",
          "disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent disabled:shadow-none",
        ].join(" "),
        secondary: [
          // Resting text color is set in compoundVariants so it never competes
          // with the muted icon-only treatment.
          "shadow-xs border-transparent bg-action-default-base",
          "hover:bg-action-default-hover hover:text-action-label-hover",
          "active:bg-action-default-press active:text-action-label-press",
          "focus-visible:border-2 focus-visible:border-focus-ring",
          "disabled:bg-transparent disabled:text-text-disabled disabled:shadow-none",
        ].join(" "),
        ghost: [
          "border-transparent",
          "hover:bg-action-default-hover hover:text-action-label-hover",
          "active:bg-action-default-press active:text-action-label-press",
          "focus-visible:border-2 focus-visible:border-focus-ring",
          "disabled:text-text-disabled",
        ].join(" "),
        link: [
          "border-transparent text-link-base underline-offset-4",
          "!h-auto !rounded-none !px-0 !shadow-none",
          "hover:underline hover:text-link-hover",
          "active:underline active:text-link-press",
          "focus-visible:border-focus-ring",
          "disabled:text-text-disabled disabled:bg-transparent",
        ].join(" "),
        destructive: [
          "shadow-xs border-transparent bg-action-negative-base text-action-label-inverse-base",
          "hover:bg-action-negative-hover",
          "active:bg-action-negative-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-surface-disabled disabled:text-text-disabled disabled:shadow-none disabled:border-transparent",
        ].join(" "),
        danger: [
          "shadow-xs border-action-negative-base text-status-text-negative",
          "hover:border-action-negative-hover hover:text-action-negative-hover",
          "active:bg-action-negative-base/20 active:border-action-negative-press active:text-action-negative-press",
          "focus-visible:border-2 focus-visible:border-focus-ring focus-visible:shadow-none focus-visible:overflow-clip",
          "disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent disabled:shadow-none",
        ].join(" "),
      },
      size: {
        sm: "h-6 gap-1 px-2",
        md: "h-8 gap-1 px-3",
        // No color here. An icon-only button's icon color depends on the
        // variant it sits in, so it is set in compoundVariants below. Setting it
        // on the size would emit two competing text-* classes, and cn() joins
        // rather than merges, so CSS source order — not authoring order — would
        // decide the winner.
        "icon-sm": "size-6",
        "icon-md": "size-8",
      },
    },
    compoundVariants: [
      // Exactly one resting text color is ever emitted, because cn() joins
      // rather than merges — two competing text-* classes would be resolved by
      // CSS source order instead of by intent.
      {
        variant: ["secondary", "ghost"],
        size: ["sm", "md"],
        class: "text-action-label-base",
      },
      // Muted icon is the toolbar convention, but only on the neutral
      // non-filled variants. On a filled variant it would be a contrast
      // failure, and on danger it would drop the red.
      {
        variant: ["outline", "secondary", "ghost"],
        size: ["icon-sm", "icon-md"],
        class: "text-text-subtle",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
