"use client"

import * as React from "react"

import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"

/**
 * Switches the docs between three multipliers over the shipped type ramp.
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
const SCALES = ["1", "1.2", "1.4"] as const
type Scale = (typeof SCALES)[number]

/** The multiplier the docs read at, and the one the attribute never spells out. */
const DEFAULT_SCALE: Scale = "1.2"

export const TYPE_SCALE_KEY = "dbui-type-scale"

const isScale = (v: string | undefined): v is Scale => SCALES.includes(v as Scale)

export function TypeScaleControl() {
  const [scale, setScale] = React.useState<Scale>(DEFAULT_SCALE)

  React.useEffect(() => {
    const current = document.documentElement.dataset.typeScale
    setScale(isScale(current) ? current : DEFAULT_SCALE)
  }, [])

  const apply = React.useCallback((next: Scale) => {
    setScale(next)
    const root = document.documentElement
    // The default is the absence of the attribute, so the default page has no
    // state and nothing has to be undone to get back to it.
    if (next === DEFAULT_SCALE) delete root.dataset.typeScale
    else root.dataset.typeScale = next
    try {
      localStorage.setItem(TYPE_SCALE_KEY, next)
    } catch {
      // Private browsing refuses the write. The scale still applies for this
      // session, so there is nothing useful to tell the reader.
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <span className="type-eyebrow px-2 text-text-subtle">Type scale</span>
      <SegmentControl
        className="flex w-full"
        size="sm"
        value={[scale]}
        onValueChange={(next) => apply(isScale(next[0]) ? next[0] : "1")}
        aria-label="Type scale"
      >
        {SCALES.map((value) => (
          <SegmentControlItem key={value} value={value}>
            {value}x
          </SegmentControlItem>
        ))}
      </SegmentControl>
    </div>
  )
}
