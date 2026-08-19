import figma from "@figma/code-connect"
import { MetricCard } from "dbui/components/ui/metric-card"
import { BarChart } from "dbui-viz/components/bar-chart"
import { LineSeries } from "dbui-viz/components/line-series"
import { DonutChart } from "dbui-viz/components/donut-chart"
import { Treemap } from "dbui-viz/components/treemap"
import { SegmentedBar } from "dbui-viz/components/segmented-bar"
import { Leaderboard } from "dbui-viz/components/leaderboard"

// `Viz/Card/*` — 408x300, three slots in reading order: metric header, a 376x168
// viz slot, then the handoff.
//
// One React component, six Figma cards. This previously pointed at a single
// `Viz/Widget` with an instance-swap `Chart` property, which is gone: a swap slot
// means the chart a card holds is invisible until you select the card and open the
// right panel, so a designer looking for a line card never finds one. Each chart
// type is now its own card, and the chart is `children` rather than a prop.
//
// `Viz/Card/Metric` is not here — that one carries no chart and is `StatCard`.

// `Viz/Inner/Metric` carries `Show change=true` in every card, so the delta is part
// of the header rather than an option. `deltaTone` has no Figma axis on purpose:
// whether a rise is good is the product's call, not the arithmetic's.
const SHARED = {
  hint: "Queries against governed assets in the period",
  delta: "+2.6%",
  deltaWindow: "past 30d",
  link: { label: "Review Data Usage" },
}

// ── Bar ──────────────────────────────────────────────────────────────────────
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27131",
  {
    example: () => (
      <MetricCard label="Asset usage" value="16.6M queries" {...SHARED}>
        <BarChart
          label="Queries per day"
          height={168}
          data={[
            { x: "Jan 7", y: 290 },
            { x: "Jan 8", y: 210 },
            { x: "Jan 9", y: 400 },
          ]}
        />
      </MetricCard>
    ),
  }
)

// ── Line ─────────────────────────────────────────────────────────────────────
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27132",
  {
    example: () => (
      <MetricCard label="Storage" value="6.8 TiB" {...SHARED}>
        <LineSeries
          label="Storage over time"
          height={168}
          data={[
            { x: "2026-01-07", y: 4.2 },
            { x: "2026-01-14", y: 5.1 },
            { x: "2026-01-21", y: 6.8 },
          ]}
        />
      </MetricCard>
    ),
  }
)

// ── Leaderboard ──────────────────────────────────────────────────────────────
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27130",
  {
    example: () => (
      <MetricCard label="Top tables" value="1,204 tables" {...SHARED}>
        <Leaderboard
          items={[
            { id: "a", label: "product_inventory", value: "48,235", weight: 1 },
            { id: "b", label: "user_accounts", value: "42,151", weight: 0.87 },
            { id: "c", label: "order_history", value: "39,996", weight: 0.83 },
          ]}
        />
      </MetricCard>
    ),
  }
)

// ── Donut ────────────────────────────────────────────────────────────────────
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27129",
  {
    example: () => (
      <MetricCard label="Asset mix" value="4,820 assets" {...SHARED}>
        <DonutChart
          label="Assets by type"
          size={168}
          centerValue="4,820"
          centerLabel="assets"
          slices={[
            { id: "tables", label: "Tables", value: 2400 },
            { id: "volumes", label: "Volumes", value: 1500 },
            { id: "models", label: "Models", value: 920 },
          ]}
        />
      </MetricCard>
    ),
  }
)

// ── Treemap ──────────────────────────────────────────────────────────────────
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27128",
  {
    example: () => (
      <MetricCard label="Storage by catalog" value="6.8 TiB" {...SHARED}>
        <Treemap
          label="Storage by catalog"
          height={168}
          maxGroups={5}
          data={[
            {
              id: "main",
              name: "main",
              leaves: [{ id: "sales", name: "sales", value: 3200 }],
            },
            {
              id: "samples",
              name: "samples",
              leaves: [{ id: "nyc", name: "nyctaxi", value: 1850 }],
            },
          ]}
        />
      </MetricCard>
    ),
  }
)

// ── Segmented bar ────────────────────────────────────────────────────────────
// This card is 408x144, not 300 — a 12px bar needs none of the height a chart does.
figma.connect(
  MetricCard,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5015-27127",
  {
    example: () => (
      <MetricCard label="Health" value="92% healthy" {...SHARED}>
        <SegmentedBar
          label="Assets by health"
          segments={[
            { id: "healthy", label: "Healthy", value: 92, palette: "level-pass" },
            { id: "warning", label: "Warning", value: 6, palette: "level-medium" },
            { id: "failing", label: "Failing", value: 2, palette: "level-high" },
          ]}
        />
      </MetricCard>
    ),
  }
)
