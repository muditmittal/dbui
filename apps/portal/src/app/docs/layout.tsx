import { SiteHeader } from "@/components/SiteHeader"
import { DocsNav } from "@/components/DocsNav"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl gap-10 px-6">
        {/* Sticky under the 56px header, scrolling independently of the article. */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 lg:block">
          <DocsNav />
        </aside>
        <article className="min-w-0 flex-1 py-10 pb-24">{children}</article>
      </div>
    </>
  )
}
