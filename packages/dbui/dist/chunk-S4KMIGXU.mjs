import { usePopupViewport } from './chunk-F6U7T6AJ.mjs';
import { ChevronRight } from './chunk-SKOBVIBK.mjs';
import { popupStoreSelectors, useImplicitActiveTrigger, useOpenStateTransitions, useTriggerDataForwarding, useTriggerRegistration, createInitialPopupStoreState } from './chunk-2ZE5P47Q.mjs';
import { Input } from './chunk-RALFBPK4.mjs';
import { useToolbarRootContext } from './chunk-T7CEVU6N.mjs';
import { getPseudoElementBounds, Check } from './chunk-JN7JP22S.mjs';
import { Separator } from './chunk-VX2FCPLK.mjs';
import { getDisabledMountTransitionStyles, useAnchorPositioning, adaptiveOrigin } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { InternalBackdrop, useOpenInteractionType, useScrollLock } from './chunk-4AAVJQFL.mjs';
import { popupStateMapping, useHoverFloatingInteraction, FloatingFocusManager, FloatingPortal, FloatingNode, createSelector, fastComponent, useFloatingNodeId, useFloatingParentNodeId, useSyncedFloatingRootContext, useDismiss, useRole, useListNavigation, useTypeahead, useInteractions, FloatingTree, fastComponentRef, useFloatingTree, FloatingTreeStore, useHoverReferenceInteraction, safePolygon, useClick, useFocus, getTabbableBeforeElement, isOutsideEvent, getTabbableAfterElement, getNextTabbable, pressableTriggerOpenStateMapping, FocusGuard, triggerOpenStateMapping, ReactStore, PopupTriggerMap } from './chunk-PSMHWWS3.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { useTimeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { Checkbox } from './chunk-RJZRDRNU.mjs';
import { CompositeItem } from './chunk-TM5TEJGH.mjs';
import { COMPOSITE_KEYS } from './chunk-QGKCYW24.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useCompositeListItem } from './chunk-SDWHTCRY.mjs';
import { useDirection } from './chunk-NNBMTHBT.mjs';
import { contains } from './chunk-FQ4RTFU7.mjs';
import { isMac } from './chunk-BO7ZMLYZ.mjs';
import { transitionStatusMapping, useTransitionStatus, useOpenChangeComplete, useAnimationsFinished } from './chunk-INMEVUNJ.mjs';
import { useButton, useCompositeRootContext } from './chunk-ETMT7VCK.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { reason_parts_exports, createChangeEventDetails } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId, useId } from './chunk-WIUX54UE.mjs';
import { isHTMLElement, isLastTraversableNode, getParentNode } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, DROPDOWN_COLLISION_AVOIDANCE, POPUP_COLLISION_AVOIDANCE, EMPTY_ARRAY, TYPEAHEAD_RESET_MS, mergeProps, formatErrorMessage_default, EMPTY_OBJECT, PATIENT_CLICK_THRESHOLD, useMergedRefs, useRefWithInit } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadValues, __spreadProps, __publicField } from './chunk-LQPATFHW.mjs';
import * as React28 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';

