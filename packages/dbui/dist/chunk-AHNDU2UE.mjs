import { Toggle } from './chunk-XSEYRSXR.mjs';
import { cva } from './chunk-7TQTDX5Q.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

var toggleVariants = cva(
  [
    "group/toggle inline-flex items-center justify-center gap-1",
    "rounded-sm border",
    "text-[13px] leading-[20px] font-normal whitespace-nowrap",
    "transition-all outline-none select-none",
    "text-foreground",
    "hover:bg-hover",
    "active:bg-press",
    "focus-visible:border-2 focus-visible:border-ring",
    "disabled:pointer-events-none disabled:text-disabled-foreground",
    "aria-pressed:bg-active aria-pressed:border-primary aria-pressed:text-accent-foreground",
    "data-[state=on]:bg-active data-[state=on]:border-primary data-[state=on]:text-accent-foreground",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent",
        filter: "border-input shadow-xs hover:border-primary disabled:border-disabled disabled:shadow-none aria-pressed:border-primary data-[state=on]:border-primary",
        pill: [
          "shadow-xs border-input bg-transparent gap-2 rounded-full",
          "hover:bg-hover hover:border-primary",
          "aria-pressed:bg-active aria-pressed:text-primary-press aria-pressed:border-primary aria-pressed:shadow-none",
          "data-[state=on]:bg-active data-[state=on]:text-primary-press data-[state=on]:border-primary data-[state=on]:shadow-none",
          "disabled:border-disabled disabled:shadow-none"
        ].join(" "),
        icon: "border-transparent bg-transparent"
      },
      size: {
        sm: "h-6 min-w-6 px-2",
        md: "h-8 min-w-8 px-3",
        "icon-sm": "size-6",
        "icon-md": "size-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function Toggle2(_a) {
  var _b = _a, {
    className,
    variant = "default",
    size = "md"
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    Toggle,
    __spreadValues({
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className }))
    }, props)
  );
}
function FilterToggle(_a) {
  var _b = _a, {
    className,
    size = "md",
    children,
    defaultPressed,
    pressed: controlledPressed,
    onPressedChange
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "children",
    "defaultPressed",
    "pressed",
    "onPressedChange"
  ]);
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed != null ? defaultPressed : false);
  const isPressed = controlledPressed != null ? controlledPressed : internalPressed;
  return /* @__PURE__ */ jsxs(
    Toggle,
    __spreadProps(__spreadValues({
      "data-slot": "toggle",
      pressed: controlledPressed,
      defaultPressed,
      onPressedChange: (pressed, event) => {
        setInternalPressed(pressed);
        onPressedChange == null ? void 0 : onPressedChange(pressed, event);
      },
      className: cn(toggleVariants({ variant: "filter", size, className }))
    }, props), {
      children: [
        isPressed ? /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "size-4 shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M3 8.5L6.5 12L13 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsx("span", { className: "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input" }),
        children
      ]
    })
  );
}

export { FilterToggle, Toggle2 as Toggle, toggleVariants };
//# sourceMappingURL=chunk-AHNDU2UE.mjs.map
//# sourceMappingURL=chunk-AHNDU2UE.mjs.map