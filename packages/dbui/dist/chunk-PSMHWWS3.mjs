import { useValueAsRef } from './chunk-RAYLQUWY.mjs';
import { Timeout, useTimeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { isMouseLikePointerType, isClickLikeEvent, isReactEvent, createCoords, round, max, min, isIndexOutOfListBounds, stopEvent, getMinListIndex, getMaxListIndex, createGridCellMap, isListIndexDisabled, getGridNavigatedIndex, getGridCellIndexOfCorner, getGridCellIndices, findNonDisabledListIndex, isVirtualClick, isVirtualPointerEvent, rectToClientRect, isElementVisible, floor, evaluate, getSide, getSideAxis, getOppositePlacement, getExpandedPlacements, getOppositeAxisPlacements, getAlignmentSides, getOppositeAxis, clamp, getAlignment, sides, getPaddingObject, getAlignmentAxis, getAxisLength } from './chunk-XK53VWW6.mjs';
import { contains, activeElement, isTypeableCombobox, getFloatingFocusElement, isTypeableElement, getTarget, isTargetInsideEnabledTrigger, matchesFocusVisible, isEventTargetWithin, isRootElement } from './chunk-FQ4RTFU7.mjs';
import { isSafari, isWebKit, FOCUSABLE_ATTRIBUTE, ACTIVE_KEY, SELECTED_KEY, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, isMac, TYPEABLE_SELECTOR, ARROW_UP } from './chunk-BO7ZMLYZ.mjs';
import { TransitionStatusDataAttributes, resolveRef } from './chunk-INMEVUNJ.mjs';
import { useAnimationFrame, useOnMount } from './chunk-KJU32T43.mjs';
import { visuallyHidden } from './chunk-BVGGELUI.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useId } from './chunk-WIUX54UE.mjs';
import { isNode, isElement, getDocumentElement, isHTMLElement, getWindow, isTopLayer, getNodeName, isOverflowElement, getNodeScroll, getParentNode, isLastTraversableNode, isTableElement, isContainingBlock, getContainingBlock, getComputedStyle as getComputedStyle$1, getOverflowAncestors, isWebKit as isWebKit$1, getFrameElement, isShadowRoot } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { isReactVersionAtLeast, ownerVisuallyHidden, formatErrorMessage_default, EMPTY_OBJECT, useRenderElement, useRefWithInit, useMergedRefs, NOOP, CLICK_TRIGGER_IDENTIFIER } from './chunk-I44XWQG6.mjs';
import { __commonJS, __require, __toESM, __spreadProps, __spreadValues, __objRest, __publicField } from './chunk-LQPATFHW.mjs';
import * as React9 from 'react';
import { useLayoutEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';

// ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var require_use_sync_external_store_shim_production = __commonJS({
  "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports$1) {
    var React21 = __require("react");
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useState7 = React21.useState;
    var useEffect8 = React21.useEffect;
    var useLayoutEffect2 = React21.useLayoutEffect;
    var useDebugValue2 = React21.useDebugValue;
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      var value = getSnapshot(), _useState = useState7({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect2(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect8(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe]
      );
      useDebugValue2(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports$1.useSyncExternalStore = void 0 !== React21.useSyncExternalStore ? React21.useSyncExternalStore : shim;
  }
});

// ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports$1) {
    "production" !== process.env.NODE_ENV && (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React21.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState7({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect2(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect8(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React21 = __require("react"), objectIs = "function" === typeof Object.is ? Object.is : is, useState7 = React21.useState, useEffect8 = React21.useEffect, useLayoutEffect2 = React21.useLayoutEffect, useDebugValue2 = React21.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports$1.useSyncExternalStore = void 0 !== React21.useSyncExternalStore ? React21.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// ../../node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "../../node_modules/use-sync-external-store/shim/index.js"(exports$1, module) {
    if (process.env.NODE_ENV === "production") {
      module.exports = require_use_sync_external_store_shim_production();
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
var require_with_selector_production = __commonJS({
  "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports$1) {
    var React21 = __require("react");
    var shim = require_shim();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useSyncExternalStore2 = shim.useSyncExternalStore;
    var useRef13 = React21.useRef;
    var useEffect8 = React21.useEffect;
    var useMemo15 = React21.useMemo;
    var useDebugValue2 = React21.useDebugValue;
    exports$1.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
      var instRef = useRef13(null);
      if (null === instRef.current) {
        var inst = { hasValue: false, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo15(
        function() {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return memoizedSelection = currentSelection;
              }
              return memoizedSelection = nextSnapshot;
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return memoizedSnapshot = nextSnapshot, currentSelection;
            memoizedSnapshot = nextSnapshot;
            return memoizedSelection = nextSelection;
          }
          var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function() {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore2(subscribe, instRef[0], instRef[1]);
      useEffect8(
        function() {
          inst.hasValue = true;
          inst.value = value;
        },
        [value]
      );
      useDebugValue2(value);
      return value;
    };
  }
});

// ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports$1) {
    "production" !== process.env.NODE_ENV && (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React21 = __require("react"), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore2 = shim.useSyncExternalStore, useRef13 = React21.useRef, useEffect8 = React21.useEffect, useMemo15 = React21.useMemo, useDebugValue2 = React21.useDebugValue;
      exports$1.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef13(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo15(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore2(subscribe, instRef[0], instRef[1]);
        useEffect8(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue2(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// ../../node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "../../node_modules/use-sync-external-store/shim/with-selector.js"(exports$1, module) {
    if (process.env.NODE_ENV === "production") {
      module.exports = require_with_selector_production();
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// ../../node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var _isInert = function isInert(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && // closest does not exist on shadow roots, so we fall back to a manual
  // lookup upward, in case it is not defined.
  (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (_isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (_isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = _getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (displayCheck === "full-native") {
    if ("checkVisibility" in node) {
      var visible = node.checkVisibility({
        // Checking opacity might be desirable for some use cases, but natively,
        // opacity zero elements _are_ focusable and tabbable.
        checkOpacity: false,
        opacityProperty: false,
        contentVisibilityAuto: true,
        visibilityProperty: true,
        // This is an alias for `visibilityProperty`. Contemporary browsers
        // support both. However, this alias has wider browser support (Chrome
        // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
        // we include it anyway.
        checkVisibilityCSS: true
      });
      return !visible;
    }
  }
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || // full-native can run this branch when it falls through in case
  // Element#checkVisibility is unsupported
  displayCheck === "full-native" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isShadowRootTabbable = function isShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var _sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? _sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = _getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return _sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = _getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/tabbable.js
var getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, dir) {
  const list = tabbable(container, getTabbableOptions());
  const len = list.length;
  if (len === 0) {
    return void 0;
  }
  const active = activeElement(ownerDocument(container));
  const index2 = list.indexOf(active);
  const nextIndex = index2 === -1 ? dir === 1 ? 0 : len - 1 : index2 + dir;
  return list[nextIndex];
}
function getNextTabbable(referenceElement) {
  return getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
  return getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement;
}
function getTabbableNearElement(referenceElement, dir) {
  if (!referenceElement) {
    return null;
  }
  const list = tabbable(ownerDocument(referenceElement).body, getTabbableOptions());
  const elementCount = list.length;
  if (elementCount === 0) {
    return null;
  }
  const index2 = list.indexOf(referenceElement);
  if (index2 === -1) {
    return null;
  }
  const nextIndex = (index2 + dir + elementCount) % elementCount;
  return list[nextIndex];
}
function getTabbableAfterElement(referenceElement) {
  return getTabbableNearElement(referenceElement, 1);
}
function getTabbableBeforeElement(referenceElement) {
  return getTabbableNearElement(referenceElement, -1);
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || "";
    element.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
  const directChildren = nodes.filter((node) => {
    var _a;
    return node.parentId === id && (!onlyOpenChildren || ((_a = node.context) == null ? void 0 : _a.open));
  });
  return directChildren.flatMap((child) => [child, ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
function getNodeAncestors(nodes, id) {
  var _a;
  let allAncestors = [];
  let currentParentId = (_a = nodes.find((node) => node.id === id)) == null ? void 0 : _a.parentId;
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverShared.js
function resolveValue(value, pointerType) {
  if (pointerType != null && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === "function") {
    return value();
  }
  return value;
}
function getDelay(value, prop, pointerType) {
  const result = resolveValue(value, pointerType);
  if (typeof result === "number") {
    return result;
  }
  return result == null ? void 0 : result[prop];
}
function getRestMs(value) {
  if (typeof value === "function") {
    return value();
  }
  return value;
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
  return interactedInside || openEventType === "click" || openEventType === "mousedown";
}
var FloatingDelayGroupContext = /* @__PURE__ */ React9.createContext({
  hasProvider: false,
  timeoutMs: 0,
  delayRef: {
    current: 0
  },
  initialDelayRef: {
    current: 0
  },
  timeout: new Timeout(),
  currentIdRef: {
    current: null
  },
  currentContextRef: {
    current: null
  }
});
if (process.env.NODE_ENV !== "production") FloatingDelayGroupContext.displayName = "FloatingDelayGroupContext";
function FloatingDelayGroup(props) {
  const {
    children,
    delay,
    timeoutMs = 0
  } = props;
  const delayRef = React9.useRef(delay);
  const initialDelayRef = React9.useRef(delay);
  const currentIdRef = React9.useRef(null);
  const currentContextRef = React9.useRef(null);
  const timeout = useTimeout();
  return /* @__PURE__ */ jsx(FloatingDelayGroupContext.Provider, {
    value: React9.useMemo(() => ({
      hasProvider: true,
      delayRef,
      initialDelayRef,
      currentIdRef,
      timeoutMs,
      currentContextRef,
      timeout
    }), [timeoutMs, timeout]),
    children
  });
}
function useDelayGroup(context, options = {
  open: false
}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const floatingId = store.useState("floatingId");
  const {
    open
  } = options;
  const groupContext = React9.useContext(FloatingDelayGroupContext);
  const {
    currentIdRef,
    delayRef,
    timeoutMs,
    initialDelayRef,
    currentContextRef,
    hasProvider,
    timeout
  } = groupContext;
  const [isInstantPhase, setIsInstantPhase] = React9.useState(false);
  useIsoLayoutEffect(() => {
    function unset() {
      var _a;
      setIsInstantPhase(false);
      (_a = currentContextRef.current) == null ? void 0 : _a.setIsInstantPhase(false);
      currentIdRef.current = null;
      currentContextRef.current = null;
      delayRef.current = initialDelayRef.current;
    }
    if (!currentIdRef.current) {
      return void 0;
    }
    if (!open && currentIdRef.current === floatingId) {
      setIsInstantPhase(false);
      if (timeoutMs) {
        const closingId = floatingId;
        timeout.start(timeoutMs, () => {
          if (store.select("open") || currentIdRef.current && currentIdRef.current !== closingId) {
            return;
          }
          unset();
        });
        return () => {
          timeout.clear();
        };
      }
      unset();
    }
    return void 0;
  }, [open, floatingId, currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, timeout, store]);
  useIsoLayoutEffect(() => {
    if (!open) {
      return;
    }
    const prevContext = currentContextRef.current;
    const prevId = currentIdRef.current;
    timeout.clear();
    currentContextRef.current = {
      onOpenChange: store.setOpen,
      setIsInstantPhase
    };
    currentIdRef.current = floatingId;
    delayRef.current = {
      open: 0,
      close: getDelay(initialDelayRef.current, "close")
    };
    if (prevId !== null && prevId !== floatingId) {
      setIsInstantPhase(true);
      prevContext == null ? void 0 : prevContext.setIsInstantPhase(true);
      prevContext == null ? void 0 : prevContext.onOpenChange(false, createChangeEventDetails(reason_parts_exports.none));
    } else {
      setIsInstantPhase(false);
      prevContext == null ? void 0 : prevContext.setIsInstantPhase(false);
    }
  }, [open, floatingId, store, currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, timeout]);
  useIsoLayoutEffect(() => {
    return () => {
      currentContextRef.current = null;
    };
  }, [currentContextRef]);
  return React9.useMemo(() => ({
    hasProvider,
    delayRef,
    isInstantPhase
  }), [hasProvider, delayRef, isInstantPhase]);
}
var FocusGuard = /* @__PURE__ */ React9.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React9.useState();
  useIsoLayoutEffect(() => {
    if (isSafari) {
      setRole("button");
    }
  }, []);
  const restProps = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role
  };
  return /* @__PURE__ */ jsx("span", __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, props), {
    ref,
    style: visuallyHidden,
    "aria-hidden": role ? void 0 : true
  }), restProps), {
    "data-base-ui-focus-guard": ""
  }));
});
if (process.env.NODE_ENV !== "production") FocusGuard.displayName = "FocusGuard";

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js
function createAttribute(name) {
  return `data-base-ui-${name}`;
}
var PortalContext = /* @__PURE__ */ React9.createContext(null);
if (process.env.NODE_ENV !== "production") PortalContext.displayName = "PortalContext";
var usePortalContext = () => React9.useContext(PortalContext);
var attr = createAttribute("portal");
function useFloatingPortalNode(props = {}) {
  const {
    ref,
    container: containerProp,
    componentProps = EMPTY_OBJECT,
    elementProps
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const parentPortalNode = portalContext == null ? void 0 : portalContext.portalNode;
  const [containerElement, setContainerElement] = React9.useState(null);
  const [portalNode, setPortalNode] = React9.useState(null);
  const setPortalNodeRef = useStableCallback((node) => {
    if (node !== null) {
      setPortalNode(node);
    }
  });
  const containerRef = React9.useRef(null);
  useIsoLayoutEffect(() => {
    var _a, _b;
    if (containerProp === null) {
      if (containerRef.current) {
        containerRef.current = null;
        setPortalNode(null);
        setContainerElement(null);
      }
      return;
    }
    if (uniqueId == null) {
      return;
    }
    const resolvedContainer = (_b = (_a = containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) != null ? _a : parentPortalNode) != null ? _b : document.body;
    if (resolvedContainer == null) {
      if (containerRef.current) {
        containerRef.current = null;
        setPortalNode(null);
        setContainerElement(null);
      }
      return;
    }
    if (containerRef.current !== resolvedContainer) {
      containerRef.current = resolvedContainer;
      setPortalNode(null);
      setContainerElement(resolvedContainer);
    }
  }, [containerProp, parentPortalNode, uniqueId]);
  const portalElement = useRenderElement("div", componentProps, {
    ref: [ref, setPortalNodeRef],
    props: [{
      id: uniqueId,
      [attr]: ""
    }, elementProps]
  });
  const portalSubtree = containerElement && portalElement ? /* @__PURE__ */ ReactDOM.createPortal(portalElement, containerElement) : null;
  return {
    portalNode,
    portalSubtree
  };
}
var FloatingPortal = /* @__PURE__ */ React9.forwardRef(function FloatingPortal2(componentProps, forwardedRef) {
  const _a = componentProps, {
    children,
    container,
    className,
    render,
    renderGuards
  } = _a, elementProps = __objRest(_a, [
    "children",
    "container",
    "className",
    "render",
    "renderGuards"
  ]);
  const {
    portalNode,
    portalSubtree
  } = useFloatingPortalNode({
    container,
    ref: forwardedRef,
    componentProps,
    elementProps
  });
  const beforeOutsideRef = React9.useRef(null);
  const afterOutsideRef = React9.useRef(null);
  const beforeInsideRef = React9.useRef(null);
  const afterInsideRef = React9.useRef(null);
  const [focusManagerState, setFocusManagerState] = React9.useState(null);
  const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
  const open = focusManagerState == null ? void 0 : focusManagerState.open;
  const shouldRenderGuards = typeof renderGuards === "boolean" ? renderGuards : !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
  React9.useEffect(() => {
    if (!portalNode || modal) {
      return void 0;
    }
    function onFocus(event) {
      if (portalNode && event.relatedTarget && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, modal]);
  React9.useEffect(() => {
    if (!portalNode || open) {
      return;
    }
    enableFocusInside(portalNode);
  }, [open, portalNode]);
  const portalContextValue = React9.useMemo(() => ({
    beforeOutsideRef,
    afterOutsideRef,
    beforeInsideRef,
    afterInsideRef,
    portalNode,
    setFocusManagerState
  }), [portalNode]);
  return /* @__PURE__ */ jsxs(React9.Fragment, {
    children: [portalSubtree, /* @__PURE__ */ jsxs(PortalContext.Provider, {
      value: portalContextValue,
      children: [shouldRenderGuards && portalNode && /* @__PURE__ */ jsx(FocusGuard, {
        "data-type": "outside",
        ref: beforeOutsideRef,
        onFocus: (event) => {
          var _a2;
          if (isOutsideEvent(event, portalNode)) {
            (_a2 = beforeInsideRef.current) == null ? void 0 : _a2.focus();
          } else {
            const domReference = focusManagerState ? focusManagerState.domReference : null;
            const prevTabbable = getPreviousTabbable(domReference);
            prevTabbable == null ? void 0 : prevTabbable.focus();
          }
        }
      }), shouldRenderGuards && portalNode && /* @__PURE__ */ jsx("span", {
        "aria-owns": portalNode.id,
        style: ownerVisuallyHidden
      }), portalNode && /* @__PURE__ */ ReactDOM.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ jsx(FocusGuard, {
        "data-type": "outside",
        ref: afterOutsideRef,
        onFocus: (event) => {
          var _a2;
          if (isOutsideEvent(event, portalNode)) {
            (_a2 = afterInsideRef.current) == null ? void 0 : _a2.focus();
          } else {
            const domReference = focusManagerState ? focusManagerState.domReference : null;
            const nextTabbable = getNextTabbable(domReference);
            nextTabbable == null ? void 0 : nextTabbable.focus();
            if (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) {
              focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent));
            }
          }
        }
      })]
    })]
  });
});
if (process.env.NODE_ENV !== "production") FloatingPortal.displayName = "FloatingPortal";

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/createEventEmitter.js
function createEventEmitter() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _a;
      (_a = map.get(event)) == null ? void 0 : _a.forEach((listener) => listener(data));
    },
    on(event, listener) {
      if (!map.has(event)) {
        map.set(event, /* @__PURE__ */ new Set());
      }
      map.get(event).add(listener);
    },
    off(event, listener) {
      var _a;
      (_a = map.get(event)) == null ? void 0 : _a.delete(listener);
    }
  };
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTreeStore.js
var FloatingTreeStore = class {
  constructor() {
    __publicField(this, "nodesRef", {
      current: []
    });
    __publicField(this, "events", createEventEmitter());
  }
  addNode(node) {
    this.nodesRef.current.push(node);
  }
  removeNode(node) {
    const index2 = this.nodesRef.current.findIndex((n) => n === node);
    if (index2 !== -1) {
      this.nodesRef.current.splice(index2, 1);
    }
  }
};
var FloatingNodeContext = /* @__PURE__ */ React9.createContext(null);
if (process.env.NODE_ENV !== "production") FloatingNodeContext.displayName = "FloatingNodeContext";
var FloatingTreeContext = /* @__PURE__ */ React9.createContext(null);
if (process.env.NODE_ENV !== "production") FloatingTreeContext.displayName = "FloatingTreeContext";
var useFloatingParentNodeId = () => {
  var _a;
  return ((_a = React9.useContext(FloatingNodeContext)) == null ? void 0 : _a.id) || null;
};
var useFloatingTree = (externalTree) => {
  const contextTree = React9.useContext(FloatingTreeContext);
  return externalTree != null ? externalTree : contextTree;
};
function useFloatingNodeId(externalTree) {
  const id = useId();
  const tree = useFloatingTree(externalTree);
  const parentId = useFloatingParentNodeId();
  useIsoLayoutEffect(() => {
    if (!id) {
      return void 0;
    }
    const node = {
      id,
      parentId
    };
    tree == null ? void 0 : tree.addNode(node);
    return () => {
      tree == null ? void 0 : tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
}
function FloatingNode(props) {
  const {
    children,
    id
  } = props;
  const parentId = useFloatingParentNodeId();
  return /* @__PURE__ */ jsx(FloatingNodeContext.Provider, {
    value: React9.useMemo(() => ({
      id,
      parentId
    }), [id, parentId]),
    children
  });
}
function FloatingTree(props) {
  const {
    children,
    externalTree
  } = props;
  const tree = useRefWithInit(() => externalTree != null ? externalTree : new FloatingTreeStore()).current;
  return /* @__PURE__ */ jsx(FloatingTreeContext.Provider, {
    value: tree,
    children
  });
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/enqueueFocus.js
var rafId = 0;
function enqueueFocus(el, options = {}) {
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  if (cancelPrevious) {
    cancelAnimationFrame(rafId);
  }
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/markOthers.js
var counters = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
};
var markerName = "data-base-ui-inert";
var uncontrolledElementsSets = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
var markerCounterMap = /* @__PURE__ */ new WeakMap();
var lockCount = 0;
function getUncontrolledElementsSet(controlAttribute) {
  return uncontrolledElementsSets[controlAttribute];
}
function unwrapHost(node) {
  if (!node) {
    return null;
  }
  return isShadowRoot(node) ? node.host : unwrapHost(node.parentNode);
}
var correctElements = (parent, targets) => targets.map((target) => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter((x) => x != null);
var buildKeepSet = (targets) => {
  const keep = /* @__PURE__ */ new Set();
  targets.forEach((target) => {
    let node = target;
    while (node && !keep.has(node)) {
      keep.add(node);
      node = node.parentNode;
    }
  });
  return keep;
};
var collectOutsideElements = (root, keepElements, stopElements) => {
  const outside = [];
  const walk = (parent) => {
    if (!parent || stopElements.has(parent)) {
      return;
    }
    Array.from(parent.children).forEach((node) => {
      if (getNodeName(node) === "script") {
        return;
      }
      if (keepElements.has(node)) {
        walk(node);
      } else {
        outside.push(node);
      }
    });
  };
  walk(root);
  return outside;
};
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert, {
  mark = true,
  markerIgnoreElements = []
}) {
  const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
  let counterMap = null;
  let uncontrolledElementsSet = null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const markerIgnoreTargets = mark ? correctElements(body, markerIgnoreElements) : [];
  const markerIgnoreSet = new Set(markerIgnoreTargets);
  const markerTargets = mark ? collectOutsideElements(body, buildKeepSet(avoidElements), new Set(avoidElements)).filter((target) => !markerIgnoreSet.has(target)) : [];
  const hiddenElements = [];
  const markedElements = [];
  if (controlAttribute) {
    const map = counters[controlAttribute];
    const currentUncontrolledElementsSet = getUncontrolledElementsSet(controlAttribute);
    uncontrolledElementsSet = currentUncontrolledElementsSet;
    counterMap = map;
    const ariaLiveElements = correctElements(body, Array.from(body.querySelectorAll("[aria-live]")));
    const controlElements = avoidElements.concat(ariaLiveElements);
    const controlTargets = collectOutsideElements(body, buildKeepSet(controlElements), new Set(controlElements));
    controlTargets.forEach((node) => {
      const attr2 = node.getAttribute(controlAttribute);
      const alreadyHidden = attr2 !== null && attr2 !== "false";
      const counterValue = (map.get(node) || 0) + 1;
      map.set(node, counterValue);
      hiddenElements.push(node);
      if (counterValue === 1 && alreadyHidden) {
        currentUncontrolledElementsSet.add(node);
      }
      if (!alreadyHidden) {
        node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true");
      }
    });
  }
  if (mark) {
    markerTargets.forEach((node) => {
      const markerValue = (markerCounterMap.get(node) || 0) + 1;
      markerCounterMap.set(node, markerValue);
      markedElements.push(node);
      if (markerValue === 1) {
        node.setAttribute(markerName, "");
      }
    });
  }
  lockCount += 1;
  return () => {
    if (counterMap) {
      hiddenElements.forEach((element) => {
        const currentCounterValue = counterMap.get(element) || 0;
        const counterValue = currentCounterValue - 1;
        counterMap.set(element, counterValue);
        if (!counterValue) {
          if (!(uncontrolledElementsSet == null ? void 0 : uncontrolledElementsSet.has(element)) && controlAttribute) {
            element.removeAttribute(controlAttribute);
          }
          uncontrolledElementsSet == null ? void 0 : uncontrolledElementsSet.delete(element);
        }
      });
    }
    if (mark) {
      markedElements.forEach((element) => {
        const markerValue = (markerCounterMap.get(element) || 0) - 1;
        markerCounterMap.set(element, markerValue);
        if (!markerValue) {
          element.removeAttribute(markerName);
        }
      });
    }
    lockCount -= 1;
    if (!lockCount) {
      counters.inert = /* @__PURE__ */ new WeakMap();
      counters["aria-hidden"] = /* @__PURE__ */ new WeakMap();
      uncontrolledElementsSets.inert = /* @__PURE__ */ new WeakSet();
      uncontrolledElementsSets["aria-hidden"] = /* @__PURE__ */ new WeakSet();
      markerCounterMap = /* @__PURE__ */ new WeakMap();
    }
  };
}
function markOthers(avoidElements, options = {}) {
  const {
    ariaHidden = false,
    inert = false,
    mark = true,
    markerIgnoreElements = []
  } = options;
  const body = ownerDocument(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements, body, ariaHidden, inert, {
    mark,
    markerIgnoreElements
  });
}
function getEventType(event, lastInteractionType) {
  const win = getWindow(event.target);
  if (event instanceof win.KeyboardEvent) {
    return "keyboard";
  }
  if (event instanceof win.FocusEvent) {
    return lastInteractionType || "keyboard";
  }
  if ("pointerType" in event) {
    return event.pointerType || "keyboard";
  }
  if ("touches" in event) {
    return "touch";
  }
  if (event instanceof win.MouseEvent) {
    return lastInteractionType || (event.detail === 0 ? "keyboard" : "mouse");
  }
  return "";
}
var LIST_LIMIT = 20;
var previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
  previouslyFocusedElements = previouslyFocusedElements.filter((entry) => {
    var _a;
    return (_a = entry.deref()) == null ? void 0 : _a.isConnected;
  });
}
function addPreviouslyFocusedElement(element) {
  clearDisconnectedPreviouslyFocusedElements();
  if (element && getNodeName(element) !== "body") {
    previouslyFocusedElements.push(new WeakRef(element));
    if (previouslyFocusedElements.length > LIST_LIMIT) {
      previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
    }
  }
}
function getPreviouslyFocusedElement() {
  var _a;
  clearDisconnectedPreviouslyFocusedElements();
  return (_a = previouslyFocusedElements[previouslyFocusedElements.length - 1]) == null ? void 0 : _a.deref();
}
function getFirstTabbableElement(container) {
  if (!container) {
    return null;
  }
  const tabbableOptions = getTabbableOptions();
  if (isTabbable(container, tabbableOptions)) {
    return container;
  }
  return tabbable(container, tabbableOptions)[0] || container;
}
function isFocusable(element) {
  if (!element || !element.isConnected) {
    return false;
  }
  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility();
  }
  return isElementVisible(element);
}
function handleTabIndex(floatingFocusElement, orderRef) {
  var _a;
  if (!orderRef.current.includes("floating") && !((_a = floatingFocusElement.getAttribute("role")) == null ? void 0 : _a.includes("dialog"))) {
    return;
  }
  const options = getTabbableOptions();
  const focusableElements = focusable(floatingFocusElement, options);
  const tabbableContent = focusableElements.filter((element) => {
    const dataTabIndex = element.getAttribute("data-tabindex") || "";
    return isTabbable(element, options) || element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-");
  });
  const tabIndex = floatingFocusElement.getAttribute("tabindex");
  if (orderRef.current.includes("floating") || tabbableContent.length === 0) {
    if (tabIndex !== "0") {
      floatingFocusElement.setAttribute("tabindex", "0");
    }
  } else if (tabIndex !== "-1" || floatingFocusElement.hasAttribute("data-tabindex") && floatingFocusElement.getAttribute("data-tabindex") !== "-1") {
    floatingFocusElement.setAttribute("tabindex", "-1");
    floatingFocusElement.setAttribute("data-tabindex", "-1");
  }
}
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    initialFocus = true,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    closeOnFocusOut = true,
    openInteractionType = "",
    nextFocusableElement,
    previousFocusableElement,
    beforeContentFocusGuardRef,
    externalTree,
    getInsideElements
  } = props;
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const domReference = store.useState("domReferenceElement");
  const floating = store.useState("floatingElement");
  const {
    events,
    dataRef
  } = store.context;
  const getNodeId = useStableCallback(() => {
    var _a;
    return (_a = dataRef.current.floatingContext) == null ? void 0 : _a.nodeId;
  });
  const ignoreInitialFocus = initialFocus === false;
  const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
  const orderRef = React9.useRef(["content"]);
  const initialFocusRef = useValueAsRef(initialFocus);
  const returnFocusRef = useValueAsRef(returnFocus);
  const openInteractionTypeRef = useValueAsRef(openInteractionType);
  const tree = useFloatingTree(externalTree);
  const portalContext = usePortalContext();
  const preventReturnFocusRef = React9.useRef(false);
  const isPointerDownRef = React9.useRef(false);
  const pointerDownOutsideRef = React9.useRef(false);
  const tabbableIndexRef = React9.useRef(-1);
  const closeTypeRef = React9.useRef("");
  const lastInteractionTypeRef = React9.useRef("");
  const beforeGuardRef = React9.useRef(null);
  const afterGuardRef = React9.useRef(null);
  const mergedBeforeGuardRef = useMergedRefs(beforeGuardRef, beforeContentFocusGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef);
  const mergedAfterGuardRef = useMergedRefs(afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef);
  const blurTimeout = useTimeout();
  const pointerDownTimeout = useTimeout();
  const restoreFocusFrame = useAnimationFrame();
  const isInsidePortal = portalContext != null;
  const floatingFocusElement = getFloatingFocusElement(floating);
  const getTabbableContent = useStableCallback((container = floatingFocusElement) => {
    return container ? tabbable(container, getTabbableOptions()) : [];
  });
  const getResolvedInsideElements = useStableCallback(() => {
    var _a;
    return (_a = getInsideElements == null ? void 0 : getInsideElements().filter((element) => element != null)) != null ? _a : [];
  });
  const getTabbableElements = useStableCallback((container) => {
    const content = getTabbableContent(container);
    return orderRef.current.map(() => content).filter(Boolean).flat();
  });
  React9.useEffect(() => {
    if (disabled || !modal) {
      return void 0;
    }
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (contains(floatingFocusElement, activeElement(ownerDocument(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          stopEvent(event);
        }
      }
    }
    const doc = ownerDocument(floatingFocusElement);
    doc.addEventListener("keydown", onKeyDown);
    return () => {
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  React9.useEffect(() => {
    if (disabled || !open) {
      return void 0;
    }
    const doc = ownerDocument(floatingFocusElement);
    function clearPointerDownOutside() {
      pointerDownOutsideRef.current = false;
    }
    function onPointerDown(event) {
      const target = getTarget(event);
      const insideElements = getResolvedInsideElements();
      const pointerTargetInside = contains(floating, target) || contains(domReference, target) || contains(portalContext == null ? void 0 : portalContext.portalNode, target) || insideElements.some((element) => element === target || contains(element, target));
      pointerDownOutsideRef.current = !pointerTargetInside;
      lastInteractionTypeRef.current = event.pointerType || "keyboard";
      if (target == null ? void 0 : target.closest(`[${CLICK_TRIGGER_IDENTIFIER}]`)) {
        isPointerDownRef.current = true;
      }
    }
    function onKeyDown() {
      lastInteractionTypeRef.current = "keyboard";
    }
    doc.addEventListener("pointerdown", onPointerDown, true);
    doc.addEventListener("pointerup", clearPointerDownOutside, true);
    doc.addEventListener("pointercancel", clearPointerDownOutside, true);
    doc.addEventListener("keydown", onKeyDown, true);
    return () => {
      doc.removeEventListener("pointerdown", onPointerDown, true);
      doc.removeEventListener("pointerup", clearPointerDownOutside, true);
      doc.removeEventListener("pointercancel", clearPointerDownOutside, true);
      doc.removeEventListener("keydown", onKeyDown, true);
    };
  }, [disabled, floating, domReference, floatingFocusElement, open, portalContext, getResolvedInsideElements]);
  React9.useEffect(() => {
    if (disabled || !closeOnFocusOut) {
      return void 0;
    }
    const doc = ownerDocument(floatingFocusElement);
    function handlePointerDown() {
      isPointerDownRef.current = true;
      pointerDownTimeout.start(0, () => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusIn(event) {
      const target = getTarget(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      const currentTarget = event.currentTarget;
      const target = getTarget(event);
      queueMicrotask(() => {
        const nodeId = getNodeId();
        const triggers = store.context.triggerElements;
        const insideElements = getResolvedInsideElements();
        const isRelatedFocusGuard = (relatedTarget == null ? void 0 : relatedTarget.hasAttribute(createAttribute("focus-guard"))) && [beforeGuardRef.current, afterGuardRef.current, portalContext == null ? void 0 : portalContext.beforeInsideRef.current, portalContext == null ? void 0 : portalContext.afterInsideRef.current, portalContext == null ? void 0 : portalContext.beforeOutsideRef.current, portalContext == null ? void 0 : portalContext.afterOutsideRef.current, resolveRef(previousFocusableElement), resolveRef(nextFocusableElement)].includes(relatedTarget);
        const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || insideElements.some((element) => element === relatedTarget || contains(element, relatedTarget)) || relatedTarget != null && triggers.hasElement(relatedTarget) || triggers.hasMatchingElement((trigger) => contains(trigger, relatedTarget)) || isRelatedFocusGuard || tree && (getNodeChildren(tree.nodesRef.current, nodeId).find((node) => {
          var _a, _b;
          return contains((_a = node.context) == null ? void 0 : _a.elements.floating, relatedTarget) || contains((_b = node.context) == null ? void 0 : _b.elements.domReference, relatedTarget);
        }) || getNodeAncestors(tree.nodesRef.current, nodeId).find((node) => {
          var _a, _b, _c;
          return [(_a = node.context) == null ? void 0 : _a.elements.floating, getFloatingFocusElement((_b = node.context) == null ? void 0 : _b.elements.floating)].includes(relatedTarget) || ((_c = node.context) == null ? void 0 : _c.elements.domReference) === relatedTarget;
        })));
        if (currentTarget === domReference && floatingFocusElement) {
          handleTabIndex(floatingFocusElement, orderRef);
        }
        if (restoreFocus && currentTarget !== domReference && !isFocusable(target) && activeElement(doc) === doc.body) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus();
            if (restoreFocus === "popup") {
              restoreFocusFrame.request(() => {
                floatingFocusElement.focus();
              });
              return;
            }
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
          if (isHTMLElement(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }
        if (dataRef.current.insideReactTree) {
          dataRef.current.insideReactTree = false;
          return;
        }
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
          preventReturnFocusRef.current = true;
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event));
        }
      });
    }
    function markInsideReactTree() {
      if (pointerDownOutsideRef.current) {
        return;
      }
      dataRef.current.insideReactTree = true;
      blurTimeout.start(0, () => {
        dataRef.current.insideReactTree = false;
      });
    }
    const domReferenceElement = isHTMLElement(domReference) ? domReference : null;
    const cleanups = [];
    if (!floating && !domReferenceElement) {
      return void 0;
    }
    if (domReferenceElement) {
      domReferenceElement.addEventListener("focusout", handleFocusOutside);
      domReferenceElement.addEventListener("pointerdown", handlePointerDown);
      cleanups.push(() => {
        domReferenceElement.removeEventListener("focusout", handleFocusOutside);
        domReferenceElement.removeEventListener("pointerdown", handlePointerDown);
      });
    }
    if (floating) {
      floating.addEventListener("focusin", handleFocusIn);
      floating.addEventListener("focusout", handleFocusOutside);
      if (portalContext) {
        floating.addEventListener("focusout", markInsideReactTree, true);
        cleanups.push(() => {
          floating.removeEventListener("focusout", markInsideReactTree, true);
        });
      }
      cleanups.push(() => {
        floating.removeEventListener("focusin", handleFocusIn);
        floating.removeEventListener("focusout", handleFocusOutside);
      });
    }
    return () => {
      cleanups.forEach((cleanup) => {
        cleanup();
      });
    };
  }, [disabled, domReference, floating, floatingFocusElement, modal, tree, portalContext, store, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox, getNodeId, orderRef, dataRef, blurTimeout, pointerDownTimeout, restoreFocusFrame, nextFocusableElement, previousFocusableElement, getResolvedInsideElements]);
  React9.useEffect(() => {
    var _a, _b, _c;
    if (disabled || !floating || !open) {
      return void 0;
    }
    const portalNodes = Array.from(((_a = portalContext == null ? void 0 : portalContext.portalNode) == null ? void 0 : _a.querySelectorAll(`[${createAttribute("portal")}]`)) || []);
    const ancestors = tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : [];
    const rootAncestorComboboxDomReference = (_c = (_b = ancestors.find((node) => {
      var _a2;
      return isTypeableCombobox(((_a2 = node.context) == null ? void 0 : _a2.elements.domReference) || null);
    })) == null ? void 0 : _b.context) == null ? void 0 : _c.elements.domReference;
    const controlInsideElements = [floating, ...portalNodes, beforeGuardRef.current, afterGuardRef.current, portalContext == null ? void 0 : portalContext.beforeOutsideRef.current, portalContext == null ? void 0 : portalContext.afterOutsideRef.current, ...getResolvedInsideElements()];
    const insideElements = [...controlInsideElements, rootAncestorComboboxDomReference, resolveRef(previousFocusableElement), resolveRef(nextFocusableElement), isUntrappedTypeableCombobox ? domReference : null].filter((x) => x != null);
    const ariaHiddenCleanup = markOthers(insideElements, {
      ariaHidden: modal || isUntrappedTypeableCombobox,
      mark: false
    });
    const markerInsideElements = [floating, ...portalNodes].filter((x) => x != null);
    const markerCleanup = markOthers(markerInsideElements);
    return () => {
      markerCleanup();
      ariaHiddenCleanup();
    };
  }, [open, disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, tree, getNodeId, nextFocusableElement, previousFocusableElement, getResolvedInsideElements]);
  useIsoLayoutEffect(() => {
    if (!open || disabled || !isHTMLElement(floatingFocusElement)) {
      return;
    }
    const doc = ownerDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floatingFocusElement);
      const initialFocusValueOrFn = initialFocusRef.current;
      const resolvedInitialFocus = typeof initialFocusValueOrFn === "function" ? initialFocusValueOrFn(openInteractionTypeRef.current || "") : initialFocusValueOrFn;
      if (resolvedInitialFocus === void 0 || resolvedInitialFocus === false) {
        return;
      }
      let elToFocus;
      if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
        elToFocus = focusableElements[0] || floatingFocusElement;
      } else {
        elToFocus = resolveRef(resolvedInitialFocus);
      }
      elToFocus = elToFocus || focusableElements[0] || floatingFocusElement;
      const focusAlreadyInsideFloatingEl = contains(floatingFocusElement, previouslyFocusedElement);
      if (focusAlreadyInsideFloatingEl) {
        return;
      }
      enqueueFocus(elToFocus, {
        preventScroll: elToFocus === floatingFocusElement
      });
    });
  }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef, openInteractionTypeRef]);
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) {
      return void 0;
    }
    const doc = ownerDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    addPreviouslyFocusedElement(previouslyFocusedElement);
    function onOpenChangeLocal(details) {
      if (!details.open) {
        closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
      }
      if (details.reason === reason_parts_exports.triggerHover && details.nativeEvent.type === "mouseleave") {
        preventReturnFocusRef.current = true;
      }
      if (details.reason !== reason_parts_exports.outsidePress) {
        return;
      }
      if (details.nested) {
        preventReturnFocusRef.current = false;
      } else if (isVirtualClick(details.nativeEvent) || isVirtualPointerEvent(details.nativeEvent)) {
        preventReturnFocusRef.current = false;
      } else {
        let isPreventScrollSupported = false;
        document.createElement("div").focus({
          get preventScroll() {
            isPreventScrollSupported = true;
            return false;
          }
        });
        if (isPreventScrollSupported) {
          preventReturnFocusRef.current = false;
        } else {
          preventReturnFocusRef.current = true;
        }
      }
    }
    events.on("openchange", onOpenChangeLocal);
    function getReturnElement() {
      const returnFocusValueOrFn = returnFocusRef.current;
      let resolvedReturnFocusValue = typeof returnFocusValueOrFn === "function" ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
      if (resolvedReturnFocusValue === void 0 || resolvedReturnFocusValue === false) {
        return null;
      }
      if (resolvedReturnFocusValue === null) {
        resolvedReturnFocusValue = true;
      }
      if (typeof resolvedReturnFocusValue === "boolean") {
        const el = domReference || getPreviouslyFocusedElement();
        return el && el.isConnected ? el : null;
      }
      const fallback = domReference || getPreviouslyFocusedElement();
      return resolveRef(resolvedReturnFocusValue) || fallback || null;
    }
    return () => {
      events.off("openchange", onOpenChangeLocal);
      const activeEl = activeElement(doc);
      const insideElements = getResolvedInsideElements();
      const isFocusInsideFloatingTree = contains(floating, activeEl) || insideElements.some((element) => element === activeEl || contains(element, activeEl)) || tree && getNodeChildren(tree.nodesRef.current, getNodeId(), false).some((node) => {
        var _a;
        return contains((_a = node.context) == null ? void 0 : _a.elements.floating, activeEl);
      });
      const returnElement = getReturnElement();
      queueMicrotask(() => {
        const tabbableReturnElement = getFirstTabbableElement(returnElement);
        const hasExplicitReturnFocus = typeof returnFocusRef.current !== "boolean";
        if (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && // If the focus moved somewhere else after mount, avoid returning focus
          // since it likely entered a different element which should be
          // respected: https://github.com/floating-ui/floating-ui/issues/2607
          (!hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
        ) {
          tabbableReturnElement.focus({
            preventScroll: true
          });
        }
        preventReturnFocusRef.current = false;
      });
    };
  }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, events, tree, domReference, getNodeId, getResolvedInsideElements]);
  useIsoLayoutEffect(() => {
    if (!isWebKit || open || !floating) {
      return;
    }
    const activeEl = activeElement(ownerDocument(floating));
    if (!isHTMLElement(activeEl) || !isTypeableElement(activeEl)) {
      return;
    }
    if (contains(floating, activeEl)) {
      activeEl.blur();
    }
  }, [open, floating]);
  useIsoLayoutEffect(() => {
    if (disabled || !portalContext) {
      return void 0;
    }
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange: store.setOpen,
      domReference
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, store, closeOnFocusOut, domReference]);
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) {
      return void 0;
    }
    handleTabIndex(floatingFocusElement, orderRef);
    return () => {
      queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
    };
  }, [disabled, floatingFocusElement, orderRef]);
  const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /* @__PURE__ */ jsxs(React9.Fragment, {
    children: [shouldRenderGuards && /* @__PURE__ */ jsx(FocusGuard, {
      "data-type": "inside",
      ref: mergedBeforeGuardRef,
      onFocus: (event) => {
        var _a;
        if (modal) {
          const els = getTabbableElements();
          enqueueFocus(els[els.length - 1]);
        } else if (portalContext == null ? void 0 : portalContext.portalNode) {
          preventReturnFocusRef.current = false;
          if (isOutsideEvent(event, portalContext.portalNode)) {
            const nextTabbable = getNextTabbable(domReference);
            nextTabbable == null ? void 0 : nextTabbable.focus();
          } else {
            (_a = resolveRef(previousFocusableElement != null ? previousFocusableElement : portalContext.beforeOutsideRef)) == null ? void 0 : _a.focus();
          }
        }
      }
    }), children, shouldRenderGuards && /* @__PURE__ */ jsx(FocusGuard, {
      "data-type": "inside",
      ref: mergedAfterGuardRef,
      onFocus: (event) => {
        var _a;
        if (modal) {
          enqueueFocus(getTabbableElements()[0]);
        } else if (portalContext == null ? void 0 : portalContext.portalNode) {
          if (closeOnFocusOut) {
            preventReturnFocusRef.current = true;
          }
          if (isOutsideEvent(event, portalContext.portalNode)) {
            const prevTabbable = getPreviousTabbable(domReference);
            prevTabbable == null ? void 0 : prevTabbable.focus();
          } else {
            (_a = resolveRef(nextFocusableElement != null ? nextFocusableElement : portalContext.afterOutsideRef)) == null ? void 0 : _a.focus();
          }
        }
      }
    })]
  });
}
function useClick(context, props = {}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const dataRef = store.context.dataRef;
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    stickIfOpen = true,
    touchOpenDelay = 0,
    reason = reason_parts_exports.triggerPress
  } = props;
  const pointerTypeRef = React9.useRef(void 0);
  const frame = useAnimationFrame();
  const touchOpenTimeout = useTimeout();
  const reference = React9.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;
      const nativeEvent = event.nativeEvent;
      const open = store.select("open");
      if (event.button !== 0 || eventOption === "click" || isMouseLikePointerType(pointerType, true) && ignoreMouse) {
        return;
      }
      const openEvent = dataRef.current.openEvent;
      const openEventType = openEvent == null ? void 0 : openEvent.type;
      const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
      const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? openEventType === "click" || openEventType === "mousedown" : true));
      if (isTypeableElement(nativeEvent.target)) {
        const details = createChangeEventDetails(reason, nativeEvent, nativeEvent.target);
        if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
          touchOpenTimeout.start(touchOpenDelay, () => {
            store.setOpen(true, details);
          });
        } else {
          store.setOpen(nextOpen, details);
        }
        return;
      }
      const eventCurrentTarget = event.currentTarget;
      frame.request(() => {
        const details = createChangeEventDetails(reason, nativeEvent, eventCurrentTarget);
        if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
          touchOpenTimeout.start(touchOpenDelay, () => {
            store.setOpen(true, details);
          });
        } else {
          store.setOpen(nextOpen, details);
        }
      });
    },
    onClick(event) {
      if (eventOption === "mousedown-only") {
        return;
      }
      const pointerType = pointerTypeRef.current;
      if (eventOption === "mousedown" && pointerType) {
        pointerTypeRef.current = void 0;
        return;
      }
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) {
        return;
      }
      const open = store.select("open");
      const openEvent = dataRef.current.openEvent;
      const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
      const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? isClickLikeEvent(openEvent) : true));
      const details = createChangeEventDetails(reason, event.nativeEvent, event.currentTarget);
      if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
        touchOpenTimeout.start(touchOpenDelay, () => {
          store.setOpen(true, details);
        });
      } else {
        store.setOpen(nextOpen, details);
      }
    },
    onKeyDown() {
      pointerTypeRef.current = void 0;
    }
  }), [dataRef, eventOption, ignoreMouse, store, stickIfOpen, toggle, frame, touchOpenTimeout, touchOpenDelay, reason]);
  return React9.useMemo(() => enabled ? {
    reference
  } : EMPTY_OBJECT, [enabled, reference]);
}
function createVirtualElement(domElement, data) {
  let offsetX = null;
  let offsetY = null;
  let isAutoUpdateEvent = false;
  return {
    contextElement: domElement || void 0,
    getBoundingClientRect() {
      var _a;
      const domRect = (domElement == null ? void 0 : domElement.getBoundingClientRect()) || {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      const isXAxis = data.axis === "x" || data.axis === "both";
      const isYAxis = data.axis === "y" || data.axis === "both";
      const canTrackCursorOnAutoUpdate = ["mouseenter", "mousemove"].includes(((_a = data.dataRef.current.openEvent) == null ? void 0 : _a.type) || "") && data.pointerType !== "touch";
      let width = domRect.width;
      let height = domRect.height;
      let x = domRect.x;
      let y = domRect.y;
      if (offsetX == null && data.x && isXAxis) {
        offsetX = domRect.x - data.x;
      }
      if (offsetY == null && data.y && isYAxis) {
        offsetY = domRect.y - data.y;
      }
      x -= offsetX || 0;
      y -= offsetY || 0;
      width = 0;
      height = 0;
      if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
        width = data.axis === "y" ? domRect.width : 0;
        height = data.axis === "x" ? domRect.height : 0;
        x = isXAxis && data.x != null ? data.x : x;
        y = isYAxis && data.y != null ? data.y : y;
      } else if (isAutoUpdateEvent && !canTrackCursorOnAutoUpdate) {
        height = data.axis === "x" ? domRect.height : height;
        width = data.axis === "y" ? domRect.width : width;
      }
      isAutoUpdateEvent = true;
      return {
        width,
        height,
        x,
        y,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x
      };
    }
  };
}
function isMouseBasedEvent(event) {
  return event != null && event.clientX != null;
}
function useClientPoint(context, props = {}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const floating = store.useState("floatingElement");
  const domReference = store.useState("domReferenceElement");
  const dataRef = store.context.dataRef;
  const {
    enabled = true,
    axis = "both"
  } = props;
  const initialRef = React9.useRef(false);
  const cleanupListenerRef = React9.useRef(null);
  const [pointerType, setPointerType] = React9.useState();
  const [reactive, setReactive] = React9.useState([]);
  const setReference = useStableCallback((newX, newY, referenceElement) => {
    if (initialRef.current) {
      return;
    }
    if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) {
      return;
    }
    store.set("positionReference", createVirtualElement(referenceElement != null ? referenceElement : domReference, {
      x: newX,
      y: newY,
      axis,
      dataRef,
      pointerType
    }));
  });
  const handleReferenceEnterOrMove = useStableCallback((event) => {
    if (!open) {
      setReference(event.clientX, event.clientY, event.currentTarget);
    } else if (!cleanupListenerRef.current) {
      setReactive([]);
    }
  });
  const openCheck = isMouseLikePointerType(pointerType) ? floating : open;
  const addListener = React9.useCallback(() => {
    if (!openCheck || !enabled) {
      return void 0;
    }
    const win = getWindow(floating);
    function handleMouseMove(event) {
      const target = getTarget(event);
      if (!contains(floating, target)) {
        setReference(event.clientX, event.clientY);
      } else {
        win.removeEventListener("mousemove", handleMouseMove);
        cleanupListenerRef.current = null;
      }
    }
    if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) {
      win.addEventListener("mousemove", handleMouseMove);
      const cleanup = () => {
        win.removeEventListener("mousemove", handleMouseMove);
        cleanupListenerRef.current = null;
      };
      cleanupListenerRef.current = cleanup;
      return cleanup;
    }
    store.set("positionReference", domReference);
    return void 0;
  }, [openCheck, enabled, floating, dataRef, domReference, store, setReference]);
  React9.useEffect(() => {
    return addListener();
  }, [addListener, reactive]);
  React9.useEffect(() => {
    if (enabled && !floating) {
      initialRef.current = false;
    }
  }, [enabled, floating]);
  React9.useEffect(() => {
    if (!enabled && open) {
      initialRef.current = true;
    }
  }, [enabled, open]);
  const reference = React9.useMemo(() => {
    function setPointerTypeRef(event) {
      setPointerType(event.pointerType);
    }
    return {
      onPointerDown: setPointerTypeRef,
      onPointerEnter: setPointerTypeRef,
      onMouseMove: handleReferenceEnterOrMove,
      onMouseEnter: handleReferenceEnterOrMove
    };
  }, [handleReferenceEnterOrMove]);
  return React9.useMemo(() => enabled ? {
    reference,
    trigger: reference
  } : {}, [enabled, reference]);
}
var bubbleHandlerKeys = {
  intentional: "onClick",
  sloppy: "onPointerDown"
};
function alwaysFalse() {
  return false;
}
function normalizeProp(normalizable) {
  var _a, _b;
  return {
    escapeKey: typeof normalizable === "boolean" ? normalizable : (_a = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _a : false,
    outsidePress: typeof normalizable === "boolean" ? normalizable : (_b = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _b : true
  };
}
function useDismiss(context, props = {}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const floatingElement = store.useState("floatingElement");
  const {
    dataRef
  } = store.context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: outsidePressProp = true,
    outsidePressEvent = "sloppy",
    referencePress = alwaysFalse,
    referencePressEvent = "sloppy",
    bubbles,
    externalTree
  } = props;
  const tree = useFloatingTree(externalTree);
  const outsidePressFn = useStableCallback(typeof outsidePressProp === "function" ? outsidePressProp : () => false);
  const outsidePress = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp;
  const outsidePressEnabled = outsidePress !== false;
  const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent);
  const pressStartedInsideRef = React9.useRef(false);
  const pressStartPreventedRef = React9.useRef(false);
  const suppressNextOutsideClickRef = React9.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const touchStateRef = React9.useRef(null);
  const cancelDismissOnEndTimeout = useTimeout();
  const clearInsideReactTreeTimeout = useTimeout();
  const clearInsideReactTree = useStableCallback(() => {
    clearInsideReactTreeTimeout.clear();
    dataRef.current.insideReactTree = false;
  });
  const isComposingRef = React9.useRef(false);
  const currentPointerTypeRef = React9.useRef("");
  const isReferencePressEnabled = useStableCallback(referencePress);
  const closeOnEscapeKeyDown = useStableCallback((event) => {
    var _a;
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    if (isComposingRef.current) {
      return;
    }
    const nodeId = (_a = dataRef.current.floatingContext) == null ? void 0 : _a.nodeId;
    const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _a2;
          if (((_a2 = child.context) == null ? void 0 : _a2.open) && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    const native = isReactEvent(event) ? event.nativeEvent : event;
    const eventDetails = createChangeEventDetails(reason_parts_exports.escapeKey, native);
    store.setOpen(false, eventDetails);
    if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
      event.stopPropagation();
    }
  });
  const markInsideReactTree = useStableCallback(() => {
    dataRef.current.insideReactTree = true;
    clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
  });
  React9.useEffect(() => {
    if (!open || !enabled) {
      return void 0;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    const compositionTimeout = new Timeout();
    const preventedPressSuppressionTimeout = new Timeout();
    function handleCompositionStart() {
      compositionTimeout.clear();
      isComposingRef.current = true;
    }
    function handleCompositionEnd() {
      compositionTimeout.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit$1() ? 5 : 0,
        () => {
          isComposingRef.current = false;
        }
      );
    }
    function suppressImmediateOutsideClickAfterPreventedStart() {
      suppressNextOutsideClickRef.current = true;
      preventedPressSuppressionTimeout.start(0, () => {
        suppressNextOutsideClickRef.current = false;
      });
    }
    function resetPressStartState() {
      pressStartedInsideRef.current = false;
      pressStartPreventedRef.current = false;
    }
    function getOutsidePressEvent() {
      const type = currentPointerTypeRef.current;
      const computedType = type === "pen" || !type ? "mouse" : type;
      const outsidePressEventValue = getOutsidePressEventProp();
      const resolved = typeof outsidePressEventValue === "function" ? outsidePressEventValue() : outsidePressEventValue;
      if (typeof resolved === "string") {
        return resolved;
      }
      return resolved[computedType];
    }
    function shouldIgnoreEvent(event) {
      const computedOutsidePressEvent = getOutsidePressEvent();
      return computedOutsidePressEvent === "intentional" && event.type !== "click" || computedOutsidePressEvent === "sloppy" && event.type === "click";
    }
    function isEventWithinFloatingTree(event) {
      var _a;
      const nodeId = (_a = dataRef.current.floatingContext) == null ? void 0 : _a.nodeId;
      const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some((node) => {
        var _a2;
        return isEventTargetWithin(event, (_a2 = node.context) == null ? void 0 : _a2.elements.floating);
      });
      return isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement")) || targetIsInsideChildren;
    }
    function closeOnPressOutside(event) {
      var _a;
      if (shouldIgnoreEvent(event)) {
        clearInsideReactTree();
        return;
      }
      if (dataRef.current.insideReactTree) {
        clearInsideReactTree();
        return;
      }
      const target = getTarget(event);
      const inertSelector = `[${createAttribute("inert")}]`;
      let markers = Array.from(ownerDocument(store.select("floatingElement")).querySelectorAll(inertSelector));
      const targetRoot = isElement(target) ? target.getRootNode() : null;
      if (isShadowRoot(targetRoot)) {
        markers = markers.concat(Array.from(targetRoot.querySelectorAll(inertSelector)));
      }
      const triggers = store.context.triggerElements;
      if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger) => contains(trigger, target)))) {
        return;
      }
      let targetRootAncestor = isElement(target) ? target : null;
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor);
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
          break;
        }
        targetRootAncestor = nextParent;
      }
      if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !contains(target, store.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      markers.every((marker) => !contains(targetRootAncestor, marker))) {
        return;
      }
      if (isHTMLElement(target) && !("touches" in event)) {
        const lastTraversableNode = isLastTraversableNode(target);
        const style = getComputedStyle$1(target);
        const scrollRe = /auto|scroll/;
        const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
        const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
        const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
        const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
        const isRTL2 = style.direction === "rtl";
        const pressedVerticalScrollbar = canScrollY && (isRTL2 ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
        const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
          return;
        }
      }
      if (isEventWithinFloatingTree(event)) {
        return;
      }
      if (getOutsidePressEvent() === "intentional" && suppressNextOutsideClickRef.current) {
        preventedPressSuppressionTimeout.clear();
        suppressNextOutsideClickRef.current = false;
        return;
      }
      if (typeof outsidePress === "function" && !outsidePress(event)) {
        return;
      }
      const nodeId = (_a = dataRef.current.floatingContext) == null ? void 0 : _a.nodeId;
      const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _a2;
          if (((_a2 = child.context) == null ? void 0 : _a2.open) && !child.context.dataRef.current.__outsidePressBubbles) {
            shouldDismiss = false;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.outsidePress, event));
      clearInsideReactTree();
    }
    function handlePointerDown(event) {
      if (getOutsidePressEvent() !== "sloppy" || event.pointerType === "touch" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      closeOnPressOutside(event);
    }
    function handleTouchStart(event) {
      if (getOutsidePressEvent() !== "sloppy" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      const touch = event.touches[0];
      if (touch) {
        touchStateRef.current = {
          startTime: Date.now(),
          startX: touch.clientX,
          startY: touch.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true
        };
        cancelDismissOnEndTimeout.start(1e3, () => {
          if (touchStateRef.current) {
            touchStateRef.current.dismissOnTouchEnd = false;
            touchStateRef.current.dismissOnMouseDown = false;
          }
        });
      }
    }
    function handleTouchStartCapture(event) {
      currentPointerTypeRef.current = "touch";
      const target = getTarget(event);
      function callback() {
        handleTouchStart(event);
        target == null ? void 0 : target.removeEventListener(event.type, callback);
      }
      target == null ? void 0 : target.addEventListener(event.type, callback);
    }
    function closeOnPressOutsideCapture(event) {
      cancelDismissOnEndTimeout.clear();
      if (event.type === "pointerdown") {
        currentPointerTypeRef.current = event.pointerType;
      }
      if (event.type === "mousedown" && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
        return;
      }
      const target = getTarget(event);
      function callback() {
        if (event.type === "pointerdown") {
          handlePointerDown(event);
        } else {
          closeOnPressOutside(event);
        }
        target == null ? void 0 : target.removeEventListener(event.type, callback);
      }
      target == null ? void 0 : target.addEventListener(event.type, callback);
    }
    function handlePressEndCapture(event) {
      if (!pressStartedInsideRef.current) {
        return;
      }
      const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current;
      resetPressStartState();
      if (getOutsidePressEvent() !== "intentional") {
        return;
      }
      if (event.type === "pointercancel") {
        if (pressStartedInsideDefaultPrevented) {
          suppressImmediateOutsideClickAfterPreventedStart();
        }
        return;
      }
      if (isEventWithinFloatingTree(event)) {
        return;
      }
      if (pressStartedInsideDefaultPrevented) {
        suppressImmediateOutsideClickAfterPreventedStart();
        return;
      }
      if (typeof outsidePress === "function" && !outsidePress(event)) {
        return;
      }
      preventedPressSuppressionTimeout.clear();
      suppressNextOutsideClickRef.current = true;
      clearInsideReactTree();
    }
    function handleTouchMove(event) {
      if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 5) {
        touchStateRef.current.dismissOnTouchEnd = true;
      }
      if (distance > 10) {
        closeOnPressOutside(event);
        cancelDismissOnEndTimeout.clear();
        touchStateRef.current = null;
      }
    }
    function handleTouchMoveCapture(event) {
      const target = getTarget(event);
      function callback() {
        handleTouchMove(event);
        target == null ? void 0 : target.removeEventListener(event.type, callback);
      }
      target == null ? void 0 : target.addEventListener(event.type, callback);
    }
    function handleTouchEnd(event) {
      if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      if (touchStateRef.current.dismissOnTouchEnd) {
        closeOnPressOutside(event);
      }
      cancelDismissOnEndTimeout.clear();
      touchStateRef.current = null;
    }
    function handleTouchEndCapture(event) {
      const target = getTarget(event);
      function callback() {
        handleTouchEnd(event);
        target == null ? void 0 : target.removeEventListener(event.type, callback);
      }
      target == null ? void 0 : target.addEventListener(event.type, callback);
    }
    const doc = ownerDocument(floatingElement);
    if (escapeKey) {
      doc.addEventListener("keydown", closeOnEscapeKeyDown);
      doc.addEventListener("compositionstart", handleCompositionStart);
      doc.addEventListener("compositionend", handleCompositionEnd);
    }
    if (outsidePressEnabled) {
      doc.addEventListener("click", closeOnPressOutsideCapture, true);
      doc.addEventListener("pointerdown", closeOnPressOutsideCapture, true);
      doc.addEventListener("pointerup", handlePressEndCapture, true);
      doc.addEventListener("pointercancel", handlePressEndCapture, true);
      doc.addEventListener("mousedown", closeOnPressOutsideCapture, true);
      doc.addEventListener("mouseup", handlePressEndCapture, true);
      doc.addEventListener("touchstart", handleTouchStartCapture, true);
      doc.addEventListener("touchmove", handleTouchMoveCapture, true);
      doc.addEventListener("touchend", handleTouchEndCapture, true);
    }
    return () => {
      if (escapeKey) {
        doc.removeEventListener("keydown", closeOnEscapeKeyDown);
        doc.removeEventListener("compositionstart", handleCompositionStart);
        doc.removeEventListener("compositionend", handleCompositionEnd);
      }
      if (outsidePressEnabled) {
        doc.removeEventListener("click", closeOnPressOutsideCapture, true);
        doc.removeEventListener("pointerdown", closeOnPressOutsideCapture, true);
        doc.removeEventListener("pointerup", handlePressEndCapture, true);
        doc.removeEventListener("pointercancel", handlePressEndCapture, true);
        doc.removeEventListener("mousedown", closeOnPressOutsideCapture, true);
        doc.removeEventListener("mouseup", handlePressEndCapture, true);
        doc.removeEventListener("touchstart", handleTouchStartCapture, true);
        doc.removeEventListener("touchmove", handleTouchMoveCapture, true);
        doc.removeEventListener("touchend", handleTouchEndCapture, true);
      }
      compositionTimeout.clear();
      preventedPressSuppressionTimeout.clear();
      resetPressStartState();
      suppressNextOutsideClickRef.current = false;
    };
  }, [dataRef, floatingElement, escapeKey, outsidePressEnabled, outsidePress, open, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, clearInsideReactTree, getOutsidePressEventProp, tree, store, cancelDismissOnEndTimeout]);
  React9.useEffect(clearInsideReactTree, [outsidePress, clearInsideReactTree]);
  const reference = React9.useMemo(() => __spreadValues({
    onKeyDown: closeOnEscapeKeyDown,
    [bubbleHandlerKeys[referencePressEvent]]: (event) => {
      if (!isReferencePressEnabled()) {
        return;
      }
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent));
    }
  }, referencePressEvent !== "intentional" && {
    onClick(event) {
      if (!isReferencePressEnabled()) {
        return;
      }
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent));
    }
  }), [closeOnEscapeKeyDown, store, referencePressEvent, isReferencePressEnabled]);
  const markPressStartedInsideReactTree = useStableCallback((event) => {
    if (!open || !enabled || event.button !== 0) {
      return;
    }
    const target = getTarget(event.nativeEvent);
    if (!contains(store.select("floatingElement"), target)) {
      return;
    }
    if (!pressStartedInsideRef.current) {
      pressStartedInsideRef.current = true;
      pressStartPreventedRef.current = false;
    }
  });
  const markInsidePressStartPrevented = useStableCallback((event) => {
    if (!open || !enabled) {
      return;
    }
    if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) {
      return;
    }
    if (pressStartedInsideRef.current) {
      pressStartPreventedRef.current = true;
    }
  });
  const floating = React9.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: markInsidePressStartPrevented,
    onMouseDown: markInsidePressStartPrevented,
    onClickCapture: markInsideReactTree,
    onMouseDownCapture(event) {
      markInsideReactTree();
      markPressStartedInsideReactTree(event);
    },
    onPointerDownCapture(event) {
      markInsideReactTree();
      markPressStartedInsideReactTree(event);
    },
    onMouseUpCapture: markInsideReactTree,
    onTouchEndCapture: markInsideReactTree,
    onTouchMoveCapture: markInsideReactTree
  }), [closeOnEscapeKeyDown, markInsideReactTree, markPressStartedInsideReactTree, markInsidePressStartPrevented]);
  return React9.useMemo(() => enabled ? {
    reference,
    floating,
    trigger: reference
  } : {}, [enabled, reference, floating]);
}

