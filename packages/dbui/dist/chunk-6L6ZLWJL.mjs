import { Textarea } from './chunk-TPBUBAPY.mjs';
import { Button } from './chunk-RQBQDFLU.mjs';
import { cva } from './chunk-7TQTDX5Q.mjs';
import { Input } from './chunk-RALFBPK4.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import { jsx } from 'react/jsx-runtime';

function InputGroup(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-sm border border-input bg-background shadow-xs transition-colors outline-none hover:border-primary active:border-primary-press in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-disabled has-disabled:border-disabled has-disabled:shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )
    }, props)
  );
}
var inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-[13px] font-semibold text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon(_a) {
  var _b = _a, {
    className,
    align = "inline-start"
  } = _b, props = __objRest(_b, [
    "className",
    "align"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (e) => {
        var _a2, _b2;
        if (e.target.closest("button")) {
          return;
        }
        (_b2 = (_a2 = e.currentTarget.parentElement) == null ? void 0 : _a2.querySelector("input")) == null ? void 0 : _b2.focus();
      }
    }, props)
  );
}
var inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-[13px] shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
);
function InputGroupButton(_a) {
  var _b = _a, {
    className,
    type = "button",
    variant = "ghost",
    size = "xs"
  } = _b, props = __objRest(_b, [
    "className",
    "type",
    "variant",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    Button,
    __spreadValues({
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className)
    }, props)
  );
}
function InputGroupText(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      className: cn(
        "flex items-center gap-2 text-[13px] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function InputGroupInput(_a) {
  var _b = _a, {
    className,
    size: _nativeSize
  } = _b, props = __objRest(_b, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsx(
    Input,
    __spreadValues({
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )
    }, props)
  );
}
function InputGroupTextarea(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    Textarea,
    __spreadValues({
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )
    }, props)
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea };
//# sourceMappingURL=chunk-6L6ZLWJL.mjs.map
//# sourceMappingURL=chunk-6L6ZLWJL.mjs.map