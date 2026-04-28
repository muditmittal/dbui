import { CompositeItem } from './chunk-TM5TEJGH.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { error } from './chunk-T3HTT7SQ.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

var ToggleGroupContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") ToggleGroupContext.displayName = "ToggleGroupContext";
function useToggleGroupContext(optional = true) {
  const context = React.useContext(ToggleGroupContext);
  if (context === void 0 && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ToggleGroupContext is missing. ToggleGroup parts must be placed within <ToggleGroup>." : formatErrorMessage_default(7));
  }
  return context;
}
var Toggle = /* @__PURE__ */ React.forwardRef(function Toggle2(componentProps, forwardedRef) {
  var _b, _c;
  const _a = componentProps, {
    className,
    defaultPressed: defaultPressedProp = false,
    disabled: disabledProp = false,
    form,
    onPressedChange: onPressedChangeProp,
    pressed: pressedProp,
    render,
    type,
    value: valueProp,
    nativeButton = true
  } = _a, elementProps = __objRest(_a, [
    "className",
    "defaultPressed",
    "disabled",
    "form",
    // never participates in form validation
    "onPressedChange",
    "pressed",
    "render",
    "type",
    // cannot change button type
    "value",
    "nativeButton"
  ]);
  const value = useBaseUiId(valueProp || void 0);
  const groupContext = useToggleGroupContext();
  const groupValue = (_b = groupContext == null ? void 0 : groupContext.value) != null ? _b : [];
  const defaultPressed = groupContext ? void 0 : defaultPressedProp;
  const disabled = (_c = disabledProp || (groupContext == null ? void 0 : groupContext.disabled)) != null ? _c : false;
  if (process.env.NODE_ENV !== "production") {
    useIsoLayoutEffect(() => {
      if (groupContext && valueProp === void 0 && groupContext.isValueInitialized) {
        error("A `<Toggle>` component rendered in a `<ToggleGroup>` has no explicit `value` prop.", "This will cause issues between the Toggle Group and Toggle values.", "Provide the `<Toggle>` with a `value` prop matching the `<ToggleGroup>` values prop type.");
      }
    }, [groupContext, valueProp, groupContext == null ? void 0 : groupContext.isValueInitialized]);
  }
  const [pressed, setPressedState] = useControlled({
    controlled: groupContext ? value !== void 0 && groupValue.indexOf(value) > -1 : pressedProp,
    default: defaultPressed,
    name: "Toggle",
    state: "pressed"
  });
  const onPressedChange = useStableCallback((nextPressed, eventDetails) => {
    var _a2;
    if (value) {
      (_a2 = groupContext == null ? void 0 : groupContext.setGroupValue) == null ? void 0 : _a2.call(groupContext, value, nextPressed, eventDetails);
    }
    onPressedChangeProp == null ? void 0 : onPressedChangeProp(nextPressed, eventDetails);
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const state = {
    disabled,
    pressed
  };
  const refs = [buttonRef, forwardedRef];
  const props = [{
    "aria-pressed": pressed,
    onClick(event) {
      const nextPressed = !pressed;
      const details = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
      onPressedChange(nextPressed, details);
      if (details.isCanceled) {
        return;
      }
      setPressedState(nextPressed);
    }
  }, elementProps, getButtonProps];
  const element = useRenderElement("button", componentProps, {
    enabled: !groupContext,
    state,
    ref: refs,
    props
  });
  if (groupContext) {
    return /* @__PURE__ */ jsx(CompositeItem, {
      tag: "button",
      render,
      className,
      state,
      refs,
      props
    });
  }
  return element;
});
if (process.env.NODE_ENV !== "production") Toggle.displayName = "Toggle";

export { Toggle, ToggleGroupContext };
//# sourceMappingURL=chunk-XSEYRSXR.mjs.map
//# sourceMappingURL=chunk-XSEYRSXR.mjs.map