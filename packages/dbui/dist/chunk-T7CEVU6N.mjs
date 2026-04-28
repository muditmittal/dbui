import { formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

var ToolbarRootContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") ToolbarRootContext.displayName = "ToolbarRootContext";
function useToolbarRootContext(optional) {
  const context = React.useContext(ToolbarRootContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>." : formatErrorMessage_default(69));
  }
  return context;
}

export { useToolbarRootContext };
//# sourceMappingURL=chunk-T7CEVU6N.mjs.map
//# sourceMappingURL=chunk-T7CEVU6N.mjs.map