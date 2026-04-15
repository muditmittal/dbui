import type { Meta, StoryObj } from "@storybook/react"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton } from "dbui/components/ui/navbar"
import { Notebook } from "@/components/icons/Notebook"
import { Home } from "@/components/icons/Home"
import { Gear } from "@/components/icons/Gear"
import { Plus } from "@/components/icons/Plus"
import { useState } from "react"

const meta: Meta = {
  title: "Content/Navbar",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "### Constraints",
          "- **NavbarItem MUST include an icon** (via NavbarItemIcon). Label-only items look broken in the sidebar.",
        ].join("\n"),
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => {
    const [expanded, setExpanded] = useState(true)
    return (
      <div className="bg-muted p-4 rounded-lg">
        <Navbar>
          <NavbarNewButton><Plus /> New</NavbarNewButton>
          <NavbarSection>
            <NavbarSectionHeader expanded={expanded} onToggle={() => setExpanded(!expanded)}>
              Workspace
            </NavbarSectionHeader>
            {expanded && (
              <>
                <NavbarItem active>
                  <NavbarItemIcon><Home /></NavbarItemIcon>
                  Home
                </NavbarItem>
                <NavbarItem>
                  <NavbarItemIcon><Notebook /></NavbarItemIcon>
                  Notebooks
                </NavbarItem>
                <NavbarItem>
                  <NavbarItemIcon><Gear /></NavbarItemIcon>
                  Settings
                </NavbarItem>
              </>
            )}
          </NavbarSection>
        </Navbar>
      </div>
    )
  },
}

export const CollapsedSection: StoryObj = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div className="bg-muted p-4 rounded-lg">
        <Navbar>
          <NavbarSection>
            <NavbarSectionHeader expanded={expanded} onToggle={() => setExpanded(!expanded)}>
              SQL
            </NavbarSectionHeader>
            {expanded && (
              <>
                <NavbarItem><NavbarItemIcon><Notebook /></NavbarItemIcon>Editor</NavbarItem>
                <NavbarItem><NavbarItemIcon><Notebook /></NavbarItemIcon>Queries</NavbarItem>
              </>
            )}
          </NavbarSection>
        </Navbar>
      </div>
    )
  },
}
