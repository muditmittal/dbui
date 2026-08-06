import Link from "next/link"

import { DocHeader } from "@/components/docs/Prose"

export const metadata = { title: "Docs — DBUI" }

/**
 * A router, not an index. The rail already lists every page, so the only thing
 * this page can add is which question each area settles and when to open it —
 * a noun in a nav cannot say either.
 *
 * It names the four areas and nothing under them. Listing Tokens, Icons,
 * Components and the rest here would be the second copy of the rail that got
 * the previous landing page deleted.
 *
 * The layer model that used to live here moved to `/docs/foundations`. Do not
 * bring it back — that page owns the stack.
 */

type Area = {
  id: string
  /** Where the area sits in the order work moves: decide, write, build, check. */
  stage: string
  /** Matches the rail label exactly, so the two cannot be read as two places. */
  title: string
  href: string
  what: string
  when: string
}

const AREAS: Area[] = [
  {
    id: "principles",
    stage: "Decide",
    title: "Design principles",
    href: "/docs/principles",
    what: "The calls the system already made, each stated with the thing it gives up.",
    when: "Open it when a review stalls on preference, or before proposing a pattern the system does not have.",
  },
  {
    id: "voice",
    stage: "Write",
    title: "Voice and tone",
    href: "/docs/voice",
    what: "Casing, spelling, the words to avoid and the terminology table, rendered from the file the rules live in.",
    when: "Open it when you are naming or wording something, so the answer is a lookup rather than whatever the first writer chose.",
  },
  {
    id: "foundations",
    stage: "Build",
    title: "Foundations",
    href: "/docs/foundations",
    what: "The layers in dependency order, and the file that owns the rules for each one.",
    when: "Open it when you do not know where a thing belongs, or when two sources disagree and you need to know which wins.",
  },
  {
    id: "tooling",
    stage: "Check",
    title: "Tooling",
    href: "/docs/overview",
    what: "The CLI, the MCP server and the linters, all reading the same source these pages render.",
    when: "Open it to take the system as data instead of as prose, or to find out what is checked automatically and what is not.",
  },
]

/**
 * `scroll-mt` clears the sticky header. Without it a jump lands the heading
 * under the chrome, which is the failure that makes readers stop using anchors.
 */
function AreaSection({ area }: { area: Area }) {
  return (
    <section id={area.id} className="mt-12 flex scroll-mt-20 flex-col gap-2">
      <span className="type-eyebrow text-text-subtle">{area.stage}</span>
      {/* The heading is the link. A separate "go to X" row under a heading that
          already says X is the same words twice. */}
      <h2 className="type-title-3">
        <Link href={area.href} className="text-text-strong no-underline hover:underline">
          {area.title} <span aria-hidden="true">&rarr;</span>
        </Link>
      </h2>
      <p className="type-paragraph text-text-subtle">
        {area.what} {area.when}
      </p>
    </section>
  )
}

export default function DocsIndex() {
  return (
    <>
      <DocHeader title="Docs">
        Four areas, in the order work moves through them. Open the one that settles the question you
        arrived with.
      </DocHeader>

      <nav aria-label="Jump to an area" className="mt-8 flex flex-wrap gap-2">
        {AREAS.map((area) => (
          <a
            key={area.id}
            href={`#${area.id}`}
            className="type-label rounded-1 border border-border-base px-2.5 py-1 text-text-base no-underline transition-colors hover:border-border-strong hover:bg-surface-hover"
          >
            {area.title}
          </a>
        ))}
      </nav>

      {AREAS.map((area) => (
        <AreaSection key={area.id} area={area} />
      ))}
    </>
  )
}
