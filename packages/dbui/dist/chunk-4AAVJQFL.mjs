import { Timeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { isIOS, isWebKit } from './chunk-BO7ZMLYZ.mjs';
import { AnimationFrame } from './chunk-KJU32T43.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { getWindow, isOverflowElement } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { NOOP } from './chunk-I44XWQG6.mjs';
import { __publicField, __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/utils/esm/useScrollLock.js
var originalHtmlStyles = {};
var originalBodyStyles = {};
var originalHtmlScrollBehavior = "";
function hasInsetScrollbars(referenceElement) {
  if (typeof document === "undefined") {
    return false;
  }
  const doc = ownerDocument(referenceElement);
  const win = getWindow(doc);
  return win.innerWidth - doc.documentElement.clientWidth > 0;
}
function supportsStableScrollbarGutter(referenceElement) {
  const supported = typeof CSS !== "undefined" && CSS.supports && CSS.supports("scrollbar-gutter", "stable");
  if (!supported || typeof document === "undefined") {
    return false;
  }
  const doc = ownerDocument(referenceElement);
  const html = doc.documentElement;
  const body = doc.body;
  const scrollContainer = isOverflowElement(html) ? html : body;
  const originalScrollContainerOverflowY = scrollContainer.style.overflowY;
  const originalHtmlStyleGutter = html.style.scrollbarGutter;
  html.style.scrollbarGutter = "stable";
  scrollContainer.style.overflowY = "scroll";
  const before = scrollContainer.offsetWidth;
  scrollContainer.style.overflowY = "hidden";
  const after = scrollContainer.offsetWidth;
  scrollContainer.style.overflowY = originalScrollContainerOverflowY;
  html.style.scrollbarGutter = originalHtmlStyleGutter;
  return before === after;
}
function preventScrollOverlayScrollbars(referenceElement) {
  const doc = ownerDocument(referenceElement);
  const html = doc.documentElement;
  const body = doc.body;
  const elementToLock = isOverflowElement(html) ? html : body;
  const originalElementToLockStyles = {
    overflowY: elementToLock.style.overflowY,
    overflowX: elementToLock.style.overflowX
  };
  Object.assign(elementToLock.style, {
    overflowY: "hidden",
    overflowX: "hidden"
  });
  return () => {
    Object.assign(elementToLock.style, originalElementToLockStyles);
  };
}
function preventScrollInsetScrollbars(referenceElement) {
  var _a, _b;
  const doc = ownerDocument(referenceElement);
  const html = doc.documentElement;
  const body = doc.body;
  const win = getWindow(html);
  let scrollTop = 0;
  let scrollLeft = 0;
  let updateGutterOnly = false;
  const resizeFrame = AnimationFrame.create();
  if (isWebKit && ((_b = (_a = win.visualViewport) == null ? void 0 : _a.scale) != null ? _b : 1) !== 1) {
    return () => {
    };
  }
  function lockScroll() {
    const htmlStyles = win.getComputedStyle(html);
    const bodyStyles = win.getComputedStyle(body);
    const htmlScrollbarGutterValue = htmlStyles.scrollbarGutter || "";
    const hasBothEdges = htmlScrollbarGutterValue.includes("both-edges");
    const scrollbarGutterValue = hasBothEdges ? "stable both-edges" : "stable";
    scrollTop = html.scrollTop;
    scrollLeft = html.scrollLeft;
    originalHtmlStyles = {
      scrollbarGutter: html.style.scrollbarGutter,
      overflowY: html.style.overflowY,
      overflowX: html.style.overflowX
    };
    originalHtmlScrollBehavior = html.style.scrollBehavior;
    originalBodyStyles = {
      position: body.style.position,
      height: body.style.height,
      width: body.style.width,
      boxSizing: body.style.boxSizing,
      overflowY: body.style.overflowY,
      overflowX: body.style.overflowX,
      scrollBehavior: body.style.scrollBehavior
    };
    const isScrollableY = html.scrollHeight > html.clientHeight;
    const isScrollableX = html.scrollWidth > html.clientWidth;
    const hasConstantOverflowY = htmlStyles.overflowY === "scroll" || bodyStyles.overflowY === "scroll";
    const hasConstantOverflowX = htmlStyles.overflowX === "scroll" || bodyStyles.overflowX === "scroll";
    const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth);
    const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight);
    const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
    const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
    const elementToLock = isOverflowElement(html) ? html : body;
    updateGutterOnly = supportsStableScrollbarGutter(referenceElement);
    if (updateGutterOnly) {
      html.style.scrollbarGutter = scrollbarGutterValue;
      elementToLock.style.overflowY = "hidden";
      elementToLock.style.overflowX = "hidden";
      return;
    }
    Object.assign(html.style, {
      scrollbarGutter: scrollbarGutterValue,
      overflowY: "hidden",
      overflowX: "hidden"
    });
    if (isScrollableY || hasConstantOverflowY) {
      html.style.overflowY = "scroll";
    }
    if (isScrollableX || hasConstantOverflowX) {
      html.style.overflowX = "scroll";
    }
    Object.assign(body.style, {
      position: "relative",
      height: marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : "100dvh",
      width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : "100vw",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollBehavior: "unset"
    });
    body.scrollTop = scrollTop;
    body.scrollLeft = scrollLeft;
    html.setAttribute("data-base-ui-scroll-locked", "");
    html.style.scrollBehavior = "unset";
  }
  function cleanup() {
    Object.assign(html.style, originalHtmlStyles);
    Object.assign(body.style, originalBodyStyles);
    if (!updateGutterOnly) {
      html.scrollTop = scrollTop;
      html.scrollLeft = scrollLeft;
      html.removeAttribute("data-base-ui-scroll-locked");
      html.style.scrollBehavior = originalHtmlScrollBehavior;
    }
  }
  function handleResize() {
    cleanup();
    resizeFrame.request(lockScroll);
  }
  lockScroll();
  win.addEventListener("resize", handleResize);
  return () => {
    resizeFrame.cancel();
    cleanup();
    if (typeof win.removeEventListener === "function") {
      win.removeEventListener("resize", handleResize);
    }
  };
}
var ScrollLocker = class {
  constructor() {
    __publicField(this, "lockCount", 0);
    __publicField(this, "restore", null);
    __publicField(this, "timeoutLock", Timeout.create());
    __publicField(this, "timeoutUnlock", Timeout.create());
    __publicField(this, "release", () => {
      this.lockCount -= 1;
      if (this.lockCount === 0 && this.restore) {
        this.timeoutUnlock.start(0, this.unlock);
      }
    });
    __publicField(this, "unlock", () => {
      var _a;
      if (this.lockCount === 0 && this.restore) {
        (_a = this.restore) == null ? void 0 : _a.call(this);
        this.restore = null;
      }
    });
  }
  acquire(referenceElement) {
    this.lockCount += 1;
    if (this.lockCount === 1 && this.restore === null) {
      this.timeoutLock.start(0, () => this.lock(referenceElement));
    }
    return this.release;
  }
  lock(referenceElement) {
    if (this.lockCount === 0 || this.restore !== null) {
      return;
    }
    const doc = ownerDocument(referenceElement);
    const html = doc.documentElement;
    const htmlOverflowY = getWindow(html).getComputedStyle(html).overflowY;
    if (htmlOverflowY === "hidden" || htmlOverflowY === "clip") {
      this.restore = NOOP;
      return;
    }
    const hasOverlayScrollbars = isIOS || !hasInsetScrollbars(referenceElement);
    this.restore = hasOverlayScrollbars ? preventScrollOverlayScrollbars(referenceElement) : preventScrollInsetScrollbars(referenceElement);
  }
};
var SCROLL_LOCKER = new ScrollLocker();
function useScrollLock(enabled = true, referenceElement = null) {
  useIsoLayoutEffect(() => {
    if (!enabled) {
      return void 0;
    }
    return SCROLL_LOCKER.acquire(referenceElement);
  }, [enabled, referenceElement]);
}
function useEnhancedClickHandler(handler) {
  const lastClickInteractionTypeRef = React.useRef("");
  const handlePointerDown = React.useCallback((event) => {
    if (event.defaultPrevented) {
      return;
    }
    lastClickInteractionTypeRef.current = event.pointerType;
    handler(event, event.pointerType);
  }, [handler]);
  const handleClick = React.useCallback((event) => {
    if (event.detail === 0) {
      handler(event, "keyboard");
      return;
    }
    if ("pointerType" in event) {
      handler(event, event.pointerType);
    } else {
      handler(event, lastClickInteractionTypeRef.current);
    }
    lastClickInteractionTypeRef.current = "";
  }, [handler]);
  return {
    onClick: handleClick,
    onPointerDown: handlePointerDown
  };
}

