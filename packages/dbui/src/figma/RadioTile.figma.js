// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1021-3727
// source=packages/dbui/src/components/ui/radio-tile.tsx
// component=RadioTile
const figma = require('figma')
const instance = figma.selectedInstance

// ─── Selected ───
const selected = instance.getEnum('Selected', {
  'False': false,
  'True': true,
})

// ─── State ───
// States are CSS-driven. Only Disabled maps to a code prop.
const state = instance.getEnum('State', {
  'Default': undefined,
  'Hover': undefined,
  'Press': undefined,
  'Focus': undefined,
  'Disabled': 'disabled',
})

// ─── Content ───
const title = instance.findText('Label')
const titleText = title ? title.textContent : 'Label'
const desc = instance.findText('Optional support text that is expected to fit in max 2 lines')
const descText = desc ? desc.textContent : 'Description'

// ─── Build output ───
const defaultValue = selected ? ' defaultValue="option-1"' : ''
const disabledProp = state === 'disabled' ? ' disabled' : ''

export default {
  example: figma.tsx`<RadioTileGroup${defaultValue}>
  <RadioTile value="option-1"${disabledProp}>
    <RadioTileHeader>
      <RadioTileTitle>${titleText}</RadioTileTitle>
    </RadioTileHeader>
    <RadioTileDescription>${descText}</RadioTileDescription>
  </RadioTile>
</RadioTileGroup>`,
  imports: ['import { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription } from "@/components/ui/radio-tile"'],
  id: 'radio-tile',
  metadata: {
    nestable: true,
  }
}
