"use client"

import * as React from "react"

import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"

/**
 * Switches the whole site between three multipliers over the shipped type ramp.
 *
 * The multiplier is applied by `html[data-type-scale]` in globals.css, which
 * moves the root font size. Everything spatial is authored in rem against that
 * root, so one attribute rescales type, space, radius and control sizes
 * together. This component only writes the attribute — it holds no sizes of
 * its own, and there is no second ramp anywhere.
 *
 * The attribute is set before paint by the script in `app/layout.tsx`, so this
 * reads the DOM on mount rather than owning the value. Rendering from state
 * would either flash the wrong segment or mismatch hydration.
 */
const SCALES = ["1", "1.1", "1.2"] as const
type Scale = (typeof SCALES)[number]

/**
 * The multiplier the site reads at, and the one the attribute never spells out.
 *
 * 1x, so the docs show the ramp at its stated values — a step documented as
 * 13px measures 13px. The two larger stops are reading comfort, not the
 * subject: a reader who wants roomier docs is one click away, and that choice
 * is what gets stored.
 */
const DEFAULT_SCALE: Scale = "1"

export const TYPE_SCALE_KEY = "dbui-type-scale"

/**
 * The glyph previews the step rather than naming it, which is what lets the
 * control sit in a footer at the width of three characters. The style class
 * goes on a span rather than on the item: `type-label` is already on the item
 * and these utilities do not merge, so the later-defined one would win and the
 * smallest step would silently render at the middle size.
 *
 * `title-4` is the top step because it is the only ramp style far enough above
 * `label` to read as larger at this size. Its extra weight is doing work too —
 * size alone across 12, 13 and 16 is too small a spread to see in a footer.
 */
const STEPS: Array<{ value: Scale; glyph: string; label: string }> = [
  { value: "1", glyph: "type-hint", label: "1x" },
  { value: "1.1", glyph: "type-label", label: "1.1x" },
  { value: "1.2", glyph: "type-title-4", label: "1.2x" },
]

const isScale = (v: string | undefined): v is Scale => SCALES.includes(v as Scale)

export function TypeScaleControl() {
  const [scale, setScale] = React.useState<Scale>(DEFAULT_SCALE)

  React.useEffect(() => {
    const current = document.documentElement.dataset.typeScale
    setScale(isScale(current) ? current : DEFAULT_SCALE)
    // A stop that has been retired is still in someone's storage. The pre-paint
    // script already ignores a value it does not recognise, so the page renders
    // correctly either way — but left there it is a preference that can never be
    // honoured and never be seen, and it would come back to life if that string
    // were ever reused for a different multiplier.
    try {
      const stored = localStorage.getItem(TYPE_SCALE_KEY)
      if (stored !== null && !isScale(stored)) localStorage.removeItem(TYPE_SCALE_KEY)
    } catch {
      // Private browsing refuses both the read and the write. Nothing to clean.
    }
  }, [])

  const apply = React.useCallback((next: Scale) => {
    setScale(next)
    const root = document.documentElement
    // The default is the absence of the attribute, so the default page has no
    // state and nothing has to be undone to get back to it.
    if (next === DEFAULT_SCALE) delete root.dataset.typeScale
    else root.dataset.typeScale = next
    try {
      // Storage follows the same rule as the attribute: it holds a deliberate
      // non-default choice, and the default clears it. Writing the default
      // instead would leave a value that is indistinguishable from a
      // preference, so the next time the default moves it would override the
      // new one for every reader who had ever touched this control.
      if (next === DEFAULT_SCALE) localStorage.removeItem(TYPE_SCALE_KEY)
      else localStorage.setItem(TYPE_SCALE_KEY, next)
    } catch {
      // Private browsing refuses the write. The scale still applies for this
      // session, so there is nothing useful to tell the reader.
    }
  }, [])

  return (
    <SegmentControl
      size="md"
      value={[scale]}
      onValueChange={(next) => apply(isScale(next[0]) ? next[0] : DEFAULT_SCALE)}
      aria-label="Type scale"
    >
      {STEPS.map((step) => (
        <SegmentControlItem key={step.value} value={step.value} aria-label={step.label}>
          <span className={step.glyph}>A</span>
        </SegmentControlItem>
      ))}
    </SegmentControl>
  )
}
