import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRefWithInit } from './chunk-I44XWQG6.mjs';

// ../../node_modules/@base-ui/utils/esm/useValueAsRef.js
function useValueAsRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current;
  latest.next = value;
  useIsoLayoutEffect(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}

export { useValueAsRef };
//# sourceMappingURL=chunk-RAYLQUWY.mjs.map
//# sourceMappingURL=chunk-RAYLQUWY.mjs.map