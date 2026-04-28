import { DialogViewport, DialogTrigger, DialogTitle, DialogPortal, DialogPopup, DialogHandle, DialogDescription, DialogClose, DialogBackdrop, useDialogRootContext, DialogStore, useDialogRoot, DialogRootContext } from './chunk-4FUS5W2N.mjs';
import { Button } from './chunk-RQBQDFLU.mjs';
import { useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/alert-dialog/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Backdrop: () => DialogBackdrop,
  Close: () => DialogClose,
  Description: () => DialogDescription,
  Handle: () => DialogHandle,
  Popup: () => DialogPopup,
  Portal: () => DialogPortal,
  Root: () => AlertDialogRoot,
  Title: () => DialogTitle,
  Trigger: () => DialogTrigger,
  Viewport: () => DialogViewport,
  createHandle: () => createAlertDialogHandle
});
function AlertDialogRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const parentDialogRootContext = useDialogRootContext();
  const nested = Boolean(parentDialogRootContext);
  const store = useRefWithInit(() => {
    var _a;
    return (_a = handle == null ? void 0 : handle.store) != null ? _a : new DialogStore({
      open: defaultOpen,
      openProp,
      activeTriggerId: defaultTriggerIdProp,
      triggerIdProp,
      modal: true,
      disablePointerDismissal: true,
      nested,
      role: "alertdialog"
    });
  }).current;
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useSyncedValue("nested", nested);
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

// ../../node_modules/@base-ui/react/esm/alert-dialog/handle.js
function createAlertDialogHandle() {
  return new DialogHandle(new DialogStore({
    modal: true,
    disablePointerDismissal: true,
    role: "alertdialog"
  }));
}
function AlertDialog(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "alert-dialog" }, props));
}
function AlertDialogTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "alert-dialog-trigger" }, props));
}
function AlertDialogPortal(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, __spreadValues({ "data-slot": "alert-dialog-portal" }, props));
}
function AlertDialogOverlay(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Backdrop,
    __spreadValues({
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-[var(--overlay)] duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )
    }, props)
  );
}
function AlertDialogContent(_a) {
  var _b = _a, {
    className,
    size = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      index_parts_exports.Popup,
      __spreadValues({
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md border border-border bg-background p-4 shadow-lg duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )
      }, props)
    )
  ] });
}
function AlertDialogHeader(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )
    }, props)
  );
}
function AlertDialogFooter(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-dialog-footer",
      className: cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-lg p-4 pt-0 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )
    }, props)
  );
}
function AlertDialogIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-dialog-icon",
      className: cn(
        "shrink-0 inline-flex h-5 items-center justify-center py-0.5 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function AlertDialogTitle(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Title,
    __spreadValues({
      "data-slot": "alert-dialog-title",
      className: cn(
        "text-[13px] font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )
    }, props)
  );
}
function AlertDialogDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Description,
    __spreadValues({
      "data-slot": "alert-dialog-description",
      className: cn(
        "text-[13px] text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )
    }, props)
  );
}
function AlertDialogAction(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    Button,
    __spreadValues({
      "data-slot": "alert-dialog-action",
      className: cn(className)
    }, props)
  );
}
function AlertDialogCancel(_a) {
  var _b = _a, {
    className,
    variant = "outline",
    size = "md"
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Close,
    __spreadValues({
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ jsx(Button, { variant, size })
    }, props)
  );
}

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogIcon, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
//# sourceMappingURL=chunk-6K33DUY4.mjs.map
//# sourceMappingURL=chunk-6K33DUY4.mjs.map