import Link from "next/link"
import { components } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const totalComponents = components.length
  const patterns = components.filter((c) => c.isPattern).length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">db-design-system</h1>
            <p className="text-xs text-muted-foreground">Databricks DuBois · shadcn/ui base</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {totalComponents} components · {patterns} patterns
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">Components</h2>
          <p className="text-muted-foreground text-sm">
            All shadcn/ui components, styled with DuBois tokens. Click any component to preview it.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {components.map((component) => (
            <Link
              key={component.slug}
              href={`/docs/components/${component.slug}`}
              className="group flex flex-col gap-1.5 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium group-hover:text-accent-foreground">
                  {component.name}
                </span>
                {component.isPattern && (
                  <Badge variant="outline" className="text-xs">pattern</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
