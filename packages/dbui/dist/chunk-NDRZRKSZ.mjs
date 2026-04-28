import { FloatingPortalLite } from './chunk-DNSQT2H3.mjs';
import { usePopupViewport } from './chunk-F6U7T6AJ.mjs';
import { popupStoreSelectors, useImplicitActiveTrigger, useOpenStateTransitions, useTriggerDataForwarding, createInitialPopupStoreState } from './chunk-2ZE5P47Q.mjs';
import { useAnchorPositioning, adaptiveOrigin, getDisabledMountTransitionStyles } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { createSelector, fastComponent, useDismiss, useClientPoint, useInteractions, CommonTriggerDataAttributes, fastComponentRef, useDelayGroup, useHoverReferenceInteraction, safePolygon, useFocus, triggerOpenStateMapping, popupStateMapping, useHoverFloatingInteraction, FloatingDelayGroup, ReactStore, PopupTriggerMap, useSyncedFloatingRootContext } from './chunk-PSMHWWS3.mjs';
import { transitionStatusMapping, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { formatErrorMessage_default, useRenderElement, POPUP_COLLISION_AVOIDANCE, useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest, __publicField } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import * as ReactDOM from 'react-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/tooltip/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => TooltipArrow,
  Handle: () => TooltipHandle,
  Popup: () => TooltipPopup,
  Portal: () => TooltipPortal,
  Positioner: () => TooltipPositioner,
  Provider: () => TooltipProvider,
  Root: () => TooltipRoot,
  Trigger: () => TooltipTrigger,
  Viewport: () => TooltipViewport,
  createHandle: () => createTooltipHandle
});
var TooltipRootContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipRootContext.displayName = "TooltipRootContext";
function useTooltipRootContext(optional) {
  const context = React3.useContext(TooltipRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>." : formatErrorMessage_default(72));
  }
  return context;
}
var selectors = __spreadProps(__spreadValues({}, popupStoreSelectors), {
  disabled: createSelector((state) => state.disabled),
  instantType: createSelector((state) => state.instantType),
  isInstantPhase: createSelector((state) => state.isInstantPhase),
  trackCursorAxis: createSelector((state) => state.trackCursorAxis),
  disableHoverablePopup: createSelector((state) => state.disableHoverablePopup),
  lastOpenChangeReason: createSelector((state) => state.openChangeReason),
  closeOnClick: createSelector((state) => state.closeOnClick),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport)
});
var TooltipStore = class _TooltipStore extends ReactStore {
  constructor(initialState) {
    super(__spreadValues(__spreadValues({}, createInitialState()), initialState), {
      popupRef: /* @__PURE__ */ React3.createRef(),
      onOpenChange: void 0,
      onOpenChangeComplete: void 0,
      triggerElements: new PopupTriggerMap()
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
          open: nextOpen,
          openChangeReason: reason
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
      return new _TooltipStore(initialState);
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
    disabled: false,
    instantType: void 0,
    isInstantPhase: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    openChangeReason: null,
    closeOnClick: true,
    closeDelay: 0,
    hasViewport: false
  });
}
var TooltipRoot = fastComponent(function TooltipRoot2(props) {
  const {
    disabled = false,
    defaultOpen = false,
    open: openProp,
    disableHoverablePopup = false,
    trackCursorAxis = "none",
    actionsRef,
    onOpenChange,
    onOpenChangeComplete,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    children
  } = props;
  const store = TooltipStore.useStore(handle == null ? void 0 : handle.store, {
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
  const openState = store.useState("open");
  const open = !disabled && openState;
  const activeTriggerId = store.useState("activeTriggerId");
  const payload = store.useState("payload");
  store.useSyncedValues({
    trackCursorAxis,
    disableHoverablePopup
  });
  useIsoLayoutEffect(() => {
    if (openState && disabled) {
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.disabled));
    }
  }, [openState, disabled, store]);
  store.useSyncedValue("disabled", disabled);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount,
    transitionStatus
  } = useOpenStateTransitions(open, store);
  const isInstantPhase = store.useState("isInstantPhase");
  const instantType = store.useState("instantType");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const previousInstantTypeRef = React3.useRef(null);
  useIsoLayoutEffect(() => {
    if (transitionStatus === "ending" && lastOpenChangeReason === reason_parts_exports.none || transitionStatus !== "ending" && isInstantPhase) {
      if (instantType !== "delay") {
        previousInstantTypeRef.current = instantType;
      }
      store.set("instantType", "delay");
    } else if (previousInstantTypeRef.current !== null) {
      store.set("instantType", previousInstantTypeRef.current);
      previousInstantTypeRef.current = null;
    }
  }, [transitionStatus, isInstantPhase, lastOpenChangeReason, instantType, store]);
  useIsoLayoutEffect(() => {
    if (open) {
      if (activeTriggerId == null) {
        store.set("payload", void 0);
      }
    }
  }, [store, activeTriggerId, open]);
  const handleImperativeClose = React3.useCallback(() => {
    store.setOpen(false, createTooltipEventDetails(store, reason_parts_exports.imperativeAction));
  }, [store]);
  React3.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    referencePress: () => store.select("closeOnClick")
  });
  const clientPoint = useClientPoint(floatingRootContext, {
    enabled: !disabled && trackCursorAxis !== "none",
    axis: trackCursorAxis === "none" ? void 0 : trackCursorAxis
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getTriggerProps
  } = useInteractions([dismiss, clientPoint]);
  const activeTriggerProps = React3.useMemo(() => getReferenceProps(), [getReferenceProps]);
  const inactiveTriggerProps = React3.useMemo(() => getTriggerProps(), [getTriggerProps]);
  const popupProps = React3.useMemo(() => getFloatingProps(), [getFloatingProps]);
  store.useSyncedValues({
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps
  });
  return /* @__PURE__ */ jsx(TooltipRootContext.Provider, {
    value: store,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
});
if (process.env.NODE_ENV !== "production") TooltipRoot.displayName = "TooltipRoot";
function createTooltipEventDetails(store, reason) {
  const details = createChangeEventDetails(reason);
  details.preventUnmountOnClose = () => {
    store.set("preventUnmountingOnClose", true);
  };
  return details;
}
var TooltipProviderContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipProviderContext.displayName = "TooltipProviderContext";
function useTooltipProviderContext() {
  return React3.useContext(TooltipProviderContext);
}

// ../../node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTriggerDataAttributes.js
var TooltipTriggerDataAttributes = (function(TooltipTriggerDataAttributes2) {
  TooltipTriggerDataAttributes2[TooltipTriggerDataAttributes2["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  TooltipTriggerDataAttributes2["triggerDisabled"] = "data-trigger-disabled";
  return TooltipTriggerDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/tooltip/utils/constants.js
var OPEN_DELAY = 600;

// ../../node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTrigger.js
var TooltipTrigger = fastComponentRef(function TooltipTrigger2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    className,
    render,
    handle,
    payload,
    disabled: disabledProp,
    delay,
    closeOnClick = true,
    closeDelay,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "handle",
    "payload",
    "disabled",
    "delay",
    "closeOnClick",
    "closeDelay",
    "id"
  ]);
  const rootContext = useTooltipRootContext(true);
  const store = (_b = handle == null ? void 0 : handle.store) != null ? _b : rootContext;
  if (!store) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Tooltip.Trigger> must be either used within a <Tooltip.Root> component or provided with a handle." : formatErrorMessage_default(82));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const triggerElementRef = React3.useRef(null);
  const delayWithDefault = delay != null ? delay : OPEN_DELAY;
  const closeDelayWithDefault = closeDelay != null ? closeDelay : 0;
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    closeOnClick,
    closeDelay: closeDelayWithDefault
  });
  const providerContext = useTooltipProviderContext();
  const {
    delayRef,
    isInstantPhase,
    hasProvider
  } = useDelayGroup(floatingRootContext, {
    open: isOpenedByThisTrigger
  });
  store.useSyncedValue("isInstantPhase", isInstantPhase);
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp != null ? disabledProp : rootDisabled;
  const trackCursorAxis = store.useState("trackCursorAxis");
  const disableHoverablePopup = store.useState("disableHoverablePopup");
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: !disabled,
    mouseOnly: true,
    move: false,
    handleClose: !disableHoverablePopup && trackCursorAxis !== "both" ? safePolygon() : null,
    restMs() {
      var _a2;
      const providerDelay = providerContext == null ? void 0 : providerContext.delay;
      const groupOpenValue = typeof delayRef.current === "object" ? delayRef.current.open : void 0;
      let computedRestMs = delayWithDefault;
      if (hasProvider) {
        if (groupOpenValue !== 0) {
          computedRestMs = (_a2 = delay != null ? delay : providerDelay) != null ? _a2 : delayWithDefault;
        } else {
          computedRestMs = 0;
        }
      }
      return computedRestMs;
    },
    delay() {
      const closeValue = typeof delayRef.current === "object" ? delayRef.current.close : void 0;
      let computedCloseDelay = closeDelayWithDefault;
      if (closeDelay == null && hasProvider) {
        computedCloseDelay = closeValue;
      }
      return {
        close: computedCloseDelay
      };
    },
    triggerElementRef,
    isActiveTrigger: isTriggerActive
  });
  const focusProps = useFocus(floatingRootContext, {
    enabled: !disabled
  }).reference;
  const state = {
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps, rootTriggerProps, {
      onPointerDown() {
        store.set("closeOnClick", closeOnClick);
      },
      id: thisTriggerId,
      [TooltipTriggerDataAttributes.triggerDisabled]: disabled ? "" : void 0
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TooltipTrigger.displayName = "TooltipTrigger";
var TooltipPortalContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipPortalContext.displayName = "TooltipPortalContext";
function useTooltipPortalContext() {
  const value = React3.useContext(TooltipPortalContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Tooltip.Portal> is missing." : formatErrorMessage_default(70));
  }
  return value;
}
var TooltipPortal = /* @__PURE__ */ React3.forwardRef(function TooltipPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const store = useTooltipRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(TooltipPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsx(FloatingPortalLite, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") TooltipPortal.displayName = "TooltipPortal";
var TooltipPositionerContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipPositionerContext.displayName = "TooltipPositionerContext";
function useTooltipPositionerContext() {
  const context = React3.useContext(TooltipPositionerContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TooltipPositionerContext is missing. TooltipPositioner parts must be placed within <Tooltip.Positioner>." : formatErrorMessage_default(71));
  }
  return context;
}
var TooltipPositioner = /* @__PURE__ */ React3.forwardRef(function TooltipPositioner2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    anchor,
    positionMethod = "absolute",
    side = "top",
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
  const store = useTooltipRootContext();
  const keepMounted = useTooltipPortalContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const trackCursorAxis = store.useState("trackCursorAxis");
  const disableHoverablePopup = store.useState("disableHoverablePopup");
  const floatingRootContext = store.useState("floatingRootContext");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const positioning = useAnchorPositioning({
    anchor,
    positionMethod,
    floatingRootContext,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    sticky,
    arrowPadding,
    disableAnchorTracking,
    keepMounted,
    collisionAvoidance,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : void 0
  });
  const defaultProps = React3.useMemo(() => {
    const hiddenStyles = {};
    if (!open || trackCursorAxis === "both" || disableHoverablePopup) {
      hiddenStyles.pointerEvents = "none";
    }
    return {
      role: "presentation",
      hidden: !mounted,
      style: __spreadValues(__spreadValues({}, positioning.positionerStyles), hiddenStyles)
    };
  }, [open, trackCursorAxis, disableHoverablePopup, mounted, positioning.positionerStyles]);
  const state = React3.useMemo(() => ({
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant: trackCursorAxis !== "none" ? "tracking-cursor" : instantType
  }), [open, positioning.side, positioning.align, positioning.anchorHidden, trackCursorAxis, instantType]);
  const contextValue = React3.useMemo(() => __spreadProps(__spreadValues({}, state), {
    arrowRef: positioning.arrowRef,
    arrowStyles: positioning.arrowStyles,
    arrowUncentered: positioning.arrowUncentered
  }), [state, positioning.arrowRef, positioning.arrowStyles, positioning.arrowUncentered]);
  const element = useRenderElement("div", componentProps, {
    state,
    props: [defaultProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    ref: [forwardedRef, store.useStateSetter("positionerElement")],
    stateAttributesMapping: popupStateMapping
  });
  return /* @__PURE__ */ jsx(TooltipPositionerContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") TooltipPositioner.displayName = "TooltipPositioner";
var stateAttributesMapping = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var TooltipPopup = /* @__PURE__ */ React3.forwardRef(function TooltipPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const store = useTooltipRootContext();
  const {
    side,
    align
  } = useTooltipPositionerContext();
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
  const disabled = store.useState("disabled");
  const closeDelay = store.useState("closeDelay");
  useHoverFloatingInteraction(floatingContext, {
    enabled: !disabled,
    closeDelay
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
if (process.env.NODE_ENV !== "production") TooltipPopup.displayName = "TooltipPopup";
var TooltipArrow = /* @__PURE__ */ React3.forwardRef(function TooltipArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const store = useTooltipRootContext();
  const instantType = store.useState("instantType");
  const {
    open,
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useTooltipPositionerContext();
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered,
    instant: instantType
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, arrowRef],
    props: [{
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps],
    stateAttributesMapping: popupStateMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TooltipArrow.displayName = "TooltipArrow";
var TooltipProvider = function TooltipProvider2(props) {
  const {
    delay,
    closeDelay,
    timeout = 400
  } = props;
  const contextValue = React3.useMemo(() => ({
    delay,
    closeDelay
  }), [delay, closeDelay]);
  const delayValue = React3.useMemo(() => ({
    open: delay,
    close: closeDelay
  }), [delay, closeDelay]);
  return /* @__PURE__ */ jsx(TooltipProviderContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(FloatingDelayGroup, {
      delay: delayValue,
      timeoutMs: timeout,
      children: props.children
    })
  });
};
if (process.env.NODE_ENV !== "production") TooltipProvider.displayName = "TooltipProvider";

// ../../node_modules/@base-ui/react/esm/tooltip/viewport/TooltipViewportCssVars.js
var TooltipViewportCssVars = /* @__PURE__ */ (function(TooltipViewportCssVars2) {
  TooltipViewportCssVars2["popupWidth"] = "--popup-width";
  TooltipViewportCssVars2["popupHeight"] = "--popup-height";
  return TooltipViewportCssVars2;
})({});

// ../../node_modules/@base-ui/react/esm/tooltip/viewport/TooltipViewport.js
var stateAttributesMapping2 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var TooltipViewport = /* @__PURE__ */ React3.forwardRef(function TooltipViewport2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "children"
  ]);
  const store = useTooltipRootContext();
  const positioner = useTooltipPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side: positioner.side,
    cssVars: TooltipViewportCssVars,
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
    stateAttributesMapping: stateAttributesMapping2
  });
});
if (process.env.NODE_ENV !== "production") TooltipViewport.displayName = "TooltipViewport";

// ../../node_modules/@base-ui/react/esm/tooltip/store/TooltipHandle.js
var TooltipHandle = class {
  /**
   * Internal store holding the tooltip state.
   * @internal
   */
  constructor() {
    this.store = new TooltipStore();
  }
  /**
   * Opens the tooltip and associates it with the trigger with the given ID.
   * The trigger must be a Tooltip.Trigger component with this handle passed as a prop.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the tooltip.
   */
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
    if (triggerId && !triggerElement) {
      throw new Error(process.env.NODE_ENV !== "production" ? `Base UI: TooltipHandle.open: No trigger found with id "${triggerId}".` : formatErrorMessage_default(81, triggerId));
    }
    this.store.setOpen(true, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, triggerElement));
  }
  /**
   * Closes the tooltip.
   */
  close() {
    this.store.setOpen(false, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, void 0));
  }
  /**
   * Indicates whether the tooltip is currently open.
   */
  get isOpen() {
    return this.store.state.open;
  }
};
function createTooltipHandle() {
  return new TooltipHandle();
}
function TooltipProvider3(_a) {
  var _b = _a, {
    delay = 0
  } = _b, props = __objRest(_b, [
    "delay"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Provider,
    __spreadValues({
      "data-slot": "tooltip-provider",
      delay
    }, props)
  );
}
function Tooltip(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "tooltip" }, props));
}
function TooltipTrigger3(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "tooltip-trigger" }, props));
}
function TooltipArrow3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Arrow,
    __spreadValues({
      "data-slot": "tooltip-arrow",
      className: cn(
        "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
        className
      )
    }, props)
  );
}
function TooltipContent(_a) {
  var _b = _a, {
    className,
    side = "top",
    sideOffset = 8,
    align = "center",
    alignOffset = 0,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "children"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { children: /* @__PURE__ */ jsx(
    index_parts_exports.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsxs(
        index_parts_exports.Popup,
        __spreadProps(__spreadValues({
          "data-slot": "tooltip-content",
          className: cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-sm bg-foreground px-2 py-1 text-[12px] leading-[16px] text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )
        }, props), {
          children: [
            children,
            /* @__PURE__ */ jsx(TooltipArrow3, {})
          ]
        })
      )
    }
  ) });
}

export { Tooltip, TooltipArrow3 as TooltipArrow, TooltipContent, TooltipProvider3 as TooltipProvider, TooltipTrigger3 as TooltipTrigger };
//# sourceMappingURL=chunk-NDRZRKSZ.mjs.map
//# sourceMappingURL=chunk-NDRZRKSZ.mjs.map