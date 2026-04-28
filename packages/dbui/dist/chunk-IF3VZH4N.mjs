import { clamp } from './chunk-NNFC4ROP.mjs';
import { ChevronUp } from './chunk-Z4QJVOMC.mjs';
import { useToolbarRootContext } from './chunk-T7CEVU6N.mjs';
import { useCSPContext } from './chunk-WUPFH4N7.mjs';
import { compareItemEquality, hasNullItemLabel, stringifyAsValue, defaultItemEquality, findItemIndex, resolveMultipleLabels, resolveSelectedLabel, selectedValueIncludes, removeItem } from './chunk-B4K6AF4V.mjs';
import { getDefaultLabelId, resolveAriaLabelledBy } from './chunk-OOCSARU7.mjs';
import { ChevronDown } from './chunk-3L5IV4F2.mjs';
import { getPseudoElementBounds, Check } from './chunk-JN7JP22S.mjs';
import { Separator } from './chunk-VX2FCPLK.mjs';
import { useAnchorPositioning, getDisabledMountTransitionStyles } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { useOpenInteractionType, useScrollLock, InternalBackdrop } from './chunk-4AAVJQFL.mjs';
import { createSelector, Store, useStore, useFloatingRootContext, useClick, useDismiss, useListNavigation, useTypeahead, useInteractions, pressableTriggerOpenStateMapping, triggerOpenStateMapping, FloatingPortal, popupStateMapping, FloatingFocusManager, platform } from './chunk-PSMHWWS3.mjs';
import { useValueAsRef } from './chunk-RAYLQUWY.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { useLabel } from './chunk-KY5XN6YG.mjs';
import { useTimeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { COMPOSITE_KEYS } from './chunk-QGKCYW24.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useCompositeListItem, IndexGuessBehavior } from './chunk-SDWHTCRY.mjs';
import { rectToClientRect } from './chunk-XK53VWW6.mjs';
import { getFloatingFocusElement, contains } from './chunk-FQ4RTFU7.mjs';
import { isWebKit } from './chunk-BO7ZMLYZ.mjs';
import { useTransitionStatus, useOpenChangeComplete, transitionStatusMapping } from './chunk-INMEVUNJ.mjs';
import { useAnimationFrame } from './chunk-KJU32T43.mjs';
import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHiddenInput, visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { useFormContext, useFieldRootContext, useField, fieldValidityMapping, useLabelableContext } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { reason_parts_exports, createChangeEventDetails } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { getWindow } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { EMPTY_ARRAY, useRefWithInit, mergeProps, EMPTY_OBJECT, useMergedRefs, useRenderElement, DROPDOWN_COLLISION_AVOIDANCE, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';

// ../../node_modules/@base-ui/react/esm/select/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => SelectArrow,
  Backdrop: () => SelectBackdrop,
  Group: () => SelectGroup,
  GroupLabel: () => SelectGroupLabel,
  Icon: () => SelectIcon,
  Item: () => SelectItem,
  ItemIndicator: () => SelectItemIndicator,
  ItemText: () => SelectItemText,
  Label: () => SelectLabel,
  List: () => SelectList,
  Popup: () => SelectPopup,
  Portal: () => SelectPortal,
  Positioner: () => SelectPositioner,
  Root: () => SelectRoot,
  ScrollDownArrow: () => SelectScrollDownArrow,
  ScrollUpArrow: () => SelectScrollUpArrow,
  Separator: () => Separator,
  Trigger: () => SelectTrigger,
  Value: () => SelectValue
});
var SelectRootContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") SelectRootContext.displayName = "SelectRootContext";
var SelectFloatingContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") SelectFloatingContext.displayName = "SelectFloatingContext";
function useSelectRootContext() {
  const context = React2.useContext(SelectRootContext);
  if (context === null) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SelectRootContext is missing. Select parts must be placed within <Select.Root>." : formatErrorMessage_default(60));
  }
  return context;
}
function useSelectFloatingContext() {
  const context = React2.useContext(SelectFloatingContext);
  if (context === null) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SelectFloatingContext is missing. Select parts must be placed within <Select.Root>." : formatErrorMessage_default(61));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/select/store.js
var selectors = {
  id: createSelector((state) => state.id),
  labelId: createSelector((state) => state.labelId),
  modal: createSelector((state) => state.modal),
  multiple: createSelector((state) => state.multiple),
  items: createSelector((state) => state.items),
  itemToStringLabel: createSelector((state) => state.itemToStringLabel),
  itemToStringValue: createSelector((state) => state.itemToStringValue),
  isItemEqualToValue: createSelector((state) => state.isItemEqualToValue),
  value: createSelector((state) => state.value),
  hasSelectedValue: createSelector((state) => {
    const {
      value,
      multiple,
      itemToStringValue
    } = state;
    if (value == null) {
      return false;
    }
    if (multiple && Array.isArray(value)) {
      return value.length > 0;
    }
    return stringifyAsValue(value, itemToStringValue) !== "";
  }),
  hasNullItemLabel: createSelector((state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false;
  }),
  open: createSelector((state) => state.open),
  mounted: createSelector((state) => state.mounted),
  forceMount: createSelector((state) => state.forceMount),
  transitionStatus: createSelector((state) => state.transitionStatus),
  openMethod: createSelector((state) => state.openMethod),
  activeIndex: createSelector((state) => state.activeIndex),
  selectedIndex: createSelector((state) => state.selectedIndex),
  isActive: createSelector((state, index) => state.activeIndex === index),
  isSelected: createSelector((state, index, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const storeValue = state.value;
    if (state.multiple) {
      return Array.isArray(storeValue) && storeValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
    }
    if (state.selectedIndex === index && state.selectedIndex !== null) {
      return true;
    }
    return compareItemEquality(itemValue, storeValue, comparer);
  }),
  isSelectedByFocus: createSelector((state, index) => {
    return state.selectedIndex === index;
  }),
  popupProps: createSelector((state) => state.popupProps),
  triggerProps: createSelector((state) => state.triggerProps),
  triggerElement: createSelector((state) => state.triggerElement),
  positionerElement: createSelector((state) => state.positionerElement),
  listElement: createSelector((state) => state.listElement),
  scrollUpArrowVisible: createSelector((state) => state.scrollUpArrowVisible),
  scrollDownArrowVisible: createSelector((state) => state.scrollDownArrowVisible),
  hasScrollArrows: createSelector((state) => state.hasScrollArrows)
};
function SelectRoot(props) {
  const {
    id,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    name: nameProp,
    autoComplete,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    modal = true,
    actionsRef,
    inputRef,
    onOpenChangeComplete,
    items,
    multiple = false,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    highlightItemOnHover = true,
    children
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    setTouched,
    setFocused,
    shouldValidateOnChange,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    validation,
    validationMode
  } = useFieldRootContext();
  const generatedId = useLabelableId({
    id
  });
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: multiple ? defaultValue != null ? defaultValue : EMPTY_ARRAY : defaultValue,
    name: "Select",
    state: "value"
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select",
    state: "open"
  });
  const listRef = React2.useRef([]);
  const labelsRef = React2.useRef([]);
  const popupRef = React2.useRef(null);
  const scrollHandlerRef = React2.useRef(null);
  const scrollArrowsMountedCountRef = React2.useRef(0);
  const valueRef = React2.useRef(null);
  const valuesRef = React2.useRef([]);
  const typingRef = React2.useRef(false);
  const keyboardActiveRef = React2.useRef(false);
  const selectedItemTextRef = React2.useRef(null);
  const selectionRef = React2.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false
  });
  const alignItemWithTriggerActiveRef = React2.useRef(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps: interactionTypeProps
  } = useOpenInteractionType(open);
  const store = useRefWithInit(() => new Store({
    id: generatedId,
    labelId: void 0,
    modal,
    multiple,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    value,
    open,
    mounted,
    transitionStatus,
    items,
    forceMount: false,
    openMethod: null,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    triggerProps: {},
    triggerElement: null,
    positionerElement: null,
    listElement: null,
    scrollUpArrowVisible: false,
    scrollDownArrowVisible: false,
    hasScrollArrows: false
  })).current;
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const serializedValue = React2.useMemo(() => {
    if (multiple && Array.isArray(value) && value.length === 0) {
      return "";
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const fieldStringValue = React2.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.map((currentValue) => stringifyAsValue(currentValue, itemToStringValue));
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const controlRef = useValueAsRef(store.state.triggerElement);
  useField({
    id: generatedId,
    commit: validation.commit,
    value,
    controlRef,
    name,
    getValue: () => fieldStringValue
  });
  const initialValueRef = React2.useRef(value);
  useIsoLayoutEffect(() => {
    if (value !== initialValueRef.current) {
      store.set("forceMount", true);
    }
  }, [store, value]);
  useIsoLayoutEffect(() => {
    setFilled(multiple ? Array.isArray(value) && value.length > 0 : value != null);
  }, [multiple, value, setFilled]);
  useIsoLayoutEffect(function syncSelectedIndex() {
    if (open) {
      return;
    }
    const registry = valuesRef.current;
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      if (currentValue.length === 0) {
        store.set("selectedIndex", null);
        return;
      }
      const lastValue = currentValue[currentValue.length - 1];
      const lastIndex = findItemIndex(registry, lastValue, isItemEqualToValue);
      store.set("selectedIndex", lastIndex === -1 ? null : lastIndex);
      return;
    }
    const index = findItemIndex(registry, value, isItemEqualToValue);
    store.set("selectedIndex", index === -1 ? null : index);
  }, [multiple, open, value, valuesRef, isItemEqualToValue, store]);
  useValueChanged(value, () => {
    clearErrors(name);
    setDirty(value !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(value);
    } else {
      validation.commit(value, true);
    }
  });
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange == null ? void 0 : onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpenUnwrapped(nextOpen);
    if (!nextOpen && (eventDetails.reason === reason_parts_exports.focusOut || eventDetails.reason === reason_parts_exports.outsidePress)) {
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    }
    if (!nextOpen && store.state.activeIndex !== null) {
      const activeOption = listRef.current[store.state.activeIndex];
      queueMicrotask(() => {
        activeOption == null ? void 0 : activeOption.setAttribute("tabindex", "-1");
      });
    }
  });
  const handleUnmount = useStableCallback(() => {
    setMounted(false);
    store.set("activeIndex", null);
    onOpenChangeComplete == null ? void 0 : onOpenChangeComplete(false);
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React2.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const setValue = useStableCallback((nextValue, eventDetails) => {
    onValueChange == null ? void 0 : onValueChange(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });
  const handleScrollArrowVisibility = useStableCallback(() => {
    const scroller = store.state.listElement || popupRef.current;
    if (!scroller) {
      return;
    }
    const viewportTop = scroller.scrollTop;
    const viewportBottom = scroller.scrollTop + scroller.clientHeight;
    const shouldShowUp = viewportTop > 1;
    const shouldShowDown = viewportBottom < scroller.scrollHeight - 1;
    if (store.state.scrollUpArrowVisible !== shouldShowUp) {
      store.set("scrollUpArrowVisible", shouldShowUp);
    }
    if (store.state.scrollDownArrowVisible !== shouldShowDown) {
      store.set("scrollDownArrowVisible", shouldShowDown);
    }
  });
  const floatingContext = useFloatingRootContext({
    open,
    onOpenChange: setOpen,
    elements: {
      reference: triggerElement,
      floating: positionerElement
    }
  });
  const click = useClick(floatingContext, {
    enabled: !readOnly && !disabled,
    event: "mousedown"
  });
  const dismiss = useDismiss(floatingContext, {
    bubbles: false
  });
  const listNavigation = useListNavigation(floatingContext, {
    enabled: !readOnly && !disabled,
    listRef,
    activeIndex,
    selectedIndex,
    disabledIndices: EMPTY_ARRAY,
    onNavigate(nextActiveIndex) {
      if (nextActiveIndex === null && !open) {
        return;
      }
      store.set("activeIndex", nextActiveIndex);
    },
    // Implement our own listeners since `onPointerLeave` on each option fires while scrolling with
    // the `alignItemWithTrigger=true`, causing a performance issue on Chrome.
    focusItemOnHover: false
  });
  const typeahead = useTypeahead(floatingContext, {
    enabled: !readOnly && !disabled && (open || !multiple),
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      if (open) {
        store.set("activeIndex", index);
      } else {
        setValue(valuesRef.current[index], createChangeEventDetails("none"));
      }
    },
    onTypingChange(typing) {
      typingRef.current = typing;
    }
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([click, dismiss, listNavigation, typeahead]);
  const mergedTriggerProps = React2.useMemo(() => {
    return mergeProps(getReferenceProps(), interactionTypeProps, generatedId ? {
      id: generatedId
    } : EMPTY_OBJECT);
  }, [getReferenceProps, interactionTypeProps, generatedId]);
  useOnFirstRender(() => {
    store.update({
      popupProps: getFloatingProps(),
      triggerProps: mergedTriggerProps
    });
  });
  useIsoLayoutEffect(() => {
    store.update({
      id: generatedId,
      modal,
      multiple,
      value,
      open,
      mounted,
      transitionStatus,
      popupProps: getFloatingProps(),
      triggerProps: mergedTriggerProps,
      items,
      itemToStringLabel,
      itemToStringValue,
      isItemEqualToValue,
      openMethod
    });
  }, [store, generatedId, modal, multiple, value, open, mounted, transitionStatus, getFloatingProps, mergedTriggerProps, items, itemToStringLabel, itemToStringValue, isItemEqualToValue, openMethod]);
  const contextValue = React2.useMemo(() => ({
    store,
    name,
    required,
    disabled,
    readOnly,
    multiple,
    itemToStringLabel,
    itemToStringValue,
    highlightItemOnHover,
    setValue,
    setOpen,
    listRef,
    popupRef,
    scrollHandlerRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef,
    getItemProps,
    events: floatingContext.context.events,
    valueRef,
    valuesRef,
    labelsRef,
    typingRef,
    selectionRef,
    selectedItemTextRef,
    validation,
    onOpenChangeComplete,
    keyboardActiveRef,
    alignItemWithTriggerActiveRef,
    initialValueRef
  }), [store, name, required, disabled, readOnly, multiple, itemToStringLabel, itemToStringValue, highlightItemOnHover, setValue, setOpen, getItemProps, floatingContext.context.events, validation, onOpenChangeComplete, handleScrollArrowVisibility]);
  const ref = useMergedRefs(inputRef, validation.inputRef);
  const hasMultipleSelection = multiple && Array.isArray(value) && value.length > 0;
  const hiddenInputName = multiple ? void 0 : name;
  const hiddenInputs = React2.useMemo(() => {
    if (!multiple || !Array.isArray(value) || !name) {
      return null;
    }
    return value.map((v) => {
      const currentSerializedValue = stringifyAsValue(v, itemToStringValue);
      return /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [multiple, value, name, itemToStringValue]);
  return /* @__PURE__ */ jsx(SelectRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxs(SelectFloatingContext.Provider, {
      value: floatingContext,
      children: [children, /* @__PURE__ */ jsx("input", __spreadProps(__spreadValues({}, validation.getInputValidationProps({
        onFocus() {
          var _a;
          (_a = store.state.triggerElement) == null ? void 0 : _a.focus({
            // Supported in Chrome from 144 (January 2026)
            // @ts-expect-error - focusVisible is not yet in the lib.dom.d.ts
            focusVisible: true
          });
        },
        // Handle browser autofill.
        onChange(event) {
          if (event.nativeEvent.defaultPrevented) {
            return;
          }
          const nextValue = event.target.value;
          const details = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
          function handleChange() {
            if (multiple) {
              return;
            }
            const matchingValue = valuesRef.current.find((v) => {
              const candidate = stringifyAsValue(v, itemToStringValue);
              if (candidate.toLowerCase() === nextValue.toLowerCase()) {
                return true;
              }
              return false;
            });
            if (matchingValue != null) {
              setDirty(matchingValue !== validityData.initialValue);
              setValue(matchingValue, details);
              if (shouldValidateOnChange()) {
                validation.commit(matchingValue);
              }
            }
          }
          store.set("forceMount", true);
          queueMicrotask(handleChange);
        }
      })), {
        id: generatedId && hiddenInputName == null ? `${generatedId}-hidden-input` : void 0,
        name: hiddenInputName,
        autoComplete,
        value: serializedValue,
        disabled,
        required: required && !hasMultipleSelection,
        readOnly,
        ref,
        style: name ? visuallyHiddenInput : visuallyHidden,
        tabIndex: -1,
        "aria-hidden": true
      })), hiddenInputs]
    })
  });
}
var SelectLabel = /* @__PURE__ */ React2.forwardRef(function SelectLabel2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const elementPropsWithoutId = elementProps;
  delete elementPropsWithoutId.id;
  const fieldRootContext = useFieldRootContext();
  const {
    store
  } = useSelectRootContext();
  const triggerElement = useStore(store, selectors.triggerElement);
  const rootId = useStore(store, selectors.id);
  const defaultLabelId = getDefaultLabelId(rootId);
  const labelProps = useLabel({
    id: defaultLabelId,
    fallbackControlId: (_b = triggerElement == null ? void 0 : triggerElement.id) != null ? _b : rootId,
    setLabelId(nextLabelId) {
      store.set("labelId", nextLabelId);
    }
  });
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state: fieldRootContext.state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
});
if (process.env.NODE_ENV !== "production") SelectLabel.displayName = "SelectLabel";
var BOUNDARY_OFFSET = 2;
var SELECTED_DELAY = 400;
var UNSELECTED_DELAY = 200;
var stateAttributesMapping = __spreadProps(__spreadValues(__spreadValues({}, pressableTriggerOpenStateMapping), fieldValidityMapping), {
  value: () => null
});
var SelectTrigger = /* @__PURE__ */ React2.forwardRef(function SelectTrigger2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    disabled: disabledProp = false,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "disabled",
    "nativeButton"
  ]);
  const {
    setTouched,
    setFocused,
    validationMode,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const {
    store,
    setOpen,
    selectionRef,
    validation,
    readOnly,
    required,
    alignItemWithTriggerActiveRef,
    disabled: selectDisabled,
    keyboardActiveRef
  } = useSelectRootContext();
  const disabled = fieldDisabled || selectDisabled || disabledProp;
  const open = useStore(store, selectors.open);
  const value = useStore(store, selectors.value);
  const triggerProps = useStore(store, selectors.triggerProps);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const rootId = useStore(store, selectors.id);
  const selectLabelId = useStore(store, selectors.labelId);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && open;
  const hasNullItemLabel2 = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  const id = idProp != null ? idProp : rootId;
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, selectLabelId);
  useLabelableId({
    id
  });
  const positionerRef = useValueAsRef(positionerElement);
  const triggerRef = React2.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const setTriggerElement = useStableCallback((element) => {
    store.set("triggerElement", element);
  });
  const mergedRef = useMergedRefs(forwardedRef, triggerRef, buttonRef, setTriggerElement);
  const timeoutFocus = useTimeout();
  const timeoutMouseDown = useTimeout();
  const selectedDelayTimeout = useTimeout();
  const unselectedDelayTimeout = useTimeout();
  React2.useEffect(() => {
    if (open) {
      const hasSelectedItemInList = hasSelectedValue || hasNullItemLabel2;
      const shouldDelayUnselectedMouseUpLonger = !hasSelectedItemInList;
      if (shouldDelayUnselectedMouseUpLonger) {
        selectedDelayTimeout.start(SELECTED_DELAY, () => {
          selectionRef.current.allowUnselectedMouseUp = true;
          selectionRef.current.allowSelectedMouseUp = true;
        });
      } else {
        unselectedDelayTimeout.start(UNSELECTED_DELAY, () => {
          selectionRef.current.allowUnselectedMouseUp = true;
          selectedDelayTimeout.start(UNSELECTED_DELAY, () => {
            selectionRef.current.allowSelectedMouseUp = true;
          });
        });
      }
      return () => {
        selectedDelayTimeout.clear();
        unselectedDelayTimeout.clear();
      };
    }
    selectionRef.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false
    };
    timeoutMouseDown.clear();
    return void 0;
  }, [open, hasSelectedValue, hasNullItemLabel2, selectionRef, timeoutMouseDown, selectedDelayTimeout, unselectedDelayTimeout]);
  const ariaControlsId = React2.useMemo(() => {
    var _a2, _b;
    return (_b = listElement == null ? void 0 : listElement.id) != null ? _b : (_a2 = getFloatingFocusElement(positionerElement)) == null ? void 0 : _a2.id;
  }, [listElement, positionerElement]);
  const props = mergeProps(triggerProps, {
    id,
    role: "combobox",
    "aria-expanded": open ? "true" : "false",
    "aria-haspopup": "listbox",
    "aria-controls": open ? ariaControlsId : void 0,
    "aria-labelledby": ariaLabelledBy,
    "aria-readonly": readOnly || void 0,
    "aria-required": required || void 0,
    tabIndex: disabled ? -1 : 0,
    ref: mergedRef,
    onFocus(event) {
      setFocused(true);
      if (open && alignItemWithTriggerActiveRef.current) {
        setOpen(false, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent));
      }
      timeoutFocus.start(0, () => {
        store.set("forceMount", true);
      });
    },
    onBlur(event) {
      if (contains(positionerElement, event.relatedTarget)) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    },
    onPointerMove() {
      keyboardActiveRef.current = false;
    },
    onKeyDown() {
      keyboardActiveRef.current = true;
    },
    onMouseDown(event) {
      if (open) {
        return;
      }
      const doc = ownerDocument(event.currentTarget);
      function handleMouseUp(mouseEvent) {
        if (!triggerRef.current) {
          return;
        }
        const mouseUpTarget = mouseEvent.target;
        if (contains(triggerRef.current, mouseUpTarget) || contains(positionerRef.current, mouseUpTarget) || mouseUpTarget === triggerRef.current) {
          return;
        }
        const bounds = getPseudoElementBounds(triggerRef.current);
        if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
          return;
        }
        setOpen(false, createChangeEventDetails(reason_parts_exports.cancelOpen, mouseEvent));
      }
      timeoutMouseDown.start(0, () => {
        doc.addEventListener("mouseup", handleMouseUp, {
          once: true
        });
      });
    }
  }, validation.getValidationProps, elementProps, getButtonProps);
  props.role = "combobox";
  const state = __spreadProps(__spreadValues({}, fieldState), {
    open,
    disabled,
    value,
    readOnly,
    placeholder: !hasSelectedValue
  });
  return useRenderElement("button", componentProps, {
    ref: [forwardedRef, triggerRef],
    state,
    stateAttributesMapping,
    props
  });
});
if (process.env.NODE_ENV !== "production") SelectTrigger.displayName = "SelectTrigger";
var stateAttributesMapping2 = {
  value: () => null
};
var SelectValue = /* @__PURE__ */ React2.forwardRef(function SelectValue2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    children: childrenProp,
    placeholder
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "children",
    "placeholder"
  ]);
  const {
    store,
    valueRef
  } = useSelectRootContext();
  const value = useStore(store, selectors.value);
  const items = useStore(store, selectors.items);
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
  const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  const state = {
    value,
    placeholder: !hasSelectedValue
  };
  let children = null;
  if (typeof childrenProp === "function") {
    children = childrenProp(value);
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (!hasSelectedValue && placeholder != null && !hasNullLabel) {
    children = placeholder;
  } else if (Array.isArray(value)) {
    children = resolveMultipleLabels(value, items, itemToStringLabel);
  } else {
    children = resolveSelectedLabel(value, items, itemToStringLabel);
  }
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, valueRef],
    props: [{
      children
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SelectValue.displayName = "SelectValue";
var SelectIcon = /* @__PURE__ */ React2.forwardRef(function SelectIcon2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const state = {
    open
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "\u25BC"
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SelectIcon.displayName = "SelectIcon";
var SelectPortalContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SelectPortalContext.displayName = "SelectPortalContext";
var SelectPortal = /* @__PURE__ */ React2.forwardRef(function SelectPortal2(portalProps, forwardedRef) {
  const {
    store
  } = useSelectRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMount = useStore(store, selectors.forceMount);
  const shouldRender = mounted || forceMount;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(SelectPortalContext.Provider, {
    value: true,
    children: /* @__PURE__ */ jsx(FloatingPortal, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") SelectPortal.displayName = "SelectPortal";
var stateAttributesMapping3 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var SelectBackdrop = /* @__PURE__ */ React2.forwardRef(function SelectBackdrop2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping3
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SelectBackdrop.displayName = "SelectBackdrop";
var SelectPositionerContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SelectPositionerContext.displayName = "SelectPositionerContext";
function useSelectPositionerContext() {
  const context = React2.useContext(SelectPositionerContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SelectPositionerContext is missing. SelectPositioner parts must be placed within <Select.Positioner>." : formatErrorMessage_default(59));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/select/popup/utils.js
function clearStyles(element, originalStyles) {
  if (element) {
    Object.assign(element.style, originalStyles);
  }
}
var LIST_FUNCTIONAL_STYLES = {
  position: "relative",
  maxHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto"
};
var FIXED = {
  position: "fixed"
};
var SelectPositioner = /* @__PURE__ */ React2.forwardRef(function SelectPositioner2(componentProps, forwardedRef) {
  const _a = componentProps, {
    anchor,
    positionMethod = "absolute",
    className,
    render,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking,
    alignItemWithTrigger = true,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE
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
    "alignItemWithTrigger",
    "collisionAvoidance"
  ]);
  const {
    store,
    listRef,
    labelsRef,
    alignItemWithTriggerActiveRef,
    selectedItemTextRef,
    valuesRef,
    initialValueRef,
    popupRef,
    setValue
  } = useSelectRootContext();
  const floatingRootContext = useSelectFloatingContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const modal = useStore(store, selectors.modal);
  const value = useStore(store, selectors.value);
  const openMethod = useStore(store, selectors.openMethod);
  const positionerElement = useStore(store, selectors.positionerElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const scrollUpArrowRef = React2.useRef(null);
  const scrollDownArrowRef = React2.useRef(null);
  const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = React2.useState(alignItemWithTrigger);
  const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && openMethod !== "touch";
  if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
    setControlledAlignItemWithTrigger(alignItemWithTrigger);
  }
  useIsoLayoutEffect(() => {
    if (!mounted) {
      if (selectors.scrollUpArrowVisible(store.state)) {
        store.set("scrollUpArrowVisible", false);
      }
      if (selectors.scrollDownArrowVisible(store.state)) {
        store.set("scrollDownArrowVisible", false);
      }
    }
  }, [store, mounted]);
  React2.useImperativeHandle(alignItemWithTriggerActiveRef, () => alignItemWithTriggerActive);
  useScrollLock((alignItemWithTriggerActive || modal) && open && openMethod !== "touch", triggerElement);
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
    disableAnchorTracking: disableAnchorTracking != null ? disableAnchorTracking : alignItemWithTriggerActive,
    collisionAvoidance,
    keepMounted: true
  });
  const renderedSide = alignItemWithTriggerActive ? "none" : positioning.side;
  const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles;
  const defaultProps = React2.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
      hiddenStyles.pointerEvents = "none";
    }
    return {
      role: "presentation",
      hidden: !mounted,
      style: __spreadValues(__spreadValues({}, positionerStyles), hiddenStyles)
    };
  }, [open, mounted, positionerStyles]);
  const state = {
    open,
    side: renderedSide,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  };
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, setPositionerElement],
    state,
    stateAttributesMapping: popupStateMapping,
    props: [defaultProps, getDisabledMountTransitionStyles(transitionStatus), elementProps]
  });
  const prevMapSizeRef = React2.useRef(0);
  const onMapChange = useStableCallback((map) => {
    if (map.size === 0 && prevMapSizeRef.current === 0) {
      return;
    }
    if (valuesRef.current.length === 0) {
      return;
    }
    const prevSize = prevMapSizeRef.current;
    prevMapSizeRef.current = map.size;
    if (map.size === prevSize) {
      return;
    }
    const eventDetails = createChangeEventDetails(reason_parts_exports.none);
    if (prevSize !== 0 && !store.state.multiple && value !== null) {
      const selectedValueIndex = findItemIndex(valuesRef.current, value, isItemEqualToValue);
      if (selectedValueIndex === -1) {
        const initialSelectedValue = initialValueRef.current;
        const hasInitial = initialSelectedValue != null && findItemIndex(valuesRef.current, initialSelectedValue, isItemEqualToValue) !== -1;
        const nextValue = hasInitial ? initialSelectedValue : null;
        setValue(nextValue, eventDetails);
        if (nextValue === null) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
      const hasVisibleItem = (selectedItemValue) => findItemIndex(valuesRef.current, selectedItemValue, isItemEqualToValue) !== -1;
      const nextValue = value.filter((selectedItemValue) => hasVisibleItem(selectedItemValue));
      if (nextValue.length !== value.length || nextValue.some((selectedItemValue) => !selectedValueIncludes(value, selectedItemValue, isItemEqualToValue))) {
        setValue(nextValue, eventDetails);
        if (nextValue.length === 0) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (open && alignItemWithTriggerActive) {
      store.update({
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false
      });
      const stylesToClear = {
        height: ""
      };
      clearStyles(positionerElement, stylesToClear);
      clearStyles(popupRef.current, stylesToClear);
    }
  });
  const contextValue = React2.useMemo(() => __spreadProps(__spreadValues({}, positioning), {
    side: renderedSide,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollUpArrowRef,
    scrollDownArrowRef
  }), [positioning, renderedSide, alignItemWithTriggerActive, setControlledAlignItemWithTrigger]);
  return /* @__PURE__ */ jsx(CompositeList, {
    elementsRef: listRef,
    labelsRef,
    onMapChange,
    children: /* @__PURE__ */ jsxs(SelectPositionerContext.Provider, {
      value: contextValue,
      children: [mounted && modal && /* @__PURE__ */ jsx(InternalBackdrop, {
        inert: inertValue(!open),
        cutout: triggerElement
      }), element]
    })
  });
});
if (process.env.NODE_ENV !== "production") SelectPositioner.displayName = "SelectPositioner";

// ../../node_modules/@base-ui/utils/esm/isMouseWithinBounds.js
function isMouseWithinBounds(event) {
  const targetRect = event.currentTarget.getBoundingClientRect();
  const isWithinBounds = targetRect.top + 1 <= event.clientY && event.clientY <= targetRect.bottom - 1 && targetRect.left + 1 <= event.clientX && event.clientX <= targetRect.right - 1;
  return isWithinBounds;
}
var DISABLE_SCROLLBAR_CLASS_NAME = "base-ui-disable-scrollbar";
var styleDisableScrollbar = {
  className: DISABLE_SCROLLBAR_CLASS_NAME,
  getElement(nonce) {
    return /* @__PURE__ */ jsx("style", {
      nonce,
      href: DISABLE_SCROLLBAR_CLASS_NAME,
      precedence: "base-ui:low",
      children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
    });
  }
};
if (process.env.NODE_ENV !== "production") styleDisableScrollbar.getElement.displayName = "styleDisableScrollbar.getElement";
var SCROLL_EPS_PX = 1;
var stateAttributesMapping4 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var SelectPopup = /* @__PURE__ */ React2.forwardRef(function SelectPopup2(componentProps, forwardedRef) {
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
    store,
    popupRef,
    onOpenChangeComplete,
    setOpen,
    valueRef,
    selectedItemTextRef,
    keyboardActiveRef,
    multiple,
    handleScrollArrowVisibility,
    scrollHandlerRef,
    highlightItemOnHover
  } = useSelectRootContext();
  const {
    side,
    align,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = useSelectPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const floatingRootContext = useSelectFloatingContext();
  const {
    nonce,
    disableStyleElements
  } = useCSPContext();
  const highlightTimeout = useTimeout();
  const id = useStore(store, selectors.id);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const popupProps = useStore(store, selectors.popupProps);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const initialHeightRef = React2.useRef(0);
  const reachedMaxHeightRef = React2.useRef(false);
  const maxHeightRef = React2.useRef(0);
  const initialPlacedRef = React2.useRef(false);
  const originalPositionerStylesRef = React2.useRef({});
  const scrollArrowFrame = useAnimationFrame();
  const handleScroll = useStableCallback((scroller) => {
    if (!positionerElement || !popupRef.current || !initialPlacedRef.current) {
      return;
    }
    if (reachedMaxHeightRef.current || !alignItemWithTriggerActive) {
      handleScrollArrowVisibility();
      return;
    }
    const isTopPositioned = positionerElement.style.top === "0px";
    const isBottomPositioned = positionerElement.style.bottom === "0px";
    const currentHeight = positionerElement.getBoundingClientRect().height;
    const doc = ownerDocument(positionerElement);
    const positionerStyles = getComputedStyle(positionerElement);
    const marginTop = parseFloat(positionerStyles.marginTop);
    const marginBottom = parseFloat(positionerStyles.marginBottom);
    const maxPopupHeight = getMaxPopupHeight(getComputedStyle(popupRef.current));
    const maxAvailableHeight = Math.min(doc.documentElement.clientHeight - marginTop - marginBottom, maxPopupHeight);
    const scrollTop = scroller.scrollTop;
    const maxScrollTop = getMaxScrollTop(scroller);
    let nextPositionerHeight = 0;
    let nextScrollTop = null;
    let setReachedMax = false;
    let scrollToMax = false;
    const setHeight = (height) => {
      positionerElement.style.height = `${height}px`;
    };
    const handleSmallDiff = (diff, targetScrollTop) => {
      const heightDelta = clamp(diff, 0, maxAvailableHeight - currentHeight);
      if (heightDelta > 0) {
        setHeight(currentHeight + heightDelta);
      }
      scroller.scrollTop = targetScrollTop;
      if (maxAvailableHeight - (currentHeight + heightDelta) <= SCROLL_EPS_PX) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility();
    };
    if (isTopPositioned) {
      const diff = maxScrollTop - scrollTop;
      const idealHeight = currentHeight + diff;
      const nextHeight = Math.min(idealHeight, maxAvailableHeight);
      nextPositionerHeight = nextHeight;
      if (diff <= SCROLL_EPS_PX) {
        handleSmallDiff(diff, maxScrollTop);
        return;
      }
      if (maxAvailableHeight - nextHeight > SCROLL_EPS_PX) {
        scrollToMax = true;
      } else {
        setReachedMax = true;
      }
    } else if (isBottomPositioned) {
      const diff = scrollTop;
      const idealHeight = currentHeight + diff;
      const nextHeight = Math.min(idealHeight, maxAvailableHeight);
      const overshoot = idealHeight - maxAvailableHeight;
      nextPositionerHeight = nextHeight;
      if (diff <= SCROLL_EPS_PX) {
        handleSmallDiff(diff, 0);
        return;
      }
      if (maxAvailableHeight - nextHeight > SCROLL_EPS_PX) {
        nextScrollTop = 0;
      } else {
        setReachedMax = true;
        if (scrollTop < maxScrollTop) {
          nextScrollTop = scrollTop - (diff - overshoot);
        }
      }
    }
    nextPositionerHeight = Math.ceil(nextPositionerHeight);
    if (nextPositionerHeight !== 0) {
      setHeight(nextPositionerHeight);
    }
    if (scrollToMax || nextScrollTop != null) {
      const nextMaxScrollTop = getMaxScrollTop(scroller);
      const target = scrollToMax ? nextMaxScrollTop : clamp(nextScrollTop, 0, nextMaxScrollTop);
      if (Math.abs(scroller.scrollTop - target) > SCROLL_EPS_PX) {
        scroller.scrollTop = target;
      }
    }
    if (setReachedMax || nextPositionerHeight >= maxAvailableHeight - SCROLL_EPS_PX) {
      reachedMaxHeightRef.current = true;
    }
    handleScrollArrowVisibility();
  });
  React2.useImperativeHandle(scrollHandlerRef, () => handleScroll, [handleScroll]);
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete == null ? void 0 : onOpenChangeComplete(true);
      }
    }
  });
  const state = {
    open,
    transitionStatus,
    side,
    align
  };
  useIsoLayoutEffect(() => {
    if (!positionerElement || !popupRef.current || Object.keys(originalPositionerStylesRef.current).length) {
      return;
    }
    originalPositionerStylesRef.current = {
      top: positionerElement.style.top || "0",
      left: positionerElement.style.left || "0",
      right: positionerElement.style.right,
      height: positionerElement.style.height,
      bottom: positionerElement.style.bottom,
      minHeight: positionerElement.style.minHeight,
      maxHeight: positionerElement.style.maxHeight,
      marginTop: positionerElement.style.marginTop,
      marginBottom: positionerElement.style.marginBottom
    };
  }, [popupRef, positionerElement]);
  useIsoLayoutEffect(() => {
    if (open || alignItemWithTriggerActive) {
      return;
    }
    initialPlacedRef.current = false;
    reachedMaxHeightRef.current = false;
    initialHeightRef.current = 0;
    maxHeightRef.current = 0;
    clearStyles(positionerElement, originalPositionerStylesRef.current);
  }, [open, alignItemWithTriggerActive, positionerElement, popupRef]);
  useIsoLayoutEffect(() => {
    const popupElement = popupRef.current;
    if (!open || !triggerElement || !positionerElement || !popupElement || store.state.transitionStatus === "ending") {
      return;
    }
    if (!alignItemWithTriggerActive) {
      initialPlacedRef.current = true;
      scrollArrowFrame.request(handleScrollArrowVisibility);
      popupElement.style.removeProperty("--transform-origin");
      return;
    }
    queueMicrotask(() => {
      var _a2, _b;
      const restoreTransformStyles = unsetTransformStyles(popupElement);
      popupElement.style.removeProperty("--transform-origin");
      try {
        const positionerStyles = getComputedStyle(positionerElement);
        const popupStyles = getComputedStyle(popupElement);
        const doc = ownerDocument(triggerElement);
        const win = getWindow(positionerElement);
        const scale = getScale(triggerElement);
        const triggerRect = normalizeRect(triggerElement.getBoundingClientRect(), scale);
        const positionerRect = normalizeRect(positionerElement.getBoundingClientRect(), scale);
        const triggerX = triggerRect.left;
        const triggerHeight = triggerRect.height;
        const scroller = listElement || popupElement;
        const scrollHeight = scroller.scrollHeight;
        const borderBottom = parseFloat(popupStyles.borderBottomWidth);
        const marginTop = parseFloat(positionerStyles.marginTop) || 10;
        const marginBottom = parseFloat(positionerStyles.marginBottom) || 10;
        const minHeight = parseFloat(positionerStyles.minHeight) || 100;
        const maxPopupHeight = getMaxPopupHeight(popupStyles);
        const paddingLeft = 5;
        const paddingRight = 5;
        const triggerCollisionThreshold = 20;
        const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
        const viewportWidth = doc.documentElement.clientWidth;
        const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight;
        const textElement = selectedItemTextRef.current;
        const valueElement = valueRef.current;
        let textRect;
        let offsetX = 0;
        let offsetY = 0;
        if (textElement && valueElement) {
          const valueRect = normalizeRect(valueElement.getBoundingClientRect(), scale);
          textRect = normalizeRect(textElement.getBoundingClientRect(), scale);
          const valueLeftFromTriggerLeft = valueRect.left - triggerX;
          const textLeftFromPositionerLeft = textRect.left - positionerRect.left;
          const valueCenterFromPositionerTop = valueRect.top - triggerRect.top + valueRect.height / 2;
          const textCenterFromTriggerTop = textRect.top - positionerRect.top + textRect.height / 2;
          offsetX = valueLeftFromTriggerLeft - textLeftFromPositionerLeft;
          offsetY = textCenterFromTriggerTop - valueCenterFromPositionerTop;
        }
        const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom;
        let height = Math.min(viewportHeight, idealHeight);
        const maxHeight = viewportHeight - marginTop - marginBottom;
        const scrollTop = idealHeight - height;
        const left = Math.max(paddingLeft, triggerX + offsetX);
        const maxRight = viewportWidth - paddingRight;
        const rightOverflow = Math.max(0, left + positionerRect.width - maxRight);
        positionerElement.style.left = `${left - rightOverflow}px`;
        positionerElement.style.height = `${height}px`;
        positionerElement.style.maxHeight = "auto";
        positionerElement.style.marginTop = `${marginTop}px`;
        positionerElement.style.marginBottom = `${marginBottom}px`;
        popupElement.style.height = "100%";
        const maxScrollTop = getMaxScrollTop(scroller);
        const isTopPositioned = scrollTop >= maxScrollTop - SCROLL_EPS_PX;
        if (isTopPositioned) {
          height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop);
        }
        const fallbackToAlignPopupToTrigger = triggerRect.top < triggerCollisionThreshold || triggerRect.bottom > viewportHeight - triggerCollisionThreshold || Math.ceil(height) + SCROLL_EPS_PX < Math.min(scrollHeight, minHeight);
        const isPinchZoomed = ((_b = (_a2 = win.visualViewport) == null ? void 0 : _a2.scale) != null ? _b : 1) !== 1 && isWebKit;
        if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
          initialPlacedRef.current = true;
          clearStyles(positionerElement, originalPositionerStylesRef.current);
          ReactDOM.flushSync(() => setControlledAlignItemWithTrigger(false));
          return;
        }
        if (isTopPositioned) {
          const topOffset = Math.max(0, viewportHeight - idealHeight);
          positionerElement.style.top = positionerRect.height >= maxHeight ? "0" : `${topOffset}px`;
          positionerElement.style.height = `${height}px`;
          scroller.scrollTop = getMaxScrollTop(scroller);
          initialHeightRef.current = Math.max(minHeight, height);
        } else {
          positionerElement.style.bottom = "0";
          initialHeightRef.current = Math.max(minHeight, height);
          scroller.scrollTop = scrollTop;
        }
        if (textRect) {
          const popupTop = positionerRect.top;
          const popupHeight = positionerRect.height;
          const textCenterY = textRect.top + textRect.height / 2;
          const transformOriginY = popupHeight > 0 ? (textCenterY - popupTop) / popupHeight * 100 : 50;
          const clampedY = clamp(transformOriginY, 0, 100);
          popupElement.style.setProperty("--transform-origin", `50% ${clampedY}%`);
        }
        if (initialHeightRef.current === viewportHeight || height >= maxPopupHeight) {
          reachedMaxHeightRef.current = true;
        }
        handleScrollArrowVisibility();
        setTimeout(() => {
          initialPlacedRef.current = true;
        });
      } finally {
        restoreTransformStyles();
      }
    });
  }, [store, open, positionerElement, triggerElement, valueRef, selectedItemTextRef, popupRef, handleScrollArrowVisibility, alignItemWithTriggerActive, setControlledAlignItemWithTrigger, scrollArrowFrame, scrollDownArrowRef, scrollUpArrowRef, listElement]);
  React2.useEffect(() => {
    if (!alignItemWithTriggerActive || !positionerElement || !open) {
      return void 0;
    }
    const win = getWindow(positionerElement);
    function handleResize(event) {
      setOpen(false, createChangeEventDetails(reason_parts_exports.windowResize, event));
    }
    win.addEventListener("resize", handleResize);
    return () => {
      win.removeEventListener("resize", handleResize);
    };
  }, [setOpen, alignItemWithTriggerActive, positionerElement, open]);
  const defaultProps = __spreadValues(__spreadProps(__spreadValues({}, listElement ? {
    role: "presentation",
    "aria-orientation": void 0
  } : {
    role: "listbox",
    "aria-multiselectable": multiple || void 0,
    id: `${id}-list`
  }), {
    onKeyDown(event) {
      keyboardActiveRef.current = true;
      if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
    },
    onMouseMove() {
      keyboardActiveRef.current = false;
    },
    onPointerLeave(event) {
      if (!highlightItemOnHover || isMouseWithinBounds(event) || event.pointerType === "touch") {
        return;
      }
      const popup = event.currentTarget;
      highlightTimeout.start(0, () => {
        store.set("activeIndex", null);
        popup.focus({
          preventScroll: true
        });
      });
    },
    onScroll(event) {
      if (listElement) {
        return;
      }
      handleScroll(event.currentTarget);
    }
  }), alignItemWithTriggerActive && {
    style: listElement ? {
      height: "100%"
    } : LIST_FUNCTIONAL_STYLES
  });
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, popupRef],
    state,
    stateAttributesMapping: stateAttributesMapping4,
    props: [popupProps, defaultProps, getDisabledMountTransitionStyles(transitionStatus), {
      className: !listElement && alignItemWithTriggerActive ? styleDisableScrollbar.className : void 0
    }, elementProps]
  });
  return /* @__PURE__ */ jsxs(React2.Fragment, {
    children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), /* @__PURE__ */ jsx(FloatingFocusManager, {
      context: floatingRootContext,
      modal: false,
      disabled: !mounted,
      returnFocus: finalFocus,
      restoreFocus: true,
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") SelectPopup.displayName = "SelectPopup";
function getMaxPopupHeight(popupStyles) {
  const maxHeightStyle = popupStyles.maxHeight || "";
  return maxHeightStyle.endsWith("px") ? parseFloat(maxHeightStyle) || Infinity : Infinity;
}
function getMaxScrollTop(scroller) {
  return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
}
function getScale(element) {
  return platform.getScale(element);
}
function normalizeRect(rect, scale) {
  return rectToClientRect({
    x: rect.x / scale.x,
    y: rect.y / scale.y,
    width: rect.width / scale.x,
    height: rect.height / scale.y
  });
}
var TRANSFORM_STYLE_RESETS = [["transform", "none"], ["scale", "1"], ["translate", "0 0"]];
function unsetTransformStyles(popupElement) {
  const {
    style
  } = popupElement;
  const originalStyles = {};
  for (const [property, value] of TRANSFORM_STYLE_RESETS) {
    originalStyles[property] = style.getPropertyValue(property);
    style.setProperty(property, value, "important");
  }
  return () => {
    for (const [property] of TRANSFORM_STYLE_RESETS) {
      const originalValue = originalStyles[property];
      if (originalValue) {
        style.setProperty(property, originalValue);
      } else {
        style.removeProperty(property);
      }
    }
  };
}
var SelectList = /* @__PURE__ */ React2.forwardRef(function SelectList2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store,
    scrollHandlerRef
  } = useSelectRootContext();
  const {
    alignItemWithTriggerActive
  } = useSelectPositionerContext();
  const hasScrollArrows = useStore(store, selectors.hasScrollArrows);
  const openMethod = useStore(store, selectors.openMethod);
  const multiple = useStore(store, selectors.multiple);
  const id = useStore(store, selectors.id);
  const defaultProps = __spreadProps(__spreadValues({
    id: `${id}-list`,
    role: "listbox",
    "aria-multiselectable": multiple || void 0,
    onScroll(event) {
      var _a2;
      (_a2 = scrollHandlerRef.current) == null ? void 0 : _a2.call(scrollHandlerRef, event.currentTarget);
    }
  }, alignItemWithTriggerActive && {
    style: LIST_FUNCTIONAL_STYLES
  }), {
    className: hasScrollArrows && openMethod !== "touch" ? styleDisableScrollbar.className : void 0
  });
  const setListElement = useStableCallback((element) => {
    store.set("listElement", element);
  });
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, setListElement],
    props: [defaultProps, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") SelectList.displayName = "SelectList";
var SelectItemContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SelectItemContext.displayName = "SelectItemContext";
function useSelectItemContext() {
  const context = React2.useContext(SelectItemContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SelectItemContext is missing. SelectItem parts must be placed within <Select.Item>." : formatErrorMessage_default(57));
  }
  return context;
}
var SelectItem = /* @__PURE__ */ React2.memo(/* @__PURE__ */ React2.forwardRef(function SelectItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    value: itemValue = null,
    label,
    disabled = false,
    nativeButton = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "value",
    "label",
    "disabled",
    "nativeButton"
  ]);
  const textRef = React2.useRef(null);
  const listItem = useCompositeListItem({
    label,
    textRef,
    indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
  });
  const {
    store,
    getItemProps,
    setOpen,
    setValue,
    selectionRef,
    typingRef,
    valuesRef,
    keyboardActiveRef,
    multiple,
    highlightItemOnHover
  } = useSelectRootContext();
  const highlightTimeout = useTimeout();
  const highlighted = useStore(store, selectors.isActive, listItem.index);
  const selected = useStore(store, selectors.isSelected, listItem.index, itemValue);
  const selectedByFocus = useStore(store, selectors.isSelectedByFocus, listItem.index);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const index = listItem.index;
  const hasRegistered = index !== -1;
  const itemRef = React2.useRef(null);
  const indexRef = useValueAsRef(index);
  useIsoLayoutEffect(() => {
    if (!hasRegistered) {
      return void 0;
    }
    const values = valuesRef.current;
    values[index] = itemValue;
    return () => {
      delete values[index];
    };
  }, [hasRegistered, index, itemValue, valuesRef]);
  useIsoLayoutEffect(() => {
    if (!hasRegistered) {
      return void 0;
    }
    const selectedValue = store.state.value;
    let selectedCandidate = selectedValue;
    if (multiple && Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedCandidate = selectedValue[selectedValue.length - 1];
    }
    if (selectedCandidate !== void 0 && compareItemEquality(itemValue, selectedCandidate, isItemEqualToValue)) {
      store.set("selectedIndex", index);
    }
    return void 0;
  }, [hasRegistered, index, multiple, isItemEqualToValue, store, itemValue]);
  const state = {
    disabled,
    selected,
    highlighted
  };
  const rootProps = getItemProps({
    active: highlighted,
    selected
  });
  rootProps.onFocus = void 0;
  rootProps.id = void 0;
  const lastKeyRef = React2.useRef(null);
  const pointerTypeRef = React2.useRef("mouse");
  const didPointerDownRef = React2.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  function commitSelection(event) {
    const selectedValue = store.state.value;
    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const nextValue = selected ? removeItem(currentValue, itemValue, isItemEqualToValue) : [...currentValue, itemValue];
      setValue(nextValue, createChangeEventDetails(reason_parts_exports.itemPress, event));
    } else {
      setValue(itemValue, createChangeEventDetails(reason_parts_exports.itemPress, event));
      setOpen(false, createChangeEventDetails(reason_parts_exports.itemPress, event));
    }
  }
  const defaultProps = {
    role: "option",
    "aria-selected": selected,
    tabIndex: highlighted ? 0 : -1,
    onFocus() {
      store.set("activeIndex", index);
    },
    onMouseEnter() {
      if (!keyboardActiveRef.current && store.state.selectedIndex === null && highlightItemOnHover) {
        store.set("activeIndex", index);
      }
    },
    onMouseMove() {
      if (highlightItemOnHover) {
        store.set("activeIndex", index);
      }
    },
    onMouseLeave(event) {
      if (!highlightItemOnHover || keyboardActiveRef.current || isMouseWithinBounds(event)) {
        return;
      }
      highlightTimeout.start(0, () => {
        if (store.state.activeIndex === index) {
          store.set("activeIndex", null);
        }
      });
    },
    onTouchStart() {
      selectionRef.current = {
        allowSelectedMouseUp: false,
        allowUnselectedMouseUp: false
      };
    },
    onKeyDown(event) {
      lastKeyRef.current = event.key;
      store.set("activeIndex", index);
      if (event.key === " " && typingRef.current) {
        event.preventDefault();
      }
    },
    onClick(event) {
      didPointerDownRef.current = false;
      if (event.type === "keydown" && lastKeyRef.current === null) {
        return;
      }
      if (disabled || event.type === "keydown" && lastKeyRef.current === " " && typingRef.current || pointerTypeRef.current !== "touch" && !highlighted) {
        return;
      }
      lastKeyRef.current = null;
      commitSelection(event.nativeEvent);
    },
    onPointerEnter(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
      didPointerDownRef.current = true;
    },
    onMouseUp() {
      var _a2;
      if (disabled) {
        return;
      }
      if (didPointerDownRef.current) {
        didPointerDownRef.current = false;
        return;
      }
      const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
      const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;
      if (disallowSelectedMouseUp || disallowUnselectedMouseUp || pointerTypeRef.current !== "touch" && !highlighted) {
        return;
      }
      (_a2 = itemRef.current) == null ? void 0 : _a2.click();
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [rootProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = React2.useMemo(() => ({
    selected,
    indexRef,
    textRef,
    selectedByFocus,
    hasRegistered
  }), [selected, indexRef, textRef, selectedByFocus, hasRegistered]);
  return /* @__PURE__ */ jsx(SelectItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") SelectItem.displayName = "SelectItem";
var SelectItemIndicator = /* @__PURE__ */ React2.forwardRef(function SelectItemIndicator2(componentProps, forwardedRef) {
  var _a;
  const keepMounted = (_a = componentProps.keepMounted) != null ? _a : false;
  const {
    selected
  } = useSelectItemContext();
  const shouldRender = keepMounted || selected;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(Inner, __spreadProps(__spreadValues({}, componentProps), {
    ref: forwardedRef
  }));
});
if (process.env.NODE_ENV !== "production") SelectItemIndicator.displayName = "SelectItemIndicator";
var Inner = /* @__PURE__ */ React2.memo(/* @__PURE__ */ React2.forwardRef((componentProps, forwardedRef) => {
  const _a = componentProps, {
    render,
    className,
    keepMounted
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "keepMounted"
  ]);
  const {
    selected
  } = useSelectItemContext();
  const indicatorRef = React2.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(selected);
  const state = {
    selected,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: [{
      "aria-hidden": true,
      children: "\u2714\uFE0F"
    }, elementProps],
    stateAttributesMapping: transitionStatusMapping
  });
  useOpenChangeComplete({
    open: selected,
    ref: indicatorRef,
    onComplete() {
      if (!selected) {
        setMounted(false);
      }
    }
  });
  return element;
}));
if (process.env.NODE_ENV !== "production") Inner.displayName = "Inner";
var SelectItemText = /* @__PURE__ */ React2.memo(/* @__PURE__ */ React2.forwardRef(function SelectItemText2(componentProps, forwardedRef) {
  const {
    indexRef,
    textRef,
    selectedByFocus,
    hasRegistered
  } = useSelectItemContext();
  const {
    selectedItemTextRef
  } = useSelectRootContext();
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const localRef = React2.useCallback((node) => {
    if (!node || !hasRegistered) {
      return;
    }
    const hasNoSelectedItemText = selectedItemTextRef.current === null || !selectedItemTextRef.current.isConnected;
    if (selectedByFocus || hasNoSelectedItemText && indexRef.current === 0) {
      selectedItemTextRef.current = node;
    }
  }, [selectedItemTextRef, indexRef, selectedByFocus, hasRegistered]);
  const element = useRenderElement("div", componentProps, {
    ref: [localRef, forwardedRef, textRef],
    props: elementProps
  });
  return element;
}));
if (process.env.NODE_ENV !== "production") SelectItemText.displayName = "SelectItemText";
var stateAttributesMapping5 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var SelectArrow = /* @__PURE__ */ React2.forwardRef(function SelectArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const {
    store
  } = useSelectRootContext();
  const {
    side,
    align,
    arrowRef,
    arrowStyles,
    arrowUncentered,
    alignItemWithTriggerActive
  } = useSelectPositionerContext();
  const open = useStore(store, selectors.open, true);
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
    stateAttributesMapping: stateAttributesMapping5
  });
  if (alignItemWithTriggerActive) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") SelectArrow.displayName = "SelectArrow";
var SelectScrollArrow = /* @__PURE__ */ React2.forwardRef(function SelectScrollArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    direction,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "direction",
    "keepMounted"
  ]);
  const {
    store,
    popupRef,
    listRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef
  } = useSelectRootContext();
  const {
    side,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = useSelectPositionerContext();
  const visibleSelector = direction === "up" ? selectors.scrollUpArrowVisible : selectors.scrollDownArrowVisible;
  const stateVisible = useStore(store, visibleSelector);
  const openMethod = useStore(store, selectors.openMethod);
  const visible = stateVisible && openMethod !== "touch";
  const timeout = useTimeout();
  const scrollArrowRef = direction === "up" ? scrollUpArrowRef : scrollDownArrowRef;
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(visible);
  useIsoLayoutEffect(() => {
    scrollArrowsMountedCountRef.current += 1;
    if (!store.state.hasScrollArrows) {
      store.set("hasScrollArrows", true);
    }
    return () => {
      scrollArrowsMountedCountRef.current = Math.max(0, scrollArrowsMountedCountRef.current - 1);
      if (scrollArrowsMountedCountRef.current === 0 && store.state.hasScrollArrows) {
        store.set("hasScrollArrows", false);
      }
    };
  }, [store, scrollArrowsMountedCountRef]);
  useOpenChangeComplete({
    open: visible,
    ref: scrollArrowRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const state = {
    direction,
    visible,
    side,
    transitionStatus
  };
  const defaultProps = {
    "aria-hidden": true,
    children: direction === "up" ? "\u25B2" : "\u25BC",
    style: {
      position: "absolute"
    },
    onMouseMove(event) {
      if (event.movementX === 0 && event.movementY === 0 || timeout.isStarted()) {
        return;
      }
      store.set("activeIndex", null);
      function scrollNextItem() {
        var _a2, _b;
        const scroller = (_a2 = store.state.listElement) != null ? _a2 : popupRef.current;
        if (!scroller) {
          return;
        }
        store.set("activeIndex", null);
        handleScrollArrowVisibility();
        const isScrolledToTop = scroller.scrollTop === 0;
        const isScrolledToBottom = Math.round(scroller.scrollTop + scroller.clientHeight) >= scroller.scrollHeight;
        const list = listRef.current;
        if (list.length === 0) {
          if (direction === "up") {
            store.set("scrollUpArrowVisible", !isScrolledToTop);
          } else {
            store.set("scrollDownArrowVisible", !isScrolledToBottom);
          }
        }
        if (direction === "up" && isScrolledToTop || direction === "down" && isScrolledToBottom) {
          timeout.clear();
          return;
        }
        if ((store.state.listElement || popupRef.current) && listRef.current && listRef.current.length > 0) {
          const items = listRef.current;
          const scrollArrowHeight = ((_b = scrollArrowRef.current) == null ? void 0 : _b.offsetHeight) || 0;
          if (direction === "up") {
            let firstVisibleIndex = 0;
            const scrollTop = scroller.scrollTop + scrollArrowHeight;
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i];
              if (item) {
                const itemTop = item.offsetTop;
                if (itemTop >= scrollTop) {
                  firstVisibleIndex = i;
                  break;
                }
              }
            }
            const targetIndex = Math.max(0, firstVisibleIndex - 1);
            if (targetIndex < firstVisibleIndex) {
              const targetItem = items[targetIndex];
              if (targetItem) {
                scroller.scrollTop = Math.max(0, targetItem.offsetTop - scrollArrowHeight);
              }
            } else {
              scroller.scrollTop = 0;
            }
          } else {
            let lastVisibleIndex = items.length - 1;
            const scrollBottom = scroller.scrollTop + scroller.clientHeight - scrollArrowHeight;
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i];
              if (item) {
                const itemBottom = item.offsetTop + item.offsetHeight;
                if (itemBottom > scrollBottom) {
                  lastVisibleIndex = Math.max(0, i - 1);
                  break;
                }
              }
            }
            const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1);
            if (targetIndex > lastVisibleIndex) {
              const targetItem = items[targetIndex];
              if (targetItem) {
                scroller.scrollTop = targetItem.offsetTop + targetItem.offsetHeight - scroller.clientHeight + scrollArrowHeight;
              }
            } else {
              scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight;
            }
          }
        }
        timeout.start(40, scrollNextItem);
      }
      timeout.start(40, scrollNextItem);
    },
    onMouseLeave() {
      timeout.clear();
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, scrollArrowRef],
    state,
    props: [defaultProps, elementProps]
  });
  const shouldRender = visible || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") SelectScrollArrow.displayName = "SelectScrollArrow";
