import Link from "next/link"

import { iconClassifications } from "@/components/icons/classifications"
import { iconDescriptions } from "@/components/icons/descriptions"
import {
  dataEntityIcons,
  fileEntityIcons,
  columnTypeIcons,
} from "@/components/icons/entity-icons"
import {
  DocHeader,
  DocSection,
  DocSubsection,
  Para,
  Code,
  Command,
  RefTable,
  SourceNote,
} from "@/components/docs/Prose"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"

export const metadata = { title: "Icons — DBUI" }

/**
 * Counted from `classifications.ts` rather than written down, because the two
 * numbers this page could have quoted disagree: the icon directory holds more
 * components than the metadata maps have keys, and `icon-index.md` reports the
 * map count as if it were the set. Rendering the map means the page cannot be
 * the one that is wrong.
 *
 * The gap itself is not restated here. `CONTRIBUTING.md` owns known drift and
 * names the icons that are missing an entry.
 */
const CATEGORY_ORDER = ["object", "action", "indicator", "component"] as const

const CATEGORY_MEANING: Record<(typeof CATEGORY_ORDER)[number], string> = {
  object: "Names a thing — a catalog, a job, a model. Belongs where an entity is being identified.",
  action: "Names a verb. Belongs where something happens on click.",
  indicator: "Names a state. Belongs where a status is being reported.",
  component: "Built into a control's own chrome, and used nowhere else.",
}

const tagged = CATEGORY_ORDER.map((category) => ({
  category: <Code>{category}</Code>,
  meaning: CATEGORY_MEANING[category],
  count: Object.values(iconClassifications).filter((c) => c === category).length,
}))

/** The tag on a real icon, so the shape below is not a paraphrase of one. */
const EXAMPLE = "Catalog"
const exampleTag = `/** use:${iconClassifications[EXAMPLE]} ${iconDescriptions[EXAMPLE]} */`

/**
 * Two columns of `type → Icon`. A table would be taller than the content
 * deserves, and the grid makes the collisions visible — two entity types
 * resolving to one icon is a deliberate choice a reader should be able to see.
 *
 * The key column is a fixed width rather than justified apart, so the arrows
 * line up and each pair reads as one unit instead of two ragged columns.
 */
function EntityMap({ map }: { map: Record<string, string> }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 overflow-hidden rounded-md border border-border-base p-4 sm:grid-cols-2">
      {Object.entries(map).map(([type, icon]) => (
        <div key={type} className="flex items-baseline gap-2 py-1">
          <span className="type-code w-36 shrink-0 text-text-subtle">{type}</span>
          <span className="type-code shrink-0 text-text-subtle">&rarr;</span>
          <span className="type-code text-text-base">{icon}</span>
        </div>
      ))}
    </div>
  )
}