// ../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : __spreadProps(__spreadValues({}, platform2), {
    detectOverflow
  });
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = __spreadValues(__spreadValues({}, middlewareData[name]), data);
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const _a = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true
      } = _a, detectOverflowOptions = __objRest(_a, [
        "mainAxis",
        "crossAxis",
        "fallbackPlacements",
        "fallbackStrategy",
        "fallbackAxisSideDirection",
        "flipAlignment"
      ]);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const _a = evaluate(options, state), {
        strategy = "referenceHidden"
      } = _a, detectOverflowOptions = __objRest(_a, [
        "strategy"
      ]);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
            elementContext: "reference"
          }));
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
            altBoundary: true
          }));
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: __spreadProps(__spreadValues({}, diffCoords), {
          placement
        })
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const _a = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        }
      } = _a, detectOverflowOptions = __objRest(_a, [
        "mainAxis",
        "crossAxis",
        "limiter"
      ]);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      }));
      return __spreadProps(__spreadValues({}, limitedCoords), {
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      });
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset4 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset4, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : __spreadValues({
        mainAxis: 0,
        crossAxis: 0
      }, rawOffset);
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const _a = evaluate(options, state), {
        apply = () => {
        }
      } = _a, detectOverflowOptions = __objRest(_a, [
        "apply"
      ]);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply(__spreadProps(__spreadValues({}, state), {
        availableWidth,
        availableHeight
      }));
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit$1() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit$1();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? useLayoutEffect : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React9.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React9.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React9.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React9.useState(null);
  const [_floating, _setFloating] = React9.useState(null);
  const setReference = React9.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React9.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React9.useRef(null);
  const floatingRef = React9.useRef(null);
  const dataRef = React9.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React9.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = __spreadProps(__spreadValues({}, data2), {
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      });
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => __spreadProps(__spreadValues({}, data2), {
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React9.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React9.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React9.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React9.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return __spreadValues(__spreadProps(__spreadValues({}, initialStyles), {
        transform: "translate(" + x + "px, " + y + "px)"
      }), getDPR(elements.floating) >= 1.5 && {
        willChange: "transform"
      });
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React9.useMemo(() => __spreadProps(__spreadValues({}, data), {
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var offset3 = (options, deps) => {
  const result = offset2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var shift3 = (options, deps) => {
  const result = shift2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var limitShift3 = (options, deps) => {
  const result = limitShift2(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};
var flip3 = (options, deps) => {
  const result = flip2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var size3 = (options, deps) => {
  const result = size2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var hide3 = (options, deps) => {
  const result = hide2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var hooks = [];
var currentInstance = void 0;
function getInstance() {
  return currentInstance;
}
function register(hook) {
  hooks.push(hook);
}
function fastComponent(fn) {
  const FastComponent = (props, forwardedRef) => {
    const instance = useRefWithInit(createInstance).current;
    let result;
    try {
      currentInstance = instance;
      for (const hook of hooks) {
        hook.before(instance);
      }
      result = fn(props, forwardedRef);
      for (const hook of hooks) {
        hook.after(instance);
      }
      instance.didInitialize = true;
    } finally {
      currentInstance = void 0;
    }
    return result;
  };
  FastComponent.displayName = fn.displayName || fn.name;
  return FastComponent;
}
function fastComponentRef(fn) {
  return /* @__PURE__ */ React9.forwardRef(fastComponent(fn));
}
function createInstance() {
  return {
    didInitialize: false
  };
}

// ../../node_modules/@base-ui/utils/esm/store/useStore.js
var import_shim = __toESM(require_shim(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var canUseRawUseSyncExternalStore = isReactVersionAtLeast(19);
var useStoreImplementation = canUseRawUseSyncExternalStore ? useStoreFast : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
  return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
  const getSelection = React9.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [store, selector, a1, a2, a3]);
  return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
register({
  before(instance) {
    instance.syncIndex = 0;
    if (!instance.didInitialize) {
      instance.syncTick = 1;
      instance.syncHooks = [];
      instance.didChangeStore = true;
      instance.getSnapshot = () => {
        let didChange = false;
        for (let i = 0; i < instance.syncHooks.length; i += 1) {
          const hook = instance.syncHooks[i];
          const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3);
          if (hook.didChange || !Object.is(hook.value, value)) {
            didChange = true;
            hook.value = value;
            hook.didChange = false;
          }
        }
        if (didChange) {
          instance.syncTick += 1;
        }
        return instance.syncTick;
      };
    }
  },
  after(instance) {
    if (instance.syncHooks.length > 0) {
      if (instance.didChangeStore) {
        instance.didChangeStore = false;
        instance.subscribe = (onStoreChange) => {
          const stores = /* @__PURE__ */ new Set();
          for (const hook of instance.syncHooks) {
            stores.add(hook.store);
          }
          const unsubscribes = [];
          for (const store of stores) {
            unsubscribes.push(store.subscribe(onStoreChange));
          }
          return () => {
            for (const unsubscribe of unsubscribes) {
              unsubscribe();
            }
          };
        };
      }
      (0, import_shim.useSyncExternalStore)(instance.subscribe, instance.getSnapshot, instance.getSnapshot);
    }
  }
});
function useStoreFast(store, selector, a1, a2, a3) {
  const instance = getInstance();
  if (!instance) {
    return useStoreR19(store, selector, a1, a2, a3);
  }
  const index2 = instance.syncIndex;
  instance.syncIndex += 1;
  let hook;
  if (!instance.didInitialize) {
    hook = {
      store,
      selector,
      a1,
      a2,
      a3,
      value: selector(store.getSnapshot(), a1, a2, a3),
      didChange: false
    };
    instance.syncHooks.push(hook);
  } else {
    hook = instance.syncHooks[index2];
    if (hook.store !== store || hook.selector !== selector || !Object.is(hook.a1, a1) || !Object.is(hook.a2, a2) || !Object.is(hook.a3, a3)) {
      if (hook.store !== store) {
        instance.didChangeStore = true;
      }
      hook.store = store;
      hook.selector = selector;
      hook.a1 = a1;
      hook.a2 = a2;
      hook.a3 = a3;
      hook.didChange = true;
    }
  }
  return hook.value;
}
function useStoreLegacy(store, selector, a1, a2, a3) {
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a2, a3));
}

// ../../node_modules/@base-ui/utils/esm/store/Store.js
var Store = class {
  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */
  // Internal state to handle recursive `setState()` calls
  constructor(state) {
    /**
     * Registers a listener that will be called whenever the store's state changes.
     *
     * @param fn The listener function to be called on state changes.
     * @returns A function to unsubscribe the listener.
     */
    __publicField(this, "subscribe", (fn) => {
      this.listeners.add(fn);
      return () => {
        this.listeners.delete(fn);
      };
    });
    /**
     * Returns the current state of the store.
     */
    __publicField(this, "getSnapshot", () => {
      return this.state;
    });
    this.state = state;
    this.listeners = /* @__PURE__ */ new Set();
    this.updateTick = 0;
  }
  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(newState) {
    if (this.state === newState) {
      return;
    }
    this.state = newState;
    this.updateTick += 1;
    const currentTick = this.updateTick;
    for (const listener of this.listeners) {
      if (currentTick !== this.updateTick) {
        return;
      }
      listener(newState);
    }
  }
  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(changes) {
    for (const key in changes) {
      if (!Object.is(this.state[key], changes[key])) {
        this.setState(__spreadValues(__spreadValues({}, this.state), changes));
        return;
      }
    }
  }
  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(key, value) {
    if (!Object.is(this.state[key], value)) {
      this.setState(__spreadProps(__spreadValues({}, this.state), {
        [key]: value
      }));
    }
  }
  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const newState = __spreadValues({}, this.state);
    this.setState(newState);
  }
  use(selector, a1, a2, a3) {
    return useStore(this, selector, a1, a2, a3);
  }
};

// ../../node_modules/reselect/dist/reselect.mjs
var runIdentityFunctionCheck = (resultFunc, inputSelectorsResults, outputSelectorResult) => {
  if (inputSelectorsResults.length === 1 && inputSelectorsResults[0] === outputSelectorResult) {
    let isInputSameAsOutput = false;
    try {
      const emptyObject = {};
      if (resultFunc(emptyObject) === emptyObject)
        isInputSameAsOutput = true;
    } catch (e) {
    }
    if (isInputSameAsOutput) {
      let stack = void 0;
      try {
        throw new Error();
      } catch (e) {
        ({ stack } = e);
      }
      console.warn(
        "The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",
        { stack }
      );
    }
  }
};
var runInputStabilityCheck = (inputSelectorResultsObject, options, inputSelectorArgs) => {
  const { memoize, memoizeOptions } = options;
  const { inputSelectorResults, inputSelectorResultsCopy } = inputSelectorResultsObject;
  const createAnEmptyObject = memoize(() => ({}), ...memoizeOptions);
  const areInputSelectorResultsEqual = createAnEmptyObject.apply(null, inputSelectorResults) === createAnEmptyObject.apply(null, inputSelectorResultsCopy);
  if (!areInputSelectorResultsEqual) {
    let stack = void 0;
    try {
      throw new Error();
    } catch (e) {
      ({ stack } = e);
    }
    console.warn(
      "An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",
      {
        arguments: inputSelectorArgs,
        firstInputs: inputSelectorResults,
        secondInputs: inputSelectorResultsCopy,
        stack
      }
    );
  }
};
var globalDevModeChecks = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
var NOT_FOUND = /* @__PURE__ */ Symbol("NOT_FOUND");
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
  if (typeof object !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array.every((item) => typeof item === "function")) {
    const itemTypes = array.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
var getDevModeChecksExecutionInfo = (firstRun, devModeChecks) => {
  const { identityFunctionCheck, inputStabilityCheck } = __spreadValues(__spreadValues({}, globalDevModeChecks), devModeChecks);
  return {
    identityFunctionCheck: {
      shouldRun: identityFunctionCheck === "always" || identityFunctionCheck === "once" && firstRun,
      run: runIdentityFunctionCheck
    },
    inputStabilityCheck: {
      shouldRun: inputStabilityCheck === "always" || inputStabilityCheck === "once" && firstRun,
      run: runInputStabilityCheck
    }
  };
};
function createSingletonCache(equals) {
  let entry;
  return {
    get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put(key, value) {
      entry = { key, value };
    },
    getEntries() {
      return entry ? [entry] : [];
    },
    clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  let entries = [];
  function get(key) {
    const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return { get, put, getEntries, clear };
}
var referenceEqualityCheck = (a, b) => a === b;
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    const { length } = prev;
    for (let i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  };
}
function lruMemoize(func, equalityCheckOrOptions) {
  const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
  const {
    equalityCheck = referenceEqualityCheck,
    maxSize = 1,
    resultEqualityCheck
  } = providedOptions;
  const comparator = createCacheKeyComparator(equalityCheck);
  let resultsCount = 0;
  const cache = maxSize <= 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    let value = cache.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const entries = cache.getEntries();
        const matchingEntry = entries.find(
          (entry) => resultEqualityCheck(entry.value, value)
        );
        if (matchingEntry) {
          value = matchingEntry.value;
          resultsCount !== 0 && resultsCount--;
        }
      }
      cache.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = () => {
    cache.clear();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult;
  let resultsCount = 0;
  function memoized() {
    var _a, _b;
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l = length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = (_b = (_a = lastResult == null ? void 0 : lastResult.deref) == null ? void 0 : _a.call(lastResult)) != null ? _b : lastResult;
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult = needsWeakRef ? new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector22 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = __spreadValues(__spreadValues({}, createSelectorCreatorOptions), directlyPassedOptions);
    const {
      memoize,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = [],
      devModeChecks = {}
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    let firstRun = true;
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
      if (process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck, inputStabilityCheck } = getDevModeChecksExecutionInfo(firstRun, devModeChecks);
        if (identityFunctionCheck.shouldRun) {
          identityFunctionCheck.run(
            resultFunc,
            inputSelectorResults,
            lastResult
          );
        }
        if (inputStabilityCheck.shouldRun) {
          const inputSelectorResultsCopy = collectInputSelectorResults(
            dependencies,
            arguments
          );
          inputStabilityCheck.run(
            { inputSelectorResults, inputSelectorResultsCopy },
            { memoize, memoizeOptions: finalMemoizeOptions },
            arguments
          );
        }
        if (firstRun)
          firstRun = false;
      }
      return lastResult;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize,
      argsMemoize
    });
  };
  Object.assign(createSelector22, {
    withTypes: () => createSelector22
  });
  return createSelector22;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index2) => {
          composition[inputSelectorKeys[index2]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);

// ../../node_modules/@base-ui/utils/esm/store/createSelector.js
createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: {
    maxSize: 1,
    equalityCheck: Object.is
  }
});
var createSelector2 = (a, b, c, d, e, f, ...other) => {
  if (other.length > 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Unsupported number of selectors" : formatErrorMessage_default(1));
  }
  let selector;
  if (a && b && c && d && e && f) {
    selector = (state, a1, a2, a3) => {
      const va = a(state, a1, a2, a3);
      const vb = b(state, a1, a2, a3);
      const vc = c(state, a1, a2, a3);
      const vd = d(state, a1, a2, a3);
      const ve = e(state, a1, a2, a3);
      return f(va, vb, vc, vd, ve, a1, a2, a3);
    };
  } else if (a && b && c && d && e) {
    selector = (state, a1, a2, a3) => {
      const va = a(state, a1, a2, a3);
      const vb = b(state, a1, a2, a3);
      const vc = c(state, a1, a2, a3);
      const vd = d(state, a1, a2, a3);
      return e(va, vb, vc, vd, a1, a2, a3);
    };
  } else if (a && b && c && d) {
    selector = (state, a1, a2, a3) => {
      const va = a(state, a1, a2, a3);
      const vb = b(state, a1, a2, a3);
      const vc = c(state, a1, a2, a3);
      return d(va, vb, vc, a1, a2, a3);
    };
  } else if (a && b && c) {
    selector = (state, a1, a2, a3) => {
      const va = a(state, a1, a2, a3);
      const vb = b(state, a1, a2, a3);
      return c(va, vb, a1, a2, a3);
    };
  } else if (a && b) {
    selector = (state, a1, a2, a3) => {
      const va = a(state, a1, a2, a3);
      return b(va, a1, a2, a3);
    };
  } else if (a) {
    selector = a;
  } else {
    throw (
      /* minify-error-disabled */
      new Error("Missing arguments")
    );
  }
  return selector;
};
var ReactStore = class extends Store {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(state, context = {}, selectors2) {
    super(state);
    this.context = context;
    this.selectors = selectors2;
  }
  /**
   * Non-reactive values such as refs, callbacks, etc.
   */
  /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValue(key, value) {
    React9.useDebugValue(key);
    useIsoLayoutEffect(() => {
      if (this.state[key] !== value) {
        this.set(key, value);
      }
    }, [key, value]);
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(key, value) {
    const store = this;
    useIsoLayoutEffect(() => {
      if (store.state[key] !== value) {
        store.set(key, value);
      }
      return () => {
        store.set(key, void 0);
      };
    }, [store, key, value]);
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(statePart) {
    const store = this;
    if (process.env.NODE_ENV !== "production") {
      React9.useDebugValue(statePart, (p) => Object.keys(p));
      const keys = React9.useRef(Object.keys(statePart)).current;
      const nextKeys = Object.keys(statePart);
      if (keys.length !== nextKeys.length || keys.some((key, index2) => key !== nextKeys[index2])) {
        console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
      }
    }
    const dependencies = Object.values(statePart);
    useIsoLayoutEffect(() => {
      store.update(statePart);
    }, [store, ...dependencies]);
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(key, controlled) {
    var _a;
    React9.useDebugValue(key);
    const isControlled = controlled !== void 0;
    useIsoLayoutEffect(() => {
      if (isControlled && !Object.is(this.state[key], controlled)) {
        super.setState(__spreadProps(__spreadValues({}, this.state), {
          [key]: controlled
        }));
      }
    }, [key, controlled, isControlled]);
    if (process.env.NODE_ENV !== "production") {
      const cache = (_a = this.controlledValues) != null ? _a : this.controlledValues = /* @__PURE__ */ new Map();
      if (!cache.has(key)) {
        cache.set(key, isControlled);
      }
      const previouslyControlled = cache.get(key);
      if (previouslyControlled !== void 0 && previouslyControlled !== isControlled) {
        console.error(`A component is changing the ${isControlled ? "" : "un"}controlled state of ${key.toString()} to be ${isControlled ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
      }
    }
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(key, a1, a2, a3) {
    const selector = this.selectors[key];
    return selector(this.state, a1, a2, a3);
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(key, a1, a2, a3) {
    React9.useDebugValue(key);
    return useStore(this, this.selectors[key], a1, a2, a3);
  }
  /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */
  useContextCallback(key, fn) {
    React9.useDebugValue(key);
    const stableFunction = useStableCallback(fn != null ? fn : NOOP);
    this.context[key] = stableFunction;
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(key) {
    const ref = React9.useRef(void 0);
    if (ref.current === void 0) {
      ref.current = (value) => {
        this.set(key, value);
      };
    }
    return ref.current;
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(selector, listener) {
    let selectFn;
    if (typeof selector === "function") {
      selectFn = selector;
    } else {
      selectFn = this.selectors[selector];
    }
    let prevValue = selectFn(this.state);
    listener(prevValue, prevValue, this);
    return this.subscribe((nextState) => {
      const nextValue = selectFn(nextState);
      if (!Object.is(prevValue, nextValue)) {
        const oldValue = prevValue;
        prevValue = nextValue;
        listener(nextValue, oldValue, this);
      }
    });
  }
};

// ../../node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js
var selectors = {
  open: createSelector2((state) => state.open),
  domReferenceElement: createSelector2((state) => state.domReferenceElement),
  referenceElement: createSelector2((state) => {
    var _a;
    return (_a = state.positionReference) != null ? _a : state.referenceElement;
  }),
  floatingElement: createSelector2((state) => state.floatingElement),
  floatingId: createSelector2((state) => state.floatingId)
};
var FloatingRootStore = class extends ReactStore {
  constructor(options) {
    const _a = options, {
      nested,
      noEmit,
      onOpenChange,
      triggerElements
    } = _a, initialState = __objRest(_a, [
      "nested",
      "noEmit",
      "onOpenChange",
      "triggerElements"
    ]);
    super(__spreadProps(__spreadValues({}, initialState), {
      positionReference: initialState.referenceElement,
      domReferenceElement: initialState.referenceElement
    }), {
      onOpenChange,
      dataRef: {
        current: {}
      },
      events: createEventEmitter(),
      nested,
      noEmit,
      triggerElements
    }, selectors);
    /**
     * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
     *
     * @param newOpen The new open state.
     * @param eventDetails Details about the event that triggered the open state change.
     */
    __publicField(this, "setOpen", (newOpen, eventDetails) => {
      var _a, _b;
      if (!newOpen || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
      // click events to upgrade a hover-open.
      isClickLikeEvent(eventDetails.event)) {
        this.context.dataRef.current.openEvent = newOpen ? eventDetails.event : void 0;
      }
      if (!this.context.noEmit) {
        const details = {
          open: newOpen,
          reason: eventDetails.reason,
          nativeEvent: eventDetails.event,
          nested: this.context.nested,
          triggerElement: eventDetails.trigger
        };
        this.context.events.emit("openchange", details);
      }
      (_b = (_a = this.context).onOpenChange) == null ? void 0 : _b.call(_a, newOpen, eventDetails);
    });
  }
};

// ../../node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js
var PopupTriggerMap = class {
  constructor() {
    this.elementsSet = /* @__PURE__ */ new Set();
    this.idMap = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(id, element) {
    const existingElement = this.idMap.get(id);
    if (existingElement === element) {
      return;
    }
    if (existingElement !== void 0) {
      this.elementsSet.delete(existingElement);
    }
    this.elementsSet.add(element);
    this.idMap.set(id, element);
    if (process.env.NODE_ENV !== "production") {
      if (this.elementsSet.size !== this.idMap.size) {
        throw new Error("Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.");
      }
    }
  }
  /**
   * Removes the trigger element with the given ID.
   */
  delete(id) {
    const element = this.idMap.get(id);
    if (element) {
      this.elementsSet.delete(element);
      this.idMap.delete(id);
    }
  }
  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(element) {
    return this.elementsSet.has(element);
  }
  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(predicate) {
    for (const element of this.elementsSet) {
      if (predicate(element)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(id) {
    return this.idMap.get(id);
  }
  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries();
  }
  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.elementsSet.values();
  }
  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size;
  }
};

// ../../node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloatingRootContext.js
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange,
    elements = {}
  } = options;
  const floatingId = useId();
  const nested = useFloatingParentNodeId() != null;
  if (process.env.NODE_ENV !== "production") {
    const optionDomReference = elements.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      console.error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `context.setPositionReference()`", "instead.");
    }
  }
  const store = useRefWithInit(() => {
    var _a, _b;
    return new FloatingRootStore({
      open,
      onOpenChange,
      referenceElement: (_a = elements.reference) != null ? _a : null,
      floatingElement: (_b = elements.floating) != null ? _b : null,
      triggerElements: new PopupTriggerMap(),
      floatingId,
      nested,
      noEmit: false
    });
  }).current;
  useIsoLayoutEffect(() => {
    const valuesToSync = {
      open,
      floatingId
    };
    if (elements.reference !== void 0) {
      valuesToSync.referenceElement = elements.reference;
      valuesToSync.domReferenceElement = isElement(elements.reference) ? elements.reference : null;
    }
    if (elements.floating !== void 0) {
      valuesToSync.floatingElement = elements.floating;
    }
    store.update(valuesToSync);
  }, [open, floatingId, elements.reference, elements.floating, store]);
  store.context.onOpenChange = onOpenChange;
  store.context.nested = nested;
  store.context.noEmit = false;
  return store;
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js
function useSyncedFloatingRootContext(options) {
  const {
    popupStore,
    noEmit = false,
    treatPopupAsFloatingElement = false,
    onOpenChange
  } = options;
  const floatingId = useId();
  const nested = useFloatingParentNodeId() != null;
  const open = popupStore.useState("open");
  const referenceElement = popupStore.useState("activeTriggerElement");
  const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
  const triggerElements = popupStore.context.triggerElements;
  const store = useRefWithInit(() => new FloatingRootStore({
    open,
    referenceElement,
    floatingElement,
    triggerElements,
    onOpenChange,
    floatingId,
    nested,
    noEmit
  })).current;
  useIsoLayoutEffect(() => {
    const valuesToSync = {
      open,
      floatingId,
      referenceElement,
      floatingElement
    };
    if (isElement(referenceElement)) {
      valuesToSync.domReferenceElement = referenceElement;
    }
    if (store.state.positionReference === store.state.referenceElement) {
      valuesToSync.positionReference = referenceElement;
    }
    store.update(valuesToSync);
  }, [open, floatingId, referenceElement, floatingElement, store]);
  store.context.onOpenChange = onOpenChange;
  store.context.nested = nested;
  store.context.noEmit = noEmit;
  return store;
}
var isMacSafari = isMac && isSafari;
function useFocus(context, props = {}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const {
    events,
    dataRef
  } = store.context;
  const {
    enabled = true,
    delay
  } = props;
  const blockFocusRef = React9.useRef(false);
  const blockedReferenceRef = React9.useRef(null);
  const timeout = useTimeout();
  const keyboardModalityRef = React9.useRef(true);
  React9.useEffect(() => {
    const domReference = store.select("domReferenceElement");
    if (!enabled) {
      return void 0;
    }
    const win = getWindow(domReference);
    function onBlur() {
      const currentDomReference = store.select("domReferenceElement");
      if (!store.select("open") && isHTMLElement(currentDomReference) && currentDomReference === activeElement(ownerDocument(currentDomReference))) {
        blockFocusRef.current = true;
      }
    }
    function onKeyDown() {
      keyboardModalityRef.current = true;
    }
    function onPointerDown() {
      keyboardModalityRef.current = false;
    }
    win.addEventListener("blur", onBlur);
    if (isMacSafari) {
      win.addEventListener("keydown", onKeyDown, true);
      win.addEventListener("pointerdown", onPointerDown, true);
    }
    return () => {
      win.removeEventListener("blur", onBlur);
      if (isMacSafari) {
        win.removeEventListener("keydown", onKeyDown, true);
        win.removeEventListener("pointerdown", onPointerDown, true);
      }
    };
  }, [store, enabled]);
  React9.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    function onOpenChangeLocal(details) {
      if (details.reason === reason_parts_exports.triggerPress || details.reason === reason_parts_exports.escapeKey) {
        const referenceElement = store.select("domReferenceElement");
        if (isElement(referenceElement)) {
          blockedReferenceRef.current = referenceElement;
          blockFocusRef.current = true;
        }
      }
    }
    events.on("openchange", onOpenChangeLocal);
    return () => {
      events.off("openchange", onOpenChangeLocal);
    };
  }, [events, enabled, store]);
  const reference = React9.useMemo(() => ({
    onMouseLeave() {
      blockFocusRef.current = false;
      blockedReferenceRef.current = null;
    },
    onFocus(event) {
      const focusTarget = event.currentTarget;
      if (blockFocusRef.current) {
        if (blockedReferenceRef.current === focusTarget) {
          return;
        }
        blockFocusRef.current = false;
        blockedReferenceRef.current = null;
      }
      const target = getTarget(event.nativeEvent);
      if (isElement(target)) {
        if (isMacSafari && !event.relatedTarget) {
          if (!keyboardModalityRef.current && !isTypeableElement(target)) {
            return;
          }
        } else if (!matchesFocusVisible(target)) {
          return;
        }
      }
      const movedFromOtherEnabledTrigger = isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements);
      const {
        nativeEvent,
        currentTarget
      } = event;
      const delayValue = typeof delay === "function" ? delay() : delay;
      if (store.select("open") && movedFromOtherEnabledTrigger || delayValue === 0 || delayValue === void 0) {
        store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerFocus, nativeEvent, currentTarget));
        return;
      }
      timeout.start(delayValue, () => {
        if (blockFocusRef.current) {
          return;
        }
        store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerFocus, nativeEvent, currentTarget));
      });
    },
    onBlur(event) {
      blockFocusRef.current = false;
      blockedReferenceRef.current = null;
      const relatedTarget = event.relatedTarget;
      const nativeEvent = event.nativeEvent;
      const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
      timeout.start(0, () => {
        var _a;
        const domReference = store.select("domReferenceElement");
        const activeEl = activeElement(domReference ? domReference.ownerDocument : document);
        if (!relatedTarget && activeEl === domReference) {
          return;
        }
        if (contains((_a = dataRef.current.floatingContext) == null ? void 0 : _a.refs.floating.current, activeEl) || contains(domReference, activeEl) || movedToFocusGuard) {
          return;
        }
        const nextFocusedElement = relatedTarget != null ? relatedTarget : activeEl;
        if (isTargetInsideEnabledTrigger(nextFocusedElement, store.context.triggerElements)) {
          return;
        }
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerFocus, nativeEvent));
      });
    }
  }), [dataRef, store, timeout, delay]);
  return React9.useMemo(() => enabled ? {
    reference,
    trigger: reference
  } : {}, [enabled, reference]);
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js
var interactiveSelector = `button,a,[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`;
function isInteractiveElement(element) {
  return element ? Boolean(element.closest(interactiveSelector)) : false;
}
var HoverInteraction = class _HoverInteraction {
  constructor() {
    __publicField(this, "dispose", () => {
      this.openChangeTimeout.clear();
      this.restTimeout.clear();
    });
    __publicField(this, "disposeEffect", () => {
      return this.dispose;
    });
    this.pointerType = void 0;
    this.interactedInside = false;
    this.handler = void 0;
    this.blockMouseMove = true;
    this.performedPointerEventsMutation = false;
    this.pointerEventsScopeElement = null;
    this.pointerEventsReferenceElement = null;
    this.pointerEventsFloatingElement = null;
    this.restTimeoutPending = false;
    this.openChangeTimeout = new Timeout();
    this.restTimeout = new Timeout();
    this.handleCloseOptions = void 0;
  }
  static create() {
    return new _HoverInteraction();
  }
};
function clearSafePolygonPointerEventsMutation(instance) {
  var _a, _b, _c;
  if (!instance.performedPointerEventsMutation) {
    return;
  }
  (_a = instance.pointerEventsScopeElement) == null ? void 0 : _a.style.removeProperty("pointer-events");
  (_b = instance.pointerEventsReferenceElement) == null ? void 0 : _b.style.removeProperty("pointer-events");
  (_c = instance.pointerEventsFloatingElement) == null ? void 0 : _c.style.removeProperty("pointer-events");
  instance.performedPointerEventsMutation = false;
  instance.pointerEventsScopeElement = null;
  instance.pointerEventsReferenceElement = null;
  instance.pointerEventsFloatingElement = null;
}
function applySafePolygonPointerEventsMutation(instance, options) {
  const {
    scopeElement,
    referenceElement,
    floatingElement
  } = options;
  clearSafePolygonPointerEventsMutation(instance);
  instance.performedPointerEventsMutation = true;
  instance.pointerEventsScopeElement = scopeElement;
  instance.pointerEventsReferenceElement = referenceElement;
  instance.pointerEventsFloatingElement = floatingElement;
  scopeElement.style.pointerEvents = "none";
  referenceElement.style.pointerEvents = "auto";
  floatingElement.style.pointerEvents = "auto";
}
function useHoverInteractionSharedState(store) {
  const instance = useRefWithInit(HoverInteraction.create).current;
  const data = store.context.dataRef.current;
  if (!data.hoverInteractionState) {
    data.hoverInteractionState = instance;
  }
  useOnMount(data.hoverInteractionState.disposeEffect);
  return data.hoverInteractionState;
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js
function useHoverFloatingInteraction(context, parameters = {}) {
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const floatingElement = store.useState("floatingElement");
  const domReferenceElement = store.useState("domReferenceElement");
  const {
    dataRef
  } = store.context;
  const {
    enabled = true,
    closeDelay: closeDelayProp = 0
  } = parameters;
  const instance = useHoverInteractionSharedState(store);
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const isClickLikeOpenEvent2 = useStableCallback(() => {
    var _a;
    return isClickLikeOpenEvent((_a = dataRef.current.openEvent) == null ? void 0 : _a.type, instance.interactedInside);
  });
  const isHoverOpen = useStableCallback(() => {
    var _a;
    const type = (_a = dataRef.current.openEvent) == null ? void 0 : _a.type;
    return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
  });
  const isRelatedTargetInsideEnabledTrigger = useStableCallback((target) => {
    return isTargetInsideEnabledTrigger(target, store.context.triggerElements);
  });
  const closeWithDelay = React9.useCallback((event) => {
    const closeDelay = getDelay(closeDelayProp, "close", instance.pointerType);
    const close = () => {
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
      tree == null ? void 0 : tree.events.emit("floating.closed", event);
    };
    if (closeDelay) {
      instance.openChangeTimeout.start(closeDelay, close);
    } else {
      instance.openChangeTimeout.clear();
      close();
    }
  }, [closeDelayProp, store, instance, tree]);
  const clearPointerEvents = useStableCallback(() => {
    clearSafePolygonPointerEventsMutation(instance);
  });
  const handleInteractInside = useStableCallback((event) => {
    const target = getTarget(event);
    if (!isInteractiveElement(target)) {
      instance.interactedInside = false;
      return;
    }
    instance.interactedInside = (target == null ? void 0 : target.closest("[aria-haspopup]")) != null;
  });
  useIsoLayoutEffect(() => {
    if (!open) {
      instance.pointerType = void 0;
      instance.restTimeoutPending = false;
      instance.interactedInside = false;
      clearPointerEvents();
    }
  }, [open, instance, clearPointerEvents]);
  React9.useEffect(() => {
    return clearPointerEvents;
  }, [clearPointerEvents]);
  useIsoLayoutEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!enabled) {
      return void 0;
    }
    if (open && ((_a = instance.handleCloseOptions) == null ? void 0 : _a.blockPointerEvents) && isHoverOpen() && isElement(domReferenceElement) && floatingElement) {
      const ref = domReferenceElement;
      const floatingEl = floatingElement;
      const doc = ownerDocument(floatingElement);
      const parentFloating = (_c = (_b = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.id === parentId)) == null ? void 0 : _b.context) == null ? void 0 : _c.elements.floating;
      if (parentFloating) {
        parentFloating.style.pointerEvents = "";
      }
      const scopeElement = (_i = (_h = (_g = (_f = (_e = (_d = instance.handleCloseOptions) == null ? void 0 : _d.getScope) == null ? void 0 : _e.call(_d)) != null ? _f : instance.pointerEventsScopeElement) != null ? _g : parentFloating) != null ? _h : ref.closest("[data-rootownerid]")) != null ? _i : doc.body;
      applySafePolygonPointerEventsMutation(instance, {
        scopeElement,
        referenceElement: ref,
        floatingElement: floatingEl
      });
      return () => {
        clearPointerEvents();
      };
    }
    return void 0;
  }, [enabled, open, domReferenceElement, floatingElement, instance, isHoverOpen, tree, parentId, clearPointerEvents]);
  const childClosedTimeout = useTimeout();
  React9.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    function onFloatingMouseEnter() {
      instance.openChangeTimeout.clear();
      childClosedTimeout.clear();
      tree == null ? void 0 : tree.events.off("floating.closed", onNodeClosed);
      clearPointerEvents();
    }
    function onFloatingMouseLeave(event) {
      if (tree && parentId && getNodeChildren(tree.nodesRef.current, parentId).length > 0) {
        tree.events.on("floating.closed", onNodeClosed);
        return;
      }
      if (isRelatedTargetInsideEnabledTrigger(event.relatedTarget)) {
        return;
      }
      if (instance.handler) {
        instance.handler(event);
        return;
      }
      clearPointerEvents();
      if (!isClickLikeOpenEvent2()) {
        closeWithDelay(event);
      }
    }
    function onNodeClosed(event) {
      if (!tree || !parentId || getNodeChildren(tree.nodesRef.current, parentId).length > 0) {
        return;
      }
      childClosedTimeout.start(0, () => {
        tree.events.off("floating.closed", onNodeClosed);
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
        tree.events.emit("floating.closed", event);
      });
    }
    const floating = floatingElement;
    if (floating) {
      floating.addEventListener("mouseenter", onFloatingMouseEnter);
      floating.addEventListener("mouseleave", onFloatingMouseLeave);
      floating.addEventListener("pointerdown", handleInteractInside, true);
    }
    return () => {
      if (floating) {
        floating.removeEventListener("mouseenter", onFloatingMouseEnter);
        floating.removeEventListener("mouseleave", onFloatingMouseLeave);
        floating.removeEventListener("pointerdown", handleInteractInside, true);
      }
      tree == null ? void 0 : tree.events.off("floating.closed", onNodeClosed);
    };
  }, [enabled, floatingElement, store, dataRef, isClickLikeOpenEvent2, isRelatedTargetInsideEnabledTrigger, closeWithDelay, clearPointerEvents, handleInteractInside, instance, tree, parentId, childClosedTimeout]);
}
var EMPTY_REF = {
  current: null
};
function useHoverReferenceInteraction(context, props = {}) {
  var _a;
  const store = "rootStore" in context ? context.rootStore : context;
  const {
    dataRef,
    events
  } = store.context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true,
    triggerElementRef = EMPTY_REF,
    externalTree,
    isActiveTrigger = true,
    getHandleCloseContext
  } = props;
  const tree = useFloatingTree(externalTree);
  const instance = useHoverInteractionSharedState(store);
  const handleCloseRef = useValueAsRef(handleClose);
  const delayRef = useValueAsRef(delay);
  const restMsRef = useValueAsRef(restMs);
  const enabledRef = useValueAsRef(enabled);
  if (isActiveTrigger) {
    instance.handleCloseOptions = (_a = handleCloseRef.current) == null ? void 0 : _a.__options;
  }
  const isClickLikeOpenEvent2 = useStableCallback(() => {
    var _a2;
    return isClickLikeOpenEvent((_a2 = dataRef.current.openEvent) == null ? void 0 : _a2.type, instance.interactedInside);
  });
  const isRelatedTargetInsideEnabledTrigger = useStableCallback((target) => {
    return isTargetInsideEnabledTrigger(target, store.context.triggerElements);
  });
  const isOverInactiveTrigger = useStableCallback((currentDomReference, currentTarget, target) => {
    const allTriggers = store.context.triggerElements;
    if (allTriggers.hasElement(currentTarget)) {
      return !currentDomReference || !contains(currentDomReference, currentTarget);
    }
    if (!isElement(target)) {
      return false;
    }
    const targetElement = target;
    return allTriggers.hasMatchingElement((trigger) => contains(trigger, targetElement)) && (!currentDomReference || !contains(currentDomReference, targetElement));
  });
  const closeWithDelay = React9.useCallback((event, runElseBranch = true) => {
    const closeDelay = getDelay(delayRef.current, "close", instance.pointerType);
    if (closeDelay) {
      instance.openChangeTimeout.start(closeDelay, () => {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
        tree == null ? void 0 : tree.events.emit("floating.closed", event);
      });
    } else if (runElseBranch) {
      instance.openChangeTimeout.clear();
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
      tree == null ? void 0 : tree.events.emit("floating.closed", event);
    }
  }, [delayRef, store, instance, tree]);
  const cleanupMouseMoveHandler = useStableCallback(() => {
    if (!instance.handler) {
      return;
    }
    const doc = ownerDocument(store.select("domReferenceElement"));
    doc.removeEventListener("mousemove", instance.handler);
    instance.handler = void 0;
  });
  React9.useEffect(() => cleanupMouseMoveHandler, [cleanupMouseMoveHandler]);
  const clearPointerEvents = useStableCallback(() => {
    clearSafePolygonPointerEventsMutation(instance);
  });
  React9.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    function onOpenChangeLocal(details) {
      if (!details.open) {
        cleanupMouseMoveHandler();
        instance.openChangeTimeout.clear();
        instance.restTimeout.clear();
        instance.blockMouseMove = true;
        instance.restTimeoutPending = false;
      }
    }
    events.on("openchange", onOpenChangeLocal);
    return () => {
      events.off("openchange", onOpenChangeLocal);
    };
  }, [enabled, events, instance, cleanupMouseMoveHandler]);
  React9.useEffect(() => {
    var _a2;
    if (!enabled) {
      return void 0;
    }
    const trigger = (_a2 = triggerElementRef.current) != null ? _a2 : isActiveTrigger ? store.select("domReferenceElement") : null;
    if (!isElement(trigger)) {
      return void 0;
    }
    function onMouseEnter(event) {
      var _a3;
      instance.openChangeTimeout.clear();
      instance.blockMouseMove = false;
      if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) {
        return;
      }
      const restMsValue = getRestMs(restMsRef.current);
      if (restMsValue > 0 && !getDelay(delayRef.current, "open")) {
        return;
      }
      const openDelay = getDelay(delayRef.current, "open", instance.pointerType);
      const triggerNode = (_a3 = event.currentTarget) != null ? _a3 : null;
      const currentDomReference = store.select("domReferenceElement");
      const isOverInactive = triggerNode == null ? false : isOverInactiveTrigger(currentDomReference, triggerNode, event.target);
      const isOpen = store.select("open");
      const shouldOpen = !isOpen || isOverInactive;
      if (isOverInactive && isOpen) {
        store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, event, triggerNode));
      } else if (openDelay) {
        instance.openChangeTimeout.start(openDelay, () => {
          if (shouldOpen) {
            store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, event, triggerNode));
          }
        });
      } else if (shouldOpen) {
        store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, event, triggerNode));
      }
    }
    function onMouseLeave(event) {
      var _a3;
      if (isClickLikeOpenEvent2()) {
        clearPointerEvents();
        return;
      }
      cleanupMouseMoveHandler();
      const domReferenceElement = store.select("domReferenceElement");
      const doc = ownerDocument(domReferenceElement);
      instance.restTimeout.clear();
      instance.restTimeoutPending = false;
      const handleCloseContextBase = (_a3 = dataRef.current.floatingContext) != null ? _a3 : getHandleCloseContext == null ? void 0 : getHandleCloseContext();
      const ignoreRelatedTargetTrigger = isRelatedTargetInsideEnabledTrigger(event.relatedTarget);
      if (ignoreRelatedTargetTrigger) {
        return;
      }
      if (handleCloseRef.current && handleCloseContextBase) {
        if (!store.select("open")) {
          instance.openChangeTimeout.clear();
        }
        const currentTrigger = triggerElementRef.current;
        instance.handler = handleCloseRef.current(__spreadProps(__spreadValues({}, handleCloseContextBase), {
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            if (enabledRef.current && !isClickLikeOpenEvent2() && currentTrigger === store.select("domReferenceElement")) {
              closeWithDelay(event, true);
            }
          }
        }));
        doc.addEventListener("mousemove", instance.handler);
        instance.handler(event);
        return;
      }
      const shouldClose = instance.pointerType === "touch" ? !contains(store.select("floatingElement"), event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }
    if (move) {
      trigger.addEventListener("mousemove", onMouseEnter, {
        once: true
      });
    }
    trigger.addEventListener("mouseenter", onMouseEnter);
    trigger.addEventListener("mouseleave", onMouseLeave);
    return () => {
      if (move) {
        trigger.removeEventListener("mousemove", onMouseEnter);
      }
      trigger.removeEventListener("mouseenter", onMouseEnter);
      trigger.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cleanupMouseMoveHandler, clearPointerEvents, dataRef, delayRef, closeWithDelay, store, enabled, handleCloseRef, instance, isActiveTrigger, isOverInactiveTrigger, isClickLikeOpenEvent2, isRelatedTargetInsideEnabledTrigger, mouseOnly, move, restMsRef, triggerElementRef, tree, enabledRef, getHandleCloseContext]);
  return React9.useMemo(() => {
    if (!enabled) {
      return void 0;
    }
    function setPointerRef(event) {
      instance.pointerType = event.pointerType;
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const {
          nativeEvent
        } = event;
        const trigger = event.currentTarget;
        const currentDomReference = store.select("domReferenceElement");
        const currentOpen = store.select("open");
        const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target);
        if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) {
          return;
        }
        const restMsValue = getRestMs(restMsRef.current);
        if (currentOpen && !isOverInactive || restMsValue === 0) {
          return;
        }
        if (!isOverInactive && instance.restTimeoutPending && event.movementX ** 2 + event.movementY ** 2 < 2) {
          return;
        }
        instance.restTimeout.clear();
        function handleMouseMove() {
          instance.restTimeoutPending = false;
          if (isClickLikeOpenEvent2()) {
            return;
          }
          const latestOpen = store.select("open");
          if (!instance.blockMouseMove && (!latestOpen || isOverInactive)) {
            store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, nativeEvent, trigger));
          }
        }
        if (instance.pointerType === "touch") {
          ReactDOM.flushSync(() => {
            handleMouseMove();
          });
        } else if (isOverInactive && currentOpen) {
          handleMouseMove();
        } else {
          instance.restTimeoutPending = true;
          instance.restTimeout.start(restMsValue, handleMouseMove);
        }
      }
    };
  }, [enabled, instance, isClickLikeOpenEvent2, isOverInactiveTrigger, mouseOnly, store, restMsRef]);
}
function useInteractions(propsList = []) {
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const triggerDeps = propsList.map((key) => key == null ? void 0 : key.trigger);
  const getReferenceProps = React9.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = React9.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = React9.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  const getTriggerProps = React9.useCallback(
    (userProps) => mergeProps(userProps, propsList, "trigger"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    triggerDeps
  );
  return React9.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    getTriggerProps
  }), [getReferenceProps, getFloatingProps, getItemProps, getTriggerProps]);
}
function mergeProps(userProps, propsList, elementKey) {
  var _a;
  const eventHandlers = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  const outputProps = {};
  if (elementKey === "floating") {
    outputProps.tabIndex = -1;
    outputProps[FOCUSABLE_ATTRIBUTE] = "";
  }
  for (const key in userProps) {
    if (isItem && userProps) {
      if (key === ACTIVE_KEY || key === SELECTED_KEY) {
        continue;
      }
    }
    outputProps[key] = userProps[key];
  }
  for (let i = 0; i < propsList.length; i += 1) {
    let props;
    const propsOrGetProps = (_a = propsList[i]) == null ? void 0 : _a[elementKey];
    if (typeof propsOrGetProps === "function") {
      props = userProps ? propsOrGetProps(userProps) : null;
    } else {
      props = propsOrGetProps;
    }
    if (!props) {
      continue;
    }
    mutablyMergeProps(outputProps, props, isItem, eventHandlers);
  }
  mutablyMergeProps(outputProps, userProps, isItem, eventHandlers);
  return outputProps;
}
function mutablyMergeProps(outputProps, props, isItem, eventHandlers) {
  var _a;
  for (const key in props) {
    const value = props[key];
    if (isItem && (key === ACTIVE_KEY || key === SELECTED_KEY)) {
      continue;
    }
    if (!key.startsWith("on")) {
      outputProps[key] = value;
    } else {
      if (!eventHandlers.has(key)) {
        eventHandlers.set(key, []);
      }
      if (typeof value === "function") {
        (_a = eventHandlers.get(key)) == null ? void 0 : _a.push(value);
        outputProps[key] = (...args) => {
          var _a2;
          return (_a2 = eventHandlers.get(key)) == null ? void 0 : _a2.map((fn) => fn(...args)).find((val) => val !== void 0);
        };
      }
    }
  }
}
var ESCAPE = "Escape";
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  if (orientation === "both" || orientation === "horizontal" && cols && cols > 1) {
    return key === ESCAPE;
  }
  return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const floatingElement = store.useState("floatingElement");
  const domReferenceElement = store.useState("domReferenceElement");
  const dataRef = store.context.dataRef;
  const {
    listRef,
    activeIndex,
    onNavigate: onNavigateProp = () => {
    },
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loopFocus = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    parentOrientation,
    cols = 1,
    id,
    resetOnPointerLeave = true,
    externalTree
  } = props;
  if (process.env.NODE_ENV !== "production") {
    if (allowEscape) {
      if (!loopFocus) {
        console.warn("`useListNavigation` looping must be enabled to allow escaping.");
      }
      if (!virtual) {
        console.warn("`useListNavigation` must be virtual to allow escaping.");
      }
    }
    if (orientation === "vertical" && cols > 1) {
      console.warn("In grid list navigation mode (`cols` > 1), the `orientation` should", 'be either "horizontal" or "both".');
    }
  }
  const floatingFocusElement = getFloatingFocusElement(floatingElement);
  const floatingFocusElementRef = useValueAsRef(floatingFocusElement);
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree(externalTree);
  useIsoLayoutEffect(() => {
    dataRef.current.orientation = orientation;
  }, [dataRef, orientation]);
  const typeableComboboxReference = isTypeableCombobox(domReferenceElement);
  const focusItemOnOpenRef = React9.useRef(focusItemOnOpen);
  const indexRef = React9.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = React9.useRef(null);
  const isPointerModalityRef = React9.useRef(true);
  const onNavigate = useStableCallback((event) => {
    onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
  });
  const previousOnNavigateRef = React9.useRef(onNavigate);
  const previousMountedRef = React9.useRef(!!floatingElement);
  const previousOpenRef = React9.useRef(open);
  const forceSyncFocusRef = React9.useRef(false);
  const forceScrollIntoViewRef = React9.useRef(false);
  const disabledIndicesRef = useValueAsRef(disabledIndices);
  const latestOpenRef = useValueAsRef(open);
  const selectedIndexRef = useValueAsRef(selectedIndex);
  const resetOnPointerLeaveRef = useValueAsRef(resetOnPointerLeave);
  const focusItem = useStableCallback(() => {
    function runFocus(item2) {
      if (virtual) {
        tree == null ? void 0 : tree.events.emit("virtualfocus", item2);
      } else {
        enqueueFocus(item2, {
          sync: forceSyncFocusRef.current,
          preventScroll: true
        });
      }
    }
    const initialItem = listRef.current[indexRef.current];
    const forceScrollIntoView = forceScrollIntoViewRef.current;
    if (initialItem) {
      runFocus(initialItem);
    }
    const scheduler = forceSyncFocusRef.current ? (v) => v() : requestAnimationFrame;
    scheduler(() => {
      var _a;
      const waitedItem = listRef.current[indexRef.current] || initialItem;
      if (!waitedItem) {
        return;
      }
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const shouldScrollIntoView = (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        item && (forceScrollIntoView || !isPointerModalityRef.current)
      );
      if (shouldScrollIntoView) {
        (_a = waitedItem.scrollIntoView) == null ? void 0 : _a.call(waitedItem, {
          block: "nearest",
          inline: "nearest"
        });
      }
    });
  });
  useIsoLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (open && floatingElement) {
      indexRef.current = selectedIndex != null ? selectedIndex : -1;
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true;
        onNavigate();
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1;
      previousOnNavigateRef.current();
    }
  }, [enabled, open, floatingElement, selectedIndex, onNavigate]);
  useIsoLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (!open) {
      forceSyncFocusRef.current = false;
      return;
    }
    if (!floatingElement) {
      return;
    }
    if (activeIndex == null) {
      forceSyncFocusRef.current = false;
      if (selectedIndexRef.current != null) {
        return;
      }
      if (previousMountedRef.current) {
        indexRef.current = -1;
        focusItem();
      }
      if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
        let runs = 0;
        const waitForListPopulated = () => {
          if (listRef.current[0] == null) {
            if (runs < 2) {
              const scheduler = runs ? requestAnimationFrame : queueMicrotask;
              scheduler(waitForListPopulated);
            }
            runs += 1;
          } else {
            indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinListIndex(listRef) : getMaxListIndex(listRef);
            keyRef.current = null;
            onNavigate();
          }
        };
        waitForListPopulated();
      }
    } else if (!isIndexOutOfListBounds(listRef, activeIndex)) {
      indexRef.current = activeIndex;
      focusItem();
      forceScrollIntoViewRef.current = false;
    }
  }, [enabled, open, floatingElement, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
  useIsoLayoutEffect(() => {
    var _a, _b;
    if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_b = (_a = nodes.find((node) => node.id === parentId)) == null ? void 0 : _a.context) == null ? void 0 : _b.elements.floating;
    const activeEl = activeElement(ownerDocument(floatingElement));
    const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, floatingElement, tree, parentId, virtual]);
  useIsoLayoutEffect(() => {
    previousOnNavigateRef.current = onNavigate;
    previousOpenRef.current = open;
    previousMountedRef.current = !!floatingElement;
  });
  useIsoLayoutEffect(() => {
    if (!open) {
      keyRef.current = null;
      focusItemOnOpenRef.current = focusItemOnOpen;
    }
  }, [open, focusItemOnOpen]);
  const hasActiveIndex = activeIndex != null;
  const item = React9.useMemo(() => {
    function syncCurrentTarget(event) {
      if (!latestOpenRef.current) {
        return;
      }
      const index2 = listRef.current.indexOf(event.currentTarget);
      if (index2 !== -1 && indexRef.current !== index2) {
        indexRef.current = index2;
        onNavigate(event);
      }
    }
    const itemProps = {
      onFocus(event) {
        forceSyncFocusRef.current = true;
        syncCurrentTarget(event);
      },
      onClick: ({
        currentTarget
      }) => currentTarget.focus({
        preventScroll: true
      }),
      // Safari
      onMouseMove(event) {
        forceSyncFocusRef.current = true;
        forceScrollIntoViewRef.current = false;
        if (focusItemOnHover) {
          syncCurrentTarget(event);
        }
      },
      onPointerLeave(event) {
        if (!latestOpenRef.current || !isPointerModalityRef.current || event.pointerType === "touch") {
          return;
        }
        forceSyncFocusRef.current = true;
        const relatedTarget = event.relatedTarget;
        if (!focusItemOnHover || listRef.current.includes(relatedTarget)) {
          return;
        }
        if (!resetOnPointerLeaveRef.current) {
          return;
        }
        enqueueFocus(null, {
          sync: true
        });
        indexRef.current = -1;
        onNavigate(event);
        if (!virtual) {
          const floatingFocusEl = floatingFocusElementRef.current;
          const activeEl = activeElement(ownerDocument(floatingFocusEl));
          if (floatingFocusEl && contains(floatingFocusEl, activeEl)) {
            floatingFocusEl.focus({
              preventScroll: true
            });
          }
        }
      }
    };
    return itemProps;
  }, [latestOpenRef, floatingFocusElementRef, focusItemOnHover, listRef, onNavigate, resetOnPointerLeaveRef, virtual]);
  const getParentOrientation = React9.useCallback(() => {
    var _a, _b, _c;
    return parentOrientation != null ? parentOrientation : (_c = (_b = (_a = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.id === parentId)) == null ? void 0 : _a.context) == null ? void 0 : _b.dataRef) == null ? void 0 : _c.current.orientation;
  }, [parentId, tree, parentOrientation]);
  const commonOnKeyDown = useStableCallback((event) => {
    isPointerModalityRef.current = false;
    forceSyncFocusRef.current = true;
    if (event.which === 229) {
      return;
    }
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
      if (!isMainOrientationKey(event.key, getParentOrientation())) {
        stopEvent(event);
      }
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent));
      if (isHTMLElement(domReferenceElement)) {
        if (virtual) {
          tree == null ? void 0 : tree.events.emit("virtualfocus", domReferenceElement);
        } else {
          domReferenceElement.focus();
        }
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinListIndex(listRef, disabledIndices);
    const maxIndex = getMaxListIndex(listRef, disabledIndices);
    if (!typeableComboboxReference) {
      if (event.key === "Home") {
        stopEvent(event);
        indexRef.current = minIndex;
        onNavigate(event);
      }
      if (event.key === "End") {
        stopEvent(event);
        indexRef.current = maxIndex;
        onNavigate(event);
      }
    }
    if (cols > 1) {
      const sizes = Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = createGridCellMap(sizes, cols, false);
      const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isListIndexDisabled(listRef, index3, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isListIndexDisabled(listRef, index3, disabledIndices) ? cellIndex : foundIndex, -1);
      const index2 = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loopFocus,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getGridCellIndices([...(typeof disabledIndices !== "function" ? disabledIndices : null) || listRef.current.map((_, listIndex) => isListIndexDisabled(listRef, listIndex, disabledIndices) ? listIndex : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getGridCellIndexOfCorner(
          indexRef.current > maxIndex ? minIndex : indexRef.current,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction
          // we're moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          // eslint-disable-next-line no-nested-ternary
          event.key === ARROW_DOWN ? "bl" : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? "tr" : "tl"
        ),
        stopEvent: true
      })];
      if (index2 != null) {
        indexRef.current = index2;
        onNavigate(event);
      }
      if (orientation === "both") {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event);
      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(event);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loopFocus) {
          if (currentIndex >= maxIndex) {
            if (allowEscape && currentIndex !== listRef.current.length) {
              indexRef.current = -1;
            } else {
              forceSyncFocusRef.current = false;
              indexRef.current = minIndex;
            }
          } else {
            indexRef.current = findNonDisabledListIndex(listRef, {
              startingIndex: currentIndex,
              disabledIndices
            });
          }
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else if (loopFocus) {
        if (currentIndex <= minIndex) {
          if (allowEscape && currentIndex !== -1) {
            indexRef.current = listRef.current.length;
          } else {
            forceSyncFocusRef.current = false;
            indexRef.current = maxIndex;
          }
        } else {
          indexRef.current = findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        }
      } else {
        indexRef.current = Math.max(minIndex, findNonDisabledListIndex(listRef, {
          startingIndex: currentIndex,
          decrement: true,
          disabledIndices
        }));
      }
      if (isIndexOutOfListBounds(listRef, indexRef.current)) {
        indexRef.current = -1;
      }
      onNavigate(event);
    }
  });
  const ariaActiveDescendantProp = React9.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      "aria-activedescendant": `${id}-${activeIndex}`
    };
  }, [virtual, open, hasActiveIndex, id, activeIndex]);
  const floating = React9.useMemo(() => {
    return __spreadProps(__spreadValues({
      "aria-orientation": orientation === "both" ? void 0 : orientation
    }, !typeableComboboxReference ? ariaActiveDescendantProp : {}), {
      onKeyDown(event) {
        if (event.key === "Tab" && event.shiftKey && open && !virtual) {
          const target = getTarget(event.nativeEvent);
          if (target && !contains(floatingFocusElementRef.current, target)) {
            return;
          }
          stopEvent(event);
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent));
          if (isHTMLElement(domReferenceElement)) {
            domReferenceElement.focus();
          }
          return;
        }
        commonOnKeyDown(event);
      },
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    });
  }, [ariaActiveDescendantProp, commonOnKeyDown, floatingFocusElementRef, orientation, typeableComboboxReference, store, open, virtual, domReferenceElement]);
  const trigger = React9.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
        focusItemOnOpenRef.current = !virtual;
      }
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      onKeyDown(event) {
        const currentOpen = store.select("open");
        isPointerModalityRef.current = false;
        const isArrowKey = event.key.startsWith("Arrow");
        const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
        if (virtual && currentOpen) {
          return commonOnKeyDown(event);
        }
        if (!currentOpen && !openOnArrowKeyDown && isArrowKey) {
          return void 0;
        }
        if (isNavigationKey) {
          const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
          keyRef.current = nested && isParentMainKey ? null : event.key;
        }
        if (nested) {
          if (isParentCrossOpenKey) {
            stopEvent(event);
            if (currentOpen) {
              indexRef.current = getMinListIndex(listRef, disabledIndicesRef.current);
              onNavigate(event);
            } else {
              store.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent, event.currentTarget));
            }
          }
          return void 0;
        }
        if (isMainKey) {
          if (selectedIndexRef.current != null) {
            indexRef.current = selectedIndexRef.current;
          }
          stopEvent(event);
          if (!currentOpen && openOnArrowKeyDown) {
            store.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent, event.currentTarget));
          } else {
            commonOnKeyDown(event);
          }
          if (currentOpen) {
            onNavigate(event);
          }
        }
        return void 0;
      },
      onFocus(event) {
        if (store.select("open") && !virtual) {
          indexRef.current = -1;
          onNavigate(event);
        }
      },
      onPointerDown: checkVirtualPointer,
      onPointerEnter: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, store, openOnArrowKeyDown, orientation, getParentOrientation, rtl, selectedIndexRef, virtual]);
  const reference = React9.useMemo(() => {
    return __spreadValues(__spreadValues({}, ariaActiveDescendantProp), trigger);
  }, [ariaActiveDescendantProp, trigger]);
  return React9.useMemo(() => enabled ? {
    reference,
    floating,
    item,
    trigger
  } : {}, [enabled, reference, floating, trigger, item]);
}
var componentRoleToAriaRoleMap = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", false]]);
function useRole(context, props = {}) {
  var _a;
  const store = "rootStore" in context ? context.rootStore : context;
  const open = store.useState("open");
  const defaultFloatingId = store.useState("floatingId");
  const domReference = store.useState("domReferenceElement");
  const floatingElement = store.useState("floatingElement");
  const {
    role = "dialog"
  } = props;
  const defaultReferenceId = useId();
  const referenceId = (domReference == null ? void 0 : domReference.id) || defaultReferenceId;
  const floatingId = React9.useMemo(() => {
    var _a2;
    return ((_a2 = getFloatingFocusElement(floatingElement)) == null ? void 0 : _a2.id) || defaultFloatingId;
  }, [floatingElement, defaultFloatingId]);
  const ariaRole = (_a = componentRoleToAriaRoleMap.get(role)) != null ? _a : role;
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;
  const trigger = React9.useMemo(() => {
    if (ariaRole === "tooltip" || role === "label") {
      return EMPTY_OBJECT;
    }
    return __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
      "aria-expanded": "false"
    }, ariaRole === "listbox" && {
      role: "combobox"
    }), ariaRole === "menu" && isNested && {
      role: "menuitem"
    }), role === "select" && {
      "aria-autocomplete": "none"
    }), role === "combobox" && {
      "aria-autocomplete": "list"
    });
  }, [ariaRole, isNested, role]);
  const reference = React9.useMemo(() => {
    if (ariaRole === "tooltip" || role === "label") {
      return {
        [`aria-${role === "label" ? "labelledby" : "describedby"}`]: open ? floatingId : void 0
      };
    }
    const triggerProps = trigger;
    return __spreadValues(__spreadProps(__spreadValues({}, triggerProps), {
      "aria-expanded": open ? "true" : "false",
      "aria-controls": open ? floatingId : void 0
    }), ariaRole === "menu" && {
      id: referenceId
    });
  }, [ariaRole, floatingId, open, referenceId, role, trigger]);
  const floating = React9.useMemo(() => {
    const floatingProps = __spreadValues({
      id: floatingId
    }, ariaRole && {
      role: ariaRole
    });
    if (ariaRole === "tooltip" || role === "label") {
      return floatingProps;
    }
    return __spreadValues(__spreadValues({}, floatingProps), ariaRole === "menu" && {
      "aria-labelledby": referenceId
    });
  }, [ariaRole, floatingId, referenceId, role]);
  const item = React9.useCallback(({
    active,
    selected
  }) => {
    const commonProps = __spreadValues({
      role: "option"
    }, active && {
      id: `${floatingId}-fui-option`
    });
    switch (role) {
      case "select":
      case "combobox":
        return __spreadProps(__spreadValues({}, commonProps), {
          "aria-selected": selected
        });
    }
    return {};
  }, [floatingId, role]);
  return React9.useMemo(() => ({
    reference,
    floating,
    item,
    trigger
  }), [reference, floating, trigger, item]);
}
function useTypeahead(context, props) {
  var _a;
  const store = "rootStore" in context ? context.rootStore : context;
  const dataRef = store.context.dataRef;
  const open = store.useState("open");
  const {
    listRef,
    elementsRef,
    activeIndex,
    onMatch: onMatchProp,
    onTypingChange,
    enabled = true,
    resetMs = 750,
    selectedIndex = null
  } = props;
  const timeout = useTimeout();
  const stringRef = React9.useRef("");
  const prevIndexRef = React9.useRef((_a = selectedIndex != null ? selectedIndex : activeIndex) != null ? _a : -1);
  const matchIndexRef = React9.useRef(null);
  useIsoLayoutEffect(() => {
    if (!open && selectedIndex !== null) {
      return;
    }
    timeout.clear();
    matchIndexRef.current = null;
    if (stringRef.current !== "") {
      stringRef.current = "";
    }
  }, [open, selectedIndex, timeout]);
  useIsoLayoutEffect(() => {
    var _a2;
    if (open && stringRef.current === "") {
      prevIndexRef.current = (_a2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _a2 : -1;
    }
  }, [open, selectedIndex, activeIndex]);
  const setTypingChange = useStableCallback((value) => {
    if (value) {
      if (!dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange == null ? void 0 : onTypingChange(value);
      }
    } else if (dataRef.current.typing) {
      dataRef.current.typing = value;
      onTypingChange == null ? void 0 : onTypingChange(value);
    }
  });
  const onKeyDown = useStableCallback((event) => {
    var _a2, _b;
    function isVisible(index3) {
      const element = elementsRef == null ? void 0 : elementsRef.current[index3];
      return !element || isElementVisible(element);
    }
    function getMatchingIndex(list, string, startIndex2 = 0) {
      if (list.length === 0) {
        return -1;
      }
      const normalizedStartIndex = (startIndex2 % list.length + list.length) % list.length;
      const lowerString = string.toLocaleLowerCase();
      for (let offset4 = 0; offset4 < list.length; offset4 += 1) {
        const index3 = (normalizedStartIndex + offset4) % list.length;
        const text = list[index3];
        if (!(text == null ? void 0 : text.toLocaleLowerCase().startsWith(lowerString)) || !isVisible(index3)) {
          continue;
        }
        return index3;
      }
      return -1;
    }
    const listContent = listRef.current;
    if (stringRef.current.length > 0 && event.key === " ") {
      stopEvent(event);
      setTypingChange(true);
    }
    if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
      if (getMatchingIndex(listContent, stringRef.current) === -1 && event.key !== " ") {
        setTypingChange(false);
      }
    }
    if (listContent == null || // Character key.
    event.key.length !== 1 || // Modifier key.
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (open && event.key !== " ") {
      stopEvent(event);
      setTypingChange(true);
    }
    const isNewSession = stringRef.current === "";
    if (isNewSession) {
      prevIndexRef.current = (_a2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _a2 : -1;
    }
    const allowRapidSuccessionOfFirstLetter = listContent.every((text) => {
      var _a3, _b2;
      return text ? ((_a3 = text[0]) == null ? void 0 : _a3.toLocaleLowerCase()) !== ((_b2 = text[1]) == null ? void 0 : _b2.toLocaleLowerCase()) : true;
    });
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    timeout.start(resetMs, () => {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
      setTypingChange(false);
    });
    const prevIndex = isNewSession ? (_b = selectedIndex != null ? selectedIndex : activeIndex) != null ? _b : -1 : prevIndexRef.current;
    const startIndex = (prevIndex != null ? prevIndex : 0) + 1;
    const index2 = getMatchingIndex(listContent, stringRef.current, startIndex);
    if (index2 !== -1) {
      onMatchProp == null ? void 0 : onMatchProp(index2);
      matchIndexRef.current = index2;
    } else if (event.key !== " ") {
      stringRef.current = "";
      setTypingChange(false);
    }
  });
  const onBlur = useStableCallback((event) => {
    const next = event.relatedTarget;
    const currentDomReferenceElement = store.select("domReferenceElement");
    const currentFloatingElement = store.select("floatingElement");
    const withinReference = contains(currentDomReferenceElement, next);
    const withinFloating = contains(currentFloatingElement, next);
    if (withinReference || withinFloating) {
      return;
    }
    timeout.clear();
    stringRef.current = "";
    prevIndexRef.current = matchIndexRef.current;
    setTypingChange(false);
  });
  const reference = React9.useMemo(() => ({
    onKeyDown,
    onBlur
  }), [onKeyDown, onBlur]);
  const floating = React9.useMemo(() => {
    return {
      onKeyDown,
      onBlur
    };
  }, [onKeyDown, onBlur]);
  return React9.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/safePolygon.js
var CURSOR_SPEED_THRESHOLD = 0.1;
var CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD;
var POLYGON_BUFFER = 0.5;
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
  return yi >= pointY !== yj >= pointY && pointX <= (xj - xi) * (pointY - yi) / (yj - yi) + xi;
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
  let isInsideValue = false;
  if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) {
    isInsideValue = !isInsideValue;
  }
  return isInsideValue;
}
function isInsideRect(pointX, pointY, rect) {
  return pointX >= rect.x && pointX <= rect.x + rect.width && pointY >= rect.y && pointY <= rect.y + rect.height;
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  return pointX >= minX && pointX <= maxX && pointY >= minY && pointY <= maxY;
}
function safePolygon(options = {}) {
  const {
    blockPointerEvents = false
  } = options;
  const timeout = new Timeout();
  const fn = ({
    x,
    y,
    placement,
    elements,
    onClose,
    nodeId,
    tree
  }) => {
    const side = placement == null ? void 0 : placement.split("-")[0];
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
    function isCursorMovingSlowly(nextX, nextY) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastCursorTime;
      if (lastX === null || lastY === null || elapsedTime === 0) {
        lastX = nextX;
        lastY = nextY;
        lastCursorTime = currentTime;
        return false;
      }
      const deltaX = nextX - lastX;
      const deltaY = nextY - lastY;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;
      const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED;
      lastX = nextX;
      lastY = nextY;
      lastCursorTime = currentTime;
      return distanceSquared < thresholdSquared;
    }
    function close() {
      timeout.clear();
      onClose();
    }
    return function onMouseMove(event) {
      timeout.clear();
      const domReference = elements.domReference;
      const floating = elements.floating;
      if (!domReference || !floating || side == null || x == null || y == null) {
        return void 0;
      }
      const {
        clientX,
        clientY
      } = event;
      const target = getTarget(event);
      const isLeave = event.type === "mouseleave";
      const isOverFloatingEl = contains(floating, target);
      const isOverReferenceEl = contains(domReference, target);
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return void 0;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
        if (!isLeave) {
          hasLanded = true;
          return void 0;
        }
      }
      if (isLeave && isElement(event.relatedTarget) && contains(floating, event.relatedTarget)) {
        return void 0;
      }
      function hasOpenChildNode() {
        return Boolean(tree && getNodeChildren(tree.nodesRef.current, nodeId).length > 0);
      }
      function closeIfNoOpenChild() {
        if (!hasOpenChildNode()) {
          close();
        }
      }
      if (hasOpenChildNode()) {
        return void 0;
      }
      const refRect = domReference.getBoundingClientRect();
      const rect = floating.getBoundingClientRect();
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;
      if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
        closeIfNoOpenChild();
        return void 0;
      }
      let isInsideTroughRect = false;
      switch (side) {
        case "top":
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, refRect.top + 1, right, rect.bottom - 1);
          break;
        case "bottom":
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, rect.top + 1, right, refRect.bottom - 1);
          break;
        case "left":
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, rect.right - 1, bottom, refRect.left + 1, top);
          break;
        case "right":
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, refRect.right - 1, bottom, rect.left + 1, top);
          break;
      }
      if (isInsideTroughRect) {
        return void 0;
      }
      if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
        closeIfNoOpenChild();
        return void 0;
      }
      if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
        closeIfNoOpenChild();
        return void 0;
      }
      let isInsidePolygon = false;
      switch (side) {
        case "top": {
          const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
          const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
          const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
          const cursorPointY = y + POLYGON_BUFFER + 1;
          const commonYLeft = cursorLeaveFromRight ? rect.bottom - POLYGON_BUFFER : isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top;
          const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top : rect.bottom - POLYGON_BUFFER;
          isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
          break;
        }
        case "bottom": {
          const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
          const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
          const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
          const cursorPointY = y - POLYGON_BUFFER;
          const commonYLeft = cursorLeaveFromRight ? rect.top + POLYGON_BUFFER : isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom;
          const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom : rect.top + POLYGON_BUFFER;
          isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
          break;
        }
        case "left": {
          const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
          const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
          const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
          const cursorPointX = x + POLYGON_BUFFER + 1;
          const commonXTop = cursorLeaveFromBottom ? rect.right - POLYGON_BUFFER : isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left;
          const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left : rect.right - POLYGON_BUFFER;
          isInsidePolygon = isPointInQuadrilateral(clientX, clientY, commonXTop, rect.top, commonXBottom, rect.bottom, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY);
          break;
        }
        case "right": {
          const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
          const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
          const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
          const cursorPointX = x - POLYGON_BUFFER;
          const commonXTop = cursorLeaveFromBottom ? rect.left + POLYGON_BUFFER : isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right;
          const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right : rect.left + POLYGON_BUFFER;
          isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY, commonXTop, rect.top, commonXBottom, rect.bottom);
          break;
        }
      }
      if (!isInsidePolygon) {
        closeIfNoOpenChild();
      } else if (!hasLanded) {
        timeout.start(40, closeIfNoOpenChild);
      }
      return void 0;
    };
  };
  fn.__options = {
    blockPointerEvents
  };
  return fn;
}
function useFloating2(options = {}) {
  const {
    nodeId,
    externalTree
  } = options;
  const internalRootStore = useFloatingRootContext(options);
  const rootContext = options.rootContext || internalRootStore;
  const rootContextElements = {
    reference: rootContext.useState("referenceElement"),
    floating: rootContext.useState("floatingElement"),
    domReference: rootContext.useState("domReferenceElement")
  };
  const [positionReference, setPositionReferenceRaw] = React9.useState(null);
  const domReferenceRef = React9.useRef(null);
  const tree = useFloatingTree(externalTree);
  useIsoLayoutEffect(() => {
    if (rootContextElements.domReference) {
      domReferenceRef.current = rootContextElements.domReference;
    }
  }, [rootContextElements.domReference]);
  const position = useFloating(__spreadProps(__spreadValues({}, options), {
    elements: __spreadValues(__spreadValues({}, rootContextElements), positionReference && {
      reference: positionReference
    })
  }));
  const setPositionReference = React9.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      getClientRects: () => node.getClientRects(),
      contextElement: node
    } : node;
    setPositionReferenceRaw(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const [localDomReference, setLocalDomReference] = React9.useState(null);
  const [localFloatingElement, setLocalFloatingElement] = React9.useState(null);
  rootContext.useSyncedValue("referenceElement", localDomReference);
  rootContext.useSyncedValue("domReferenceElement", isElement(localDomReference) ? localDomReference : null);
  rootContext.useSyncedValue("floatingElement", localFloatingElement);
  const setReference = React9.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setLocalDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs, setLocalDomReference]);
  const setFloating = React9.useCallback((node) => {
    setLocalFloatingElement(node);
    position.refs.setFloating(node);
  }, [position.refs]);
  const refs = React9.useMemo(() => __spreadProps(__spreadValues({}, position.refs), {
    setReference,
    setFloating,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setFloating, setPositionReference]);
  const elements = React9.useMemo(() => __spreadProps(__spreadValues({}, position.elements), {
    domReference: rootContextElements.domReference
  }), [position.elements, rootContextElements.domReference]);
  const open = rootContext.useState("open");
  const floatingId = rootContext.useState("floatingId");
  const context = React9.useMemo(() => __spreadProps(__spreadValues({}, position), {
    dataRef: rootContext.context.dataRef,
    open,
    onOpenChange: rootContext.setOpen,
    events: rootContext.context.events,
    floatingId,
    refs,
    elements,
    nodeId,
    rootStore: rootContext
  }), [position, refs, elements, nodeId, rootContext, open, floatingId]);
  useIsoLayoutEffect(() => {
    rootContext.context.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React9.useMemo(() => __spreadProps(__spreadValues({}, position), {
    context,
    refs,
    elements,
    rootStore: rootContext
  }), [position, refs, elements, context, rootContext]);
}

// ../../node_modules/@base-ui/react/esm/utils/popupStateMapping.js
var CommonPopupDataAttributes = (function(CommonPopupDataAttributes2) {
  CommonPopupDataAttributes2["open"] = "data-open";
  CommonPopupDataAttributes2["closed"] = "data-closed";
  CommonPopupDataAttributes2[CommonPopupDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  CommonPopupDataAttributes2[CommonPopupDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  CommonPopupDataAttributes2["anchorHidden"] = "data-anchor-hidden";
  CommonPopupDataAttributes2["side"] = "data-side";
  CommonPopupDataAttributes2["align"] = "data-align";
  return CommonPopupDataAttributes2;
})({});
var CommonTriggerDataAttributes = /* @__PURE__ */ (function(CommonTriggerDataAttributes2) {
  CommonTriggerDataAttributes2["popupOpen"] = "data-popup-open";
  CommonTriggerDataAttributes2["pressed"] = "data-pressed";
  return CommonTriggerDataAttributes2;
})({});
var TRIGGER_HOOK = {
  [CommonTriggerDataAttributes.popupOpen]: ""
};
var PRESSABLE_TRIGGER_HOOK = {
  [CommonTriggerDataAttributes.popupOpen]: "",
  [CommonTriggerDataAttributes.pressed]: ""
};
var POPUP_OPEN_HOOK = {
  [CommonPopupDataAttributes.open]: ""
};
var POPUP_CLOSED_HOOK = {
  [CommonPopupDataAttributes.closed]: ""
};
var ANCHOR_HIDDEN_HOOK = {
  [CommonPopupDataAttributes.anchorHidden]: ""
};
var triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return TRIGGER_HOOK;
    }
    return null;
  }
};
var pressableTriggerOpenStateMapping = {
  open(value) {
    if (value) {
      return PRESSABLE_TRIGGER_HOOK;
    }
    return null;
  }
};
var popupStateMapping = {
  open(value) {
    if (value) {
      return POPUP_OPEN_HOOK;
    }
    return POPUP_CLOSED_HOOK;
  },
  anchorHidden(value) {
    if (value) {
      return ANCHOR_HIDDEN_HOOK;
    }
    return null;
  }
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.4.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
*/

export { CommonPopupDataAttributes, CommonTriggerDataAttributes, FloatingDelayGroup, FloatingFocusManager, FloatingNode, FloatingPortal, FloatingRootStore, FloatingTree, FloatingTreeStore, FocusGuard, PopupTriggerMap, ReactStore, Store, autoUpdate, createSelector2 as createSelector, fastComponent, fastComponentRef, flip3 as flip, getNextTabbable, getTabbableAfterElement, getTabbableBeforeElement, hide3 as hide, isOutsideEvent, limitShift3 as limitShift, offset3 as offset, platform, popupStateMapping, pressableTriggerOpenStateMapping, safePolygon, shift3 as shift, size3 as size, triggerOpenStateMapping, useClick, useClientPoint, useDelayGroup, useDismiss, useFloating2 as useFloating, useFloatingNodeId, useFloatingParentNodeId, useFloatingPortalNode, useFloatingRootContext, useFloatingTree, useFocus, useHoverFloatingInteraction, useHoverReferenceInteraction, useInteractions, useListNavigation, useRole, useStore, useSyncedFloatingRootContext, useTypeahead };
//# sourceMappingURL=chunk-PSMHWWS3.mjs.map
//# sourceMappingURL=chunk-PSMHWWS3.mjs.map