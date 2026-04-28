import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';

// ../../node_modules/@base-ui/react/esm/utils/useRegisteredLabelId.js
function useRegisteredLabelId(idProp, setLabelId) {
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(void 0);
    };
  }, [id, setLabelId]);
  return id;
}

export { useRegisteredLabelId };
//# sourceMappingURL=chunk-PL3VOM4K.mjs.map
//# sourceMappingURL=chunk-PL3VOM4K.mjs.map