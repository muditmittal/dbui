import Link from "next/link"

import { CodeBlock } from "@/components/docs/CodeBlock"
import {
  Code,
  DocHeader,
  DocSection,
  DocSubsection,
  Para,
  RefTable,
} from "@/components/docs/Prose"
import { cssUtilities, rampUtilities, utilityModules } from "@/components/utility-data"

export const metadata = { title: "Utilities — DBUI" }

/**
 * The one page for what DBUI ships that is neither a component, an icon nor a
 * token. Both halves are generated: the exports come out of `src/lib/`, the
 * classes out of the token layer's stylesheets. Nothing here counts by hand.
 */

const helperExports = utilityModules.flatMap((module) =>
  module.exports.map((entry) => ({ ...entry, importPath: module.importPath }))
)

/**
 * Keyed by class name rather than written into the loop below, so a second
 * utility appearing in the token layer does not inherit this one's paragraph.
 */
const CSS_GUIDANCE: Record<string, string> = {
  "no-scrollbar":
    "Hides the scrollbar without disabling the scroll. Use it where the scrolling is already obvious from the content — a tab strip, an icon rail. Never on the page's main scroll container, where the bar is the only thing telling a reader there is more.",
}

export default function UtilitiesPage() {
  return (
    <>
      <DocHeader title="Utilities">
        Everything DBUI ships that is neither a component, an icon nor a token. Class helpers under{" "}
        <Code>src/lib/</Code>, and the CSS classes the token layer emits.
      </DocHeader>

      <DocSection title="Helpers">
        <Para>
          {helperExports.length} exports across {utilityModules.length} modules. Install copies files
          rather than publishing a package, so the path import is the one that works — the barrel
          exists for linters and agent context.
        </Para>
        <RefTable
          columns={[
            { key: "name", header: "Export", mono: true, width: "w-40" },
            { key: "kind", header: "Kind" },
            { key: "importPath", header: "Import from", mono: true },
          ]}
          rows={helperExports.map((entry) => ({
            name: entry.name,
            kind: entry.kind,
            importPath: entry.importPath,
          }))}
        />

        <DocSubsection title="cn">
          <Para>
            Joins class values into one string. It drops function values rather than stringifying
            them: Base UI types <Code>className</Code> as a function of component state, and{" "}
            <Code>cn</Code> has no access to that state, so a function it cannot evaluate would
            otherwise land in the class list as source text.
          </Para>
        </DocSubsection>

        <DocSubsection title="cva">
          <Para>
            Builds a class function from a base string and a variant map. It is inlined rather than
            installed, which is what keeps the dependency count where it is. Pair it with{" "}
            <Code>VariantProps</Code> to derive a component&apos;s prop types from its own variant
            map instead of restating them.
          </Para>
        </DocSubsection>

        <DocSubsection title="buttonVariants">
          <Para>
            The button&apos;s own variant map, exported so anything that has to look like a button
            without being one reads the same classes. Reach for it only when a real{" "}
            <Code>Button</Code> will not do — a link that must render as a button is the case it
            exists for.
          </Para>
        </DocSubsection>
      </DocSection>

      <DocSection title="CSS utilities">
        <Para>
          The token layer emits {rampUtilities.length + cssUtilities.length} utility classes.{" "}
          {rampUtilities.length} of them are the type ramp, documented on{" "}
          <Link href="/docs/tokens" className="text-text-accent no-underline hover:underline">
            Tokens
          </Link>{" "}
          beside the ramp they come from. The rest are here.
        </Para>

        {cssUtilities.map((utility) => (
          <DocSubsection key={utility.name} title={utility.name}>
            {CSS_GUIDANCE[utility.name] ? <Para>{CSS_GUIDANCE[utility.name]}</Para> : null}
            <CodeBlock caption={utility.source}>
              {`@utility ${utility.name} {\n${utility.declarations.map((line) => `  ${line}`).join("\n")}\n}`}
            </CodeBlock>
          </DocSubsection>
        ))}
      </DocSection>
    </>
  )
}
