import { isElementDisabled } from './chunk-YUC6B4OH.mjs';
import { scrollIntoViewIfNeeded, ALL_KEYS, ARROW_KEYS, isNativeInput, ARROW_DOWN, ARROW_RIGHT, HOME, END, ARROW_LEFT, ARROW_UP, VERTICAL_KEYS_WITH_EXTRA_KEYS, VERTICAL_KEYS, HORIZONTAL_KEYS_WITH_EXTRA_KEYS, HORIZONTAL_KEYS, MODIFIER_KEYS } from './chunk-QGKCYW24.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useDirection } from './chunk-NNBMTHBT.mjs';
import { getMinListIndex, getMaxListIndex, createGridCellMap, isListIndexDisabled, getGridNavigatedIndex, getGridCellIndexOfCorner, getGridCellIndices, findNonDisabledListIndex, isIndexOutOfListBounds } from './chunk-XK53VWW6.mjs';
import { CompositeRootContext } from './chunk-ETMT7VCK.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { EMPTY_ARRAY, EMPTY_OBJECT, useRenderElement, useMergedRefs } from './chunk-I44XWQG6.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/composite/constants.js
var ACTIVE_COMPOSITE_ITEM = "data-composite-item-active";

// ../../node_modules/@base-ui/react/esm/composite/root/useCompositeRoot.js
var EMPTY_ARRAY2 = [];
function useCompositeRoot(params) {
  const {
    itemSizes,
    cols = 1,
    loopFocus = true,
    dense = false,
    orientation = "both",
    direction,
    highlightedIndex: externalHighlightedIndex,
    onHighlightedIndexChange: externalSetHighlightedIndex,
    rootRef: externalRef,
    enableHomeAndEndKeys = false,
    stopEventPropagation = false,
    disabledIndices,
    modifierKeys = EMPTY_ARRAY2
  } = params;
  const [internalHighlightedIndex, internalSetHighlightedIndex] = React.useState(0);
  const isGrid = cols > 1;
  const rootRef = React.useRef(null);
  const mergedRef = useMergedRefs(rootRef, externalRef);
  const elementsRef = React.useRef([]);
  const hasSetDefaultIndexRef = React.useRef(false);
  const highlightedIndex = externalHighlightedIndex != null ? externalHighlightedIndex : internalHighlightedIndex;
  const onHighlightedIndexChange = useStableCallback((index, shouldScrollIntoView = false) => {
    (externalSetHighlightedIndex != null ? externalSetHighlightedIndex : internalSetHighlightedIndex)(index);
    if (shouldScrollIntoView) {
      const newActiveItem = elementsRef.current[index];
      scrollIntoViewIfNeeded(rootRef.current, newActiveItem, direction, orientation);
    }
  });
  const onMapChange = useStableCallback((map) => {
    var _a;
    if (map.size === 0 || hasSetDefaultIndexRef.current) {
      return;
    }
    hasSetDefaultIndexRef.current = true;
    const sortedElements = Array.from(map.keys());
    const activeItem = (_a = sortedElements.find((compositeElement) => compositeElement == null ? void 0 : compositeElement.hasAttribute(ACTIVE_COMPOSITE_ITEM))) != null ? _a : null;
    const activeIndex = activeItem ? sortedElements.indexOf(activeItem) : -1;
    if (activeIndex !== -1) {
      onHighlightedIndexChange(activeIndex);
    }
    scrollIntoViewIfNeeded(rootRef.current, activeItem, direction, orientation);
  });
  const props = React.useMemo(() => ({
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    ref: mergedRef,
    onFocus(event) {
      var _a;
      const element = rootRef.current;
      if (!element || !isNativeInput(event.target)) {
        return;
      }
      event.target.setSelectionRange(0, (_a = event.target.value.length) != null ? _a : 0);
    },
    onKeyDown(event) {
      var _a;
      const RELEVANT_KEYS = enableHomeAndEndKeys ? ALL_KEYS : ARROW_KEYS;
      if (!RELEVANT_KEYS.has(event.key)) {
        return;
      }
      if (isModifierKeySet(event, modifierKeys)) {
        return;
      }
      const element = rootRef.current;
      if (!element) {
        return;
      }
      const isRtl = direction === "rtl";
      const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
      const forwardKey = {
        horizontal: horizontalForwardKey,
        vertical: ARROW_DOWN,
        both: horizontalForwardKey
      }[orientation];
      const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;
      const backwardKey = {
        horizontal: horizontalBackwardKey,
        vertical: ARROW_UP,
        both: horizontalBackwardKey
      }[orientation];
      if (isNativeInput(event.target) && !isElementDisabled(event.target)) {
        const selectionStart = event.target.selectionStart;
        const selectionEnd = event.target.selectionEnd;
        const textContent = (_a = event.target.value) != null ? _a : "";
        if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
          return;
        }
        if (event.key !== backwardKey && selectionStart < textContent.length) {
          return;
        }
        if (event.key !== forwardKey && selectionStart > 0) {
          return;
        }
      }
      let nextIndex = highlightedIndex;
      const minIndex = getMinListIndex(elementsRef, disabledIndices);
      const maxIndex = getMaxListIndex(elementsRef, disabledIndices);
      if (isGrid) {
        const sizes = itemSizes || Array.from({
          length: elementsRef.current.length
        }, () => ({
          width: 1,
          height: 1
        }));
        const cellMap = createGridCellMap(sizes, cols, dense);
        const minGridIndex = cellMap.findIndex((index) => index != null && !isListIndexDisabled(elementsRef, index, disabledIndices));
        const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isListIndexDisabled(elementsRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
        nextIndex = cellMap[getGridNavigatedIndex({
          current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
        }, {
          event,
          orientation,
          loopFocus,
          cols,
          // treat undefined (empty grid spaces) as disabled indices so we
          // don't end up in them
          disabledIndices: getGridCellIndices([...disabledIndices || elementsRef.current.map((_, index) => isListIndexDisabled(elementsRef, index) ? index : void 0), void 0], cellMap),
          minIndex: minGridIndex,
          maxIndex: maxGridIndex,
          prevIndex: getGridCellIndexOfCorner(
            highlightedIndex > maxIndex ? minIndex : highlightedIndex,
            sizes,
            cellMap,
            cols,
            // use a corner matching the edge closest to the direction we're
            // moving in so we don't end up in the same item. Prefer
            // top/left over bottom/right.
            // eslint-disable-next-line no-nested-ternary
            event.key === ARROW_DOWN ? "bl" : event.key === ARROW_RIGHT ? "tr" : "tl"
          ),
          rtl: isRtl
        })];
      }
      const forwardKeys = {
        horizontal: [horizontalForwardKey],
        vertical: [ARROW_DOWN],
        both: [horizontalForwardKey, ARROW_DOWN]
      }[orientation];
      const backwardKeys = {
        horizontal: [horizontalBackwardKey],
        vertical: [ARROW_UP],
        both: [horizontalBackwardKey, ARROW_UP]
      }[orientation];
      const preventedKeys = isGrid ? RELEVANT_KEYS : {
        horizontal: enableHomeAndEndKeys ? HORIZONTAL_KEYS_WITH_EXTRA_KEYS : HORIZONTAL_KEYS,
        vertical: enableHomeAndEndKeys ? VERTICAL_KEYS_WITH_EXTRA_KEYS : VERTICAL_KEYS,
        both: RELEVANT_KEYS
      }[orientation];
      if (enableHomeAndEndKeys) {
        if (event.key === HOME) {
          nextIndex = minIndex;
        } else if (event.key === END) {
          nextIndex = maxIndex;
        }
      }
      if (nextIndex === highlightedIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) {
        if (loopFocus && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
          nextIndex = minIndex;
        } else if (loopFocus && nextIndex === minIndex && backwardKeys.includes(event.key)) {
          nextIndex = maxIndex;
        } else {
          nextIndex = findNonDisabledListIndex(elementsRef, {
            startingIndex: nextIndex,
            decrement: backwardKeys.includes(event.key),
            disabledIndices
          });
        }
      }
      if (nextIndex !== highlightedIndex && !isIndexOutOfListBounds(elementsRef, nextIndex)) {
        if (stopEventPropagation) {
          event.stopPropagation();
        }
        if (preventedKeys.has(event.key)) {
          event.preventDefault();
        }
        onHighlightedIndexChange(nextIndex, true);
        queueMicrotask(() => {
          var _a2;
          (_a2 = elementsRef.current[nextIndex]) == null ? void 0 : _a2.focus();
        });
      }
    }
  }), [cols, dense, direction, disabledIndices, elementsRef, enableHomeAndEndKeys, highlightedIndex, isGrid, itemSizes, loopFocus, mergedRef, modifierKeys, onHighlightedIndexChange, orientation, stopEventPropagation]);
  return React.useMemo(() => ({
    props,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    disabledIndices,
    onMapChange,
    relayKeyboardEvent: props.onKeyDown
  }), [props, highlightedIndex, onHighlightedIndexChange, elementsRef, disabledIndices, onMapChange]);
}
function isModifierKeySet(event, ignoredModifierKeys) {
  for (const key of MODIFIER_KEYS.values()) {
    if (ignoredModifierKeys.includes(key)) {
      continue;
    }
    if (event.getModifierState(key)) {
      return true;
    }
  }
  return false;
}
function CompositeRoot(componentProps) {
  const _a = componentProps, {
    render,
    className,
    refs = EMPTY_ARRAY,
    props = EMPTY_ARRAY,
    state = EMPTY_OBJECT,
    stateAttributesMapping,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    orientation,
    dense,
    itemSizes,
    loopFocus,
    cols,
    enableHomeAndEndKeys,
    onMapChange: onMapChangeProp,
    stopEventPropagation = true,
    rootRef,
    disabledIndices,
    modifierKeys,
    highlightItemOnHover = false,
    tag = "div"
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "refs",
    "props",
    "state",
    "stateAttributesMapping",
    "highlightedIndex",
    "onHighlightedIndexChange",
    "orientation",
    "dense",
    "itemSizes",
    "loopFocus",
    "cols",
    "enableHomeAndEndKeys",
    "onMapChange",
    "stopEventPropagation",
    "rootRef",
    "disabledIndices",
    "modifierKeys",
    "highlightItemOnHover",
    "tag"
  ]);
  const direction = useDirection();
  const {
    props: defaultProps,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange: onMapChangeUnwrapped,
    relayKeyboardEvent
  } = useCompositeRoot({
    itemSizes,
    cols,
    loopFocus,
    dense,
    orientation,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    rootRef,
    stopEventPropagation,
    enableHomeAndEndKeys,
    direction,
    disabledIndices,
    modifierKeys
  });
  const element = useRenderElement(tag, componentProps, {
    state,
    ref: refs,
    props: [defaultProps, ...props, elementProps],
    stateAttributesMapping
  });
  const contextValue = React.useMemo(() => ({
    highlightedIndex,
    onHighlightedIndexChange,
    highlightItemOnHover,
    relayKeyboardEvent
  }), [highlightedIndex, onHighlightedIndexChange, highlightItemOnHover, relayKeyboardEvent]);
  return /* @__PURE__ */ jsx(CompositeRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(CompositeList, {
      elementsRef,
      onMapChange: (newMap) => {
        onMapChangeProp == null ? void 0 : onMapChangeProp(newMap);
        onMapChangeUnwrapped(newMap);
      },
      children: element
    })
  });
}

export { ACTIVE_COMPOSITE_ITEM, CompositeRoot };
//# sourceMappingURL=chunk-6FR5MJRV.mjs.map
//# sourceMappingURL=chunk-6FR5MJRV.mjs.map