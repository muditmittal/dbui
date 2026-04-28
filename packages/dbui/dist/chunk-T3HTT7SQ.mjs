// ../../node_modules/@base-ui/utils/esm/error.js
var set;
if (process.env.NODE_ENV !== "production") {
  set = /* @__PURE__ */ new Set();
}
function error(...messages) {
  if (process.env.NODE_ENV !== "production") {
    const messageKey = messages.join(" ");
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.error(`Base UI: ${messageKey}`);
    }
  }
}

export { error };
//# sourceMappingURL=chunk-T3HTT7SQ.mjs.map
//# sourceMappingURL=chunk-T3HTT7SQ.mjs.map