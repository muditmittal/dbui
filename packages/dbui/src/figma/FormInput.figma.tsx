import figma from "@figma/code-connect"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

// FormInput is a composition — connect to the Field Figma node
// Shows a simple Input field with label; other types (Textarea, Select, Combobox) have their own Code Connect files
figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-3399", {
  props: {
    type: figma.enum("Type", {
      "Input": "input",
      "Select": "select",
      "Combobox": "combobox",
      "Typeahead Combobox": "typeahead",
      "Textarea": "textarea",
      "Browse": "browse",
    }),
    invalid: figma.enum("Show", {
      "Default": false,
      "Active": false,
      "Error": true,
    }),
    showHint: figma.boolean("Hint"),
  },
  example: ({ type, invalid, showHint }) => (
    <div className="grid gap-2">
      <Label>Field label</Label>
      <Input placeholder="Enter value..." aria-invalid={invalid} />
      {showHint && <p className="text-[12px] text-muted-foreground">Helper text</p>}
    </div>
  ),
})
