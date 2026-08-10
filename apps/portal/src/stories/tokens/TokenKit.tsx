/**
 * Visual previews for the Tokens page. Each family gets a preview that shows the
 * token doing its job — a radius as a rounded corner, a duration as a moving
 * box — rather than a value in a table. A number tells you what a token is; only
 * a preview tells you when to reach for it.
 *
 * Every family renders through one row: the preview on the left, the name and
 * what it resolves to on the right. The families used to each argue for their
 * own shape — color had swatch pairs and contrast chips, type had full-measure
 * specimens and a column per breakpoint, elevation had a grid of cards — and the
 * result was that moving between two sections meant learning where the value had
 * gone. `TokenTable` owns the shape now, and a family contributes only the three
 * things that differ: what its preview looks like, what its value reads as, and
 * the one editorial line the value cannot carry.
 */
import * as React from "react"

import { Button } from "dbui/components/ui/button"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronUp } from "dbui/components/icons/ChevronUp"

import type { ColorGroup, ColorToken, ModeToken, Token, TypeContext, TypeStep } from "./token-data"
import type { Scalar } from "./token-consumption"

/**
 * The preview column, fixed for every family so the names line up down the whole
 * page rather than per table.
 *
 * 120px, because the widest preview any family has is a `size-12` square at
 * 48px and the roomiest is motion, whose dot needs somewhere to travel before a
 * duration reads as a duration. Off the space and size scales on purpose: this
 * is a column width in a documentation table, not a control or a gap.
 */
const PREVIEW = "w-[120px] shrink-0"

/** What a family calls the thing in its preview column. */
export type PreviewLabel = "Color" | "Style" | "Preview"

export type TokenRow = {
  /** Stable across a re-sort, so React keeps the motion previews mounted. */
  key: string
  preview: React.ReactNode
  /** Written the way it is written in code — the `--db-` var, or the class. */
  name: string
  /** What it resolves to. One line, compact, never a sentence. */
  value: React.ReactNode
  /**
   * The one thing about a token that is not a value: which step to pick, or
   * whether a color passes on the surface it is for. Optional, because most
   * families have nothing here and an empty line is better than an invented one.
   */
  note?: React.ReactNode
  /** The full expression, for the reader who wants the arithmetic. */
  title?: string
}

/**
 * A grouped table of tokens: a header naming the two columns, then one row each.
 *
 * `limit` collapses a long group behind a row inside the card rather than a
 * button under it. Color runs to twenty-one rows in one group, and a control
 * that sits outside the card reads as belonging to the section rather than to
 * the table it opens.
 */
