import { useCheckboxGroupContext } from './chunk-4ZECPVCA.mjs';
import { useFieldItemContext } from './chunk-P2KQEZ47.mjs';
import { useTransitionStatus, useOpenChangeComplete, transitionStatusMapping } from './chunk-INMEVUNJ.mjs';
import { useAriaLabelledBy } from './chunk-NH7KKUQN.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHiddenInput, visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useButton } from './chunk-ETMT7VCK.mjs';
import { useFormContext, useFieldRootContext, useLabelableContext, useField, fieldValidityMapping } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRefWithInit, NOOP, useMergedRefs, mergeProps, EMPTY_OBJECT, useRenderElement, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React3 from 'react';
import { forwardRef } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/checkbox/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Indicator: () => CheckboxIndicator,
  Root: () => CheckboxRoot
});

// ../../node_modules/@base-ui/react/esm/checkbox/root/CheckboxRootDataAttributes.js
var CheckboxRootDataAttributes = /* @__PURE__ */ (function(CheckboxRootDataAttributes2) {
  CheckboxRootDataAttributes2["checked"] = "data-checked";
  CheckboxRootDataAttributes2["unchecked"] = "data-unchecked";
  CheckboxRootDataAttributes2["indeterminate"] = "data-indeterminate";
  CheckboxRootDataAttributes2["disabled"] = "data-disabled";
  CheckboxRootDataAttributes2["readonly"] = "data-readonly";
  CheckboxRootDataAttributes2["required"] = "data-required";
  CheckboxRootDataAttributes2["valid"] = "data-valid";
  CheckboxRootDataAttributes2["invalid"] = "data-invalid";
  CheckboxRootDataAttributes2["touched"] = "data-touched";
  CheckboxRootDataAttributes2["dirty"] = "data-dirty";
  CheckboxRootDataAttributes2["filled"] = "data-filled";
  CheckboxRootDataAttributes2["focused"] = "data-focused";
  return CheckboxRootDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/checkbox/utils/useStateAttributesMapping.js
function useStateAttributesMapping(state) {
  return React3.useMemo(() => __spreadValues({
    checked(value) {
      if (state.indeterminate) {
        return {};
      }
      if (value) {
        return {
          [CheckboxRootDataAttributes.checked]: ""
        };
      }
      return {
        [CheckboxRootDataAttributes.unchecked]: ""
      };
    }
  }, fieldValidityMapping), [state.indeterminate]);
}
var CheckboxRootContext = /* @__PURE__ */ React3.createContext(void 0);
if (process.env.NODE_ENV !== "production") CheckboxRootContext.displayName = "CheckboxRootContext";
function useCheckboxRootContext() {
  const context = React3.useContext(CheckboxRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>." : formatErrorMessage_default(14));
  }
  return context;
}
var PARENT_CHECKBOX = "data-parent";
var CheckboxRoot = /* @__PURE__ */ React3.forwardRef(function CheckboxRoot2(componentProps, forwardedRef) {
  var _c;
  const _a = componentProps, {
    checked: checkedProp,
    className,
    defaultChecked = false,
    "aria-labelledby": ariaLabelledByProp,
    disabled: disabledProp = false,
    id: idProp,
    indeterminate = false,
    inputRef: inputRefProp,
    name: nameProp,
    onCheckedChange: onCheckedChangeProp,
    parent = false,
    readOnly = false,
    render,
    required = false,
    uncheckedValue,
    value: valueProp,
    nativeButton = false
  } = _a, elementProps = __objRest(_a, [
    "checked",
    "className",
    "defaultChecked",
    "aria-labelledby",
    "disabled",
    "id",
    "indeterminate",
    "inputRef",
    "name",
    "onCheckedChange",
    "parent",
    "readOnly",
    "render",
    "required",
    "uncheckedValue",
    "value",
    "nativeButton"
  ]);
  const {
    clearErrors
  } = useFormContext();
  const {
    disabled: rootDisabled,
    name: fieldName,
    setDirty,
    setFilled,
    setFocused,
    setTouched,
    state: fieldState,
    validationMode,
    validityData,
    shouldValidateOnChange,
    validation: localValidation
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    controlId,
    registerControlId,
    getDescriptionProps
  } = useLabelableContext();
  const groupContext = useCheckboxGroupContext();
  const parentContext = groupContext == null ? void 0 : groupContext.parent;
  const isGroupedWithParent = parentContext && groupContext.allValues;
  const disabled = rootDisabled || fieldItemContext.disabled || (groupContext == null ? void 0 : groupContext.disabled) || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const value = valueProp != null ? valueProp : name;
  const id = useBaseUiId();
  const parentId = useBaseUiId();
  let inputId = controlId;
  if (isGroupedWithParent) {
    inputId = parent ? parentId : `${parentContext.id}-${value}`;
  } else if (idProp) {
    inputId = idProp;
  }
  let groupProps = {};
  if (isGroupedWithParent) {
    if (parent) {
      groupProps = groupContext.parent.getParentProps();
    } else if (value) {
      groupProps = groupContext.parent.getChildProps(value);
    }
  }
  const onCheckedChange = useStableCallback(onCheckedChangeProp);
  const _b = groupProps, {
    checked: groupChecked = checkedProp,
    indeterminate: groupIndeterminate = indeterminate,
    onCheckedChange: groupOnChange
  } = _b, otherGroupProps = __objRest(_b, [
    "checked",
    "indeterminate",
    "onCheckedChange"
  ]);
  const groupValue = groupContext == null ? void 0 : groupContext.value;
  const setGroupValue = groupContext == null ? void 0 : groupContext.setValue;
  const defaultGroupValue = groupContext == null ? void 0 : groupContext.defaultValue;
  const controlRef = React3.useRef(null);
  const controlSourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol("checkbox-control"));
  const hasRegisteredRef = React3.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const validation = (_c = groupContext == null ? void 0 : groupContext.validation) != null ? _c : localValidation;
  const [checked, setCheckedState] = useControlled({
    controlled: value && groupValue && !parent ? groupValue.includes(value) : groupChecked,
    default: value && defaultGroupValue && !parent ? defaultGroupValue.includes(value) : defaultChecked,
    name: "Checkbox",
    state: "checked"
  });
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) {
      return void 0;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, inputId);
    return void 0;
  }, [inputId, groupContext, registerControlId, parent, controlSourceRef]);
  React3.useEffect(() => {
    const controlSource = controlSourceRef.current;
    return () => {
      if (!hasRegisteredRef.current || registerControlId === NOOP) {
        return;
      }
      hasRegisteredRef.current = false;
      registerControlId(controlSource, void 0);
    };
  }, [registerControlId, controlSourceRef]);
  useField({
    enabled: !groupContext,
    id,
    commit: validation.commit,
    value: checked,
    controlRef,
    name,
    getValue: () => checked
  });
  const inputRef = React3.useRef(null);
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, validation.inputRef);
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, inputId != null ? inputId : void 0);
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = groupIndeterminate;
      if (checked) {
        setFilled(true);
      }
    }
  }, [checked, groupIndeterminate, setFilled]);
  useValueChanged(checked, () => {
    if (groupContext && !parent) {
      return;
    }
    clearErrors(name);
    setFilled(checked);
    setDirty(checked !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(checked);
    } else {
      validation.commit(checked, true);
    }
  });
  const inputProps = mergeProps(
    {
      checked,
      disabled,
      // parent checkboxes unset `name` to be excluded from form submission
      name: parent ? void 0 : name,
      // Set `id` to stop Chrome warning about an unassociated input.
      // When using a native button, the `id` is applied to the button instead.
      id: nativeButton ? void 0 : inputId != null ? inputId : void 0,
      required,
      ref: mergedInputRef,
      style: name ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      type: "checkbox",
      "aria-hidden": true,
      onChange(event) {
        if (event.nativeEvent.defaultPrevented) {
          return;
        }
        const nextChecked = event.target.checked;
        const details = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
        groupOnChange == null ? void 0 : groupOnChange(nextChecked, details);
        onCheckedChange(nextChecked, details);
        if (details.isCanceled) {
          return;
        }
        setCheckedState(nextChecked);
        if (value && groupValue && setGroupValue && !parent) {
          const nextGroupValue = nextChecked ? [...groupValue, value] : groupValue.filter((item) => item !== value);
          setGroupValue(nextGroupValue, details);
        }
      },
      onFocus() {
        var _a2;
        (_a2 = controlRef.current) == null ? void 0 : _a2.focus();
      }
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    valueProp !== void 0 ? {
      value: (groupContext ? checked && valueProp : valueProp) || ""
    } : EMPTY_OBJECT,
    getDescriptionProps,
    groupContext ? validation.getValidationProps : validation.getInputValidationProps
  );
  const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
  const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
  React3.useEffect(() => {
    if (!parentContext || !value) {
      return void 0;
    }
    const disabledStates = parentContext.disabledStatesRef.current;
    disabledStates.set(value, disabled);
    return () => {
      disabledStates.delete(value);
    };
  }, [parentContext, disabled, value]);
  const state = React3.useMemo(() => __spreadProps(__spreadValues({}, fieldState), {
    checked: computedChecked,
    disabled,
    readOnly,
    required,
    indeterminate: computedIndeterminate
  }), [fieldState, computedChecked, disabled, readOnly, required, computedIndeterminate]);
  const stateAttributesMapping = useStateAttributesMapping(state);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [buttonRef, controlRef, forwardedRef, groupContext == null ? void 0 : groupContext.registerControlRef],
    props: [{
      id: nativeButton ? inputId != null ? inputId : void 0 : id,
      role: "checkbox",
      "aria-checked": groupIndeterminate ? "mixed" : checked,
      "aria-readonly": readOnly || void 0,
      "aria-required": required || void 0,
      "aria-labelledby": ariaLabelledBy,
      [PARENT_CHECKBOX]: parent ? "" : void 0,
      onFocus() {
        setFocused(true);
      },
      onBlur() {
        const inputEl = inputRef.current;
        if (!inputEl) {
          return;
        }
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(groupContext ? groupValue : inputEl.checked);
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
    }, getDescriptionProps, validation.getValidationProps, elementProps, otherGroupProps, getButtonProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxs(CheckboxRootContext.Provider, {
    value: state,
    children: [element, !checked && !groupContext && name && !parent && uncheckedValue !== void 0 && /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name,
      value: uncheckedValue
    }), /* @__PURE__ */ jsx("input", __spreadValues({}, inputProps))]
  });
});
if (process.env.NODE_ENV !== "production") CheckboxRoot.displayName = "CheckboxRoot";
var CheckboxIndicator = /* @__PURE__ */ React3.forwardRef(function CheckboxIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    keepMounted = false
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "keepMounted"
  ]);
  const rootState = useCheckboxRootContext();
  const rendered = rootState.checked || rootState.indeterminate;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  const indicatorRef = React3.useRef(null);
  const state = __spreadProps(__spreadValues({}, rootState), {
    transitionStatus
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
  const baseStateAttributesMapping = useStateAttributesMapping(rootState);
  const stateAttributesMapping = React3.useMemo(() => __spreadValues(__spreadValues(__spreadValues({}, baseStateAttributesMapping), transitionStatusMapping), fieldValidityMapping), [baseStateAttributesMapping]);
  const shouldRender = keepMounted || mounted;
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    stateAttributesMapping,
    props: elementProps
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") CheckboxIndicator.displayName = "CheckboxIndicator";
var CheckSmall = forwardRef(
  (_a, ref) => {
    var _b = _a, { className, size = 16 } = _b, props = __objRest(_b, ["className", "size"]);
    return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({ ref, className }, props), { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12.03 6.03 7 11.06 3.97 8.03l1.06-1.06L7 8.94l3.97-3.97z",
        clipRule: "evenodd"
      }
    ) }));
  }
);
CheckSmall.displayName = "CheckSmall";
var Dash = forwardRef(
  (_a, ref) => {
    var _b = _a, { className, size = 16 } = _b, props = __objRest(_b, ["className", "size"]);
    return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({ ref, className }, props), { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { fill: "currentColor", fillRule: "evenodd", d: "M15 8.75H1v-1.5h14z", clipRule: "evenodd" }) }));
  }
);
Dash.displayName = "Dash";
function Checkbox(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-background transition-colors outline-none hover:border-primary-hover hover:bg-hover group-hover/field:border-primary-hover group-hover/field:bg-hover active:bg-press active:border-primary-press data-checked:hover:bg-primary-hover data-checked:hover:border-primary-hover data-checked:group-hover/field:bg-primary-hover data-checked:group-hover/field:border-primary-hover data-checked:active:bg-primary-press data-indeterminate:hover:bg-primary-hover data-indeterminate:hover:border-primary-hover data-indeterminate:group-hover/field:bg-primary-hover data-indeterminate:group-hover/field:border-primary-hover data-indeterminate:active:bg-primary-press group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled data-checked:disabled:bg-disabled data-checked:disabled:text-disabled-foreground data-indeterminate:disabled:bg-disabled data-indeterminate:disabled:text-disabled-foreground aria-invalid:border-destructive aria-invalid:data-checked:bg-destructive aria-invalid:data-checked:border-destructive aria-invalid:data-checked:text-destructive-foreground aria-invalid:data-indeterminate:bg-destructive aria-invalid:data-indeterminate:border-destructive aria-invalid:data-indeterminate:text-destructive-foreground dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:shadow-xs data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:shadow-xs disabled:shadow-none data-checked:disabled:shadow-none data-indeterminate:disabled:shadow-none dark:data-checked:bg-primary dark:data-indeterminate:bg-primary",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxs(
        index_parts_exports.Indicator,
        {
          keepMounted: true,
          "data-slot": "checkbox-indicator",
          className: "group/indicator grid place-content-center text-current transition-none [&>svg]:size-4",
          children: [
            /* @__PURE__ */ jsx(CheckSmall, { className: "hidden group-data-checked/indicator:block" }),
            /* @__PURE__ */ jsx(Dash, { className: "hidden group-data-indeterminate/indicator:block" })
          ]
        }
      )
    })
  );
}

export { Checkbox };
//# sourceMappingURL=chunk-RJZRDRNU.mjs.map
//# sourceMappingURL=chunk-RJZRDRNU.mjs.map