# Figma to React mapping

> **RULE: a Figma layer you cannot name in React is a lookup you have not done yet, not a component you need to build.** Every nested layer below resolves to something exported from `dbui`. If a recipe here does not cover your case, flag the gap — do not roll your own.

`component-index.md` tells you which component to pick. Component JSDoc tells you how it behaves. This file tells you what a Figma layer is called in React, and — for the deeply nested families — the exact composition to write.

## The mental model

Figma keeps the component count small by nesting. One menu component covers every row a menu can hold, because the row is an instance of a row component, whose item is an instance of an item component, whose label and trailing edge are instances again. Each level adds a variant axis and the axes multiply.

React gets the same range from composition instead. There is no `type` prop that walks the same space. **The nesting depth in Figma is the child depth in React.**

A component whose Figma name starts with `.` is private. It exists to be nested and is never placed on its own. Those are the ones that look like components and are actually slots.

## Reading a Figma variant

This is where a model goes wrong. A variant switcher in Figma looks like a prop and often is not. Every variant falls into one of four kinds, and you have to decide which before you write anything.

| Kind | Looks like | Actually is | Example |
|---|---|---|---|
| Prop | `Type=Destructive` | a prop | `<DropdownMenuItem variant="destructive">` |
| Different component | `Type=MultiSelect` | a different export | `<DropdownMenuCheckboxItem>` |
| Different subtree | `Type=Submenu` | three components nested | `DropdownMenuSub` + `SubTrigger` + `SubContent` |
| CSS state | `State=Hover` | nothing you write | the browser owns it |

Boolean and instance-swap properties are almost always **a child element**, not a prop. `Show Icon` plus `Icon` is not `icon={...}`, it is a child. Text properties are `children`.

`State` axes are the biggest trap. On `.DropdownMenuItem` the axis holds `Default`, `Hover`, `Press`, `Selected` and `Disabled`. Only two of those reach your code — `Disabled` is the `disabled` prop and `Selected` is `checked`. The rest are CSS. There is no `state` prop anywhere in DBUI.

---

## Dropdown Menu · `dropdown-menu`

The deepest family in the system, and the one to read first. Four levels:

```
Dropdown Menu              the popup
└── .DropdownMenuRow       what kind of row this is
    └── .DropdownMenuItem  what kind of item, when the row is an item
        ├── .DropdownMenuItemContent   leading icon, label, description
        └── .DropdownMenuItemTrailing  shortcut, count or icon on the right
```

Read the current axes off the component sets rather than trusting a list: `.DropdownMenuRow` carries `Type`, `.DropdownMenuItem` carries `Type` and `State`, `.DropdownMenuItemContent` carries `Content` plus `Show Icon` and `Icon`, `.DropdownMenuItemTrailing` carries `Type`.

### Layer to export

| Figma | React |
|---|---|
| `Dropdown Menu` | `DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent` |
| `.DropdownMenuRow Type=Item` | `DropdownMenuItem` |
| `.DropdownMenuRow Type=Label` | `DropdownMenuLabel` |
| `.DropdownMenuRow Type=Separator` | `DropdownMenuSeparator` |
| `.DropdownMenuRow Type=Search` | `DropdownMenuSearch` |
| `.DropdownMenuRow Type=Empty` | `DropdownMenuEmpty` |
| `.DropdownMenuRow Type=Loading` | `DropdownMenuLoading` |
| `.DropdownMenuRow Type=Footer` | `DropdownMenuFooter` |
| `.DropdownMenuRow Type=Add New` | no export — see the gaps table |
| `.DropdownMenuItem Type=Action` | `DropdownMenuItem` |
| `.DropdownMenuItem Type=Destructive` | `DropdownMenuItem variant="destructive"` |
| `.DropdownMenuItem Type=MultiSelect` | `DropdownMenuCheckboxItem` |
| `.DropdownMenuItem Type=SingleSelect` | `DropdownMenuRadioItem` inside `DropdownMenuRadioGroup` |
| `.DropdownMenuItem Type=Submenu` | `DropdownMenuSub` + `DropdownMenuSubTrigger` + `DropdownMenuSubContent` |
| `.DropdownMenuItem State=Disabled` | `disabled` |
| `.DropdownMenuItem State=Selected` | `checked` on a checkbox item, matching `value` on a radio item |
| `DropdownMenuItemIndicator` | rendered for you — never write it |
| `DropdownMenuItemIcon` (`Show Icon`) | `DropdownMenuItemIcon` child |
| `.DropdownMenuItemContent Content=With Description` | `DropdownMenuItemDescription` child |
| `.DropdownMenuItemTrailing Type=Hint` | `DropdownMenuShortcut` child |
| `.DropdownMenuItemTrailing Type=Count` | `DropdownMenuItemBadge` child |
| `.DropdownMenuItemTrailing Type=None` | omit the child |

