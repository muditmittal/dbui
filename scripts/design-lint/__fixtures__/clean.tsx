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

      {/* A scroll container with a gutter for the focus ring. Every edge: the
          declared axis does not clip harder than the one CSS forces, so `px`
          alone leaves the first and last child's ring against the clip. */}
      <div className="h-40 overflow-y-auto p-1" />
      <div className="overflow-x-auto p-1" />
      <div className="overflow-y-auto pr-2 pl-2 pt-2 pb-2" />

      {/* The nav rail's shape, the one that read as safe while it clipped 3px
          off the bottom of every ring Tab scrolled to. Narrowing this rule back
          to the horizontal axis turns this line green again. */}
      <div className="w-[180px] shrink-0 overflow-y-auto px-3 py-1" />

      {/* The docs rail's shape: the container scrolls only from md up, and the
          gutter is declared at the same breakpoint. A rule that read the
          utility without its variant would report this, so it is here to keep
          that from regressing unnoticed. */}
      <div className="md:overflow-y-auto md:py-1 md:px-1" />

      {/* An unconditional gutter covers a conditional scroll container */}
      <div className="p-2 md:overflow-y-auto" />

      {/* Clipping on purpose, with the rows flush and the ring moved inside —
          DocAccordion's list variant. Not this rule's business. */}
      <div className="overflow-hidden rounded-2 border border-border-base" />

      {/* An icon-only control that names the action rather than the glyph */}
      <Button size="icon-md" aria-label="Close" />

      {/* A labeled control needs no aria-label — the text is the name */}
      <Button size="md">Save</Button>

      {/* Decorative, and explicit about it. Absence is the defect, not emptiness. */}
      <img src="/docs/texture.png" alt="" width={864} height={300} />

      {/* The two tabIndex values that do not reorder the page */}
      <div tabIndex={0} />
      <div tabIndex={-1} />

      {/* Hidden from assistive tech AND out of the tab order — the pair that
          makes aria-hidden correct rather than a trap */}
      <div aria-hidden="true" tabIndex={-1} />

      {/* A deliberate custom control says so: a role and a tab stop together */}
      <div onClick={() => {}} role="button" tabIndex={0} />

      {/* A click on a host that is not pretending to be a control */}
      <div onClick={() => {}} role="presentation" />
    </div>
  )
}
