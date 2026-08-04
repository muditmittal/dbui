import Link from "next/link"

import { SiteHeader } from "@/components/SiteHeader"
import { shells } from "@/components/shell-data"

export const metadata = { title: "Templates — DBUI" }

/** Storybook story ids for the shells that have a live example. */
const PREVIEW: Record<string, string> = {
  B: "components-shells-catalog-explorer--playground",
}

export default function TemplatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-14 pb-24">
        <h1 className="type-title-1 text-text-strong">Templates</h1>
        <p className="type-paragraph mt-4 max-w-[68ch] text-text-subtle">
          Five page shells. Every product page starts with one — choosing the frame before writing
          content is what stops a page from becoming a stack of cards. Each shell fixes its regions,
          how they scale, and which container owns the scroll.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {shells.map((shell) => (
            <section
              key={shell.id}
              className="rounded-md border border-border-base bg-surface-base p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="type-eyebrow rounded-sm bg-surface-accent px-2 py-0.5 text-text-accent">
                  Shell {shell.id}
                </span>
                <h2 className="type-title-3 text-text-strong">{shell.name}</h2>
              </div>

              <p className="type-body mt-2 max-w-[68ch] text-text-subtle">{shell.purpose}</p>

              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="type-eyebrow text-text-subtle">Regions</div>
                  <ol className="mt-2 flex flex-col gap-1.5" style={{ listStyle: "none", padding: 0 }}>
                    {shell.regions.map((region, i) => (
                      <li key={i} className="type-body flex gap-3 text-text-base">
                        <span className="type-hint w-4 shrink-0 pt-0.5 text-text-subtle tabular-nums">
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
                      See it running →
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="type-body mt-10 max-w-[68ch] text-text-subtle">
          Agents get the same definitions from <code className="type-code">dbui shell</code>, parsed
          from <code className="type-code">composition.md</code> — so this page and the CLI cannot
          disagree.
        </p>
      </main>
    </>
  )
}
