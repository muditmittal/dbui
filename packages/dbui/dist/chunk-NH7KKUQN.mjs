import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import * as React from 'react';

function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
  var _a;
  const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = React.useState();
  const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0);
  const ariaLabelledBy = (_a = explicitAriaLabelledBy != null ? explicitAriaLabelledBy : labelId) != null ? _a : fallbackAriaLabelledBy;
  useIsoLayoutEffect(() => {
    const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? void 0 : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
    if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
      setFallbackAriaLabelledBy(nextAriaLabelledBy);
    }
  });
  return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
  const label = findAssociatedLabel(labelSource);
  if (!label) {
    return void 0;
  }
  if (!label.id && generatedLabelId) {
    label.id = generatedLabelId;
  }
  return label.id || void 0;
}
function findAssociatedLabel(labelSource) {
  if (!labelSource) {
    return void 0;
  }
  const parent = labelSource.parentElement;
  if (parent && parent.tagName === "LABEL") {
    return parent;
  }
  const controlId = labelSource.id;
  if (controlId) {
    const nextSibling = labelSource.nextElementSibling;
    if (nextSibling && nextSibling.htmlFor === controlId) {
      return nextSibling;
    }
  }
  const labels = labelSource.labels;
  return labels && labels[0];
}

export { useAriaLabelledBy };
//# sourceMappingURL=chunk-NH7KKUQN.mjs.map
//# sourceMappingURL=chunk-NH7KKUQN.mjs.map