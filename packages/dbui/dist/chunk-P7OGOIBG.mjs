import { getCssDimensions } from './chunk-R5XIMWTD.mjs';
import { cva } from './chunk-7TQTDX5Q.mjs';
import { useCSPContext } from './chunk-WUPFH4N7.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { ACTIVE_COMPOSITE_ITEM, CompositeRoot } from './chunk-6FR5MJRV.mjs';
import { useCompositeItem } from './chunk-HE7MSZBA.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useCompositeListItem } from './chunk-SDWHTCRY.mjs';
import { useDirection } from './chunk-NNBMTHBT.mjs';
import { activeElement, contains } from './chunk-FQ4RTFU7.mjs';
import { TransitionStatusDataAttributes, transitionStatusMapping, useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useOnMount } from './chunk-KJU32T43.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, EMPTY_ARRAY, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/tabs/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Indicator: () => TabsIndicator,
  List: () => TabsList,
  Panel: () => TabsPanel,
  Root: () => TabsRoot,
  Tab: () => TabsTab
});
var TabsRootContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") TabsRootContext.displayName = "TabsRootContext";
function useTabsRootContext() {
  const context = React2.useContext(TabsRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>." : formatErrorMessage_default(64));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/tabs/root/TabsRootDataAttributes.js
var TabsRootDataAttributes = /* @__PURE__ */ (function(TabsRootDataAttributes2) {
  TabsRootDataAttributes2["activationDirection"] = "data-activation-direction";
  TabsRootDataAttributes2["orientation"] = "data-orientation";
  return TabsRootDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js
var tabsStateAttributesMapping = {
  tabActivationDirection: (dir) => ({
    [TabsRootDataAttributes.activationDirection]: dir
  })
};
var TabsRoot = /* @__PURE__ */ React2.forwardRef(function TabsRoot2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    defaultValue: defaultValueProp = 0,
    onValueChange: onValueChangeProp,
    orientation = "horizontal",
    render,
    value: valueProp
  } = _a, elementProps = __objRest(_a, [
    "className",
    "defaultValue",
    "onValueChange",
    "orientation",
    "render",
    "value"
  ]);
  const direction = useDirection();
  const hasExplicitDefaultValueProp = Object.hasOwn(componentProps, "defaultValue");
  const tabPanelRefs = React2.useRef([]);
  const [mountedTabPanels, setMountedTabPanels] = React2.useState(() => /* @__PURE__ */ new Map());
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValueProp,
    name: "Tabs",
    state: "value"
  });
  const isControlled = valueProp !== void 0;
  const [tabMap, setTabMap] = React2.useState(() => /* @__PURE__ */ new Map());
  const [tabActivationDirection, setTabActivationDirection] = React2.useState("none");
  const onValueChange = useStableCallback((newValue, eventDetails) => {
    onValueChangeProp == null ? void 0 : onValueChangeProp(newValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValue(newValue);
    setTabActivationDirection(eventDetails.activationDirection);
  });
  const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
    setMountedTabPanels((prev) => {
      if (prev.get(panelValue) === panelId) {
        return prev;
      }
      const next = new Map(prev);
      next.set(panelValue, panelId);
      return next;
    });
  });
  const unregisterMountedTabPanel = useStableCallback((panelValue, panelId) => {
    setMountedTabPanels((prev) => {
      if (!prev.has(panelValue) || prev.get(panelValue) !== panelId) {
        return prev;
      }
      const next = new Map(prev);
      next.delete(panelValue);
      return next;
    });
  });
  const getTabPanelIdByValue = React2.useCallback((tabValue) => {
    return mountedTabPanels.get(tabValue);
  }, [mountedTabPanels]);
  const getTabIdByPanelValue = React2.useCallback((tabPanelValue) => {
    for (const tabMetadata of tabMap.values()) {
      if (tabPanelValue === (tabMetadata == null ? void 0 : tabMetadata.value)) {
        return tabMetadata == null ? void 0 : tabMetadata.id;
      }
    }
    return void 0;
  }, [tabMap]);
  const getTabElementBySelectedValue = React2.useCallback((selectedValue) => {
    var _a2;
    if (selectedValue === void 0) {
      return null;
    }
    for (const [tabElement, tabMetadata] of tabMap.entries()) {
      if (tabMetadata != null && selectedValue === ((_a2 = tabMetadata.value) != null ? _a2 : tabMetadata.index)) {
        return tabElement;
      }
    }
    return null;
  }, [tabMap]);
  const tabsContextValue = React2.useMemo(() => ({
    direction,
    getTabElementBySelectedValue,
    getTabIdByPanelValue,
    getTabPanelIdByValue,
    onValueChange,
    orientation,
    registerMountedTabPanel,
    setTabMap,
    unregisterMountedTabPanel,
    tabActivationDirection,
    value
  }), [direction, getTabElementBySelectedValue, getTabIdByPanelValue, getTabPanelIdByValue, onValueChange, orientation, registerMountedTabPanel, setTabMap, unregisterMountedTabPanel, tabActivationDirection, value]);
  const selectedTabMetadata = React2.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (tabMetadata != null && tabMetadata.value === value) {
        return tabMetadata;
      }
    }
    return void 0;
  }, [tabMap, value]);
  const firstEnabledTabValue = React2.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (tabMetadata != null && !tabMetadata.disabled) {
        return tabMetadata.value;
      }
    }
    return void 0;
  }, [tabMap]);
  useIsoLayoutEffect(() => {
    if (isControlled || tabMap.size === 0) {
      return;
    }
    const selectionIsDisabled = selectedTabMetadata == null ? void 0 : selectedTabMetadata.disabled;
    const selectionIsMissing = selectedTabMetadata == null && value !== null;
    const shouldHonorExplicitDefaultSelection = hasExplicitDefaultValueProp && selectionIsDisabled && value === defaultValueProp;
    if (shouldHonorExplicitDefaultSelection) {
      return;
    }
    if (!selectionIsDisabled && !selectionIsMissing) {
      return;
    }
    const fallbackValue = firstEnabledTabValue != null ? firstEnabledTabValue : null;
    if (value === fallbackValue) {
      return;
    }
    setValue(fallbackValue);
    setTabActivationDirection("none");
  }, [defaultValueProp, firstEnabledTabValue, hasExplicitDefaultValueProp, isControlled, selectedTabMetadata, setTabActivationDirection, setValue, tabMap, value]);
  const state = {
    orientation,
    tabActivationDirection
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: tabsStateAttributesMapping
  });
  return /* @__PURE__ */ jsx(TabsRootContext.Provider, {
    value: tabsContextValue,
    children: /* @__PURE__ */ jsx(CompositeList, {
      elementsRef: tabPanelRefs,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") TabsRoot.displayName = "TabsRoot";
var TabsListContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
  const context = React2.useContext(TabsListContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>." : formatErrorMessage_default(65));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js
var TabsTab = /* @__PURE__ */ React2.forwardRef(function TabsTab2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    disabled = false,
    render,
    value,
    id: idProp,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "className",
    "disabled",
    "render",
    "value",
    "id",
    "nativeButton"
  ]);
  const {
    value: activeTabValue,
    getTabPanelIdByValue,
    orientation
  } = useTabsRootContext();
  const {
    activateOnFocus,
    highlightedTabIndex,
    onTabActivation,
    registerTabResizeObserverElement,
    setHighlightedTabIndex,
    tabsListElement
  } = useTabsListContext();
  const id = useBaseUiId(idProp);
  const tabMetadata = React2.useMemo(() => ({
    disabled,
    id,
    value
  }), [disabled, id, value]);
  const {
    compositeProps,
    compositeRef,
    index
    // hook is used instead of the CompositeItem component
    // because the index is needed for Tab internals
  } = useCompositeItem({
    metadata: tabMetadata
  });
  const active = value === activeTabValue;
  const isNavigatingRef = React2.useRef(false);
  const tabElementRef = React2.useRef(null);
  React2.useEffect(() => {
    const tabElement = tabElementRef.current;
    if (!tabElement) {
      return void 0;
    }
    return registerTabResizeObserverElement(tabElement);
  }, [registerTabResizeObserverElement]);
  useIsoLayoutEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    if (!(active && index > -1 && highlightedTabIndex !== index)) {
      return;
    }
    const listElement = tabsListElement;
    if (listElement != null) {
      const activeEl = activeElement(ownerDocument(listElement));
      if (activeEl && contains(listElement, activeEl)) {
        return;
      }
    }
    if (!disabled) {
      setHighlightedTabIndex(index);
    }
  }, [active, index, highlightedTabIndex, setHighlightedTabIndex, disabled, tabsListElement]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const tabPanelId = getTabPanelIdByValue(value);
  const isPressingRef = React2.useRef(false);
  const isMainButtonRef = React2.useRef(false);
  function onClick(event) {
    if (active || disabled) {
      return;
    }
    onTabActivation(value, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent, void 0, {
      activationDirection: "none"
    }));
  }
  function onFocus(event) {
    if (active) {
      return;
    }
    if (index > -1 && !disabled) {
      setHighlightedTabIndex(index);
    }
    if (disabled) {
      return;
    }
    if (activateOnFocus && (!isPressingRef.current || // keyboard or touch focus
    isPressingRef.current && isMainButtonRef.current)) {
      onTabActivation(value, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent, void 0, {
        activationDirection: "none"
      }));
    }
  }
  function onPointerDown(event) {
    if (active || disabled) {
      return;
    }
    isPressingRef.current = true;
    function handlePointerUp() {
      isPressingRef.current = false;
      isMainButtonRef.current = false;
    }
    if (!event.button || event.button === 0) {
      isMainButtonRef.current = true;
      const doc = ownerDocument(event.currentTarget);
      doc.addEventListener("pointerup", handlePointerUp, {
        once: true
      });
    }
  }
  const state = {
    disabled,
    active,
    orientation
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef, compositeRef, tabElementRef],
    props: [compositeProps, {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": active,
      id,
      onClick,
      onFocus,
      onPointerDown,
      [ACTIVE_COMPOSITE_ITEM]: active ? "" : void 0,
      onKeyDownCapture() {
        isNavigatingRef.current = true;
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TabsTab.displayName = "TabsTab";
function useForcedRerendering() {
  const [, setState] = React2.useState({});
  return React2.useCallback(() => {
    setState({});
  }, []);
}

// ../../node_modules/@base-ui/react/esm/tabs/indicator/prehydrationScript.min.js
var script = '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const i=e.querySelector("[data-active]");if(!i)return;if(0===i.offsetWidth||0===e.offsetWidth)return;let o=0,n=0,h=0,l=0,r=0,f=0;function s(t){const e=getComputedStyle(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;return(Math.round(i)!==t.offsetWidth||Math.round(o)!==t.offsetHeight)&&(i=t.offsetWidth,o=t.offsetHeight),{width:i,height:o}}if(null!=i&&null!=e){const{width:t,height:c}=s(i),{width:u,height:d}=s(e),a=i.getBoundingClientRect(),g=e.getBoundingClientRect(),p=u>0?g.width/u:1,b=d>0?g.height/d:1;if(Math.abs(p)>Number.EPSILON&&Math.abs(b)>Number.EPSILON){const t=a.left-g.left,i=a.top-g.top;o=t/p+e.scrollLeft-e.clientLeft,h=i/b+e.scrollTop-e.clientTop}else o=i.offsetLeft,h=i.offsetTop;r=t,f=c,n=e.scrollWidth-o-r,l=e.scrollHeight-h-f}function c(e,i){t.style.setProperty(`--active-tab-${e}`,`${i}px`)}c("left",o),c("right",n),c("top",h),c("bottom",l),c("width",r),c("height",f),r>0&&f>0&&t.removeAttribute("hidden")}();';

// ../../node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicatorCssVars.js
var TabsIndicatorCssVars = /* @__PURE__ */ (function(TabsIndicatorCssVars2) {
  TabsIndicatorCssVars2["activeTabLeft"] = "--active-tab-left";
  TabsIndicatorCssVars2["activeTabRight"] = "--active-tab-right";
  TabsIndicatorCssVars2["activeTabTop"] = "--active-tab-top";
  TabsIndicatorCssVars2["activeTabBottom"] = "--active-tab-bottom";
  TabsIndicatorCssVars2["activeTabWidth"] = "--active-tab-width";
  TabsIndicatorCssVars2["activeTabHeight"] = "--active-tab-height";
  return TabsIndicatorCssVars2;
})({});
var stateAttributesMapping = __spreadProps(__spreadValues({}, tabsStateAttributesMapping), {
  activeTabPosition: () => null,
  activeTabSize: () => null
});
var TabsIndicator = /* @__PURE__ */ React2.forwardRef(function TabIndicator(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    renderBeforeHydration = false
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "renderBeforeHydration"
  ]);
  const {
    nonce
  } = useCSPContext();
  const {
    getTabElementBySelectedValue,
    orientation,
    tabActivationDirection,
    value
  } = useTabsRootContext();
  const {
    tabsListElement,
    registerIndicatorUpdateListener
  } = useTabsListContext();
  const [isMounted, setIsMounted] = React2.useState(false);
  useOnMount(() => setIsMounted(true));
  const rerender = useForcedRerendering();
  React2.useEffect(() => {
    return registerIndicatorUpdateListener(rerender);
  }, [registerIndicatorUpdateListener, rerender]);
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  let width = 0;
  let height = 0;
  let isTabSelected = false;
  if (value != null && tabsListElement != null) {
    const activeTab = getTabElementBySelectedValue(value);
    isTabSelected = true;
    if (activeTab != null) {
      const {
        width: computedWidth,
        height: computedHeight
      } = getCssDimensions(activeTab);
      const {
        width: tabListWidth,
        height: tabListHeight
      } = getCssDimensions(tabsListElement);
      const tabRect = activeTab.getBoundingClientRect();
      const tabsListRect = tabsListElement.getBoundingClientRect();
      const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
      const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
      const hasNonZeroScale = Math.abs(scaleX) > Number.EPSILON && Math.abs(scaleY) > Number.EPSILON;
      if (hasNonZeroScale) {
        const tabLeftDelta = tabRect.left - tabsListRect.left;
        const tabTopDelta = tabRect.top - tabsListRect.top;
        left = tabLeftDelta / scaleX + tabsListElement.scrollLeft - tabsListElement.clientLeft;
        top = tabTopDelta / scaleY + tabsListElement.scrollTop - tabsListElement.clientTop;
      } else {
        left = activeTab.offsetLeft;
        top = activeTab.offsetTop;
      }
      width = computedWidth;
      height = computedHeight;
      right = tabsListElement.scrollWidth - left - width;
      bottom = tabsListElement.scrollHeight - top - height;
    }
  }
  const activeTabPosition = React2.useMemo(() => isTabSelected ? {
    left,
    right,
    top,
    bottom
  } : null, [left, right, top, bottom, isTabSelected]);
  const activeTabSize = React2.useMemo(() => isTabSelected ? {
    width,
    height
  } : null, [width, height, isTabSelected]);
  const style = React2.useMemo(() => {
    if (!isTabSelected) {
      return void 0;
    }
    return {
      [TabsIndicatorCssVars.activeTabLeft]: `${left}px`,
      [TabsIndicatorCssVars.activeTabRight]: `${right}px`,
      [TabsIndicatorCssVars.activeTabTop]: `${top}px`,
      [TabsIndicatorCssVars.activeTabBottom]: `${bottom}px`,
      [TabsIndicatorCssVars.activeTabWidth]: `${width}px`,
      [TabsIndicatorCssVars.activeTabHeight]: `${height}px`
    };
  }, [left, right, top, bottom, width, height, isTabSelected]);
  const displayIndicator = isTabSelected && width > 0 && height > 0;
  const state = {
    orientation,
    activeTabPosition,
    activeTabSize,
    tabActivationDirection
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      style,
      hidden: !displayIndicator
      // do not display the indicator before the layout is settled
    }, elementProps, {
      suppressHydrationWarning: true
    }],
    stateAttributesMapping
  });
  if (value == null) {
    return null;
  }
  return /* @__PURE__ */ jsxs(React2.Fragment, {
    children: [element, !isMounted && renderBeforeHydration && /* @__PURE__ */ jsx("script", {
      nonce,
      dangerouslySetInnerHTML: {
        __html: script
      },
      suppressHydrationWarning: true
    })]
  });
});
if (process.env.NODE_ENV !== "production") TabsIndicator.displayName = "TabsIndicator";

