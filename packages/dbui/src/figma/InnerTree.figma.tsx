import figma from "@figma/code-connect"
import { DataTreeView } from "../components/ui/data-tree"

// Tree — inner building block for tree views
// This is the structural tree component used inside DataTreeView and FileTreeView
figma.connect(DataTreeView, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3211-5106", {
  example: () => (
    <DataTreeView
      sections={[{
        label: "Section",
        nodes: [
          { id: "1", label: "Item 1", children: [
            { id: "1-1", label: "Child 1" },
          ]},
        ],
      }]}
    />
  ),
})
