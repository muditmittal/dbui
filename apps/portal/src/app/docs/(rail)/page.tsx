import Link from "next/link"

import { DOCS_NAV, type DocsNavEntry, type DocsNavItem } from "@/components/docs-nav-data"
import { DocHeader } from "@/components/docs/Prose"

import { TileMotif } from "./tile-motifs"

export const metadata = { title: "Docs — DBUI" }

/**
 * A tile per page, in three bento grids that mirror the rail's three groups.
 *
 * Labels and hrefs come from `docs-nav-data.ts`, so this page cannot disagree
 * with the rail about what exists. Only the composition is declared here: how
 * many cells a tile takes, and whether it leads its grid. Neither is derivable
 * from the nav. A page added to the nav lands as a plain single cell, which is
 * visible enough to get finished and better than a tile that never appears.
 *
 * Each tile used to carry a line saying what its page settles. Fourteen of them
 * turned the page into a wall of descriptions, all the same length and all the
 * same weight, which is the opposite of what an index is for — the label is the
 * thing being scanned. The line is gone and an abstract mark carries the
 * difference instead; `tile-motifs.tsx` holds the marks and the rules they
 * share. Do not reintroduce the descriptor.
 *
 * The layer model that used to live here moved to `/docs/foundations`, and the
 * Decide / Write / Build / Check staging that replaced it predates the nav's
 * three groups. Do not bring either back.
 */

/** This page's own route. Its heading cannot link to the page it is on. */
const SELF = "/docs"

/**
 * Each grid opens at the container width its own arrangement needs, so the
 * three do not all collapse at one point. The query is on the container rather
 * than the viewport because the rail takes its width out of the article from
 * `md` up — the article is narrower on a small laptop than on a large tablet,
 * and a viewport breakpoint gets that backwards.
 *
 * Every arrangement fills its rows exactly, so auto-placement leaves no holes
 * and nothing has to be reordered away from the rail's order.
 */
const GRIDS: Record<string, string> = {
  // Principles across the top, then Voice tall beside Constraints and
  // Accessibility stacked.
  "/docs": "@md:grid-cols-2",
  // Components anchors a 2x2, with Icons and Utilities as the wide cells that
  // bracket it. Four singles fill the rest.
  "/docs/foundations": "@lg:grid-cols-2 @2xl:grid-cols-3",
  "/docs/overview": "@md:grid-cols-2",
}

/**
 * One hue per group, not one per tile. Fourteen hues would be confetti — the
 * color would carry nothing except that the tiles are different, which the
 * marks already say. Tied to the group instead, it repeats the split the nav
 * and the three grids already make, so the page gains a register rather than a
 * paint job: concept, material, machine.
 *
 * Tinting an existing semantic rather than reaching for the `050` primitives.
 * `viz-categorical-*` carries a light and a dark value, so one alpha reads as a
 * pale wash on white and a deep one on the dark surface, with no second token
 * and no `dark:` branch. It composites over `surface-base` exactly, because
 * `body` carries that same token — the tile is not floating on some other color.
 *
 * 1, 3 and 8 out of the ten because they are three separate families — violet,
 * teal, warm — that land within about three points of each other for tint
 * strength in both themes. Several of the rest do not: 9 is half as strong as
 * the others in dark, 2 and 5 sit so close to white that the light tint is
 * nearly invisible, and 6 is a brown that just reads as a dirty surface.
 *
 * The hover deepens the same hue instead of the neutral `surface-hover`, which
 * would have pulled the tint out from under the pointer.
 */
const TINTS: Record<string, string> = {
  "/docs": "bg-viz-categorical-1/16 hover:bg-viz-categorical-1/24",
  "/docs/foundations": "bg-viz-categorical-3/16 hover:bg-viz-categorical-3/24",
  "/docs/overview": "bg-viz-categorical-8/16 hover:bg-viz-categorical-8/24",
}

type Tile = {
  /** Cells this tile takes once its grid opens. Absent is one cell. */
  span?: string
  /**
   * Marks an entry point. Every title sits at the same step of the ramp, so
   * this buys area in the bento and nothing else — it is the reason a tile has
   * the `span` next to it, not a second signal layered on top of one.
   */
  lead?: boolean
  /**
   * Where the tile stops pairing and starts stacking. Set this if and only if
   * `span` takes a second grid row, and prefix it with that `row-span-2`'s own
   * container variant — the layout has to turn over on the same query that
   * hands the tile the height, or the mark reorients against its own cell.
   */
  stack?: { tile: string; motif: string }
}

const TILES: Record<string, Tile> = {
  "/docs/principles": { span: "@md:col-span-2", lead: true },
  "/docs/voice": {
    span: "@md:row-span-2",
    lead: true,
    stack: {
      tile: "@md:flex-col @md:items-stretch",
      motif: "@md:h-auto @md:w-full @md:grow @md:basis-0 @md:min-h-12",
    },
  },
  "/docs/constraints": {},
  "/docs/accessibility": {},

  "/docs/tokens": {},
  "/docs/icons": { span: "@2xl:col-span-2" },
  // Keyed by href like every other tile, so this one moved with the nav entry
  // when the gallery left `/docs`. Both maps here are keyed that way and
  // neither is derivable from the nav, so a route change has to be made in
  // both — a missed key is a tile that silently drops to one plain cell.
  "/components": {
    span: "@lg:col-span-2 @2xl:row-span-2",
    lead: true,
    stack: {
      tile: "@2xl:flex-col @2xl:items-stretch",
      motif: "@2xl:h-auto @2xl:w-full @2xl:grow @2xl:basis-0 @2xl:min-h-12",
    },
  },
  "/docs/layout": {},
  "/docs/patterns": {},
  "/docs/shells": {},
  "/docs/utilities": { span: "@2xl:col-span-2" },

  "/docs/cli": { span: "@md:col-span-2", lead: true },
  "/docs/mcp": {},
  "/docs/standards": {},
}

