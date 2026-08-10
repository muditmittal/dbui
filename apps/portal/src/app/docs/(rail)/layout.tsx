import { SiteHeader } from "@/components/SiteHeader"
import { DocsNav } from "@/components/DocsNav"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/*
        Two offsets, because two things pin against different lines.

        `--docs-header-offset` is the site header, and the only place its height
        is written on this page — the rail below reads it for both its `top` and
        its height. On the spacing multiplier rather than in pixels, because the
        footer's type-scale control moves the root font size and the header's own
        `h-14` moves with it.

        `--db-sticky-offset` is what DBUI's `Table` reads to place its own header:
        everything pinned above it, which on a page carrying a `StickyBar` is the
        header *and* the bar. That sum is already measured and published as
        `--docs-anchor-offset`, so this composes rather than counting again; the
        fallback is the page that pins nothing but the header.

        The variable inherits, so a page that pins something further down — the
        Voice page's tab bar — replaces it on that subtree. What it replaces it
        with is measured too, by `StickyPlate`, rather than added up from the
        classes the bar carries: this line is the last one on the page allowed
        to reason about a height it cannot see.
      */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 [--docs-header-offset:calc(var(--spacing)*14)] [--db-sticky-offset:var(--docs-anchor-offset,var(--docs-header-offset))] md:flex-row">
        {/*
          Sticky under the header, scrolling independently of the article. It
          collapses to a horizontal strip below md rather than disappearing —
          a nav that vanishes on a laptop is worse than one that reflows.

          The horizontal gutter is load-bearing, and starts at md because that
          is where the scrolling starts. `overflow-y: auto` forces the other
          axis to compute to `auto` as well, so the rail clips left and right
          even though it never scrolls that way — and a link that is the full
          width of the rail loses its focus ring to that edge entirely, not
          partially. The gutter is the room the ring draws into.
        */}
        {/* The type scale control used to sit under the nav. It moved to the
            site footer, where it applies to every route rather than to docs. */}
        <aside className="shrink-0 border-b border-border-base py-4 md:sticky md:top-(--docs-header-offset) md:h-[calc(100vh-var(--docs-header-offset))] md:w-50 md:overflow-y-auto md:border-b-0 md:px-1 md:py-10">
          <DocsNav />
        </aside>
        {/*
          `content-column` carries both the width and the prose default, and is
          defined once in `globals.css` — `/components` is not under this layout
          and states the same column, so the width lives in neither file.

          What it means here: tables, token grids, code blocks and shell previews
          get the column, and running text is capped again, and narrower, by the
          measure. So the right edge is deliberately ragged — blocks reach it,
          sentences stop short of it. Pages should not cap their own paragraphs.
        */}
        <article className="min-w-0 flex-1 py-10 pb-24">
          <div className="content-column">{children}</div>
        </article>
      </div>
    </>
  )
}
