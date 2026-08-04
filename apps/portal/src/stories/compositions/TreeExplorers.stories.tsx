import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { DataTreeExplorer } from "dbui-shells/compositions/DataTreeExplorer"
import { FileTreeExplorer } from "dbui-shells/compositions/FileTreeExplorer"
import { PreviewPopup } from "dbui-shells/compositions/PreviewPopup"
import { Button } from "dbui/components/ui/button"
import {
  DATA_KIND_ICON,
  type DataTreeSection,
  type DataTreeNode,
  type FileTreeNode,
} from "dbui/components/ui/data-tree"
import type { FacetData } from "dbui-shells/components/FacetedFilter"
import { Catalog } from "@/components/icons/Catalog"
import { CatalogUserHome } from "@/components/icons/CatalogUserHome"
import { CatalogShared } from "@/components/icons/CatalogShared"
import { Folder } from "@/components/icons/Folder"
import { Plus } from "@/components/icons/Plus"
import { Overflow } from "@/components/icons/Overflow"

// ─── Helpers — build a Unity-Catalog-shaped tree using kind-driven nodes ────
//
// The L2 `<DataTree>` resolves icons from `kind`, so we DON'T pass `icon` for
// each row except where we need a sub-variant (e.g. CatalogShared on a shared
// catalog, Hash for a numeric column).

type SchemaSpec = { name: string; tables?: string[]; views?: string[]; volumes?: string[] }

type AssetKindForPreview =
  | "catalog" | "schema" | "table" | "view" | "volume" | "model" | "function"

// Common metadata for ALL asset types. Per the spec — Location, Owner, Edited,
// and description are shared across catalogs / schemas / tables / models / etc.
function commonMeta(seed: number, parentPath: string, kind: AssetKindForPreview, name: string) {
  const owner =
    name.startsWith("ml_") || parentPath.includes("ml_data")
      ? "ml-platform"
      : parentPath.includes("main") || (parentPath === "My organization" && seed % 2 === 0)
      ? "data-eng-team"
      : "Mudit Mittal"
  const editedDays = (seed % 90) + 1
  const edited =
    editedDays > 30 ? `${Math.round(editedDays / 30)} months ago` : `${editedDays} days ago`
  return { owner, edited, parentPath }
}

function descriptionFor(kind: AssetKindForPreview, name: string, parent: string): string {
  switch (kind) {
    case "catalog":
      return `Top-level catalog ${name} containing schemas across business domains. Governed by Unity Catalog with permissions managed by the data platform team.`
    case "schema":
      return `Schema ${name} grouping related tables and views in ${parent}. Maintained by domain-specific stewards; refer to schema-level tags for ownership and SLAs.`
    case "table":
      return `This table stores ${name.replace(/_/g, " ")} records and is used by downstream pipelines in ${parent}. Key columns include id, created_at, updated_at, plus domain-specific attributes.`
    case "view":
      return `Materialized view of ${name.replace(/_/g, " ")} aggregated from ${parent}. Refreshes hourly.`
    case "volume":
      return `Volume ${name} holding raw files for ${parent}. Mounted into the catalog's storage layer.`
    case "model":
      return `Registered model ${name}. Versions are tracked in MLflow; current production version is served via Model Serving.`
    case "function":
      return `User-defined function ${name} registered in ${parent}. Called by analytics queries and downstream ETL jobs.`
  }
}

