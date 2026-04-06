import { notFound } from "next/navigation"
import Link from "next/link"
import { componentsBySlug, components } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ComponentPreview } from "@/components/component-preview"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = componentsBySlug[slug]
  if (!component) return {}
  return {
    title: `${component.name} — db-design-system`,
    description: component.description,
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = componentsBySlug[slug]

  if (!component) notFound()

  const currentIndex = components.findIndex((c) => c.slug === slug)
  const prev = components[currentIndex - 1]
  const next = components[currentIndex + 1]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            db-design-system
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{component.name}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-3xl font-semibold">{component.name}</h1>
          {component.isPattern && (
            <Badge variant="outline">pattern</Badge>
          )}
        </div>
        <p className="text-muted-foreground mb-8">{component.description}</p>

        <Separator className="mb-8" />

        {/* Preview */}
        <section className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Preview</h2>
          <div
            className="rounded-lg border bg-background p-10 flex items-center justify-center min-h-48"
            suppressHydrationWarning
          >
            <ComponentPreview className="min-h-32 flex w-full items-center justify-center">
              {component.preview}
            </ComponentPreview>
          </div>
        </section>

        {/* Install */}
        {!component.isPattern && (
          <section className="mb-10">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Install</h2>
            <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm">
              {component.installCommand}
            </div>
          </section>
        )}

        {/* Placeholders for future content */}
        <section className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Do&apos;s &amp; Don&apos;ts</h2>
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground text-center">
            Design guidelines coming soon.
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Usage</h2>
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground text-center">
            Code examples coming soon.
          </div>
        </section>

        {/* Prev / Next navigation */}
        <Separator className="mb-6" />
        <div className="flex justify-between text-sm">
          {prev ? (
            <Link href={`/docs/components/${prev.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
              ← {prev.name}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/docs/components/${next.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
              {next.name} →
            </Link>
          ) : <span />}
        </div>
      </main>
    </div>
  )
}
