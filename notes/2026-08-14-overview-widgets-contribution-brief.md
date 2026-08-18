# Overview widgets — contribution brief

**Date** 2026-08-14
**Trigger** GovHub `Data` overview built in `db-automations-prototype` hand-rolled four widgets
that the system either already ships or should.
**Reference** [Data vertical, node 4251-7521](https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/%E2%AC%A2-DBUI--Design-System?node-id=4251-7521)

---

## Problem

The prototype's `DataOverviewPage` renders six widget types. The building agent hand-built three
components and reached into a fourth with a CSS selector, then reported that DBUI was missing the
primitives it needed.

Half of that report was wrong, and the wrong half is the one that matters. **Four of the six
widgets are already built and shipping in `packages/dbui-viz`.** They were not discoverable:

```
$ yarn dbui search treemap
No results for "treemap".

$ yarn dbui component Treemap
error: No component named "Treemap"
code:  ERR_UNKNOWN_COMPONENT
```

`Treemap` is 430 lines with complete `@standard` / `@guideline` / `@constraint` JSDoc. So are
`BarChart`, `SegmentedBar`, `DonutChart` and `LineSeries`. None of the five appear in
`component-index.md`; `packages/dbui-cli/src/api.mjs` scans only
`packages/dbui/src/components/ui/`; and `figma-mapping.md` — whose opening rule is *"a Figma layer
you cannot name in React is a lookup you have not done yet, not a component you need to build"* —
has no entry for any of them.

So the discovery layer is the primary defect. The component gap is real but smaller than reported.

## Current workaround

| File | What it does |
|---|---|
| `src/components/OverviewCard.tsx` | Hand-built `StatCard`, `OverviewCard`, `BarList` |
| `src/pages/DataOverviewPage.tsx:87` | `Progress` recolored via `[&_[data-slot=progress-indicator]]:bg-viz-blue` |
| `src/pages/DataOverviewPage.tsx:98` | Same, `bg-viz-green` |

Both selector hacks name `viz.css`, which is **orphaned** in DBUI — nothing imports it, and
`TRACKER.md` logs it as issue I9. The live vocabulary is `viz-categorical-1..10` and
`viz-sequential-1..10`.

## Reference frame → what ships

| Reference widget | Figma layer | Node | Ships today | Action |
|---|---|---|---|---|
| Total Catalogs / Assets / Principals | `Metric tile` | `4235:6495` | — | build `StatCard` |
| Asset usage (30-day columns) | `widget` → `Metric`/`Chart`/`Action` | `4235:6289` | `BarChart` | document |
| Active users (ranked rows) | `Leaderboard widget` | frame, not yet a component | — | build `Leaderboard` |
| Data Access (donut + keyed rows) | `Pie chart` + `Legend` | frame, not yet a component | `DonutChart` | build `Legend` |
| Data storage | `Chart` instance | — | `Treemap` | document |
| Data Classification | `Percentage` | `4235:6533` | `SegmentedBar` | document |
| Data Quality | `Health widget` | `4235:6537` | `SegmentedBar` | document |
| Chrome around all six | `Metric` / `Viz` / `Action` slots | `4211:6484` | `Card` family | build `MetricCard` |

Two corrections to the original report fall out of this.

**Data Quality is not a progress bar.** It is green with a red tail — a part-to-whole split.
`SegmentedBar` already takes `palette: "positive" | "negative"` per segment and already draws it.

**Neither is Data Classification.** "12.8% of tables contain PII" is a measure, not progress toward
an endpoint. `Progress`'s own JSDoc says *"Use for determinate progress with a known endpoint."*
Adding a `tone` prop would encode a measure in a progress component and mint a second bar
vocabulary beside `SegmentedBar`.

**`Progress` gets no new API.** The gap underneath the original ask is already tracked as **M13**:
the viz family carries ten categorical and ten sequential steps and nothing else, so a chart
meaning *healthy* borrows `status-text-positive` and one meaning *no data* borrows `text-disabled`.
A Classification bar needs an inert step for its unfilled remainder. That is a token decision, not
a component prop.

---

## Proposed API

### `StatCard` — `packages/dbui/src/components/ui/stat-card.tsx`

One glanceable total in a row of peers. No chart, no viz slot.

```tsx
<StatCard label="Total Catalogs" value="177" hint="Catalogs in this account"
  delta="+2.7%" deltaWindow="vs past 30d" deltaTone="positive" />

<StatCard label="Total Principals" value="13.1K" action={{ label: "Manage", onClick }} />
```

| Prop | Type | Note |
|---|---|---|
| `label` | `string` | required |
| `value` | `ReactNode` | required |
| `hint` | `string` | renders the 16px info icon + tooltip. Figma `menuIcon` = `InfoSmallIcon` |
| `delta` | `string` | the toned change, e.g. `+2.7%` |
| `deltaWindow` | `string` | the subtle comparison window, e.g. `vs past 30d` |
| `deltaTone` | `"neutral" \| "positive" \| "negative"` | default `neutral` |
| `action` | `{ label, onClick?, href? }` | link variant, mutually exclusive with `delta` |

