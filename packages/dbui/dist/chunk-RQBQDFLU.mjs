import { buttonVariants } from './chunk-DIGGK24S.mjs';
import { Loading } from './chunk-6R4B2ATK.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { useRenderElement } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

var Button = /* @__PURE__ */ React.forwardRef(function Button2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled = false,
    focusableWhenDisabled = false,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "focusableWhenDisabled",
    "nativeButton"
  ]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [elementProps, getButtonProps]
  });
});
if (process.env.NODE_ENV !== "production") Button.displayName = "Button";
function Button3(_a) {
  var _b = _a, {
    className,
    variant = "default",
    size = "md",
    loading = false,
    loadingText,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "loading",
    "loadingText",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    Button,
    __spreadProps(__spreadValues({
      "data-slot": "button",
      "data-filled": variant === "default" || variant === "destructive" || void 0,
      disabled: props.disabled,
      "aria-busy": loading || void 0,
      "aria-disabled": loading || props.disabled || void 0,
      className: cn(
        buttonVariants({ variant, size, className }),
        loading && "pointer-events-none"
      )
    }, props), {
      children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loading, { className: "animate-spin" }),
        loadingText != null ? loadingText : /* @__PURE__ */ jsx("span", { className: "opacity-0", children })
      ] }) : children
    })
  );
}
function ButtonIcon(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadProps(__spreadValues({
      "data-slot": "button-icon",
      className: cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "text-muted-foreground",
        "group-data-[filled]/button:text-inherit",
        className
      )
    }, props), {
      children
    })
  );
}
function ButtonChevron(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadProps(__spreadValues({
      "data-slot": "button-chevron",
      className: cn(
        "pointer-events-none shrink-0 text-current/60 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: children != null ? children : /* @__PURE__ */ jsx(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "size-4",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M4 6L8 10L12 6",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    })
  );
}

export { Button3 as Button, ButtonChevron, ButtonIcon };
//# sourceMappingURL=chunk-RQBQDFLU.mjs.map
//# sourceMappingURL=chunk-RQBQDFLU.mjs.map