var SelectScrollDownArrow = /* @__PURE__ */ React2.forwardRef(function SelectScrollDownArrow2(props, forwardedRef) {
  return /* @__PURE__ */ jsx(SelectScrollArrow, __spreadProps(__spreadValues({}, props), {
    ref: forwardedRef,
    direction: "down"
  }));
});
if (process.env.NODE_ENV !== "production") SelectScrollDownArrow.displayName = "SelectScrollDownArrow";
var SelectScrollUpArrow = /* @__PURE__ */ React2.forwardRef(function SelectScrollUpArrow2(props, forwardedRef) {
  return /* @__PURE__ */ jsx(SelectScrollArrow, __spreadProps(__spreadValues({}, props), {
    ref: forwardedRef,
    direction: "up"
  }));
});
if (process.env.NODE_ENV !== "production") SelectScrollUpArrow.displayName = "SelectScrollUpArrow";
var SelectGroupContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SelectGroupContext.displayName = "SelectGroupContext";
function useSelectGroupContext() {
  const context = React2.useContext(SelectGroupContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SelectGroupContext is missing. SelectGroup parts must be placed within <Select.Group>." : formatErrorMessage_default(56));
  }
  return context;
}
var SelectGroup = /* @__PURE__ */ React2.forwardRef(function SelectGroup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const [labelId, setLabelId] = React2.useState();
  const contextValue = React2.useMemo(() => ({
    labelId,
    setLabelId
  }), [labelId, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "group",
      "aria-labelledby": labelId
    }, elementProps]
  });
  return /* @__PURE__ */ jsx(SelectGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") SelectGroup.displayName = "SelectGroup";
var SelectGroupLabel = /* @__PURE__ */ React2.forwardRef(function SelectGroupLabel2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "id"
  ]);
  const {
    setLabelId
  } = useSelectGroupContext();
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
  }, [id, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SelectGroupLabel.displayName = "SelectGroupLabel";
var Select = index_parts_exports.Root;
function SelectGroup3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Group,
    __spreadValues({
      "data-slot": "select-group",
      className: cn("scroll-my-1 p-1", className)
    }, props)
  );
}
function SelectValue3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Value,
    __spreadValues({
      "data-slot": "select-value",
      className: cn("flex flex-1 text-left", className)
    }, props)
  );
}
function SelectTrigger3(_a) {
  var _b = _a, {
    className,
    size = "default",
    variant = "default",
    children
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "variant",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.Trigger,
    __spreadProps(__spreadValues({
      "data-slot": "select-trigger",
      "data-size": size,
      "data-variant": variant,
      className: cn(
        "flex w-fit items-center justify-between rounded-sm bg-background text-[13px] leading-[20px] whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring active:border-primary-press disabled:cursor-not-allowed disabled:bg-muted disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=default]:px-3 data-[size=default]:py-0 data-[size=default]:gap-2 data-[size=sm]:h-6 data-[size=sm]:px-2 data-[size=sm]:py-0 data-[size=sm]:gap-1 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "default" && "border border-input shadow-xs hover:border-primary dark:bg-input/30 dark:hover:bg-input/50",
        variant === "ghost" && "border border-transparent shadow-none hover:border-primary hover:shadow-xs data-[size=default]:px-2",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(
          index_parts_exports.Icon,
          {
            render: /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none size-4 text-muted-foreground" })
          }
        )
      ]
    })
  );
}
function SelectContent(_a) {
  var _b = _a, {
    className,
    children,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    alignItemWithTrigger = false
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "alignItemWithTrigger"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { children: /* @__PURE__ */ jsx(
    index_parts_exports.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsxs(
        index_parts_exports.Popup,
        __spreadProps(__spreadValues({
          "data-slot": "select-content",
          "data-align-trigger": alignItemWithTrigger,
          className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)
        }, props), {
          children: [
            /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
            /* @__PURE__ */ jsx(index_parts_exports.List, { children }),
            /* @__PURE__ */ jsx(SelectScrollDownButton, {})
          ]
        })
      )
    }
  ) });
}
function SelectLabel3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.GroupLabel,
    __spreadValues({
      "data-slot": "select-label",
      className: cn("px-2 py-1 text-[12px] leading-[16px] text-muted-foreground", className)
    }, props)
  );
}
function SelectItem3(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.Item,
    __spreadProps(__spreadValues({
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1 pl-8 pr-1.5 text-[13px] outline-hidden select-none focus:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          index_parts_exports.ItemIndicator,
          {
            render: /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-1.5 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ jsx(Check, { className: "pointer-events-none" })
          }
        ),
        /* @__PURE__ */ jsx(index_parts_exports.ItemText, { className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap", children })
      ]
    })
  );
}
function SelectSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Separator,
    __spreadValues({
      "data-slot": "select-separator",
      className: cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)
    }, props)
  );
}
function SelectScrollUpButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.ScrollUpArrow,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-up-button",
      className: cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-background py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        ChevronUp,
        {}
      )
    })
  );
}
function SelectScrollDownButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.ScrollDownArrow,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-down-button",
      className: cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-background py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        ChevronDown,
        {}
      )
    })
  );
}

export { Select, SelectContent, SelectGroup3 as SelectGroup, SelectItem3 as SelectItem, SelectLabel3 as SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger3 as SelectTrigger, SelectValue3 as SelectValue, styleDisableScrollbar };
//# sourceMappingURL=chunk-IF3VZH4N.mjs.map
//# sourceMappingURL=chunk-IF3VZH4N.mjs.map