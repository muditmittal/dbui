import { serializeValue } from './chunk-PTVDKL3E.mjs';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/utils/itemEquality.js
var defaultItemEquality = (itemValue, selectedValue) => Object.is(itemValue, selectedValue);
function compareItemEquality(itemValue, selectedValue, comparer) {
  if (itemValue == null || selectedValue == null) {
    return Object.is(itemValue, selectedValue);
  }
  return comparer(itemValue, selectedValue);
}
function selectedValueIncludes(selectedValues, itemValue, comparer) {
  if (!selectedValues || selectedValues.length === 0) {
    return false;
  }
  return selectedValues.some((selectedValue) => {
    if (selectedValue === void 0) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}
function findItemIndex(itemValues, selectedValue, comparer) {
  if (!itemValues || itemValues.length === 0) {
    return -1;
  }
  return itemValues.findIndex((itemValue) => {
    if (itemValue === void 0) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}
function removeItem(selectedValues, itemValue, comparer) {
  return selectedValues.filter((selectedValue) => !compareItemEquality(itemValue, selectedValue, comparer));
}
function isGroupedItems(items) {
  return items != null && items.length > 0 && typeof items[0] === "object" && items[0] != null && "items" in items[0];
}
function hasNullItemLabel(items) {
  if (!Array.isArray(items)) {
    return items != null && "null" in items;
  }
  const arrayItems = items;
  if (isGroupedItems(arrayItems)) {
    for (const group of arrayItems) {
      for (const item of group.items) {
        if (item && item.value == null && item.label != null) {
          return true;
        }
      }
    }
    return false;
  }
  for (const item of arrayItems) {
    if (item && item.value == null && item.label != null) {
      return true;
    }
  }
  return false;
}
function stringifyAsLabel(item, itemToStringLabel) {
  var _a;
  if (itemToStringLabel && item != null) {
    return (_a = itemToStringLabel(item)) != null ? _a : "";
  }
  if (item && typeof item === "object") {
    if ("label" in item && item.label != null) {
      return String(item.label);
    }
    if ("value" in item) {
      return String(item.value);
    }
  }
  return serializeValue(item);
}
function stringifyAsValue(item, itemToStringValue) {
  var _a;
  if (itemToStringValue && item != null) {
    return (_a = itemToStringValue(item)) != null ? _a : "";
  }
  if (item && typeof item === "object" && "value" in item && "label" in item) {
    return serializeValue(item.value);
  }
  return serializeValue(item);
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
  var _a;
  function fallback() {
    return stringifyAsLabel(value, itemToStringLabel);
  }
  if (itemToStringLabel && value != null) {
    return itemToStringLabel(value);
  }
  if (value && typeof value === "object" && "label" in value && value.label != null) {
    return value.label;
  }
  if (items && !Array.isArray(items)) {
    return (_a = items[value]) != null ? _a : fallback();
  }
  if (Array.isArray(items)) {
    const arrayItems = items;
    const flatItems = isGroupedItems(arrayItems) ? arrayItems.flatMap((group) => group.items) : arrayItems;
    if (value == null || typeof value !== "object") {
      const match = flatItems.find((item) => item.value === value);
      if (match && match.label != null) {
        return match.label;
      }
      return fallback();
    }
    if ("value" in value) {
      const match = flatItems.find((item) => item && item.value === value.value);
      if (match && match.label != null) {
        return match.label;
      }
    }
  }
  return fallback();
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
  return values.reduce((acc, value, index) => {
    if (index > 0) {
      acc.push(", ");
    }
    acc.push(/* @__PURE__ */ jsx(React.Fragment, {
      children: resolveSelectedLabel(value, items, itemToStringLabel)
    }, index));
    return acc;
  }, []);
}

export { compareItemEquality, defaultItemEquality, findItemIndex, hasNullItemLabel, isGroupedItems, removeItem, resolveMultipleLabels, resolveSelectedLabel, selectedValueIncludes, stringifyAsLabel, stringifyAsValue };
//# sourceMappingURL=chunk-B4K6AF4V.mjs.map
//# sourceMappingURL=chunk-B4K6AF4V.mjs.map