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
      className="overflow-hidden rounded-md border border-border-base bg-surface-base"
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

function Name({ children }: { children: React.ReactNode }) {
  return (
    <code className="type-code w-60 shrink-0 text-text-base" style={{ margin: 0 }}>
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
    <ShowMore count={hidden ? group.tokens.length : 0} label={`${group.label.toLowerCase()} tokens`}>
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
                    className="block size-7 rounded-sm border border-border-base"
                    style={{ background: t.light }}
                    title={`light: ${t.light}`}
                  />
                  <span
                    className="block size-7 rounded-sm border border-border-base"
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

/** Rendered as a bar at its own width, so the steps are comparable at a glance. */
export function SpaceScale({ tokens }: { tokens: Token[] }) {
  return (
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name>--db-{t.name}</Name>
          <div className="flex flex-1 items-center gap-3">
            <span
              className="block h-4 rounded-xs bg-action-primary-base"
              style={{ width: `var(--db-${t.name})`, minWidth: 1 }}
            />
            <span className="type-hint text-text-subtle">
              {t.name === "space-0" ? "0" : `${t.name.replace("space-", "")}`}
            </span>
          </div>
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
          className="flex flex-col items-center gap-2 rounded-md border border-border-base bg-surface-base p-4"
        >
          <span
            className="block size-16 border-2 border-action-primary-base bg-surface-accent"
            style={{ borderRadius: `var(--db-${t.name})` }}
          />
          <code className="type-code text-text-base">{t.name.replace("radius-", "")}</code>
          <span className="type-hint text-text-subtle">{t.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Size ───────────────────────────────────────────────────────────────── */

export function SizeScale({ tokens, kind }: { tokens: Token[]; kind: "element" | "icon" }) {
  return (
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name>--db-{t.name}</Name>
          <Value>{t.value.replace(/calc\((\d+px).*/, "$1")}</Value>
          <span
            className={
              kind === "element"
                ? "block rounded-sm border border-input-border-base bg-surface-base"
                : "block rounded-xs bg-action-primary-base"
            }
            style={{
              height: `var(--db-${t.name})`,
              width: kind === "element" ? 120 : `var(--db-${t.name})`,
            }}
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
          <Name>--db-{t.name}</Name>
          <Value>{t.value}</Value>
          <span
            className="block h-8 w-24 rounded-sm border-border-strong bg-surface-base"
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
        <div key={t.name} className="flex flex-col items-center gap-3 rounded-md bg-surface-subtle p-5">
          <span
            className="block size-16 rounded-md bg-surface-base"
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
            <Value>{t.value}</Value>
            <div className="relative h-6 flex-1 overflow-hidden rounded-sm bg-surface-subtle">
              <span
                key={run}
                className="absolute top-1 left-1 block size-4 rounded-xs bg-action-primary-base"
                // Out and back, so the difference between 130ms and 550ms is
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
 */
export function Wired({ live }: { live: boolean }) {
  return live ? (
    <Badge variant="outline">live</Badge>
  ) : (
    <Badge variant="warning">unconsumed</Badge>
  )
}

/**
 * How each family reaches code, in the order the page presents them.
 *
 * `reaches` is editorial — a sentence fragment naming the mechanism — and every
 * number beside it is measured. A family with no mechanism renders the em dash,
 * so the empty cell is the finding.
 */
export function WiringTable({
  families,
  reaches,
}: {
  families: Family[]
  reaches: Record<string, React.ReactNode>
}) {
  return (
    <Panel>
      {families.map((f, i) => (
        <Row key={f.key} last={i === families.length - 1}>
          <span className="type-label-bold w-28 shrink-0 text-text-strong">{f.label}</span>
          <span className="type-hint w-16 shrink-0 text-text-subtle">{f.tokens}</span>
          <span className="type-body min-w-0 flex-1 text-text-subtle">
            {reaches[f.key] ?? <span aria-hidden="true">&mdash;</span>}
          </span>
          <Wired live={f.live} />
        </Row>
      ))}
    </Panel>
  )
}

/**
 * The Tailwind theme namespaces the system actually depends on, with whose value
 * is in force. Sorted by use in the generator, so the row order is the order of
 * how much a rule about it would matter.
 *
 * Rows with no uses are dropped: a namespace nothing writes a class for is not a
 * dependency, and listing it would pad the one table on the page whose length is
 * the point.
 */
export function TailwindTable({
  rows,
  governs,
}: {
  rows: TailwindNamespace[]
  governs: Record<string, React.ReactNode>
}) {
  const used = rows.filter((r) => r.uses > 0)
  return (
    <Panel>
      {used.map((r, i) => (
        <div
          key={r.namespace}
          className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${i === used.length - 1 ? "" : "border-b border-border-subtle"}`}
        >
          <code className="type-code w-64 shrink-0 text-text-base">{r.namespace}</code>
          <span className="type-body min-w-0 flex-1 text-text-subtle">{governs[r.namespace]}</span>
          <span className="type-hint w-32 shrink-0 text-text-subtle">
            {r.overriddenIn ? "DBUI overrides" : "Tailwind default"}
          </span>
          <span className="type-hint w-16 shrink-0 tabular-nums text-text-subtle">{r.uses}</span>
        </div>
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
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name>--db-{t.name}</Name>
          <Value>{t.value}</Value>
          <span className="type-body min-w-0 flex-1 text-text-subtle">{drives[t.name]}</span>
          <Wired live={live.get(`--db-${t.name}`) ?? false} />
        </Row>
      ))}
    </Panel>
  )
}
