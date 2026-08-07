"use client"

import * as React from "react"
import { VegaEmbed } from "react-vega"
import type { Result, VisualizationSpec } from "vega-embed"

import { cn } from "../lib/utils"
import { useMeasure } from "../lib/use-measure"
import { useVizTheme, VEGA_EMBED_OPTIONS, vizVegaConfig } from "../lib/theme"

/**
 * @standard Treemap
 * @guideline Use for two-level hierarchies sized by a metric — catalogs by schema size, cost by service
 * @guideline Cap visible groups with `maxGroups`; the remainder collapses into a single "Others" tile
 * @guideline Give it at least 240px of height — treemaps become unreadable when short
 * @constraint Leaf tiles hide themselves automatically below 4px, and when their parent group is under 20px
 * @constraint Always pass a meaningful `label` so the chart is announced to screen readers
 *
 * Ported from governance-hub-prototype `src/components/widgets/TreemapChart.tsx`
 * (Vega `stratify` + `treemap` transforms). Every tile takes a step of the
 * sequential scale — surfaces low, borders high — so the structure survives the
 * ramp reversing under `.dark`.
 */

export interface TreemapLeaf {
  id: string
  name: string
  value: number
}

export interface TreemapGroup {
  id: string
  name: string
  /** Used when the group has no leaves. Otherwise leaf values are summed. */
  value?: number
  leaves?: TreemapLeaf[]
}

export interface TreemapSelection {
  type: "group" | "leaf" | "other"
  id: string
  name: string
  groupId?: string
  groupName?: string
}

export interface TreemapProps
  extends Omit<React.ComponentProps<"div">, "children" | "onSelect"> {
  data: TreemapGroup[]
  label?: string
  height?: number
  /** Show only the N largest groups; the rest aggregate into one tile. */
  maxGroups?: number
  otherLabel?: string
  /** Gap between group tiles. */
  paddingInner?: number
  paddingOuter?: number
  /** Gap between leaf tiles inside a group. */
  leafGap?: number
  /** Inset of leaves from their group's edge. */
  groupPadding?: number
  borderWidth?: number
  onSelect?: (selection: TreemapSelection) => void
}

interface FlatNode {
  id: string
  parent?: string
  name?: string
  type?: "group" | "leaf" | "other"
  value?: number
  groupId?: string
  groupName?: string
}

function groupTotal(group: TreemapGroup): number {
  if (group.leaves?.length) {
    return group.leaves.reduce((sum, leaf) => sum + leaf.value, 0)
  }
  return group.value ?? 0
}

