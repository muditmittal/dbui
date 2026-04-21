import figma from "@figma/code-connect"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton } from "../components/ui/navbar"

// Figma: PlatformNav (renamed from WorkspaceNav/Navbar)
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-14163
figma.connect(Navbar, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-14163", {
  example: () => (
    <Navbar>
      <NavbarNewButton>
        {/* <Plus /> */}
        New
      </NavbarNewButton>
      <NavbarSection>
        <NavbarItem><NavbarItemIcon>{/* <Clock /> */}</NavbarItemIcon>Recents</NavbarItem>
        <NavbarItem><NavbarItemIcon>{/* <Folder /> */}</NavbarItemIcon>Workspace</NavbarItem>
        <NavbarItem active><NavbarItemIcon>{/* <Data /> */}</NavbarItemIcon>Catalog</NavbarItem>
        <NavbarItem><NavbarItemIcon>{/* <Workflows /> */}</NavbarItemIcon>Workflows</NavbarItem>
        <NavbarItem><NavbarItemIcon>{/* <Cloud /> */}</NavbarItemIcon>Compute</NavbarItem>
        <NavbarItem><NavbarItemIcon>{/* <Storefront /> */}</NavbarItemIcon>Marketplace</NavbarItem>
      </NavbarSection>
      <NavbarSection>
        <NavbarSectionHeader>SQL</NavbarSectionHeader>
        <NavbarItem><NavbarItemIcon>{/* <QueryEditor /> */}</NavbarItemIcon>Editor</NavbarItem>
        <NavbarItem><NavbarItemIcon>{/* <Dashboard /> */}</NavbarItemIcon>Dashboards</NavbarItem>
      </NavbarSection>
    </Navbar>
  ),
})
