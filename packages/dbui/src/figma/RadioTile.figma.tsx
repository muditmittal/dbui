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
    defaultSelected: figma.enum("Selected", {
      "False": false,
      "True": true,
    }),
    showIcon: figma.boolean("Icon"),
    showText: figma.boolean("Text"),
  },
  example: ({ disabled, defaultSelected, showIcon, showText }) => (
    <RadioTileGroup defaultValue={defaultSelected ? "option-1" : undefined}>
      <RadioTile value="option-1" disabled={disabled}>
        <RadioTileHeader>
          {showIcon && <>{/* icon */}</>}
          <RadioTileTitle>Label</RadioTileTitle>
        </RadioTileHeader>
        {showText && <RadioTileDescription>Description</RadioTileDescription>}
      </RadioTile>
    </RadioTileGroup>
  ),
})
