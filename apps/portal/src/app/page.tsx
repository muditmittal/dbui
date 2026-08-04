import Link from "next/link"

import { Badge } from "dbui/components/ui/badge"
import { Button } from "dbui/components/ui/button"
import { DotField } from "@/components/DotField"
import { ShellPreview } from "@/components/ShellPreview"
import { SiteHeader } from "@/components/SiteHeader"
import { galleryTotal } from "@/stories/components/gallery-data"
import { tokenCounts } from "@/stories/tokens/token-data"

const ENTRY = [
  {
    href: "/components",
    eyebrow: "Browse",
    title: "Components",
    body: "Every component as a live tile, grouped by category, with the full variant matrix behind each one.",
  },
  {
    href: "/docs",
    eyebrow: "Read",
    title: "Docs",
    body: "Design language, tokens, layout rules, voice and tone, accessibility, and the tooling.",
  },
  {
    href: "/docs/tokens",
    eyebrow: "Review",
    title: "Token spec",
    body: "All 201 tokens with values and what they render at, in the shape engineering reviews.",
  },
  {
    href: "/docs/install",
    eyebrow: "Build",
    title: "Install",
    body: "Point an agent at one URL. It wires up path aliases, tokens, and verifies the shell renders.",
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
            <Button nativeButton={false} render={<Link href="/docs" />}>
              Read the docs
            </Button>
            {/*
              The outline variant is transparent by design, but here it sits over
              the animated dot field, so the dots read through the label. A solid
              surface is a property of this context, not a fix to the variant.

              The hover wash arrives as a background-image so it layers over that
              solid colour. The variant's own hover sets background-color, which
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
              className="group flex flex-col gap-1.5 rounded-md border border-border-base bg-surface-base p-5 no-underline transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <span className="type-eyebrow text-text-subtle">{card.eyebrow}</span>
              <span className="type-title-4 text-text-strong group-hover:underline">
                {card.title}
              </span>
              <span className="type-body text-text-subtle">{card.body}</span>
            </Link>
          ))}
        </section>

      </main>

      <footer className="border-t border-border-base">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <span className="type-hint text-text-subtle">
            Databricks · design system for data and AI workbenches
          </span>
          <a
            href="https://github.com/muditmittal/dbui"
            target="_blank"
            rel="noreferrer"
            className="type-hint text-text-subtle no-underline hover:text-text-strong"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  )
}
