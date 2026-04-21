import figma from "@figma/code-connect"
import { EditorTabs, EditorTab, EditorTabAddButton } from "../components/ui/editor-tabs"

figma.connect(EditorTabs, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-5135", {
  example: () => (
    <EditorTabs>
      <EditorTab active closable>
        {/* NotebookIcon */}
        Untitled Notebook
      </EditorTab>
      <EditorTab closable>
        {/* FileCodeIcon */}
        Query.sql
      </EditorTab>
      <EditorTabAddButton />
    </EditorTabs>
  ),
})
