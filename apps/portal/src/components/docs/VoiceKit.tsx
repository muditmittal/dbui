import * as React from "react"
import Link from "next/link"

/**
 * Renderers for the Voice and tone page.
 *
 * The page is a standard the reader returns to rather than reads through, so it
 * needs anchors and a way in. `Prose.tsx` sets no `id` on a section — every page
 * that used it so far is read top to bottom — so the section wrapper is repeated
 * here with one added.
 *
 * Nothing here sets a measure. The docs column is capped once, on `<article>`
 * in `app/docs/layout.tsx`.
 */

/**
 * The same shape as `DocSection`, plus the anchor. The scroll margin clears the
 * sticky header, which would otherwise sit on top of the heading it just
 * scrolled to.
 */
export function AnchoredSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-14 flex scroll-mt-20 flex-col gap-4">
      <h2 className="type-title-3 text-text-strong">{title}</h2>
      {children}
    </section>
  )
}

export function AnchoredSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 flex flex-col gap-3">
      <h3 className="type-title-4 text-text-strong">{title}</h3>
      {children}
    </section>
  )
}

/**
 * One wrapped row rather than a stacked list. The reader is picking a
 * destination, not reading the titles, and a vertical list of nine would cost
 * more height than the first section it is trying to reach.
 */
export function JumpTo({ sections }: { sections: Array<{ id: string; title: string }> }) {
  return (
    <nav
      aria-label="On this page"
      className="rounded-md border border-border-base bg-surface-subtle px-4 py-3"
    >
      <div className="type-label-bold text-text-strong">On this page</div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="type-body text-text-accent no-underline hover:underline"
          >
            {section.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