export function TokenTable({
  label,
  unit,
  rows,
  limit,
}: {
  label: PreviewLabel
  /** What the show-all row counts, in the reader's words — "surface colors". */
  unit?: string
  rows: TokenRow[]
  limit?: number
}) {
  const [expanded, setExpanded] = React.useState(false)
  const hidden = limit === undefined ? 0 : Math.max(0, rows.length - limit)
  const shown = hidden && !expanded ? rows.slice(0, limit) : rows

  return (
    <div
      className="overflow-hidden rounded-2 border border-border-base bg-surface-base"
      style={{ margin: 0 }}
    >
      <div className="flex items-baseline gap-4 border-b border-border-base bg-surface-subtle px-4 py-2">
        <span className={`type-eyebrow ${PREVIEW} text-text-subtle`}>{label}</span>
        <span className="type-eyebrow min-w-0 flex-1 text-text-subtle">Name</span>
      </div>
      {shown.map((row, i) => (
        <div
          key={row.key}
          className={`flex items-center gap-4 px-4 py-3 ${
            i === shown.length - 1 && !hidden ? "" : "border-b border-border-subtle"
          }`}
        >
          <div className={`flex ${PREVIEW} items-center`}>{row.preview}</div>
          <div className="flex min-w-0 flex-1 flex-col">
            <code className="type-code text-text-base" title={row.title}>
              {row.name}
            </code>
            <span className="type-hint break-words text-text-subtle">{row.value}</span>
            {row.note ? <span className="type-hint text-text-subtle">{row.note}</span> : null}
          </div>
        </div>
      ))}
      {hidden ? (
        <div className="px-4 py-2">
          <Button size="sm" variant="ghost" onClick={() => setExpanded((e) => !e)}>
            {expanded ? "Show fewer" : `Show all ${rows.length} ${unit ?? "tokens"}`}
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

/**
 * What a token is worth, at the default root, resolved by the generator rather
 * than here — the browser could compute it, but then the page and the spec an
 * engineer reviews would each have their own answer.
 *
 * Falls back to the written value for the families that have no single px
 * answer: a duration, a shadow, an em step, a multiplier.
 */
const px = (token: Token) => (token.px === null ? token.value : `${token.px}px`)

/** `12px · 3 × unit`, with the multiple dropped where a family does not have one. */
const scaleValue = (token: Token) =>
  [px(token), token.multiple === null ? null : `${token.multiple} × unit`]
    .filter(Boolean)
    .join(" · ")

/* ── Color ─────────────────────────────────────────────────────────────── */

/**
 * A color as channels, compositing any alpha over the surface it is painted on.
 *
 * The backdrop is a parameter rather than white. Half the structure family is
 * written as `rgba(0, 0, 0, 0.03)`, and compositing those over white while the
 * preview shows them over the dark surface reported a ratio for a color that
 * was not on screen.
 */
function toRgb(value: string, over: [number, number, number]): [number, number, number] | null {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = parseInt(hex[1], 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const rgba = value.trim().match(/^rgba?\(([^)]+)\)$/i)
  if (rgba) {
    const p = rgba[1].split(",").map((x) => parseFloat(x))
    const a = p[3] ?? 1
    return [
      Math.round(p[0] * a + over[0] * (1 - a)),
      Math.round(p[1] * a + over[1] * (1 - a)),
      Math.round(p[2] * a + over[2] * (1 - a)),
    ]
  }
  return null
}

/** WCAG 2.1 relative luminance. */
function luminance([r, g, b]: [number, number, number]) {
  const f = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** The two surfaces a foreground is judged against, in the mode being previewed. */
export type Surfaces = { base: string; inverse: string }

function ratioOn(a: string, b: string, backdrop: string): number | null {
  const over = toRgb(backdrop, [255, 255, 255])
  if (!over) return null
  const ca = toRgb(a, over)
  const cb = toRgb(b, over)
  if (!ca || !cb) return null
  const la = luminance(ca)
  const lb = luminance(cb)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/**
 * Whether a foreground passes on the surface it is for, as words rather than a
 * chip.
 *
 * The chip was a fourth thing in the row, and a row with a chip and a row
 * without were visibly two shapes. The verdict is the same fact, on the note
 * line every other family uses for the thing its value cannot say.
 */
function verdict(t: ColorToken, mode: "light" | "dark", surfaces: Surfaces): string | null {
  // Only foreground tokens have a meaningful ratio against a surface.
  if (!/^(text|link|status-text|action-label)/.test(t.name)) return null
  // WCAG 1.4.3 exempts disabled controls from the contrast minimum.
  if (/disabled/.test(t.name)) return "Exempt — WCAG does not hold disabled text to a minimum."
  // Inverse foregrounds are designed for the inverse surface, so measuring them
  // against the base one would report a failure that is not there.
  const against = /inverse/.test(t.name) ? surfaces.inverse : surfaces.base
  const ratio = ratioOn(t[mode], against, surfaces.base)
  if (ratio === null) return null
  const r = Math.round(ratio * 100) / 100
  // 4.5:1 is the WCAG AA threshold for body text; 3:1 for large text and UI.
  const grade = r >= 4.5 ? "AA" : r >= 3 ? "AA large only" : "fails AA"
  return `${r}:1 on ${/inverse/.test(t.name) ? "surface-inverse" : "surface-base"} · ${grade}`
}

/**
 * One swatch, in the mode the section is set to.
 *
 * Painted on the mode's own base surface rather than the page's, because a third
 * of this family is a translucent overlay and an alpha over the wrong backdrop
 * is a different color.
 */
function Swatch({ color, on }: { color: string; on: string }) {
  return (
    <span
      className="block size-10 overflow-hidden rounded-1 border border-border-base"
      style={{ background: on }}
    >
      <span className="block size-full" style={{ background: color }} />
    </span>
  )
}

/** A group of colors, in one mode. The switch above the section picks which. */
export function ColorTable({
  group,
  mode,
  surfaces,
  limit = 5,
}: {
  group: ColorGroup
  mode: "light" | "dark"
  surfaces: Surfaces
  limit?: number
}) {
  return (
    <TokenTable
      label="Color"
      // "colors" rather than "tokens", because that is the unit the section
      // counts this family in. Two words for one set invites the reader to
      // wonder whether they are two sets.
      unit={`${group.label.toLowerCase()} colors`}
      limit={limit}
      rows={group.tokens.map((t) => ({
        key: t.name,
        preview: <Swatch color={t[mode]} on={surfaces.base} />,
        name: `--db-${t.name}`,
        value: t[mode],
        note: verdict(t, mode, surfaces),
      }))}
    />
  )
}

/**
 * The family, at a glance, for a reader deciding whether to open it.
 *
 * Semantic values rather than the primitive ramp the Figma file shows in this
 * slot: primitives do not ship as CSS, so there is nothing here to name them
 * from. What it costs is that the strip is a sample of the family rather than
 * its palette, which is why it carries no labels and no count.
 */
export function ColorStrip({
  tokens,
  mode,
  limit = 12,
}: {
  tokens: ColorToken[]
  mode: "light" | "dark"
  limit?: number
}) {
  return (
    <span aria-hidden="true" className="flex flex-wrap gap-1">
      {tokens.slice(0, limit).map((t) => (
        <span
          key={t.name}
          className="block size-6 rounded-1 border border-border-base"
          style={{ background: t[mode] }}
        />
      ))}
    </span>
  )
}

/* ── Space ──────────────────────────────────────────────────────────────── */

/**
 * A step, what it resolves to, and how many grid steps that is.
 *
 * The row used to print the step's own name back at the reader — `3xs` beside
 * `--db-space-3xs` — which restated the token and left the value unstated. The
 * value is four var() indirections deep, so nobody could tell whether the step
 * was 2px or 20px without opening the CSS.
 *
 * The multiple is what turns nine numbers into a scale. It also shows where the
 * value comes from: 0.5 of the grid unit is why `3xs` is what it is.
 */
export function SpaceScale({ tokens }: { tokens: Token[] }) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        // No minimum width. The bar carried one so every row had something to
        // show, which drew a 1px mark beside a step that states 0px.
        preview: (
          <span
            className="block h-4 rounded-xs bg-action-primary-base"
            style={{ width: `var(--db-${t.name})` }}
          />
        ),
        name: `--db-${t.name}`,
        value: scaleValue(t),
        title: t.value,
      }))}
    />
  )
}