// ../../node_modules/@base-ui/react/esm/tabs/panel/TabsPanelDataAttributes.js
var TabsPanelDataAttributes = (function(TabsPanelDataAttributes2) {
  TabsPanelDataAttributes2["index"] = "data-index";
  TabsPanelDataAttributes2["activationDirection"] = "data-activation-direction";
  TabsPanelDataAttributes2["orientation"] = "data-orientation";
  TabsPanelDataAttributes2["hidden"] = "data-hidden";
  TabsPanelDataAttributes2[TabsPanelDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  TabsPanelDataAttributes2[TabsPanelDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return TabsPanelDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js
var stateAttributesMapping2 = __spreadValues(__spreadValues({}, tabsStateAttributesMapping), transitionStatusMapping);
var TabsPanel = /* @__PURE__ */ React2.forwardRef(function TabPanel(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    value,
    render,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "className",
    "value",
    "render",
    "keepMounted"
  ]);
  const {
    value: selectedValue,
    getTabIdByPanelValue,
    orientation,
    tabActivationDirection,
    registerMountedTabPanel,
    unregisterMountedTabPanel
  } = useTabsRootContext();
  const id = useBaseUiId();
  const metadata = React2.useMemo(() => ({
    id,
    value
  }), [id, value]);
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem({
    metadata
  });
  const open = value === selectedValue;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(open);
  const hidden = !mounted;
  const correspondingTabId = getTabIdByPanelValue(value);
  const state = {
    hidden,
    orientation,
    tabActivationDirection,
    transitionStatus
  };
  const panelRef = React2.useRef(null);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, listItemRef, panelRef],
    props: [{
      "aria-labelledby": correspondingTabId,
      hidden,
      id,
      role: "tabpanel",
      tabIndex: open ? 0 : -1,
      inert: inertValue(!open),
      [TabsPanelDataAttributes.index]: index
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  useOpenChangeComplete({
    open,
    ref: panelRef,
    onComplete() {
      if (!open) {
        setMounted(false);
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (hidden && !keepMounted) {
      return void 0;
    }
    if (id == null) {
      return void 0;
    }
    registerMountedTabPanel(value, id);
    return () => {
      unregisterMountedTabPanel(value, id);
    };
  }, [hidden, keepMounted, value, id, registerMountedTabPanel, unregisterMountedTabPanel]);
  const shouldRender = keepMounted || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") TabsPanel.displayName = "TabsPanel";
var TabsList = /* @__PURE__ */ React2.forwardRef(function TabsList2(componentProps, forwardedRef) {
  const _a = componentProps, {
    activateOnFocus = false,
    className,
    loopFocus = true,
    render
  } = _a, elementProps = __objRest(_a, [
    "activateOnFocus",
    "className",
    "loopFocus",
    "render"
  ]);
  const {
    getTabElementBySelectedValue,
    onValueChange,
    orientation,
    value,
    setTabMap,
    tabActivationDirection
  } = useTabsRootContext();
  const [highlightedTabIndex, setHighlightedTabIndex] = React2.useState(0);
  const [tabsListElement, setTabsListElement] = React2.useState(null);
  const indicatorUpdateListenersRef = React2.useRef(/* @__PURE__ */ new Set());
  const tabResizeObserverElementsRef = React2.useRef(/* @__PURE__ */ new Set());
  const resizeObserverRef = React2.useRef(null);
  const notifyIndicatorUpdateListeners = useStableCallback(() => {
    indicatorUpdateListenersRef.current.forEach((listener) => {
      listener();
    });
  });
  React2.useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return void 0;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (!indicatorUpdateListenersRef.current.size) {
        return;
      }
      notifyIndicatorUpdateListeners();
    });
    resizeObserverRef.current = resizeObserver;
    if (tabsListElement) {
      resizeObserver.observe(tabsListElement);
    }
    tabResizeObserverElementsRef.current.forEach((element) => {
      resizeObserver.observe(element);
    });
    return () => {
      resizeObserver.disconnect();
      resizeObserverRef.current = null;
    };
  }, [tabsListElement, notifyIndicatorUpdateListeners]);
  const registerIndicatorUpdateListener = useStableCallback((listener) => {
    indicatorUpdateListenersRef.current.add(listener);
    return () => {
      indicatorUpdateListenersRef.current.delete(listener);
    };
  });
  const registerTabResizeObserverElement = useStableCallback((element) => {
    var _a2;
    tabResizeObserverElementsRef.current.add(element);
    (_a2 = resizeObserverRef.current) == null ? void 0 : _a2.observe(element);
    return () => {
      var _a3;
      tabResizeObserverElementsRef.current.delete(element);
      (_a3 = resizeObserverRef.current) == null ? void 0 : _a3.unobserve(element);
    };
  });
  const detectActivationDirection = useActivationDirectionDetector(
    value,
    // the old value
    orientation,
    tabsListElement,
    getTabElementBySelectedValue
  );
  const onTabActivation = useStableCallback((newValue, eventDetails) => {
    if (newValue !== value) {
      const activationDirection = detectActivationDirection(newValue);
      eventDetails.activationDirection = activationDirection;
      onValueChange(newValue, eventDetails);
    }
  });
  const state = {
    orientation,
    tabActivationDirection
  };
  const defaultProps = {
    "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
    role: "tablist"
  };
  const tabsListContextValue = React2.useMemo(() => ({
    activateOnFocus,
    highlightedTabIndex,
    registerIndicatorUpdateListener,
    registerTabResizeObserverElement,
    onTabActivation,
    setHighlightedTabIndex,
    tabsListElement
  }), [activateOnFocus, highlightedTabIndex, registerIndicatorUpdateListener, registerTabResizeObserverElement, onTabActivation, setHighlightedTabIndex, tabsListElement]);
  return /* @__PURE__ */ jsx(TabsListContext.Provider, {
    value: tabsListContextValue,
    children: /* @__PURE__ */ jsx(CompositeRoot, {
      render,
      className,
      state,
      refs: [forwardedRef, setTabsListElement],
      props: [defaultProps, elementProps],
      stateAttributesMapping: tabsStateAttributesMapping,
      highlightedIndex: highlightedTabIndex,
      enableHomeAndEndKeys: true,
      loopFocus,
      orientation,
      onHighlightedIndexChange: setHighlightedTabIndex,
      onMapChange: setTabMap,
      disabledIndices: EMPTY_ARRAY
    })
  });
});
if (process.env.NODE_ENV !== "production") TabsList.displayName = "TabsList";
function getInset(tab, tabsList) {
  const {
    left: tabLeft,
    top: tabTop
  } = tab.getBoundingClientRect();
  const {
    left: listLeft,
    top: listTop
  } = tabsList.getBoundingClientRect();
  const left = tabLeft - listLeft;
  const top = tabTop - listTop;
  return {
    left,
    top
  };
}
function useActivationDirectionDetector(activeTabValue, orientation, tabsListElement, getTabElement) {
  const [previousTabEdge, setPreviousTabEdge] = React2.useState(null);
  useIsoLayoutEffect(() => {
    if (activeTabValue == null || tabsListElement == null) {
      setPreviousTabEdge(null);
      return;
    }
    const activeTab = getTabElement(activeTabValue);
    if (activeTab == null) {
      setPreviousTabEdge(null);
      return;
    }
    const {
      left,
      top
    } = getInset(activeTab, tabsListElement);
    setPreviousTabEdge(orientation === "horizontal" ? left : top);
  }, [orientation, getTabElement, tabsListElement, activeTabValue]);
  return React2.useCallback((newValue) => {
    if (newValue === activeTabValue) {
      return "none";
    }
    if (newValue == null) {
      setPreviousTabEdge(null);
      return "none";
    }
    if (newValue != null && tabsListElement != null) {
      const activeTabElement = getTabElement(newValue);
      if (activeTabElement != null) {
        const {
          left,
          top
        } = getInset(activeTabElement, tabsListElement);
        if (previousTabEdge == null) {
          setPreviousTabEdge(orientation === "horizontal" ? left : top);
          return "none";
        }
        if (orientation === "horizontal") {
          if (left < previousTabEdge) {
            setPreviousTabEdge(left);
            return "left";
          }
          if (left > previousTabEdge) {
            setPreviousTabEdge(left);
            return "right";
          }
        } else if (top < previousTabEdge) {
          setPreviousTabEdge(top);
          return "up";
        } else if (top > previousTabEdge) {
          setPreviousTabEdge(top);
          return "down";
        }
      }
    }
    return "none";
  }, [getTabElement, orientation, previousTabEdge, tabsListElement, activeTabValue]);
}
function Tabs(_a) {
  var _b = _a, {
    className,
    orientation = "horizontal"
  } = _b, props = __objRest(_b, [
    "className",
    "orientation"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadValues({
      "data-slot": "tabs",
      "data-orientation": orientation,
      className: cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )
    }, props)
  );
}
var tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "gap-4 border-b border-border bg-transparent rounded-none",
        /** @internal Use SegmentControl Slider variant instead */
        pill: "gap-1 rounded-md bg-muted p-[3px]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList3(_a) {
  var _b = _a, {
    className,
    variant = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "variant"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.List,
    __spreadValues({
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(tabsListVariants({ variant }), className)
    }, props)
  );
}
function TabsTrigger(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Tab,
    __spreadValues({
      "data-slot": "tabs-trigger",
      className: cn(
        "relative inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent py-1.5 text-[13px] font-semibold whitespace-nowrap text-muted-foreground transition-all outline-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-primary-hover active:text-primary-press focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:text-disabled-foreground aria-disabled:pointer-events-none aria-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default variant (lined): active tab gets primary bottom border
        "group-data-[variant=default]/tabs-list:data-active:border-b-primary group-data-[variant=default]/tabs-list:data-active:text-foreground",
        // Pill variant: active tab gets bg + shadow
        "group-data-[variant=pill]/tabs-list:rounded-md group-data-[variant=pill]/tabs-list:border-none group-data-[variant=pill]/tabs-list:px-1.5 group-data-[variant=pill]/tabs-list:py-0.5 group-data-[variant=pill]/tabs-list:data-active:bg-background group-data-[variant=pill]/tabs-list:data-active:text-foreground group-data-[variant=pill]/tabs-list:data-active:shadow-sm",
        className
      )
    }, props)
  );
}
function TabsContent(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Panel,
    __spreadValues({
      "data-slot": "tabs-content",
      className: cn("flex-1 text-[13px] outline-none", className)
    }, props)
  );
}
function TabsIcon(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "tabs-icon",
      className: cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}

export { Tabs, TabsContent, TabsIcon, TabsList3 as TabsList, TabsTrigger, tabsListVariants };
//# sourceMappingURL=chunk-P7OGOIBG.mjs.map
//# sourceMappingURL=chunk-P7OGOIBG.mjs.map