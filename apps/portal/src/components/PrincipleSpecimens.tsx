"use client"

import * as React from "react"
import { Badge, Button } from "dbui"
import { Catalog } from "dbui/components/icons/Catalog"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronRight } from "dbui/components/icons/ChevronRight"
import { Clock } from "dbui/components/icons/Clock"
import { Download } from "dbui/components/icons/Download"
import { Filter } from "dbui/components/icons/Filter"
import { GenieCode } from "dbui/components/icons/GenieCode"
import { Overflow } from "dbui/components/icons/Overflow"
import { Pin } from "dbui/components/icons/Pin"
import { Play } from "dbui/components/icons/Play"
import { Refresh } from "dbui/components/icons/Refresh"
import { Search } from "dbui/components/icons/Search"
import { Share } from "dbui/components/icons/Share"
import { SortAscending } from "dbui/components/icons/SortAscending"
import { Star } from "dbui/components/icons/Star"
import { Table } from "dbui/components/icons/Table"

/**
 * Each principle is demonstrated rather than illustrated: the specimen is built
 * from real DBUI components, so the page is evidence for its own claims. Where a
 * specimen shows a wrong version, it misuses correct tokens rather than
 * hardcoding values — the failure is judgment, not vocabulary.
 */

function Frame({
  label,
  children,
  className = "",
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-2 ${className}`}>
      {label ? <div className="type-eyebrow text-text-subtle">{label}</div> : null}
      <div className="min-w-0 overflow-hidden rounded-md border border-border-base bg-surface-base">
        {children}
      </div>
    </div>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="type-hint mt-3 text-text-subtle">{children}</p>
}

/** 01 — the same object keeps its identity across three unrelated surfaces. */
function ObjectIdentity({ dim = false }: { dim?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <Table className={`size-4 shrink-0 ${dim ? "text-text-subtle" : "text-text-base"}`} />
      <span className="type-body truncate text-text-strong">orders</span>
      <span className="type-hint truncate text-text-subtle">main.sales</span>
    </span>
  )
}

export function AudienceSpecimen() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Frame label="In search">
          <div className="flex items-center gap-1.5 border-b border-border-base px-3 py-2">
            <Search className="size-4 text-text-subtle" />
            <span className="type-body text-text-subtle">orders</span>
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <ObjectIdentity />
            <Badge variant="secondary">Delta</Badge>
          </div>
        </Frame>

        <Frame label="In lineage">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="type-hint shrink-0 rounded-sm border border-border-base px-1.5 py-0.5 text-text-subtle">
              raw_orders
            </span>
            <ChevronRight className="size-4 shrink-0 text-text-subtle" />
            <span className="min-w-0 rounded-sm border border-border-selected bg-surface-selected px-1.5 py-0.5">
              <ObjectIdentity />
            </span>
          </div>
        </Frame>

        <Frame label="In a result">
          <div className="flex items-center justify-between gap-2 border-b border-border-base px-3 py-2">
            <ObjectIdentity />
            <SortAscending className="size-4 text-text-subtle" />
          </div>
          <div className="type-data px-3 py-2 text-text-base">1,284,392 rows</div>
        </Frame>
      </div>
      <Caption>
        One object, three surfaces, one identity — nobody has to work out that these are the same
        table.
      </Caption>
    </div>
  )
}

const ROWS = [
  ["orders", "1.2 TB"],
  ["customers", "84 GB"],
  ["order_items", "3.4 TB"],
  ["shipments", "210 GB"],
  ["returns", "42 GB"],
  ["inventory", "660 GB"],
  ["suppliers", "9 GB"],
  ["price_history", "1.1 TB"],
  ["promotions", "18 GB"],
  ["regions", "2 GB"],
  ["warehouses", "6 GB"],
]

/** 02 — identical height, opposite economy. The comparison is the argument. */
export function CalmSpecimen() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Frame label="Decorated — 4 rows">
          <div className="h-56 overflow-hidden">
            <div className="flex items-center gap-2 bg-action-primary-base px-4 py-3">
              <Catalog className="size-4 text-text-inverse" />
              <span className="type-body-bold text-text-inverse">Tables</span>
            </div>
            <div className="flex flex-col gap-2 p-3">
              {ROWS.slice(0, 4).map(([name, size]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-md bg-surface-subtle px-3 py-2.5 shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Table className="size-4 text-action-primary-base" />
                    <span className="type-body text-text-strong">{name}</span>
                    <Badge variant="secondary">Delta</Badge>
                  </span>
                  <span className="type-hint text-text-subtle">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        <Frame label="Calm — 11 rows">
          <div className="h-56 overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-base px-3 py-1.5">
              <span className="type-label-bold text-text-base">Tables</span>
              <span className="type-hint text-text-subtle">11</span>
            </div>
            {ROWS.map(([name, size]) => (
              <div
                key={name}
                className="flex items-center justify-between border-b border-border-base px-3 py-1"
              >
                <span className="flex items-center gap-1.5">
                  <Table className="size-4 text-text-subtle" />
                  <span className="type-body text-text-base">{name}</span>
                </span>
                <span className="type-data text-text-subtle">{size}</span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
      <Caption>
        Both panels are exactly 224px tall. Removing the decoration did not make the interface
        emptier — it made room for seven more rows.
      </Caption>
    </div>
  )
}

/** 03 — one component, two voices. Only the strings change. */
export function VoiceSpecimen() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Frame label="Hype">
          <div className="flex flex-col gap-2 p-4">
            <span className="type-title-4 text-text-strong">Whoa there!</span>
            <span className="type-body text-text-subtle">
              This action is super permanent and can&rsquo;t be undone. Are you totally sure you want
              to continue?
            </span>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Nope
              </Button>
              <Button variant="destructive" size="sm">
                Yes, do it!
              </Button>
            </div>
          </div>
        </Frame>

        <Frame label="Plain">
          <div className="flex flex-col gap-2 p-4">
            <span className="type-title-4 text-text-strong">Delete catalog main.sales?</span>
            <span className="type-body text-text-subtle">
              Deleting removes 3 schemas and 47 tables, including 2 shared externally. This cannot be
              undone.
            </span>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button variant="destructive" size="sm">
                Delete catalog
              </Button>
            </div>
          </div>
        </Frame>
      </div>
      <Caption>
        Same component, same layout. The version on the right tells you what you are about to lose,
        so the decision belongs to you rather than to the button.
      </Caption>
    </div>
  )
}

const TOOLBAR = [
  { icon: Filter, label: "Filter", keep: true },
  { icon: SortAscending, label: "Sort", keep: true },
  { icon: Download, label: "Export", keep: true },
  { icon: Star, label: "Favorite", keep: false },
  { icon: Pin, label: "Pin", keep: false },
  { icon: Share, label: "Share", keep: false },
  { icon: Refresh, label: "Refresh", keep: false },
  { icon: Clock, label: "History", keep: false },
]

/** 04 — the subtraction test, run in public. */
export function RestraintSpecimen() {
  const [stripped, setStripped] = React.useState(false)
  const shown = stripped ? TOOLBAR.filter((t) => t.keep) : TOOLBAR

  return (
    <div>
      <Frame>
        <div className="flex min-h-11 flex-wrap items-center gap-1 border-b border-border-base px-2 py-1.5">
          {shown.map(({ icon: Icon, label, keep }) => (
            <span
              key={label}
              className={`type-label flex items-center gap-1 rounded-sm px-2 py-1 transition-opacity ${
                stripped || keep ? "text-text-base" : "text-text-subtle opacity-40"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </span>
          ))}
          <span className="ml-auto flex items-center px-1 text-text-subtle">
            <Overflow className="size-4" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 px-3 py-2.5">
          <span className="type-body text-text-subtle">
            {stripped
              ? "Five removed. The table still filters, sorts and exports."
              : "Eight controls. Five are used by under 2% of sessions."}
          </span>
          <Button variant="outline" size="sm" onClick={() => setStripped((s) => !s)}>
            {stripped ? "Put them back" : "Run the test"}
          </Button>
        </div>
      </Frame>
      <Caption>
        The test is subtraction: remove it, and if nothing breaks and nobody notices, it had not
        earned its place.
      </Caption>
    </div>
  )
}

