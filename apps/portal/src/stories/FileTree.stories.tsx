import type { Meta, StoryObj } from "@storybook/react"
import { FileTree, type FileTreeNode } from "dbui/components/ui/data-tree"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/data-tree?raw"

/**
 * `Content/Tree/File Tree` — Storybook home for the L2 `<FileTree>` component.
 *
 * `<FileTree>` is the **semantic** File Tree: it knows about Databricks
 * workspace conventions (regular folders, git-tracked repos, asset bundles,
 * Lakeflow pipelines) and resolves icons (closed + open-state pair) from
 * the `kind` field on each node.
 *
 * Folder kinds:
 *   folder · git-folder · bundle-folder · pipeline-folder
 * File kinds (always leaves):
 *   file · code-file · notebook · query · pipeline-file
 *
 * Unlike DataTree, File Tree has NO virtual section level — every row is a
 * real, indented entity starting at depth 0.
 */
const meta: Meta = {
  title: "Components/Content/Tree/File Tree",
  parameters: { layout: "padded" },
}
export default meta

// ─── A realistic Databricks workspace ───
//
// Folders show their kind (regular / git / bundle / pipeline). Files show
// their kind (notebook / query / code-file / pipeline-file / file). Open and
// closed icons swap automatically when a folder expands.

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
        kind: "git-folder", // → FolderBranch / FolderOpenBranch
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
        kind: "bundle-folder", // → FolderCube / FolderOpenCube
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
        kind: "pipeline-folder", // → FolderSolidPipeline / FolderOpenPipeline
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

export const Default: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 8px 0", color: "#161616" }}>File Tree</h2>
      <p style={{ maxWidth: 720, fontSize: 13, color: "#6F6F6F", lineHeight: "20px", margin: "0 0 16px 0" }}>
        Semantic L2 component. Each node's <code>kind</code> drives both its closed and open icons —
        regular folder, git folder, bundle folder, and pipeline folder all use distinct glyphs.
      </p>
      <div className="w-[260px] border border-border-base rounded-2 p-1">
        <FileTree nodes={fileTreeNodes} />
      </div>

      <ComponentMeta
        source={componentSource}
        componentKey="file-tree"
        figmaUrl="https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3829-12526"
      />
    </div>
  ),
}
