"use client"

import { Button } from "dbui/components/ui/button"

import {
  ColorSwatches, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, MotionScale, ScalarList, TypeScale, WiringTable, TailwindTable, Wired,
} from "@/stories/tokens/TokenKit"
import {
  colorGroups, type as typeSteps, space, radius, sizeElement, sizeIcon,
  borderWidth, elevation, duration, easing, scalars,
} from "@/stories/tokens/token-data"
import {
  families, scalars as scalarConsumption, tailwind, themeOverrides, hardcoded, tailwindVersion,
} from "@/stories/tokens/token-consumption"
import { RefTable, Code } from "@/components/docs/Prose"
import { Figure, FigureRow, FigureSlot } from "@/components/docs/Diagram"

/**
 * A reference page, so every sentence has to remove an ambiguity a reader would
 * otherwise have. Two things are load-bearing and everything else is a preview:
 * how a name is built, and which families anything actually reads.
 *
 * The second one is new and it is why the page changed shape. It used to open by
 * claiming a value could not exist in code without existing in the system, which
 * is false — most spacing in this repo comes from Tailwind's own scale, and four
 * of the dimensional families are read by nothing at all. A reference page that
 * flatters the system is worse than no page, because someone reaches for
 * `--db-space-md` expecting it to match the `p-4` beside it.
 *
 * No value and no count is typed here. Values come from `token-data.ts`, which is
 * parsed out of the shipped CSS, and counts come from `token-consumption.ts`,
 * which is measured against the repo on every run. What this file owns is the
 * editorial layer that neither generator can produce: what a family is for, what
 * it is not for, and the mistakes people make with it.
 *
 * This stays a client module because `TokenKit` holds state — a show-more and a
 * motion replay — and declares no boundary of its own. That rules out the syntax
 * highlighted code blocks, which are server components, so commands render in
 * the plain reference table instead.
 */

/** The jump controls and the section ids are one list, so a control cannot point
 * at a section that no longer exists. */
const FAMILIES = [
  { id: "wiring", label: "Wiring" },
  { id: "tailwind", label: "Tailwind" },
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "space", label: "Space" },
  { id: "radius", label: "Radius" },
  { id: "size", label: "Size" },
  { id: "border", label: "Border" },
  { id: "elevation", label: "Elevation" },
  { id: "motion", label: "Motion" },
  { id: "scalars", label: "Scalars" },
  { id: "tools", label: "Tools" },
]

const family = (key: string) => families.find((f) => f.key === key)
const isLive = (key: string) => family(key)?.live ?? false

/**
 * How each family reaches code. The mechanism is editorial, the number beside it
 * is measured, and a family with neither renders nothing so the gap is the row.
 */
const REACHES: Record<string, React.ReactNode> = {
  color: (
    <>
      <Code>--color-*</Code> in the generated layer, so <Code>bg-</Code>, <Code>text-</Code> and{" "}
      <Code>border-</Code> resolve to a token. {family("color")?.bridge?.uses} uses.
    </>
  ),
  type: (
    <>
      <Code>type-*</Code> utilities in <Code>type.css</Code>, each one a whole style.{" "}
      {family("type")?.bridge?.uses} uses.
    </>
  ),
  radius: (
    <>
      <Code>--radius-*</Code>, so <Code>rounded-*</Code> resolves to a token —{" "}
      {family("radius")?.bridge?.uses} uses. Mapped twice, and only one of the two derives from
      here.
    </>
  ),
  scalars: (
    <>
      Multiplied inside the generated CSS, so none of them is ever written by hand.{" "}
      {scalarConsumption.filter((s) => s.live).length} of {scalarConsumption.length} reach something
      that is read.
    </>
  ),
}

