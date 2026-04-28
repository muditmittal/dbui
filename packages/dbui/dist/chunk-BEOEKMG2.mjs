import { Overflow } from './chunk-4XDLRFJP.mjs';
import { ChevronRight } from './chunk-SKOBVIBK.mjs';
import { Button } from './chunk-RQBQDFLU.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import { forwardRef } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

var ChevronLeft = forwardRef(
  (_a, ref) => {
    var _b = _a, { className, size = 16 } = _b, props = __objRest(_b, ["className", "size"]);
    return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({ ref, className }, props), { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M7.083 8 10 10.947 8.958 12 5 8l3.958-4L10 5.053z",
        clipRule: "evenodd"
      }
    ) }));
  }
);
ChevronLeft.displayName = "ChevronLeft";
function Pagination(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "nav",
    __spreadValues({
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className)
    }, props)
  );
}
function PaginationContent(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "ul",
    __spreadValues({
      "data-slot": "pagination-content",
      className: cn("flex items-center gap-0.5", className)
    }, props)
  );
}
function PaginationItem(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx("li", __spreadValues({ "data-slot": "pagination-item" }, props));
}
function PaginationLink(_a) {
  var _b = _a, {
    className,
    isActive,
    size = "icon-md"
  } = _b, props = __objRest(_b, [
    "className",
    "isActive",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size,
      className: cn(isActive && "border border-ring bg-accent text-foreground hover:bg-accent", className),
      nativeButton: false,
      render: /* @__PURE__ */ jsx(
        "a",
        __spreadValues({
          "aria-current": isActive ? "page" : void 0,
          "data-slot": "pagination-link",
          "data-active": isActive
        }, props)
      )
    }
  );
}
function PaginationPrevious(_a) {
  var _b = _a, {
    className,
    text = "Previous"
  } = _b, props = __objRest(_b, [
    "className",
    "text"
  ]);
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    __spreadProps(__spreadValues({
      "aria-label": "Go to previous page",
      size: "md",
      className: cn("pl-1.5!", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx(ChevronLeft, { "data-icon": "inline-start" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: text })
      ]
    })
  );
}
function PaginationNext(_a) {
  var _b = _a, {
    className,
    text = "Next"
  } = _b, props = __objRest(_b, [
    "className",
    "text"
  ]);
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    __spreadProps(__spreadValues({
      "aria-label": "Go to next page",
      size: "md",
      className: cn("pr-1.5!", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: text }),
        /* @__PURE__ */ jsx(ChevronRight, { "data-icon": "inline-end" })
      ]
    })
  );
}
function PaginationEllipsis(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs(
    "span",
    __spreadProps(__spreadValues({
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          Overflow,
          {}
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    })
  );
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
//# sourceMappingURL=chunk-BEOEKMG2.mjs.map
//# sourceMappingURL=chunk-BEOEKMG2.mjs.map