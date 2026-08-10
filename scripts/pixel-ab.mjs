#!/usr/bin/env node
/**
 * Is a computed-style difference actually visible?
 *
 * The fingerprint harness compares computed styles, which is the right unit for
 * "did anything change" and the wrong one for "does anyone see it". A radius on
 * a transparent, borderless element changes `borderRadius` and paints nothing.
 *
 * This renders a page at 4x twice — as it ships, and with one CSS override
 * forced on — and counts differing pixels and the worst per-channel delta. A
 * PNG byte comparison is not enough: compression moves hundreds of bytes for a
 * single changed subpixel.
 *
 *   node scripts/pixel-ab.mjs <url> <selector> <css>
 *
 * The selector is scrolled into view and asserted present first, because two
 * identical screenshots of a page that never showed the element prove nothing.
 *
 *   node scripts/pixel-ab.mjs http://localhost:3100/components \
 *     '[data-slot=input-group-control]' 'border-radius:0.25rem'
 */
import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const [URL, SELECTOR, CSS] = process.argv.slice(2)
if (!URL || !SELECTOR || !CSS) {
  console.error("usage: node scripts/pixel-ab.mjs <url> <selector> <css>")
  process.exit(1)
}
const PORT = 9600 + Math.floor(Math.random() * 200)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-radius-"))

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--no-default-browser-check", "--disable-gpu", "--disable-extensions",
  "--disable-sync", "--disable-background-networking", "--hide-scrollbars",
  "--force-device-scale-factor=4", "--window-size=700,300", "about:blank",
], { stdio: "ignore" })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function endpoint() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      return (await res.json()).webSocketDebuggerUrl
    } catch { await sleep(250) }
  }
  throw new Error("chrome did not start")
}

const socket = new WebSocket(await endpoint())
await new Promise((r) => (socket.onopen = r))
let id = 0
const pending = new Map()
socket.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result ?? {}), pending.delete(msg.id)
}
/**
 * The browser endpoint does not speak Page or Runtime. Both live on a page
 * target, which has to be created and attached to first — the same shape
 * dom-eval.mjs uses.
 */
const raw = (method, params = {}, sessionId) =>
  new Promise((r) => { const n = ++id; pending.set(n, r); socket.send(JSON.stringify({ id: n, method, params, ...(sessionId ? { sessionId } : {}) })) })

const { targetId } = await raw("Target.createTarget", { url: "about:blank" })
const { sessionId } = await raw("Target.attachToTarget", { targetId, flatten: true })
const send = (method, params = {}) => raw(method, params, sessionId)

await send("Page.enable")
await send("Emulation.setDeviceMetricsOverride", { width: 700, height: 300, deviceScaleFactor: 4, mobile: false })
await send("Page.navigate", { url: URL })
await sleep(6000)

const shoot = async () => {
  const r = await send("Page.captureScreenshot", { format: "png" })
  if (!r?.data) throw new Error(`captureScreenshot returned nothing: ${JSON.stringify(r)}`)
  return r.data
}

/**
 * Scroll the control into view and confirm it is there. A byte-identical pair of
 * screenshots proves nothing if the element under test was never on screen,
 * which is exactly how the first run of this check fooled itself.
 */
const present = await send("Runtime.evaluate", {
  expression: `(() => {
    const n = document.querySelectorAll(${JSON.stringify(SELECTOR)})
    if (n[0]) n[0].scrollIntoView({ block: "center" })
    return n.length
  })()`,
  returnByValue: true,
})
const found = present?.result?.value ?? 0
console.log(`matched ${found} element(s) for ${SELECTOR}`)
if (!found) {
  console.error("nothing to compare — the selector matched nothing on this page")
  process.exit(1)
}
await sleep(600)

const asShipped = await shoot()

await send("Runtime.evaluate", {
  expression: `(() => {
    const s = document.createElement('style')
    s.textContent = ${JSON.stringify(SELECTOR)} + '{' + ${JSON.stringify(CSS)}.split(';').filter(Boolean).map((d) => d + ' !important').join(';') + '}'
    document.head.appendChild(s)
    return true
  })()`,
})
await sleep(400)
const withOldRadius = await shoot()

const a = Buffer.from(asShipped, "base64")
const b = Buffer.from(withOldRadius, "base64")

console.log(`as shipped                : ${a.length} bytes`)
console.log(`with the override forced : ${b.length} bytes`)
console.log(`PNG byte-identical: ${a.equals(b)}`)

/**
 * A byte difference in a PNG says almost nothing — compression makes one
 * changed subpixel move hundreds of bytes. Decode both and count pixels, and
 * report the worst per-channel delta, because "different" and "visible" are not
 * the same claim.
 */
const diff = await send("Runtime.evaluate", {
  expression: `(async () => {
    const load = (b64) => new Promise((res) => {
      const img = new Image()
      img.onload = () => res(img)
      img.src = "data:image/png;base64," + b64
    })
    const [x, y] = await Promise.all([load(${JSON.stringify(asShipped)}), load(${JSON.stringify(withOldRadius)})])
    const grab = (img) => {
      const c = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height })
      c.getContext("2d").drawImage(img, 0, 0)
      return c.getContext("2d").getImageData(0, 0, img.width, img.height).data
    }
    const p = grab(x), q = grab(y)
    let differing = 0, worst = 0
    for (let i = 0; i < p.length; i += 4) {
      const d = Math.max(Math.abs(p[i] - q[i]), Math.abs(p[i+1] - q[i+1]), Math.abs(p[i+2] - q[i+2]))
      if (d) { differing++; if (d > worst) worst = d }
    }
    return { total: p.length / 4, differing, worst, pct: +(100 * differing / (p.length / 4)).toFixed(4) }
  })()`,
  returnByValue: true,
  awaitPromise: true,
})
console.log(`\npixel diff: ${JSON.stringify(diff?.result?.value)}`)

fs.writeFileSync(path.join(process.cwd(), ".fingerprints/pixel-ab-shipped.png"), a)
fs.writeFileSync(path.join(process.cwd(), ".fingerprints/pixel-ab-forced.png"), b)
console.log("wrote .fingerprints/pixel-ab-shipped.png and .fingerprints/pixel-ab-forced.png")

socket.close()
chrome.kill()
fs.rmSync(profile, { recursive: true, force: true })
