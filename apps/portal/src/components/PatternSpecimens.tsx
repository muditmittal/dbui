"use client"

import * as React from "react"

import { Alert, AlertAction, AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "dbui/components/ui/alert"
import { Badge } from "dbui/components/ui/badge"
import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "dbui/components/ui/collapsible"
import { ControlsBar, ControlsBarFilters } from "dbui/components/ui/controls-bar"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "dbui/components/ui/empty"
import { KeyValueItem, KeyValueKey, KeyValuePair, KeyValueValue } from "dbui/components/ui/key-value-pair"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Skeleton } from "dbui/components/ui/skeleton"
import { Status } from "dbui/components/ui/status"
import { Tag, TagLabel, TagRemove, TagValue } from "dbui/components/ui/tag"
import { FilterToggle } from "dbui/components/ui/toggle"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { ChevronRight } from "dbui/components/icons/ChevronRight"
import { DangerFill } from "dbui/components/icons/DangerFill"
import { Filter } from "dbui/components/icons/Filter"
import { Lock } from "dbui/components/icons/Lock"
import { Plus } from "dbui/components/icons/Plus"
import { Query } from "dbui/components/icons/Query"
import { WarningFill } from "dbui/components/icons/WarningFill"

import { Figure } from "@/components/docs/Diagram"

/**
 * Six examples for the Patterns page.
 *
 * The bar each one had to clear: it shows something the do-and-don't rows
 * cannot. A pattern is behavior over time, so five of these are live and the
 * thing worth seeing is a transition — a region that opens before its content
 * arrives, rows that dim instead of blanking, a wait too short to draw. The
 * sixth is a drawn diagram, because "what does all mean" is a question about
 * nested sets and a set is a shape.
 *
 * Two patterns have none. Both say why on the page rather than quietly going
 * without.
 *
 * Where a specimen needs a control that belongs to the documentation rather
 * than to the product — a switch between five causes nobody would ship — that
 * control sits above the frame. Inside the frame, every control is one the
 * pattern itself would ship, so nothing in there is a docs affordance wearing
 * product clothes.
 *
 * Everything is DOM, DBUI components and semantic tokens. Timers stand in for
 * latency and are the only reason these are client modules.
 */

/** Frame plus the caption that says what to watch for. */
function Specimen({
  control,
  caption,
  children,
}: {
  control?: React.ReactNode
  caption: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {control}
      <Figure caption={caption}>{children}</Figure>
    </div>
  )
}

/** A row of docs-owned controls, labeled so it does not read as product UI. */
function SpecimenControl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="type-eyebrow text-text-subtle">{label}</span>
      {children}
    </div>
  )
}

/** Clears every timer on unmount, so a scrolled-past demo stops working. */
function useTimers() {
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  React.useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    },
    []
  )

  return React.useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])
}

/* ------------------------------------------------------------------ 01 */

const EMPTY_CAUSES = ["Loading", "Nothing yet", "Filtered", "No access", "Failed"] as const
type EmptyCause = (typeof EMPTY_CAUSES)[number]

export function EmptyStatesSpecimen() {
  const [cause, setCause] = React.useState<EmptyCause>("Nothing yet")

  return (
    <Specimen
      control={
        <SpecimenControl label="Cause">
          <SegmentControl
            className="flex w-full"
            size="sm"
            value={[cause]}
            onValueChange={(next) => setCause((next[0] as EmptyCause) ?? "Nothing yet")}
            aria-label="Cause of the empty region"
          >
            {EMPTY_CAUSES.map((value) => (
              <SegmentControlItem key={value} value={value}>
                {value}
              </SegmentControlItem>
            ))}
          </SegmentControl>
        </SpecimenControl>
      }
      caption="One region, five causes. Only one of them offers a create action, and the one that failed keeps the way back rather than the way in."
    >
      <div
        className={`flex min-h-44 flex-col px-4 py-4 ${
          cause === "Loading" ? "justify-start gap-2" : "justify-center"
        }`}
      >
        {cause === "Loading" ? (
          <>
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-4">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </>
        ) : cause === "Failed" ? (
          <Alert variant="danger">
            <AlertIcon>
              <DangerFill />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Couldn&rsquo;t load queries</AlertTitle>
              <AlertDescription>
                The workspace did not respond. Your filters are still applied.
              </AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button variant="outline" size="sm">
                Retry
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                {cause === "No access" ? <Lock /> : cause === "Filtered" ? <Filter /> : <Query />}
              </EmptyMedia>
              <EmptyTitle>
                {cause === "Nothing yet"
                  ? "No queries yet"
                  : cause === "Filtered"
                    ? "No results for those filters"
                    : "No grant on this schema"}
              </EmptyTitle>
              <EmptyDescription>
                {cause === "Nothing yet"
                  ? "Create a query to start exploring this catalog."
                  : cause === "Filtered"
                    ? "Owner is you and status is failed. Clear one to widen the search."
                    : "Ask a metastore admin for SELECT on main.sales."}
              </EmptyDescription>
            </EmptyHeader>
            {cause === "Nothing yet" ? (
              <EmptyContent>
                <Button size="sm">
                  <ButtonIcon>
                    <Plus />
                  </ButtonIcon>
                  Create query
                </Button>
              </EmptyContent>
            ) : cause === "Filtered" ? (
              <EmptyContent>
                <Button variant="outline" size="sm">
                  Clear filters
                </Button>
              </EmptyContent>
            ) : null}
          </Empty>
        )}
      </div>
    </Specimen>
  )
}

