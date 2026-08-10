import { clsx, type ClassValue as ClsxClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

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

/**
 * tailwind-merge resolves a conflict only between utilities it recognizes. An
 * unrecognised class is passed through untouched, so a group it has not been
 * taught reads as "no conflict" and both sides survive — the same silent loss
 * this function exists to prevent, with the merge in place and doing nothing.
 *
 * Every entry below is a DBUI utility its default config cannot see:
 *
 * - **`type-*`** is the one that matters. Each type utility is the whole style —
 *   family, size, line-height, tracking, weight and case — so any two of them
 *   conflict on all six. Matched by prefix rather than by a list of the fourteen
 *   names, because "every `type-*` is the whole style" is the invariant
 *   `type.css` is generated from; a list would go stale the next time the ramp
 *   grows a step. The one-way conflict with the atomic type groups follows from
 *   the same invariant: a later `type-label` replaces an earlier `text-lg` or
 *   `font-bold` because it sets those properties itself, while a later `text-lg`
 *   leaves `type-label` alone because it does not set the other five.
 * - **`radius`** carries DBUI's numbered stops AND its shape roles. Its default
 *   scale is the t-shirt sizes, so `rounded-1` and `rounded-2` both read as
 *   unknown and neither could displace the other — nor could `rounded-full`
 *   displace either. The roles have to be listed for a second reason: a role and
 *   a stop set the same property from different vocabularies, so a component on
 *   `shape-pill` and a consumer passing `rounded-2` would otherwise both reach
 *   the DOM. `full` stays absent because it is a native Tailwind key the default
 *   config already resolves.
 * - **`shadow`** gains `focus`, which the default config otherwise reads as a
 *   shadow *color* rather than a shadow.
 * - **`max-h-none`** is a real Tailwind utility that tailwind-merge's `max-h`
 *   group omits, and `DropdownMenuContent` is overridden with it.
 *
 * Deliberately not taught: the `tw-animate-css` enter and exit utilities
 * (`animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`) and
 * `no-scrollbar`. Every use of the first set sits behind a `data-open` or
 * `data-side` variant, and utilities under different variants never merge, so
 * teaching them would change nothing except the number of ways this can be
 * wrong.
 */
/** `shape-t-container` is a side; `shape-container` is not. Split so a side form
 *  only displaces the matching `rounded-t`, never the whole corner set. */
const SIDES = ["t", "r", "b", "l"] as const
const isSideShape = (side: string) => (v: string) => v.startsWith(`${side}-`)
const isWholeShape = (v: string) => v.length > 0 && !SIDES.some((s) => v.startsWith(`${s}-`))

const twMerge = extendTailwindMerge<"db-type" | "db-shape" | `db-shape-${(typeof SIDES)[number]}`>({
  extend: {
    theme: {
      radius: ["0", "1", "2", "3", "4", "6"],
      shadow: ["focus"],
    },
    classGroups: {
      "db-type": [{ type: [(value: string) => value.length > 0] }],
      "db-shape": [{ shape: [isWholeShape] }],
      "db-shape-t": [{ shape: [isSideShape("t")] }],
      "db-shape-r": [{ shape: [isSideShape("r")] }],
      "db-shape-b": [{ shape: [isSideShape("b")] }],
      "db-shape-l": [{ shape: [isSideShape("l")] }],
      "max-h": ["max-h-none"],
    },
    conflictingClassGroups: {
      "db-type": [
        "font-family",
        "font-size",
        "font-weight",
        "leading",
        "tracking",
        "text-transform",
      ],
      // A shape role and a radius stop set the same property from two
      // vocabularies, so each has to displace the other.
      "db-shape": ["rounded", "db-shape-t", "db-shape-r", "db-shape-b", "db-shape-l"],
      "db-shape-t": ["rounded-t", "rounded-tl", "rounded-tr"],
      "db-shape-r": ["rounded-r", "rounded-tr", "rounded-br"],
      "db-shape-b": ["rounded-b", "rounded-br", "rounded-bl"],
      "db-shape-l": ["rounded-l", "rounded-tl", "rounded-bl"],
      rounded: ["db-shape", "db-shape-t", "db-shape-r", "db-shape-b", "db-shape-l"],
      "rounded-t": ["db-shape-t"],
      "rounded-r": ["db-shape-r"],
      "rounded-b": ["db-shape-b"],
      "rounded-l": ["db-shape-l"],
    },
  },
})

/**
 * Joins class names and resolves Tailwind conflicts between them. Later wins.
 *
 * Because a component's own utilities are passed first and the consumer's
 * `className` last, **a `className` passed into a DBUI component overrides that
 * component's own utilities** for any property both set. That is what every
 * React developer already assumes, and until this function merged it was false:
 * both classes reached the DOM and the stylesheet's emission order picked the
 * winner, so the outcome could flip when an unrelated rename moved a utility in
 * the sheet.
 *
 * ### What it still does not resolve
 *
 * Three cases keep both sides, and the cascade decides rather than this
 * function:
 *
 * - **Different variants.** `hover:bg-x` and `bg-y` are not the same
 *   declaration, so neither displaces the other. Overriding a variant means
 *   passing that variant.
 * - **`!`.** An important class and a plain one never merge, in either
 *   direction — `!important` has already decided. Every `!` inside this package
 *   therefore still does exactly what it did.
 * - **Anything outside the config above**, which is the list of what was taught
 *   and why.
 *
 * And one case it structurally cannot reach: a class list belongs to one
 * element. When a component sizes or colors a *child* — `[&>svg]:size-3` — the
 * child's own class is in a different list and the two never meet here.
 *
 * ### Prefer the component's prop anyway
 *
 * `className` working is not the same as `className` being the interface. A prop
 * is the supported surface: it is what the JSDoc, the CLI and Code Connect
 * describe, and it survives a refactor of the component's internals. A
 * `className` wins by naming the exact utility the component happens to use
 * today, and goes quiet when that utility changes. If no prop covers what you
 * need, flag the gap — adding one is ask-first under `AGENTS.md`.
 *
 * ### `!` is still the wrong tool from outside
 *
 * Tailwind's `!` suffix emits `!important`, for beating a rule this function
 * cannot reach — a parent sizing a child through a descendant selector, a child
 * carrying its own size, the inline style Base UI writes on a positioned
 * element, or a cva key emitted after the one it has to beat. Those are the
 * uses inside this package that still earn it. Merging left several others with
 * nothing to beat; `TRACKER.md` I16 lists them.
 *
 * From outside a component it is worse than it looks, because `!important` does
 * not beat one declaration, it beats all of them. A `!` that corrects the
 * resting state also outranks the component's `hover:`, `focus-visible:`,
 * `disabled:` and `data-active:` variants for that property, so it fixes what
 * was checked and disables what was not. It also cannot be overridden in turn
 * without another `!`, so the next caller escalates rather than resolves. Merging
 * has removed the reason to reach for it: a plain class now wins on its own.
 *
 * ### Sibling packages
 *
 * `dbui-chat` and `dbui-viz` each export their own `cn()`. Both are
 * `twMerge(clsx(...))` against the stock config, so they resolve the standard
 * groups and silently keep both sides for `type-*` and `rounded-*` — the gap
 * this configuration closes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs.filter((input) => typeof input !== "function") as ClsxClassValue[]))
}
