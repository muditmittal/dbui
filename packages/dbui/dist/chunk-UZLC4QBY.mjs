import { formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

var FieldsetRootContext = /* @__PURE__ */ React.createContext({
  legendId: void 0,
  setLegendId: () => {
  },
  disabled: void 0
});
if (process.env.NODE_ENV !== "production") FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
  const context = React.useContext(FieldsetRootContext);
  if (!context && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>." : formatErrorMessage_default(86));
  }
  return context;
}

export { useFieldsetRootContext };
//# sourceMappingURL=chunk-UZLC4QBY.mjs.map
//# sourceMappingURL=chunk-UZLC4QBY.mjs.map