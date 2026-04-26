import type { Meta, StoryObj } from "@storybook/react"
import { Tree, TreeNode } from "dbui/components/ui/data-tree"
import { Catalog } from "@/components/icons/Catalog"
import { Database } from "@/components/icons/Database"
import { Table } from "@/components/icons/Table"
import { Hash } from "@/components/icons/Hash"
import { Letters } from "@/components/icons/Letters"
import { Folder } from "@/components/icons/Folder"
import { FolderOpen } from "@/components/icons/FolderOpen"
import { Overflow } from "@/components/icons/Overflow"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Content/Tree/TreeNode",
  parameters: { layout: "padded" },
}

export default meta

export const AllStates: StoryObj = {
  render: () => (
    <div className="w-[300px] flex flex-col gap-6">
      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Default</h3>
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" depth={0} />
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Selected</h3>
        <Tree>
          <TreeNode icon={<Database />} label="customer_purchase_orders" depth={0} selected />
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Expandable (collapsed)</h3>
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" depth={0}>
            <TreeNode icon={<Database />} label="main" depth={1} />
          </TreeNode>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Expandable (expanded + trail line)</h3>
        <Tree>
          <TreeNode icon={<Catalog />} label="my_catalog" defaultExpanded depth={0}>
            <TreeNode icon={<Database />} label="main" depth={1} />
            <TreeNode icon={<Database />} label="system" depth={1} />
          </TreeNode>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Empty (expands to "No items")</h3>
        <Tree>
          <TreeNode icon={<Database />} label="empty_schema" depth={0}>{/* empty */}</TreeNode>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>With trailing actions</h3>
        <Tree>
          <TreeNode icon={<Table />} label="customer_orders" depth={0} trailing={<Button variant="ghost" size="icon-sm"><Overflow /></Button>} />
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Leaf node (column — no chevron)</h3>
        <Tree>
          <TreeNode icon={<Hash />} label="order_id" depth={0} />
          <TreeNode icon={<Letters />} label="customer_name" depth={0} />
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Icon swap on expand (File Tree)</h3>
        <Tree>
          <TreeNode icon={<Folder />} iconExpanded={<FolderOpen />} label="src" defaultExpanded depth={0}>
            <TreeNode icon={<Folder />} iconExpanded={<FolderOpen />} label="components" depth={1}>{/* empty */}</TreeNode>
          </TreeNode>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Depth levels</h3>
        <Tree>
          <TreeNode icon={<Catalog />} label="Depth 0" defaultExpanded depth={0}>
            <TreeNode icon={<Database />} label="Depth 1" defaultExpanded depth={1}>
              <TreeNode icon={<Database />} label="Depth 2" defaultExpanded depth={2}>
                <TreeNode icon={<Table />} label="Depth 3" defaultExpanded depth={3}>
                  <TreeNode icon={<Hash />} label="Depth 4" depth={4} />
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    </div>
  ),
}
