import type { Meta, StoryObj } from "@storybook/react"
import { EditorTabs, EditorTab, EditorTabIcon, EditorTabAddButton } from "dbui/components/ui/editor-tabs"
import { Notebook } from "@/components/icons/Notebook"
import { Query } from "@/components/icons/Query"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/editor-tabs.manifest.json"

const meta: Meta = {
  title: "Content/EditorTabs",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>EditorTabs</h2>

      <div className="w-[600px] bg-muted rounded-t-md">
        <EditorTabs>
          <EditorTab active>
            <EditorTabIcon><Notebook /></EditorTabIcon>
            analysis.py
          </EditorTab>
          <EditorTab>
            <EditorTabIcon><Query /></EditorTabIcon>
            query.sql
          </EditorTab>
          <EditorTab>
            <EditorTabIcon><Notebook /></EditorTabIcon>
            untitled.py
          </EditorTab>
          <EditorTabAddButton />
        </EditorTabs>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
