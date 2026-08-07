/**
 * One deliberate violation per react-lint rule.
 *
 * Not a demo. `node scripts/design-lint/verify-rules.mjs` asserts that every
 * rule the linter declares fires at least once here and not once in clean.tsx,
 * so a rule that silently stops matching fails the check instead of going
 * quiet. That failure mode is the one this whole file exists for:
 * off-ramp-line-height compared against a field name that did not exist and
 * fired on everything, and off-scale-spacing read only bracket values and fired
 * on nothing, and both looked healthy from the outside for months.
 *
 * This directory sits outside the scan roots, so a whole-repo run never sees it.
 *
 * Nothing here should be copied. Every line is wrong on purpose.
 */
// non-dbui-component — a name the package does not export
import { Buton } from "dbui/components/ui/button"
import { Popover } from "dbui/components/ui/popover"

export function Violations() {
  return (
    <div>
      {/* no-raw-interactive-html */}
      <button type="button">Save</button>

      {/* no-as-child — Base UI drops the prop and wraps the child */}
      <Popover asChild>
        <span>trigger</span>
      </Popover>

      {/* non-dbui-component */}
      <Buton />

      {/* no-arbitrary-color */}
      <div className="bg-[#123456]" />

      {/* no-hardcoded-hex — a hex inside a longer arbitrary value */}
      <div className="shadow-[0_0_0_1px_#123456]" />

      {/* prefer-token-class — on the family, written as a value */}
      <div className="gap-[16px]" />

      {/* no-primitive-token — reaching past the semantic layer */}
      <div className="bg-[var(--interface-neutral-600)]" />

      {/* no-legacy-token — deleted by the token migration */}
      <div className="bg-primary text-foreground" />

      {/* off-scale-spacing — 6px, the drift the bracket-only rule could not see */}
      <div className="gap-1.5" />

      {/* off-scale-size — a 14px icon box between the 12 and 16 stops */}
      <div className="size-3.5" />

      {/* non-token-radius */}
      <div className="rounded-[5px]" />

      {/* off-ramp-type-size */}
      <div className="text-[17px]" />

      {/* off-ramp-line-height */}
      <div className="leading-[19px]" />

      {/* px-type-literal — on the ramp, and still unable to follow it */}
      <div className="text-[13px]" />

      {/* type-class-conflict — the utility already carries the weight */}
      <div className="type-label font-semibold" />

      {/* inline-hardcoded-color */}
      <div style={{ color: "#123456" }} />

      {/* inline-off-scale-spacing */}
      <div style={{ padding: 6 }} />

      {/* inline-type-literal */}
      <div style={{ fontSize: 22, lineHeight: "28px" }} />
    </div>
  )
}
