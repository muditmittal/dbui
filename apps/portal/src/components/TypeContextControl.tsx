"use client"

import * as React from "react"

import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"

import { typeContextDefault, type TypeContext } from "@/stories/tokens/token-data"

/**
 * Which set of measurements the type ramp is showing.
 *
 * A context is not a scale, and the two controls are not variants of each
 * other. The footer's 1x/1.1x/1.2x moves the root font size — `html` at 100%,
 * 110% or 120% in globals.css — so everything authored in rem grows with it:
 * type, space, radius and control sizes together. It is deliberately not
 * `--db-type-scalar`, which moves the ramp and leaves the boxes around it where
 * they were — globals.css carries that reasoning. A context is a different value
 * set: mobile grows interface and reading text while shrinking the largest
 * display step, which is a change no single multiplier can express. They
 * compose, so this is a second control rather than three more stops on that one.
 *
 * There is no global context control, and this is not one. A context is opt-in,
 * so the document renders the default ramp at every width and this overrides it
 * for the specimens in one section, in the same sense the color switch overrides
 * the footer's mode for one section.
 */

/**
 * Opens on the default context and stays where the reader puts it.
 *
 * There is nothing ambient to seed from. A context activates only when
 * something sets `data-type-context`, so a document that declares nothing
 * renders the default at every width — the reasoning is in `theme.config.mjs`.
 * This did once read a media query per context, until those left the token
 * layer: a query inside an iframe measures the iframe, so every story canvas
 * narrower than the threshold was rendering the phone ramp on a desktop.
 *
 * The default is derived by the generator rather than read off position here,
 * because the order the contexts ship in is a different setting from which one
 * lands in `:root`.
 *
 * It writes nothing — no attribute on the document, no storage. All it drives
 * is one attribute per specimen.
 */
export function useTypeContext(): [string, (next: string) => void] {
  return React.useState<string>(typeContextDefault ?? "")
}

/** The config names contexts in lowercase; a segment is a label. */
const titleCase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

/**
 * The same control, the same size and the same slot as the color switch, with
 * text segments instead of icons. There is no device glyph in the icon set —
 * no monitor, no phone, in 456 icons — and a pair drawn for this one control
 * would be a new icon in a curated set to say something two words already say.
 */
export function TypeContextControl({
  contexts,
  value,
  onValueChange,
  label,
}: {
  contexts: TypeContext[]
  value: string
  onValueChange: (next: string) => void
  label: string
}) {
  return (
    <SegmentControl
      size="md"
      value={[value]}
      onValueChange={(next) => onValueChange(typeof next[0] === "string" ? next[0] : value)}
      aria-label={label}
    >
      {contexts.map((context) => (
        <SegmentControlItem key={context.name} value={context.name}>
          {titleCase(context.name)}
        </SegmentControlItem>
      ))}
    </SegmentControl>
  )
}
