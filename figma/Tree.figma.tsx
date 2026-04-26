import figma from "@figma/code-connect"
import { Tree, Section, TreeNode } from "../components/ui/data-tree"
import { Catalog } from "../components/icons/Catalog"
import { Database } from "../components/icons/Database"

// Figma: Tree (3211:5106) — composed of .TreeNode instances with type variants
// (Header, Open folder, Focused folder)
figma.connect(Tree, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3211-5106", {
  example: () => (
    <Tree>
      <Section>Workspace</Section>
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