/* ── Radius ─────────────────────────────────────────────────────────────── */

/**
 * The corner, at the size the preview column allows.
 *
 * This was a grid of 64px cards, which read better as a corner and worse as a
 * scale — nine radii in three rows are compared across a wrap rather than down
 * a column. px rather than the shipped rem, so radius and space are read in the
 * same unit; the rem is on the name's hover.
 */
export function RadiusScale({ tokens }: { tokens: Token[] }) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        preview: (
          <span
            className="block size-10 border-2 border-action-primary-base bg-surface-accent"
            style={{ borderRadius: `var(--db-${t.name})` }}
          />
        ),
        name: `--db-${t.name}`,
        value: px(t),
        title: t.value,
      }))}
    />
  )
}

/* ── Size ───────────────────────────────────────────────────────────────── */

/**
 * A stop is a square, because the family drives width and height from one
 * number. It used to be two scales — a 120px-wide bar for control heights and a
 * square for icon boxes — which put two names and two pictures on the same
 * value: a 24px control was `element-sm` and a 24px icon was `icon-xl`.
 */
export function SizeScale({ tokens }: { tokens: Token[] }) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        preview: (
          <span
            className="block rounded-xs bg-action-primary-base"
            style={{ height: `var(--db-${t.name})`, width: `var(--db-${t.name})` }}
          />
        ),
        name: `--db-${t.name}`,
        value: scaleValue(t),
        title: t.value,
      }))}
    />
  )
}

/* ── Border width ───────────────────────────────────────────────────────── */

export function BorderScale({ tokens }: { tokens: Token[] }) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        preview: (
          <span
            className="block size-10 rounded-1 border-border-strong bg-surface-base"
            style={{ borderWidth: `var(--db-${t.name})`, borderStyle: "solid" }}
          />
        ),
        name: `--db-${t.name}`,
        value: px(t),
        title: t.value,
      }))}
    />
  )
}

/* ── Elevation ──────────────────────────────────────────────────────────── */

/**
 * A shadow needs an edge to be cast from, so the preview keeps its hairline —
 * without one the lowest stop and `none` are the same empty square.
 *
 * It also needs the surface it was tuned for. This family ships two value sets
 * because an opaque-black shadow that reads on white draws nothing on a dark
 * surface, so the preview paints the mode's own `surface-base` behind the swatch
 * and clips to it. Without that backdrop, previewing dark on a light page throws
 * a 0.87-alpha shadow onto white — which is not what the token does anywhere,
 * and is worse than not offering the preview.
 *
 * Values are read from the token rather than through `var()` for the same
 * reason: `var(--db-elevation-xl)` resolves against whatever mode the document
 * is in, so it could only ever show one of the two.
 *
 * Nothing about the family is written here. The stops are whatever the generator
 * emits, in whatever order it emits them, so a renaming pass changes this table
 * without touching this file.
 */
