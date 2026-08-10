"use client"

import {
  ColorTable, ColorStrip, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, MotionScale, ScalarList, TypeScale, typeRegisters,
} from "@/stories/tokens/TokenKit"
import {
  colorFamilies, colorGroups, type as typeSteps, typeContexts, typeContextAttribute,
  space, radius, size, borderWidth, elevation, duration, easing, scalars,
} from "@/stories/tokens/token-data"
import { scalars as scalarConsumption } from "@/stories/tokens/token-consumption"
import { DocHeader, RefTable, Code } from "@/components/docs/Prose"
import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { SectionTabs } from "@/components/docs/StickyBar"
import { ColorModeOverride, useColorModeOverride } from "@/components/ColorModeControl"
import { TypeContextControl, useTypeContext } from "@/components/TypeContextControl"
import { anchorOffset } from "@/components/docs/anchor"

/**
 * A reference page for someone skimming, so the unit is a row and a sentence has
 * to earn its line by removing an ambiguity.
 *
 * One shape, everywhere. Every family renders the same row — the preview on the
 * left, the name and what it resolves to on the right — because the page is read
 * by moving between families, and a reader who has learned where color keeps
 * its value should not have to learn it again at type. What each family gets to
 * decide is what its preview looks like, not where anything sits.
 *
 * Three sections were cut rather than restyled. `How a name is built` took a
 * grammar apart that the grouped tables now show directly: the families are the
 * headings and the roles are the rows. `Wiring` and `What Tailwind owns` are
 * maintenance accounts — whether a line of code resolves to a family, how many
 * theme keys are still hand-authored — and a consumer of these docs cannot act
 * on either. Both generators still run and `token-consumption.ts` still ships;
 * the Foundations page reads its family list, and `generate-layout-data.mjs`
 * asserts against its space entry. Only this page stopped rendering it.
 *
 * No value and no count is typed here. Values come from `token-data.ts`, parsed
 * out of the shipped CSS. What this file owns is the editorial layer no
 * generator can produce: what a family is for and what it is not for.
 *
 * This stays a client module because the tables hold state — a show-more, a
 * motion replay, the color section's mode switch — and the sticky tabs measure
 * the header. That rules out the syntax highlighted code blocks, which are
 * server components, so commands render in the plain reference table instead.
 */

/**
 * The tabs and the section ids are one list, so a tab cannot point at a section
 * that no longer exists.
 *
 * One tab per section, and every scale that is built from the grid unit is
 * inside `Dimensions` rather than beside it. Space, size, radius and border used
 * to hold four tabs of their own, which put four siblings at the same level as
 * the collection that explains them and made a thirteen-tab strip out of a page
 * with six ideas in it.
 *
 * The families run in the order they are decided in. Color and type carry the
 * most decisions and are read first. Elevation comes next because it is the one
 * families argue about. Motion depends on none of them and goes last.
 */
const SECTIONS = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "elevation", label: "Elevation" },
  { id: "dimensions", label: "Dimensions" },
  { id: "motion", label: "Motion" },
  { id: "tools", label: "Tools" },
]

/** Which step to pick. The one thing in the ramp table that is not a value. */
const TYPE_USE: Record<string, string> = {
  "type-hint": "Captions, helper text, timestamps",
  "type-eyebrow": "Overlines",
  "type-label": "Single-line UI — buttons, cells",
  "type-label-bold": "Column headers, form labels",
  "type-body": "Descriptions that wrap",
  "type-body-bold": "Emphasis in a description",
  "type-code": "Identifiers, paths",
  "type-code-block": "Code blocks",
  "type-paragraph": "Prose — chat, docs",
  "type-paragraph-bold": "Bold inside prose",
  "type-title-4": "Small heading",
  "type-title-3": "Subsection heading",
  "type-title-2": "Section heading",
  "type-title-1": "Page heading",
}

/**
 * The three registers the ramp is authored in, which `theme.config.mjs` groups
 * by comment and the Figma file makes real. Flat, the table offered fourteen
 * equal choices and no way to narrow them before reading every row — and the
 * split that decides most picks is a register, not a size: `label` and `body`
 * are the same size and belong to the same one, `code` and `code-block` are a
 * face apart and do not.
 *
 * Authored here rather than derived, because a register is a claim about how
 * text is read and no property of a style can imply it. Membership only —
 * `typeRegisters` takes the order from the ramp, and gives anything no register
 * claims a register of its own rather than dropping it.
 */