/** What each Tailwind namespace governs, and where it bites. */
const GOVERNS: Record<string, React.ReactNode> = {
  "--spacing": (
    <>
      Padding, margin, gap, inset and every numeric <Code>w-</Code>, <Code>h-</Code> and{" "}
      <Code>size-</Code>. The spacing system in practice, and now the grid unit and the density dial
      behind it.
    </>
  ),
  "--radius-*": (
    <>
      <Code>rounded-*</Code>. DBUI redefines sm through 2xl and points 3xl at the pill, so a step
      name does not mean what Tailwind means by it.
    </>
  ),
  "--shadow-*": <>Every shadow that ships. Elevation is not in this path.</>,
  "--shadow-focus": (
    <>
      The focus ring. Built from two color tokens in <Code>globals.css</Code>, so its widths are the
      one dimensional value authored outside <Code>theme.config.mjs</Code>.
    </>
  ),
  "ring and outline width": <>The rest of the focus treatment. Widths are baked into the utility.</>,
  "--animate-*": (
    <>
      Spinners and enter and exit transitions, from Tailwind and from <Code>tw-animate-css</Code>.
    </>
  ),
  "z-index scale": <>Stacking order. Tailwind bakes the steps, so no token can govern it.</>,
  "--default-transition-duration": <>What a bare <Code>transition-*</Code> takes. Not the motion tokens.</>,
  "duration-* and ease-*": <>Explicit overrides. Bare numbers, so neither Tailwind nor DBUI owns the value.</>,
  "--font-weight-*": <>Weight outside the ramp. Each one is a type class that was not used.</>,
  "--breakpoint-*": <>The <Code>sm:</Code> and <Code>md:</Code> variants. Barely load-bearing.</>,
  "--container-*": <>Named max widths on popovers and panels.</>,
  "--leading-*": <>Leading outside the ramp, which the ramp already carries.</>,
  "--blur-*": <>Backdrop blur on scrims.</>,
  "--text-*": <>Font size outside the ramp.</>,
  "--tracking-*": <>Tracking outside the ramp.</>,
}

/** Which step to pick. The one thing in the ramp table that is not a value. */
const TYPE_USE: Record<string, string> = {
  "type-hint": "Captions, helper text, timestamps",
  "type-eyebrow": "Overlines",
  "type-label": "Single-line UI — buttons, cells",
  "type-label-bold": "Column headers, form labels",
  "type-body": "Descriptions that wrap",
  "type-body-bold": "Emphasis in a description",
  "type-code": "Identifiers, paths",
  "type-block": "Code blocks",
  "type-paragraph": "Prose — chat, docs",
  "type-paragraph-bold": "Bold inside prose",
  "type-title-4": "Small heading",
  "type-title-3": "Subsection heading",
  "type-title-2": "Section heading",
  "type-title-1": "Page heading",
}

/**
 * What each dial multiplies, so its status reads as a consequence rather than a
 * verdict. The split that matters is between the two dials that stand behind a
 * Tailwind namespace and the two that only multiply tokens nothing reads.
 */
const DRIVES: Record<string, React.ReactNode> = {
  "spacing-unit": (
    <>
      The grid step. Every space token multiplies it, and so does <Code>--spacing</Code>, which is
      what puts it behind every numeric spacing utility.
    </>
  ),
  "density-scalar": (
    <>
      The master dial, and it is one now: folded into <Code>--spacing</Code>, so it tightens padding,
      gaps and control sizes together. It does not touch type.
    </>
  ),
  "spacing-scalar": (
    <>
      Space, alongside the density dial. Not <Code>--spacing</Code> — Tailwind reads one key for both{" "}
      <Code>p-4</Code> and <Code>gap-4</Code>, so a dial that means gaps only cannot ride it.
    </>
  ),
  "sizing-scalar": <>Control heights and icon boxes.</>,
  "type-scalar": <>The whole type ramp, proportionally.</>,
}

const TERMINAL_TOOLS = [
  { run: "yarn dbui token", gives: "Every group in the shipped CSS and how many tokens it holds." },
  { run: "yarn dbui token <group>", gives: "One group in full, light value beside dark." },
  { run: "yarn dbui token --json", gives: "The same as a typed envelope. Every dbui command takes the flag." },
  {
    run: "yarn design:tokens",
    gives: "Regenerates the CSS, the ramp and the linter allowlist from theme.config.mjs. The only way a value changes.",
  },
  {
    run: "yarn design:verify-sync",
    gives: "Asserts the config, the CSS and Figma agree, and names what drifted.",
  },
  {
    run: "yarn design:lint:react <path>",
    gives: "Flags a hardcoded color, a primitive, a size off the ramp and a radius off the scale.",
  },
  {
    run: "node scripts/generate-token-data.mjs",
    gives: "Refreshes the values on this page from the shipped CSS.",
  },
  {
    run: "node scripts/generate-token-consumption.mjs",
    gives: "Re-measures the wiring table. Run it before trusting a status here.",
  },
]

