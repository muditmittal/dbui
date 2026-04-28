import { popupStoreSelectors, useTriggerDataForwarding, createInitialPopupStoreState, useImplicitActiveTrigger, useOpenStateTransitions } from './chunk-2ZE5P47Q.mjs';
import { InternalBackdrop, useOpenInteractionType, useScrollLock } from './chunk-4AAVJQFL.mjs';
import { popupStateMapping, CommonPopupDataAttributes, createSelector, FloatingFocusManager, FloatingPortal, useClick, useInteractions, triggerOpenStateMapping, ReactStore, PopupTriggerMap, useSyncedFloatingRootContext, useRole, useDismiss } from './chunk-PSMHWWS3.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { COMPOSITE_KEYS } from './chunk-QGKCYW24.mjs';
import { getTarget, contains } from './chunk-FQ4RTFU7.mjs';
import { transitionStatusMapping, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useRenderElement, formatErrorMessage_default, CLICK_TRIGGER_IDENTIFIER } from './chunk-I44XWQG6.mjs';
import { __spreadValues, __spreadProps, __objRest, __publicField } from './chunk-LQPATFHW.mjs';
import * as React12 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

var DialogRootContext = /* @__PURE__ */ React12.createContext(void 0);
if (process.env.NODE_ENV !== "production") DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
  const dialogRootContext = React12.useContext(DialogRootContext);
  if (optional === false && dialogRootContext === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>." : formatErrorMessage_default(27));
  }
  return dialogRootContext;
}