// ../../node_modules/@base-ui/react/esm/menu/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => MenuArrow,
  Backdrop: () => MenuBackdrop,
  CheckboxItem: () => MenuCheckboxItem,
  CheckboxItemIndicator: () => MenuCheckboxItemIndicator,
  Group: () => MenuGroup,
  GroupLabel: () => MenuGroupLabel,
  Handle: () => MenuHandle,
  Item: () => MenuItem,
  LinkItem: () => MenuLinkItem,
  Popup: () => MenuPopup,
  Portal: () => MenuPortal,
  Positioner: () => MenuPositioner,
  RadioGroup: () => MenuRadioGroup,
  RadioItem: () => MenuRadioItem,
  RadioItemIndicator: () => MenuRadioItemIndicator,
  Root: () => MenuRoot,
  Separator: () => Separator,
  SubmenuRoot: () => MenuSubmenuRoot,
  SubmenuTrigger: () => MenuSubmenuTrigger,
  Trigger: () => MenuTrigger,
  Viewport: () => MenuViewport,
  createHandle: () => createMenuHandle
});
var MenuPositionerContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuPositionerContext.displayName = "MenuPositionerContext";
function useMenuPositionerContext(optional) {
  const context = React28.useContext(MenuPositionerContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>." : formatErrorMessage_default(33));
  }
  return context;
}
var MenuRootContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuRootContext.displayName = "MenuRootContext";
function useMenuRootContext(optional) {
  const context = React28.useContext(MenuRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>." : formatErrorMessage_default(36));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/menu/arrow/MenuArrow.js
var MenuArrow = /* @__PURE__ */ React28.forwardRef(function MenuArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = useMenuRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useMenuPositionerContext();
  const open = store.useState("open");
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
  };
  return useRenderElement("div", componentProps, {
    ref: [arrowRef, forwardedRef],
    stateAttributesMapping: popupStateMapping,
    state,
    props: __spreadValues({
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps)
  });
});
if (process.env.NODE_ENV !== "production") MenuArrow.displayName = "MenuArrow";
var ContextMenuRootContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") ContextMenuRootContext.displayName = "ContextMenuRootContext";
function useContextMenuRootContext(optional = true) {
  const context = React28.useContext(ContextMenuRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>." : formatErrorMessage_default(25));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/menu/backdrop/MenuBackdrop.js
var stateAttributesMapping = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var MenuBackdrop = /* @__PURE__ */ React28.forwardRef(function MenuBackdrop2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = useMenuRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const contextMenuContext = useContextMenuRootContext();
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    ref: (contextMenuContext == null ? void 0 : contextMenuContext.backdropRef) ? [forwardedRef, contextMenuContext.backdropRef] : forwardedRef,
    state,
    stateAttributesMapping,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: lastOpenChangeReason === reason_parts_exports.triggerHover ? "none" : void 0,
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") MenuBackdrop.displayName = "MenuBackdrop";
var MenuCheckboxItemContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuCheckboxItemContext.displayName = "MenuCheckboxItemContext";
function useMenuCheckboxItemContext() {
  const context = React28.useContext(MenuCheckboxItemContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuCheckboxItemContext is missing. MenuCheckboxItem parts must be placed within <Menu.CheckboxItem>." : formatErrorMessage_default(30));
  }
  return context;
}
function useMenuItemCommonProps(params) {
  const {
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef,
    itemMetadata
  } = params;
  const {
    events: menuEvents
  } = store.useState("floatingTreeRoot");
  const contextMenuContext = useContextMenuRootContext(true);
  const isContextMenu = contextMenuContext !== void 0;
  return React28.useMemo(() => ({
    id,
    role: "menuitem",
    tabIndex: highlighted ? 0 : -1,
    onKeyDown(event) {
      if (event.key === " " && (typingRef == null ? void 0 : typingRef.current)) {
        event.preventDefault();
      }
    },
    onMouseMove(event) {
      if (!nodeId) {
        return;
      }
      menuEvents.emit("itemhover", {
        nodeId,
        target: event.currentTarget
      });
    },
    onClick(event) {
      if (closeOnClick) {
        menuEvents.emit("close", {
          domEvent: event,
          reason: reason_parts_exports.itemPress
        });
      }
    },
    onMouseUp(event) {
      if (contextMenuContext) {
        const initialCursorPoint = contextMenuContext.initialCursorPointRef.current;
        contextMenuContext.initialCursorPointRef.current = null;
        if (isContextMenu && initialCursorPoint && Math.abs(event.clientX - initialCursorPoint.x) <= 1 && Math.abs(event.clientY - initialCursorPoint.y) <= 1) {
          return;
        }
        if (isContextMenu && !isMac && event.button === 2) {
          return;
        }
      }
      if (itemRef.current && store.context.allowMouseUpTriggerRef.current && (!isContextMenu || event.button === 2)) {
        if (!itemMetadata || itemMetadata.type === "regular-item") {
          itemRef.current.click();
        }
      }
    }
  }), [closeOnClick, highlighted, id, menuEvents, nodeId, store, typingRef, itemRef, contextMenuContext, isContextMenu, itemMetadata]);
}

// ../../node_modules/@base-ui/react/esm/menu/item/useMenuItem.js
var REGULAR_ITEM = {
  type: "regular-item"
};
function useMenuItem(params) {
  const {
    closeOnClick,
    disabled = false,
    highlighted,
    id,
    store,
    typingRef = store.context.typingRef,
    nativeButton,
    itemMetadata,
    nodeId
  } = params;
  const itemRef = React28.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  const commonProps = useMenuItemCommonProps({
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef,
    itemMetadata
  });
  const getItemProps = React28.useCallback((externalProps) => {
    return mergeProps(commonProps, {
      onMouseEnter() {
        if (itemMetadata.type !== "submenu-trigger") {
          return;
        }
        itemMetadata.setActive();
      }
    }, externalProps, getButtonProps);
  }, [commonProps, getButtonProps, itemMetadata]);
  const mergedRef = useMergedRefs(itemRef, buttonRef);
  return React28.useMemo(() => ({
    getItemProps,
    itemRef: mergedRef
  }), [getItemProps, mergedRef]);
}

// ../../node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItemDataAttributes.js
var MenuCheckboxItemDataAttributes = /* @__PURE__ */ (function(MenuCheckboxItemDataAttributes2) {
  MenuCheckboxItemDataAttributes2["checked"] = "data-checked";
  MenuCheckboxItemDataAttributes2["unchecked"] = "data-unchecked";
  MenuCheckboxItemDataAttributes2["disabled"] = "data-disabled";
  MenuCheckboxItemDataAttributes2["highlighted"] = "data-highlighted";
  return MenuCheckboxItemDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/menu/utils/stateAttributesMapping.js
var itemMapping = __spreadValues({
  checked(value) {
    if (value) {
      return {
        [MenuCheckboxItemDataAttributes.checked]: ""
      };
    }
    return {
      [MenuCheckboxItemDataAttributes.unchecked]: ""
    };
  }
}, transitionStatusMapping);
var MenuCheckboxItem = /* @__PURE__ */ React28.forwardRef(function MenuCheckboxItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled = false,
    closeOnClick = false,
    checked: checkedProp,
    defaultChecked,
    onCheckedChange
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "label",
    "nativeButton",
    "disabled",
    "closeOnClick",
    "checked",
    "defaultChecked",
    "onCheckedChange"
  ]);
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: defaultChecked != null ? defaultChecked : false,
    name: "MenuCheckboxItem",
    state: "checked"
  });
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext == null ? void 0 : menuPositionerContext.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React28.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  const handleClick = useStableCallback((event) => {
    const details = __spreadProps(__spreadValues({}, createChangeEventDetails(reason_parts_exports.itemPress, event.nativeEvent)), {
      preventUnmountOnClose: () => {
      }
    });
    onCheckedChange == null ? void 0 : onCheckedChange(!checked, details);
    if (details.isCanceled) {
      return;
    }
    setChecked((currentlyChecked) => !currentlyChecked);
  });
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    props: [itemProps, {
      role: "menuitemcheckbox",
      "aria-checked": checked,
      onClick: handleClick
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
  return /* @__PURE__ */ jsx(MenuCheckboxItemContext.Provider, {
    value: state,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuCheckboxItem.displayName = "MenuCheckboxItem";
var MenuCheckboxItemIndicator = /* @__PURE__ */ React28.forwardRef(function MenuCheckboxItemIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "keepMounted"
  ]);
  const item = useMenuCheckboxItemContext();
  const indicatorRef = React28.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(item.checked);
  useOpenChangeComplete({
    open: item.checked,
    ref: indicatorRef,
    onComplete() {
      if (!item.checked) {
        setMounted(false);
      }
    }
  });
  const state = {
    checked: item.checked,
    disabled: item.disabled,
    highlighted: item.highlighted,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, indicatorRef],
    stateAttributesMapping: itemMapping,
    props: __spreadValues({
      "aria-hidden": true
    }, elementProps),
    enabled: keepMounted || item.checked
  });
  return element;
});
if (process.env.NODE_ENV !== "production") MenuCheckboxItemIndicator.displayName = "MenuCheckboxItemIndicator";
var MenuGroupContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuGroupContext.displayName = "MenuGroupContext";
function useMenuGroupRootContext() {
  const context = React28.useContext(MenuGroupContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuGroupRootContext is missing. Menu group parts must be used within <Menu.Group>." : formatErrorMessage_default(31));
  }
  return context;
}
var MenuGroup = /* @__PURE__ */ React28.forwardRef(function MenuGroup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const [labelId, setLabelId] = React28.useState(void 0);
  const context = React28.useMemo(() => ({
    setLabelId
  }), [setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: __spreadValues({
      role: "group",
      "aria-labelledby": labelId
    }, elementProps)
  });
  return /* @__PURE__ */ jsx(MenuGroupContext.Provider, {
    value: context,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuGroup.displayName = "MenuGroup";
var MenuGroupLabel = /* @__PURE__ */ React28.forwardRef(function MenuGroupLabelComponent(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "id"
  ]);
  const id = useBaseUiId(idProp);
  const {
    setLabelId
  } = useMenuGroupRootContext();
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(void 0);
    };
  }, [setLabelId, id]);
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: __spreadValues({
      id,
      role: "presentation"
    }, elementProps)
  });
});
if (process.env.NODE_ENV !== "production") MenuGroupLabel.displayName = "MenuGroupLabel";
var MenuItem = /* @__PURE__ */ React28.forwardRef(function MenuItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled = false,
    closeOnClick = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "label",
    "nativeButton",
    "disabled",
    "closeOnClick"
  ]);
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext == null ? void 0 : menuPositionerContext.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = {
    disabled,
    highlighted
  };
  return useRenderElement("div", componentProps, {
    state,
    props: [itemProps, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
});
if (process.env.NODE_ENV !== "production") MenuItem.displayName = "MenuItem";
var MenuLinkItem = /* @__PURE__ */ React28.forwardRef(function MenuLinkItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    label,
    closeOnClick = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "label",
    "closeOnClick"
  ]);
  const linkRef = React28.useRef(null);
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const nodeId = menuPositionerContext == null ? void 0 : menuPositionerContext.nodeId;
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const typingRef = store.context.typingRef;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    native: false,
    composite: true
  });
  const commonProps = useMenuItemCommonProps({
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef: linkRef
  });
  function getItemProps(externalProps) {
    return mergeProps(commonProps, externalProps, getButtonProps);
  }
  const state = React28.useMemo(() => ({
    highlighted
  }), [highlighted]);
  return useRenderElement("a", componentProps, {
    state,
    props: [itemProps, elementProps, getItemProps],
    ref: [linkRef, buttonRef, forwardedRef, listItem.ref]
  });
});
if (process.env.NODE_ENV !== "production") MenuLinkItem.displayName = "MenuLinkItem";
var stateAttributesMapping2 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var MenuPopup = /* @__PURE__ */ React28.forwardRef(function MenuPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    finalFocus
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "finalFocus"
  ]);
  const {
    store
  } = useMenuRootContext();
  const {
    side,
    align
  } = useMenuPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const open = store.useState("open");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const mounted = store.useState("mounted");
  const instantType = store.useState("instantType");
  const triggerElement = store.useState("activeTriggerElement");
  const parent = store.useState("parent");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const rootId = store.useState("rootId");
  const floatingContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const closeDelay = store.useState("closeDelay");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const isContextMenu = parent.type === "context-menu";
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
  React28.useEffect(() => {
    function handleClose(event) {
      store.setOpen(false, createChangeEventDetails(event.reason, event.domEvent));
    }
    floatingTreeRoot.events.on("close", handleClose);
    return () => {
      floatingTreeRoot.events.off("close", handleClose);
    };
  }, [floatingTreeRoot.events, store]);
  const hoverEnabled = store.useState("hoverEnabled");
  const disabled = store.useState("disabled");
  useHoverFloatingInteraction(floatingContext, {
    enabled: hoverEnabled && !disabled && !isContextMenu && parent.type !== "menubar",
    closeDelay
  });
  const state = {
    transitionStatus,
    side,
    align,
    open,
    nested: parent.type === "menu",
    instant: instantType
  };
  const setPopupElement = React28.useCallback((element2) => {
    store.set("popupElement", element2);
  }, [store]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    stateAttributesMapping: stateAttributesMapping2,
    props: [popupProps, {
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps, {
      "data-rootownerid": rootId
    }]
  });
  let returnFocus = parent.type === void 0 || isContextMenu;
  if (triggerElement || parent.type === "menubar" && lastOpenChangeReason !== reason_parts_exports.outsidePress) {
    returnFocus = true;
  }
  return /* @__PURE__ */ jsx(FloatingFocusManager, {
    context: floatingContext,
    modal: isContextMenu,
    disabled: !mounted,
    returnFocus: finalFocus === void 0 ? returnFocus : finalFocus,
    initialFocus: parent.type !== "menu",
    restoreFocus: true,
    externalTree: parent.type !== "menubar" ? floatingTreeRoot : void 0,
    previousFocusableElement: activeTriggerElement,
    nextFocusableElement: parent.type === void 0 ? store.context.triggerFocusTargetRef : void 0,
    beforeContentFocusGuardRef: parent.type === void 0 ? store.context.beforeContentFocusGuardRef : void 0,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuPopup.displayName = "MenuPopup";
var MenuPortalContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuPortalContext.displayName = "MenuPortalContext";
function useMenuPortalContext() {
  const value = React28.useContext(MenuPortalContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Menu.Portal> is missing." : formatErrorMessage_default(32));
  }
  return value;
}
var MenuPortal = /* @__PURE__ */ React28.forwardRef(function MenuPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const {
    store
  } = useMenuRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(MenuPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsx(FloatingPortal, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") MenuPortal.displayName = "MenuPortal";
var MenuPositioner = /* @__PURE__ */ React28.forwardRef(function MenuPositioner2(componentProps, forwardedRef) {
  var _b, _c, _d, _e;
  const _a = componentProps, {
    anchor: anchorProp,
    positionMethod: positionMethodProp = "absolute",
    className,
    render,
    side,
    align: alignProp,
    sideOffset: sideOffsetProp = 0,
    alignOffset: alignOffsetProp = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    collisionAvoidance: collisionAvoidanceProp = DROPDOWN_COLLISION_AVOIDANCE
  } = _a, elementProps = __objRest(_a, [
    "anchor",
    "positionMethod",
    "className",
    "render",
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
  } = useMenuRootContext();
  const keepMounted = useMenuPortalContext();
  const contextMenuContext = useContextMenuRootContext(true);
  const parent = store.useState("parent");
  const floatingRootContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const mounted = store.useState("mounted");
  const open = store.useState("open");
  const modal = store.useState("modal");
  const triggerElement = store.useState("activeTriggerElement");
  const transitionStatus = store.useState("transitionStatus");
  const positionerElement = store.useState("positionerElement");
  const instantType = store.useState("instantType");
  const hasViewport = store.useState("hasViewport");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const floatingNodeId = store.useState("floatingNodeId");
  const floatingParentNodeId = store.useState("floatingParentNodeId");
  const domReference = floatingRootContext.useState("domReferenceElement");
  const previousTriggerRef = React28.useRef(null);
  const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
  let anchor = anchorProp;
  let sideOffset = sideOffsetProp;
  let alignOffset = alignOffsetProp;
  let align = alignProp;
  let collisionAvoidance = collisionAvoidanceProp;
  if (parent.type === "context-menu") {
    anchor = anchorProp != null ? anchorProp : (_b = parent.context) == null ? void 0 : _b.anchor;
    align = align != null ? align : "start";
    if (!side && align !== "center") {
      alignOffset = (_c = componentProps.alignOffset) != null ? _c : 2;
      sideOffset = (_d = componentProps.sideOffset) != null ? _d : -5;
    }
  }
  let computedSide = side;
  let computedAlign = align;
  if (parent.type === "menu") {
    computedSide = computedSide != null ? computedSide : "inline-end";
    computedAlign = computedAlign != null ? computedAlign : "start";
    collisionAvoidance = (_e = componentProps.collisionAvoidance) != null ? _e : POPUP_COLLISION_AVOIDANCE;
  } else if (parent.type === "menubar") {
    computedSide = computedSide != null ? computedSide : "bottom";
    computedAlign = computedAlign != null ? computedAlign : "start";
  }
  const contextMenu = parent.type === "context-menu";
  const positioner = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod: contextMenuContext ? "fixed" : positionMethodProp,
    mounted,
    side: computedSide,
    sideOffset,
    align: computedAlign,
    alignOffset,
    arrowPadding: contextMenu ? 0 : arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    nodeId: floatingNodeId,
    keepMounted,
    disableAnchorTracking,
    collisionAvoidance,
    shiftCrossAxis: contextMenu && !("side" in collisionAvoidance && collisionAvoidance.side === "flip"),
    externalTree: floatingTreeRoot,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : void 0
  });
  const positionerProps = React28.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
      hiddenStyles.pointerEvents = "none";
    }
    return {
      role: "presentation",
      hidden: !mounted,
      style: __spreadValues(__spreadValues({}, positioner.positionerStyles), hiddenStyles)
    };
  }, [open, mounted, positioner.positionerStyles]);
  React28.useEffect(() => {
    function onMenuOpenChange(details) {
      if (details.open) {
        if (details.parentNodeId === floatingNodeId) {
          store.set("hoverEnabled", false);
        }
        if (details.nodeId !== floatingNodeId && details.parentNodeId === store.select("floatingParentNodeId")) {
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.siblingOpen));
        }
      }
    }
    floatingTreeRoot.events.on("menuopenchange", onMenuOpenChange);
    return () => {
      floatingTreeRoot.events.off("menuopenchange", onMenuOpenChange);
    };
  }, [store, floatingTreeRoot.events, floatingNodeId]);
  React28.useEffect(() => {
    if (store.select("floatingParentNodeId") == null) {
      return void 0;
    }
    function onParentClose(details) {
      var _a2;
      if (details.open || details.nodeId !== store.select("floatingParentNodeId")) {
        return;
      }
      const reason = (_a2 = details.reason) != null ? _a2 : reason_parts_exports.siblingOpen;
      store.setOpen(false, createChangeEventDetails(reason));
    }
    floatingTreeRoot.events.on("menuopenchange", onParentClose);
    return () => {
      floatingTreeRoot.events.off("menuopenchange", onParentClose);
    };
  }, [floatingTreeRoot.events, store]);
  const closeTimeout = useTimeout();
  React28.useEffect(() => {
    if (!open) {
      closeTimeout.clear();
    }
  }, [open, closeTimeout]);
  React28.useEffect(() => {
    function onItemHover(event) {
      if (!open || event.nodeId !== store.select("floatingParentNodeId")) {
        return;
      }
      if (event.target && triggerElement && triggerElement !== event.target) {
        const delay = store.select("closeDelay");
        if (delay > 0) {
          if (!closeTimeout.isStarted()) {
            closeTimeout.start(delay, () => {
              store.setOpen(false, createChangeEventDetails(reason_parts_exports.siblingOpen));
            });
          }
        } else {
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.siblingOpen));
        }
      } else {
        closeTimeout.clear();
      }
    }
    floatingTreeRoot.events.on("itemhover", onItemHover);
    return () => {
      floatingTreeRoot.events.off("itemhover", onItemHover);
    };
  }, [floatingTreeRoot.events, open, triggerElement, store, closeTimeout]);
  React28.useEffect(() => {
    const eventDetails = {
      open,
      nodeId: floatingNodeId,
      parentNodeId: floatingParentNodeId,
      reason: store.select("lastOpenChangeReason")
    };
    floatingTreeRoot.events.emit("menuopenchange", eventDetails);
  }, [floatingTreeRoot.events, open, store, floatingNodeId, floatingParentNodeId]);
  useIsoLayoutEffect(() => {
    const currentTrigger = domReference;
    const previousTrigger = previousTriggerRef.current;
    if (currentTrigger) {
      previousTriggerRef.current = currentTrigger;
    }
    if (previousTrigger && currentTrigger && currentTrigger !== previousTrigger) {
      store.set("instantType", void 0);
      const abortController = new AbortController();
      runOnceAnimationsFinish(() => {
        store.set("instantType", "trigger-change");
      }, abortController.signal);
      return () => {
        abortController.abort();
      };
    }
    return void 0;
  }, [domReference, runOnceAnimationsFinish, store]);
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    anchorHidden: positioner.anchorHidden,
    nested: parent.type === "menu",
    instant: instantType
  };
  const contextValue = React28.useMemo(() => ({
    side: positioner.side,
    align: positioner.align,
    arrowRef: positioner.arrowRef,
    arrowUncentered: positioner.arrowUncentered,
    arrowStyles: positioner.arrowStyles,
    nodeId: positioner.context.nodeId
  }), [positioner.side, positioner.align, positioner.arrowRef, positioner.arrowUncentered, positioner.arrowStyles, positioner.context.nodeId]);
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: popupStateMapping,
    ref: [forwardedRef, store.useStateSetter("positionerElement")],
    props: [positionerProps, getDisabledMountTransitionStyles(transitionStatus), elementProps]
  });
  const shouldRenderBackdrop = mounted && parent.type !== "menu" && (parent.type !== "menubar" && modal && lastOpenChangeReason !== reason_parts_exports.triggerHover || parent.type === "menubar" && parent.context.modal);
  let backdropCutout = null;
  if (parent.type === "menubar") {
    backdropCutout = parent.context.contentElement;
  } else if (parent.type === void 0) {
    backdropCutout = triggerElement;
  }
  return /* @__PURE__ */ jsxs(MenuPositionerContext.Provider, {
    value: contextValue,
    children: [shouldRenderBackdrop && /* @__PURE__ */ jsx(InternalBackdrop, {
      ref: parent.type === "context-menu" || parent.type === "nested-context-menu" ? parent.context.internalBackdropRef : null,
      inert: inertValue(!open),
      cutout: backdropCutout
    }), /* @__PURE__ */ jsx(FloatingNode, {
      id: floatingNodeId,
      children: /* @__PURE__ */ jsx(CompositeList, {
        elementsRef: store.context.itemDomElements,
        labelsRef: store.context.itemLabels,
        children: element
      })
    })]
  });
});
if (process.env.NODE_ENV !== "production") MenuPositioner.displayName = "MenuPositioner";
var MenuRadioGroupContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuRadioGroupContext.displayName = "MenuRadioGroupContext";
function useMenuRadioGroupContext() {
  const context = React28.useContext(MenuRadioGroupContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>." : formatErrorMessage_default(34));
  }
  return context;
}
var MenuRadioGroup = /* @__PURE__ */ React28.memo(/* @__PURE__ */ React28.forwardRef(function MenuRadioGroup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    value: valueProp,
    defaultValue,
    onValueChange: onValueChangeProp,
    disabled = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "value",
    "defaultValue",
    "onValueChange",
    "disabled"
  ]);
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "MenuRadioGroup"
  });
  const onValueChange = useStableCallback(onValueChangeProp);
  const setValue = useStableCallback((newValue, eventDetails) => {
    onValueChange == null ? void 0 : onValueChange(newValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(newValue);
  });
  const state = {
    disabled
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: __spreadValues({
      role: "group",
      "aria-disabled": disabled || void 0
    }, elementProps)
  });
  const context = React28.useMemo(() => ({
    value,
    setValue,
    disabled
  }), [value, setValue, disabled]);
  return /* @__PURE__ */ jsx(MenuRadioGroupContext.Provider, {
    value: context,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") MenuRadioGroup.displayName = "MenuRadioGroup";
var MenuRadioItemContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuRadioItemContext.displayName = "MenuRadioItemContext";
function useMenuRadioItemContext() {
  const context = React28.useContext(MenuRadioItemContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenuRadioItemContext is missing. MenuRadioItem parts must be placed within <Menu.RadioItem>." : formatErrorMessage_default(35));
  }
  return context;
}
var MenuRadioItem = /* @__PURE__ */ React28.forwardRef(function MenuRadioItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled: disabledProp = false,
    closeOnClick = false,
    value
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "label",
    "nativeButton",
    "disabled",
    "closeOnClick",
    "value"
  ]);
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const {
    value: selectedValue,
    setValue: setSelectedValue,
    disabled: groupDisabled
  } = useMenuRadioGroupContext();
  const disabled = groupDisabled || disabledProp;
  const checked = selectedValue === value;
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext == null ? void 0 : menuPositionerContext.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React28.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  const handleClick = useStableCallback((event) => {
    const details = __spreadProps(__spreadValues({}, createChangeEventDetails(reason_parts_exports.itemPress, event.nativeEvent)), {
      preventUnmountOnClose: () => {
      }
    });
    setSelectedValue(value, details);
  });
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    props: [itemProps, {
      role: "menuitemradio",
      "aria-checked": checked,
      onClick: handleClick
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
  return /* @__PURE__ */ jsx(MenuRadioItemContext.Provider, {
    value: state,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuRadioItem.displayName = "MenuRadioItem";
var MenuRadioItemIndicator = /* @__PURE__ */ React28.forwardRef(function MenuRadioItemIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "keepMounted"
  ]);
  const item = useMenuRadioItemContext();
  const indicatorRef = React28.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(item.checked);
  useOpenChangeComplete({
    open: item.checked,
    ref: indicatorRef,
    onComplete() {
      if (!item.checked) {
        setMounted(false);
      }
    }
  });
  const state = {
    checked: item.checked,
    disabled: item.disabled,
    highlighted: item.highlighted,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    ref: [forwardedRef, indicatorRef],
    props: __spreadValues({
      "aria-hidden": true
    }, elementProps),
    enabled: keepMounted || item.checked
  });
  return element;
});
if (process.env.NODE_ENV !== "production") MenuRadioItemIndicator.displayName = "MenuRadioItemIndicator";
var MenubarContext = /* @__PURE__ */ React28.createContext(null);
if (process.env.NODE_ENV !== "production") MenubarContext.displayName = "MenubarContext";
function useMenubarContext(optional) {
  const context = React28.useContext(MenubarContext);
  if (context === null && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>." : formatErrorMessage_default(5));
  }
  return context;
}
var selectors = __spreadProps(__spreadValues({}, popupStoreSelectors), {
  disabled: createSelector((state) => state.parent.type === "menubar" ? state.parent.context.disabled || state.disabled : state.disabled),
  modal: createSelector((state) => {
    var _a;
    return (state.parent.type === void 0 || state.parent.type === "context-menu") && ((_a = state.modal) != null ? _a : true);
  }),
  allowMouseEnter: createSelector((state) => state.allowMouseEnter),
  stickIfOpen: createSelector((state) => state.stickIfOpen),
  parent: createSelector((state) => state.parent),
  rootId: createSelector((state) => {
    if (state.parent.type === "menu") {
      return state.parent.store.select("rootId");
    }
    return state.parent.type !== void 0 ? state.parent.context.rootId : state.rootId;
  }),
  activeIndex: createSelector((state) => state.activeIndex),
  isActive: createSelector((state, itemIndex) => state.activeIndex === itemIndex),
  hoverEnabled: createSelector((state) => state.hoverEnabled),
  instantType: createSelector((state) => state.instantType),
  lastOpenChangeReason: createSelector((state) => state.openChangeReason),
  floatingTreeRoot: createSelector((state) => {
    if (state.parent.type === "menu") {
      return state.parent.store.select("floatingTreeRoot");
    }
    return state.floatingTreeRoot;
  }),
  floatingNodeId: createSelector((state) => state.floatingNodeId),
  floatingParentNodeId: createSelector((state) => state.floatingParentNodeId),
  itemProps: createSelector((state) => state.itemProps),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport),
  keyboardEventRelay: createSelector((state) => {
    if (state.keyboardEventRelay) {
      return state.keyboardEventRelay;
    }
    if (state.parent.type === "menu") {
      return state.parent.store.select("keyboardEventRelay");
    }
    return void 0;
  })
});
var MenuStore = class _MenuStore extends ReactStore {
  constructor(initialState) {
    super(__spreadValues(__spreadValues({}, createInitialState()), initialState), {
      positionerRef: /* @__PURE__ */ React28.createRef(),
      popupRef: /* @__PURE__ */ React28.createRef(),
      typingRef: {
        current: false
      },
      itemDomElements: {
        current: []
      },
      itemLabels: {
        current: []
      },
      allowMouseUpTriggerRef: {
        current: false
      },
      triggerFocusTargetRef: /* @__PURE__ */ React28.createRef(),
      beforeContentFocusGuardRef: /* @__PURE__ */ React28.createRef(),
      onOpenChangeComplete: void 0,
      triggerElements: new PopupTriggerMap()
    }, selectors);
    __publicField(this, "unsubscribeParentListener", null);
    this.unsubscribeParentListener = this.observe("parent", (parent) => {
      var _a;
      (_a = this.unsubscribeParentListener) == null ? void 0 : _a.call(this);
      if (parent.type === "menu") {
        let rootId = parent.store.select("rootId");
        let floatingTreeRoot = parent.store.select("floatingTreeRoot");
        let keyboardEventRelay = parent.store.select("keyboardEventRelay");
        this.unsubscribeParentListener = parent.store.subscribe(() => {
          const nextRootId = parent.store.select("rootId");
          const nextFloatingTreeRoot = parent.store.select("floatingTreeRoot");
          const nextKeyboardEventRelay = parent.store.select("keyboardEventRelay");
          if (rootId === nextRootId && floatingTreeRoot === nextFloatingTreeRoot && keyboardEventRelay === nextKeyboardEventRelay) {
            return;
          }
          rootId = nextRootId;
          floatingTreeRoot = nextFloatingTreeRoot;
          keyboardEventRelay = nextKeyboardEventRelay;
          this.notifyAll();
        });
        this.context.allowMouseUpTriggerRef = parent.store.context.allowMouseUpTriggerRef;
        return;
      }
      if (parent.type !== void 0) {
        this.context.allowMouseUpTriggerRef = parent.context.allowMouseUpTriggerRef;
      }
      this.unsubscribeParentListener = null;
    });
  }
  setOpen(open, eventDetails) {
    this.state.floatingRootContext.context.events.emit("setOpen", {
      open,
      eventDetails
    });
  }
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new _MenuStore(initialState);
    }).current;
    return externalStore != null ? externalStore : internalStore;
  }
};
function createInitialState() {
  return __spreadProps(__spreadValues({}, createInitialPopupStoreState()), {
    disabled: false,
    modal: true,
    allowMouseEnter: false,
    stickIfOpen: true,
    parent: {
      type: void 0
    },
    rootId: void 0,
    activeIndex: null,
    hoverEnabled: true,
    instantType: void 0,
    openChangeReason: null,
    floatingTreeRoot: new FloatingTreeStore(),
    floatingNodeId: void 0,
    floatingParentNodeId: null,
    itemProps: EMPTY_OBJECT,
    keyboardEventRelay: void 0,
    closeDelay: 0,
    hasViewport: false
  });
}
var MenuSubmenuRootContext = /* @__PURE__ */ React28.createContext(void 0);
if (process.env.NODE_ENV !== "production") MenuSubmenuRootContext.displayName = "MenuSubmenuRootContext";
function useMenuSubmenuRootContext() {
  return React28.useContext(MenuSubmenuRootContext);
}
var MenuRoot = fastComponent(function MenuRoot2(props) {
  const {
    children,
    open: openProp,
    onOpenChange,
    onOpenChangeComplete,
    defaultOpen = false,
    disabled: disabledProp = false,
    modal: modalProp,
    loopFocus = true,
    orientation = "vertical",
    actionsRef,
    closeParentOnEsc = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    highlightItemOnHover = true
  } = props;
  const contextMenuContext = useContextMenuRootContext(true);
  const parentMenuRootContext = useMenuRootContext(true);
  const menubarContext = useMenubarContext(true);
  const isSubmenu = useMenuSubmenuRootContext();
  const parentFromContext = React28.useMemo(() => {
    if (isSubmenu && parentMenuRootContext) {
      return {
        type: "menu",
        store: parentMenuRootContext.store
      };
    }
    if (menubarContext) {
      return {
        type: "menubar",
        context: menubarContext
      };
    }
    if (contextMenuContext && !parentMenuRootContext) {
      return {
        type: "context-menu",
        context: contextMenuContext
      };
    }
    return {
      type: void 0
    };
  }, [contextMenuContext, parentMenuRootContext, menubarContext, isSubmenu]);
  const store = MenuStore.useStore(handle == null ? void 0 : handle.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
    parent: parentFromContext
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
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const floatingNodeIdFromContext = useFloatingNodeId(floatingTreeRoot);
  const floatingParentNodeIdFromContext = useFloatingParentNodeId();
  useIsoLayoutEffect(() => {
    if (contextMenuContext && !parentMenuRootContext) {
      store.update({
        parent: {
          type: "context-menu",
          context: contextMenuContext
        },
        floatingNodeId: floatingNodeIdFromContext,
        floatingParentNodeId: floatingParentNodeIdFromContext
      });
    } else if (parentMenuRootContext) {
      store.update({
        floatingNodeId: floatingNodeIdFromContext,
        floatingParentNodeId: floatingParentNodeIdFromContext
      });
    }
  }, [contextMenuContext, parentMenuRootContext, floatingNodeIdFromContext, floatingParentNodeIdFromContext, store]);
  const open = store.useState("open");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const positionerElement = store.useState("positionerElement");
  const hoverEnabled = store.useState("hoverEnabled");
  const modal = store.useState("modal");
  const disabled = store.useState("disabled");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const parent = store.useState("parent");
  const activeIndex = store.useState("activeIndex");
  const payload = store.useState("payload");
  const floatingParentNodeId = store.useState("floatingParentNodeId");
  const openEventRef = React28.useRef(null);
  const nested = floatingParentNodeId != null;
  let floatingEvents;
  if (process.env.NODE_ENV !== "production") {
    if (parent.type !== void 0 && modalProp !== void 0) {
      console.warn("Base UI: The `modal` prop is not supported on nested menus. It will be ignored.");
    }
  }
  store.useSyncedValues({
    disabled: disabledProp,
    modal: parent.type === void 0 ? modalProp : void 0,
    rootId: useId()
  });
  const {
    openMethod,
    triggerProps: interactionTypeProps
  } = useOpenInteractionType(open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.update({
      allowMouseEnter: false,
      stickIfOpen: true
    });
  });
  const allowOutsidePressDismissalRef = React28.useRef(parent.type !== "context-menu");
  const allowOutsidePressDismissalTimeout = useTimeout();
  React28.useEffect(() => {
    if (!open) {
      openEventRef.current = null;
    }
    if (parent.type !== "context-menu") {
      return;
    }
    if (!open) {
      allowOutsidePressDismissalTimeout.clear();
      allowOutsidePressDismissalRef.current = false;
      return;
    }
    allowOutsidePressDismissalTimeout.start(500, () => {
      allowOutsidePressDismissalRef.current = true;
    });
  }, [allowOutsidePressDismissalTimeout, open, parent.type]);
  useScrollLock(open && modal && lastOpenChangeReason !== reason_parts_exports.triggerHover && openMethod !== "touch", positionerElement);
  useIsoLayoutEffect(() => {
    if (!open && !hoverEnabled) {
      store.set("hoverEnabled", true);
    }
  }, [open, hoverEnabled, store]);
  const allowTouchToCloseRef = React28.useRef(true);
  const allowTouchToCloseTimeout = useTimeout();
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    var _a, _b, _c, _d;
    const reason = eventDetails.reason;
    if (open === nextOpen && eventDetails.trigger === activeTriggerElement && lastOpenChangeReason === reason) {
      return;
    }
    eventDetails.preventUnmountOnClose = () => {
      store.set("preventUnmountingOnClose", true);
    };
    if (!nextOpen && eventDetails.trigger == null) {
      eventDetails.trigger = activeTriggerElement != null ? activeTriggerElement : void 0;
    }
    onOpenChange == null ? void 0 : onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    const details = {
      open: nextOpen,
      nativeEvent: eventDetails.event,
      reason: eventDetails.reason,
      nested
    };
    floatingEvents == null ? void 0 : floatingEvents.emit("openchange", details);
    const nativeEvent = eventDetails.event;
    if (nextOpen === false && (nativeEvent == null ? void 0 : nativeEvent.type) === "click" && nativeEvent.pointerType === "touch" && !allowTouchToCloseRef.current) {
      return;
    }
    if (!nextOpen && activeIndex !== null) {
      const activeOption = store.context.itemDomElements.current[activeIndex];
      queueMicrotask(() => {
        activeOption == null ? void 0 : activeOption.setAttribute("tabindex", "-1");
      });
    }
    if (nextOpen && reason === reason_parts_exports.triggerFocus) {
      allowTouchToCloseRef.current = false;
      allowTouchToCloseTimeout.start(300, () => {
        allowTouchToCloseRef.current = true;
      });
    } else {
      allowTouchToCloseRef.current = true;
      allowTouchToCloseTimeout.clear();
    }
    const isKeyboardClick = (reason === reason_parts_exports.triggerPress || reason === reason_parts_exports.itemPress) && nativeEvent.detail === 0 && (nativeEvent == null ? void 0 : nativeEvent.isTrusted);
    const isDismissClose = !nextOpen && (reason === reason_parts_exports.escapeKey || reason == null);
    const updatedState = {
      open: nextOpen,
      openChangeReason: reason
    };
    openEventRef.current = (_a = eventDetails.event) != null ? _a : null;
    const newTriggerId = (_c = (_b = eventDetails.trigger) == null ? void 0 : _b.id) != null ? _c : null;
    if (newTriggerId || nextOpen) {
      updatedState.activeTriggerId = newTriggerId;
      updatedState.activeTriggerElement = (_d = eventDetails.trigger) != null ? _d : null;
    }
    store.update(updatedState);
    if (parent.type === "menubar" && (reason === reason_parts_exports.triggerFocus || reason === reason_parts_exports.focusOut || reason === reason_parts_exports.triggerHover || reason === reason_parts_exports.listNavigation || reason === reason_parts_exports.siblingOpen)) {
      store.set("instantType", "group");
    } else if (isKeyboardClick || isDismissClose) {
      store.set("instantType", isKeyboardClick ? "click" : "dismiss");
    } else {
      store.set("instantType", void 0);
    }
  });
  const createMenuEventDetails = React28.useCallback((reason) => {
    const details = createChangeEventDetails(reason);
    details.preventUnmountOnClose = () => {
      store.set("preventUnmountingOnClose", true);
    };
    return details;
  }, [store]);
  const handleImperativeClose = React28.useCallback(() => {
    store.setOpen(false, createMenuEventDetails(reason_parts_exports.imperativeAction));
  }, [store, createMenuEventDetails]);
  React28.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  let ctx;
  if (parent.type === "context-menu") {
    ctx = parent.context;
  }
  React28.useImperativeHandle(ctx == null ? void 0 : ctx.positionerRef, () => positionerElement, [positionerElement]);
  React28.useImperativeHandle(ctx == null ? void 0 : ctx.actionsRef, () => ({
    setOpen
  }), [setOpen]);
  const floatingRootContext = useSyncedFloatingRootContext({
    popupStore: store,
    onOpenChange: setOpen
  });
  floatingEvents = floatingRootContext.context.events;
  React28.useEffect(() => {
    const handleSetOpenEvent = ({
      open: nextOpen,
      eventDetails
    }) => setOpen(nextOpen, eventDetails);
    floatingEvents.on("setOpen", handleSetOpenEvent);
    return () => {
      floatingEvents == null ? void 0 : floatingEvents.off("setOpen", handleSetOpenEvent);
    };
  }, [floatingEvents, setOpen]);
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    bubbles: {
      escapeKey: closeParentOnEsc && parent.type === "menu"
    },
    outsidePress() {
      var _a;
      if (parent.type !== "context-menu" || ((_a = openEventRef.current) == null ? void 0 : _a.type) === "contextmenu") {
        return true;
      }
      return allowOutsidePressDismissalRef.current;
    },
    externalTree: nested ? floatingTreeRoot : void 0
  });
  const role = useRole(floatingRootContext, {
    role: "menu"
  });
  const direction = useDirection();
  const setActiveIndex = React28.useCallback((index) => {
    if (store.select("activeIndex") === index) {
      return;
    }
    store.set("activeIndex", index);
  }, [store]);
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !disabled,
    listRef: store.context.itemDomElements,
    activeIndex,
    nested: parent.type !== void 0,
    loopFocus,
    orientation,
    parentOrientation: parent.type === "menubar" ? parent.context.orientation : void 0,
    rtl: direction === "rtl",
    disabledIndices: EMPTY_ARRAY,
    onNavigate: setActiveIndex,
    openOnArrowKeyDown: parent.type !== "context-menu",
    externalTree: nested ? floatingTreeRoot : void 0,
    focusItemOnHover: highlightItemOnHover
  });
  const onTypingChange = React28.useCallback((nextTyping) => {
    store.context.typingRef.current = nextTyping;
  }, [store]);
  const typeahead = useTypeahead(floatingRootContext, {
    listRef: store.context.itemLabels,
    elementsRef: store.context.itemDomElements,
    activeIndex,
    resetMs: TYPEAHEAD_RESET_MS,
    onMatch: (index) => {
      if (open && index !== activeIndex) {
        store.set("activeIndex", index);
      }
    },
    onTypingChange
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    getTriggerProps
  } = useInteractions([dismiss, role, listNavigation, typeahead]);
  const activeTriggerProps = React28.useMemo(() => {
    const mergedProps = mergeProps(getReferenceProps(), {
      onMouseMove() {
        store.set("allowMouseEnter", true);
      }
    }, interactionTypeProps);
    delete mergedProps.role;
    return mergedProps;
  }, [getReferenceProps, store, interactionTypeProps]);
  const inactiveTriggerProps = React28.useMemo(() => {
    const triggerProps = getTriggerProps();
    if (!triggerProps) {
      return triggerProps;
    }
    const mergedProps = mergeProps(triggerProps, interactionTypeProps);
    delete mergedProps.role;
    delete mergedProps["aria-controls"];
    return mergedProps;
  }, [getTriggerProps, interactionTypeProps]);
  const popupProps = React28.useMemo(() => getFloatingProps({
    onMouseMove() {
      store.set("allowMouseEnter", true);
      if (parent.type === "menu") {
        store.set("hoverEnabled", false);
      }
    },
    onClick() {
      if (store.select("hoverEnabled")) {
        store.set("hoverEnabled", false);
      }
    },
    onKeyDown(event) {
      const relay = store.select("keyboardEventRelay");
      if (relay && !event.isPropagationStopped()) {
        relay(event);
      }
    }
  }), [getFloatingProps, parent.type, store]);
  const itemProps = React28.useMemo(() => getItemProps(), [getItemProps]);
  store.useSyncedValues({
    floatingRootContext,
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    itemProps
  });
  const context = React28.useMemo(() => ({
    store,
    parent: parentFromContext
  }), [store, parentFromContext]);
  const content = /* @__PURE__ */ jsx(MenuRootContext.Provider, {
    value: context,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
  if (parent.type === void 0 || parent.type === "context-menu") {
    return /* @__PURE__ */ jsx(FloatingTree, {
      externalTree: floatingTreeRoot,
      children: content
    });
  }
  return content;
});
if (process.env.NODE_ENV !== "production") MenuRoot.displayName = "MenuRoot";
function MenuSubmenuRoot(props) {
  const parentMenu = useMenuRootContext().store;
  const contextValue = React28.useMemo(() => ({
    parentMenu
  }), [parentMenu]);
  return /* @__PURE__ */ jsx(MenuSubmenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(MenuRoot, __spreadValues({}, props))
  });
}

