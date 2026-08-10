import Link from "next/link"

import { SiteHeader } from "@/components/SiteHeader"
import { CodeBlock } from "@/components/docs/CodeBlock"
import {
  Code,
  DocHeader,
  DocSection,
  DocSubsection,
  Para,
} from "@/components/docs/Prose"

export const metadata = { title: "Install — DBUI" }

/**
 * Human install page. The agent-fetchable instructions stay at `/install.md`
 * (redirect to the raw `packages/dbui/install.md`), so a person and an agent
 * do not compete for one URL.
 */

const AGENT_PROMPT =
  "Use https://dbuidesign.vercel.app/install.md to set up DBUI in this project."

export default function InstallPage() {
  return (
    <>
      <SiteHeader />
      <article className="mx-auto w-full max-w-6xl px-6 py-10 pb-24">
        <div className="content-column">
          <DocHeader title="Install">
            DBUI is clone-and-copy, not an npm package. Pick the path that matches where you
            are, then hand the agent prompt to Cursor or Claude Code.
          </DocHeader>

          <DocSection title="Tell your agent">
            <Para>
              Paste this into the agent. It fetches the full install instructions, runs the
              preflight checks, and wires the project.
            </Para>
            <CodeBlock>{AGENT_PROMPT}</CodeBlock>
            <Para>
              Agent instructions live at{" "}
              <Link href="/install.md" className="text-text-accent no-underline hover:underline">
                /install.md
              </Link>
              . This page is for people.
            </Para>
          </DocSection>

          <DocSection title="Databricks managed machines">
            <Para>
              On a company Mac, public npm is blocked. Point the package manager at the sanctioned
              mirror before scaffolding or installing project deps:
            </Para>
            <CodeBlock language="bash" caption=".npmrc">
              {`registry=https://npm-proxy.dev.databricks.com`}
            </CodeBlock>
            <Para>
              Or for Yarn, set <Code>npmRegistryServer</Code> in <Code>.yarnrc.yml</Code> to that
              same URL. DBUI itself still needs no <Code>npm install</Code> — only React, Vite,
              Tailwind, and your app deps do.
            </Para>
          </DocSection>

          <DocSection title="Three paths">
            <DocSubsection title="Starting from nothing">
              <Para>
                Create a React + Tailwind v4 project (Vite is the default the agent uses), point
                the registry as above if needed, then paste the agent prompt. The agent clones
                DBUI, copies it into the project, and leaves you on a <Code>Base</Code> shell page.
              </Para>
            </DocSubsection>

            <DocSubsection title="Existing repo, build with DBUI">
              <Para>
                You need React 18+ and Tailwind v4 already. Paste the agent prompt in the project
                root. It copies <Code>dbui/</Code> and <Code>dbui-shells/</Code>, merges path
                aliases, imports tokens, and adds AI rules. Start every screen from a shell.
              </Para>
            </DocSubsection>

            <DocSubsection title="Existing product UI, migrate to DBUI">
              <Para>
                Same install as above, then replace chrome and controls over time. Swap page frames
                for shells, controls for DBUI components, and third-party icons for the DBUI set.
                If you are on Tailwind v3 or DuBois/Ant, plan a UI rewrite — DBUI is not a
                drop-in package rename.
              </Para>
            </DocSubsection>
          </DocSection>

          <DocSection title="Manual install">
            <Para>If you are not using an agent:</Para>
            <CodeBlock language="bash">
              {`git clone https://github.com/muditmittal/dbui.git ~/dbui
cp -r ~/dbui/packages/dbui ./dbui
cp -r ~/dbui/packages/dbui-shells ./dbui-shells
cp ./dbui/CLAUDE.md ./CLAUDE.md`}
            </CodeBlock>
            <Para>
              Then follow path-alias, CSS, and Vite steps in{" "}
              <Link href="/install.md" className="text-text-accent no-underline hover:underline">
                the agent install doc
              </Link>
              .
            </Para>
          </DocSection>
        </div>
      </article>
    </>
  )
}