export function ElevationScale({
  tokens,
  mode,
  surface,
  border,
}: {
  tokens: ModeToken[]
  mode: "light" | "dark"
  /** `surface-base` in the previewed mode — what the shadow is cast onto. */
  surface: string
  /** `border-subtle` in the previewed mode, so the hairline follows too. */
  border: string
}) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        preview: (
          <span
            // Clipped to the surface on purpose: past this edge the shadow would
            // fall on the page rather than on the mode being previewed. 80px is
            // what the top stop needs — a 32px swatch plus room either side for
            // a 40px blur offset 8px down — so the tallest one is the least
            // truncated it can be without the row growing again.
            className="flex h-20 w-full items-center justify-center overflow-hidden rounded-1"
            style={{ background: surface }}
          >
            <span
              className="block size-8 rounded-1"
              style={{ background: surface, boxShadow: t[mode], border: `1px solid ${border}` }}
            />
          </span>
        ),
        name: `--db-${t.name}`,
        value: t[mode],
      }))}
    />
  )
}

/* ── Motion ─────────────────────────────────────────────────────────────── */

/**
 * Duration only reads as duration when it moves; click to replay.
 *
 * The easing curve is a row rather than a parameter of the other rows. It ships
 * as a token and nothing on the page named it, which made the one family whose
 * whole job is a pair — how long, and how — look like it only had one half.
 */
export function MotionScale({ tokens, easing }: { tokens: Token[]; easing: Token }) {
  const [run, setRun] = React.useState(0)
  const track = (duration: string, curve: string) => (
    <span className="relative block h-6 w-full overflow-hidden rounded-1 bg-surface-subtle">
      <span
        key={run}
        className="absolute top-1 left-1 block size-4 rounded-xs bg-action-primary-base"
        // Out and back, so the difference between 150ms and 450ms is legible as
        // a difference in speed rather than end position.
        style={{ animation: `dbui-token-slide ${duration} ${curve} 2 alternate both` }}
      />
    </span>
  )
  return (
    <div className="flex flex-col gap-3" style={{ margin: 0 }}>
      <div>
        <Button size="sm" variant="outline" onClick={() => setRun((n) => n + 1)}>
          Play all
        </Button>
      </div>
      <TokenTable
        label="Preview"
        rows={[
          ...tokens.map((t) => ({
            key: t.name,
            preview: track(`var(--db-${t.name})`, easing.value),
            name: `--db-${t.name}`,
            value: t.value,
          })),
          {
            key: easing.name,
            preview: track(`var(--db-${tokens.at(-1)?.name ?? "duration-slow"})`, easing.value),
            name: `--db-${easing.name}`,
            value: easing.value,
            note: "Shown at the slowest duration, where the curve is easiest to read.",
          },
        ]}
      />
      <style>{`
        @keyframes dbui-token-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100% * 4)); }
        }
      `}</style>
    </div>
  )
}

/* ── Type ───────────────────────────────────────────────────────────────── */

/** A register of the ramp, named by how the reader takes the text in. */
export type TypeGroup = { label: string; blurb: string; steps: string[] }

/**
 * The ramp split into its registers, in ramp order.
 *
 * A group contributes its membership, never its order — the rows come out in
 * ramp order whatever order the group lists them in. A step no group claims
 * still gets a register of its own, so adding a style to the config cannot
 * silently drop it off the page that documents it.
 */
export function typeRegisters(steps: TypeStep[], groups: TypeGroup[]) {
  const claimed = new Set(groups.flatMap((g) => g.steps))
  return [
    ...groups.map((g) => ({
      key: g.label.toLowerCase(),
      label: g.label,
      blurb: g.blurb,
      steps: steps.filter((t) => g.steps.includes(t.name)),
    })),
    {
      key: "unclaimed",
      label: "Unclaimed",
      blurb: "In the ramp, in no register yet",
      steps: steps.filter((t) => !claimed.has(t.name)),
    },
  ].filter((register) => register.steps.length)
}

const WEIGHT_NAME: Record<string, string> = {
  "500": "Medium",
  "600": "Semibold",
  "700": "Bold",
}

