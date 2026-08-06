"use client"

import {
  ColorSwatches, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, MotionScale, ScalarList, TypeScale, WiringTable, TailwindTable, Wired,
  SupersededNote, wiringOf,
} from "@/stories/tokens/TokenKit"
import {
  colorGroups, type as typeSteps, space, radius, size,
  borderWidth, elevation, duration, easing, scalars,
} from "@/stories/tokens/token-data"
import {
  families, scalars as scalarConsumption, tailwind, themeOverrides, hardcoded,
} from "@/stories/tokens/token-consumption"
import { RefTable, Code } from "@/components/docs/Prose"
import { Figure, FigureRow, FigureLabel } from "@/components/docs/Diagram"
import { SectionTabs } from "@/components/docs/StickyBar"
import { anchorOffset } from "@/components/docs/anchor"
import type { Wiring } from "@/stories/tokens/TokenKit"

/**
 * A reference page for someone skimming, so the unit is a table or a preview and
 * a sentence has to earn its line by removing an ambiguity. Two things are
 * load-bearing and the rest is specimen: how a name is built, and which families
 * anything actually reads.
 *
 * The page used to argue its case in paragraphs — every family carried three
 * cautions and the wiring table carried a sentence per row. Reading it end to end
 * took longer than reading the CSS, which is the failure mode of a reference
 * page. What survived a cut is the mistake someone makes without it: `label` for
 * text that wraps, `border-*` on a form control, a named space step that
 * restates a numeric utility.
 *
 * No value and no count is typed here. Values come from `token-data.ts`, parsed
 * out of the shipped CSS, and counts come from `token-consumption.ts`, measured
 * against the repo on every run. What this file owns is the editorial layer
 * neither generator can produce: what a family is for and what it is not for.
 *
 * This stays a client module because `TokenKit` holds state — a show-more and a
 * motion replay — and the sticky tabs measure the header. That rules out the
 * syntax highlighted code blocks, which are server components, so commands
 * render in the plain reference table instead.
 */

/**
 * The tabs and the section ids are one list, so a tab cannot point at a section
 * that no longer exists. Order is the reading order: how to read a name, then
 * whether names reach code, then the families themselves, then what the system
 * does not own, then the tools.
 *
 * The families run in the order they are decided in. Color and type carry the
 * most decisions and are read first. Elevation comes next because it is the one
 * families argue about. `Dimensions` opens the group it names: the grid unit and
 * the two scalars that multiply it, then the four families built from them, so
 * space, size, radius and border read as one collection rather than as four
 * unrelated scales. Motion depends on none of them and goes last.
 */
const SECTIONS = [
  { id: "name", label: "Name" },
  { id: "wiring", label: "Wiring" },
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "elevation", label: "Elevation" },
  { id: "dimensions", label: "Dimensions" },
  { id: "space", label: "Space" },
  { id: "size", label: "Size" },
  { id: "radius", label: "Radius" },
  { id: "border", label: "Border" },
  { id: "motion", label: "Motion" },
  { id: "tailwind", label: "Tailwind" },
  { id: "tools", label: "Tools" },
]

const family = (key: string) => families.find((f) => f.key === key)

/**
 * The section's badge, and the line that has to sit under a superseded one.
 *
 * A section heading reading `Elevation superseded` states half of a two-part
 * fact. The other half — that Tailwind's shadow namespace is drawing every
 * shadow in the product — is the half that stops the badge reading as a defect,
 * so it is rendered from the scan rather than left to the badge to imply.
 */
const wiring = (key: string) => {
  const f = family(key)
  return f ? wiringOf(f) : "unread"
}

const supersededNote = (key: string) => {
  const f = family(key)
  return f?.superseded ? [<SupersededNote key="superseded" family={f} />] : []
}

/**
 * Why a namespace is Tailwind's and not ours — a few words, because the table it
 * sits in is scanned rather than read.
 *
 * `z-index scale` and `ring and outline width` are the two that matter. Tailwind
 * v4 gives neither a theme namespace, so the value is baked into the utility and
 * no token could govern it even if we wrote one.
 */