// Build a PreviewPopup React element for any asset type.
function makePreviewData(opts: {
  kind: AssetKindForPreview
  name: string
  parentPath: string
  icon?: React.ReactNode
  schemaCount?: number
  tableCount?: number
  viewCount?: number
}): React.ReactNode {
  const seed = (opts.parentPath + opts.name).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const common = commonMeta(seed, opts.parentPath, opts.kind, opts.name)
  const certified = seed % 3 === 0
  const extras: Partial<React.ComponentProps<typeof PreviewPopup>> = {}

  if (opts.kind === "table" || opts.kind === "view") {
    const queries = ((seed * 17) % 9000) + 100
    const qualityStatus = (["healthy", "warning", "stale"] as const)[seed % 3]
    const qualityText =
      qualityStatus === "healthy"
        ? "Healthy as of 2 hours ago"
        : qualityStatus === "warning"
        ? "Quality check warning"
        : "Stale — last checked 6 days ago"
    const sizeGiB = (((seed * 13) % 10000) / 100).toFixed(2)
    const fileCount = ((seed * 7) % 50) + 1
    extras.popularity = `${queries.toLocaleString()} queries in the last 30 days`
    extras.quality = { status: qualityStatus, text: qualityText }
    extras.size = `${sizeGiB} GiB, ${fileCount} files`
  } else if (opts.kind === "volume") {
    const sizeGiB = (((seed * 13) % 50000) / 100).toFixed(2)
    const fileCount = ((seed * 11) % 1500) + 50
    extras.size = `${sizeGiB} GiB, ${fileCount} files`
  } else if (opts.kind === "catalog") {
    if (opts.schemaCount !== undefined) extras.size = `${opts.schemaCount} schemas`
  } else if (opts.kind === "schema") {
    const t = opts.tableCount ?? 0
    const v = opts.viewCount ?? 0
    if (t + v > 0) {
      const parts: string[] = []
      if (t > 0) parts.push(`${t} table${t === 1 ? "" : "s"}`)
      if (v > 0) parts.push(`${v} view${v === 1 ? "" : "s"}`)
      extras.size = parts.join(", ")
    }
  }

  // Default icon for the popup matches the L2 mapping unless overridden.
  const PopupKindIcon = DATA_KIND_ICON[opts.kind]
  return React.createElement(PreviewPopup, {
    name: opts.name,
    icon: opts.icon ?? React.createElement(PopupKindIcon),
    certified,
    parentPath: common.parentPath,
    owner: common.owner,
    edited: common.edited,
    description: descriptionFor(opts.kind, opts.name, common.parentPath),
    ...extras,
    onMoreClick: () => console.log("more:", `${common.parentPath}.${opts.name}`),
  })
}

// makeCatalog returns a DataTreeNode with kind="catalog" and nested schemas/
// tables/views/volumes. Icons resolve from kind unless `icon` is passed for
// a sub-variant (e.g. CatalogUserHome / CatalogShared).
function makeCatalog(
  name: string,
  iconOverride: React.ReactNode | undefined,
  extraSchemas: SchemaSpec[] = [],
  parentLabel: string = "My organization",
): DataTreeNode {
  const systemSchemas: SchemaSpec[] = [{ name: "default" }, { name: "information_schema" }]
  const allSchemas = [...extraSchemas, ...systemSchemas].sort((a, b) =>
    a.name.localeCompare(b.name),
  )
  return {
    id: `catalog-${name}`,
    label: name,
    kind: "catalog",
    icon: iconOverride,
    preview: makePreviewData({
      kind: "catalog",
      name,
      parentPath: parentLabel,
      icon: iconOverride,
      schemaCount: allSchemas.length,
    }),
    children: allSchemas.map((schema) => ({
      id: `${name}.${schema.name}`,
      label: schema.name,
      kind: "schema",
      preview: makePreviewData({
        kind: "schema",
        name: schema.name,
        parentPath: name,
        tableCount: (schema.tables ?? []).length,
        viewCount: (schema.views ?? []).length,
      }),
      children: [
        ...(schema.tables ?? []).map<DataTreeNode>((t) => ({
          id: `${name}.${schema.name}.${t}`,
          label: t,
          kind: "table",
          leaf: true,
          preview: makePreviewData({
            kind: "table",
            name: t,
            parentPath: `${name}.${schema.name}`,
          }),
        })),
        ...(schema.views ?? []).map<DataTreeNode>((v) => ({
          id: `${name}.${schema.name}.${v}`,
          label: v,
          kind: "view",
          leaf: true,
          preview: makePreviewData({
            kind: "view",
            name: v,
            parentPath: `${name}.${schema.name}`,
          }),
        })),
        ...(schema.volumes ?? []).map<DataTreeNode>((v) => ({
          id: `${name}.${schema.name}.${v}`,
          label: v,
          kind: "volume",
          leaf: true,
          preview: makePreviewData({
            kind: "volume",
            name: v,
            parentPath: `${name}.${schema.name}`,
          }),
        })),
      ],
    })),
  }
}

