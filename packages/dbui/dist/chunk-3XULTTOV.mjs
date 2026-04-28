import { useRefWithInit } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

var useInsertionEffect = React[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)];
var useSafeInsertionEffect = (
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== React.useLayoutEffect ? useInsertionEffect : (fn) => fn()
);
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => {
      var _a;
      return (_a = stable.callback) == null ? void 0 : _a.call(stable, ...args);
    },
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (process.env.NODE_ENV !== "production") {
    throw (
      /* minify-error-disabled */
      new Error("Base UI: Cannot call an event handler while rendering.")
    );
  }
}

export { useStableCallback };
//# sourceMappingURL=chunk-3XULTTOV.mjs.map
//# sourceMappingURL=chunk-3XULTTOV.mjs.map