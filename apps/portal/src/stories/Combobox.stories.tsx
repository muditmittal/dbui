import type { Meta, StoryObj } from "@storybook/react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "dbui/components/ui/combobox"

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "next", label: "Next.js" },
]

const meta: Meta = {
  title: "Controls/Combobox",
  argTypes: {
    size: { control: "radio", options: ["default", "sm"], name: "Size" },
    showClear: { control: "boolean", name: "Show Clear (XCircleFill)" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "default",
    showClear: false,
    disabled: false,
    placeholder: "Search...",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <div className="w-[240px]">
      <Combobox>
        <ComboboxInput
          placeholder={args.placeholder}
          inputSize={args.size}
          showClear={args.showClear}
          disabled={args.disabled}
        />
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
    </div>
  ),
}

export const AllStates: StoryObj = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-3 w-[240px]">
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Default</p>
        <Combobox>
          <ComboboxInput placeholder="Search..." />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>{fw.label}</ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">With Clear</p>
        <Combobox>
          <ComboboxInput placeholder="Search..." showClear />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>{fw.label}</ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Small</p>
        <Combobox>
          <ComboboxInput placeholder="Search..." inputSize="sm" />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>{fw.label}</ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-muted-foreground">Disabled</p>
        <Combobox>
          <ComboboxInput placeholder="Search..." disabled />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>{fw.label}</ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <p className="text-[11px] text-muted-foreground mt-2">
        Combobox focus: border-ring only (no outer shadow ring).<br />
        Chevron is a plain icon — no hover state.
      </p>
    </div>
  ),
}
