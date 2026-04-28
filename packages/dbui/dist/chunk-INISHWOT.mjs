import { formatNumber, valueToPercent } from './chunk-FQY64KH3.mjs';
import { clamp } from './chunk-NNFC4ROP.mjs';
import { useCSPContext } from './chunk-WUPFH4N7.mjs';
import { getDefaultLabelId, resolveAriaLabelledBy } from './chunk-OOCSARU7.mjs';
import { useValueAsRef } from './chunk-RAYLQUWY.mjs';
import { useLabel, focusElementWithVisible } from './chunk-KY5XN6YG.mjs';
import { ownerDocument } from './chunk-SOLCGBP2.mjs';
import { COMPOSITE_KEYS, HOME, END, ARROW_LEFT, ARROW_DOWN, ARROW_RIGHT, ARROW_UP } from './chunk-QGKCYW24.mjs';
import { CompositeList } from './chunk-X4LRWBNJ.mjs';
import { useCompositeListItem } from './chunk-SDWHTCRY.mjs';
import { useDirection } from './chunk-NNBMTHBT.mjs';
import { activeElement, contains } from './chunk-FQ4RTFU7.mjs';
import { useAnimationFrame, useOnMount } from './chunk-KJU32T43.mjs';
import { useLabelableId } from './chunk-2E5W2VBA.mjs';
import { useValueChanged } from './chunk-N4ATC6XY.mjs';
import { visuallyHidden } from './chunk-BVGGELUI.mjs';
import { fieldValidityMapping, useFormContext, useFieldRootContext, useLabelableContext, useField } from './chunk-HRT42H6K.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { createChangeEventDetails, reason_parts_exports, createGenericEventDetails } from './chunk-FVYBAJVM.mjs';
import { useBaseUiId } from './chunk-WIUX54UE.mjs';
import { isElement, isHTMLElement } from './chunk-CL6E6FD3.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { warn, useRenderElement, mergeProps, useMergedRefs, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __spreadValues, __objRest, __spreadProps } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/slider/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Control: () => SliderControl,
  Indicator: () => SliderIndicator,
  Label: () => SliderLabel,
  Root: () => SliderRoot,
  Thumb: () => SliderThumb,
  Track: () => SliderTrack,
  Value: () => SliderValue
});

// ../../node_modules/@base-ui/react/esm/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

// ../../node_modules/@base-ui/react/esm/slider/utils/asc.js
function asc(a, b) {
  return a - b;
}

// ../../node_modules/@base-ui/react/esm/slider/utils/replaceArrayItemAtIndex.js
function replaceArrayItemAtIndex(array, index, newValue) {
  const output = array.slice();
  output[index] = newValue;
  return output.sort(asc);
}

// ../../node_modules/@base-ui/react/esm/slider/utils/getSliderValue.js
function getSliderValue(valueInput, index, min, max, range, values) {
  let newValue = valueInput;
  newValue = clamp(newValue, min, max);
  if (range) {
    newValue = replaceArrayItemAtIndex(
      values,
      index,
      // Bound the new value to the thumb's neighbours.
      clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity)
    );
  }
  return newValue;
}

// ../../node_modules/@base-ui/react/esm/slider/utils/validateMinimumDistance.js
function validateMinimumDistance(values, step, minStepsBetweenValues) {
  if (!Array.isArray(values)) {
    return true;
  }
  const distances = values.reduce((acc, val, index, vals) => {
    if (index === vals.length - 1) {
      return acc;
    }
    acc.push(Math.abs(val - vals[index + 1]));
    return acc;
  }, []);
  return Math.min(...distances) >= step * minStepsBetweenValues;
}