// ../../node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
var stateAttributesMapping = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var DialogBackdrop = /* @__PURE__ */ React12.forwardRef(function DialogBackdrop2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    forceRender = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "forceRender"
  ]);
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  const nested = store.useState("nested");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: [store.context.backdropRef, forwardedRef],
    stateAttributesMapping,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    enabled: forceRender || !nested
  });
});
if (process.env.NODE_ENV !== "production") DialogBackdrop.displayName = "DialogBackdrop";
var DialogClose = /* @__PURE__ */ React12.forwardRef(function DialogClose2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled = false,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton"
  ]);
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  function handleClick(event) {
    if (open) {
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.closePress, event.nativeEvent));
    }
  }
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const state = {
    disabled
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick: handleClick
    }, elementProps, getButtonProps]
  });
});
if (process.env.NODE_ENV !== "production") DialogClose.displayName = "DialogClose";
var DialogDescription = /* @__PURE__ */ React12.forwardRef(function DialogDescription2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id"
  ]);
  const {
    store
  } = useDialogRootContext();
  const id = useBaseUiId(idProp);
  store.useSyncedValueWithCleanup("descriptionElementId", id);
  return useRenderElement("p", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") DialogDescription.displayName = "DialogDescription";

// ../../node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js
var DialogPopupCssVars = /* @__PURE__ */ (function(DialogPopupCssVars2) {
  DialogPopupCssVars2["nestedDialogs"] = "--nested-dialogs";
  return DialogPopupCssVars2;
})({});

// ../../node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js
var DialogPopupDataAttributes = (function(DialogPopupDataAttributes2) {
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogPopupDataAttributes2["nested"] = "data-nested";
  DialogPopupDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogPopupDataAttributes2;
})({});
var DialogPortalContext = /* @__PURE__ */ React12.createContext(void 0);
if (process.env.NODE_ENV !== "production") DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
  const value = React12.useContext(DialogPortalContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Dialog.Portal> is missing." : formatErrorMessage_default(26));
  }
  return value;
}
var stateAttributesMapping2 = __spreadProps(__spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping), {
  nestedDialogOpen(value) {
    return value ? {
      [DialogPopupDataAttributes.nestedDialogOpen]: ""
    } : null;
  }
});
var DialogPopup = /* @__PURE__ */ React12.forwardRef(function DialogPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    finalFocus,
    initialFocus,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "finalFocus",
    "initialFocus",
    "render"
  ]);
  const {
    store
  } = useDialogRootContext();
  const descriptionElementId = store.useState("descriptionElementId");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const floatingRootContext = store.useState("floatingRootContext");
  const rootPopupProps = store.useState("popupProps");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const nested = store.useState("nested");
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const titleElementId = store.useState("titleElementId");
  const transitionStatus = store.useState("transitionStatus");
  const role = store.useState("role");
  useDialogPortalContext();
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      var _a2, _b;
      if (open) {
        (_b = (_a2 = store.context).onOpenChangeComplete) == null ? void 0 : _b.call(_a2, true);
      }
    }
  });
  function defaultInitialFocus(interactionType) {
    if (interactionType === "touch") {
      return store.context.popupRef.current;
    }
    return true;
  }
  const resolvedInitialFocus = initialFocus === void 0 ? defaultInitialFocus : initialFocus;
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = {
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  };
  const element = useRenderElement("div", componentProps, {
    state,
    props: [rootPopupProps, {
      "aria-labelledby": titleElementId != null ? titleElementId : void 0,
      "aria-describedby": descriptionElementId != null ? descriptionElementId : void 0,
      role,
      tabIndex: -1,
      hidden: !mounted,
      onKeyDown(event) {
        if (COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      },
      style: {
        [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      }
    }, elementProps],
    ref: [forwardedRef, store.context.popupRef, store.useStateSetter("popupElement")],
    stateAttributesMapping: stateAttributesMapping2
  });
  return /* @__PURE__ */ jsx(FloatingFocusManager, {
    context: floatingRootContext,
    openInteractionType: openMethod,
    disabled: !mounted,
    closeOnFocusOut: !disablePointerDismissal,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    modal: modal !== false,
    restoreFocus: "popup",
    children: element
  });
});
if (process.env.NODE_ENV !== "production") DialogPopup.displayName = "DialogPopup";
var DialogPortal = /* @__PURE__ */ React12.forwardRef(function DialogPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const {
    store
  } = useDialogRootContext();
  const mounted = store.useState("mounted");
  const modal = store.useState("modal");
  const open = store.useState("open");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(DialogPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsxs(FloatingPortal, __spreadProps(__spreadValues({
      ref: forwardedRef
    }, portalProps), {
      children: [mounted && modal === true && /* @__PURE__ */ jsx(InternalBackdrop, {
        ref: store.context.internalBackdropRef,
        inert: inertValue(!open)
      }), props.children]
    }))
  });
});
if (process.env.NODE_ENV !== "production") DialogPortal.displayName = "DialogPortal";
var DialogTitle = /* @__PURE__ */ React12.forwardRef(function DialogTitle2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id"
  ]);
  const {
    store
  } = useDialogRootContext();
  const id = useBaseUiId(idProp);
  store.useSyncedValueWithCleanup("titleElementId", id);
  return useRenderElement("h2", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") DialogTitle.displayName = "DialogTitle";
var DialogTrigger = /* @__PURE__ */ React12.forwardRef(function DialogTrigger2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    render,
    className,
    disabled = false,
    nativeButton = true,
    id: idProp,
    payload,
    handle
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton",
    "id",
    "payload",
    "handle"
  ]);
  const dialogRootContext = useDialogRootContext(true);
  const store = (_b = handle == null ? void 0 : handle.store) != null ? _b : dialogRootContext == null ? void 0 : dialogRootContext.store;
  if (!store) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle." : formatErrorMessage_default(79));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const floatingContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const triggerElementRef = React12.useRef(null);
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const click = useClick(floatingContext, {
    enabled: floatingContext != null
  });
  const localInteractionProps = useInteractions([click]);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  return useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [localInteractionProps.getReferenceProps(), rootTriggerProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId
    }, elementProps, getButtonProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
});
if (process.env.NODE_ENV !== "production") DialogTrigger.displayName = "DialogTrigger";

