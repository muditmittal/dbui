import figma from "@figma/code-connect"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Label } from "dbui/components/ui/label"

figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2875", {
  example: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
})