### Compositions

Every row type a menu can hold. All of these go inside `DropdownMenuContent`.

#### Menu shell

```tsx
import { Button } from "dbui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "dbui/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Plain item

```tsx
<DropdownMenuItem>Rename</DropdownMenuItem>
```

#### Item with a leading icon

`Show Icon=true` plus an `Icon` swap. Icon consistency is a constraint on the item — if one item in a group has an icon, all of them must, or the labels misalign.

```tsx
<DropdownMenuItem>
  <DropdownMenuItemIcon>
    <Pencil />
  </DropdownMenuItemIcon>
  Rename
</DropdownMenuItem>
```

#### Item with a trailing shortcut

`.DropdownMenuItemTrailing Type=Hint`. Shortcuts use symbols, not words.

```tsx
<DropdownMenuItem>
  <DropdownMenuItemIcon>
    <Copy />
  </DropdownMenuItemIcon>
  Duplicate
  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
</DropdownMenuItem>
```

#### Item with a trailing count

`.DropdownMenuItemTrailing Type=Count`.

```tsx
<DropdownMenuItem>
  Notifications
  <DropdownMenuItemBadge>12</DropdownMenuItemBadge>
</DropdownMenuItem>
```

#### Item with a description

`.DropdownMenuItemContent Content=With Description`. Figma wraps the two lines in `DropdownMenuItemText`. React has no wrapper export, so the stack is a plain `div`.

```tsx
<DropdownMenuItem>
  <div>
    Serverless
    <DropdownMenuItemDescription>Starts in seconds</DropdownMenuItemDescription>
  </div>
</DropdownMenuItem>
```

#### Item with a submenu

Not a prop. Three components, and the submenu contents have no Figma node at all — the Figma variant only draws the trigger row.

```tsx
<DropdownMenuSub>
  <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Archive</DropdownMenuItem>
    <DropdownMenuItem>Trash</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>
```

`DropdownMenuSubTrigger` appends its own chevron. Never add one.

#### Checkbox item

A different export, not `DropdownMenuItem`. The checkbox is rendered for you — `DropdownMenuItemIndicator` in Figma is not something you write.

```tsx
<DropdownMenuCheckboxItem
  checked={showArchived}
  onCheckedChange={setShowArchived}
>
  Show archived
</DropdownMenuCheckboxItem>
```

#### Radio item

A different export plus a wrapper that has no Figma node. Radio items outside a `DropdownMenuRadioGroup` do not work.

```tsx
<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="modified">Last modified</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>
```

#### Group label

```tsx
<DropdownMenuLabel>Sort by</DropdownMenuLabel>
```

Use `DropdownMenuGroup` around the labeled rows to associate them. It has no Figma node.

#### Separator

```tsx
<DropdownMenuSeparator />
```

#### Destructive item

The one item type that is a real prop. It goes last, after a separator.

```tsx
<DropdownMenuSeparator />
<DropdownMenuItem variant="destructive">
  <DropdownMenuItemIcon>
    <Trash />
  </DropdownMenuItemIcon>
  Delete
</DropdownMenuItem>
```

#### Disabled item

```tsx
<DropdownMenuItem disabled>Restore</DropdownMenuItem>
```

#### Search, empty and loading rows

```tsx
<DropdownMenuSearch placeholder="Filter tables" value={q} onChange={onChange} />
<DropdownMenuLoading />
<DropdownMenuEmpty />
```

#### Footer row

```tsx
<DropdownMenuFooter>
  <Button variant="outline" size="sm">Cancel</Button>
  <Button size="sm">Apply</Button>
