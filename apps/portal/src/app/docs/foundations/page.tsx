import Link from "next/link"

import { iconClassifications } from "@/components/icons/classifications"
import { shells } from "@/components/shell-data"
import { galleryGroups } from "@/stories/components/gallery-data"
import { DocHeader, DocSection, Para, Code } from "@/components/docs/Prose"
import { Figure, FigureRow, FigureAside, FigureLabel, Terms, type Term } from "@/components/docs/Diagram"

export const metadata = { title: "Foundations — DBUI" }

/**
 * The page is a map, not an explanation. Someone arrives not knowing how tokens,
 * icons, components, compositions and shells relate, and leaves knowing the
 * order and which page owns each part.
 *
 * Nothing here restates a rule another page owns. The sub-categories are names
 * and the sentences are architectural — what a layer is and what depends on it —
 * because that is the only thing this page owns. Category meanings live in
 * `component-index.md` and `icon-index.md`, one click away.
 *
 * No layer states how many of a thing it holds. Counts drift, and the two the
 * portal already had disagreed with the CLI.
 */

/**
 * The token families, in the order the Tokens page renders them.
 *
 * Not linked to their anchors on that page, even though the anchors exist. The
 * whole diagram row is already a link and an anchor cannot contain another one,
 * and the Tokens page opens with jump controls that do this job properly. One
 * router per level: this page routes to the page, that page routes to a family.
 */
const TOKEN_FAMILIES: Term[] = [
  "color",
  "type",
  "space",
  "radius",
  "size",
  "border",
  "elevation",
  "motion",
  "scalars",
].map((label) => ({ label }))

/**
 * Declared order, filtered to what `classifications.ts` actually uses. Sorting
 * the raw values alphabetically would put `action` before `object`, which
 * reverses the order the icon index and its page both read in.
 */
const ICON_CATEGORIES: Term[] = ["object", "action", "indicator", "component"]
  .filter((category) => Object.values(iconClassifications).includes(category))
  .map((label) => ({ label }))

/** From the generated gallery, which takes its grouping from the CLI. */
const COMPONENT_CATEGORIES: Term[] = galleryGroups.map((group) => ({ label: group.key }))

/**
 * The composition modules `dbui-shells` exports, plus the chrome that is present
 * on every page. Typed rather than derived: there is no generated inventory of
 * this package, and inventing one for a diagram is the wrong trade.
 */
const COMPOSITIONS: Term[] = [
  "data tree explorer",
  "file tree explorer",
  "preview popup",
  "platform chrome",
].map((label) => ({ label }))

/** Shell names without the parenthetical, which is an example rather than a name. */
const SHELL_NAMES: Term[] = shells.map((shell) => ({
  label: shell.name.replace(/\s*\(.+\)$/, "").toLowerCase(),
}))

/**
 * The section for a layer names the file that owns it rather than repeating the
 * sub-categories the diagram already showed. What each category means belongs to
 * `component-index.md` and `icon-index.md`, so the useful thing this page can add
 * is which file to open — that is architecture, and nothing else states it.
 */
const LAYERS = [
  {
    name: "Tokens",
    href: "/docs/tokens",
    parts: TOKEN_FAMILIES,
    is: (
      <>
        Every value the system can express. <Code>theme.config.mjs</Code> generates the CSS
        variables, the Tailwind utilities and the linter&rsquo;s allowlist together, so a value
        cannot reach a component without existing there first.
      </>
    ),
    destinations: [{ label: "Tokens", href: "/docs/tokens" }],
  },
  {
    name: "Icons",
    href: "/docs/icons",
    parts: ICON_CATEGORIES,
    is: (
      <>
        One set, classified by what an icon names rather than by what it draws.{" "}
        <Code>classifications.ts</Code> and <Code>descriptions.ts</Code> carry the tags, which is
        what lets an icon be found from a concept instead of from a file name.
      </>
    ),
    destinations: [{ label: "Icons", href: "/docs/icons" }],
  },
  {
    name: "Components",
    href: "/docs/components",
    parts: COMPONENT_CATEGORIES,
    is: (
      <>
        The units that carry behavior. Each one holds its rules in its own JSDoc and{" "}
        <Code>component-index.md</Code> decides which one to reach for. No third file states either,
        and when the two disagree the JSDoc wins.
      </>
    ),
    destinations: [
      { label: "Component rules", href: "/docs/components" },
      { label: "Live gallery", href: "/components" },
    ],
  },
  {
    name: "Compositions",
    href: "/components",
    parts: COMPOSITIONS,
    is: (
      <>
        Arrangements that recur often enough to be worth getting wrong only once. They sit inside a
        shell&rsquo;s content area, ship from <Code>dbui-shells</Code> and are imported rather than
        rebuilt.
      </>
    ),
    destinations: [
      { label: "Live gallery", href: "/components" },
      { label: "Behavior patterns", href: "/docs/patterns" },
    ],
  },
  {
    name: "Shells",
    href: "/templates",
    parts: SHELL_NAMES,
    is: (
      <>
        Page archetypes. <Code>composition.md</Code> fixes the regions, how they scale and which
        container owns the scroll, which is what stops a page becoming a stack of cards.
      </>
    ),
    destinations: [{ label: "Templates", href: "/templates" }],
  },
]

/**
 * The CLI, the MCP server, the skills and the linters read every layer and sit
 * in none of them, so the diagram draws them as a lane beside the stack rather
 * than as a sixth row. Putting them in the stack would claim something depends
 * on them, and nothing in the system does — they are how the system is read.
 */
