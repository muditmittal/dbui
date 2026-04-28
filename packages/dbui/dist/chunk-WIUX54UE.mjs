import { SafeReact } from './chunk-6PGNYKRT.mjs';
import * as React from 'react';

var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
var maybeReactUseId = SafeReact.useId;
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : prefix ? `${prefix}-${reactId}` : reactId;
  }
  return useGlobalId(idOverride, prefix);
}

// ../../node_modules/@base-ui/react/esm/utils/useBaseUiId.js
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui");
}

export { useBaseUiId, useId };
//# sourceMappingURL=chunk-WIUX54UE.mjs.map
//# sourceMappingURL=chunk-WIUX54UE.mjs.map