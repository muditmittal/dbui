import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Dropzone } from "dbui/components/ui/dropzone"
import { Table } from "dbui/components/icons/Table"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/dropzone?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Compositions/Dropzone",
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
    const [dropped, setDropped] = React.useState<string[]>([])

    return (
      <div className="max-w-[828px]">
        <Section
          title="Dropzone"
          hint="Drop files on it, or use browse. The prompt carries the click path and the hint carries the real limits."
        >
          <Dropzone
            hint="Upload up to 20,000 files (max size 5GB per file)"
            onFiles={(files) => setDropped(files.map((f) => f.name))}
          />
          <p className="mt-3 type-hint text-text-subtle">
            {dropped.length
              ? `Received ${dropped.length}: ${dropped.join(", ")}`
              : "Nothing dropped yet."}
          </p>
        </Section>

        <Section
          title="Narrowed to a file type"
          hint="accept goes straight to the input, so the picker filters and the hint says so in words."
        >
          <Dropzone
            accept=".csv,.parquet"
            icon={<Table />}
            label="Drop a table export here, or"
            hint="CSV or Parquet, up to 5GB"
            onFiles={(files) => setDropped(files.map((f) => f.name))}
          />
        </Section>

        <Section
          title="Single file"
          hint="multiple={false} for a target that takes one thing."
        >
          <Dropzone
            multiple={false}
            label="Drop a schema file here, or"
            hint="One .json file"
            onFiles={(files) => setDropped(files.map((f) => f.name))}
          />
        </Section>

        <Section
          title="Disabled"
          hint="The border drops to border-base and the drop handlers stop firing — a target that looks live and ignores a drop reads as broken."
        >
          <Dropzone disabled hint="Uploads are paused for this volume" />
        </Section>

        <ComponentMeta source={componentSource} componentKey="dropzone" />
        <ProductionMap componentKey="dropzone" />
      </div>
    )
  },
}