// ../../node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js
function useOpenInteractionType(open) {
  const [openMethod, setOpenMethod] = React.useState(null);
  const handleTriggerClick = useStableCallback((_, interactionType) => {
    if (!open) {
      setOpenMethod(interactionType || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
      // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
      // will be "" in that case.
      (isIOS ? "touch" : ""));
    }
  });
  useValueChanged(open, (previousOpen) => {
    if (previousOpen && !open) {
      setOpenMethod(null);
    }
  });
  const {
    onClick,
    onPointerDown
  } = useEnhancedClickHandler(handleTriggerClick);
  return React.useMemo(() => ({
    openMethod,
    triggerProps: {
      onClick,
      onPointerDown
    }
  }), [openMethod, onClick, onPointerDown]);
}
var InternalBackdrop = /* @__PURE__ */ React.forwardRef(function InternalBackdrop2(props, ref) {
  const _a = props, {
    cutout
  } = _a, otherProps = __objRest(_a, [
    "cutout"
  ]);
  let clipPath;
  if (cutout) {
    const rect = cutout == null ? void 0 : cutout.getBoundingClientRect();
    clipPath = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${rect.left}px ${rect.top}px,
      ${rect.left}px ${rect.bottom}px,
      ${rect.right}px ${rect.bottom}px,
      ${rect.right}px ${rect.top}px,
      ${rect.left}px ${rect.top}px
    )`;
  }
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
    ref,
    role: "presentation",
    "data-base-ui-inert": ""
  }, otherProps), {
    style: {
      position: "fixed",
      inset: 0,
      userSelect: "none",
      WebkitUserSelect: "none",
      clipPath
    }
  }));
});
if (process.env.NODE_ENV !== "production") InternalBackdrop.displayName = "InternalBackdrop";

export { InternalBackdrop, useOpenInteractionType, useScrollLock };
//# sourceMappingURL=chunk-4AAVJQFL.mjs.map
//# sourceMappingURL=chunk-4AAVJQFL.mjs.map