const GOVERNS: Record<string, React.ReactNode> = {
  "--shadow-*": "Every shipped shadow. Elevation is not in this path.",
  "ring and outline width": "No v4 theme namespace. Baked into the utility.",
  "--animate-*": "Keyframes, from Tailwind and tw-animate-css.",
  "z-index scale": "No v4 theme namespace. Stacking cannot be tokenized.",
  "--default-transition-duration": "What a bare transition-* takes.",
  "duration-* and ease-*": "Bare numbers in a class. Nobody owns the value.",
  "--font-weight-*": "Weight outside the ramp.",
  "--breakpoint-*": "The sm: and md: variants.",
  "--container-*": "Named max widths on popovers and panels.",
  "--leading-*": "Leading outside the ramp.",
  "--blur-*": "Backdrop blur on scrims.",
  "--text-*": "Font size outside the ramp.",
  "--tracking-*": "Tracking outside the ramp.",
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
  "spacing-unit": (
    <>
      The grid step. Every space token multiplies it, and so does <Code>--spacing</Code>.
    </>
  ),
  "density-scalar": (
    <>
      Padding, gaps and control sizes together, through <Code>--spacing</Code>. Not type.
    </>
  ),
  "spacing-scalar": (
    <>
      Space only. Tailwind reads one key for <Code>p-4</Code> and <Code>gap-4</Code>, so a dial that
      means gaps alone cannot ride it.
    </>
  ),
  "sizing-scalar": "Control heights and icon boxes.",
  "type-scalar": "The whole type ramp, proportionally.",
}

/**
 * One row per job rather than one per command, so the question a reader arrives
 * with — "how do I read a value" — is the thing the left column answers.
 *
 * An em dash means the surface has nothing for that job. It is not a gap to be
 * filled: a skill is a procedure, and there is no procedure for printing a value.
 */
const NONE = <span aria-hidden="true">&mdash;</span>

const JOBS = [
  { job: "Read a group's values", cli: "yarn dbui token <group>", agent: "dbui_get", skill: NONE },
  { job: "See which groups exist", cli: "yarn dbui token", agent: "dbui_list", skill: NONE },
  {
    job: "Find token violations in a file",
    cli: "yarn dbui check <path>",
    agent: "dbui_check",
    skill: "dbui-validate",
  },
  { job: "Change a value", cli: "yarn design:tokens", agent: NONE, skill: NONE },
  {
    job: "Prove the config, the CSS and Figma agree",
    cli: "yarn design:verify-sync",
    agent: NONE,
    skill: NONE,
  },
  {
    // Both generators, because refreshing the values without re-measuring the
    // wiring leaves a page that renders new numbers beside an old status.
    job: "Refresh what this page renders",
    cli: (
      <div className="flex flex-col gap-1">
        <span>node scripts/generate-token-data.mjs</span>
        <span>node scripts/generate-token-consumption.mjs</span>
      </div>
    ),
    agent: NONE,
    skill: NONE,
  },
]

/**
 * A heading, one line of scope, the specimen, then the mistakes.
 *
 * Cautions sit under the preview because they are what you read once you have
 * decided to use the family. Above it they buried the thing the section is for.
 *
 * The scroll margin comes from the sticky bar, which measures the header rather
 * than assuming it. A constant here would put the first line of a section under
 * the tabs at the larger type scales.
 */
