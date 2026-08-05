import Link from "next/link"

import { DocHeader, DocSection, Para, Code, Command } from "@/components/docs/Prose"
import { DOCS_NAV } from "@/components/docs-nav-data"

/**
 * Each layer depends only on the ones above it. That is the claim the system
 * rests on, so it belongs with the documentation rather than the marketing page.
 * It moved here from `/docs`, which is now a redirect.
 *
 * No layer states how many of a thing it holds. Counts drift, and the two the
 * portal already had disagreed with the CLI.
 */
const LAYERS = [
  {
    name: "Tokens",
    detail: "Color, type, space, radius, size, elevation and motion",
    href: "/docs/tokens",
  },
  {
    name: "Icons",
    detail: "One set, tagged by concept so an icon can be found without its name",
    href: "/docs/icons",
  },
  {
    name: "Components",
    detail: "Each paired 1:1 with Figma, each carrying its own rules",
    href: "/docs/components",
  },
  {
    name: "Compositions",
    detail: "Recurring assemblies — trees, filter bars, page headers",
    href: "/docs/patterns",
  },
  {
    name: "Shells",
    detail: "Page archetypes. Every screen starts with one",
    href: "/docs/patterns",
  },
]

const FOUNDATIONS = DOCS_NAV.find((entry) => entry.href === "/docs/foundations")?.items ?? []

const BLURBS: Record<string, string> = {
  "/docs/tokens": "Every value the system can express, and the naming scheme that makes the right one findable.",
  "/docs/icons": "How icons are categorized and tagged, the entity mappings, and how to search rather than guess.",
  "/docs/components": "What ships, where each component's rules live, and how to read them before writing UI.",
  "/docs/patterns": "The page shells and the recurring assemblies built on top of them.",
  "/docs/accessibility":
    "The checks that apply to every screen, and an honest account of what the system does not yet do.",
}

export default function FoundationsPage() {
  return (
    <>
      <DocHeader title="Foundations">
        The layers every screen is built from, and the rules that decide how they fit together.
      </DocHeader>

      <DocSection title="How it stacks">
        <Para>
          Each layer depends only on the ones above it. That is what makes swapping a token set or
          an icon pack safe — everything below keeps working.
        </Para>
        <ol className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
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
      </DocSection>

      <DocSection title="The pages in this group">
        <div className="flex flex-col">
          {FOUNDATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col gap-1 border-b border-border-subtle py-3.5 no-underline transition-colors hover:bg-surface-hover"
            >
              <span className="type-label-bold text-text-strong">{item.label}</span>
              <span className="type-body text-text-subtle">{BLURBS[item.href]}</span>
            </Link>
          ))}
        </div>
      </DocSection>

      <DocSection title="One owner per rule">
        <Para>
          A rule stated in two files is a rule that will disagree with itself. Every kind of rule in
          this system has exactly one owner, and these pages render that owner rather than restate
          it. When a page and a source disagree, the source wins — a component&rsquo;s own JSDoc
          outranks any index, and <Code>theme.config.mjs</Code> outranks any prose about a value.
        </Para>
        <Para>
          <Code>CONTRIBUTING.md</Code> lists which files must move together for each kind of change.
          Read it before changing anything in the system, not after.
        </Para>
      </DocSection>

      <DocSection title="Read the foundations as data">
        <Para>
          Everything on these pages is available as typed JSON from the same API the docs are built
          from, so an agent does not have to read a rendered page to learn the system.
        </Para>
        <Command>yarn dbui search &lt;query&gt; --json</Command>
        <Para>
          <Code>component</Code>, <Code>icon</Code>, <Code>shell</Code>, <Code>token</Code> and{" "}
          <Code>docs</Code> each take the same flag. The{" "}
          <Link href="/docs/overview" className="text-text-accent">
            tooling pages
          </Link>{" "}
          cover the CLI, the MCP server and the linters in full.
        </Para>
      </DocSection>
    </>
  )
}
