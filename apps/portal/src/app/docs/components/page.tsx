import Link from "next/link"

import {
  DocHeader,
  DocSection,
  Para,
  Code,
  RefTable,
  SourceNote,
} from "@/components/docs/Prose"
import { CodeBlock, Cmd } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"

export const metadata = { title: "Components — DBUI" }

/**
 * Not a gallery. The gallery is Storybook at `/components`, and a second one
 * here would be a second thing to keep in step with the source.
 *
 * Nothing on this page repeats a per-component rule. Those live in one place —
 * the component's JSDoc — and the point of the page is to send a reader there
 * before they write UI, not to summarize what they will find.
 */

/**
 * Names only. What each category means and what sits inside it belongs to
 * `component-index.md`, which is one click away and cannot go stale relative to
 * itself. Listed in the index's own order, because it runs from the most
 * interactive to the most structural.
 */
const CATEGORIES = [
  "action",
  "input",
  "selection",
  "menu",
  "overlay",
  "feedback",
  "display",
  "navigation",
  "layout",
  "chrome",
]

const TAGS = [
  {
    tag: "@standard",
    carries:
      "The display name the rest of the system keys off — the index row, the Figma layer and the CLI lookup all match on it.",
  },
  {
    tag: "@guideline",
    carries: "A positive rule. What the component is for, and which variant to reach for first.",
  },
  {
    tag: "@constraint",
    carries: "A negative rule. What breaks if you use it this way. Read these before the props.",
  },
  {
    tag: "@figma",
    carries: "A link to the node this component is paired with. Absent when there is no counterpart.",
  },
]

