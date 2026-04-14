import type { Meta, StoryObj } from "@storybook/react"
import { DataTree, DataTreeNode, DataTreeNodeIcon } from "dbui/components/ui/data-tree"
import { Folder } from "@/components/icons/Folder"
import { FolderOpen } from "@/components/icons/FolderOpen"
import { Table } from "@/components/icons/Table"
import { TableView } from "@/components/icons/TableView"
import { Notebook } from "@/components/icons/Notebook"
import { Pipeline } from "@/components/icons/Pipeline"
import { Schema } from "@/components/icons/Schema"
import { Database } from "@/components/icons/Database"

const meta: Meta = {
  title: "Content/Tree",
  parameters: { layout: "padded" },
}

export default meta

/** Catalog Explorer style tree */
export const CatalogExplorer: StoryObj = {
  render: () => (
    <div className="w-[280px] rounded-lg border border-border bg-background p-2">
      <DataTree>
        <DataTreeNode type="header">
          <DataTreeNodeIcon><Database /></DataTreeNodeIcon>
          main
        </DataTreeNode>
        <DataTreeNode type="folder" expanded depth={1}>
          <DataTreeNodeIcon><Schema /></DataTreeNodeIcon>
          default
        </DataTreeNode>
        <DataTreeNode type="file" depth={2}>
          <DataTreeNodeIcon><Table /></DataTreeNodeIcon>
          customers
        </DataTreeNode>
        <DataTreeNode type="file" depth={2} selected>
          <DataTreeNodeIcon><Table /></DataTreeNodeIcon>
          orders
        </DataTreeNode>
        <DataTreeNode type="file" depth={2}>
          <DataTreeNodeIcon><TableView /></DataTreeNodeIcon>
          revenue_summary
        </DataTreeNode>
        <DataTreeNode type="folder" depth={1}>
          <DataTreeNodeIcon><Folder /></DataTreeNodeIcon>
          analytics
        </DataTreeNode>
        <DataTreeNode type="folder" depth={1}>
          <DataTreeNodeIcon><Folder /></DataTreeNodeIcon>
          staging
        </DataTreeNode>
      </DataTree>
    </div>
  ),
}

/** Workspace file browser style tree */
export const WorkspaceBrowser: StoryObj = {
  render: () => (
    <div className="w-[280px] rounded-lg border border-border bg-background p-2">
      <DataTree>
        <DataTreeNode type="folder" expanded>
          <DataTreeNodeIcon><FolderOpen /></DataTreeNodeIcon>
          my_project
        </DataTreeNode>
        <DataTreeNode type="file" depth={1}>
          <DataTreeNodeIcon><Notebook /></DataTreeNodeIcon>
          exploration.py
        </DataTreeNode>
        <DataTreeNode type="file" depth={1} selected>
          <DataTreeNodeIcon><Notebook /></DataTreeNodeIcon>
          training.py
        </DataTreeNode>
        <DataTreeNode type="file" depth={1}>
          <DataTreeNodeIcon><Pipeline /></DataTreeNodeIcon>
          etl_pipeline
        </DataTreeNode>
        <DataTreeNode type="folder" depth={1} expanded>
          <DataTreeNodeIcon><FolderOpen /></DataTreeNodeIcon>
          utils
        </DataTreeNode>
        <DataTreeNode type="file" depth={2}>
          <DataTreeNodeIcon><Notebook /></DataTreeNodeIcon>
          helpers.py
        </DataTreeNode>
        <DataTreeNode type="file" depth={2}>
          <DataTreeNodeIcon><Notebook /></DataTreeNodeIcon>
          config.py
        </DataTreeNode>
        <DataTreeNode type="folder" depth={1}>
          <DataTreeNodeIcon><Folder /></DataTreeNodeIcon>
          archive
        </DataTreeNode>
      </DataTree>
    </div>
  ),
}
