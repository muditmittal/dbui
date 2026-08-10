import Link from "next/link"
import { Badge } from "dbui/components/ui/badge"

import { galleryGroups, type GalleryItem } from "@/stories/components/gallery-data"
import { demos } from "@/stories/components/gallery-demos"
import { anchorOffset } from "@/components/docs/anchor"

/**
 * The library's own claim about what it contains, and the only place that claim
 * is rendered. Storybook holds one component at a time with every variant and
 * its controls; this holds all of them at once, so a reader can see the set
 * before they know any of its names.
 *
 * No state and no client bundle. Search would duplicate Storybook's, and the
 * category headings do the narrowing a search box would.
 *
 * The id on each group is what the sticky tabs above jump to, and it is built
 * from the group key rather than written down, so a new category gets a tab
 * without anyone remembering to add one.
 */

export const groupId = (key: string) => `group-${key}`

/**
 * The tile is the component itself on a quiet surface, never a picture of one —
 * a screenshot would be a second thing to keep in step with the source. The
 * surface is subtle so the eye lands on the component and not on the frame.
 */
function Tile({ item }: { item: GalleryItem }) {
  const demo = demos[item.name]

  return (
    <div className="group relative flex flex-col">
      {/*
        The preview is inert. Breadcrumb and Pagination draw their own anchors,
        so the tile cannot be one — the link below stretches over the whole tile
        instead, which keeps the hit area and leaves the markup valid.
      */}
      <div
        aria-hidden
        className="pointer-events-none flex h-28 items-center justify-center overflow-hidden rounded-2 border border-border-base bg-surface-subtle px-3 transition-colors group-hover:border-border-strong"
      >
        {demo ?? <span className="type-label text-text-subtle">{item.name}</span>}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        {item.storyId ? (
          <Link
            href={`/components?path=/story/${item.storyId}`}
            className="type-label text-text-strong no-underline after:absolute after:inset-0 after:rounded-2 group-hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            {item.name}
          </Link>
        ) : (
          <span className="type-label text-text-strong">{item.name}</span>
        )}
        {!item.storyId && <Badge variant="outline">No story yet</Badge>}
      </div>
      {item.useFor && (
        <p className="type-hint mt-0.5 line-clamp-2 text-text-subtle">{item.useFor}</p>
      )}
    </div>
  )
}

export function ComponentGallery() {
  return (
    // Marked as generated so the word count on this page can separate the
    // editorial layer from 61 captions the CLI wrote.
    <div data-doc-generated className="mt-8 flex flex-col gap-12">
      {galleryGroups.map((group) => (
        <section
          key={group.key}
          id={groupId(group.key)}
          style={anchorOffset}
          className="flex flex-col gap-1"
        >
          <h2 className="type-title-4 text-text-strong">{group.label}</h2>
          <p className="type-body text-text-subtle">{group.blurb}</p>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-3">
            {group.items.map((item) => (
              <Tile key={item.name} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
