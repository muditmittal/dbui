import figma from "@figma/code-connect"

// Figma: Platform Header
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3225-4233

const PlatformHeader = ({}: any) => null

figma.connect(PlatformHeader, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3225-4233", {
  example: () => (
    <PlatformHeader
      cloudLabel="Microsoft Azure"
      warehouseLabel="unity-catalog-us-east-1"
      avatarInitial="M"
    />
  ),
  imports: ["import { PlatformHeader } from 'dbui-shells'"],
})
