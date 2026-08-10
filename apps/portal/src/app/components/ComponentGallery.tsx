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
 * The two are the same route. A label links to `/components?path=…`, which is
 * this route's other state — so the index and the sandbox are one destination a
 * reader moves within, not two they have to know about separately.
 *
 * A row per component, not a tile.
 *
 * The grid it replaced gave every component the same 112px box and centred one
 * demo in it, which left a Switch floating in a quarter of a screen of empty
 * surface and still had nowhere to put Button's seven variants — four columns of
 * fixed boxes is the one shape that is simultaneously too big for the small
 * components and too small for the wide ones. A row is as tall as what it holds
 * and as wide as the container, so the empty space goes away on one end and the
 * variants fit on the other.
 *
 * No state and no client bundle of its own. Search would duplicate Storybook's,
 * and the category headings do the narrowing a search box would.
 *
 * The id on each group is what the sticky tabs above jump to, and it is built
 * from the group key rather than written down, so a new category gets a tab
 * without anyone remembering to add one.
 */

export const groupId = (key: string) => `group-${key}`

/**
 * One component: what it is called on the left, the component itself running on
 * the right.
 *
 * The preview is live and reachable. It used to be `pointer-events-none` and
 * `aria-hidden`, because the label's link stretched a pseudo-element over the
 * whole tile to make the hit area — which meant the only thing you could do to
 * a component here was navigate away from it. The link is now just the label, so
 * the demo keeps its own events and a reader can open the menu, drag the slider
 * and tab into the field on this page.
 *
 * That is also why the row draws no box. A bordered surface around a control
 * that responds to the pointer reads as a card you can click; a hairline between
 * rows separates them without promising anything.
 */
function Row({ item }: { item: GalleryItem }) {
  const demo = demos[item.name]

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-6 md:grid-cols-[15rem_minmax(0,1fr)]">
      {/*
        The name and nothing else. Each row used to carry the component's
        `useFor` line under it — "Any click action — primary CTAs, toolbar
        actions, icon buttons, menu triggers" — which is the sentence that helps
        someone choose between two components they cannot see. Here they can see
        it, so the sentence was answering a question the row had already
        answered, in two lines that set the height of every row on the page. The
        category blurb still says what the group is for; that one is a claim about
        a set, and a set has no demo.

        `items-center` rather than the top the two-line version needed, so a lone
        name sits against the middle of whatever it labels. Top-aligned, the name
        of a tall row — Input Group's four alignments, Split Button's two
        orientations — floated level with the first variant and read as a caption
        for that one rather than for the set.
      */}
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {item.storyId ? (
          <Link
            href={`/components?path=/story/${item.storyId}`}
            className="type-label-bold text-text-strong no-underline hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            {item.name}
          </Link>
        ) : (
          <span className="type-label-bold text-text-strong">{item.name}</span>
        )}
        {!item.storyId && <Badge variant="outline">No story yet</Badge>}
      </div>

      {/*
        Wrapping, because a variant set is a row until it is not: Button's seven
        fit on one line in the container and on three at 1.4x type. Baseline
        alignment rather than centre — a set that mixes a field with a button
        lines up on the text they share, not on the tallest box.
      */}
      {/*
        The fallback is a sentence, not the component's name repeated. Toast is
        the only row that reaches it: it has no default on-page state, because
        `toast()` is imperative and `dbui/components/ui/sonner` exports only the
        `Toaster` mount — so there is nothing this page can render to stand for
        it that would not be a drawing of one.
      */}
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
        {demo ?? (
          <span className="type-hint text-text-subtle">
            No default state — fires from code. Open it in Storybook.
          </span>
        )}
      </div>
    </div>
  )
}

export function ComponentGallery() {
  return (
    // Marked as generated so the word count on this page can separate the
    // editorial layer from 48 captions the CLI wrote.
    <div data-doc-generated className="mt-8 flex flex-col gap-12">
      {galleryGroups.map((group) => (
        <section key={group.key} id={groupId(group.key)} style={anchorOffset}>
          <h2 className="type-title-4 text-text-strong">{group.label}</h2>
          <p className="type-body text-text-subtle">{group.blurb}</p>
          <div className="mt-2 divide-y divide-border-subtle border-t border-border-subtle">
            {group.items.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
