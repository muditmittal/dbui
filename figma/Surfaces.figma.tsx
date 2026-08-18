import figma from "@figma/code-connect"
import { CodeBlock } from "../components/ui/code-block"
import { Terminal } from "../components/ui/terminal"
import { SchemaBrowser } from "../components/ui/schema-browser"

// The three content surfaces a workbench preview tab needs. None has a variant
// axis: what changes between uses is the content, not a mode.

// ── Code Block ───────────────────────────────────────────────────────────────
// No syntax highlighting on either side, which is why the Figma component draws
// plain monospace lines rather than coloured ones. A mock that colours code the
// build cannot is a mock that lies.
figma.connect(
  CodeBlock,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5087-7835",
  {
    example: () => (
      <CodeBlock
        label="revenue_by_region.sql"
        language="sql"
        code={`select\n  region,\n  sum(amount) as revenue\nfrom main.sales.orders\ngroup by region`}
      />
    ),
  }
)

// ── Terminal ─────────────────────────────────────────────────────────────────
// The Figma output is plain text because React strips ANSI codes — eight fixed
// colours cannot answer to a mode switch, so neither side renders them.
figma.connect(
  Terminal,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5087-7848",
  {
    example: () => (
      <Terminal
        className="h-64"
        command="pnpm build && pnpm test"
        output={`✓ Building application...\n  src/app.tsx → dist/app.js\n\nRunning tests...\n  ✓ validateForm › passes for valid input\n\nAll tests passed! (5/5)`}
      />
    ),
  }
)

// ── Schema Browser ───────────────────────────────────────────────────────────
// Built on `Tree`, so the rows in Figma are the same rows the catalog tree draws.
// Column glyphs come from `columnTypeIcons`, which is why a type is a shape here
// rather than a word — a reader scans eight shapes faster than eight words.
figma.connect(
  SchemaBrowser,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5087-7890",
  {
    example: () => (
      <SchemaBrowser
        tables={[
          {
            id: "orders",
            name: "orders",
            defaultExpanded: true,
            columns: [
              { id: "o1", name: "order_id", type: "id", dataType: "bigint", key: "primary" },
              { id: "o2", name: "customer_id", type: "id", dataType: "bigint", key: "foreign" },
              { id: "o3", name: "amount", type: "decimal", dataType: "decimal(12,2)" },
              { id: "o4", name: "region", type: "string", dataType: "varchar(64)" },
              { id: "o5", name: "order_date", type: "timestamp", dataType: "timestamp" },
            ],
          },
          { id: "customers", name: "customers", columns: [] },
        ]}
      />
    ),
  }
)
