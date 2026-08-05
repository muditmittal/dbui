"use client"

import { Button } from "dbui/components/ui/button"

import {
  ColorSwatches, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, MotionScale, ScalarList,
} from "@/stories/tokens/TokenKit"
import {
  colorGroups, space, radius, sizeElement, sizeIcon,
  borderWidth, elevation, duration, easing, scalars, tokenCounts,
} from "@/stories/tokens/token-data"
import { RefTable, Code } from "@/components/docs/Prose"
import { Figure, FigureRow, FigureLabel, FigureSlot } from "@/components/docs/Diagram"

/**
 * The page is a reference with one thing to teach: how a name is built. That was
 * three paragraphs and a card grid, and it is now one figure — the parts of a
 * name in columns, with real names decomposed underneath so the pattern is seen
 * rather than described.
 *
 * Everything else is a preview. Each family's lede keeps only the reasoning that
 * changes what someone does — why `label` takes the leading it does, why there is
 * one easing curve — and drops the sentences that restated what the preview
 * already shows.
 *
 * No lede states a value that lives in `theme.config.mjs`. The exceptions are the
 * two type anchors, which exist to stop someone normalising them, and they are
 * written down for the same reason in the config itself.
 *
 * This stays a client module because `TokenKit` holds state — a show-more and a
 * motion replay — and declares no boundary of its own. That rules out the syntax
 * highlighted code blocks, which are server components, so commands render in
 * the plain reference table instead.
 */

const TYPE = [
  ["type-hint", "12 / 16", "400", "Captions, helper text, timestamps"],
  ["type-eyebrow", "12 / 16", "600", "Overlines. Carries its own caps"],
  ["type-label", "13 / 16", "400", "Single-line UI — buttons, menu items, cells"],
  ["type-label-bold", "13 / 16", "600", "Column headers, form labels"],
  ["type-body", "13 / 20", "400", "Wrapping 13px — descriptions"],
  ["type-body-bold", "13 / 20", "600", "Emphasis in a description"],
  ["type-code", "13 / 20", "400", "Inline code, identifiers, paths"],
  ["type-block", "14 / 22", "400", "Code blocks"],
  ["type-paragraph", "15 / 22", "400", "Read as language — chat, docs"],
  ["type-paragraph-bold", "15 / 22", "600", "Bold inside prose"],
  ["type-title-4", "16 / 24", "600", "Small heading"],
  ["type-title-3", "20 / 28", "600", "Subsection heading"],
  ["type-title-2", "24 / 32", "600", "Section heading"],
  ["type-title-1", "32 / 40", "600", "Page heading"],
]

/**
 * The jump controls and the section ids are one list, so a control cannot point
 * at a section that no longer exists. Border and elevation used to share a
 * section; they are split here because a jump target has to be one thing.
 */
const FAMILIES = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "space", label: "Space" },
  { id: "radius", label: "Radius" },
  { id: "size", label: "Size" },
  { id: "border", label: "Border" },
  { id: "elevation", label: "Elevation" },
  { id: "motion", label: "Motion" },
  { id: "scalars", label: "Scalars" },
]

/** Every name that ships, so the diagram cannot take apart a token that does not. */
const SHIPPED = new Set([
  ...colorGroups.flatMap((group) => group.tokens.map((token) => token.name)),
  ...space.map((token) => token.name),
  ...radius.map((token) => token.name),
])

/**
 * Real names, split at the point where each part starts. Joined back together
 * they have to match something in `SHIPPED`, so a row disappears rather than
 * lies if a token is renamed.
 *
 * The three chosen cover the three shapes a name comes in: a family that is two
 * words, a name with no state, and a scale step where the middle part is a size
 * rather than a job.
 */
const ANATOMY = [
  ["status-surface", "warning"],
  ["text", "subtle"],
  ["space", "md"],
].filter((parts) => SHIPPED.has(parts.join("-")))

const TERMINAL_TOOLS = [
  {
    run: "yarn dbui token",
    gives: "Every group in tokens.css and how many tokens it holds.",
  },
  {
    run: "yarn dbui token <group>",
    gives: "One group printed in full, light value beside dark value.",
  },
  {
    run: "yarn dbui token --json",
    gives: "The same as a typed envelope. Every dbui command takes the flag.",
  },
  {
    run: "yarn design:tokens",
    gives: "Regenerates tokens.css and the linter allowlist from theme.config.mjs. The only way a value changes.",
  },
  {
    run: "yarn design:verify-sync",
    gives: "Asserts the config, the CSS and Figma agree. Exits non-zero on drift, and names what drifted.",
  },
  {
    run: "yarn design:lint:react <path>",
    gives: "Flags a hardcoded color, a font size off the ramp and a space or radius off the scale.",
  },
]

