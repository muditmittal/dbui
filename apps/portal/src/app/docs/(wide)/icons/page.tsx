import type * as React from "react"
import Link from "next/link"

import { DocHeader, DocSection, Code, RefTable } from "@/components/docs/Prose"
import { Guidance } from "@/components/docs/Guidance"

import { IconBrowser } from "./IconBrowser"

export const metadata = { title: "Icons — DBUI" }

/**
 * The browser is the page.
 *
 * Under it used to sit five sections: a table of the four categories, the
 * anatomy of the `use:` tag, three printed entity maps, a paragraph on sizing
 * and a rules list. All of it was true and almost none of it was what a visit
 * was for. A reader who has found their icon needs the few rules that stop them
 * using it wrongly, and a route back to the files that answer everything else.
 *
 * So the tail is now two blocks: the rules, then the tools. Each of the sections
 * that went is either one line in the rules list or one row in the tools table —
 * the category table became a single rule, the tag anatomy became a link to the
 * index, and sizing became the first rule, because it is the one that bites
 * without anything failing.
 */

/**
 * Deep links into the repository, because there is no published package: the
 * source file is the reference, and a reader who wants the sixty entity pairs
 * should land on the map itself rather than on a copy of it that can go stale.
 */
const SOURCE = "https://github.com/muditmittal/dbui/blob/main"
const ENTITY_ICONS = `${SOURCE}/packages/dbui/src/components/icons/entity-icons.ts`

/**
 * Mono and accent, and deliberately not `Code`.
 *
 * `Code` sets its own text color, so a link wrapping one renders body-colored
 * mono on an inset fill — a filename with no affordance at all. Setting the type
 * here instead means the same component works inside a sentence in the rules
 * list and inside the mono column of the tools table.
 */
function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="type-code text-text-accent">
      {children}
    </Link>
  )
}

/**
 * What to reach for, and what each one settles.
 *
 * Two kinds of row, told apart by color rather than by a column: a command is
 * something you type and stays in the body color, a file is something you open
 * and is a link. Nothing here restates what the tool returns — the point of the
 * row is that the tool exists and which question it answers.
 */
const TOOLS = [
  {
    tool: "dbui search <concept>",
    settles: "Finds an icon by concept, across components, shells and docs at once",
  },
  {
    tool: "dbui icon [name]",
    settles: "Lists the set by category, or prints one icon's tag and its synonyms",
  },
  {
    tool: <SourceLink href={`${SOURCE}/packages/dbui/docs/icon-index.md`}>icon-index.md</SourceLink>,
    settles: "Which icon to pick when two of them would read the same",
  },
  {
    tool: <SourceLink href={ENTITY_ICONS}>entity-icons.ts</SourceLink>,
    settles:
      "Which icon an entity type resolves to — Unity Catalog objects, workspace objects, column types",
  },
  {
    tool: <SourceLink href={`${SOURCE}/packages/dbui/skills/dbui-pick-icon.md`}>dbui-pick-icon</SourceLink>,
    settles: "The steps an agent follows to choose one instead of guessing",
  },
  {
    // The package name rather than "MCP server", which reads as a broken
    // filename in a column that is otherwise commands and paths.
    tool: <SourceLink href="/docs/mcp">dbui-mcp</SourceLink>,
    settles: "The same search and metadata, for an agent rather than a terminal",
  },
]

export default function IconsPage() {
  return (
    <>
      <DocHeader title="Icons">
        One set, tagged by concept, so the right icon can be found without knowing its name.
      </DocHeader>

      {/*
        Same slot and treatment as the other three page heroes.

        The alt does not say how many accents there are or where they sit. The
        order in this illustration has already changed once, and a description
        pinned to the arrangement goes stale on the next reorder with nothing to
        catch it — the image is re-exported, the sentence is not.
      */}
      <img
        src="/docs/icons-hero.png"
        alt="Forty-eight icons from the set in a grid, drawn in a muted brown with a few picked out in accent colors."
        width={864}
        height={300}
        className="mt-10 h-auto w-full rounded-2"
      />

      {/*
        The browser then follows, the way the token sections follow the hero on
        that page. The routing sentence that used to sit here — which file
        settles the choice — is a row in the tools table now: it is a citation,
        and it delayed the one thing every visit came for.
      */}
      <IconBrowser />

      {/*
        Sizing leads, because it is the only rule here that fails silently. The
        others produce a wrong-looking icon a reviewer can see; a hardcoded size
        looks right until the root font size moves and the glyph stays behind.
      */}
      <DocSection title="Rules">
        <Guidance
          dos={[
            <>
              Every icon defaults to 16&times;16 and takes a numeric <Code>size</Code> — the icon
              scale is the set of steps to choose from, not a live dial
            </>,
            "Search the concept, then import the exact name the search returned",
            <>
              Resolve a typed node through <SourceLink href={ENTITY_ICONS}>entity-icons.ts</SourceLink>
              , never by eye
            </>,
            "Match the category to the job — object identifies, action happens, indicator reports, component is a control's own chrome",
            "Give an icon-only control a label, because the glyph is not the name",
          ]}
          donts={[
            "Guess a name from the shape you have in mind",
            "Reuse a control's chrome icon as decoration outside that control",
            "Add a local icon to draw a distinction the entity map deliberately collapses",
            "Install lucide, heroicons or any other icon package",
          ]}
        />
      </DocSection>

      <DocSection title="Tools">
        <RefTable
          columns={[
            { key: "tool", header: "Tool", width: "w-[232px]", mono: true },
            { key: "settles", header: "What it settles" },
          ]}
          rows={TOOLS}
        />
      </DocSection>
    </>
  )
}
