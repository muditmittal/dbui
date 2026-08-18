import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { MetricCard } from "dbui/components/ui/metric-card"
import {
  SegmentControl,
  SegmentControlItem,
} from "dbui/components/ui/segment-control"
import { Robot } from "dbui/components/icons/Robot"
import {
  BarChart,
  DonutChart,
  Leaderboard,
  Legend,
  SegmentedBar,
  Treemap,
} from "dbui-viz"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/metric-card?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Content/Metric Card",
  parameters: { layout: "padded" },
}

export default meta

const queriesByDay = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(2026, 0, 7)
  date.setDate(date.getDate() + index)
  const wobble = Math.sin(index / 1.7) * 260 + (index % 4) * 90
  return {
    x: date.toISOString().slice(0, 10),
    y: Math.max(120, Math.round(560 + wobble)),
  }
})

const principals = [
  { id: "1", label: "prod_etl_agent", value: "11.7K", weight: 11700, icon: <Robot /> },
  { id: "2", label: "genie_lookup", value: "7.6K", weight: 7600, icon: <Robot /> },
  { id: "3", label: "dbt_runner", value: "7.6K", weight: 7600, icon: <Robot /> },
  { id: "4", label: "quality_monitor", value: "6.1K", weight: 6100, icon: <Robot /> },
  { id: "5", label: "lineage_crawler", value: "1.9K", weight: 1900, icon: <Robot /> },
]

const grantLevels = [
  { id: "asset", label: "Asset level", value: "23.4%", palette: "sequential-7" as const },
  { id: "schema", label: "Schema level", value: "62.1%", palette: "sequential-5" as const },
  { id: "catalog", label: "Catalog level", value: "6.1%", palette: "sequential-3" as const },
  { id: "metastore", label: "Metastore level", value: "1.1%", palette: "sequential-1" as const },
]

const storage = [
  {
    id: "sales",
    name: "sales_main",
    leaves: [
      { id: "crm", name: "crm", value: 2200 },
      { id: "orders", name: "orders", value: 1400 },
      { id: "returns", name: "returns", value: 480 },
    ],
  },
  {
    id: "ml",
    name: "ml_feature_store",
    leaves: [
      { id: "features", name: "features", value: 1800 },
      { id: "training", name: "training", value: 700 },
    ],
  },
  {
    id: "finance",
    name: "finance_reporting",
    leaves: [{ id: "ledger", name: "ledger", value: 900 }],
  },
]

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
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      {children}
    </section>
  )
}

export const Playground: StoryObj = {
  render: () => {
    return (
      <div>
        <Section
          title="One card, four children"
          hint="Every widget on a Governance overview is this component. What changes is the viz slot — never the chrome, and never whether there is a handoff."
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <MetricCard
              label="Asset usage"
              value="16.6M queries"
              hint="Queries against governed assets in the period"
              delta="+2.6%"
              deltaWindow="past 30d"
              deltaTone="positive"
              link={{ label: "Review Data Usage" }}
            >
              {/* Sequential rather than the categorical default: one series
                  carrying a magnitude, and the same ramp the Leaderboard beside
                  it draws from, so the page reads as one language. */}
              <BarChart
                data={queriesByDay}
                xType="temporal"
                height={168}
                palette="sequential-4"
                label="Queries per day"
              />
            </MetricCard>

            <MetricCard
              label="Active users"
              value="489 principals"
              hint="Principals that ran at least one query"
              action={
                <SegmentControl defaultValue={["agents"]}>
                  <SegmentControlItem value="all">All</SegmentControlItem>
                  <SegmentControlItem value="agents">Agents</SegmentControlItem>
                </SegmentControl>
              }
              link={{ label: "Review Usage by Agents" }}
            >
              <Leaderboard
                columns={{ label: "Principal", value: "Queries" }}
                items={principals}
              />
            </MetricCard>

            <MetricCard
              label="Data Access"
              value="7.8K grants"
              hint="Privileges granted across the metastore"
              link={{ label: "Review Access" }}
            >
              <div className="flex items-center gap-4">
                <DonutChart
                  slices={grantLevels.map((level) => ({
                    label: level.label,
                    value: Number.parseFloat(String(level.value)),
                    palette: level.palette,
                  }))}
                  showLegend={false}
                  size={112}
                  label="Grants by level"
                />
                <Legend
                  className="flex-1"
                  columns={{ label: "Grants by levels", value: "Assign %" }}
                  items={grantLevels}
                />
              </div>
            </MetricCard>

            <MetricCard
              label="Data storage"
              value="6.8 TiB size"
              hint="Managed storage across every catalog"
              link={{ label: "Review Data Storage" }}
            >
              <Treemap data={storage} height={168} label="Storage by catalog" />
            </MetricCard>
          </div>
        </Section>

        <Section
          title="A short card is still the same card"
          hint="A bar needs 8px, a treemap needs 240. The chrome does not change and the handoff does not move — pair cards of a kind in a row and the grid keeps them level."
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <MetricCard
              label="Data Classification"
              value="12.8% tables contain PII"
              hint="Tables with at least one column classified as PII"
              link={{ label: "Review Data Classifications" }}
            >
              <SegmentedBar
                showLegend={false}
                label="PII coverage"
                segments={[
                  { label: "Contains PII", value: 12.8, palette: "sequential-6" },
                  { label: "No PII", value: 87.2, palette: "sequential-1" },
                ]}
              />
            </MetricCard>

            <MetricCard
              label="Data Quality"
              value="94.1% healthy tables"
              hint="Tables passing every active quality check"
              link={{ label: "Review Data Quality" }}
            >
              <SegmentedBar
                showLegend={false}
                label="Table health"
                segments={[
                  { label: "Healthy", value: 94.1, palette: "positive" },
                  { label: "Failing", value: 5.9, palette: "negative" },
                ]}
              />
            </MetricCard>
          </div>
        </Section>

        <ComponentMeta source={componentSource} componentKey="metric-card" />

        <ProductionMap componentKey="metric-card" />
      </div>
    )
  },
}