/* ------------------------------------------------------------------ 02 */

const FILTERS = [
  { id: "owner", label: "Owner", value: "You" },
  { id: "failed", label: "Status", value: "Failed" },
  { id: "recent", label: "Started", value: "Last 7 days" },
] as const

const RUNS = [
  { name: "daily_revenue_rollup", owner: "you", failed: true, days: 19 },
  { name: "orders_incremental", owner: "you", failed: false, days: 1 },
  { name: "customer_360_refresh", owner: "dana", failed: true, days: 3 },
  { name: "inventory_snapshot", owner: "you", failed: false, days: 4 },
  { name: "churn_features", owner: "dana", failed: false, days: 11 },
]

function matches(run: (typeof RUNS)[number], active: string[]) {
  if (active.includes("owner") && run.owner !== "you") return false
  if (active.includes("failed") && !run.failed) return false
  if (active.includes("recent") && run.days > 7) return false
  return true
}

export function FilteringSpecimen() {
  const [active, setActive] = React.useState<string[]>([])
  const [shown, setShown] = React.useState(RUNS)
  const [resolving, setResolving] = React.useState(false)

  // The rows lag the controls on purpose. That gap is the pattern: the filter
  // is applied the instant it is clicked, and the set it produces arrives later.
  React.useEffect(() => {
    if (!resolving) return
    const t = setTimeout(() => {
      setShown(RUNS.filter((run) => matches(run, active)))
      setResolving(false)
    }, 700)
    return () => clearTimeout(t)
  }, [resolving, active])

  function apply(next: string[]) {
    setActive(next)
    setResolving(true)
  }

  const empty = !resolving && shown.length === 0

  return (
    <Specimen caption="Applying a filter dims the rows already on screen rather than blanking them, and reads back as a removable tag. All three at once matches nothing, so the way out is to relax one rather than clear them all.">
      <ControlsBar className="border-b border-border-subtle">
        <ControlsBarFilters>
          {FILTERS.map((filter) => (
            <FilterToggle
              key={filter.id}
              size="sm"
              pressed={active.includes(filter.id)}
              onPressedChange={(pressed) =>
                apply(
                  pressed
                    ? [...active, filter.id]
                    : active.filter((id) => id !== filter.id)
                )
              }
            >
              {filter.label}: {filter.value}
            </FilterToggle>
          ))}
        </ControlsBarFilters>
      </ControlsBar>

      <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle px-4 py-2">
        {active.length === 0 ? (
          <span className="type-hint text-text-subtle">No filters applied</span>
        ) : (
          FILTERS.filter((filter) => active.includes(filter.id)).map((filter) => (
            <Tag key={filter.id}>
              <TagLabel>{filter.label}</TagLabel>
              <TagValue>{filter.value}</TagValue>
              <TagRemove
                aria-label={`Remove ${filter.label} filter`}
                onClick={() => apply(active.filter((id) => id !== filter.id))}
              />
            </Tag>
          ))
        )}
        {active.length > 1 ? (
          <Button variant="link" size="sm" onClick={() => apply([])}>
            Clear all
          </Button>
        ) : null}
        <span className="type-hint ml-auto text-text-subtle tabular-nums">
          {shown.length} of {RUNS.length} runs
        </span>
      </div>

      <div
        className={`flex min-h-40 flex-col transition-opacity motion-reduce:transition-none ${
          resolving ? "opacity-40" : "opacity-100"
        } ${empty ? "justify-center px-4 py-4" : "justify-start"}`}
      >
        {empty ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Filter />
              </EmptyMedia>
              <EmptyTitle>No runs match those filters</EmptyTitle>
              <EmptyDescription>
                Owner, status and start date are all narrowing at once.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={() => apply([])}>
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          shown.map((run) => (
            <div
              key={run.name}
              className="flex items-center gap-3 border-b border-border-subtle px-4 py-2 last:border-b-0"
            >
              <span className="type-code min-w-0 flex-1 truncate text-text-base">{run.name}</span>
              <span className="type-hint w-14 shrink-0 text-text-subtle">{run.owner}</span>
              <span className="flex w-20 shrink-0 items-center gap-1.5">
                <Status status={run.failed ? "error" : "success"} size="sm" />
                <span className="type-hint text-text-subtle">
                  {run.failed ? "Failed" : "Succeeded"}
                </span>
              </span>
            </div>
          ))
        )}
      </div>
    </Specimen>
  )
}

