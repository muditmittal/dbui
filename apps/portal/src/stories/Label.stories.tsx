import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Label } from "dbui/components/ui/label"
import { Input } from "dbui/components/ui/input"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel } from "dbui/components/ui/field"

const meta: Meta = {
  title: "Components/Controls/Label",
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
  render: () => (
    <div className="max-w-[480px]">
      <Section
        title="Naming a field"
        hint="Always through htmlFor. A label that only sits above its input names nothing, so clicking it does not focus the field and a screen reader reads them as unrelated."
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="catalog">Catalog name</Label>
          <Input id="catalog" placeholder="main" />
        </div>
      </Section>

      <Section
        title="Required"
        hint="A red asterisk, never the word. The word repeats on every required field in a form and stops being read after the second one."
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="owner">
            Owner
            <span aria-hidden className="text-status-text-error">
              *
            </span>
            <span className="sr-only">(required)</span>
          </Label>
          <Input id="owner" placeholder="data-platform@acme.com" required />
        </div>
      </Section>

      <Section
        title="With hint text"
        hint="Preferred over a tooltip: a hint a reader has to hover for is a hint they will not find. Note the hint is a span, not a second Label."
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="retention">Retention</Label>
          <span className="type-hint text-text-subtle">
            How long deleted rows stay recoverable. Maximum 90 days.
          </span>
          <Input id="retention" placeholder="30" />
        </div>
      </Section>

      <Section
        title="On a checkbox"
        hint="Horizontal, and the label is the target — a 13px box is a small thing to hit, so the words have to work too."
      >
        <div className="flex items-center gap-2">
          <Checkbox id="certified" />
          <Label htmlFor="certified">Only show certified assets</Label>
        </div>
      </Section>

      <Section
        title="Reach for Field first"
        hint="Field wires the label, description and error together for you. Use Label on its own only when you are assembling that pairing yourself."
      >
        <Field>
          <FieldLabel htmlFor="schema">Schema</FieldLabel>
          <Input id="schema" placeholder="public" />
          <FieldDescription>Within the selected catalog.</FieldDescription>
        </Field>
      </Section>
    </div>
  ),
}
