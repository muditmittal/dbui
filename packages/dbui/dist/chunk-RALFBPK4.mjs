import { useLabel } from './chunk-KY5XN6YG.mjs';
import { useTimeout } from './chunk-NJQVCWLB.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { useCheckboxGroupContext } from './chunk-4ZECPVCA.mjs';
import { useFieldsetRootContext } from './chunk-UZLC4QBY.mjs';
import { activeElement } from './chunk-FQ4RTFU7.mjs';
import { FieldItemContext } from './chunk-P2KQEZ47.mjs';
import { transitionStatusMapping, useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useFieldRootContext, useLabelableContext, fieldValidityMapping, useFormContext, useField, getCombinedFieldValidityData, DEFAULT_VALIDITY_STATE, FieldRootContext, LabelableContext } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { error } from './chunk-T3HTT7SQ.mjs';
import { SafeReact } from './chunk-6PGNYKRT.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, useRefWithInit, mergeProps, EMPTY_OBJECT } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadProps, __spreadValues, __objRest } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/field/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Control: () => FieldControl,
  Description: () => FieldDescription,
  Error: () => FieldError,
  Item: () => FieldItem,
  Label: () => FieldLabel,
  Root: () => FieldRoot,
  Validity: () => FieldValidity
});
var LabelableProvider = function LabelableProvider2(props) {
  const defaultId = useBaseUiId();
  const initialControlId = props.controlId === void 0 ? defaultId : props.controlId;
  const [controlId, setControlIdState] = React3.useState(initialControlId);
  const [labelId, setLabelId] = React3.useState(props.labelId);
  const [messageIds, setMessageIds] = React3.useState([]);
  const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
  const {
    messageIds: parentMessageIds
  } = useLabelableContext();
  const registerControlId = useStableCallback((source, nextId) => {
    const registrations = registrationsRef.current;
    if (nextId === void 0) {
      registrations.delete(source);
      return;
    }
    registrations.set(source, nextId);
    setControlIdState((prev) => {
      if (registrations.size === 0) {
        return void 0;
      }
      let nextControlId;
      for (const id of registrations.values()) {
        if (prev !== void 0 && id === prev) {
          return prev;
        }
        if (nextControlId === void 0) {
          nextControlId = id;
        }
      }
      return nextControlId;
    });
  });
  const getDescriptionProps = React3.useCallback((externalProps) => {
    return mergeProps({
      "aria-describedby": parentMessageIds.concat(messageIds).join(" ") || void 0
    }, externalProps);
  }, [parentMessageIds, messageIds]);
  const contextValue = React3.useMemo(() => ({
    controlId,
    registerControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    getDescriptionProps
  }), [controlId, registerControlId, labelId, setLabelId, messageIds, setMessageIds, getDescriptionProps]);
  return /* @__PURE__ */ jsx(LabelableContext.Provider, {
    value: contextValue,
    children: props.children
  });
};
if (process.env.NODE_ENV !== "production") LabelableProvider.displayName = "LabelableProvider";
var validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isOnlyValueMissing(state) {
  if (!state || state.valid || !state.valueMissing) {
    return false;
  }
  let onlyValueMissing = false;
  for (const key of validityKeys) {
    if (key === "valid") {
      continue;
    }
    if (key === "valueMissing") {
      onlyValueMissing = state[key];
    }
    if (state[key]) {
      onlyValueMissing = false;
    }
  }
  return onlyValueMissing;
}
function useFieldValidation(params) {
  const {
    formRef,
    clearErrors
  } = useFormContext();
  const {
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange
  } = params;
  const {
    controlId,
    getDescriptionProps
  } = useLabelableContext();
  const timeout = useTimeout();
  const inputRef = React3.useRef(null);
  const commit = useStableCallback(async (value, revalidate = false) => {
    const element = inputRef.current;
    if (!element) {
      return;
    }
    if (revalidate) {
      if (state.valid !== false) {
        return;
      }
      const currentNativeValidity = element.validity;
      if (!currentNativeValidity.valueMissing) {
        const nextValidityData2 = {
          value,
          state: __spreadProps(__spreadValues({}, DEFAULT_VALIDITY_STATE), {
            valid: true
          }),
          error: "",
          errors: [],
          initialValue: validityData.initialValue
        };
        element.setCustomValidity("");
        if (controlId) {
          const currentFieldData = formRef.current.fields.get(controlId);
          if (currentFieldData) {
            formRef.current.fields.set(controlId, __spreadValues(__spreadValues({}, currentFieldData), getCombinedFieldValidityData(nextValidityData2, false)));
          }
        }
        setValidityData(nextValidityData2);
        return;
      }
      const currentNativeValidityObject = validityKeys.reduce((acc, key) => {
        acc[key] = currentNativeValidity[key];
        return acc;
      }, {});
      if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
        return;
      }
    }
    function getState(el) {
      const computedState = validityKeys.reduce((acc, key) => {
        acc[key] = el.validity[key];
        return acc;
      }, {});
      let hasOnlyValueMissingError = false;
      for (const key of validityKeys) {
        if (key === "valid") {
          continue;
        }
        if (key === "valueMissing" && computedState[key]) {
          hasOnlyValueMissingError = true;
        } else if (computedState[key]) {
          return computedState;
        }
      }
      if (hasOnlyValueMissingError && !markedDirtyRef.current) {
        computedState.valid = true;
        computedState.valueMissing = false;
      }
      return computedState;
    }
    timeout.clear();
    let result = null;
    let validationErrors = [];
    const nextState = getState(element);
    let defaultValidationMessage;
    const validateOnChange = shouldValidateOnChange();
    if (element.validationMessage && !validateOnChange) {
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.getValue();
        }
        return acc;
      }, {});
      const resultOrPromise = validate(value, formValues);
      if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
        result = await resultOrPromise;
      } else {
        result = resultOrPromise;
      }
      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;
        if (Array.isArray(result)) {
          validationErrors = result;
          element.setCustomValidity(result.join("\n"));
        } else if (result) {
          validationErrors = [result];
          element.setCustomValidity(result);
        }
      } else if (validateOnChange) {
        element.setCustomValidity("");
        nextState.customError = false;
        if (element.validationMessage) {
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if (element.validity.valid && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }
    const nextValidityData = {
      value,
      state: nextState,
      error: defaultValidationMessage != null ? defaultValidationMessage : Array.isArray(result) ? result[0] : result != null ? result : "",
      errors: validationErrors,
      initialValue: validityData.initialValue
    };
    if (controlId) {
      const currentFieldData = formRef.current.fields.get(controlId);
      if (currentFieldData) {
        formRef.current.fields.set(controlId, __spreadValues(__spreadValues({}, currentFieldData), getCombinedFieldValidityData(nextValidityData, invalid)));
      }
    }
    setValidityData(nextValidityData);
  });
  const getValidationProps = React3.useCallback((externalProps = {}) => mergeProps(getDescriptionProps, state.valid === false ? {
    "aria-invalid": true
  } : EMPTY_OBJECT, externalProps), [getDescriptionProps, state.valid]);
  const getInputValidationProps = React3.useCallback((externalProps = {}) => mergeProps({
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      clearErrors(name);
      if (!shouldValidateOnChange()) {
        commit(event.currentTarget.value, true);
        return;
      }
      const element = event.currentTarget;
      if (element.value === "") {
        commit(element.value);
        return;
      }
      timeout.clear();
      if (validationDebounceTime) {
        timeout.start(validationDebounceTime, () => {
          commit(element.value);
        });
      } else {
        commit(element.value);
      }
    }
  }, getValidationProps(externalProps)), [getValidationProps, clearErrors, name, timeout, commit, validationDebounceTime, shouldValidateOnChange]);
  return React3.useMemo(() => ({
    getValidationProps,
    getInputValidationProps,
    inputRef,
    commit
  }), [getValidationProps, getInputValidationProps, commit]);
}
var FieldRootInner = /* @__PURE__ */ React3.forwardRef(function FieldRootInner2(componentProps, forwardedRef) {
  const {
    errors,
    validationMode: formValidationMode,
    submitAttemptedRef
  } = useFormContext();
  const _a = componentProps, {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = formValidationMode,
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    dirty: dirtyProp,
    touched: touchedProp,
    actionsRef
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "validate",
    "validationDebounceTime",
    "validationMode",
    "name",
    "disabled",
    "invalid",
    "dirty",
    "touched",
    "actionsRef"
  ]);
  const {
    disabled: disabledFieldset
  } = useFieldsetRootContext();
  const validate = useStableCallback(validateProp || (() => null));
  const disabled = disabledFieldset || disabledProp;
  const [touchedState, setTouchedUnwrapped] = React3.useState(false);
  const [dirtyState, setDirtyUnwrapped] = React3.useState(false);
  const [filled, setFilled] = React3.useState(false);
  const [focused, setFocused] = React3.useState(false);
  const dirty = dirtyProp != null ? dirtyProp : dirtyState;
  const touched = touchedProp != null ? touchedProp : touchedState;
  const markedDirtyRef = React3.useRef(false);
  const setDirty = useStableCallback((value) => {
    if (dirtyProp !== void 0) {
      return;
    }
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  });
  const setTouched = useStableCallback((value) => {
    if (touchedProp !== void 0) {
      return;
    }
    setTouchedUnwrapped(value);
  });
  const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitAttemptedRef.current);
  const hasFormError = !!name && Object.hasOwn(errors, name) && errors[name] !== void 0;
  const invalid = invalidProp === true || hasFormError;
  const [validityData, setValidityData] = React3.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && validityData.state.valid;
  const state = React3.useMemo(() => ({
    disabled,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled, touched, dirty, valid, filled, focused]);
  const validation = useFieldValidation({
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange
  });
  const handleImperativeValidate = React3.useCallback(() => {
    markedDirtyRef.current = true;
    validation.commit(validityData.value);
  }, [validation, validityData]);
  React3.useImperativeHandle(actionsRef, () => ({
    validate: handleImperativeValidate
  }), [handleImperativeValidate]);
  const contextValue = React3.useMemo(() => ({
    invalid,
    name,
    validityData,
    setValidityData,
    disabled,
    touched,
    setTouched,
    dirty,
    setDirty,
    filled,
    setFilled,
    focused,
    setFocused,
    validate,
    validationMode,
    validationDebounceTime,
    shouldValidateOnChange,
    state,
    markedDirtyRef,
    validation
  }), [invalid, name, validityData, disabled, touched, setTouched, dirty, setDirty, filled, setFilled, focused, setFocused, validate, validationMode, validationDebounceTime, shouldValidateOnChange, state, validation]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ jsx(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") FieldRootInner.displayName = "FieldRootInner";
var FieldRoot = /* @__PURE__ */ React3.forwardRef(function FieldRoot2(componentProps, forwardedRef) {
  return /* @__PURE__ */ jsx(LabelableProvider, {
    children: /* @__PURE__ */ jsx(FieldRootInner, __spreadProps(__spreadValues({}, componentProps), {
      ref: forwardedRef
    }))
  });
});
if (process.env.NODE_ENV !== "production") FieldRoot.displayName = "FieldRoot";
var FieldLabel = /* @__PURE__ */ React3.forwardRef(function FieldLabel2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    nativeLabel = true
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "nativeLabel"
  ]);
  const fieldRootContext = useFieldRootContext(false);
  const {
    labelId
  } = useLabelableContext();
  const labelRef = React3.useRef(null);
  const labelProps = useLabel({
    id: labelId != null ? labelId : idProp,
    native: nativeLabel
  });
  if (process.env.NODE_ENV !== "production") {
    React3.useEffect(() => {
      var _a2, _b, _c, _d;
      if (!labelRef.current) {
        return;
      }
      const isLabelTag = labelRef.current.tagName === "LABEL";
      if (nativeLabel) {
        if (!isLabelTag) {
          const ownerStackMessage = ((_b = (_a2 = SafeReact).captureOwnerStack) == null ? void 0 : _b.call(_a2)) || "";
          const message = "<Field.Label> expected a <label> element because the `nativeLabel` prop is true. Rendering a non-<label> disables native label association, so `htmlFor` will not work. Use a real <label> in the `render` prop, or set `nativeLabel` to `false`.";
          error(`${message}${ownerStackMessage}`);
        }
      } else if (isLabelTag) {
        const ownerStackMessage = ((_d = (_c = SafeReact).captureOwnerStack) == null ? void 0 : _d.call(_c)) || "";
        const message = "<Field.Label> expected a non-<label> element because the `nativeLabel` prop is false. Rendering a <label> assumes native label behavior while Base UI treats it as non-native, which can cause unexpected pointer behavior. Use a non-<label> in the `render` prop, or set `nativeLabel` to `true`.";
        error(`${message}${ownerStackMessage}`);
      }
    }, [nativeLabel]);
  }
  const element = useRenderElement("label", componentProps, {
    ref: [forwardedRef, labelRef],
    state: fieldRootContext.state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldLabel.displayName = "FieldLabel";
var stateAttributesMapping = __spreadValues(__spreadValues({}, fieldValidityMapping), transitionStatusMapping);
var FieldError = /* @__PURE__ */ React3.forwardRef(function FieldError2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    id: idProp,
    className,
    match
  } = _a, elementProps = __objRest(_a, [
    "render",
    "id",
    "className",
    "match"
  ]);
  const id = useBaseUiId(idProp);
  const {
    validityData,
    state: fieldState,
    name
  } = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  const {
    errors
  } = useFormContext();
  const formError = name ? errors[name] : null;
  let rendered = false;
  if (formError || match === true) {
    rendered = true;
  } else if (match) {
    rendered = Boolean(validityData.state[match]);
  } else {
    rendered = validityData.state.valid === false;
  }
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  useIsoLayoutEffect(() => {
    if (!rendered || !id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [rendered, id, setMessageIds]);
  const errorRef = React3.useRef(null);
  const [lastRenderedMessage, setLastRenderedMessage] = React3.useState(null);
  const [lastRenderedMessageKey, setLastRenderedMessageKey] = React3.useState(null);
  const errorMessage = formError || (validityData.errors.length > 1 ? /* @__PURE__ */ jsx("ul", {
    children: validityData.errors.map((message) => /* @__PURE__ */ jsx("li", {
      children: message
    }, message))
  }) : validityData.error);
  let errorKey = validityData.error;
  if (formError != null) {
    errorKey = Array.isArray(formError) ? JSON.stringify(formError) : formError;
  } else if (validityData.errors.length > 1) {
    errorKey = JSON.stringify(validityData.errors);
  }
  if (rendered && errorKey !== lastRenderedMessageKey) {
    setLastRenderedMessageKey(errorKey);
    setLastRenderedMessage(errorMessage);
  }
  useOpenChangeComplete({
    open: rendered,
    ref: errorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const state = __spreadProps(__spreadValues({}, fieldState), {
    transitionStatus
  });
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, errorRef],
    state,
    props: [{
      id,
      children: rendered ? errorMessage : lastRenderedMessage
    }, elementProps],
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") FieldError.displayName = "FieldError";
var FieldDescription = /* @__PURE__ */ React3.forwardRef(function FieldDescription2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    id: idProp,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "id",
    "className"
  ]);
  const id = useBaseUiId(idProp);
  const fieldRootContext = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  useIsoLayoutEffect(() => {
    if (!id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [id, setMessageIds]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    state: fieldRootContext.state,
    props: [{
      id
    }, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldDescription.displayName = "FieldDescription";
var FieldControl = /* @__PURE__ */ React3.forwardRef(function FieldControl2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    autoFocus = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id",
    "name",
    "value",
    "disabled",
    "onValueChange",
    "defaultValue",
    "autoFocus"
  ]);
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode,
    validation
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const state = __spreadProps(__spreadValues({}, fieldState), {
    disabled
  });
  const {
    labelId
  } = useLabelableContext();
  const id = useLabelableId({
    id: idProp
  });
  useIsoLayoutEffect(() => {
    var _a2;
    const hasExternalValue = valueProp != null;
    if (((_a2 = validation.inputRef.current) == null ? void 0 : _a2.value) || hasExternalValue && valueProp !== "") {
      setFilled(true);
    } else if (hasExternalValue && valueProp === "") {
      setFilled(false);
    }
  }, [validation.inputRef, setFilled, valueProp]);
  const inputRef = React3.useRef(null);
  useIsoLayoutEffect(() => {
    if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) {
      setFocused(true);
    }
  }, [autoFocus, setFocused]);
  const [valueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "FieldControl",
    state: "value"
  });
  const isControlled = valueProp !== void 0;
  const value = isControlled ? valueUnwrapped : void 0;
  useField({
    id,
    name,
    commit: validation.commit,
    value,
    getValue: () => {
      var _a2;
      return (_a2 = validation.inputRef.current) == null ? void 0 : _a2.value;
    },
    controlRef: validation.inputRef
  });
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [__spreadProps(__spreadValues({
      id,
      disabled,
      name,
      ref: validation.inputRef,
      "aria-labelledby": labelId,
      autoFocus
    }, isControlled ? {
      value
    } : {
      defaultValue
    }), {
      onChange(event) {
        const inputValue = event.currentTarget.value;
        onValueChange == null ? void 0 : onValueChange(inputValue, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent));
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== "");
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
          setTouched(true);
          validation.commit(event.currentTarget.value);
        }
      }
    }), validation.getInputValidationProps(), elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldControl.displayName = "FieldControl";
var FieldValidity = function FieldValidity2(props) {
  const {
    children
  } = props;
  const {
    validityData,
    invalid
  } = useFieldRootContext(false);
  const combinedFieldValidityData = React3.useMemo(() => getCombinedFieldValidityData(validityData, invalid), [validityData, invalid]);
  const isInvalid = combinedFieldValidityData.state.valid === false;
  const {
    transitionStatus
  } = useTransitionStatus(isInvalid);
  const fieldValidityState = React3.useMemo(() => {
    return __spreadProps(__spreadValues({}, combinedFieldValidityData), {
      validity: combinedFieldValidityData.state,
      transitionStatus
    });
  }, [combinedFieldValidityData, transitionStatus]);
  return /* @__PURE__ */ jsx(React3.Fragment, {
    children: children(fieldValidityState)
  });
};
if (process.env.NODE_ENV !== "production") FieldValidity.displayName = "FieldValidity";
var FieldItem = /* @__PURE__ */ React3.forwardRef(function FieldItem2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled: disabledProp = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled"
  ]);
  const {
    state,
    disabled: rootDisabled
  } = useFieldRootContext(false);
  const disabled = rootDisabled || disabledProp;
  const checkboxGroupContext = useCheckboxGroupContext();
  const parentId = checkboxGroupContext == null ? void 0 : checkboxGroupContext.parent.id;
  const hasParentCheckbox = (checkboxGroupContext == null ? void 0 : checkboxGroupContext.allValues) !== void 0;
  const controlId = hasParentCheckbox ? parentId : void 0;
  const fieldItemContext = React3.useMemo(() => ({
    disabled
  }), [disabled]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ jsx(LabelableProvider, {
    controlId,
    children: /* @__PURE__ */ jsx(FieldItemContext.Provider, {
      value: fieldItemContext,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") FieldItem.displayName = "FieldItem";
var Input = /* @__PURE__ */ React3.forwardRef(function Input2(props, forwardedRef) {
  return /* @__PURE__ */ jsx(index_parts_exports.Control, __spreadValues({
    ref: forwardedRef
  }, props));
});
if (process.env.NODE_ENV !== "production") Input.displayName = "Input";
function Input3(_a) {
  var _b = _a, {
    className,
    type,
    size = "default",
    validation
  } = _b, props = __objRest(_b, [
    "className",
    "type",
    "size",
    "validation"
  ]);
  return /* @__PURE__ */ jsx(
    Input,
    __spreadValues({
      type,
      "data-slot": "input",
      "data-size": size,
      "data-validation": validation,
      className: cn(
        "w-full min-w-0 rounded-sm border border-input bg-background text-[13px] leading-[20px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[13px] file:font-semibold file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:bg-muted disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive data-[validation=warning]:border-warning data-[validation=success]:border-success md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        size === "default" && "h-8 px-3 py-0",
        size === "sm" && "h-6 px-2 py-0",
        className
      )
    }, props)
  );
}

export { Input3 as Input };
//# sourceMappingURL=chunk-RALFBPK4.mjs.map
//# sourceMappingURL=chunk-RALFBPK4.mjs.map