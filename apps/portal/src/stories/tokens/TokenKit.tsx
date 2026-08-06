/**
 * Visual previews for the Tokens page. Each family gets a preview that shows the
 * token doing its job — a radius as a rounded corner, a duration as a moving
 * box — rather than a value in a table. A number tells you what a token is; only
 * a preview tells you when to reach for it.
 */
import * as React from "react"

import { Button } from "dbui/components/ui/button"
import { Badge } from "dbui/components/ui/badge"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronUp } from "dbui/components/icons/ChevronUp"

import type { ColorGroup, Token, TypeStep } from "./token-data"
import type { Family, Scalar, TailwindNamespace } from "./token-consumption"

/** Families like color run to dozens of rows; show a useful handful first. */
export function ShowMore({
  count,
  label = "tokens",
  children,
}: {
  count: number
  label?: string
  children: (expanded: boolean) => React.ReactNode
}) {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <div className="flex flex-col gap-3" style={{ margin: 0 }}>
      {children(expanded)}
      {count > 0 && (
        <div>
          <Button size="sm" variant="outline" onClick={() => setExpanded((e) => !e)}>
            {expanded ? "Show fewer" : `Show all ${count} ${label}`}
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      )}
    </div>
  )
}

/** A framed block that groups a preview with its caption. */
export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-2 border border-border-base bg-surface-base"
      style={{ margin: 0 }}
    >
      {children}
    </div>
  )
}

