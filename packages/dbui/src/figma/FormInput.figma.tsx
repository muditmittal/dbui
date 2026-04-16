import figma from "@figma/code-connect"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

// FormInput is a composition — connect to the Field Figma node
// Shows a simple Input field with label; other types (Textarea, Select, Combobox) have their own Code Connect files
figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-3399", {
  props: {
    invalid: figma.enum("Show", {
      "Default": false,
      "Active": false,
      "Error": true,
    }),
  },
  example: ({ invalid }) => (
    <div className="grid gap-2">
      <Label>Field label</Label>
      <Input placeholder="Enter value..." aria-invalid={invalid} />
      <p className="text-[12px] text-muted-foreground">Helper text</p>
    </div>
  ),
})