// ../../node_modules/@base-ui/react/esm/menu/utils/findRootOwnerId.js
function findRootOwnerId(node) {
  var _a;
  if (isHTMLElement(node) && node.hasAttribute("data-rootownerid")) {
    return (_a = node.getAttribute("data-rootownerid")) != null ? _a : void 0;
  }
  if (isLastTraversableNode(node)) {
    return void 0;
  }
  return findRootOwnerId(getParentNode(node));
}
function useMixedToggleClickHandler(params) {
  const {
    enabled = true,
    mouseDownAction,
    open
  } = params;
  const ignoreClickRef = React28.useRef(false);
  return React28.useMemo(() => {
    if (!enabled) {
      return EMPTY_OBJECT;
    }
    return {
      onMouseDown: (event) => {
        if (mouseDownAction === "open" && !open || mouseDownAction === "close" && open) {
          ignoreClickRef.current = true;
          ownerDocument(event.currentTarget).addEventListener("click", () => {
            ignoreClickRef.current = false;
          }, {
            once: true
          });
        }
      },
      onClick: (event) => {
        if (ignoreClickRef.current) {
          ignoreClickRef.current = false;
          event.preventBaseUIHandler();
        }
      }
    };
  }, [enabled, mouseDownAction, open]);
}
var BOUNDARY_OFFSET = 2;
var MenuTrigger = fastComponentRef(function MenuTrigger2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    id: idProp,
    openOnHover: openOnHoverProp,
    delay = 100,
    closeDelay = 0,
    handle,
    payload
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton",
    "id",
    "openOnHover",
    "delay",
    "closeDelay",
    "handle",
    "payload"
  ]);
  const rootContext = useMenuRootContext(true);
  const store = (_b = handle == null ? void 0 : handle.store) != null ? _b : rootContext == null ? void 0 : rootContext.store;
  if (!store) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Menu.Trigger> must be either used within a <Menu.Root> component or provided with a handle." : formatErrorMessage_default(85));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const triggerElementRef = React28.useRef(null);
  const parent = useMenuParent();
  const compositeRootContext = useCompositeRootContext(true);
  const floatingTreeRootFromContext = useFloatingTree();
  const floatingTreeRoot = React28.useMemo(() => {
    return floatingTreeRootFromContext != null ? floatingTreeRootFromContext : new FloatingTreeStore();
  }, [floatingTreeRootFromContext]);
  const floatingNodeId = useFloatingNodeId(floatingTreeRoot);
  const floatingParentNodeId = useFloatingParentNodeId();
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    closeDelay,
    parent,
    floatingTreeRoot,
    floatingNodeId,
    floatingParentNodeId,
    keyboardEventRelay: compositeRootContext == null ? void 0 : compositeRootContext.relayKeyboardEvent
  });
  const isInMenubar = parent.type === "menubar";
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp || rootDisabled || isInMenubar && parent.context.disabled;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  React28.useEffect(() => {
    if (!isOpenedByThisTrigger && parent.type === void 0) {
      store.context.allowMouseUpTriggerRef.current = false;
    }
  }, [store, isOpenedByThisTrigger, parent.type]);
  const triggerRef = React28.useRef(null);
  const allowMouseUpTriggerTimeout = useTimeout();
  const handleDocumentMouseUp = useStableCallback((mouseEvent) => {
    if (!triggerRef.current) {
      return;
    }
    allowMouseUpTriggerTimeout.clear();
    store.context.allowMouseUpTriggerRef.current = false;
    const mouseUpTarget = mouseEvent.target;
    if (contains(triggerRef.current, mouseUpTarget) || contains(store.select("positionerElement"), mouseUpTarget) || mouseUpTarget === triggerRef.current) {
      return;
    }
    if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === store.select("rootId")) {
      return;
    }
    const bounds = getPseudoElementBounds(triggerRef.current);
    if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
      return;
    }
    floatingTreeRoot.events.emit("close", {
      domEvent: mouseEvent,
      reason: reason_parts_exports.cancelOpen
    });
  });
  React28.useEffect(() => {
    if (isOpenedByThisTrigger && store.select("lastOpenChangeReason") === reason_parts_exports.triggerHover) {
      const doc = ownerDocument(triggerRef.current);
      doc.addEventListener("mouseup", handleDocumentMouseUp, {
        once: true
      });
    }
  }, [isOpenedByThisTrigger, handleDocumentMouseUp, store]);
  const parentMenubarHasSubmenuOpen = isInMenubar && parent.context.hasSubmenuOpen;
  const openOnHover = openOnHoverProp != null ? openOnHoverProp : parentMenubarHasSubmenuOpen;
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: openOnHover && !disabled && parent.type !== "context-menu" && (!isInMenubar || parentMenubarHasSubmenuOpen && !isMountedByThisTrigger),
    handleClose: safePolygon({
      blockPointerEvents: !isInMenubar
    }),
    mouseOnly: true,
    move: false,
    restMs: parent.type === void 0 ? delay : void 0,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    externalTree: floatingTreeRoot,
    isActiveTrigger: isTriggerActive
  });
  const stickIfOpen = useStickIfOpen(isOpenedByThisTrigger, store.select("lastOpenChangeReason"));
  const click = useClick(floatingRootContext, {
    enabled: !disabled && parent.type !== "context-menu",
    event: isOpenedByThisTrigger && isInMenubar ? "click" : "mousedown",
    toggle: true,
    ignoreMouse: false,
    stickIfOpen: parent.type === void 0 ? stickIfOpen : false
  });
  const focus = useFocus(floatingRootContext, {
    enabled: !disabled && parentMenubarHasSubmenuOpen
  });
  const mixedToggleHandlers = useMixedToggleClickHandler({
    open: isOpenedByThisTrigger,
    enabled: isInMenubar,
    mouseDownAction: "open"
  });
  const localInteractionProps = useInteractions([click, focus]);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const ref = [triggerRef, forwardedRef, buttonRef, registerTrigger, triggerElementRef];
  const props = [localInteractionProps.getReferenceProps(), hoverProps != null ? hoverProps : EMPTY_OBJECT, rootTriggerProps, {
    "aria-haspopup": "menu",
    id: thisTriggerId,
    onMouseDown: (event) => {
      if (store.select("open")) {
        return;
      }
      allowMouseUpTriggerTimeout.start(200, () => {
        store.context.allowMouseUpTriggerRef.current = true;
      });
      const doc = ownerDocument(event.currentTarget);
      doc.addEventListener("mouseup", handleDocumentMouseUp, {
        once: true
      });
    }
  }, isInMenubar ? {
    role: "menuitem"
  } : {}, mixedToggleHandlers, elementProps, getButtonProps];
  const preFocusGuardRef = React28.useRef(null);
  const handlePreFocusGuardFocus = useStableCallback((event) => {
    ReactDOM.flushSync(() => {
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
    });
    const previousTabbable = getTabbableBeforeElement(preFocusGuardRef.current);
    previousTabbable == null ? void 0 : previousTabbable.focus();
  });
  const handleFocusTargetFocus = useStableCallback((event) => {
    var _a2;
    const currentPositionerElement = store.select("positionerElement");
    if (currentPositionerElement && isOutsideEvent(event, currentPositionerElement)) {
      (_a2 = store.context.beforeContentFocusGuardRef.current) == null ? void 0 : _a2.focus();
    } else {
      ReactDOM.flushSync(() => {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
      });
      let nextTabbable = getTabbableAfterElement(store.context.triggerFocusTargetRef.current || triggerElementRef.current);
      while (nextTabbable !== null && contains(currentPositionerElement, nextTabbable)) {
        const prevTabbable = nextTabbable;
        nextTabbable = getNextTabbable(nextTabbable);
        if (nextTabbable === prevTabbable) {
          break;
        }
      }
      nextTabbable == null ? void 0 : nextTabbable.focus();
    }
  });
  const element = useRenderElement("button", componentProps, {
    enabled: !isInMenubar,
    stateAttributesMapping: pressableTriggerOpenStateMapping,
    state,
    ref,
    props
  });
  if (isInMenubar) {
    return /* @__PURE__ */ jsx(CompositeItem, {
      tag: "button",
      render,
      className,
      state,
      refs: ref,
      props,
      stateAttributesMapping: pressableTriggerOpenStateMapping
    });
  }
  if (isOpenedByThisTrigger) {
    return /* @__PURE__ */ jsxs(React28.Fragment, {
      children: [/* @__PURE__ */ jsx(FocusGuard, {
        ref: preFocusGuardRef,
        onFocus: handlePreFocusGuardFocus
      }, `${thisTriggerId}-pre-focus-guard`), /* @__PURE__ */ jsx(React28.Fragment, {
        children: element
      }, thisTriggerId), /* @__PURE__ */ jsx(FocusGuard, {
        ref: store.context.triggerFocusTargetRef,
        onFocus: handleFocusTargetFocus
      }, `${thisTriggerId}-post-focus-guard`)]
    });
  }
  return /* @__PURE__ */ jsx(React28.Fragment, {
    children: element
  }, thisTriggerId);
});
if (process.env.NODE_ENV !== "production") MenuTrigger.displayName = "MenuTrigger";
function useStickIfOpen(open, openReason) {
  const stickIfOpenTimeout = useTimeout();
  const [stickIfOpen, setStickIfOpen] = React28.useState(false);
  useIsoLayoutEffect(() => {
    if (open && openReason === "trigger-hover") {
      setStickIfOpen(true);
      stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        setStickIfOpen(false);
      });
    } else if (!open) {
      stickIfOpenTimeout.clear();
      setStickIfOpen(false);
    }
  }, [open, openReason, stickIfOpenTimeout]);
  return stickIfOpen;
}
function useMenuParent() {
  const contextMenuContext = useContextMenuRootContext(true);
  const parentContext = useMenuRootContext(true);
  const menubarContext = useMenubarContext(true);
  const parent = React28.useMemo(() => {
    if (menubarContext) {
      return {
        type: "menubar",
        context: menubarContext
      };
    }
    if (contextMenuContext && !parentContext) {
      return {
        type: "context-menu",
        context: contextMenuContext
      };
    }
    return {
      type: void 0
    };
  }, [contextMenuContext, parentContext, menubarContext]);
  return parent;
}

