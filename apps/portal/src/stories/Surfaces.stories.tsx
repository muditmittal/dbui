import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CodeBlock } from "dbui/components/ui/code-block"
import { Terminal } from "dbui/components/ui/terminal"
import { SchemaBrowser } from "dbui/components/ui/schema-browser"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Components/Content/Surfaces",
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

const SQL = `select
  region,
  count(*) as orders,
  sum(amount) as revenue
from main.sales.orders
where order_date >= current_date - 30
group by region
order by revenue desc`

const LOG_LINES = [
  "\u001B[32m✓\u001B[0m Building application...",
  "\u001B[36m  src/app.tsx\u001B[0m → \u001B[33mdist/app.js\u001B[0m",
  "",
  "\u001B[34mRunning tests...\u001B[0m",
  "  \u001B[32m✓\u001B[0m validateForm › returns errors for empty fields",
  "  \u001B[32m✓\u001B[0m validateForm › passes for valid input",
  "",
  "\u001B[32mAll tests passed!\u001B[0m (5/5)",
]

export const Code: StoryObj = {
  name: "CodeBlock",
  render: () => (
    <div className="max-w-[720px]">
      <Section
        title="CodeBlock"
        hint="No syntax highlighting, and that is a constraint rather than a gap — every highlighter is a dependency the Databricks environment cannot install."
      >
        <CodeBlock code={SQL} language="sql" label="revenue_by_region.sql" />
      </Section>

      <Section
        title="With line numbers"
        hint="The gutter scrolls with the code, so a number never detaches from the line it numbers. Leave it off for a short snippet."
      >
        <CodeBlock code={SQL} language="sql" lineNumbers />
      </Section>

      <Section
        title="Bare"
        hint="No language, label or copy — the header disappears entirely rather than rendering empty."
      >
        <CodeBlock code={`SELECT 1`} copyable={false} />
      </Section>
    </div>
  ),
}

export const CommandOutput: StoryObj = {
  name: "Terminal",
  render: () => {
    const [output, setOutput] = React.useState("")
    const [streaming, setStreaming] = React.useState(false)

    const run = React.useCallback(async () => {
      setOutput("")
      setStreaming(true)
      let acc = ""
      for (const line of LOG_LINES) {
        acc += `${line}\n`
        setOutput(acc)
        await new Promise((r) => setTimeout(r, 220))
      }
      setStreaming(false)
    }, [])

    React.useEffect(() => {
      run()
    }, [run])

    return (
      <div className="max-w-[720px]">
        <Section
          title="Terminal"
          hint="ANSI colour codes are stripped rather than rendered — eight fixed colours cannot answer to a mode switch. Press Run to watch it stream."
        >
          <Terminal
            className="h-64"
            command="pnpm build && pnpm test"
            output={output}
            isStreaming={streaming}
          />
          <Button
            variant="link"
            size="sm"
            className="mt-3 px-0"
            onClick={run}
          >
            Run again
          </Button>
        </Section>

        <Section title="Empty" hint="Before anything has run.">
          <Terminal className="h-32" output="" command="pnpm test" />
        </Section>
      </div>
    )
  },
}

export const Schema: StoryObj = {
  name: "SchemaBrowser",
  render: () => (
    <div className="max-w-[420px]">
      <Section
        title="SchemaBrowser"
        hint="Built on Tree, not a tree of its own — the expand, select and keyboard behaviour is already correct there, and a second tree would drift from the catalog tree a reader used ten seconds earlier."
      >
        <SchemaBrowser
          label="Tables in this query"
          onSelect={(id) => console.log(id)}
          tables={[
            {
              id: "orders",
              name: "orders",
              defaultExpanded: true,
              columns: [
                { id: "o1", name: "order_id", type: "id", dataType: "bigint", key: "primary", nullable: false },
                { id: "o2", name: "customer_id", type: "id", dataType: "bigint", key: "foreign" },
                { id: "o3", name: "amount", type: "decimal", dataType: "decimal(12,2)" },
                { id: "o4", name: "region", type: "string", dataType: "varchar(64)" },
                { id: "o5", name: "order_date", type: "timestamp", dataType: "timestamp", nullable: false },
                { id: "o6", name: "is_refunded", type: "boolean", dataType: "boolean" },
              ],
            },
            {
              id: "customers",
              name: "customers",
              columns: [
                { id: "c1", name: "customer_id", type: "id", dataType: "bigint", key: "primary", nullable: false },
                { id: "c2", name: "name", type: "string", dataType: "varchar(255)" },
                { id: "c3", name: "signup_count", type: "integer", dataType: "int" },
              ],
            },
          ]}
        />
      </Section>
    </div>
  ),
}
