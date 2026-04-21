import figma from "@figma/code-connect"
import { Label } from "../components/ui/label"

figma.connect(Label, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2854", {
  example: () => <Label htmlFor="email">Email address</Label>,
})
