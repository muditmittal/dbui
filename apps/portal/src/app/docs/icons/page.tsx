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
import { Figure, FigureRow, FigureLabel } from "@/components/docs/Diagram"
import { Guidance } from "@/components/docs/Guidance"
import { icons, iconCategories } from "@/components/icon-data"

import { IconBrowser } from "./IconBrowser"

export const metadata = { title: "Icons — DBUI" }

/**
 * The browser is the page. Everything under it is here because someone who has
 * found their icon still gets it wrong without it: the category they crossed,
 * the entity map they resolved by eye, the name they guessed.
 *
 * Everything countable is counted from the generated data, which is read from
 * the `use:` tag on each component, so the page and the browser above it cannot
 * disagree and neither can be the surface that is wrong.
 *
 * The prose was four sections of paragraphs explaining a tag that is one line
 * long. It is a figure now, taken apart from a real record — the same visual
 * grammar the Tokens page uses for a token name, because both are a string with
 * fields and the reader's question is the same one.
 */
const CATEGORY_MARKS: Record<(typeof iconCategories)[number], string> = {
  object: "A thing — a catalog, a job, a model",
  action: "A verb",
  indicator: "A state",
  component: "A control's own chrome",
}

const CATEGORY_BELONGS: Record<(typeof iconCategories)[number], string> = {
  object: "An entity is being identified",
  action: "Something happens on click",
  indicator: "A status is being reported",
  component: "Nowhere else",
}

const tagged = iconCategories.map((category) => ({
  category: <Code>{category}</Code>,
  marks: CATEGORY_MARKS[category],
  belongs: CATEGORY_BELONGS[category],
  count: icons.filter((icon) => icon.category === category).length,
}))

/** A real record, so the figure cannot take apart a tag no icon carries. */
const EXAMPLE = icons.find((icon) => icon.name === "Catalog" && icon.area && icon.synonyms?.length)

const GRID = "grid grid-cols-[8.5rem_9rem_10rem_1fr]"
const CELL = "border-r border-border-subtle px-3 py-2.5 last:border-r-0"

/**
 * The tag, taken apart.
 *
 * Four fields, the question each answers directly beneath it, and the raw line
 * as it appears above the component in the footer row — rebuilt from the record
 * rather than quoted, so it cannot drift from the tag it describes.
 *
 * The last field is the one that makes the set searchable, which is why it gets
 * the widest column: an icon with no synonyms is findable only by someone who
 * already knows what it is called.
 */
function TagAnatomy() {
  if (!EXAMPLE) return null
  const synonyms = EXAMPLE.synonyms?.join(", ") ?? ""
  const raw = `/** use:${EXAMPLE.category} ${EXAMPLE.label} | ${EXAMPLE.area} | ${synonyms} */`
  return (
    <Figure caption="One line above each icon component. The browser above reads all four fields, which is why a search finds an icon by a word that appears nowhere in its name.">
      <FigureRow className="bg-surface-subtle">
        <div className={GRID}>
          <div className={`type-code ${CELL} text-text-strong`}>use:{EXAMPLE.category}</div>
          <div className={`type-code ${CELL} text-text-strong`}>{EXAMPLE.label} |</div>
          <div className={`type-code ${CELL} text-text-strong`}>{EXAMPLE.area} |</div>
          <div className={`type-code ${CELL} text-text-strong`}>{synonyms}</div>
        </div>
      </FigureRow>
      <FigureRow>
        <div className={GRID}>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Category</FigureLabel>
            <span className="type-hint text-text-subtle">Which of the four?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Concept</FigureLabel>
            <span className="type-hint text-text-subtle">What does it name?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Area</FigureLabel>
            <span className="type-hint text-text-subtle">Where does it belong?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Synonyms</FigureLabel>
            <span className="type-hint text-text-subtle">What would you search?</span>
          </div>
        </div>
      </FigureRow>
      <FigureRow className="bg-surface-subtle">
        <div className={`${CELL} flex flex-col gap-1 border-r-0`}>
          <FigureLabel>In source</FigureLabel>
          <code className="type-code text-text-base">{raw}</code>
        </div>
      </FigureRow>
    </Figure>
  )
}

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
          Category is a claim about the icon&rsquo;s job, not its drawing, and crossing one is the
          most common icon mistake. An action icon on a tree node reads as a button.
        </Para>
        <RefTable
          columns={[
            { key: "category", header: "Category", width: "w-[116px]", mono: true },
            { key: "marks", header: "Marks" },
            { key: "belongs", header: "Belongs where" },
            { key: "count", header: "Tagged", width: "w-[76px]" },
          ]}
          rows={tagged}
        />
      </DocSection>

      <DocSection title="The tag is the metadata">
        <SourceNote>
          <Code>packages/dbui/docs/icon-index.md</Code> decides which icon to pick. The{" "}
          <Code>use:</Code> tag on the component is where the metadata behind it lives, mirrored into{" "}
          <Code>classifications.ts</Code> and <Code>descriptions.ts</Code>. When they disagree, the
          tag wins.
        </SourceNote>
        <TagAnatomy />
        <Para>
          A row marked as not in the maps has a tag and no mirror, so it is browsable here and
          invisible to <Code>dbui icon</Code>. <Code>CONTRIBUTING.md</Code> names them.
        </Para>
        <Command>yarn dbui search &lt;concept&gt;</Command>
        <Para>
          Search the concept, read what comes back, then import the exact name. Guessing a name is
          how the wrong icon ships.
        </Para>
      </DocSection>

      <DocSection title="Typed nodes resolve through a map">
        <Para>
          A tree, a catalog browser and a search result show the same table, so the icon has to be a
          function of the entity type rather than a choice made at each call site.
        </Para>
        <CodeBlock caption="Read the name from the map, then import that component by path">
          {`import { dataEntityIcons } from "dbui/components/icons/entity-icons"
import { TableStream } from "dbui/components/icons/TableStream"

dataEntityIcons.streamingTable // "TableStream"`}
        </CodeBlock>
        <Para>
          There is no barrel export, so a name from the map cannot be indexed into a namespace at
          runtime. Import what a surface needs and build the lookup from those.
        </Para>

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
          Where two types share an icon, the map is saying the distinction does not earn a glyph. Do
          not add one locally — the same object would then read differently in two places.
        </Para>
      </DocSection>

      <DocSection title="Sizing">
        <Para>
          Every icon takes a numeric <Code>size</Code> prop. The default is a literal in each
          component and matches the <Code>md</Code> step of the icon scale, which{" "}
          <Link href="/docs/tokens#size" className="text-text-accent">
            Tokens
          </Link>{" "}
          reports as unconsumed — so treat the scale as the sizes to choose from rather than a live
          dial.
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
