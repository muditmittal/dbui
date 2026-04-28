import { usePopupViewport } from './chunk-F6U7T6AJ.mjs';
import { popupStoreSelectors, useTriggerDataForwarding, useImplicitActiveTrigger, useOpenStateTransitions, createInitialPopupStoreState } from './chunk-2ZE5P47Q.mjs';
import { useToolbarRootContext } from './chunk-T7CEVU6N.mjs';
import { useAnchorPositioning, adaptiveOrigin, getDisabledMountTransitionStyles } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { InternalBackdrop, useOpenInteractionType, useScrollLock } from './chunk-4AAVJQFL.mjs';
import { createSelector, FloatingTree, useHoverReferenceInteraction, safePolygon, useClick, useInteractions, pressableTriggerOpenStateMapping, triggerOpenStateMapping, getTabbableBeforeElement, isOutsideEvent, getTabbableAfterElement, getNextTabbable, FocusGuard, FloatingPortal, useFloatingNodeId, popupStateMapping, FloatingNode, useHoverFloatingInteraction, FloatingFocusManager, useSyncedFloatingRootContext, useDismiss, useRole, useFloatingParentNodeId, ReactStore, PopupTriggerMap } from './chunk-PSMHWWS3.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { Timeout } from './chunk-NJQVCWLB.mjs';
import { COMPOSITE_KEYS } from './chunk-QGKCYW24.mjs';
import { contains } from './chunk-FQ4RTFU7.mjs';
import { useAnimationsFinished, transitionStatusMapping, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useOnMount } from './chunk-KJU32T43.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { reason_parts_exports, createChangeEventDetails } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { isHTMLElement } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { formatErrorMessage_default, useRenderElement, CLICK_TRIGGER_IDENTIFIER, POPUP_COLLISION_AVOIDANCE, PATIENT_CLICK_THRESHOLD, useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest, __publicField } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import * as ReactDOM2 from 'react-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/popover/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => PopoverArrow,
  Backdrop: () => PopoverBackdrop,
  Close: () => PopoverClose,
  Description: () => PopoverDescription,
  Handle: () => PopoverHandle,
  Popup: () => PopoverPopup,
  Portal: () => PopoverPortal,
  Positioner: () => PopoverPositioner,
  Root: () => PopoverRoot,
  Title: () => PopoverTitle,
  Trigger: () => PopoverTrigger,
  Viewport: () => PopoverViewport,
  createHandle: () => createPopoverHandle
});
var PopoverRootContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PopoverRootContext.displayName = "PopoverRootContext";
function usePopoverRootContext(optional) {
  const context = React3.useContext(PopoverRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: PopoverRootContext is missing. Popover parts must be placed within <Popover.Root>." : formatErrorMessage_default(47));
  }
  return context;
}
function createInitialState() {
  return __spreadProps(__spreadValues({}, createInitialPopupStoreState()), {
    disabled: false,
    modal: false,
    instantType: void 0,
    openMethod: null,
    openChangeReason: null,
    titleElementId: void 0,
    descriptionElementId: void 0,
    stickIfOpen: true,
    nested: false,
    openOnHover: false,
    closeDelay: 0,
    hasViewport: false
  });
}
var selectors = __spreadProps(__spreadValues({}, popupStoreSelectors), {
  disabled: createSelector((state) => state.disabled),
  instantType: createSelector((state) => state.instantType),
  openMethod: createSelector((state) => state.openMethod),
  openChangeReason: createSelector((state) => state.openChangeReason),
  modal: createSelector((state) => state.modal),
  stickIfOpen: createSelector((state) => state.stickIfOpen),
  titleElementId: createSelector((state) => state.titleElementId),
  descriptionElementId: createSelector((state) => state.descriptionElementId),
  openOnHover: createSelector((state) => state.openOnHover),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport)
});
var PopoverStore = class _PopoverStore extends ReactStore {
  constructor(initialState) {
    const initial = __spreadValues(__spreadValues({}, createInitialState()), initialState);
    if (initial.open && (initialState == null ? void 0 : initialState.mounted) === void 0) {
      initial.mounted = true;
    }
    super(initial, {
      popupRef: /* @__PURE__ */ React3.createRef(),
      backdropRef: /* @__PURE__ */ React3.createRef(),
      internalBackdropRef: /* @__PURE__ */ React3.createRef(),
      onOpenChange: void 0,
      onOpenChangeComplete: void 0,
      triggerFocusTargetRef: /* @__PURE__ */ React3.createRef(),
      beforeContentFocusGuardRef: /* @__PURE__ */ React3.createRef(),
      stickIfOpenTimeout: new Timeout(),
      triggerElements: new PopupTriggerMap()
    }, selectors);
    __publicField(this, "setOpen", (nextOpen, eventDetails) => {
      var _a, _b;
      const isHover = eventDetails.reason === reason_parts_exports.triggerHover;
      const isKeyboardClick = eventDetails.reason === reason_parts_exports.triggerPress && eventDetails.event.detail === 0;
      const isDismissClose = !nextOpen && (eventDetails.reason === reason_parts_exports.escapeKey || eventDetails.reason == null);
      eventDetails.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      (_b = (_a = this.context).onOpenChange) == null ? void 0 : _b.call(_a, nextOpen, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      const details = {
        open: nextOpen,
        nativeEvent: eventDetails.event,
        reason: eventDetails.reason,
        nested: this.state.nested,
        triggerElement: eventDetails.trigger
      };
      const floatingEvents = this.state.floatingRootContext.context.events;
      floatingEvents == null ? void 0 : floatingEvents.emit("openchange", details);
      const changeState = () => {
        var _a2, _b2, _c;
        const updatedState = {
          open: nextOpen,
          openChangeReason: eventDetails.reason
        };
        const newTriggerId = (_b2 = (_a2 = eventDetails.trigger) == null ? void 0 : _a2.id) != null ? _b2 : null;
        if (newTriggerId || nextOpen) {
          updatedState.activeTriggerId = newTriggerId;
          updatedState.activeTriggerElement = (_c = eventDetails.trigger) != null ? _c : null;
        }
        this.update(updatedState);
      };
      if (isHover) {
        this.set("stickIfOpen", true);
        this.context.stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
          this.set("stickIfOpen", false);
        });
        ReactDOM2.flushSync(changeState);
      } else {
        changeState();
      }
      if (isKeyboardClick || isDismissClose) {
        this.set("instantType", isKeyboardClick ? "click" : "dismiss");
      } else if (eventDetails.reason === reason_parts_exports.focusOut) {
        this.set("instantType", "focus");
      } else {
        this.set("instantType", void 0);
      }
    });
    __publicField(this, "disposeEffect", () => {
      return this.context.stickIfOpenTimeout.disposeEffect();
    });
  }
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new _PopoverStore(initialState);
    }).current;
    const store = externalStore != null ? externalStore : internalStore;
    useOnMount(internalStore.disposeEffect);
    return store;
  }
};
function PopoverRootComponent({
  props
}) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const store = PopoverStore.useStore(handle == null ? void 0 : handle.store, {
    modal,
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
  const open = store.useState("open");
  const positionerElement = store.useState("positionerElement");
  const payload = store.useState("payload");
  const openReason = store.useState("openChangeReason");
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const {
    openMethod,
    triggerProps: interactionTypeTriggerProps
  } = useOpenInteractionType(open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.update({
      stickIfOpen: true,
      openChangeReason: null
    });
  });
  useScrollLock(open && modal === true && openReason !== reason_parts_exports.triggerHover && openMethod !== "touch", positionerElement);
  React3.useEffect(() => {
    if (!open) {
      store.context.stickIfOpenTimeout.clear();
    }
  }, [store, open]);
  const createPopoverEventDetails = React3.useCallback((reason) => {
    const details = createChangeEventDetails(reason);
    details.preventUnmountOnClose = () => {
      store.set("preventUnmountingOnClose", true);
    };
    return details;
  }, [store]);
  const handleImperativeClose = React3.useCallback(() => {
    store.setOpen(false, createPopoverEventDetails(reason_parts_exports.imperativeAction));
  }, [store, createPopoverEventDetails]);
  React3.useImperativeHandle(props.actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const floatingRootContext = useSyncedFloatingRootContext({
    popupStore: store,
    onOpenChange: store.setOpen
  });
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent: {
      // Ensure `aria-hidden` on outside elements is removed immediately
      // on outside press when trapping focus.
      mouse: modal === "trap-focus" ? "sloppy" : "intentional",
      touch: "sloppy"
    }
  });
  const role = useRole(floatingRootContext);
  const {
    getReferenceProps,
    getFloatingProps,
    getTriggerProps
  } = useInteractions([dismiss, role]);
  const activeTriggerProps = React3.useMemo(() => {
    return getReferenceProps(interactionTypeTriggerProps);
  }, [getReferenceProps, interactionTypeTriggerProps]);
  const inactiveTriggerProps = React3.useMemo(() => {
    return getTriggerProps(interactionTypeTriggerProps);
  }, [getTriggerProps, interactionTypeTriggerProps]);
  const popupProps = React3.useMemo(() => {
    return getFloatingProps();
  }, [getFloatingProps]);
  store.useSyncedValues({
    modal,
    openMethod,
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    floatingRootContext,
    nested: useFloatingParentNodeId() != null
  });
  const popoverContext = React3.useMemo(() => ({
    store
  }), [store]);
  return /* @__PURE__ */ jsx(PopoverRootContext.Provider, {
    value: popoverContext,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
}
function PopoverRoot(props) {
  if (usePopoverRootContext(true)) {
    return /* @__PURE__ */ jsx(PopoverRootComponent, {
      props
    });
  }
  return /* @__PURE__ */ jsx(FloatingTree, {
    children: /* @__PURE__ */ jsx(PopoverRootComponent, {
      props
    })
  });
}

// ../../node_modules/@base-ui/react/esm/popover/utils/constants.js
var OPEN_DELAY = 300;
var PopoverTrigger = /* @__PURE__ */ React3.forwardRef(function PopoverTrigger2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    render,
    className,
    disabled = false,
    nativeButton = true,
    handle,
    payload,
    openOnHover = false,
    delay = OPEN_DELAY,
    closeDelay = 0,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton",
    "handle",
    "payload",
    "openOnHover",
    "delay",
    "closeDelay",
    "id"
  ]);
  const rootContext = usePopoverRootContext(true);
  const store = (_b = handle == null ? void 0 : handle.store) != null ? _b : rootContext == null ? void 0 : rootContext.store;
  if (!store) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Popover.Trigger> must be either used within a <Popover.Root> component or provided with a handle." : formatErrorMessage_default(74));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const floatingContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const triggerElementRef = React3.useRef(null);
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    disabled,
    openOnHover,
    closeDelay
  });
  const openReason = store.useState("openChangeReason");
  const stickIfOpen = store.useState("stickIfOpen");
  const openMethod = store.useState("openMethod");
  const hoverProps = useHoverReferenceInteraction(floatingContext, {
    enabled: floatingContext != null && openOnHover && (openMethod !== "touch" || openReason !== reason_parts_exports.triggerPress),
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    restMs: delay,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    isActiveTrigger: isTriggerActive
  });
  const click = useClick(floatingContext, {
    enabled: floatingContext != null,
    stickIfOpen
  });
  const localProps = useInteractions([click]);
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const stateAttributesMapping4 = React3.useMemo(() => ({
    open(value) {
      if (value && openReason === reason_parts_exports.triggerPress) {
        return pressableTriggerOpenStateMapping.open(value);
      }
      return triggerOpenStateMapping.open(value);
    }
  }), [openReason]);
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [localProps.getReferenceProps(), hoverProps, rootTriggerProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId
    }, elementProps, getButtonProps],
    stateAttributesMapping: stateAttributesMapping4
  });
  const preFocusGuardRef = React3.useRef(null);
  const handlePreFocusGuardFocus = useStableCallback((event) => {
    ReactDOM2.flushSync(() => {
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
    });
    const previousTabbable = getTabbableBeforeElement(preFocusGuardRef.current);
    previousTabbable == null ? void 0 : previousTabbable.focus();
  });
  const handleFocusTargetFocus = useStableCallback((event) => {
    var _a2;
    const positionerElement = store.select("positionerElement");
    if (positionerElement && isOutsideEvent(event, positionerElement)) {
      (_a2 = store.context.beforeContentFocusGuardRef.current) == null ? void 0 : _a2.focus();
    } else {
      ReactDOM2.flushSync(() => {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
      });
      let nextTabbable = getTabbableAfterElement(store.context.triggerFocusTargetRef.current || triggerElementRef.current);
      while (nextTabbable !== null && contains(positionerElement, nextTabbable)) {
        const prevTabbable = nextTabbable;
        nextTabbable = getNextTabbable(nextTabbable);
        if (nextTabbable === prevTabbable) {
          break;
        }
      }
      nextTabbable == null ? void 0 : nextTabbable.focus();
    }
  });
  if (isTriggerActive) {
    return /* @__PURE__ */ jsxs(React3.Fragment, {
      children: [/* @__PURE__ */ jsx(FocusGuard, {
        ref: preFocusGuardRef,
        onFocus: handlePreFocusGuardFocus
      }), /* @__PURE__ */ jsx(React3.Fragment, {
        children: element
      }, thisTriggerId), /* @__PURE__ */ jsx(FocusGuard, {
        ref: store.context.triggerFocusTargetRef,
        onFocus: handleFocusTargetFocus
      })]
    });
  }
  return /* @__PURE__ */ jsx(React3.Fragment, {
    children: element
  }, thisTriggerId);
});
if (process.env.NODE_ENV !== "production") PopoverTrigger.displayName = "PopoverTrigger";
var PopoverPortalContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PopoverPortalContext.displayName = "PopoverPortalContext";
function usePopoverPortalContext() {
  const value = React3.useContext(PopoverPortalContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Popover.Portal> is missing." : formatErrorMessage_default(45));
  }
  return value;
}
var PopoverPortal = /* @__PURE__ */ React3.forwardRef(function PopoverPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(PopoverPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsx(FloatingPortal, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") PopoverPortal.displayName = "PopoverPortal";
var PopoverPositionerContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") PopoverPositionerContext.displayName = "PopoverPositionerContext";
function usePopoverPositionerContext() {
  const context = React3.useContext(PopoverPositionerContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: PopoverPositionerContext is missing. PopoverPositioner parts must be placed within <Popover.Positioner>." : formatErrorMessage_default(46));
  }
  return context;
}
var PopoverPositioner = /* @__PURE__ */ React3.forwardRef(function PopoverPositioner2(componentProps, forwardedRef) {
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
  const {
    store
  } = usePopoverRootContext();
  const keepMounted = usePopoverPortalContext();
  const nodeId = useFloatingNodeId();
  const floatingRootContext = store.useState("floatingRootContext");
  const mounted = store.useState("mounted");
  const open = store.useState("open");
  const openReason = store.useState("openChangeReason");
  const triggerElement = store.useState("activeTriggerElement");
  const modal = store.useState("modal");
  const positionerElement = store.useState("positionerElement");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const prevTriggerElementRef = React3.useRef(null);
  const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
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
  const positioner = React3.useMemo(() => __spreadValues({
    props: defaultProps
  }, positioning), [defaultProps, positioning]);
  const domReference = floatingRootContext.useState("domReferenceElement");
  useIsoLayoutEffect(() => {
    const currentTriggerElement = domReference;
    const prevTriggerElement = prevTriggerElementRef.current;
    if (currentTriggerElement) {
      prevTriggerElementRef.current = currentTriggerElement;
    }
    if (prevTriggerElement && currentTriggerElement && currentTriggerElement !== prevTriggerElement) {
      store.set("instantType", void 0);
      const ac = new AbortController();
      runOnceAnimationsFinish(() => {
        store.set("instantType", "trigger-change");
      }, ac.signal);
      return () => {
        ac.abort();
      };
    }
    return void 0;
  }, [domReference, runOnceAnimationsFinish, store]);
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    anchorHidden: positioner.anchorHidden,
    instant: instantType
  };
  const setPositionerElement = React3.useCallback((element2) => {
    store.set("positionerElement", element2);
  }, [store]);
  const element = useRenderElement("div", componentProps, {
    state,
    props: [positioner.props, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    ref: [forwardedRef, setPositionerElement],
    stateAttributesMapping: popupStateMapping
  });
  return /* @__PURE__ */ jsxs(PopoverPositionerContext.Provider, {
    value: positioner,
    children: [mounted && modal === true && openReason !== reason_parts_exports.triggerHover && /* @__PURE__ */ jsx(InternalBackdrop, {
      ref: store.context.internalBackdropRef,
      inert: inertValue(!open),
      cutout: triggerElement
    }), /* @__PURE__ */ jsx(FloatingNode, {
      id: nodeId,
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") PopoverPositioner.displayName = "PopoverPositioner";
var ClosePartContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ClosePartContext.displayName = "ClosePartContext";
function useClosePartCount() {
  const [closePartCount, setClosePartCount] = React3.useState(0);
  const register = useStableCallback(() => {
    setClosePartCount((count) => count + 1);
    return () => {
      setClosePartCount((count) => Math.max(0, count - 1));
    };
  });
  const context = React3.useMemo(() => ({
    register
  }), [register]);
  return {
    context,
    hasClosePart: closePartCount > 0
  };
}
function ClosePartProvider(props) {
  const {
    value,
    children
  } = props;
  return /* @__PURE__ */ jsx(ClosePartContext.Provider, {
    value,
    children
  });
}
function useClosePartRegistration() {
  const context = React3.useContext(ClosePartContext);
  useIsoLayoutEffect(() => {
    return context == null ? void 0 : context.register();
  }, [context]);
}
var stateAttributesMapping = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var PopoverPopup = /* @__PURE__ */ React3.forwardRef(function PopoverPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    initialFocus,
    finalFocus
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "initialFocus",
    "finalFocus"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const positioner = usePopoverPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const {
    context: closePartContext,
    hasClosePart
  } = useClosePartCount();
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const titleId = store.useState("titleElementId");
  const descriptionId = store.useState("descriptionElementId");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const openReason = store.useState("openChangeReason");
  const activeTriggerElement = store.useState("activeTriggerElement");
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
  const openOnHover = store.useState("openOnHover");
  const closeDelay = store.useState("closeDelay");
  useHoverFloatingInteraction(floatingContext, {
    enabled: openOnHover && !disabled,
    closeDelay
  });
  function defaultInitialFocus(interactionType) {
    if (interactionType === "touch") {
      return store.context.popupRef.current;
    }
    return true;
  }
  const resolvedInitialFocus = initialFocus === void 0 ? defaultInitialFocus : initialFocus;
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    instant: instantType,
    transitionStatus
  };
  const focusManagerModal = modal !== false && hasClosePart;
  const setPopupElement = React3.useCallback((element2) => {
    store.set("popupElement", element2);
  }, [store]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    props: [popupProps, {
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsx(FloatingFocusManager, {
    context: floatingContext,
    openInteractionType: openMethod,
    modal: focusManagerModal,
    disabled: !mounted || openReason === reason_parts_exports.triggerHover,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    restoreFocus: "popup",
    previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : void 0,
    nextFocusableElement: store.context.triggerFocusTargetRef,
    beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
    children: /* @__PURE__ */ jsx(ClosePartProvider, {
      value: closePartContext,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") PopoverPopup.displayName = "PopoverPopup";
var PopoverArrow = /* @__PURE__ */ React3.forwardRef(function PopoverArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const open = store.useState("open");
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = usePopoverPositionerContext();
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
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
if (process.env.NODE_ENV !== "production") PopoverArrow.displayName = "PopoverArrow";
var stateAttributesMapping2 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var PopoverBackdrop = /* @__PURE__ */ React3.forwardRef(function PopoverBackdrop2(props, forwardedRef) {
  const _a = props, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const openReason = store.useState("openChangeReason");
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", props, {
    state,
    ref: [store.context.backdropRef, forwardedRef],
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: openReason === reason_parts_exports.triggerHover ? "none" : void 0,
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverBackdrop.displayName = "PopoverBackdrop";
var PopoverTitle = /* @__PURE__ */ React3.forwardRef(function PopoverTitle2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  useIsoLayoutEffect(() => {
    store.set("titleElementId", id);
    return () => {
      store.set("titleElementId", void 0);
    };
  }, [store, id]);
  const element = useRenderElement("h2", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverTitle.displayName = "PopoverTitle";
var PopoverDescription = /* @__PURE__ */ React3.forwardRef(function PopoverDescription2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  useIsoLayoutEffect(() => {
    store.set("descriptionElementId", id);
    return () => {
      store.set("descriptionElementId", void 0);
    };
  }, [store, id]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverDescription.displayName = "PopoverDescription";
var PopoverClose = /* @__PURE__ */ React3.forwardRef(function PopoverClose2(componentProps, forwardedRef) {
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
    buttonRef,
    getButtonProps
  } = useButton({
    disabled,
    focusableWhenDisabled: false,
    native: nativeButton
  });
  const {
    store
  } = usePopoverRootContext();
  useClosePartRegistration();
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick(event) {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.closePress, event.nativeEvent, event.currentTarget));
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverClose.displayName = "PopoverClose";

// ../../node_modules/@base-ui/react/esm/popover/viewport/PopoverViewportCssVars.js
var PopoverViewportCssVars = /* @__PURE__ */ (function(PopoverViewportCssVars2) {
  PopoverViewportCssVars2["popupWidth"] = "--popup-width";
  PopoverViewportCssVars2["popupHeight"] = "--popup-height";
  return PopoverViewportCssVars2;
})({});

// ../../node_modules/@base-ui/react/esm/popover/viewport/PopoverViewport.js
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var PopoverViewport = /* @__PURE__ */ React3.forwardRef(function PopoverViewport2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "children"
  ]);
  const {
    store
  } = usePopoverRootContext();
  const {
    side
  } = usePopoverPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side,
    cssVars: PopoverViewportCssVars,
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
if (process.env.NODE_ENV !== "production") PopoverViewport.displayName = "PopoverViewport";

// ../../node_modules/@base-ui/react/esm/popover/store/PopoverHandle.js
var PopoverHandle = class {
  /**
   * Internal store holding the popover's state.
   * @internal
   */
  constructor() {
    this.store = new PopoverStore();
  }
  /**
   * Opens the popover and associates it with the trigger with the given id.
   * The trigger must be a Popover.Trigger component with this handle passed as a prop.
   *
   * @param triggerId ID of the trigger to associate with the popover.
   */
  open(triggerId) {
    var _a;
    const triggerElement = triggerId ? (_a = this.store.context.triggerElements.getById(triggerId)) != null ? _a : void 0 : void 0;
    if (triggerId && !triggerElement) {
      throw new Error(process.env.NODE_ENV !== "production" ? `Base UI: PopoverHandle.open: No trigger found with id "${triggerId}".` : formatErrorMessage_default(80, triggerId));
    }
    this.store.setOpen(true, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, triggerElement));
  }
  /**
   * Closes the popover.
   */
  close() {
    this.store.setOpen(false, createChangeEventDetails(reason_parts_exports.imperativeAction, void 0, void 0));
  }
  /**
   * Indicates whether the popover is currently open.
   */
  get isOpen() {
    return this.store.state.open;
  }
};
function createPopoverHandle() {
  return new PopoverHandle();
}
function Popover(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "popover" }, props));
}
function PopoverTrigger3(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "popover-trigger" }, props));
}
function PopoverContent(_a) {
  var _b = _a, {
    className,
    align = "start",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4
  } = _b, props = __objRest(_b, [
    "className",
    "align",
    "alignOffset",
    "side",
    "sideOffset"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { children: /* @__PURE__ */ jsx(
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
          "data-slot": "popover-content",
          className: cn(
            "z-50 flex w-[280px] origin-(--transform-origin) flex-col gap-2.5 rounded-md bg-popover p-3 text-[13px] text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )
        }, props)
      )
    }
  ) });
}
function PopoverHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "popover-header",
      className: cn("flex flex-col gap-0.5 text-[13px]", className)
    }, props)
  );
}
function PopoverTitle3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Title,
    __spreadValues({
      "data-slot": "popover-title",
      className: cn("font-semibold", className)
    }, props)
  );
}
function PopoverDescription3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Description,
    __spreadValues({
      "data-slot": "popover-description",
      className: cn("text-muted-foreground", className)
    }, props)
  );
}

export { Popover, PopoverContent, PopoverDescription3 as PopoverDescription, PopoverHeader, PopoverTitle3 as PopoverTitle, PopoverTrigger3 as PopoverTrigger, index_parts_exports };
//# sourceMappingURL=chunk-CPCPI5H4.mjs.map
//# sourceMappingURL=chunk-CPCPI5H4.mjs.map