/**
 * Mixed rather than a mono column: `dbui_get` is a literal an agent calls and
 * `Skill` is a word. Setting the whole column in mono made the word look like
 * part of the identifier.
 */
const AGENT_TOOLS = [
  {
    call: (
      <>
        <Code>dbui_list</Code> with kind <Code>token</Code>
      </>
    ),
    gives: "The group names, so an agent can ask for the right one without guessing.",
  },
  {
    call: (
      <>
        <Code>dbui_get</Code> with kind <Code>token</Code>
      </>
    ),
    gives: "One group with both values per token. The same data the CLI prints, over JSON-RPC.",
  },
  {
    call: (
      <>
        <Code>dbui_check</Code> with a path
      </>
    ),
    gives: "The design linter over a file or a directory, returned as findings rather than as text.",
  },
  {
    call: (
      <>
        Skill <Code>dbui-validate</Code>
      </>
    ),
    gives: "The procedure an agent runs on finished code. Token violations are the first thing it looks for.",
  },
  {
    call: (
      <>
        Skill <Code>dbui-build-screen</Code>
      </>
    ),
    gives: "The screen-building workflow. Its checklist requires a semantic token wherever one exists.",
  },
]

/**
 * `scroll-mt` clears the sticky header, which is the whole reason a jump control
 * works here rather than dropping a heading under the chrome.
 */
function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string
  title: string
  lede: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-16 flex scroll-mt-20 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="type-title-3 text-text-strong">{title}</h2>
        <p className="type-body text-text-subtle">{lede}</p>
      </div>
      {children}
    </section>
  )
}

/**
 * The name, taken apart.
 *
 * Columns rather than cards: cards put the three parts side by side without
 * saying they belong to one string, and the order — which is the whole point —
 * became something the reader had to infer. Here the parts keep their trailing
 * hyphen, so reading a row left to right reassembles the name it came from and
 * an empty last cell shows that state is optional without a placeholder.
 */
const SLOT_EDGE = "border-b border-border-subtle sm:border-b-0 sm:border-r sm:last:border-r-0"

/**
 * Sized to the longest note rather than split into thirds. Equal thirds pushed
 * the parts of a name so far apart that a row stopped reading as one string, and
 * the columns only have to be equal across rows, not equal to each other.
 */
const NAME_COLUMNS = "sm:grid-cols-[12rem_10rem_1fr]"

function NameAnatomy() {
  return (
    <Figure caption="You never pick a value. You describe the job, and the name follows.">
      <FigureRow>
        <div className={`grid grid-cols-1 ${NAME_COLUMNS}`}>
          <FigureSlot
            className={SLOT_EDGE}
            label="Family"
            value="action-"
            note="What kind of thing is this?"
          />
          <FigureSlot
            className={SLOT_EDGE}
            label="Role"
            value="primary-"
            note="What job does it do?"
          />
          <FigureSlot
            className={SLOT_EDGE}
            label="State (optional)"
            value="hover"
            note="What is happening to it?"
          />
        </div>
      </FigureRow>
      {ANATOMY.map((parts) => (
        <FigureRow key={parts.join("-")}>
          <div className={`grid grid-cols-[12rem_10rem_1fr] ${NAME_COLUMNS}`}>
            {[0, 1, 2].map((column) => (
              <div key={column} className={`type-code px-4 py-2.5 text-text-base ${SLOT_EDGE}`}>
                {parts[column] ? `${parts[column]}${column < parts.length - 1 ? "-" : ""}` : ""}
              </div>
            ))}
          </div>
        </FigureRow>
      ))}
    </Figure>
  )
}

