/**
 * The portal's starting point. Its job is orientation, not documentation: what
 * this is, how the layers stack, and where to go next. Anything that needs
 * explaining belongs in Docs; anything that needs browsing belongs in Components.
 */
import * as React from "react"

import { Badge } from "dbui/components/ui/badge"
import { galleryTotal } from "./gallery-data"

/** Storybook links must escape the preview iframe, hence target="_top". */
function Card({
  href,
  eyebrow,
  title,
  children,
}: {
  href: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_top"
      className="group flex flex-col gap-1 rounded-md border border-border-base bg-surface-base p-4 no-underline transition-colors hover:border-border-strong hover:bg-action-default-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    >
      <span className="type-eyebrow text-text-subtle">
        {eyebrow}
      </span>
      <span className="type-paragraph-bold text-text-strong group-hover:underline">
        {title}
      </span>
      <span className="type-label text-text-subtle">{children}</span>
    </a>
  )
}

/**
 * The layer model. Each layer only depends on the ones above it, which is what
 * makes swapping a token set or an icon pack safe — the layers below keep working.
 */
const LAYERS = [
  { name: "Tokens", detail: "Colour, type, space, radius, elevation", href: "?path=/story/docs-foundations-tokens--color" },
  { name: "Icons", detail: "456 icons, semantically tagged and searchable", href: "?path=/story/components-icons--default" },
  { name: "Components", detail: `${galleryTotal} components, each paired 1:1 with Figma`, href: "?path=/docs/components-overview--docs" },
  { name: "Compositions", detail: "Recurring assemblies — trees, filters, headers", href: "?path=/story/components-overview--docs" },
  { name: "Shells", detail: "Five page archetypes. Every page starts here", href: "?path=/story/components-shells-base--default" },
]

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-8 py-12">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1
            className="type-title-1 text-text-strong"
            style={{ margin: 0, border: "none" }}
          >
            DBUI
          </h1>
          <Badge variant="outline">Design system</Badge>
        </div>
        <p className="max-w-[62ch] type-paragraph text-text-subtle" style={{ margin: 0 }}>
          An AI-first design system for data and AI workbenches. Tokens, icons, components and page
          shells that agents and people read from the same source — so a screenshot becomes a real
          page built from real parts, not a one-off.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card href="?path=/docs/components-overview--docs" eyebrow="Browse" title="Components">
          Every component as a live tile, grouped by category.
        </Card>
        <Card href="?path=/docs/docs-tooling-overview--docs" eyebrow="Read" title="Docs">
          Foundations, tooling, voice and tone, and the checks.
        </Card>
        <Card href="?path=/story/components-shells-base--default" eyebrow="Start here" title="Page shells">
          Five archetypes. Every product page begins with one.
        </Card>
        <Card href="?path=/docs/docs-tooling-cli--docs" eyebrow="Automate" title="CLI and MCP">
          The same data agents read, on the command line.
        </Card>
      </div>

      <section style={{ margin: "64px 0 0" }}>
        <h2
          className="type-title-2 text-text-strong"
          style={{ margin: 0, border: "none", padding: 0 }}
        >
          How it stacks
        </h2>
        <p className="mt-2 max-w-[62ch] type-paragraph text-text-subtle" style={{ margin: "8px 0 0" }}>
          Each layer depends only on the ones above it. That is what makes swapping a token set or
          an icon pack safe — everything below keeps working.
        </p>

        <ol className="mt-6 flex flex-col gap-2" style={{ margin: "24px 0 0", padding: 0, listStyle: "none" }}>
          {LAYERS.map((layer, i) => (
            <li key={layer.name} style={{ margin: 0 }}>
              <a
                href={layer.href}
                target="_top"
                className="flex items-baseline gap-4 rounded-sm px-3 py-2.5 no-underline transition-colors hover:bg-action-default-hover"
              >
                <span className="w-4 shrink-0 type-label text-text-subtle">
                  {i + 1}
                </span>
                <span className="w-32 shrink-0 type-label-bold text-text-strong">
                  {layer.name}
                </span>
                <span className="type-label text-text-subtle">{layer.detail}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ margin: "64px 0 0" }}>
        <h2
          className="type-title-2 text-text-strong"
          style={{ margin: 0, border: "none", padding: 0 }}
        >
          Set up in a project
        </h2>
        <p className="mt-2 max-w-[62ch] type-paragraph text-text-subtle" style={{ margin: "8px 0 0" }}>
          Point your agent at this URL. It runs the preflight checks, brings the source in, wires up
          path aliases and tokens, and verifies the Base shell renders.
        </p>
        <pre
          className="mt-4 w-max rounded-sm bg-surface-inset px-3 py-2 font-mono type-block text-text-base"
          style={{ margin: "16px 0 0" }}
        >
          https://dbuidesign.vercel.app/install
        </pre>
      </section>
    </div>
  )
}
