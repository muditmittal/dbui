import type { Meta, StoryObj } from "@storybook/react"
import { Tree, TreeSection, TreeNode } from "dbui/components/ui/data-tree"
import { Catalog } from "@/components/icons/Catalog"
import { Database } from "@/components/icons/Database"

const meta: Meta = {
  title: "Content/Tree/TreeSection",
  parameters: { layout: "padded" },
}

export default meta

export const AllStates: StoryObj = {
  render: () => (
    <div className="w-[260px] flex flex-col gap-6">
      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Expanded (default)</h3>
        <Tree>
          <TreeSection label="My organization">
            <TreeNode icon={<Catalog />} label="my_catalog" depth={0} />
            <TreeNode icon={<Catalog />} label="customers" depth={0} />
          </TreeSection>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Collapsed</h3>
        <Tree>
          <TreeSection label="Delta shared" defaultExpanded={false}>
            <TreeNode icon={<Catalog />} label="samples" depth={0} />
          </TreeSection>
        </Tree>
      </div>

      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8C8C8C", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Multiple sections</h3>
        <Tree>
          <TreeSection label="My organization">
            <TreeNode icon={<Catalog />} label="my_catalog" depth={0} />
            <TreeNode icon={<Catalog />} label="customers" depth={0} />
          </TreeSection>
          <TreeSection label="Delta shared">
            <TreeNode icon={<Catalog />} label="samples" depth={0} />
          </TreeSection>
          <TreeSection label="Legacy">
            <TreeNode icon={<Database />} label="hive_metastore" depth={0} />
          </TreeSection>
        </Tree>
      </div>
    </div>
  ),
}
