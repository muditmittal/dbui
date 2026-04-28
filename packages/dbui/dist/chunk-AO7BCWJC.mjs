import { ChevronDown } from './chunk-3L5IV4F2.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

function Navbar(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "nav",
    __spreadValues({
      "data-slot": "navbar",
      className: cn(
        "flex w-full flex-col",
        className
      )
    }, props)
  );
}
function NavbarSection(_a) {
  var _b = _a, {
    className,
    children,
    defaultExpanded = true
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "defaultExpanded"
  ]);
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const childArray = React.Children.toArray(children);
  childArray.find(
    (child) => {
      var _a2;
      return React.isValidElement(child) && ((_a2 = child.props) == null ? void 0 : _a2["data-slot"]) === "navbar-section-header";
    }
  );
  childArray.filter(
    (child) => {
      var _a2;
      return !(React.isValidElement(child) && ((_a2 = child.props) == null ? void 0 : _a2["data-slot"]) === "navbar-section-header");
    }
  );
  return /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "navbar-section",
      className: cn("flex flex-col border-t border-border pt-2 mt-2", className)
    }, props), {
      children: React.Children.map(children, (child) => {
        var _a2;
        if (React.isValidElement(child) && ((_a2 = child.type) == null ? void 0 : _a2.displayName) === "NavbarSectionHeader") {
          return React.cloneElement(child, {
            expanded,
            onToggle: () => setExpanded(!expanded)
          });
        }
        if (expanded) return child;
        return null;
      })
    })
  );
}
function NavbarSectionHeader(_a) {
  var _b = _a, {
    className,
    expanded = true,
    onToggle,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "expanded",
    "onToggle",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    "button",
    __spreadProps(__spreadValues({
      type: "button",
      "data-slot": "navbar-section-header",
      "data-expanded": expanded || void 0,
      "aria-expanded": expanded,
      onClick: onToggle,
      className: cn(
        "flex w-full items-center gap-1 px-2 py-1 text-[12px] leading-[16px] text-muted-foreground hover:text-foreground",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-left", children }),
        /* @__PURE__ */ jsx(
          ChevronDown,
          {
            className: cn("size-3 shrink-0 text-muted-foreground transition-transform", !expanded && "-rotate-90")
          }
        )
      ]
    })
  );
}
NavbarSectionHeader.displayName = "NavbarSectionHeader";
function NavbarItem(_a) {
  var _b = _a, {
    className,
    active = false
  } = _b, props = __objRest(_b, [
    "className",
    "active"
  ]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadValues({
      "data-slot": "navbar-item",
      "data-active": active || void 0,
      className: cn(
        "flex h-7 w-full items-center gap-2 rounded-sm px-2 text-[13px] leading-[20px] font-normal text-foreground text-left",
        "hover:bg-hover",
        active && "bg-accent text-accent-foreground font-semibold [&_[data-slot=navbar-item-icon]]:text-accent-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function NavbarItemIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "navbar-item-icon",
      className: cn(
        "pointer-events-none flex shrink-0 items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function NavbarNewButton(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadValues({
      "data-slot": "navbar-new-button",
      className: cn(
        "flex h-8 w-full items-center gap-2 rounded-lg bg-background px-3 shadow-md text-[13px] leading-[20px] font-semibold text-secondary-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}

export { Navbar, NavbarItem, NavbarItemIcon, NavbarNewButton, NavbarSection, NavbarSectionHeader };
//# sourceMappingURL=chunk-AO7BCWJC.mjs.map
//# sourceMappingURL=chunk-AO7BCWJC.mjs.map