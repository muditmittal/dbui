import Link from "next/link"

import {
  DocHeader,
  DocSection,
  Para,
  Code,
  RefTable,
  SourceNote,
} from "@/components/docs/Prose"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { Guidance } from "@/components/docs/Guidance"

export const metadata = { title: "Accessibility and internationalization — DBUI" }

/**
 * A hub, not a standard. `brandvoice.md` already holds an Accessibility and a
 * Globalization checklist, so a second set of rules here would be two standards
 * disagreeing within a month. This page says where each of those checks lands in
 * code, and — the part no other file covers — what the system does not check.
 *
 * The gaps are stated plainly on purpose. A design system that implies coverage
 * it does not have gets trusted once and then never again.
 */

const COVERAGE = [
  {
    check: "Color contrast",
    where: "Computed on the Tokens page for every foreground against the surface it sits on",
    gap: "Token pairs only. Nothing measures a composed screen, or text over an image or a chart.",
  },
  {
    check: "Component behavior",
    where: "Inherited from the Base UI primitive each component wraps",
    gap: "Only as correct as the primitive. Nothing verifies what DBUI adds on top of it.",
  },
  {
    check: "Per-component requirements",
    where: "Stated as a constraint in the component's own JSDoc",
    gap: "Prose an author has to read. No build step reads it for them.",
  },
  {
    check: "Story review",
    where: "Storybook runs axe in an accessibility panel, per story, on demand",
    gap: "Manual and one story at a time. It gates nothing. A story is not a screen.",
  },
  {
    check: "Design lint",
    where: "Reports non-DBUI elements, non-token color, off-scale spacing and type",
    gap: "No accessibility rule at all. A missing label passes clean.",
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <DocHeader title="Accessibility and internationalization">
        Where each check lands in code, and an honest account of what the system does not verify for
        you.
      </DocHeader>

      <div className="mt-8">
        <SourceNote>
          <Code>packages/dbui/docs/brandvoice.md</Code> holds the Accessibility and Globalization
          checklists, and the{" "}
          <Link href="/docs/voice" className="text-text-accent">
            Voice and tone page
          </Link>{" "}
          renders them. This page adds no rules of its own. It says which file, token or component
          each rule turns into.
        </SourceNote>
      </div>

      <DocSection title="Contrast is measured, not asserted">
        <Para>
          Color pairs are checkable rather than a convention to remember. The{" "}
          <Link href="/docs/tokens" className="text-text-accent">
            Tokens page
          </Link>{" "}
          computes the ratio each foreground achieves against the surface it belongs on and prints it
          beside the swatch, in light and dark. Read the ratio there rather than anywhere it has been
          copied to, because a copied number is one edit away from being wrong.
        </Para>
        <Para>
          The rule that makes it work is the pairing. Every surface has foregrounds that belong on
          it, so <Code>text-base</Code> goes on <Code>surface-base</Code> and{" "}
          <Code>text-inverse</Code> on <Code>surface-inverse</Code>. Putting a subtle foreground on a
          surface it was not tuned for is how a token system still ships unreadable text. Disabled
          foregrounds sit below the threshold by design, which WCAG allows for a control that cannot
          be operated.
        </Para>
      </DocSection>

      <DocSection title="Keyboard and focus">
        <Para>
          Focus is visible through <Code>focus-visible</Code> rather than <Code>focus</Code>, so the
          ring appears for someone moving by keyboard and not for someone who just clicked. The ring
          itself is a token pair — <Code>focus-ring</Code> and <Code>focus-ring-offset</Code> — which
          is what keeps it one recognizable shape across every control and lets it invert with the
          theme.
        </Para>
        <Para>
          Keyboard behavior inside a component comes from the Base UI primitive it wraps, not from
          DBUI. Arrow keys in a menu, Escape to dismiss, focus returning to the trigger and focus
          staying inside an open dialog are the primitive&rsquo;s work. That is a deliberate
          dependency, and it is also the boundary of what the system can promise — the order focus
          moves through a screen you compose is yours, and nothing here checks it.
        </Para>
      </DocSection>

      <DocSection title="An icon is not a name">
        <Para>
          An icon-only control has no accessible name unless you give it one. The glyph is not read
          out, the tooltip is not read out reliably, and a control announced as
          &ldquo;button&rdquo; is a dead end for anyone using a screen reader.
        </Para>
        <CodeBlock caption="An icon-only control needs a label that says what it does">
          {`<Button size="icon-md" aria-label="Delete catalog">
  <Trash />
</Button>`}
        </CodeBlock>
        <Para>
          A few components state this as a constraint in their own JSDoc, which is where a
          per-component rule belongs. Nothing enforces it. The design linter has no accessibility
          rule, so the version without a label passes every check the repository runs.
        </Para>
      </DocSection>

      <DocSection title="Text that has to survive translation">
        <Para>
          A string is translated whole. Assembling one at runtime from fragments produces word order
          that is correct in English and wrong in most other languages, and it gives a translator
          nothing to work with. Pass the values into one string instead of concatenating around them.
        </Para>
        <Para>
          Translated text is usually longer, so a label needs room to grow. <Code>brandvoice.md</Code>{" "}
          sets the allowance. In practice it means no fixed width on anything holding a translatable
          string, and no layout that depends on a label being short — let flex and grid size the
          control, and check the long case rather than the English one.
        </Para>
        <Para>
          Alt text follows the same file. It has a length band, it front-loads the terms that carry
          the meaning, and it ends with a period. Keep meaningful text out of the image itself, which
          is the rule that most often gets skipped in a diagram.
        </Para>
        <Para>
          The gap here is total. There is no internationalization framework in the system, no message
          catalog and no pseudo-localization pass. Every string in the components and in this portal
          is hardcoded English. These rules are how the copy stays translatable for whenever that
          work happens — they are not a description of a working pipeline.
        </Para>
      </DocSection>

      <DocSection title="Dates">
        <Para>
          Dates render in the ISO 8601 form, digits only, most significant first. It is unambiguous
          across locales, it sorts as a string and it removes the month-day question entirely. The
          rule is in <Code>brandvoice.md</Code>.
        </Para>
        <Para>
          The system ships no date formatter, so each surface formats its own. Nothing stops a screen
          from rendering a locale-specific string, and nothing catches it.
        </Para>
      </DocSection>

      <DocSection title="Right to left">
        <Para>
          Direction is set once high in the tree, then read from context by every component under it.
          The provider is re-exported from the system so a consumer does not import it from Base UI
          directly.
        </Para>
        <CodeBlock caption="Set direction once, at the root of the app">
          {`import { DirectionProvider } from "dbui/components/ui/direction"

<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>`}
        </CodeBlock>
        <Para>
          What this buys today is the Base UI layer. Primitives read the provider and place popups,
          menus and positioned surfaces on the correct side. What it does not buy is the components
          themselves. DBUI positions with physical properties — margin left, padding left, absolute
          left — rather than the logical equivalents, so a mirrored layout will not fully mirror.
          Icons stay where they were, gutters stay on the same side, and nothing warns you.
        </Para>
        <Para>
          No screen in the system has been built or reviewed in a right-to-left direction. Treat RTL
          as started rather than supported, and expect to fix positioning per screen.
        </Para>
      </DocSection>

      <DocSection title="What checks what">
        <Para>
          Five things happen today. None of them is a test suite, and none of them runs on its own.
          What each one does not cover is the part worth reading.
        </Para>
        <RefTable
          columns={[
            { key: "check", header: "Check", width: "w-[168px]" },
            { key: "where", header: "Where it happens" },
            { key: "gap", header: "What it does not cover" },
          ]}
          rows={COVERAGE}
        />
        <Para>
          There is no automated accessibility suite, and no continuous integration to run one in. The{" "}
          <Link href="/docs/checks" className="text-text-accent">
            design linters
          </Link>{" "}
          are the only automated checks the repository has, and their subject is tokens and component
          use rather than accessibility. Accessibility and internationalization linters are listed as
          not started in <Code>TRACKER.md</Code>. Until they exist, every check in the table is done
          by a person or not at all.
        </Para>
        <Guidance
          dos={[
            "Give every icon-only control a label that names the action, not the glyph",
            "Read the contrast ratio on the Tokens page, and pair a foreground with the surface it was tuned for",
            "Reach the whole screen with the keyboard before calling it done, and watch where focus goes",
            "Pass values into one string, and check the layout with the longest label rather than the English one",
          ]}
          donts={[
            "Assume a component is accessible because it came from the system",
            "Describe position or direction in copy — a screen reader has no left",
            "Build a right-to-left screen expecting the components to mirror",
            "Read an accessibility number out of prose when a page computes it",
          ]}
        />
      </DocSection>
    </>
  )
}
