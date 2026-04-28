import { useRender } from './chunk-TVZRNYA7.mjs';
import { cva } from './chunk-7TQTDX5Q.mjs';
import { mergeProps } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __objRest } from './chunk-LQPATFHW.mjs';

// src/components/ui/badge.tsx
var badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-0.5 text-[12px] font-normal text-muted-foreground whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        fill: "bg-secondary",
        outline: "border border-border"
      }
    },
    defaultVariants: {
      variant: "fill"
    }
  }
);
function Badge(_a) {
  var _b = _a, {
    className,
    variant = "fill",
    render
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "render"
  ]);
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });
}

export { Badge, badgeVariants };
//# sourceMappingURL=chunk-CLHOC6TY.mjs.map
//# sourceMappingURL=chunk-CLHOC6TY.mjs.map