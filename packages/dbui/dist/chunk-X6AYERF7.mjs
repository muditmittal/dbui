import { cva } from './chunk-7TQTDX5Q.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

var alertVariants = cva(
  "group/alert flex w-full items-start gap-2 rounded-md border p-3 text-[13px] leading-[20px]",
  {
    variants: {
      variant: {
        info: "bg-muted border-border",
        warning: "bg-surface-warning border-warning",
        success: "bg-surface-success border-success",
        danger: "bg-surface-danger border-destructive"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);
function Alert(_a) {
  var _b = _a, {
    className,
    variant
  } = _b, props = __objRest(_b, [
    "className",
    "variant"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert",
      "data-variant": variant,
      role: "alert",
      className: cn(alertVariants({ variant }), className)
    }, props)
  );
}
function AlertIcon(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-icon",
      className: cn(
        "flex shrink-0 items-center py-0.5 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=danger]/alert:text-destructive",
        "group-data-[variant=warning]/alert:text-warning",
        "group-data-[variant=success]/alert:text-success",
        "group-data-[variant=info]/alert:text-foreground",
        className
      )
    }, props)
  );
}
function AlertContent(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-content",
      className: cn("flex min-w-0 flex-1 flex-col gap-1", className)
    }, props)
  );
}
function AlertTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-title",
      className: cn(
        "font-semibold text-[13px] leading-[20px] group-data-[variant=danger]/alert:text-destructive group-data-[variant=warning]/alert:text-warning group-data-[variant=success]/alert:text-success group-data-[variant=info]/alert:text-foreground",
        className
      )
    }, props)
  );
}
function AlertDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-description",
      className: cn("text-[13px] leading-[20px] text-foreground", className)
    }, props)
  );
}
function AlertAction(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-action",
      className: cn("shrink-0", className)
    }, props)
  );
}
function AlertClose(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  var _a2;
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "alert-close",
      type: "button",
      "aria-label": "Dismiss",
      className: cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: (_a2 = props.children) != null ? _a2 : /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M12 4L4 12M4 4L12 12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
    })
  );
}

export { Alert, AlertAction, AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle };
//# sourceMappingURL=chunk-X6AYERF7.mjs.map
//# sourceMappingURL=chunk-X6AYERF7.mjs.map