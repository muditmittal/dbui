import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

function Tag(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "tag",
      className: cn(
        "inline-flex items-center gap-1 rounded-sm bg-muted px-1 py-0 text-[13px] leading-[20px] font-normal text-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )
    }, props), {
      children
    })
  );
}
function TagIcon(_a) {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadProps(__spreadValues({
      "data-slot": "tag-icon",
      className: cn("flex shrink-0 items-center", className)
    }, props), {
      children
    })
  );
}
function TagLabel(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "tag-label",
      className: cn("shrink-0 whitespace-nowrap", className)
    }, props)
  );
}
function TagValue(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        "data-slot": "tag-divider",
        className: "h-5 w-px shrink-0 bg-border",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      __spreadValues({
        "data-slot": "tag-value",
        className: cn("shrink-0 whitespace-nowrap text-muted-foreground", className)
      }, props)
    )
  ] });
}
function TagRemove(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "tag-remove",
      type: "button",
      "aria-label": "Remove tag",
      className: cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-sm p-0 text-muted-foreground hover:text-foreground",
        className
      )
    }, props), {
      children: "\xD7"
    })
  );
}

export { Tag, TagIcon, TagLabel, TagRemove, TagValue };
//# sourceMappingURL=chunk-4GTRFJCG.mjs.map
//# sourceMappingURL=chunk-4GTRFJCG.mjs.map