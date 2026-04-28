import * as React from 'react';

var DirectionContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") DirectionContext.displayName = "DirectionContext";
function useDirection() {
  var _a;
  const context = React.useContext(DirectionContext);
  return (_a = context == null ? void 0 : context.direction) != null ? _a : "ltr";
}

export { DirectionContext, useDirection };
//# sourceMappingURL=chunk-NNBMTHBT.mjs.map
//# sourceMappingURL=chunk-NNBMTHBT.mjs.map