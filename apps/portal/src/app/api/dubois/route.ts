import { NextRequest, NextResponse } from "next/server"

const DUBOIS_BASE = "https://ui-infra.dev.databricks.com/storybook/js/packages/du-bois"

export async function GET(request: NextRequest) {
  const storyId = request.nextUrl.searchParams.get("id")
  if (!storyId) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 })
  }

  try {
    const url = `${DUBOIS_BASE}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`
    const res = await fetch(url, {
      headers: {
        "User-Agent": "DBUI-Portal/1.0",
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Storybook returned ${res.status}` },
        { status: res.status }
      )
    }

    const html = await res.text()

    // Rewrite relative asset URLs to point back to the Storybook server
    const rewritten = html
      .replace(/(href|src)="\.?\//g, `$1="${DUBOIS_BASE}/`)
      .replace(/(href|src)="(?!https?:\/\/|data:|#)/g, `$1="${DUBOIS_BASE}/`)

    return new NextResponse(rewritten, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Could not reach DuBois Storybook. Are you on the Databricks network?" },
      { status: 502 }
    )
  }
}
