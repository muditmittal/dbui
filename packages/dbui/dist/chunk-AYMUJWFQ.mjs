import { RadioGroup, index_parts_exports } from './chunk-PTHMG4NM.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues, __spreadProps } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

function RadioGroup2(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroup,
    __spreadValues({
      "data-slot": "radio-group",
      className: cn("grid w-full gap-2", className)
    }, props)
  );
}
function RadioGroupItem(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadProps(__spreadValues({
      "data-slot": "radio-group-item",
      className: cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input bg-background outline-none hover:border-primary-hover hover:bg-hover group-hover/field:border-primary-hover group-hover/field:bg-hover active:bg-press active:border-primary-press data-checked:hover:bg-primary-hover data-checked:hover:border-primary-hover data-checked:group-hover/field:bg-primary-hover data-checked:group-hover/field:border-primary-hover data-checked:active:bg-primary-press after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled data-checked:disabled:bg-disabled aria-invalid:border-destructive aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:shadow-xs data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        index_parts_exports.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "flex size-4 items-center justify-center",
          children: /* @__PURE__ */ jsx("span", { className: "absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
        }
      )
    })
  );
}

export { RadioGroup2 as RadioGroup, RadioGroupItem };
//# sourceMappingURL=chunk-AYMUJWFQ.mjs.map
//# sourceMappingURL=chunk-AYMUJWFQ.mjs.map