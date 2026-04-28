import { useCompositeItem } from './chunk-HE7MSZBA.mjs';
import { EMPTY_OBJECT, EMPTY_ARRAY, useRenderElement } from './chunk-I44XWQG6.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';

// ../../node_modules/@base-ui/react/esm/composite/item/CompositeItem.js
function CompositeItem(componentProps) {
  const _a = componentProps, {
    render,
    className,
    state = EMPTY_OBJECT,
    props = EMPTY_ARRAY,
    refs = EMPTY_ARRAY,
    metadata,
    stateAttributesMapping,
    tag = "div"
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "state",
    "props",
    "refs",
    "metadata",
    "stateAttributesMapping",
    "tag"
  ]);
  const {
    compositeProps,
    compositeRef
  } = useCompositeItem({
    metadata
  });
  return useRenderElement(tag, componentProps, {
    state,
    ref: [...refs, compositeRef],
    props: [compositeProps, ...props, elementProps],
    stateAttributesMapping
  });
}

export { CompositeItem };
//# sourceMappingURL=chunk-TM5TEJGH.mjs.map
//# sourceMappingURL=chunk-TM5TEJGH.mjs.map