"use client"

import * as React from "react"
import { Badge } from "dbui/components/ui/badge"
import { Button } from "dbui/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "dbui/components/ui/empty"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "dbui/components/ui/hover-card"
import { Input } from "dbui/components/ui/input"
import { Copy } from "dbui/components/icons/Copy"
import { Check } from "dbui/components/icons/Check"
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
import { SectionTabs, StickyBar } from "@/components/docs/StickyBar"
import { anchorOffset } from "@/components/docs/anchor"

/**
 * The icon browser on /docs/icons.
 *
 * Four categories in one scroll, with the strip above navigating between them
 * rather than filtering to one. That is the same arrangement the Tokens page uses,
 * and it is what lets a single button offer the whole set: while the tabs filtered,
 * a count could only ever describe the open category, so "show all" and "456" could
 * not appear in the same sentence.
 *
 * The table sits in the page flow and never scrolls inside itself. It used to live
 * in a 689px box holding up to 33,000px of its own scroll, which trapped the wheel:
 * a reader scrolling down the page crossed the table and could not get past it
 * without moving the pointer off it first. The cost of taking the box away is that
 * the rest of the page sits below however many rows are open, so each section is
 * bounded until the reader asks for the rest.
 */

/**
 * Enough rows per section to show the shape of a category without any one of them
 * owning the page. Four sections at this window is a long page and a bounded one —
 * and every anchor lands on something, which is what a windowed single section
 * could not promise.
 */
const WINDOW = 50

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

/** Components first, because it is the shortest and the most specific. */
const TAB_ORDER: IconCategory[] = ["component", "object", "action", "indicator"]

const SECTIONS = TAB_ORDER.map((key) => ({ id: key, label: CATEGORY_LABEL[key] }))

/**
 * Name, label, area and synonyms in one lowercased string. Built once when the
 * module loads rather than per keystroke, and joined rather than searched field by
 * field so a query can span two of them — "table stream" matches an icon whose
 * label and synonym each hold one word.
 */
const searchable = icons.map((icon) => ({
  icon,
  haystack: [icon.name, icon.label, icon.area ?? "", ...(icon.synonyms ?? [])]
    .join(" ")
    .toLowerCase(),
}))

const byCategory = Object.fromEntries(
  iconCategories.map((key) => [key, icons.filter((icon) => icon.category === key)]),
) as Record<IconCategory, typeof icons>

/**
 * The default viewBox of the set. It lives here and in the generator, which is one
 * restatement too many, except that the generator's job is to omit it and this
 * one's is to put it back — a single owner would have to ship it 456 times.
 */
const DEFAULT_VIEW_BOX = "0 0 16 16"

/**
 * The body is React's own output for the icon component, produced at build time by
 * scripts/generate-icon-data.mjs. Setting it as markup is what lets the page draw
 * every icon without importing a module each; nothing here is user input.
 *
 * The placeholder holds the glyph's exact box, so the row never resizes when a
 * chunk lands. It is transparent rather than filled: a grid of grey squares turning
 * into drawings reads as a fault, and the chunk arrives in a few frames.
 */
