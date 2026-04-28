import { RadioGroup, index_parts_exports } from './chunk-PTHMG4NM.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';

function RadioTileGroup(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroup,
    __spreadValues({
      "data-slot": "radio-tile-group",
      className: cn("grid gap-3", className)
    }, props)
  );
}
function RadioTile(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      "data-slot": "radio-tile",
      className: cn(
        "group/radio-tile relative flex flex-col gap-1 rounded-sm border border-input bg-background p-4 text-[13px] shadow-xs transition-all outline-none select-none hover:border-primary-hover active:border-primary-press data-checked:border-primary data-checked:shadow-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:border-disabled disabled:shadow-none disabled:text-disabled-foreground disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )
    }, props), {
      children
    })
  );
}
function RadioTileHeader(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "radio-tile-header",
      className: cn("flex items-center gap-2", className)
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "radio-tile-indicator",
            className: "ml-auto flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background group-data-checked/radio-tile:border-primary group-data-checked/radio-tile:bg-primary",
            children: /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-primary-foreground opacity-0 group-data-checked/radio-tile:opacity-100" })
          }
        )
      ]
    })
  );
}
function RadioTileTitle(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "radio-tile-title",
      className: cn("font-semibold text-foreground", className)
    }, props)
  );
}
function RadioTileDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "radio-tile-description",
      className: cn("text-[12px] text-muted-foreground", className)
    }, props)
  );
}
function RadioTileIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "radio-tile-icon",
      className: cn(
        "pointer-events-none shrink-0 text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}

export { RadioTile, RadioTileDescription, RadioTileGroup, RadioTileHeader, RadioTileIcon, RadioTileTitle };
//# sourceMappingURL=chunk-3GXKQPOC.mjs.map
//# sourceMappingURL=chunk-3GXKQPOC.mjs.map