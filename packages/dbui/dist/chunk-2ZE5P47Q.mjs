import { createSelector, FloatingRootStore, PopupTriggerMap } from './chunk-PSMHWWS3.mjs';
import { useTransitionStatus, useOpenChangeComplete } from './chunk-INMEVUNJ.mjs';
import { useStableCallback } from './chunk-3XULTTOV.mjs';
import { useIsoLayoutEffect } from './chunk-C575TH42.mjs';
import { EMPTY_OBJECT } from './chunk-I44XWQG6.mjs';
import { __spreadValues } from './chunk-LQPATFHW.mjs';
import * as React from 'react';

function useTriggerRegistration(id, store) {
  const registeredElementIdRef = React.useRef(null);
  const registeredElementRef = React.useRef(null);
  return React.useCallback((element) => {
    if (id === void 0) {
      return;
    }
    if (registeredElementIdRef.current !== null) {
      const registeredId = registeredElementIdRef.current;
      const registeredElement = registeredElementRef.current;
      const currentElement = store.context.triggerElements.getById(registeredId);
      if (registeredElement && currentElement === registeredElement) {
        store.context.triggerElements.delete(registeredId);
      }
      registeredElementIdRef.current = null;
      registeredElementRef.current = null;
    }
    if (element !== null) {
      registeredElementIdRef.current = id;
      registeredElementRef.current = element;
      store.context.triggerElements.add(id, element);
    }
  }, [store, id]);
}
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
  const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
  const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
  const registerTrigger = useStableCallback((element) => {
    baseRegisterTrigger(element);
    if (!element || !store.select("open")) {
      return;
    }
    const activeTriggerId = store.select("activeTriggerId");
    if (activeTriggerId === triggerId) {
      store.update(__spreadValues({
        activeTriggerElement: element
      }, stateUpdates));
      return;
    }
    if (activeTriggerId == null) {
      store.update(__spreadValues({
        activeTriggerId: triggerId,
        activeTriggerElement: element
      }, stateUpdates));
    }
  });
  useIsoLayoutEffect(() => {
    if (isMountedByThisTrigger) {
      store.update(__spreadValues({
        activeTriggerElement: triggerElementRef.current
      }, stateUpdates));
    }
  }, [isMountedByThisTrigger, store, triggerElementRef, ...Object.values(stateUpdates)]);
  return {
    registerTrigger,
    isMountedByThisTrigger
  };
}
function useImplicitActiveTrigger(store) {
  const open = store.useState("open");
  useIsoLayoutEffect(() => {
    if (open && !store.select("activeTriggerId") && store.context.triggerElements.size === 1) {
      const iteratorResult = store.context.triggerElements.entries().next();
      if (!iteratorResult.done) {
        const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
        store.update({
          activeTriggerId: implicitTriggerId,
          activeTriggerElement: implicitTriggerElement
        });
      }
    }
  }, [open, store]);
}
function useOpenStateTransitions(open, store, onUnmount) {
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  store.useSyncedValues({
    mounted,
    transitionStatus
  });
  const forceUnmount = useStableCallback(() => {
    var _a, _b;
    setMounted(false);
    store.update({
      activeTriggerId: null,
      activeTriggerElement: null,
      mounted: false
    });
    onUnmount == null ? void 0 : onUnmount();
    (_b = (_a = store.context).onOpenChangeComplete) == null ? void 0 : _b.call(_a, false);
  });
  const preventUnmountingOnClose = store.useState("preventUnmountingOnClose");
  useOpenChangeComplete({
    enabled: !preventUnmountingOnClose,
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (!open) {
        forceUnmount();
      }
    }
  });
  return {
    forceUnmount,
    transitionStatus
  };
}

// ../../node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function getEmptyRootContext() {
  return new FloatingRootStore({
    open: false,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new PopupTriggerMap(),
    floatingId: "",
    nested: false,
    noEmit: false,
    onOpenChange: void 0
  });
}

// ../../node_modules/@base-ui/react/esm/utils/popups/store.js
function createInitialPopupStoreState() {
  return {
    open: false,
    openProp: void 0,
    mounted: false,
    transitionStatus: "idle",
    floatingRootContext: getEmptyRootContext(),
    preventUnmountingOnClose: false,
    payload: void 0,
    activeTriggerId: null,
    activeTriggerElement: null,
    triggerIdProp: void 0,
    popupElement: null,
    positionerElement: null,
    activeTriggerProps: EMPTY_OBJECT,
    inactiveTriggerProps: EMPTY_OBJECT,
    popupProps: EMPTY_OBJECT
  };
}
var activeTriggerIdSelector = createSelector((state) => {
  var _a;
  return (_a = state.triggerIdProp) != null ? _a : state.activeTriggerId;
});
var popupStoreSelectors = {
  open: createSelector((state) => {
    var _a;
    return (_a = state.openProp) != null ? _a : state.open;
  }),
  mounted: createSelector((state) => state.mounted),
  transitionStatus: createSelector((state) => state.transitionStatus),
  floatingRootContext: createSelector((state) => state.floatingRootContext),
  preventUnmountingOnClose: createSelector((state) => state.preventUnmountingOnClose),
  payload: createSelector((state) => state.payload),
  activeTriggerId: activeTriggerIdSelector,
  activeTriggerElement: createSelector((state) => state.mounted ? state.activeTriggerElement : null),
  /**
   * Whether the trigger with the given ID was used to open the popup.
   */
  isTriggerActive: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId),
  /**
   * Whether the popup is open and was activated by a trigger with the given ID.
   */
  isOpenedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.open),
  /**
   * Whether the popup is mounted and was activated by a trigger with the given ID.
   */
  isMountedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted),
  triggerProps: createSelector((state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
  popupProps: createSelector((state) => state.popupProps),
  popupElement: createSelector((state) => state.popupElement),
  positionerElement: createSelector((state) => state.positionerElement)
};

export { createInitialPopupStoreState, popupStoreSelectors, useImplicitActiveTrigger, useOpenStateTransitions, useTriggerDataForwarding, useTriggerRegistration };
//# sourceMappingURL=chunk-2ZE5P47Q.mjs.map
//# sourceMappingURL=chunk-2ZE5P47Q.mjs.map