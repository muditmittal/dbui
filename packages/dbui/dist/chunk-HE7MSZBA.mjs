import { useCompositeListItem } from './chunk-SDWHTCRY.mjs';
import { useCompositeRootContext } from './chunk-ETMT7VCK.mjs';
import { useMergedRefs } from './chunk-I44XWQG6.mjs';
import * as React from 'react';

function useCompositeItem(params = {}) {
  const {
    highlightItemOnHover,
    highlightedIndex,
    onHighlightedIndexChange
  } = useCompositeRootContext();
  const {
    ref,
    index
  } = useCompositeListItem(params);
  const isHighlighted = highlightedIndex === index;
  const itemRef = React.useRef(null);
  const mergedRef = useMergedRefs(ref, itemRef);
  const compositeProps = React.useMemo(() => ({
    tabIndex: isHighlighted ? 0 : -1,
    onFocus() {
      onHighlightedIndexChange(index);
    },
    onMouseMove() {
      const item = itemRef.current;
      if (!highlightItemOnHover || !item) {
        return;
      }
      const disabled = item.hasAttribute("disabled") || item.ariaDisabled === "true";
      if (!isHighlighted && !disabled) {
        item.focus();
      }
    }
  }), [isHighlighted, onHighlightedIndexChange, index, highlightItemOnHover]);
  return {
    compositeProps,
    compositeRef: mergedRef,
    index
  };
}

export { useCompositeItem };
//# sourceMappingURL=chunk-HE7MSZBA.mjs.map
//# sourceMappingURL=chunk-HE7MSZBA.mjs.map