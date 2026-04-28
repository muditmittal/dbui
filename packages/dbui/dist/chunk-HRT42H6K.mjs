import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { EMPTY_OBJECT, NOOP, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// ../../node_modules/@base-ui/react/esm/field/control/FieldControlDataAttributes.js
var FieldControlDataAttributes = /* @__PURE__ */ (function(FieldControlDataAttributes2) {
  FieldControlDataAttributes2["disabled"] = "data-disabled";
  FieldControlDataAttributes2["valid"] = "data-valid";
  FieldControlDataAttributes2["invalid"] = "data-invalid";
  FieldControlDataAttributes2["touched"] = "data-touched";
  FieldControlDataAttributes2["dirty"] = "data-dirty";
  FieldControlDataAttributes2["filled"] = "data-filled";
  FieldControlDataAttributes2["focused"] = "data-focused";
  return FieldControlDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/field/utils/constants.js
var DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
var DEFAULT_FIELD_ROOT_STATE = __spreadValues({
  disabled: false
}, DEFAULT_FIELD_STATE_ATTRIBUTES);
var fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [FieldControlDataAttributes.valid]: ""
      };
    }
    return {
      [FieldControlDataAttributes.invalid]: ""
    };
  }
};
var FieldRootContext = /* @__PURE__ */ React.createContext({
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: void 0,
  touched: DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
  setTouched: NOOP,
  dirty: DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
  setDirty: NOOP,
  filled: DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
  setFilled: NOOP,
  focused: DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
  setFocused: NOOP,
  validate: () => null,
  validationMode: "onSubmit",
  validationDebounceTime: 0,
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  markedDirtyRef: {
    current: false
  },
  validation: {
    getValidationProps: (props = EMPTY_OBJECT) => props,
    getInputValidationProps: (props = EMPTY_OBJECT) => props,
    inputRef: {
      current: null
    },
    commit: async () => {
    }
  }
});
if (process.env.NODE_ENV !== "production") FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
  const context = React.useContext(FieldRootContext);
  if (context.setValidityData === NOOP && !optional) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>." : formatErrorMessage_default(28));
  }
  return context;
}
var FormContext = /* @__PURE__ */ React.createContext({
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: false
  }
});
if (process.env.NODE_ENV !== "production") FormContext.displayName = "FormContext";
function useFormContext() {
  return React.useContext(FormContext);
}

// ../../node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js
function getCombinedFieldValidityData(validityData, invalid) {
  return __spreadProps(__spreadValues({}, validityData), {
    state: __spreadProps(__spreadValues({}, validityData.state), {
      valid: !invalid && validityData.state.valid
    })
  });
}

// ../../node_modules/@base-ui/react/esm/field/useField.js
function useField(params) {
  const {
    enabled = true,
    value,
    id,
    name,
    controlRef,
    commit
  } = params;
  const {
    formRef
  } = useFormContext();
  const {
    invalid,
    markedDirtyRef,
    validityData,
    setValidityData
  } = useFieldRootContext();
  const getValue = useStableCallback(params.getValue);
  useIsoLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    let initialValue = value;
    if (initialValue === void 0) {
      initialValue = getValue();
    }
    if (validityData.initialValue === null && initialValue !== null) {
      setValidityData((prev) => __spreadProps(__spreadValues({}, prev), {
        initialValue
      }));
    }
  }, [enabled, setValidityData, value, validityData.initialValue, getValue]);
  useIsoLayoutEffect(() => {
    if (!enabled || !id) {
      return;
    }
    formRef.current.fields.set(id, {
      getValue,
      name,
      controlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate(flushSync2 = true) {
        let nextValue = value;
        if (nextValue === void 0) {
          nextValue = getValue();
        }
        markedDirtyRef.current = true;
        if (!flushSync2) {
          commit(nextValue);
        } else {
          ReactDOM.flushSync(() => commit(nextValue));
        }
      }
    });
  }, [commit, controlRef, enabled, formRef, getValue, id, invalid, markedDirtyRef, name, validityData, value]);
  useIsoLayoutEffect(() => {
    const fields = formRef.current.fields;
    return () => {
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef, id]);
}
var LabelableContext = /* @__PURE__ */ React.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps
});
if (process.env.NODE_ENV !== "production") LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
  return React.useContext(LabelableContext);
}

export { DEFAULT_FIELD_STATE_ATTRIBUTES, DEFAULT_VALIDITY_STATE, FieldRootContext, LabelableContext, fieldValidityMapping, getCombinedFieldValidityData, useField, useFieldRootContext, useFormContext, useLabelableContext };
//# sourceMappingURL=chunk-HRT42H6K.mjs.map
//# sourceMappingURL=chunk-HRT42H6K.mjs.map