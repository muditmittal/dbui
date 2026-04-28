import { Close } from './chunk-45GJTJ2K.mjs';
import { compareItemEquality, hasNullItemLabel, resolveMultipleLabels, resolveSelectedLabel, findItemIndex, defaultItemEquality, stringifyAsLabel, isGroupedItems, stringifyAsValue, selectedValueIncludes, removeItem } from './chunk-B4K6AF4V.mjs';
import { getDefaultLabelId, resolveAriaLabelledBy } from './chunk-OOCSARU7.mjs';
import { ChevronDown } from './chunk-3L5IV4F2.mjs';
import { getPseudoElementBounds, Check } from './chunk-JN7JP22S.mjs';
import { Separator } from './chunk-VX2FCPLK.mjs';
import { useAnchorPositioning, getDisabledMountTransitionStyles } from './chunk-75IAMYM2.mjs';
import { useOnFirstRender } from './chunk-SVF7A3EA.mjs';
import { useScrollLock, InternalBackdrop, useOpenInteractionType } from './chunk-4AAVJQFL.mjs';
import { createSelector, pressableTriggerOpenStateMapping, triggerOpenStateMapping, popupStateMapping, useStore, useTypeahead, useClick, FloatingPortal, FloatingFocusManager, Store, useFloatingRootContext, useDismiss, useListNavigation, useInteractions } from './chunk-PSMHWWS3.mjs';
import { useValueAsRef } from './chunk-RAYLQUWY.mjs';
import { inertValue } from './chunk-POBMUUJY.mjs';
import { useLabel } from './chunk-KY5XN6YG.mjs';
import { useTimeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useCompositeListItem, IndexGuessBehavior } from './chunk-SDWHTCRY.mjs';
import { useDirection } from './chunk-NNBMTHBT.mjs';
import { stopEvent } from './chunk-XK53VWW6.mjs';
import { contains, getTarget } from './chunk-FQ4RTFU7.mjs';
import { isFirefox, isAndroid } from './chunk-BO7ZMLYZ.mjs';
import { transitionStatusMapping, useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHiddenInput, visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { fieldValidityMapping, useFieldRootContext, useLabelableContext, DEFAULT_FIELD_STATE_ATTRIBUTES, useFormContext, useField } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports, createGenericEventDetails } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { error } from './chunk-T3HTT7SQ.mjs';
import { SafeReact } from './chunk-6PGNYKRT.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, EMPTY_OBJECT, useMergedRefs, DROPDOWN_COLLISION_AVOIDANCE, EMPTY_ARRAY, useRefWithInit, NOOP, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __spreadProps, __spreadValues, __export, __objRest } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';

var ComboboxRootContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxRootContext.displayName = "ComboboxRootContext";
var ComboboxFloatingContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxFloatingContext.displayName = "ComboboxFloatingContext";
var ComboboxDerivedItemsContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxDerivedItemsContext.displayName = "ComboboxDerivedItemsContext";
var ComboboxInputValueContext = /* @__PURE__ */ React3.createContext("");
if (process.env.NODE_ENV !== "production") ComboboxInputValueContext.displayName = "ComboboxInputValueContext";
function useComboboxRootContext() {
  const context = React3.useContext(ComboboxRootContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxRootContext is missing. Combobox parts must be placed within <Combobox.Root>." : formatErrorMessage_default(22));
  }
  return context;
}
function useComboboxFloatingContext() {
  const context = React3.useContext(ComboboxFloatingContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxFloatingContext is missing. Combobox parts must be placed within <Combobox.Root>." : formatErrorMessage_default(23));
  }
  return context;
}
function useComboboxDerivedItemsContext() {
  const context = React3.useContext(ComboboxDerivedItemsContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxItemsContext is missing. Combobox parts must be placed within <Combobox.Root>." : formatErrorMessage_default(24));
  }
  return context;
}
function useComboboxInputValueContext() {
  return React3.useContext(ComboboxInputValueContext);
}

// ../../node_modules/@base-ui/react/esm/combobox/store.js
var selectors = {
  id: createSelector((state) => state.id),
  labelId: createSelector((state) => state.labelId),
  query: createSelector((state) => state.query),
  items: createSelector((state) => state.items),
  selectedValue: createSelector((state) => state.selectedValue),
  hasSelectionChips: createSelector((state) => {
    const selectedValue = state.selectedValue;
    return Array.isArray(selectedValue) && selectedValue.length > 0;
  }),
  hasSelectedValue: createSelector((state) => {
    const {
      selectedValue,
      selectionMode
    } = state;
    if (selectedValue == null) {
      return false;
    }
    if (selectionMode === "multiple" && Array.isArray(selectedValue)) {
      return selectedValue.length > 0;
    }
    return true;
  }),
  hasNullItemLabel: createSelector((state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false;
  }),
  open: createSelector((state) => state.open),
  mounted: createSelector((state) => state.mounted),
  forceMounted: createSelector((state) => state.forceMounted),
  inline: createSelector((state) => state.inline),
  activeIndex: createSelector((state) => state.activeIndex),
  selectedIndex: createSelector((state) => state.selectedIndex),
  isActive: createSelector((state, index) => state.activeIndex === index),
  isSelected: createSelector((state, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const selectedValue = state.selectedValue;
    if (Array.isArray(selectedValue)) {
      return selectedValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  }),
  transitionStatus: createSelector((state) => state.transitionStatus),
  popupProps: createSelector((state) => state.popupProps),
  inputProps: createSelector((state) => state.inputProps),
  triggerProps: createSelector((state) => state.triggerProps),
  getItemProps: createSelector((state) => state.getItemProps),
  positionerElement: createSelector((state) => state.positionerElement),
  listElement: createSelector((state) => state.listElement),
  triggerElement: createSelector((state) => state.triggerElement),
  inputElement: createSelector((state) => state.inputElement),
  inputGroupElement: createSelector((state) => state.inputGroupElement),
  popupSide: createSelector((state) => state.popupSide),
  openMethod: createSelector((state) => state.openMethod),
  inputInsidePopup: createSelector((state) => state.inputInsidePopup),
  selectionMode: createSelector((state) => state.selectionMode),
  listRef: createSelector((state) => state.listRef),
  labelsRef: createSelector((state) => state.labelsRef),
  popupRef: createSelector((state) => state.popupRef),
  emptyRef: createSelector((state) => state.emptyRef),
  inputRef: createSelector((state) => state.inputRef),
  keyboardActiveRef: createSelector((state) => state.keyboardActiveRef),
  chipsContainerRef: createSelector((state) => state.chipsContainerRef),
  clearRef: createSelector((state) => state.clearRef),
  valuesRef: createSelector((state) => state.valuesRef),
  allValuesRef: createSelector((state) => state.allValuesRef),
  name: createSelector((state) => state.name),
  disabled: createSelector((state) => state.disabled),
  readOnly: createSelector((state) => state.readOnly),
  required: createSelector((state) => state.required),
  grid: createSelector((state) => state.grid),
  isGrouped: createSelector((state) => state.isGrouped),
  virtualized: createSelector((state) => state.virtualized),
  onOpenChangeComplete: createSelector((state) => state.onOpenChangeComplete),
  openOnInputClick: createSelector((state) => state.openOnInputClick),
  itemToStringLabel: createSelector((state) => state.itemToStringLabel),
  isItemEqualToValue: createSelector((state) => state.isItemEqualToValue),
  modal: createSelector((state) => state.modal),
  autoHighlight: createSelector((state) => state.autoHighlight),
  submitOnItemClick: createSelector((state) => state.submitOnItemClick)
};

// ../../node_modules/@base-ui/react/esm/combobox/root/utils/index.js
function createCollatorItemFilter(collatorFilter, itemToStringLabel) {
  return (item, query) => {
    if (item == null) {
      return false;
    }
    const itemString = stringifyAsLabel(item, itemToStringLabel);
    return collatorFilter.contains(itemString, query);
  };
}
function createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue) {
  return (item, query) => {
    if (item == null) {
      return false;
    }
    if (!query) {
      return true;
    }
    const itemString = stringifyAsLabel(item, itemToStringLabel);
    const selectedString = selectedValue != null ? stringifyAsLabel(selectedValue, itemToStringLabel) : "";
    if (selectedString && collatorFilter.contains(selectedString, query) && selectedString.length === query.length) {
      return true;
    }
    return collatorFilter.contains(itemString, query);
  };
}
var filterCache = /* @__PURE__ */ new Map();
function stringifyLocale(locale) {
  if (Array.isArray(locale)) {
    return locale.map((value) => stringifyLocale(value)).join(",");
  }
  if (locale == null) {
    return "";
  }
  return String(locale);
}
function getFilter(options = {}) {
  const mergedOptions = __spreadValues({
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: true
  }, options);
  const cacheKey = `${stringifyLocale(options.locale)}|${JSON.stringify(mergedOptions)}`;
  const cachedFilter = filterCache.get(cacheKey);
  if (cachedFilter) {
    return cachedFilter;
  }
  const collator = new Intl.Collator(options.locale, mergedOptions);
  const filter = {
    contains(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      for (let i = 0; i <= itemString.length - query.length; i += 1) {
        if (collator.compare(itemString.slice(i, i + query.length), query) === 0) {
          return true;
        }
      }
      return false;
    },
    startsWith(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      return collator.compare(itemString.slice(0, query.length), query) === 0;
    },
    endsWith(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      const queryLength = query.length;
      return itemString.length >= queryLength && collator.compare(itemString.slice(itemString.length - queryLength), query) === 0;
    }
  };
  filterCache.set(cacheKey, filter);
  return filter;
}
var useCoreFilter = getFilter;
function useComboboxFilter(options = {}) {
  const _a = options, {
    multiple = false,
    value
  } = _a, collatorOptions = __objRest(_a, [
    "multiple",
    "value"
  ]);
  const coreFilter = getFilter(collatorOptions);
  const contains2 = React3.useCallback((item, query, itemToString) => {
    if (multiple) {
      return createCollatorItemFilter(coreFilter, itemToString)(item, query);
    }
    return createSingleSelectionCollatorFilter(coreFilter, itemToString, value)(item, query);
  }, [coreFilter, value, multiple]);
  return React3.useMemo(() => ({
    contains: contains2,
    startsWith: coreFilter.startsWith,
    endsWith: coreFilter.endsWith
  }), [contains2, coreFilter]);
}

