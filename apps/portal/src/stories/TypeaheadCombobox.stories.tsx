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
  title: "Controls/TypeaheadCombobox",
}

export default meta

const tags = [
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "scala", label: "Scala" },
  { value: "r", label: "R" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
]

function TypeaheadExample({ preSelected = false }: { preSelected?: boolean }) {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple defaultValue={preSelected ? ["python", "sql"] : undefined}>
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

export const Default: StoryObj = {
  name: "Empty (type to add)",
  render: () => <TypeaheadExample />,
}

export const WithChips: StoryObj = {
  name: "With Pre-selected Chips",
  render: () => <TypeaheadExample preSelected />,
}
