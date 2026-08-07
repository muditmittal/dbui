import Link from "next/link"

import { DocHeader, DocSection, Para, Command, SourceNote } from "@/components/docs/Prose"
import { shells } from "@/components/shell-data"

export const metadata = { title: "Shells — DBUI" }

/**
 * The single surface for the shells. `/templates` used to render this and now
 * redirects here, because two pages reading the same generated module is two
 * pages that will describe it differently.
 */

/** Storybook story ids for the shells that have a live example. */
const PREVIEW: Record<string, string> = {
  B: "components-shells-catalog-explorer--playground",
}

export default function ShellsPage() {
  return (
    <>
      <DocHeader title="Shells">
        The {shells.length} frames a product page can start from. Picking the frame before the
        content is what stops a page becoming a stack of cards. Each shell fixes its regions, how
        they scale and which container owns the scroll.
      </DocHeader>

      <DocSection title="The shells">
        <div className="flex flex-col gap-4">
          {shells.map((shell) => (
            <section
              key={shell.id}
              className="rounded-2 border border-border-base bg-surface-base p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="type-eyebrow rounded-1 bg-surface-accent px-2 py-0.5 text-text-accent">
                  Shell {shell.id}
                </span>
                <h3 className="type-title-4 text-text-strong">{shell.name}</h3>
              </div>

              <p className="type-body mt-2 text-text-subtle">{shell.purpose}</p>

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="type-eyebrow text-text-subtle">Regions</div>
                  <ol
                    className="mt-2 flex flex-col gap-1.5"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {shell.regions.map((region, i) => (
                      <li key={region} className="type-body flex gap-3 text-text-base">
                        <span className="type-hint w-4 shrink-0 pt-0.5 text-text-subtle">
                          {i + 1}
                        </span>
                        <span>{region}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="type-eyebrow text-text-subtle">Scaling</div>
                    <p className="type-body mt-1 text-text-base">{shell.scaling}</p>
                  </div>
                  <div>
                    <div className="type-eyebrow text-text-subtle">Scroll ownership</div>
                    <p className="type-body mt-1 text-text-base">{shell.scroll}</p>
                  </div>
                  {PREVIEW[shell.id] && (
                    <Link
                      href={`/components?path=/story/${PREVIEW[shell.id]}`}
                      className="type-label text-text-accent no-underline hover:underline"
                    >
                      See it running
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </DocSection>

      <DocSection title="Getting this as data">
        <Para>
          An agent reads the same definitions from the CLI, so this page and the CLI cannot
          disagree.
        </Para>
        <Command>dbui shell</Command>
        <SourceNote>
          <code className="type-code">packages/dbui/composition.md</code> defines every shell.{" "}
          <code className="type-code">scripts/generate-shell-data.mjs</code> parses it into the
          module this page renders, so a shell edited in one place cannot go stale in the other.
        </SourceNote>
      </DocSection>
    </>
  )
}
