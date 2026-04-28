import { useRegisteredLabelId } from './chunk-PL3VOM4K.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { getTarget } from './chunk-FQ4RTFU7.mjs';
import { useLabelableContext } from './chunk-HRT42H6K.mjs';
import { isHTMLElement } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';

// ../../node_modules/@base-ui/react/esm/labelable-provider/useLabel.js
function useLabel(params = {}) {
  const {
    id: idProp,
    fallbackControlId,
    native = false,
    setLabelId: setLabelIdProp,
    focusControl: focusControlProp
  } = params;
  const {
    controlId: contextControlId,
    setLabelId: setContextLabelId
  } = useLabelableContext();
  const syncLabelId = useStableCallback((nextLabelId) => {
    setContextLabelId(nextLabelId);
    setLabelIdProp == null ? void 0 : setLabelIdProp(nextLabelId);
  });
  const id = useRegisteredLabelId(idProp, syncLabelId);
  const resolvedControlId = contextControlId != null ? contextControlId : fallbackControlId;
  function focusControl(event) {
    if (focusControlProp) {
      focusControlProp(event, resolvedControlId);
      return;
    }
    if (!resolvedControlId) {
      return;
    }
    const controlElement = ownerDocument(event.currentTarget).getElementById(resolvedControlId);
    if (isHTMLElement(controlElement)) {
      focusElementWithVisible(controlElement);
    }
  }
  function handleInteraction(event) {
    const target = getTarget(event.nativeEvent);
    if (target == null ? void 0 : target.closest("button,input,select,textarea")) {
      return;
    }
    if (!event.defaultPrevented && event.detail > 1) {
      event.preventDefault();
    }
    if (native) {
      return;
    }
    focusControl(event);
  }
  return native ? {
    id,
    htmlFor: resolvedControlId != null ? resolvedControlId : void 0,
    onMouseDown: handleInteraction
  } : {
    id,
    onClick: handleInteraction,
    onPointerDown(event) {
      event.preventDefault();
    }
  };
}
function focusElementWithVisible(element) {
  element.focus({
    // Available from Chrome 144+ (January 2026).
    // Safari and Firefox already support it.
    // @ts-expect-error not available in types yet
    focusVisible: true
  });
}

export { focusElementWithVisible, useLabel };
//# sourceMappingURL=chunk-KY5XN6YG.mjs.map
//# sourceMappingURL=chunk-KY5XN6YG.mjs.map