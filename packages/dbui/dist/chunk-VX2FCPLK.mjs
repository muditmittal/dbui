import { useRenderElement } from './chunk-I44XWQG6.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';
import * as React from 'react';

var Separator = /* @__PURE__ */ React.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    orientation = "horizontal"
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "orientation"
  ]);
  const state = {
    orientation
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "separator",
      "aria-orientation": orientation
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") Separator.displayName = "Separator";

export { Separator };
//# sourceMappingURL=chunk-VX2FCPLK.mjs.map
//# sourceMappingURL=chunk-VX2FCPLK.mjs.map