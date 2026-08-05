import { SiteHeader } from "@/components/SiteHeader"
import { DocsNav } from "@/components/DocsNav"
import { TypeScaleControl } from "@/components/TypeScaleControl"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row">
        {/*
          Sticky under the 56px header, scrolling independently of the article.
          It collapses to a horizontal strip below md rather than disappearing —
          a nav that vanishes on a laptop is worse than one that reflows.
        */}
        <aside className="shrink-0 border-b border-border-base py-4 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-56 md:overflow-y-auto md:border-b-0 md:py-10">
          <DocsNav />
          {/*
            Sits below the nav and above the fold on a laptop. It is an
            experiment rather than a setting, so it reads as a footnote to the
            rail rather than a peer of the page links.
          */}
          <div className="mt-8 border-t border-border-base pt-6">
            <TypeScaleControl />
          </div>
        </aside>
        {/*
          The measure lives here so prose and full-width blocks share one edge.
          Pages should not re-cap their own paragraphs.
        */}
        <article className="min-w-0 flex-1 py-10 pb-24">
          <div className="max-w-[44rem]">{children}</div>
        </article>
      </div>
    </>
  )
}
