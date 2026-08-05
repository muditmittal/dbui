"use client"

import * as React from "react"
import { Badge } from "dbui/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "dbui/components/ui/empty"
import { Input } from "dbui/components/ui/input"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "dbui/components/ui/table"

import { icons, iconCategories, type IconCategory } from "@/components/icon-data"
import type { Glyph } from "@/components/icon-data/glyphs-object"

/**
 * The icon browser on /docs/icons.
 *
 * Metadata for the whole set ships with the page, so search answers on the
 * first keystroke. Geometry does not: each category is a separate chunk pulled
 * in when it is first shown, because the drawings are an order of magnitude
 * larger than the words and most visits look at one category.
 *
 * Rows are added in pages as the reader scrolls rather than all at once. The
 * largest category is over two hundred icons, and every one of them is an inline
 * SVG — mounting the whole category costs more than anyone browsing it will read.
 */

const PAGE = 60

/**
 * Static specifiers, so the bundler can see four chunks. A computed import path
 * would leave it no choice but to inline every category into the page.
 */
const glyphChunks: Record<IconCategory, () => Promise<{ default: Record<string, Glyph> }>> = {
  object: () => import("@/components/icon-data/glyphs-object"),
  action: () => import("@/components/icon-data/glyphs-action"),
  indicator: () => import("@/components/icon-data/glyphs-indicator"),
  component: () => import("@/components/icon-data/glyphs-component"),
}

const CATEGORY_LABEL: Record<IconCategory, string> = {
  object: "Objects",
  action: "Actions",
  indicator: "Indicators",
  component: "Components",
}

/**
 * Name, label, area and synonyms in one lowercased string. Built once when the
 * module loads rather than per keystroke, and joined rather than searched field
 * by field so a query can span two of them — "table stream" matches an icon
 * whose label and synonym each hold one word.
 */
const searchable = icons.map((icon) => ({
  icon,
  haystack: [icon.name, icon.label, icon.area ?? "", ...(icon.synonyms ?? [])]
    .join(" ")
    .toLowerCase(),
}))

/**
 * The default viewBox of the set. It lives here and in the generator, which is
 * one restatement too many, except that the generator's job is to omit it and
 * this one's is to put it back — a single owner would have to ship it 456 times.
 */
const DEFAULT_VIEW_BOX = "0 0 16 16"

/**
 * The body is React's own output for the icon component, produced at build time
 * by scripts/generate-icon-data.mjs. Setting it as markup is what lets the page
 * draw 456 icons without importing 456 modules; nothing here is user input.
 */
function IconGlyph({ glyph }: { glyph: Glyph | undefined }) {
  if (!glyph) return <span className="block size-4 rounded-xs bg-surface-inset" />
  return (
    <svg
      viewBox={glyph.viewBox ?? DEFAULT_VIEW_BOX}
      fill="none"
      aria-hidden
      className="size-4 text-text-base"
      dangerouslySetInnerHTML={{ __html: glyph.body }}
    />
  )
}

export function IconBrowser() {
  const [category, setCategory] = React.useState<IconCategory | "all">("all")
  const [query, setQuery] = React.useState("")
  const [limit, setLimit] = React.useState(PAGE)
  const [glyphs, setGlyphs] = React.useState<Record<string, Glyph>>({})
  const requested = React.useRef(new Set<IconCategory>())
  const sentinel = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    for (const key of category === "all" ? iconCategories : [category]) {
      if (requested.current.has(key)) continue
      requested.current.add(key)
      glyphChunks[key]().then((chunk) => {
        setGlyphs((loaded) => ({ ...loaded, ...chunk.default }))
      })
    }
  }, [category])

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return searchable
      .filter((entry) => category === "all" || entry.icon.category === category)
      .filter((entry) => !q || entry.haystack.includes(q))
      .map((entry) => entry.icon)
  }, [category, query])

  React.useEffect(() => setLimit(PAGE), [category, query])

  const shown = matches.slice(0, limit)
  const more = matches.length - shown.length

  // Re-observed after each page, because the sentinel moves down the document
  // every time one is added and an observer only fires on a crossing.
  React.useEffect(() => {
    const node = sentinel.current
    if (!node || more === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setLimit((n) => n + PAGE)
      },
      { rootMargin: "600px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [more])

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/*
        The switcher takes the full measure on its own row. Five segments and a
        field side by side overrun 44rem, and squeezing the segments is the worse
        trade: the labels are the only thing telling a reader what a category is.
      */}
      <SegmentControl
        className="flex w-full"
        value={[category]}
        onValueChange={(next) => setCategory((next[0] as IconCategory | "all") ?? "all")}
        aria-label="Icon category"
      >
        <SegmentControlItem value="all">All</SegmentControlItem>
        {iconCategories.map((key) => (
          <SegmentControlItem key={key} value={key}>
            {CATEGORY_LABEL[key]}
          </SegmentControlItem>
        ))}
      </SegmentControl>

      <div className="flex items-center gap-4">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a name, a concept or a synonym"
          aria-label="Search icons"
        />
        <span className="type-label shrink-0 text-text-subtle" aria-live="polite">
          {matches.length} of {icons.length}
        </span>
      </div>

      {matches.length === 0 ? (
        <Empty className="border border-dashed border-border-base py-10">
          <EmptyHeader>
            <EmptyTitle>No icon matches that</EmptyTitle>
            <EmptyDescription>
              Try the concept rather than the name — most icons carry synonyms for the words a
              person reaches for first.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-hidden rounded-md border border-border-base">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="type-label-bold w-10 pl-3" aria-label="Preview" />
                <TableHead className="type-label-bold w-44">Name</TableHead>
                <TableHead className="type-label-bold">What the tag says</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((icon) => (
                <TableRow key={icon.name}>
                  <TableCell className="pl-3 align-top">
                    <IconGlyph glyph={glyphs[icon.name]} />
                  </TableCell>
                  <TableCell className="type-code align-top break-words whitespace-normal! text-text-base">
                    {icon.name}
                  </TableCell>
                  <TableCell className="align-top whitespace-normal!">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="type-body text-text-base">{icon.label}</span>
                        {icon.area ? <Badge variant="outline">{icon.area}</Badge> : null}
                        {icon.mapped === false ? (
                          <Badge variant="warning">Not in the maps</Badge>
                        ) : null}
                      </div>
                      {icon.synonyms?.length ? (
                        <span className="type-body text-text-subtle">
                          {icon.synonyms.join(", ")}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/*
        Kept in the flow rather than absolutely placed, so it is 600px of scroll
        below the last row and the next page is mounted before it is reached.
      */}
      {more > 0 ? (
        <div ref={sentinel} className="type-label text-text-subtle">
          {more} more below
        </div>
      ) : null}
    </div>
  )
}