</DropdownMenuFooter>
```

---

## Table · `table`

**Figma models a table by column. React models it by row.** This is the single most misread structure in the file. A `.TableColumn` in Figma holds one header cell and every body cell beneath it. Transpose before you write anything.

```
Table
└── .TableColumn        a column, header cell first
    └── .TableCell      Type = Header | Content | Status | Checkbox | Action
        └── .TableCellContent   Cell type = what the cell shows
```

| Figma | React |
|---|---|
| `Table` | `Table` + `TableHeader` + `TableBody` |
| `.TableColumn` | nothing — transpose into `TableRow` |
| `.TableCell Type=Header` | `TableHead` inside a `TableRow` inside `TableHeader` |
| `.TableCell Type=Content` | `TableCell` |
| `.TableCell Type=Checkbox` | `TableCell` holding a `Checkbox` |
| `.TableCell Type=Action` | `TableCell` holding a `Button size="icon-sm"` or a `DropdownMenu` |
| `.TableCell Sortable=true` | `TableSortButton` inside the `TableHead` |
| `.TableSortButton Sorted=True` | `sorted` plus `direction` |
| `.TableCellContent Cell type=Text` | bare children |
| `Cell type=With Icon` | `TableCellIcon` child |
| `Cell type=Title` | `TableCellTitle` + `TableCellTitleContent` + `TableCellMeta` |
| `Cell type=Status` | `TableCellStatus` wrapping a `Status` |
| `Cell type=User` | `TableCellUser` wrapping an `Avatar` |
| `Cell type=Expandable` | `TableCellExpandable` |
| `Cell type=Time` | `TableCellTime` |
| `Cell type=Tag Group` | no export — compose `Tag` children |

### Compositions

#### Transposing a column-major Figma table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead numeric>Rows</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>events</TableCell>
      <TableCell numeric>1,204</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

`numeric` has no Figma variant and is not optional for figures. Mirror it on the header or the column splits alignment.

#### Sortable header cell

```tsx
<TableHead>
  Last run
  <TableSortButton sorted direction="desc" onClick={onSort} />
</TableHead>
```

#### Title cell

```tsx
<TableCell>
  <TableCellTitle>
    <TableCellIcon>
      <Table />
    </TableCellIcon>
    <TableCellTitleContent>
      <span>events</span>
      <TableCellMeta>main.analytics</TableCellMeta>
    </TableCellTitleContent>
  </TableCellTitle>
</TableCell>
```

#### Row action cell

The Figma `Type=Action` cell nests an Icon Button. In practice it triggers a menu.

```tsx
<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger render={
      <Button variant="ghost" size="icon-sm" aria-label="Row actions">
        <Overflow />
      </Button>
    } />
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Open</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
```

---

## Form Input · `field`

Figma calls the family `Form Input`. React calls it `Field`, and the control is a sibling you choose, not a variant you set.

```
Form Input          Type = which control, Show = which state, Hint = boolean
├── Label
├── <the control>   Input | Select | Combobox | Typeahead Combobox | Textarea | Input Group
└── FieldError      present only when Show=Error
```

| Figma | React |
|---|---|
| `Form Input` | `Field` |
| `Label` | `FieldLabel` |
| `Type=Input` | a `Input` child |
| `Type=Select` | a `Select` child |
| `Type=Combobox` | a `Combobox` child |
| `Type=Typeahead Combobox` | a `Combobox multiple` child with `ComboboxChips` |
| `Type=Textarea` | a `Textarea` child |
| `Type=Browse` | an `InputGroup` child |
| `Hint=true` | `FieldDescription` |
| `Show=Error`, `FieldError` | `FieldError` plus `aria-invalid` on the control |
| `Show=Active` | focus — nothing you write |

`Type` is not a prop on `Field`. It selects which child you render.

#### Field with an error

```tsx
<Field>
  <FieldLabel htmlFor="catalog">Catalog</FieldLabel>
  <Input id="catalog" aria-invalid />
  <FieldError>Catalog is required</FieldError>
