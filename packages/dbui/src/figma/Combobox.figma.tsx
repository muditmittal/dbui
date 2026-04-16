import figma from "@figma/code-connect"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "../components/ui/combobox"

// Combobox — 2 sizes × 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=811-976
figma.connect(Combobox, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=811-976", {
  props: {
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
      Danger: false,
    }),
    showClear: figma.boolean("Show Clear"),
  },
  example: ({ disabled, showClear }) => (
    <Combobox>
      <ComboboxInput placeholder="Search..." showClear={showClear} disabled={disabled} />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="option-1">Option 1</ComboboxItem>
          <ComboboxItem value="option-2">Option 2</ComboboxItem>
          <ComboboxItem value="option-3">Option 3</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
})