/**
 * Size and leading come from the generated ramp rather than the caller. They
 * were caller-supplied strings, and `eyebrow` drifted to a size the config does
 * not give it — which is the whole argument for rendering a value instead of
 * writing it down.
 *
 * `use` stays a prop because it is the one thing here that is not a value:
 * which step to pick. That is editorial and belongs to the page.
 *
 * The specimen is `Aa` rather than a full sentence. That is what the shared row
 * costs this family — a table that showed `title-1` shrinking on a phone beside
 * `label` growing, at full measure, needed three wide columns and no other
 * family has anything to put in them.
 *
 * `context` picks which set of measurements the table is showing, and it has to
 * reach both halves of the row or it is worse than nothing: the number comes
 * from that context's steps, and the specimen carries the context attribute so
 * the CSS resolves the same way the number says it does. A mobile specimen
 * beside a desktop number would be the page lying about the thing it exists to
 * document.
 *
 * The attribute goes on the specimen and nowhere higher. On the section it
 * would take the headings, blurbs, names and values with it, and switching to
 * mobile on a desktop window would reflow a page of chrome to say something
 * about fourteen glyphs. One element each is the smallest scope that is honest,
 * and rendering one context inside another is what the subtree form is for.
 */
export function TypeScale({
  steps,
  use,
  contexts = [],
  context,
  contextAttribute,
}: {
  steps: TypeStep[]
  use: Record<string, string>
  contexts?: TypeContext[]
  /** Which context's measurements to render. Unset shows the default set. */
  context?: string
  contextAttribute?: string | null
}) {
  const selected = contexts.find((c) => c.name === context)

  /** A step in one context, falling back to the default set it does not restate. */
  const measure = (c: TypeContext, t: TypeStep) => {
    const step = c.steps.find((s) => s.name === t.name)
    return { size: step?.size ?? t.size, line: step?.line ?? t.line }
  }

  /**
   * Two styles are identical in every context by design. Saying so is not
   * redundancy: a row that sits still while every row around it moves reads as
   * a switch that missed one, and a reader cannot tell a deliberate match from
   * a bug by looking.
   */
  const sameEverywhere = (t: TypeStep) =>
    contexts.length > 1 &&
    new Set(
      contexts.map((c) => {
        const m = measure(c, t)
        return `${m.size} / ${m.line}`
      })
    ).size === 1

  const sameLabel = contexts.length === 2 ? "Same in both" : "Same in every context"

  return (
    <TokenTable
      label="Style"
      rows={steps.map((t) => {
        const m = selected ? measure(selected, t) : { size: t.size, line: t.line }
        return {
          key: t.name,
          preview: (
            <span
              className={`${t.name} text-text-base`}
              {...(contextAttribute && context ? { [contextAttribute]: context } : {})}
            >
              Aa
            </span>
          ),
          name: t.name,
          value: [
            m.size === null || m.line === null ? null : `${m.size} / ${m.line}`,
            t.weight === null ? null : WEIGHT_NAME[t.weight],
            t.uppercase ? "All caps" : null,
            t.mono ? "Commit Mono" : null,
            sameEverywhere(t) ? sameLabel : null,
          ]
            .filter(Boolean)
            .join(" · "),
          note: use[t.name],
        }
      })}
    />
  )
}

/* ── Scalars ────────────────────────────────────────────────────────────── */

/**
 * The dials the four dimension families are computed from.
 *
 * This is the family that fits the shared row worst, and it is honest about it:
 * a multiplier has nothing to preview. The grid unit does — it is a length, and
 * a 4px bar beside nine space steps built from it is what makes the "× unit"
 * arithmetic on those rows checkable. The two multipliers leave the column
 * empty rather than borrow a picture that would mean nothing.
 *
 * `consumption` decides only whether a dial is named as unread. It used to
 * render the same badge the wiring table did; that table is gone, and the fact
 * a reader still needs is not a status but a caveat — turning this changes
 * nothing today.
 */
export function ScalarList({
  tokens,
  consumption,
  drives,
}: {
  tokens: Token[]
  consumption: Scalar[]
  drives: Record<string, React.ReactNode>
}) {
  const live = new Map(consumption.map((s) => [s.name, s.live]))
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t) => ({
        key: t.name,
        preview:
          t.px === null ? null : (
            <span
              className="block h-4 rounded-xs bg-action-primary-base"
              style={{ width: `var(--db-${t.name})` }}
            />
          ),
        name: `--db-${t.name}`,
        value: px(t),
        note: (
          <>
            {drives[t.name]}
            {live.get(`--db-${t.name}`) ? null : " Nothing reads it yet, so turning it moves nothing."}
          </>
        ),
        title: t.value,
      }))}
    />
  )
}