const TYPE_GROUPS = [
  {
    label: "Interface",
    blurb: "Glanced at, a piece at a time",
    steps: [
      "type-hint", "type-eyebrow", "type-label", "type-label-bold",
      "type-body", "type-body-bold", "type-code",
    ],
  },
  {
    label: "Reading",
    blurb: "Read straight through, line after line",
    steps: ["type-code-block", "type-paragraph", "type-paragraph-bold"],
  },
  {
    label: "Display",
    blurb: "Headings, 4 down to 1",
    steps: ["type-title-4", "type-title-3", "type-title-2", "type-title-1"],
  },
]

const TYPE_REGISTERS = typeRegisters(typeSteps, TYPE_GROUPS)

/** What each dial multiplies, so the caveat beside it reads as a consequence. */
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
    job: "Refresh what this page renders",
    cli: "node scripts/generate-token-data.mjs",
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
 * `control` is the one thing allowed beside the heading, and only color has
 * one. In the Figma file it sits in the first family's card header; here it is a
 * row higher, because that card header is an accordion trigger and a segment
 * control nested inside a button is a control a keyboard cannot reach.
 *
 * The scroll margin comes from the sticky bar, which measures the header rather
 * than assuming it. A constant here would put the first line of a section under
 * the tabs at the larger type scales.
 */
function Section({
  id,
  title,
  scope,
  control,
  cautions,
  children,
}: {
  id: string
  title: string
  scope: React.ReactNode
  control?: React.ReactNode
  cautions?: React.ReactNode[]
  children: React.ReactNode
}) {
  return (
    <section id={id} style={anchorOffset} className="mt-14 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="type-title-3 text-text-strong">{title}</h2>
          {control}
        </div>
        <p className="type-body text-text-subtle">{scope}</p>
      </div>
      {children}
      <Cautions items={cautions} />
    </section>
  )
}

/** The mistakes, wherever they are attached — a whole section or one panel. */
function Cautions({ items }: { items?: React.ReactNode[] }) {
  if (!items?.length) return null
  return (
    <ul className="flex list-none flex-col gap-1.5 border-t border-border-subtle pt-3">
      {items.map((caution, i) => (
        <li key={i} className="type-body text-text-subtle">
          {caution}
        </li>
      ))}
    </ul>
  )
}

/**
 * What a collapsed panel says: the group's name, what it is for, and — where
 * there is one — a sample of what opening it shows.
 *
 * The sample is only worth the room while the panel is shut. Open, the real
 * swatches are on screen and the strip makes the same claim at a twelfth of the
 * size, so it goes. The trigger already publishes its state as `aria-expanded`
 * and `AccordionTrigger` already names itself `group/accordion-trigger` for the
 * chevron pair, so a variant reading that group is the whole mechanism — no
 * second copy of the state to fall out of step with the first.
 *
 * `display: contents` keeps the preview itself the header column's flex item
 * rather than nesting it in a box, so the collapsed layout is byte-for-byte
 * what it was and the wrapper only exists to carry the variant. Removing the
 * last child of a top-aligned column cannot move the two above it: the trigger
 * gets shorter, the title does not move.
 *
 * Nothing fades. The panel does not animate open in this build — the
 * `animate-accordion-*` utilities emit nothing, because no `--animate-accordion-*`
 * key is defined — so a strip that took 300ms to leave would be the only thing
 * moving in an interaction that is otherwise a cut.
 */
function PanelHeader({
  label,
  blurb,
  preview,
}: {
  label: string
  blurb: React.ReactNode
  preview?: React.ReactNode
}) {
  return (
    <>
      <span className="type-title-4 text-text-strong">{label}</span>
      <span className="type-body text-text-subtle">{blurb}</span>
      {preview ? (
        <span className="contents group-aria-expanded/accordion-trigger:hidden">{preview}</span>
      ) : null}
    </>
  )
}

