import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

function KeyValuePair(_a) {
  var _b = _a, {
    className,
    layout = "vertical"
  } = _b, props = __objRest(_b, [
    "className",
    "layout"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "key-value-pair",
      "data-layout": layout,
      className: cn(
        "flex flex-col gap-0 text-[13px]",
        layout === "horizontal" ? "w-full" : layout === "flexible" ? "w-full" : "w-[280px]",
        className
      )
    }, props)
  );
}
function KeyValueTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "key-value-title",
      className: cn(
        "flex items-center gap-1 py-2 text-[13px] font-semibold text-foreground",
        className
      )
    }, props)
  );
}
function KeyValueItem(_a) {
  var _b = _a, {
    className,
    layout = "vertical"
  } = _b, props = __objRest(_b, [
    "className",
    "layout"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "key-value-row",
      className: cn(
        "flex items-center py-0.5",
        layout === "vertical" ? "flex-col items-start gap-0.5" : "flex-row gap-0",
        className
      )
    }, props)
  );
}
function KeyValueKey(_a) {
  var _b = _a, {
    className,
    layout = "horizontal"
  } = _b, props = __objRest(_b, [
    "className",
    "layout"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "key-value-key",
      className: cn(
        "overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground",
        layout === "vertical" ? "w-full shrink-0 text-[12px] leading-[16px]" : layout === "flexible" ? "min-w-0 flex-1 text-[13px] leading-[20px]" : "w-[120px] shrink-0 text-[13px] leading-[20px]",
        className
      )
    }, props)
  );
}
function KeyValueValue(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "key-value-value",
      className: cn(
        "flex min-h-px min-w-px flex-1 items-center gap-2 text-[13px] leading-[20px] text-foreground",
        className
      )
    }, props)
  );
}
function KeyValueValueEnd(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "key-value-value-end",
      className: cn(
        "flex min-h-px min-w-px flex-1 items-center justify-end gap-2 text-[13px] leading-[20px] text-foreground text-right",
        className
      )
    }, props)
  );
}
function KeyValueGrid(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "key-value-grid",
      className: cn(
        "flex w-full gap-4",
        className
      )
    }, props)
  );
}

export { KeyValueGrid, KeyValueItem, KeyValueKey, KeyValuePair, KeyValueTitle, KeyValueValue, KeyValueValueEnd };
//# sourceMappingURL=chunk-MJUOE3IO.mjs.map
//# sourceMappingURL=chunk-MJUOE3IO.mjs.map