// ─── Realistic catalog tree ───
//
// My organization:
//   - my_catalog (always first, CatalogUserHome variant)
//   - main (always second — a Databricks default)
//   - then alphabetical: abac_test, demo_catalog, ml_data, sales_360
// Delta shared: partner_data, snowflake_mirror (CatalogShared variant)
// Legacy: hive_metastore

const myOrgRest = [
  makeCatalog("abac_test", undefined, [
    { name: "test_runs", tables: ["abac_e2e_runs", "permission_checks"] },
  ]),
  makeCatalog("demo_catalog", undefined, [
    { name: "examples", tables: ["nyc_taxi", "iris", "wine_quality"] },
    { name: "tutorials", tables: ["intro_dataset"] },
  ]),
  makeCatalog("ml_data", undefined, [
    { name: "features", tables: ["customer_features", "product_features"] },
    { name: "predictions", tables: ["churn_predictions", "ltv_forecast"] },
    { name: "models", tables: ["model_versions"] },
  ]),
  makeCatalog("sales_360", undefined, [
    { name: "raw", tables: ["salesforce_accounts", "hubspot_contacts"] },
    { name: "silver", tables: ["accounts_clean", "deals"] },
    { name: "gold", tables: ["account_360", "win_rates"] },
  ]),
].sort((a, b) => a.label.localeCompare(b.label))

const dataTreeSections: DataTreeSection[] = [
  {
    label: "My organization",
    nodes: [
      makeCatalog("my_catalog", <CatalogUserHome />, [
        { name: "sales", tables: ["leads", "opportunities", "accounts"] },
        { name: "marketing", tables: ["campaigns", "events"], views: ["campaign_performance"] },
        { name: "operations", tables: ["incidents", "deployments"] },
      ]),
      makeCatalog("main", undefined, [
        { name: "billing", tables: ["usage", "invoices"] },
        { name: "metrics", tables: ["dau", "mau", "revenue"], views: ["weekly_kpi"] },
      ]),
      ...myOrgRest,
    ],
  },
  {
    label: "Delta shared",
    nodes: [
      makeCatalog("partner_data", <CatalogShared />, [
        { name: "shared_tables", tables: ["partner_orders", "partner_inventory"] },
      ], "Delta shared"),
      makeCatalog("snowflake_mirror", <CatalogShared />, [
        { name: "warehouse_mirror", tables: ["dim_customer", "fact_sales"] },
      ], "Delta shared"),
    ],
  },
  {
    label: "Legacy",
    defaultExpanded: false,
    nodes: [
      makeCatalog("hive_metastore", undefined, [
        { name: "old_etl", tables: ["raw_events_2019", "raw_events_2020"] },
      ], "Legacy"),
    ],
  },
]

// ─── Sample facets for FacetedFilter ───

const dataTreeFacets: FacetData = {
  Owner: { values: ["mudit.mittal", "data-eng-team", "ml-platform", "Shared"] },
  Type: { values: ["Catalog", "Schema", "Table", "View", "Volume", "Function", "Model"] },
  Tags: { values: ["pii", "production", "deprecated", "certified"] },
  "Last modified": { values: ["Today", "Last 7 days", "Last 30 days", "Older"] },
}

// ─── Go-to items for the root switcher ───

const goToItems = [
  { id: "go-my-catalog", label: "my_catalog", icon: <CatalogUserHome /> },
  { id: "go-main", label: "main", icon: <Catalog /> },
  { id: "go-shared", label: "Delta shared", icon: <CatalogShared /> },
]

// ─── File tree data — kind-driven ────────────────────────────────────────
//
// Per Figma File Tree (3829:12526). No virtual section level — every row is
// real. `<FileTree>` resolves icons + open-state pairing from `kind`.
//
//   folder            → Folder / FolderOpen
//   git-folder        → FolderBranch / FolderOpenBranch
//   bundle-folder     → FolderCube / FolderOpenCube
//   pipeline-folder   → FolderSolidPipeline / FolderOpenPipeline
//   notebook · query · code-file · pipeline-file · file (auto-leaf)

