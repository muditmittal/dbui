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

import type { ColorGroup, Token } from "./token-data"

/** Families like colour run to dozens of rows; show a useful handful first. */
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

/* ── Colour ─────────────────────────────────────────────────────────────── */

/** Light and dark side by side, because a token that only works in one is a bug. */
export function ColorSwatches({ group, limit = 6 }: { group: ColorGroup; limit?: number }) {
  const hidden = Math.max(0, group.tokens.length - limit)
  return (
    <ShowMore count={hidden ? group.tokens.length : 0} label={`${group.label.toLowerCase()} tokens`}>
      {(expanded) => (
        <Panel>
          {(expanded ? group.tokens : group.tokens.slice(0, limit)).map((t, i, arr) => (
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
              <span className="type-hint truncate text-text-subtle">{t.light}</span>
            </Row>
          ))}
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

export function TypeScale({
  rows,
}: {
  rows: { name: string; size: string; lh: string; weight: string; sample: string; use: string }[]
}) {
  return (
    <Panel>
      {rows.map((t, i) => (
        <div
          key={t.name}
          className={`flex items-start gap-4 px-4 py-3 ${i === rows.length - 1 ? "" : "border-b border-border-subtle"}`}
        >
          <div className="w-48 shrink-0">
            <code className="type-code text-text-base">{t.name}</code>
            <div className="type-hint text-text-subtle">
              {t.size}/{t.lh} · {t.weight}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <span className={`${t.name} text-text-base`}>{t.sample}</span>
          </div>
          <div className="type-hint w-45 shrink-0 text-text-subtle">{t.use}</div>
        </div>
      ))}
    </Panel>
  )
}

/* ── Scalars ────────────────────────────────────────────────────────────── */

export function ScalarList({ tokens }: { tokens: Token[] }) {
  return (
    <Panel>
      {tokens.map((t, i) => (
        <Row key={t.name} last={i === tokens.length - 1}>
          <Name>--db-{t.name}</Name>
          <Value>{t.value}</Value>
          <Badge variant="outline">dial</Badge>
        </Row>
      ))}
    </Panel>
  )
}
