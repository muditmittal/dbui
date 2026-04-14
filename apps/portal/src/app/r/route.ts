import { NextResponse } from "next/server"
import { readdirSync, existsSync } from "fs"
import { join } from "path"

const DBUI_COMPONENTS = join(process.cwd(), "../../packages/dbui/src/components/ui")

export async function GET() {
  if (!existsSync(DBUI_COMPONENTS)) {
    return NextResponse.json({ error: "packages/dbui not found" }, { status: 500 })
  }

  const files = readdirSync(DBUI_COMPONENTS).filter(f => f.endsWith(".tsx"))
  const items = files.map(f => {
    const name = f.replace(".tsx", "")
    return {
      name,
      type: "registry:ui",
      href: `/r/styles/default/${name}`,
    }
  })

  return NextResponse.json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "dbui",
    homepage: "https://dbuidesign.vercel.app",
    items,
  })
}
