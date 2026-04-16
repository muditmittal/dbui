import figma from "@figma/code-connect"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectTrigger, SelectValue } from "../components/ui/select"
import { Combobox, ComboboxInput } from "../components/ui/combobox"

// FormInput is a composition — connect to the Field Figma node
figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3157-3399", {
  props: {
    type: figma.enum("Type", {
      "Input": "input",
      "Textarea": "textarea",
      "Select": "select",
      "Combobox": "combobox",
      "Typeahead Combobox": "typeahead",
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
      {type === "input" && <Input placeholder="Enter value..." aria-invalid={invalid || undefined} />}
      {type === "textarea" && <Textarea placeholder="Enter value..." aria-invalid={invalid || undefined} />}
      {type === "select" && (
        <Select>
          <SelectTrigger aria-invalid={invalid || undefined}>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
        </Select>
      )}
      {(type === "combobox" || type === "typeahead") && (
        <Combobox>
          <ComboboxInput placeholder={type === "typeahead" ? "Type to search..." : "Search..."} aria-invalid={invalid || undefined} />
        </Combobox>
      )}
      {showHint && <p className="text-[12px] text-muted-foreground">Helper text</p>}
    </div>
  ),
})