// ../../node_modules/@base-ui/react/esm/menu/viewport/MenuViewportCssVars.js
var MenuViewportCssVars = /* @__PURE__ */ (function(MenuViewportCssVars2) {
  MenuViewportCssVars2["popupWidth"] = "--popup-width";
  MenuViewportCssVars2["popupHeight"] = "--popup-height";
  return MenuViewportCssVars2;
})({});

// ../../node_modules/@base-ui/react/esm/menu/viewport/MenuViewport.js
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var MenuViewport = /* @__PURE__ */ React28.forwardRef(function MenuViewport2(componentProps, forwardedRef) {
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
  } = useMenuRootContext();
  const {
    side
  } = useMenuPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side,
    cssVars: MenuViewportCssVars,
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
if (process.env.NODE_ENV !== "production") MenuViewport.displayName = "MenuViewport";
var MenuSubmenuTrigger = /* @__PURE__ */ React28.forwardRef(function SubmenuTriggerComponent(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    label,
    id: idProp,
    nativeButton = false,
    openOnHover = true,
    delay = 100,
    closeDelay = 0,
    disabled: disabledProp = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "label",
    "id",
    "nativeButton",
    "openOnHover",
    "delay",
    "closeDelay",
    "disabled"
  ]);
  const listItem = useCompositeListItem();
  const menuPositionerContext = useMenuPositionerContext();
  const {
    store
  } = useMenuRootContext();
  const thisTriggerId = useBaseUiId(idProp);
  const open = store.useState("open");
  const floatingRootContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const baseRegisterTrigger = useTriggerRegistration(thisTriggerId, store);
  const registerTrigger = React28.useCallback((element2) => {
    const cleanup = baseRegisterTrigger(element2);
    if (element2 !== null && store.select("open") && store.select("activeTriggerId") == null) {
      store.update({
        activeTriggerId: thisTriggerId,
        activeTriggerElement: element2,
        closeDelay
      });
    }
    return cleanup;
  }, [baseRegisterTrigger, closeDelay, store, thisTriggerId]);
  const triggerElementRef = React28.useRef(null);
  const handleTriggerElementRef = React28.useCallback((el) => {
    triggerElementRef.current = el;
    store.set("activeTriggerElement", el);
  }, [store]);
  const submenuRootContext = useMenuSubmenuRootContext();
  if (!(submenuRootContext == null ? void 0 : submenuRootContext.parentMenu)) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Menu.SubmenuTrigger> must be placed in <Menu.SubmenuRoot>." : formatErrorMessage_default(37));
  }
  store.useSyncedValue("closeDelay", closeDelay);
  const parentMenuStore = submenuRootContext.parentMenu;
  const itemProps = parentMenuStore.useState("itemProps");
  const highlighted = parentMenuStore.useState("isActive", listItem.index);
  const itemMetadata = React28.useMemo(() => ({
    type: "submenu-trigger",
    setActive() {
      parentMenuStore.set("activeIndex", listItem.index);
    }
  }), [parentMenuStore, listItem.index]);
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp || rootDisabled;
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick: false,
    disabled,
    highlighted,
    id: thisTriggerId,
    store,
    typingRef: parentMenuStore.context.typingRef,
    nativeButton,
    itemMetadata,
    nodeId: menuPositionerContext == null ? void 0 : menuPositionerContext.nodeId
  });
  const hoverEnabled = store.useState("hoverEnabled");
  const allowMouseEnter = parentMenuStore.useState("allowMouseEnter");
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: hoverEnabled && openOnHover && !disabled,
    handleClose: safePolygon({
      blockPointerEvents: true
    }),
    mouseOnly: true,
    move: true,
    restMs: delay,
    delay: allowMouseEnter ? {
      open: delay,
      close: closeDelay
    } : 0,
    triggerElementRef,
    externalTree: floatingTreeRoot
  });
  const click = useClick(floatingRootContext, {
    enabled: !disabled,
    event: "mousedown",
    toggle: !openOnHover,
    ignoreMouse: openOnHover,
    stickIfOpen: false
  });
  const localInteractionProps = useInteractions([click]);
  const rootTriggerProps = store.useState("triggerProps", true);
  delete rootTriggerProps.id;
  const state = {
    disabled,
    highlighted,
    open
  };
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: triggerOpenStateMapping,
    props: [localInteractionProps.getReferenceProps(), hoverProps, rootTriggerProps, itemProps, {
      tabIndex: open || highlighted ? 0 : -1,
      onBlur() {
        if (highlighted) {
          parentMenuStore.set("activeIndex", null);
        }
      }
    }, elementProps, getItemProps],
    ref: [forwardedRef, listItem.ref, itemRef, registerTrigger, handleTriggerElementRef]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

