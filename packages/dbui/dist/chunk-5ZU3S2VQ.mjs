// src/lib/utils.ts
function cn(...inputs) {
  return inputs.flat(Infinity).filter((x) => !!x && typeof x !== "boolean").join(" ").replace(/\s+/g, " ").trim();
}

export { cn };
//# sourceMappingURL=chunk-5ZU3S2VQ.mjs.map
//# sourceMappingURL=chunk-5ZU3S2VQ.mjs.map