/** 05 — automation completes the work and stops short of the decision. */
export function AutomationSpecimen() {
  return (
    <div>
      <Frame>
        <div className="flex items-center gap-2 border-b border-border-base px-3 py-2">
          <GenieCode className="size-4 text-text-subtle" />
          <span className="type-body text-text-subtle">
            Which regions missed their Q3 revenue target?
          </span>
        </div>
        <div className="border-b border-border-base bg-surface-subtle px-3 py-2.5">
          <pre className="type-code m-0 overflow-x-auto whitespace-pre text-text-base">
            {`SELECT region, SUM(revenue) AS actual, target
FROM main.sales.orders o
JOIN main.finance.targets t USING (region)
WHERE quarter = 'Q3' GROUP BY region, target
HAVING actual < target`}
          </pre>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
          <span className="type-hint text-text-subtle">
            Scans 1.2B rows across 2 tables · about 40s on serverless
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Edit query
            </Button>
            <Button size="sm">
              <Play />
              Run
            </Button>
          </div>
        </div>
      </Frame>
      <Caption>
        The query took a second to write and would have taken twenty minutes. It still has not run —
        reading it is the part only a person can do.
      </Caption>
    </div>
  )
}

/** 06 — the trace is one interaction away, and the interaction is the point. */
export function EvidenceSpecimen() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Frame>
        <div className="flex flex-wrap items-end justify-between gap-3 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="type-hint text-text-subtle">Orders · last 30 days</span>
            <span className="type-title-2 text-text-strong">1,284,392</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>
            {open ? <ChevronDown /> : <ChevronRight />}
            {open ? "Hide trace" : "Show trace"}
          </Button>
        </div>

        {open ? (
          <div className="flex flex-col gap-2 border-t border-border-base bg-surface-subtle px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="type-hint flex items-center gap-1.5 text-text-subtle">
                <Table className="size-4" />
                main.sales.orders
              </span>
              <span className="type-hint flex items-center gap-1.5 text-text-subtle">
                <Clock className="size-4" />
                Updated 4 minutes ago
              </span>
              <span className="type-hint flex items-center gap-1.5 text-status-text-warning">
                2 partitions excluded
              </span>
            </div>
            <pre className="type-code m-0 overflow-x-auto whitespace-pre text-text-base">
              {`SELECT COUNT(*) FROM main.sales.orders
WHERE order_date >= current_date() - 30`}
            </pre>
          </div>
        ) : null}
      </Frame>
      <Caption>
        The number is the same either way. The trace is what lets someone stake their name on it —
        including the part that says the count is incomplete.
      </Caption>
    </div>
  )
}