// ../../node_modules/@base-ui/react/esm/slider/root/stateAttributesMapping.js
var sliderStateAttributesMapping = __spreadValues({
  activeThumbIndex: () => null,
  max: () => null,
  min: () => null,
  minStepsBetweenValues: () => null,
  step: () => null,
  values: () => null
}, fieldValidityMapping);
var SliderRootContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") SliderRootContext.displayName = "SliderRootContext";
function useSliderRootContext() {
  const context = React2.useContext(SliderRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: SliderRootContext is missing. Slider parts must be placed within <Slider.Root>." : formatErrorMessage_default(62));
  }
  return context;
}
function getSliderChangeEventReason(event) {
  return "key" in event ? reason_parts_exports.keyboard : reason_parts_exports.inputChange;
}
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === "number" && typeof oldValue === "number") {
    return newValue === oldValue;
  }
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}
var SliderRoot = /* @__PURE__ */ React2.forwardRef(function SliderRoot2(componentProps, forwardedRef) {
  const _a = componentProps, {
    "aria-labelledby": ariaLabelledByProp,
    className,
    defaultValue,
    disabled: disabledProp = false,
    id: idProp,
    format,
    largeStep = 10,
    locale,
    render,
    max = 100,
    min = 0,
    minStepsBetweenValues = 0,
    name: nameProp,
    onValueChange: onValueChangeProp,
    onValueCommitted: onValueCommittedProp,
    orientation = "horizontal",
    step = 1,
    thumbCollisionBehavior = "push",
    thumbAlignment = "center",
    value: valueProp
  } = _a, elementProps = __objRest(_a, [
    "aria-labelledby",
    "className",
    "defaultValue",
    "disabled",
    "id",
    "format",
    "largeStep",
    "locale",
    "render",
    "max",
    "min",
    "minStepsBetweenValues",
    "name",
    "onValueChange",
    "onValueCommitted",
    "orientation",
    "step",
    "thumbCollisionBehavior",
    "thumbAlignment",
    "value"
  ]);
  const id = useBaseUiId(idProp);
  const defaultLabelId = getDefaultLabelId(id);
  const onValueChange = useStableCallback(onValueChangeProp);
  const onValueCommitted = useStableCallback(onValueCommittedProp);
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    disabled: fieldDisabled,
    name: fieldName,
    setTouched,
    setDirty,
    validityData,
    shouldValidateOnChange,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const [labelId, setLabelId] = React2.useState();
  const ariaLabelledby = ariaLabelledByProp != null ? ariaLabelledByProp : resolveAriaLabelledBy(fieldLabelId, labelId);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName != null ? fieldName : nameProp;
  const [valueUnwrapped, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min,
    name: "Slider"
  });
  const sliderRef = React2.useRef(null);
  const controlRef = React2.useRef(null);
  const thumbRefs = React2.useRef([]);
  const pressedInputRef = React2.useRef(null);
  const pressedThumbCenterOffsetRef = React2.useRef(null);
  const pressedThumbIndexRef = React2.useRef(-1);
  const pressedValuesRef = React2.useRef(null);
  const lastChangedValueRef = React2.useRef(null);
  const lastChangeReasonRef = React2.useRef("none");
  const formatOptionsRef = useValueAsRef(format);
  const [active, setActiveState] = React2.useState(-1);
  const [lastUsedThumbIndex, setLastUsedThumbIndex] = React2.useState(-1);
  const [dragging, setDragging] = React2.useState(false);
  const [thumbMap, setThumbMap] = React2.useState(() => /* @__PURE__ */ new Map());
  const [indicatorPosition, setIndicatorPosition] = React2.useState([void 0, void 0]);
  const setActive = useStableCallback((value) => {
    setActiveState(value);
    if (value !== -1) {
      setLastUsedThumbIndex(value);
    }
  });
  useField({
    id,
    commit: validation.commit,
    value: valueUnwrapped,
    controlRef,
    name,
    getValue: () => valueUnwrapped
  });
  useValueChanged(valueUnwrapped, () => {
    clearErrors(name);
    if (shouldValidateOnChange()) {
      validation.commit(valueUnwrapped);
    } else {
      validation.commit(valueUnwrapped, true);
    }
    const initialValue = validityData.initialValue;
    let isDirty;
    if (Array.isArray(valueUnwrapped) && Array.isArray(initialValue)) {
      isDirty = !areArraysEqual(valueUnwrapped, initialValue);
    } else {
      isDirty = valueUnwrapped !== initialValue;
    }
    setDirty(isDirty);
  });
  const registerFieldControlRef = useStableCallback((element2) => {
    if (element2) {
      controlRef.current = element2;
    }
  });
  const range = Array.isArray(valueUnwrapped);
  const values = React2.useMemo(() => {
    if (!range) {
      return [clamp(valueUnwrapped, min, max)];
    }
    return valueUnwrapped.slice().sort(asc);
  }, [max, min, range, valueUnwrapped]);
  const setValue = useStableCallback((newValue, details) => {
    var _a2;
    if (Number.isNaN(newValue) || areValuesEqual(newValue, valueUnwrapped)) {
      return;
    }
    const changeDetails = details != null ? details : createChangeEventDetails(reason_parts_exports.none, void 0, void 0, {
      activeThumbIndex: -1
    });
    lastChangeReasonRef.current = changeDetails.reason;
    const nativeEvent = changeDetails.event;
    const EventConstructor = (_a2 = nativeEvent.constructor) != null ? _a2 : Event;
    const clonedEvent = new EventConstructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value: newValue,
        name
      }
    });
    changeDetails.event = clonedEvent;
    lastChangedValueRef.current = newValue;
    onValueChange(newValue, changeDetails);
    if (changeDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(newValue);
  });
  const handleInputChange = useStableCallback((valueInput, index, event) => {
    var _a2;
    const newValue = getSliderValue(valueInput, index, min, max, range, values);
    if (validateMinimumDistance(newValue, step, minStepsBetweenValues)) {
      const reason = getSliderChangeEventReason(event);
      setValue(newValue, createChangeEventDetails(reason, event.nativeEvent, void 0, {
        activeThumbIndex: index
      }));
      setTouched(true);
      const nextValue = (_a2 = lastChangedValueRef.current) != null ? _a2 : newValue;
      onValueCommitted(nextValue, createGenericEventDetails(reason, event.nativeEvent));
    }
  });
  if (process.env.NODE_ENV !== "production") {
    if (min >= max) {
      warn("Slider `max` must be greater than `min`.");
    }
  }
  useIsoLayoutEffect(() => {
    var _a2;
    const activeEl = activeElement(ownerDocument(sliderRef.current));
    if (disabled && activeEl && ((_a2 = sliderRef.current) == null ? void 0 : _a2.contains(activeEl))) {
      activeEl.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  const state = React2.useMemo(() => __spreadProps(__spreadValues({}, fieldState), {
    activeThumbIndex: active,
    disabled,
    dragging,
    orientation,
    max,
    min,
    minStepsBetweenValues,
    step,
    values
  }), [fieldState, active, disabled, dragging, max, min, minStepsBetweenValues, orientation, step, values]);
  const contextValue = React2.useMemo(() => ({
    active,
    controlRef,
    disabled,
    dragging,
    validation,
    formatOptionsRef,
    handleInputChange,
    indicatorPosition,
    inset: thumbAlignment !== "center",
    labelId: ariaLabelledby,
    rootLabelId: defaultLabelId,
    largeStep,
    lastUsedThumbIndex,
    lastChangedValueRef,
    lastChangeReasonRef,
    locale,
    max,
    min,
    minStepsBetweenValues,
    name,
    onValueCommitted,
    orientation,
    pressedInputRef,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    pressedValuesRef,
    registerFieldControlRef,
    renderBeforeHydration: thumbAlignment === "edge",
    setActive,
    setDragging,
    setIndicatorPosition,
    setLabelId,
    setValue,
    state,
    step,
    thumbCollisionBehavior,
    thumbMap,
    thumbRefs,
    values
  }), [active, controlRef, ariaLabelledby, defaultLabelId, disabled, dragging, validation, formatOptionsRef, handleInputChange, indicatorPosition, largeStep, lastUsedThumbIndex, lastChangedValueRef, lastChangeReasonRef, locale, max, min, minStepsBetweenValues, name, onValueCommitted, orientation, pressedInputRef, pressedThumbCenterOffsetRef, pressedThumbIndexRef, pressedValuesRef, registerFieldControlRef, setActive, setDragging, setIndicatorPosition, setLabelId, setValue, state, step, thumbCollisionBehavior, thumbAlignment, thumbMap, thumbRefs, values]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, sliderRef],
    props: [{
      "aria-labelledby": ariaLabelledby,
      id,
      role: "group"
    }, validation.getValidationProps, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return /* @__PURE__ */ jsx(SliderRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(CompositeList, {
      elementsRef: thumbRefs,
      onMapChange: setThumbMap,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") SliderRoot.displayName = "SliderRoot";
var SliderLabel = /* @__PURE__ */ React2.forwardRef(function SliderLabel2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const elementPropsWithoutId = elementProps;
  delete elementPropsWithoutId.id;
  const {
    state,
    setLabelId,
    controlRef,
    rootLabelId
  } = useSliderRootContext();
  function focusControl(event, controlId) {
    var _a2;
    if (controlId) {
      const controlElement = ownerDocument(event.currentTarget).getElementById(controlId);
      if (isHTMLElement(controlElement)) {
        focusElementWithVisible(controlElement);
        return;
      }
    }
    const fallbackInputs = (_a2 = controlRef.current) == null ? void 0 : _a2.querySelectorAll('input[type="range"]');
    const fallbackInput = (fallbackInputs == null ? void 0 : fallbackInputs.length) === 1 ? fallbackInputs[0] : null;
    if (isHTMLElement(fallbackInput)) {
      focusElementWithVisible(fallbackInput);
    }
  }
  const labelProps = useLabel({
    id: rootLabelId,
    setLabelId,
    focusControl
  });
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: [labelProps, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
});
if (process.env.NODE_ENV !== "production") SliderLabel.displayName = "SliderLabel";
var SliderValue = /* @__PURE__ */ React2.forwardRef(function SliderValue2(componentProps, forwardedRef) {
  const _a = componentProps, {
    "aria-live": ariaLive = "off",
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "aria-live",
    "render",
    "className",
    "children"
  ]);
  const {
    thumbMap,
    state,
    values,
    formatOptionsRef,
    locale
  } = useSliderRootContext();
  const outputFor = React2.useMemo(() => {
    let htmlFor = "";
    for (const thumbMetadata of thumbMap.values()) {
      if (thumbMetadata == null ? void 0 : thumbMetadata.inputId) {
        htmlFor += `${thumbMetadata.inputId} `;
      }
    }
    return htmlFor.trim() === "" ? void 0 : htmlFor.trim();
  }, [thumbMap]);
  const formattedValues = React2.useMemo(() => {
    var _a2;
    const arr = [];
    for (let i = 0; i < values.length; i += 1) {
      arr.push(formatNumber(values[i], locale, (_a2 = formatOptionsRef.current) != null ? _a2 : void 0));
    }
    return arr;
  }, [formatOptionsRef, locale, values]);
  const defaultDisplayValue = React2.useMemo(() => {
    const arr = [];
    for (let i = 0; i < values.length; i += 1) {
      arr.push(formattedValues[i] || values[i]);
    }
    return arr.join(" \u2013 ");
  }, [values, formattedValues]);
  const element = useRenderElement("output", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      // off by default because it will keep announcing when the slider is being dragged
      // and also when the value is changing (but not yet committed)
      "aria-live": ariaLive,
      children: typeof children === "function" ? children(formattedValues, values) : defaultDisplayValue,
      htmlFor: outputFor
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderValue.displayName = "SliderValue";

// ../../node_modules/@base-ui/react/esm/slider/utils/getMidpoint.js
function getMidpoint(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2
  };
}

// ../../node_modules/@base-ui/react/esm/slider/utils/roundValueToStep.js
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

// ../../node_modules/@base-ui/react/esm/slider/utils/getPushedThumbValues.js
function getPushedThumbValues({
  values,
  index,
  nextValue,
  min,
  max,
  step,
  minStepsBetweenValues,
  initialValues
}) {
  var _a, _b;
  if (values.length === 0) {
    return [];
  }
  const nextValues = values.slice();
  const minValueDifference = step * minStepsBetweenValues;
  const lastIndex = nextValues.length - 1;
  const baseInitialValues = initialValues != null ? initialValues : values;
  const indexMin = min + index * minValueDifference;
  const indexMax = max - (lastIndex - index) * minValueDifference;
  nextValues[index] = clamp(nextValue, indexMin, indexMax);
  for (let i = index + 1; i <= lastIndex; i += 1) {
    const minAllowed = nextValues[i - 1] + minValueDifference;
    const maxAllowed = max - (lastIndex - i) * minValueDifference;
    const initialValue = (_a = baseInitialValues[i]) != null ? _a : nextValues[i];
    let candidate = Math.max(nextValues[i], minAllowed);
    if (initialValue < candidate) {
      candidate = Math.max(initialValue, minAllowed);
    }
    nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
  }
  for (let i = index - 1; i >= 0; i -= 1) {
    const maxAllowed = nextValues[i + 1] - minValueDifference;
    const minAllowed = min + i * minValueDifference;
    const initialValue = (_b = baseInitialValues[i]) != null ? _b : nextValues[i];
    let candidate = Math.min(nextValues[i], maxAllowed);
    if (initialValue > candidate) {
      candidate = Math.min(initialValue, maxAllowed);
    }
    nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
  }
  for (let i = 0; i <= lastIndex; i += 1) {
    nextValues[i] = Number(nextValues[i].toFixed(12));
  }
  return nextValues;
}

// ../../node_modules/@base-ui/react/esm/slider/utils/resolveThumbCollision.js
function resolveThumbCollision({
  behavior,
  values,
  currentValues,
  initialValues,
  pressedIndex,
  nextValue,
  min,
  max,
  step,
  minStepsBetweenValues
}) {
  const activeValues = currentValues != null ? currentValues : values;
  const baselineValues = initialValues != null ? initialValues : values;
  const range = activeValues.length > 1;
  if (!range) {
    return {
      value: nextValue,
      thumbIndex: 0,
      didSwap: false
    };
  }
  const minValueDifference = step * minStepsBetweenValues;
  switch (behavior) {
    case "swap": {
      const pressedInitialValue = activeValues[pressedIndex];
      const epsilon = 1e-7;
      const candidateValues = activeValues.slice();
      const previousNeighbor = candidateValues[pressedIndex - 1];
      const nextNeighbor = candidateValues[pressedIndex + 1];
      const lowerBound = previousNeighbor != null ? previousNeighbor + minValueDifference : min;
      const upperBound = nextNeighbor != null ? nextNeighbor - minValueDifference : max;
      const constrainedValue = clamp(nextValue, lowerBound, upperBound);
      const pressedValueAfterClamp = Number(constrainedValue.toFixed(12));
      candidateValues[pressedIndex] = pressedValueAfterClamp;
      const movingForward = nextValue > pressedInitialValue;
      const movingBackward = nextValue < pressedInitialValue;
      const shouldSwapForward = movingForward && nextNeighbor != null && nextValue >= nextNeighbor - epsilon;
      const shouldSwapBackward = movingBackward && previousNeighbor != null && nextValue <= previousNeighbor + epsilon;
      if (!shouldSwapForward && !shouldSwapBackward) {
        return {
          value: candidateValues,
          thumbIndex: pressedIndex,
          didSwap: false
        };
      }
      const targetIndex = shouldSwapForward ? pressedIndex + 1 : pressedIndex - 1;
      const initialValuesForPush = candidateValues.map((_, index) => {
        if (index === pressedIndex) {
          return pressedValueAfterClamp;
        }
        const baseline = baselineValues[index];
        if (baseline != null) {
          return baseline;
        }
        return activeValues[index];
      });
      let nextValueForTarget = nextValue;
      if (shouldSwapForward) {
        nextValueForTarget = Math.max(nextValue, candidateValues[targetIndex]);
      } else {
        nextValueForTarget = Math.min(nextValue, candidateValues[targetIndex]);
      }
      const adjustedValues = getPushedThumbValues({
        values: candidateValues,
        index: targetIndex,
        nextValue: nextValueForTarget,
        min,
        max,
        step,
        minStepsBetweenValues,
        initialValues: initialValuesForPush
      });
      const neighborIndex = shouldSwapForward ? targetIndex - 1 : targetIndex + 1;
      if (neighborIndex >= 0 && neighborIndex < adjustedValues.length) {
        const previousValue = adjustedValues[neighborIndex - 1];
        const nextValueAfter = adjustedValues[neighborIndex + 1];
        let neighborLowerBound = previousValue != null ? previousValue + minValueDifference : min;
        neighborLowerBound = Math.max(neighborLowerBound, min + neighborIndex * minValueDifference);
        let neighborUpperBound = nextValueAfter != null ? nextValueAfter - minValueDifference : max;
        neighborUpperBound = Math.min(neighborUpperBound, max - (adjustedValues.length - 1 - neighborIndex) * minValueDifference);
        const restoredValue = clamp(pressedValueAfterClamp, neighborLowerBound, neighborUpperBound);
        adjustedValues[neighborIndex] = Number(restoredValue.toFixed(12));
      }
      return {
        value: adjustedValues,
        thumbIndex: targetIndex,
        didSwap: true
      };
    }
    case "push": {
      const nextValues = getPushedThumbValues({
        values: activeValues,
        index: pressedIndex,
        nextValue,
        min,
        max,
        step,
        minStepsBetweenValues
      });
      return {
        value: nextValues,
        thumbIndex: pressedIndex,
        didSwap: false
      };
    }
    case "none":
    default: {
      const candidateValues = activeValues.slice();
      const previousNeighbor = candidateValues[pressedIndex - 1];
      const nextNeighbor = candidateValues[pressedIndex + 1];
      const lowerBound = previousNeighbor != null ? previousNeighbor + minValueDifference : min;
      const upperBound = nextNeighbor != null ? nextNeighbor - minValueDifference : max;
      const constrainedValue = clamp(nextValue, lowerBound, upperBound);
      candidateValues[pressedIndex] = Number(constrainedValue.toFixed(12));
      return {
        value: candidateValues,
        thumbIndex: pressedIndex,
        didSwap: false
      };
    }
  }
}

// ../../node_modules/@base-ui/react/esm/slider/control/SliderControl.js
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function getControlOffset(styles, vertical) {
  if (!styles) {
    return {
      start: 0,
      end: 0
    };
  }
  function parseSize(value) {
    const parsed = value != null ? parseFloat(value) : 0;
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  const start = !vertical ? "InlineStart" : "Top";
  const end = !vertical ? "InlineEnd" : "Bottom";
  return {
    start: parseSize(styles[`border${start}Width`]) + parseSize(styles[`padding${start}`]),
    end: parseSize(styles[`border${end}Width`]) + parseSize(styles[`padding${end}`])
  };
}
function getFingerCoords(event, touchIdRef) {
  if (touchIdRef.current != null && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return null;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
var SliderControl = /* @__PURE__ */ React2.forwardRef(function SliderControl2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render: renderProp,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    disabled,
    dragging,
    inset,
    lastChangedValueRef,
    lastChangeReasonRef,
    max,
    min,
    minStepsBetweenValues,
    onValueCommitted,
    orientation,
    pressedInputRef,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    pressedValuesRef,
    registerFieldControlRef,
    renderBeforeHydration,
    setActive,
    setDragging,
    setValue,
    state,
    step,
    thumbCollisionBehavior,
    thumbRefs,
    values
  } = useSliderRootContext();
  const direction = useDirection();
  const range = values.length > 1;
  const vertical = orientation === "vertical";
  const controlRef = React2.useRef(null);
  const stylesRef = React2.useRef(null);
  const setStylesRef = useStableCallback((element2) => {
    if (element2 && stylesRef.current == null) {
      if (stylesRef.current == null) {
        stylesRef.current = getComputedStyle(element2);
      }
    }
  });
  const touchIdRef = React2.useRef(null);
  const moveCountRef = React2.useRef(0);
  const insetThumbOffsetRef = React2.useRef(0);
  const latestValuesRef = useValueAsRef(values);
  const updatePressedThumb = useStableCallback((nextIndex) => {
    if (pressedThumbIndexRef.current !== nextIndex) {
      pressedThumbIndexRef.current = nextIndex;
    }
    const thumbElement = thumbRefs.current[nextIndex];
    if (!thumbElement) {
      pressedThumbCenterOffsetRef.current = null;
      pressedInputRef.current = null;
      return;
    }
    pressedInputRef.current = thumbElement.querySelector('input[type="range"]');
  });
  const getFingerState = useStableCallback((fingerCoords) => {
    var _a2, _b;
    const control = controlRef.current;
    if (!control) {
      return null;
    }
    const {
      width,
      height,
      bottom,
      left,
      right
    } = control.getBoundingClientRect();
    const controlOffset = getControlOffset(stylesRef.current, vertical);
    const insetThumbOffset = insetThumbOffsetRef.current;
    const controlSize = (vertical ? height : width) - controlOffset.start - controlOffset.end - insetThumbOffset * 2;
    const thumbCenterOffset = (_a2 = pressedThumbCenterOffsetRef.current) != null ? _a2 : 0;
    const fingerX = fingerCoords.x - thumbCenterOffset;
    const fingerY = fingerCoords.y - thumbCenterOffset;
    const valueSize = vertical ? bottom - fingerY - controlOffset.end : (direction === "rtl" ? right - fingerX : fingerX - left) - controlOffset.start;
    const valueRescaled = clamp((valueSize - insetThumbOffset) / controlSize, 0, 1);
    let newValue = (max - min) * valueRescaled + min;
    newValue = roundValueToStep(newValue, step, min);
    newValue = clamp(newValue, min, max);
    if (!range) {
      return {
        value: newValue,
        thumbIndex: 0,
        didSwap: false
      };
    }
    const thumbIndex = pressedThumbIndexRef.current;
    if (thumbIndex < 0) {
      return null;
    }
    const collisionResult = resolveThumbCollision({
      behavior: thumbCollisionBehavior,
      values,
      currentValues: (_b = latestValuesRef.current) != null ? _b : values,
      initialValues: pressedValuesRef.current,
      pressedIndex: thumbIndex,
      nextValue: newValue,
      min,
      max,
      step,
      minStepsBetweenValues
    });
    if (thumbCollisionBehavior === "swap" && collisionResult.didSwap) {
      updatePressedThumb(collisionResult.thumbIndex);
    } else {
      pressedThumbIndexRef.current = collisionResult.thumbIndex;
    }
    return collisionResult;
  });
  const startPressing = useStableCallback((fingerCoords) => {
    pressedValuesRef.current = range ? values.slice() : null;
    latestValuesRef.current = values;
    const pressedThumbIndex = pressedThumbIndexRef.current;
    let closestThumbIndex = pressedThumbIndex;
    if (pressedThumbIndex > -1 && pressedThumbIndex < values.length) {
      if (values[pressedThumbIndex] === max) {
        let candidateIndex = pressedThumbIndex;
        while (candidateIndex > 0 && values[candidateIndex - 1] === max) {
          candidateIndex -= 1;
        }
        closestThumbIndex = candidateIndex;
      }
    } else {
      const axis = !vertical ? "x" : "y";
      let minDistance;
      closestThumbIndex = -1;
      for (let i = 0; i < thumbRefs.current.length; i += 1) {
        const thumbEl = thumbRefs.current[i];
        if (isElement(thumbEl)) {
          const midpoint = getMidpoint(thumbEl);
          const distance = Math.abs(fingerCoords[axis] - midpoint[axis]);
          if (minDistance === void 0 || distance <= minDistance) {
            closestThumbIndex = i;
            minDistance = distance;
          }
        }
      }
    }
    if (closestThumbIndex > -1 && closestThumbIndex !== pressedThumbIndex) {
      updatePressedThumb(closestThumbIndex);
    }
    if (inset) {
      const thumbEl = thumbRefs.current[closestThumbIndex];
      if (isElement(thumbEl)) {
        const thumbRect = thumbEl.getBoundingClientRect();
        const side = !vertical ? "width" : "height";
        insetThumbOffsetRef.current = thumbRect[side] / 2;
      }
    }
  });
  const focusThumb = useStableCallback((thumbIndex) => {
    var _a2, _b, _c;
    (_c = (_b = (_a2 = thumbRefs.current) == null ? void 0 : _a2[thumbIndex]) == null ? void 0 : _b.querySelector('input[type="range"]')) == null ? void 0 : _c.focus({
      preventScroll: true
    });
  });
  const handleTouchMove = useStableCallback((nativeEvent) => {
    const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
    if (fingerCoords == null) {
      return;
    }
    moveCountRef.current += 1;
    if (nativeEvent.type === "pointermove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const finger = getFingerState(fingerCoords);
    if (finger == null) {
      return;
    }
    if (validateMinimumDistance(finger.value, step, minStepsBetweenValues)) {
      if (!dragging && moveCountRef.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
        setDragging(true);
      }
      setValue(finger.value, createChangeEventDetails(reason_parts_exports.drag, nativeEvent, void 0, {
        activeThumbIndex: finger.thumbIndex
      }));
      latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
      if (finger.didSwap) {
        focusThumb(finger.thumbIndex);
      }
    }
  });
  function handleTouchEnd(nativeEvent) {
    var _a2, _b, _c;
    setActive(-1);
    setDragging(false);
    pressedInputRef.current = null;
    pressedThumbCenterOffsetRef.current = null;
    const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
    const finger = fingerCoords != null ? getFingerState(fingerCoords) : null;
    if (finger != null) {
      const commitReason = lastChangeReasonRef.current;
      onValueCommitted((_a2 = lastChangedValueRef.current) != null ? _a2 : finger.value, createGenericEventDetails(commitReason, nativeEvent));
    }
    if ("pointerType" in nativeEvent && ((_b = controlRef.current) == null ? void 0 : _b.hasPointerCapture(nativeEvent.pointerId))) {
      (_c = controlRef.current) == null ? void 0 : _c.releasePointerCapture(nativeEvent.pointerId);
    }
    pressedThumbIndexRef.current = -1;
    touchIdRef.current = null;
    pressedValuesRef.current = null;
    stopListening();
  }
  const handleTouchStart = useStableCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchIdRef.current = touch.identifier;
    }
    const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
    if (fingerCoords != null) {
      startPressing(fingerCoords);
      const finger = getFingerState(fingerCoords);
      if (finger == null) {
        return;
      }
      focusThumb(finger.thumbIndex);
      setValue(finger.value, createChangeEventDetails(reason_parts_exports.trackPress, nativeEvent, void 0, {
        activeThumbIndex: finger.thumbIndex
      }));
      latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
      if (finger.didSwap) {
        focusThumb(finger.thumbIndex);
      }
    }
    moveCountRef.current = 0;
    const doc = ownerDocument(controlRef.current);
    doc.addEventListener("touchmove", handleTouchMove, {
      passive: true
    });
    doc.addEventListener("touchend", handleTouchEnd, {
      passive: true
    });
  });
  const stopListening = useStableCallback(() => {
    const doc = ownerDocument(controlRef.current);
    doc.removeEventListener("pointermove", handleTouchMove);
    doc.removeEventListener("pointerup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
    pressedValuesRef.current = null;
  });
  const focusFrame = useAnimationFrame();
  React2.useEffect(() => {
    const control = controlRef.current;
    if (!control) {
      return () => stopListening();
    }
    control.addEventListener("touchstart", handleTouchStart, {
      passive: true
    });
    return () => {
      control.removeEventListener("touchstart", handleTouchStart);
      focusFrame.cancel();
      stopListening();
    };
  }, [stopListening, handleTouchStart, controlRef, focusFrame]);
  React2.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, registerFieldControlRef, controlRef, setStylesRef],
    props: [{
      ["data-base-ui-slider-control"]: renderBeforeHydration ? "" : void 0,
      onPointerDown(event) {
        const control = controlRef.current;
        if (!control || disabled || event.defaultPrevented || !isElement(event.target) || // Only handle left clicks
        event.button !== 0) {
          return;
        }
        const fingerCoords = getFingerCoords(event, touchIdRef);
        if (fingerCoords != null) {
          startPressing(fingerCoords);
          const finger = getFingerState(fingerCoords);
          if (finger == null) {
            return;
          }
          const pressedOnFocusedThumb = contains(thumbRefs.current[finger.thumbIndex], activeElement(ownerDocument(control)));
          if (pressedOnFocusedThumb) {
            event.preventDefault();
          } else {
            focusFrame.request(() => {
              focusThumb(finger.thumbIndex);
            });
          }
          setDragging(true);
          const pressedOnAnyThumb = pressedThumbCenterOffsetRef.current != null;
          if (!pressedOnAnyThumb) {
            setValue(finger.value, createChangeEventDetails(reason_parts_exports.trackPress, event.nativeEvent, void 0, {
              activeThumbIndex: finger.thumbIndex
            }));
            latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
            if (finger.didSwap) {
              focusThumb(finger.thumbIndex);
            }
          }
        }
        if (event.nativeEvent.pointerId) {
          control.setPointerCapture(event.nativeEvent.pointerId);
        }
        moveCountRef.current = 0;
        const doc = ownerDocument(controlRef.current);
        doc.addEventListener("pointermove", handleTouchMove, {
          passive: true
        });
        doc.addEventListener("pointerup", handleTouchEnd, {
          once: true
        });
      },
      tabIndex: -1
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderControl.displayName = "SliderControl";
var SliderTrack = /* @__PURE__ */ React2.forwardRef(function SliderTrack2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    state
  } = useSliderRootContext();
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style: {
        position: "relative"
      }
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderTrack.displayName = "SliderTrack";

// ../../node_modules/@base-ui/react/esm/slider/thumb/SliderThumbDataAttributes.js
var SliderThumbDataAttributes = /* @__PURE__ */ (function(SliderThumbDataAttributes2) {
  SliderThumbDataAttributes2["index"] = "data-index";
  SliderThumbDataAttributes2["dragging"] = "data-dragging";
  SliderThumbDataAttributes2["orientation"] = "data-orientation";
  SliderThumbDataAttributes2["disabled"] = "data-disabled";
  SliderThumbDataAttributes2["valid"] = "data-valid";
  SliderThumbDataAttributes2["invalid"] = "data-invalid";
  SliderThumbDataAttributes2["touched"] = "data-touched";
  SliderThumbDataAttributes2["dirty"] = "data-dirty";
  SliderThumbDataAttributes2["focused"] = "data-focused";
  return SliderThumbDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/slider/thumb/prehydrationScript.min.js
var script = '!function(){const t=document.currentScript?.parentElement;if(!t)return;const e=t.closest("[data-base-ui-slider-control]");if(!e)return;const r=e.querySelector("[data-base-ui-slider-indicator]"),i=e.getBoundingClientRect(),n="vertical"===e.getAttribute("data-orientation")?"height":"width",o=e.querySelectorAll(\'input[type="range"]\'),l=o.length>1,s=o.length-1;let a=null,u=null;for(let t=0;t<o.length;t+=1){const e=o[t],y=parseFloat(e.getAttribute("value")??"");if(Number.isNaN(y))return;const c=e.parentElement;if(!c)return;const p=parseFloat(e.getAttribute("max")??"100"),g=parseFloat(e.getAttribute("min")??"0"),b=c?.getBoundingClientRect(),d=i[n]-b[n],m=100*(y-g)/(p-g),v=(b[n]/2+d*m/100)/i[n]*100;c.style.setProperty("--position",`${v}%`),Number.isFinite(v)&&(c.style.removeProperty("visibility"),r&&(0===t?(a=v,r.style.setProperty("--start-position",`${v}%`),l||r.style.removeProperty("visibility")):t===s&&(u=v-(a??0),r.style.setProperty("--end-position",`${v}%`),r.style.setProperty("--relative-size",`${u}%`),r.style.removeProperty("visibility"))))}}();';
var PAGE_UP = "PageUp";
var PAGE_DOWN = "PageDown";
var ALL_KEYS = /* @__PURE__ */ new Set([ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, HOME, END, PAGE_UP, PAGE_DOWN]);
function getDefaultAriaValueText(values, index, format, locale) {
  if (index < 0) {
    return void 0;
  }
  if (values.length === 2) {
    if (index === 0) {
      return `${formatNumber(values[index], locale, format)} start range`;
    }
    return `${formatNumber(values[index], locale, format)} end range`;
  }
  return format ? formatNumber(values[index], locale, format) : void 0;
}
function getNewValue(thumbValue, step, direction, min, max) {
  return direction === 1 ? Math.min(thumbValue + step, max) : Math.max(thumbValue - step, min);
}
var SliderThumb = /* @__PURE__ */ React2.forwardRef(function SliderThumb2(componentProps, forwardedRef) {
  var _b, _c;
  const _a = componentProps, {
    render,
    children: childrenProp,
    className,
    "aria-describedby": ariaDescribedByProp,
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledByProp,
    disabled: disabledProp = false,
    getAriaLabel: getAriaLabelProp,
    getAriaValueText: getAriaValueTextProp,
    id: idProp,
    index: indexProp,
    inputRef: inputRefProp,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    tabIndex: tabIndexProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "children",
    "className",
    "aria-describedby",
    "aria-label",
    "aria-labelledby",
    "disabled",
    "getAriaLabel",
    "getAriaValueText",
    "id",
    "index",
    "inputRef",
    "onBlur",
    "onFocus",
    "onKeyDown",
    "tabIndex"
  ]);
  const {
    nonce
  } = useCSPContext();
  const id = useBaseUiId(idProp);
  const {
    active: activeIndex,
    lastUsedThumbIndex,
    controlRef,
    disabled: contextDisabled,
    validation,
    formatOptionsRef,
    handleInputChange,
    inset,
    labelId,
    largeStep,
    locale,
    max,
    min,
    minStepsBetweenValues,
    name,
    orientation,
    pressedInputRef,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    renderBeforeHydration,
    setActive,
    setIndicatorPosition,
    state,
    step,
    values: sliderValues
  } = useSliderRootContext();
  const direction = useDirection();
  const disabled = disabledProp || contextDisabled;
  const range = sliderValues.length > 1;
  const vertical = orientation === "vertical";
  const rtl = direction === "rtl";
  const {
    setTouched,
    setFocused,
    validationMode
  } = useFieldRootContext();
  const thumbRef = React2.useRef(null);
  const inputRef = React2.useRef(null);
  const defaultInputId = useBaseUiId();
  const labelableId = useLabelableId();
  const inputId = range ? defaultInputId : labelableId;
  const thumbMetadata = React2.useMemo(() => ({
    inputId
  }), [inputId]);
  const {
    ref: listItemRef,
    index: compositeIndex
  } = useCompositeListItem({
    metadata: thumbMetadata
  });
  const index = !range ? 0 : indexProp != null ? indexProp : compositeIndex;
  const last = index === sliderValues.length - 1;
  const thumbValue = sliderValues[index];
  const thumbValuePercent = valueToPercent(thumbValue, min, max);
  const [isMounted, setIsMounted] = React2.useState(false);
  const [positionPercent, setPositionPercent] = React2.useState();
  useOnMount(() => setIsMounted(true));
  const safeLastUsedThumbIndex = lastUsedThumbIndex >= 0 && lastUsedThumbIndex < sliderValues.length ? lastUsedThumbIndex : -1;
  const getInsetPosition = useStableCallback(() => {
    const control = controlRef.current;
    const thumb = thumbRef.current;
    if (!control || !thumb) {
      return;
    }
    const thumbRect = thumb.getBoundingClientRect();
    const controlRect = control.getBoundingClientRect();
    const side = vertical ? "height" : "width";
    const controlSize = controlRect[side] - thumbRect[side];
    const thumbOffsetFromControlEdge = thumbRect[side] / 2 + controlSize * thumbValuePercent / 100;
    const nextPositionPercent = thumbOffsetFromControlEdge / controlRect[side] * 100;
    setPositionPercent(nextPositionPercent);
    if (index === 0) {
      setIndicatorPosition((prevPosition) => [nextPositionPercent, prevPosition[1]]);
    } else if (last) {
      setIndicatorPosition((prevPosition) => [prevPosition[0], nextPositionPercent]);
    }
  });
  useIsoLayoutEffect(() => {
    if (inset) {
      queueMicrotask(getInsetPosition);
    }
  }, [getInsetPosition, inset]);
  useIsoLayoutEffect(() => {
    if (inset) {
      getInsetPosition();
    }
  }, [getInsetPosition, inset, thumbValuePercent]);
  const getThumbStyle = React2.useCallback(() => {
    const startEdge = vertical ? "bottom" : "insetInlineStart";
    const crossOffsetProperty = vertical ? "left" : "top";
    let zIndex;
    if (range) {
      if (activeIndex === index) {
        zIndex = 2;
      } else if (safeLastUsedThumbIndex === index) {
        zIndex = 1;
      }
    } else if (activeIndex === index) {
      zIndex = 1;
    }
    if (!inset) {
      if (!Number.isFinite(thumbValuePercent)) {
        return visuallyHidden;
      }
      return {
        position: "absolute",
        [startEdge]: `${thumbValuePercent}%`,
        [crossOffsetProperty]: "50%",
        translate: `${(vertical || !rtl ? -1 : 1) * 50}% ${(vertical ? 1 : -1) * 50}%`,
        zIndex
      };
    }
    return {
      ["--position"]: `${positionPercent}%`,
      visibility: renderBeforeHydration && !isMounted || positionPercent === void 0 ? "hidden" : void 0,
      position: "absolute",
      [startEdge]: "var(--position)",
      [crossOffsetProperty]: "50%",
      translate: `${(vertical || !rtl ? -1 : 1) * 50}% ${(vertical ? 1 : -1) * 50}%`,
      zIndex
    };
  }, [activeIndex, index, inset, isMounted, positionPercent, range, renderBeforeHydration, rtl, safeLastUsedThumbIndex, thumbValuePercent, vertical]);
  let cssWritingMode;
  if (orientation === "vertical") {
    cssWritingMode = rtl ? "vertical-rl" : "vertical-lr";
  }
  const ariaLabel = typeof getAriaLabelProp === "function" ? getAriaLabelProp(index) : ariaLabelProp;
  const inputProps = mergeProps({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledByProp != null ? ariaLabelledByProp : ariaLabel == null ? labelId : void 0,
    "aria-describedby": ariaDescribedByProp,
    "aria-orientation": orientation,
    "aria-valuenow": thumbValue,
    "aria-valuetext": typeof getAriaValueTextProp === "function" ? getAriaValueTextProp(formatNumber(thumbValue, locale, (_b = formatOptionsRef.current) != null ? _b : void 0), thumbValue, index) : getDefaultAriaValueText(sliderValues, index, (_c = formatOptionsRef.current) != null ? _c : void 0, locale),
    disabled,
    id: inputId,
    max,
    min,
    name,
    onChange(event) {
      handleInputChange(event.target.valueAsNumber, index, event);
    },
    onFocus() {
      setActive(index);
      setFocused(true);
    },
    onBlur() {
      if (!thumbRef.current) {
        return;
      }
      setActive(-1);
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(getSliderValue(thumbValue, index, min, max, range, sliderValues));
      }
    },
    onKeyDown(event) {
      if (!ALL_KEYS.has(event.key)) {
        return;
      }
      if (COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
      let newValue = null;
      const roundedValue = roundValueToStep(thumbValue, step, min);
      switch (event.key) {
        case ARROW_UP:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, 1, min, max);
          break;
        case ARROW_RIGHT:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, rtl ? -1 : 1, min, max);
          break;
        case ARROW_DOWN:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, -1, min, max);
          break;
        case ARROW_LEFT:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, rtl ? 1 : -1, min, max);
          break;
        case PAGE_UP:
          newValue = getNewValue(roundedValue, largeStep, 1, min, max);
          break;
        case PAGE_DOWN:
          newValue = getNewValue(roundedValue, largeStep, -1, min, max);
          break;
        case END:
          newValue = max;
          if (range) {
            newValue = Number.isFinite(sliderValues[index + 1]) ? sliderValues[index + 1] - step * minStepsBetweenValues : max;
          }
          break;
        case HOME:
          newValue = min;
          if (range) {
            newValue = Number.isFinite(sliderValues[index - 1]) ? sliderValues[index - 1] + step * minStepsBetweenValues : min;
          }
          break;
      }
      if (newValue !== null) {
        handleInputChange(newValue, index, event);
        event.preventDefault();
      }
    },
    step,
    style: __spreadProps(__spreadValues({}, visuallyHidden), {
      // So that VoiceOver's focus indicator matches the thumb's dimensions
      width: "100%",
      height: "100%",
      writingMode: cssWritingMode
    }),
    tabIndex: tabIndexProp != null ? tabIndexProp : void 0,
    type: "range",
    value: thumbValue != null ? thumbValue : ""
  }, validation.getInputValidationProps);
  const mergedInputRef = useMergedRefs(inputRef, validation.inputRef, inputRefProp);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, listItemRef, thumbRef],
    props: [{
      [SliderThumbDataAttributes.index]: index,
      children: /* @__PURE__ */ jsxs(React2.Fragment, {
        children: [childrenProp, /* @__PURE__ */ jsx("input", __spreadValues({
          ref: mergedInputRef
        }, inputProps)), inset && !isMounted && renderBeforeHydration && // this must be rendered with the last thumb to ensure all
        // preceding thumbs are already rendered in the DOM
        last && /* @__PURE__ */ jsx("script", {
          nonce,
          dangerouslySetInnerHTML: {
            __html: script
          },
          suppressHydrationWarning: true
        })]
      }),
      id,
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      onPointerDown(event) {
        pressedThumbIndexRef.current = index;
        if (thumbRef.current != null) {
          const axis = orientation === "horizontal" ? "x" : "y";
          const midpoint = getMidpoint(thumbRef.current);
          const offset = (orientation === "horizontal" ? event.clientX : event.clientY) - midpoint[axis];
          pressedThumbCenterOffsetRef.current = offset;
        }
        if (inputRef.current != null && pressedInputRef.current !== inputRef.current) {
          pressedInputRef.current = inputRef.current;
        }
      },
      style: getThumbStyle(),
      suppressHydrationWarning: renderBeforeHydration || void 0,
      tabIndex: -1
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderThumb.displayName = "SliderThumb";
function getInsetStyles(vertical, range, start, end, renderBeforeHydration, mounted) {
  const visibility = start === void 0 || range && end === void 0 ? "hidden" : void 0;
  const startEdge = vertical ? "bottom" : "insetInlineStart";
  const mainSide = vertical ? "height" : "width";
  const crossSide = vertical ? "width" : "height";
  const styles = {
    visibility: renderBeforeHydration && !mounted ? "hidden" : visibility,
    position: vertical ? "absolute" : "relative",
    [crossSide]: "inherit"
  };
  styles["--start-position"] = `${start != null ? start : 0}%`;
  if (!range) {
    styles[startEdge] = 0;
    styles[mainSide] = "var(--start-position)";
    return styles;
  }
  styles["--relative-size"] = `${(end != null ? end : 0) - (start != null ? start : 0)}%`;
  styles[startEdge] = "var(--start-position)";
  styles[mainSide] = "var(--relative-size)";
  return styles;
}
function getCenteredStyles(vertical, range, start, end) {
  const startEdge = vertical ? "bottom" : "insetInlineStart";
  const mainSide = vertical ? "height" : "width";
  const crossSide = vertical ? "width" : "height";
  const styles = {
    position: vertical ? "absolute" : "relative",
    [crossSide]: "inherit"
  };
  if (!range) {
    styles[startEdge] = 0;
    styles[mainSide] = `${start}%`;
    return styles;
  }
  const size = end - start;
  styles[startEdge] = `${start}%`;
  styles[mainSide] = `${size}%`;
  return styles;
}
var SliderIndicator = /* @__PURE__ */ React2.forwardRef(function SliderIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    indicatorPosition,
    inset,
    max,
    min,
    orientation,
    renderBeforeHydration,
    state,
    values
  } = useSliderRootContext();
  const [isMounted, setIsMounted] = React2.useState(false);
  useOnMount(() => setIsMounted(true));
  const vertical = orientation === "vertical";
  const range = values.length > 1;
  const style = inset ? getInsetStyles(vertical, range, indicatorPosition[0], indicatorPosition[1], renderBeforeHydration, isMounted) : getCenteredStyles(vertical, range, valueToPercent(values[0], min, max), valueToPercent(values[values.length - 1], min, max));
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      ["data-base-ui-slider-indicator"]: renderBeforeHydration ? "" : void 0,
      style,
      suppressHydrationWarning: renderBeforeHydration || void 0
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderIndicator.displayName = "SliderIndicator";
function Slider(_a) {
  var _b = _a, {
    className,
    defaultValue,
    value,
    min = 0,
    max = 100
  } = _b, props = __objRest(_b, [
    "className",
    "defaultValue",
    "value",
    "min",
    "max"
  ]);
  const _values = React2.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      className: cn("data-horizontal:w-full data-vertical:h-full", className),
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      thumbAlignment: "edge"
    }, props), {
      children: /* @__PURE__ */ jsxs(index_parts_exports.Control, { className: "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col", children: [
        /* @__PURE__ */ jsx(
          index_parts_exports.Track,
          {
            "data-slot": "slider-track",
            className: "relative grow overflow-hidden rounded-sm bg-border select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1",
            children: /* @__PURE__ */ jsx(
              index_parts_exports.Indicator,
              {
                "data-slot": "slider-range",
                className: "bg-primary select-none data-horizontal:h-full data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(
          index_parts_exports.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "relative block size-3.5 shrink-0 rounded-full bg-primary shadow-xs transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:bg-primary-hover focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden active:bg-primary-press disabled:bg-disabled disabled:pointer-events-none"
          },
          index
        ))
      ] })
    })
  );
}

export { Slider };
//# sourceMappingURL=chunk-INISHWOT.mjs.map
//# sourceMappingURL=chunk-INISHWOT.mjs.map