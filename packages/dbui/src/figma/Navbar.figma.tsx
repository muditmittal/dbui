import figma from "@figma/code-connect"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarNewButton } from "../components/ui/navbar"

figma.connect(Navbar, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-14163", {
  example: () => (
    <Navbar>
      <NavbarNewButton>
        {/* PlusIcon */}
        New
      </NavbarNewButton>
      <NavbarSection>
        <NavbarItem>{/* ClockIcon */}Recents</NavbarItem>
        <NavbarItem>{/* FolderIcon */}Workspace</NavbarItem>
        <NavbarItem>{/* DataIcon */}Catalog</NavbarItem>
      </NavbarSection>
      <NavbarSection>
        <NavbarSectionHeader>SQL {/* ChevronDownIcon */}</NavbarSectionHeader>
        <NavbarItem>{/* QueryEditorIcon */}Editor</NavbarItem>
        <NavbarItem>{/* DashboardIcon */}Dashboards</NavbarItem>
      </NavbarSection>
    </Navbar>
  ),
})
