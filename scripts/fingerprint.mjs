#!/usr/bin/env node
/**
 * fingerprint — record what every element on the portal actually renders, so a
 * token rename can be proven to change nothing.
 *
 * A token change is safe when the browser's computed value is identical before
 * and after. That is a stronger claim than "the CSS looks equivalent", because
 * getComputedStyle has already resolved the var() chain, the calc() and the
 * scalars. If `--db-space-sm` becomes `--db-space-3` and `p-3` still computes
 * to 12px on the same element, the rename is a no-op by construction.
 *
 * Screenshots cannot make that claim. A 1px shift inside a 40-deep tree is
 * invisible at review size and obvious in production, and a diff of two PNGs
 * cannot say which property moved.
 *
 *   node scripts/fingerprint.mjs capture <out.json> [--routes a,b] [--light-only]
 *   node scripts/fingerprint.mjs diff <before.json> <after.json> [--family space]
 *
 * Exit: diff returns 1 when any element differs, so it can gate a commit.
 */
import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const BASE = process.env.PORTAL ?? "http://localhost:3100"

/** Every route the portal serves. A family that only shows on one page still gets read. */
const ROUTES = [
  "/",
  "/components",
  "/templates",
  "/docs",
  "/docs/accessibility",
  "/docs/checks",
  "/docs/cli",
  "/docs/components",
  "/docs/foundations",
  "/docs/icons",
  "/docs/layout",
  "/docs/mcp",
  "/docs/overview",
  "/docs/patterns",
  "/docs/principles",
  "/docs/tokens",
  "/docs/voice",
]

/**
 * The properties a dimensional token can reach. Grouped by family so a diff can
 * be attributed: a change in `borderTopLeftRadius` is the radius family's fault
 * and nothing else's.
 */
const PROPS = {
  space: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "marginTop", "marginRight", "marginBottom", "marginLeft", "rowGap", "columnGap"],
  size: ["width", "height", "minHeight", "minWidth"],
  radius: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
  border: ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"],
  elevation: ["boxShadow"],
  motion: ["transitionDuration", "transitionTimingFunction"],
  type: ["fontSize", "lineHeight"],
}
const ALL_PROPS = Object.values(PROPS).flat()
const FAMILY_OF = Object.fromEntries(Object.entries(PROPS).flatMap(([fam, ps]) => ps.map((p) => [p, fam])))

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ── CDP plumbing, same shape as shot.mjs ─────────────────────────────────── */

async function launch() {
  const port = 9400 + Math.floor(Math.random() * 400)
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-fp-"))
  const chrome = spawn(CHROME, [
    "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    "--no-first-run", "--no-default-browser-check", "--disable-gpu", "--disable-extensions",
    "--disable-sync", "--disable-background-networking", "--disable-component-update",
    "--hide-scrollbars", "--force-prefers-reduced-motion", "--window-size=1440,1200", "about:blank",
  ], { stdio: "ignore" })

  let wsUrl
  for (let i = 0; i < 80 && !wsUrl; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (res.ok) wsUrl = (await res.json()).webSocketDebuggerUrl
    } catch {}
    if (!wsUrl) await sleep(250)
  }
  if (!wsUrl) throw new Error("Chrome did not expose a debugging endpoint")

  const ws = await new Promise((resolve, reject) => {
    const s = new WebSocket(wsUrl)
    s.onopen = () => resolve(s)
    s.onerror = (e) => reject(new Error(`websocket failed: ${e.message ?? "unknown"}`))
  })
  let id = 0
  const pending = new Map()
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    }
  }
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const myId = ++id
      pending.set(myId, { resolve, reject })
      ws.send(JSON.stringify({ id: myId, method, params, ...(sessionId ? { sessionId } : {}) }))
    })
  const close = () => {
    try { ws.close() } catch {}
    chrome.kill()
    try { fs.rmSync(profile, { recursive: true, force: true }) } catch {}
  }
  return { send, close }
}

/* ── the page-side walk ───────────────────────────────────────────────────── */

/**
 * Keyed by structural path, not by class, because the class string is exactly
 * what a codemod changes. `body>2>0>3` names the same box before and after a
 * `rounded-md` → `rounded-2` rewrite, so the computed radius can be compared
 * across the rewrite rather than reported as a new element.
 *
 * Non-rendered and dev-only nodes are skipped before the index is assigned, not
 * after. Next injects a varying number of `<script>` and overlay nodes into
 * `<body>` between runs, and counting them makes every later sibling shift one
 * position — a control run against itself reported 20 changed elements purely
 * from that drift.
 */
const walkExpression = (props) => `
(() => {
  const PROPS = ${JSON.stringify(props)};
  const SKIP = new Set(["SCRIPT", "STYLE", "TEMPLATE", "LINK", "META", "NOSCRIPT", "TITLE"]);
  const skip = (el) => SKIP.has(el.tagName) || el.tagName.includes("-");
  const out = {};
  const visit = (el, key) => {
    const cs = getComputedStyle(el);
    // Rounded to the same precision the browser paints at. Sub-pixel jitter
    // from a re-layout is not a token change and must not read as one.
    out[key] = PROPS.map((p) => {
      const v = cs[p];
      const n = parseFloat(v);
      return Number.isFinite(n) && /^-?[\\d.]+px$/.test(v) ? Math.round(n * 100) / 100 + "px" : v;
    }).join("|");
    let i = 0;
    for (const c of el.children) if (!skip(c)) visit(c, key + ">" + i++);
  };
  visit(document.body, "body");
  return JSON.stringify(out);
})()`