/**
 * The tint arrives as a prop because it belongs to the group, not the tile —
 * see `TINTS`. A tile rendered outside a group keeps the plain surface and the
 * neutral hover, so this still works if it is ever reused off this page.
 *
 * A tile stacks if it takes a second grid row, and pairs if it does not. Only
 * two of the fourteen ever take one, so pairing is the base and `stack` is the
 * exception rather than the other way round. Stacking is the older layout —
 * title, then a mark that grows into every pixel under it — and it still earns
 * its place: the mark fills the height the second row bought. Column spans do
 * not stack. A cell that is two columns wide and one row tall gains no height,
 * so a mark parked under its title stays at the floor size and the extra width
 * becomes a void; that was the whole failure this replaces.
 *
 * A paired tile is a horizontal band: title at the top left, mark held at the
 * far right. `justify-between` and not a mark tucked beside the title, because
 * adjacency only moves the void from below the mark to the right of it.
 * Bookends put the tile's full width to work, and the band is shorter than the
 * stack it replaces — the mark reads as most of the tile instead of a fifth.
 *
 * `items-start` in both layouts, so a title is in the same place on all
 * fourteen whichever way the tile runs. The mark is then the tallest thing in a
 * paired band and sets the band's height, which is why nothing has to decide
 * where a paired mark sits vertically — there is no slack for it to sit in. A
 * stacked mark does have slack, and takes all of it.
 *
 * Mark size therefore tracks tile height, which is the dimension the two share:
 * the floor on a one-row tile, roughly double that on a two-row one. Width does
 * not scale it. A 272px cell and an 845px band are both one row tall and both
 * get the same mark, which is what stops the page reading as accidental.
 *
 * `text-subtle` on the link is the mark's quiet color, inherited as
 * `currentColor`; the title opts back out to `text-strong`.
 *
 * Every title is at one step of the ramp and no mark is scaled to match its
 * tile's importance. A lead tile is louder because the bento gave it area, and
 * doubling that up with a type step made the same point twice.
 */
function DocTile({ item, tint }: { item: DocsNavItem; tint?: string }) {
  const tile = TILES[item.href]

  return (
    <Link
      href={item.href}
      className={`group flex flex-row items-start justify-between gap-4 rounded-2 border border-border-base p-4 text-text-subtle no-underline transition-colors hover:border-border-strong ${tint ?? "bg-surface-base hover:bg-surface-hover"} ${tile?.span ?? ""} ${tile?.stack?.tile ?? ""}`}
    >
      <span className="type-title-4 text-text-strong group-hover:underline">
        {item.label}
      </span>
      {/*
        Paired, the box is a square at the floor size, so where the mark sits
        inside it is not a question and `justify-between` alone places it. That
        is what lets one `preserveAspectRatio` serve both layouts.

        Stacked, `grow basis-0` rather than `flex-1`. Tailwind's `flex-1` bases
        on `0%`, and a percentage against an indefinite height resolves to the
        content size — which for an SVG with a width and a viewBox is its aspect
        ratio, so every mark rendered as tall as its tile was wide. A definite
        zero basis makes the floor the only thing the row height is measured
        from, and the mark takes whatever the grid hands the tile above that.
      */}
      <TileMotif
        href={item.href}
        className={`h-12 w-12 shrink-0 ${tile?.stack?.motif ?? ""}`}
      />
    </Link>
  )
}

/**
 * A group that heads a landing page gets that link as its heading. Two cases get
 * none: `Docs`, whose label no longer points anywhere, and any group whose page
 * is this one — the h1 above already names it, so a second `Docs` a line below
 * would title the section after the page.
 */
function GroupHeading({ entry }: { entry: DocsNavEntry }) {
  if (!entry.href || entry.href === SELF) return null

  return (
    <h2 className="type-title-3">
      <Link href={entry.href} className="text-text-strong no-underline hover:underline">
        {entry.label}
      </Link>
    </h2>
  )
}

export default function DocsIndex() {
  return (
    <>
      <DocHeader title="Docs">Every page in the system, and the question each one settles.</DocHeader>

      {DOCS_NAV.map((entry) => {
        // The grid and tint maps are keyed by the group's page. `Docs` no longer
        // has one, and this page is what it used to be, so it falls back to SELF
        // rather than needing a second set of keys.
        const group = entry.href ?? SELF
        return (
          <section key={entry.label} className="@container mt-10 flex flex-col gap-4">
            <GroupHeading entry={entry} />
            <div className={`grid grid-cols-1 gap-3 ${GRIDS[group] ?? "@md:grid-cols-2"}`}>
              {entry.items?.map((item) => (
                <DocTile key={item.href} item={item} tint={TINTS[group]} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
