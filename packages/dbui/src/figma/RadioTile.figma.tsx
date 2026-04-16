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
  },
  example: ({ disabled }) => (
    <RadioTileGroup defaultValue="option-1">
      <RadioTile value="option-1" disabled={disabled}>
        <RadioTileHeader>
          <RadioTileTitle>Label</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Description</RadioTileDescription>
      </RadioTile>
    </RadioTileGroup>
  ),
})
