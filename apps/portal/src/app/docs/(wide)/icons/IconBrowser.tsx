"use client"

import * as React from "react"
import { Badge } from "dbui/components/ui/badge"
import { Button } from "dbui/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "dbui/components/ui/empty"
import { Input } from "dbui/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
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
import { StickyBar } from "@/components/docs/StickyBar"
import { anchorOffset } from "@/components/docs/anchor"

/**
 * The icon browser on /docs/icons.
 *
 * Metadata for the whole set ships with the page, so search answers on the
 * first keystroke. Geometry does not: each category is a separate chunk pulled
 * in when it is first shown, because the drawings are an order of magnitude
 * larger than the words and most visits look at one category.
 *
 * The table sits in the page flow and never scrolls inside itself. It used to
 * live in a 689px box holding up to 33,000px of its own scroll, which trapped
 * the wheel: a reader scrolling down the page crossed the table and could not
 * get past it without moving the pointer off it first. The cost of taking the
 * box away is that the rest of the page sits below however many rows are open,
 * so the list is bounded until the reader asks for the rest.
 */

/** Enough rows to show the shape of the set without owning the page. */
const WINDOW = 40

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
 * Tab order, which is not the generated `iconCategories` order.
 *
 * Components first because it is the category a reader is most often in without
 * having chosen it — a chevron, a caret, a close — and the one whose icons must
 * never be borrowed as decoration. Then the three that describe content, in the
 * order the four-categories table reads them: a thing, a verb, a state.
 */
const TAB_ORDER: IconCategory[] = ["component", "object", "action", "indicator"]

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
 * draw every icon without importing a module each; nothing here is user input.
 *
 * The placeholder holds the glyph's exact box, so the row never resizes when a
 * chunk lands. It is transparent rather than filled: a grid of grey squares
 * turning into drawings reads as a fault, and the chunk arrives in a few frames.
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