/* ------------------------------------------------------------------ 03 */

const COLUMN_STATS = [
  ["Rows", "1,284,392"],
  ["Nulls in customer_id", "0.4%"],
  ["Distinct order_id", "1,284,392"],
]

export function DisclosureSpecimen() {
  const [open, setOpen] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const after = useTimers()

  return (
    <Specimen caption="The region takes its height the moment it opens and holds a skeleton until the statistics arrive. Opening is instant, filling is not, and nothing above the trigger moves either way.">
      <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-2.5">
        <span className="type-code text-text-base">main.sales.orders</span>
        <Badge variant="outline">Delta</Badge>
      </div>

      <Collapsible
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (next && !loaded) after(() => setLoaded(true), 900)
        }}
      >
        <div className="px-2 py-1.5">
          <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
            <ButtonIcon>{open ? <ChevronDown /> : <ChevronRight />}</ButtonIcon>
            Column statistics
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="flex min-h-24 flex-col justify-center border-t border-border-subtle px-4 py-3">
            {loaded ? (
              <KeyValuePair>
                {COLUMN_STATS.map(([key, value]) => (
                  <KeyValueItem key={key}>
                    <KeyValueKey>{key}</KeyValueKey>
                    <KeyValueValue className="tabular-nums">{value}</KeyValueValue>
                  </KeyValueItem>
                ))}
              </KeyValuePair>
            ) : (
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex items-center justify-between gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Specimen>
  )
}

/* ------------------------------------------------------------------ 04 */

/**
 * Drawn rather than live. "What does all mean" is a question about nested sets,
 * and nesting is the one thing a paragraph cannot draw — three counts in a
 * sentence read as three unrelated numbers.
 */
