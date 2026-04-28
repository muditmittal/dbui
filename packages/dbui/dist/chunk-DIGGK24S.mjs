import { cva } from './chunk-7TQTDX5Q.mjs';

// src/lib/button-variants.ts
var buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-sm border",
    "text-[13px] leading-[20px] font-normal whitespace-nowrap",
    "transition-all outline-none select-none",
    "disabled:pointer-events-none",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-xs border-transparent bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none disabled:border-transparent"
        ].join(" "),
        outline: [
          "shadow-xs border-input",
          "hover:bg-hover hover:border-primary hover:text-primary-hover",
          "active:bg-press active:border-primary-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:border-disabled disabled:text-disabled-foreground disabled:bg-transparent disabled:shadow-none"
        ].join(" "),
        secondary: [
          "shadow-xs border-transparent bg-muted text-secondary-foreground",
          "hover:bg-hover hover:text-accent-foreground",
          "active:bg-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:bg-transparent disabled:text-disabled-foreground disabled:shadow-none"
        ].join(" "),
        ghost: [
          "border-transparent text-foreground",
          "hover:bg-hover hover:text-primary-hover",
          "active:bg-press active:text-primary-press",
          "focus-visible:border-2 focus-visible:border-ring",
          "disabled:text-disabled-foreground"
        ].join(" "),
        link: [
          "border-transparent text-primary underline-offset-4",
          "!h-auto !rounded-none !px-0 !shadow-none",
          "hover:underline hover:text-primary-hover",
          "active:underline active:text-primary-press",
          "focus-visible:border-ring",
          "disabled:text-disabled-foreground disabled:bg-transparent"
        ].join(" "),
        destructive: [
          "shadow-xs border-transparent bg-destructive text-destructive-foreground",
          "hover:bg-destructive-hover",
          "active:bg-destructive-press",
          "focus-visible:shadow-focus focus-visible:overflow-clip",
          "disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none disabled:border-transparent"
        ].join(" "),
        danger: [
          "shadow-xs border-destructive text-destructive",
          "hover:border-destructive-hover hover:text-destructive-hover",
          "active:bg-destructive/20 active:border-destructive-press active:text-destructive-press",
          "focus-visible:border-2 focus-visible:border-ring focus-visible:shadow-none focus-visible:overflow-clip",
          "disabled:border-disabled disabled:text-disabled-foreground disabled:bg-transparent disabled:shadow-none"
        ].join(" ")
      },
      size: {
        sm: "h-6 gap-1 px-2",
        md: "h-8 gap-1 px-3",
        "icon-sm": "size-6 text-muted-foreground",
        "icon-md": "size-8 text-muted-foreground"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export { buttonVariants };
//# sourceMappingURL=chunk-DIGGK24S.mjs.map
//# sourceMappingURL=chunk-DIGGK24S.mjs.map