function Row({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 ${last ? "" : "border-b border-border-subtle"}`}
    >
      {children}
    </div>
  )
}

/**
 * The token's name, with how it is written on hover.
 *
 * The expression has to stay reachable — someone will want to know that a space
 * step is the grid unit times a scalar times the density dial — but it cannot be
 * the reading. Printed in the row it wrapped to three lines and buried the value.
 */
function Name({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <code className="type-code w-60 shrink-0 text-text-base" style={{ margin: 0 }} title={title}>
      {children}
    </code>
  )
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-hint w-28 shrink-0 text-text-subtle" style={{ margin: 0 }}>
      {children}
    </span>
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
function Px({ token }: { token: Token }) {
  return (
    <span className="type-hint w-16 shrink-0 tabular-nums text-text-base" style={{ margin: 0 }}>
      {token.px === null ? token.value : `${token.px}px`}
    </span>
  )
}

/* ── Color ─────────────────────────────────────────────────────────────── */

/** Composite an rgba() over white; swatches are shown on a light surface. */
function toRgb(value: string): [number, number, number] | null {
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
      Math.round(p[0] * a + 255 * (1 - a)),
      Math.round(p[1] * a + 255 * (1 - a)),
      Math.round(p[2] * a + 255 * (1 - a)),
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

export function contrastRatio(a: string, b: string): number | null {
  const ca = toRgb(a)
  const cb = toRgb(b)
  if (!ca || !cb) return null
  const la = luminance(ca)
  const lb = luminance(cb)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** The surface inverse foregrounds are designed to sit on. */
const INVERSE_SURFACE = "#171717"

/**
 * A swatch is decoration until it tells you whether it passes. Text tokens carry
 * their ratio against the surface they are meant to sit on, so the page is
 * checkable rather than merely illustrative.
 */
function ContrastChip({ ratio }: { ratio: number }) {
  const r = Math.round(ratio * 100) / 100
  // 4.5:1 is the WCAG AA threshold for body text; 3:1 for large text and UI.
  const tone =
    r >= 4.5
      ? "bg-status-surface-positive text-status-text-positive"
      : r >= 3
        ? "bg-status-surface-warning text-status-text-warning"
        : "bg-status-surface-negative text-status-text-negative"
  const label = r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "fail"
  return (
    <span className={`type-hint shrink-0 rounded-full px-2 py-0.5 ${tone}`} title={`${r}:1`}>
      {r}:1 · {label}
    </span>
  )
}

/** Light and dark side by side, because a token that only works in one is a bug. */
export function ColorSwatches({
  group,
  limit = 6,
  surface,
}: {
  group: ColorGroup
  limit?: number
  /** When set, text tokens in this group get a contrast ratio against it. */
  surface?: string
}) {
  const hidden = Math.max(0, group.tokens.length - limit)
  return (
    // "colors" rather than "tokens", to match the unit the wiring table counts
    // this family in. Two words for the same set invites the reader to wonder
    // whether they are two sets.
    <ShowMore count={hidden ? group.tokens.length : 0} label={`${group.label.toLowerCase()} colors`}>
      {(expanded) => (
        <Panel>
          {(expanded ? group.tokens : group.tokens.slice(0, limit)).map((t, i, arr) => {
            // Only foreground tokens have a meaningful ratio against a surface.
            const isForeground = /^(text|link|status-text|action-label)/.test(t.name)
            // Inverse foregrounds are designed for the inverse surface, so
            // measuring them against the light one would report a false failure.
            const against = /inverse/.test(t.name) ? INVERSE_SURFACE : surface
            // WCAG 1.4.3 exempts disabled controls from the contrast minimum.
            const exempt = /disabled/.test(t.name)
            const ratio =
              against && isForeground && !exempt ? contrastRatio(t.light, against) : null
            return (
              <Row key={t.name} last={i === arr.length - 1}>
                <div className="flex shrink-0 gap-1">
                  <span
                    className="block size-7 rounded-1 border border-border-base"
                    style={{ background: t.light }}
                    title={`light: ${t.light}`}
                  />
                  <span
                    className="block size-7 rounded-1 border border-border-base"
                    style={{ background: t.dark }}
                    title={`dark: ${t.dark}`}
                  />
                </div>
                <Name>--db-{t.name}</Name>
                <span className="type-hint flex-1 truncate text-text-subtle">{t.light}</span>
                {ratio ? (
                  <ContrastChip ratio={ratio} />
                ) : exempt ? (
                  <span className="type-hint shrink-0 text-text-subtle">exempt</span>
                ) : null}
              </Row>
            )
          })}
        </Panel>
      )}
    </ShowMore>
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
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name title={t.value}>--db-{t.name}</Name>
          <Px token={t} />
          <Value>{t.multiple === null ? null : `${t.multiple} × unit`}</Value>
          {/* No minimum width. The bar carried one so every row had something to
              show, which drew a 1px mark beside a step that states 0px. */}
          <span
            className="block h-4 rounded-xs bg-action-primary-base"
            style={{ width: `var(--db-${t.name})` }}
          />
        </Row>
      ))}
    </Panel>
  )
}

/* ── Radius ─────────────────────────────────────────────────────────────── */

export function RadiusScale({ tokens }: { tokens: Token[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ margin: 0 }}>
      {tokens.map((t) => (
        <div
          key={t.name}
          className="flex flex-col items-center gap-2 rounded-2 border border-border-base bg-surface-base p-4"
          title={t.value}
        >
          <span
            className="block size-16 border-2 border-action-primary-base bg-surface-accent"
            style={{ borderRadius: `var(--db-${t.name})` }}
          />
          <code className="type-code text-text-base">{t.name.replace("radius-", "")}</code>
          {/* px rather than the shipped rem, so this scale and the space scale
              beside it are read in the same unit. The rem is on the card. */}
          <span className="type-hint tabular-nums text-text-subtle">
            {t.px === null ? t.value : `${t.px}px`}
          </span>
        </div>
      ))}
    </div>
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
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name title={t.value}>--db-{t.name}</Name>
          <Px token={t} />
          <Value>{t.multiple === null ? null : `${t.multiple} × unit`}</Value>
          <span
            className="block rounded-xs bg-action-primary-base"
            style={{ height: `var(--db-${t.name})`, width: `var(--db-${t.name})` }}
          />
        </Row>
      ))}
    </Panel>
  )
}

/* ── Border width ───────────────────────────────────────────────────────── */

export function BorderScale({ tokens }: { tokens: Token[] }) {
  return (
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name title={t.value}>--db-{t.name}</Name>
          <Px token={t} />
          <span
            className="block h-8 w-24 rounded-1 border-border-strong bg-surface-base"
            style={{ borderWidth: `var(--db-${t.name})`, borderStyle: "solid" }}
          />
        </Row>
      ))}
    </Panel>
  )
}

/* ── Elevation ──────────────────────────────────────────────────────────── */

export function ElevationScale({ tokens }: { tokens: Token[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ margin: 0 }}>
      {tokens.map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-3 rounded-2 bg-surface-subtle p-5">
          <span
            className="block size-16 rounded-2 bg-surface-base"
            style={{ boxShadow: `var(--db-${t.name})` }}
          />
          <code className="type-code text-text-base">{t.name.replace("elevation-", "")}</code>
        </div>
      ))}
    </div>
  )
}

/* ── Motion ─────────────────────────────────────────────────────────────── */

/** Duration only reads as duration when it moves; click to replay. */
export function MotionScale({ tokens, easing }: { tokens: Token[]; easing: string }) {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col gap-3" style={{ margin: 0 }}>
      <div>
        <Button size="sm" variant="outline" onClick={() => setRun((n) => n + 1)}>
          Play all
        </Button>
      </div>
      <Panel>
        {tokens.map((t, i) => (
          <Row key={t.name} last={i === tokens.length - 1}>
            <Name>--db-{t.name}</Name>
            <Px token={t} />
            <div className="relative h-6 flex-1 overflow-hidden rounded-1 bg-surface-subtle">
              <span
                key={run}
                className="absolute top-1 left-1 block size-4 rounded-xs bg-action-primary-base"
                // Out and back, so the difference between 150ms and 450ms is
                // legible as a difference in speed rather than end position.
                style={{
                  animation: `dbui-token-slide var(--db-${t.name}) ${easing} 2 alternate both`,
                }}
              />
            </div>
          </Row>
        ))}
      </Panel>
      <style>{`
        @keyframes dbui-token-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100% * 12)); }
        }
      `}</style>
    </div>
  )
}

/* ── Type ───────────────────────────────────────────────────────────────── */

/**
 * Size and leading come from the generated ramp rather than the caller. They
 * were caller-supplied strings, and `eyebrow` drifted to a size the config does
 * not give it — which is the whole argument for rendering a value instead of
 * writing it down.
 *
 * `for` stays a prop because it is the one thing here that is not a value: it is
 * the editorial answer to "which step do I pick", and it belongs to the page.
 */
export function TypeScale({ steps, use }: { steps: TypeStep[]; use: Record<string, string> }) {
  return (
    <Panel>
      {steps.map((t, i) => (
        <div
          key={t.name}
          className={`flex items-start gap-4 px-4 py-3 ${i === steps.length - 1 ? "" : "border-b border-border-subtle"}`}
        >
          <div className="w-48 shrink-0">
            <code className="type-code text-text-base">{t.name}</code>
            <div className="type-hint text-text-subtle">
              {t.size} / {t.line} · {t.weight}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <span className={`${t.name} text-text-base`}>The quick brown fox</span>
          </div>
          <div className="type-hint w-40 shrink-0 text-text-subtle">{use[t.name]}</div>
        </div>
      ))}
    </Panel>
  )
}

/* ── Wiring ─────────────────────────────────────────────────────────────── */

/**
 * Whether anything resolves to a family. This is the one status on the page, and
 * it is measured rather than declared — `TRACKER.md` owns progress, but "does a
 * line of code read this" is a property of the current tree, not a milestone.
 *
 * Three states, because two were not enough. Every family that nothing reads
 * used to read `unconsumed`, and a reader takes that as a statement about the
 * product: Elevation unconsumed means nothing has a shadow. Popovers, dialogs
 * and segment controls all have one, so the page was reporting a defect that
 * does not exist and losing the reader's trust in the rest of the table.
 *
 * `superseded` splits the two claims apart. The property renders. Our token is
 * not its source. Which of those a reader needs depends on what they are about
 * to do, and both are on the row.
 */
export type Wiring = "live" | "superseded" | "unread"

/** Whether the family is read, and if not, whether anything else does its job. */
export const wiringOf = (family: Family): Wiring =>
  family.live ? "live" : family.superseded ? "superseded" : "unread"

export function Wired({ state }: { state: Wiring }) {
  if (state === "live") return <Badge variant="outline">live</Badge>
  // Warning on both, because both are a gap between what ships and what renders.
  // Superseded is the more serious of the two: the value exists and disagrees.
  return <Badge variant="warning">{state === "superseded" ? "superseded" : "unread"}</Badge>
}

/**
 * What took the job, on the row, so the badge is never the whole story.
 *
 * The namespace and the file count come from the scan. Nothing is claimed that
 * is not currently written somewhere in the tree, so if the utilities go away
 * the family falls back to reporting itself unread.
 */
export function SupersededBy({ family }: { family: Family }) {
  if (!family.superseded) return null
  return (
    <>
      <Namespace>{family.superseded.namespace}</Namespace>
      <span className="type-hint shrink-0 tabular-nums text-text-subtle">
        {family.superseded.uses} uses
      </span>
    </>
  )
}

/**
 * A namespace, allowed to wrap rather than truncate.
 *
 * `--default-transition-duration` is one character too long for the column and
 * was arriving as `--default-transition-du…`, which is the one thing this row
 * exists to say. Wrapping costs a second line on one row out of nine.
 */
function Namespace({ children }: { children: React.ReactNode }) {
  return (
    <code className="type-code min-w-0 flex-1 break-words text-text-base" style={{ margin: 0 }}>
      {children}
    </code>
  )
}

/**
 * The sentence a section needs when its badge says superseded, because a badge
 * cannot say what took over or admit that both facts are true at once.
 */
export function SupersededNote({ family }: { family: Family }) {
  if (!family.superseded) return null
  return (
    <>
      Tailwind&rsquo;s <code className="type-code">{family.superseded.namespace}</code> renders this
      instead, in {family.superseded.files} files. The property is on screen. This family is not its
      source.
    </>
  )
}

/** Names the columns of a scan table. Without it a bare count is a mystery. */
function HeadRow({ cells }: { cells: [string, string][] }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border-base bg-surface-subtle px-4 py-2">
      {cells.map(([label, width]) => (
        <span key={label} className={`type-eyebrow ${width} text-text-subtle`}>
          {label}
        </span>
      ))}
    </div>
  )
}

/**
 * What a family ships, counted in the unit a reader thinks in.
 *
 * This column said `74` for type, which is the number of CSS custom properties
 * the ramp emits — five per style. The ramp has 14 styles, so the page was
 * contradicting the thing it documents and inviting the reader to distrust the
 * rest of the table. Every other family sets one property per thing and the two
 * numbers agree, so nothing extra prints.
 *
 * Both numbers come from the scan. The unit is the only authored part, and it
 * has to be, because no scan can know that five properties are one style.
 */
function Ships({ family }: { family: Family }) {
  return (
    <span className="flex w-28 shrink-0 flex-col">
      <span className="type-hint tabular-nums text-text-base">
        {family.count} {family.unit}
      </span>
      {family.properties === family.count ? null : (
        <span className="type-hint tabular-nums text-text-subtle">
          {family.properties} properties
        </span>
      )}
    </span>
  )
}

/**
 * Whether a family reaches code, in three columns and no sentences.
 *
 * The last column used to hold a paragraph explaining the mechanism, which made
 * the one table an engineer scans the one table an engineer had to read. What is
 * left is the namespace you write and how many times the repo writes it.
 *
 * The column is headed by what renders rather than by what our token reaches,
 * because that is the only question all three states can answer. A live family
 * names its own bridge. A superseded one names the Tailwind namespace that
 * renders the property instead, with the badge marking whose value it is. An
 * unread one has nothing to name, which is the whole of its answer.
 *
 * Nothing here is typed. The namespace and every number come from the
 * consumption scan, so a family that goes live changes this table by itself.
 */
export function WiringTable({ families }: { families: Family[] }) {
  return (
    <Panel>
      <HeadRow
        cells={[
          ["Family", "w-28 shrink-0"],
          ["Ships", "w-28 shrink-0"],
          ["What renders it", "min-w-0 flex-1"],
        ]}
      />
      {families.map((f, i) => {
        const state = wiringOf(f)
        return (
          <Row key={f.key} last={i === families.length - 1}>
            <span className="type-label-bold w-28 shrink-0 text-text-strong">{f.label}</span>
            <Ships family={f} />
            <span className="flex min-w-0 flex-1 items-baseline gap-3">
              {f.bridge ? (
                <>
                  <Namespace>{f.bridge.namespace}</Namespace>
                  <span className="type-hint shrink-0 tabular-nums text-text-subtle">
                    {f.bridge.uses} uses
                  </span>
                </>
              ) : (
                <>
                  <Wired state={state} />
                  <SupersededBy family={f} />
                </>
              )}
            </span>
          </Row>
        )
      })}
    </Panel>
  )
}

/**
 * Only the namespaces Tailwind owns outright.
 *
 * Two filters, both derived rather than listed. A namespace with no uses is not
 * a dependency. A namespace DBUI overrides or adds to is already a DBUI token
 * wearing a Tailwind name, and the wiring table above is where it belongs —
 * printing it here as well is what made this table read as an inventory of
 * everything instead of an account of what the system does not own.
 *
 * Deriving the cut from `origin` is the part that matters: when a namespace is
 * folded into the config it leaves this table by itself, so the two tables
 * cannot come to disagree about who owns a value.
 */
export function TailwindTable({
  rows,
  governs,
}: {
  rows: TailwindNamespace[]
  governs: Record<string, React.ReactNode>
}) {
  const owned = rows.filter(
    (r) => r.uses > 0 && r.origin !== "override" && r.origin !== "addition",
  )
  return (
    <Panel>
      <HeadRow
        cells={[
          ["Namespace", "min-w-0 flex-1"],
          ["Why it is Tailwind's", "w-64 shrink-0"],
          ["Uses", "w-16 shrink-0 text-right"],
        ]}
      />
      {owned.map((r, i) => (
        <Row key={r.namespace} last={i === owned.length - 1}>
          <code className="type-code min-w-0 flex-1 truncate text-text-base">{r.namespace}</code>
          <span className="type-hint w-64 shrink-0 text-text-subtle">{governs[r.namespace]}</span>
          <span className="type-hint w-16 shrink-0 text-right tabular-nums text-text-subtle">
            {r.uses}
          </span>
        </Row>
      ))}
    </Panel>
  )
}

/* ── Scalars ────────────────────────────────────────────────────────────── */

/**
 * A dial is only a dial if turning it moves something, so each row carries what
 * it multiplies and whether that family is read. The value is beside it because
 * every one of them is currently at rest, and a reader has to see that the
 * defaults are neutral before the liveness column means anything.
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
    <Panel>
      {tokens.map((t, i) => (
        <div
          key={t.name}
          className={`flex flex-col gap-1 px-4 py-3 ${i === tokens.length - 1 ? "" : "border-b border-border-subtle"}`}
        >
          <div className="flex items-baseline gap-3">
            <code
              className="type-code min-w-0 flex-1 truncate text-text-base"
              title={t.value}
            >
              --db-{t.name}
            </code>
            {/* The grid unit is a length and resolves; the four dials are bare
                multipliers and have no px. Showing the unit in px is what makes
                the space scale's "× unit" arithmetic checkable. */}
            <span className="type-hint shrink-0 tabular-nums text-text-subtle">
              {t.px === null ? t.value : `${t.px}px`}
            </span>
            {/* A dial has nothing to be superseded by. Turning it moves the
                family it drives or it moves nothing, so two states is the whole
                truth here. */}
            <Wired state={live.get(`--db-${t.name}`) ? "live" : "unread"} />
          </div>
          <span className="type-body text-text-subtle">{drives[t.name]}</span>
        </div>
      ))}
    </Panel>
  )
}
