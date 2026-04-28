import { FloatingPortalLite } from './chunk-DNSQT2H3.mjs';
import { usePopupViewport } from './chunk-F6U7T6AJ.mjs';
import { popupStoreSelectors, useTriggerDataForwarding, useImplicitActiveTrigger, useOpenStateTransitions, createInitialPopupStoreState } from './chunk-2ZE5P47Q.mjs';
import { useAnchorPositioning, adaptiveOrigin, getDisabledMountTransitionStyles } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { createSelector, FloatingTree, useHoverReferenceInteraction, safePolygon, useFocus, triggerOpenStateMapping, useFloatingNodeId, popupStateMapping, FloatingNode, useHoverFloatingInteraction, useDismiss, useInteractions, ReactStore, PopupTriggerMap, useSyncedFloatingRootContext } from './chunk-PSMHWWS3.mjs';
import { transitionStatusMapping, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { formatErrorMessage_default, useRenderElement, POPUP_COLLISION_AVOIDANCE, useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest, __publicField } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import * as ReactDOM from 'react-dom';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/preview-card/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => PreviewCardArrow,
  Backdrop: () => PreviewCardBackdrop,
  Handle: () => PreviewCardHandle,
  Popup: () => PreviewCardPopup,
  Portal: () => PreviewCardPortal,
  Positioner: () => PreviewCardPositioner,
  Root: () => PreviewCardRoot,
  Trigger: () => PreviewCardTrigger,
  Viewport: () => PreviewCardViewport,
  createHandle: () => createPreviewCardHandle
});
var PreviewCardRootContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PreviewCardRootContext.displayName = "PreviewCardRootContext";
function usePreviewCardRootContext(optional) {
  const context = React3.useContext(PreviewCardRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: PreviewCardRootContext is missing. PreviewCard parts must be placed within <PreviewCard.Root>." : formatErrorMessage_default(50));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/preview-card/utils/constants.js
var OPEN_DELAY = 600;
var CLOSE_DELAY = 300;

// ../../node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
var selectors = __spreadProps(__spreadValues({}, popupStoreSelectors), {
  instantType: createSelector((state) => state.instantType),
  hasViewport: createSelector((state) => state.hasViewport)
});
var PreviewCardStore = class _PreviewCardStore extends ReactStore {
  constructor(initialState) {
    super(__spreadValues(__spreadValues({}, createInitialState()), initialState), {
      popupRef: /* @__PURE__ */ React3.createRef(),
      onOpenChange: void 0,
      onOpenChangeComplete: void 0,
      triggerElements: new PopupTriggerMap(),
      closeDelayRef: {
        current: CLOSE_DELAY
      }
    }, selectors);
    __publicField(this, "setOpen", (nextOpen, eventDetails) => {
      var _a, _b;
      const reason = eventDetails.reason;
      const isHover = reason === reason_parts_exports.triggerHover;
      const isFocusOpen = nextOpen && reason === reason_parts_exports.triggerFocus;
      const isDismissClose = !nextOpen && (reason === reason_parts_exports.triggerPress || reason === reason_parts_exports.escapeKey);
      eventDetails.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      (_b = (_a = this.context).onOpenChange) == null ? void 0 : _b.call(_a, nextOpen, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      const changeState = () => {
        var _a2, _b2, _c;
        const updatedState = {
          open: nextOpen
        };
        if (isFocusOpen) {
          updatedState.instantType = "focus";
        } else if (isDismissClose) {
          updatedState.instantType = "dismiss";
        } else if (reason === reason_parts_exports.triggerHover) {
          updatedState.instantType = void 0;
        }
        const newTriggerId = (_b2 = (_a2 = eventDetails.trigger) == null ? void 0 : _a2.id) != null ? _b2 : null;
        if (newTriggerId || nextOpen) {
          updatedState.activeTriggerId = newTriggerId;
          updatedState.activeTriggerElement = (_c = eventDetails.trigger) != null ? _c : null;
        }
        this.update(updatedState);
      };
      if (isHover) {
        ReactDOM.flushSync(changeState);
      } else {
        changeState();
      }
    });
  }
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new _PreviewCardStore(initialState);
    }).current;
    const store = externalStore != null ? externalStore : internalStore;
    const floatingRootContext = useSyncedFloatingRootContext({
      popupStore: store,
      onOpenChange: store.setOpen
    });
    store.state.floatingRootContext = floatingRootContext;
    return store;
  }
};
function createInitialState() {
  return __spreadProps(__spreadValues({}, createInitialPopupStoreState()), {
    instantType: void 0,
    hasViewport: false
  });
}
function PreviewCardRootComponent(props) {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    children
  } = props;
  const store = PreviewCardStore.useStore(handle == null ? void 0 : handle.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp
  });
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
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const open = store.useState("open");
  const activeTriggerId = store.useState("activeTriggerId");
  const payload = store.useState("payload");
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store);
  useIsoLayoutEffect(() => {
    if (open) {
      if (activeTriggerId == null) {
        store.set("payload", void 0);
      }
    }
  }, [store, activeTriggerId, open]);
  const handleImperativeClose = React3.useCallback(() => {
    store.setOpen(false, createPreviewCardEventDetails(store, reason_parts_exports.imperativeAction));
  }, [store]);
  React3.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext);
  const {
    getReferenceProps,
    getTriggerProps,
    getFloatingProps
  } = useInteractions([dismiss]);
  const activeTriggerProps = React3.useMemo(() => getReferenceProps(), [getReferenceProps]);
  const inactiveTriggerProps = React3.useMemo(() => getTriggerProps(), [getTriggerProps]);
  const popupProps = React3.useMemo(() => getFloatingProps(), [getFloatingProps]);
  store.useSyncedValues({
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps
  });
  return /* @__PURE__ */ jsx(PreviewCardRootContext.Provider, {
    value: store,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
}
function PreviewCardRoot(props) {
  if (usePreviewCardRootContext(true)) {
    return /* @__PURE__ */ jsx(PreviewCardRootComponent, __spreadValues({}, props));
  }
  return /* @__PURE__ */ jsx(FloatingTree, {
    children: /* @__PURE__ */ jsx(PreviewCardRootComponent, __spreadValues({}, props))
  });
}
function createPreviewCardEventDetails(store, reason) {
  const details = createChangeEventDetails(reason);
  details.preventUnmountOnClose = () => {
    store.set("preventUnmountingOnClose", true);
  };
  return details;
}
var PreviewCardPortalContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PreviewCardPortalContext.displayName = "PreviewCardPortalContext";
function usePreviewCardPortalContext() {
  const value = React3.useContext(PreviewCardPortalContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <PreviewCard.Portal> is missing." : formatErrorMessage_default(48));
  }
  return value;
}
var PreviewCardPortal = /* @__PURE__ */ React3.forwardRef(function PreviewCardPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const store = usePreviewCardRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(PreviewCardPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsx(FloatingPortalLite, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") PreviewCardPortal.displayName = "PreviewCardPortal";
var PreviewCardTrigger = /* @__PURE__ */ React3.forwardRef(function PreviewCardTrigger2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    render,
    className,
    delay,
    closeDelay,
    id: idProp,
    payload,
    handle
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "delay",
    "closeDelay",
    "id",
    "payload",
    "handle"
  ]);
  const rootContext = usePreviewCardRootContext(true);
  const store = (_b = handle == null ? void 0 : handle.store) != null ? _b : rootContext;
  if (!store) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <PreviewCard.Trigger> must be either used within a <PreviewCard.Root> component or provided with a handle." : formatErrorMessage_default(89));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const triggerElementRef = React3.useRef(null);
  const delayWithDefault = delay != null ? delay : OPEN_DELAY;
  const closeDelayWithDefault = closeDelay != null ? closeDelay : CLOSE_DELAY;
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload
  });
  useIsoLayoutEffect(() => {
    if (isMountedByThisTrigger) {
      store.context.closeDelayRef.current = closeDelayWithDefault;
    }
  }, [store, isMountedByThisTrigger, closeDelayWithDefault]);
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    delay: () => ({
      open: delayWithDefault,
      close: closeDelayWithDefault
    }),
    triggerElementRef,
    isActiveTrigger: isTriggerActive
  });
  const focusProps = useFocus(floatingRootContext, {
    delay: delayWithDefault
  });
  const state = {
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const element = useRenderElement("a", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps.reference, rootTriggerProps, {
      id: thisTriggerId
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PreviewCardTrigger.displayName = "PreviewCardTrigger";
var PreviewCardPositionerContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PreviewCardPositionerContext.displayName = "PreviewCardPositionerContext";
function usePreviewCardPositionerContext() {
  const context = React3.useContext(PreviewCardPositionerContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <PreviewCard.Popup> and <PreviewCard.Arrow> must be used within the <PreviewCard.Positioner> component" : formatErrorMessage_default(49));
  }
  return context;
}
var PreviewCardPositioner = /* @__PURE__ */ React3.forwardRef(function PreviewCardPositioner2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    anchor,
    positionMethod = "absolute",
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    collisionAvoidance = POPUP_COLLISION_AVOIDANCE
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "anchor",
    "positionMethod",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionBoundary",
    "collisionPadding",
    "arrowPadding",
    "sticky",
    "disableAnchorTracking",
    "collisionAvoidance"
  ]);
  const store = usePreviewCardRootContext();
  const keepMounted = usePreviewCardPortalContext();
  const nodeId = useFloatingNodeId();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const floatingRootContext = store.useState("floatingRootContext");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking,
    keepMounted,
    nodeId,
    collisionAvoidance,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : void 0
  });
  const defaultProps = React3.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
      hiddenStyles.pointerEvents = "none";
    }
    return {
      role: "presentation",
      hidden: !mounted,
      style: __spreadValues(__spreadValues({}, positioning.positionerStyles), hiddenStyles)
    };
  }, [open, mounted, positioning.positionerStyles]);
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant: instantType
  };
  const contextValue = React3.useMemo(() => ({
    side: positioning.side,
    align: positioning.align,
    arrowRef: positioning.arrowRef,
    arrowUncentered: positioning.arrowUncentered,
    arrowStyles: positioning.arrowStyles
  }), [positioning.side, positioning.align, positioning.arrowRef, positioning.arrowUncentered, positioning.arrowStyles]);
  const element = useRenderElement("div", componentProps, {
    state,
    props: [defaultProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    ref: [forwardedRef, store.useStateSetter("positionerElement")],
    stateAttributesMapping: popupStateMapping
  });
  return /* @__PURE__ */ jsx(PreviewCardPositionerContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(FloatingNode, {
      id: nodeId,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") PreviewCardPositioner.displayName = "PreviewCardPositioner";
var stateAttributesMapping = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var PreviewCardPopup = /* @__PURE__ */ React3.forwardRef(function PreviewCardPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const store = usePreviewCardRootContext();
  const {
    side,
    align
  } = usePreviewCardPositionerContext();
  const open = store.useState("open");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const floatingContext = store.useState("floatingRootContext");
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
  const getCloseDelay = useStableCallback(() => store.context.closeDelayRef.current);
  useHoverFloatingInteraction(floatingContext, {
    closeDelay: getCloseDelay
  });
  const state = {
    open,
    side,
    align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, store.useStateSetter("popupElement")],
    props: [popupProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PreviewCardPopup.displayName = "PreviewCardPopup";
var PreviewCardArrow = /* @__PURE__ */ React3.forwardRef(function PreviewCardArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const store = usePreviewCardRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = usePreviewCardPositionerContext();
  const open = store.useState("open");
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [arrowRef, forwardedRef],
    props: [{
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps],
    stateAttributesMapping: popupStateMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PreviewCardArrow.displayName = "PreviewCardArrow";
var stateAttributesMapping2 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var PreviewCardBackdrop = /* @__PURE__ */ React3.forwardRef(function PreviewCardBackdrop2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const store = usePreviewCardRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef],
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PreviewCardBackdrop.displayName = "PreviewCardBackdrop";

// ../../node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewportCssVars.js
var PreviewCardViewportCssVars = /* @__PURE__ */ (function(PreviewCardViewportCssVars2) {
  PreviewCardViewportCssVars2["popupWidth"] = "--popup-width";
  PreviewCardViewportCssVars2["popupHeight"] = "--popup-height";
  return PreviewCardViewportCssVars2;
})({});

// ../../node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewport.js
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var PreviewCardViewport = /* @__PURE__ */ React3.forwardRef(function PreviewCardViewport2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "children"
  ]);
  const store = usePreviewCardRootContext();
  const positioner = usePreviewCardPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side: positioner.side,
    cssVars: PreviewCardViewportCssVars,
    children
  });
  const state = {
    activationDirection: viewportState.activationDirection,
    transitioning: viewportState.transitioning,
    instant: instantType
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [elementProps, {
      children: childrenToRender
    }],
    stateAttributesMapping: stateAttributesMapping3
  });
});
if (process.env.NODE_ENV !== "production") PreviewCardViewport.displayName = "PreviewCardViewport";

// ../../node_modules/@base-ui/react/esm/preview-card/store/PreviewCardHandle.js
var PreviewCardHandle = class {
  /**
   * Internal store holding the preview card state.
   * @internal
   */
  constructor() {
    this.store = new PreviewCardStore();
  }
  /**
   * Opens the preview card and associates it with the trigger with the given ID.
   * The trigger must be a PreviewCard.Trigger component with this handle passed as a prop.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the preview card.
   */
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
    if (triggerId && !triggerElement) {
      throw new Error(process.env.NODE_ENV !== "production" ? `Base UI: PreviewCardHandle.open: No trigger found with id "${triggerId}".` : formatErrorMessage_default(88, triggerId));
    }
    this.store.setOpen(true, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, triggerElement));
  }
  /**
   * Closes the preview card.
   */
  close() {
    this.store.setOpen(false, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, void 0));
  }
  /**
   * Indicates whether the preview card is currently open.
   */
  get isOpen() {
    return this.store.state.open;
  }
};
function createPreviewCardHandle() {
  return new PreviewCardHandle();
}
function HoverCard(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "hover-card" }, props));
}
function HoverCardTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "hover-card-trigger" }, props));
}
function HoverCardContent(_a) {
  var _b = _a, {
    className,
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 4
  } = _b, props = __objRest(_b, [
    "className",
    "side",
    "sideOffset",
    "align",
    "alignOffset"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ jsx(
    index_parts_exports.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsx(
        index_parts_exports.Popup,
        __spreadValues({
          "data-slot": "hover-card-content",
          className: cn(
            "z-50 w-[280px] origin-(--transform-origin) rounded-md bg-popover p-3 text-[13px] text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )
        }, props)
      )
    }
  ) });
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
//# sourceMappingURL=chunk-YH7A3AKI.mjs.map
//# sourceMappingURL=chunk-YH7A3AKI.mjs.map