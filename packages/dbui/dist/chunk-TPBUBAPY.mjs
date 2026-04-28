import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

function Textarea(_a) {
  var _b = _a, {
    className,
    validation
  } = _b, props = __objRest(_b, [
    "className",
    "validation"
  ]);
  return /* @__PURE__ */ jsx(
    "textarea",
    __spreadValues({
      "data-slot": "textarea",
      "data-validation": validation,
      className: cn(
        "flex field-sizing-content min-h-14 w-full rounded-sm border border-input bg-background px-3 py-2 text-[13px] leading-[20px] shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press placeholder:text-muted-foreground focus-visible:border-ring disabled:bg-muted disabled:text-disabled-foreground disabled:border-disabled disabled:shadow-none disabled:pointer-events-none aria-invalid:border-destructive data-[validation=warning]:border-warning data-[validation=success]:border-success md:text-[13px] dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        className
      )
    }, props)
  );
}

export { Textarea };
//# sourceMappingURL=chunk-TPBUBAPY.mjs.map
//# sourceMappingURL=chunk-TPBUBAPY.mjs.map