Measured from Figma: `p-4`, no gap between the three lines — 20 + 24 + 20 line boxes plus 32
padding is the 96px tile. Label `type-body-bold`, value `type-title-4`, delta `type-body`.

### `MetricCard` — `packages/dbui/src/components/ui/metric-card.tsx`

One metric, its shape, and one way into the surface behind it. The chrome on all six widgets.

```tsx
<MetricCard label="Active users" value="489 principals" hint="…"
  action={<SegmentControl>…</SegmentControl>}
  link={{ label: "Review Usage by Agents", onClick }}>
  <Leaderboard … />
</MetricCard>
```

| Prop | Type | Note |
|---|---|---|
| `label` | `string` | required |
| `value` | `ReactNode` | required |
| `hint` | `string` | info icon + tooltip |
| `action` | `ReactNode` | header slot — controls that change what the card shows, never navigation |
| `link` | `{ label, onClick?, href? }` | **required.** Full-width outline button + `ChevronRight` |
| `children` | `ReactNode` | the viz slot |

Measured: `p-4` with `gap-3` between the three slots — 16 + 44 + 12 + 168 + 12 + 32 + 16 = the
300px widget exactly. The link row is **not** a `CardFooter`: the reference has no divider and no
tinted band, and `CardFooter` would add both plus `pb-0`.

Constraints for the JSDoc:
- `link` is required. A card that reports with nowhere to go is the failure this component exists
  to prevent.
- Never bake a chart into the card. `children` is the slot.
- `action` changes what the card shows. Navigation goes in `link`.
- Don't nest a `Card` inside it — inherited from `Card`.

### `Leaderboard` — `packages/dbui-viz/src/components/leaderboard.tsx`

Ranked rows where the bar length *is* the value and the label sits over the bar.

```tsx
<Leaderboard
  columns={{ label: "Principal", value: "Queries" }}
  items={[{ id: "1", label: "agent_name", value: "11.7K", weight: 11700, icon: <Robot /> }]}
  max={11700}
/>
```

| Prop | Type | Note |
|---|---|---|
| `items` | `{ id, label, value, weight, icon? }[]` | `value` displays, `weight` scales |
| `columns` | `{ label, value }` | the header row. Omit for no header |
| `max` | `number` | explicit shared ceiling so two lists on a page share a scale |
| `palette` | `LeaderboardPalette` | `sequential-1` … `-4` only. Default `sequential-2` — `#CEEDF8`, exactly the reference fill |

`LeaderboardPalette` is a subset of `VizPaletteName`, and the narrowing is the one place this
component departs from the charts beside it. A chart draws its mark *on* the canvas and can take any
step; a leaderboard draws a label *on the mark*, so the fill has to stay near the canvas or the
label loses the contrast it borrowed from the page. Verified in the browser: at `sequential-5` and
above, and at `positive` / `negative`, the label goes unreadable. Step 4 is the boundary.

Measured: 28px rows, `p-1`, `gap-2`, bar `px-2 rounded-1` at 20px tall, label `type-body`, value
`type-body-bold` right-aligned. **The bar is a background layer, not a container** — at the
narrowest row the reference label overflows the bar rather than being clipped by it.

### `Legend` — `packages/dbui-viz/src/components/legend.tsx`

A colour key with a value column, for a chart that cannot draw its own.

```tsx
<Legend
  columns={{ label: "Grants by levels", value: "Assign %" }}
  items={[{ id: "asset", label: "Asset level", value: "23.4%", palette: "sequential-7" }]}
/>
```

Same 28px row rhythm as `Leaderboard`; the leading element is a 12px `rounded-2px` swatch and the
name sits *beside* it, never over it. Pair with `<DonutChart showLegend={false}>` — the Vega legend
cannot carry a value column, which is why the reference has one drawn by hand.

### `VizPaletteName` — additive

`Legend` and `Leaderboard` both need sequential steps (the reference uses `sequential-7`, `-5`,
`-3`, `-1` for the donut key and `sequential-2` for the bars). The union carries categorical and
the three named steps only. Add `sequential-1` … `sequential-10`.

Additive union member, no breaking change, and `token-rules.md` **R10** already sanctions
sequential for charts. `VIZ_SERIES_ORDER` stays categorical-only.

### Where each lives, and why

`Leaderboard` and `Legend` go in `dbui-viz` because they need `VizPaletteName`, and
`dbui-viz` imports `dbui` and never the reverse (see I19). Both are DOM-only — `dbui-viz` exports
per-component paths, so importing one pulls no Vega.

---

## Figma state