export default function ComponentsPage() {
  return (
    <>
      <DocHeader title="Components">
        What ships, where each component&rsquo;s rules live, and how to read them before writing UI.
        The visual gallery is in Storybook. This page is the contract around it.
      </DocHeader>

      <div className="mt-8 flex flex-col gap-4">
        <SourceNote>
          <Code>packages/dbui/docs/component-index.md</Code> decides which component to pick. The
          component&rsquo;s own JSDoc decides how to use the one you picked. No other file states
          either, and when the index and the JSDoc disagree the JSDoc wins.
        </SourceNote>
        <Para>
          Every component is rendered live, in every variant, in the{" "}
          <Link href="/components" className="text-text-accent">
            component gallery
          </Link>
          . Go there to see one. Come here to learn what you are allowed to do with it.
        </Para>
      </div>

      <DocSection title="The categories describe jobs, not shapes">
        <Para>
          A component sits in a category by what it does to the interaction rather than by how it
          looks, which is why a tab strip and a segmented control are in different places despite
          being the same row of buttons. The categories, in the order the index lists them:
        </Para>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {CATEGORIES.map((category) => (
            <Code key={category}>{category}</Code>
          ))}
        </div>
        <Para>
          The index gives each one a purpose, and each component a row with what to use it for, what
          to avoid it for, its synonyms and its Figma layer name. Search the synonyms — they carry the
          words someone reaches for when they do not know what the component is called here, so
          &ldquo;modal&rdquo; finds Dialog and &ldquo;kebab&rdquo; finds DropdownMenu.
        </Para>
      </DocSection>

      <DocSection title="The rules live in the JSDoc">
        <Para>
          Each component opens with a tagged block above its implementation. That block is the whole
          rule surface for that component, and it is the reason no index, no page and no agent file
          repeats it. A rule written twice is a rule that will contradict itself.
        </Para>
        <RefTable
          columns={[
            { key: "tag", header: "Tag", width: "w-[144px]", mono: true },
            { key: "carries", header: "What it carries" },
          ]}
          rows={TAGS}
        />
        <Para>
          Read the constraints first. They are the accumulated record of what has gone wrong with
          that component before, so they cost less to read than to rediscover.
        </Para>
      </DocSection>

      <DocSection title="Reading a component before you use it">
        <Para>
          The path is the same every time. Search for the concept, confirm the fit from the index
          row, then read the component in full. The CLI prints the JSDoc, the variant axes, the
          exports and the import path together, so this is faster than opening the file.
        </Para>
        <Cmd
          lines={[
            ["yarn dbui search dialog", "components, icons, shells and docs at once"],
            ["yarn dbui component dialog", "guidelines, constraints, variants, imports"],
            ["yarn dbui component dialog --json", "the same as a typed envelope"],
          ]}
        />
        <Para>
          An agent gets the same data over MCP rather than by reading a page. The server is wired in{" "}
          <Code>.cursor/mcp.json</Code> and the{" "}
          <Link href="/docs/mcp" className="text-text-accent">
            MCP page
          </Link>{" "}
          covers its tools. The{" "}
          <Link href="/docs/cli" className="text-text-accent">
            CLI page
          </Link>{" "}
          covers every command and flag.
        </Para>
      </DocSection>

      <DocSection title="Compose with render, not asChild">
        <Para>
          Components are built on Base UI, which replaces an element with the one you hand it through{" "}
          <Code>render</Code>. Radix&rsquo;s <Code>asChild</Code> is not the convention here, and a
          snippet carried over from a Radix codebase is the most common way a trigger breaks.
        </Para>
        <CodeBlock caption="Correct — the trigger becomes the button">
          {`<DialogTrigger render={<Button variant="primary" />}>
  Create catalog
</DialogTrigger>`}
        </CodeBlock>
        <CodeBlock caption="Wrong — a button nested inside the trigger's own button">
          {`<DialogTrigger asChild>
  <Button variant="primary">Create catalog</Button>
</DialogTrigger>`}
        </CodeBlock>
        <Para>
          This fails quietly rather than loudly. <Code>DropdownMenuTrigger</Code> still accepts an{" "}
          <Code>asChild</Code> prop and drops it, so the second form compiles and renders — it just
          nests one interactive element inside another, which breaks the keyboard and the accessible
          name. Look for a doubled control rather than for an error.
        </Para>
      </DocSection>

      <DocSection title="One component, one Figma component">
        <Para>
          Most components are paired with a single Figma component, and the pairing is recorded in two
          directions — the <Code>@figma</Code> tag points at the node, and the index&rsquo;s Figma
          column names the layer, so a layer name can be translated to an import and back. A Code
          Connect file in <Code>figma/</Code> makes the mapping machine-readable.
        </Para>
        <Para>
          Some components have no Figma counterpart. The index marks those{" "}
          <Code>code-only</Code>, and they have no <Code>@figma</Code> tag. That is not a gap to fill
          on sight — several are utilities that would be meaningless as a frame. For how far the
          Figma library currently tracks the code, read <Code>TRACKER.md</Code>. No page here
          describes status.
        </Para>
      </DocSection>

      <DocSection title="When nothing fits">
        <Para>
          The set is finite on purpose, so the honest answer to a missing component is sometimes to
          build the screen differently. Before concluding that nothing fits, search the
          synonyms and read the &ldquo;avoid for&rdquo; column of the nearest two candidates — it
          usually names the component you actually want.
        </Para>
        <Para>
          If nothing does fit, that is a finding worth reporting rather than routing around. A
          one-off built locally is invisible to the linters, absent from Figma, and the next person
          to need the same thing builds a second one.{" "}
          <Code>CONTRIBUTING.md</Code> lists everything a new component has to land with.
        </Para>
        <Guidance
          dos={[
            "Extend an existing component through its props and variants before reaching for a new one",
            "Flag the gap with the case that exposed it, so the shape of the fix is arguable",
            "Compose from several components when no single one covers the case",
          ]}
          donts={[
            "Build a local copy of something the system nearly has",
            "Reach past a component into the primitive it wraps",
            "Add a variant to a component to serve one screen",
          ]}
        />
      </DocSection>
    </>
  )
}
