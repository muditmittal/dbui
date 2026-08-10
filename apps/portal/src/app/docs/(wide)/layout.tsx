import { SiteHeader } from "@/components/SiteHeader"

/**
 * Tokens and Icons, without the docs rail.
 *
 * Both are top-level entries in the site header now, so the rail was marking them
 * as rows inside a section they had already left — and it was spending 200px of a
 * 1152px page on a nav neither page's reader arrived through. What they hold is
 * wide: a token table, a 400-icon grid. They get the container instead.
 *
 * A route group rather than a moved route. `(wide)` does not appear in a URL, so
 * `/docs/tokens` and `/docs/icons` still resolve and every link already written
 * against them still works. The rail-bearing pages live in `(rail)` beside this,
 * with the layout that draws it.
 *
 * The two offset variables are copied from that layout deliberately, not shared.
 * `StickyPlate` pins to `--docs-header-offset` and DBUI's `Table` places its own
 * header at `--db-sticky-offset`, so a page with a sticky bar and a table needs
 * both defined or the bar and the table header land on top of each other. Both
 * pages have both. Extracting them into something shared would put the site
 * header's height in a third file; these two lines are the smaller cost.
 */
export default function WideDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-6 [--docs-header-offset:calc(var(--spacing)*14)] [--db-sticky-offset:var(--docs-anchor-offset,var(--docs-header-offset))]">
        {/*
          `wide-column` rather than `content-column`. It carries the prose default
          — running text capped to the measure — without the 44rem column, which
          is the whole point of this layout. A paragraph that ran the full 1152px
          would be unreadable, and neither page caps its own.
        */}
        <article className="wide-column min-w-0 py-10 pb-24">{children}</article>
      </div>
    </>
  )
}