export default function IconsPage() {
  return (
    <>
      <DocHeader title="Icons">
        One set, tagged by concept, so the right icon can be found without knowing its name. The
        searchable grid lives in Storybook. This page covers the rules a grid cannot express.
      </DocHeader>

      <div className="mt-8">
        <SourceNote>
          <Code>packages/dbui/docs/icon-index.md</Code> decides which icon to pick, and it is the
          only file that does. The metadata behind it lives on each icon component as a{" "}
          <Code>use:</Code> tag, mirrored into <Code>classifications.ts</Code> and{" "}
          <Code>descriptions.ts</Code>. When a tag and the index disagree, the tag wins.
        </SourceNote>
      </div>

      <DocSection title="Four categories">
        <Para>
          Category is the first cut, and it is a claim about the icon&rsquo;s job rather than its
          drawing. The same shape can be an object in a tree and an action in a toolbar, so the tag
          records which one it is and the count shows how far a category narrows the search.
        </Para>
        <RefTable
          columns={[
            { key: "category", header: "Category", width: "w-[128px]", mono: true },
            { key: "meaning", header: "What it marks" },
            { key: "count", header: "Tagged", width: "w-[88px]" },
          ]}
          rows={tagged}
        />
        <Para>
          Crossing a category is the most common icon mistake. An action icon put on a tree node
          reads as a button, and a status icon put on a button reads as a state the user cannot
          change.
        </Para>
      </DocSection>

      <DocSection title="Every icon carries its own metadata">
        <Para>
          The tag is one line above the component, and it holds four things — the category, the
          concept the icon names, the product area it belongs to and the words someone might search
          instead of the concept.
        </Para>
        <Command>{exampleTag}</Command>
        <Para>
          The third field is the one that makes the set searchable. It carries the words a person
          would reach for when they do not know the Databricks name, which is the normal case for
          anyone new to the platform. An icon with no synonyms is findable only by someone who
          already knows what it is called.
        </Para>
        <Para>
          Adding an icon means updating every surface that describes it, not just the component.{" "}
          <Code>CONTRIBUTING.md</Code> lists them, and it also names the icons that are currently
          missing an entry. Those are unreachable by search until the entry is added.
        </Para>
      </DocSection>

      <DocSection title="Search by concept, not by name">
        <Para>
          Guessing an icon name is how the wrong icon gets shipped. Search the concept, read what
          comes back, then import the exact name.
        </Para>
        <Command>yarn dbui search &lt;concept&gt;</Command>
        <Para>
          <Code>dbui icon &lt;name&gt;</Code> prints one icon with its category, label, area,
          synonyms and import path. <Code>dbui icon --category object</Code> lists a single
          category. Both take <Code>--json</Code>.
        </Para>
        <Para>
          For browsing rather than looking up, the{" "}
          <Link href="/components" className="text-text-accent">
            component gallery
          </Link>{" "}
          has an Icons page with a live grid that filters on name, label, area and synonyms together
          and copies the import on click. Use it to choose between two candidates you have already
          narrowed to.
        </Para>
      </DocSection>

      <DocSection title="Typed nodes resolve through a map">
        <Para>
          A tree, a catalog browser and a search result all show the same table, so the icon has to
          be a function of the entity type rather than a choice made at each call site. Three maps
          hold those resolutions. Read the icon name from the map and import that component.
        </Para>
        <CodeBlock caption="Read the name from the map, then import that component by path">
          {`import { dataEntityIcons } from "dbui/components/icons/entity-icons"
import { TableStream } from "dbui/components/icons/TableStream"

dataEntityIcons.streamingTable // "TableStream"`}
        </CodeBlock>

        <DocSubsection title="Unity Catalog objects">
          <EntityMap map={dataEntityIcons} />
        </DocSubsection>

        <DocSubsection title="Workspace objects">
          <EntityMap map={fileEntityIcons} />
        </DocSubsection>

        <DocSubsection title="Column types">
          <EntityMap map={columnTypeIcons} />
        </DocSubsection>

        <Para>
          There is no barrel export, so a name from the map cannot be indexed into a namespace at
          runtime. Import the components a surface needs and build the lookup from those. That is the
          same constraint every icon import has, and it is what keeps a screen from pulling the whole
          set into its bundle.
        </Para>
        <Para>
          Where two types resolve to one icon, that is the map saying the distinction does not earn a
          separate glyph. Do not add one locally to make a screen more precise — the same object
          would then read differently in two places, which is the failure the map exists to prevent.
        </Para>
      </DocSection>

      <DocSection title="Sizing">
        <Para>
          Every icon takes a numeric <Code>size</Code> prop and renders a square at that size. The
          default is a literal in each icon component, and it matches the <Code>md</Code> step of the
          icon scale. The{" "}
          <Link href="/docs/tokens" className="text-text-accent">
            Tokens page
          </Link>{" "}
          shows the scale and explains why <Code>md</Code> is the size it is.
        </Para>
        <Para>
          The scale ships as CSS custom properties, but nothing consumes them yet. Components size
          icons with Tailwind utilities instead, and the numeric default is not wired to the token.
          Changing the sizing scalar therefore does not move an icon today. Treat the scale as the
          set of sizes to choose from rather than as a live dial.
        </Para>
      </DocSection>

      <DocSection title="The pack is a replaceable layer">
        <Para>
          Icons sit between tokens and components, and nothing below them depends on a particular
          drawing. Each icon is imported from its own path rather than a barrel, and every component
          that needs one imports it by name, so a different pack could be dropped in by supplying
          the same names and the same metadata surfaces. That is the whole reason the layer is
          separate.
        </Para>
        <Para>
          Only the Databricks pack exists today. A second pack is listed as not started in{" "}
          <Code>TRACKER.md</Code>, so the swap is a property of the structure rather than something
          the system has done. Never install an icon package to fill a gap — the linter reports it,
          and a mixed set is visible to a user immediately.
        </Para>
      </DocSection>

      <DocSection title="Rules">
        <Guidance
          dos={[
            "Search the concept, then import the exact name the search returned",
            "Resolve a typed node through the entity map, never by eye",
            "Match the category to the job — object identifies, action happens, indicator reports",
            "Give an icon-only control a label, because the glyph is not the name",
          ]}
          donts={[
            "Guess a name from the shape you have in mind",
            "Reuse a control's chrome icon as decoration outside that control",
            "Add a local icon to draw a distinction the entity map deliberately collapses",
            "Install lucide, heroicons or any other icon package",
          ]}
        />
      </DocSection>
    </>
  )
}
