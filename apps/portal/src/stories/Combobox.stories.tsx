import type { Meta, StoryObj } from "@storybook/react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "dbui/components/ui/combobox"

const meta: Meta = {
  title: "Inputs/Combobox",
}

export default meta
type Story = StoryObj

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "next", label: "Next.js" },
]

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Select framework..." />
      <ComboboxContent>
        <ComboboxList>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithClear: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Select framework..." showClear />
      <ComboboxContent>
        <ComboboxList>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const SmallSize: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Select..." inputSize="sm" />
      <ComboboxContent>
        <ComboboxList>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
