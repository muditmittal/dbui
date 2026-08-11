"use client"

import * as React from "react"
import Link from "next/link"

import { Base } from "dbui-shells/shell"
import { CatalogLayout } from "dbui-shells/catalog"
import { AssistantPanel } from "dbui-shells/components/AssistantPanel"
import { FacetedFilter } from "dbui-shells/components/FacetedFilter"
import { PlatformNav } from "dbui-shells/components/PlatformNav"
import { DataTreeExplorer } from "dbui-shells/compositions/DataTreeExplorer"
import { FileTreeExplorer } from "dbui-shells/compositions/FileTreeExplorer"
import type { DataTreeSection, FileTreeNode } from "dbui/components/ui/data-tree"

import { anchorOffset } from "@/components/docs/anchor"
import { treeSections, catalogItems } from "@/stories/surfaces/catalog-data"

/**
 * The seventh group, and the only one this page does not generate.
 *
 * `gallery-data.ts` is built from `component-index.md`, which is scoped to
 * `packages/dbui` — the CLI, `sync-components.mjs` and `dbui doctor` all count
 * its rows. Adding a `shells` category there would have pulled a second package
 * into every one of those counts to put seven rows on one page, so the group is
 * declared here instead and rendered after the generated six.
 *
 * That is a real seam: a new shell needs a row added by hand, where a new
 * component appears on its own. It is the narrower of the two costs.
 */

/**
 * A shell rendered at its design width and scaled to fit the row.
 *
 * A page shell is 1440px of layout. Dropped into a row at the container's width
 * it resolves against that width instead — the nav rail collapses, the detail
 * pane wraps, and the reader sees the small-viewport layout while looking at a
 * row labeled with the desktop shell's name. Rendering at 1440 and zooming
 * down keeps the layout the one the shell is for.
 *
 * Pointer events are off and the subtree is hidden from the accessibility tree:
 * a scaled shell contains dozens of controls whose hit areas no longer line up
 * with what is drawn, and tabbing into one strands the reader inside a preview.
 * Every row's name links to Storybook, which is where these are operable.
 */
