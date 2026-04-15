import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "dbui/components/ui/combobox"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/combobox.manifest.json"

/* ── Data ── */

const databases = [
  { value: "main", label: "main" },
  { value: "analytics", label: "analytics" },
  { value: "staging", label: "staging" },
  { value: "production", label: "production" },
  { value: "sandbox", label: "sandbox" },
]

const schemas = [
  { value: "default", label: "default" },
  { value: "public", label: "public" },
  { value: "raw", label: "raw" },
  { value: "curated", label: "curated" },
  { value: "archive", label: "archive" },
]

const tables = [
  { value: "users", label: "users" },
  { value: "orders", label: "orders" },
  { value: "products", label: "products" },
  { value: "events", label: "events" },
  { value: "sessions", label: "sessions" },
  { value: "transactions", label: "transactions" },
  { value: "logs", label: "logs" },
  { value: "metrics", label: "metrics" },
  { value: "experiments", label: "experiments" },
  { value: "models", label: "models" },
  { value: "features", label: "features" },
  { value: "predictions", label: "predictions" },
]

const tags = [
  { value: "pii", label: "PII" },
  { value: "gdpr", label: "GDPR" },
  { value: "production", label: "Production" },
  { value: "deprecated", label: "Deprecated" },
  { value: "tested", label: "Tested" },
  { value: "ml-ready", label: "ML Ready" },
  { value: "aggregated", label: "Aggregated" },
  { value: "real-time", label: "Real-time" },
]

const meta: Meta = {
  title: "Controls/Combobox",
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

/* ── Single Select with clear ── */

function SingleSelect() {
  return (
    <div className="w-[280px]">
      <Combobox>
        <ComboboxInput placeholder="Search..." showClear />
        <ComboboxContent>
          <ComboboxList>
            {tables.map((t) => (
              <ComboboxItem key={t.value} value={t.value}>{t.label}</ComboboxItem>
            ))}
            <ComboboxEmpty>No results found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/* ── Single Select with grouped options ── */

function SingleSelectGrouped() {
  return (
    <div className="w-[280px]">
      <Combobox>
        <ComboboxInput placeholder="Search tables..." showClear />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Databases</ComboboxLabel>
              {databases.map((d) => (
                <ComboboxItem key={d.value} value={d.value}>{d.label}</ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Schemas</ComboboxLabel>
              {schemas.map((s) => (
                <ComboboxItem key={s.value} value={s.value}>{s.label}</ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Tables</ComboboxLabel>
              {tables.map((t) => (
                <ComboboxItem key={t.value} value={t.value}>{t.label}</ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxEmpty>No results found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/* ── Multi Select with comma display ── */

function MultiSelectComma() {
  const [selected, setSelected] = React.useState<string[]>(["pii", "production"])

  const selectedLabels = selected.map(v => tags.find(t => t.value === v)?.label).filter(Boolean).join(", ")

  return (
    <div className="w-[320px]">
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxInput
          placeholder="Select tags..."
          value={selectedLabels}
          readOnly
          showClear={selected.length > 0}
        />
        <ComboboxContent>
          <ComboboxList>
            {tags.map((t) => (
              <ComboboxItem key={t.value} value={t.value} label={t.label}>
                {t.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No tags found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/* ── Multi Select with chips ── */

function MultiSelectChips() {
  const [selected, setSelected] = React.useState<string[]>(["pii", "production"])
  const anchor = useComboboxAnchor()

  return (
    <div className="w-[320px]">
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxChips ref={anchor}>
          {(chip: { value: string; label: string }) => (
            <ComboboxChip key={chip.value} value={chip.value}>
              {chip.label}
            </ComboboxChip>
          )}
          <ComboboxChipsInput placeholder="Add tags..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            {tags.map((t) => (
              <ComboboxItem key={t.value} value={t.value} label={t.label}>
                {t.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No tags found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Combobox</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Single Select */}
        <div>
          <div style={sectionLabel}>Single Select</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Search + select one option, with clear action</div>
          <SingleSelect />
        </div>

        {/* Grouped Options */}
        <div>
          <div style={sectionLabel}>Grouped Options</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Groups with separators, scrollable list</div>
          <SingleSelectGrouped />
        </div>

        {/* Multi Select — comma display */}
        <div>
          <div style={sectionLabel}>Multi Select</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Trigger shows comma-separated values, clear to reset</div>
          <MultiSelectComma />
        </div>

        {/* Multi Select — chips */}
        <div>
          <div style={sectionLabel}>Multi Select (Chips)</div>
          <div style={{ fontSize: 12, color: "#6F6F6F", marginBottom: 8 }}>Selected items as removable chips — for tagging workflows</div>
          <MultiSelectChips />
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
