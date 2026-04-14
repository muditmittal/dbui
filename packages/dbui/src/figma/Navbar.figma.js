// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3179-14163
// source=apps/portal/src/components/ui/navbar.tsx
// component=Navbar
const figma = require('figma')
const instance = figma.selectedInstance

export default {
  example: figma.tsx`<Navbar>
  <NavbarNewButton>
    <PlusIcon />
    New
  </NavbarNewButton>
  <NavbarSection>
    <NavbarItem><ClockIcon />Recents</NavbarItem>
    <NavbarItem><FolderIcon />Workspace</NavbarItem>
    <NavbarItem><DataIcon />Catalog</NavbarItem>
  </NavbarSection>
  <NavbarSection>
    <NavbarSectionHeader>SQL <ChevronDownIcon /></NavbarSectionHeader>
    <NavbarItem><QueryEditorIcon />Editor</NavbarItem>
    <NavbarItem><DashboardIcon />Dashboards</NavbarItem>
  </NavbarSection>
</Navbar>`,
  imports: ['import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarNewButton } from "@/components/ui/navbar"'],
  id: 'navbar',
  metadata: { nestable: false }
}
