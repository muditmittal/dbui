// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-5135
// source=packages/dbui/src/components/ui/editor-tabs.tsx
// component=Editor Tabs
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<EditorTabs>
  <EditorTab active closable>
    <NotebookIcon />
    Untitled Notebook
  </EditorTab>
  <EditorTab closable>
    <FileCodeIcon />
    Query.sql
  </EditorTab>
  <EditorTabAddButton />
</EditorTabs>`,
  imports: ['import { EditorTabs, EditorTab, EditorTabAddButton } from "@/components/ui/editor-tabs"'],
  id: 'editor-tabs',
  metadata: { nestable: false }
}
