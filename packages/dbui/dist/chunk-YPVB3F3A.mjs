import { createDialogHandle, DialogViewport, DialogTrigger, DialogTitle, DialogPortal, DialogPopup, DialogHandle, DialogDescription, DialogClose, DialogBackdrop, useDialogRootContext, DialogStore, useDialogRoot, DialogRootContext } from './chunk-4FUS5W2N.mjs';
import { Button } from './chunk-RQBQDFLU.mjs';
import { Close } from './chunk-45GJTJ2K.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/dialog/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Backdrop: () => DialogBackdrop,
  Close: () => DialogClose,
  Description: () => DialogDescription,
  Handle: () => DialogHandle,
  Popup: () => DialogPopup,
  Portal: () => DialogPortal,
  Root: () => DialogRoot,
  Title: () => DialogTitle,
  Trigger: () => DialogTrigger,
  Viewport: () => DialogViewport,
  createHandle: () => createDialogHandle
});
function DialogRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal = false,
    modal = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const parentDialogRootContext = useDialogRootContext(true);
  const nested = Boolean(parentDialogRootContext);
  const store = useRefWithInit(() => {
    var _a;
    return (_a = handle == null ? void 0 : handle.store) != null ? _a : new DialogStore({
      open: defaultOpen,
      openProp,
      activeTriggerId: defaultTriggerIdProp,
      triggerIdProp,
      modal,
      disablePointerDismissal,
      nested
    });
  }).current;
  useOnFirstRender(() => {
    if (openProp === void 0 && store.state.open === false && defaultOpen === true) {
      store.update({
        open: true,
        activeTriggerId: defaultTriggerIdProp
      });
    }
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useSyncedValues({
    disablePointerDismissal,
    nested,
    modal
  });
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const payload = store.useState("payload");
  useDialogRoot({
    store,
    actionsRef,
    parentContext: parentDialogRootContext == null ? void 0 : parentDialogRootContext.store.context,
    onOpenChange,
    triggerIdProp
  });
  const contextValue = React.useMemo(() => ({
    store
  }), [store]);
  return /* @__PURE__ */ jsx(DialogRootContext.Provider, {
    value: contextValue,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
}
function Dialog(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "dialog" }, props));
}
function DialogTrigger2(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "dialog-trigger" }, props));
}
function DialogPortal2(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, __spreadValues({ "data-slot": "dialog-portal" }, props));
}
function DialogClose2(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Close, __spreadValues({ "data-slot": "dialog-close" }, props));
}
function DialogOverlay(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Backdrop,
    __spreadValues({
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-[var(--overlay)] duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )
    }, props)
  );
}
function DialogContent(_a) {
  var _b = _a, {
    className,
    children,
    showCloseButton = true,
    size = "normal"
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "showCloseButton",
    "size"
  ]);
  return /* @__PURE__ */ jsxs(DialogPortal2, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      index_parts_exports.Popup,
      __spreadProps(__spreadValues({
        "data-slot": "dialog-content",
        "data-size": size,
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-0 rounded-md border border-border bg-background text-[13px] shadow-lg duration-100 outline-none data-[size=normal]:sm:max-w-[640px] data-[size=wide]:sm:max-w-[880px] data-[size=extrawide]:sm:max-w-[1200px] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )
      }, props), {
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            index_parts_exports.Close,
            {
              "data-slot": "dialog-close",
              render: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-3 right-3",
                  size: "icon-md"
                }
              ),
              children: [
                /* @__PURE__ */ jsx(Close, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      })
    )
  ] });
}
function DialogHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 p-4", className)
    }, props)
  );
}
function DialogHeaderIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "dialog-header-icon",
      className: cn(
        "inline-flex size-10 items-center justify-center rounded-md bg-muted [&_svg:not([class*='size-'])]:size-6",
        className
      )
    }, props)
  );
}
function DialogFooter(_a) {
  var _b = _a, {
    className,
    showCloseButton = false,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "showCloseButton",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 border-t border-border p-4 sm:flex-row sm:justify-end",
        className
      )
    }, props), {
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsx(index_parts_exports.Close, { render: /* @__PURE__ */ jsx(Button, { variant: "outline" }), children: "Close" })
      ]
    })
  );
}
function DialogTitle2(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Title,
    __spreadValues({
      "data-slot": "dialog-title",
      className: cn("text-[22px] leading-[28px] font-semibold", className)
    }, props)
  );
}
function DialogDescription2(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Description,
    __spreadValues({
      "data-slot": "dialog-description",
      className: cn(
        "text-[13px] text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )
    }, props)
  );
}

export { Dialog, DialogClose2 as DialogClose, DialogContent, DialogDescription2 as DialogDescription, DialogFooter, DialogHeader, DialogHeaderIcon, DialogOverlay, DialogPortal2 as DialogPortal, DialogTitle2 as DialogTitle, DialogTrigger2 as DialogTrigger };
//# sourceMappingURL=chunk-YPVB3F3A.mjs.map
//# sourceMappingURL=chunk-YPVB3F3A.mjs.map