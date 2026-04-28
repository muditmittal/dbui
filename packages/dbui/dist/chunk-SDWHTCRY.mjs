import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import * as React2 from 'react';

var CompositeListContext = /* @__PURE__ */ React2.createContext({
  register: () => {
  },
  unregister: () => {
  },
  subscribeMapChange: () => {
    return () => {
    };
  },
  elementsRef: {
    current: []
  },
  nextIndexRef: {
    current: 0
  }
});
if (process.env.NODE_ENV !== "production") CompositeListContext.displayName = "CompositeListContext";
function useCompositeListContext() {
  return React2.useContext(CompositeListContext);
}

// ../../node_modules/@base-ui/react/esm/composite/list/useCompositeListItem.js
var IndexGuessBehavior = /* @__PURE__ */ (function(IndexGuessBehavior2) {
  IndexGuessBehavior2[IndexGuessBehavior2["None"] = 0] = "None";
  IndexGuessBehavior2[IndexGuessBehavior2["GuessFromOrder"] = 1] = "GuessFromOrder";
  return IndexGuessBehavior2;
})({});
function useCompositeListItem(params = {}) {
  const {
    label,
    metadata,
    textRef,
    indexGuessBehavior,
    index: externalIndex
  } = params;
  const {
    register,
    unregister,
    subscribeMapChange,
    elementsRef,
    labelsRef,
    nextIndexRef
  } = useCompositeListContext();
  const indexRef = React2.useRef(-1);
  const [index, setIndex] = React2.useState(externalIndex != null ? externalIndex : indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? () => {
    if (indexRef.current === -1) {
      const newIndex = nextIndexRef.current;
      nextIndexRef.current += 1;
      indexRef.current = newIndex;
    }
    return indexRef.current;
  } : -1);
  const componentRef = React2.useRef(null);
  const ref = React2.useCallback((node) => {
    var _a, _b;
    componentRef.current = node;
    if (index !== -1 && node !== null) {
      elementsRef.current[index] = node;
      if (labelsRef) {
        const isLabelDefined = label !== void 0;
        labelsRef.current[index] = isLabelDefined ? label : (_b = (_a = textRef == null ? void 0 : textRef.current) == null ? void 0 : _a.textContent) != null ? _b : node.textContent;
      }
    }
  }, [index, elementsRef, labelsRef, label, textRef]);
  useIsoLayoutEffect(() => {
    if (externalIndex != null) {
      return void 0;
    }
    const node = componentRef.current;
    if (node) {
      register(node, metadata);
      return () => {
        unregister(node);
      };
    }
    return void 0;
  }, [externalIndex, register, unregister, metadata]);
  useIsoLayoutEffect(() => {
    if (externalIndex != null) {
      return void 0;
    }
    return subscribeMapChange((map) => {
      var _a;
      const i = componentRef.current ? (_a = map.get(componentRef.current)) == null ? void 0 : _a.index : null;
      if (i != null) {
        setIndex(i);
      }
    });
  }, [externalIndex, subscribeMapChange, setIndex]);
  return React2.useMemo(() => ({
    ref,
    index
  }), [index, ref]);
}

export { CompositeListContext, IndexGuessBehavior, useCompositeListItem };
//# sourceMappingURL=chunk-SDWHTCRY.mjs.map
//# sourceMappingURL=chunk-SDWHTCRY.mjs.map