import { Overflow } from './chunk-4XDLRFJP.mjs';
import { useRender } from './chunk-TVZRNYA7.mjs';
import { ChevronRight } from './chunk-SKOBVIBK.mjs';
import { mergeProps } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';

function Breadcrumb(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "nav",
    __spreadValues({
      "aria-label": "breadcrumb",
      "data-slot": "breadcrumb",
      className: cn(className)
    }, props)
  );
}
function BreadcrumbList(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "ol",
    __spreadValues({
      "data-slot": "breadcrumb-list",
      className: cn(
        "flex flex-wrap items-center gap-1.5 text-[13px] wrap-break-word text-muted-foreground",
        className
      )
    }, props)
  );
}
function BreadcrumbItem(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "li",
    __spreadValues({
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1", className)
    }, props)
  );
}
function BreadcrumbLink(_a) {
  var _b = _a, {
    className,
    render
  } = _b, props = __objRest(_b, [
    "className",
    "render"
  ]);
  return useRender({
    defaultTagName: "a",
    props: mergeProps(
      {
        className: cn("text-primary transition-colors hover:text-primary/80", className)
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link"
    }
  });
}
function BreadcrumbPage(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal text-foreground", className)
    }, props)
  );
}
function BreadcrumbSeparator(_a) {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "li",
    __spreadProps(__spreadValues({
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className)
    }, props), {
      children: children != null ? children : /* @__PURE__ */ jsx(ChevronRight, {})
    })
  );
}
function BreadcrumbEllipsis(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs(
    "span",
    __spreadProps(__spreadValues({
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          Overflow,
          {}
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
      ]
    })
  );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
//# sourceMappingURL=chunk-K4IF3ZCU.mjs.map
//# sourceMappingURL=chunk-K4IF3ZCU.mjs.map