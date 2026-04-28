import { Separator } from './chunk-6GJBCEWE.mjs';
import { useRender } from './chunk-TVZRNYA7.mjs';
import { cva } from './chunk-7TQTDX5Q.mjs';
import { mergeProps } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

var splitButtonVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=split-button]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-sm [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-sm! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:-ml-px",
        vertical: "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-sm! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function SplitButton(_a) {
  var _b = _a, {
    className,
    orientation
  } = _b, props = __objRest(_b, [
    "className",
    "orientation"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      role: "group",
      "data-slot": "split-button",
      "data-orientation": orientation,
      className: cn(splitButtonVariants({ orientation }), className)
    }, props)
  );
}
function SplitButtonText(_a) {
  var _b = _a, {
    className,
    render
  } = _b, props = __objRest(_b, [
    "className",
    "render"
  ]);
  return useRender({
    defaultTagName: "div",
    props: mergeProps(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-[13px] font-semibold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "split-button-text"
    }
  });
}
function SplitButtonSeparator(_a) {
  var _b = _a, {
    className,
    orientation = "vertical"
  } = _b, props = __objRest(_b, [
    "className",
    "orientation"
  ]);
  return /* @__PURE__ */ jsx(
    Separator,
    __spreadValues({
      "data-slot": "split-button-separator",
      orientation,
      className: cn(
        "relative self-stretch bg-primary-foreground/20 data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )
    }, props)
  );
}

export { SplitButton, SplitButtonSeparator, SplitButtonText, splitButtonVariants };
//# sourceMappingURL=chunk-2VNOCX4M.mjs.map
//# sourceMappingURL=chunk-2VNOCX4M.mjs.map