// ../../node_modules/@base-ui/react/esm/utils/formatNumber.js
var cache = /* @__PURE__ */ new Map();
function getFormatter(locale, options) {
  const optionsString = JSON.stringify({
    locale,
    options
  });
  const cachedFormatter = cache.get(optionsString);
  if (cachedFormatter) {
    return cachedFormatter;
  }
  const formatter = new Intl.NumberFormat(locale, options);
  cache.set(optionsString, formatter);
  return formatter;
}
function formatNumber(value, locale, options) {
  if (value == null) {
    return "";
  }
  return getFormatter(locale, options).format(value);
}
function formatNumberValue(value, locale, format) {
  if (value == null) {
    return "";
  }
  if (!format) {
    return formatNumber(value / 100, locale, {
      style: "percent"
    });
  }
  return formatNumber(value, locale, format);
}

// ../../node_modules/@base-ui/react/esm/utils/valueToPercent.js
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}

export { formatNumber, formatNumberValue, valueToPercent };
//# sourceMappingURL=chunk-FQY64KH3.mjs.map
//# sourceMappingURL=chunk-FQY64KH3.mjs.map