// ../../node_modules/@base-ui/react/esm/menu/store/MenuHandle.js
var MenuHandle = class {
  /**
   * Internal store holding the menu's state.
   * @internal
   */
  constructor() {
    this.store = new MenuStore();
  }
  /**
   * Opens the menu and associates it with the trigger with the given id.
   * The trigger must be a Menu.Trigger component with this handle passed as a prop.
   *
   * @param triggerId ID of the trigger to associate with the menu.
   */
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
    if (triggerId && !triggerElement) {
      throw new Error(process.env.NODE_ENV !== "production" ? `Base UI: MenuHandle.open: No trigger found with id "${triggerId}".` : formatErrorMessage_default(83, triggerId));
    }
    this.store.setOpen(true, createChangeEventDetails("imperative-action", void 0, triggerElement));
  }
  /**
   * Closes the menu.
   */
  close() {
    this.store.setOpen(false, createChangeEventDetails("imperative-action", void 0, void 0));
  }
  /**
   * Indicates whether the menu is currently open.
   */
  get isOpen() {
    return this.store.state.open;
  }
};
function createMenuHandle() {
  return new MenuHandle();
}
function DropdownMenu(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Root, __spreadValues({ "data-slot": "dropdown-menu" }, props));
}
function DropdownMenuPortal(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, __spreadValues({ "data-slot": "dropdown-menu-portal" }, props));
}
function DropdownMenuTrigger(_a) {
  var _b = _a, {
    asChild: _asChild
  } = _b, props = __objRest(_b, [
    "asChild"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Trigger, __spreadValues({ "data-slot": "dropdown-menu-trigger" }, props));
}
function DropdownMenuContent(_a) {
  var _b = _a, {
    align = "start",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4,
    className
  } = _b, props = __objRest(_b, [
    "align",
    "alignOffset",
    "side",
    "sideOffset",
    "className"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { children: /* @__PURE__ */ jsx(
    index_parts_exports.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx(
        index_parts_exports.Popup,
        __spreadValues({
          "data-slot": "dropdown-menu-content",
          className: cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className)
        }, props)
      )
    }
  ) });
}
function DropdownMenuGroup(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Group, __spreadValues({ "data-slot": "dropdown-menu-group" }, props));
}
function DropdownMenuLabel(_a) {
  var _b = _a, {
    className,
    inset
  } = _b, props = __objRest(_b, [
    "className",
    "inset"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.GroupLabel,
    __spreadValues({
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1 text-[12px] leading-[16px] text-muted-foreground data-inset:pl-7",
        className
      )
    }, props)
  );
}
function DropdownMenuItem(_a) {
  var _b = _a, {
    className,
    inset,
    variant = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "inset",
    "variant"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Item,
    __spreadValues({
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "group/dropdown-menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-sm px-2 py-1 text-[13px] outline-hidden select-none focus:bg-hover data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground dark:data-[variant=destructive]:focus:bg-destructive data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive data-[variant=destructive]:focus:*:[svg]:text-destructive-foreground",
        className
      )
    }, props)
  );
}
function DropdownMenuSub(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.SubmenuRoot, __spreadValues({ "data-slot": "dropdown-menu-sub" }, props));
}
function DropdownMenuSubTrigger(_a) {
  var _b = _a, {
    className,
    inset,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "inset",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.SubmenuTrigger,
    __spreadProps(__spreadValues({
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-[13px] outline-hidden select-none focus:bg-hover data-inset:pl-7 data-popup-open:bg-hover data-open:bg-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
      ]
    })
  );
}
function DropdownMenuSubContent(_a) {
  var _b = _a, {
    align = "start",
    alignOffset = -3,
    side = "right",
    sideOffset = 0,
    className
  } = _b, props = __objRest(_b, [
    "align",
    "alignOffset",
    "side",
    "sideOffset",
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    DropdownMenuContent,
    __spreadValues({
      "data-slot": "dropdown-menu-sub-content",
      className: cn("w-auto min-w-[96px] rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      align,
      alignOffset,
      side,
      sideOffset
    }, props)
  );
}
function DropdownMenuCheckboxItem(_a) {
  var _b = _a, {
    className,
    children,
    checked,
    inset
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "checked",
    "inset"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.CheckboxItem,
    __spreadProps(__spreadValues({
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-sm py-1 pl-1.5 pr-1.5 text-[13px] outline-hidden select-none focus:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked,
            className: "pointer-events-none",
            tabIndex: -1
          }
        ),
        children
      ]
    })
  );
}
function DropdownMenuRadioGroup(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(
    index_parts_exports.RadioGroup,
    __spreadValues({
      "data-slot": "dropdown-menu-radio-group"
    }, props)
  );
}
function DropdownMenuRadioItem(_a) {
  var _b = _a, {
    className,
    children,
    inset
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "inset"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.RadioItem,
    __spreadProps(__spreadValues({
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-sm py-1 pl-7 pr-1.5 text-[13px] outline-hidden select-none focus:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "pointer-events-none absolute left-1.5 flex size-4 items-center justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ jsx(index_parts_exports.RadioItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4" }) })
          }
        ),
        children
      ]
    })
  );
}
function DropdownMenuSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Separator,
    __spreadValues({
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className)
    }, props)
  );
}
function DropdownMenuShortcut(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "ml-auto text-[12px] tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-foreground",
        className
      )
    }, props)
  );
}
function DropdownMenuItemIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "dropdown-menu-item-icon",
      className: cn(
        "pointer-events-none shrink-0 text-muted-foreground group-focus/dropdown-menu-item:text-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function DropdownMenuItemDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "dropdown-menu-item-description",
      className: cn(
        "block text-[12px] leading-[16px] text-muted-foreground font-normal group-focus/dropdown-menu-item:text-foreground/70",
        className
      )
    }, props)
  );
}
function DropdownMenuItemBadge(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "dropdown-menu-item-badge",
      className: cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[12px] font-semibold text-muted-foreground group-focus/dropdown-menu-item:bg-accent-foreground/10 group-focus/dropdown-menu-item:text-foreground",
        className
      )
    }, props)
  );
}
function DropdownMenuSearch(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx("div", { className: "p-1", "data-slot": "dropdown-menu-search", children: /* @__PURE__ */ jsx(
    Input,
    __spreadValues({
      className: cn("w-full", className)
    }, props)
  ) });
}
function DropdownMenuEmpty(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "dropdown-menu-empty",
      className: cn(
        "flex items-center justify-center px-2 py-4 text-[13px] text-muted-foreground",
        className
      )
    }, props), {
      children: children != null ? children : "No results found."
    })
  );
}
function DropdownMenuLoading(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "dropdown-menu-loading",
      className: cn(
        "flex items-center justify-center gap-2 px-2 py-4 text-[13px] text-muted-foreground",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "size-4 animate-spin",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M8 1.5A6.5 6.5 0 1 0 14.5 8",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }
            )
          }
        ),
        children != null ? children : "Loading..."
      ]
    })
  );
}
function DropdownMenuFooter(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "dropdown-menu-footer",
      className: cn(
        "flex items-center justify-end gap-2 border-t border-border p-2",
        className
      )
    }, props)
  );
}

export { ContextMenuRootContext, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuEmpty, DropdownMenuFooter, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemBadge, DropdownMenuItemDescription, DropdownMenuItemIcon, DropdownMenuLabel, DropdownMenuLoading, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSearch, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, MenuArrow, MenuBackdrop, MenuCheckboxItem, MenuCheckboxItemIndicator, MenuGroup, MenuGroupLabel, MenuItem, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuRadioItemIndicator, MenuRootContext, MenuSubmenuRoot, MenuSubmenuTrigger, MenubarContext, findRootOwnerId, index_parts_exports, useContextMenuRootContext, useMenuRootContext, useMenubarContext };
//# sourceMappingURL=chunk-S4KMIGXU.mjs.map
//# sourceMappingURL=chunk-S4KMIGXU.mjs.map