// ../../node_modules/@base-ui/utils/esm/detectBrowser.js
var hasNavigator = typeof navigator !== "undefined";
var nav = getNavigatorData();
var platform = getPlatform();
var userAgent = getUserAgent();
var isWebKit = typeof CSS === "undefined" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter:none");
var isIOS = (
  // iPads can claim to be MacIntel
  nav.platform === "MacIntel" && nav.maxTouchPoints > 1 ? true : /iP(hone|ad|od)|iOS/.test(nav.platform)
);
var isFirefox = hasNavigator && /firefox/i.test(userAgent);
var isSafari = hasNavigator && /apple/i.test(navigator.vendor);
var isAndroid = hasNavigator && /android/i.test(platform) || /android/i.test(userAgent);
var isMac = hasNavigator && platform.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
var isJSDOM = userAgent.includes("jsdom/");
function getNavigatorData() {
  var _a, _b;
  if (!hasNavigator) {
    return {
      platform: "",
      maxTouchPoints: -1
    };
  }
  const uaData = navigator.userAgentData;
  if (uaData == null ? void 0 : uaData.platform) {
    return {
      platform: uaData.platform,
      maxTouchPoints: navigator.maxTouchPoints
    };
  }
  return {
    platform: (_a = navigator.platform) != null ? _a : "",
    maxTouchPoints: (_b = navigator.maxTouchPoints) != null ? _b : -1
  };
}
function getUserAgent() {
  if (!hasNavigator) {
    return "";
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map(({
      brand,
      version
    }) => `${brand}/${version}`).join(" ");
  }
  return navigator.userAgent;
}
function getPlatform() {
  var _a;
  if (!hasNavigator) {
    return "";
  }
  const uaData = navigator.userAgentData;
  if (uaData == null ? void 0 : uaData.platform) {
    return uaData.platform;
  }
  return (_a = navigator.platform) != null ? _a : "";
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js
var FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable";
var ACTIVE_KEY = "active";
var SELECTED_KEY = "selected";
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";

export { ACTIVE_KEY, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, FOCUSABLE_ATTRIBUTE, SELECTED_KEY, TYPEABLE_SELECTOR, isAndroid, isFirefox, isIOS, isJSDOM, isMac, isSafari, isWebKit };
//# sourceMappingURL=chunk-BO7ZMLYZ.mjs.map
//# sourceMappingURL=chunk-BO7ZMLYZ.mjs.map