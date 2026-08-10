import Link from "next/link"

import { DocHeader, DocSection, Para, Code, RefTable } from "@/components/docs/Prose"

export const metadata = { title: "Accessibility — DBUI" }

/**
 * What the system does, and where it stops. Nothing else.
 *
 * The copy rules themselves are owned by `brandvoice.md` and rendered by
 * `/docs/voice`. This page held a third copy of them until 2026-08-07, which is
 * the drift `CONTRIBUTING.md` opens by forbidding. What is left is the part no
 * other file covers: which layer of DBUI gives you what, and what it does not.
 *
 * Component accessibility is not application accessibility, so the page draws
 * that line explicitly: the reliance table is what the system proves, and the
 * Keyboard, Patterns and "still product-owned" notes are what the composed
 * screen still has to do. Every row was checked against the repo rather than
 * reasoned about; the cut material, and what was false, is in
 * `notes/accessibility-page-cuts.md`. A claim goes back only when the repo
 * demonstrates it.
 */

/**
 * A promise and its limit. Only the second column is something a reader could
 * not have assumed, and a wrong entry there is worse than an empty one — it
 * sends someone into a component expecting behavior that is not there.
 */
const RELIANCE = [
  {
    layer: "Tokens",
    gives: "An AA verdict beside every text, link and status token on the Tokens page",
    not: "Measure a composed screen — a chart, an overlay, or a color you introduced.",
  },
  {
    layer: "Base UI primitives",
    gives: "Arrow keys, Escape, focus trap and return to the trigger, inside one component",
    not: "Focus order across a screen you compose.",
  },
  {
    layer: "Component JSDoc",
    gives: "Each component's requirement, printed by dbui component and over MCP",
    not: "Enforce it. Button's aria-label rule is checked by no one.",
  },
  {
    layer: "Design lint",
    gives: "Raw elements where a component exists, non-token color, off-scale spacing and type",
    not: "Any accessibility rule. A control with no label passes clean.",
  },
]

/**
 * Use the system component, and what breaks if you rebuild it instead. The
 * third column is the failure, not a style note — each is a role or a keyboard
 * contract the primitive already carries and a hand-rolled version drops.
 */
/**
 * Written as rules rather than prose because each one exists to refuse a specific
 * thing that was in the tree. The translucent row is the one worth keeping: eleven
 * components carried `ring-focus-ring/50`, which blends to #A0A0A0 over white and
 * measures 2.61:1 — softer looking and worse measuring than the page behind it.
 */
const FOCUS_RULES = [
  {
    rule: "Every focusable control shows one",
    why: "2.4.7 Focus Visible. No component opts out, including the ones a designer rarely tabs to.",
  },
  {
    rule: "Use the pair, not one half",
    why: "A border alone is 1px and vanishes on a filled control. A ring alone fails 1.4.11 against the fill.",
  },
  {
    rule: "Never translucent",
    why: "A half-opacity ring blends to #A0A0A0 over white — 2.61:1, a fail. It reads softer and measures worse.",
  },
  {
    rule: "focus-visible, never focus",
    why: "A pointer user should not see it. A keyboard user always should.",
  },
  {
    rule: "outline-none only beside its replacement",
    why: "Same class list, so the two cannot drift apart in a later edit.",
  },
  {
    rule: "Never Tailwind's ring-*",
    why: "It has no theme namespace in v4, so it can never resolve to a DBUI token.",
  },
]

