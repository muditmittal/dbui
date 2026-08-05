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
  scalars: <>Multiplied inside the generated CSS. One of the five turns a family anything reads.</>,
}

/** What each Tailwind namespace governs, and where it bites. */
const GOVERNS: Record<string, React.ReactNode> = {
  "--spacing": (
    <>
      Padding, margin, gap, inset, and every numeric <Code>w-</Code>, <Code>h-</Code> and{" "}
      <Code>size-</Code>. The spacing system in practice.
    </>
  ),
  "--radius-*": (
    <>
      <Code>rounded-*</Code>. DBUI redefines sm through 2xl and points 3xl at the pill, so a step
      name does not mean what Tailwind means by it.
    </>
  ),
  "--shadow-*": <>Every shadow that ships. Elevation is not in this path.</>,
  "ring and outline width": <>Focus treatments. The widths are baked into the utility.</>,
  "--animate-*": (
    <>
      Spinners and enter and exit transitions, from Tailwind and from{" "}
      <Code>tw-animate-css</Code>.
    </>
  ),
  "z-index scale": <>Stacking order. Tailwind bakes the steps, so no token can govern it.</>,
  "--default-transition-duration": <>What a bare <Code>transition-*</Code> takes. Not the motion tokens.</>,
  "--default-transition-timing-function": (
    <>
      The curve a bare <Code>transition-*</Code> runs on, and what <Code>duration-*</Code> and{" "}
      <Code>ease-*</Code> pick from.
    </>
  ),
  "--font-weight-*": <>Weight applied outside the ramp. Every one of these is a type class that was not used.</>,
  "--breakpoint-*": <>The <Code>sm:</Code> and <Code>md:</Code> variants. Barely load-bearing.</>,
  "--container-*": <>Named max widths on popovers and panels.</>,
  "--leading-*": <>Leading applied outside the ramp, which the ramp already carries.</>,
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

/** What each dial multiplies, so its status reads as a consequence. */
const DRIVES: Record<string, React.ReactNode> = {
  "spacing-unit": <>The grid step every space token is a multiple of.</>,
  "density-scalar": <>Space, on top of the spacing dial.</>,
  "spacing-scalar": <>Space.</>,
  "sizing-scalar": <>Control heights and icon boxes.</>,
  "type-scalar": <>The whole ramp, proportionally.</>,
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
        <Code>theme.config.mjs</Code> is the one authored file. It generates the CSS variables, the
        type ramp and the linter&rsquo;s allowlist together — but it does not generate everything
        that affects rendering, and the wiring table is the honest account of which parts it reaches.
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
        scope={
          <>
            Whether a line of code resolves to a family. Measured against the repo rather than
            declared, so a token that ships and is read by nothing says so here.
          </>
        }
        cautions={[
          <>
            {unconsumed.length} families are read by nothing:{" "}
            {unconsumed.map((f) => f.label.toLowerCase()).join(", ")}. They are correct values with
            no consumers, so changing one changes nothing on screen.
          </>,
          <>
            An unconsumed family is still safe to reach for through{" "}
            <Code>var(--db-*)</Code>. It just will not agree with the Tailwind utility beside it once
            a scalar leaves 1.
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
            The theme namespaces the shipped components depend on, with whose value is in force.
            Tailwind {tailwindVersion} is a source of truth here alongside{" "}
            <Code>theme.config.mjs</Code>, and these are the concepts a rule could name.
          </>
        }
        cautions={[
          <>
            <Code>--spacing</Code> is rem-based, which is the only reason the system rescales under a
            root font-size change. That is the right behavior arriving from Tailwind rather than from
            the space tokens.
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
        scope="A name answers three questions in order, so reading it left to right tells you what a token is for without opening its value."
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
          <>
            Primitives do not ship as CSS, so the palette cannot be reached from product code by
            construction. The linter rejects one if you name it anyway.
          </>,
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
        scope="Family, size, leading, tracking, weight and case, as one class. Not color and not alignment — those stay separate so a step can be reused on any surface."
        cautions={[
          <>
            <Code>label</Code> and <Code>body</Code> are the same size and differ only in leading. A
            label is single-line by definition, so its line box matches the icon box; using it for
            text that wraps looks correct until a second line appears.
          </>,
          <>
            Never pair a <Code>type-</Code> class with <Code>leading-</Code>, <Code>font-</Code> or{" "}
            <Code>uppercase</Code>. The class is already the whole style.
          </>,
          <>
            Numbers in a table take <Code>numeric</Code> on the cell. Tabular figures need right
            alignment too, which no type style can express.
          </>,
          <><Code>type-</Code> not <Code>text-</Code>, because <Code>text-</Code> already means color.</>,
        ]}
      >
        <TypeScale steps={typeSteps} use={TYPE_USE} />
      </Section>

      <Section
        id="space"
        title="Space"
        live={isLive("space")}
        scope="Would govern gaps and padding. Governs nothing today — components spend Tailwind's scale, and these tokens sit beside it unread."
        cautions={[
          <>
            Deliberately coarse above the half step. A scale with every increment lets any value look
            defensible, which is what makes spacing inconsistent.
          </>,
          <>
            <Code>inline-*</Code> is em-relative, so it tracks the text it sits beside rather than the
            grid. It is the only part of this family that has no Tailwind equivalent.
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
            <Code>rounded-4xl</Code> are Tailwind&rsquo;s own and are not on this scale at all.
          </>,
          <>
            Radius ships in rem with the rest of the spatial families. A px corner on a control whose
            height is in rem changes the control&rsquo;s shape rather than its size when the root
            moves.
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
        cautions={[
          <>
            The only family that stays in px while everything spatial ships in rem. A hairline is a
            rendering fact, so scaling it blurs it across a subpixel boundary.
          </>,
        ]}
      >
        <BorderScale tokens={borderWidth} />
      </Section>

      <Section
        id="elevation"
        title="Elevation"
        live={isLive("elevation")}
        scope="Shadows for surfaces that float. Read by nothing in the shipped components — they use Tailwind's shadow-* instead."
        cautions={[
          <>
            Counts down. 1 is the highest surface, 3 the softest, 0 flat. When two surfaces overlap,
            the one on top takes the lower number.
          </>,
          <>
            Tailwind&rsquo;s <Code>shadow-lg</Code> is not <Code>elevation-1</Code>. The two scales
            have different values and opposite directions.
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
            One curve is a deliberate economy. A second would give nobody a way to choose between
            them.
          </>,
          <>
            There is no slow band. Anything approaching a second reads as the product being slow
            rather than as polish.
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
        scope="Dials that re-tune a whole family from one number. Each row carries what it multiplies, because a dial attached to an unread family does nothing."
        cautions={[
          <>
            {scalarConsumption.filter((s) => !s.live).length} of the{" "}
            {scalarConsumption.length} dials turn nothing today. They multiply space and size, and
            neither family is read.
          </>,
          <>
            The docs rail moves the root font size, not <Code>--db-type-scalar</Code>. The root is the
            one input that moves type, radius and Tailwind&rsquo;s rem utilities together; the type
            scalar grows text inside boxes that stay put.
          </>,
        ]}
      >
        <ScalarList tokens={scalars} consumption={scalarConsumption} drives={DRIVES} />
      </Section>

      <Section
        id="tools"
        title="Tools"
        scope="Nothing here has to be read off this page. The same values print from a terminal and answer over MCP, and the linter checks a file against them."
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
            about a value. The skills are procedures an agent loads on trigger.
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