</Field>
```

#### Field with helper text

```tsx
<Field>
  <FieldLabel htmlFor="path">Path</FieldLabel>
  <Input id="path" />
  <FieldDescription>Relative to the workspace root</FieldDescription>
</Field>
```

Note the shape Figma cannot draw: `Field` also takes `orientation` of `vertical`, `horizontal` or `responsive`, and `FieldSet` plus `FieldLegend` group fields. None of those have a Figma variant.

---

## Split Button · `split-button`

Figma ships one component with `Variant` and `Size`. React ships a container you fill.

| Figma | React |
|---|---|
| `Split Button` | `SplitButton` wrapper |
| inner `Button` | a `Button` child carrying the variant and size |
| the gap between the two buttons | `SplitButtonSeparator` — Figma has no layer for it |
| `SplitButtonMenuTrigger` | a `Button size="icon-md"` holding a `ChevronDown` |
| `Variant=Primary` | the child `Button`'s `variant="default"` |
| `Variant=Outline` | the child `Button`'s `variant="outline"` |
| `Size=Default \| Small` | the child `Button`'s `size` of `md` or `sm` |

Neither Figma variant is a prop on `SplitButton`. Both live on the children. `SplitButton`'s own prop is `orientation`, which Figma has no variant for.

#### Split button with a menu

```tsx
<SplitButton>
  <Button>Run</Button>
  <SplitButtonSeparator />
  <DropdownMenu>
    <DropdownMenuTrigger render={
      <Button size="icon-md" aria-label="Run options">
        <ChevronDown />
      </Button>
    } />
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Run with parameters</DropdownMenuItem>
      <DropdownMenuItem>Dry run</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SplitButton>