const PATTERNS = [
  {
    use: (
      <>
        <Code>Dialog</Code>, <Code>AlertDialog</Code>
      </>
    ),
    carries: "Focus trap, Escape to dismiss, focus returned to the trigger",
    dont: (
      <>
        A <Code>div</Code> with <Code>role=&quot;dialog&quot;</Code>
      </>
    ),
  },
  {
    use: (
      <>
        <Code>DropdownMenu</Code>, <Code>Menubar</Code>
      </>
    ),
    carries: "The menu keyboard model as shipped",
    dont: "A custom menu built from buttons",
  },
  {
    use: <Code>Tabs</Code>,
    carries: "default indexes a page; pill switches a panel",
    dont: "Underline tabs to switch content",
  },
  {
    use: (
      <>
        <Code>Select</Code>, <Code>Combobox</Code>
      </>
    ),
    carries: "The active option exposed to assistive tech",
    dont: "A list that only looks like a select",
  },
  {
    use: <Code>dbui-viz</Code>,
    carries: "A text summary and a data-table path",
    dont: "A chart that carries meaning by itself",
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <DocHeader title="Accessibility">
        What DBUI does for a screen that has to work on any input, and what it leaves to you. The bar
        is WCAG 2.1 AA; a component or token meeting it does not mean a composed screen does.
      </DocHeader>

      <DocSection title="What you can rely on">
        <Para>
          There is no automated accessibility suite and no continuous integration to run one, so
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

      <DocSection title="Color">
        <Para>
          Never carry meaning by color alone — pair status and selection with an icon or a label.
          Use semantic tokens; do not invent a hex for status or emphasis. Text ratios are measured
          on the{" "}
          <Link href="/docs/tokens" className="text-text-accent">
            Tokens
          </Link>{" "}
          page; a non-text indicator needs 3:1 against what sits next to it. Check hover, focus and
          selected in both themes — dark is the harder one.
        </Para>
        <Para>Contrast and color-vision-deficiency results land here once the suite is run.</Para>
      </DocSection>

      <DocSection title="Keyboard">
        <Para>
          Inside one primitive — a dialog, menu, select or tab list — Base UI owns the keyboard and
          focus. Across a page, you own tab order, landmarks, and where focus goes in stacked modals
          or cells. Keep the focus ring. Do not assume a screen works because its parts came from the
          system.
        </Para>
      </DocSection>

      <DocSection title="Focus">
        <Para>
          One treatment, on every focusable control: <Code>focus-visible:border-focus-ring</Code>{" "}
          with <Code>focus-visible:shadow-focus</Code> — a 1px offset and a 2px ring. It is the same
          pair in Figma, where the <Code>elevation/focus</Code> effect style binds both colors to{" "}
          <Code>focus/ring</Code> and <Code>focus/ring-offset</Code>, so it retints per mode.
        </Para>
        <Para>
          The offset is the part people delete, and it is the part doing the work. A focus indicator
          has to clear 3:1 against the page and against whatever the control is filled with. Those
          pull opposite ways, and no single ring color satisfies both — against a page the ring
          measures 10.37:1 in light and 16.84:1 in dark, and against a primary button&rsquo;s own
          fill the same ring measures 1.73:1 and 1.33:1. The offset splits that one impossible
          boundary into two easy ones, so the indicator survives on a filled control instead of
          disappearing into it.
        </Para>
        <RefTable
          columns={[
            { key: "rule", header: "Rule", width: "w-[248px]" },
            { key: "why", header: "Why" },
          ]}
          rows={FOCUS_RULES}
        />
        <Para>
          One exception, and only one. A full-bleed row — a tree row spanning its rail edge to edge —
          uses an inset ring, because an outset one would be clipped on both sides and read as two
          vertical bars. It stays conformant by being full opacity. <Code>DataTree</Code> is the only
          component entitled to it.
        </Para>
      </DocSection>

      <DocSection title="Patterns">
        <Para>Use the system component. Rebuild only when the pattern does not exist.</Para>
        <RefTable
          columns={[
            { key: "use", header: "Use", width: "w-[184px]" },
            { key: "carries", header: "What it carries" },
            { key: "dont", header: "Don't" },
          ]}
          rows={PATTERNS}
        />
        <Para>
          Still product-owned: full grid navigation for a dense result set, and chart alternatives
          beyond what viz ships today.
        </Para>
      </DocSection>

      <DocSection title="Language">
        <Para>
          There is no internationalization framework here — no message catalog, no
          pseudo-localization, no translated string. Every string is hardcoded English, so the
          globalization rules on{" "}
          <Link href="/docs/voice" className="text-text-accent">
            Voice and tone
          </Link>{" "}
          keep copy translatable for whenever that work starts. Set direction once with{" "}
          <Code>DirectionProvider</Code>: primitives read it for popup placement, but the components
          position with physical properties, so a mirrored layout does not fully mirror and no screen
          has been reviewed right to left.
        </Para>
      </DocSection>
    </>
  )
}