function Section({
  id,
  title,
  state,
  scope,
  cautions,
  children,
}: {
  id: string
  title: string
  state?: Wiring
  scope: React.ReactNode
  cautions?: React.ReactNode[]
  children: React.ReactNode
}) {
  return (
    <section id={id} style={anchorOffset} className="mt-14 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-3">
          <h2 className="type-title-3 text-text-strong">{title}</h2>
          {state === undefined ? null : <Wired state={state} />}
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
 * Real names, split at the point where each part starts, and dropped if the join
 * does not match something in `SHIPPED` — so a row disappears rather than lies
 * when a token is renamed.
 *
 * The four cover every shape a name comes in: all three slots filled, a family
 * that is two words, the plain two-part case, and a scale step whose middle part
 * is a size rather than a job.
 */
const NAMES = [
  ["action", "primary", "hover"],
  ["status-surface", "warning"],
  ["text", "subtle"],
  ["space", "3"],
].filter((parts) => SHIPPED.has(parts.join("-")))

/** The specimen is the one name that fills all three slots. */
const HERO = NAMES.find((parts) => parts.length === 3)
const OTHERS = NAMES.filter((parts) => parts !== HERO)

/**
 * The prefix is narrow and fixed, and the three questions need room to wrap, so
 * the columns are not equal. They only have to be equal down the figure, which
 * is what makes a column mean one slot.
 */
const GRID = "grid grid-cols-[7rem_1fr_1fr_1fr]"
const CELL = "border-r border-border-subtle px-3 py-2.5 last:border-r-0"

/**
 * The name, taken apart.
 *
 * A table of parts made the reader assemble the grammar from three labelled
 * columns. Here one real name is the specimen, the questions sit directly under
 * the parts that answer them, and three more real names run through the same
 * slots — so the rule is visible as a column rather than stated as a sentence.
 *
 * Each part keeps its trailing hyphen, so a row read left to right reassembles
 * the name it came from, and an em dash in the last slot shows that state is
 * optional without a sentence saying so.
 *
 * The last row is the same name in the two forms it reaches code as, both built
 * from the specimen rather than typed, which is the other thing a reader has to
 * know and the only place it appears.
 */
function NameAnatomy() {
  if (!HERO) return null
  const full = HERO.join("-")
  return (
    <Figure caption="You never pick a value. You describe the job, and the name follows.">
      <FigureRow className="bg-surface-subtle">
        <div className={GRID}>
          <div className={`type-code ${CELL} text-text-subtle`}>--db-</div>
          {[0, 1, 2].map((slot) => (
            <div key={slot} className={`type-code ${CELL} text-text-strong`}>
              {HERO[slot]}
              {slot < 2 ? "-" : ""}
            </div>
          ))}
        </div>
      </FigureRow>

      <FigureRow>
        <div className={GRID}>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Prefix</FigureLabel>
            <span className="type-hint text-text-subtle">Whose token?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Family</FigureLabel>
            <span className="type-hint text-text-subtle">What kind of thing?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>Role</FigureLabel>
            <span className="type-hint text-text-subtle">Which job does it do?</span>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>State</FigureLabel>
            <span className="type-hint text-text-subtle">What is happening to it?</span>
          </div>
        </div>
      </FigureRow>

      {OTHERS.map((parts) => (
        <FigureRow key={parts.join("-")}>
          <div className={GRID}>
            <div className={CELL} />
            {[0, 1, 2].map((slot) => (
              <div key={slot} className={`type-code ${CELL} text-text-base`}>
                {parts[slot] ? (
                  `${parts[slot]}${slot < parts.length - 1 ? "-" : ""}`
                ) : (
                  <span aria-hidden="true">&mdash;</span>
                )}
              </div>
            ))}
          </div>
        </FigureRow>
      ))}

      <FigureRow className="bg-surface-subtle">
        <div className="grid grid-cols-2">
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>As a class</FigureLabel>
            <code className="type-code text-text-base">bg-{full}</code>
          </div>
          <div className={`${CELL} flex flex-col gap-1`}>
            <FigureLabel>As a var</FigureLabel>
            <code className="type-code text-text-base">var(--db-{full})</code>
          </div>
        </div>
      </FigureRow>
    </Figure>
  )
}

/**
 * Every theme key still set by hand. The generator owns the bridge, so an entry
 * here is a value it does not own — which is how radius came to be stated in two
 * files that disagreed. Measured rather than named, so the list shrinks on its
 * own as keys move into the config.
 */
const handMapped = [...new Set(themeOverrides.map((o) => o.key))].sort()

export function TokensDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Tokens</h1>
      <p className="type-paragraph mt-3 text-text-subtle">
        <Code>theme.config.mjs</Code> is the one authored file. It does not generate everything that
        affects rendering, and wiring is the account of what it reaches.
      </p>

      <SectionTabs sections={SECTIONS} label="Token sections" />

      <Section
        id="name"
        title="How a name is built"
        scope="Three slots in order, so reading a name left to right tells you what it is for."
      >
        <NameAnatomy />
      </Section>

      <Section
        id="wiring"
        title="Wiring"
        scope="Whether a line of code resolves to a family, measured against the repo rather than declared."
        cautions={[
          <>
            Superseded means the property renders everywhere, from Tailwind&rsquo;s namespace rather
            than from ours. Unread means nothing renders it at all.
          </>,
          <>
            Either way the names stay safe through <Code>var(--db-*)</Code>. They just stop agreeing
            with the Tailwind utility beside them once a scalar leaves 1.
          </>,
        ]}
      >
        <WiringTable families={families} />
      </Section>

      <Section
        id="color"
        title="Color"
        state={wiring("color")}
        scope="Every color that ships, light beside dark. Never a size, a radius or a shadow."
        cautions={[
          <>
            <Code>border-*</Code> is decorative. Form controls take <Code>input-border-*</Code>,
            which is darker so a field reads as editable.
          </>,
          <>Primitives do not ship as CSS, so the palette cannot be named from product code.</>,
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
        state={wiring("type")}
        scope="Family, size, leading, tracking, weight and case, as one class."
        cautions={[
          <>
            <Code>label</Code> and <Code>body</Code> are the same size and differ only in leading.
            Using <Code>label</Code> for text that wraps looks right until a second line appears.
          </>,
          <>
            Never pair a <Code>type-</Code> class with <Code>leading-</Code>, <Code>font-</Code> or{" "}
            <Code>uppercase</Code>.
          </>,
          <>
            Numbers in a table take <Code>numeric</Code> on the cell, which also right-aligns them.
          </>,
        ]}
      >
        <TypeScale steps={typeSteps} use={TYPE_USE} />
      </Section>

      <Section
        id="elevation"
        title="Elevation"
        state={wiring("elevation")}
        scope="Shadows for surfaces that float."
        cautions={[
          ...supersededNote("elevation"),
          <>Counts down. When two surfaces overlap, the one on top takes the lower number.</>,
        ]}
      >
        <ElevationScale tokens={elevation} />
      </Section>

      <Section
        id="dimensions"
        title="Dimensions"
        scope="The collection: one grid unit, two scalars that multiply it, and the four families below — space, size, radius and border."
        cautions={[
          <>
            Each family computes its own stops. Nothing reads another family, and the
            twelve-stop scale they agree on is an authoring artifact that lives in Figma,
            not a custom property — React ships semantics only, the same way it does for
            color.
          </>,
          <>
            Scalar means a multiplier here and nowhere else. <Code>--db-density-scalar</Code>{" "}
            and <Code>--db-type-scalar</Code> are the only two.
          </>,
          <>
            For a roomier page, move the root font size rather than{" "}
            <Code>--db-type-scalar</Code>. The root moves type, radius and every rem utility
            together. The type scalar grows text inside boxes that stay put.
          </>,
        ]}
      >
        <ScalarList tokens={scalars} consumption={scalarConsumption} drives={DRIVES} />
      </Section>

      <Section
        id="space"
        title="Space"
        state={wiring("space")}
        scope="Padding, margin and gap. Each stop is its multiple of the grid unit."
        cautions={[
          ...supersededNote("space"),
          <>
            The stop is the multiple, so the token and the class carry the same number —{" "}
            <Code>--db-space-3</Code> is <Code>p-3</Code>. Nothing to look up in either direction.
          </>,
          <>
            A step off this scale still compiles, because Tailwind&rsquo;s multiplier is still
            declared. <Code>p-1.5</Code> renders 6px and no token stands behind it.
          </>,
        ]}
      >
        <SpaceScale tokens={space} />
      </Section>

      <Section
        id="size"
        title="Size"
        state={wiring("size")}
        scope="Width and height. Same grid as space, so a stop is its multiple of the unit."
        cautions={[
          ...supersededNote("size"),
          <>
            <Code>--db-size-4</Code> is 16px and matches the <Code>label</Code> line box. Moving
            either without the other breaks text and icon alignment in every row.
          </>,
          <>
            One stop drives three namespaces — <Code>size-8</Code>, <Code>h-8</Code> and{" "}
            <Code>w-8</Code> are all 32px. Control heights and icon boxes used to be separate
            families, which gave a 24px control and a 24px icon two different names.
          </>,
          <>
            <Code>size-6</Code> is the small control height — the <Code>sm</Code> button and the{" "}
            <Code>sm</Code> input are both <Code>h-6</Code>. It reads as droppable next to
            space&rsquo;s own 6, and dropping it would not change a pixel, because a height
            utility falls back to the spacing scale. It would only stop a control height from
            being writable as one.
          </>,
        ]}
      >
        <SizeScale tokens={size} />
      </Section>

      <Section
        id="radius"
        title="Radius"
        state={wiring("radius")}
        scope="Corners, on the same grid. Controls take 1, containers and popovers 2, cards 4, pills full."
        cautions={[
          <>
            The old <Code>sm</Code>/<Code>md</Code>/<Code>lg</Code> names are removed rather than
            left pointing at Tailwind, whose scale disagrees with this one at every step. A stale
            class emits no corner instead of a plausible wrong one.
          </>,
          <>
            <Code>rounded-xs</Code> and <Code>rounded-4xl</Code> are Tailwind&rsquo;s and are not on
            this scale. <Code>rounded-full</Code> is the pill and is still Tailwind&rsquo;s too.
          </>,
        ]}
      >
        <RadiusScale tokens={radius} />
      </Section>

      <Section
        id="border"
        title="Border"
        state={wiring("border")}
        scope="Hairline weights, and the one family whose number counts px rather than grid units — border-1 is 1px. A hairline is a rendering fact, not a proportion, so it is never scaled."
        cautions={supersededNote("border")}
      >
        <BorderScale tokens={borderWidth} />
      </Section>

      <Section
        id="motion"
        title="Motion"
        state={wiring("motion")}
        scope="Three durations and one easing curve."
        cautions={[
          ...supersededNote("motion"),
          <>
            This was two bands of three — a min, a base and a max each — and the four
            band members had no consumers. The question at a call site is quick or
            considered, never three quarters of the way down the fast band.
          </>,
        ]}
      >
        {/* Read from the generated data rather than retyped. The curve was
            written out here as a literal, which is the one thing a token page
            must not do — a value restated is a value that goes stale. */}
        <MotionScale tokens={duration} easing={easing[0].value} />
      </Section>

      <Section
        id="tailwind"
        title="What Tailwind owns"
        scope="Concepts the components depend on that no DBUI token governs. Anything the config maps is in Wiring instead."
        cautions={[
          <>
            {handMapped.length} theme keys are still authored by hand in <Code>globals.css</Code>{" "}
            rather than generated, so each is a value the config does not own and each can drift.
          </>,
          <>
            {hardcoded.uses} px and rem literals remain in {hardcoded.files.length} component files.
            Each is a value that will not move when the root does.
          </>,
        ]}
      >
        <TailwindTable rows={tailwind} governs={GOVERNS} />
      </Section>

      <Section
        id="tools"
        title="Tools"
        scope="Nothing here has to be read off this page. Every dbui command takes --json."
        cautions={[
          <>
            The MCP tools wrap the module the CLI reads. Same facts, one fewer terminal.
          </>,
          <>
            <Code>dbui check</Code> reads class strings, so it catches a hex, a px literal and a
            primitive. It cannot see a token that ships and nothing reads, which is what the wiring
            table is for. <Code>/docs/checks</Code> lists every rule.
          </>,
        ]}
      >
        <RefTable
          columns={[
            { key: "job", header: "To do this" },
            { key: "cli", header: "CLI", width: "w-[300px]", mono: true },
            { key: "agent", header: "Agent", width: "w-[104px]", mono: true },
            { key: "skill", header: "Skill", width: "w-[112px]", mono: true },
          ]}
          rows={JOBS}
        />
      </Section>
    </>
  )
}
