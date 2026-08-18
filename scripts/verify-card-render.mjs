/**
 * Renders StatCard and MetricCard to static markup and asserts what comes out.
 *
 * Headless Chrome cannot screenshot the Storybook dev server on this machine —
 * it never goes idle against the HMR socket — so a pixel check is not available.
 * Server-rendering the component proves more of what matters anyway: that the
 * delta renders at all, that it takes the tone class it was asked for, and that
 * both cards agree on the tone vocabulary, which is the thing that drifts.
 *
 * esbuild bundles the TSX chain; react-dom/server does the render.
 *
 * Run: node scripts/verify-card-render.mjs
 */
import { build } from "esbuild"
import { writeFileSync, rmSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const dir = mkdtempSync(join(tmpdir(), "dbui-card-render-"))

const entry = join(dir, "entry.tsx")
writeFileSync(
  entry,
  `
import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { StatCard } from "${ROOT}packages/dbui/src/components/ui/stat-card"
import { MetricCard } from "${ROOT}packages/dbui/src/components/ui/metric-card"

const out = {
  statCard: renderToStaticMarkup(
    <StatCard
      label="Total Catalogs"
      value="177"
      hint="What this total counts"
      delta="+2.7%"
      deltaWindow="vs past 30d"
      deltaTone="positive"
    />
  ),
  metricCard: renderToStaticMarkup(
    <MetricCard
      label="Asset usage"
      value="16.6M queries"
      hint="Queries against governed assets"
      delta="+2.6%"
      deltaWindow="past 30d"
      deltaTone="positive"
      link={{ label: "Review Data Usage" }}
    >
      <div data-slot="viz-stub" />
    </MetricCard>
  ),
  metricCardNegative: renderToStaticMarkup(
    <MetricCard
      label="Failed runs"
      value="1,204"
      delta="+18%"
      deltaWindow="past 7d"
      deltaTone="negative"
      link={{ label: "Review runs" }}
    >
      <div data-slot="viz-stub" />
    </MetricCard>
  ),
  metricCardNoDelta: renderToStaticMarkup(
    <MetricCard label="Storage" value="6.8 TiB" link={{ label: "Review" }}>
      <div data-slot="viz-stub" />
    </MetricCard>
  ),
}
console.log(JSON.stringify(out))
`
)

const bundle = join(dir, "bundle.cjs")
await build({
  entryPoints: [entry],
  outfile: bundle,
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  loader: { ".tsx": "tsx", ".ts": "ts" },
  // react and react-dom live in the portal workspace, not the root.
  nodePaths: [join(ROOT, "apps/portal/node_modules")],
  external: [],
  logLevel: "error",
})

const { execFileSync } = await import("node:child_process")
const raw = execFileSync(process.execPath, [bundle], { encoding: "utf8" })
const out = JSON.parse(raw)
rmSync(dir, { recursive: true, force: true })

const checks = []
const has = (name, html, needle, want = true) =>
  checks.push([name, html.includes(needle) === want, needle])

has("StatCard renders delta", out.statCard, "+2.7%")
has("StatCard delta window", out.statCard, "vs past 30d")
has("StatCard positive tone", out.statCard, "text-status-text-positive")

has("MetricCard renders delta", out.metricCard, "+2.6%")
has("MetricCard delta window", out.metricCard, "past 30d")
has("MetricCard positive tone", out.metricCard, "text-status-text-positive")
has("MetricCard value+delta on one baseline row", out.metricCard, "items-baseline")
has("MetricCard keeps its viz slot", out.metricCard, 'data-slot="viz-stub"')
has("MetricCard keeps its link", out.metricCard, "Review Data Usage")

has("MetricCard negative tone", out.metricCardNegative, "text-status-text-negative")
has("MetricCard negative not positive", out.metricCardNegative, "text-status-text-positive", false)

has("No delta renders no tone span", out.metricCardNoDelta, "text-status-text-positive", false)
has("No delta renders no window", out.metricCardNoDelta, "past 30d", false)
has("No delta still renders value", out.metricCardNoDelta, "6.8 TiB")

// Both cards must use the same tone class for the same verdict, or the shared
// scale has stopped being shared.
const toneOf = (html) => (html.match(/text-status-text-(positive|negative)/) || [])[0]
checks.push([
  "Both cards agree on the positive tone class",
  toneOf(out.statCard) === toneOf(out.metricCard),
  `${toneOf(out.statCard)} vs ${toneOf(out.metricCard)}`,
])

let failed = 0
console.log("")
for (const [name, ok, detail] of checks) {
  if (!ok) failed += 1
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${ok ? "" : detail}`)
}
console.log(failed === 0 ? "\nAll checks passed.\n" : `\n${failed} check(s) failed.\n`)
process.exit(failed ? 1 : 0)
