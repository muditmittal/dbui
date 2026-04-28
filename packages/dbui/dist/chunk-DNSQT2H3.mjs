import { useFloatingPortalNode } from './chunk-PSMHWWS3.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { jsxs } from 'react/jsx-runtime';

var FloatingPortalLite = /* @__PURE__ */ React.forwardRef(function FloatingPortalLite2(componentProps, forwardedRef) {
  const _a = componentProps, {
    children,
    container,
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "children",
    "container",
    "className",
    "render"
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
  if (!portalSubtree && !portalNode) {
    return null;
  }
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [portalSubtree, portalNode && /* @__PURE__ */ ReactDOM.createPortal(children, portalNode)]
  });
});
if (process.env.NODE_ENV !== "production") FloatingPortalLite.displayName = "FloatingPortalLite";

export { FloatingPortalLite };
//# sourceMappingURL=chunk-DNSQT2H3.mjs.map
//# sourceMappingURL=chunk-DNSQT2H3.mjs.map