const AGENT_TOOLS = [
  {
    call: <><Code>dbui_list</Code> with kind <Code>token</Code></>,
    gives: "The group names, so an agent asks for the right one without guessing.",
  },
  {
    call: <><Code>dbui_get</Code> with kind <Code>token</Code></>,
    gives: "One group with both values per token, over JSON-RPC.",
  },
  {
    call: <><Code>dbui_check</Code> with a path</>,
    gives: "The linter as findings rather than as text.",
  },
  {
    call: <>Skill <Code>dbui-validate</Code></>,
    gives: "The procedure for finished code. Token violations come first.",
  },
  {
    call: <>Skill <Code>dbui-build-screen</Code></>,
    gives: "Its checklist requires a semantic token wherever one exists.",
  },
]

/**
 * `scroll-mt` clears the sticky header, which is the whole reason a jump control
 * works here rather than dropping a heading under the chrome.
 *
 * Scope sits above the preview because it frames what you are about to look at.
 * Cautions sit below because they are what you read once you have decided to use
 * the family, and putting them first buries the preview.
 */
function Section({
  id,
  title,
  live,
  scope,
  cautions,
  children,
}: {
  id: string
  title: string
  live?: boolean
  scope: React.ReactNode
  cautions?: React.ReactNode[]
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-16 flex scroll-mt-20 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <h2 className="type-title-3 text-text-strong">{title}</h2>
          {live === undefined ? null : <Wired live={live} />}
        </div>
        <p className="type-body text-text-subtle">{scope}</p>
      </div>
      {children}
      {cautions?.length ? (
        <ul className="flex list-none flex-col gap-1.5 border-t border-border-subtle pt-3">
          {cautions.map((caution, i) => (
            <li key={i} className="type-body text-text-subtle">
              {caution}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

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
          <FigureSlot className={SLOT_EDGE} label="Family" value="action-" note="What kind of thing is this?" />
          <FigureSlot className={SLOT_EDGE} label="Role" value="primary-" note="What job does it do?" />
          <FigureSlot className={SLOT_EDGE} label="State (optional)" value="hover" note="What is happening to it?" />
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

const unconsumed = families.filter((f) => !f.live)

/**
 * Radius is the one namespace mapped in more than one place, and the two do not
 * agree about where the value comes from. Counted rather than named so the claim
 * collapses on its own if someone reconciles them.
 */
const radiusMappings = themeOverrides.filter((o) => o.key.startsWith("--radius"))
const radiusFiles = [...new Set(radiusMappings.map((o) => o.file))]
const radiusFromToken = [...new Set(radiusMappings.filter((o) => o.fromToken).map((o) => o.file))]

/** Serial commas are out, so an inline run needs its own joiner. */
function Run({ items }: { items: React.ReactNode[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 ? (i === items.length - 1 ? " and " : ", ") : null}
          {item}
        </span>
      ))}
    </>
  )
}

export function TokensDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Tokens</h1>
      <p className="type-paragraph mt-4 text-text-subtle">
        <Code>theme.config.mjs</Code> is the one authored file, and it does not generate everything
        that affects rendering. Wiring is the account of what it reaches.
      </p>

      <nav aria-label="Token families" className="mt-6 flex flex-wrap gap-2">
        {FAMILIES.map((f) => (
          <Button key={f.id} size="sm" variant="outline" nativeButton={false} render={<a href={`#${f.id}`} />}>
            {f.label}
          </Button>
        ))}
      </nav>

      <Section
        id="wiring"
        title="Wiring"
        scope="Whether a line of code resolves to a family, measured against the repo rather than declared."
        cautions={[
          <>
            {unconsumed.length} families are read by nothing:{" "}
            {unconsumed.map((f) => f.label.toLowerCase()).join(", ")}. Changing one changes nothing
            on screen.
          </>,
          <>
            An unconsumed family is still safe through <Code>var(--db-*)</Code>. It just will not
            agree with the Tailwind utility beside it once a scalar leaves 1.
          </>,
        ]}
      >
        <WiringTable families={families} reaches={REACHES} />
      </Section>

      <Section
        id="tailwind"
        title="What comes from Tailwind"
        scope={
          <>
            Tailwind {tailwindVersion} is a source of truth alongside <Code>theme.config.mjs</Code>.
            These are the namespaces the shipped components depend on, so these are the concepts a
            rule can name.
          </>
        }
        cautions={[
          <>
            <Code>--spacing</Code> is rem-based, which is why the system rescales under a root
            font-size change. It now resolves through <Code>--db-spacing-unit</Code> and the density
            dial, so the same rescaling arrives from the config rather than from Tailwind&rsquo;s
            default.
          </>,
          <>
            <Code>--radius-*</Code> is mapped in {radiusFiles.length} files and only{" "}
            {radiusFromToken.length} derives from these tokens. The other restates px, so a corner
            that scales on this page stays frozen in a consumer copy.
          </>,
          <>
            {hardcoded.uses} px and rem literals remain in {hardcoded.files.length} component files,
            among them{" "}
            <Run items={hardcoded.samples.slice(0, 3).map((sample) => <Code key={sample}>{sample}</Code>)} />.
            Each is a value that will not move when the root does.
          </>,
        ]}
      >
        <TailwindTable rows={tailwind} governs={GOVERNS} />
      </Section>

      <Section
        id="anatomy"
        title="How a name is built"
        scope="A name answers three questions in order, so reading it left to right tells you what a token is for."
        cautions={[
          <>
            The same name reaches code two ways — <Code>bg-surface-base</Code> and{" "}
            <Code>var(--db-surface-base)</Code>. The prefix marks a token as this system&rsquo;s
            rather than a consumer&rsquo;s.
          </>,
        ]}
      >
        <NameAnatomy />
      </Section>

      <Section
        id="color"
        title="Color"
        live={isLive("color")}
        scope="Every color that ships, each with a light and a dark value. Nothing dimensional — a color token never carries a size, a radius or a shadow."
        cautions={[
          <>
            <Code>border-*</Code> is decorative. Form controls take <Code>input-border-*</Code>,
            which is darker so a field reads as editable.
          </>,
          <>Primitives do not ship as CSS, so the palette cannot be named from product code.</>,
          <>
            <Code>surface-hover</Code> is lighter than <Code>action-default-hover</Code> on purpose.
            The same alpha reads as a tint on a button and as a fill across a card.
          </>,
        ]}
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
        live={isLive("type")}
        scope="Family, size, leading, tracking, weight and case, as one class. Not color and not alignment."
        cautions={[
          <>
            <Code>label</Code> and <Code>body</Code> are the same size and differ only in leading.
            Using <Code>label</Code> for text that wraps looks correct until a second line appears.
          </>,
          <>
            Never pair a <Code>type-</Code> class with <Code>leading-</Code>, <Code>font-</Code> or{" "}
            <Code>uppercase</Code>. The class is already the whole style.
          </>,
          <>
            Numbers in a table take <Code>numeric</Code> on the cell. Tabular figures need right
            alignment too, which no type style can express.
          </>,
        ]}
      >
        <TypeScale steps={typeSteps} use={TYPE_USE} />
      </Section>

      <Section
        id="space"
        title="Space"
        live={isLive("space")}
        scope="Named steps over the grid unit. The unit is wired; these eleven names are not — components spend Tailwind's numeric scale, which lands on the same pixels."
        cautions={[
          <>Coarse above the half step on purpose. A scale with every increment makes any value look defensible.</>,
          <>
            Every step restates a numeric utility — <Code>md</Code> is <Code>p-4</Code>. Naming them
            as Tailwind keys would give two ways to say one thing, so the names stay available
            through <Code>var(--db-space-*)</Code> and nothing spends them.
          </>,
          <>
            <Code>inline-*</Code> is em-relative, so it tracks the text beside it rather than the
            grid. The only part of this family with no Tailwind equivalent.
          </>,
        ]}
      >
        <SpaceScale tokens={space} />
      </Section>

      <Section
        id="radius"
        title="Radius"
        live={isLive("radius")}
        scope="Corner radius, reached through rounded-*. Form controls take sm, containers and popovers md, cards xl, pills full."
        cautions={[
          <>
            <Code>rounded-3xl</Code> is the pill, not a step above 2xl. <Code>rounded-xs</Code> and{" "}
            <Code>rounded-4xl</Code> are Tailwind&rsquo;s and are not on this scale at all.
          </>,
        ]}
      >
        <RadiusScale tokens={radius} />
      </Section>

      <Section
        id="size"
        title="Size"
        live={isLive("size")}
        scope="Control heights and icon boxes. Read by nothing — a control's height still comes from its own class."
        cautions={[
          <>
            Icon <Code>md</Code> matches the <Code>label</Code> line box. Changing either without the
            other breaks text and icon alignment in every row.
          </>,
        ]}
      >
        <SizeScale tokens={sizeElement} kind="element" />
        <SizeScale tokens={sizeIcon} kind="icon" />
      </Section>

      <Section
        id="border"
        title="Border"
        live={isLive("border")}
        scope="Hairline weights. Read by nothing — components write Tailwind's border and ring widths."
        cautions={[<>The only family in px rather than rem. A scaled hairline blurs.</>]}
      >
        <BorderScale tokens={borderWidth} />
      </Section>

      <Section
        id="elevation"
        title="Elevation"
        live={isLive("elevation")}
        scope="Shadows for surfaces that float. Read by nothing in the shipped components — they use Tailwind's shadow-* instead."
        cautions={[
          <>Counts down. When two surfaces overlap, the one on top takes the lower number.</>,
          <>
            Tailwind&rsquo;s <Code>shadow-lg</Code> is not <Code>elevation-1</Code> — different
            values, opposite directions.
          </>,
        ]}
      >
        <ElevationScale tokens={elevation} />
      </Section>

      <Section
        id="motion"
        title="Motion"
        live={isLive("motion")}
        scope="Two duration bands and one easing curve. Read by nothing — a bare transition-* takes Tailwind's default duration and curve."
        cautions={[
          <>
            There is no slow band on purpose. Anything approaching a second reads as the product
            being slow rather than as polish.
          </>,
        ]}
      >
        {/* Read from the generated data rather than retyped. The curve was
            written out here as a literal, which is the one thing a token page
            must not do — a value restated is a value that goes stale. */}
        <MotionScale tokens={duration} easing={easing[0].value} />
      </Section>

      <Section
        id="scalars"
        title="Scalars"
        scope="Dials that re-tune a whole family from one number, each shown with what it multiplies."
        cautions={[
          <>
            {scalarConsumption.filter((s) => !s.live).length} of the {scalarConsumption.length} turn
            nothing today. They multiply space and size, and neither family is read.
          </>,
          <>
            For a roomier page, move the root font size rather than <Code>--db-type-scalar</Code>. The
            root moves type, radius and Tailwind&rsquo;s rem utilities together. The type scalar grows
            text inside boxes that stay put.
          </>,
        ]}
      >
        <ScalarList tokens={scalars} consumption={scalarConsumption} drives={DRIVES} />
      </Section>

      <Section
        id="tools"
        title="Tools"
        scope="Nothing here has to be read off this page."
      >
        <div className="flex flex-col gap-3">
          <h3 className="type-title-4 text-text-strong">From a terminal</h3>
          <RefTable
            columns={[
              { key: "run", header: "Run", width: "w-[280px]", mono: true },
              { key: "gives", header: "What it gives you" },
            ]}
            rows={TERMINAL_TOOLS}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="type-title-4 text-text-strong">From an agent</h3>
          <p className="type-body text-text-subtle">
            The MCP server delegates to the same module the CLI uses, so the two cannot disagree
            about a value.
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
