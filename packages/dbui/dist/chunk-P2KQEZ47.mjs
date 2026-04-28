import * as React from 'react';

var FieldItemContext = /* @__PURE__ */ React.createContext({
  disabled: false
});
if (process.env.NODE_ENV !== "production") FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
  const context = React.useContext(FieldItemContext);
  return context;
}

export { FieldItemContext, useFieldItemContext };
//# sourceMappingURL=chunk-P2KQEZ47.mjs.map
//# sourceMappingURL=chunk-P2KQEZ47.mjs.map