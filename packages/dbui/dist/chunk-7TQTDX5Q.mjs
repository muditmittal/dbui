import { __objRest } from './chunk-LQPATFHW.mjs';

// src/lib/cva.ts
function cva(base, config) {
  return (props) => {
    var _a, _b, _c;
    const parts = [];
    if (base) parts.push(base);
    const variants = config == null ? void 0 : config.variants;
    if (variants && props) {
      for (const key in variants) {
        const value = (_b = props[key]) != null ? _b : (_a = config == null ? void 0 : config.defaultVariants) == null ? void 0 : _a[key];
        if (value != null) {
          const cls = variants[key][value];
          if (cls) parts.push(cls);
        }
      }
    } else if (variants && (config == null ? void 0 : config.defaultVariants)) {
      for (const key in config.defaultVariants) {
        const value = config.defaultVariants[key];
        if (value != null) {
          const cls = (_c = variants[key]) == null ? void 0 : _c[value];
          if (cls) parts.push(cls);
        }
      }
    }
    if (config == null ? void 0 : config.compoundVariants) {
      for (const cv of config.compoundVariants) {
        const _d = cv, { class: cls, className } = _d, conditions = __objRest(_d, ["class", "className"]);
        const match = Object.entries(conditions).every(([key, val]) => {
          var _a2, _b2;
          const actual = (_b2 = props == null ? void 0 : props[key]) != null ? _b2 : (_a2 = config == null ? void 0 : config.defaultVariants) == null ? void 0 : _a2[key];
          return Array.isArray(val) ? val.includes(actual) : actual === val;
        });
        if (match) {
          if (cls) parts.push(cls);
          if (className) parts.push(className);
        }
      }
    }
    const extra = (props == null ? void 0 : props.class) || (props == null ? void 0 : props.className);
    if (extra) parts.push(extra);
    return parts.filter(Boolean).join(" ");
  };
}

export { cva };
//# sourceMappingURL=chunk-7TQTDX5Q.mjs.map
//# sourceMappingURL=chunk-7TQTDX5Q.mjs.map