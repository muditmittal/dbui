import { useLabelableContext } from './chunk-HRT42H6K.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { isElement } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRefWithInit, NOOP } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

function useLabelableId(params = {}) {
  const {
    id,
    implicit = false,
    controlRef
  } = params;
  const {
    controlId,
    registerControlId
  } = useLabelableContext();
  const defaultId = useBaseUiId(id);
  const controlIdForEffect = implicit ? controlId : void 0;
  const controlSourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol("labelable-control"));
  const hasRegisteredRef = React.useRef(false);
  const hadExplicitIdRef = React.useRef(id != null);
  const unregisterControlId = useStableCallback(() => {
    if (!hasRegisteredRef.current || registerControlId === NOOP) {
      return;
    }
    hasRegisteredRef.current = false;
    registerControlId(controlSourceRef.current, void 0);
  });
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) {
      return void 0;
    }
    let nextId;
    if (implicit) {
      const elem = controlRef == null ? void 0 : controlRef.current;
      if (isElement(elem) && elem.closest("label") != null) {
        nextId = id != null ? id : null;
      } else {
        nextId = controlIdForEffect != null ? controlIdForEffect : defaultId;
      }
    } else if (id != null) {
      hadExplicitIdRef.current = true;
      nextId = id;
    } else if (hadExplicitIdRef.current) {
      nextId = defaultId;
    } else {
      unregisterControlId();
      return void 0;
    }
    if (nextId === void 0) {
      unregisterControlId();
      return void 0;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, nextId);
    return void 0;
  }, [id, controlRef, controlIdForEffect, registerControlId, implicit, defaultId, controlSourceRef, unregisterControlId]);
  React.useEffect(() => {
    return unregisterControlId;
  }, [unregisterControlId]);
  return controlId != null ? controlId : defaultId;
}

export { useLabelableId };
//# sourceMappingURL=chunk-2E5W2VBA.mjs.map
//# sourceMappingURL=chunk-2E5W2VBA.mjs.map