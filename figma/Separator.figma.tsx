import figma from "@figma/code-connect"
import { Separator } from "../components/ui/separator"

figma.connect(Separator, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3177-2832", {
  example: () => <Separator />,
})
