import figma from "@figma/code-connect"
import { Spinner } from "../components/ui/spinner"

figma.connect(Spinner, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1060-3970", {
  example: () => <Spinner />,
})
