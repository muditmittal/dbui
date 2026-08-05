import { DocHeader, DocSection, Para, Code, RefTable, SourceNote } from "@/components/docs/Prose"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"

import { ComponentGallery } from "./ComponentGallery"

export const metadata = { title: "Components — DBUI" }

/**
 * The gallery leads, the contract follows. Everything below the grid is here
 * because someone who has already found their component still gets it wrong
 * without it — how to read the rules, and the one composition convention that
 * fails silently.
 *
 * Nothing here repeats a per-component rule. Those live in the JSDoc.
 */

const TAGS = [
  {
    tag: "@standard",
    carries: "The display name the rest of the system keys off — the index row, the Figma layer and the CLI lookup all match on it.",
  },
  {
    tag: "@guideline",
    carries: "A positive rule. What the component is for, and which variant to reach for first.",
  },
  {
    tag: "@constraint",
    carries: "A negative rule. What breaks if you use it this way.",
  },
  {
    tag: "@figma",
    carries: "The node this component is paired with. Absent when there is no counterpart.",
  },
]

export default function ComponentsPage() {
  return (
    <>
      <DocHeader title="Components">
        Every component in the library, live, grouped by what it does to the interaction rather
        than by how it looks. Open one for its variants, props and rules.
      </DocHeader>

      <ComponentGallery />

      <DocSection title="The rules live in the JSDoc">
        <SourceNote>
          <Code>packages/dbui/docs/component-index.md</Code> decides which component to pick. The
          component&rsquo;s own JSDoc decides how to use the one you picked. When they disagree the
          JSDoc wins.
        </SourceNote>
        <Para>
          Each component opens with a tagged block above its implementation. That block is the
          whole rule surface for that component, which is why no index, no page and no agent file
          repeats it.
        </Para>
        <RefTable
          columns={[
            { key: "tag", header: "Tag", width: "w-[144px]", mono: true },
            { key: "carries", header: "What it carries" },
          ]}
          rows={TAGS}
        />
        <Para>
          Read the constraints before the props. They are the record of what has already gone wrong
          with that component.
        </Para>
      </DocSection>

      <DocSection title="Compose with render, not asChild">
        <Para>
          Components are built on Base UI, which replaces an element with the one you hand it
          through <Code>render</Code>. Radix&rsquo;s <Code>asChild</Code> is not the convention
          here, and a snippet carried over from a Radix codebase is the most common way a trigger
          breaks.
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
          The wrong form fails quietly. <Code>DropdownMenuTrigger</Code> still accepts an{" "}
          <Code>asChild</Code> prop and drops it, so the markup compiles and renders one
          interactive element inside another, which breaks the keyboard and the accessible name.
          Look for a doubled control rather than for an error.
        </Para>
      </DocSection>

      <DocSection title="When nothing fits">
        <Para>
          The set is finite on purpose. Before concluding that nothing fits, search the
          index&rsquo;s synonyms — they carry the words someone reaches for when they do not know
          the Databricks name, so &ldquo;modal&rdquo; finds Dialog and &ldquo;kebab&rdquo; finds
          DropdownMenu — then read the avoid-for column of the nearest two candidates.
        </Para>
        <Para>
          If nothing does fit, that is a finding to report rather than route around. A one-off
          built locally is invisible to the linters, absent from Figma, and the next person to need
          the same thing builds a second one. <Code>CONTRIBUTING.md</Code> lists everything a new
          component has to land with.
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
