import Link from "next/link"

import { DOCS_NAV, type DocsNavEntry, type DocsNavItem } from "@/components/docs-nav-data"
import { DocHeader } from "@/components/docs/Prose"

export const metadata = { title: "Docs — DBUI" }

/** This page's own route. Its heading cannot link to the page it is on. */
const SELF = "/docs"

/**
 * A tile per page, in three bento grids that mirror the rail's three groups.
 *
 * Labels and hrefs come from `docs-nav-data.ts`, so this page cannot disagree
 * with the rail about what exists. Two things are declared here instead: how
 * many cells a tile takes, and the one line saying what its page settles.
 * Neither is derivable — a span is a composition decision and a descriptor is
 * copy. A page added to the nav lands as a plain single cell, which is visible
 * enough to get finished and better than a tile that never appears.
 *
 * The layer model that used to live here moved to `/docs/foundations`, and the
 * Decide / Write / Build / Check staging that replaced it predates the nav's
 * three groups. Do not bring either back.
 */

/**
 * Each grid opens at the container width its own arrangement needs, so the
 * three do not all collapse at one point. The query is on the container rather
 * than the viewport because the rail eats 200px at `md` — the article is
 * narrower on a small laptop than on a large tablet, and a viewport breakpoint
 * gets that backwards.
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

type Tile = {
  /** Cells this tile takes once its grid opens. Absent is one cell. */
  span?: string
  /** Puts the title a step up the ramp. Area on its own is not emphasis. */
  lead?: boolean
  /** What the page settles, tightened from that page's own lede. */
  what: string
}

const TILES: Record<string, Tile> = {
  "/docs/principles": {
    span: "@md:col-span-2",
    lead: true,
    what: "When two designs both look reasonable, these decide which one ships.",
  },
  "/docs/voice": {
    span: "@md:row-span-2",
    lead: true,
    what: "One voice for every string, so a nav label and an error read as the same product.",
  },
  "/docs/constraints": {
    what: "What the system will not do, so the rest can be relied on.",
  },
  "/docs/accessibility": {
    what: "What a screen owes anyone, on any input, in any language.",
  },

  "/docs/tokens": {
    what: "Every value the system can express, and the one file they all come from.",
  },
  "/docs/icons": {
    span: "@2xl:col-span-2",
    what: "One set, tagged by concept, so the right icon is found without knowing its name.",
  },
  "/docs/components": {
    span: "@lg:col-span-2 @2xl:row-span-2",
    lead: true,
    what: "Every component, live, grouped by what it does rather than how it looks.",
  },
  "/docs/layout": {
    what: "How a screen is framed before anything goes in it.",
  },
  "/docs/patterns": {
    what: "Recurring behavior — what happens, in what order and what has to survive it.",
  },
  "/docs/shells": {
    what: "The frame a page starts from, picked before any content.",
  },
  "/docs/utilities": {
    span: "@2xl:col-span-2",
    what: "What DBUI ships that is neither a component, an icon nor a token.",
  },

  "/docs/cli": {
    span: "@md:col-span-2",
    lead: true,
    what: "The same data this portal renders, addressable from a terminal.",
  },
  "/docs/mcp": {
    what: "An agent queries the system directly rather than being handed pasted docs.",
  },
  "/docs/checks": {
    what: "The enforcement layer — what is caught automatically and what is not.",
  },
}

/**
 * `surface-hover` rather than the control hover. A tile is a large target, and
 * the same alpha that reads as a tint on a button reads as a fill across a
 * card — the reasoning is written beside the token in `theme.config.mjs`.
 *
 * A tile that spans rows is taller than its content, so the two lines hold the
 * ends rather than stacking at the top and leaving the box looking unfinished.
 * The title still sits on the same line as its neighbors' titles, which is what
 * `justify-end` would have cost.
 */
function DocTile({ item }: { item: DocsNavItem }) {
  const tile = TILES[item.href]

  return (
    <Link
      href={item.href}
      className={`group flex flex-col justify-between gap-2 rounded-2 border border-border-base bg-surface-base p-4 no-underline transition-colors hover:border-border-strong hover:bg-surface-hover ${tile?.span ?? ""}`}
    >
      <span
        className={`${tile?.lead ? "type-title-4" : "type-body-bold"} text-text-strong group-hover:underline`}
      >
        {item.label}
      </span>
      {tile ? <span className="type-body text-text-subtle">{tile.what}</span> : null}
    </Link>
  )
}

/**
 * A group heads its own landing page, so the heading is that link — except for
 * `Docs`, whose landing page is this one. The two forms are identical at rest,
 * so the row reads as one kind of heading rather than two.
 */
function GroupHeading({ entry }: { entry: DocsNavEntry }) {
  if (entry.href === SELF) {
    return <h2 className="type-title-3 text-text-strong">{entry.label}</h2>
  }

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

      {DOCS_NAV.map((entry) => (
        <section key={entry.href} className="@container mt-10 flex flex-col gap-4">
          <GroupHeading entry={entry} />
          <div className={`grid grid-cols-1 gap-3 ${GRIDS[entry.href] ?? "@md:grid-cols-2"}`}>
            {entry.items?.map((item) => (
              <DocTile key={item.href} item={item} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
