import figma from "@figma/code-connect"
import { Tree, TreeSection, TreeNode } from "dbui/components/ui/data-tree"
import { Catalog } from "dbui/components/icons/Catalog"
import { Database } from "dbui/components/icons/Database"

// Figma: .TreeNode (3179:24295) — the row primitive the whole tree is built
// from, with Type variants (Header, Open folder, File, Focused folder).
figma.connect(Tree, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-24295", {
  example: () => (
    <Tree>
      <TreeSection>Workspace</TreeSection>
      <TreeNode id="catalog-1" label="main" icon={<Catalog />} defaultExpanded>
        <TreeNode id="catalog-1-schema-1" label="default" icon={<Database />}>
          <TreeNode id="catalog-1-schema-1-table-1" label="users" />
          <TreeNode id="catalog-1-schema-1-table-2" label="orders" />
        </TreeNode>
      </TreeNode>
      <TreeNode id="catalog-2" label="samples" icon={<Catalog />} />
    </Tree>
  ),
})
