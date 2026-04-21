import figma from "@figma/code-connect"
import { Combobox, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxContent, ComboboxList, ComboboxItem } from "../components/ui/combobox"

// TypeaheadCombobox — multi-select with chips, 6 states
// Figma node: https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=842-889
figma.connect(Combobox, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=842-889", {
  props: {
    showClear: figma.boolean("Show Clear"),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: true,
      Danger: false,
    }),
    ariaInvalid: figma.enum("State", {
      Default: false,
      Hover: false,
      Press: false,
      Focus: false,
      Disabled: false,
      Danger: true,
    }),
  },
  example: ({ disabled, ariaInvalid }) => (
    <Combobox multiple>
      <ComboboxChips>
        <ComboboxChip>Option 1</ComboboxChip>
        <ComboboxChip>Option 2</ComboboxChip>
        <ComboboxChipsInput
          placeholder="Search..."
          disabled={disabled}
          aria-invalid={ariaInvalid}
        />
      </ComboboxChips>
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
