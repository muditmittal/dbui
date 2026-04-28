import { TYPEABLE_SELECTOR, isJSDOM, FOCUSABLE_ATTRIBUTE } from './chunk-BO7ZMLYZ.mjs';
import { isShadowRoot, isElement, isHTMLElement } from './chunk-CL6E6FD3.mjs';

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js
function activeElement(doc) {
  var _a;
  let element = doc.activeElement;
  while (((_a = element == null ? void 0 : element.shadowRoot) == null ? void 0 : _a.activeElement) != null) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
function contains(parent, child) {
  var _a;
  if (!parent || !child) {
    return false;
  }
  const rootNode = (_a = child.getRootNode) == null ? void 0 : _a.call(child);
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function isTargetInsideEnabledTrigger(target, triggerElements) {
  if (!isElement(target)) {
    return false;
  }
  const targetElement = target;
  if (triggerElements.hasElement(targetElement)) {
    return !targetElement.hasAttribute("data-trigger-disabled");
  }
  for (const [, trigger] of triggerElements.entries()) {
    if (contains(trigger, targetElement)) {
      return !trigger.hasAttribute("data-trigger-disabled");
    }
  }
  return false;
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const eventAgain = event;
  return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
  return element.matches("html,body");
}
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}
function isTypeableCombobox(element) {
  if (!element) {
    return false;
  }
  return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
function matchesFocusVisible(element) {
  if (!element || isJSDOM) {
    return true;
  }
  try {
    return element.matches(":focus-visible");
  } catch (_e) {
    return true;
  }
}
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) {
    return null;
  }
  return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? floatingElement : floatingElement.querySelector(`[${FOCUSABLE_ATTRIBUTE}]`) || floatingElement;
}

export { activeElement, contains, getFloatingFocusElement, getTarget, isEventTargetWithin, isRootElement, isTargetInsideEnabledTrigger, isTypeableCombobox, isTypeableElement, matchesFocusVisible };
//# sourceMappingURL=chunk-FQ4RTFU7.mjs.map
//# sourceMappingURL=chunk-FQ4RTFU7.mjs.map