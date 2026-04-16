import figma from "@figma/code-connect"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"

figma.connect(Select, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=787-804", {
  example: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
})