function IconGlyph({ glyph }: { glyph: Glyph | undefined }) {
  if (!glyph) return <span className="block size-4" />
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

/** The specifier a consumer writes. One place, so the card and a paste agree. */
const importPath = (name: string) => `dbui/components/icons/${name}`

/**
 * Copies the specifier and says so.
 *
 * The confirmation is the icon swapping to a check for a moment rather than a
 * toast: a toast for a copy is a notification about something the reader just did
 * deliberately, and it covers part of the page they were reading to say it.
 */
function CopyPath({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <Button
      size="sm"
      variant="ghost"
      aria-label={copied ? "Copied" : `Copy ${value}`}
      onClick={() => {
        // Private browsing and an insecure origin both refuse the write. There is
        // nothing useful to tell the reader, and a thrown error here would take the
        // card down with it.
        navigator.clipboard?.writeText(value).then(
          () => setCopied(true),
          () => undefined,
        )
      }}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}

/**
 * Everything about an icon that is not its picture, its name or what it means.
 *
 * The row carries those three and stops. Category, synonyms, the entity area and
 * whether the icon is in the maps are all facts a reader wants for one icon at a
 * time — printed on every row they cost a second line each and turned a 40px row
 * into 64px, which across 456 rows is the difference between a list you can scan
 * and a page you scroll.
 */
function IconName({
  icon,
  showCategory,
}: {
  icon: (typeof icons)[number]
  showCategory: boolean
}) {
  const path = importPath(icon.name)
  const rows: Array<[string, React.ReactNode]> = [
    ["Category", CATEGORY_LABEL[icon.category]],
    ["Means", icon.label],
    ...(icon.synonyms?.length
      ? ([["Synonyms", icon.synonyms.join(", ")]] as Array<[string, React.ReactNode]>)
      : []),
    ...(icon.area ? ([["Entity area", icon.area]] as Array<[string, React.ReactNode]>) : []),
  ]

  return (
    <span className="flex items-center gap-2">
      <HoverCard>
        <HoverCardTrigger
          render={
            <code className="type-code w-fit cursor-help text-text-base underline decoration-border-strong decoration-dotted underline-offset-4">
              {icon.name}
            </code>
          }
        />
        {/* Beside the name, so reading down the column never waits for a card to close. */}
        <HoverCardContent className="w-96" side="inline-end" align="start">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <code className="type-code min-w-0 flex-1 break-all text-text-base">{path}</code>
              <CopyPath value={path} />
            </div>
            <dl className="flex flex-col gap-1 border-t border-border-subtle pt-3">
              {rows.map(([term, definition]) => (
                <div key={term} className="flex gap-2">
                  <dt className="type-hint w-24 shrink-0 text-text-subtle">{term}</dt>
                  <dd className="type-hint min-w-0 flex-1 break-words text-text-base">
                    {definition}
                  </dd>
                </div>
              ))}
            </dl>
            {icon.mapped === false ? (
              <Badge variant="warning">Not in the entity maps</Badge>
            ) : null}
          </div>
        </HoverCardContent>
      </HoverCard>
      {/*
        Only in a result list, which spans all four categories. The category is what
        decides whether an icon may be used where the reader wants it, and inside a
        category's own section it would be that section's heading repeated 200 times.
      */}
      {showCategory ? <Badge>{CATEGORY_LABEL[icon.category]}</Badge> : null}
    </span>
  )
}

/**
 * One table, used by every section and by the result list.
 *
 * `h-10` on the row rather than padding on the cells. The row is three single-line
 * fields, so its height is a decision rather than a consequence — and at 456 rows a
 * consequence drifts.
 */
function IconTable({
  rows,
  glyphs,
  showCategory,
  caption,
}: {
  rows: typeof icons
  glyphs: Record<string, Glyph>
  showCategory: boolean
  caption: string
}) {
  return (
    <Table>
      <caption className="sr-only">{caption}</caption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 pl-3">Icon</TableHead>
          <TableHead className="w-72">Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((icon) => (
          <TableRow key={icon.name} className="h-10">
            <TableCell className="w-12 py-0 pl-3">
              <IconGlyph glyph={glyphs[icon.name]} />
            </TableCell>
            <TableCell className="w-72 py-0">
              <IconName icon={icon} showCategory={showCategory} />
            </TableCell>
            <TableCell className="py-0 type-body text-text-base">{icon.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function IconBrowser() {
  const [query, setQuery] = React.useState("")
  const [expanded, setExpanded] = React.useState(false)
  const [glyphs, setGlyphs] = React.useState<Record<string, Glyph>>({})
  const top = React.useRef<HTMLDivElement>(null)

  // The field owns the caret; the table is allowed to arrive a frame later.
  // Filtering is cheap, but the list it produces is not, and a deferred value is
  // what keeps a fast typist from ever waiting on a row.
  const deferredQuery = React.useDeferredValue(query)
  const searching = deferredQuery.trim().length > 0

  /**
   * Every chunk, because every category is on screen now.
   *
   * While the tabs filtered, a chunk could wait until its category was opened. One
   * scroll has no such moment — the anchors have to land on drawn rows — so the
   * four load together and the placeholders hold the geometry until they do.
   */
  React.useEffect(() => {
    for (const key of iconCategories) {
      glyphChunks[key]().then((chunk) => {
        setGlyphs((loaded) => ({ ...loaded, ...chunk.default }))
      })
    }
  }, [])

  const matches = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (!q) return []
    return searchable.filter((entry) => entry.haystack.includes(q)).map((entry) => entry.icon)
  }, [deferredQuery])

  // A new query is a new list, so it closes back to one window. Leaving it open
  // would drop the reader into several thousand pixels of rows they did not ask for
  // every time they changed a letter.
  React.useEffect(() => {
    setExpanded(false)
  }, [deferredQuery])

  const collapse = () => {
    setExpanded(false)
    top.current?.scrollIntoView({ block: "start" })
  }

  const windowed = (rows: typeof icons) => (expanded ? rows : rows.slice(0, WINDOW))
  const hiddenCount = searching
    ? Math.max(0, matches.length - windowed(matches).length)
    : TAB_ORDER.reduce((n, key) => n + Math.max(0, byCategory[key].length - WINDOW), 0)

  return (
    // Marked as generated so the word count on this page can separate the editorial
    // layer from 456 tags the icons wrote themselves.
    <div ref={top} data-doc-generated style={anchorOffset} className="mt-6 flex flex-col gap-4">
      {/*
        Pinned, because the table is the page. Scrolled a few hundred rows in,
        clearing the search or jumping to a category used to mean scrolling back to
        the top first, which is the one thing a browser of 456 rows must not ask.
      */}
      <StickyBar className="flex flex-col gap-3 pt-1 pb-3">
        {/*
          The field leads. Search is why anyone returns to this page, and it is the
          one control that works wherever the reader has scrolled to — putting the
          tabs above it made the narrower question look like the first one.
        */}
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a name, a concept or a synonym"
          aria-label="Search icons"
        />

        {/*
          Tabs or a count, never both, in a slot tall enough for the taller of the
          two so the table below does not jump on the first keystroke.

          A query spans all four categories, so the anchors stop describing what is
          on screen the moment one is typed. Leaving them up would offer navigation
          to sections the result list has replaced.
        */}
        <div className="flex min-h-12 items-center">
          {searching ? (
            // aria-hidden because the live region below says the same words, and the
            // announcement should come from the change rather than from the reader
            // happening to cross this line.
            <p aria-hidden className="type-label text-text-subtle">
              {matches.length} {matches.length === 1 ? "match" : "matches"} found
            </p>
          ) : (
            <SectionTabs sections={SECTIONS} label="Icon categories" />
          )}
        </div>

        {/*
          Mounted in both states and empty in one, because a live region has to exist
          before the text arrives for the change to be announced — one inserted on the
          first keystroke is read late or not at all. Out of flow under `sr-only`, so
          it adds no gap.
        */}
        <span className="sr-only" aria-live="polite">
          {searching ? `${matches.length} matches found` : ""}
        </span>
      </StickyBar>

      {searching && matches.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No icons match “{deferredQuery.trim()}”</EmptyTitle>
            <EmptyDescription>
              Search the concept rather than the drawing — “delete” finds the bin, and a
              synonym finds the icon it belongs to.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : searching ? (
        <IconTable
          rows={windowed(matches)}
          glyphs={glyphs}
          showCategory
          caption={`Icons matching ${deferredQuery.trim()}`}
        />
      ) : (
        TAB_ORDER.map((key) => (
          <section key={key} id={key} style={anchorOffset} className="flex flex-col gap-2">
            <h2 className="type-title-4 text-text-strong">
              {CATEGORY_LABEL[key]}{" "}
              <span className="type-label text-text-subtle">{byCategory[key].length}</span>
            </h2>
            <IconTable
              rows={windowed(byCategory[key])}
              glyphs={glyphs}
              showCategory={false}
              caption={`${CATEGORY_LABEL[key]} icons`}
            />
          </section>
        ))
      )}

      {/*
        Opening the rest is a decision, not a side effect of scrolling. An observer
        that added a page whenever it saw the end coming grew the document under the
        reader's thumb and never stopped.

        One button for the whole set rather than one per section. Every section is
        windowed by the same number, so four buttons would be four ways to ask the
        same question — and the count that means anything to someone deciding is how
        many icons there are, not how many this category is holding back.
      */}
      {hiddenCount > 0 && !expanded ? (
        <div>
          <Button variant="outline" onClick={() => setExpanded(true)}>
            Show all {searching ? matches.length : icons.length} icons
          </Button>
        </div>
      ) : null}
      {expanded ? (
        <div>
          <Button variant="ghost" onClick={collapse}>
            Show fewer
          </Button>
        </div>
      ) : null}
    </div>
  )
}