function ScaledShell({
  children,
  height = 420,
}: {
  children: React.ReactNode
  height?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = React.useState(0.35)

  React.useEffect(() => {
    const update = () => {
      if (ref.current) setZoom(ref.current.offsetWidth / 1440)
    }
    update()
    const observer = new ResizeObserver(update)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-2 border border-border-base bg-surface-base"
      style={{ height }}
    >
      <div
        aria-hidden
        className="dbui-scaled-shell"
        style={{
          zoom,
          width: 1440,
          height: height / zoom,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * A shell that already fits a row, held to a height so a tall rail cannot set
 * the height of the page. Live and operable, like the other six groups.
 *
 * `w-fit` so the frame hugs the rail. Full width, the border ran to the end of
 * the row while a 240px rail sat at one end of it, which reads as a component
 * that failed to fill its container rather than as a 240px rail.
 */
function BoundedShell({
  children,
  height = 320,
}: {
  children: React.ReactNode
  height?: number
}) {
  return (
    <div
      className="w-fit overflow-hidden rounded-2 border border-border-base bg-surface-base"
      style={{ height }}
    >
      {children}
    </div>
  )
}

/**
 * Small fixtures rather than the story's. `TreeExplorers.stories.tsx` declares
 * its own inline and exports none, and a `.stories` file is not an import
 * surface — a row here would break the moment someone edited a story. Both are
 * kept to a few nodes on purpose: the row shows the shape of the rail, and
 * Storybook is where the full trees live.
 */
const DATA_SECTIONS: DataTreeSection[] = [
  {
    label: "Catalogs",
    defaultExpanded: true,
    nodes: [
      {
        id: "main",
        label: "main",
        kind: "catalog",
        defaultExpanded: true,
        children: [
          {
            id: "main.sales",
            label: "sales",
            kind: "schema",
            defaultExpanded: true,
            children: [
              { id: "main.sales.orders", label: "orders", kind: "table" },
              { id: "main.sales.customers", label: "customers", kind: "table" },
              { id: "main.sales.daily_revenue", label: "daily_revenue", kind: "view" },
            ],
          },
          { id: "main.raw", label: "raw", kind: "schema" },
        ],
      },
      { id: "samples", label: "samples", kind: "catalog" },
    ],
  },
]

const FILE_NODES: FileTreeNode[] = [
  {
    id: "workspace",
    label: "Shared",
    kind: "folder",
    defaultExpanded: true,
    children: [
      { id: "workspace.etl", label: "etl_pipeline.py", kind: "code-file" },
      { id: "workspace.explore", label: "exploration", kind: "notebook" },
      { id: "workspace.revenue", label: "revenue.sql", kind: "query" },
    ],
  },
  { id: "repos", label: "Repos", kind: "git-folder" },
]

const FACETS = {
  Type: { values: ["Table", "View", "Materialized view", "Streaming table"] },
  Tag: {
    values: ["billing", "production", "cost_center", "env"],
    nested: { env: ["dev", "staging", "production", "sandbox"] },
  },
  Owner: { values: ["me", "my_team", "all"] },
}

const SHELLS: { name: string; storyId?: string; demo: React.ReactNode }[] = [
  {
    name: "Base",
    storyId: "components-shells-base--default",
    demo: (
      <ScaledShell>
        <Base defaultActive="catalog">
          <div className="type-body flex h-full items-center justify-center text-text-subtle">
            Your page content goes here.
          </div>
        </Base>
      </ScaledShell>
    ),
  },
  {
    name: "Catalog Explorer",
    storyId: "components-shells-catalog-explorer--playground",
    demo: (
      <ScaledShell>
        <Base defaultActive="catalog">
          <CatalogLayout
            sections={treeSections}
            items={catalogItems}
            title="Catalog"
            filter={<FacetedFilter facets={FACETS} />}
          />
        </Base>
      </ScaledShell>
    ),
  },
  {
    name: "Data Tree Explorer",
    storyId: "components-compositions-tree-explorers--data-tree-explorer-story",
    demo: (
      <BoundedShell height={360}>
        <DataTreeExplorer title="Catalog" sections={DATA_SECTIONS} />
      </BoundedShell>
    ),
  },
  {
    name: "File Tree Explorer",
    storyId: "components-compositions-tree-explorers--file-tree-explorer-story",
    demo: (
      <BoundedShell height={360}>
        <FileTreeExplorer title="Workspace" nodes={FILE_NODES} />
      </BoundedShell>
    ),
  },
  {
    name: "Platform Nav",
    storyId: "components-compositions-platform-nav--playground",
    demo: (
      <BoundedShell height={360}>
        <PlatformNav />
      </BoundedShell>
    ),
  },
  {
    name: "Assistant Panel",
    storyId: "components-compositions-assistant-panel--default",
    demo: (
      <BoundedShell height={360}>
        <AssistantPanel />
      </BoundedShell>
    ),
  },
  {
    name: "Faceted Filter",
    storyId: "components-compositions-faceted-filter--playground",
    demo: (
      <div className="w-90">
        <FacetedFilter facets={FACETS} />
      </div>
    ),
  },
]

export const SHELLS_GROUP = { id: "group-shells", label: "Shells" }

/**
 * Mounted after hydration, and the reason is a bug rather than a preference.
 *
 * `DataTree` does not survive being server-rendered: a `TreeNode` with an explicit
 * `nodeId` still resolves a different row className on the server than on the
 * client, so every shell containing a tree — Catalog Explorer, Data Tree Explorer,
 * File Tree Explorer — failed hydration and React threw the whole subtree away and
 * rebuilt it. Storybook never caught it because every story is client-only.
 *
 * Deferring keeps a known-broken SSR path out of the page's HTML and costs
 * nothing real here: these are previews, the two scaled ones are `aria-hidden`
 * already, and each row reserves its final height so nothing shifts when they
 * arrive. It is a containment, not a fix — the tree bug is still there for any
 * server-rendered consumer, and it is written up rather than papered over.
 */
function useMounted() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}

export function ShellsGallery() {
  const mounted = useMounted()

  return (
    <div data-doc-generated className="mt-12">
      {/*
        Once for the group, not once per shell. A shell sets `h-screen`, which
        inside a scaled box has to fill the box instead — but React 19 hoists and
        dedupes `<style>`, so rendering this inside `ScaledShell` put two
        identical tags in the server HTML and one in the client tree, and every
        page with two scaled shells failed hydration. One tag, one owner.
      */}
      <style>{`.dbui-scaled-shell > div { height: 100% !important; }`}</style>
      <section id={SHELLS_GROUP.id} style={anchorOffset}>
        <h2 className="type-title-4 text-text-strong">Shells</h2>
        <p className="type-body text-text-subtle">
          Whole page layouts and the rails that make them up. Every screen starts from one of
          these rather than assembling its own chrome.
        </p>
        <div className="mt-2 divide-y divide-border-subtle border-t border-border-subtle">
          {SHELLS.map((shell) => (
            <div
              key={shell.name}
              className="grid grid-cols-1 gap-x-8 gap-y-3 py-6 md:grid-cols-[15rem_minmax(0,1fr)]"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                {shell.storyId ? (
                  <Link
                    href={`/components?path=/story/${shell.storyId}`}
                    className="type-label-bold text-text-strong no-underline hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                  >
                    {shell.name}
                  </Link>
                ) : (
                  <span className="type-label-bold text-text-strong">{shell.name}</span>
                )}
              </div>
              <div className="min-w-0">
                {mounted ? (
                  shell.demo
                ) : (
                  // Reserves the row's height so the strip does not jump when the
                  // previews mount. Tallest of the two frames.
                  <div className="h-105" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