function ScopeRing({
  label,
  count,
  note,
  filled = false,
  children,
}: {
  label: string
  count: string
  note: string
  filled?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-md border border-border-base p-3 ${
        filled ? "bg-surface-subtle" : ""
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="type-label-bold text-text-strong">{label}</span>
        <span className="type-code text-text-base tabular-nums">{count}</span>
      </div>
      <span className="type-hint text-text-subtle">{note}</span>
      {children}
    </div>
  )
}

export function BulkScopeSpecimen() {
  return (
    <Specimen caption="One click on the header checkbox selects the inner set. Every ring out takes a control of its own, with the computed number in the label.">
      <div className="p-4">
        <ScopeRing
          label="Every run in the table"
          count="40,912"
          note="Context, not a selection. It is what makes the two counts inside it legible"
        >
          <ScopeRing
            label="Every run this filter matches"
            count="812"
            note="A separate control, and crossing into it is the reader's decision"
          >
            <ScopeRing
              label="This page"
              count="25 selected"
              note="What one click on the header checkbox gives you, and what all means until the interface says otherwise"
              filled
            />
          </ScopeRing>
        </ScopeRing>
      </div>
    </Specimen>
  )
}

/* ------------------------------------------------------------------ 05 */

type ScanPhase = "idle" | "busy" | "running" | "done"

export function ThresholdSpecimen() {
  const [count, setCount] = React.useState(1284392)
  const [refreshBusy, setRefreshBusy] = React.useState(false)
  const [scan, setScan] = React.useState<ScanPhase>("idle")
  const settled = React.useRef(true)
  const after = useTimers()

  // The gate is the pattern: start the work, wait, and draw an indicator only
  // if the work is still going. The count is always back before the gate opens,
  // so this branch renders nothing at all.
  function refresh() {
    settled.current = false
    after(() => {
      settled.current = true
      setRefreshBusy(false)
      setCount((c) => c + 118)
    }, 180)
    after(() => {
      if (!settled.current) setRefreshBusy(true)
    }, 400)
  }

  function runScan() {
    setScan("busy")
    after(() => setScan("running"), 1400)
    after(() => setScan("done"), 3600)
  }

  return (
    <Specimen caption="The count is back before the gate opens, so it draws no indicator at all. The scan crosses the same gate, so its trigger goes busy and then hands off to a named run the reader is free to leave.">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle px-4 py-3">
        <span className="type-body text-text-subtle">Rows in main.sales.orders</span>
        <span className="type-body text-text-strong tabular-nums">
          {count.toLocaleString("en-US")}
        </span>
      </div>

      <div className="flex min-h-14 items-center gap-3 border-b border-border-subtle px-4 py-2.5">
        {scan === "idle" ? (
          <span className="type-hint text-text-subtle">No scan running</span>
        ) : scan === "busy" ? (
          <span className="type-hint text-text-subtle">
            Starting. Nothing has a name to come back to yet
          </span>
        ) : (
          <>
            <Status status={scan === "done" ? "success" : "running"} size="sm" />
            <span className="type-body text-text-base">Permission scan · main</span>
            <span className="type-hint ml-auto text-text-subtle">
              {scan === "done" ? "Finished" : "Continues if you leave this page"}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2 px-4 py-2.5">
        <Button variant="outline" size="sm" loading={refreshBusy} onClick={refresh}>
          Refresh count
        </Button>
        <Button
          variant="outline"
          size="sm"
          loading={scan === "busy"}
          onClick={runScan}
          disabled={scan === "running"}
        >
          Run permission scan
        </Button>
      </div>
    </Specimen>
  )
}

/* ------------------------------------------------------------------ 06 */

const SOURCES = [
  { name: "main_us", ok: true },
  { name: "main_apac", ok: true },
  { name: "main_eu", ok: false },
]

export function PartialResultSpecimen() {
  const [dismissed, setDismissed] = React.useState(false)

  return (
    <Specimen caption="Dismiss the banner and the mark on the number stays. The banner is dismissible, the fact is not, and the source that failed is named rather than described as some data.">
      {dismissed ? null : (
        <div className="border-b border-border-subtle p-3">
          <Alert variant="warning">
            <AlertIcon>
              <WarningFill />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Result is incomplete</AlertTitle>
              <AlertDescription>
                main_eu did not respond. Rows from main_us and main_apac are shown.
              </AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button variant="outline" size="sm">
                Retry main_eu
              </Button>
            </AlertAction>
            <AlertClose onClick={() => setDismissed(true)} />
          </Alert>
        </div>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 py-3">
        <span className="type-body text-text-subtle">Rows returned</span>
        <span className="flex items-center gap-2">
          <span className="type-body text-text-strong tabular-nums">8,412</span>
          <Badge variant="warning">2 of 3 catalogs</Badge>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border-subtle px-4 py-2.5">
        {SOURCES.map((source) => (
          <span key={source.name} className="flex items-center gap-1.5">
            <Status status={source.ok ? "success" : "error"} size="sm" />
            <span className="type-hint text-text-subtle">{source.name}</span>
          </span>
        ))}
      </div>
    </Specimen>
  )
}

/**
 * Keyed by `Pattern.specimen`. The switch lives inside the client boundary so
 * the page passes a string across it rather than a component.
 */
export function PatternSpecimen({ id }: { id: string }) {
  switch (id) {
    case "empty-states":
      return <EmptyStatesSpecimen />
    case "filtering":
      return <FilteringSpecimen />
    case "progressive-disclosure":
      return <DisclosureSpecimen />
    case "bulk-selection":
      return <BulkScopeSpecimen />
    case "long-running":
      return <ThresholdSpecimen />
    case "partial-results":
      return <PartialResultSpecimen />
    default:
      return null
  }
}
