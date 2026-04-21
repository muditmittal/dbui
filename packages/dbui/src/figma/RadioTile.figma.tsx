import figma from "@figma/code-connect"
import { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription } from "../components/ui/radio-tile"

figma.connect(RadioTileGroup, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1021-3727", {
  props: {
    disabled: figma.enum("State", {
      "Default": false,
      "Hover": false,
      "Press": false,
      "Focus": false,
      "Disabled": true,
    }),
    icon: figma.boolean("Icon", { true: <>{/* icon */}</>, false: <></> }),
    description: figma.boolean("Text", { true: <RadioTileDescription>Description</RadioTileDescription>, false: <></> }),
  },
  example: ({ disabled, icon, description }) => (
    <RadioTileGroup defaultValue="option-1">
      <RadioTile value="option-1" disabled={disabled}>
        <RadioTileHeader>
          {icon}
          <RadioTileTitle>Label</RadioTileTitle>
        </RadioTileHeader>
        {description}
      </RadioTile>
    </RadioTileGroup>
  ),
})