const fileTreeNodes: FileTreeNode[] = [
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      {
        id: "drafts",
        label: "Drafts",
        kind: "folder",
        children: [
          { id: "draft_query_1", label: "untitled_query.sql", kind: "query" },
          { id: "draft_dashboard", label: "draft_dashboard.lvdash.json", kind: "file" },
        ],
      },
      {
        id: "analytics_repo",
        label: "analytics-repo",
        kind: "git-folder",
        children: [
          {
            id: "notebooks",
            label: "notebooks",
            kind: "folder",
            children: [
              { id: "exploration", label: "01_exploration.ipynb", kind: "notebook" },
              { id: "transform", label: "02_transform.py", kind: "code-file" },
              { id: "weekly_report", label: "weekly_report.sql", kind: "query" },
            ],
          },
          {
            id: "src",
            label: "src",
            kind: "folder",
            children: [
              { id: "ingest_main", label: "ingest_main.py", kind: "code-file" },
              { id: "transform_silver", label: "transform_silver.py", kind: "code-file" },
            ],
          },
          { id: "readme", label: "README.md", kind: "file" },
        ],
      },
      {
        id: "asset_bundle",
        label: "customer-360-bundle",
        kind: "bundle-folder",
        children: [
          { id: "bundle_yaml", label: "databricks.yml", kind: "code-file" },
          {
            id: "bundle_resources",
            label: "resources",
            kind: "folder",
            children: [{ id: "bundle_job", label: "ingest_job.yml", kind: "code-file" }],
          },
        ],
      },
      {
        id: "pipelines",
        label: "lakeflow-pipelines",
        kind: "pipeline-folder",
        children: [
          { id: "ingest_pipeline", label: "ingest_pipeline.py", kind: "pipeline-file" },
          { id: "silver_pipeline", label: "silver_pipeline.py", kind: "pipeline-file" },
        ],
      },
      { id: "scratch", label: "scratch.sql", kind: "query" },
    ],
  },
  { id: "shared", label: "Shared with me", kind: "folder", children: [] },
  { id: "trash", label: "Trash", kind: "folder", children: [] },
]

const fileHeaderActions = (
  <>
    <Button variant="ghost" size="icon-sm" aria-label="New file">
      <Plus />
    </Button>
    <Button variant="ghost" size="icon-sm" aria-label="More options">
      <Overflow />
    </Button>
  </>
)

// ─── Stories ───────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Components/Compositions/Tree Explorers",
  parameters: { layout: "fullscreen" },
}
export default meta

export const DataTreeExplorerStory: StoryObj = {
  name: "Data Tree Explorer",
  render: () => (
    <div style={{ height: "100vh", display: "flex" }}>
      <DataTreeExplorer
        title="Catalog"
        titleIcon={<Catalog />}
        goToItems={goToItems}
        facets={dataTreeFacets}
        sections={dataTreeSections}
        onSelect={(id) => console.log("selected:", id)}
        onFocusNode={(id, label) => console.log("focus:", id, label)}
        onNodeMenu={(id, label) => console.log("node menu:", id, label)}
        onWarehouseSelect={(id) => console.log("warehouse:", id)}
      />
      <div style={{ flex: 1, padding: "24px", color: "#6F6F6F", fontSize: 13 }}>
        <p>
          <strong>DataTreeExplorer</strong> (L3) wraps the L2 <code>&lt;DataTree&gt;</code> with the
          full Catalog Explorer header pattern:
        </p>
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
          <li>Root-switcher chip (click to see <code>focusPath</code> + Go-to items)</li>
          <li>Compute selector (green dot) → 4 warehouses with Serverless badges</li>
          <li>Add menu (Plus) → catalog/schema/table/view + 3 submenus</li>
          <li>Overflow menu → Governance hub, Delta sharing, Clean rooms, etc.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          The tree itself is fully kind-driven — every node carries{" "}
          <code>kind: "catalog" | "schema" | "table" | …</code>. Icons resolve automatically from{" "}
          <code>DATA_KIND_ICON</code>; <code>CatalogUserHome</code> and <code>CatalogShared</code>{" "}
          are passed only as overrides for sub-variants.
        </p>
      </div>
    </div>
  ),
}

