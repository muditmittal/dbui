import figma from "@figma/code-connect"
import { Switch } from "dbui/components/ui/switch"
import { Label } from "dbui/components/ui/label"

figma.connect("https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3165-2582", {
  props: {
    label: figma.enum("Label", {
      "Left": "left",
      "Right": "right",
    }),
  },
  example: ({ label }) => (
    <div className={`flex items-center gap-2${label === "left" ? " flex-row-reverse" : ""}`}>
      <Switch id="setting" />
      <Label htmlFor="setting">Label</Label>
    </div>
  ),
})
