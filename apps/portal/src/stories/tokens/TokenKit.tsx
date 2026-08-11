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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "dbui/components/ui/hover-card"
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
/**
 * The preview column's width, exported because a second table has to line up with
 * it: a guidance list stacked under a token table shares its left edge, so its own
 * gutter has to be this wide or its text sits 64px to the left of the names above.
 *
 * One number, here, rather than the same number written twice — the alignment is
 * only true while they agree, and nothing would catch them drifting apart.
 */
export const PREVIEW_WIDTH = "w-[120px]"

const PREVIEW = `${PREVIEW_WIDTH} shrink-0`

/**
 * The preview cell's floor, and the reason rows line up.
 *
 * A row is as tall as `max(preview, text) + padding`, and previews ran from 0 to
 * 80px — a scalar with none, a space bar at 16, a color swatch at 40 — so ten
 * different row heights came out of one component. Pinning the cell to the tallest
 * of the common previews leaves the text to decide, and the text has only two
 * shapes.
 *
 * A floor rather than a fixed height, because elevation genuinely needs more: its
 * tile has to show a shadow falling clear of the box, which cannot be done in
 * 40px. Those rows stay tall and are the honest exception.
 */
const PREVIEW_CELL = `${PREVIEW} min-h-10 items-center`

/**
 * The row's own floor, for when the preview is short AND the text is two lines.
 * 64px is 16 grid units, and it is what a 40px preview plus a two-line name
 * already measured — so this pulls the short rows up to the common case rather
 * than inventing a new height.
 */
const ROW_MIN = "min-h-16"

/**
 * The name, with its place in the system behind it on hover.
 *
 * A HoverCard rather than a Tooltip: a tooltip is for a line of text that a label
 * left out, and this is a six-row definition list. The component's own guideline
 * says preview content on hover and passive information only, which is exactly
 * what this is — nothing in the card is actionable.
 *
 * The trigger is the name itself and stays a `code` element, so the row reads the
 * same whether or not a token carries metadata. Where it does, the dotted rule
 * under it is the only affordance: an underline would read as a link to a page
 * that does not exist.
 */