Updated 2026-08-15. Every React viz component now has a `Viz/`-namespaced counterpart, and the
package and the library index the set the same way.

| React | Figma | Node | How it got there |
|---|---|---|---|
| `Legend` | `Viz/Legend` | `4968:9250` | built — nothing existed |
| `Leaderboard` | `Viz/Leaderboard` | `4969:9284` | built — nothing existed |
| `DonutChart` | `Viz/Donut Chart` | `4970:9243` | built — nothing existed |
| `SegmentedBar` | `Viz/Segmented Bar` | `4839:18429` | renamed from `Percentage bar` |
| `LineSeries` | `Viz/Line Series` | `4839:17735` | renamed from `Viz/.Line series` |
| `BarChart` | `Viz/Bar Chart` | `4974:9246` | cloned from `Chart Type=Stacked barchart` |
| `Treemap` | `Viz/Treemap` | `4974:9235` | cloned from `Chart Type=Distribution` |
| `StatCard` | `Viz/Metric Card` | `4839:17659` | re-pointed, see below |

The three built components bind fills to `viz/sequential/*`, text to the `interface/*` styles,
padding and gap to `space/space-1` and `space/space-2`, and corners to `shape/control`. The donut is
four real arc ellipses at 0.62 inner radius rather than a traced shape, so its angles stay editable.

Properties added: `Header` boolean on `Viz/Leaderboard` and `Viz/Legend`; `Show change` on the
`Viz/.Metric` set and `Show link` on `Viz/Metric Card`. Two booleans rather than a `delta | link |
bare` enum, because the layers are independent — the same shape the optional props take in React.

`Chart` was left intact with all five variants. Three of them are treemaps and two are bar charts,
and it carries GovernanceHub content names (`Distribution`, `Metastore`, `Catalog`) plus four live
instances, so it is page material rather than a primitive — hence cloning rather than splitting.

**`StatCard` was pointing outside DBUI.** `Metric tile` (`4235:6495`) is `remote: true` — a
component from a different library that the Data vertical mock instances. Nothing in this repo owned
it, and publishing Code Connect against it would have written into another team's file. Both the
`@figma` JSDoc and `figma/StatCard.figma.tsx` now name the local `Viz/Metric Card`.

**Still open.**

1. **`widget` is still a frame**, so `MetricCard`'s Code Connect cannot publish. Held at the user's
   request — the widget chrome is theirs to build.
2. **Nothing is published.** All eight mapping files exist locally; `figma connect publish` has not
   been run.
3. **`Viz/Bar Chart` and `Viz/Treemap` are 1200×240**, the size the `Chart` variants were drawn at.
   Their tiles and bars are absolutely placed, so resizing them needs constraints first.

## Found while building — not fixed here

Two findings that came out of rebuilding the reference page, both needing a decision before anyone
touches them.

**`SegmentedBar` cannot be anchored.** Its spec carries
`order: { field: "value", sort: "descending" }`, so it always stacks the largest segment first. The
reference `Percentage` widget reads left to right — 12.8% filled, the remainder trailing — and the
component draws it the other way round, with the 87.2% remainder on the left. Data Quality only
looks right because its large segment is the one you want first. The fix is either dropping the sort
so the component draws the order it is given, or an explicit prop; both are changes to a shipped
component, so both are ask-first.

**The five charts have no per-chart story.** They share
`apps/portal/src/stories/viz/Charts.stories.tsx`, and the gallery links by story title, so
`generate-gallery.mjs` reports `Bar Chart, Donut Chart, Line Series, Segmented Bar, Treemap` as
missing stories. `Leaderboard` and `Legend` link correctly because they got their own files.
Splitting the chart file five ways would close it, and every chart already has a demo tile in the
gallery meanwhile.

## Not building

- `OverviewTemplate` / `OverviewGrid` — wait for a second vertical to prove the page contract.
  They live fine in the product until then.
- A `tone` prop on `Progress`.
- Any named product widget (`AssetUsageCard`, etc.). Those are content.
- Extending `Chart` (the recharts wrapper) to cover `Leaderboard`.

## Success criteria

- [ ] `yarn dbui search treemap` and `yarn dbui component Treemap` both resolve
- [ ] `yarn dbui component MetricCard` returns guidelines and constraints
- [ ] `figma-mapping.md` names every layer in the reference frame
- [ ] Rebuilding the reference page needs no `className` on a DBUI component and no
      `[&_[data-slot=…]]` selector
- [ ] `yarn design:lint:react` clean on all four new files
- [ ] Light and dark both correct — the bar fill flips with `viz-sequential-2`, not a literal

## Build order

1. Discovery — `component-index.md`, the CLI scan, `figma-mapping.md`
2. `VizPaletteName` + the palette class map
3. `Leaderboard`, `Legend`
4. `StatCard`, `MetricCard`
5. Protocol for all four — exports, tsup, sync, stories, Code Connect, variant mappings, gallery