export function TokensDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Tokens</h1>
      <p className="type-paragraph mt-4 text-text-subtle">
        Every visual decision resolves to a token.{" "}
        <code className="type-code">theme.config.mjs</code> generates the CSS variables, the Tailwind
        utilities and the linter&rsquo;s allowlist together, so a value cannot exist in code without
        existing in the system.
      </p>

      <nav aria-label="Token families" className="mt-6 flex flex-wrap gap-2">
        {FAMILIES.map((family) => (
          <Button
            key={family.id}
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<a href={`#${family.id}`} />}
          >
            {family.label}
          </Button>
        ))}
      </nav>

      <Section
        id="anatomy"
        title="How a name is built"
        lede="A name answers three questions in order, so reading it left to right tells you what a token is for without opening its value."
      >
        <NameAnatomy />
        <p className="type-body text-text-subtle">
          The same name reaches code two ways — as a Tailwind utility{" "}
          <code className="type-code">bg-surface-base</code> and as a CSS variable{" "}
          <code className="type-code">var(--db-surface-base)</code>. The prefix marks a token as
          this system&rsquo;s rather than a consumer&rsquo;s.
        </p>
      </Section>

      <Section
        id="color"
        title="Color"
        lede={`${tokenCounts.colorGroups} tokens, each with a light and a dark value, because one that works in a single mode is a defect. The contrast chip makes a surface-and-foreground pairing checkable rather than a convention to remember.`}
      >
        {colorGroups.map((group) => (
          <div key={group.key} className="flex flex-col gap-2">
            <div className="type-label-bold text-text-strong">{group.label}</div>
            <div className="type-hint text-text-subtle">{group.blurb}</div>
            <ColorSwatches group={group} limit={5} surface="#FFFFFF" />
          </div>
        ))}
      </Section>

      <Section
        id="type"
        title="Type"
        lede="Named by what the text is, not by how big it is. The split that matters is label against body: both are 13px, but a label is single-line so its line box matches the 16px icon box, and body wraps so it takes more leading."
      >
        <div className="overflow-hidden rounded-md border border-border-base">
          {TYPE.map(([name, size, weight, use], i) => (
            <div
              key={name}
              className={`flex items-start gap-4 px-4 py-3 ${i === TYPE.length - 1 ? "" : "border-b border-border-subtle"}`}
            >
              <div className="w-52 shrink-0">
                <code className="type-code text-text-base">{name}</code>
                <div className="type-hint text-text-subtle">
                  {size} · {weight}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className={`${name} text-text-base`}>The quick brown fox</span>
              </div>
              <div className="type-hint w-48 shrink-0 text-text-subtle">{use}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="space"
        title="Space"
        lede="One grid step and deliberately few multiples of it. Fewer steps is what makes spacing consistent, because a scale with every increment lets any value look defensible. Values ship in rem so they follow a reader's browser font-size preference."
      >
        <SpaceScale tokens={space} />
      </Section>

      <Section
        id="radius"
        title="Radius"
        lede="Form controls take sm, containers and popovers md, cards xl, pills full."
      >
        <RadiusScale tokens={radius} />
      </Section>

      <Section
        id="size"
        title="Size"
        lede="Control heights and icon sizes. Icon md matches the label line box on purpose, so text and an icon share a rhythm in a row. Nothing outside tokens.css reads this family yet, so a control's height still comes from its own class rather than from here."
      >
        <SizeScale tokens={sizeElement} kind="element" />
        <SizeScale tokens={sizeIcon} kind="icon" />
      </Section>

      <Section
        id="border"
        title="Border"
        lede="Stays in px while everything spatial ships in rem, because a hairline is a rendering fact rather than a proportion. Thick is the focus treatment on controls that are not filled."
      >
        <BorderScale tokens={borderWidth} />
      </Section>

      <Section
        id="elevation"
        title="Elevation"
        lede="Counts down: 1 is the highest surface, 3 the softest, 0 flat. When two surfaces overlap, the one on top takes the lower number."
      >
        <ElevationScale tokens={elevation} />
      </Section>

      <Section
        id="motion"
        title="Motion"
        lede="Two bands and one easing curve. A second curve would give nobody a way to choose between them, and there is no slow band because anything approaching a second reads as the product being slow rather than as polish."
      >
        {/* Read from the generated data rather than retyped. The curve was
            written out here as a literal, which is the one thing a token page
            must not do — a value restated is a value that goes stale. */}
        <MotionScale tokens={duration} easing={easing[0].value} />
      </Section>

      <Section
        id="scalars"
        title="Scalars"
        lede="Dials that re-tune whole families from one number. The type scalar scales the whole ramp proportionally, which is the mechanism for a roomier reading mode — a second parallel ramp would inflate controls along with the prose."
      >
        <ScalarList tokens={scalars} />
      </Section>

      <Section
        id="tooling"
        title="Tooling"
        lede="Nothing here has to be read off this page. The same values print from a terminal and answer over MCP, and the linter checks a file against them."
      >
        <div className="flex flex-col gap-3">
          <h3 className="type-title-4 text-text-strong">From a terminal</h3>
          <RefTable
            columns={[
              { key: "run", header: "Run", width: "w-[260px]", mono: true },
              { key: "gives", header: "What it gives you" },
            ]}
            rows={TERMINAL_TOOLS}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="type-title-4 text-text-strong">From an agent</h3>
          <p className="type-body text-text-subtle">
            The MCP server is wired in <Code>.cursor/mcp.json</Code> and delegates to the same module
            the CLI uses, so the two cannot disagree about a value. The skills are procedures an
            agent loads on trigger rather than documents it reads.
          </p>
          <RefTable
            columns={[
              { key: "call", header: "Call", width: "w-[260px]" },
              { key: "gives", header: "What it gives you" },
            ]}
            rows={AGENT_TOOLS}
          />
        </div>
      </Section>
    </>
  )
}
