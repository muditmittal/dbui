import { DocHeader, DocSection, Para, Code, RefTable, SourceNote } from "@/components/docs/Prose"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"
import { SectionTabs } from "@/components/docs/StickyBar"
import { galleryGroups } from "@/stories/components/gallery-data"

import { ComponentGallery, groupId } from "./ComponentGallery"

export const metadata = { title: "Components — DBUI" }

/**
 * The gallery leads and the contract follows. Everything below the grid is here
 * because someone who has already found their component still gets it wrong
 * without it: how to read the rules, and the one composition convention that
 * fails silently.
 *
 * Nothing here repeats a per-component rule. Those live in the JSDoc, and this
 * page's job is to say that and to say how to read it.
 */

/**
 * The tabs are the gallery's own categories plus the three sections under it, so
 * a new category appears in the strip without anyone adding it. Every id comes
 * from `groupId`, which the gallery also uses, so a tab cannot point at a
 * heading that is not there.
 */
const SECTIONS = [
  ...galleryGroups.map((group) => ({ id: groupId(group.key), label: group.label })),
  { id: "jsdoc", label: "Rules" },
  { id: "render", label: "render" },
  { id: "gaps", label: "Gaps" },
]

/** The whole rule surface for a component, and what each tag is answerable for. */
const TAGS = [
  {
    tag: "@standard",
    carries: "The display name the index row, the Figma layer and the CLI all match on",
  },
  { tag: "@guideline", carries: "A positive rule — what it is for, which variant to reach for" },
  { tag: "@constraint", carries: "A negative rule — what breaks if you use it this way" },
  { tag: "@figma", carries: "The node it is paired with. Absent when there is no counterpart" },
]

export default function ComponentsPage() {
  return (
    <>
      <DocHeader title="Components">
        Every component in the library, live, grouped by what it does to the interaction rather than
        by how it looks.
      </DocHeader>

      <SectionTabs sections={SECTIONS} label="Component categories" />

      <ComponentGallery />

      <DocSection id="jsdoc" title="The rules live in the JSDoc">
        <RefTable
          columns={[
            { key: "tag", header: "Tag", width: "w-[128px]", mono: true },
            { key: "carries", header: "What it carries" },
          ]}
          rows={TAGS}
        />
        <Para>
          Read the constraints before the props. They are the record of what has already gone wrong
          with that component.
        </Para>
      </DocSection>

      <DocSection id="render" title="Compose with render, not asChild">
        <Para>
          Components are built on Base UI, which replaces an element with the one you hand it through{" "}
          <Code>render</Code>. A snippet carried over from a Radix codebase is the most common way a
          trigger breaks.
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
          The wrong form fails quietly. <Code>DropdownMenuTrigger</Code> still accepts{" "}
          <Code>asChild</Code> and drops it, so the markup compiles and renders one interactive
          element inside another, which breaks the keyboard and the accessible name. Look for a
          doubled control rather than for an error.
        </Para>
      </DocSection>

      <DocSection id="gaps" title="When nothing fits">
        <Para>
          The set is finite on purpose. Search the index&rsquo;s synonyms first — they carry the
          words someone reaches for when they do not know the Databricks name, so
          &ldquo;modal&rdquo; finds Dialog and &ldquo;kebab&rdquo; finds DropdownMenu. If nothing
          fits, that is a finding to report rather than route around, because a one-off is invisible
          to the linters and absent from Figma.
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

      <SourceNote>
        <Code>packages/dbui/docs/component-index.md</Code> decides which component to pick. The
        component&rsquo;s own JSDoc decides how to use the one you picked. When they disagree, the
        JSDoc wins.
      </SourceNote>
    </>
  )
}