/**
 * The surfaces a foreground is judged against, read out of the same generated
 * data the swatches are drawn from.
 *
 * Both used to be hex literals in the module — one value for two modes, which is
 * the defect the color section exists to teach. Reading them from the group
 * means the contrast verdict follows the mode switch, and follows the palette if
 * either surface is ever revalued.
 */
const allColors = colorGroups.flatMap((group) => group.tokens)
const colorNamed = (name: string) => allColors.find((token) => token.name === name)
const SURFACES = {
  light: {
    base: colorNamed("surface-base")?.light ?? "transparent",
    inverse: colorNamed("surface-inverse")?.light ?? "transparent",
    borderSubtle: colorNamed("border-subtle")?.light ?? "transparent",
  },
  dark: {
    base: colorNamed("surface-base")?.dark ?? "transparent",
    inverse: colorNamed("surface-inverse")?.dark ?? "transparent",
    borderSubtle: colorNamed("border-subtle")?.dark ?? "transparent",
  },
}

/**
 * Whether the family is still numbered, which decides whether the stacking rule
 * can be stated as a direction.
 *
 * "Counts down" is only true while the stops are numbers. The family is being
 * renamed, so the caution is derived rather than typed — it leaves the page by
 * itself rather than surviving as a sentence about numbers that are gone.
 */
const elevationIsNumbered = elevation.length > 0 && elevation.every((t) => /-\d+$/.test(t.name))

/**
 * The four scales built from the grid unit, each with the mistakes that are its
 * own rather than the collection's.
 *
 * Authored as data because the four are the same kind of thing and reading them
 * as four hand-written blocks was how `radius` came to describe a scale it no
 * longer had.
 */
const DIMENSIONS = [
  {
    key: "scalars",
    label: "Scalars",
    blurb: "The grid unit, and the two dials that multiply it.",
    render: <ScalarList tokens={scalars} consumption={scalarConsumption} drives={DRIVES} />,
    cautions: [
      <>
        Scalar means a multiplier here and nowhere else. <Code>--db-density-scalar</Code> and{" "}
        <Code>--db-type-scalar</Code> are the only two.
      </>,
      <>
        For a roomier page, move the root font size rather than <Code>--db-type-scalar</Code>. The
        root moves type, radius and every rem utility together. The type scalar grows text inside
        boxes that stay put.
      </>,
    ],
  },
  {
    key: "space",
    label: "Space",
    blurb: "Padding, margin and gap. Each stop is its multiple of the grid unit.",
    render: <SpaceScale tokens={space} />,
    cautions: [
      <>
        The stop is the multiple, so the token and the class carry the same number —{" "}
        <Code>--db-space-3</Code> is <Code>p-3</Code>. Nothing to look up in either direction.
      </>,
      <>
        A step off this scale still compiles, because Tailwind&rsquo;s multiplier is still
        declared. <Code>p-1.5</Code> renders 6px and no token stands behind it.
      </>,
    ],
  },
  {
    key: "size",
    label: "Size",
    blurb: "Width and height. Same grid as space, so a stop is its multiple of the unit.",
    render: <SizeScale tokens={size} />,
    cautions: [
      <>
        <Code>--db-size-4</Code> is 16px and matches the <Code>label</Code> line box. Moving either
        without the other breaks text and icon alignment in every row.
      </>,
      <>
        One stop drives three namespaces — <Code>size-8</Code>, <Code>h-8</Code> and{" "}
        <Code>w-8</Code> are all 32px. Control heights and icon boxes used to be separate families,
        which gave a 24px control and a 24px icon two different names.
      </>,
    ],
  },
  {
    key: "radius",
    label: "Radius",
    blurb: "Corners, on the same grid. Controls take 1, containers and popovers 2, cards 4, pills full.",
    render: <RadiusScale tokens={radius} />,
    cautions: [
      <>
        The old <Code>sm</Code>/<Code>md</Code>/<Code>lg</Code> names are removed rather than left
        pointing at Tailwind, whose scale disagrees with this one at every step. A stale class emits
        no corner instead of a plausible wrong one.
      </>,
      <>
        <Code>rounded-xs</Code> and <Code>rounded-4xl</Code> are Tailwind&rsquo;s and are not on
        this scale. <Code>rounded-full</Code> is the pill and is still Tailwind&rsquo;s too.
      </>,
    ],
  },
  {
    key: "border",
    label: "Border",
    blurb: "Hairline weights, and the one family whose number counts px rather than grid units.",
    render: <BorderScale tokens={borderWidth} />,
    cautions: [
      <>
        <Code>--db-border-1</Code> is 1px. A hairline is a rendering fact, not a proportion, so it
        is never scaled.
      </>,
    ],
  },
]

