import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  useComboboxAnchor,
} from "dbui/components/ui/combobox"

const meta: Meta = {
  title: "Inputs/TypeaheadCombobox",
}

export default meta
type Story = StoryObj

const tags = [
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "scala", label: "Scala" },
  { value: "r", label: "R" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
]

function TypeaheadExample() {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple>
      <ComboboxChips ref={anchor}>
        {(chip) => <ComboboxChip key={chip.value}>{chip.label}</ComboboxChip>}
        <ComboboxChipsInput placeholder="Add languages..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {tags.map((tag) => (
            <ComboboxItem key={tag.value} value={tag.value} label={tag.label}>
              {tag.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const Default: Story = {
  render: () => <TypeaheadExample />,
}
