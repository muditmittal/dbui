import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  LineSeries,
  BarChart,
  SegmentedBar,
  DonutChart,
  Treemap,
  Leaderboard,
  Legend,
  Heatmap,
  type HeatmapCell,
  type TreemapSelection,
} from "dbui-viz"
import { Catalog } from "dbui/components/icons/Catalog"
import { Robot } from "dbui/components/icons/Robot"
import { ComponentMeta } from "../components/ComponentMeta"
import { ProductionMap } from "../components/ProductionMap"
import lineSource from "dbui-viz/components/line-series?raw"
import barSource from "dbui-viz/components/bar-chart?raw"
import segmentedSource from "dbui-viz/components/segmented-bar?raw"
import donutSource from "dbui-viz/components/donut-chart?raw"
import legendSource from "dbui-viz/components/legend?raw"
import treemapSource from "dbui-viz/components/treemap?raw"
import leaderboardSource from "dbui-viz/components/leaderboard?raw"
import heatmapSource from "dbui-viz/components/heatmap?raw"

/**
 * Every chart in one place, one story per chart.
 *
 * Leaderboard and Heatmap used to sit beside this file as their own entries, which
 * put them a level up from the charts they belong with. `Legend` has no entry at
 * all now: it is `Viz/Inner/Legend`, only ever placed beside something else, so it
 * is shown where the pairing happens — in Donut and Treemap — rather than on its
 * own, where it would read as a chart that forgot to draw itself.
 *
 * The export name sets the story id, so the two whose names would collide with the
 * component they import carry a `name` instead. `TreemapTiles` already did this.
 */
const meta: Meta = {
  title: "Components/Viz/Charts",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  figma,
  children,
}: {
  title: string
  hint?: string
  /** The Figma layer this mirrors. Named so the two can be checked against each other. */
  figma?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {figma ? (
        <p className="mb-1 type-hint text-text-subtle">
          Mirrors <code className="type-code">{figma}</code>
        </p>
      ) : null}
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      <div className="rounded-2 border border-border-base bg-surface-base p-4">
        {children}
      </div>
    </section>
  )
}

/**
 * The 30 values the Figma components are drawn from.
 *
 * These are `Viz/Medium/Bar`'s own bar heights, read back out of the file and
 * scaled onto the 0–1,000 axis both mediums label. Sharing the series is what
 * makes the story and the mock checkable against each other — a story with its own
 * invented numbers looks different from the mock for a reason nobody can see, and
 * that is indistinguishable from being wrong.
 */
const FIGMA_BAR_HEIGHTS = [
  395, 283, 362, 533, 447, 349, 230, 408, 947, 855, 296, 355, 329, 447, 283, 395,
  349, 513, 434, 276, 342, 566, 474, 322, 349, 296, 178, 243, 362, 191,
]

// Jan 7 onward, matching the axis the Figma components label.
const queriesByDay = FIGMA_BAR_HEIGHTS.map((y, index) => {
  const date = new Date(2026, 0, 7)
  date.setDate(date.getDate() + index)
  return { x: date.toISOString().slice(0, 10), y }
})

// Pre-bucketed labels, to exercise the ordinal axis. Order is the order here —
// an ordinal scale used to sort these alphabetically and put Jul 16 before Jul 2.
const failuresByWeek = [
  { x: "Jun 19", y: 420 },
  { x: "Jun 26", y: 510 },
  { x: "Jul 2", y: 390 },
  { x: "Jul 9", y: 780 },
  { x: "Jul 16", y: 910 },
  { x: "Jul 23", y: 860 },
]

// Two peers, so the stack takes VIZ_SERIES_ORDER — the same categorical/1 and /2
// the Figma Stacked Bar is bound to.
const spendByService = queriesByDay.flatMap(({ x, y }) => [
  { x, y: Math.round(y * 0.62), series: "Committed" },
  { x, y: Math.round(y * 0.38), series: "On demand" },
])

// One measured share against the rest of the whole: a magnitude and a track,
// matching Segmented Bar's Colors=1.
const healthyShare = [
  { label: "Healthy", value: 92, palette: "sequential-5" as const },
  { label: "Remaining", value: 8, palette: "neutral-subtle" as const },
]

