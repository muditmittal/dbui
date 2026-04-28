import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

function Table(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        __spreadValues({
          "data-slot": "table",
          className: cn("w-full caption-bottom text-[13px]", className)
        }, props)
      )
    }
  );
}
function TableHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "thead",
    __spreadValues({
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className)
    }, props)
  );
}
function TableBody(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tbody",
    __spreadValues({
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className)
    }, props)
  );
}
function TableFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tfoot",
    __spreadValues({
      "data-slot": "table-footer",
      className: cn(
        "border-t bg-muted/50 font-semibold [&>tr]:last:border-b-0",
        className
      )
    }, props)
  );
}
function TableRow(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tr",
    __spreadValues({
      "data-slot": "table-row",
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )
    }, props)
  );
}
function TableHead(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "th",
    __spreadValues({
      "data-slot": "table-head",
      className: cn(
        "h-10 px-2 text-left align-middle font-semibold whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )
    }, props)
  );
}
function TableCell(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "td",
    __spreadValues({
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )
    }, props)
  );
}
function TableCaption(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "caption",
    __spreadValues({
      "data-slot": "table-caption",
      className: cn("mt-4 text-[13px] text-muted-foreground", className)
    }, props)
  );
}
function TableCellIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "table-cell-icon",
      className: cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function TableCellTitle(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "table-cell-title",
      className: cn("flex items-start gap-2", className)
    }, props)
  );
}
function TableCellTitleContent(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "table-cell-title-content",
      className: cn(
        "flex min-w-0 flex-1 flex-col gap-0",
        className
      )
    }, props)
  );
}
function TableCellMeta(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "table-cell-meta",
      className: cn(
        "truncate text-[12px] leading-[16px] text-muted-foreground",
        className
      )
    }, props)
  );
}
function TableCellStatus(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "table-cell-status",
      className: cn("flex items-center gap-1", className)
    }, props)
  );
}
function TableCellUser(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "table-cell-user",
      className: cn("flex items-center gap-2", className)
    }, props)
  );
}
function TableCellExpandable(_a) {
  var _b = _a, {
    className,
    expanded = false
  } = _b, props = __objRest(_b, [
    "className",
    "expanded"
  ]);
  return /* @__PURE__ */ jsxs(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "table-cell-expandable",
      "data-expanded": expanded || void 0,
      "aria-expanded": expanded,
      className: cn(
        "flex items-center gap-2 text-left font-mono text-[13px] leading-[20px] text-accent-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: cn("size-4 shrink-0 transition-transform", expanded && "rotate-90"),
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M6 4L10 8L6 12",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ),
        props.children
      ]
    })
  );
}
function TableCellTime(_a) {
  var _b = _a, {
    className,
    barWidth = 20,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "barWidth",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "table-cell-time",
      className: cn("flex items-center gap-1", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "h-2 shrink-0 rounded-[1px] bg-accent-foreground",
            style: { width: barWidth }
          }
        ),
        children
      ]
    })
  );
}
function TableSortButton(_a) {
  var _b = _a, {
    className,
    sorted = false,
    direction = "asc"
  } = _b, props = __objRest(_b, [
    "className",
    "sorted",
    "direction"
  ]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "table-sort-button",
      "data-sorted": sorted || void 0,
      "data-direction": sorted ? direction : void 0,
      "aria-label": "Sort column",
      className: cn(
        "inline-flex size-5 items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground",
        sorted && "text-foreground",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "size-4",
          children: sorted && direction === "asc" ? /* @__PURE__ */ jsx("path", { d: "M4 10L8 6L12 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : sorted && direction === "desc" ? /* @__PURE__ */ jsx("path", { d: "M4 6L8 10L12 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("path", { d: "M4 6L8 3L12 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
            /* @__PURE__ */ jsx("path", { d: "M4 10L8 13L12 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
          ] })
        }
      )
    })
  );
}

export { Table, TableBody, TableCaption, TableCell, TableCellExpandable, TableCellIcon, TableCellMeta, TableCellStatus, TableCellTime, TableCellTitle, TableCellTitleContent, TableCellUser, TableFooter, TableHead, TableHeader, TableRow, TableSortButton };
//# sourceMappingURL=chunk-KTDI5YUZ.mjs.map
//# sourceMappingURL=chunk-KTDI5YUZ.mjs.map