import { formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

var CheckboxGroupContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
  const context = React.useContext(CheckboxGroupContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>." : formatErrorMessage_default(3));
  }
  return context;
}

export { useCheckboxGroupContext };
//# sourceMappingURL=chunk-4ZECPVCA.mjs.map
//# sourceMappingURL=chunk-4ZECPVCA.mjs.map