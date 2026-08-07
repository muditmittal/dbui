/**
 * The correct form of every violation in violations.tsx, in the same order.
 *
 * `node scripts/design-lint/verify-rules.mjs` asserts this file reports nothing.
 * Half of a rule's job is staying quiet, and it is the half that fails silently:
 * off-ramp-line-height fired on all 27 correct line heights in the tree and
 * nobody noticed, because a linter that is always complaining and a linter that
 * is right look identical from a distance.
 */
import { Button } from "dbui/components/ui/button"
import { Popover, PopoverTrigger } from "dbui/components/ui/popover"

export function Clean() {
  return (
    <div>
      {/* A DBUI control, not a raw tag */}
      <Button>Save</Button>

      {/* Composition through render, which Base UI implements */}
      <Popover>
        <PopoverTrigger render={<Button>trigger</Button>} />
      </Popover>

      {/* Semantics, named rather than valued */}
      <div className="bg-surface-base text-text-base border-border-base" />
      <div className="shadow-md" />

      {/* On the space family, as a utility */}
      <div className="gap-4" />
      <div className="gap-2" />

      {/* On the size family */}
      <div className="size-4" />

      {/* A radius stop, and the pill */}
      <div className="rounded-2 rounded-full" />

      {/* Type through the ramp — one class is the whole style */}
      <div className="type-label" />
      <div className="type-body text-text-subtle" />
      <div className="type-label-bold" />

      {/* A container width the size family deliberately does not carry */}
      <div className="w-[280px]" />

      {/* Layout distances past the top of the space family */}
      <div className="mt-12 pb-24" />

      {/* Inline styles that set no token-owned property */}
      <div style={{ display: "flex", position: "relative" }} />

      {/* A semantic read through var(), where a class cannot reach */}
      <div style={{ background: "var(--db-surface-subtle)" }} />
    </div>
  )
}
