import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useAriaLabelledBy } from './chunk-NH7KKUQN.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHiddenInput, visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { fieldValidityMapping, useFormContext, useFieldRootContext, useLabelableContext, useField } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useMergedRefs, mergeProps, EMPTY_OBJECT, useRenderElement, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/switch/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Root: () => SwitchRoot,
  Thumb: () => SwitchThumb
});
var SwitchRootContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SwitchRootContext.displayName = "SwitchRootContext";
function useSwitchRootContext() {
  const context = React2.useContext(SwitchRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>." : formatErrorMessage_default(63));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/switch/root/SwitchRootDataAttributes.js
var SwitchRootDataAttributes = /* @__PURE__ */ (function(SwitchRootDataAttributes2) {
  SwitchRootDataAttributes2["checked"] = "data-checked";
  SwitchRootDataAttributes2["unchecked"] = "data-unchecked";
  SwitchRootDataAttributes2["disabled"] = "data-disabled";
  SwitchRootDataAttributes2["readonly"] = "data-readonly";
  SwitchRootDataAttributes2["required"] = "data-required";
  SwitchRootDataAttributes2["valid"] = "data-valid";
  SwitchRootDataAttributes2["invalid"] = "data-invalid";
  SwitchRootDataAttributes2["touched"] = "data-touched";
  SwitchRootDataAttributes2["dirty"] = "data-dirty";
  SwitchRootDataAttributes2["filled"] = "data-filled";
  SwitchRootDataAttributes2["focused"] = "data-focused";
  return SwitchRootDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/switch/stateAttributesMapping.js
var stateAttributesMapping = __spreadProps(__spreadValues({}, fieldValidityMapping), {
  checked(value) {
    if (value) {
      return {
        [SwitchRootDataAttributes.checked]: ""
      };
    }
    return {
      [SwitchRootDataAttributes.unchecked]: ""
    };
  }
});
var SwitchRoot = /* @__PURE__ */ React2.forwardRef(function SwitchRoot2(componentProps, forwardedRef) {
  const _a = componentProps, {
    checked: checkedProp,
    className,
    defaultChecked,
    "aria-labelledby": ariaLabelledByProp,
    id: idProp,
    inputRef: externalInputRef,
    name: nameProp,
    nativeButton = false,
    onCheckedChange: onCheckedChangeProp,
    readOnly = false,
    required = false,
    disabled: disabledProp = false,
    render,
    uncheckedValue,
    value
  } = _a, elementProps = __objRest(_a, [
    "checked",
    "className",
    "defaultChecked",
    "aria-labelledby",
    "id",
    "inputRef",
    "name",
    "nativeButton",
    "onCheckedChange",
    "readOnly",
    "required",
    "disabled",
    "render",
    "uncheckedValue",
    "value"
  ]);
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    setTouched,
    setDirty,
    validityData,
    setFilled,
    setFocused,
    shouldValidateOnChange,
    validationMode,
    disabled: fieldDisabled,
    name: fieldName,
    validation
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const onCheckedChange = useStableCallback(onCheckedChangeProp);
  const inputRef = React2.useRef(null);
  const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef);
  const switchRef = React2.useRef(null);
  const id = useBaseUiId();
  const controlId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: switchRef
  });
  const hiddenInputId = nativeButton ? void 0 : controlId;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  useField({
    id,
    commit: validation.commit,
    value: checked,
    controlRef: switchRef,
    name,
    getValue: () => checked
  });
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      setFilled(inputRef.current.checked);
    }
  }, [inputRef, setFilled]);
  useValueChanged(checked, () => {
    clearErrors(name);
    setDirty(checked !== validityData.initialValue);
    setFilled(checked);
    if (shouldValidateOnChange()) {
      validation.commit(checked);
    } else {
      validation.commit(checked, true);
    }
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    id: nativeButton ? controlId : id,
    role: "switch",
    "aria-checked": checked,
    "aria-readonly": readOnly || void 0,
    "aria-required": required || void 0,
    "aria-labelledby": ariaLabelledBy,
    onFocus() {
      if (!disabled) {
        setFocused(true);
      }
    },
    onBlur() {
      const element2 = inputRef.current;
      if (!element2 || disabled) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(element2.checked);
      }
    },
    onClick(event) {
      var _a2;
      if (readOnly || disabled) {
        return;
      }
      event.preventDefault();
      (_a2 = inputRef.current) == null ? void 0 : _a2.dispatchEvent(new PointerEvent("click", {
        bubbles: true,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey
      }));
    }
  };
  const inputProps = React2.useMemo(() => mergeProps(
    {
      checked,
      disabled,
      id: hiddenInputId,
      name,
      required,
      style: name ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      type: "checkbox",
      "aria-hidden": true,
      ref: handleInputRef,
      onChange(event) {
        if (event.nativeEvent.defaultPrevented) {
          return;
        }
        const nextChecked = event.target.checked;
        const eventDetails = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
        onCheckedChange == null ? void 0 : onCheckedChange(nextChecked, eventDetails);
        if (eventDetails.isCanceled) {
          return;
        }
        setCheckedState(nextChecked);
      },
      onFocus() {
        var _a2;
        (_a2 = switchRef.current) == null ? void 0 : _a2.focus();
      }
    },
    validation.getInputValidationProps,
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    value !== void 0 ? {
      value
    } : EMPTY_OBJECT
  ), [checked, disabled, handleInputRef, hiddenInputId, name, onCheckedChange, required, setCheckedState, validation, value]);
  const state = React2.useMemo(() => __spreadProps(__spreadValues({}, fieldState), {
    checked,
    disabled,
    readOnly,
    required
  }), [fieldState, checked, disabled, readOnly, required]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, switchRef, buttonRef],
    props: [rootProps, validation.getValidationProps, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxs(SwitchRootContext.Provider, {
    value: state,
    children: [element, !checked && name && uncheckedValue !== void 0 && /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name,
      value: uncheckedValue
    }), /* @__PURE__ */ jsx("input", __spreadValues({}, inputProps))]
  });
});
if (process.env.NODE_ENV !== "production") SwitchRoot.displayName = "SwitchRoot";
var SwitchThumb = /* @__PURE__ */ React2.forwardRef(function SwitchThumb2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    state: fieldState
  } = useFieldRootContext();
  const state = useSwitchRootContext();
  const extendedState = __spreadValues(__spreadValues({}, fieldState), state);
  return useRenderElement("span", componentProps, {
    state: extendedState,
    ref: forwardedRef,
    stateAttributesMapping,
    props: elementProps
  });
});
if (process.env.NODE_ENV !== "production") SwitchThumb.displayName = "SwitchThumb";
function Switch(_a) {
  var _b = _a, {
    className,
    size = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus aria-invalid:border-destructive data-[size=default]:border data-[size=default]:border-transparent data-[size=default]:h-4 data-[size=default]:w-7 data-[size=sm]:h-3 data-[size=sm]:w-5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:shadow-xs data-checked:hover:bg-primary-hover data-checked:group-hover/field:bg-primary-hover data-checked:active:bg-primary-press data-unchecked:bg-input data-unchecked:hover:bg-hover data-unchecked:group-hover/field:bg-hover data-unchecked:hover:border-primary-hover data-unchecked:group-hover/field:border-primary-hover data-unchecked:active:bg-press data-unchecked:active:border-primary-press dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:shadow-none data-checked:data-disabled:bg-disabled",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        index_parts_exports.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-2 dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground group-data-[size=sm]/switch:border group-data-[size=sm]/switch:group-data-unchecked/switch:border-input group-data-[size=sm]/switch:group-data-checked/switch:border-primary group-data-[size=sm]/switch:group-data-unchecked/switch:group-hover/switch:border-primary-hover group-data-[size=sm]/switch:group-data-unchecked/switch:group-active/switch:border-primary-press group-data-[size=sm]/switch:group-data-checked/switch:group-hover/switch:border-primary-hover group-data-[size=sm]/switch:group-data-checked/switch:group-active/switch:border-primary-press group-data-[size=sm]/switch:group-data-disabled/switch:border-disabled"
        }
      )
    })
  );
}

export { Switch };
//# sourceMappingURL=chunk-I2OELYCB.mjs.map
//# sourceMappingURL=chunk-I2OELYCB.mjs.map