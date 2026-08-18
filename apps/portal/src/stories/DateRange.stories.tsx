import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { DateRange, DateRangeField } from "dbui/components/ui/date-range"
import {
  ControlsBar,
  ControlsBarActions,
  ControlsBarFilters,
} from "dbui/components/ui/controls-bar"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Components/Controls/Date Range",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      {children}
    </section>
  )
}

export const Playground: StoryObj = {
  render: () => {
    const [start, setStart] = React.useState<string | undefined>("04/24/2026, 12:00 PM")
    const [end, setEnd] = React.useState<string | undefined>("04/26/2026, 12:00 PM")

    return (
      <div className="max-w-[720px]">
        <Section
          title="Start and end"
          hint="Two fields in one container. The container is layout only — 8px gap, centred — so a picker attaches per field rather than to the pair."
        >
          <DateRange>
            <DateRangeField
              placeholder="Start: MM/DD/YYYY"
              value={start}
              onClear={() => setStart(undefined)}
            />
            <DateRangeField
              placeholder="End: MM/DD/YYYY"
              value={end}
              onClear={() => setEnd(undefined)}
            />
          </DateRange>
        </Section>

        <Section
          title="Empty"
          hint="With no value the field shows its placeholder and no clear control, because there is nothing to clear."
        >
          <DateRange>
            <DateRangeField placeholder="Start: MM/DD/YYYY" />
            <DateRangeField placeholder="End: MM/DD/YYYY" />
          </DateRange>
        </Section>

        <Section
          title="Small"
          hint="24px, matching the small Input and Combobox. Use it inside a controls bar, where every control shares a height."
        >
          <DateRange>
            <DateRangeField size="sm" placeholder="Start" value="04/24/2026" onClear={() => {}} />
            <DateRangeField size="sm" placeholder="End" value="04/26/2026" onClear={() => {}} />
          </DateRange>
        </Section>

        <Section title="Disabled" hint="No clear control, and no pointer events.">
          <DateRange>
            <DateRangeField placeholder="Start: MM/DD/YYYY" value="04/24/2026" disabled />
            <DateRangeField placeholder="End: MM/DD/YYYY" value="04/26/2026" disabled />
          </DateRange>
        </Section>

        <Section
          title="In a controls bar"
          hint="Where this actually lives. The pair hugs its content, so the bar decides the width — that is why the component sets no width of its own."
        >
          <ControlsBar>
            <ControlsBarFilters>
              <DateRange>
                <DateRangeField
                  size="sm"
                  placeholder="Start"
                  value="04/24/2026"
                  onClear={() => {}}
                />
                <DateRangeField size="sm" placeholder="End" value="04/26/2026" onClear={() => {}} />
              </DateRange>
            </ControlsBarFilters>
            <ControlsBarActions>
              <Button variant="outline">Apply</Button>
            </ControlsBarActions>
          </ControlsBar>
        </Section>
      </div>
    )
  },
}