export function TokensDoc() {
  /**
   * A local override, seeded from the footer's setting and re-seeded whenever it
   * moves. It writes neither the class nor storage, so a reader can read the
   * dark values of one family without the page around them going dark — and it
   * cannot silently disagree with the footer, because the only thing it knows
   * about the mode is what the document says on load.
   */
  const [mode, setMode] = useColorModeOverride()

  /**
   * Not that relationship, one section down: there is nothing ambient to seed
   * from. A context activates only when something sets the attribute, so this
   * opens on the default and moves only when a reader moves it. Unrelated to the
   * footer's type scale, which magnifies whichever context this picks.
   */
  const [typeContext, setTypeContext] = useTypeContext()

  /**
   * Elevation's own, rather than color's. Two sections that both preview a mode
   * are two independent questions — a reader checking a dark shadow has no
   * reason to have moved the color tables — and sharing one switch across a
   * page-length gap would move a table nobody is looking at.
   */
  const [elevationMode, setElevationMode] = useColorModeOverride()

  return (
    <>
      <DocHeader title="Tokens">Source of truth for all interface styling.</DocHeader>

      {/* Same dimensions and treatment as the principles and voice heroes. */}
      <img
        src="/docs/tokens-hero.png"
        alt="Abstract mark for tokens: hexagons nested one inside the next, each a deeper red than the one around it."
        width={864}
        height={300}
        className="mt-10 h-auto w-full rounded-2"
      />

      <SectionTabs sections={SECTIONS} label="Token sections" />

      <Section
        id="color"
        title="Color"
        scope="Colors grouped by their functional families, roles and states, so a name can be reasoned about rather than looked up."
        control={
          <ColorModeOverride
            value={mode}
            onValueChange={setMode}
            label="Preview color mode"
          />
        }
        cautions={[
          <>
            A family is a grouping, never a prefix. Nothing is named{" "}
            <Code>structure-*</Code> or <Code>interaction-*</Code>. <Code>status-*</Code> and{" "}
            <Code>viz-*</Code> are prefixes that happen to share a family name; the other two
            families exist only as headings.
          </>,
          <>
            <Code>border-*</Code> is decorative. Form controls take <Code>input-border-*</Code>,
            which is darker so a field reads as editable.
          </>,
          <>Primitives do not ship as CSS, so the palette cannot be named from product code.</>,
          <>
            The switch above previews this section only. It starts on whatever the footer is set to
            and follows it when that moves; it never writes it.
          </>,
        ]}
      >
        <DocAccordion variant="list" defaultValue={[colorFamilies[0]?.key ?? ""]}>
          {colorFamilies.map((family) => (
            <DocAccordionItem
              key={family.key}
              value={family.key}
              variant="list"
              header={
                <PanelHeader
                  label={family.label}
                  blurb={family.blurb}
                  preview={
                    <ColorStrip
                      tokens={family.groups.flatMap((group) => group.tokens)}
                      mode={mode}
                    />
                  }
                />
              }
            >
              <div className="flex flex-col gap-6">
                {family.groups.map((group) => (
                  <div key={group.key} className="flex flex-col gap-2">
                    {/* A single-group family already carries the name above. */}
                    {family.groups.length > 1 ? (
                      <div className="type-label-bold text-text-strong">{group.label}</div>
                    ) : null}
                    <div className="type-hint text-text-subtle">{group.blurb}</div>
                    <ColorTable group={group} mode={mode} surfaces={SURFACES[mode]} limit={5} />
                  </div>
                ))}
              </div>
            </DocAccordionItem>
          ))}
        </DocAccordion>
      </Section>

      <Section
        id="type"
        title="Type"
        scope="Family, size, leading, tracking, weight and case, as one class."
        control={
          <TypeContextControl
            contexts={typeContexts}
            value={typeContext}
            onValueChange={setTypeContext}
            label="Preview type context"
          />
        }
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
            A style names a stop, not a size, so the same class measures differently per context.
            Never write the number — it can only be right in one of them.
          </>,
          <>
            The switch above picks which context every row is showing, specimen and number
            together. It opens on the default and stays there until you move it, because a context
            is opt-in and nothing follows the window width. It is not the footer&rsquo;s type scale,
            which magnifies whichever context is in force.
          </>,
          <>
            Numbers in a table take <Code>numeric</Code> on the cell, which also right-aligns them.
          </>,
        ]}
      >
        <DocAccordion variant="list" defaultValue={[TYPE_REGISTERS[0]?.key ?? ""]}>
          {TYPE_REGISTERS.map((register) => (
            <DocAccordionItem
              key={register.key}
              value={register.key}
              variant="list"
              header={<PanelHeader label={register.label} blurb={register.blurb} />}
            >
              <TypeScale
                steps={register.steps}
                use={TYPE_USE}
                contexts={typeContexts}
                context={typeContext}
                contextAttribute={typeContextAttribute}
              />
            </DocAccordionItem>
          ))}
        </DocAccordion>
      </Section>

      <Section
        id="elevation"
        title="Elevation"
        scope="Surface elevation levels, by what the surface is doing rather than by how far off the page it sits."
        control={
          <ColorModeOverride
            value={elevationMode}
            onValueChange={setElevationMode}
            label="Preview elevation mode"
          />
        }
        cautions={[
          ...(elevationIsNumbered
            ? [<>Counts down. When two surfaces overlap, the one on top takes the lower number.</>]
            : []),
          <>
            The only dimensional family with two value sets. Same geometry in both; only alpha
            moves, because an opaque-black shadow tuned for white draws nothing on a dark surface.
            The switch above previews one mode at a time on that mode&rsquo;s own surface.
          </>,
        ]}
      >
        <ElevationScale
          tokens={elevation}
          mode={elevationMode}
          surface={SURFACES[elevationMode].base}
          border={SURFACES[elevationMode].borderSubtle}
        />
      </Section>

      <Section
        id="dimensions"
        title="Dimensions"
        scope="One grid unit, two dials that multiply it, and the four scales built from them."
        cautions={[
          <>
            Each family computes its own stops and carries only the ones it uses, so 7 is a height
            and never a padding. Nothing reads another family, and the ladder of multiples they
            share is an authoring artifact that lives in Figma, not a custom property — React ships
            semantics only, the same way it does for color.
          </>,
        ]}
      >
        <DocAccordion variant="list" defaultValue={[DIMENSIONS[0]?.key ?? ""]}>
          {DIMENSIONS.map((entry) => (
            <DocAccordionItem
              key={entry.key}
              value={entry.key}
              variant="list"
              header={<PanelHeader label={entry.label} blurb={entry.blurb} />}
            >
              <div className="flex flex-col gap-4">
                {entry.render}
                <Cautions items={entry.cautions} />
              </div>
            </DocAccordionItem>
          ))}
        </DocAccordion>
      </Section>

      <Section
        id="motion"
        title="Motion"
        scope="Three durations and one easing curve."
        cautions={[
          <>
            This was two bands of three — a min, a base and a max each — and the four band members
            had no consumers. The question at a call site is quick or considered, never three
            quarters of the way down the fast band.
          </>,
        ]}
      >
        {/* Both read from the generated data rather than retyped. The curve was
            written out here as a literal, which is the one thing a token page
            must not do — a value restated is a value that goes stale. */}
        <MotionScale tokens={duration} easing={easing[0]} />
      </Section>

      <Section
        id="tools"
        title="Tools"
        scope="Nothing here has to be read off this page. Every dbui command takes --json."
        cautions={[
          <>The MCP tools wrap the module the CLI reads. Same facts, one fewer terminal.</>,
          <>
            <Code>dbui check</Code> reads class strings, so it catches a hex, a px literal and a
            primitive. It cannot see a token that ships and nothing reads.{" "}
            <Code>/docs/checks</Code> lists every rule.
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