```

---

## Input Group · `input-group`

`Type=Filter` and `Type=Browse` are not props. They are two arrangements of the same parts.

| Figma | React |
|---|---|
| `Input Group` | `InputGroup` |
| inner `Input` | `InputGroupInput` — never a plain `Input` |
| `Type=Filter`'s `Icon Button` | `InputGroupButton` inside an `InputGroupAddon align="inline-end"` |
| `Type=Browse`'s `Button` | `InputGroupButton` inside an `InputGroupAddon align="inline-end"` |
| `Active=True` | focus — nothing you write |
| `.InputContent Show Icon` | an icon inside an `InputGroupAddon align="inline-start"` |

#### Filter input with a leading icon and a trailing button

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search />
  </InputGroupAddon>
  <InputGroupInput placeholder="Filter tables" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Filter options">
      <Filter />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

---

## Overview widget · `metric-card`

The family behind every Governance overview page. Figma keeps the count small by drawing one
widget frame and swapping what sits in the middle, so the layer names describe **slots**, not
components:

```
widget                     the card
├── Metric                 title + info icon, the one number, and the header control
├── Viz                    the slot — a chart, a Leaderboard, a Legend, a SegmentedBar
└── Action                 the handoff button, full width
```

`Metric tile` is the flat cousin: the same `Metric` block with no `Viz` and no `Action`, used for
the KPI band at the top of the page.

The trap here is `Viz`. It looks like a component and is a slot — four widgets on the reference page
are the same `widget` frame with different children. Reach for `MetricCard` and pass the chart as
`children`; there is no `type` prop that walks that space.

### Layer to export

Everything below lives in the **`Viz Components — Live`** section. The parent `Viz Components`
section holds the GovernanceHub-era originals, which nothing in this repo points at — if a layer
name is not in this table, check that you are not reading one of those.

The section is four layers, and the name tells you which one a component is in:

| Layer | What it is | Members |
|---|---|---|
| `Viz/Inner/*` | Parts that are only ever nested. Never place one directly | `Axis Label`, `Metric`, `Legend`, `Donut`, `Header` |
| `Viz/Medium/*` | The card tiles. All **400 × 168** except `Segmented Bar`, which is 12 tall | `Bar`, `Stacked Bar`, `Line`, `Leaderboard`, `Donut`, `Treemap`, `Segmented Bar` |
| `Viz/Large/*` | The full-width page charts, all **1160 × 208** — a 1112 × 168 band plus axes | `Bar`, `Stacked Bar`, `Line`, `Multiline`, `Treemap`, `Heatmap` |
| `Viz/Card/*` | The cards, one per chart type. `Metric` carries no chart | `Metric`, `Bar`, `Line`, `Leaderboard`, `Donut`, `Treemap`, `SegmentedBar` |

**Every chart type is its own component, at both sizes.** Grouping Line and Bar under a
`TimeSeries` card was tried and reverted: a designer scanning the picker cannot see that Line lives
inside TimeSeries, so they detach and rebuild the tile instead of swapping it. Explicit beats clever
when the component picker is the discovery surface.

The two sizes are one React component each. Width is measured through `useMeasure` and height is a
prop, so **large is a bigger number, not a different component** — and `density-scalar` deliberately
does not reach `dbui-viz`, so nothing scales implicitly either. What actually differs at large is
density: five y ticks rather than three, more x ticks, and treemap **leaf** labels that have no room
at medium.

`Viz/Large/*` is the chart that sits between a control bar and a table on a usage page. Set it to
fill its container rather than trusting 1160 — the region is `flex-1`, so its real width runs from
about 688px (Shell E with the detail sidebar) to about 1220px (a full-width page).

There is no medium `Heatmap` and no large `Donut`, `Leaderboard` or `Segmented Bar`. A heatmap needs
enough columns to read as a field, which 400px cannot give it; a donut gains nothing from width past
its ring, and its own constraint caps it at six slices.

| Figma | React |
|---|---|
| `KPIs` | a `grid grid-cols-3 gap-3` of `StatCard` — no wrapper component |
| `Viz/Card/Metric` | `StatCard` |
| `Viz/Card/Bar` · `Line` · `Leaderboard` · `Donut` · `Treemap` · `SegmentedBar` | `MetricCard` with that chart as `children`. One React component, one card per chart type |
| `Viz/Card/*` → `Header` → `Viz/Inner/Header` | the card's own header, rendered from `label` / `value` / `hint` / `delta` / `action`. Not a component — never write one |
| `Viz/Inner/Header` `Prop=Default` | no `action` passed |
| `Viz/Inner/Header` `Prop=Toggle` | `action={<SegmentControl …>}` — the scope switch the usage pages use |
| `Viz/Inner/Header` `Prop=Menu` | `action={<IconButton …>}` with the `Overflow` glyph |
| `Viz/Card/*` → `Viz/Inner/Metric` | rendered for you by `label` / `value` / `hint` — never write it |
| `Viz/Inner/Metric` → `Title` → `menuIcon` | the `hint` prop. The glyph is `InfoSmall`, not a menu |
| `Viz/Inner/Metric` `Show change` | `delta` plus `deltaWindow`. `deltaTone` is the reader's verdict and has no Figma axis — cost up 30% is negative, coverage up 30% is positive |
| `Viz/Inner/Metric` `Type=Compact` · `Type=Default` | `MetricCard` uses Compact — value and change on one line, because the card header is 44px. `StatCard` uses Default and stacks them |
| `Viz/Card/Metric` `Show link` | whether `action` is passed |
| `Viz/Card/*` → `Viz` | `children` — the viz slot |
| `Viz/Card/*` → `Action` | the `link` prop — `MetricCard` draws the button and its chevron |
| `Viz/Medium/Bar` · `Viz/Large/Bar` | `BarChart` |
| `Viz/Medium/Stacked Bar` · `Viz/Large/Stacked Bar` | `BarChart` with a `series` on each datum |
| `Viz/Medium/Line` `Type=Line` · `Type=Dots` | `LineSeries`, with and without point markers |
| `Viz/Large/Line` | `LineSeries` — `area` on, `showEndDot` on |
| `Viz/Large/Multiline` | `LineSeries` with a `series` on each datum. Colours come from `VIZ_SERIES_ORDER`, which is `categorical-1..10` in order — the Figma strokes bind `viz/categorical/1,2,3` to match |
| `Viz/Medium/Treemap` · `Viz/Large/Treemap` | `Treemap`. `Type` is not a prop — React names a group whenever the tile is wide enough, which is why large shows leaf names and medium does not |
| `Viz/Large/Heatmap` | `Heatmap`. Large only — 30 columns, 6 rows, 28px cells |
| `Viz/Medium/Leaderboard` `Type=Overlay` | `Leaderboard` |
| `Viz/Medium/Donut` `Type=Legend` | `DonutChart showLegend={false}` beside a `Legend` — the pairing, not one component |
| `Viz/Medium/Donut` `Type=Centred` | `DonutChart` on its own |
| `Viz/Medium/Segmented Bar` | `SegmentedBar`. `Colors` is the segment count, `Type` which end the failing segment takes — both are data |
| `Viz/Inner/Donut` | the ring on its own, nested inside `Viz/Medium/Donut` |
| `Viz/Inner/Legend` | `Legend`. Also the `Key` panel beside `Viz/Large/Stacked Bar` |
| `Viz/Inner/Legend` → `Header` | the `columns` prop, not an item |
| `Viz/Inner/Axis Label` | nothing — Vega draws axes, configured once in `vizVegaConfig` |
| `Viz/Medium/Leaderboard` → `.Row` → `Bar` | rendered for you from `weight` — never a sized div |

### Axis labels

`.AxisLabel` carries an `Axis` property with two values, and both are sized to zero on one edge:
`Axis=X` is **0 wide**, `Axis=Y` is **0 tall**. Dropped into a `SPACE_BETWEEN` row or column, each
one lands exactly on its tick and its text overflows symmetrically from that point — so labels of
different widths still centre on their ticks and still spread evenly. That is the whole reason it
exists; never place a bare text node on an axis.

Two consequences worth knowing before you edit a chart:

- **Every frame between the label and the chart edge must have `clipsContent` off.** A single
  clipping ancestor cuts the overflowing half and the axis silently loses its first and last label.
- **The plot gives up the room instead.** A label centred on the extreme tick needs half its width
  beyond it, so `Viz/Large/Bar` and `Viz/Large/Line` inset 8px top and bottom and 20px either side
  of the x-axis row. Without that, "1,000" and "Feb 4" hang outside the 376 × 168 box and get cut by
  the widget.

There is nothing to map in React: axis rendering is Vega's, configured once in `vizVegaConfig`.
`.AxisLabel` is how the design file reproduces it.

### Compositions

#### The KPI band

`Metric tile` carries `delta` and `link` as alternatives, not siblings. The delta is two-part: the
change is toned, the window beside it stays subtle.

```tsx
<div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
  <StatCard label="Total Catalogs" value="177" delta="+2.7%" deltaWindow="vs past 30d" deltaTone="positive" />
  <StatCard label="Total Assets" value="24.8K" delta="+2.7%" deltaWindow="vs past 30d" deltaTone="positive" />
  <StatCard label="Total Principals" value="13.1K" action={{ label: "Manage", onClick: manage }} />
</div>
```

#### A widget with a chart

```tsx
<MetricCard
  label="Asset usage"
  value="16.6M queries"
  link={{ label: "Review Data Usage", onClick: review }}
>
  <BarChart data={queriesByDay} xType="temporal" label="Queries per day" />
</MetricCard>
```

#### A widget with a header control

`Segment Control` inside `Metric` changes what the card shows. Navigation never goes there — that
is what `Action` is for.

```tsx
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
  link={{ label: "Review Usage by Agents", onClick: review }}
>
  <Leaderboard
    columns={{ label: "Principal", value: "Queries" }}
    items={principals}
  />
</MetricCard>
```

#### A donut with a keyed legend

The Vega legend cannot carry a value column, which is why Figma draws `Legend` by hand beside the
ring. Turn the built-in legend off and pair the two.

```tsx
<MetricCard label="Data Access" value="7.8K grants" link={{ label: "Review Access", onClick: review }}>
  <div className="flex items-center gap-4">
    <DonutChart slices={grants} showLegend={false} size={112} label="Grants by level" />
    <Legend
      className="flex-1"
      columns={{ label: "Grants by levels", value: "Assign %" }}
      items={grantLevels}
    />
  </div>
</MetricCard>
```

#### A percentage or health bar

Neither is `Progress`. `Progress` means a task is on its way to a known endpoint; these report a
share of a population, which is what `SegmentedBar` is for — and it already tones a segment.

```tsx
<MetricCard label="Data Quality" value="94.1% healthy tables" link={{ label: "Review Data Quality", onClick: review }}>
  <SegmentedBar
    showLegend={false}
    label="Table health"
    segments={[
      { label: "Healthy", value: 94.1, palette: "positive" },
      { label: "Failing", value: 5.9, palette: "negative" },
    ]}
  />
</MetricCard>
```

---

## Shared leaf slots

Three private components appear inside many families. Recognizing them saves a lookup.

| Figma | Appears in | React |
|---|---|---|
| `.ActionLabel` | Button, Split Button, menu footer and add-new rows | the `Button`'s children — an icon element then text |
| `.InputContent` | Input, Select, Combobox, Input Group, menu search row | the input's `placeholder` or `value`, plus addon children |
| `.TableCellContent` | Table | the `TableCell*` children above |

`.ActionLabel`'s `Show Icon` and `Show Menu` booleans are children, not props. `Show Menu` is `ButtonChevron`, which the button does not add for you.

```tsx
<Button>
  <Plus />
  Add table
</Button>

<Button variant="outline">
  Options
  <ButtonChevron />
</Button>
```

---

## Where Figma and React disagree

Real gaps, not lookup failures. Both sides are listed so neither surface silently wins.

### Figma expresses it, React has no name for it

| Figma | What you have to write instead |
|---|---|
| `.DropdownMenuRow Type=Add New` | a ghost `Button` inside the menu — no `DropdownMenuAddNew` export |
| `.DropdownMenuItemTrailing Type=Icon` | a bare icon with `ml-auto` — only `DropdownMenuSubTrigger` has a built-in trailing icon |
| `DropdownMenuItemText` | a plain `div` wrapping the label and `DropdownMenuItemDescription` |
| `.TableCellContent Cell type=Tag Group` | `Tag` children in a flex row |
| `Split Button` `Size` | the child `Button`'s `size` — the wrapper has no size |
| `Input Group` `Type` | a different addon arrangement |
| `Form Input` `Type` | a different control child |
| `Chart` | a Figma-drawn bar chart with `Y Axis Labels` and `Bar` children. React reads the marks and picks `BarChart`; the layer name does not say which chart it is |
| `Viz/Medium/Leaderboard` `Type=Column` | nothing. React draws the label on the bar and has no `layout` prop, so the column reading is design-only until one is added. Its Code Connect binds `Type=Overlay` alone rather than claim the set |

The first three are the ones worth closing. Each one currently forces either a raw element or an undocumented utility class into a system that bans both.

### React expresses it, Figma has no variant for it

| React | Why it matters |
|---|---|
| `DropdownMenuGroup` | grouping is semantic and invisible in Figma |
| `DropdownMenuRadioGroup` | required — radio items do not work without it |
| the contents of `DropdownMenuSubContent` | Figma draws the submenu trigger only |
| `DropdownMenuContent` `align` `side` `sideOffset` `alignOffset` | the Figma `Dropdown Menu` component carries no properties at all |
| `DropdownMenuItem` `inset` | aligns a label under an icon column |
| `TableCell numeric` | mandatory for figures — Figtree's digits are not equal width |
| `SplitButton` `orientation="vertical"` | Figma is horizontal only |
| `Field` `orientation` | vertical, horizontal and responsive |
| `InputGroupAddon` `align="block-start"` and `"block-end"` | Figma has inline addons only |

### Structural

- **Table is column-major in Figma, row-major in React.** Nothing maps one to one. Transpose.
- **`State` axes are mostly not props.** Only `Disabled` and `Selected` reach code.
- **The `Dropdown Menu` component has a fixed row count in Figma.** It is a canvas, not a constraint. React menus take any number of children.