// Named peers, so they are categorical — Colors=4.
const assetMix = [
  { label: "Tables", value: 4821, palette: "categorical-1" as const },
  { label: "Volumes", value: 1930, palette: "categorical-2" as const },
  { label: "Models", value: 640, palette: "categorical-3" as const },
  { label: "Others", value: 210, palette: "categorical-4" as const },
]

// Ordered magnitudes, so the ramp — the same 7/5/3/1 steps the Figma Donut uses.
const grantsByScope = [
  { label: "Asset level", value: 4821, palette: "sequential-7" as const },
  { label: "Schema level", value: 1930, palette: "sequential-5" as const },
  { label: "Catalog level", value: 640, palette: "sequential-3" as const },
  { label: "Metastore", value: 210, palette: "sequential-1" as const },
]

// A state, so the level family rather than either of the above.
const healthMix = [
  { label: "Healthy", value: 812, palette: "level-pass" as const },
  { label: "Failing", value: 96, palette: "level-high" as const },
  { label: "Unknown", value: 142, palette: "level-info" as const },
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

const topCatalogs = [
  { id: "1", label: "sales_main", value: "11.7K", weight: 11700, icon: <Catalog /> },
  { id: "2", label: "marketing_prod", value: "7.6K", weight: 7600, icon: <Catalog /> },
  { id: "3", label: "finance_reporting", value: "7.6K", weight: 7600, icon: <Catalog /> },
  { id: "4", label: "ml_feature_store", value: "6.1K", weight: 6100, icon: <Catalog /> },
  { id: "5", label: "sandbox_analytics", value: "1.9K", weight: 1900, icon: <Catalog /> },
]

const topAgents = [
  { id: "1", label: "prod_etl_agent", value: "4.2K", weight: 4200, icon: <Robot /> },
  { id: "2", label: "genie_lookup", value: "3.1K", weight: 3100, icon: <Robot /> },
  { id: "3", label: "dbt_runner", value: "900", weight: 900, icon: <Robot /> },
]

// The key that pairs with the Donut above — same four scopes, same four steps.
const grantLevels = [
  { id: "asset", label: "Asset level", value: "23.4%", palette: "sequential-7" as const },
  { id: "schema", label: "Schema level", value: "62.1%", palette: "sequential-5" as const },
  { id: "catalog", label: "Catalog level", value: "6.1%", palette: "sequential-3" as const },
  { id: "metastore", label: "Metastore level", value: "1.1%", palette: "sequential-1" as const },
]

// 30 days across six four-hour windows — the shape a usage page asks for.
const HEATMAP_ROWS = ["00–04", "04–08", "08–12", "12–16", "16–20", "20–24"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const queryActivity: HeatmapCell[] = (() => {
  const cells: HeatmapCell[] = []
  for (let day = 0; day < 30; day += 1) {
    const date = new Date(2026, 0, 7)
    date.setDate(date.getDate() + day)
    // Short labels, because x doubles as the axis label.
    const column = `${MONTHS[date.getMonth()]} ${date.getDate()}`
    const weekend = date.getDay() === 0 || date.getDay() === 6

    HEATMAP_ROWS.forEach((window, row) => {
      // The collector was down for a day and a half mid-month. Those cells have
      // no reading, which is not the same as a reading of zero.
      if (day === 17 || (day === 18 && row < 4)) {
        cells.push({ x: column, y: window, value: null })
        return
      }
      const shoulder = row === 2 || row === 4 ? 0.7 : 1
      const peak = row === 3 ? 1 : shoulder
      const load = weekend ? 0.22 : 1
      const drift = 0.7 + (day / 30) * 0.6
      const wobble = 0.85 + ((day * 7 + row * 13) % 11) / 36
      cells.push({
        x: column,
        y: window,
        value: Math.round(1400 * peak * load * drift * wobble * (row < 2 ? 0.3 : 1)),
      })
    })
  }
  return cells
})()

export const Line: StoryObj = {
  render: () => (
    <>
      <Section
        title="LineSeries — medium"
        figma="Viz/Medium/Line"
        hint="The card tile: 400×168, sequential-5 stroke, area fill, dot on the latest value. No palette passed — this is the default."
      >
        <div className="w-100">
          <LineSeries data={queriesByDay} height={168} label="Queries per day" />
        </div>
      </Section>

      <Section
        title="LineSeries — large"
        figma="Viz/Large/Line"
        hint="The full-width page chart: 1160×208 with five y ticks. Same component, a bigger height."
      >
        <LineSeries
          data={queriesByDay}
          height={208}
          yTickCount={5}
          label="Queries per day"
        />
      </Section>

      <Section
        title="LineSeries — multiline"
        figma="Viz/Large/Multiline"
        hint="A series on each datum. Colours come from VIZ_SERIES_ORDER — categorical-1 upward, which is what the Figma strokes are bound to."
      >
        <LineSeries
          data={spendByService}
          height={208}
          yTickCount={5}
          area={false}
          label="Spend by commitment"
        />
      </Section>

      <Section
        title="LineSeries — sparkline"
        hint="showAxis={false} and a short height for inline use in cards and table cells. No Figma counterpart — it lives inside other components."
      >
        <div className="w-64">
          <LineSeries
            data={queriesByDay}
            height={44}
            showAxis={false}
            label="Queries sparkline"
          />
        </div>
      </Section>

      <Section
        title="LineSeries — ordinal axis"
        hint="Pre-bucketed labels with xType='ordinal'. Column order is the order of the data, which is why Jul 2 comes before Jul 16."
      >
        <LineSeries
          data={failuresByWeek}
          xType="ordinal"
          height={168}
          label="Failures per week"
        />
      </Section>

      <ComponentMeta source={lineSource} componentKey="line-series" />
      <ProductionMap componentKey="line-series" />
    </>
  ),
}

export const Bars: StoryObj = {
  render: () => (
    <>
      <Section
        title="BarChart — medium"
        figma="Viz/Medium/Bar"
        hint="The card tile: 400×168, sequential-5 with the gradient fill and 1px border. No palette passed — this is the default."
      >
        <div className="w-100">
          <BarChart data={queriesByDay} height={168} label="Queries per day" />
        </div>
      </Section>

      <Section
        title="BarChart — large"
        figma="Viz/Large/Bar"
        hint="1160×208 with five y ticks. The same 30 values as the medium tile above and as the Figma component."
      >
        <BarChart
          data={queriesByDay}
          height={208}
          yTickCount={5}
          label="Queries per day"
        />
      </Section>

      <Section
        title="BarChart — stacked"
        figma="Viz/Medium/Stacked Bar · Viz/Large/Stacked Bar"
        hint="Pass `series` on each datum to stack. Segments are peers, so they take categorical-1 upward and ignore palette."
      >
        <BarChart
          data={spendByService}
          height={208}
          yTickCount={5}
          label="Spend by commitment"
        />
      </Section>

      <Section
        title="BarChart — horizontal"
        hint="orientation='horizontal' when the category labels are long. No Figma counterpart yet — Leaderboard covers the ranked case."
      >
        <BarChart
          data={failuresByWeek}
          orientation="horizontal"
          xType="ordinal"
          label="Failures per week"
        />
      </Section>

      <ComponentMeta source={barSource} componentKey="bar-chart" />
      <ProductionMap componentKey="bar-chart" />
    </>
  ),
}

export const Segmented: StoryObj = {
  render: () => (
    <>
      <Section
        title="SegmentedBar — one value"
        figma="Viz/Medium/Segmented Bar · Colors=1"
        hint="One measured share against the rest of the whole: sequential-5 on a neutral-subtle track."
      >
        <div className="w-100">
          <SegmentedBar
            segments={healthyShare}
            showLegend={false}
            label="Healthy share"
          />
        </div>
      </Section>

      <Section
        title="SegmentedBar — named peers"
        figma="Viz/Medium/Segmented Bar · Colors=4"
        hint="Four named parts are peers, so they take the categorical order."
      >
        <div className="w-100">
          <SegmentedBar segments={assetMix} label="Assets by type" />
        </div>
      </Section>

      <Section
        title="SegmentedBar — a state"
        hint="Health is a state, not a category, so the segments take level-* steps instead."
      >
        <div className="w-100">
          <SegmentedBar
            segments={healthMix}
            showLegend={false}
            label="Asset health"
          />
        </div>
      </Section>

      <ComponentMeta source={segmentedSource} componentKey="segmented-bar" />
      <ProductionMap componentKey="segmented-bar" />
    </>
  ),
}

export const Donut: StoryObj = {
  render: () => (
    <>
      <Section
        title="DonutChart — sequential"
        figma="Viz/Medium/Donut · Type=Sequential"
        hint="Ordered magnitudes take the ramp: sequential-7, -5, -3, -1, the steps the Figma variant is bound to."
      >
        <DonutChart
          slices={grantsByScope}
          size={168}
          centerValue="7.8K"
          centerLabel="grants"
          label="Grants by scope"
        />
      </Section>

      <Section
        title="DonutChart — status"
        figma="Viz/Medium/Donut · Type=Status"
        hint="A state instead, so the level family. The centre hole carries the total — never render a full pie."
      >
        <DonutChart
          slices={healthMix}
          size={168}
          centerValue="1,050"
          centerLabel="assets"
          label="Asset health"
        />
      </Section>

      <Section
        title="Paired with a Legend"
        figma="Viz/Inner/Donut + Viz/Inner/Legend"
        hint="Vega draws a legend but cannot put a figure beside each label. Turn the chart's own legend off and pair the two — this is the only way Legend is placed, which is why it has no entry of its own."
      >
        <div className="flex items-center gap-4">
          <DonutChart
            slices={grantLevels.map((level) => ({
              label: level.label,
              value: Number.parseFloat(level.value),
              palette: level.palette,
            }))}
            showLegend={false}
            size={168}
            label="Grants by level"
          />
          <Legend
            className="flex-1"
            columns={{ label: "Grants by level", value: "Assigned %" }}
            items={grantLevels}
          />
        </div>
      </Section>

      <Section
        title="A Legend without values"
        hint="Values are optional. Without them it is a plain key — still worth it when the chart's own legend would wrap or reorder."
      >
        <Legend
          items={grantLevels.map(({ id, label, palette }) => ({ id, label, palette }))}
        />
      </Section>

      <ComponentMeta source={donutSource} componentKey="donut-chart" />
      <ProductionMap componentKey="donut-chart" />
      <ComponentMeta source={legendSource} componentKey="legend" />
      <ProductionMap componentKey="legend" />
    </>
  ),
}

export const TreemapTiles: StoryObj = {
  name: "Treemap",
  render: () => {
    const [selection, setSelection] = React.useState<TreemapSelection | null>(
      null
    )

    return (
      <>
        <Section
          title="Treemap — catalogs by schema size"
          figma="Viz/Medium/Treemap · Viz/Large/Treemap"
          hint="Groups are catalogs, leaves are schemas. Large is where leaf names become legible. Hover a tile, then click it."
        >
          <Treemap
            data={catalogs}
            maxGroups={5}
            height={280}
            onSelect={setSelection}
            label="Catalogs by size"
          />
          <p className="mt-3 type-hint text-text-subtle">
            {selection
              ? `Selected ${selection.type}: ${selection.name}${
                  selection.groupName ? ` (in ${selection.groupName})` : ""
                }`
              : "Nothing selected yet."}
          </p>
        </Section>

        <Section
          title="Keyed with a Legend"
          hint="A treemap draws no legend at all, so a key beside it is the only way to name what a band of the ramp means."
        >
          <div className="flex items-start gap-4">
            <Treemap
              data={catalogs.slice(0, 2)}
              height={168}
              className="flex-1"
              label="Storage by catalog"
            />
            <Legend
              className="w-56"
              columns={{ label: "Catalog", value: "Size" }}
              items={[
                { id: "main", label: "main", value: "3.6 TiB", palette: "sequential-5" },
                { id: "sales", label: "sales_main", value: "2.5 TiB", palette: "sequential-3" },
              ]}
            />
          </div>
        </Section>

        <ComponentMeta source={treemapSource} componentKey="treemap" />
        <ProductionMap componentKey="treemap" />
      </>
    )
  },
}

export const LeaderboardRows: StoryObj = {
  name: "Leaderboard",
  render: () => (
    <>
      <Section
        title="Top catalogs by queries"
        figma="Viz/Medium/Leaderboard"
        hint="The bar length is the value and the label sits over it. Five named rows read as a list, so this is a list and not a plot."
      >
        <Leaderboard
          columns={{ label: "Catalog", value: "Queries" }}
          items={topCatalogs}
        />
      </Section>

      <Section
        title="A short bar does not clip its label"
        hint="The bar is a background layer. The last row is 8% of the ceiling and still readable — which is the row a reader most wants to check."
      >
        <Leaderboard
          columns={{ label: "Principal", value: "Queries" }}
          items={topAgents}
          max={11700}
        />
      </Section>

      <Section
        title="Two lists, one scale"
        hint="Pass the same max to both. Without it each list normalizes to its own largest row and the two stop being comparable."
      >
        <div className="grid grid-cols-2 gap-6">
          <Leaderboard
            columns={{ label: "Catalog", value: "Queries" }}
            items={topCatalogs}
            max={11700}
          />
          <Leaderboard
            columns={{ label: "Principal", value: "Queries" }}
            items={topAgents}
            max={11700}
          />
        </div>
      </Section>

      <Section
        title="No header"
        hint="Omit columns when the card's own label already says what the number is."
      >
        <Leaderboard items={topCatalogs} />
      </Section>

      <Section
        title="The fill stays near the canvas"
        hint="Four steps, and the reason is the label: it sits over the bar, so it keeps the contrast it has against the page only while the fill is close to the page. Step 4 is already as far as a label can be read over — there is no step 5, and no status tone."
      >
        <div className="flex flex-col gap-4">
          {(["sequential-1", "sequential-2", "sequential-3", "sequential-4"] as const).map(
            (palette) => (
              <Leaderboard
                key={palette}
                columns={{ label: palette, value: "Queries" }}
                items={topAgents}
                max={11700}
                palette={palette}
              />
            )
          )}
        </div>
      </Section>

      <ComponentMeta source={leaderboardSource} componentKey="leaderboard" />
      <ProductionMap componentKey="leaderboard" />
    </>
  ),
}

export const HeatmapGrid: StoryObj = {
  name: "Heatmap",
  render: () => (
    <>
      <Section
        title="Query activity"
        figma="Viz/Large/Heatmap"
        hint="30 columns of days against six four-hour windows. height is the band, so 168 over 6 rows is a 28px cell. The grey run mid-month is missing data, not zero."
      >
        <Heatmap
          data={queryActivity}
          rowOrder={HEATMAP_ROWS}
          label="Query activity by day and four-hour window"
        />
      </Section>

      <Section
        title="No axes"
        hint="Drop the axes when the surrounding page already names the range."
      >
        <Heatmap
          data={queryActivity}
          rowOrder={HEATMAP_ROWS}
          showAxis={false}
          height={112}
          label="Query activity, unlabelled"
        />
      </Section>

      <Section
        title="Squared cells"
        hint="cornerRadius={0} and cellGap={2} for a denser, more grid-like read."
      >
        <Heatmap
          data={queryActivity}
          rowOrder={HEATMAP_ROWS}
          cornerRadius={0}
          cellGap={2}
          label="Query activity, squared cells"
        />
      </Section>

      <Section
        title="Narrow container"
        hint="At 480px the cells reach about 12px. Below that the guideline says give it more room."
      >
        <div className="w-[480px]">
          <Heatmap
            data={queryActivity}
            rowOrder={HEATMAP_ROWS}
            label="Query activity in a narrow container"
          />
        </div>
      </Section>

      <ComponentMeta source={heatmapSource} componentKey="heatmap" />
      <ProductionMap componentKey="heatmap" />
    </>
  ),
}
