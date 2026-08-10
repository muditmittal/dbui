import Link from "next/link"

import { Badge } from "dbui/components/ui/badge"
import { Button } from "dbui/components/ui/button"
import { DotField } from "@/components/DotField"
import { ShellPreview } from "@/components/ShellPreview"
import { SiteHeader } from "@/components/SiteHeader"
import { galleryTotal } from "@/stories/components/gallery-data"
import { tokenCounts } from "@/stories/tokens/token-data"

/**
 * Four pages rather than four kinds of destination: what the system decides, how
 * it speaks, what it is built from, and what it ships.
 *
 * No eyebrow. It named the kind of destination — Browse a gallery, Read prose,
 * Review a spec, Build from a guide — which distinguished anything only while the
 * four were four different kinds. Three of these are documentation pages, so the
 * same scheme repeats "Read" and the line stops saying more than the title does.
 * Do not reach for a staged verb set instead. `/docs` retired its own
 * Decide / Write / Build / Check staging for the same reason.
 *
 * Titles are the labels from `docs-nav-data.ts` and the header's `NAV`, so this
 * page cannot disagree with either about what a page is called.
 *
 * Each body says what its page settles, tightened from that page's own lede, and
 * the four render within about ten pixels of each other on one line. They pair up
 * in the grid, where a row equalizes tile heights, so a body longer than its
 * neighbor does not push its own tile taller — it leaves the shorter one holding
 * a pocket of empty space. Keep a replacement the same length.
 */
const ENTRY = [
  {
    href: "/docs/principles",
    title: "Design principles",
    body: "When two solutions look reasonable, these decide which one ships.",
  },
  {
    href: "/docs/voice",
    title: "Voice and tone",
    body: "One voice for every string, so product experience is consistent.",
  },
  {
    href: "/docs/tokens",
    title: "Tokens",
    body: "Every value the system can express, and the one file they all come from.",
  },
  {
    href: "/components",
    title: "Components",
    body: "Every component running, so you try a variant rather than read about it.",
  },
]

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/*
        The dot field sits behind the hero only. It is decorative, so it is
        aria-hidden and stops animating under prefers-reduced-motion.
      */}
      <div className="relative">
        <DotField className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface-base" />

        <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 pt-28 pb-24 text-center">
          <Badge variant="outline">Alpha · internal preview</Badge>
          {/*
            text-balance rather than a <br>: the browser evens the two lines,
            which lands on "…for data / and AI workbenches." at this width and
            still rewraps sensibly on a narrow screen. A hard break would strand
            words on small viewports.
          */}
          <h1 className="type-title-1 max-w-[24ch] text-balance text-text-strong">
            The UI stack for data and AI workbenches.
          </h1>
          <p className="type-paragraph max-w-[62ch] text-text-subtle">
            Tokens, icons, components, and shells — one source agents and people build from.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Button nativeButton={false} render={<Link href="/docs/principles" />}>
              Read the docs
            </Button>
            {/*
              The outline variant is transparent by design, but here it sits over
              the animated dot field, so the dots read through the label. A solid
              surface is a property of this context, not a fix to the variant.

              The hover wash arrives as a background-image so it layers over that
              solid color. The variant's own hover sets background-color, which
              would have replaced the fill and let the dots back through at the
              exact moment the pointer is on the button.
            */}
            <Button
              variant="outline"
              nativeButton={false}
              className="bg-surface-base hover:bg-surface-base hover:[background-image:linear-gradient(var(--db-action-default-hover),var(--db-action-default-hover))]"
              render={<Link href="/components" />}
            >
              Browse components
            </Button>
          </div>
        </section>
      </div>

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="pb-24">
          <ShellPreview />
          <p className="type-body mx-auto mt-4 max-w-[62ch] text-center text-text-subtle">
            The Base shell, running. Platform header, product nav, content surface and the assistant
            panel — every product page starts here rather than from an empty page.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-3 pb-20 sm:grid-cols-2">
          {ENTRY.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-1.5 rounded-2 border border-border-base bg-surface-base p-5 no-underline transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <span className="type-title-4 text-text-strong group-hover:underline">
                {card.title}
              </span>
              <span className="type-body text-text-subtle">{card.body}</span>
            </Link>
          ))}
        </section>

      </main>
    </>
  )
}
