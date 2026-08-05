import Link from "next/link"

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
import { icons, iconCategories } from "@/components/icon-data"

import { IconBrowser } from "./IconBrowser"

export const metadata = { title: "Icons — DBUI" }

/**
 * Everything countable on this page is counted from the generated data, which
 * is read from the `use:` tag on each component. The page and the browser above
 * it therefore cannot disagree, and neither can be the surface that is wrong.
 *
 * The maps the CLI reads hold fewer icons than the directory does.
 * `CONTRIBUTING.md` owns that gap and names the icons; the browser marks them.
 */
const CATEGORY_MEANING: Record<(typeof iconCategories)[number], string> = {
  object: "Names a thing — a catalog, a job, a model. Belongs where an entity is being identified.",
  action: "Names a verb. Belongs where something happens on click.",
  indicator: "Names a state. Belongs where a status is being reported.",
  component: "Built into a control's own chrome, and used nowhere else.",
}

const tagged = iconCategories.map((category) => ({
  category: <Code>{category}</Code>,
  meaning: CATEGORY_MEANING[category],
  count: icons.filter((icon) => icon.category === category).length,
}))

/** The tag on a real icon, rebuilt from its record, so the shape is not a paraphrase. */
const EXAMPLE = icons.find((icon) => icon.name === "Catalog")
const exampleTag = EXAMPLE
  ? `/** use:${EXAMPLE.category} ${[EXAMPLE.label, EXAMPLE.area, EXAMPLE.synonyms?.join(", ")]
      .filter(Boolean)
      .join(" | ")} */`
  : null

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
        One set, tagged by concept, so the right icon can be found without knowing its name.
      </DocHeader>

      <IconBrowser />

      <DocSection title="Four categories">
        <Para>
          Category is a claim about the icon&rsquo;s job rather than its drawing. The same shape can
          be an object in a tree and an action in a toolbar, so the tag records which one it is.
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
        <SourceNote>
          <Code>packages/dbui/docs/icon-index.md</Code> decides which icon to pick, and it is the
          only file that does. The metadata behind it lives on each icon component as a{" "}
          <Code>use:</Code> tag, mirrored into <Code>classifications.ts</Code> and{" "}
          <Code>descriptions.ts</Code>. When a tag and the index disagree, the tag wins.
        </SourceNote>
        <Para>
          The tag is one line above the component, and it holds four things — the category, the
          concept the icon names, the product area it belongs to and the words someone might search
          instead of the concept. The table above renders all four, which is why searching it finds
          an icon by a word that appears nowhere in its name.
        </Para>
        {exampleTag ? <Command>{exampleTag}</Command> : null}
        <Para>
          The last field is the one that makes the set searchable. An icon with no synonyms is
          findable only by someone who already knows what it is called.
        </Para>
        <Para>
          A row marked as not in the maps has a tag but no entry in{" "}
          <Code>classifications.ts</Code> or <Code>descriptions.ts</Code>. It is browsable here,
          because this page reads the tag, and invisible to <Code>dbui icon</Code>, because the CLI
          reads the maps. <Code>CONTRIBUTING.md</Code> lists every surface an icon has to land on
          and names the ones that are behind.
        </Para>
      </DocSection>

      <DocSection title="The same set, as data">
        <Para>
          The table is generated from the tags at build time, so an agent reads the same set without
          a browser. Guessing a name is how the wrong icon gets shipped, so search the concept, read
          what comes back, then import the exact name.
        </Para>
        <Command>yarn dbui search &lt;concept&gt;</Command>
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
          icon scale on the{" "}
          <Link href="/docs/tokens" className="text-text-accent">
            Tokens page
          </Link>
          .
        </Para>
        <Para>
          That scale ships as CSS custom properties, but nothing consumes them. Components size
          icons with Tailwind utilities and the numeric default is not wired to the token, so
          changing the sizing scalar does not move an icon. Treat the scale as the set of sizes to
          choose from rather than as a live dial.
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
