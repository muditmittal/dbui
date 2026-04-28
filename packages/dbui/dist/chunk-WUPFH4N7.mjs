import * as React from 'react';

var CSPContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") CSPContext.displayName = "CSPContext";
var DEFAULT_CSP_CONTEXT_VALUE = {
  disableStyleElements: false
};
function useCSPContext() {
  var _a;
  return (_a = React.useContext(CSPContext)) != null ? _a : DEFAULT_CSP_CONTEXT_VALUE;
}

export { useCSPContext };
//# sourceMappingURL=chunk-WUPFH4N7.mjs.map
//# sourceMappingURL=chunk-WUPFH4N7.mjs.map