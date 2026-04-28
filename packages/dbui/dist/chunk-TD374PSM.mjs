import { useTimeout } from './chunk-NJQVCWLB.mjs';
import { transitionStatusMapping, useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { useRenderElement, formatErrorMessage_default, NOOP } from './chunk-I44XWQG6.mjs';
import { cn } from './chunk-5ZU3S2VQ.mjs';
import { __export, __objRest, __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React2 from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../node_modules/@base-ui/react/esm/avatar/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Fallback: () => AvatarFallback,
  Image: () => AvatarImage,
  Root: () => AvatarRoot
});
var AvatarRootContext = /* @__PURE__ */ React2.createContext(void 0);
if (process.env.NODE_ENV !== "production") AvatarRootContext.displayName = "AvatarRootContext";
function useAvatarRootContext() {
  const context = React2.useContext(AvatarRootContext);
  if (context === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: AvatarRootContext is missing. Avatar parts must be placed within <Avatar.Root>." : formatErrorMessage_default(13));
  }
  return context;
}

// ../../node_modules/@base-ui/react/esm/avatar/root/stateAttributesMapping.js
var avatarStateAttributesMapping = {
  imageLoadingStatus: () => null
};
var AvatarRoot = /* @__PURE__ */ React2.forwardRef(function AvatarRoot2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render"
  ]);
  const [imageLoadingStatus, setImageLoadingStatus] = React2.useState("idle");
  const state = {
    imageLoadingStatus
  };
  const contextValue = React2.useMemo(() => ({
    imageLoadingStatus,
    setImageLoadingStatus
  }), [imageLoadingStatus, setImageLoadingStatus]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping
  });
  return /* @__PURE__ */ jsx(AvatarRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") AvatarRoot.displayName = "AvatarRoot";
function useImageLoadingStatus(src, {
  referrerPolicy,
  crossOrigin
}) {
  const [loadingStatus, setLoadingStatus] = React2.useState("idle");
  useIsoLayoutEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return NOOP;
    }
    let isMounted = true;
    const image = new window.Image();
    const updateStatus = (status) => () => {
      if (!isMounted) {
        return;
      }
      setLoadingStatus(status);
    };
    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    image.crossOrigin = crossOrigin != null ? crossOrigin : null;
    image.src = src;
    return () => {
      isMounted = false;
    };
  }, [src, crossOrigin, referrerPolicy]);
  return loadingStatus;
}

// ../../node_modules/@base-ui/react/esm/avatar/image/AvatarImage.js
var stateAttributesMapping = __spreadValues(__spreadValues({}, avatarStateAttributesMapping), transitionStatusMapping);
var AvatarImage = /* @__PURE__ */ React2.forwardRef(function AvatarImage2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    onLoadingStatusChange: onLoadingStatusChangeProp,
    referrerPolicy,
    crossOrigin
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "onLoadingStatusChange",
    "referrerPolicy",
    "crossOrigin"
  ]);
  const context = useAvatarRootContext();
  const imageLoadingStatus = useImageLoadingStatus(componentProps.src, {
    referrerPolicy,
    crossOrigin
  });
  const isVisible = imageLoadingStatus === "loaded";
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(isVisible);
  const imageRef = React2.useRef(null);
  const handleLoadingStatusChange = useStableCallback((status) => {
    onLoadingStatusChangeProp == null ? void 0 : onLoadingStatusChangeProp(status);
    context.setImageLoadingStatus(status);
  });
  useIsoLayoutEffect(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  const state = {
    imageLoadingStatus,
    transitionStatus
  };
  useOpenChangeComplete({
    open: isVisible,
    ref: imageRef,
    onComplete() {
      if (!isVisible) {
        setMounted(false);
      }
    }
  });
  const element = useRenderElement("img", componentProps, {
    state,
    ref: [forwardedRef, imageRef],
    props: elementProps,
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") AvatarImage.displayName = "AvatarImage";
var AvatarFallback = /* @__PURE__ */ React2.forwardRef(function AvatarFallback2(componentProps, forwardedRef) {
  const _a = componentProps, {
    className,
    render,
    delay
  } = _a, elementProps = __objRest(_a, [
    "className",
    "render",
    "delay"
  ]);
  const {
    imageLoadingStatus
  } = useAvatarRootContext();
  const [delayPassed, setDelayPassed] = React2.useState(delay === void 0);
  const timeout = useTimeout();
  React2.useEffect(() => {
    if (delay !== void 0) {
      timeout.start(delay, () => setDelayPassed(true));
    }
    return timeout.clear;
  }, [timeout, delay]);
  const state = {
    imageLoadingStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping,
    enabled: imageLoadingStatus !== "loaded" && delayPassed
  });
  return element;
});
if (process.env.NODE_ENV !== "production") AvatarFallback.displayName = "AvatarFallback";
function Avatar(_a) {
  var _b = _a, {
    className,
    size = "default",
    type = "initials"
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "type"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Root,
    __spreadValues({
      "data-slot": "avatar",
      "data-size": size,
      "data-type": type,
      className: cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )
    }, props)
  );
}
function AvatarImage3(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Image,
    __spreadValues({
      "data-slot": "avatar-image",
      className: cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )
    }, props)
  );
}
function AvatarFallback3(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    index_parts_exports.Fallback,
    __spreadValues({
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-[13px] font-semibold text-muted-foreground group-data-[size=sm]/avatar:text-[12px]",
        className
      )
    }, props)
  );
}
function AvatarBadge(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "span",
    __spreadValues({
      "data-slot": "avatar-badge",
      className: cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )
    }, props)
  );
}
function AvatarGroup(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "avatar-group",
      className: cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )
    }, props)
  );
}
function AvatarGroupCount(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      "data-slot": "avatar-group-count",
      className: cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[13px] text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )
    }, props)
  );
}

export { Avatar, AvatarBadge, AvatarFallback3 as AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage3 as AvatarImage };
//# sourceMappingURL=chunk-TD374PSM.mjs.map
//# sourceMappingURL=chunk-TD374PSM.mjs.map