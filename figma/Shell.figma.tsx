import figma from "@figma/code-connect"

// Figma: Base Shell
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3567-1638

const Base = ({children}: {children?: any}) => null

figma.connect(Base, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3567-1638", {
  example: () => (
    <Base defaultActive="catalog">
      {/* Content goes here — every product page starts with Base. */}
    </Base>
  ),
  imports: ["import { Base } from 'dbui-shells'"],
})
