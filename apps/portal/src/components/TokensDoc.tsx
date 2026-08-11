"use client"

// A value import, not just the types. `React.ReactNode` annotations resolve from
// the global namespace, but the keyed fragment in `ToolList` is a real runtime
// reference.
import * as React from "react"

import { Badge } from "dbui/components/ui/badge"

import {
  ColorTable, ColorStrip, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, ElevationStrip, MotionScale, MotionStrip, MotionKeyframes,
  EasingScale, EasingStrip, ScalarList, TypeScale,
  TypeStrip, ScaleStrip, typeRegisters, PREVIEW_WIDTH, LayerScale, LayerStrip,
} from "@/stories/tokens/TokenKit"
import {
  colorFamilies, colorGroups, type as typeSteps, typeContexts, typeContextAttribute,
  space, radius, shape, size, borderWidth, elevation, duration, easing, layer, scalars,
} from "@/stories/tokens/token-data"
import { scalars as scalarConsumption } from "@/stories/tokens/token-consumption"
import { DocHeader, RefTable, Code, Para } from "@/components/docs/Prose"
import { Guidance } from "@/components/docs/Guidance"
import { DocAccordion, DocAccordionItem } from "@/components/docs/DocAccordion"
import { SectionTabs } from "@/components/docs/StickyBar"
import { ColorModeOverride, useColorModeOverride } from "@/components/ColorModeControl"
import { TypeContextControl, useTypeContext } from "@/components/TypeContextControl"
import { DensityControl, useDensity, densityStyle } from "@/components/DensityControl"
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
 * The families run in the order they are decided in: color, then type, then the
 * dimensions everything is measured on, then the effects applied on top — which
 * depend on none of them and go last.
 *
 * Effects is one tab rather than two because elevation and motion were a tab each
 * for a single panel, and neither belongs under Dimensions: every family in there
 * resolves to a multiple of `--db-spacing-unit`, and a shadow's alpha and a
 * duration's milliseconds do not count on that unit.
 *
 * Rules and Tools are not in here. They are reference a reader consults once,
 * not a family to browse, and a tab strip that mixes the two implies it is a
 * table of contents for the page rather than a filter across the token set. They
 * keep their headings and anchors at the bottom, matching the Icons page.
 */
