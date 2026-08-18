"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { TINT_FILL } from "../lib/palette-fill"
import type { VizTint } from "../lib/theme"

/**
 * @standard Leaderboard
 * @guideline Use for top-N rows a reader compares by name — top catalogs, top principals, top warehouses, top tags
 * @guideline Sort descending before passing items. The component draws the order it is given, and a leaderboard out of order reads as a bug
 * @guideline Pass `max` when two lists share a page, so a bar means the same length in both
 * @guideline Name both columns. The label alone does not say whether the number is queries, bytes or grants
 * @guideline Format `value` for the reader — "11.7K", not 11700. The component measures `weight` and never derives the display
 * @constraint Don't use for a continuous series. A date axis is a BarChart; a leaderboard's rows are named things
 * @constraint The palette is `VizTint` and nothing else, because the label sits over the fill. Those steps are authored near the canvas in both modes — light on white, dark on black — so a label keeps the contrast it has against the page. A categorical hue, a `level` base or a high sequential step sits as far from the canvas as the text does, and the row goes unreadable
 * @constraint Reach for a `level-*-subtle` tint only when the ranking IS a judgement — workspaces by high-risk findings. A ranking by magnitude, like catalogs by query count, is a sequential step; painting it `level-high-subtle` asserts those catalogs are findings
 * @constraint One list measures one thing, so every bar takes the same fill. A hue per row would encode an identity the rows do not have
 * @constraint Cap at ten rows. Past that the shortest bars stop being comparable and the card wants a table behind its handoff instead
 * @constraint The bar is a background and never a container. A label clipped to its own bar is unreadable in exactly the rows a reader most wants to check
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5020-9417
 */

/**
 * Leaderboard — ranked rows where the bar length is the value.
 */

/**
 * @deprecated Use `VizTint`, which `Treemap` shares. Kept as an alias so the
 * rename is additive.
 */
export type LeaderboardPalette = VizTint

export interface LeaderboardItem {
  id: string
  /** Sits over the bar, and truncates rather than wrapping. */
  label: string
  /** What the row displays, already formatted. */
  value: React.ReactNode
  /** What the bar measures. */
  weight: number
  /** A leading glyph — a principal type, an asset type. */
  icon?: React.ReactNode
}

export interface LeaderboardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  items: LeaderboardItem[]
  /** The two column headings. Omit for a list with no header. */
  columns?: { label: string; value: string }
  /** Bar denominator. Defaults to the largest weight present. */
  max?: number
  /** The bar fill. A tint, so the label over it stays readable. */
  palette?: VizTint
}

function Leaderboard({
  items,
  columns,
  max,
  palette = "sequential-2",
  className,
  ...props
}: LeaderboardProps) {
  // A bar is a share of the ceiling, so a list of zeroes has to draw nothing
  // rather than divide by one and render every row full.
  const ceiling = Math.max(max ?? 0, ...items.map((item) => item.weight), 0)

  return (
    <div
      data-slot="leaderboard"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {columns ? (
        // Padded to the same 4px the rows are, so a heading sits over the left
        // edge of the bars rather than over the labels inside them.
        <div
          data-slot="leaderboard-header"
          className="flex h-7 items-center gap-2 p-1 type-hint text-text-subtle"
        >
          <span className="min-w-0 flex-1 truncate">{columns.label}</span>
          <span className="shrink-0 text-right">{columns.value}</span>
        </div>
      ) : null}
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.id}
            data-slot="leaderboard-row"
            className="flex h-7 items-center gap-2 p-1"
          >
            <div className="relative min-w-0 flex-1">
              <div
                data-slot="leaderboard-bar"
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 shape-control",
                  TINT_FILL[palette]
                )}
                style={{ width: ceiling > 0 ? `${(item.weight / ceiling) * 100}%` : 0 }}
              />
              {/* Above the bar rather than inside it, so a short bar lets its
                  label run past the fill instead of truncating to nothing. */}
              <div className="relative flex items-center gap-2 px-2 [&_svg:not([class*='size-'])]:size-3">
                {item.icon}
                <span className="truncate type-body text-text-base">
                  {item.label}
                </span>
              </div>
            </div>
            <span className="shrink-0 type-body-bold text-text-base tabular-nums">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Leaderboard }
