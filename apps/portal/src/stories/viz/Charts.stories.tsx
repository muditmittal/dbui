import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  LineSeries,
  BarChart,
  SegmentedBar,
  DonutChart,
  Treemap,
  type TreemapSelection,
} from "dbui-viz"

const meta: Meta = {
  title: "Components/Viz/Charts",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 text-[13px] leading-[20px] font-semibold text-text-base">
        {title}
      </h3>
      {hint ? (
        <p className="mb-3 text-[12px] leading-[16px] text-text-subtle">
          {hint}
        </p>
      ) : null}
      <div className="rounded-2 border border-border-base bg-surface-base p-4">
        {children}
      </div>
    </section>
  )
}

// 30 days of query volume, shaped like the GovernanceHub "Queries (30d)" widget.
const queryVolume = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(2026, 5, 19)
  date.setDate(date.getDate() + index)
  const base = 180 + index * 22
  const wobble = Math.sin(index / 1.6) * 90 + (index % 5) * 25
  return {
    x: date.toISOString().slice(0, 10),
    y: Math.max(40, Math.round(base + wobble)),
  }
})

const failuresByWeek = [
  { x: "Jun 19", y: 420 },
  { x: "Jun 26", y: 510 },
  { x: "Jul 2", y: 390 },
  { x: "Jul 9", y: 780 },
  { x: "Jul 16", y: 910 },
  { x: "Jul 23", y: 860 },
]

const spendBySerivce = [
  { x: "Jun", y: 32000, series: "Compute" },
  { x: "Jun", y: 9000, series: "Storage" },
  { x: "Jul", y: 41000, series: "Compute" },
  { x: "Jul", y: 11500, series: "Storage" },
  { x: "Aug", y: 38000, series: "Compute" },
  { x: "Aug", y: 12500, series: "Storage" },
]

// Named steps for the tail, numbered steps for the real categories — the mix a
// chart author actually writes.
const assetMix = [
  { label: "Tables", value: 4821, palette: "categorical-1" as const },
  { label: "Volumes", value: 1930, palette: "categorical-3" as const },
  { label: "Models", value: 640, palette: "categorical-7" as const },
  { label: "Others", value: 210, palette: "neutral" as const },
]

const healthMix = [
  { label: "Healthy", value: 812, palette: "positive" as const },
  { label: "Unhealthy", value: 96, palette: "negative" as const },
  { label: "Unknown", value: 142, palette: "neutral" as const },
]

const catalogs = [
  {
    id: "main",
    name: "main",
    leaves: [
      { id: "user_management", name: "user_management", value: 8200 },
      { id: "default", name: "default", value: 3100 },
      { id: "staging", name: "staging", value: 1400 },
    ],
  },
  {
    id: "sales_main",
    name: "sales_main",
    leaves: [
      { id: "product_data", name: "product_data", value: 6100 },
      { id: "crm", name: "crm", value: 2400 },
    ],
  },
  {
    id: "logistics_prod",
    name: "logistics_prod",
    leaves: [
      { id: "shipping_info", name: "shipping_info", value: 4300 },
      { id: "routes", name: "routes", value: 900 },
    ],
  },
  {
    id: "feedback_catalog",
    name: "feedback_catalog",
    leaves: [{ id: "review_data", name: "review_data", value: 2600 }],
  },
  { id: "sandbox", name: "sandbox", value: 1200 },
  { id: "archive_2024", name: "archive_2024", value: 800 },
  { id: "scratch", name: "scratch", value: 450 },
]

export const Line: StoryObj = {
  render: () => (
    <>
      <Section
        title="LineSeries — with axes"
        hint="Default ink line with a subtle area fill and a dot on the latest value."
      >
        <LineSeries data={queryVolume} label="Queries over the last 30 days" />
      </Section>

      <Section
        title="LineSeries — sparkline"
        hint="showAxis={false} and a short height for inline use in cards and table cells."
      >
        <div className="w-64">
          <LineSeries
            data={queryVolume}
            height={44}
            showAxis={false}
            label="Queries sparkline"
          />
        </div>
      </Section>

      <Section title="LineSeries — a series that means something">
        <LineSeries
          data={failuresByWeek}
          xType="ordinal"
          palette="negative"
          label="Failures per week"
        />
      </Section>
    </>
  ),
}

export const Bars: StoryObj = {
  render: () => (
    <>
      <Section
        title="BarChart — vertical"
        hint="Gradient fill plus a 1px border, the GovernanceHub bar treatment."
      >
        <BarChart data={failuresByWeek} label="Failures per week" />
      </Section>

      <Section title="BarChart — horizontal">
        <BarChart
          data={failuresByWeek}
          orientation="horizontal"
          palette="categorical-8"
          label="Failures per week"
        />
      </Section>

      <Section
        title="BarChart — stacked"
        hint="Pass `series` on each datum to stack. Set normalize to show shares."
      >
        <BarChart data={spendBySerivce} label="Spend by service" />
      </Section>
    </>
  ),
}

export const Segmented: StoryObj = {
  render: () => (
    <>
      <Section
        title="SegmentedBar — asset mix"
        hint="Part-to-whole in a single row. Ideal above a table or inside a metric card."
      >
        <SegmentedBar segments={assetMix} label="Assets by type" />
      </Section>

      <Section title="SegmentedBar — health, no legend">
        <SegmentedBar
          segments={healthMix}
          showLegend={false}
          label="Asset health"
        />
      </Section>
    </>
  ),
}

export const Donut: StoryObj = {
  render: () => (
    <Section
      title="DonutChart"
      hint="The center hole carries the total — never render a full pie."
    >
      <DonutChart
        slices={healthMix}
        centerValue="1,050"
        centerLabel="assets"
        label="Asset health"
      />
    </Section>
  ),
}

export const TreemapTiles: StoryObj = {
  name: "Treemap",
  render: () => {
    const [selection, setSelection] = React.useState<TreemapSelection | null>(
      null
    )

    return (
      <Section
        title="Treemap — catalogs by schema size"
        hint="Ported from the GovernanceHub Vega spec. Groups are catalogs, leaves are schemas. Hover a tile, then click it."
      >
        <Treemap
          data={catalogs}
          maxGroups={5}
          height={280}
          onSelect={setSelection}
          label="Catalogs by size"
        />
        <p className="mt-3 text-[12px] leading-[16px] text-text-subtle">
          {selection
            ? `Selected ${selection.type}: ${selection.name}${
                selection.groupName ? ` (in ${selection.groupName})` : ""
              }`
            : "Nothing selected yet."}
        </p>
      </Section>
    )
  },
}
