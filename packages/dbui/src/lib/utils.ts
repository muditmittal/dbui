import { clsx, type ClassValue as ClsxClassValue } from "clsx"

/**
 * Base UI types `className` as `string | ((state) => string | undefined)`, so any
 * component that forwards a consumer's `className` into `cn()` may hand it a
 * function. `cn()` has no access to component state and cannot evaluate one, so
 * functions are dropped rather than stringified into the class list.
 *
 * Supporting the function form properly means resolving it at the component
 * boundary, where state is available. Tracked separately.
 */
export type ClassValue = ClsxClassValue | ((...args: never[]) => unknown)

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs.filter((input) => typeof input !== "function") as ClsxClassValue[])
}
