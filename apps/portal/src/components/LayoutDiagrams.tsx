import * as React from "react"

import { Figure, FigureLabel } from "@/components/docs/Diagram"
import { panels } from "@/components/layout-data"

/**
 * Three plan views of a screen, drawn in the language `Diagram.tsx` sets: one
 * hairline frame, hairline dividers, an eyebrow to name a lane, mono for a
 * literal name in the system and no color.
 *
 * A layout guide is the one place where a picture is cheaper than prose, because
 * every rule on the page is about adjacency and adjacency is what a sentence is
 * worst at. Six sentences about where the tabs go are one row in a skeleton.
 *
 * These carry one signal the other diagrams in the portal do not need: a fill to
 * mark the band that scrolls. It is the only non-type mark used, it means one
 * thing everywhere it appears and the legend names it, which is the condition
 * under which a mark is information rather than decoration.
 *
 * Presentational and stateless, so they render inside a server page.
 */

/** The fill that means "this is the container that scrolls". Nothing else uses it. */
const SCROLLS = "bg-surface-inset"

/**
 * A band in a plan view: what the region is on the left, what qualifies it on
 * the right. The qualifier column is fixed so the qualifiers line up down the
 * diagram and can be read as a column of their own.
 */
function Band({
  name,
  note,
  scrolls = false,
  muted = false,
  className = "",
}: {
  name: string
  note?: string
  scrolls?: boolean
  muted?: boolean
  className?: string
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 px-3 py-2 ${
        scrolls ? SCROLLS : ""
      } ${className}`}
    >
      <span className={`type-label ${muted ? "text-text-subtle" : "text-text-strong"}`}>{name}</span>
      {note ? <span className="type-hint shrink-0 text-text-subtle">{note}</span> : null}
    </div>
  )
}

/**
 * The frame and the default page in one picture, because they are one picture:
 * the three regions of a page only mean anything inside the frame that fixes
 * their width and takes their height away.
 *
 * Every optional slot is drawn rather than listed. The order is the rule, and a
 * reader who has seen the ladder once does not need to be told twice that tabs
 * sit above the controls bar.
 */
export function DefaultPageFigure() {
  return (
    <Figure caption="Regions marked optional are absent unless the page has a reason for them. The filled band is the one container that scrolls.">
      <div className="flex flex-col">
        <Band name="Platform header" note="fixed · 1 per app" className="bg-surface-subtle" />

        <div className="flex border-t border-border-base">
          <div className="flex w-28 shrink-0 flex-col justify-between gap-6 border-r border-border-base bg-surface-subtle px-3 py-2 sm:w-36">
            <span className="type-label text-text-strong">Product nav</span>
            <span className="type-hint text-text-subtle">left edge</span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col divide-y divide-border-subtle">
            <Band name="Breadcrumb" note="optional" muted />
            <Band name="Page header" note="title · actions" />
            <Band name="Tabs" note="optional" muted />
            <Band name="Featured band" note="optional" muted />
            <Band name="Controls bar" note="filters · actions" />
            <div className={`flex min-h-24 flex-col justify-between gap-6 px-3 py-2 ${SCROLLS}`}>
              <span className="type-label text-text-strong">Content</span>
              <span className="type-hint text-text-subtle">scrolls</span>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  )
}

/** One archetype's skeleton. The filled band is the container that scrolls. */
function Skeleton({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-col overflow-hidden rounded-sm border border-border-base">
        {children}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="type-label-bold text-text-strong">{title}</span>
        <span className="type-hint text-text-subtle">{note}</span>
      </div>
    </div>
  )
}

/** A row inside a skeleton. Short, unlabeled where the band is obvious. */
function Slot({
  label,
  scrolls = false,
  grow = false,
  className = "",
}: {
  label: string
  scrolls?: boolean
  grow?: boolean
  className?: string
}) {
  return (
    <div
      className={`type-hint px-2 py-1.5 text-text-subtle ${scrolls ? SCROLLS : ""} ${
        grow ? "flex-1" : ""
      } ${className}`}
    >
      {label}
    </div>
  )
}

/**
 * The four archetypes reduced to the only thing that separates them.
 *
 * Drawn at the same size so the difference the eye picks up is which band is
 * filled, which is the answer to the question the section asks. Sizing them by
 * their real proportions would have made the editor the tallest and taught
 * nothing.
 */
export function ScrollFigure() {
  return (
    <Figure caption="The filled band owns the scroll. Everything else in the column is fixed, which is what leaves the filled band a height to scroll inside.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 p-4 sm:grid-cols-2">
        <Skeleton title="List" note="One column. The content takes the remaining height.">
          <Slot label="Page header" className="border-b border-border-subtle" />
          <Slot label="Controls bar" className="border-b border-border-subtle" />
          <Slot label="Records" scrolls className="min-h-16" />
        </Skeleton>

        <Skeleton title="Detail" note="Two columns. Each one scrolls without moving the other.">
          <Slot label="Breadcrumb · title · tabs" className="border-b border-border-subtle" />
          <div className="flex min-h-16">
            <Slot label="Main" scrolls grow className="border-r border-border-subtle" />
            <Slot label="Metadata" scrolls className="w-20 shrink-0" />
          </div>
        </Skeleton>

        <Skeleton title="Editor" note="No page scroll at all. Every pane absorbs its own.">
          <div className="flex min-h-24">
            <Slot label="Tools" scrolls className="w-16 shrink-0 border-r border-border-subtle" />
            <div className="flex min-w-0 flex-1 flex-col">
              <Slot label="Tabs · toolbar" className="border-b border-border-subtle" />
              <Slot label="Editor" scrolls grow className="border-b border-border-subtle" />
              <Slot label="Output" scrolls className="min-h-10" />
            </div>
          </div>
        </Skeleton>

        <Skeleton title="Chat" note="The transcript scrolls from the bottom. The composer is outside it.">
          <Slot label="Transcript" scrolls className="min-h-16 border-b border-border-subtle" />
          <Slot label="Composer" />
        </Skeleton>
      </div>
    </Figure>
  )
}

/** The panels the system ships today, grouped by the edge they dock to. */
const EDGES = [
  { edge: "left" as const, means: "Where you are", state: "Open by default" },
  { edge: "right" as const, means: "What is about this", state: "Closed by default" },
  { edge: "bottom" as const, means: "What came out of this", state: "Closed by default" },
]

/**
 * The edges, with what each one means and which panels dock there.
 *
 * The bottom row is empty, and that is the point: an editor's output pane is
 * described in `composition.md` and no module implements it, so the diagram
 * shows the hole rather than drawing a panel the system cannot produce.
 */
export function EdgeFigure() {
  return (
    <Figure caption="An edge means the same thing on every screen. A panel whose content does not match its edge belongs on a different edge or in a dialog.">
      <div className="flex flex-col divide-y divide-border-subtle">
        {EDGES.map(({ edge, means, state }) => {
          const docked = panels.filter((panel) => panel.edge === edge)
          return (
            <div key={edge} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:gap-6">
              <div className="flex w-full shrink-0 flex-col gap-1 sm:w-40">
                <FigureLabel>{edge} edge</FigureLabel>
                <span className="type-label text-text-strong">{means}</span>
                <span className="type-hint text-text-subtle">{state}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                {docked.length === 0 ? (
                  <span className="type-hint text-text-subtle">
                    No component. The editor output pane is specified and not built.
                  </span>
                ) : (
                  docked.map((panel) => (
                    <div key={panel.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="type-code text-text-base">{panel.component}</span>
                      <span className="type-hint text-text-subtle">{panel.width}</span>
                      <span className="type-hint text-text-subtle">{panel.holds}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Figure>
  )
}