export function IconBrowser() {
  const [category, setCategory] = React.useState<IconCategory>(TAB_ORDER[0])
  const [query, setQuery] = React.useState("")
  const [expanded, setExpanded] = React.useState(false)
  const [glyphs, setGlyphs] = React.useState<Record<string, Glyph>>({})
  const requested = React.useRef(new Set<IconCategory>())
  const top = React.useRef<HTMLDivElement>(null)

  // The field owns the caret; the table is allowed to arrive a frame later.
  // Filtering is cheap, but the list it produces is not, and a deferred value
  // is what keeps a fast typist from ever waiting on a row.
  const deferredQuery = React.useDeferredValue(query)
  const searching = deferredQuery.trim().length > 0

  /**
   * A query searches the WHOLE set, not the open tab.
   *
   * The tabs answer "show me the icons for a job", which is the question someone
   * meeting the set has. A search answers "where is the one I already know
   * exists", which is why anyone comes back — and scoping that to whichever tab
   * happened to be open would hide the answer and give no clue why. So while a
   * query is present the tabs stop filtering and each row says which category it
   * came from instead.
   */
  React.useEffect(() => {
    for (const key of searching ? iconCategories : [category]) {
      if (requested.current.has(key)) continue
      requested.current.add(key)
      glyphChunks[key]().then((chunk) => {
        setGlyphs((loaded) => ({ ...loaded, ...chunk.default }))
      })
    }
  }, [category, searching])

  const matches = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (q) return searchable.filter((entry) => entry.haystack.includes(q)).map((entry) => entry.icon)
    return searchable.filter((entry) => entry.icon.category === category).map((entry) => entry.icon)
  }, [category, deferredQuery])

  // A new filter is a new list, so it closes back to one window. Leaving it open
  // would drop the reader into several thousand pixels of rows they did not ask
  // for every time they changed a letter.
  React.useEffect(() => {
    setExpanded(false)
  }, [category, deferredQuery])

  const shown = expanded ? matches : matches.slice(0, WINDOW)
  const hidden = matches.length - shown.length

  const collapse = () => {
    setExpanded(false)
    top.current?.scrollIntoView({ block: "start" })
  }

  return (
    // Marked as generated so the word count on this page can separate the
    // editorial layer from 456 tags the icons wrote themselves.
    <div ref={top} data-doc-generated style={anchorOffset} className="mt-6 flex flex-col gap-4">
      {/*
        Pinned, because the table is the page. Scrolled a few hundred rows in,
        switching category or clearing the search used to mean scrolling back to
        the top first, which is the one thing a browser of 456 rows must not ask.
      */}
      {/* The bottom edge comes from `StickyBar` itself now — see the note there. */}
      <StickyBar className="flex flex-col gap-3 pt-1 pb-3">
        {/*
          The field leads. Search is why anyone returns to this page, and it is
          the one control that works no matter which category is open — putting
          the tabs above it made the narrower question look like the first one.
        */}
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a name, a concept or a synonym"
          aria-label="Search icons"
        />

        {/*
          Tabs or a count, never both, in a slot tall enough for the taller of
          the two so the table below does not jump on the first keystroke.

          A query searches all four categories, so the tabs stop deciding
          anything the moment one is typed. Leaving them up would show a
          selected category the list is ignoring, which is worse than showing
          nothing: the reader would read the results as that category's.
        */}
        <div className="flex min-h-12 items-center">
          {searching ? (
            // aria-hidden because the live region below says the same words, and
            // the announcement should come from the change rather than from the
            // reader happening to cross this line.
            <p aria-hidden className="type-label text-text-subtle">
              {matches.length} {matches.length === 1 ? "match" : "matches"} found
            </p>
          ) : (
            /*
              variant="pill" rather than the underline the Tokens section bar
              uses. Both pages carry a strip under the deck, but a click here
              replaces the table where there it jumps down one long page, and the
              component's own constraint puts a fill on the first and a rule on
              the second.

              border-b-0 because `StickyBar` draws that rule, and two on stacked
              elements read as one thick one. The first version of this override
              said "because the field row sits between this strip and the table",
              which stopped being true the moment those two rows were swapped —
              a reason about layout order does not survive a reorder. This one is
              about which element owns the edge, and it holds either way.
            */
            <Tabs value={category} onValueChange={(next) => setCategory(next as IconCategory)}>
              <TabsList
                variant="pill"
                width="full"
                aria-label="Icon category"
                className="border-b-0"
              >
                {TAB_ORDER.map((key) => (
                  <TabsTrigger key={key} value={key}>
                    {CATEGORY_LABEL[key]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        {/*
          Mounted in both states and empty in one, because a live region has to
          exist before the text arrives for the change to be announced — one
          inserted on the first keystroke is read late or not at all. Out of flow
          under `sr-only`, so it adds no gap.
        */}
        <span className="sr-only" aria-live="polite">
          {searching ? `${matches.length} matches found` : ""}
        </span>
      </StickyBar>

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="type-label-bold w-11 pl-3" aria-label="Preview" />
              <TableHead className="type-label-bold w-52">Name</TableHead>
              <TableHead className="type-label-bold">What the tag says</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((icon) => (
              <TableRow key={icon.name}>
                <TableCell className="w-11 py-1.5 pl-3">
                  <IconGlyph glyph={glyphs[icon.name]} />
                </TableCell>
                <TableCell className="type-code w-52 py-1.5 text-text-base">
                  {icon.name}
                </TableCell>
                {/*
                  One line per icon. The label, the area and the synonyms fit
                  inside the measure for all but the longest few, and those
                  wrap rather than clip — the synonyms are the field that makes
                  the set searchable, so none of it may be hidden.
                */}
                <TableCell className="py-1.5 whitespace-normal!">
                  {/*
                    Wider than the gap inside the row, because the label and
                    the synonyms are the same size and only differ in weight of
                    color — without the space they read as one run of words.
                  */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <span className="type-body text-text-base">{icon.label}</span>
                    {/*
                      Only while searching. A results list spans all four
                      categories, and the category is the field that decides
                      whether the icon may be used where the reader wants it —
                      inside a tab it is the tab's own label repeated 200 times.
                    */}
                    {searching ? (
                      <Badge>{CATEGORY_LABEL[icon.category]}</Badge>
                    ) : null}
                    {icon.area ? <Badge variant="outline">{icon.area}</Badge> : null}
                    {icon.mapped === false ? (
                      <Badge variant="warning">Not in the maps</Badge>
                    ) : null}
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
      )}

      {/*
        Opening the rest is a decision, not a side effect of scrolling. The old
        table added a page whenever an observer saw the end coming, which grew
        the scroll under the reader by four thousand pixels at a time.
      */}
      {hidden > 0 ? (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          // Mounting four hundred rows is one long frame. As a transition the
          // press still highlights on time and the rows arrive behind it.
          onClick={() => React.startTransition(() => setExpanded(true))}
        >
          Show the remaining {hidden}
        </Button>
      ) : null}
      {expanded && matches.length > WINDOW ? (
        <Button variant="ghost" size="sm" className="self-start" onClick={collapse}>
          Show fewer
        </Button>
      ) : null}
    </div>
  )
}
