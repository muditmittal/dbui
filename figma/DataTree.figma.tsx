import figma from "@figma/code-connect"
import { DataTree, FileTree } from "dbui/components/ui/data-tree"
import { Catalog } from "dbui/components/icons/Catalog"
import { Database } from "dbui/components/icons/Database"
import { Table } from "dbui/components/icons/Table"

// The two L2 trees. `Tree.figma.tsx` already connects the L1 `.TreeNode` primitive;
// these are the assembled `Data Tree` and `File Tree` compositions, which had no
// Code Connect at all — so a designer selecting either got no code back even
// though both carry an `@figma` tag pointing the other way.
//
// `sections` and `nodes` are the whole API. Figma models the rows; the data is the
// caller's, so there is nothing to map from a variant.

figma.connect(
  DataTree,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3824-3098",
  {
    example: () => (
      <DataTree
        sections={[
          {
            id: "catalogs",
            label: "Catalogs",
            nodes: [
              {
                id: "main",
                label: "main",
                icon: <Catalog />,
                children: [
                  {
                    id: "default",
                    label: "default",
                    icon: <Database />,
                    children: [
                      { id: "users", label: "users", icon: <Table />, leaf: true },
                    ],
                  },
                ],
              },
            ],
          },
        ]}
        onSelect={(node) => console.log(node.id)}
      />
    ),
  }
)

figma.connect(
  FileTree,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3829-12526",
  {
    example: () => (
      <FileTree
        nodes={[
          {
            id: "src",
            label: "src",
            kind: "folder",
            children: [
              { id: "pipeline", label: "pipeline.py", kind: "code-file", leaf: true },
              { id: "notebook", label: "explore.ipynb", kind: "notebook", leaf: true },
            ],
          },
        ]}
        onSelect={(node) => console.log(node.id)}
      />
    ),
  }
)