function TokenName({
  name,
  title,
  meta,
  value,
}: {
  name: string
  title?: string
  meta?: TokenMeta
  value: React.ReactNode
}) {
  if (!meta) {
    return (
      <code className="type-code text-text-base" title={title}>
        {name}
      </code>
    )
  }
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <code className="type-code w-fit cursor-help text-text-base underline decoration-border-strong decoration-dotted underline-offset-4">
            {name}
          </code>
        }
      />
      {/*
        Beside the name, not under it. A card below covers the next few rows, so
        reading down a family meant waiting for one to close before the next could
        open — the card was in the way of the gesture that summons it.

        `inline-end` rather than `right`, so it flips with writing direction. The
        component already animates both logical sides.

        `start` aligns the card's first line with the name it belongs to, which is
        also what keeps it from drifting upward over rows above.
      */}
      <HoverCardContent className="w-80" side="inline-end" align="start">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <code className="type-code text-text-base">{name}</code>
            <span className="type-hint break-words text-text-subtle">{value}</span>
          </div>
          <dl className="flex flex-col gap-1 border-t border-border-subtle pt-3">
            {[
              ["Theme", meta.theme ?? "Core"],
              ["Token type", meta.type],
              ["Function", meta.function],
              ["Family", meta.family],
              ["Role", meta.role],
            ]
              .filter(([, v]) => v)
              .map(([term, definition]) => (
                <div key={String(term)} className="flex gap-2">
                  <dt className="type-hint w-24 shrink-0 text-text-subtle">{term}</dt>
                  <dd className="type-hint min-w-0 flex-1 text-text-base">{definition}</dd>
                </div>
              ))}
          </dl>
          {meta.resolves || meta.extra?.length ? (
            <dl className="flex flex-col gap-1 border-t border-border-subtle pt-3">
              {meta.resolves ? (
                <div className="flex gap-2">
                  <dt className="type-hint w-24 shrink-0 text-text-subtle">Resolves</dt>
                  <dd className="type-hint min-w-0 flex-1 break-words text-text-base">
                    {meta.resolves}
                  </dd>
                </div>
              ) : null}
              {meta.extra?.filter((e) => e.definition).map((e) => (
                <div key={e.term} className="flex gap-2">
                  <dt className="type-hint w-24 shrink-0 text-text-subtle">{e.term}</dt>
                  <dd className="type-hint min-w-0 flex-1 break-words text-text-base">
                    {e.definition}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

/** What a family calls the thing in its preview column. */
export type PreviewLabel = "Color" | "Style" | "Preview"

/**
 * Where a token sits in the system, for the card behind its name.
 *
 * Every field is a fact the name already implies but does not spell out. A reader
 * looking at `--db-surface-base` can see it is a surface, cannot see that Surface
 * sits under Structure, and has no way at all to learn that the white came from
 * `base.white` — the generator resolves that away before the CSS ships.
 */
export type TokenMeta = {
  /** One today. Named anyway, because the value set is what a theme replaces. */
  theme?: string
  /** Color, Type, Dimension, Effect — the four the page is organized by. */
  type: string
  /** The section a family sits under. Colors have one; nothing else does. */
  function?: string
  family: string
  role?: string
  /** How the value is arrived at: a primitive reference, or the calc. */
  resolves?: React.ReactNode
  /**
   * The rest of what is known, one labeled row each — a contrast ratio, which
   * step to pick, what a dial drives.
   *
   * These were printed under every name, which cost a third line on the rows that
   * had one and made two row heights out of one component. They are also the wrong
   * priority for the common task: a reader scanning for a token name does not need
   * a WCAG ratio on the way past, and a reader who wants the ratio wants it for one
   * token rather than for forty at once.
   */
  extra?: Array<{ term: string; definition: React.ReactNode }>
}

export type TokenRow = {
  /** Stable across a re-sort, so React keeps the motion previews mounted. */
  key: string
  preview: React.ReactNode
  /** Written the way it is written in code — the `--db-` var, or the class. */
  name: string
  /** What it resolves to. One line, compact, never a sentence. */
  value: React.ReactNode
  /** Structure behind the name, shown on hover. Omitted where there is none. */
  meta?: TokenMeta
  /**
   * The full expression, kept as a native tooltip for a reader who hovers the row
   * rather than the name. `meta.resolves` is the same fact shown deliberately.
   */
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
          className={`flex items-center gap-4 px-4 py-3 ${ROW_MIN} ${
            i === shown.length - 1 && !hidden ? "" : "border-b border-border-subtle"
          }`}
        >
          <div className={`flex ${PREVIEW_CELL}`}>{row.preview}</div>
          <div className="flex min-w-0 flex-1 flex-col">
            {/*
              Two lines, always. A third used to appear for whichever tokens had a
              note, which is what made a row's height depend on its content — and
              put a contrast ratio in front of every reader scanning for a name.
              That detail lives on the card now.
            */}
            <TokenName name={row.name} title={row.title} meta={row.meta} value={row.value} />
            <span className="type-hint break-words text-text-subtle">{row.value}</span>
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
/**
 * The role, which is the name with its group prefix taken off.
 *
 * Sentence case rather than the raw stop, because the card reads as prose beside
 * "Family: Surface". `input-border-hover` under the `input-border` group gives
 * "Hover", which only works if the prefix is removed by its own length.
 */
const roleOf = (name: string, groupKey: string) => {
  const rest = name.startsWith(`${groupKey}-`) ? name.slice(groupKey.length + 1) : name
  const words = rest.replace(/-/g, " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * The primitive behind one mode, and the alpha over it when there is one.
 *
 * The alpha is the point of showing this at all. `surface-hover` ships an rgba and
 * looks arbitrary until you can see it is black at 3% — a wash chosen for a
 * control-sized target, which is the whole reason it is not the same value as
 * `action-default-hover`.
 */
const primitiveLabel = (t: ColorToken, mode: "light" | "dark") => {
  const ref = t.primitive?.[mode]
  if (!ref) return null
  return ref.alpha === null ? ref.ref : `${ref.ref} at ${Math.round(ref.alpha * 100)}%`
}

/**
 * Read off the name rather than passed in, because one component renders two
 * families: the Shape panel and the Radius panel are both `RadiusScale`, and a
 * prop would have to be threaded correctly at each call site to tell them apart.
 * The prefix already does.
 */
const DIMENSION_FAMILY: Record<string, string> = {
  space: "Space",
  size: "Size",
  radius: "Radius",
  border: "Border",
  shape: "Shape",
}

/**
 * A stop and what it measures — `sm · 13px`.
 *
 * Both halves, because they answer different questions. The px is what the style
 * renders; the stop is what it shares. `label` and `body` are one size stop and
 * two line stops, which is the fact that explains why moving `sm` moves both of
 * them and moving `flush` moves only one.
 */
const stopWithPx = (stop: string | null, px: number | null) => {
  if (px === null) return stop ?? "—"
  return stop ? `${stop} · ${px}px` : `${px}px`
}

/**
 * A dimension's card, where "resolves" is the calc verbatim.
 *
 * The calc is the answer to the question the page kept raising and not settling:
 * a stop states 12px, and only `calc(var(--db-spacing-unit) * 3 * ...)` shows that
 * the 12 is three grid units and which dial moves it. It was already carried as
 * the row's `title`, which is to say it was reachable by hovering and invisible to
 * anyone who did not think to.
 */
const dimensionMeta = (t: Token): TokenMeta => {
  const key = t.name.split("-")[0]
  return {
    type: "Dimension",
    family: DIMENSION_FAMILY[key] ?? key,
    role: roleOf(t.name, key),
    // A literal is its own explanation. Only show the calc when there is one.
    resolves: t.value.startsWith("calc(") ? <code className="type-code">{t.value}</code> : null,
  }
}

export function ColorTable({
  group,
  mode,
  surfaces,
  functionLabel,
  limit = 5,
}: {
  group: ColorGroup
  mode: "light" | "dark"
  surfaces: Surfaces
  /** The section the group sits under. The group knows its key, not its label. */
  functionLabel?: string
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
        meta: {
          type: "Color",
          function: functionLabel,
          family: group.label,
          // The name minus its group prefix. `surface-base` is the Base role of
          // Surface, and `input-border-hover` is Hover — which is why the prefix
          // is stripped by length rather than at the first hyphen.
          role: roleOf(t.name, group.key),
          resolves: primitiveLabel(t, mode),
          // The check the system runs, named so it reads as a check rather than a
          // remark. It is the evidence that a pairing is legal, and it belongs
          // wherever someone is deciding about one token.
          extra: [{ term: "Contrast", definition: verdict(t, mode, surfaces) }],
        },
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

/**
 * The same glanceable strip as `ColorStrip`, for the families whose stops are not
 * colors — so every collapsed panel on the page makes a claim about its contents
 * rather than being a row with a chevron.
 *
 * `kind` picks which CSS property the stop drives, and that choice is the whole
 * preview: a space stop is a width, a radius stop is a corner, a border stop is a
 * weight. Rendering all three as swatches would be the same tile three times and
 * would say nothing about what the family controls.
 *
 * Values come from `token.value` rather than `token.px`, so a stop that is a
 * `calc()` of the grid unit previews at whatever the density dial currently makes
 * it, the same way the real thing does.
 */
export function ScaleStrip({
  tokens,
  kind,
  limit = 10,
}: {
  tokens: Token[]
  kind: "width" | "radius" | "border"
  limit?: number
}) {
  return (
    <span aria-hidden="true" className="flex flex-wrap items-center gap-1">
      {tokens.slice(0, limit).map((t) => {
        if (kind === "width") {
          // A bar, because a space or size stop is a distance. Capped so the top of
          // a ten-stop scale does not set the width of the header row.
          return (
            <span
              key={t.name}
              className="block h-2 rounded-1 bg-border-strong"
              style={{ width: `min(${t.value}, 2.5rem)`, minWidth: "0.125rem" }}
            />
          )
        }
        return (
          <span
            key={t.name}
            className="block size-6 bg-surface-inset"
            style={
              kind === "radius"
                ? { borderRadius: t.value, border: "1px solid var(--db-border-base)" }
                : { borderRadius: "var(--db-shape-control)", border: `${t.value} solid var(--db-border-strong)` }
            }
          />
        )
      })}
    </span>
  )
}

/**
 * The register's steps, each rendered in its own style, one tile per step.
 *
 * The step's own class does the rendering — the same `${t.name}` interpolation
 * `TypeScale` uses below, which works because the ramp ships as real CSS classes
 * rather than utilities Tailwind has to find in source. That is also what keeps
 * this rule-legal: an inline `fontSize` would be type outside the ramp and could
 * not follow `--db-type-scalar`, so the one strip claiming to show the type system
 * would be the only thing on the page ignoring the reader's type setting.
 * `inline-type-literal` catches exactly that. A class carries the size, the
 * leading, the family, the weight and the case, so it needs no help.
 *
 * A tile per step, bordered and evenly spaced, because the count is half of what
 * the preview says: a reader should see that Interface holds seven steps and
 * Display four without opening either. Tiles size to their glyph, so the strip is
 * also a picture of the ramp climbing.
 */
export function TypeStrip({ steps, limit = 8 }: { steps: TypeStep[]; limit?: number }) {
  return (
    <span aria-hidden="true" className="flex flex-wrap items-center gap-1">
      {steps.slice(0, limit).map((step) => (
        <span
          key={step.name}
          className="flex min-w-8 items-center justify-center rounded-1 border border-border-base px-1"
        >
          <span className={`${step.name} text-text-subtle`}>Aa</span>
        </span>
      ))}
    </span>
  )
}

/**
 * The five levels as chips, each carrying its own shadow.
 *
 * The chips are filled with the previewed mode's surface, because a shadow is only
 * legible against the thing it is cast onto — in dark mode these are the same
 * geometry at four times the alpha, so a light-mode chip would show the light set
 * failing rather than the dark set working.
 *
 * The strip itself is unfilled. It used to paint the surface behind the whole row,
 * which is what the expanded scale does, but at header width that read as a white
 * band running the length of the panel rather than as a preview. The chips carry
 * the surface; the row does not need to.
 */
export function ElevationStrip({
  tokens,
  mode,
  surface,
  border,
}: {
  tokens: ModeToken[]
  mode: "light" | "dark"
  surface: string
  /** `border-subtle` in the previewed mode. */
  border: string
}) {
  return (
    <span aria-hidden="true" className="flex flex-wrap items-center gap-3">
      {tokens.map((t) => (
        <span
          key={t.name}
          className="block size-5 rounded-1"
          // The hairline is what makes the chip legible at all. `xs` is a 5% shadow
          // in light mode, so a white chip on a white surface with no edge is a
          // smudge — the same reason the expanded scale takes a border.
          style={{ background: surface, boxShadow: t[mode], border: `1px solid ${border}` }}
        />
      ))}
    </span>
  )
}

/**
 * The stack, as a stack.
 *
 * Overlapping tiles rather than a row of numbers, because a layer's value means
 * nothing on its own — 30 is only interesting relative to 20 and 40. Offsetting
 * them shows the one thing the family encodes, which is order.
 */
export function LayerStrip({ tokens }: { tokens: Token[] }) {
  return (
    <span aria-hidden="true" className="flex items-center">
      {tokens.map((t, i) => (
        <span
          key={t.name}
          className="block size-4 rounded-xs border border-border-base bg-surface-strong"
          // Overlapped by half, so six tiles read as one stack rather than six
          // objects. The later a tile is, the higher it paints — which is the
          // scale itself doing the drawing.
          style={{ marginLeft: i === 0 ? 0 : "-0.375rem", zIndex: i + 1 }}
        />
      ))}
    </span>
  )
}

/**
 * One row per layer, each showing its position in the order rather than its
 * number.
 *
 * A filled tile among outlined ones answers the question a reader actually has —
 * what sits above this, and what sits below — which the integer cannot. The
 * integers are there in the value column for anyone writing a comparison.
 */
export function LayerScale({ tokens }: { tokens: Token[] }) {
  return (
    <TokenTable
      label="Preview"
      rows={tokens.map((t, i) => ({
        key: t.name,
        preview: (
          <span aria-hidden="true" className="flex items-center gap-1">
            {tokens.map((other, j) => (
              <span
                key={other.name}
                className={`block size-2 rounded-xs ${
                  j === i ? "bg-action-primary-base" : "border border-border-base"
                }`}
              />
            ))}
          </span>
        ),
        name: `--db-${t.name}`,
        value: t.value,
        meta: {
          type: "Effect",
          family: "Layer",
          role: roleOf(t.name, "layer"),
          resolves: "Authored count — unitless, and never scaled",
          extra: [
            {
              term: "Above",
              definition: i === 0 ? "The page" : `--db-${tokens[i - 1].name}`,
            },
            {
              term: "Below",
              definition: i === tokens.length - 1 ? "Nothing" : `--db-${tokens[i + 1].name}`,
            },
          ],
        },
      }))}
    />
  )
}

/**
 * Each curve drawn as a curve.
 *
 * A bezier's four numbers are unreadable as text and unmistakable as a shape, so
 * the preview plots them: the control points are parsed out of the value and the
 * path is drawn bottom-left to top-right, the way an easing chart is always read.
 *
 * A value that is not a bezier falls back to a straight line, which is exactly
 * right for the one the system has — `linear`. Should a keyword curve ever join
 * the set, the diagonal would be an approximation rather than its shape, which is
 * flagged here so nobody reads it as precise.
 */
export function EasingStrip({ easings, limit = 6 }: { easings: Token[]; limit?: number }) {
  const points = (value: string) => {
    const m = value.match(/cubic-bezier\(([^)]+)\)/)
    if (!m) return null
    const n = m[1].split(",").map((v) => Number.parseFloat(v.trim()))
    return n.length === 4 && n.every((v) => Number.isFinite(v)) ? n : null
  }
  return (
    <span aria-hidden="true" className="flex flex-wrap items-center gap-1">
      {easings.slice(0, limit).map((e) => {
        const p = points(e.value)
        // y is inverted: SVG grows downward, an easing chart grows upward.
        const d = p
          ? `M0,24 C${p[0] * 24},${24 - p[1] * 24} ${p[2] * 24},${24 - p[3] * 24} 24,0`
          : "M0,24 L24,0"
        return (
          <span
            key={e.name}
            className="flex size-6 items-center justify-center rounded-1 border border-border-base"
          >
            <svg viewBox="-2 -2 28 28" className="size-5" fill="none">
              <path d={d} stroke="var(--db-border-strong)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        )
      })}
    </span>
  )
}

/**
 * The durations as lengths, longest normalized to the widest bar.
 *
 * A duration is a distance in time, and a bar is the one static shape that says
 * so — the expanded panel animates a dot, which a collapsed header cannot do
 * without becoming the only thing moving on the page.
 */
export function MotionStrip({ tokens }: { tokens: Token[] }) {
  const ms = (t: Token) => Number.parseFloat(t.value) || 0
  const longest = Math.max(...tokens.map(ms), 1)
  return (
    <span aria-hidden="true" className="flex flex-col gap-1">
      {tokens.map((t) => (
        <span
          key={t.name}
          className="block h-1 rounded-1 bg-border-strong"
          style={{ width: `${Math.max(8, Math.round((ms(t) / longest) * 72))}px` }}
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
        meta: dimensionMeta(t),
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
        meta: dimensionMeta(t),
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
        meta: dimensionMeta(t),
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
        meta: dimensionMeta(t),
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
        meta: {
          type: "Effect",
          family: "Elevation",
          role: roleOf(t.name, "elevation"),
          resolves: `Authored per color mode — same geometry in both, ${mode} alpha`,
        },
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
/**
 * The keyframes both motion scales animate against, rendered once by the section
 * rather than by each scale.
 *
 * Once, because two panels each emitting the same `<style>` puts two identical
 * rules in the document — harmless in CSS terms, and the exact shape of a bug that
 * cost real time elsewhere in this repo when a duplicated `<style>` broke
 * hydration. One owner is cheaper than remembering which duplicate is safe.
 */
export function MotionKeyframes() {
  return (
    <style>{`
      @keyframes dbui-token-slide {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(100% * 4)); }
      }
    `}</style>
  )
}

/**
 * A dot crossing a track, out and back, so a difference in duration reads as a
 * difference in speed rather than in end position.
 *
 * `run` is a key rather than a state: bumping it remounts the dot, which is what
 * restarts a CSS animation that has already finished.
 */
function MotionTrack({
  duration,
  curve,
  run,
}: {
  duration: string
  curve: string
  run: number
}) {
  return (
    <span className="relative block h-6 w-full overflow-hidden rounded-1 bg-surface-subtle">
      <span
        key={run}
        className="absolute top-1 left-1 block size-4 rounded-xs bg-action-primary-base"
        style={{ animation: `dbui-token-slide ${duration} ${curve} 2 alternate both` }}
      />
    </span>
  )
}

function PlayAll({ onPlay }: { onPlay: () => void }) {
  return (
    <div>
      <Button size="sm" variant="outline" onClick={onPlay}>
        Play all
      </Button>
    </div>
  )
}

/** The durations, each at the standard curve so only the length varies. */
export function MotionScale({ tokens, easing }: { tokens: Token[]; easing: Token }) {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col gap-3" style={{ margin: 0 }}>
      <PlayAll onPlay={() => setRun((n) => n + 1)} />
      <TokenTable
        label="Preview"
        rows={tokens.map((t) => ({
          key: t.name,
          preview: (
            <MotionTrack duration={`var(--db-${t.name})`} curve={easing.value} run={run} />
          ),
          name: `--db-${t.name}`,
          value: t.value,
          meta: {
            type: "Effect",
            family: "Duration",
            role: roleOf(t.name, "duration"),
            resolves: "Authored value — milliseconds, unscaled",
          },
        }))}
      />
    </div>
  )
}

/**
 * The curves, each at one duration so only the shape varies.
 *
 * The slowest stop, because a 150ms travel is over before an eye can read the
 * difference between two beziers — the curve is the subject here, not the length.
 */
export function EasingScale({
  easings,
  duration,
}: {
  easings: Token[]
  duration: Token
}) {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col gap-3" style={{ margin: 0 }}>
      <PlayAll onPlay={() => setRun((n) => n + 1)} />
      <TokenTable
        label="Preview"
        rows={easings.map((e) => ({
          key: e.name,
          preview: (
            <MotionTrack duration={`var(--db-${duration.name})`} curve={e.value} run={run} />
          ),
          name: `--db-${e.name}`,
          value: e.value,
          meta: {
            type: "Effect",
            family: "Easing",
            role: roleOf(e.name, "ease"),
            resolves: "Authored curve — bound to a job, not a shape",
          },
        }))}
      />
    </div>
  )
}

/* ── Type ───────────────────────────────────────────────────────────────── */

/**
 * A register of the ramp, named by how the reader takes the text in.
 *
 * No blurb. The registers used to carry one line each saying how their text is
 * read; the tokens page is a list of names now, and that sentence is kept in
 * `notes/tokens-page-cuts.md` rather than rendered.
 */
export type TypeGroup = { label: string; steps: string[] }

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
      steps: steps.filter((t) => g.steps.includes(t.name)),
    })),
    {
      key: "unclaimed",
      label: "Unclaimed",
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
  register,
  contexts = [],
  context,
  contextAttribute,
}: {
  steps: TypeStep[]
  use: Record<string, string>
  /** Interface, Reading or Display. The steps do not carry which one they are in. */
  register?: string
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
          meta: {
            type: "Type",
            family: register ?? "Type",
            role: roleOf(t.name, "type"),
            resolves: sameEverywhere(t)
              ? "One value in every context"
              : "Per context — the stop moves, the name does not",
            // A style is six properties, and the class is all six at once. Listing
            // them is the whole reason to open the card: the name says `label`, and
            // only this says that a label is `sm` on `flush` at 400 — which is what
            // makes it clear why pairing it with `font-` or `leading-` is a fight
            // rather than an adjustment.
            extra: [
              { term: "Face", definition: t.mono ? "Commit Mono" : "Figtree" },
              { term: "Size", definition: stopWithPx(t.stops.size, m.size) },
              { term: "Line", definition: stopWithPx(t.stops.line, m.line) },
              {
                term: "Tracking",
                definition: t.stops.tracking
                  ? stopWithPx(t.stops.tracking, t.tracking)
                  : "None",
              },
              { term: "Weight", definition: t.weight },
              { term: "Case", definition: t.uppercase ? "All caps" : "As written" },
              { term: "Use for", definition: use[t.name] },
            ],
          },
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
        meta: {
          type: "Dimension",
          family: "Scalars",
          role: roleOf(t.name, ""),
          resolves:
            t.name === "spacing-unit"
              ? "Authored value — the grid step itself"
              : "Multiplier — 1 is unscaled",
          extra: [
            { term: "Drives", definition: drives[t.name] },
            {
              // Measured rather than asserted. `generate-token-consumption.mjs`
              // re-reads the tree, so a dial that goes dead says so here instead
              // of waiting for someone to grep for it.
              term: "Consumers",
              definition: live.get(`--db-${t.name}`)
                ? null
                : "Nothing reads it yet, so turning it moves nothing.",
            },
          ],
        },
        title: t.value,
      }))}
    />
  )
}

