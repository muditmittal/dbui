import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

function Card(_a) {
  var _b = _a, {
    className,
    size = "default",
    type = "post"
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "type"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card",
      "data-size": size,
      "data-type": type,
      className: cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-background py-4 text-[13px] text-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className
      )
    }, props)
  );
}
function CardHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-header",
      className: cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )
    }, props)
  );
}
function CardTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-title",
      className: cn(
        "text-[13px] leading-[20px] font-semibold group-data-[size=sm]/card:text-[13px]",
        className
      )
    }, props)
  );
}
function CardDescription(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-description",
      className: cn("text-[13px] text-muted-foreground", className)
    }, props)
  );
}
function CardAction(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )
    }, props)
  );
}
function CardContent(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className)
    }, props)
  );
}
function CardFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "card-footer",
      className: cn(
        "flex items-center rounded-b-lg border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )
    }, props)
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
//# sourceMappingURL=chunk-Q6A3SSX3.mjs.map
//# sourceMappingURL=chunk-Q6A3SSX3.mjs.map