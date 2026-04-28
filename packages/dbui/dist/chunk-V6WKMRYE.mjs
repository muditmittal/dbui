import { formatNumberValue, valueToPercent } from './chunk-FQY64KH3.mjs';
import { useValueAsRef } from './chunk-RAYLQUWY.mjs';
import { useRegisteredLabelId } from './chunk-PL3VOM4K.mjs';
import { visuallyHidden } from './chunk-BVGGELUI.mjs';
import { useRenderElement, formatErrorMessage_default } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/progress/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Indicator: () => ProgressIndicator,
  Label: () => ProgressLabel,
  Root: () => ProgressRoot,
  Track: () => ProgressTrack,
  Value: () => ProgressValue
});
var ProgressRootContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") ProgressRootContext.displayName = "ProgressRootContext";
function useProgressRootContext() {
  const context = React2.useContext(ProgressRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ProgressRootContext is missing. Progress parts must be placed within <Progress.Root>." : formatErrorMessage_default(51));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/progress/root/ProgressRootDataAttributes.js
var ProgressRootDataAttributes = /* @__PURE__ */ (function(ProgressRootDataAttributes2) {
  ProgressRootDataAttributes2["complete"] = "data-complete";
  ProgressRootDataAttributes2["indeterminate"] = "data-indeterminate";
  ProgressRootDataAttributes2["progressing"] = "data-progressing";
  return ProgressRootDataAttributes2;
})({});

// ../../node_modules/@base-ui/react/esm/progress/root/stateAttributesMapping.js
var progressStateAttributesMapping = {
  status(value) {
    if (value === "progressing") {
      return {
        [ProgressRootDataAttributes.progressing]: ""
      };
    }
    if (value === "complete") {
      return {
        [ProgressRootDataAttributes.complete]: ""
      };
    }
    if (value === "indeterminate") {
      return {
        [ProgressRootDataAttributes.indeterminate]: ""
      };
    }
    return null;
  }
};
function getDefaultAriaValueText(formattedValue, value) {
  if (value == null) {
    return "indeterminate progress";
  }
  return formattedValue || `${value}%`;
}
var ProgressRoot = /* @__PURE__ */ React2.forwardRef(function ProgressRoot2(componentProps, forwardedRef) {
  const _a = componentProps, {
    format,
    getAriaValueText = getDefaultAriaValueText,
    locale,
    max = 100,
    min = 0,
    value,
    render,
    className,
    children
  } = _a, elementProps = __objRest(_a, [
    "format",
    "getAriaValueText",
    "locale",
    "max",
    "min",
    "value",
    "render",
    "className",
    "children"
  ]);
  const [labelId, setLabelId] = React2.useState();
  const formatOptionsRef = useValueAsRef(format);
  let status = "indeterminate";
  if (Number.isFinite(value)) {
    status = value === max ? "complete" : "progressing";
  }
  const formattedValue = formatNumberValue(value, locale, formatOptionsRef.current);
  const state = React2.useMemo(() => ({
    status
  }), [status]);
  const defaultProps = {
    "aria-labelledby": labelId,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value != null ? value : void 0,
    "aria-valuetext": getAriaValueText(formattedValue, value),
    role: "progressbar",
    children: /* @__PURE__ */ jsxs(React2.Fragment, {
      children: [children, /* @__PURE__ */ jsx("span", {
        role: "presentation",
        style: visuallyHidden,
        children: "x"
      })]
    })
  };
  const contextValue = React2.useMemo(() => ({
    formattedValue,
    max,
    min,
    setLabelId,
    state,
    status,
    value
  }), [formattedValue, max, min, setLabelId, state, status, value]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return /* @__PURE__ */ jsx(ProgressRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ProgressRoot.displayName = "ProgressRoot";
var ProgressTrack = /* @__PURE__ */ React2.forwardRef(function ProgressTrack2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    state
  } = useProgressRootContext();
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ProgressTrack.displayName = "ProgressTrack";
var ProgressIndicator = /* @__PURE__ */ React2.forwardRef(function ProgressIndicator2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className"
  ]);
  const {
    max,
    min,
    value,
    state
  } = useProgressRootContext();
  const percentageValue = Number.isFinite(value) && value !== null ? valueToPercent(value, min, max) : null;
  const getStyles = React2.useCallback(() => {
    if (percentageValue == null) {
      return {};
    }
    return {
      insetInlineStart: 0,
      height: "inherit",
      width: `${percentageValue}%`
    };
  }, [percentageValue]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style: getStyles()
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ProgressIndicator.displayName = "ProgressIndicator";
var ProgressValue = /* @__PURE__ */ React2.forwardRef(function ProgressValue2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    children
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "children"
  ]);
  const {
    value,
    formattedValue,
    state
  } = useProgressRootContext();
  const formattedValueArg = value == null ? "indeterminate" : formattedValue;
  const formattedValueDisplay = value == null ? null : formattedValue;
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: typeof children === "function" ? children(formattedValueArg, value) : formattedValueDisplay
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ProgressValue.displayName = "ProgressValue";
var ProgressLabel = /* @__PURE__ */ React2.forwardRef(function ProgressLabel2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    id: idProp
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "id"
  ]);
  const {
    setLabelId,
    state
  } = useProgressRootContext();
  const id = useRegisteredLabelId(idProp, setLabelId);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      id,
      role: "presentation"
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ProgressLabel.displayName = "ProgressLabel";
function Progress(_a) {
  var _b = _a, {
    className,
    children,
    value
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "value"
  ]);
  return /* @__PURE__ */ jsxs(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      value,
      "data-slot": "progress",
      className: cn("flex flex-wrap gap-3", className)
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(ProgressTrack3, { children: /* @__PURE__ */ jsx(ProgressIndicator3, {}) })
      ]
    })
  );
}
function ProgressTrack3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Track,
    __spreadValues({
      className: cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      ),
      "data-slot": "progress-track"
    }, props)
  );
}
function ProgressIndicator3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Indicator,
    __spreadValues({
      "data-slot": "progress-indicator",
      className: cn("h-full bg-primary transition-all", className)
    }, props)
  );
}
function ProgressLabel3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Label,
    __spreadValues({
      className: cn("text-[13px] font-semibold", className),
      "data-slot": "progress-label"
    }, props)
  );
}
function ProgressValue3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Value,
    __spreadValues({
      className: cn(
        "ml-auto text-[13px] text-muted-foreground tabular-nums",
        className
      ),
      "data-slot": "progress-value"
    }, props)
  );
}

export { Progress, ProgressIndicator3 as ProgressIndicator, ProgressLabel3 as ProgressLabel, ProgressTrack3 as ProgressTrack, ProgressValue3 as ProgressValue };
//# sourceMappingURL=chunk-V6WKMRYE.mjs.map
//# sourceMappingURL=chunk-V6WKMRYE.mjs.map