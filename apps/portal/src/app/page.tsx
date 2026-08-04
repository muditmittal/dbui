import Link from "next/link"

import { Badge } from "dbui/components/ui/badge"
import { Button } from "dbui/components/ui/button"
import { DotField } from "@/components/DotField"
import { ShellPreview } from "@/components/ShellPreview"
import { SiteHeader } from "@/components/SiteHeader"
import { galleryTotal } from "@/stories/components/gallery-data"
import { tokenCounts } from "@/stories/tokens/token-data"

/**
 * Each layer depends only on the ones above it. That is the claim the whole
 * system rests on, so it leads the page.
 */
const LAYERS = [
  { name: "Tokens", detail: `${tokenCounts.colorGroups} colours, 14 type styles, all generated from one file`, href: "/docs/tokens" },
  { name: "Icons", detail: "450 icons, semantically tagged and searchable", href: "/components" },
  { name: "Components", detail: `${galleryTotal} components, each paired 1:1 with Figma`, href: "/components" },
  { name: "Compositions", detail: "Recurring assemblies — trees, filters, headers", href: "/components" },
  { name: "Shells", detail: "Five page archetypes. Every page starts with one", href: "/components" },
]

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
          <h1 className="type-title-1 max-w-[20ch] text-text-strong">
            A design system agents can actually build with.
          </h1>
          <p className="type-paragraph max-w-[62ch] text-text-subtle">
            DBUI is an AI-first design system for data and AI workbenches. Tokens, icons, components
            and page shells that agents and people read from the same source — so a screenshot
            becomes a real page built from real parts, not a one-off.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Button nativeButton={false} render={<Link href="/docs" />}>
              Read the docs
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/components" />}>
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
              className="group flex flex-col gap-1.5 rounded-md border border-border-base bg-surface-base p-5 no-underline transition-colors hover:border-border-strong hover:bg-action-default-hover"
            >
              <span className="type-eyebrow text-text-subtle">{card.eyebrow}</span>
              <span className="type-title-4 text-text-strong group-hover:underline">
                {card.title}
              </span>
              <span className="type-body text-text-subtle">{card.body}</span>
            </Link>
          ))}
        </section>

        <section className="border-t border-border-base pt-16 pb-24">
          <h2 className="type-title-2 text-text-strong">How it stacks</h2>
          <p className="type-paragraph mt-3 max-w-[64ch] text-text-subtle">
            Each layer depends only on the ones above it. That is what makes swapping a token set or
            an icon pack safe — everything below keeps working.
          </p>

          <ol className="mt-8 flex flex-col" style={{ listStyle: "none", padding: 0 }}>
            {LAYERS.map((layer, i) => (
              <li key={layer.name}>
                <Link
                  href={layer.href}
                  className="flex items-baseline gap-5 rounded-sm border-b border-border-subtle px-3 py-4 no-underline transition-colors hover:bg-action-default-hover"
                >
                  <span className="type-hint w-5 shrink-0 text-text-subtle tabular-nums">
                    {i + 1}
                  </span>
                  <span className="type-label-bold w-40 shrink-0 text-text-strong">
                    {layer.name}
                  </span>
                  <span className="type-body text-text-subtle">{layer.detail}</span>
                </Link>
              </li>
            ))}
          </ol>
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
