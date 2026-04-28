import * as React from 'react';

function useOnFirstRender(fn) {
  const ref = React.useRef(true);
  if (ref.current) {
    ref.current = false;
    fn();
  }
}

export { useOnFirstRender };
//# sourceMappingURL=chunk-SVF7A3EA.mjs.map
//# sourceMappingURL=chunk-SVF7A3EA.mjs.map