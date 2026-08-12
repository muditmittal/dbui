import type { Metadata } from "next"
import Link from "next/link"

import { ArrowLeft } from "dbui/components/icons/ArrowLeft"

import { SiteHeader } from "@/components/SiteHeader"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"
import { DocHeader, DocSection, Para, Code, RefTable } from "@/components/docs/Prose"
import { SectionTabs } from "@/components/docs/StickyBar"
import { galleryGroups } from "@/stories/components/gallery-data"

import { ComponentGallery, groupId } from "./ComponentGallery"
import { ChatGallery, CHAT_GROUP } from "./ChatGallery"

/**
 * One route, two states. Without `?path=` it is the gallery — the index the top
 * nav promises. With a story id it is that component running in Storybook.
 *
 * They are one route because a tile has to lead somewhere and the somewhere is
 * Storybook. Splitting them put an index at one URL and the sandbox at another,
 * which made the top-level Components entry open the sandbox and left the index
 * reachable only from the docs rail.
 *
 * The two states do not share a frame. The sandbox is a viewport-height column
 * with the frame taking whatever the chrome leaves; the gallery is an ordinary
 * page that scrolls. A wrapper parameterized to be both would be a wrapper that
 * is neither, so each state returns its own root and only the header is shared.
 */

/**
 * In development it points at the running Storybook; in production it points at
 * the static build, which `yarn build:site` emits into public/storybook. It is
 * an iframe rather than a proxy because Storybook serves its assets from
 * absolute paths, which a path rewrite would break.
 */
const STORYBOOK_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6006"
    : "/storybook/index.html"

/**
 * `?path=` is Storybook's own parameter, forwarded rather than translated, so a
 * gallery tile can open one component. Anything that is not a story id is
 * dropped rather than corrected: the value lands in a frame URL, and a route
 * that guesses at a malformed one would be guessing about what to load in it.
 * A dropped value falls back to the gallery, which is the state a reader who
 * typed something wrong was looking for anyway.
 */
const STORY_PATH = /^\/story\/[a-z0-9-]+$/i

const storyFrom = (path?: string) => (path && STORY_PATH.test(path) ? path : null)

/**
 * The gallery already knows every story id, so the title can name the component
 * instead of calling it "a component". Story ids reached from elsewhere — the
 * shell previews on /docs/shells — are not in that data, and those fall back
 * rather than being parsed into a guess at a name.
 *
 * This feeds the document title and nothing else. Storybook's own sidebar is
 * inside the frame, so moving between components there changes the frame's
 * history and not this route's — the URL keeps naming whichever component the
 * reader arrived on. A title that has gone stale that way is glanced at, and
 * only ever after the reader themselves navigated. The frame's accessible name
 * is read aloud mid-session, so it stays generic rather than announcing a
 * component that may no longer be on screen.
 */
const componentName = (story: string) =>
  galleryGroups
    .flatMap((group) => group.items)
    .find((item) => item.storyId === story.slice("/story/".length))?.name

/**
 * The tabs are the gallery's categories and nothing else, so a new category
 * appears in the strip without anyone adding it. Every id comes from `groupId`,
 * which the gallery also uses, so a tab cannot point at a heading that is not
 * there.
 *
 * The three editorial sections below the grid used to sit in here too. They are
 * reference a reader consults once, not a category they browse, and mixing them
 * into a strip of component groups implied the strip was a table of contents for
 * the whole page rather than a filter across the set. They keep their headings
 * and their anchors — a link to #render still lands — they are just not tabs.
 */
/**
 * Chat is spliced in rather than appended. It comes from its own package, which
 * `component-index.md` does not cover, so `gallery-data.ts` cannot generate it —
 * but it is a category a reader browses, not an afterthought, and it reads with
 * Content rather than after Compositions. `CHAT_AFTER` keeps this list and the
 * gallery's own order from drifting apart: both derive the position from it.
 *
 * Shells are not here. They have their own page at `/docs/shells`, and a category
 * that is really a link to somewhere else makes the strip a table of contents for
 * the site instead of a filter across this set.
 */
const CHAT_AFTER = "content"

const SECTIONS = galleryGroups.flatMap((group) => {
  const section = { id: groupId(group.key), label: group.label }
  return group.key === CHAT_AFTER ? [section, CHAT_GROUP] : [section]
})

/** The whole rule surface for a component, and what each tag is answerable for. */
const TAGS = [
  {
    tag: "@standard",
    carries: "The display name the index row, the Figma layer and the CLI all match on",
  },
  { tag: "@guideline", carries: "A positive rule — what it is for, which variant to reach for" },
  { tag: "@constraint", carries: "A negative rule — what breaks if you use it this way" },
  { tag: "@figma", carries: "The node it is paired with. Absent when there is no counterpart" },
]

type Props = { searchParams: Promise<{ path?: string }> }