function Treemap({
  data,
  label = "Treemap",
  height = 240,
  maxGroups,
  otherLabel = "Others",
  paddingInner = 1,
  paddingOuter = 1,
  leafGap = 0.5,
  groupPadding = 0,
  borderWidth = 1,
  onSelect,
  className,
  ...props
}: TreemapProps) {
  const theme = useVizTheme()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const { flatData, index } = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => groupTotal(b) - groupTotal(a))
    const visible =
      maxGroups && sorted.length > maxGroups ? sorted.slice(0, maxGroups) : sorted
    const remainder =
      maxGroups && sorted.length > maxGroups ? sorted.slice(maxGroups) : []

    const nodes: FlatNode[] = [{ id: "__root__" }]
    const lookup = new Map<string, TreemapSelection>()

    for (const group of visible) {
      const hasLeaves = Boolean(group.leaves?.length)
      nodes.push({
        id: group.id,
        parent: "__root__",
        name: group.name,
        type: "group",
        ...(hasLeaves ? {} : { value: group.value ?? 0 }),
      })
      lookup.set(group.id, {
        type: "group",
        id: group.id,
        name: group.name,
      })

      for (const leaf of group.leaves ?? []) {
        const leafId = `${group.id}::${leaf.id}`
        nodes.push({
          id: leafId,
          parent: group.id,
          name: leaf.name,
          type: "leaf",
          value: leaf.value,
          groupId: group.id,
          groupName: group.name,
        })
        lookup.set(leafId, {
          type: "leaf",
          id: leaf.id,
          name: leaf.name,
          groupId: group.id,
          groupName: group.name,
        })
      }
    }

    if (remainder.length > 0) {
      const total = remainder.reduce((sum, group) => sum + groupTotal(group), 0)
      nodes.push({
        id: "__other__",
        parent: "__root__",
        name: otherLabel,
        type: "other",
        value: total,
      })
      lookup.set("__other__", {
        type: "other",
        id: "__other__",
        name: otherLabel,
      })
    }

    return { flatData: nodes, index: lookup }
  }, [data, maxGroups, otherLabel])

  const spec = React.useMemo<VisualizationSpec>(
    () =>
      ({
        $schema: "https://vega.github.io/schema/vega/v5.json",
        config: vizVegaConfig(theme),
        width: Math.max(width, 0),
        height,
        padding: 0,
        autosize: "none",

        data: [
          {
            name: "tree",
            values: flatData,
            transform: [
              { type: "stratify", key: "id", parentKey: "parent" },
              {
                type: "treemap",
                field: "value",
                sum: true,
                size: [{ signal: "width" }, { signal: "height" }],
                round: true,
                method: "squarify",
                ratio: 1.6,
                paddingInner,
                paddingOuter,
              },
            ],
          },
          {
            name: "groups",
            source: "tree",
            transform: [{ type: "filter", expr: 'datum.type === "group"' }],
          },
          {
            name: "others",
            source: "tree",
            transform: [{ type: "filter", expr: 'datum.type === "other"' }],
          },
          {
            name: "leaves",
            source: "tree",
            transform: [
              { type: "filter", expr: 'datum.type === "leaf"' },
              {
                type: "lookup",
                from: "tree",
                key: "id",
                fields: ["parent"],
                values: ["x0", "y0", "x1", "y1"],
                as: ["parentX0", "parentY0", "parentX1", "parentY1"],
              },
            ],
          },
        ],

        signals: [
          {
            name: "hoveredLeafId",
            value: null,
            on: [
              { events: "@leafRects:mouseover", update: "datum.id" },
              { events: "@leafRects:mouseout", update: "null" },
            ],
          },
          {
            name: "hoveredGroupId",
            value: null,
            on: [
              { events: "@groupFill:mouseover", update: "datum.id" },
              { events: "@groupFill:mouseout", update: "null" },
            ],
          },
          {
            name: "selected",
            value: null,
            on: [
              {
                events: "@leafRects:click",
                update: "{id: datum.id, at: now()}",
              },
              {
                events: "@groupFill:click",
                update: "{id: datum.id, at: now()}",
              },
              {
                events: "@othersRect:click",
                update: "{id: datum.id, at: now()}",
              },
            ],
          },
        ],

        marks: [
          // Group fill sits underneath and still receives hover in the gaps
          // between leaf tiles.
          {
            type: "rect",
            name: "groupFill",
            from: { data: "groups" },
            encode: {
              enter: { cornerRadius: { value: 2 } },
              update: {
                x: { signal: `datum.x0 + ${paddingInner}` },
                y: { signal: `datum.y0 + ${paddingInner}` },
                x2: { signal: `datum.x1 - ${paddingInner}` },
                y2: { signal: `datum.y1 - ${paddingInner}` },
                fill: [
                  {
                    test: "hoveredGroupId === datum.id",
                    value: theme.treemap.groupSurfaceHover,
                  },
                  {
                    test: "(datum.x1 - datum.x0) < 20 || (datum.y1 - datum.y0) < 20",
                    value: theme.treemap.groupSurfaceStrong,
                  },
                  { value: theme.treemap.groupSurface },
                ],
                stroke: [
                  {
                    test: "hoveredGroupId === datum.id",
                    value: theme.treemap.groupBorderHover,
                  },
                  { value: theme.treemap.groupBorder },
                ],
                strokeWidth: [
                  {
                    test: "hoveredGroupId === datum.id",
                    value: borderWidth + 1,
                  },
                  { value: borderWidth },
                ],
                cursor: { value: "pointer" },
              },
            },
          },

          {
            type: "rect",
            name: "othersRect",
            from: { data: "others" },
            encode: {
              enter: { cornerRadius: { value: 2 } },
              update: {
                x: { signal: `datum.x0 + ${paddingInner}` },
                y: { signal: `datum.y0 + ${paddingInner}` },
                x2: { signal: `datum.x1 - ${paddingInner}` },
                y2: { signal: `datum.y1 - ${paddingInner}` },
                fill: { value: theme.treemap.otherSurface },
                stroke: { value: theme.treemap.otherBorder },
                strokeWidth: { value: borderWidth },
                cursor: { value: "pointer" },
              },
            },
          },

          // Leaf tiles are the top layer and receive events first. They are
          // inset so the group fill stays hoverable in the gaps.
          {
            type: "rect",
            name: "leafRects",
            from: { data: "leaves" },
            encode: {
              enter: { cornerRadius: { value: 1 } },
              update: {
                x: {
                  signal: `datum.x0 + ${leafGap} + (datum.x0 === datum.parentX0 ? ${groupPadding} : 0)`,
                },
                y: {
                  signal: `datum.y0 + ${leafGap} + (datum.y0 === datum.parentY0 ? ${groupPadding} : 0)`,
                },
                x2: {
                  signal: `datum.x1 - ${leafGap} - (datum.x1 === datum.parentX1 ? ${groupPadding} : 0)`,
                },
                y2: {
                  signal: `datum.y1 - ${leafGap} - (datum.y1 === datum.parentY1 ? ${groupPadding} : 0)`,
                },
                fill: [
                  {
                    test: "hoveredLeafId === datum.id",
                    value: theme.treemap.leafSurfaceHover,
                  },
                  { value: theme.treemap.leafSurface },
                ],
                stroke: [
                  {
                    test: "hoveredLeafId === datum.id",
                    value: theme.treemap.leafBorderHover,
                  },
                  { value: null },
                ],
                strokeWidth: [
                  { test: "hoveredLeafId === datum.id", value: 1 },
                  { value: 0 },
                ],
                fillOpacity: [
                  {
                    test: "(datum.x1 - datum.x0) < 4 || (datum.y1 - datum.y0) < 4",
                    value: 0,
                  },
                  {
                    test: "(datum.parentX1 - datum.parentX0) < 20 || (datum.parentY1 - datum.parentY0) < 20",
                    value: 0,
                  },
                  { value: 1 },
                ],
                cursor: { value: "pointer" },
              },
            },
          },
        ],
      }) as unknown as VisualizationSpec,
    [
      borderWidth,
      flatData,
      groupPadding,
      height,
      leafGap,
      paddingInner,
      paddingOuter,
      theme,
      width,
    ]
  )

  // Held in a ref so a new onSelect identity never forces Vega to re-embed.
  const onSelectRef = React.useRef(onSelect)
  React.useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  const handleEmbed = React.useCallback(
    (result: Result) => {
      result.view.addSignalListener("selected", (_name, value) => {
        if (!onSelectRef.current || !value || typeof value !== "object") return
        const id = (value as { id?: string }).id
        if (!id) return
        const selection = index.get(id)
        if (selection) onSelectRef.current(selection)
      })
    },
    [index]
  )

  return (
    <div
      ref={ref}
      data-slot="treemap"
      role="img"
      aria-label={label}
      className={cn("w-full", className)}
      {...props}
    >
      {width > 0 ? (
        <VegaEmbed
          spec={spec}
          options={VEGA_EMBED_OPTIONS}
          onEmbed={handleEmbed}
        />
      ) : null}
    </div>
  )
}

export { Treemap }