const SECTIONS = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "effects", label: "Effects" },
  { id: "dimensions", label: "Dimensions" },
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
    steps: [
      "type-hint", "type-eyebrow", "type-label", "type-label-bold",
      "type-body", "type-body-bold", "type-code",
    ],
  },
  {
    label: "Reading",
    steps: ["type-code-block", "type-paragraph", "type-paragraph-bold"],
  },
  {
    label: "Display",
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
 * A surface a job does not reach is simply absent. It used to be an em dash in a
 * column of its own, and across six jobs those two columns were dashes eleven
 * times out of twelve: most of the table's width went to saying that a tool does
 * not exist. Absence is not a gap to be filled either — a skill is a procedure,
 * and there is no procedure for printing a value.
 */
const TOOL_SURFACES = [
  { key: "cli", label: "CLI" },
  { key: "agent", label: "Agent" },
  { key: "skill", label: "Skill" },
] as const

type Job = { job: string } & Partial<Record<(typeof TOOL_SURFACES)[number]["key"], string>>

const JOBS: Job[] = [
  { job: "Read a group's values", cli: "yarn dbui token <group>", agent: "dbui_get" },
  { job: "See which groups exist", cli: "yarn dbui token", agent: "dbui_list" },
  {
    job: "Find token violations in a file",
    cli: "yarn dbui check <path>",
    agent: "dbui_check",
    skill: "dbui-validate",
  },
  { job: "Change a value", cli: "yarn design:tokens" },
  { job: "Prove the config, the CSS and Figma agree", cli: "yarn design:verify-sync" },
  { job: "Refresh what this page renders", cli: "node scripts/generate-token-data.mjs" },
]

/**
 * The surfaces one job reaches, each labeled by which one it is.
 *
 * A grid rather than a stack of rows, so every command starts at the same x and
 * the column can be read straight down.
 *
 * The badge track is a fixed width rather than `auto`. Each cell is its own grid,
 * so `auto` sized that track to the widest label *in that cell* — a row with only
 * a CLI indented its command less than the row above it, and the column went
 * ragged down the table. One width, set on the badge so it wins over the `w-fit`
 * in Badge's own base, holds every cell to the same two columns. It is sized past
 * "Agent", the longest of the three, because Badge clips rather than overflows.
 *
 * `fill`, not a status variant. Badge's own constraint reserves those for color
 * that carries meaning, and CLI against Agent is a category: nothing here is
 * better or worse than its neighbor.
 */
function ToolList({ job }: { job: Job }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1">
      {TOOL_SURFACES.filter((s) => job[s.key]).map((s) => (
        <React.Fragment key={s.key}>
          <Badge className="w-14">{s.label}</Badge>
          <code className="type-code text-text-base">{job[s.key]}</code>
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * A heading, one line of scope, and the tokens. Nothing else.
 *
 * Each section used to end in its own list of cautions. Five of those turned the
 * page into an essay with a list inside it — the prose was the loudest thing on
 * screen once the panel blurbs came off, and a reader scanning for a token name
 * read four paragraphs of rules first. They are consolidated into one Rules
 * section above Tools, which is also where a reader looks for them a second time.
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
  children,
}: {
  id: string
  title: string
  scope: React.ReactNode
  control?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} style={anchorOffset} className="mt-14 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="type-title-3 text-text-strong">{title}</h2>
          {control}
        </div>
        {/*
          The reading style, matching the rules. A scope is a sentence, so it belongs
          in the register meant for sentences rather than the one sized for a label in
          a control — and it is now the same size as the guidance further down, which
          is the other text on the page written to be read.

          `max-w-none` against the measure cap in `globals.css`. The measure broke
          every one of these onto a second line in a 383px column while 700px of the
          row sat empty. That cap is for text read in sequence, and one sentence under
          a heading is closer to a label.
        */}
        <p className="type-paragraph max-w-none text-text-subtle">{scope}</p>
      </div>
      {children}
    </section>
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
  preview,
}: {
  label: string
  preview?: React.ReactNode
}) {
  return (
    <>
      <span className="type-title-4 text-text-strong">{label}</span>
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
 * The curve the duration panel animates on, so only the length varies between its
 * rows.
 *
 * By name and not by index: the easing family is ordered from its null stop, so
 * the first entry is `linear` and every duration would demo without a curve.
 */
const standardEasing = easing.find((e) => e.name === "ease-standard") ?? easing[0]

/**
 * The column names every guidance list on this page opens with.
 *
 * Written once because there are seven of them. `Guidance` makes the header
 * opt-in for exactly this case — a list that unfolds out of an accordion arrives
 * with no run-up, so the two columns have to say what they are.
 */
const GUIDANCE_PROPS = {
  header: { rule: "Rules", example: "Example" },
  // Matched to the token tables' preview column, so a rule's text starts where the
  // token names above it start. Read from TokenKit rather than restated, because an
  // alignment that depends on two numbers agreeing only holds until one moves.
  gutter: PREVIEW_WIDTH,
}

/**
 * How the three scalars compose, next to the three tokens rather than above the
 * whole section.
 *
 * Two paragraphs, because the table below already carries a note per token saying
 * what each one drives. Everything those notes cover is left to them — what is
 * here is only what a per-token note cannot hold: the arithmetic that makes a stop
 * readable, since `space-3` means nothing until you know it is three of something,
 * and the relationship between the dials, which is a fact about the pair.
 *
 * No values. They are in the table, generated, and a sentence carrying `0.25rem`
 * would be a second copy free to go stale.
 *
 * Border earns its clause. It is the one family that counts in whole pixels rather
 * than on the grid, and the copy this replaces had it scaling with density, which
 * it has never done.
 */
function ScalarNotes() {
  return (
    <div className="flex flex-col gap-3">
      <Para>
        A stop is its own number times the grid unit times the density dial, so{" "}
        <Code>--db-space-3</Code> is three grid steps and a density of 1.25 moves it without a
        single stop being rewritten. Border is the exception — it ships as literal pixels, because a
        hairline that scales with the layout stops being a hairline.
      </Para>
      <Para>
        The two dials are separate so text and boxes can move independently:{" "}
        <Code>--db-type-scalar</Code> grows the ramp inside a control without growing the control.
        The third lever is not a token at all — the grid unit is authored in rem, so the root font
        size multiplies every stop at once, which is what the footer's scale control changes and
        what a reader's own browser setting changes.
      </Para>
    </div>
  )
}

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
    // No preview. Three tokens with one value each is not a ramp, and a strip of
    // three identical tiles would claim a progression that is not there.
    render: (
      <div className="flex flex-col gap-4">
        <ScalarNotes />
        <ScalarList tokens={scalars} consumption={scalarConsumption} drives={DRIVES} />
      </div>
    ),
  },
  {
    key: "space",
    label: "Space",
    preview: <ScaleStrip tokens={space} kind="width" />,
    render: <SpaceScale tokens={space} />,
    guidance: {
      dos: [
        <>
          Read the stop as the multiple, so the token and the class carry the same number —{" "}
          <Code>--db-space-3</Code> is <Code>p-3</Code>. Nothing to look up in either direction.
        </>,
        <>
          Reach for the rhythm before the stop: 16px between sections, 8px within a component, 24px
          where a dense layout needs a real break. Anything from 1 to 4px belongs inside a control
          and nowhere else.
        </>,
      ],
      donts: [
        <>
          Reach for a step off this scale. <Code>p-1.5</Code> renders 6px and compiles, because
          Tailwind&rsquo;s multiplier is still declared — so nothing fails. It just ships a distance
          with no token behind it, which the density dial cannot move. <Code>off-scale-spacing</Code>,{" "}
          <Code>prefer-token-class</Code>.
        </>,
      ],
    },
  },
  {
    key: "size",
    label: "Size",
    preview: <ScaleStrip tokens={size} kind="width" />,
    render: <SizeScale tokens={size} />,
    guidance: {
      dos: [
        <>
          Expect one stop to drive three namespaces — <Code>size-8</Code>, <Code>h-8</Code> and{" "}
          <Code>w-8</Code> are all 32px. Control heights and icon boxes used to be separate
          families, which gave a 24px control and a 24px icon two different names.
        </>,
      ],
      donts: [
        <>
          Carry a stop across families. Each keeps only what it uses, so 5, 7 and 12 are heights that
          are never paddings, and the half step is a padding that is never a height.{" "}
          <Code>off-scale-size</Code>.
        </>,
        <>
          Move <Code>--db-size-4</Code> or the <Code>label</Code> line box on its own. Both are 16px,
          and changing one breaks text-and-icon alignment in every row.
        </>,
      ],
    },
  },
  {
    // Above Radius on purpose. A role is what a reader should reach for, and
    // listing the raw stops first would bury it.
    key: "shape",
    label: "Shape",
    preview: <ScaleStrip tokens={shape} kind="radius" />,
    render: <RadiusScale tokens={shape} />,
    guidance: {
      dos: [
        <>
          Reach for a <Code>shape-*</Code> role rather than a radius stop. Controls, containers and
          pills each name their own, so the mapping lives in the role instead of in a sentence about
          it.
        </>,
        <>
          Pick between the container roles by what the thing is. <Code>shape-container</Code> is for
          what floats over the page — a dialog, a menu. <Code>shape-container-lg</Code> is for what
          is the page, like a card or a drawer.
        </>,
      ],
      donts: [
        <>
          Read the strip above as a ramp. These are roles, so it runs 0, 4, pill, 8, 16, pill — and
          that break is the useful part: a default-size control is a pill where a small one is 4px.
        </>,
      ],
    },
  },
  {
    key: "radius",
    label: "Radius",
    preview: <ScaleStrip tokens={radius} kind="radius" />,
    render: <RadiusScale tokens={radius} />,
    guidance: {
      dos: [
        <>
          Expect a stale corner to render square. The old <Code>sm</Code>/<Code>md</Code>/
          <Code>lg</Code> names are closed rather than left pointing at Tailwind, whose scale
          disagrees with this one at every step — so a class the rename missed emits no corner
          instead of a plausible wrong one.
        </>,
      ],
      donts: [
        <>
          Assume every <Code>rounded-*</Code> is ours. <Code>rounded-xs</Code> and{" "}
          <Code>rounded-4xl</Code> are Tailwind&rsquo;s and are not on this scale. An arbitrary corner is
          caught outright: <Code>non-token-radius</Code>.
        </>,
      ],
    },
  },
  {
    key: "border",
    label: "Border",
    preview: <ScaleStrip tokens={borderWidth} kind="border" />,
    render: <BorderScale tokens={borderWidth} />,
    guidance: {
      dos: [
        <>
          Expect <Code>--db-border-1</Code> to stay 1px at every density and every root size. A
          hairline is a rendering fact rather than a proportion, which makes this the one family
          that counts in whole pixels instead of on the grid.
        </>,
      ],
      donts: [
        <>
          Confuse this family with the border <em>colors</em>. These are widths.{" "}
          <Code>border-*</Code> and <Code>input-border-*</Code> are under Color.
        </>,
      ],
    },
  },
]

/**
 * The rules that belong to one color family, keyed so a family without any simply
 * renders none.
 *
 * The `input-border` rule sits under Structure rather than under Interaction,
 * where that family actually lives. Guidance belongs where the wrong choice is
 * available: someone about to put a decorative border on a text field is looking
 * at Structure's seven border tokens, and telling them there is a darker family
 * for fields is only useful before they pick.
 */
const TYPE_GUIDANCE: Record<string, { dos: React.ReactNode[]; donts: React.ReactNode[] }> = {
  // Keyed off the lowercased group label, which is what `typeRegisters` derives.
  interface: {
    dos: [
      <>
        Reach here for text that is glanced at rather than read — a label, a cell, a hint. The line
        boxes are tight on purpose, and <Code>flush</Code> equals the 16px icon box so text and icon
        align in a row without adjustment.
      </>,
      <>
        Put <Code>numeric</Code> on a table cell holding numbers rather than reaching for a type
        class. It right-aligns them too.
      </>,
    ],
    donts: [
      <>
        Use <Code>type-label</Code> for text that wraps. It and <Code>type-body</Code> are the same
        size and differ only in leading, so it looks right until a second line appears.
      </>,
      <>
        Bold <Code>type-code</Code>. There is no bold code style, because a monospace face at this
        size goes muddy rather than emphatic — color carries emphasis in code.
      </>,
    ],
  },
  reading: {
    dos: [
      <>
        Reach here for text followed in sequence — a paragraph, a fenced block. The leading is looser
        because the eye has to find the next line rather than the next field.
      </>,
    ],
    donts: [
      <>
        Take a reading style for a label or a cell. It is two steps larger than the interface set, so
        one in a table row makes that row taller than every other.
      </>,
    ],
  },
  display: {
    dos: [
      <>
        Reach here for headings, which are scanned rather than read. Four steps, and the gap between
        them is what makes a hierarchy legible at a glance.
      </>,
    ],
    donts: [
      <>
        Assume mobile is desktop scaled up. Interface and reading text grow there while the largest
        display step <em>shrinks</em>, because a title that fits one line on a laptop wraps to three
        on a phone.
      </>,
    ],
  },
}

/**
 * Two Dos and two Don'ts for every family, in the same order each time: what the
 * family is for, what to do when two families could apply, then the two mistakes
 * that get made.
 *
 * The shape is the point. These were lopsided — one family had five items and two
 * had a single Don't between them — and a reader who opens four panels and finds a
 * different kind of help in each stops opening them. Scope first, because the
 * question that brings someone to a family is whether they are in the right one.
 *
 * Nothing here repeats a rule that holds for all four. Those sit once under the
 * panels, the way Type's two shared rules do.
 */
const COLOR_GUIDANCE: Record<string, { dos: React.ReactNode[]; donts: React.ReactNode[] }> = {
  structure: {
    dos: [
      <>
        Put chrome on the stronger surface and content on the lightest. Chrome is darker than
        content here, which is the opposite of several systems and the thing most often got backward.
      </>,
      <>
        Read the text colors as a closed ladder — <Code>strong</Code> for headings,{" "}
        <Code>base</Code> for body, <Code>subtle</Code> for metadata, <Code>disabled</Code> for what
        cannot be used. There is no fifth rung, and opacity is not one.
      </>,
      <>
        Prefer the more specific family when two could apply. A field&rsquo;s border is{" "}
        <Code>input-border-*</Code> and an alert&rsquo;s background is <Code>status-surface-*</Code>,
        so Structure is the fallback rather than the first look.
      </>,
    ],
    donts: [
      <>
        Reach for <Code>surface-base</Code> to look raised. It means the page. On{" "}
        <Code>surface-subtle</Code> it reads as above in light and below in dark, so it needs a
        border or <Code>dark:bg-surface-strong</Code> — a shadow alone will not fix dark.
      </>,
      <>
        Put one surface&rsquo;s text on another. Each surface has a foreground that belongs on it,
        and <Code>text-inverse</Code> on <Code>surface-base</Code> is white on white.
      </>,
      <>
        Take <Code>border-*</Code> on a form control. It is decorative and lighter, so the field
        stops reading as editable — <Code>input-border-*</Code> is the darker set for exactly this.
      </>,
    ],
  },
  interaction: {
    dos: [
      <>
        Reach here for anything a pointer or a key operates — a control&rsquo;s fill, its label, its
        border, its focus ring or a link.
      </>,
      <>
        Take the authored stop for a state. <Code>action-primary-hover</Code> is a value of its own,
        not <Code>action-primary-base</Code> at reduced opacity, and the two do not match.
      </>,
      <>
        Hover a large target with <Code>surface-hover</Code> and a control with{" "}
        <Code>action-default-hover</Code>. The control wash reads as a tint on something
        button-sized and as a fill across a whole card, where it drags the text contrast down with
        it.
      </>,
    ],
    donts: [
      <>
        Fill a button with blue. Blue is the link and selection accent here, and a blue fill makes
        every selected row look like a primary action.
      </>,
      <>
        Suppress the focus ring. <Code>focus-ring</Code> and <Code>focus-ring-offset</Code> are all a
        keyboard reader has, and an <Code>outline-none</Code> with nothing in its place fails WCAG
        2.4.11.
      </>,
    ],
  },
  status: {
    dos: [
      <>
        Reach here when the color reports what happened — a result, a warning, an error or a note.
        Each state ships a surface, a border and a text color that belong together.
      </>,
      <>
        Pair the color with a label or an icon. Two of the four hues are close for a reader who
        cannot separate them, so the color is never the whole signal.
      </>,
    ],
    donts: [
      <>
        Collapse the status and action families. <Code>action-positive-base</Code> fills the button
        that confirms, and <Code>status-text-positive</Code> reports that it worked — one is a thing
        you press, the other is a thing that happened.
      </>,
      <>
        Use a status color for emphasis. A <Code>warning</Code> badge on something that is not a
        warning teaches a reader to stop trusting the next one.
      </>,
      <>
        Put <Code>text-base</Code> on a status surface. Each state carries its own{" "}
        <Code>status-text-*</Code>, tuned for the surface it sits on.
      </>,
    ],
  },
  viz: {
    dos: [
      <>
        Reach here only inside a chart. Categorical for series with no order, sequential for
        magnitude.
      </>,
      <>
        Take categorical stops in order from <Code>viz-categorical-1</Code>. The sequence is tuned so
        neighbors stay apart, and skipping puts two near hues beside each other.
      </>,
    ],
    donts: [
      <>
        Take a <Code>viz-*</Code> color for interface chrome. These separate from each other inside a
        chart rather than sitting under text or behind a control.
      </>,
      <>
        Encode ordered data with categorical stops. Ten unordered hues on a magnitude scale read as
        ten categories, and the ranking disappears — <Code>viz-sequential-*</Code> is the ordered
        set.
      </>,
    ],
  },
}

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

  /**
   * Which density the dimension previews are drawn at. Local to the section, like
   * the color and type-context switches, and it writes nothing outside it.
   */
  const [density, setDensity] = useDensity()

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
      >
        <DocAccordion variant="list" defaultValue={[]} sticky>
          {colorFamilies.map((family) => (
            <DocAccordionItem
              key={family.key}
              value={family.key}
              variant="list"
              header={
                <PanelHeader
                  label={family.label}
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
                    <ColorTable
                      group={group}
                      mode={mode}
                      surfaces={SURFACES[mode]}
                      functionLabel={family.label}
                      limit={5}
                    />
                  </div>
                ))}
                {COLOR_GUIDANCE[family.key] ? (
                  <Guidance {...COLOR_GUIDANCE[family.key]} {...GUIDANCE_PROPS} />
                ) : null}
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
      >
        <DocAccordion variant="list" defaultValue={[]} sticky>
          {TYPE_REGISTERS.map((register) => (
            <DocAccordionItem
              key={register.key}
              value={register.key}
              variant="list"
              header={
                <PanelHeader
                  label={register.label}
                  preview={<TypeStrip steps={register.steps} />}
                />
              }
            >
              <div className="flex flex-col gap-4">
                <TypeScale
                  steps={register.steps}
                  use={TYPE_USE}
                  register={register.label}
                  contexts={typeContexts}
                  context={typeContext}
                  contextAttribute={typeContextAttribute}
                />
                {TYPE_GUIDANCE[register.key] ? (
                  <Guidance {...TYPE_GUIDANCE[register.key]} {...GUIDANCE_PROPS} />
                ) : null}
              </div>
            </DocAccordionItem>
          ))}
        </DocAccordion>
      </Section>

      {/*
        Shadow, layer, duration and easing under one heading, because none of them
        is a measurement. Every family in Dimensions resolves to a multiple of
        `--db-spacing-unit`. A shadow is alpha, a layer is a count and a duration is
        time, and none of the three counts on that unit.

        Ahead of Dimensions, because these are what a screen looks like and
        Dimensions is the grid underneath it — reference a builder consults rather
        than a decision they browse.

        The control governs the Shadows panel alone. It is the one family with a
        value per color mode, so it is the one that needs a way to see the other.
      */}
      <Section
        id="effects"
        title="Effects"
        scope="Shadow, layer, duration and easing — what gets applied to an element rather than what measures it."
        control={
          <ColorModeOverride
            value={elevationMode}
            onValueChange={setElevationMode}
            label="Preview elevation mode"
          />
        }
      >
        {/*
          The keyframes are rendered once for the section rather than by each motion
          scale, so the document carries one copy of the rule.
        */}
        <MotionKeyframes />
        <DocAccordion variant="list" defaultValue={[]} sticky>
          {/*
            One panel for elevation, not five. It is a single family of five stops,
            the same shape Dimensions gives Space or Radius — a panel per stop would
            ask a reader to open something to see one shadow.
          */}
          <DocAccordionItem
            value="shadows"
            variant="list"
            header={
              <PanelHeader
                label="Shadows"
                preview={
                  <ElevationStrip
                    tokens={elevation}
                    mode={elevationMode}
                    surface={SURFACES[elevationMode].base}
                    border={SURFACES[elevationMode].borderSubtle}
                  />
                }
              />
            }
          >
            <div className="flex flex-col gap-4">
              <ElevationScale
                tokens={elevation}
                mode={elevationMode}
                surface={SURFACES[elevationMode].base}
                border={SURFACES[elevationMode].borderSubtle}
              />
              <Guidance
                {...GUIDANCE_PROPS}
                dos={[
                  <>
                    Read the scale by what the surface is doing, not by how far off the page it sits.
                    <Code>xs</Code> is an edge still on the page and <Code>xl</Code> has taken the
                    page over. Where two overlap, the higher step goes on top.
                  </>,
                  <>
                    Expect this to be the one family with two value sets. The geometry is identical
                    in both — only alpha moves, because an opaque-black shadow tuned for white draws
                    nothing on a dark surface.
                  </>,
                ]}
                donts={[
                  <>
                    Reach for a shadow where a border would do. Borders do the work shadows do in
                    other systems here, so if both would read, the border is the answer.
                  </>,
                  <>
                    Elevate a card at rest. A resting card is a hairline and nothing more — elevation
                    on a card means you can press it, which is why the interactive stops start at{" "}
                    <Code>xs</Code>.
                  </>,
                  <>
                    Reach for a <Code>shadow-*</Code> step outside this list.{" "}
                    <Code>shadow-2xs</Code>, <Code>shadow-2xl</Code> and <Code>shadow-inner</Code>{" "}
                    are Tailwind&rsquo;s own and have no token behind them.
                  </>,
                ]}
              />
            </div>
          </DocAccordionItem>
          <DocAccordionItem
            value="layer"
            variant="list"
            header={<PanelHeader label="Layer" preview={<LayerStrip tokens={layer} />} />}
          >
            <div className="flex flex-col gap-4">
              <LayerScale tokens={layer} />
              <Guidance
                {...GUIDANCE_PROPS}
                dos={[
                  <>
                    Name the role rather than a number. <Code>z-popover</Code> says what the thing
                    is, and the order between roles is then the system&rsquo;s to keep rather than
                    each call site&rsquo;s to guess.
                  </>,
                  <>
                    Expect a popover to clear a modal. A select opened inside a dialog has to render
                    over the dialog that contains it, which is the one ordering a flat scale cannot
                    express.
                  </>,
                ]}
                donts={[
                  <>
                    Write a bare <Code>z-50</Code>. It still compiles, because Tailwind mints those
                    from the number rather than the namespace — so it silently ties with whatever
                    else claimed 50 and the winner becomes whichever mounted last.
                  </>,
                  <>
                    Reach for <Code>raised</Code> to sit above the page. It lifts something over its
                    own siblings, nothing more — page chrome takes <Code>sticky</Code>.
                  </>,
                  <>
                    Stack two dialogs. One at a time, whatever the layers permit — a second modal
                    over the first leaves no way to read which question is being asked.
                  </>,
                ]}
              />
            </div>
          </DocAccordionItem>
          {/*
            Duration and easing stay apart, each holding one variable: duration
            varies the length at a fixed curve, easing varies the curve at a fixed
            length. In one table a reader could not tell which of the two a given
            row was demonstrating.

            Both read from the generated data rather than retyped. The curve was
            written out here as a literal once, which is the one thing a token page
            must not do — a value restated is a value that goes stale.
          */}
          <DocAccordionItem
            value="duration"
            variant="list"
            header={<PanelHeader label="Duration" preview={<MotionStrip tokens={duration} />} />}
          >
            <div className="flex flex-col gap-4">
              <MotionScale tokens={duration} easing={standardEasing} />
              <Guidance
                {...GUIDANCE_PROPS}
                dos={[
                  <>
                    Guard an animation with <Code>motion-safe:</Code>. A duration token says how long
                    to move, never whether to — and a reader who asks their system for reduced motion
                    has told you the answer.
                  </>,
                  <>
                    Let a bare <Code>transition</Code> carry the default. It reads{" "}
                    <Code>--db-duration-fast</Code>, so a transition needs a duration class only when
                    it wants a different one.
                  </>,
                ]}
                donts={[
                  <>
                    Write a duration as a class. <Code>duration-slow</Code> emits nothing, because{" "}
                    <Code>--duration-*</Code> is not a Tailwind namespace. Name the token instead:{" "}
                    <Code>duration-[var(--db-duration-slow)]</Code>.
                  </>,
                ]}
              />
            </div>
          </DocAccordionItem>
          <DocAccordionItem
            value="easing"
            variant="list"
            header={<PanelHeader label="Easing" preview={<EasingStrip easings={easing} />} />}
          >
            <div className="flex flex-col gap-4">
              {/*
              `slow`, named rather than taken as the last stop. `loop` is longer and
              now sits at the end of the family, but it is a period rather than a
              transition length — demoing a curve over a full second would show the
              easing of something that never eases.
            */}
            <EasingScale
              easings={easing}
              duration={duration.find((d) => d.name === "duration-slow") ?? duration[0]}
            />
              <Guidance
                {...GUIDANCE_PROPS}
                dos={[
                  <>
                    Pick the curve by the job. <Code>standard</Code> for something arriving or
                    settling, <Code>exit</Code> for something leaving, <Code>linear</Code> for
                    anything that loops.
                  </>,
                  <>
                    Take <Code>linear</Code> for a spinner or a progress indicator. A loop has no
                    start to ease out of, so any other curve visibly stutters once per revolution.
                  </>,
                ]}
                donts={[
                  <>
                    Reach for <Code>ease-in</Code> or <Code>ease-out</Code>. Both are closed and emit
                    no timing function, which is deliberate — a transition on a curve nobody chose
                    looks like one on ours until the two are put side by side.
                  </>,
                ]}
              />
            </div>
          </DocAccordionItem>
        </DocAccordion>
      </Section>

      <Section
        id="dimensions"
        title="Dimensions"
        control={
          <DensityControl
            value={density}
            onValueChange={setDensity}
            label="Preview density"
          />
        }
        // Names the families and stops there. How the three scalars compose used to
        // be stated here, which put a paragraph of arithmetic above a list of
        // collapsed panels — the reader had to work through it to reach the thing
        // they came for. It lives in the Scalars panel now, next to the tokens it
        // is about, and the heading stays a way in rather than a lesson.
        scope="What an interface is measured on: space, size, shape, radius and border."
      >
        {/*
          The dial is set here rather than on the section, so the heading and its
          description stay at the shipped density while the specimens move. A reader
          comparing two densities should not have the sentence describing them resize
          underneath the comparison.
        */}
        <div style={densityStyle(density, [space, size, shape, radius, borderWidth])}>
        {/*
          Values then rules, in the same panel. They were one list at the foot of
          the page for a while, which read as a page of tables followed by a page
          of prose about tables — a reader who opened Radius had to hold its stops
          in mind while scrolling past three other families to find the rule that
          governed them. Panel-local is what makes the pair legible.
        */}
        <DocAccordion variant="list" defaultValue={[]} sticky>
          {DIMENSIONS.map((entry) => (
            <DocAccordionItem
              key={entry.key}
              value={entry.key}
              variant="list"
              header={<PanelHeader label={entry.label} preview={entry.preview} />}
            >
              <div className="flex flex-col gap-4">
                {entry.render}
                {entry.guidance ? <Guidance {...entry.guidance} {...GUIDANCE_PROPS} /> : null}
              </div>
            </DocAccordionItem>
          ))}
        </DocAccordion>
        </div>
      </Section>

      <Section
        id="tools"
        title="Tools"
        scope="Nothing here has to be read off this page. Every dbui command takes --json."
      >
        {/*
          `mono` stays off the Tool column. It is a per-column switch, and this
          column holds a badge beside a command — the code element carries the
          face so the label does not.
        */}
        <RefTable
          columns={[
            { key: "job", header: "Use" },
            { key: "tool", header: "Tool", width: "w-[420px]" },
          ]}
          rows={JOBS.map((job) => ({ job: job.job, tool: <ToolList job={job} /> }))}
        />
      </Section>
    </>
  )
}