/**
 * Two states are two pages as far as a tab strip, a bookmark or a history entry
 * is concerned, so they do not share a title. The sandbox takes the component's
 * own name, which is the only thing that tells three open sandboxes apart.
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const story = storyFrom((await searchParams).path)
  if (!story) return { title: "Components — DBUI" }
  return { title: `${componentName(story) ?? "Component sandbox"} — DBUI` }
}

/**
 * The frame fills the viewport, so nothing else on this state may scroll — a
 * page that scrolls behind a fixed frame moves the chrome off the top and
 * leaves the reader with no way out.
 *
 * That is the cost of the shape: once you are in here the gallery is not on
 * screen. The strip pays it. It is a link and not a control, sized and colored
 * like the quietest thing in the header above it, because it is the way back
 * rather than something to do.
 *
 * The header's own Components entry is a second way back, and it stays one:
 * the state is told to light nothing, so that entry reads as a link rather
 * than as the page you are on. Two exits is fine. One of them lying is not.
 */
function Sandbox({ story }: { story: string }) {
  return (
    <div className="flex h-screen flex-col">
      {/* No entry is the current page here — see `SiteHeader`. */}
      <SiteHeader currentHref={null} />
      <div className="border-b border-border-base">
        <div className="mx-auto w-full max-w-6xl px-6 py-2">
          <Link
            href="/components"
            className="type-label inline-flex items-center gap-2 text-text-subtle no-underline hover:text-text-strong"
          >
            <ArrowLeft aria-hidden className="size-3" />
            All components
          </Link>
        </div>
      </div>
      <iframe
        src={`${STORYBOOK_URL}/?path=${story}`}
        title="Component sandbox"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  )
}

/**
 * The gallery leads and the contract follows. Everything below the grid is here
 * because someone who has already found their component still gets it wrong
 * without it: how to read the rules, and the one composition convention that
 * fails silently.
 *
 * Nothing here repeats a per-component rule. Those live in the JSDoc, and this
 * page's job is to say that and to say how to read it.
 *
 * This used to sit inside the docs layout and borrow its rail for context. In
 * plain site chrome the heading and the opening line are the only thing saying
 * where a reader has landed, so they carry more than they did.
 */
function Gallery() {
  return (
    <>
      <SiteHeader />
      {/*
        The site container is wider than a line of prose should be, so the
        editorial blocks take `content-column` — the same column the docs layout
        states, defined once in `globals.css` rather than copied here. The
        gallery sits outside it: the grid is the one block that wants the full
        container.
      */}
      <main className="mx-auto w-full max-w-6xl px-6 py-10 pb-24">
        <div className="content-column">
          {/*
            One line, because the rows below it are the page. It says the two
            things the layout cannot: that these are running components rather
            than pictures, and that the name is the way into Storybook — which
            is the only navigation this state has, there being no rail here.
          */}
          <DocHeader title="Components">
            Every component in the library, running. Click a name for its Storybook page.
          </DocHeader>
        </div>

        <SectionTabs sections={SECTIONS} label="Component categories" />

        <ComponentGallery after={{ [CHAT_AFTER]: <ChatGallery /> }} />

        <div className="content-column">
          <DocSection id="jsdoc" title="The rules live in the JSDoc">
            <RefTable
              columns={[
                { key: "tag", header: "Tag", width: "w-[128px]", mono: true },
                { key: "carries", header: "What it carries" },
              ]}
              rows={TAGS}
            />
            <Para>
              Read the constraints before the props. They are the record of what has already gone
              wrong with that component.
            </Para>
          </DocSection>

          <DocSection id="render" title="Compose with render, not asChild">
            <Para>
              Components are built on Base UI, which replaces an element with the one you hand it
              through <Code>render</Code>. A snippet carried over from a Radix codebase is the most
              common way a trigger breaks.
            </Para>
            <CodeBlock caption="Correct — the trigger becomes the button">
              {`<DialogTrigger render={<Button variant="primary" />}>
  Create catalog
</DialogTrigger>`}
            </CodeBlock>
            <CodeBlock caption="Wrong — a button nested inside the trigger's own button">
              {`<DialogTrigger asChild>
  <Button variant="primary">Create catalog</Button>
</DialogTrigger>`}
            </CodeBlock>
            <Para>
              The wrong form fails quietly. <Code>DropdownMenuTrigger</Code> still accepts{" "}
              <Code>asChild</Code> and drops it, so the markup compiles and renders one interactive
              element inside another, which breaks the keyboard and the accessible name. Look for a
              doubled control rather than for an error.
            </Para>
          </DocSection>

          <DocSection id="gaps" title="When nothing fits">
            <Para>
              The set is finite on purpose. Search the index&rsquo;s synonyms first — they carry the
              words someone reaches for when they do not know the Databricks name, so
              &ldquo;modal&rdquo; finds Dialog and &ldquo;kebab&rdquo; finds DropdownMenu. If
              nothing fits, that is a finding to report rather than route around, because a one-off
              is invisible to the linters and absent from Figma.
            </Para>
            <Guidance
              dos={[
                "Extend an existing component through its props and variants before reaching for a new one",
                "Flag the gap with the case that exposed it, so the shape of the fix is arguable",
                "Compose from several components when no single one covers the case",
              ]}
              donts={[
                "Build a local copy of something the system nearly has",
                "Reach past a component into the primitive it wraps",
                "Add a variant to a component to serve one screen",
              ]}
            />
          </DocSection>
        </div>
      </main>
    </>
  )
}

export default async function ComponentsPage({ searchParams }: Props) {
  const story = storyFrom((await searchParams).path)

  return story ? <Sandbox story={story} /> : <Gallery />
}
