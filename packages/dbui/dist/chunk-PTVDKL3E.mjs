// ../../node_modules/@base-ui/react/esm/utils/serializeValue.js
function serializeValue(value) {
  if (value == null) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch (e) {
    return String(value);
  }
}

export { serializeValue };
//# sourceMappingURL=chunk-PTVDKL3E.mjs.map
//# sourceMappingURL=chunk-PTVDKL3E.mjs.map