import Link from "next/link"

import { DOCS_NAV } from "@/components/docs-nav-data"

/**
 * Each layer depends only on the ones above it. That is the claim the system
 * rests on, so it belongs with the documentation rather than the marketing page.
 */
const LAYERS = [
  { name: "Tokens", detail: "Color, type, space, radius, size, elevation, motion", href: "/docs/tokens" },
  { name: "Icons", detail: "450 icons, semantically tagged and searchable", href: "/components" },
  { name: "Components", detail: "48 components, each paired 1:1 with Figma", href: "/components" },
  { name: "Compositions", detail: "Recurring assemblies — trees, filters, headers", href: "/components" },
  { name: "Shells", detail: "Five page archetypes. Every page starts with one", href: "/templates" },
]
import { galleryTotal } from "@/stories/components/gallery-data"
import { tokenCounts } from "@/stories/tokens/token-data"

export default function DocsOverview() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Docs</h1>
      <p className="type-paragraph mt-4 max-w-[68ch] text-text-subtle">
        DBUI is a design system for data and AI workbenches — catalogs, queries, runs, lineage,
        models, governance, and chat over data. It is built so that an agent and a person reading
        the same source arrive at the same UI.
      </p>

      <Link
        href="/docs/principles"
        className="mt-8 flex flex-col gap-1 rounded-md border border-border-base bg-surface-base p-5 no-underline transition-colors hover:border-border-strong hover:bg-surface-hover"
      >
        <span className="type-eyebrow text-text-subtle">Start here</span>
        <span className="type-title-4 text-text-strong">Design principles</span>
        <span className="type-body text-text-subtle">
          Six principles that decide how the interface looks, speaks and behaves — each naming
          something that loses.
        </span>
      </Link>

      <h2 className="type-title-3 mt-12 text-text-strong">What ships</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          [tokenCounts.colorGroups, "semantic colors"],
          ["14", "type styles"],
          [galleryTotal, "components"],
          ["450", "icons"],
        ].map(([n, label]) => (
          <div key={String(label)} className="rounded-md border border-border-base p-4">
            <div className="type-title-2 text-text-strong tabular-nums">{n}</div>
            <div className="type-hint mt-1 text-text-subtle">{label}</div>
          </div>
        ))}
      </div>

      <h2 className="type-title-3 mt-12 text-text-strong">How it stacks</h2>
      <p className="type-body mt-3 max-w-[68ch] text-text-subtle">
        Each layer depends only on the ones above it. That is what makes swapping a token set or an
        icon pack safe — everything below keeps working.
      </p>
      <ol className="mt-5 flex flex-col" style={{ listStyle: "none", padding: 0 }}>
        {LAYERS.map((layer, i) => (
          <li key={layer.name}>
            <Link
              href={layer.href}
              className="flex items-baseline gap-5 border-b border-border-subtle px-3 py-3.5 no-underline transition-colors hover:bg-surface-hover"
            >
              <span className="type-hint w-5 shrink-0 text-text-subtle tabular-nums">{i + 1}</span>
              <span className="type-label-bold w-36 shrink-0 text-text-strong">{layer.name}</span>
              <span className="type-body text-text-subtle">{layer.detail}</span>
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="type-title-3 mt-12 text-text-strong">Everything here</h2>
      <div className="mt-5 flex flex-col gap-8">
        {DOCS_NAV.map((group) => (
          <div key={group.title}>
            <div className="type-eyebrow text-text-subtle">{group.title}</div>
            <div className="mt-2 flex flex-col">
              {group.items
                .filter((i) => i.href !== "/docs")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="type-body border-b border-border-subtle py-2.5 text-text-base no-underline hover:text-text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="type-title-3 mt-12 text-text-strong">Components</h2>
      <p className="type-paragraph mt-3 max-w-[68ch] text-text-subtle">
        The component library lives in Storybook, where every variant, state and control is
        interactive.{" "}
        <Link href="/components" className="text-text-accent">
          Browse components
        </Link>
        .
      </p>
    </>
  )
}
