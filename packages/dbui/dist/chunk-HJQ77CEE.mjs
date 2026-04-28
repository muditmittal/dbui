import { ToggleGroupContext, Toggle } from './chunk-XSEYRSXR.mjs';
import { useToolbarRootContext } from './chunk-T7CEVU6N.mjs';
import { CompositeRoot } from './chunk-6FR5MJRV.mjs';
import { useControlled } from './chunk-DEE5H5PA.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useRenderElement } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadProps, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/toggle-group/ToggleGroupDataAttributes.js
var ToggleGroupDataAttributes = /* @__PURE__ */ (function(ToggleGroupDataAttributes2) {
  ToggleGroupDataAttributes2["disabled"] = "data-disabled";
  ToggleGroupDataAttributes2["orientation"] = "data-orientation";
  ToggleGroupDataAttributes2["multiple"] = "data-multiple";
  return ToggleGroupDataAttributes2;
})({});
var stateAttributesMapping = {
  multiple(value) {
    if (value) {
      return {
        [ToggleGroupDataAttributes.multiple]: ""
      };
    }
    return null;
  }
};
var ToggleGroup = /* @__PURE__ */ React.forwardRef(function ToggleGroup2(componentProps, forwardedRef) {
  var _b;
  const _a = componentProps, {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    loopFocus = true,
    onValueChange,
    orientation = "horizontal",
    multiple = false,
    value: valueProp,
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "defaultValue",
    "disabled",
    "loopFocus",
    "onValueChange",
    "orientation",
    "multiple",
    "value",
    "className",
    "render"
  ]);
  const toolbarContext = useToolbarRootContext(true);
  const defaultValue = React.useMemo(() => {
    if (valueProp === void 0) {
      return defaultValueProp != null ? defaultValueProp : [];
    }
    return void 0;
  }, [valueProp, defaultValueProp]);
  const isValueInitialized = React.useMemo(() => valueProp !== void 0 || defaultValueProp !== void 0, [valueProp, defaultValueProp]);
  const disabled = ((_b = toolbarContext == null ? void 0 : toolbarContext.disabled) != null ? _b : false) || disabledProp;
  const [groupValue, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "ToggleGroup",
    state: "value"
  });
  const setGroupValue = useStableCallback((newValue, nextPressed, eventDetails) => {
    let newGroupValue;
    if (multiple) {
      newGroupValue = groupValue.slice();
      if (nextPressed) {
        newGroupValue.push(newValue);
      } else {
        newGroupValue.splice(groupValue.indexOf(newValue), 1);
      }
    } else {
      newGroupValue = nextPressed ? [newValue] : [];
    }
    if (Array.isArray(newGroupValue)) {
      onValueChange == null ? void 0 : onValueChange(newGroupValue, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setValueState(newGroupValue);
    }
  });
  const state = {
    disabled,
    multiple,
    orientation
  };
  const contextValue = React.useMemo(() => ({
    disabled,
    orientation,
    setGroupValue,
    value: groupValue,
    isValueInitialized
  }), [disabled, orientation, setGroupValue, groupValue, isValueInitialized]);
  const defaultProps = {
    role: "group"
  };
  const element = useRenderElement("div", componentProps, {
    enabled: Boolean(toolbarContext),
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
    value: contextValue,
    children: toolbarContext ? element : /* @__PURE__ */ jsx(CompositeRoot, {
      render,
      className,
      state,
      refs: [forwardedRef],
      props: [defaultProps, elementProps],
      stateAttributesMapping,
      loopFocus,
      enableHomeAndEndKeys: true
    })
  });
});
if (process.env.NODE_ENV !== "production") ToggleGroup.displayName = "ToggleGroup";
var SegmentControlContext = React.createContext({
  size: "md",
  variant: "default",
  orientation: "horizontal"
});
function SegmentControl(_a) {
  var _b = _a, {
    className,
    variant,
    size,
    orientation = "horizontal",
    children
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "orientation",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    ToggleGroup,
    __spreadProps(__spreadValues({
      "data-slot": "segment-control",
      "data-variant": variant,
      "data-size": size,
      "data-orientation": orientation,
      className: cn(
        "group/segment-control inline-flex items-center rounded-sm",
        // Default variant: muted bg container with padding and gap
        variant !== "outline" && [
          "bg-muted",
          size === "sm" ? "p-0.5 gap-0.5" : "p-1 gap-1"
        ],
        // Outline variant: white bg container, no padding/gap, with shadow
        variant === "outline" && "bg-background p-0 gap-0 shadow-xs",
        orientation === "vertical" && "flex-col items-stretch",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        SegmentControlContext.Provider,
        {
          value: { variant, size, orientation },
          children
        }
      )
    })
  );
}
function SegmentControlItem(_a) {
  var _b = _a, {
    className,
    children,
    variant = "default",
    size = "md",
    onPressedChange
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "variant",
    "size",
    "onPressedChange"
  ]);
  const context = React.useContext(SegmentControlContext);
  const resolvedSize = context.size || size;
  const resolvedVariant = context.variant || variant;
  const isOutline = resolvedVariant === "outline";
  return /* @__PURE__ */ jsx(
    Toggle,
    __spreadProps(__spreadValues({
      "data-slot": "segment-control-item",
      onPressedChange,
      className: cn(
        "relative z-10 flex-1 inline-flex items-center justify-center gap-1",
        "text-[13px] leading-[20px] font-normal whitespace-nowrap",
        "transition-colors outline-none select-none",
        "focus-visible:border-2 focus-visible:border-ring focus:z-20",
        "disabled:pointer-events-none disabled:text-disabled-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // ── Default (slider) variant items: rounded pills, no border ──
        !isOutline && [
          "rounded-sm border text-muted-foreground",
          "hover:text-foreground",
          "aria-pressed:bg-background aria-pressed:shadow-xs aria-pressed:text-foreground",
          "data-[state=on]:bg-background data-[state=on]:shadow-xs data-[state=on]:text-foreground"
        ],
        // ── Outline variant items: flush (no radius), with input border dividers ──
        isOutline && [
          "rounded-none border border-input shadow-xs",
          "hover:bg-hover",
          "active:bg-press",
          "not-first:-ml-px",
          "first:rounded-l-sm",
          "last:rounded-r-sm",
          "aria-pressed:bg-active aria-pressed:border-primary aria-pressed:shadow-none aria-pressed:text-accent-foreground aria-pressed:relative aria-pressed:z-10",
          "data-[state=on]:bg-active data-[state=on]:border-primary data-[state=on]:shadow-none data-[state=on]:text-accent-foreground data-[state=on]:relative data-[state=on]:z-10"
        ],
        // Sizes
        resolvedSize === "sm" ? isOutline ? "h-6 min-w-6 px-2" : "h-5 min-w-5 px-2" : isOutline ? "h-8 min-w-8 px-3" : "h-6 min-w-6 px-2",
        className
      )
    }, props), {
      children
    })
  );
}

export { SegmentControl, SegmentControlItem, ToggleGroup };
//# sourceMappingURL=chunk-HJQ77CEE.mjs.map
//# sourceMappingURL=chunk-HJQ77CEE.mjs.map