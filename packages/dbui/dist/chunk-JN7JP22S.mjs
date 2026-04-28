import { __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';

var Check = forwardRef(
  (_a, ref) => {
    var _b = _a, { className, size = 16 } = _b, props = __objRest(_b, ["className", "size"]);
    return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({ ref, className }, props), { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "m15.06 3.56-9.53 9.531L1 8.561 2.06 7.5l3.47 3.47L14 2.5z",
        clipRule: "evenodd"
      }
    ) }));
  }
);
Check.displayName = "Check";

// ../../node_modules/@base-ui/react/esm/utils/getPseudoElementBounds.js
function getPseudoElementBounds(element) {
  const elementRect = element.getBoundingClientRect();
  if (process.env.NODE_ENV !== "production") {
    return elementRect;
  }
  const beforeStyles = window.getComputedStyle(element, "::before");
  const afterStyles = window.getComputedStyle(element, "::after");
  const hasPseudoElements = beforeStyles.content !== "none" || afterStyles.content !== "none";
  if (!hasPseudoElements) {
    return elementRect;
  }
  const beforeWidth = parseFloat(beforeStyles.width) || 0;
  const beforeHeight = parseFloat(beforeStyles.height) || 0;
  const afterWidth = parseFloat(afterStyles.width) || 0;
  const afterHeight = parseFloat(afterStyles.height) || 0;
  const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth);
  const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight);
  const widthDiff = totalWidth - elementRect.width;
  const heightDiff = totalHeight - elementRect.height;
  return {
    left: elementRect.left - widthDiff / 2,
    right: elementRect.right + widthDiff / 2,
    top: elementRect.top - heightDiff / 2,
    bottom: elementRect.bottom + heightDiff / 2
  };
}

export { Check, getPseudoElementBounds };
//# sourceMappingURL=chunk-JN7JP22S.mjs.map
//# sourceMappingURL=chunk-JN7JP22S.mjs.map