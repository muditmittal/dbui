import { CompositeItem } from './chunk-TM5TEJGH.mjs';
import { ACTIVE_COMPOSITE_ITEM, CompositeRoot } from './chunk-6FR5MJRV.mjs';
import { useFieldsetRootContext } from './chunk-UZLC4QBY.mjs';
import { SHIFT } from './chunk-QGKCYW24.mjs';
import { serializeValue } from './chunk-PTVDKL3E.mjs';
import { contains } from './chunk-FQ4RTFU7.mjs';
import { useFieldItemContext } from './chunk-P2KQEZ47.mjs';
import { transitionStatusMapping, useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useAriaLabelledBy } from './chunk-NH7KKUQN.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHiddenInput, visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { fieldValidityMapping, useFieldRootContext, useLabelableContext, useFormContext, useField } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { NOOP, useMergedRefs, EMPTY_OBJECT, useRenderElement, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { __export, __spreadValues, __objRest, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React5 from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/radio/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Indicator: () => RadioIndicator,
  Root: () => RadioRoot
});

// ../../node_modules/@base-ui/react/esm/radio/root/RadioRootDataAttributes.js
var RadioRootDataAttributes = /* @__PURE__ */ (function(RadioRootDataAttributes2) {
  RadioRootDataAttributes2["checked"] = "data-checked";
  RadioRootDataAttributes2["unchecked"] = "data-unchecked";
  RadioRootDataAttributes2["disabled"] = "data-disabled";
  RadioRootDataAttributes2["readonly"] = "data-readonly";
  RadioRootDataAttributes2["required"] = "data-required";
  RadioRootDataAttributes2["valid"] = "data-valid";
  RadioRootDataAttributes2["invalid"] = "data-invalid";
  RadioRootDataAttributes2["touched"] = "data-touched";
  RadioRootDataAttributes2["dirty"] = "data-dirty";
  RadioRootDataAttributes2["filled"] = "data-filled";
  RadioRootDataAttributes2["focused"] = "data-focused";
  return RadioRootDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/radio/utils/stateAttributesMapping.js
var stateAttributesMapping = __spreadValues(__spreadValues({
  checked(value) {
    if (value) {
      return {
        [RadioRootDataAttributes.checked]: ""
      };
    }
    return {
      [RadioRootDataAttributes.unchecked]: ""
    };
  }
}, transitionStatusMapping), fieldValidityMapping);
var RadioGroupContext = /* @__PURE__ */ React5.createContext(void 0);
if (process.env.NODE_ENV !== "production") RadioGroupContext.displayName = "RadioGroupContext";
function useRadioGroupContext() {
  return React5.useContext(RadioGroupContext);
}
var RadioRootContext = /* @__PURE__ */ React5.createContext(void 0);
if (process.env.NODE_ENV !== "production") RadioRootContext.displayName = "RadioRootContext";
function useRadioRootContext() {
  const value = React5.useContext(RadioRootContext);
  if (value === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: RadioRootContext is missing. Radio parts must be placed within <Radio.Root>." : formatErrorMessage_default(52));
  }
  return value;
}
var RadioRoot = /* @__PURE__ */ React5.forwardRef(function RadioRoot2(componentProps, forwardedRef) {
  var _b, _c, _d, _e, _f;
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false,
    readOnly: readOnlyProp = false,
    required: requiredProp = false,
    "aria-labelledby": ariaLabelledByProp,
    value,
    inputRef: inputRefProp,
    nativeButton = false,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "readOnly",
    "required",
    "aria-labelledby",
    "value",
    "inputRef",
    "nativeButton",
    "id"
  ]);
  const groupContext = useRadioGroupContext();
  const {
    disabled: disabledGroup,
    readOnly: readOnlyGroup,
    required: requiredGroup,
    checkedValue,
    touched = false,
    validation,
    name
  } = groupContext != null ? groupContext : {};
  const setCheckedValue = (_b = groupContext == null ? void 0 : groupContext.setCheckedValue) != null ? _b : NOOP;
  const setTouched = (_c = groupContext == null ? void 0 : groupContext.setTouched) != null ? _c : NOOP;
  const registerControlRef = (_d = groupContext == null ? void 0 : groupContext.registerControlRef) != null ? _d : NOOP;
  const registerInputRef = (_e = groupContext == null ? void 0 : groupContext.registerInputRef) != null ? _e : NOOP;
  const {
    setDirty,
    validityData,
    setTouched: setFieldTouched,
    setFilled,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    getDescriptionProps
  } = useLabelableContext();
  const disabled = fieldDisabled || fieldItemContext.disabled || disabledGroup || disabledProp;
  const readOnly = readOnlyGroup || readOnlyProp;
  const required = requiredGroup || requiredProp;
  const checked = groupContext ? checkedValue === value : value === "";
  const serializedValue = React5.useMemo(() => serializeValue(value), [value]);
  const radioRef = React5.useRef(null);
  const inputRef = React5.useRef(null);
  const handleControlRef = useStableCallback((element2) => {
    if (!element2) {
      return;
    }
    registerControlRef(element2, disabled);
  });
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, registerInputRef);
  useIsoLayoutEffect(() => {
    var _a2;
    if ((_a2 = inputRef.current) == null ? void 0 : _a2.checked) {
      setFilled(true);
    }
  }, [setFilled]);
  useIsoLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (disabled && checked) {
      registerInputRef(null);
      return;
    }
    if (radioRef.current) {
      registerControlRef(radioRef.current, disabled);
    }
    registerInputRef(inputRef.current);
  }, [checked, disabled, registerControlRef, registerInputRef]);
  const id = useBaseUiId();
  const inputId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: radioRef
  });
  const hiddenInputId = nativeButton ? void 0 : inputId;
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    role: "radio",
    "aria-checked": checked,
    "aria-required": required || void 0,
    "aria-readonly": readOnly || void 0,
    "aria-labelledby": ariaLabelledBy,
    [ACTIVE_COMPOSITE_ITEM]: checked ? "" : void 0,
    id: nativeButton ? inputId : id,
    onKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    onClick(event) {
      var _a2;
      if (event.defaultPrevented || disabled || readOnly) {
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
    },
    onFocus(event) {
      var _a2;
      if (event.defaultPrevented || disabled || readOnly || !touched) {
        return;
      }
      (_a2 = inputRef.current) == null ? void 0 : _a2.click();
      setTouched(false);
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const inputProps = __spreadProps(__spreadValues({
    type: "radio",
    ref: mergedInputRef,
    id: hiddenInputId,
    name,
    tabIndex: -1,
    style: name ? visuallyHiddenInput : visuallyHidden,
    "aria-hidden": true
  }, value !== void 0 ? {
    value: serializedValue
  } : EMPTY_OBJECT), {
    disabled,
    checked,
    required,
    readOnly,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (disabled || readOnly || value === void 0) {
        return;
      }
      const details = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
      if (details.isCanceled) {
        return;
      }
      setFieldTouched(true);
      setDirty(value !== validityData.initialValue);
      setFilled(true);
      setCheckedValue(value, details);
    },
    onFocus() {
      var _a2;
      (_a2 = radioRef.current) == null ? void 0 : _a2.focus();
    }
  });
  const state = React5.useMemo(() => __spreadProps(__spreadValues({}, fieldState), {
    required,
    disabled,
    readOnly,
    checked
  }), [fieldState, disabled, readOnly, checked, required]);
  const contextValue = state;
  const isRadioGroup = groupContext !== void 0;
  const refs = [forwardedRef, radioRef, buttonRef, handleControlRef];
  const props = [rootProps, getDescriptionProps, (_f = validation == null ? void 0 : validation.getValidationProps) != null ? _f : EMPTY_OBJECT, elementProps, getButtonProps];
  const element = useRenderElement("span", componentProps, {
    enabled: !isRadioGroup,
    state,
    ref: refs,
    props,
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxs(RadioRootContext.Provider, {
    value: contextValue,
    children: [isRadioGroup ? /* @__PURE__ */ jsx(CompositeItem, {
      tag: "span",
      render,
      className,
      state,
      refs,
      props,
      stateAttributesMapping
    }) : element, /* @__PURE__ */ jsx("input", __spreadValues({}, inputProps))]
  });
});
if (process.env.NODE_ENV !== "production") RadioRoot.displayName = "RadioRoot";
var RadioIndicator = /* @__PURE__ */ React5.forwardRef(function RadioIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "keepMounted"
  ]);
  const rootState = useRadioRootContext();
  const rendered = rootState.checked;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  const state = __spreadProps(__spreadValues({}, rootState), {
    transitionStatus
  });
  const indicatorRef = React5.useRef(null);
  const shouldRender = keepMounted || mounted;
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: elementProps,
    stateAttributesMapping
  });
  useOpenChangeComplete({
    open: rendered,
    ref: indicatorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") RadioIndicator.displayName = "RadioIndicator";
var MODIFIER_KEYS = [SHIFT];
var RadioGroup = /* @__PURE__ */ React5.forwardRef(function RadioGroup2(componentProps, forwardedRef) {
  var _b, _c;
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp,
    readOnly,
    required,
    onValueChange: onValueChangeProp,
    value: externalValue,
    defaultValue,
    name: nameProp,
    inputRef: inputRefProp,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "readOnly",
    "required",
    "onValueChange",
    "value",
    "defaultValue",
    "name",
    "inputRef",
    "id"
  ]);
  const {
    setTouched: setFieldTouched,
    setFocused,
    shouldValidateOnChange,
    validationMode,
    name: fieldName,
    disabled: fieldDisabled,
    state: fieldState,
    validation,
    setDirty,
    setFilled,
    validityData
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const {
    clearErrors
  } = useFormContext();
  const fieldsetContext = useFieldsetRootContext(true);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const id = useBaseUiId(idProp);
  const [checkedValue, setCheckedValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: "RadioGroup",
    state: "value"
  });
  const onValueChange = useStableCallback(onValueChangeProp);
  const setCheckedValue = useStableCallback((value, eventDetails) => {
    onValueChange(value, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setCheckedValueUnwrapped(value);
  });
  const controlRef = React5.useRef(null);
  const groupInputRef = React5.useRef(null);
  const firstEnabledInputRef = React5.useRef(null);
  function setInputRef(hiddenInput) {
    let cleanup = void 0;
    if (inputRefProp) {
      if (typeof inputRefProp === "function") {
        cleanup = inputRefProp(hiddenInput);
      } else {
        inputRefProp.current = hiddenInput;
      }
    }
    groupInputRef.current = hiddenInput;
    validation.inputRef.current = hiddenInput;
    return cleanup;
  }
  const registerControlRef = useStableCallback((element, isDisabled = false) => {
    if (!element) {
      return;
    }
    if (isDisabled) {
      if (controlRef.current === element) {
        controlRef.current = null;
      }
      return;
    }
    if (controlRef.current == null) {
      controlRef.current = element;
    }
  });
  const registerInputRef = useStableCallback((input) => {
    if (!input || input.disabled) {
      return void 0;
    }
    if (!firstEnabledInputRef.current) {
      firstEnabledInputRef.current = input;
    }
    const currentInput = groupInputRef.current;
    if (input.checked || currentInput == null || currentInput.disabled) {
      return setInputRef(input);
    }
    return void 0;
  });
  useField({
    id,
    commit: validation.commit,
    value: checkedValue,
    controlRef,
    name,
    getValue: () => checkedValue != null ? checkedValue : null
  });
  useValueChanged(checkedValue, () => {
    clearErrors(name);
    setDirty(checkedValue !== validityData.initialValue);
    setFilled(checkedValue != null);
    if (shouldValidateOnChange()) {
      validation.commit(checkedValue);
    } else {
      validation.commit(checkedValue, true);
    }
    const fallbackInput = firstEnabledInputRef.current;
    if (checkedValue == null && fallbackInput && !fallbackInput.disabled) {
      setInputRef(fallbackInput);
    }
  });
  const [touched, setTouched] = React5.useState(false);
  const ariaLabelledby = (_c = (_b = elementProps["aria-labelledby"]) != null ? _b : labelId) != null ? _c : fieldsetContext == null ? void 0 : fieldsetContext.legendId;
  const state = __spreadProps(__spreadValues({}, fieldState), {
    disabled: disabled != null ? disabled : false,
    required: required != null ? required : false,
    readOnly: readOnly != null ? readOnly : false
  });
  const contextValue = React5.useMemo(() => __spreadProps(__spreadValues({}, fieldState), {
    checkedValue,
    disabled,
    validation,
    name,
    onValueChange,
    readOnly,
    registerControlRef,
    registerInputRef,
    required,
    setCheckedValue,
    setTouched,
    touched
  }), [checkedValue, disabled, validation, fieldState, name, onValueChange, readOnly, registerControlRef, registerInputRef, required, setCheckedValue, setTouched, touched]);
  const defaultProps = {
    role: "radiogroup",
    "aria-required": required || void 0,
    "aria-disabled": disabled || void 0,
    "aria-readonly": readOnly || void 0,
    "aria-labelledby": ariaLabelledby,
    onFocus() {
      setFocused(true);
    },
    onBlur(event) {
      if (!contains(event.currentTarget, event.relatedTarget)) {
        setFieldTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(checkedValue);
        }
      }
    },
    onKeyDownCapture(event) {
      if (event.key.startsWith("Arrow")) {
        setFieldTouched(true);
        setTouched(true);
        setFocused(true);
      }
    }
  };
  return /* @__PURE__ */ jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(CompositeRoot, {
      render,
      className,
      state,
      props: [defaultProps, validation.getValidationProps, elementProps],
      refs: [forwardedRef],
      stateAttributesMapping: fieldValidityMapping,
      enableHomeAndEndKeys: false,
      modifierKeys: MODIFIER_KEYS
    })
  });
});
if (process.env.NODE_ENV !== "production") RadioGroup.displayName = "RadioGroup";

export { RadioGroup, index_parts_exports };
//# sourceMappingURL=chunk-PTHMG4NM.mjs.map
//# sourceMappingURL=chunk-PTHMG4NM.mjs.map