// ../../node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js
var DialogViewportDataAttributes = (function(DialogViewportDataAttributes2) {
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogViewportDataAttributes2["nested"] = "data-nested";
  DialogViewportDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogViewportDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
var stateAttributesMapping3 = __spreadProps(__spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping), {
  nested(value) {
    return value ? {
      [DialogViewportDataAttributes.nested]: ""
    } : null;
  },
  nestedDialogOpen(value) {
    return value ? {
      [DialogViewportDataAttributes.nestedDialogOpen]: ""
    } : null;
  }
});
var DialogViewport = /* @__PURE__ */ React12.forwardRef(function DialogViewport2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    children
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "children"
  ]);
  const keepMounted = useDialogPortalContext();
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  const nested = store.useState("nested");
  const transitionStatus = store.useState("transitionStatus");
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
  const mounted = store.useState("mounted");
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = {
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  };
  const shouldRender = keepMounted || mounted;
  return useRenderElement("div", componentProps, {
    enabled: shouldRender,
    state,
    ref: [forwardedRef, store.useStateSetter("viewportElement")],
    stateAttributesMapping: stateAttributesMapping3,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: !open ? "none" : void 0
      },
      children
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") DialogViewport.displayName = "DialogViewport";
var selectors = __spreadProps(__spreadValues({}, popupStoreSelectors), {
  modal: createSelector((state) => state.modal),
  nested: createSelector((state) => state.nested),
  nestedOpenDialogCount: createSelector((state) => state.nestedOpenDialogCount),
  disablePointerDismissal: createSelector((state) => state.disablePointerDismissal),
  openMethod: createSelector((state) => state.openMethod),
  descriptionElementId: createSelector((state) => state.descriptionElementId),
  titleElementId: createSelector((state) => state.titleElementId),
  viewportElement: createSelector((state) => state.viewportElement),
  role: createSelector((state) => state.role)
});
var DialogStore = class extends ReactStore {
  constructor(initialState) {
    super(createInitialState(initialState), {
      popupRef: /* @__PURE__ */ React12.createRef(),
      backdropRef: /* @__PURE__ */ React12.createRef(),
      internalBackdropRef: /* @__PURE__ */ React12.createRef(),
      outsidePressEnabledRef: {
        current: true
      },
      triggerElements: new PopupTriggerMap(),
      onOpenChange: void 0,
      onOpenChangeComplete: void 0
    }, selectors);
    __publicField(this, "setOpen", (nextOpen, eventDetails) => {
      var _a, _b, _c, _d, _e, _f, _g;
      eventDetails.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) {
        eventDetails.trigger = (_a = this.state.activeTriggerElement) != null ? _a : void 0;
      }
      (_c = (_b = this.context).onOpenChange) == null ? void 0 : _c.call(_b, nextOpen, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      const details = {
        open: nextOpen,
        nativeEvent: eventDetails.event,
        reason: eventDetails.reason,
        nested: this.state.nested
      };
      (_d = this.state.floatingRootContext.context.events) == null ? void 0 : _d.emit("openchange", details);
      const updatedState = {
        open: nextOpen
      };
      const newTriggerId = (_f = (_e = eventDetails.trigger) == null ? void 0 : _e.id) != null ? _f : null;
      if (newTriggerId || nextOpen) {
        updatedState.activeTriggerId = newTriggerId;
        updatedState.activeTriggerElement = (_g = eventDetails.trigger) != null ? _g : null;
      }
      this.update(updatedState);
    });
  }
};
function createInitialState(initialState = {}) {
  return __spreadValues(__spreadProps(__spreadValues({}, createInitialPopupStoreState()), {
    modal: true,
    disablePointerDismissal: false,
    popupElement: null,
    viewportElement: null,
    descriptionElementId: void 0,
    titleElementId: void 0,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    role: "dialog"
  }), initialState);
}

// ../../node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js
var DialogHandle = class {
  /**
   * Internal store holding the dialog state.
   * @internal
   */
  constructor(store) {
    this.store = store != null ? store : new DialogStore();
  }
  /**
   * Opens the dialog and associates it with the trigger with the given id.
   * The trigger, if provided, must be a Dialog.Trigger component with this handle passed as a prop.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the dialog. If null, the dialog will open without a trigger association.
   */
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
    if (process.env.NODE_ENV !== "production") {
      if (triggerId && !triggerElement) {
        console.warn(`Base UI: DialogHandle.open: No trigger found with id "${triggerId}". The dialog will open, but the trigger will not be associated with the dialog.`);
      }
    }
    this.store.setOpen(true, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, triggerElement));
  }
  /**
   * Opens the dialog and sets the payload.
   * Does not associate the dialog with any trigger.
   *
   * @param payload Payload to set when opening the dialog.
   */
  openWithPayload(payload) {
    this.store.set("payload", payload);
    this.store.setOpen(true, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, void 0));
  }
  /**
   * Closes the dialog.
   */
  close() {
    this.store.setOpen(false, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, void 0));
  }
  /**
   * Indicates whether the dialog is currently open.
   */
  get isOpen() {
    return this.store.state.open;
  }
};
function createDialogHandle() {
  return new DialogHandle();
}
function useDialogRoot(params) {
  const {
    store,
    parentContext,
    actionsRef
  } = params;
  const open = store.useState("open");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const modal = store.useState("modal");
  const popupElement = store.useState("popupElement");
  const {
    openMethod,
    triggerProps
  } = useOpenInteractionType(open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store);
  const createDialogEventDetails = useStableCallback((reason) => {
    const details = createChangeEventDetails(reason);
    details.preventUnmountOnClose = () => {
      store.set("preventUnmountingOnClose", true);
    };
    return details;
  });
  const handleImperativeClose = React12.useCallback(() => {
    store.setOpen(false, createDialogEventDetails(reason_parts_exports.imperativeAction));
  }, [store, createDialogEventDetails]);
  React12.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const floatingRootContext = useSyncedFloatingRootContext({
    popupStore: store,
    onOpenChange: store.setOpen,
    treatPopupAsFloatingElement: true,
    noEmit: true
  });
  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React12.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0;
  const role = useRole(floatingRootContext);
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent() {
      if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
        return "intentional";
      }
      return {
        mouse: modal === "trap-focus" ? "sloppy" : "intentional",
        touch: "sloppy"
      };
    },
    outsidePress(event) {
      if (!store.context.outsidePressEnabledRef.current) {
        return false;
      }
      if ("button" in event && event.button !== 0) {
        return false;
      }
      if ("touches" in event && event.touches.length !== 1) {
        return false;
      }
      const target = getTarget(event);
      if (isTopmost && !disablePointerDismissal) {
        const eventTarget = target;
        if (modal) {
          return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget || contains(eventTarget, popupElement) && !(eventTarget == null ? void 0 : eventTarget.hasAttribute("data-base-ui-portal")) : true;
        }
        return true;
      }
      return false;
    },
    escapeKey: isTopmost
  });
  useScrollLock(open && modal === true, popupElement);
  const {
    getReferenceProps,
    getFloatingProps,
    getTriggerProps
  } = useInteractions([role, dismiss]);
  store.useContextCallback("onNestedDialogOpen", (ownChildrenCount) => {
    setOwnNestedOpenDialogs(ownChildrenCount + 1);
  });
  store.useContextCallback("onNestedDialogClose", () => {
    setOwnNestedOpenDialogs(0);
  });
  React12.useEffect(() => {
    if ((parentContext == null ? void 0 : parentContext.onNestedDialogOpen) && open) {
      parentContext.onNestedDialogOpen(ownNestedOpenDialogs);
    }
    if ((parentContext == null ? void 0 : parentContext.onNestedDialogClose) && !open) {
      parentContext.onNestedDialogClose();
    }
    return () => {
      if ((parentContext == null ? void 0 : parentContext.onNestedDialogClose) && open) {
        parentContext.onNestedDialogClose();
      }
    };
  }, [open, parentContext, ownNestedOpenDialogs]);
  const activeTriggerProps = React12.useMemo(() => getReferenceProps(triggerProps), [getReferenceProps, triggerProps]);
  const inactiveTriggerProps = React12.useMemo(() => getTriggerProps(triggerProps), [getTriggerProps, triggerProps]);
  const popupProps = React12.useMemo(() => getFloatingProps(), [getFloatingProps]);
  store.useSyncedValues({
    openMethod,
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    floatingRootContext,
    nestedOpenDialogCount: ownNestedOpenDialogs
  });
}

export { DialogBackdrop, DialogClose, DialogDescription, DialogHandle, DialogPopup, DialogPortal, DialogRootContext, DialogStore, DialogTitle, DialogTrigger, DialogViewport, createDialogHandle, useDialogRoot, useDialogRootContext };
//# sourceMappingURL=chunk-4FUS5W2N.mjs.map
//# sourceMappingURL=chunk-4FUS5W2N.mjs.map