import figma from "@figma/code-connect"
import { RadioGroupItem } from "dbui/components/ui/radio-group"
import { Label } from "dbui/components/ui/label"

figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2911", {
  example: () => (
    <div className="flex items-center gap-2">
      <RadioGroupItem value="option" id="option" />
      <Label htmlFor="option">Option label</Label>
    </div>
  ),
})
