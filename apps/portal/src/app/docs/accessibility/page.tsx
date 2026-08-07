import Link from "next/link"

import { DocHeader, DocSection, Para, Code, RefTable, SourceNote } from "@/components/docs/Prose"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"

export const metadata = { title: "Accessibility — DBUI" }

/**
 * Rules, then reliance. Everything here is either something a person does on a
 * screen or a limit on what the system does for them. Explaining what contrast
 * or a live region is belongs to WCAG, not to a page someone opens mid-task.
 *
 * `brandvoice.md` owns the Accessibility and Globalization checklists, so this
 * page states no rule that file does not already hold. What it adds is the shape
 * each rule takes in code, and — the part no other file covers — what nothing
 * checks. The gaps are the most useful lines here. A system that implies
 * coverage it does not have is trusted once.
 *
 * No number appears in this prose. The ratios, the alt-text band and the
 * expansion allowance live in `brandvoice.md` and on the Tokens page, and a
 * copied number is one edit from being wrong.
 */

/**
 * Read as a promise and its limit. A reader needs to know which layer to lean
 * on and where leaning stops, and only the second column of each row is
 * something they could not have assumed.
 */
const RELIANCE = [
  {
    layer: "Tokens",
    gives:
      "A contrast ratio computed for every foreground against the surface it belongs on, in light and dark, printed beside the swatch",
    not: "A composed screen. Nothing measures text over an image, a chart or a color you introduced.",
  },
  {
    layer: "Base UI primitives",
    gives:
      "Arrow keys, Escape, focus return to the trigger and focus containment, inside one component",
    not: "Focus order across a screen you compose, or anything DBUI adds on top of the primitive.",
  },
  {
    layer: "Component JSDoc",
    gives: "The requirement for that one component, written as a constraint where it has one",
    not: "Nothing reads it for you. It is prose in a file the author has to open.",
  },
  {
    layer: "Storybook",
    gives: "An axe panel, one story at a time, when someone opens it",
    not: "It gates nothing, and a story is not a screen.",
  },
  {
    layer: "Design lint",
    gives: "Raw elements where a component exists, non-token color, off-scale spacing and type",
    not: "No accessibility rule at all. A control with no label passes clean.",
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <DocHeader title="Accessibility">
        What to do so a screen works for anyone, on any input, in any language &mdash; and what the
        system does not check for you.
      </DocHeader>

      <DocSection title="Controls">
        <Guidance
          dos={[
            "Give every icon-only control a label that names the action, not the glyph",
            "Pair a foreground with the surface it was tuned for, and read the ratio on the Tokens page rather than out of prose",
            "Write button and link text that still says what it does when read on its own",
            "Reach every control with the keyboard before calling a screen done, and watch where focus lands when a dialog closes",
          ]}
          donts={[
            "Assume a component is accessible because it came from the system",
            "Put a subtle foreground on a surface it was not tuned for",
            "Name a control by where it sits — a screen reader has no left",
            "Wait for the linter to catch a missing label — it has no accessibility rule",
          ]}
        />
        <CodeBlock caption="The rule that gets skipped most: an icon carries no name">
          {`<Button size="icon-md" aria-label="Delete catalog">
  <Trash />
</Button>`}
        </CodeBlock>
      </DocSection>

      <DocSection title="Strings">
        <Guidance
          dos={[
            "Pass values into one whole string, so a translator is given the sentence and not its pieces",
            "Let flex or grid size anything holding a translatable label, and check the layout against the longest translation rather than the English",
            "Write every date in the ISO 8601 form — it sorts as a string and it cannot be read month-first by mistake",
            "Front-load the terms that carry the meaning in alt text, and keep it inside the length band brandvoice.md sets",
          ]}
          donts={[
            "Assemble a sentence from fragments at run time",
            "Set a fixed width on anything holding a translatable string",
            "Bake meaning into text inside an image — number the callouts and put the words beside it",
            "Format a date to the reader's locale — nothing catches it, and nothing tells them which number is the month",
          ]}
        />
        <Para>
          There is no internationalization framework here. No message catalog, no
          pseudo-localization pass, no translated string anywhere. Every string in the components
          and in this portal is hardcoded English, so read these rules as what keeps the copy
          translatable for whenever that work starts rather than as a pipeline that already runs.
        </Para>
      </DocSection>

      <DocSection title="Direction">
        <Para>
          Set direction once at the root and let every component read it from context. The provider
          is re-exported from the system, so nothing imports it from Base UI directly.
        </Para>
        <CodeBlock caption="Set direction once, at the root of the app">
          {`import { DirectionProvider } from "dbui/components/ui/direction"

<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>`}
        </CodeBlock>
        <Para>
          Rely on that for popup placement and for nothing else. Primitives read the provider and put
          menus, popovers and positioned surfaces on the correct side. The components do not follow:
          DBUI positions with physical properties rather than logical ones, so a mirrored layout does
          not fully mirror. Icons stay where they were, gutters stay on the same side, and nothing
          warns you. No screen in the system has been built or reviewed right to left, so budget for
          fixing position per screen.
        </Para>
      </DocSection>

      <DocSection title="What you can rely on">
        <Para>
          There is no automated accessibility suite and no continuous integration to run one in, so
          every check below is done by a person or not at all. The second column is the part worth
          reading.
        </Para>
        <RefTable
          columns={[
            { key: "layer", header: "Layer", width: "w-[152px]" },
            { key: "gives", header: "What it gives you" },
            { key: "not", header: "What it does not" },
          ]}
          rows={RELIANCE}
        />
      </DocSection>

      <SourceNote>
        <Code>packages/dbui/docs/brandvoice.md</Code> owns the Accessibility and Globalization
        checklists, and the{" "}
        <Link href="/docs/voice" className="text-text-accent">
          Voice and tone page
        </Link>{" "}
        renders them. Change a rule there, not here. This page says what each one looks like in
        code.
      </SourceNote>
    </>
  )
}
