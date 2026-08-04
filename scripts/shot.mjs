#!/usr/bin/env node
/**
 * Screenshot a URL using the local Chrome over the DevTools Protocol.
 *
 * Chrome 132+ removed the legacy `--headless` screenshot flag and the new
 * headless mode is unreliable on a managed profile, so this drives Chrome
 * directly. Node 22 ships a global WebSocket, so there is no dependency.
 *
 *   node scripts/shot.mjs <url> <out.png> [width] [fullPage]
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [url, out, widthArg = "1000", fullArg = "true"] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <out.png> [width] [fullPage]");
  process.exit(1);
}
const width = Number(widthArg);
const fullPage = fullArg !== "false";
const PORT = 9333 + Math.floor(Math.random() * 200);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-shot-"));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--disable-extensions",
  "--disable-sync",
  "--disable-background-networking",
  "--disable-component-update",
  "--hide-scrollbars",
  `--window-size=${width},1200`,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function endpoint() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging endpoint");
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => resolve(ws);
    ws.onerror = (e) => reject(new Error(`websocket failed: ${e.message ?? "unknown"}`));
  });
}

function rpc(ws) {
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  return (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const myId = ++id;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
}

try {
  const browserWs = await endpoint();
  const ws = await connect(browserWs);
  const send = rpc(ws);

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  await send("Page.enable", {}, sessionId);
  await send("Emulation.setDeviceMetricsOverride", {
    width, height: 1200, deviceScaleFactor: 2, mobile: false,
  }, sessionId);
  await send("Page.navigate", { url }, sessionId);

  // Optional: click something before capturing, to shoot an interactive state.
  const clickArg = process.argv.find((a) => a.startsWith("--click="));
  if (clickArg) {
    const selector = clickArg.slice("--click=".length);
    await sleep(3500);
    await send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(selector)})?.click()`,
    }, sessionId);
    await sleep(800);
  }

  // Storybook docs render client-side; poll until the body stops growing.
  let last = -1;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    const { result } = await send("Runtime.evaluate", {
      expression: "document.body ? document.body.scrollHeight : 0",
      returnByValue: true,
    }, sessionId);
    const h = result.value ?? 0;
    if (h > 200 && h === last) break;
    last = h;
  }

  // A tall page is unreadable once scaled to fit, so `--band=<y>,<height>`
  // captures one horizontal slice of it at full resolution instead.
  const bandArg = process.argv.find((a) => a.startsWith("--band="));
  const band = bandArg
    ? bandArg.slice("--band=".length).split(",").map(Number)
    : null;
  const clip = band
    ? { x: 0, y: band[0], width, height: band[1] ?? 1200, scale: 1 }
    : fullPage
      ? { x: 0, y: 0, width, height: last, scale: 1 }
      : null;

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: fullPage || Boolean(band),
    ...(clip ? { clip } : {}),
  }, sessionId);

  fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(`wrote ${out}  (${width}x${clip ? clip.height : last})`);
  ws.close();
} finally {
  chrome.kill();
  // Chrome may still hold files in the profile; the screenshot is already
  // written by this point, so a failed cleanup must not fail the run.
  try {
    fs.rmSync(profile, { recursive: true, force: true });
  } catch {}
}
