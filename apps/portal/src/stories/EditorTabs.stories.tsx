import type { Meta, StoryObj } from "@storybook/react"
import { EditorTabs, EditorTab, EditorTabIcon, EditorTabAddButton } from "dbui/components/ui/editor-tabs"
import { Notebook } from "@/components/icons/Notebook"
import { Query } from "@/components/icons/Query"

const meta: Meta = {
  title: "Content/EditorTabs",
  argTypes: {
    showIcons: { control: "boolean", name: "Show Icons (.EditorTab)" },
  },
  args: {
    showIcons: true,
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[600px] bg-muted">
      <EditorTabs>
        <EditorTab active>
          {args.showIcons && <EditorTabIcon><Notebook /></EditorTabIcon>}
          analysis.py
        </EditorTab>
        <EditorTab>
          {args.showIcons && <EditorTabIcon><Query /></EditorTabIcon>}
          query.sql
        </EditorTab>
        <EditorTab>
          {args.showIcons && <EditorTabIcon><Notebook /></EditorTabIcon>}
          untitled.py
        </EditorTab>
        <EditorTabAddButton />
      </EditorTabs>
    </div>
  ),
}