async function capture(send, sessionId, url, dark) {
  await send("Page.navigate", { url }, sessionId)
  // Client-rendered pages grow as they hydrate; poll until the height settles.
  let last = -1
  let stable = 0
  for (let i = 0; i < 60; i++) {
    await sleep(300)
    const { result } = await send("Runtime.evaluate", {
      expression: "document.body ? document.body.scrollHeight : 0",
      returnByValue: true,
    }, sessionId)
    const h = result.value ?? 0
    if (h > 200 && h === last) { if (++stable >= 3) break } else stable = 0
    last = h
  }
  await send("Runtime.evaluate", {
    expression: `document.documentElement.classList.${dark ? "add" : "remove"}('dark')`,
  }, sessionId)
  await sleep(600)
  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    expression: walkExpression(ALL_PROPS), returnByValue: true,
  }, sessionId)
  if (exceptionDetails) throw new Error(exceptionDetails.text ?? "walk failed")
  return JSON.parse(result.value)
}

/* ── commands ─────────────────────────────────────────────────────────────── */

const [cmd, ...rest] = process.argv.slice(2)
const flag = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1]

if (cmd === "capture") {
  const out = rest.find((a) => !a.startsWith("--"))
  if (!out) { console.error("usage: fingerprint.mjs capture <out.json>"); process.exit(1) }
  const routes = flag("routes")?.split(",") ?? ROUTES
  const themes = process.argv.includes("--light-only") ? ["light"] : ["light", "dark"]

  const { send, close } = await launch()
  try {
    const { targetId } = await send("Target.createTarget", { url: "about:blank" })
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true })
    await send("Page.enable", {}, sessionId)
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false }, sessionId)

    const data = {}
    let total = 0
    for (const route of routes) {
      for (const theme of themes) {
        const rec = await capture(send, sessionId, BASE + route, theme === "dark")
        const n = Object.keys(rec).length
        total += n
        data[`${theme}${route}`] = rec
        console.log(`  ${theme.padEnd(5)} ${route.padEnd(22)} ${n} elements`)
      }
    }
    fs.writeFileSync(out, JSON.stringify({ props: ALL_PROPS, routes, themes, data }, null, 0))
    console.log(`\nwrote ${out} — ${total} elements across ${routes.length} routes x ${themes.length} themes`)
  } finally {
    close()
  }
  process.exit(0)
}

if (cmd === "diff") {
  const [aPath, bPath] = rest.filter((a) => !a.startsWith("--"))
  if (!aPath || !bPath) { console.error("usage: fingerprint.mjs diff <before.json> <after.json>"); process.exit(1) }
  const a = JSON.parse(fs.readFileSync(aPath, "utf8"))
  const b = JSON.parse(fs.readFileSync(bPath, "utf8"))
  const props = a.props

  let compared = 0
  let missing = 0
  let added = 0
  const changed = []
  for (const scope of new Set([...Object.keys(a.data), ...Object.keys(b.data)])) {
    const ra = a.data[scope] ?? {}
    const rb = b.data[scope] ?? {}
    for (const key of new Set([...Object.keys(ra), ...Object.keys(rb)])) {
      if (!(key in rb)) { missing++; continue }
      if (!(key in ra)) { added++; continue }
      compared++
      if (ra[key] === rb[key]) continue
      const before = ra[key].split("|")
      const after = rb[key].split("|")
      const deltas = props
        .map((p, i) => ({ prop: p, from: before[i], to: after[i] }))
        .filter((d) => d.from !== d.to)
      changed.push({ scope, key, deltas })
    }
  }

  const byFamily = {}
  const byProp = {}
  const byRoute = {}
  for (const c of changed) {
    // The route, without the theme prefix — a change that shows in both themes
    // is one change, not two.
    const route = c.scope.replace(/^(light|dark)/, "") || "/"
    byRoute[route] = (byRoute[route] ?? 0) + 1
    for (const d of c.deltas) {
      const fam = FAMILY_OF[d.prop] ?? "other"
      byFamily[fam] = (byFamily[fam] ?? 0) + 1
      byProp[d.prop] = (byProp[d.prop] ?? 0) + 1
    }
  }

  console.log(`compared ${compared} elements`)
  if (missing) console.log(`  ${missing} present before and gone after`)
  if (added) console.log(`  ${added} new after`)
  console.log(`\nelements that differ: ${changed.length}`)
  if (changed.length) {
    console.log("\nby route:")
    for (const [r, n] of Object.entries(byRoute).sort((x, y) => y[1] - x[1])) console.log(`  ${r.padEnd(24)} ${n} elements`)
    console.log("\nby family:")
    for (const [fam, n] of Object.entries(byFamily).sort((x, y) => y[1] - x[1])) console.log(`  ${fam.padEnd(10)} ${n} property changes`)
    console.log("\nby property:")
    for (const [p, n] of Object.entries(byProp).sort((x, y) => y[1] - x[1])) console.log(`  ${p.padEnd(26)} ${n}`)
    console.log("\nfirst 30 differing elements:")
    for (const c of changed.slice(0, 30)) {
      console.log(`  ${c.scope} ${c.key}`)
      for (const d of c.deltas) console.log(`      ${d.prop.padEnd(26)} ${d.from}  ->  ${d.to}`)
    }
  }
  process.exit(changed.length ? 1 : 0)
}

console.error("usage: fingerprint.mjs capture <out.json> | diff <before.json> <after.json>")
process.exit(1)
