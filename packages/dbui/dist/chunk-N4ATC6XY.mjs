import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import * as React from 'react';

function useValueChanged(value, onChange) {
  const valueRef = React.useRef(value);
  const onChangeCallback = useStableCallback(onChange);
  useIsoLayoutEffect(() => {
    if (valueRef.current === value) {
      return;
    }
    onChangeCallback(valueRef.current);
  }, [value, onChangeCallback]);
  useIsoLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
}

export { useValueChanged };
//# sourceMappingURL=chunk-N4ATC6XY.mjs.map
//# sourceMappingURL=chunk-N4ATC6XY.mjs.map