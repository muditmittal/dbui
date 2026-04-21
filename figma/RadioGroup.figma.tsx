import figma from "@figma/code-connect"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

figma.connect(RadioGroup, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-2958", {
  example: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
})
