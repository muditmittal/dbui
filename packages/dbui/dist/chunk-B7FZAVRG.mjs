import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';

function EditorTabs(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "editor-tabs",
      role: "tablist",
      className: cn(
        "flex items-center bg-muted border-b border-border",
        className
      )
    }, props)
  );
}
function EditorTab(_a) {
  var _b = _a, {
    className,
    active = false,
    closable = true,
    children,
    onClose
  } = _b, props = __objRest(_b, [
    "className",
    "active",
    "closable",
    "children",
    "onClose"
  ]);
  return /* @__PURE__ */ jsxs(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "editor-tab",
      role: "tab",
      "aria-selected": active,
      "data-active": active || void 0,
      className: cn(
        "group/editor-tab relative flex h-8 shrink-0 items-center gap-2 border-l border-r border-border px-2 py-1 text-[13px] leading-[20px] font-normal select-none",
        active ? "bg-background text-foreground" : "bg-transparent text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        closable && /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "editor-tab-close",
            role: "button",
            "aria-label": "Close tab",
            onClick: (e) => {
              e.stopPropagation();
              onClose == null ? void 0 : onClose();
            },
            className: cn(
              "inline-flex size-4 shrink-0 items-center justify-center",
              active ? "opacity-100" : "opacity-0 group-hover/editor-tab:opacity-100"
            ),
            children: "\xD7"
          }
        )
      ]
    })
  );
}
function EditorTabAddButton(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      "data-slot": "editor-tab-add",
      "aria-label": "Add tab",
      className: cn(
        "flex size-8 shrink-0 items-center justify-center rounded-sm p-2 text-muted-foreground hover:text-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: "+"
    })
  );
}
function EditorTabIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "editor-tab-icon",
      className: cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}

export { EditorTab, EditorTabAddButton, EditorTabIcon, EditorTabs };
//# sourceMappingURL=chunk-B7FZAVRG.mjs.map
//# sourceMappingURL=chunk-B7FZAVRG.mjs.map