// ../../node_modules/@base-ui/react/esm/combobox/root/utils/constants.js
var NO_ACTIVE_VALUE = /* @__PURE__ */ Symbol("none");
var INITIAL_LAST_HIGHLIGHT = {
  value: NO_ACTIVE_VALUE,
  index: -1
};
function AriaCombobox(props) {
  const {
    id: idProp,
    onOpenChangeComplete: onOpenChangeCompleteProp,
    defaultSelectedValue = null,
    selectedValue: selectedValueProp,
    onSelectedValueChange,
    defaultInputValue: defaultInputValueProp,
    inputValue: inputValueProp,
    selectionMode = "none",
    onItemHighlighted: onItemHighlightedProp,
    name: nameProp,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    inputRef: inputRefProp,
    grid = false,
    items,
    filteredItems: filteredItemsProp,
    filter: filterProp,
    openOnInputClick = true,
    autoHighlight = false,
    keepHighlight = false,
    highlightItemOnHover = true,
    loopFocus = true,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    virtualized = false,
    inline: inlineProp = false,
    fillInputOnItemPress = true,
    modal = false,
    limit = -1,
    autoComplete = "list",
    formAutoComplete,
    locale,
    submitOnItemClick = false
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    validityData,
    shouldValidateOnChange,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const id = useLabelableId({
    id: idProp
  });
  const collatorFilter = useCoreFilter({
    locale
  });
  const [queryChangedAfterOpen, setQueryChangedAfterOpen] = React3.useState(false);
  const [closeQuery, setCloseQuery] = React3.useState(null);
  const listRef = React3.useRef([]);
  const labelsRef = React3.useRef([]);
  const popupRef = React3.useRef(null);
  const inputRef = React3.useRef(null);
  const startDismissRef = React3.useRef(null);
  const endDismissRef = React3.useRef(null);
  const emptyRef = React3.useRef(null);
  const keyboardActiveRef = React3.useRef(true);
  const hadInputClearRef = React3.useRef(false);
  const chipsContainerRef = React3.useRef(null);
  const clearRef = React3.useRef(null);
  const selectionEventRef = React3.useRef(null);
  const lastHighlightRef = React3.useRef(INITIAL_LAST_HIGHLIGHT);
  const pendingQueryHighlightRef = React3.useRef(null);
  const valuesRef = React3.useRef([]);
  const allValuesRef = React3.useRef([]);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const multiple = selectionMode === "multiple";
  const single = selectionMode === "single";
  const hasInputValue = inputValueProp !== void 0 || defaultInputValueProp !== void 0;
  const hasItems = items !== void 0;
  const hasFilteredItemsProp = filteredItemsProp !== void 0;
  let autoHighlightMode;
  if (autoHighlight === "always") {
    autoHighlightMode = "always";
  } else {
    autoHighlightMode = autoHighlight ? "input-change" : false;
  }
  const [selectedValue, setSelectedValueUnwrapped] = useControlled({
    controlled: selectedValueProp,
    default: multiple ? defaultSelectedValue != null ? defaultSelectedValue : EMPTY_ARRAY : defaultSelectedValue,
    name: "Combobox",
    state: "selectedValue"
  });
  const filter = React3.useMemo(() => {
    if (filterProp === null) {
      return () => true;
    }
    if (filterProp !== void 0) {
      return filterProp;
    }
    if (single && !queryChangedAfterOpen) {
      return createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue);
    }
    return createCollatorItemFilter(collatorFilter, itemToStringLabel);
  }, [filterProp, single, selectedValue, queryChangedAfterOpen, collatorFilter, itemToStringLabel]);
  const initialDefaultInputValue = useRefWithInit(() => {
    if (hasInputValue) {
      return defaultInputValueProp != null ? defaultInputValueProp : "";
    }
    if (single) {
      return stringifyAsLabel(selectedValue, itemToStringLabel);
    }
    return "";
  }).current;
  const [inputValue, setInputValueUnwrapped] = useControlled({
    controlled: inputValueProp,
    default: initialDefaultInputValue,
    name: "Combobox",
    state: "inputValue"
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: props.open,
    default: props.defaultOpen,
    name: "Combobox",
    state: "open"
  });
  const isGrouped = isGroupedItems(items);
  const query = closeQuery != null ? closeQuery : inputValue === "" ? "" : String(inputValue).trim();
  const selectedLabelString = single ? stringifyAsLabel(selectedValue, itemToStringLabel) : "";
  const shouldBypassFiltering = single && !queryChangedAfterOpen && query !== "" && selectedLabelString !== "" && selectedLabelString.length === query.length && collatorFilter.contains(selectedLabelString, query);
  const filterQuery = shouldBypassFiltering ? "" : query;
  const shouldIgnoreExternalFiltering = hasItems && hasFilteredItemsProp && shouldBypassFiltering;
  const flatItems = React3.useMemo(() => {
    if (!items) {
      return EMPTY_ARRAY;
    }
    if (isGrouped) {
      return items.flatMap((group) => group.items);
    }
    return items;
  }, [items, isGrouped]);
  const filteredItems = React3.useMemo(() => {
    if (filteredItemsProp && !shouldIgnoreExternalFiltering) {
      return filteredItemsProp;
    }
    if (!items) {
      return EMPTY_ARRAY;
    }
    if (isGrouped) {
      const groupedItems = items;
      const resultingGroups = [];
      let currentCount = 0;
      for (const group of groupedItems) {
        if (limit > -1 && currentCount >= limit) {
          break;
        }
        const candidateItems = filterQuery === "" ? group.items : group.items.filter((item) => filter(item, filterQuery, itemToStringLabel));
        if (candidateItems.length === 0) {
          continue;
        }
        const remainingLimit = limit > -1 ? limit - currentCount : Infinity;
        const itemsToTake = candidateItems.slice(0, remainingLimit);
        if (itemsToTake.length > 0) {
          const newGroup = __spreadProps(__spreadValues({}, group), {
            items: itemsToTake
          });
          resultingGroups.push(newGroup);
          currentCount += itemsToTake.length;
        }
      }
      return resultingGroups;
    }
    if (filterQuery === "") {
      return limit > -1 ? flatItems.slice(0, limit) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        flatItems
      );
    }
    const limitedItems = [];
    for (const item of flatItems) {
      if (limit > -1 && limitedItems.length >= limit) {
        break;
      }
      if (filter(item, filterQuery, itemToStringLabel)) {
        limitedItems.push(item);
      }
    }
    return limitedItems;
  }, [filteredItemsProp, shouldIgnoreExternalFiltering, items, isGrouped, filterQuery, limit, filter, itemToStringLabel, flatItems]);
  const flatFilteredItems = React3.useMemo(() => {
    if (isGrouped) {
      const groups = filteredItems;
      return groups.flatMap((g) => g.items);
    }
    return filteredItems;
  }, [filteredItems, isGrouped]);
  const store = useRefWithInit(() => new Store({
    id,
    labelId: void 0,
    selectedValue,
    open,
    filter,
    query,
    items,
    selectionMode,
    listRef,
    labelsRef,
    popupRef,
    emptyRef,
    inputRef,
    startDismissRef,
    endDismissRef,
    keyboardActiveRef,
    chipsContainerRef,
    clearRef,
    valuesRef,
    allValuesRef,
    selectionEventRef,
    name,
    disabled,
    readOnly,
    required,
    grid,
    isGrouped,
    virtualized,
    openOnInputClick,
    itemToStringLabel,
    isItemEqualToValue,
    modal,
    autoHighlight: autoHighlightMode,
    submitOnItemClick,
    hasInputValue,
    mounted: false,
    forceMounted: false,
    transitionStatus: "idle",
    inline: inlineProp,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    inputProps: {},
    triggerProps: {},
    positionerElement: null,
    listElement: null,
    triggerElement: null,
    inputElement: null,
    inputGroupElement: null,
    popupSide: null,
    openMethod: null,
    inputInsidePopup: true,
    onOpenChangeComplete: onOpenChangeCompleteProp || NOOP,
    // Placeholder callbacks replaced on first render
    setOpen: NOOP,
    setInputValue: NOOP,
    setSelectedValue: NOOP,
    setIndices: NOOP,
    onItemHighlighted: NOOP,
    handleSelection: NOOP,
    getItemProps: () => EMPTY_OBJECT,
    forceMount: NOOP,
    requestSubmit: NOOP
  })).current;
  const fieldRawValue = selectionMode === "none" ? inputValue : selectedValue;
  const fieldStringValue = React3.useMemo(() => {
    if (selectionMode === "none") {
      return fieldRawValue;
    }
    if (Array.isArray(selectedValue)) {
      return selectedValue.map((value) => stringifyAsValue(value, itemToStringValue));
    }
    return stringifyAsValue(selectedValue, itemToStringValue);
  }, [fieldRawValue, itemToStringValue, selectionMode, selectedValue]);
  const onItemHighlighted = useStableCallback(onItemHighlightedProp);
  const onOpenChangeComplete = useStableCallback(onOpenChangeCompleteProp);
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const inputGroupElement = useStore(store, selectors.inputGroupElement);
  const inline = useStore(store, selectors.inline);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const triggerRef = useValueAsRef(triggerElement);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps
  } = useOpenInteractionType(open);
  useField({
    id,
    name,
    commit: validation.commit,
    value: fieldRawValue,
    controlRef: inputInsidePopup ? triggerRef : inputRef,
    getValue: () => fieldStringValue
  });
  const forceMount = useStableCallback(() => {
    if (items) {
      labelsRef.current = flatFilteredItems.map((item) => stringifyAsLabel(item, itemToStringLabel));
    } else {
      store.set("forceMounted", true);
    }
  });
  const initialSelectedValueRef = React3.useRef(selectedValue);
  useIsoLayoutEffect(() => {
    if (selectedValue !== initialSelectedValueRef.current) {
      forceMount();
    }
  }, [forceMount, selectedValue]);
  const setIndices = useStableCallback((options) => {
    store.update(options);
    const type = options.type || "none";
    if (options.activeIndex === void 0) {
      return;
    }
    if (options.activeIndex === null) {
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
        onItemHighlighted(void 0, createGenericEventDetails(type, void 0, {
          index: -1
        }));
      }
    } else {
      const activeValue = valuesRef.current[options.activeIndex];
      lastHighlightRef.current = {
        value: activeValue,
        index: options.activeIndex
      };
      onItemHighlighted(activeValue, createGenericEventDetails(type, void 0, {
        index: options.activeIndex
      }));
    }
  });
  const setInputValue = useStableCallback((next, eventDetails) => {
    var _a;
    hadInputClearRef.current = eventDetails.reason === reason_parts_exports.inputClear;
    (_a = props.onInputValueChange) == null ? void 0 : _a.call(props, next, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (eventDetails.reason === reason_parts_exports.inputChange) {
      const event = eventDetails.event;
      const inputType = event.inputType;
      const isTypedInput = event.type === "compositionend" || inputType != null && inputType !== "" && inputType !== "insertReplacementText";
      if (isTypedInput) {
        const hasQuery = next.trim() !== "";
        if (hasQuery) {
          setQueryChangedAfterOpen(true);
        }
        pendingQueryHighlightRef.current = {
          hasQuery
        };
        if (hasQuery && autoHighlightMode && store.state.activeIndex == null) {
          store.set("activeIndex", 0);
        }
      }
    }
    setInputValueUnwrapped(next);
  });
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    var _a;
    if (open === nextOpen) {
      return;
    }
    if (eventDetails.reason === "escape-key" && hasItems && flatFilteredItems.length === 0 && !store.state.emptyRef.current) {
      eventDetails.allowPropagation();
    }
    (_a = props.onOpenChange) == null ? void 0 : _a.call(props, nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (!nextOpen && queryChangedAfterOpen) {
      if (single) {
        if (!inline) {
          setCloseQuery(query);
        }
        if (query === "") {
          setQueryChangedAfterOpen(false);
        }
      } else if (multiple) {
        if (inline || inputInsidePopup) {
          setIndices({
            activeIndex: null
          });
        } else {
          setCloseQuery(query);
        }
        setInputValue("", createChangeEventDetails(reason_parts_exports.inputClear, eventDetails.event));
      }
    }
    setOpenUnwrapped(nextOpen);
    if (!nextOpen && inputInsidePopup && (eventDetails.reason === reason_parts_exports.focusOut || eventDetails.reason === reason_parts_exports.outsidePress)) {
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
        validation.commit(valueToValidate);
      }
    }
  });
  const setSelectedValue = useStableCallback((nextValue, eventDetails) => {
    onSelectedValueChange == null ? void 0 : onSelectedValueChange(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setSelectedValueUnwrapped(nextValue);
    const shouldFillInput = selectionMode === "none" && popupRef.current && fillInputOnItemPress || single && !store.state.inputInsidePopup;
    if (shouldFillInput) {
      setInputValue(stringifyAsLabel(nextValue, itemToStringLabel), createChangeEventDetails(eventDetails.reason, eventDetails.event));
    }
    if (single && nextValue != null && eventDetails.reason !== reason_parts_exports.inputChange && queryChangedAfterOpen && !inline) {
      setCloseQuery(query);
    }
  });
  const handleSelection = useStableCallback((event, passedValue) => {
    var _a, _b;
    let itemValue = passedValue;
    if (itemValue === void 0) {
      if (activeIndex === null) {
        return;
      }
      itemValue = valuesRef.current[activeIndex];
    }
    const targetEl = getTarget(event);
    const overrideEvent = (_a = selectionEventRef.current) != null ? _a : event;
    selectionEventRef.current = null;
    const eventDetails = createChangeEventDetails(reason_parts_exports.itemPress, overrideEvent);
    const href = (_b = targetEl == null ? void 0 : targetEl.closest("a")) == null ? void 0 : _b.getAttribute("href");
    if (href) {
      if (href.startsWith("#")) {
        setOpen(false, eventDetails);
      }
      return;
    }
    if (multiple) {
      const currentSelectedValue = Array.isArray(selectedValue) ? selectedValue : [];
      const isCurrentlySelected = selectedValueIncludes(currentSelectedValue, itemValue, store.state.isItemEqualToValue);
      const nextValue = isCurrentlySelected ? removeItem(currentSelectedValue, itemValue, store.state.isItemEqualToValue) : [...currentSelectedValue, itemValue];
      setSelectedValue(nextValue, eventDetails);
      const wasFiltering = inputRef.current ? inputRef.current.value.trim() !== "" : false;
      if (!wasFiltering) {
        return;
      }
      if (store.state.inputInsidePopup) {
        setInputValue("", createChangeEventDetails(reason_parts_exports.inputClear, eventDetails.event));
      } else {
        setOpen(false, eventDetails);
      }
    } else {
      setSelectedValue(itemValue, eventDetails);
      setOpen(false, eventDetails);
    }
  });
  const requestSubmit = useStableCallback(() => {
    var _a;
    if (!store.state.submitOnItemClick) {
      return;
    }
    const form = (_a = store.state.inputElement) == null ? void 0 : _a.form;
    if (form && typeof form.requestSubmit === "function") {
      form.requestSubmit();
    }
  });
  const handleUnmount = useStableCallback(() => {
    setMounted(false);
    onOpenChangeComplete == null ? void 0 : onOpenChangeComplete(false);
    setQueryChangedAfterOpen(false);
    setCloseQuery(null);
    if (selectionMode === "none") {
      setIndices({
        activeIndex: null,
        selectedIndex: null
      });
    } else {
      setIndices({
        activeIndex: null
      });
    }
    if (multiple && inputRef.current && inputRef.current.value !== "" && !hadInputClearRef.current) {
      setInputValue("", createChangeEventDetails(reason_parts_exports.inputClear));
    }
    if (single) {
      if (store.state.inputInsidePopup) {
        if (inputRef.current && inputRef.current.value !== "") {
          setInputValue("", createChangeEventDetails(reason_parts_exports.inputClear));
        }
      } else {
        const stringVal = stringifyAsLabel(selectedValue, itemToStringLabel);
        if (inputRef.current && inputRef.current.value !== stringVal) {
          const reason = stringVal === "" ? reason_parts_exports.inputClear : reason_parts_exports.none;
          setInputValue(stringVal, createChangeEventDetails(reason));
        }
      }
    }
  });
  const resolvedPopupRef = React3.useMemo(() => {
    if (inline && positionerElement) {
      return {
        current: positionerElement.closest('[role="dialog"]')
      };
    }
    return popupRef;
  }, [inline, positionerElement]);
  useOpenChangeComplete({
    enabled: !props.actionsRef,
    open,
    ref: resolvedPopupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React3.useImperativeHandle(props.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  useIsoLayoutEffect(function syncSelectedIndex() {
    if (open || selectionMode === "none") {
      return;
    }
    const registry = items ? flatItems : allValuesRef.current;
    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const lastValue = currentValue[currentValue.length - 1];
      const lastIndex = findItemIndex(registry, lastValue, isItemEqualToValue);
      setIndices({
        selectedIndex: lastIndex === -1 ? null : lastIndex
      });
    } else {
      const index = findItemIndex(registry, selectedValue, isItemEqualToValue);
      setIndices({
        selectedIndex: index === -1 ? null : index
      });
    }
  }, [open, selectedValue, items, selectionMode, flatItems, multiple, isItemEqualToValue, setIndices]);
  useIsoLayoutEffect(() => {
    if (items) {
      valuesRef.current = flatFilteredItems;
      listRef.current.length = flatFilteredItems.length;
    }
  }, [items, flatFilteredItems]);
  useIsoLayoutEffect(() => {
    const pendingHighlight = pendingQueryHighlightRef.current;
    if (pendingHighlight) {
      if (pendingHighlight.hasQuery) {
        if (autoHighlightMode) {
          store.set("activeIndex", 0);
        }
      } else if (autoHighlightMode === "always") {
        store.set("activeIndex", 0);
      }
      pendingQueryHighlightRef.current = null;
    }
    if (!open && !inline) {
      return;
    }
    const shouldUseFlatFilteredItems = hasItems || hasFilteredItemsProp;
    const candidateItems = shouldUseFlatFilteredItems ? flatFilteredItems : valuesRef.current;
    const storeActiveIndex = store.state.activeIndex;
    if (storeActiveIndex == null) {
      if (autoHighlightMode === "always" && candidateItems.length > 0) {
        store.set("activeIndex", 0);
        return;
      }
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
        store.state.onItemHighlighted(void 0, createGenericEventDetails(reason_parts_exports.none, void 0, {
          index: -1
        }));
      }
      return;
    }
    if (storeActiveIndex >= candidateItems.length) {
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
        store.state.onItemHighlighted(void 0, createGenericEventDetails(reason_parts_exports.none, void 0, {
          index: -1
        }));
      }
      store.set("activeIndex", null);
      return;
    }
    const itemValue = candidateItems[storeActiveIndex];
    const previouslyHighlightedItemValue = lastHighlightRef.current.value;
    const isSameItem = previouslyHighlightedItemValue !== NO_ACTIVE_VALUE && compareItemEquality(itemValue, previouslyHighlightedItemValue, store.state.isItemEqualToValue);
    if (lastHighlightRef.current.index !== storeActiveIndex || !isSameItem) {
      lastHighlightRef.current = {
        value: itemValue,
        index: storeActiveIndex
      };
      store.state.onItemHighlighted(itemValue, createGenericEventDetails(reason_parts_exports.none, void 0, {
        index: storeActiveIndex
      }));
    }
  }, [activeIndex, autoHighlightMode, hasFilteredItemsProp, hasItems, flatFilteredItems, inline, open, store]);
  useIsoLayoutEffect(() => {
    if (selectionMode === "none") {
      setFilled(String(inputValue) !== "");
      return;
    }
    setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
  }, [setFilled, selectionMode, inputValue, selectedValue, multiple]);
  React3.useEffect(() => {
    if (hasItems && autoHighlightMode && flatFilteredItems.length === 0) {
      setIndices({
        activeIndex: null
      });
    }
  }, [hasItems, autoHighlightMode, flatFilteredItems.length, setIndices]);
  useValueChanged(query, () => {
    if (!open || query === "" || query === String(initialDefaultInputValue)) {
      return;
    }
    setQueryChangedAfterOpen(true);
  });
  useValueChanged(selectedValue, () => {
    if (selectionMode === "none") {
      return;
    }
    clearErrors(name);
    setDirty(selectedValue !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(selectedValue);
    } else {
      validation.commit(selectedValue, true);
    }
    if (single && !hasInputValue && !inputInsidePopup) {
      const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel);
      if (inputValue !== nextInputValue) {
        setInputValue(nextInputValue, createChangeEventDetails(reason_parts_exports.none));
      }
    }
  });
  useValueChanged(inputValue, () => {
    if (selectionMode !== "none") {
      return;
    }
    clearErrors(name);
    setDirty(inputValue !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(inputValue);
    } else {
      validation.commit(inputValue, true);
    }
  });
  useValueChanged(items, () => {
    if (!single || hasInputValue || inputInsidePopup || queryChangedAfterOpen) {
      return;
    }
    const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel);
    if (inputValue !== nextInputValue) {
      setInputValue(nextInputValue, createChangeEventDetails(reason_parts_exports.none));
    }
  });
  const floatingRootContext = useFloatingRootContext({
    open: inline ? true : open,
    onOpenChange: setOpen,
    elements: {
      reference: inputInsidePopup ? triggerElement : inputElement,
      floating: positionerElement
    }
  });
  let ariaHasPopup;
  let ariaExpanded;
  if (!inline) {
    ariaHasPopup = grid ? "grid" : "listbox";
    ariaExpanded = open ? "true" : "false";
  }
  const role = React3.useMemo(() => {
    const isPlainInput = (inputElement == null ? void 0 : inputElement.tagName) === "INPUT";
    const shouldTreatAsInput = inputElement == null || isPlainInput;
    const shouldApplyAria = shouldTreatAsInput || open;
    const reference = shouldTreatAsInput ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    if (shouldApplyAria) {
      reference.role = "combobox";
      reference["aria-expanded"] = ariaExpanded;
      reference["aria-haspopup"] = ariaHasPopup;
      reference["aria-controls"] = open ? listElement == null ? void 0 : listElement.id : void 0;
      reference["aria-autocomplete"] = autoComplete;
    }
    return {
      reference,
      floating: {
        role: "presentation"
      }
    };
  }, [inputElement, open, ariaExpanded, ariaHasPopup, listElement == null ? void 0 : listElement.id, autoComplete]);
  const click = useClick(floatingRootContext, {
    enabled: !readOnly && !disabled && openOnInputClick,
    event: "mousedown-only",
    toggle: false,
    // Apply a small delay for touch to let iOS viewport centering settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: inputInsidePopup ? 0 : 50,
    reason: reason_parts_exports.inputPress
  });
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !readOnly && !disabled && !inline,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: inline ? true : void 0,
    outsidePress(event) {
      const target = getTarget(event);
      return !contains(triggerElement, target) && !contains(clearRef.current, target) && !contains(chipsContainerRef.current, target) && !contains(inputGroupElement, target);
    }
  });
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !readOnly && !disabled,
    id,
    listRef,
    activeIndex,
    selectedIndex,
    virtual: true,
    loopFocus,
    allowEscape: loopFocus && !autoHighlightMode,
    focusItemOnOpen: queryChangedAfterOpen || selectionMode === "none" && !autoHighlightMode ? false : "auto",
    focusItemOnHover: highlightItemOnHover,
    resetOnPointerLeave: !keepHighlight,
    // `cols` > 1 enables grid navigation.
    // Since <Combobox.Row> infers column sizes (and is required when building a grid),
    // it works correctly even with a value of `2`.
    // Floating UI tests don't require `role="row"` wrappers, so retains the number API.
    cols: grid ? 2 : 1,
    orientation: grid ? "horizontal" : void 0,
    disabledIndices: EMPTY_ARRAY,
    onNavigate(nextActiveIndex, event) {
      if (!event && !open || transitionStatus === "ending") {
        return;
      }
      if (!event) {
        setIndices({
          activeIndex: nextActiveIndex
        });
      } else {
        setIndices({
          activeIndex: nextActiveIndex,
          type: keyboardActiveRef.current ? "keyboard" : "pointer"
        });
      }
    }
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([role, click, dismiss, listNavigation]);
  useOnFirstRender(() => {
    store.update({
      inline: inlineProp,
      popupProps: getFloatingProps(),
      inputProps: getReferenceProps(),
      triggerProps,
      getItemProps,
      setOpen,
      setInputValue,
      setSelectedValue,
      setIndices,
      onItemHighlighted,
      handleSelection,
      forceMount,
      requestSubmit
    });
  });
  useIsoLayoutEffect(() => {
    store.update({
      id,
      selectedValue,
      open,
      mounted,
      transitionStatus,
      items,
      inline: inlineProp,
      popupProps: getFloatingProps(),
      inputProps: getReferenceProps(),
      triggerProps,
      openMethod,
      getItemProps,
      selectionMode,
      name,
      disabled,
      readOnly,
      required,
      grid,
      isGrouped,
      virtualized,
      onOpenChangeComplete,
      openOnInputClick,
      itemToStringLabel,
      modal,
      autoHighlight: autoHighlightMode,
      isItemEqualToValue,
      submitOnItemClick,
      hasInputValue,
      requestSubmit
    });
  }, [store, id, selectedValue, open, mounted, transitionStatus, items, getFloatingProps, getReferenceProps, getItemProps, openMethod, triggerProps, selectionMode, name, disabled, readOnly, required, validation, grid, isGrouped, virtualized, onOpenChangeComplete, openOnInputClick, itemToStringLabel, modal, isItemEqualToValue, submitOnItemClick, hasInputValue, inlineProp, requestSubmit, autoHighlightMode]);
  const hiddenInputRef = useMergedRefs(inputRefProp, validation.inputRef);
  const itemsContextValue = React3.useMemo(() => ({
    query,
    hasItems,
    filteredItems,
    flatFilteredItems
  }), [query, hasItems, filteredItems, flatFilteredItems]);
  const serializedValue = React3.useMemo(() => {
    if (Array.isArray(fieldRawValue)) {
      return "";
    }
    return stringifyAsValue(fieldRawValue, itemToStringValue);
  }, [fieldRawValue, itemToStringValue]);
  const hasMultipleSelection = multiple && Array.isArray(selectedValue) && selectedValue.length > 0;
  const hiddenInputName = multiple || selectionMode === "none" ? void 0 : name;
  const hiddenInputs = React3.useMemo(() => {
    if (!multiple || !Array.isArray(selectedValue) || !name) {
      return null;
    }
    return selectedValue.map((value) => {
      const currentSerializedValue = stringifyAsValue(value, itemToStringValue);
      return /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [multiple, selectedValue, name, itemToStringValue]);
  const children = /* @__PURE__ */ jsxs(React3.Fragment, {
    children: [props.children, /* @__PURE__ */ jsx("input", __spreadProps(__spreadValues({}, validation.getInputValidationProps({
      // Move focus when the hidden input is focused.
      onFocus() {
        var _a;
        if (inputInsidePopup) {
          triggerElement == null ? void 0 : triggerElement.focus();
          return;
        }
        (_a = inputRef.current || triggerElement) == null ? void 0 : _a.focus();
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
          if (selectionMode === "none") {
            setDirty(nextValue !== validityData.initialValue);
            setInputValue(nextValue, details);
            if (shouldValidateOnChange()) {
              validation.commit(nextValue);
            }
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
            setSelectedValue == null ? void 0 : setSelectedValue(matchingValue, details);
            if (shouldValidateOnChange()) {
              validation.commit(matchingValue);
            }
          }
        }
        if (items) {
          handleChange();
        } else {
          forceMount();
          queueMicrotask(handleChange);
        }
      }
    })), {
      id: id && hiddenInputName == null ? `${id}-hidden-input` : void 0,
      name: hiddenInputName,
      autoComplete: formAutoComplete,
      disabled,
      required: required && !hasMultipleSelection,
      readOnly,
      value: serializedValue,
      ref: hiddenInputRef,
      style: hiddenInputName ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      "aria-hidden": true
    })), hiddenInputs]
  });
  return /* @__PURE__ */ jsx(ComboboxRootContext.Provider, {
    value: store,
    children: /* @__PURE__ */ jsx(ComboboxFloatingContext.Provider, {
      value: floatingRootContext,
      children: /* @__PURE__ */ jsx(ComboboxDerivedItemsContext.Provider, {
        value: itemsContextValue,
        children: /* @__PURE__ */ jsx(ComboboxInputValueContext.Provider, {
          value: inputValue,
          children
        })
      })
    })
  });
}

// ../../node_modules/@base-ui/react/esm/combobox/utils/stateAttributesMapping.js
var triggerStateAttributesMapping = __spreadProps(__spreadValues(__spreadValues({}, pressableTriggerOpenStateMapping), fieldValidityMapping), {
  popupSide: (side) => side ? {
    "data-popup-side": side
  } : null,
  listEmpty: (empty) => empty ? {
    "data-list-empty": ""
  } : null
});

// ../../node_modules/@base-ui/react/esm/combobox/trigger/ComboboxTrigger.js
var BOUNDARY_OFFSET = 2;
var ComboboxTrigger = /* @__PURE__ */ React3.forwardRef(function ComboboxTrigger2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    nativeButton = true,
    disabled: disabledProp = false,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "nativeButton",
    "disabled",
    "id"
  ]);
  const {
    state: fieldState,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const store = useComboboxRootContext();
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const required = useStore(store, selectors.required);
  const mounted = useStore(store, selectors.mounted);
  const popupSideValue = useStore(store, selectors.popupSide);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const triggerProps = useStore(store, selectors.triggerProps);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const rootId = useStore(store, selectors.id);
  const comboboxLabelId = useStore(store, selectors.labelId);
  const open = useStore(store, selectors.open);
  const selectedValue = useStore(store, selectors.selectedValue);
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const floatingRootContext = useComboboxFloatingContext();
  const inputValue = useComboboxInputValueContext();
  const focusTimeout = useTimeout();
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const listEmpty = filteredItems.length === 0;
  const popupSide = mounted && positionerElement ? popupSideValue : null;
  useLabelableId({
    id: inputInsidePopup ? idProp : void 0
  });
  const id = inputInsidePopup ? idProp != null ? idProp : rootId : idProp;
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, comboboxLabelId);
  const currentPointerTypeRef = React3.useRef("");
  function trackPointerType(event) {
    currentPointerTypeRef.current = event.pointerType;
  }
  const domReference = floatingRootContext.useState("domReferenceElement");
  React3.useEffect(() => {
    if (!inputInsidePopup) {
      return;
    }
    if (triggerElement && triggerElement !== domReference) {
      floatingRootContext.set("domReferenceElement", triggerElement);
    }
  }, [triggerElement, domReference, floatingRootContext, inputInsidePopup]);
  const {
    reference: triggerTypeaheadProps
  } = useTypeahead(floatingRootContext, {
    enabled: !open && !readOnly && !comboboxDisabled && selectionMode === "single",
    listRef: store.state.labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      const nextSelectedValue = store.state.valuesRef.current[index];
      if (nextSelectedValue !== void 0) {
        store.state.setSelectedValue(nextSelectedValue, createChangeEventDetails("none"));
      }
    }
  });
  const {
    reference: triggerClickProps
  } = useClick(floatingRootContext, {
    enabled: !readOnly && !comboboxDisabled,
    event: "mousedown"
  });
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled
  });
  const state = __spreadProps(__spreadValues({}, fieldState), {
    open,
    disabled,
    popupSide,
    listEmpty,
    placeholder: !hasSelectedValue
  });
  const setTriggerElement = useStableCallback((element2) => {
    store.set("triggerElement", element2);
  });
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef, setTriggerElement],
    state,
    props: [triggerProps, triggerClickProps, triggerTypeaheadProps, {
      id,
      tabIndex: inputInsidePopup ? 0 : -1,
      role: inputInsidePopup ? "combobox" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": inputInsidePopup ? "dialog" : "listbox",
      "aria-controls": open ? listElement == null ? void 0 : listElement.id : void 0,
      "aria-required": inputInsidePopup ? required || void 0 : void 0,
      "aria-labelledby": ariaLabelledBy,
      onPointerDown: trackPointerType,
      onPointerEnter: trackPointerType,
      onFocus() {
        setFocused(true);
        if (disabled || readOnly) {
          return;
        }
        focusTimeout.start(0, store.state.forceMount);
      },
      onBlur(event) {
        if (contains(positionerElement, event.relatedTarget)) {
          return;
        }
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
          validation.commit(valueToValidate);
        }
      },
      onMouseDown(event) {
        var _a2;
        if (disabled || readOnly) {
          return;
        }
        if (!inputInsidePopup) {
          floatingRootContext.set("domReferenceElement", event.currentTarget);
        }
        store.state.forceMount();
        if (currentPointerTypeRef.current !== "touch") {
          (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
          if (!inputInsidePopup) {
            event.preventDefault();
          }
        }
        if (open) {
          return;
        }
        const doc = ownerDocument(event.currentTarget);
        function handleMouseUp(mouseEvent) {
          if (!triggerElement) {
            return;
          }
          const mouseUpTarget = getTarget(mouseEvent);
          const positioner = store.state.positionerElement;
          const list = store.state.listElement;
          if (contains(triggerElement, mouseUpTarget) || contains(positioner, mouseUpTarget) || contains(list, mouseUpTarget) || mouseUpTarget === triggerElement) {
            return;
          }
          const bounds = getPseudoElementBounds(triggerElement);
          const withinHorizontal = mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET;
          const withinVertical = mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET;
          if (withinHorizontal && withinVertical) {
            return;
          }
          store.state.setOpen(false, createChangeEventDetails("cancel-open", mouseEvent));
        }
        if (inputInsidePopup) {
          doc.addEventListener("mouseup", handleMouseUp, {
            once: true
          });
        }
      },
      onKeyDown(event) {
        var _a2;
        if (disabled || readOnly) {
          return;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          stopEvent(event);
          store.state.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent));
          (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
        }
      }
    }, validation ? validation.getValidationProps(elementProps) : elementProps, getButtonProps],
    stateAttributesMapping: triggerStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxTrigger.displayName = "ComboboxTrigger";
var ComboboxChipsContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxChipsContext.displayName = "ComboboxChipsContext";
function useComboboxChipsContext() {
  return React3.useContext(ComboboxChipsContext);
}
var ComboboxPositionerContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxPositionerContext.displayName = "ComboboxPositionerContext";
function useComboboxPositionerContext(optional) {
  const context = React3.useContext(ComboboxPositionerContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Combobox.Popup> and <Combobox.Arrow> must be used within the <Combobox.Positioner> component" : formatErrorMessage_default(21));
  }
  return context;
}
var ComboboxInternalDismissButton = /* @__PURE__ */ React3.forwardRef(function ComboboxInternalDismissButton2(_, forwardedRef) {
  const store = useComboboxRootContext();
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: false
  });
  const mergedRef = useMergedRefs(forwardedRef, buttonRef);
  const handleDismiss = useStableCallback((event) => {
    store.state.setOpen(false, createChangeEventDetails(reason_parts_exports.closePress, event.nativeEvent, event.currentTarget));
  });
  const dismissProps = getButtonProps({
    onClick: handleDismiss
  });
  return /* @__PURE__ */ jsx("span", __spreadProps(__spreadValues({
    ref: mergedRef
  }, dismissProps), {
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: visuallyHiddenInput
  }));
});
if (process.env.NODE_ENV !== "production") ComboboxInternalDismissButton.displayName = "ComboboxInternalDismissButton";
var ComboboxInput = /* @__PURE__ */ React3.forwardRef(function ComboboxInput2(componentProps, forwardedRef) {
  var _b, _c;
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "id"
  ]);
  const {
    state: fieldState,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const comboboxChipsContext = useComboboxChipsContext();
  const positioning = useComboboxPositionerContext(true);
  const hasPositionerParent = Boolean(positioning);
  const store = useComboboxRootContext();
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const inputValue = useComboboxInputValueContext();
  const direction = useDirection();
  const required = useStore(store, selectors.required);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const name = useStore(store, selectors.name);
  const selectionMode = useStore(store, selectors.selectionMode);
  const autoHighlightMode = useStore(store, selectors.autoHighlight);
  const inputProps = useStore(store, selectors.inputProps);
  const triggerProps = useStore(store, selectors.triggerProps);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const selectedValue = useStore(store, selectors.selectedValue);
  const popupSideValue = useStore(store, selectors.popupSide);
  const positionerElement = useStore(store, selectors.positionerElement);
  const rootId = useStore(store, selectors.id);
  const inline = useStore(store, selectors.inline);
  const modal = useStore(store, selectors.modal);
  const autoHighlightEnabled = Boolean(autoHighlightMode);
  const popupSide = mounted && positionerElement ? popupSideValue : null;
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const listEmpty = filteredItems.length === 0;
  const isInsidePopup = hasPositionerParent || inline;
  const focusManagerModal = !isInsidePopup || modal;
  const id = useBaseUiId(idProp != null ? idProp : !isInsidePopup ? rootId : void 0);
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, void 0);
  const fieldStateForInput = hasPositionerParent ? DEFAULT_FIELD_STATE_ATTRIBUTES : fieldState;
  const [composingValue, setComposingValue] = React3.useState(null);
  const isComposingRef = React3.useRef(false);
  const lastActiveIndexRef = React3.useRef(null);
  const shouldRestoreActiveIndexRef = React3.useRef(false);
  const setInputElement = useStableCallback((element2) => {
    const nextIsInsidePopup = hasPositionerParent || store.state.inline;
    if (nextIsInsidePopup && !store.state.hasInputValue) {
      store.state.setInputValue("", createChangeEventDetails(reason_parts_exports.none));
    }
    store.update({
      inputElement: element2,
      inputInsidePopup: nextIsInsidePopup
    });
  });
  const validationProps = hasPositionerParent || !validation ? elementProps : validation.getValidationProps(elementProps);
  const state = __spreadProps(__spreadValues({}, fieldStateForInput), {
    open,
    disabled,
    readOnly,
    popupSide,
    listEmpty
  });
  function handleKeyDown(event) {
    var _a2;
    if (!comboboxChipsContext) {
      return void 0;
    }
    let nextIndex;
    const {
      highlightedChipIndex
    } = comboboxChipsContext;
    if (highlightedChipIndex !== void 0) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (highlightedChipIndex > 0) {
          nextIndex = highlightedChipIndex - 1;
        } else {
          nextIndex = void 0;
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (highlightedChipIndex < selectedValue.length - 1) {
          nextIndex = highlightedChipIndex + 1;
        } else {
          nextIndex = void 0;
        }
      } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        const computedNextIndex = highlightedChipIndex >= selectedValue.length - 1 ? selectedValue.length - 2 : highlightedChipIndex;
        nextIndex = computedNextIndex >= 0 ? computedNextIndex : void 0;
        store.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: "keyboard"
        });
      }
      return nextIndex;
    }
    if (event.key === "ArrowLeft" && ((_a2 = event.currentTarget.selectionStart) != null ? _a2 : 0) === 0 && selectedValue.length > 0) {
      event.preventDefault();
      const lastChipIndex = Math.max(selectedValue.length - 1, 0);
      nextIndex = lastChipIndex;
    } else if (event.key === "Backspace" && event.currentTarget.value === "" && selectedValue.length > 0) {
      store.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: "keyboard"
      });
      event.preventDefault();
    }
    return nextIndex;
  }
  const element = useRenderElement("input", componentProps, {
    state,
    ref: [forwardedRef, store.state.inputRef, setInputElement],
    props: [inputProps, triggerProps, __spreadProps(__spreadValues({
      type: "text",
      value: (_c = (_b = componentProps.value) != null ? _b : composingValue) != null ? _c : inputValue,
      "aria-readonly": readOnly || void 0,
      "aria-required": required || void 0,
      "aria-labelledby": ariaLabelledBy,
      disabled,
      readOnly,
      required: selectionMode === "none" ? required : void 0
    }, selectionMode === "none" && name && {
      name
    }), {
      id,
      onFocus() {
        setFocused(true);
        if (!inline || !shouldRestoreActiveIndexRef.current) {
          return;
        }
        shouldRestoreActiveIndexRef.current = false;
        const nextActiveIndex = lastActiveIndexRef.current;
        if (nextActiveIndex == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(store.state.valuesRef.current, nextActiveIndex)) {
          return;
        }
        store.state.setIndices({
          activeIndex: nextActiveIndex
        });
      },
      onBlur() {
        setTouched(true);
        setFocused(false);
        const activeIndex = store.state.activeIndex;
        if (inline && activeIndex !== null && autoHighlightMode !== "always") {
          lastActiveIndexRef.current = activeIndex;
          shouldRestoreActiveIndexRef.current = true;
          store.state.setIndices({
            activeIndex: null
          });
        }
        if (validationMode === "onBlur") {
          const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
          validation.commit(valueToValidate);
        }
      },
      onCompositionStart(event) {
        if (isAndroid) {
          return;
        }
        isComposingRef.current = true;
        setComposingValue(event.currentTarget.value);
      },
      onCompositionEnd(event) {
        isComposingRef.current = false;
        const next = event.currentTarget.value;
        setComposingValue(null);
        store.state.setInputValue(next, createChangeEventDetails(reason_parts_exports.inputChange, event.nativeEvent));
      },
      onChange(event) {
        const inputType = event.nativeEvent.inputType;
        const autofillLikeInput = !inputType || inputType === "insertReplacementText";
        const shouldOpenOnInput = isComposingRef.current || !autofillLikeInput;
        if (isComposingRef.current) {
          const nextVal = event.currentTarget.value;
          setComposingValue(nextVal);
          if (nextVal === "" && !store.state.openOnInputClick && !store.state.inputInsidePopup) {
            store.state.setOpen(false, createChangeEventDetails(reason_parts_exports.inputClear, event.nativeEvent));
          }
          const trimmed2 = nextVal.trim();
          const shouldMaintainHighlight = autoHighlightEnabled && trimmed2 !== "";
          if (!readOnly && !disabled && trimmed2) {
            if (shouldOpenOnInput) {
              store.state.setOpen(true, createChangeEventDetails(reason_parts_exports.inputChange, event.nativeEvent));
              if (!autoHighlightEnabled) {
                store.state.setIndices({
                  activeIndex: null,
                  selectedIndex: null,
                  type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
                });
              }
            }
          }
          if (open && store.state.activeIndex !== null && !shouldMaintainHighlight) {
            store.state.setIndices({
              activeIndex: null,
              selectedIndex: null,
              type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
            });
          }
          return;
        }
        store.state.setInputValue(event.currentTarget.value, createChangeEventDetails(reason_parts_exports.inputChange, event.nativeEvent));
        const empty = event.currentTarget.value === "";
        const clearDetails = createChangeEventDetails(reason_parts_exports.inputClear, event.nativeEvent);
        if (empty && !store.state.inputInsidePopup) {
          if (selectionMode === "single") {
            store.state.setSelectedValue(null, clearDetails);
          }
          if (!store.state.openOnInputClick) {
            store.state.setOpen(false, clearDetails);
          }
        }
        const trimmed = event.currentTarget.value.trim();
        if (!readOnly && !disabled && trimmed) {
          if (shouldOpenOnInput) {
            store.state.setOpen(true, createChangeEventDetails(reason_parts_exports.inputChange, event.nativeEvent));
            if (!autoHighlightEnabled) {
              store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
              });
            }
          }
        }
        if (open && store.state.activeIndex !== null && !autoHighlightEnabled) {
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          });
        }
      },
      onKeyDown(event) {
        var _a2, _b2;
        if (disabled || readOnly) {
          return;
        }
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
          return;
        }
        store.state.keyboardActiveRef.current = true;
        const input = event.currentTarget;
        const scrollAmount = input.scrollWidth - input.clientWidth;
        const isRTL = direction === "rtl";
        if (event.key === "Home") {
          stopEvent(event);
          const cursor = isFirefox && isRTL ? input.value.length : 0;
          input.setSelectionRange(cursor, cursor);
          input.scrollLeft = 0;
          return;
        }
        if (event.key === "End") {
          stopEvent(event);
          const cursor = isFirefox && isRTL ? 0 : input.value.length;
          input.setSelectionRange(cursor, cursor);
          input.scrollLeft = isRTL ? -scrollAmount : scrollAmount;
          return;
        }
        if (!mounted && event.key === "Escape") {
          const isClear = selectionMode === "multiple" && Array.isArray(selectedValue) ? selectedValue.length === 0 : selectedValue === null;
          const details = createChangeEventDetails(reason_parts_exports.escapeKey, event.nativeEvent);
          const value = selectionMode === "multiple" ? [] : null;
          store.state.setInputValue("", details);
          store.state.setSelectedValue(value, details);
          if (!isClear && !store.state.inline && !details.isPropagationAllowed) {
            event.stopPropagation();
          }
          return;
        }
        if (comboboxChipsContext && event.key === "Backspace" && input.value === "" && comboboxChipsContext.highlightedChipIndex === void 0 && Array.isArray(selectedValue) && selectedValue.length > 0) {
          const newValue = selectedValue.slice(0, -1);
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          });
          store.state.setSelectedValue(newValue, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent));
          return;
        }
        const hadHighlightedChip = (comboboxChipsContext == null ? void 0 : comboboxChipsContext.highlightedChipIndex) !== void 0;
        const nextIndex = handleKeyDown(event);
        comboboxChipsContext == null ? void 0 : comboboxChipsContext.setHighlightedChipIndex(nextIndex);
        if (nextIndex !== void 0) {
          (_a2 = comboboxChipsContext == null ? void 0 : comboboxChipsContext.chipsRef.current[nextIndex]) == null ? void 0 : _a2.focus();
        } else if (hadHighlightedChip) {
          (_b2 = store.state.inputRef.current) == null ? void 0 : _b2.focus();
        }
        if (event.which === 229) {
          return;
        }
        if (event.key === "Enter" && open) {
          const activeIndex = store.state.activeIndex;
          const nativeEvent = event.nativeEvent;
          if (activeIndex === null) {
            if (inline) {
              return;
            }
            store.state.setOpen(false, createChangeEventDetails(reason_parts_exports.none, nativeEvent));
            return;
          }
          stopEvent(event);
          const listItem = store.state.listRef.current[activeIndex];
          if (listItem) {
            store.state.selectionEventRef.current = nativeEvent;
            listItem.click();
            store.state.selectionEventRef.current = null;
          }
        }
      },
      onPointerMove() {
        store.state.keyboardActiveRef.current = false;
      },
      onPointerDown() {
        store.state.keyboardActiveRef.current = false;
      }
    }), validationProps],
    stateAttributesMapping: triggerStateAttributesMapping
  });
  return /* @__PURE__ */ jsxs(React3.Fragment, {
    children: [open && focusManagerModal && /* @__PURE__ */ jsx(ComboboxInternalDismissButton, {
      ref: store.state.startDismissRef
    }), element]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxInput.displayName = "ComboboxInput";
var ComboboxInputGroup = /* @__PURE__ */ React3.forwardRef(function ComboboxInputGroup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const store = useComboboxRootContext();
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const popupSideValue = useStore(store, selectors.popupSide);
  const positionerElement = useStore(store, selectors.positionerElement);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const selectionMode = useStore(store, selectors.selectionMode);
  const popupSide = mounted && positionerElement ? popupSideValue : null;
  const disabled = fieldDisabled || comboboxDisabled;
  const listEmpty = filteredItems.length === 0;
  const placeholder = selectionMode === "none" ? false : !hasSelectedValue;
  const state = __spreadProps(__spreadValues({}, fieldState), {
    open,
    disabled,
    readOnly,
    popupSide,
    listEmpty,
    placeholder
  });
  const setInputGroupElement = useStableCallback((element) => {
    store.set("inputGroupElement", element);
  });
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, setInputGroupElement],
    props: [{
      role: "group"
    }, elementProps],
    state,
    stateAttributesMapping: triggerStateAttributesMapping
  });
});
if (process.env.NODE_ENV !== "production") ComboboxInputGroup.displayName = "ComboboxInputGroup";
var ComboboxIcon = /* @__PURE__ */ React3.forwardRef(function ComboboxIcon2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const element = useRenderElement("span", componentProps, {
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "\u25BC"
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxIcon.displayName = "ComboboxIcon";
var stateAttributesMapping = __spreadValues(__spreadValues({}, transitionStatusMapping), triggerOpenStateMapping);
var ComboboxClear = /* @__PURE__ */ React3.forwardRef(function ComboboxClear2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton",
    "keepMounted"
  ]);
  const {
    disabled: fieldDisabled
  } = useFieldRootContext();
  const store = useComboboxRootContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const open = useStore(store, selectors.open);
  const selectedValue = useStore(store, selectors.selectedValue);
  const hasSelectionChips = useStore(store, selectors.hasSelectionChips);
  const inputValue = useComboboxInputValueContext();
  let visible = false;
  if (selectionMode === "none") {
    visible = inputValue !== "";
  } else if (selectionMode === "single") {
    visible = selectedValue != null;
  } else {
    visible = hasSelectionChips;
  }
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled
  });
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(visible);
  const state = {
    disabled,
    open,
    transitionStatus
  };
  useOpenChangeComplete({
    open: visible,
    ref: store.state.clearRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef, store.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(event) {
        event.preventDefault();
      },
      onClick(event) {
        var _a2;
        if (disabled || readOnly) {
          return;
        }
        const keyboardActiveRef = store.state.keyboardActiveRef;
        store.state.setInputValue("", createChangeEventDetails(reason_parts_exports.clearPress, event.nativeEvent));
        if (selectionMode !== "none") {
          store.state.setSelectedValue(Array.isArray(selectedValue) ? [] : null, createChangeEventDetails(reason_parts_exports.clearPress, event.nativeEvent));
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: keyboardActiveRef.current ? "keyboard" : "pointer"
          });
        } else {
          store.state.setIndices({
            activeIndex: null,
            type: keyboardActiveRef.current ? "keyboard" : "pointer"
          });
        }
        (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
      }
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  const shouldRender = keepMounted || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxClear.displayName = "ComboboxClear";
var GroupCollectionContext = /* @__PURE__ */ React3.createContext(null);
if (process.env.NODE_ENV !== "production") GroupCollectionContext.displayName = "GroupCollectionContext";
function useGroupCollectionContext() {
  return React3.useContext(GroupCollectionContext);
}
function GroupCollectionProvider(props) {
  const {
    children,
    items
  } = props;
  const contextValue = React3.useMemo(() => ({
    items
  }), [items]);
  return /* @__PURE__ */ jsx(GroupCollectionContext.Provider, {
    value: contextValue,
    children
  });
}
function ComboboxCollection(props) {
  const {
    children
  } = props;
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const groupContext = useGroupCollectionContext();
  const itemsToRender = groupContext ? groupContext.items : filteredItems;
  if (!itemsToRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(React3.Fragment, {
    children: itemsToRender.map(children)
  });
}
var ComboboxList = /* @__PURE__ */ React3.forwardRef(function ComboboxList2(componentProps, forwardedRef) {
  var _ComboboxCollection;
  const _a = componentProps, {
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "children"
  ]);
  const store = useComboboxRootContext();
  const floatingRootContext = useComboboxFloatingContext();
  const hasPositionerContext = Boolean(useComboboxPositionerContext(true));
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const items = useStore(store, selectors.items);
  const labelsRef = useStore(store, selectors.labelsRef);
  const listRef = useStore(store, selectors.listRef);
  const selectionMode = useStore(store, selectors.selectionMode);
  const grid = useStore(store, selectors.grid);
  const popupProps = useStore(store, selectors.popupProps);
  const disabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const virtualized = useStore(store, selectors.virtualized);
  const multiple = selectionMode === "multiple";
  const empty = filteredItems.length === 0;
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const setListElement = useStableCallback((element2) => {
    store.set("listElement", element2);
  });
  const resolvedChildren = React3.useMemo(() => {
    if (typeof children === "function") {
      return _ComboboxCollection || (_ComboboxCollection = /* @__PURE__ */ jsx(ComboboxCollection, {
        children
      }));
    }
    return children;
  }, [children]);
  const state = {
    empty
  };
  const floatingId = floatingRootContext.useState("floatingId");
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, setListElement, hasPositionerContext ? null : setPositionerElement],
    props: [popupProps, {
      children: resolvedChildren,
      tabIndex: -1,
      id: floatingId,
      role: grid ? "grid" : "listbox",
      "aria-multiselectable": multiple ? "true" : void 0,
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.key === "Enter") {
          const activeIndex = store.state.activeIndex;
          if (activeIndex == null) {
            return;
          }
          stopEvent(event);
          const nativeEvent = event.nativeEvent;
          const listItem = store.state.listRef.current[activeIndex];
          if (listItem) {
            store.state.selectionEventRef.current = nativeEvent;
            listItem.click();
            store.state.selectionEventRef.current = null;
          }
        }
      },
      onKeyDownCapture() {
        store.state.keyboardActiveRef.current = true;
      },
      onPointerMoveCapture() {
        store.state.keyboardActiveRef.current = false;
      }
    }, elementProps]
  });
  if (virtualized) {
    return element;
  }
  return /* @__PURE__ */ jsx(CompositeList, {
    elementsRef: listRef,
    labelsRef: items ? void 0 : labelsRef,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ComboboxList.displayName = "ComboboxList";
var ComboboxStatus = /* @__PURE__ */ React3.forwardRef(function ComboboxStatus2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxStatus.displayName = "ComboboxStatus";
var ComboboxPortalContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxPortalContext.displayName = "ComboboxPortalContext";
function useComboboxPortalContext() {
  const context = React3.useContext(ComboboxPortalContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Combobox.Portal> is missing." : formatErrorMessage_default(20));
  }
  return context;
}
var ComboboxPortal = /* @__PURE__ */ React3.forwardRef(function ComboboxPortal2(props, forwardedRef) {
  const _a = props, {
    keepMounted = false
  } = _a, portalProps = __objRest(_a, [
    "keepMounted"
  ]);
  const store = useComboboxRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMounted = useStore(store, selectors.forceMounted);
  const shouldRender = mounted || keepMounted || forceMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(ComboboxPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsx(FloatingPortal, __spreadValues({
      ref: forwardedRef
    }, portalProps))
  });
});
if (process.env.NODE_ENV !== "production") ComboboxPortal.displayName = "ComboboxPortal";
var stateAttributesMapping2 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var ComboboxBackdrop = /* @__PURE__ */ React3.forwardRef(function ComboboxBackdrop2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const store = useComboboxRootContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    stateAttributesMapping: stateAttributesMapping2,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxBackdrop.displayName = "ComboboxBackdrop";
var ComboboxPositioner = /* @__PURE__ */ React3.forwardRef(function ComboboxPositioner2(componentProps, forwardedRef) {
  var _b;
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
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE
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
  const store = useComboboxRootContext();
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const floatingRootContext = useComboboxFloatingContext();
  const keepMounted = useComboboxPortalContext();
  const modal = useStore(store, selectors.modal);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const openMethod = useStore(store, selectors.openMethod);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const inputGroupElement = useStore(store, selectors.inputGroupElement);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const empty = filteredItems.length === 0;
  const resolvedAnchor = anchor != null ? anchor : inputInsidePopup ? triggerElement : inputGroupElement != null ? inputGroupElement : inputElement;
  const positioning = useAnchorPositioning({
    anchor: resolvedAnchor,
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
    collisionAvoidance,
    lazyFlip: true
  });
  useScrollLock(open && modal && openMethod !== "touch", triggerElement);
  const defaultProps = React3.useMemo(() => {
    const style = __spreadValues({}, positioning.positionerStyles);
    if (!open) {
      style.pointerEvents = "none";
    }
    return {
      role: "presentation",
      hidden: !mounted,
      style
    };
  }, [open, mounted, positioning.positionerStyles]);
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    empty
  };
  useIsoLayoutEffect(() => {
    store.set("popupSide", positioning.side);
  }, [store, positioning.side]);
  const contextValue = React3.useMemo(() => ({
    side: positioning.side,
    align: positioning.align,
    arrowRef: positioning.arrowRef,
    arrowUncentered: positioning.arrowUncentered,
    arrowStyles: positioning.arrowStyles,
    anchorHidden: positioning.anchorHidden,
    isPositioned: positioning.isPositioned
  }), [positioning.side, positioning.align, positioning.arrowRef, positioning.arrowUncentered, positioning.arrowStyles, positioning.anchorHidden, positioning.isPositioned]);
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, setPositionerElement],
    props: [defaultProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping: popupStateMapping
  });
  return /* @__PURE__ */ jsxs(ComboboxPositionerContext.Provider, {
    value: contextValue,
    children: [mounted && modal && /* @__PURE__ */ jsx(InternalBackdrop, {
      inert: inertValue(!open),
      cutout: (_b = inputGroupElement != null ? inputGroupElement : inputElement) != null ? _b : triggerElement
    }), element]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxPositioner.displayName = "ComboboxPositioner";
var stateAttributesMapping3 = __spreadValues(__spreadValues({}, popupStateMapping), transitionStatusMapping);
var ComboboxPopup = /* @__PURE__ */ React3.forwardRef(function ComboboxPopup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    initialFocus,
    finalFocus
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "initialFocus",
    "finalFocus"
  ]);
  const store = useComboboxRootContext();
  const positioning = useComboboxPositionerContext();
  const floatingRootContext = useComboboxFloatingContext();
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const mounted = useStore(store, selectors.mounted);
  const open = useStore(store, selectors.open);
  const openMethod = useStore(store, selectors.openMethod);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const inputElement = useStore(store, selectors.inputElement);
  const modal = useStore(store, selectors.modal);
  const empty = filteredItems.length === 0;
  useOpenChangeComplete({
    open,
    ref: store.state.popupRef,
    onComplete() {
      if (open) {
        store.state.onOpenChangeComplete(true);
      }
    }
  });
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    transitionStatus,
    empty
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.state.popupRef],
    props: [{
      role: inputInsidePopup ? "dialog" : "presentation",
      tabIndex: -1,
      onFocus(event) {
        var _a2;
        const target = getTarget(event.nativeEvent);
        if (openMethod !== "touch" && (contains(store.state.listElement, target) || target === event.currentTarget)) {
          (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping: stateAttributesMapping3
  });
  const computedDefaultInitialFocus = inputInsidePopup ? (interactionType) => interactionType === "touch" ? store.state.popupRef.current : inputElement : false;
  const resolvedInitialFocus = initialFocus === void 0 ? computedDefaultInitialFocus : initialFocus;
  let resolvedFinalFocus;
  if (finalFocus != null) {
    resolvedFinalFocus = finalFocus;
  } else {
    resolvedFinalFocus = inputInsidePopup ? void 0 : false;
  }
  const focusManagerModal = !inputInsidePopup || modal;
  return /* @__PURE__ */ jsx(FloatingFocusManager, {
    context: floatingRootContext,
    disabled: !mounted,
    modal: focusManagerModal,
    openInteractionType: openMethod,
    initialFocus: resolvedInitialFocus,
    returnFocus: resolvedFinalFocus,
    getInsideElements: () => [store.state.startDismissRef.current, store.state.endDismissRef.current],
    children: /* @__PURE__ */ jsxs(React3.Fragment, {
      children: [element, focusManagerModal && /* @__PURE__ */ jsx(ComboboxInternalDismissButton, {
        ref: store.state.endDismissRef
      })]
    })
  });
});
if (process.env.NODE_ENV !== "production") ComboboxPopup.displayName = "ComboboxPopup";
var ComboboxArrow = /* @__PURE__ */ React3.forwardRef(function ComboboxArrow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const store = useComboboxRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useComboboxPositionerContext();
  const open = useStore(store, selectors.open);
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
if (process.env.NODE_ENV !== "production") ComboboxArrow.displayName = "ComboboxArrow";
var ComboboxGroupContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxGroupContext.displayName = "ComboboxGroupContext";
function useComboboxGroupContext() {
  const context = React3.useContext(ComboboxGroupContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxGroupContext is missing. ComboboxGroup parts must be placed within <Combobox.Group>." : formatErrorMessage_default(18));
  }
  return context;
}
var ComboboxGroup = /* @__PURE__ */ React3.forwardRef(function ComboboxGroup2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    items
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "items"
  ]);
  const [labelId, setLabelId] = React3.useState();
  const contextValue = React3.useMemo(() => ({
    labelId,
    setLabelId,
    items
  }), [labelId, setLabelId, items]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "group",
      "aria-labelledby": labelId
    }, elementProps]
  });
  const wrappedElement = /* @__PURE__ */ jsx(ComboboxGroupContext.Provider, {
    value: contextValue,
    children: element
  });
  if (items) {
    return /* @__PURE__ */ jsx(GroupCollectionProvider, {
      items,
      children: wrappedElement
    });
  }
  return wrappedElement;
});
if (process.env.NODE_ENV !== "production") ComboboxGroup.displayName = "ComboboxGroup";
var ComboboxGroupLabel = /* @__PURE__ */ React3.forwardRef(function ComboboxGroupLabel2(componentProps, forwardedRef) {
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
    setLabelId
  } = useComboboxGroupContext();
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(void 0);
    };
  }, [id, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxGroupLabel.displayName = "ComboboxGroupLabel";
var ComboboxItemContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxItemContext.displayName = "ComboboxItemContext";
function useComboboxItemContext() {
  const context = React3.useContext(ComboboxItemContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxItemContext is missing. ComboboxItem parts must be placed within <Combobox.Item>." : formatErrorMessage_default(19));
  }
  return context;
}
var ComboboxRowContext = /* @__PURE__ */ React3.createContext(false);
if (process.env.NODE_ENV !== "production") ComboboxRowContext.displayName = "ComboboxRowContext";
function useComboboxRowContext() {
  return React3.useContext(ComboboxRowContext);
}
var ComboboxItem = /* @__PURE__ */ React3.memo(/* @__PURE__ */ React3.forwardRef(function ComboboxItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    value: itemValue = null,
    index: indexProp,
    disabled = false,
    nativeButton = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "value",
    "index",
    "disabled",
    "nativeButton"
  ]);
  const didPointerDownRef = React3.useRef(false);
  const textRef = React3.useRef(null);
  const listItem = useCompositeListItem({
    index: indexProp,
    textRef,
    indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
  });
  const store = useComboboxRootContext();
  const isRow = useComboboxRowContext();
  const {
    flatFilteredItems,
    hasItems
  } = useComboboxDerivedItemsContext();
  const open = useStore(store, selectors.open);
  const selectionMode = useStore(store, selectors.selectionMode);
  const readOnly = useStore(store, selectors.readOnly);
  const virtualized = useStore(store, selectors.virtualized);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const selectable = selectionMode !== "none";
  const index = indexProp != null ? indexProp : virtualized ? findItemIndex(flatFilteredItems, itemValue, isItemEqualToValue) : listItem.index;
  const hasRegistered = listItem.index !== -1;
  const rootId = useStore(store, selectors.id);
  const highlighted = useStore(store, selectors.isActive, index);
  const matchesSelectedValue = useStore(store, selectors.isSelected, itemValue);
  const getItemProps = useStore(store, selectors.getItemProps);
  const itemRef = React3.useRef(null);
  const id = rootId != null && hasRegistered ? `${rootId}-${index}` : void 0;
  const selected = matchesSelectedValue && selectable;
  useIsoLayoutEffect(() => {
    const shouldRun = hasRegistered && (virtualized || indexProp != null);
    if (!shouldRun) {
      return void 0;
    }
    const list = store.state.listRef.current;
    list[index] = itemRef.current;
    return () => {
      delete list[index];
    };
  }, [hasRegistered, virtualized, index, indexProp, store]);
  useIsoLayoutEffect(() => {
    if (!hasRegistered || hasItems) {
      return void 0;
    }
    const visibleMap = store.state.valuesRef.current;
    visibleMap[index] = itemValue;
    if (selectionMode !== "none") {
      store.state.allValuesRef.current.push(itemValue);
    }
    return () => {
      delete visibleMap[index];
    };
  }, [hasRegistered, hasItems, index, itemValue, store, selectionMode]);
  useIsoLayoutEffect(() => {
    if (!open) {
      didPointerDownRef.current = false;
      return;
    }
    if (!hasRegistered || hasItems) {
      return;
    }
    const selectedValue = store.state.selectedValue;
    const lastSelectedValue = Array.isArray(selectedValue) ? selectedValue[selectedValue.length - 1] : selectedValue;
    if (compareItemEquality(itemValue, lastSelectedValue, isItemEqualToValue)) {
      store.set("selectedIndex", index);
    }
  }, [hasRegistered, hasItems, open, store, index, itemValue, isItemEqualToValue]);
  const state = {
    disabled,
    selected,
    highlighted
  };
  const rootProps = getItemProps({
    active: highlighted,
    selected
  });
  rootProps.id = void 0;
  rootProps.onFocus = void 0;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  function commitSelection(nativeEvent) {
    function selectItem() {
      store.state.handleSelection(nativeEvent, itemValue);
    }
    if (store.state.submitOnItemClick) {
      ReactDOM.flushSync(selectItem);
      store.state.requestSubmit();
    } else {
      selectItem();
    }
  }
  const defaultProps = {
    id,
    role: isRow ? "gridcell" : "option",
    "aria-selected": selectable ? selected : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(event) {
      didPointerDownRef.current = true;
      event.preventDefault();
    },
    onClick(event) {
      if (disabled || readOnly) {
        return;
      }
      commitSelection(event.nativeEvent);
    },
    onMouseUp(event) {
      const pointerStartedOnItem = didPointerDownRef.current;
      didPointerDownRef.current = false;
      if (disabled || readOnly || event.button !== 0 || pointerStartedOnItem || !highlighted) {
        return;
      }
      commitSelection(event.nativeEvent);
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [rootProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = React3.useMemo(() => ({
    selected,
    textRef
  }), [selected, textRef]);
  return /* @__PURE__ */ jsx(ComboboxItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") ComboboxItem.displayName = "ComboboxItem";
var ComboboxRow = /* @__PURE__ */ React3.forwardRef(function ComboboxRow2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "row"
    }, elementProps]
  });
  return /* @__PURE__ */ jsx(ComboboxRowContext.Provider, {
    value: true,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ComboboxRow.displayName = "ComboboxRow";
var ComboboxEmpty = /* @__PURE__ */ React3.forwardRef(function ComboboxEmpty2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    children: childrenProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "children"
  ]);
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const store = useComboboxRootContext();
  const children = filteredItems.length === 0 ? childrenProp : null;
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, store.state.emptyRef],
    props: [{
      children,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxEmpty.displayName = "ComboboxEmpty";

// ../../node_modules/@base-ui/react/esm/combobox/root/utils/useFilteredItems.js
function useFilteredItems() {
  const items = useComboboxDerivedItemsContext();
  return items.filteredItems;
}

// ../../node_modules/@base-ui/react/esm/combobox/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Arrow: () => ComboboxArrow,
  Backdrop: () => ComboboxBackdrop,
  Chip: () => ComboboxChip,
  ChipRemove: () => ComboboxChipRemove,
  Chips: () => ComboboxChips,
  Clear: () => ComboboxClear,
  Collection: () => ComboboxCollection,
  Empty: () => ComboboxEmpty,
  Group: () => ComboboxGroup,
  GroupLabel: () => ComboboxGroupLabel,
  Icon: () => ComboboxIcon,
  Input: () => ComboboxInput,
  InputGroup: () => ComboboxInputGroup,
  Item: () => ComboboxItem,
  ItemIndicator: () => ComboboxItemIndicator,
  Label: () => ComboboxLabel,
  List: () => ComboboxList,
  Popup: () => ComboboxPopup,
  Portal: () => ComboboxPortal,
  Positioner: () => ComboboxPositioner,
  Root: () => ComboboxRoot,
  Row: () => ComboboxRow,
  Separator: () => Separator,
  Status: () => ComboboxStatus,
  Trigger: () => ComboboxTrigger,
  Value: () => ComboboxValue,
  useFilter: () => useComboboxFilter,
  useFilteredItems: () => useFilteredItems
});
function ComboboxRoot(props) {
  const _a = props, {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    autoComplete
  } = _a, other = __objRest(_a, [
    "multiple",
    "defaultValue",
    "value",
    "onValueChange",
    "autoComplete"
  ]);
  return /* @__PURE__ */ jsx(AriaCombobox, __spreadProps(__spreadValues({}, other), {
    selectionMode: multiple ? "multiple" : "single",
    selectedValue: value,
    defaultSelectedValue: defaultValue,
    onSelectedValueChange: onValueChange,
    formAutoComplete: autoComplete
  }));
}
var ComboboxLabel = /* @__PURE__ */ React3.forwardRef(function ComboboxLabel2(componentProps, forwardedRef) {
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
  const store = useComboboxRootContext();
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const rootId = useStore(store, selectors.id);
  const defaultLabelId = getDefaultLabelId(rootId);
  const localControlId = (_b = triggerElement == null ? void 0 : triggerElement.id) != null ? _b : inputInsidePopup ? rootId : void 0;
  if (process.env.NODE_ENV !== "production") {
    React3.useEffect(() => {
      var _a2, _b2;
      if (!inputElement || inputInsidePopup) {
        return;
      }
      const ownerStackMessage = ((_b2 = (_a2 = SafeReact).captureOwnerStack) == null ? void 0 : _b2.call(_a2)) || "";
      const message = "<Combobox.Label> labels <Combobox.Trigger> only. When <Combobox.Input> is the form control, use a native <label> or <Field.Label> instead.";
      error(`${message}${ownerStackMessage}`);
    }, [inputElement, inputInsidePopup]);
  }
  const labelProps = useLabel({
    id: defaultLabelId,
    fallbackControlId: localControlId,
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
if (process.env.NODE_ENV !== "production") ComboboxLabel.displayName = "ComboboxLabel";
function ComboboxValue(props) {
  const {
    children: childrenProp,
    placeholder
  } = props;
  const store = useComboboxRootContext();
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel);
  const selectedValue = useStore(store, selectors.selectedValue);
  const items = useStore(store, selectors.items);
  const multiple = useStore(store, selectors.selectionMode) === "multiple";
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
  const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  let children = null;
  if (typeof childrenProp === "function") {
    children = childrenProp(selectedValue);
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (!hasSelectedValue && placeholder != null && !hasNullLabel) {
    children = placeholder;
  } else if (multiple && Array.isArray(selectedValue)) {
    children = resolveMultipleLabels(selectedValue, items, itemToStringLabel);
  } else {
    children = resolveSelectedLabel(selectedValue, items, itemToStringLabel);
  }
  return /* @__PURE__ */ jsx(React3.Fragment, {
    children
  });
}
var ComboboxItemIndicator = /* @__PURE__ */ React3.forwardRef(function ComboboxItemIndicator2(componentProps, forwardedRef) {
  var _a;
  const keepMounted = (_a = componentProps.keepMounted) != null ? _a : false;
  const {
    selected
  } = useComboboxItemContext();
  const shouldRender = keepMounted || selected;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsx(Inner, __spreadProps(__spreadValues({}, componentProps), {
    ref: forwardedRef
  }));
});
if (process.env.NODE_ENV !== "production") ComboboxItemIndicator.displayName = "ComboboxItemIndicator";
var Inner = /* @__PURE__ */ React3.memo(/* @__PURE__ */ React3.forwardRef((componentProps, forwardedRef) => {
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
  } = useComboboxItemContext();
  const indicatorRef = React3.useRef(null);
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
var ComboboxChips = /* @__PURE__ */ React3.forwardRef(function ComboboxChips2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const store = useComboboxRootContext();
  const open = useStore(store, selectors.open);
  const hasSelectionChips = useStore(store, selectors.hasSelectionChips);
  const [highlightedChipIndex, setHighlightedChipIndex] = React3.useState(void 0);
  if (open && highlightedChipIndex !== void 0) {
    setHighlightedChipIndex(void 0);
  }
  const chipsRef = React3.useRef([]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, store.state.chipsContainerRef],
    // NVDA enters browse mode instead of staying in focus mode when navigating with
    // arrow keys inside a container unless it has a toolbar role.
    props: [hasSelectionChips ? {
      role: "toolbar"
    } : EMPTY_OBJECT, elementProps]
  });
  const contextValue = React3.useMemo(() => ({
    highlightedChipIndex,
    setHighlightedChipIndex,
    chipsRef
  }), [highlightedChipIndex, setHighlightedChipIndex, chipsRef]);
  return /* @__PURE__ */ jsx(ComboboxChipsContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(CompositeList, {
      elementsRef: chipsRef,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") ComboboxChips.displayName = "ComboboxChips";
var ComboboxChipContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") ComboboxChipContext.displayName = "ComboboxChipContext";
function useComboboxChipContext() {
  const context = React3.useContext(ComboboxChipContext);
  if (!context) {
    throw new Error(process.env.NODE_ENV !== "production" ? "useComboboxChipContext must be used within a ComboboxChip" : formatErrorMessage_default(17));
  }
  return context;
}
var ComboboxChip = /* @__PURE__ */ React3.forwardRef(function ComboboxChip2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const store = useComboboxRootContext();
  const {
    setHighlightedChipIndex,
    chipsRef
  } = useComboboxChipsContext();
  const disabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const selectedValue = useStore(store, selectors.selectedValue);
  const {
    ref,
    index
  } = useCompositeListItem();
  function handleKeyDown(event) {
    let nextIndex = index;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = void 0;
      }
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (index < selectedValue.length - 1) {
        nextIndex = index + 1;
      } else {
        nextIndex = void 0;
      }
    } else if (event.key === "Backspace" || event.key === "Delete") {
      const computedNextIndex = index >= selectedValue.length - 1 ? selectedValue.length - 2 : index;
      nextIndex = computedNextIndex >= 0 ? computedNextIndex : void 0;
      stopEvent(event);
      store.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: "keyboard"
      });
      store.state.setSelectedValue(selectedValue.filter((_, i) => i !== index), createChangeEventDetails(reason_parts_exports.none, event.nativeEvent));
    } else if (event.key === "Enter" || event.key === " ") {
      stopEvent(event);
      nextIndex = void 0;
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      stopEvent(event);
      store.state.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent));
      nextIndex = void 0;
    } else if (
      // Check for printable characters (letters, numbers, symbols)
      event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
    ) {
      nextIndex = void 0;
    }
    return nextIndex;
  }
  const state = {
    disabled
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, ref],
    state,
    props: [{
      tabIndex: -1,
      "aria-disabled": disabled || void 0,
      "aria-readonly": readOnly || void 0,
      onKeyDown(event) {
        var _a2, _b;
        if (disabled || readOnly) {
          return;
        }
        const nextIndex = handleKeyDown(event);
        ReactDOM.flushSync(() => {
          setHighlightedChipIndex(nextIndex);
        });
        if (nextIndex === void 0) {
          (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
        } else {
          (_b = chipsRef.current[nextIndex]) == null ? void 0 : _b.focus();
        }
      },
      onMouseDown(event) {
        var _a2;
        if (readOnly) {
          return;
        }
        event.preventDefault();
        if (disabled) {
          return;
        }
        (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
      }
    }, elementProps]
  });
  const contextValue = React3.useMemo(() => ({
    index
  }), [index]);
  return /* @__PURE__ */ jsx(ComboboxChipContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ComboboxChip.displayName = "ComboboxChip";
var ComboboxChipRemove = /* @__PURE__ */ React3.forwardRef(function ComboboxChipRemove2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "nativeButton"
  ]);
  const store = useComboboxRootContext();
  const {
    index
  } = useComboboxChipContext();
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const selectedValue = useStore(store, selectors.selectedValue);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const disabled = comboboxDisabled || disabledProp;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled: disabled || readOnly,
    focusableWhenDisabled: true
  });
  const state = {
    disabled
  };
  function clearActiveIndexForRemovedItem(removedItem) {
    const activeIndex = store.state.activeIndex;
    if (activeIndex == null) {
      return;
    }
    const removedIndex = findItemIndex(store.state.valuesRef.current, removedItem, isItemEqualToValue);
    if (removedIndex !== -1 && activeIndex === removedIndex) {
      store.state.setIndices({
        activeIndex: null,
        type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
      });
    }
  }
  function removeChip(event) {
    var _a2;
    const eventDetails = createChangeEventDetails(reason_parts_exports.chipRemovePress, event.nativeEvent);
    const removedItem = selectedValue[index];
    clearActiveIndexForRemovedItem(removedItem);
    store.state.setSelectedValue(selectedValue.filter((_, i) => i !== index), eventDetails);
    (_a2 = store.state.inputRef.current) == null ? void 0 : _a2.focus();
    return eventDetails;
  }
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    state,
    props: [{
      tabIndex: -1,
      onClick(event) {
        if (disabled || readOnly) {
          return;
        }
        const eventDetails = removeChip(event);
        if (!eventDetails.isPropagationAllowed) {
          event.stopPropagation();
        }
      },
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          const eventDetails = removeChip(event);
          if (!eventDetails.isPropagationAllowed) {
            stopEvent(event);
          }
        }
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxChipRemove.displayName = "ComboboxChipRemove";
var Combobox = index_parts_exports.Root;
function ComboboxValue2(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Value, __spreadValues({ "data-slot": "combobox-value" }, props));
}
function ComboboxTrigger3(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.Trigger,
    __spreadProps(__spreadValues({
      "data-slot": "combobox-trigger",
      className: cn("[&_svg:not([class*='size-'])]:size-4", className)
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none size-4 text-muted-foreground" })
      ]
    })
  );
}
function ComboboxClear3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Clear,
    __spreadProps(__spreadValues({
      "data-slot": "combobox-clear",
      className: cn("inline-flex shrink-0 items-center justify-center text-muted-foreground hover:text-foreground [&_svg]:size-3.5", className)
    }, props), {
      children: /* @__PURE__ */ jsx(Close, { className: "pointer-events-none" })
    })
  );
}
function ComboboxInput3(_a) {
  var _b = _a, {
    className,
    children,
    disabled = false,
    showTrigger = true,
    showClear = false,
    inputSize = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "disabled",
    "showTrigger",
    "showClear",
    "inputSize"
  ]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "combobox-input-wrapper",
      className: cn(
        "flex w-full items-center rounded-sm border border-input bg-background shadow-xs transition-colors hover:border-primary has-[:focus-visible]:border-ring has-[:disabled]:bg-muted has-[:disabled]:border-disabled has-[:disabled]:shadow-none has-[:disabled]:pointer-events-none has-[[aria-invalid=true]]:border-destructive",
        inputSize === "default" && "h-8 gap-2 px-3",
        inputSize === "sm" && "h-6 gap-1 px-2",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          index_parts_exports.Input,
          __spreadValues({
            disabled,
            className: "min-w-0 flex-1 bg-transparent text-[13px] leading-[20px] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          }, props)
        ),
        showClear && /* @__PURE__ */ jsx(ComboboxClear3, { disabled }),
        showTrigger && /* @__PURE__ */ jsx(
          ComboboxTrigger3,
          {
            className: "inline-flex shrink-0 items-center justify-center text-muted-foreground group-has-data-[slot=combobox-clear]:hidden",
            disabled
          }
        ),
        children
      ]
    }
  );
}
function ComboboxContent(_a) {
  var _b = _a, {
    className,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    anchor
  } = _b, props = __objRest(_b, [
    "className",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "anchor"
  ]);
  return /* @__PURE__ */ jsx(index_parts_exports.Portal, { children: /* @__PURE__ */ jsx(
    index_parts_exports.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      anchor,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsx(
        index_parts_exports.Popup,
        __spreadValues({
          "data-slot": "combobox-content",
          "data-chips": !!anchor,
          className: cn("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)
        }, props)
      )
    }
  ) });
}
function ComboboxList3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.List,
    __spreadValues({
      "data-slot": "combobox-list",
      className: cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )
    }, props)
  );
}
function ComboboxItem3(_a) {
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
      "data-slot": "combobox-item",
      className: cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-sm py-1 pr-8 pl-1.5 text-[13px] outline-hidden select-none data-highlighted:bg-hover data-disabled:pointer-events-none data-disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(
          index_parts_exports.ItemIndicator,
          {
            render: /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ jsx(Check, { className: "pointer-events-none" })
          }
        )
      ]
    })
  );
}
function ComboboxGroup3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Group,
    __spreadValues({
      "data-slot": "combobox-group",
      className: cn(className)
    }, props)
  );
}
function ComboboxLabel3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.GroupLabel,
    __spreadValues({
      "data-slot": "combobox-label",
      className: cn("px-2 py-1 text-[12px] leading-[16px] text-muted-foreground", className)
    }, props)
  );
}
function ComboboxCollection2(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(index_parts_exports.Collection, __spreadValues({ "data-slot": "combobox-collection" }, props));
}
function ComboboxEmpty3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Empty,
    __spreadValues({
      "data-slot": "combobox-empty",
      className: cn(
        "hidden w-full justify-center py-2 text-center text-[13px] text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )
    }, props)
  );
}
function ComboboxSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Separator,
    __spreadValues({
      "data-slot": "combobox-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className)
    }, props)
  );
}
function ComboboxChips3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Chips,
    __spreadValues({
      "data-slot": "combobox-chips",
      className: cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-sm border border-input bg-transparent bg-clip-padding px-3 py-1 text-[13px] shadow-xs transition-colors focus-within:border-ring has-aria-invalid:border-destructive has-data-[slot=combobox-chip]:px-1.5 has-data-[slot=combobox-chip]:py-0.5 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )
    }, props)
  );
}
function ComboboxChip3(_a) {
  var _b = _a, {
    className,
    children,
    showRemove = true
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "showRemove"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.Chip,
    __spreadProps(__spreadValues({
      "data-slot": "combobox-chip",
      className: cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-0.5 rounded-sm bg-muted pl-1 pr-0.5 py-0.5 text-[12px] font-normal whitespace-nowrap text-foreground max-w-[160px] overflow-clip has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )
    }, props), {
      children: [
        children,
        showRemove && /* @__PURE__ */ jsx(
          index_parts_exports.ChipRemove,
          {
            className: "inline-flex items-center justify-center opacity-50 hover:opacity-100 [&_svg]:size-3",
            "data-slot": "combobox-chip-remove",
            children: /* @__PURE__ */ jsx(Close, { className: "pointer-events-none" })
          }
        )
      ]
    })
  );
}
function ComboboxChipsInput(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Input,
    __spreadValues({
      "data-slot": "combobox-chip-input",
      className: cn("min-w-16 flex-1 outline-none", className)
    }, props)
  );
}
function useComboboxAnchor() {
  return React3.useRef(null);
}

export { Combobox, ComboboxChip3 as ComboboxChip, ComboboxChips3 as ComboboxChips, ComboboxChipsInput, ComboboxCollection2 as ComboboxCollection, ComboboxContent, ComboboxEmpty3 as ComboboxEmpty, ComboboxGroup3 as ComboboxGroup, ComboboxInput3 as ComboboxInput, ComboboxItem3 as ComboboxItem, ComboboxLabel3 as ComboboxLabel, ComboboxList3 as ComboboxList, ComboboxSeparator, ComboboxTrigger3 as ComboboxTrigger, ComboboxValue2 as ComboboxValue, useComboboxAnchor };
//# sourceMappingURL=chunk-TM7HHQHU.mjs.map
//# sourceMappingURL=chunk-TM7HHQHU.mjs.map