export const FileTreeExplorerStory: StoryObj = {
  name: "File Tree Explorer",
  render: () => (
    <div style={{ height: "100vh", display: "flex" }}>
      <FileTreeExplorer
        title="Workspace"
        titleIcon={<Folder />}
        headerActions={fileHeaderActions}
        searchPlaceholder="Search files"
        nodes={fileTreeNodes}
      />
      <div style={{ flex: 1, padding: "24px", color: "#6F6F6F", fontSize: 13 }}>
        <p>
          <strong>FileTreeExplorer</strong> (L3) wraps the L2 <code>&lt;FileTree&gt;</code>. Folders
          auto-swap closed → open icon based on <code>kind</code> +{" "}
          <code>FILE_KIND_ICON[kind].iconExpanded</code>. Search filters across all rows; matching
          parents auto-expand to reveal hits.
        </p>
        <p style={{ marginTop: 12, color: "#999" }}>
          Distinct folder kinds: regular (Folder), git-folder (FolderBranch),{" "}
          bundle-folder (FolderCube), pipeline-folder (FolderSolidPipeline). Distinct file kinds:{" "}
          file, code-file, notebook, query, pipeline-file.
        </p>
      </div>
    </div>
  ),
}

export const ControlledSearch: StoryObj = {
  render: () => {
    const [query, setQuery] = useState("")
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 12, borderBottom: "1px solid #e5e5e5", fontSize: 13 }}>
          External search input (controlled mode):{" "}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a query"
            style={{ marginLeft: 8, padding: "4px 8px", fontSize: 13, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <span style={{ marginLeft: 16, color: "#999" }}>
            Pass <code>searchValue</code> + <code>onSearchChange</code> to control filtering from outside.
          </span>
        </div>
        <div style={{ flex: 1, display: "flex" }}>
          <DataTreeExplorer
            title="Catalog (controlled)"
            titleIcon={<Catalog />}
            searchEnabled={false}
            searchValue={query}
            sections={dataTreeSections}
          />
          <div style={{ flex: 1, padding: 24, color: "#6F6F6F", fontSize: 13 }}>
            <p>
              The composition's built-in search/FacetedFilter is hidden via{" "}
              <code>searchEnabled=false</code>. The query bar at the top drives{" "}
              <code>searchValue</code>. The composition still filters internally — for fully
              external filtering, the consumer is responsible for filtering <code>sections</code>{" "}
              before passing them in.
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const PreviewPopupStandalone: StoryObj = {
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ padding: 40, background: "#f5f5f7" }}>
      <PreviewPopup
        name="netflix_titles"
        certified
        parentPath="main.dustinvannoy_dev_tmp"
        owner="Dustin Vannoy"
        popularity="6389 queries in the last 30 days"
        quality={{ status: "healthy", text: "Healthy as of 2 hours ago" }}
        edited="2 months ago"
        size="15.23 GiB, 17 files"
        description="This table stores daily mappings between customers and their associated respective metadata. Key columns include customer_id, title_id, watched_at, completion_pct."
        onMoreClick={() => console.log("more")}
      />
    </div>
  ),
}

export const MinimalAssetPicker: StoryObj = {
  render: () => (
    <div style={{ height: "100vh", display: "flex" }}>
      <DataTreeExplorer
        title="Pick a table"
        titleIcon={<Catalog />}
        warehouses={null}
        addMenuItems={null}
        overflowMenuItems={null}
        facets={null}
        searchPlaceholder="Search tables"
        sections={dataTreeSections}
      />
      <div style={{ flex: 1, padding: "24px", color: "#6F6F6F", fontSize: 13 }}>
        <p>
          <strong>Asset picker mode</strong> — same composition, all action menus hidden via{" "}
          <code>warehouses=null</code> / <code>addMenuItems=null</code> /{" "}
          <code>overflowMenuItems=null</code>, and FacetedFilter swapped for a plain search via{" "}
          <code>facets=null</code>. The same composition serves multiple contexts without
          duplication — exactly what we discussed in the layering model.
        </p>
      </div>
    </div>
  ),
}
