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
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  useComboboxAnchor,
} from "dbui/components/ui/combobox"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/typeahead-combobox.manifest.json"

/* ── Data ── */

const recentUsers = [
  { value: "alice", label: "Alice Chen" },
  { value: "bob", label: "Bob Martinez" },
  { value: "carol", label: "Carol Johnson" },
]

const teamMembers = [
  { value: "dave", label: "Dave Park" },
  { value: "eve", label: "Eve Williams" },
  { value: "frank", label: "Frank Liu" },
  { value: "grace", label: "Grace Kim" },
  { value: "henry", label: "Henry Zhang" },
  { value: "iris", label: "Iris Patel" },
  { value: "jack", label: "Jack Thompson" },
  { value: "kate", label: "Kate Brown" },
  { value: "leo", label: "Leo Garcia" },
]

const allTags = [
  { value: "pii", label: "PII" },
  { value: "gdpr", label: "GDPR" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "deprecated", label: "Deprecated" },
  { value: "tested", label: "Tested" },
  { value: "ml-ready", label: "ML Ready" },
  { value: "aggregated", label: "Aggregated" },
  { value: "real-time", label: "Real-time" },
  { value: "sensitive", label: "Sensitive" },
  { value: "archived", label: "Archived" },
  { value: "verified", label: "Verified" },
]

const meta: Meta = {
  title: "Controls/TypeaheadCombobox",
  parameters: { layout: "padded" },
}

export default meta

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

/* ── Empty multi-select ── */

function EmptyMultiSelect() {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple>
      <ComboboxChips ref={anchor}>
        {(chip: any) => (
          <ComboboxChip key={chip.value} value={chip.value}>
            {chip.label}
          </ComboboxChip>
        )}
        <ComboboxChipsInput placeholder="Add tags..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {allTags.map((t) => (
            <ComboboxItem key={t.value} value={t.value} label={t.label}>
              {t.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No tags found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/* ── Pre-selected chips ── */

function PreSelectedMultiSelect() {
  const [selected, setSelected] = React.useState<string[]>(["pii", "production", "tested"])
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple value={selected} onValueChange={setSelected}>
      <ComboboxChips ref={anchor}>
        {(chip: any) => (
          <ComboboxChip key={chip.value} value={chip.value}>
            {chip.label}
          </ComboboxChip>
        )}
        <ComboboxChipsInput placeholder="Add more..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {allTags.map((t) => (
            <ComboboxItem key={t.value} value={t.value} label={t.label}>
              {t.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No tags found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/* ── Grouped multi-select (users) ── */

function GroupedMultiSelect() {
  const [selected, setSelected] = React.useState<string[]>(["alice"])
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple value={selected} onValueChange={setSelected}>
      <ComboboxChips ref={anchor}>
        {(chip: any) => (
          <ComboboxChip key={chip.value} value={chip.value}>
            {chip.label}
          </ComboboxChip>
        )}
        <ComboboxChipsInput placeholder="Add people..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Recent</ComboboxLabel>
            {recentUsers.map((u) => (
              <ComboboxItem key={u.value} value={u.value} label={u.label}>
                {u.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Team Members</ComboboxLabel>
            {teamMembers.map((u) => (
              <ComboboxItem key={u.value} value={u.value} label={u.label}>
                {u.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
          <ComboboxEmpty>No people found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Typeahead Combobox</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Empty */}
        <div>
          <div style={sectionLabel}>Empty</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Type to search and select multiple values</div>
          <div className="w-[320px]">
            <EmptyMultiSelect />
          </div>
        </div>

        {/* With chips */}
        <div>
          <div style={sectionLabel}>With Selections</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Selected items appear as removable chips</div>
          <div className="w-[320px]">
            <PreSelectedMultiSelect />
          </div>
        </div>

        {/* Grouped */}
        <div>
          <div style={sectionLabel}>Grouped Options</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Groups with separators, scrollable list</div>
          <div className="w-[320px]">
            <GroupedMultiSelect />
          </div>
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