const AGENT_SURFACES = [
  { label: "CLI", href: "/docs/cli", what: "Every component, icon, shell, token and doc, printed for a terminal or as a typed JSON envelope." },
  { label: "MCP servers", href: "/docs/mcp", what: "The same API over JSON-RPC, so an agent queries the system instead of reading a rendered page." },
  { label: "Skills", href: "/docs/overview", what: "Procedures an agent loads on trigger: pick a component, pick an icon, build a screen, validate the result." },
  { label: "Design linters", href: "/docs/checks", what: "The React and Figma checks that catch a raw element, a hardcoded color or an off-scale value." },
]

const CROSS_CUTTING = [
  { label: "Design principles", href: "/docs/principles", what: "The calls the system makes before any component exists, and what each one costs." },
  { label: "Voice and tone", href: "/docs/voice", what: "How every string reads. Applies to a nav label and an error alike." },
  { label: "Layout", href: "/docs/layout", what: "How a screen is framed before anything goes in it — regions, scroll and edges." },
  { label: "Patterns", href: "/docs/patterns", what: "Recurring behavior — what happens, in what order and what has to survive it." },
  { label: "Accessibility", href: "/docs/accessibility", what: "The checks that apply to every screen, and what the system does not do yet." },
]

/** A row of onward links. Sized as a control rather than as prose, so the eye
 *  finds it at the end of a section without reading the section again. */
function Destinations({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="type-label text-text-accent no-underline hover:underline">
          {item.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      ))}
    </div>
  )
}

/**
 * `name — what it is`, one per row. Used for the two groups that are lists of
 * destinations rather than layers, where the name alone would not say why
 * someone should click.
 */
function Directory({ items }: { items: Array<{ label: string; href: string; what: string }> }) {
  return (
    <div className="overflow-hidden rounded-md border border-border-base">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col gap-1 border-b border-border-subtle px-4 py-3 no-underline transition-colors last:border-b-0 hover:bg-surface-hover sm:flex-row sm:gap-5"
        >
          <span className="type-label-bold w-40 shrink-0 text-text-strong">{item.label}</span>
          <span className="type-body text-text-subtle">{item.what}</span>
        </Link>
      ))}
    </div>
  )
}

/**
 * The stack. Five rows in dependency order with the agent surfaces alongside.
 *
 * The whole row is one link rather than a title link with linked terms inside
 * it: anchors cannot nest, and a row of nine small links is the busy version of
 * a diagram. The terms are repeated as links in the section for each layer
 * below, where there is room for them to be read rather than scanned past.
 */
function LayerStack() {
  return (
    <Figure caption="Each layer is built only from the ones above it. A change to a token reaches every layer under it. A change to a shell reaches none.">
      <div className="flex flex-col md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col">
          {LAYERS.map((layer, i) => (
            <FigureRow key={layer.name}>
              <Link
                href={layer.href}
                className="flex gap-4 px-4 py-3 no-underline transition-colors hover:bg-surface-hover"
              >
                <span className="type-hint w-3 shrink-0 pt-0.5 text-text-subtle tabular-nums">
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="type-label-bold text-text-strong">{layer.name}</span>
                  <Terms items={layer.parts} />
                </span>
              </Link>
            </FigureRow>
          ))}
        </div>
        {/* Centered rather than top-aligned. The fill already spans every row,
            which is the claim the lane is making; content pinned to the top
            leaves the bottom half looking like a row that failed to render. */}
        <FigureAside className="md:w-48 md:justify-center">
          <div className="flex flex-col gap-1">
            <FigureLabel>Agent surfaces</FigureLabel>
            <span className="type-hint text-text-subtle">Read every layer. Sit in none.</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {AGENT_SURFACES.map((surface) => (
              <Link
                key={surface.href}
                href={surface.href}
                className="type-label text-text-base no-underline hover:text-text-strong hover:underline"
              >
                {surface.label}
              </Link>
            ))}
          </div>
        </FigureAside>
      </div>
    </Figure>
  )
}

export default function FoundationsPage() {
  return (
    <>
      <DocHeader title="Foundations">
        How the system is layered, what sits in each layer and which page owns each part.
      </DocHeader>

      <div className="mt-8">
        <LayerStack />
      </div>

      {LAYERS.map((layer) => (
        <DocSection key={layer.name} title={layer.name}>
          <Para>{layer.is}</Para>
          <Destinations items={layer.destinations} />
        </DocSection>
      ))}

      <DocSection title="Rules that cut across every layer">
        <Para>
          These are not layers. Each one applies at every level of the stack at once, which is why
          none of them sits in the diagram.
        </Para>
        <Directory items={CROSS_CUTTING} />
      </DocSection>

      <DocSection title="The agent surfaces">
        <Para>
          One module reads components, icons, shells, tokens and docs from source at call time. The
          CLI formats that for a terminal and the MCP server formats it for an agent, so the two
          cannot disagree about what the system contains.
        </Para>
        <Directory items={AGENT_SURFACES} />
      </DocSection>

      <DocSection title="One owner per rule">
        <Para>
          A rule stated in two files is a rule that will disagree with itself. Every kind of rule
          here has exactly one owner, and these pages render that owner rather than restate it. When
          a page and a source disagree, the source wins — a component&rsquo;s own JSDoc outranks any
          index, and <Code>theme.config.mjs</Code> outranks any prose about a value.{" "}
          <Code>CONTRIBUTING.md</Code> lists which files must move together for each kind of change.
        </Para>
      </DocSection>
    </>
  )
}
