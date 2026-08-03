import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn — merge class names with Tailwind conflict resolution.
 *
 * Uses `twMerge(clsx(...))` so a caller-supplied `className` reliably overrides
 * a component's built-in utilities (last-wins), which is the behaviour shadcn
 * consumers and LLMs expect. Kept local to this package so it is purely
 * additive — no existing dbui file is modified.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
